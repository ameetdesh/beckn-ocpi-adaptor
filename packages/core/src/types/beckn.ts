import { z } from 'zod';
import type { paths } from './beckn_ev_schema';

import ackSchemaV1 from './generated/beckn-v1/zod-Ack';
import catalogSchemaV1 from './generated/beckn-v1/zod-Catalog';
import contextSchemaV1 from './generated/beckn-v1/zod-Context';
import errorSchemaV1 from './generated/beckn-v1/zod-Error';
import fulfillmentSchemaV1 from './generated/beckn-v1/zod-Fulfillment';
import intentSchemaV1 from './generated/beckn-v1/zod-Intent';
import itemSchemaV1 from './generated/beckn-v1/zod-Item';
import locationSchemaV1 from './generated/beckn-v1/zod-Location';
import orderSchemaV1 from './generated/beckn-v1/zod-Order';
import quotationSchemaV1 from './generated/beckn-v1/zod-Quotation';

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
