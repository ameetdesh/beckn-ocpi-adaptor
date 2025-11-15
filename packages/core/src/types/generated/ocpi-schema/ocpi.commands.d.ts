import { z } from "zod";
export declare const ReserveNowCommand: z.ZodObject<{
    response_url: z.ZodString;
    token: z.ZodObject<{
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
    expiry_date: z.ZodDate;
    reservation_id: z.ZodNumber;
    location_id: z.ZodString;
    evse_uid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    token: {
        valid: boolean;
        type: "OTHER" | "RFID";
        last_updated: Date;
        uid: string;
        issuer: string;
        auth_id: string;
        whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
        language?: string | null | undefined;
        visual_number?: string | null | undefined;
    };
    response_url: string;
    expiry_date: Date;
    reservation_id: number;
    location_id: string;
    evse_uid?: string | null | undefined;
}, {
    token: {
        valid: boolean;
        type: "OTHER" | "RFID";
        last_updated: Date;
        uid: string;
        issuer: string;
        auth_id: string;
        whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
        language?: string | null | undefined;
        visual_number?: string | null | undefined;
    };
    response_url: string;
    expiry_date: Date;
    reservation_id: number;
    location_id: string;
    evse_uid?: string | null | undefined;
}>;
export declare const StartSessionCommand: z.ZodObject<{
    response_url: z.ZodString;
    token: z.ZodObject<{
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
    location_id: z.ZodString;
    evse_uid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    token: {
        valid: boolean;
        type: "OTHER" | "RFID";
        last_updated: Date;
        uid: string;
        issuer: string;
        auth_id: string;
        whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
        language?: string | null | undefined;
        visual_number?: string | null | undefined;
    };
    response_url: string;
    location_id: string;
    evse_uid?: string | null | undefined;
}, {
    token: {
        valid: boolean;
        type: "OTHER" | "RFID";
        last_updated: Date;
        uid: string;
        issuer: string;
        auth_id: string;
        whitelist: "ALWAYS" | "ALLOWED" | "ALLOWED_OFFLINE" | "NEVER";
        language?: string | null | undefined;
        visual_number?: string | null | undefined;
    };
    response_url: string;
    location_id: string;
    evse_uid?: string | null | undefined;
}>;
export declare const StopSessionCommand: z.ZodObject<{
    response_url: z.ZodString;
    session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    session_id: string;
    response_url: string;
}, {
    session_id: string;
    response_url: string;
}>;
export declare const UnlockConnectorCommand: z.ZodObject<{
    response_url: z.ZodString;
    location_id: z.ZodString;
    evse_uid: z.ZodString;
    connector_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    evse_uid: string;
    connector_id: string;
    response_url: string;
    location_id: string;
}, {
    evse_uid: string;
    connector_id: string;
    response_url: string;
    location_id: string;
}>;
export declare const CommandResponse: z.ZodObject<{
    result: z.ZodEnum<["NOT_SUPPORTED", "REJECTED", "ACCEPTED", "TIMEOUT", "UNKNOWN_SESSION"]>;
}, "strip", z.ZodTypeAny, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "UNKNOWN_SESSION" | "TIMEOUT";
}, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "UNKNOWN_SESSION" | "TIMEOUT";
}>;
//# sourceMappingURL=ocpi.commands.d.ts.map