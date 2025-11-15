import type { OnSearchResponse, SelectRequest, Context, Item, OnSelectResponse, SearchReqBody, InitReqBody, OnInitReqBody, Quote, Fulfillment } from '../../types/beckn';
import { locationWithRadiusSchema } from '../../types/beckn';
import { error_messages } from '../error_codes';
import { item_mapping } from '../../models/mappings/item.jsonata';
import { fulfillment_mapping } from '../../models/mappings/fulfillment.jsonata';
import { provider_mapping } from '../../models/mappings/provider.jsonata';
import type { CachedItem } from '../../cache/ocpiCache';
import type { ActiveTariff } from '../db.utils';

// These will be injected via factory function
// For now, we'll use a global config object that gets set by the factory
let injectedDBUtils: ReturnType<typeof import('../db.utils').createDBUtils> | null = null;
let injectedOCPIUtils: { checkEVSEStatus: (locationId: string, evseUid: string, context?: any) => Promise<any> } | null = null;
let injectedConfig: {
    app: {
        discovery: { default_radius_meters: number; share_location_details: boolean };
        defaults: { item_name: string };
    };
    beckn: { bpp_id: string; bpp_uri: string; protocol_server_url: string };
} | null = null;

export const setV1UtilsDependencies = (deps: {
    dbUtils: ReturnType<typeof import('../db.utils').createDBUtils>;
    ocpiUtils: { checkEVSEStatus: (locationId: string, evseUid: string, context?: any) => Promise<any> };
    config: {
        app: {
            discovery: { default_radius_meters: number; share_location_details: boolean };
            defaults: { item_name: string };
        };
        beckn: { bpp_id: string; bpp_uri: string; protocol_server_url: string };
    };
}) => {
    injectedDBUtils = deps.dbUtils;
    injectedOCPIUtils = deps.ocpiUtils;
    injectedConfig = deps.config;
};

const getDBUtils = () => {
    if (!injectedDBUtils) throw new Error('V1 utils dependencies not set. Call setV1UtilsDependencies first.');
    return injectedDBUtils;
};

const getOCPIUtils = () => {
    if (!injectedOCPIUtils) throw new Error('V1 utils dependencies not set. Call setV1UtilsDependencies first.');
    return injectedOCPIUtils;
};

const appConfig = new Proxy({} as any, {
    get: (_target, prop) => {
        if (!injectedConfig) throw new Error('V1 utils config not set. Call setV1UtilsDependencies first.');
        return (injectedConfig as any)[prop];
    }
});

const getOcpiSnapshot = () => getDBUtils().getOcpiSnapshot();
const getItemById = (id: string | number) => getDBUtils().getItemById(id);
const getLocationById = (id: string) => getDBUtils().getLocationById(id);
const getActiveTariffWithComponents = (id: string) => getDBUtils().getActiveTariffWithComponents(id);
const checkEVSEStatus = (locationId: string, evseUid: string, context?: any) => getOCPIUtils().checkEVSEStatus(locationId, evseUid, context);


//function to find distance between 2 gps coordinates using haversine formula
//TODO: replace with postGIS to filter directly via DB query
const findDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}



const validateIntentLocation = (searchRequest: SearchReqBody) => {
    const intentCircle = searchRequest.message.intent?.fulfillment?.stops?.[0]?.location?.circle;
    const intentLocationParser = locationWithRadiusSchema.safeParse({
        gps: [Number(searchRequest.message.intent?.fulfillment?.stops?.[0]?.location?.gps?.split(',')[0]), Number(searchRequest.message.intent?.fulfillment?.stops?.[0]?.location?.gps?.split(',')[1])],
        circle: {
            radius: {
                value: Number(intentCircle?.radius?.value),
                unit: intentCircle?.radius?.unit
            }
        }
    });

    if (!intentLocationParser.success) {
        const errorMessages = intentLocationParser.error.errors.map((err: any) => err.message).join(', ');
        console.log(`[${new Date().toISOString()}] Invalid intent location`, errorMessages);
        return null;
    }
    const intentLocationValid = intentLocationParser.data;
    return intentLocationValid;
}

