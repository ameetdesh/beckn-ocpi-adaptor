import { ZodTypeAny } from "zod";
/**
 * Custom deepPartial implementation for OCPI
 * Based on https://github.com/colinhacks/zod/blob/f455e3284f7a5cbe11259477073b15256b946133/src/types.ts#L1421
 *
 * All properties are made optional AND nullable
 */
export declare const ocpiDeepPartial: (schema: ZodTypeAny) => any;
//# sourceMappingURL=ocpi.utils.d.ts.map