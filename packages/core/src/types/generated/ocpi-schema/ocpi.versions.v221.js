"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcpiVersionDetails = exports.OcpiInterfaceRole = exports.OcpiModuleId = exports.OcpiVersions = exports.OcpiVersion = void 0;
const zod_1 = require("zod");
const OcpiVersionNumber = zod_1.z.enum(["2.0", "2.1", "2.1.1", "2.2.1"]);
exports.OcpiVersion = zod_1.z.object({
    version: OcpiVersionNumber,
    url: zod_1.z.string().url(),
});
exports.OcpiVersions = zod_1.z.array(exports.OcpiVersion);
exports.OcpiModuleId = zod_1.z.enum([
    "cdrs",
    "chargingprofiles",
    "commands",
    "credentials",
    "hubclientinfo",
    "locations",
    "sessions",
    "tariffs",
    "tokens",
]);
exports.OcpiInterfaceRole = zod_1.z.enum([
    "SENDER",
    "RECEIVER"
]);
const OcpiEndpoint = zod_1.z.object({
    identifier: exports.OcpiModuleId,
    role: exports.OcpiInterfaceRole,
    url: zod_1.z.string().url(),
});
exports.OcpiVersionDetails = zod_1.z.object({
    version: OcpiVersionNumber,
    endpoints: zod_1.z.array(OcpiEndpoint).nonempty(),
});
//# sourceMappingURL=ocpi.versions.v221.js.map