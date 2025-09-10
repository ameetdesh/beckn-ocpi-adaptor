import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { appConfig } from '../config/app.config';

import {
    insertLocations,
    insertTariffs,
    insertPriceComponents,
    insertItems,
    clearOCPIcache
} from '../utils/db.utils';

import type {
    OCPILocation,
    OCPITariff,
    OCPIEVSE    
} from '../types/ocpi';
import { insertLog } from '../routes/logs';
import { Context } from '../types/beckn';

const OCPI_URL = appConfig.ocpi.url;
const OCPI_AUTH_KEY = appConfig.ocpi.auth_key;

//Fetches data from OCPI API with error handling
export async function fetchFromOCPI<T>(endpoint: string): Promise<T> {
    try {
        const response = await ocpiClient.get<OCPIResponse<T>>(endpoint);
        if (response.data.status_code >= 2000) {
            throw new Error(`OCPI API error: ${response.data.status_message}`);
        }
        return response.data.data;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error fetching from OCPI API (${endpoint}):`, error);
        throw error;
    }
}

export async function refreshOCPIcache() {
    try {
        await clearOCPIcache();
        await fetchAndStoreTariffs();
        await fetchAndStoreLocations();
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error refreshing OCPI cache:`, error);
        throw error;
    }
}

// Configure axios defaults for OCPI API
const ocpiClient = axios.create({
    baseURL: OCPI_URL,
    headers: {
        'Authorization': `Token ${OCPI_AUTH_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Request-ID': uuidv4(),
        'X-Correlation-ID': uuidv4()
    }
});

// Type definitions for OCPI API responses
interface OCPIResponse<T> {
    status_code: number;
    status_message: string;
    data: T;
    timestamp: string;
}

export async function fetchAndStoreLocations(context?: Context) {
    try {
        const locations = await fetchFromOCPI<OCPILocation[]>('/locations');

        if(context){
            insertLog({
                id: uuidv4(),
                transaction_id: context.transaction_id!,
                message_id: context.message_id!,
                bap_id: context.bap_id || 'evcharging-bap.becknprotocol.io',
                protocol: 'ocpi',
                action: context.action! || 'search',
                stage: 'discovery',
                endpoint: '/ocpi/cpo/2.2.1/locations',
                method: 'GET',
                status: 'success',
                status_code: 200,
                request_data: {},
                response_data: locations
            });
        } else {
            insertLog({
                id: uuidv4(),
                transaction_id: 'caching',
                message_id: 'caching',
                bap_id: 'evcharging-bap.becknprotocol.io',
                protocol: 'ocpi',
                action: 'GET locations',
                stage: 'discovery',
                endpoint: '/ocpi/cpo/2.2.1/locations',
                method: 'GET',
                status: 'success',
                status_code: 200,
                request_data: {},
                response_data: locations
            });
        }

        // Transform OCPI locations to our database format
        const locationData = locations
            .filter(location => location.id)
            .map(location => ({
                id: location.id!,
                name: location.name ?? undefined,
                provider_id: location.party_id,
                city: location.city,
                state: location.state,
                gps_latitude: location.coordinates?.latitude ? Number(location.coordinates.latitude) : undefined,
                gps_longitude: location.coordinates?.longitude ? Number(location.coordinates.longitude) : undefined,
                country_code: location.country_code,
                address_full: location.address,
                provider_name: location.operator?.name,
                twentyfourseven: location.opening_times ? Boolean(location.opening_times.twentyfourseven) : undefined
            }));

        // Insert locations
        const insertedLocations = await insertLocations(locationData);
        console.log(`[${new Date().toISOString()}] Inserted ${insertedLocations.length} locations`);

        // Process EVSEs for each location
        const items = locations.flatMap(location =>
            location.evses?.flatMap(evse => {
                if (!evse.uid || !evse.status) return [];     
                return evse.connectors?.flatMap(connector => {
                    if (!connector.id) return [];
        
                    const baseItem = {
                        location_id: location.id!,
                        name: evse.physical_reference ?? undefined,
                        evse_uid: evse.uid as string,
                        status: evse.status || 'UNKNOWN',
                        connector_id: connector.id,
                        standard: connector.standard,
                        power_type: connector.power_type,
                        format: connector.format,
                        max_voltage: connector.max_voltage,
                        max_amperage: connector.max_amperage,
                        max_electric_power: connector.max_electric_power
                    };
        
                    // If there are tariff_ids, map each to a new object.
                    // Otherwise, return a single object with a null tariff_id.
                    if (connector.tariff_ids?.length) {
                        return connector.tariff_ids.map(tariff_id => ({
                            ...baseItem,
                            tariff_id
                        }));
                    } else {
                        return [{
                            ...baseItem,
                            tariff_id: ''
                        }];
                    }
                }) ?? []; // Return empty array if connectors is null/undefined
            }) ?? [] // Return empty array if evses is null/undefined
        );
        const insertedItems = await insertItems(items);
        console.log(`[${new Date().toISOString()}] Inserted ${insertedItems.length} items`);
    } catch (error) {
        console.error('Error fetching and storing locations:', error);
        throw error;
    }
}

export async function checkEVSEStatus(location_id: string, evse_uid: string) {
    try {
        const location = await fetchFromOCPI<OCPIEVSE>(`/locations/${location_id}/${evse_uid}`);
        return location.status;
    } catch (error) {
        console.error('Error fetching and storing locations:', error);
        throw error;
    }
}

export async function fetchAndStoreTariffs(context?: Context) {
    try {

        const tariffs = await fetchFromOCPI<OCPITariff[]>('/tariffs');
    
        if(context){
            insertLog({
                id: uuidv4(),
                transaction_id: context.transaction_id!,
                message_id: context.message_id!,
                bap_id: context.bap_id || 'evcharging-bap.becknprotocol.io',
                protocol: 'ocpi',
                action: context.action! || 'search',
                stage: 'discovery',
                endpoint: '/ocpi/cpo/2.2.1/tariffs',
                method: 'GET',
                status: 'success',
                status_code: 200,
                request_data: {},
                response_data: tariffs
            });
        } else {
            insertLog({
                id: uuidv4(),
                transaction_id: 'caching',
                message_id: 'caching',
                bap_id: 'evcharging-bap.becknprotocol.io',
                protocol: 'ocpi',
                action: 'GET tariffs',
                stage: 'discovery',
                endpoint: '/ocpi/cpo/2.2.1/tariffs',
                method: 'GET',
                status: 'success',
                status_code: 200,
                request_data: {},
                response_data: tariffs
            });
        }

        // Transform OCPI tariffs to our database format
        const tariffData = tariffs.map(tariff => ({
            id: tariff.id,
            start_date_time: tariff.start_date_time,
            end_date_time: tariff.end_date_time,
            currency: tariff.currency,
            country_code: tariff.country_code
        }));

        // Insert tariffs
        const insertedTariffs = await insertTariffs(tariffData);
        console.log(`[${new Date().toISOString()}] Inserted ${insertedTariffs.length} tariffs`);

        // Process price components for each tariff
        for (const tariff of tariffs) {
            if (tariff.elements) {
                const priceComponents = tariff.elements.flatMap(element =>
                    element.price_components.map(component => ({
                        tariff_id: tariff.id,
                        price: component.price,
                        type: component.type,
                        vat: component.vat
                    }))
                );

                if (priceComponents.length > 0) {
                    const insertedComponents = await insertPriceComponents(priceComponents);
                    console.log(`[${new Date().toISOString()}] Inserted ${insertedComponents.length} price components for tariff ${tariff.id}`);
                }
            }
        }

        return insertedTariffs.length;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in fetchAndStoreTariffs:`, error);
        throw error;
    }
}