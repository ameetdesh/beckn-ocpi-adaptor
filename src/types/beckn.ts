import { z } from 'zod';
import type { paths, components } from "./beckn_ev_schema";

export type SearchReqBody =
  NonNullable<paths["/search"]["post"]["requestBody"]>["content"]["application/json"];


export type OnSearchReqBody =
  NonNullable<paths["/on_search"]["post"]["requestBody"]>["content"]["application/json"];

export type Location = components["schemas"]["Location"];


export type InitReqBody =
  NonNullable<paths["/init"]["post"]["requestBody"]>["content"]["application/json"];

export type OnInitReqBody =
  NonNullable<paths["/on_init"]["post"]["requestBody"]>["content"]["application/json"];


export type SearchRequest = {
    context: Context;
    message: {
        intent: {
            item: {
                descriptor: Descriptor;
            };
            fulfillment: {
                type: string;
                stops: Array<{
                    location: {
                        gps: string;
                        circle?: {
                            gps?: string;
                            radius?: {
                                value: string;
                                unit: string;
                            };
                        };
                    };
                }>;
            };
        };
    };
};

export type SelectRequest = {
    context: Context;
    message: {
        order: {
            provider: {
                id: string;
            };
            items: Array<{
                id: string;
                quantity: {
                    selected: {
                        measure: {
                            value: string;
                            unit: string;
                        };
                    };
                };
            }>;
            fulfillments: Array<{
                id: string;
                stops: Array<{
                    type: 'start' | 'finish';
                    time: {
                        timestamp: string;
                    };
                }>;
            }>;
        };
    };
}

const gpsLatitudeSchema = z.number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90");

const gpsLongitudeSchema = z.number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180");

// Radius unit validation
const radiusUnitSchema = z.enum(['m', 'km', 'meter', 'kilometer'], {
    errorMap: () => ({ message: "Unit must be one of: m, km, meter, kilometer" })
});

const radiusSchema = z.object({
    value: z.number().positive("Radius value must be a positive number"),
    unit: radiusUnitSchema
}).strict();

export const locationWithRadiusSchema = z.object({
    gps: z.tuple([gpsLatitudeSchema, gpsLongitudeSchema]),
    circle: z.object({
        radius: radiusSchema
    }).optional()
}).strict();

// On Search Response Type
export type OnSearchResponse = {
    context: Context;
    message: {
        catalog: {
            providers?: Array<{
                id: string;
                descriptor?: Descriptor;
                locations: Array<{
                    id?: string;
                    descriptor?: Descriptor;
                    gps?: string;
                    address?: Address;
                }>;
                items?: Array<Item>;
                fulfillments?: Array<{
                    id: string;
                    type: string;
                    stops: Array<{
                        location: {
                            gps: string;
                            address: Address;
                        };
                        time: {
                            range: TimeRange;
                        };
                    }>;
                }>;
            }>;
        };
    };
};

export type OnSelectResponse = {
    context: Context;
    message: {
        order: {
            provider: {
                id: string;
                descriptor?: Descriptor;
                locations: Array<{
                    id?: string;
                    descriptor?: Descriptor;
                    gps?: string;
                    address?: Address;
                }>;
            };
            items: Array<Item>;
            fulfillments?: Array<Fulfillment>;
            quote: Quote;
        }
    }
}

export type Quote = {
    price: Price;
    breakup: Array<{
        title?: string;
        item?: Item;
        price: Price;
    }>;
}

export type Item = {
    id?: string;
    descriptor?: Descriptor;
    tags?: Tag[];
    price?: Price;
    fulfillment_ids?: string[];
    location_ids?: string[];
    quantity?: {
        selected: {
            measure: {
                value: string;
                unit: string;
            };
        };
    }
};

type Descriptor = {
    name?: string;
    code?: string;
};

type Address = {
    full: string;
};

type Price = {
    currency: string;
    value: string;
};

type TimeRange = {
    start: string;
    end: string;
};

type TagList = Array<{
    descriptor: Descriptor;
    value: string;
}>;

type Tag = {
    descriptor: Descriptor;
    list: TagList;
};

export type SyncResponse = {
    message: {
        ack: Ack;
    },
    error?: Error
}

type Ack = {
    status: 'ACK' | 'NACK';
    tags?: Tag[];
};

type Error = {
    code: string;
    message: string;
    path?: string;
};

type Time = {
    label?: string;
    timestamp?: string; // RFC3339 format
    duration?: string; // ISO8601 format
    range?: {
        start?: string; // RFC3339 format
        end?: string; // RFC3339 format
    };
    days?: string; // comma separated values representing days of the week
    schedule?: Schedule;
};

type Schedule = {
    frequency?: string; // ISO8601 duration
    holidays?: string[]; // RFC3339 date-time strings
    times?: string[]; // RFC3339 date-time strings
};

type Provider = {
    id: string;
    descriptor?: Descriptor;
    locations: Array<{
        id?: string;
        descriptor?: Descriptor;
        gps?: string;
        address?: Address;
    }>;
}

export type Fulfillment = {
    id?: string;
    type?: "CHARGING";
    stops?: Array<{
        type?: "start" | "finish";
        location?: {
            gps?: string;
            address?: Address;
        };
        time?: {
            timestamp?: string; // RFC3339 date-time string
            range?: TimeRange;
        };
    }>;
};

export type Context = {
    domain?: string;
    location?: any; // Replace 'any' with a Location type if defined elsewhere
    action?: string;
    version?: string;
    bap_id?: string;
    bap_uri?: string;
    bpp_id?: string;
    bpp_uri?: string;
    transaction_id?: string;
    message_id?: string;
    timestamp?: string; // RFC3339 format
    key?: string;
    ttl?: string; // ISO8601 duration
};

