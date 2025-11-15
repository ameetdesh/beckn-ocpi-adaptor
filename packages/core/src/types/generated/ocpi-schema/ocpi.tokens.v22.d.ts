import { z } from "zod";
export declare const LocationReferences: z.ZodObject<{
    location_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    evse_uids: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    location_id?: string | null | undefined;
    evse_uids?: string[] | null | undefined;
}, {
    location_id?: string | null | undefined;
    evse_uids?: string[] | null | undefined;
}>;
export declare const Token: z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    uid: z.ZodString;
    type: z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>;
    contract_id: z.ZodString;
    visual_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    issuer: z.ZodString;
    group_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    valid: z.ZodBoolean;
    whitelist: z.ZodEnum<["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]>;
    language: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    default_profile_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["CHEAP", "FAST", "GREEN", "REGULAR"]>>>;
    energy_contract: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        supplier_name: z.ZodString;
        contract_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        supplier_name: string;
        contract_id?: string | null | undefined;
    }, {
        supplier_name: string;
        contract_id?: string | null | undefined;
    }>>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    type: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    country_code: string;
    party_id: string;
    contract_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
    group_id?: string | null | undefined;
    default_profile_type?: "REGULAR" | "FAST" | "CHEAP" | "GREEN" | null | undefined;
    energy_contract?: {
        supplier_name: string;
        contract_id?: string | null | undefined;
    } | null | undefined;
}, {
    valid: boolean;
    type: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    country_code: string;
    party_id: string;
    contract_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
    group_id?: string | null | undefined;
    default_profile_type?: "REGULAR" | "FAST" | "CHEAP" | "GREEN" | null | undefined;
    energy_contract?: {
        supplier_name: string;
        contract_id?: string | null | undefined;
    } | null | undefined;
}>;
export declare const Tokens: z.ZodArray<z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    uid: z.ZodString;
    type: z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>;
    contract_id: z.ZodString;
    visual_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    issuer: z.ZodString;
    group_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    valid: z.ZodBoolean;
    whitelist: z.ZodEnum<["ALWAYS", "ALLOWED", "ALLOWED_OFFLINE", "NEVER"]>;
    language: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    default_profile_type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["CHEAP", "FAST", "GREEN", "REGULAR"]>>>;
    energy_contract: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        supplier_name: z.ZodString;
        contract_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        supplier_name: string;
        contract_id?: string | null | undefined;
    }, {
        supplier_name: string;
        contract_id?: string | null | undefined;
    }>>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    type: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    country_code: string;
    party_id: string;
    contract_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
    group_id?: string | null | undefined;
    default_profile_type?: "REGULAR" | "FAST" | "CHEAP" | "GREEN" | null | undefined;
    energy_contract?: {
        supplier_name: string;
        contract_id?: string | null | undefined;
    } | null | undefined;
}, {
    valid: boolean;
    type: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID";
    last_updated: Date;
    uid: string;
    issuer: string;
    country_code: string;
    party_id: string;
    contract_id: string;
    whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
    language?: string | null | undefined;
    visual_number?: string | null | undefined;
    group_id?: string | null | undefined;
    default_profile_type?: "REGULAR" | "FAST" | "CHEAP" | "GREEN" | null | undefined;
    energy_contract?: {
        supplier_name: string;
        contract_id?: string | null | undefined;
    } | null | undefined;
}>, "many">;
//# sourceMappingURL=ocpi.tokens.v22.d.ts.map