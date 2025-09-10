import { pool } from '../db/index';
import { LocationData } from '../models/location.model';
import { TariffData } from '../models/tariff.model';
import { PriceComponentData } from '../models/priceComponent.model';
import { ItemData } from '../models/item.model';
import { Tariff } from '../types/ocpi';

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
export const getLocationById = async (id: string) => {
    const result = await query('SELECT * FROM locations WHERE id = $1', [id]);
    return result[0];
};

export const getTariffById = async (id: string) => {
    const result = await query('SELECT * FROM tariffs WHERE id = $1', [id]);
    return result[0];
};

export const getPriceComponentsByTariff = async (tariffId: string) => {
    return query('SELECT * FROM price_components WHERE tariff_id = $1', [tariffId]);
};

export const getItemsByLocation = async (locationId: string) => {
    return query('SELECT * FROM items WHERE location_id = $1', [locationId]);
};

export const getItemById = async (id: number) => {
    const result = await query('SELECT * FROM items WHERE id = $1', [id]);
    return result[0]; // Return first (and should be only) result
};

export const getAllItems = async () => {
    return query('SELECT * FROM items');
};

export const getAllLocations = async () => {
    return query('SELECT * FROM locations');
};

export const getAllTariffs = async () => {
    return query('SELECT * FROM tariffs');
};

/**
 * Fetches a tariff with its price components by ID, only if the tariff is currently active
 * A tariff is considered active if the current timestamp is between its start_date_time and end_date_time
 * If start_date_time is not set, the tariff is considered active from the beginning of time
 * If end_date_time is not set, the tariff is considered active until the end of time
 * @param id The ID of the tariff to fetch
 * @returns The tariff with its price components if found and active, null otherwise
 */
export const getActiveTariffWithComponents = async (id: string) => {
    const now = new Date().toISOString();
    
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

    if (result.length === 0) {
        return null;
    }

    // Transform the flat result into a nested structure
    const tariff = {
        id: result[0].id,
        start_date_time: result[0].start_date_time,
        end_date_time: result[0].end_date_time,
        currency: result[0].currency,
        country_code: result[0].country_code,
        price_components: result
            .filter(row => row.component_id) // Only include rows with price components
            .map(row => ({
                id: row.component_id,
                price: row.price,
                type: row.type,
                vat: row.vat,
                step_size: row.step_size
            }))
    };

    return tariff;
};