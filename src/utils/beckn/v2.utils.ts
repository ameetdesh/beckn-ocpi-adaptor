import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import type { z } from 'zod';

import { appConfig } from '../../config/app.config';
import {
    getAllLocations,
    getAllItems,
    getAllTariffs,
    getActiveTariffWithComponents,
    type ActiveTariff
} from '../db.utils';
import type { LocationData } from '../../models/location.model';
import type { CachedItem, CachedTariff } from '../../cache/ocpiCache';
import {
    BecknV2DiscoverRequestSchema,
    BecknV2DiscoverResponseSchema,
    BecknV2SelectRequestSchema,
    BecknV2OnSelectResponseSchema,
    BecknV2InitRequestSchema,
    BecknV2OnInitResponseSchema,
    type BecknV2DiscoverRequest,
    type BecknV2DiscoverResponse,
    type BecknV2SelectRequest,
    type BecknV2OnSelectResponse,
    type BecknV2InitRequest,
    type BecknV2OnInitResponse
} from '../../types/becknV2';
import type { InitReqBody, SelectRequest } from '../../types/beckn';

const CORE_CONTEXT =
    'https://raw.githubusercontent.com/beckn/protocol-specifications-new/refs/heads/draft/schema/core/v2/context.jsonld' as const;
const CHARGING_SERVICE_CONTEXT =
    'https://raw.githubusercontent.com/beckn/protocol-specifications-new/refs/heads/draft/schema/EvChargingService/v1/context.jsonld' as const;
const CHARGING_OFFER_CONTEXT =
    'https://raw.githubusercontent.com/beckn/protocol-specifications-new/refs/heads/draft/schema/EvChargingOffer/v1/context.jsonld' as const;

type ConnectorLookup = Record<string, { beckn: string; notes?: string }>;

let connectorLookupCache: ConnectorLookup | null = null;

const loadConnectorLookup = (): ConnectorLookup => {
    if (connectorLookupCache) {
        return connectorLookupCache;
    }

    const lookupPath = path.resolve(process.cwd(), 'ref_docs/connector_lookup.yaml');
    try {
        const fileContents = fs.readFileSync(lookupPath, 'utf-8');
        const parsed = yaml.load(fileContents) as { ocpi_to_beckn_connector_map?: ConnectorLookup } | undefined;
        connectorLookupCache = parsed?.ocpi_to_beckn_connector_map ?? {};
    } catch (error) {
        console.warn(`[${new Date().toISOString()}] Failed to read connector lookup:`, error);
        connectorLookupCache = {};
    }
    return connectorLookupCache;
};

const mapConnector = (ocpiStandard?: string): string => {
    if (!ocpiStandard) return 'not_found';
    const lookup = loadConnectorLookup();
    return lookup[ocpiStandard]?.beckn ?? lookup.default?.beckn ?? 'not_found';
};

const mapPowerType = (powerType?: string): string | undefined => {
    if (!powerType) return undefined;
    switch (powerType) {
        case 'AC_1_PHASE':
        case 'AC_SINGLE_PHASE':
            return 'AC_SINGLE_PHASE';
        case 'AC_3_PHASE':
        case 'AC_2_PHASE':
        case 'AC_2_PHASE_SPLIT':
            return 'AC_3_PHASE';
        case 'DC':
            return 'DC';
        default:
            return powerType;
    }
};

type BecknPriceComponentType = 'UNIT' | 'TAX' | 'DELIVERY' | 'DISCOUNT' | 'FEE' | 'SURCHARGE';

const mapPriceComponentType = (type?: string): BecknPriceComponentType | undefined => {
    if (!type) return undefined;
    switch (type.toUpperCase()) {
        case 'ENERGY':
        case 'TIME':
        case 'PARKING_TIME':
            return 'UNIT';
        case 'PARKING':
        case 'RESERVATION':
        case 'FLAT':
            return 'FEE';
        default:
            return undefined;
    }
};

const computeMaxPowerKW = (item: CachedItem): number | undefined => {
    if (item.max_electric_power && item.max_electric_power > 0) {
        // OCPI max_electric_power is in Watts. Convert to kW if value appears to be > 1000.
        return item.max_electric_power > 1000
            ? Number((item.max_electric_power / 1000).toFixed(2))
            : Number(item.max_electric_power.toFixed(2));
    }

    if (item.max_voltage && item.max_amperage) {
        const kw = (item.max_voltage * item.max_amperage) / 1000;
        return Number(kw.toFixed(2));
    }

    return undefined;
};