const convertToMeters = (radius: number, unit: string) => {
    return (unit.toLowerCase() === 'km' || unit.toLowerCase() === 'kilometer')
        ? Number(radius) * 1000     //convert km to meters
        : Number(radius);           //Assume meters
}

const resolveItemIdentifier = (rawId: string): string => rawId;

export const createCatalogFromIntent = async (searchRequest: SearchReqBody) => {
    const snapshot = await getOcpiSnapshot();
    const locations = snapshot.locations;

    let intentRadiusDefault = appConfig.app.discovery.default_radius_meters;

    const intentLocation = validateIntentLocation(searchRequest);

    if (!intentLocation) return null;

    const intentLatitude = intentLocation.gps[0];
    const intentLongitude = intentLocation.gps[1];

    const intentRadiusMeters = (intentLocation?.circle?.radius?.value) ? convertToMeters(Number(intentLocation?.circle?.radius?.value), intentLocation?.circle?.radius?.unit) : intentRadiusDefault;

    //filter locations based on radius
    const filteredLocations = locations.filter((location) => {
        if (location.gps_latitude === undefined || location.gps_longitude === undefined) {
            return false;
        }
        const distance = findDistance(intentLatitude, intentLongitude, location.gps_latitude, location.gps_longitude);
        return distance <= intentRadiusMeters;
    });
    console.log(`[${new Date().toISOString()}] Locations within radius(${intentRadiusMeters}m)`, filteredLocations.length);

    const filteredLocationIds = new Set(filteredLocations.map(location => location.id));
    const filteredItems = snapshot.items.filter(item => filteredLocationIds.has(item.location_id));
    console.log(`[${new Date().toISOString()}] Items within radius(${intentRadiusMeters}m)`, filteredItems.length);

    const transformLocations = (locations: any[]) => {
        return locations.map(location => {
            return {
                id: `${location.provider_id}-${location.id}`, // A generated ID, created by combining the provider_id and the location's own id.
                name: location.provider_name,
                location_id: location.id
            };
        });
    };

    const uniqueProviders = transformLocations(filteredLocations);

    const catalogProviders = [];
    const catalogLocations = filteredLocations.map((location) => {
        return {
            id: location.id,
            descriptor: {
                name: location.name,
            },
            ...(appConfig.app.discovery.share_location_details ? {
                gps: `${location.gps_latitude},${location.gps_longitude}`,
                address: location.address_full
            } : {})
        };
    });

    const catalogItems = (await Promise.all(filteredItems.map(async (item) => {
        const tariffId = item.tariff_id ?? '';
        if (!tariffId) return null;
        const tariff = await getActiveTariffWithComponents(tariffId);
        let price = tariff ? calculatePriceFromTariff(tariff) : 0;
        if (price === 0) return null;
        const current_item_beckn = await item_mapping.evaluate(item);
        if(current_item_beckn.descriptor.name === '') {
            current_item_beckn.descriptor.name = appConfig.app.defaults.item_name;
        }
        current_item_beckn.price.value = String(price.toFixed(2));
        return current_item_beckn;
    }))).filter((item): item is NonNullable<typeof item> => item !== null);

    for (const provider of uniqueProviders) {
        const providerLocations = catalogLocations.filter((location) => location.id === provider.location_id);
        const providerItems = catalogItems?.filter((item) => item?.location_ids.includes(provider.location_id));

        if (providerItems.length === 0) continue;

        catalogProviders.push({
            id: provider.id,
            descriptor: {
                name: provider.name,
            },
            locations: providerLocations,
            items: providerItems,
        });
    }

    if (catalogProviders.length === 0) return null;

    const response: OnSearchResponse = {
        context: {
            ...searchRequest.context,
            action: 'on_search',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id, // Your BPP ID
            bpp_uri: appConfig.beckn.bpp_uri // Your BPP URI
        },
        message: {
            catalog: {
                providers: catalogProviders || []
            }
        }
    };

    return response;
}

const createBecknItem = async (item: CachedItem, tariff: ActiveTariff) => {
    const current_item_beckn = await item_mapping.evaluate(item);
    if(current_item_beckn.descriptor.name === '') {
        current_item_beckn.descriptor.name = appConfig.app.defaults.item_name;
    }
    current_item_beckn.price.value = String(calculatePriceFromTariff(tariff).toFixed(2));
    return current_item_beckn;
}

