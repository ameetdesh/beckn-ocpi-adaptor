import { z } from "zod";
export declare const Token: z.ZodObject<{
    uid: z.ZodString;
    type: z.ZodEnum<["OTHER", "RFID"]>;
    auth_id: z.ZodString;
    visual_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    issuer: z.ZodString;
    valid: z.ZodBoolean;
    whitelist: z.ZodEnum<["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]>;
    language: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    type: "OTHER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    auth_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
}, {
    valid: boolean;
    type: "OTHER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    auth_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
}>;
export declare const Tokens: z.ZodArray<z.ZodObject<{
    uid: z.ZodString;
    type: z.ZodEnum<["OTHER", "RFID"]>;
    auth_id: z.ZodString;
    visual_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    issuer: z.ZodString;
    valid: z.ZodBoolean;
    whitelist: z.ZodEnum<["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]>;
    language: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    type: "OTHER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    auth_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
}, {
    valid: boolean;
    type: "OTHER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    auth_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
}>, "many">;
//# sourceMappingURL=ocpi.tokens.d.ts.map