"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcpiCredentials = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
exports.OcpiCredentials = zod_1.z.object({
    token: zod_1.z.string().max(64),
    url: zod_1.z.string().url(),
    business_details: ocpi_common_1.BusinessDetails,
    party_id: zod_1.z.string().length(3),
    country_code: zod_1.z.string().length(2),
});
//# sourceMappingURL=ocpi.credentials.js.map