const computeChargingSpeed = (maxPowerKW?: number): string | undefined => {
    if (!maxPowerKW) return undefined;
    if (maxPowerKW < 7) return 'SLOW';
    if (maxPowerKW < 22) return 'NORMAL';
    if (maxPowerKW < 50) return 'FAST';
    return 'ULTRAFAST';
};

const toGeoLocation = (location: LocationData | undefined) => {
    if (!location?.gps_latitude || !location?.gps_longitude) return undefined;
    return {
        type: 'Point',
        coordinates: [Number(location.gps_longitude), Number(location.gps_latitude)]
    };
};

const calculateDistanceMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

type SpatialConstraint = {
    latitude: number;
    longitude: number;
    radiusMeters: number;
};

const extractSpatialConstraint = (request: BecknV2DiscoverRequest): SpatialConstraint | null => {
    type SpatialEntry = {
        geometry?: {
            type?: string;
            coordinates?: unknown;
        };
        distanceMeters?: number;
    };

    const spatialEntries = (request.message?.spatial ?? []) as SpatialEntry[];
    const constraint = spatialEntries.find(entry =>
        entry.geometry?.type === 'Point' &&
        Array.isArray(entry.geometry.coordinates) &&
        entry.geometry.coordinates.length >= 2 &&
        typeof entry.distanceMeters === 'number'
    );

    if (!constraint || !constraint.geometry || !Array.isArray(constraint.geometry.coordinates)) {
        return null;
    }

    const [longitude, latitude] = constraint.geometry.coordinates as [number, number];
    if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;

    return {
        latitude,
        longitude,
        radiusMeters: constraint.distanceMeters ?? 0
    };
};

type AttributeFilters = {
    connectorType?: string;
    minPowerKW?: number;
};

const extractAttributeFilters = (request: BecknV2DiscoverRequest): AttributeFilters => {
    const expression = request.message?.filters?.expression;
    if (!expression) return {};

    const connectorMatch = expression.match(/connectorType\s*==\s*'([^']+)'/);
    const minPowerMatch = expression.match(/maxPowerKW\s*>=\s*([0-9]+(\.[0-9]+)?)/);

    return {
        connectorType: connectorMatch ? connectorMatch[1] : undefined,
        minPowerKW: minPowerMatch ? Number(minPowerMatch[1]) : undefined
    };
};

const mapTariffModel = (components: ActiveTariff['price_components']): string => {
    const componentTypes = components.map(component => component.type);
    if (componentTypes.includes('ENERGY')) return 'PER_KWH';
    if (componentTypes.includes('TIME')) return 'PER_MINUTE';
    if (componentTypes.includes('SUBSCRIPTION')) return 'SUBSCRIPTION';
    return 'PER_KWH';
};

const sumPriceComponents = (
    components: ActiveTariff['price_components']
): number => components.reduce((acc, component) => acc + Number(component.price ?? 0), 0);

const buildPriceComponents = (
    components: ActiveTariff['price_components'],
    currency: string
) => components.map(component => {
    const mappedType = mapPriceComponentType(component.type);
    return {
        ...(mappedType ? { type: mappedType } : {}),
        value: Number(component.price ?? 0),
        currency,
        ...(component.type ? { description: component.type } : {}),
        ...(component.vat != null ? { vat: component.vat } : {}),
        ...(component.step_size != null ? { stepSize: component.step_size } : {})
    };
});

const buildOfferAttributes = (tariff: ActiveTariff) => ({
    '@context': CHARGING_OFFER_CONTEXT,
    '@type': 'ChargingOffer',
    tariffModel: mapTariffModel(tariff.price_components),
    priceSpecification: {
        currency: tariff.currency,
        components: tariff.price_components.map(component => ({
            type: component.type,
            price: component.price,
            vat: component.vat ?? null,
            stepSize: component.step_size ?? null
        }))
    }
});

const buildBecknOffer = (
    itemId: string,
    providerId: string,
    tariff: ActiveTariff
) : any => ({
    '@context': CORE_CONTEXT,
    '@type': 'beckn:Offer',
    'beckn:id': `${itemId}-offer`,
    'beckn:provider': providerId,
    'beckn:items': [itemId],
    'beckn:descriptor': {
        '@type': 'beckn:Descriptor',
        'schema:name': `Tariff ${tariff.id}`
    },
    'beckn:price': {
        currency: tariff.currency,
        value: sumPriceComponents(tariff.price_components),
        components: buildPriceComponents(tariff.price_components, tariff.currency)
    },
    'beckn:offerAttributes': buildOfferAttributes(tariff)
} as any);

