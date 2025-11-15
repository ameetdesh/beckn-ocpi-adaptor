"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcpiVersionDetails = exports.OcpiModuleId = exports.OcpiVersions = exports.OcpiVersion = void 0;
const zod_1 = require("zod");
const OcpiVersionNumber = zod_1.z.enum(["2.0", "2.1", "2.1.1"]);
exports.OcpiVersion = zod_1.z.object({
    version: OcpiVersionNumber,
    url: zod_1.z.string().url(),
});
exports.OcpiVersions = zod_1.z.array(exports.OcpiVersion);
exports.OcpiModuleId = zod_1.z.enum([
    "cdrs",
    "commands",
    "credentials",
    "locations",
    "sessions",
    "tariffs",
    "tokens",
]);
const OcpiEndpoint = zod_1.z.object({
    identifier: exports.OcpiModuleId,
    url: zod_1.z.string().url(),
});
exports.OcpiVersionDetails = zod_1.z.object({
    version: OcpiVersionNumber,
    endpoints: zod_1.z.array(OcpiEndpoint).nonempty(),
});
//# sourceMappingURL=ocpi.version.js.map