const addQuotes = (quotes: Quote[]): Quote => {
    const quote_breakups: NonNullable<Quote['breakup']> = [];
    let total = 0;
    for (const quote of quotes) {
        total += Number(quote.price?.value ?? 0);
        quote_breakups.push(...(quote.breakup ?? []));
    }
    return {
        price: {
            currency: 'INR/kWh',
            value: total.toFixed(2)
        },
        breakup: quote_breakups
    } as Quote;
}

const getStartAndEndTimeStamp = (fulfillment: Fulfillment) => {
    let startTimestamp: string = "";
    let endTimestamp: string = "";
    if (!fulfillment.stops) return { startTimestamp, endTimestamp };
    for (const stop of fulfillment.stops) {
        const stopType = stop.type?.toLowerCase();
        if (stopType === 'start' && stop.time?.timestamp) {
            startTimestamp = stop.time.timestamp;
        } else if (stopType === 'finish' && stop.time?.timestamp) {
            endTimestamp = stop.time.timestamp;
        }
    } 
    return { startTimestamp, endTimestamp };
}

const getChargingOptions = (item: any) => {
    const charging_options = item.tags?.find((tag: { descriptor: { code: string; }; }) => tag.descriptor.code === 'charging-options');

    if (!charging_options || !charging_options.list) {
        console.log(`[${new Date().toISOString()}] Charging options not found`);
        return { charging_by: undefined, charging_limit: undefined };
    }

    const charging_by = charging_options.list.find((list: { descriptor: { code: string; }; }) => list.descriptor.code === 'charging-by');
    const charging_limit = charging_options.list.find((list: { descriptor: { code: string; }; }) => list.descriptor.code === 'charging-limit');
    console.log(`[${new Date().toISOString()}] Charging By: ${charging_by?.value}`);
    console.log(`[${new Date().toISOString()}] Charging Limit: ${charging_limit?.value}`);
    return { charging_by, charging_limit };
}

const createItemObject = async (item_details: CachedItem, tariffOverride?: ActiveTariff | null) => {
    if (!item_details.tariff_id) return null;
    let tariff = tariffOverride ?? null;

    if (!tariff && item_details.tariff_id) {
        tariff = await getActiveTariffWithComponents(item_details.tariff_id);
    }

    if (!tariff) return null;

    const current_item_beckn = await item_mapping.evaluate(item_details);
    if(current_item_beckn.descriptor.name === '') {
        current_item_beckn.descriptor.name = appConfig.app.defaults.item_name;
    }
    current_item_beckn.price.value = String(calculatePriceFromTariff(tariff).toFixed(2));
    return current_item_beckn;
}

