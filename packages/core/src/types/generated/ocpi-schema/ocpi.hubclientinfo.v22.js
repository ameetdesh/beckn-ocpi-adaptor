"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInfos = exports.ClientInfo = void 0;
const zod_1 = require("zod");
const ocpi_credentials_v22_1 = require("./ocpi.credentials.v22");
const ConnectionStatus = zod_1.z.enum([
    "CONNECTED",
    "OFFLINE",
    "PLANNED",
    "SUSPENDED"
]);
exports.ClientInfo = zod_1.z.object({
    party_id: zod_1.z.string().max(3),
    country_code: zod_1.z.string().length(2),
    role: ocpi_credentials_v22_1.Role,
    status: ConnectionStatus,
    last_updated: zod_1.z.date(),
});
exports.ClientInfos = zod_1.z.array(exports.ClientInfo).nullish();
//# sourceMappingURL=ocpi.hubclientinfo.v22.js.map