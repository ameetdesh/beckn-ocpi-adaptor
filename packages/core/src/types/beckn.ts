import { z } from 'zod';
import type { paths } from './beckn_ev_schema';

// New spec generates different schema names - using new names with adapters where needed
import ackResponseSchemaV1 from './generated/beckn-v1/zod-AckResponse';
import catalogSchemaV1 from './generated/beckn-v1/zod-Catalog';
import discoveryContextSchemaV1 from './generated/beckn-v1/zod-DiscoveryContext';
import errorSchemaV1 from './generated/beckn-v1/zod-Error';
import itemSchemaV1 from './generated/beckn-v1/zod-Item';
import locationSchemaV1 from './generated/beckn-v1/zod-Location';

// Adapters: Extract base schemas from new structures
// AckResponse has { transaction_id, timestamp, ack_status, error? }
// But we need { status } for compatibility
const ackSchemaV1 = z.object({
    status: z.enum(['ACK', 'NACK']),
    tags: z.array(z.any()).optional(),
}).strict();

// DiscoveryContext is an intersection that includes base Context
// Extract just the base context part for compatibility
const contextSchemaV1 = discoveryContextSchemaV1;

// Missing schemas - create minimal ones based on usage
// These should ideally be generated from transaction.yaml once refs are fixed
const fulfillmentSchemaV1 = z.object({
    id: z.string().optional(),
    type: z.string().optional(),
    state: z.object({
        descriptor: z.object({
            code: z.string().optional(),
            name: z.string().optional(),
        }).optional(),
    }).optional(),
    tracking: z.boolean().optional(),
    agent: z.any().optional(),
    start: z.object({
        location: z.any().optional(),
        time: z.string().datetime({ offset: true }).optional(),
        instructions: z.any().optional(),
        contact: z.any().optional(),
    }).optional(),
    end: z.object({
        location: z.any().optional(),
        time: z.string().datetime({ offset: true }).optional(),
        instructions: z.any().optional(),
        contact: z.any().optional(),
    }).optional(),
    tags: z.array(z.any()).optional(),
}).catchall(z.any());

const intentSchemaV1 = z.object({
    descriptor: z.object({
        name: z.string().optional(),
        code: z.string().optional(),
        short_desc: z.string().optional(),
        long_desc: z.string().optional(),
    }).optional(),
    provider: z.object({
        id: z.string().optional(),
    }).optional(),
    fulfillment: fulfillmentSchemaV1.optional(),
    payment: z.object({
        uri: z.string().optional(),
        tl_method: z.string().optional(),
        params: z.record(z.any()).optional(),
        type: z.string().optional(),
        status: z.string().optional(),
    }).optional(),
    category: z.object({
        id: z.string().optional(),
    }).optional(),
    offer: z.object({
        id: z.string().optional(),
    }).optional(),
    item: z.object({
        id: z.string().optional(),
        quantity: z.object({
            count: z.number().optional(),
            measure: z.any().optional(),
        }).optional(),
    }).optional(),
    tags: z.array(z.any()).optional(),
}).catchall(z.any());

const orderSchemaV1 = z.object({
    id: z.string().optional(),
    state: z.string().optional(),
    items: z.array(z.any()).optional(),
    billing: z.any().optional(),
    fulfillment: z.array(fulfillmentSchemaV1).optional(),
    quote: z.any().optional(),
    payment: z.any().optional(),
    documents: z.array(z.any()).optional(),
    created_at: z.string().datetime({ offset: true }).optional(),
    updated_at: z.string().datetime({ offset: true }).optional(),
    tags: z.array(z.any()).optional(),
}).catchall(z.any());

const quotationSchemaV1 = z.object({
    price: z.object({
        currency: z.string().optional(),
        value: z.string().optional(),
        estimated_value: z.string().optional(),
        computed_value: z.string().optional(),
        listed_value: z.string().optional(),
        offered_value: z.string().optional(),
        minimum_value: z.string().optional(),
        maximum_value: z.string().optional(),
    }).optional(),
    breakup: z.array(z.object({
        title: z.string().optional(),
        price: z.any().optional(),
    })).optional(),
    ttl: z.string().optional(),
}).catchall(z.any());

export type SearchReqBody =
  NonNullable<paths['/search']['post']['requestBody']>['content']['application/json'];

export type OnSearchReqBody =
  NonNullable<paths['/on_search']['post']['requestBody']>['content']['application/json'];

export type InitReqBody =
  NonNullable<paths['/init']['post']['requestBody']>['content']['application/json'];

export type OnInitReqBody =
  NonNullable<paths['/on_init']['post']['requestBody']>['content']['application/json'];

export const LocationSchema = locationSchemaV1;
export type Location = z.infer<typeof LocationSchema>;

export const ContextSchema = contextSchemaV1;
export type Context = z.infer<typeof ContextSchema>;

export const CatalogSchema = catalogSchemaV1;
export type Catalog = z.infer<typeof CatalogSchema>;

export const ItemSchema = itemSchemaV1;
export type Item = z.infer<typeof ItemSchema>;

export const FulfillmentSchema = fulfillmentSchemaV1;
export type Fulfillment = z.infer<typeof FulfillmentSchema>;

export const QuoteSchema = quotationSchemaV1;
export type Quote = z.infer<typeof QuoteSchema>;

export const SearchRequestSchema: z.ZodTypeAny = z.object({
  context: ContextSchema,
  message: z.object({
    intent: intentSchemaV1.optional(),
  }).strict(),
}).strict();
export type SearchRequest = z.infer<typeof SearchRequestSchema>;

export const SelectRequestSchema: z.ZodTypeAny = z.object({
  context: ContextSchema,
  message: z.object({
    order: orderSchemaV1,
  }).strict(),
}).strict();
export type SelectRequest = z.infer<typeof SelectRequestSchema>;

const gpsLatitudeSchema = z.number()
  .min(-90, 'Latitude must be between -90 and 90')
  .max(90, 'Latitude must be between -90 and 90');

const gpsLongitudeSchema = z.number()
  .min(-180, 'Longitude must be between -180 and 180')
  .max(180, 'Longitude must be between -180 and 180');

const radiusUnitSchema = z.enum(['m', 'km', 'meter', 'kilometer'], {
  errorMap: () => ({ message: 'Unit must be one of: m, km, meter, kilometer' }),
});

const radiusSchema = z.object({
  value: z.number().positive('Radius value must be a positive number'),
  unit: radiusUnitSchema,
}).strict();

export const locationWithRadiusSchema = z.object({
  gps: z.tuple([gpsLatitudeSchema, gpsLongitudeSchema]),
  circle: z.object({
    radius: radiusSchema,
  }).optional(),
}).strict();

export const OnSearchResponseSchema = z.object({
  context: ContextSchema,
  message: z.object({
    catalog: CatalogSchema,
  }).strict(),
  error: errorSchemaV1.optional(),
}).strict();
export type OnSearchResponse = z.infer<typeof OnSearchResponseSchema>;

export const OnSelectResponseSchema: z.ZodTypeAny = z.object({
  context: ContextSchema,
  message: z.object({
    order: orderSchemaV1,
  }).strict(),
  error: errorSchemaV1.optional(),
}).strict();
export type OnSelectResponse = z.infer<typeof OnSelectResponseSchema>;

export const SyncResponseSchema = z.object({
  message: z.object({
    ack: ackSchemaV1,
  }).strict(),
  error: errorSchemaV1.optional(),
}).strict();
export type SyncResponse = z.infer<typeof SyncResponseSchema>;