export const createOnInitResponse = async (initRequest: InitReqBody) => {
    const provider_id = initRequest.message.order.provider.id;
    const request_billing = initRequest.message.order.billing;
    const request_item = initRequest.message.order.items[0];
    const fulfillment = initRequest.message.order.fulfillments[0];
    const request_units_selected = Number(initRequest.message.order.items[0].quantity?.selected?.measure?.value) || undefined;

    console.log(`[${new Date().toISOString()}] Units Selected: ${request_units_selected}`);

    if (!request_item.id) {
        return createErrorResponse(initRequest.context, '30004');
    }
    const item_details = await getItemById(resolveItemIdentifier(String(request_item.id)));
    if (!item_details) {
        return createErrorResponse(initRequest.context, '30004');
    }
    if (!item_details.tariff_id) {
        return createErrorResponse(initRequest.context, '30004');
    }
    const tariff = await getActiveTariffWithComponents(item_details.tariff_id);
    if (!tariff) {
        return createErrorResponse(initRequest.context, '30004');
    }
    const evse_status = await checkEVSEStatus(item_details.location_id!, item_details.evse_uid!);
    if (evse_status !== 'AVAILABLE') {
        return createErrorResponse(initRequest.context, '40002');
    }

    const energy_price_component = tariff.price_components.find((component) => component.type === 'ENERGY');
    if (!energy_price_component) {
        return createErrorResponse(initRequest.context, '30004');
    }
    const energy_price = energy_price_component.price;

    const { charging_by, charging_limit } = getChargingOptions(request_item);

    var units_selected = 0;

    if (charging_by?.value && charging_limit?.value) {
        if (charging_by.value === 'AMOUNT') {   
            const amount = Number(charging_limit.value);
            units_selected = Number((amount / Number(energy_price)).toFixed(2));
        }
    } else {
        units_selected = request_units_selected || appConfig.app.discovery.standard_session_kwh;
    }

    console.log(`[${new Date().toISOString()}] Units Selected: ${units_selected}`); 

    
    const response_item = await createItemObject(item_details, tariff);
    if (!response_item) {
        return createErrorResponse(initRequest.context, '30004');
    }
    const response_quote = getQuote({ tariff, units_selected });
    if (!response_quote) {
        return createErrorResponse(initRequest.context, '30004');
    }

    const location_details = await getLocationById(item_details.location_id!);
    const response_provider = await provider_mapping.evaluate({
        provider_id,
        provider_name: location_details?.provider_name,
        location_id: location_details?.id,
        location_gps: appConfig.app.discovery.share_location_details ? `${location_details?.gps_latitude},${location_details?.gps_longitude}`: undefined,
        location_name: location_details?.name,
        location_address: appConfig.app.discovery.share_location_details ? location_details?.address_full : undefined
    });

    const onInitResponse: OnInitReqBody = {
        context: {
            ...initRequest.context,
            action: 'on_init',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id, // Your BPP ID
            bpp_uri: appConfig.beckn.bpp_uri // Your BPP URI
        },
        message: {
            order: {
                type: 'DEFAULT',
                provider: response_provider,
                quote: response_quote,
                items: [response_item],
                fulfillments: [fulfillment],
                billing: request_billing
            }
        }
    };
    return onInitResponse;
}

export const createOnSelectResponse = async (selectRequest: SelectRequest) => {

    const order = selectRequest.message?.order;
    if (!order || !order.provider?.id || !order.fulfillments?.length || !order.items?.length) {
        return createErrorResponse(selectRequest.context, '30004');
    }

    const provider_id = order.provider.id;

    const fulfillment = order.fulfillments[0];


    const all_quotes: Quote[] = [];
    const all_items: Item[] = [];
    var location_beckn;

    for (const current_item of order.items) {
        const item_id = current_item.id;
        const units_selected =
            Number(current_item.quantity?.selected?.measure?.value ?? 0) ||
            appConfig.app.discovery.standard_session_kwh;
        if (!item_id) {
            return createErrorResponse(selectRequest.context, '30004');
        }
        const item_details = await getItemById(resolveItemIdentifier(String(item_id)));
        if (!item_details) {
            return createErrorResponse(selectRequest.context, '30004');
        }
        if (!item_details.tariff_id) {
            return createErrorResponse(selectRequest.context, '30004');
        }
        const tariff = await getActiveTariffWithComponents(item_details.tariff_id);
        if (!tariff) {
            return createErrorResponse(selectRequest.context, '30004');
        }
        const evse_status = await checkEVSEStatus(item_details.location_id!, item_details.evse_uid!);
        if (evse_status !== 'AVAILABLE') {
            return createErrorResponse(selectRequest.context, '40002');
        }

        const location_details = await getLocationById(item_details.location_id);
        location_beckn = location_details;
        const generated_id = `${location_details?.provider_id}-${location_details?.id}`;
        if (generated_id != provider_id) {
            return createErrorResponse(selectRequest.context, '30001');
        }
        const current_quote_beckn = getQuote({ tariff, units_selected });
        const current_item_beckn = await createBecknItem(item_details, tariff);
        all_quotes.push(current_quote_beckn);
        all_items.push(current_item_beckn);
    }

    const { startTimestamp, endTimestamp } = getStartAndEndTimeStamp(fulfillment);

    const fulfillment_beckn = await fulfillment_mapping.evaluate({
        start_time: startTimestamp,
        end_time: endTimestamp,
        location_gps: appConfig.app.discovery.share_location_details ? `${location_beckn?.gps_latitude},${location_beckn?.gps_longitude}`: undefined,
        location_name: location_beckn?.name,
        location_address: appConfig.app.discovery.share_location_details ? location_beckn?.address_full : undefined
    }) as Fulfillment;

    const provider_beckn = await provider_mapping.evaluate({
        provider_id,
        provider_name: location_beckn?.provider_name,
        location_id: location_beckn?.id,
        location_gps: appConfig.app.discovery.share_location_details ? `${location_beckn?.gps_latitude},${location_beckn?.gps_longitude}`: undefined,
        location_name: location_beckn?.name,
        location_address: appConfig.app.discovery.share_location_details ? location_beckn?.address_full : undefined
    });

    const response: OnSelectResponse = {
        context: {
            ...selectRequest.context,
            action: 'on_select',
            timestamp: new Date().toISOString(),
            bpp_id: appConfig.beckn.bpp_id,  // Your BPP ID
            bpp_uri: appConfig.beckn.bpp_uri // Your BPP URI
        },
        message: {
            order: {
                type: 'DEFAULT',
                provider: provider_beckn,
                items: all_items,
                fulfillments: [fulfillment_beckn],
                quote: addQuotes(all_quotes)
            }
        }
    };
    return response;
}

