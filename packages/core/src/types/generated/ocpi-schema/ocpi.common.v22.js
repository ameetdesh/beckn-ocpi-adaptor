"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayText = exports.TokenType = exports.Price = void 0;
const zod_1 = require("zod");
exports.Price = zod_1.z.object({
    excl_vat: zod_1.z.number().nonnegative(),
    incl_vat: zod_1.z.number().nonnegative().nullish(),
});
exports.TokenType = zod_1.z.enum(["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]);
exports.DisplayText = zod_1.z.object({
    language: zod_1.z.string().length(2),
    text: zod_1.z.string().max(512),
});
//# sourceMappingURL=ocpi.common.v22.js.map