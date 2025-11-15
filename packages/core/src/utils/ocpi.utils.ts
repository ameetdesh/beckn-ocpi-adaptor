import axios, { type AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import type { OCPILocation, OCPITariff, OCPIEVSE, OCPIConnector } from '../types/ocpi';
import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import type { OCPIDataSnapshot, CachedItem, CachedTariff } from '../cache/ocpiCache';
import { encodeLiveItemId } from './itemId.utils';
import type { LogData } from '../models/log.model';

export interface OCPIUtilsConfig {
    ocpiUrl: string;
    ocpiAuthKey: string;
    cache?: {
        setSnapshot: (snapshot: OCPIDataSnapshot) => Promise<void>;
    };
    logger?: {
        insertLog: (log: LogData) => Promise<void>;
    };
}

interface OCPIResponse<T> {
    status_code: number;
    status_message: string;
    data: T;
    timestamp: string;
}

export type FetchFromOCPIOptions = {
    transactionId?: string;
    messageId?: string;
    action?: string;
    stage?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    requestData?: Record<string, unknown>;
};

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

    return location.evses.flatMap((evse: OCPIEVSE) => {
        if (!evse.uid || !evse.connectors) return [];

        return evse.connectors.flatMap((connector: OCPIConnector) => {
            if (!connector.id) return [];

            const tariffIds = (connector.tariff_ids ?? []).filter(
                (tariffId: string | null | undefined): tariffId is string => Boolean(tariffId)
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

            return tariffIds.map((tariffId: string) => {
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

type LogContext = {
    transaction_id?: string;
    message_id?: string;
    bap_id?: string;
};

const mapOcpiTariffsToCachedTariffs = (tariffs: OCPITariff[]): CachedTariff[] =>
    tariffs.map(tariff => ({
        id: tariff.id,
        currency: tariff.currency,
        start_date_time: toIsoString(tariff.start_date_time),
        end_date_time: toIsoString(tariff.end_date_time),
        country_code: tariff.country_code ?? undefined,
        price_components: (tariff.elements ?? []).flatMap((element: { price_components?: Array<{ type: string; price: number; vat?: number | null; step_size?: number | null }> }) =>
            (element.price_components ?? []).map((component: { type: string; price: number; vat?: number | null; step_size?: number | null }) => ({
                type: component.type,
                price: component.price,
                vat: component.vat ?? null,
                step_size: component.step_size ?? null
            }))
        )
    }));

/**
 * Creates OCPI utility functions with dependency injection.
 */
export const createOCPIUtils = (config: OCPIUtilsConfig) => {
    const ocpiClient = axios.create({
        baseURL: config.ocpiUrl,
        headers: {
            Authorization: `Token ${config.ocpiAuthKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Request-ID': uuidv4(),
            'X-Correlation-ID': uuidv4()
        }
    });

    const logOcpiCall = async (log: LogData) => {
        if (config.logger) {
            await config.logger.insertLog(log).catch(error => {
                console.error(`[${new Date().toISOString()}] Failed to write OCPI call log`, error);
            });
        }
    };

    const fetchFromOCPI = async <T>(
        endpoint: string,
        options?: FetchFromOCPIOptions
    ): Promise<T> => {
        const method = options?.method ?? 'GET';
        const action = options?.action ?? `OCPI ${method} ${endpoint}`;
        const stage = options?.stage ?? 'ocpi';
        const startedAt = Date.now();

        try {
            const response = await ocpiClient.get<OCPIResponse<T>>(endpoint);
            if (response.data.status_code >= 2000) {
                throw new Error(`OCPI API error: ${response.data.status_message}`);
            }

            await logOcpiCall({
                transaction_id: options?.transactionId ?? '',
                message_id: options?.messageId ?? '',
                bap_id: '',
                protocol: 'ocpi',
                action,
                stage,
                endpoint,
                method,
                status: 'success',
                status_code: response.status,
                duration: Date.now() - startedAt,
                request_data: options?.requestData,
                response_data: response.data.data
            });
            return response.data.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ status_code?: number; status_message?: string }>;
            const statusCode = axiosError.response?.status;
            const responseBody = axiosError.response?.data;

            await logOcpiCall({
                transaction_id: options?.transactionId ?? '',
                message_id: options?.messageId ?? '',
                bap_id: '',
                protocol: 'ocpi',
                action,
                stage,
                endpoint,
                method,
                status: 'error',
                status_code: statusCode,
                duration: Date.now() - startedAt,
                request_data: options?.requestData,
                response_data: responseBody as Record<string, unknown>,
                error_message: axiosError.message
            });

            console.error(`[${new Date().toISOString()}] Error fetching from OCPI API (${endpoint}):`, error);
            throw error;
        }
    };

    const fetchLocationsAndItems = async () => {
        const locationsResponse = await fetchFromOCPI<OCPILocation[]>('/locations', {
            action: 'Fetch OCPI locations',
            stage: 'sync'
        });
        return {
            locations: mapOcpiLocationsToLocationData(locationsResponse),
            items: mapOcpiLocationsToItems(locationsResponse)
        };
    };

    const fetchTariffs = async () => {
        const tariffsResponse = await fetchFromOCPI<OCPITariff[]>('/tariffs', {
            action: 'Fetch OCPI tariffs',
            stage: 'sync'
        });
        return {
            tariffs: mapOcpiTariffsToCachedTariffs(tariffsResponse)
        };
    };

    const buildOCPIDataSnapshot = async (): Promise<OCPIDataSnapshot> => {
        const [locationData, tariffData] = await Promise.all([
            fetchLocationsAndItems(),
            fetchTariffs()
        ]);

        return {
            fetched_at: new Date().toISOString(),
            locations: locationData.locations,
            items: locationData.items,
            tariffs: tariffData.tariffs
        };
    };

    const refreshOCPIcache = async (): Promise<OCPIDataSnapshot> => {
        try {
            const snapshot = await buildOCPIDataSnapshot();
            if (config.cache) {
                await config.cache.setSnapshot(snapshot);
            }
            return snapshot;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error refreshing OCPI cache:`, error);
            throw error;
        }
    };

    const checkEVSEStatus = async (locationId: string, evseUid: string, context?: LogContext) => {
        try {
            const endpoint = `/locations/${locationId}/${evseUid}`;
            const evse = await fetchFromOCPI<OCPIEVSE>(endpoint, {
                transactionId: context?.transaction_id,
                messageId: context?.message_id,
                action: 'GET EVSE Status',
                stage: 'order'
            });

            return evse.status;
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error fetching EVSE status:`, error);
            throw error;
        }
    };

    return {
        fetchFromOCPI,
        buildOCPIDataSnapshot,
        refreshOCPIcache,
        checkEVSEStatus,
        mapOcpiLocationToItems
    };
};