const createErrorResponse = (context: Context, error_code: string, error_message?: string) => {
    return {
        context: {
            ...context,
            action: 'on_select',
            timestamp: new Date().toISOString()
        },
        error: {
            code: error_code,
            message: error_message || error_messages[error_code]
        }
    };
}

const calculatePriceFromTariff = (tariff: ActiveTariff) => {
    const priceComponents = tariff.price_components;
    const charging_price = Number(priceComponents.find((component) => component.type === 'ENERGY')?.price) || 0;
    const fixed_price = Number(priceComponents.find((component) => component.type === 'FIXED')?.price || 0);
    const price = charging_price + fixed_price;
    return price;
}

const getQuote = ({ tariff, units_selected }: { tariff: ActiveTariff, units_selected: number }): Quote => {
    const priceComponents = tariff.price_components;

    const breakupTitles: Record<string, string> = {
        "ENERGY": "Charging session cost in kWh",
        "ENERGY_VAT": "VAT for Charging session",
        "FLAT": "Flat Fee",
        "FLAT_VAT": "VAT for Flat Fee",
        "TIME": "Time",
        "TIME_VAT": "VAT for Time",
        "PARKING_TIME": "Parking Fees",
        "PARKING_TIME_VAT": "VAT for Parking Fees"
    }

    const createVATbreakup = (amount: number, component_type: string, vat: number) => {
        const vatBreakup = {
            title: `VAT for ${component_type} @ ${vat}%`,
            price: {
                value: String((amount * (vat / 100)).toFixed(2)),
                currency: "INR"
            }
        }
        return vatBreakup;
    }

    var breakup = [];
    var total_price = 0;

    for (const priceComponent of priceComponents) {
        const title = (priceComponent.type in breakupTitles) ?
            breakupTitles[priceComponent.type] :
            priceComponent.type;


        const price = (priceComponent.type === 'ENERGY') ?
            Number(priceComponent.price) * units_selected :
            Number(priceComponent.price);

        // Create breakup objects for each price component
        const breakupItem = {
            title: title,
            price: {
                value: String(price.toFixed(2)),
                currency: "INR"
            },
            ...(priceComponent.type === 'ENERGY') ?
                {
                    item: {
                        descriptor: {
                            name: "Estimated units consumed"
                        },
                        quantity: {
                            selected: {
                                measure: {
                                    value: String(units_selected),
                                    unit: "kWh"
                                }
                            }
                        }
                    }
                } : {}

        }
        total_price += price;
        breakup.push(breakupItem);
        const vatPercentage = priceComponent.vat ?? 0;
        if (vatPercentage > 0) {
            const vatBreakup = createVATbreakup(price, priceComponent.type, vatPercentage);
            total_price += Number(vatBreakup.price.value);
            breakup.push(vatBreakup);
        }
    }
    return {
        "price": {
            "value": String(total_price.toFixed(2)),
            "currency": "INR"
        },
        "breakup": breakup
    };
}
