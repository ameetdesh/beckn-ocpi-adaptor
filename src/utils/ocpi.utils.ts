import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { appConfig } from '../config/app.config';
import { insertLog } from '../logging/log.service';
import { Context } from '../types/beckn';
import type { OCPILocation, OCPITariff, OCPIEVSE } from '../types/ocpi';
import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import {
    setSnapshot,
    type OCPIDataSnapshot,
    type CachedItem,
    type CachedTariff
} from '../cache/ocpiCache';
import { encodeLiveItemId } from './itemId.utils';

const OCPI_URL = appConfig.ocpi.url;
const OCPI_AUTH_KEY = appConfig.ocpi.auth_key;

const ocpiClient = axios.create({
    baseURL: OCPI_URL,
    headers: {
        Authorization: `Token ${OCPI_AUTH_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Request-ID': uuidv4(),
        'X-Correlation-ID': uuidv4()
    }
});

interface OCPIResponse<T> {
    status_code: number;
    status_message: string;
    data: T;
    timestamp: string;
}

const toIsoString = (value: unknown): string | undefined => {
    if (!value) return undefined;
    if (typeof value === 'string') return value;
    if (value instanceof Date) return value.toISOString();
    return undefined;
};

const mapOcpiLocationsToLocationData = (locations: OCPILocation[]): LocationData[] =>
    locations
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

export const mapOcpiLocationToItems = (location: OCPILocation): CachedItem[] => {
    if (!location.id || !location.evses) return [];

    return location.evses.flatMap(evse => {
        if (!evse.uid || !evse.connectors) return [];

        return evse.connectors.flatMap(connector => {
            if (!connector.id) return [];

            const tariffIds = (connector.tariff_ids ?? []).filter(
                (tariffId): tariffId is string => Boolean(tariffId)
            );

            const baseItem: ItemData = {
                location_id: location.id!,
                name: evse.physical_reference ?? undefined,
                evse_uid: evse.uid as string,
                status: evse.status || 'UNKNOWN',
                connector_id: connector.id,
                standard: connector.standard,
                power_type: connector.power_type,
                tariff_id: tariffIds[0] ?? '',
                format: connector.format,
                max_voltage: connector.max_voltage ?? undefined,
                max_amperage: connector.max_amperage ?? undefined,
                max_electric_power: connector.max_electric_power ?? undefined
            };

            if (tariffIds.length === 0) {
                const token = encodeLiveItemId({
                    location_id: location.id!,
                    evse_uid: evse.uid as string,
                    connector_id: connector.id,
                    tariff_id: ''
                });
                return [{
                    ...baseItem,
                    id: token,
                    tariff_id: ''
                }];
            }

            return tariffIds.map(tariffId => {
                const token = encodeLiveItemId({
                    location_id: location.id!,
                    evse_uid: evse.uid as string,
                    connector_id: connector.id,
                    tariff_id: tariffId
                });
                return {
                    ...baseItem,
                    id: token,
                    tariff_id: tariffId
                };
            });
        });
    });
};

const mapOcpiLocationsToItems = (locations: OCPILocation[]): CachedItem[] =>
    locations.flatMap(mapOcpiLocationToItems);

const mapOcpiTariffsToCachedTariffs = (tariffs: OCPITariff[]): CachedTariff[] =>
    tariffs.map(tariff => ({
        id: tariff.id,
        currency: tariff.currency,
        start_date_time: toIsoString(tariff.start_date_time),
        end_date_time: toIsoString(tariff.end_date_time),
        country_code: tariff.country_code ?? undefined,
        price_components: (tariff.elements ?? []).flatMap(element =>
            (element.price_components ?? []).map(component => ({
                type: component.type,
                price: component.price,
                vat: component.vat ?? null,
                step_size: component.step_size ?? null
            }))
        )
    }));

export const fetchFromOCPI = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await ocpiClient.get<OCPIResponse<T>>(endpoint);
        if (response.data.status_code >= 2000) {
            throw new Error(`OCPI API error: ${response.data.status_message}`);
        }
        return response.data.data;
    } catch (error: any) {
        console.error(`[${new Date().toISOString()}] Error fetching from OCPI API (${endpoint}):`, error);
        throw error;
    }
};

export const buildOCPIDataSnapshot = async (): Promise<OCPIDataSnapshot> => {
    const [locationsResponse, tariffsResponse] = await Promise.all([
        fetchFromOCPI<OCPILocation[]>('/locations'),
        fetchFromOCPI<OCPITariff[]>('/tariffs')
    ]);

    const locations = mapOcpiLocationsToLocationData(locationsResponse);
    const items = mapOcpiLocationsToItems(locationsResponse);
    const tariffs = mapOcpiTariffsToCachedTariffs(tariffsResponse);

    return {
        fetched_at: new Date().toISOString(),
        locations,
        items,
        tariffs
    };
};

export const refreshOCPIcache = async (): Promise<OCPIDataSnapshot> => {
    try {
        const snapshot = await buildOCPIDataSnapshot();
        await setSnapshot(snapshot);
        return snapshot;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error refreshing OCPI cache:`, error);
        throw error;
    }
};

export const checkEVSEStatus = async (locationId: string, evseUid: string, context?: Context) => {
    try {
        const endpoint = `/locations/${locationId}/${evseUid}`;
        const evse = await fetchFromOCPI<OCPIEVSE>(endpoint);

        await insertLog({
            id: uuidv4(),
            transaction_id: context?.transaction_id || '',
            message_id: context?.message_id || '',
            bap_id: context?.bap_id || '',
            protocol: 'ocpi',
            action: 'GET EVSE Status',
            stage: 'order',
            endpoint,
            method: 'GET',
            status: 'success',
            status_code: 200,
            request_data: {},
            response_data: evse
        }).catch(error => {
            console.error(`[${new Date().toISOString()}] Failed to write OCPI log`, error);
        });

        return evse.status;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error fetching EVSE status:`, error);
        throw error;
    }
};
