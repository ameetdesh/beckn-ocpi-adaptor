import { z } from "zod";
export declare const ReserveNowCommand: z.ZodObject<{
    response_url: z.ZodString;
    token: z.ZodObject<{
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
    expiry_date: z.ZodDate;
    reservation_id: z.ZodString;
    location_id: z.ZodString;
    evse_uid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    token: {
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
    };
    response_url: string;
    expiry_date: Date;
    reservation_id: string;
    location_id: string;
    evse_uid?: string | null | undefined;
    authorization_reference?: string | null | undefined;
}, {
    token: {
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
    };
    response_url: string;
    expiry_date: Date;
    reservation_id: string;
    location_id: string;
    evse_uid?: string | null | undefined;
    authorization_reference?: string | null | undefined;
}>;
export declare const CancelReservationCommand: z.ZodObject<{
    response_url: z.ZodString;
    reservation_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    response_url: string;
    reservation_id: string;
}, {
    response_url: string;
    reservation_id: string;
}>;
export declare const StartSessionCommand: z.ZodObject<{
    response_url: z.ZodString;
    token: z.ZodObject<{
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
    location_id: z.ZodString;
    evse_uid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    connector_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    token: {
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
    };
    response_url: string;
    location_id: string;
    evse_uid?: string | null | undefined;
    connector_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
}, {
    token: {
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
    };
    response_url: string;
    location_id: string;
    evse_uid?: string | null | undefined;
    connector_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
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
    result: z.ZodEnum<["NOT_SUPPORTED", "REJECTED", "ACCEPTED", "UNKNOWN_SESSION"]>;
    timeout: z.ZodNumber;
    message: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        language: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
        text: string;
    }, {
        language: string;
        text: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "UNKNOWN_SESSION";
    timeout: number;
    message?: {
        language: string;
        text: string;
    }[] | null | undefined;
}, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "UNKNOWN_SESSION";
    timeout: number;
    message?: {
        language: string;
        text: string;
    }[] | null | undefined;
}>;
export declare const CommandResult: z.ZodObject<{
    result: z.ZodEnum<["ACCEPTED", "CANCELED_RESERVATION", "EVSE_OCCUPIED", "EVSE_INOPERATIVE", "FAILED", "NOT_SUPPORTED", "REJECTED", "TIMEOUT", "UNKNOWN_RESERVATION"]>;
    message: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        language: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
        text: string;
    }, {
        language: string;
        text: string;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "TIMEOUT" | "CANCELED_RESERVATION" | "EVSE_OCCUPIED" | "EVSE_INOPERATIVE" | "FAILED" | "UNKNOWN_RESERVATION";
    message?: {
        language: string;
        text: string;
    }[] | null | undefined;
}, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "TIMEOUT" | "CANCELED_RESERVATION" | "EVSE_OCCUPIED" | "EVSE_INOPERATIVE" | "FAILED" | "UNKNOWN_RESERVATION";
    message?: {
        language: string;
        text: string;
    }[] | null | undefined;
}>;
//# sourceMappingURL=ocpi.commands.v221.d.ts.map