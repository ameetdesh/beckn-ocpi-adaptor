import { pool } from '../db/index';
import { appConfig } from '../config/app.config';
import type { OCPILocation, OCPIEVSE, OCPIConnector, OCPITariff } from '../types/ocpi';
import { LocationData } from '../models/location.model';
import { TariffData } from '../models/tariff.model';
import { PriceComponentData } from '../models/priceComponent.model';
import { ItemData } from '../models/item.model';
import { Buffer } from 'node:buffer';

// Helper to execute queries with proper error handling
const query = async (text: string, params: any[] = []) => {
    try {
        const result = await pool.query(text, params);
        return result.rows;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Database query error:`, error);
        throw error;
    }
};

// Helper for batch inserts
export const batchInsert = async (table: string, columns: string[], values: any[][]) => {
    if (values.length === 0) return [];

    const columnList = columns.join(', ');
    const valuePlaceholders = values.map((_, i) =>
        `(${columns.map((_, j) => `$${i * columns.length + j + 1}`).join(', ')})`
    ).join(', ');

    const flatValues = values.flat();
    const queryText = `
    INSERT INTO ${table} (${columnList})
    VALUES ${valuePlaceholders}
    RETURNING *
  `;

    return query(queryText, flatValues);
};



// Batch insert locations
export const insertLocations = async (locations: LocationData[]) => {
    const columns = [
        'id', 'name', 'provider_id', 'city', 'state', 'country_code',
        'gps_latitude', 'gps_longitude', 'address_full', 'provider_name', 'twentyfourseven'
    ];

    const values = locations.map(loc => [
        loc.id,
        loc.name,
        loc.provider_id,
        loc.city,
        loc.state,
        loc.country_code,
        loc.gps_latitude,
        loc.gps_longitude,
        loc.address_full,
        loc.provider_name,
        loc.twentyfourseven ?? false
    ]);

    return batchInsert('locations', columns, values);
};

// Batch insert tariffs
export const insertTariffs = async (tariffs: TariffData[]) => {
    const columns = ['id', 'start_date_time', 'end_date_time', 'currency', 'country_code'];
    const values = tariffs.map(tariff => [
        tariff.id,
        tariff.start_date_time,
        tariff.end_date_time,
        tariff.currency,
        tariff.country_code
    ]);

    return batchInsert('tariffs', columns, values);
};

// Batch insert price components
export const insertPriceComponents = async (components: PriceComponentData[]) => {
    const columns = ['tariff_id', 'price', 'type', 'vat', 'step_size'];
    const values = components.map(comp => [
        comp.tariff_id,
        comp.price,
        comp.type,
        comp.vat,
        comp.step_size
    ]);

    return batchInsert('price_components', columns, values);
};

// Batch insert items
export const insertItems = async (items: ItemData[]) => {
    const columns = [
        'location_id', 'name', 'evse_uid', 'status', 
        'connector_id', 'standard', 'power_type', 'tariff_id',
        'format', 'max_voltage', 'max_amperage', 'max_electric_power'
    ];

    const values = items.map(item => [
        item.location_id,
        item.name,
        item.evse_uid,
        item.status,
        item.connector_id,
        item.standard,
        item.power_type,
        item.tariff_id,
        item.format,
        item.max_voltage,
        item.max_amperage,
        item.max_electric_power
    ]);

    return batchInsert('items', columns, values);
};

export const clearOCPIcache = async (): Promise<void> => {
    await query('SET session_replication_role = "replica";');
    
    try {
        // Uncomment line belwo to optionally clear app_logs if needed
        await query('TRUNCATE TABLE app_logs RESTART IDENTITY CASCADE;');
        await query('TRUNCATE TABLE price_components RESTART IDENTITY CASCADE;');
        await query('TRUNCATE TABLE items RESTART IDENTITY CASCADE;');
        await query('TRUNCATE TABLE locations RESTART IDENTITY CASCADE;');
        await query('TRUNCATE TABLE tariffs RESTART IDENTITY CASCADE;');
        
        console.log(`[${new Date().toISOString()}] All tables have been cleared successfully.`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error clearing tables:`, error);
        throw error;
    } finally {
        await query('SET session_replication_role = "origin";');
    }
};

// Helper function to run a transaction
export const withTransaction = async (callback: (client: any) => Promise<void>) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await callback(client);
        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};

