"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcpiCredentials = exports.CredentialsRole = exports.Role = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
exports.Role = zod_1.z.enum([
    "CPO",
    "EMSP",
    "HUB",
    "NAP",
    "NSP",
    "OTHER",
    "SCSP"
]);
exports.CredentialsRole = zod_1.z.object({
    role: exports.Role,
    business_details: ocpi_common_1.BusinessDetails,
    party_id: zod_1.z.string().length(3),
    country_code: zod_1.z.string().length(2),
});
exports.OcpiCredentials = zod_1.z.object({
    token: zod_1.z.string().max(64),
    url: zod_1.z.string().url(),
    roles: zod_1.z.array(exports.CredentialsRole).nonempty()
});
//# sourceMappingURL=ocpi.credentials.v22.js.map