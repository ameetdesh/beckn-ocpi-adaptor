"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = exports.Token = void 0;
const zod_1 = require("zod");
const TokenType = zod_1.z.enum(["OTHER", "RFID"]);
const WhitelistType = zod_1.z.enum(["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]);
exports.Token = zod_1.z.object({
    uid: zod_1.z.string().max(36),
    type: TokenType,
    auth_id: zod_1.z.string().max(36),
    visual_number: zod_1.z.string().max(64).nullish(),
    issuer: zod_1.z.string().max(64),
    valid: zod_1.z.boolean(),
    whitelist: WhitelistType,
    language: zod_1.z.string().length(2).nullish(),
    last_updated: zod_1.z.date(),
});
exports.Tokens = zod_1.z.array(exports.Token);
//# sourceMappingURL=ocpi.tokens.js.map