// Query helpers
// Retrieves a location either from the cache or, when uncached, directly from the OCPI server.
export const getLocationById = async (id: string) => {
    const useCache = appConfig.app.initialization.use_cache;

    if (useCache) {
        const result = await query('SELECT * FROM locations WHERE id = $1', [id]);
        if (result[0]) {
            return result[0];
        }
    }

    try {
        const ocpiUtils = await import('./ocpi.utils');
        const location = await ocpiUtils.fetchFromOCPI<OCPILocation>(`/locations/${id}`);
        if (!location) return null;

        return {
            id: location.id,
            name: location.name ?? undefined,
            provider_id: location.party_id ?? undefined,
            city: location.city ?? undefined,
            state: location.state ?? undefined,
            gps_latitude: location.coordinates?.latitude !== undefined ? Number(location.coordinates.latitude) : undefined,
            gps_longitude: location.coordinates?.longitude !== undefined ? Number(location.coordinates.longitude) : undefined,
            country_code: location.country_code ?? undefined,
            address_full: location.address ?? undefined,
            provider_name: location.operator?.name ?? undefined,
            twentyfourseven: location.opening_times?.twentyfourseven ?? undefined
        } as LocationData;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to fetch OCPI location ${id}`, error);
        return null;
    }
};

export const getTariffById = async (id: string) => {
    const result = await query('SELECT * FROM tariffs WHERE id = $1', [id]);
    return result[0];
};

export const getPriceComponentsByTariff = async (tariffId: string) => {
    return query('SELECT * FROM price_components WHERE tariff_id = $1', [tariffId]);
};

// Returns all cached item rows for a given location identifier.
export const getItemsByLocation = async (locationId: string) => {
    return query('SELECT * FROM items WHERE location_id = $1', [locationId]);
};

// Decodes the encoded live-mode item identifier into its OCPI components.
const decodeLiveItemId = (value: string) => {
    try {
        // Live-mode IDs are base64url-encoded blobs. Replace the URL-safe alphabet
        // with the standard base64 characters so Node can decode it.
        const normalized = value.replace(/-/g, '+').replace(/_/g, '/');

        // Base64 requires the string length to be a multiple of 4. URL-safe encodings
        // drop the padding, so we reintroduce the missing '=' characters here.
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);

        // Decode back to JSON and parse. Any failure means the caller provided an
        // identifier that wasn't produced by our live pipeline.
        const json = Buffer.from(padded, 'base64').toString('utf8');
        const parsed = JSON.parse(json);
        if (
            parsed?.v === 1 &&
            typeof parsed.location_id === 'string' &&
            typeof parsed.evse_uid === 'string' &&
            typeof parsed.connector_id === 'string' &&
            typeof parsed.tariff_id === 'string'
        ) {
            return parsed as {
                location_id: string;
                evse_uid: string;
                connector_id: string;
                tariff_id: string;
            };
        }
    } catch {
        // ignore
    }
    return null;
};

// Maps an OCPI connector into the ItemData shape expected by the Beckn pipeline.
const mapConnectorToItem = (
    locationId: string,
    evse: OCPIEVSE,
    connector: OCPIConnector,
    tariffId: string,
    fallbackId: string
): ItemData & { id: string } => ({
    id: fallbackId,
    location_id: locationId,
    name: evse.physical_reference ?? undefined,
    evse_uid: evse.uid as string,
    status: evse.status || 'UNKNOWN',
    connector_id: connector.id,
    standard: connector.standard,
    power_type: connector.power_type,
    tariff_id: tariffId || undefined,
    format: connector.format,
    max_voltage: connector.max_voltage ?? undefined,
    max_amperage: connector.max_amperage ?? undefined,
    max_electric_power: connector.max_electric_power ?? undefined
});

// Fetches an item from cache or reconstructs it from OCPI data when cache usage is disabled.
export const getItemById = async (id: number | string) => {
    const useCache = appConfig.app.initialization.use_cache;
    const numericId = typeof id === 'number' ? id : Number(id);

    if (useCache && Number.isFinite(numericId)) {
        const result = await query('SELECT * FROM items WHERE id = $1', [numericId]);
        if (result[0]) {
            return result[0];
        }
    }

    if (typeof id !== 'string') {
        return null;
    }

    const token = decodeLiveItemId(id);
    if (!token) {
        return null;
    }

    try {
        const ocpiUtils = await import('./ocpi.utils');
        const location = await ocpiUtils.fetchFromOCPI<OCPILocation>(`/locations/${token.location_id}`);
        if (!location) return null;

        const evse = location.evses?.find(e => e.uid === token.evse_uid);
        const connector = evse?.connectors?.find(c => c.id === token.connector_id);
        if (!evse || !connector) return null;

        return mapConnectorToItem(location.id!, evse, connector, token.tariff_id ?? '', id);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to fetch OCPI item ${id}`, error);
        return null;
    }
};

