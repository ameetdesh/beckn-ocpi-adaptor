"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcpiEmpty = exports.OcpiErrorResponse = exports.ocpiSuccessResponse = exports.BusinessDetails = exports.Image = exports.ImageCategory = exports.DisplayText = exports.GeoLocation = void 0;
const zod_1 = require("zod");
exports.GeoLocation = zod_1.z.object({
    latitude: zod_1.z
        .string()
        .max(10)
        .regex(/-?[0-9]{1,2}\.[0-9]{6}/),
    longitude: zod_1.z
        .string()
        .max(11)
        .regex(/-?[0-9]{1,3}\.[0-9]{6}/),
});
exports.DisplayText = zod_1.z.object({
    language: zod_1.z.string().length(2),
    text: zod_1.z.string().max(512),
});
exports.ImageCategory = zod_1.z.enum([
    "CHARGER",
    "ENTRANCE",
    "LOCATION",
    "NETWORK",
    "OPERATOR",
    "OTHER",
    "OWNER",
]);
exports.Image = zod_1.z.object({
    url: zod_1.z.string().url(),
    thumbnail: zod_1.z.string().url().nullish(),
    category: exports.ImageCategory,
    type: zod_1.z.string().max(4),
    width: zod_1.z.number().int().max(99999).nullish(),
    height: zod_1.z.number().int().max(99999).nullish(),
});
exports.BusinessDetails = zod_1.z.object({
    name: zod_1.z.string().max(100),
    website: zod_1.z.string().url().nullish(),
    logo: exports.Image.nullish(),
});
const ocpiSuccessResponse = (dataSchema) => zod_1.z.object({
    data: dataSchema,
    status_code: zod_1.z.number().int().min(1000).max(1999),
    status_message: zod_1.z.string().nullish(),
    timestamp: zod_1.z.date(),
});
exports.ocpiSuccessResponse = ocpiSuccessResponse;
exports.OcpiErrorResponse = zod_1.z.object({
    data: zod_1.z.any().nullish(),
    status_code: zod_1.z.number().int().min(2000).max(4999),
    status_message: zod_1.z.string().nullish(),
    timestamp: zod_1.z.date(),
});
exports.OcpiEmpty = zod_1.z.void();
//# sourceMappingURL=ocpi.common.js.map