const buildBecknItem = (
    item: CachedItem,
    location: LocationData | undefined,
    providerId: string,
    providerName?: string
) : any => {
    const maxPowerKW = computeMaxPowerKW(item);
    const connectorType = mapConnector(item.standard);
    const powerType = mapPowerType(item.power_type);
    const geo = toGeoLocation(location);
    const chargingSpeed = computeChargingSpeed(maxPowerKW);

    return {
        '@context': CORE_CONTEXT,
        '@type': 'beckn:Item',
        'beckn:id': item.id,
        'beckn:descriptor': {
            '@type': 'beckn:Descriptor',
            'schema:name': item.name ?? item.evse_uid ?? 'EV Charger',
            'beckn:shortDesc': `Connector ${connectorType}`
        },
        'beckn:provider': {
            'beckn:id': providerId,
            'beckn:descriptor': {
                '@type': 'beckn:Descriptor',
                'schema:name': providerName ?? providerId
            }
        },
        ...(geo
            ? {
                'beckn:availableAt': [
                    {
                        '@type': 'beckn:Location',
                        geo,
                        ...(location?.address_full
                            ? {
                                address: location.address_full
                            }
                            : {})
                    }
                ]
            }
            : {}),
        'beckn:isActive': true,
        'beckn:itemAttributes': {
            '@context': CHARGING_SERVICE_CONTEXT,
            '@type': 'ChargingService',
            connectorType,
            socketCount: 1,
            ...(maxPowerKW ? { maxPowerKW } : {}),
            ...(powerType ? { powerType } : {}),
            reservationSupported: false,
            ...(chargingSpeed ? { chargingSpeed } : {}),
            evseId: item.evse_uid,
            ...(geo
                ? {
                    serviceLocation: {
                        '@type': 'beckn:Location',
                        geo,
                        ...(location?.address_full
                            ? {
                                address: location.address_full
                            }
                            : {})
                    }
                }
                : {})
        }
    } as any;
};

type ProviderAggregation = {
    providerId: string;
    providerName?: string;
    location?: LocationData;
    items: CachedItem[];
};

const groupItemsByProvider = (
    items: CachedItem[],
    locationsById: Map<string, LocationData>
): ProviderAggregation[] => {
    const aggregations = new Map<string, ProviderAggregation>();

    for (const item of items) {
        const location = locationsById.get(item.location_id);
        const providerId = location?.provider_id ?? 'unknown-provider';
        const providerName = location?.provider_name ?? location?.name;

        if (!aggregations.has(providerId)) {
            aggregations.set(providerId, {
                providerId,
                providerName: providerName ?? providerId,
                location,
                items: []
            });
        }

        aggregations.get(providerId)!.items.push(item);
    }

    return Array.from(aggregations.values());
};

const filterItems = (
    items: CachedItem[],
    locationsById: Map<string, LocationData>,
    spatial: SpatialConstraint | null,
    filters: AttributeFilters
) =>
    items.filter(item => {
        const location = locationsById.get(item.location_id);

        if (spatial && location?.gps_latitude != null && location?.gps_longitude != null) {
            const distance = calculateDistanceMeters(
                spatial.latitude,
                spatial.longitude,
                Number(location.gps_latitude),
                Number(location.gps_longitude)
            );
            if (distance > spatial.radiusMeters) {
                return false;
            }
        }

        if (filters.connectorType) {
            const becknConnector = mapConnector(item.standard);
            if (becknConnector !== filters.connectorType) {
                return false;
            }
        }

        if (filters.minPowerKW) {
            const maxPowerKW = computeMaxPowerKW(item);
            if (!maxPowerKW || maxPowerKW < filters.minPowerKW) {
                return false;
            }
        }

        return true;
    });

