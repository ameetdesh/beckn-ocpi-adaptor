"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tokens = exports.Token = exports.LocationReferences = void 0;
const zod_1 = require("zod");
const ocpi_common_v22_1 = require("./ocpi.common.v22");
const ocpi_sessions_v22_1 = require("./ocpi.sessions.v22");
const WhitelistType = zod_1.z.enum(["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]);
const EnergyContract = zod_1.z.object({
    supplier_name: zod_1.z.string().max(64),
    contract_id: zod_1.z.string().max(64).nullish(),
});
exports.LocationReferences = zod_1.z.object({
    location_id: zod_1.z.string().max(36).nullish(),
    evse_uids: zod_1.z.array(zod_1.z.string().max(36)).nullish(),
});
exports.Token = zod_1.z.object({
    country_code: zod_1.z.string().length(2),
    party_id: zod_1.z.string().max(3),
    uid: zod_1.z.string().max(36),
    type: ocpi_common_v22_1.TokenType,
    contract_id: zod_1.z.string().max(36),
    visual_number: zod_1.z.string().max(64).nullish(),
    issuer: zod_1.z.string().max(64),
    group_id: zod_1.z.string().max(36).nullish(),
    valid: zod_1.z.boolean(),
    whitelist: WhitelistType,
    language: zod_1.z.string().length(2).nullish(),
    default_profile_type: ocpi_sessions_v22_1.ProfileType.nullish(),
    energy_contract: EnergyContract.nullish(),
    last_updated: zod_1.z.date(),
});
exports.Tokens = zod_1.z.array(exports.Token);
//# sourceMappingURL=ocpi.tokens.v22.js.map