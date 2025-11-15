import { z } from "zod";
export declare const OcpiVersion: z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1";
}, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1";
}>;
export declare const OcpiVersions: z.ZodArray<z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1"]>;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1";
}, {
    url: string;
    version: "2.0" | "2.1" | "2.1.1";
}>, "many">;
export declare const OcpiModuleId: z.ZodEnum<["cdrs", "commands", "credentials", "locations", "sessions", "tariffs", "tokens"]>;
export declare const OcpiVersionDetails: z.ZodObject<{
    version: z.ZodEnum<["2.0", "2.1", "2.1.1"]>;
    endpoints: z.ZodArray<z.ZodObject<{
        identifier: z.ZodEnum<["cdrs", "commands", "credentials", "locations", "sessions", "tariffs", "tokens"]>;
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }, {
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    version: "2.0" | "2.1" | "2.1.1";
    endpoints: [{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }, ...{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }[]];
}, {
    version: "2.0" | "2.1" | "2.1.1";
    endpoints: [{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }, ...{
        url: string;
        identifier: "locations" | "tariffs" | "cdrs" | "commands" | "credentials" | "sessions" | "tokens";
    }[]];
}>;
//# sourceMappingURL=ocpi.version.d.ts.map