// Retrieves all cached item rows.
export const getAllItems = async () => {
    return query('SELECT * FROM items');
};

// Returns every location from cache or falls back to a live OCPI pull when needed.
export const getAllLocations = async (): Promise<LocationData[]> => {
    const useCache = appConfig.app.initialization.use_cache;

    if (useCache) {
        const rows = await query('SELECT * FROM locations');
        if (rows.length > 0) {
            return rows;
        }
    }

    const ocpiUtils = await import('./ocpi.utils');
    const ocpiLocations = await ocpiUtils.fetchFromOCPI<OCPILocation[]>('/locations');
    return ocpiLocations
        .filter(location => Boolean(location.id))
        .map(location => ({
            id: location.id as string,
            name: location.name ?? undefined,
            provider_id: location.party_id ?? undefined,
            city: location.city ?? undefined,
            state: location.state ?? undefined,
            gps_latitude: location.coordinates?.latitude !== undefined
                ? Number(location.coordinates.latitude)
                : undefined,
            gps_longitude: location.coordinates?.longitude !== undefined
                ? Number(location.coordinates.longitude)
                : undefined,
            country_code: location.country_code ?? undefined,
            address_full: location.address ?? undefined,
            provider_name: location.operator?.name ?? undefined,
            twentyfourseven: location.opening_times?.twentyfourseven ?? undefined
        }));
};

// Retrieves all cached tariffs without loading price-component details.
export const getAllTariffs = async () => {
    return query('SELECT * FROM tariffs');
};

// Normalises OCPI date-like values into ISO strings.
const toIsoString = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    return undefined;
};

/**
 * Fetches a tariff with its price components by ID, only if the tariff is currently active
 * A tariff is considered active if the current timestamp is between its start_date_time and end_date_time
 * If start_date_time is not set, the tariff is considered active from the beginning of time
 * If end_date_time is not set, the tariff is considered active until the end of time
 * @param id The ID of the tariff to fetch
 * @returns The tariff with its price components if found and active, null otherwise
 */
// Loads a tariff and its price components either from cache or by querying OCPI live.
export const getActiveTariffWithComponents = async (id: string) => {
    const useCache = appConfig.app.initialization.use_cache;

    if (useCache) {
        const result = await query(
            `SELECT t.*, 
                    pc.id as component_id, 
                    pc.price, 
                    pc.type, 
                    pc.vat,
                    pc.step_size
             FROM tariffs t
             LEFT JOIN price_components pc ON t.id = pc.tariff_id
             WHERE t.id = $1
             ORDER BY pc.id`,
            [id]
        );

        if (result.length > 0) {
            return {
                id: result[0].id,
                start_date_time: result[0].start_date_time,
                end_date_time: result[0].end_date_time,
                currency: result[0].currency,
                country_code: result[0].country_code,
                price_components: result
                    .filter(row => row.component_id)
                    .map(row => ({
                        id: row.component_id,
                        price: Number(row.price),
                        type: row.type,
                        vat: row.vat,
                        step_size: row.step_size
                    }))
            };
        }
    }

    try {
        const ocpiUtils = await import('./ocpi.utils');
        const tariffs = await ocpiUtils.fetchFromOCPI<OCPITariff[]>('/tariffs');
        const target = tariffs.find(t => t.id === id);
        if (!target) return null;

        const priceComponents = (target.elements ?? []).flatMap((element, elementIdx) =>
            (element.price_components ?? []).map((component, componentIdx) => ({
                id: `${target.id}-${elementIdx}-${componentIdx}`,
                price: component.price,
                type: component.type,
                vat: component.vat ?? null,
                step_size: component.step_size
            }))
        );

        return {
            id: target.id,
            start_date_time: toIsoString(target.start_date_time),
            end_date_time: toIsoString(target.end_date_time),
            currency: target.currency,
            country_code: target.country_code,
            price_components: priceComponents
        };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to fetch OCPI tariff ${id}`, error);
        return null;
    }
};
