"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ocpiDeepPartial = void 0;
const zod_1 = require("zod");
/**
 * Custom deepPartial implementation for OCPI
 * Based on https://github.com/colinhacks/zod/blob/f455e3284f7a5cbe11259477073b15256b946133/src/types.ts#L1421
 *
 * All properties are made optional AND nullable
 */
const ocpiDeepPartial = (schema) => {
    if (schema instanceof zod_1.ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = zod_1.ZodOptional.create((0, exports.ocpiDeepPartial)(fieldSchema)).nullable();
        }
        return new zod_1.ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof zod_1.ZodArray) {
        return zod_1.ZodArray.create((0, exports.ocpiDeepPartial)(schema.element));
    }
    else if (schema instanceof zod_1.ZodOptional) {
        return zod_1.ZodOptional.create((0, exports.ocpiDeepPartial)(schema.unwrap()));
    }
    else if (schema instanceof zod_1.ZodNullable) {
        return zod_1.ZodNullable.create((0, exports.ocpiDeepPartial)(schema.unwrap()));
    }
    else if (schema instanceof zod_1.ZodTuple) {
        return zod_1.ZodTuple.create(schema.items.map((item) => (0, exports.ocpiDeepPartial)(item)));
    }
    else {
        return schema;
    }
};
exports.ocpiDeepPartial = ocpiDeepPartial;
//# sourceMappingURL=ocpi.utils.js.map