const ensureResponse = (schema: z.ZodTypeAny, payload: unknown) => {
    try {
        return schema.parse(payload);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Beckn v2 payload validation failed`, error);
        throw error;
    }
};

export const createCatalogFromIntent = async (): Promise<null> => {
    throw new Error('Beckn v2 search/on_search is deprecated. Use discover/on_discover.');
};

export const createDiscoverCatalog = async (
    request: BecknV2DiscoverRequest
): Promise<BecknV2DiscoverResponse | null> => {
    const discoverRequest = BecknV2DiscoverRequestSchema.parse(request);

    const [locations, items, tariffs] = await Promise.all([
        getAllLocations(), // TODO: 
        getAllItems(),
        getAllTariffs()
    ]);

    const locationsById = new Map<string, LocationData>(
        locations.map(location => [location.id ?? '', location])
    );

    const tariffMap = new Map<string, CachedTariff>(
        tariffs.map(tariff => [tariff.id, tariff])
    );

    const spatialConstraint = extractSpatialConstraint(discoverRequest);
    const attributeFilters = extractAttributeFilters(discoverRequest);

    const filteredItems = filterItems(items, locationsById, spatialConstraint, attributeFilters);
    if (filteredItems.length === 0) {
        return null;
    }

    const groupedByProvider = groupItemsByProvider(filteredItems, locationsById);
    const catalogs: any[] = [];

    for (const group of groupedByProvider) {
        const catalogItems: any[] = [];
        const offers: any[] = [];

        for (const item of group.items) {
            const location = locationsById.get(item.location_id);
            const becknItem = buildBecknItem(item, location, group.providerId, group.providerName);
            catalogItems.push(becknItem);

            if (item.tariff_id) {
                const cachedTariff = tariffMap.get(item.tariff_id);
                let activeTariff: ActiveTariff | null = null;
                if (cachedTariff) {
                    activeTariff = {
                        id: cachedTariff.id,
                        currency: cachedTariff.currency,
                        start_date_time: cachedTariff.start_date_time,
                        end_date_time: cachedTariff.end_date_time,
                        country_code: cachedTariff.country_code,
                        price_components: cachedTariff.price_components.map((component, index) => ({
                            id: `${cachedTariff.id}-${index}`,
                            price: component.price,
                            type: component.type,
                            vat: component.vat ?? null,
                            step_size: component.step_size ?? null
                        }))
                    };
                } else {
                    activeTariff = await getActiveTariffWithComponents(item.tariff_id);
                }

                if (activeTariff) {
                    const offer = buildBecknOffer(item.id, group.providerId, activeTariff);
                    offers.push(offer);
                }
            }
        }

        const catalog = {
            '@context': CORE_CONTEXT,
            '@type': 'beckn:Catalog',
            'beckn:id': `catalog-${group.providerId}`,
            'beckn:descriptor': {
                '@type': 'beckn:Descriptor',
                'schema:name': group.providerName ?? group.providerId
            },
            'beckn:items': catalogItems,
            ...(offers.length ? { 'beckn:offers': offers } : {})
        } as any;

        catalogs.push(catalog);
    }

    const response: any = {
        context: {
            ...(discoverRequest.context as Record<string, unknown>),
            action: 'on_discover',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id,
            bpp_uri: appConfig.beckn.bpp_uri
        },
        message: {
            catalogs: catalogs as any
        }
    };

    return ensureResponse(BecknV2DiscoverResponseSchema, response) as BecknV2DiscoverResponse;
};

export const createOnSelectResponse = async (
    request: BecknV2SelectRequest | SelectRequest
): Promise<BecknV2OnSelectResponse> => {
    const parsed = BecknV2SelectRequestSchema.parse(request);
    const response: BecknV2OnSelectResponse = {
        context: {
            ...(parsed.context as Record<string, unknown>),
            action: 'on_select',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id,
            bpp_uri: appConfig.beckn.bpp_uri
        },
        message: {
            order: {
                ...parsed.message.order,
                'beckn:orderStatus': parsed.message.order['beckn:orderStatus'] ?? 'PENDING'
            }
        }
    };

    return ensureResponse(BecknV2OnSelectResponseSchema, response) as BecknV2OnSelectResponse;
};

export const createOnInitResponse = async (
    request: BecknV2InitRequest | InitReqBody
): Promise<BecknV2OnInitResponse> => {
    const parsed = BecknV2InitRequestSchema.parse(request);

    const response: BecknV2OnInitResponse = {
        context: {
            ...(parsed.context as Record<string, unknown>),
            action: 'on_init',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id,
            bpp_uri: appConfig.beckn.bpp_uri
        },
        message: {
            order: {
                ...parsed.message.order,
                'beckn:orderStatus': parsed.message.order['beckn:orderStatus'] ?? 'PENDING'
            }
        }
    };

    return ensureResponse(BecknV2OnInitResponseSchema, response) as BecknV2OnInitResponse;
};
