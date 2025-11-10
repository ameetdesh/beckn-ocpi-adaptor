import { z } from 'zod';

import DiscoverRequestSchema from './generated/beckn-v2/core/zod-DiscoverRequest';
import DiscoverResponseSchema from './generated/beckn-v2/core/zod-DiscoverResponse';
import TransactionContextSchema from './generated/beckn-v2/core/zod-TransactionContext';
import DiscoveryContextSchema from './generated/beckn-v2/core/zod-DiscoveryContext';
import OrderSchema from './generated/beckn-v2/core/zod-Order';
import ErrorSchema from './generated/beckn-v2/core/zod-Error';

export const BecknV2DiscoverRequestSchema = DiscoverRequestSchema;
export type BecknV2DiscoverRequest = z.infer<typeof BecknV2DiscoverRequestSchema>;

export const BecknV2DiscoverResponseSchema = DiscoverResponseSchema;
export type BecknV2DiscoverResponse = z.infer<typeof BecknV2DiscoverResponseSchema>;

const BaseContextSchema = TransactionContextSchema.or(DiscoveryContextSchema);

export const BecknV2SelectRequestSchema = z.object({
    context: BaseContextSchema,
    message: z.object({
        order: OrderSchema
    }).strict()
}).strict();
export type BecknV2SelectRequest = z.infer<typeof BecknV2SelectRequestSchema>;

export const BecknV2OnSelectResponseSchema = z.object({
    context: BaseContextSchema,
    message: z.object({
        order: OrderSchema
    }).strict(),
    error: ErrorSchema.optional()
}).strict();
export type BecknV2OnSelectResponse = z.infer<typeof BecknV2OnSelectResponseSchema>;

export const BecknV2InitRequestSchema = BecknV2SelectRequestSchema;
export type BecknV2InitRequest = z.infer<typeof BecknV2InitRequestSchema>;

export const BecknV2OnInitResponseSchema = BecknV2OnSelectResponseSchema;
export type BecknV2OnInitResponse = z.infer<typeof BecknV2OnInitResponseSchema>;
