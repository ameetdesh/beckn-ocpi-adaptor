import { z } from "zod";
export declare const SessionStatus: z.ZodEnum<["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]>;
export declare const ProfileType: z.ZodEnum<["CHEAP", "FAST", "GREEN", "REGULAR"]>;
export declare const Session: z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    id: z.ZodString;
    start_date_time: z.ZodDate;
    end_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    kwh: z.ZodNumber;
    cdr_token: z.ZodObject<{
        uid: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>>>;
        contract_id: z.ZodString;
        country_code: z.ZodString;
        party_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }, {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }>;
    auth_method: z.ZodEnum<["AUTH_REQUEST", "COMMAND", "WHITELIST"]>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location_id: z.ZodString;
    evse_uid: z.ZodString;
    connector_id: z.ZodString;
    meter_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodString;
    charging_periods: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        start_date_time: z.ZodDate;
        dimensions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["CURRENT", "ENERGY", "ENERGY_EXPORT", "ENERGY_IMPORT", "MAX_CURRENT", "MIN_CURRENT", "MAX_POWER", "MIN_POWER", "PARKING_TIME", "POWER", "RESERVATION_TIME", "STATE_OF_CHARGE", "TIME"]>;
            volume: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, {
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }>, "atleastone">;
        tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }>, "many">>>;
    total_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    status: z.ZodEnum<["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "COMPLETED" | "RESERVATION" | "ACTIVE" | "INVALID";
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    kwh: number;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    evse_uid: string;
    connector_id: string;
    cdr_token: {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    location_id: string;
    end_date_time?: Date | null | undefined;
    meter_id?: string | null | undefined;
    charging_periods?: {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[] | null | undefined;
    total_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    authorization_reference?: string | null | undefined;
}, {
    status: "PENDING" | "COMPLETED" | "RESERVATION" | "ACTIVE" | "INVALID";
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    kwh: number;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    evse_uid: string;
    connector_id: string;
    cdr_token: {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    location_id: string;
    end_date_time?: Date | null | undefined;
    meter_id?: string | null | undefined;
    charging_periods?: {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[] | null | undefined;
    total_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    authorization_reference?: string | null | undefined;
}>;
export declare const Sessions: z.ZodArray<z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    id: z.ZodString;
    start_date_time: z.ZodDate;
    end_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    kwh: z.ZodNumber;
    cdr_token: z.ZodObject<{
        uid: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>>>;
        contract_id: z.ZodString;
        country_code: z.ZodString;
        party_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }, {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }>;
    auth_method: z.ZodEnum<["AUTH_REQUEST", "COMMAND", "WHITELIST"]>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location_id: z.ZodString;
    evse_uid: z.ZodString;
    connector_id: z.ZodString;
    meter_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodString;
    charging_periods: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        start_date_time: z.ZodDate;
        dimensions: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["CURRENT", "ENERGY", "ENERGY_EXPORT", "ENERGY_IMPORT", "MAX_CURRENT", "MIN_CURRENT", "MAX_POWER", "MIN_POWER", "PARKING_TIME", "POWER", "RESERVATION_TIME", "STATE_OF_CHARGE", "TIME"]>;
            volume: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, {
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }>, "atleastone">;
        tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }>, "many">>>;
    total_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    status: z.ZodEnum<["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "COMPLETED" | "RESERVATION" | "ACTIVE" | "INVALID";
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    kwh: number;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    evse_uid: string;
    connector_id: string;
    cdr_token: {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    location_id: string;
    end_date_time?: Date | null | undefined;
    meter_id?: string | null | undefined;
    charging_periods?: {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[] | null | undefined;
    total_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    authorization_reference?: string | null | undefined;
}, {
    status: "PENDING" | "COMPLETED" | "RESERVATION" | "ACTIVE" | "INVALID";
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    kwh: number;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    evse_uid: string;
    connector_id: string;
    cdr_token: {
        uid: string;
        country_code: string;
        party_id: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    location_id: string;
    end_date_time?: Date | null | undefined;
    meter_id?: string | null | undefined;
    charging_periods?: {
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[] | null | undefined;
    total_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    authorization_reference?: string | null | undefined;
}>, "many">;
//# sourceMappingURL=ocpi.sessions.v221.d.ts.map