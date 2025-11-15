import { z } from "zod";
export declare const OcpiVersion: z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1", "2.2.1"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
}, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
}>;
export declare const OcpiVersions: z.ZodArray<z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1", "2.2.1"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
}, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
}>, "many">;
export declare const OcpiModuleId: z.ZodEnum<["cdrs", "chargingprofiles", "commands", "credentials", "hubclientinfo", "locations", "sessions", "tariffs", "tokens"]>;
export declare const OcpiInterfaceRole: z.ZodEnum<["SENDER", "RECEIVER"]>;
export declare const OcpiVersionDetails: z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1", "2.2.1"]>;
    endpoints: z.ZodArray<z.ZodObject<{
        identifier: z.ZodEnum<["cdrs", "chargingprofiles", "commands", "credentials", "hubclientinfo", "locations", "sessions", "tariffs", "tokens"]>;
        role: z.ZodEnum<["SENDER", "RECEIVER"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }, {
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
    endpoints: [{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }, ...{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }[]];
}, {
    version: "2.0" | "2.1" | "2.1.1" | "2.2.1";
    endpoints: [{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }, ...{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens" | "chargingprofiles" | "hubclientinfo";
        role: "SENDER" | "RECEIVER";
    }[]];
}>;
//# sourceMappingURL=ocpi.versions.v221.d.ts.map