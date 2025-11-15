import { z } from "zod";
export declare const ClientInfo: z.ZodObject<{
    party_id: z.ZodString;
    country_code: z.ZodString;
    role: z.ZodEnum<["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"]>;
    status: z.ZodEnum<["CONNECTED", "OFFLINE", "PLANNED", "SUSPENDED"]>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "PLANNED" | "CONNECTED" | "OFFLINE" | "SUSPENDED";
    last_updated: Date;
    country_code: string;
    party_id: string;
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}, {
    status: "PLANNED" | "CONNECTED" | "OFFLINE" | "SUSPENDED";
    last_updated: Date;
    country_code: string;
    party_id: string;
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}>;
export declare const ClientInfos: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
    party_id: z.ZodString;
    country_code: z.ZodString;
    role: z.ZodEnum<["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"]>;
    status: z.ZodEnum<["CONNECTED", "OFFLINE", "PLANNED", "SUSPENDED"]>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "PLANNED" | "CONNECTED" | "OFFLINE" | "SUSPENDED";
    last_updated: Date;
    country_code: string;
    party_id: string;
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}, {
    status: "PLANNED" | "CONNECTED" | "OFFLINE" | "SUSPENDED";
    last_updated: Date;
    country_code: string;
    party_id: string;
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}>, "many">>>;
//# sourceMappingURL=ocpi.hubclientinfo.v221.d.ts.map