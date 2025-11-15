import { z } from "zod";
export declare const AuthMethod: z.ZodEnum<["AUTH_REQUEST", "COMMAND", "WHITELIST"]>;
export declare const CdrDimension: z.ZodObject<{
    type: z.ZodEnum<["CURRENT", "ENERGY", "ENERGY_EXPORT", "ENERGY_IMPORT", "MAX_CURRENT", "MIN_CURRENT", "MAX_POWER", "MIN_POWER", "PARKING_TIME", "POWER", "RESERVATION_TIME", "STATE_OF_CHARGE", "TIME"]>;
    volume: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
    volume: number;
}, {
    type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
    volume: number;
}>;
export declare const CdrToken: z.ZodObject<{
    uid: z.ZodString;
    type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>>>;
    contract_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uid: string;
    contract_id: string;
    type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
}, {
    uid: string;
    contract_id: string;
    type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
}>;
export declare const CdrLocation: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodString;
    city: z.ZodString;
    postal_code: z.ZodString;
    country: z.ZodString;
    coordinates: z.ZodObject<{
        latitude: z.ZodString;
        longitude: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        latitude: string;
        longitude: string;
    }, {
        latitude: string;
        longitude: string;
    }>;
    evse_uid: z.ZodString;
    evse_id: z.ZodString;
    connector_id: z.ZodString;
    connector_standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "PANTOGRAPH_BOTTOM_UP", "PANTOGRAPH_TOP_DOWN", "TESLA_R", "TESLA_S"]>;
    connector_format: z.ZodEnum<["SOCKET", "CABLE"]>;
    connector_power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
}, "strip", z.ZodTypeAny, {
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    evse_id: string;
    postal_code: string;
    evse_uid: string;
    connector_id: string;
    connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
    connector_format: "SOCKET" | "CABLE";
    connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
    name?: string | null | undefined;
}, {
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    evse_id: string;
    postal_code: string;
    evse_uid: string;
    connector_id: string;
    connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
    connector_format: "SOCKET" | "CABLE";
    connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
    name?: string | null | undefined;
}>;
export declare const ChargingPeriod: z.ZodObject<{
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
}>;
export declare const SignedValue: z.ZodObject<{
    nature: z.ZodString;
    plain_data: z.ZodString;
    signed_data: z.ZodString;
}, "strip", z.ZodTypeAny, {
    nature: string;
    plain_data: string;
    signed_data: string;
}, {
    nature: string;
    plain_data: string;
    signed_data: string;
}>;
export declare const SignedData: z.ZodObject<{
    encoding_method: z.ZodString;
    encoding_method_version: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    public_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    signed_values: z.ZodArray<z.ZodObject<{
        nature: z.ZodString;
        plain_data: z.ZodString;
        signed_data: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        nature: string;
        plain_data: string;
        signed_data: string;
    }, {
        nature: string;
        plain_data: string;
        signed_data: string;
    }>, "atleastone">;
    url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    encoding_method: string;
    signed_values: [{
        nature: string;
        plain_data: string;
        signed_data: string;
    }, ...{
        nature: string;
        plain_data: string;
        signed_data: string;
    }[]];
    url?: string | null | undefined;
    encoding_method_version?: number | null | undefined;
    public_key?: string | null | undefined;
}, {
    encoding_method: string;
    signed_values: [{
        nature: string;
        plain_data: string;
        signed_data: string;
    }, ...{
        nature: string;
        plain_data: string;
        signed_data: string;
    }[]];
    url?: string | null | undefined;
    encoding_method_version?: number | null | undefined;
    public_key?: string | null | undefined;
}>;
export declare const Cdr: z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    id: z.ZodString;
    start_date_time: z.ZodDate;
    end_date_time: z.ZodDate;
    session_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cdr_token: z.ZodObject<{
        uid: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>>>;
        contract_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }, {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }>;
    auth_method: z.ZodEnum<["AUTH_REQUEST", "COMMAND", "WHITELIST"]>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cdr_location: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address: z.ZodString;
        city: z.ZodString;
        postal_code: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodObject<{
            latitude: z.ZodString;
            longitude: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            latitude: string;
            longitude: string;
        }, {
            latitude: string;
            longitude: string;
        }>;
        evse_uid: z.ZodString;
        evse_id: z.ZodString;
        connector_id: z.ZodString;
        connector_standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "PANTOGRAPH_BOTTOM_UP", "PANTOGRAPH_TOP_DOWN", "TESLA_R", "TESLA_S"]>;
        connector_format: z.ZodEnum<["SOCKET", "CABLE"]>;
        connector_power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    }, {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    }>;
    meter_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodString;
    tariffs: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        country_code: z.ZodString;
        party_id: z.ZodString;
        id: z.ZodString;
        currency: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_PAYMENT", "PROFILE_CHEAP", "PROFILE_FAST", "PROFILE_GREEN", "REGULAR"]>>>;
        tariff_alt_text: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>, "many">>>;
        tariff_alt_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        min_price: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            excl_vat: z.ZodNumber;
            incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }>>>;
        max_price: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            excl_vat: z.ZodNumber;
            incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }>>>;
        elements: z.ZodArray<z.ZodObject<{
            price_components: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["ENERGY", "FLAT", "PARKING_TIME", "TIME"]>;
                price: z.ZodNumber;
                vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                step_size: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, {
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }>, "atleastone">;
            restrictions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                start_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                end_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                start_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                end_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                min_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_current: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_current: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                day_of_week: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]>, "many">>>;
                reservation: z.ZodOptional<z.ZodNullable<z.ZodEnum<["RESERVATION", "RESERVATION_EXPIRES"]>>>;
            }, "strip", z.ZodTypeAny, {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            }, {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, {
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }>, "atleastone">;
        start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        end_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        energy_mix: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            is_green_energy: z.ZodBoolean;
            energy_sources: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                source: z.ZodEnum<["NUCLEAR", "GENERAL_FOSSIL", "COAL", "GAS", "GENERAL_GREEN", "SOLAR", "WIND", "WATER"]>;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }, {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }>, "many">>>;
            environ_impact: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                source: z.ZodEnum<["NUCLEAR_WASTE", "CARBON_DIOXIDE"]>;
                amount: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }, {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }>, "many">>>;
            supplier_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            energy_product_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        }, {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        }>>>;
        last_updated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }, {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }>, "many">>>;
    charging_periods: z.ZodArray<z.ZodObject<{
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
    }>, "atleastone">;
    signed_data: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        encoding_method: z.ZodString;
        encoding_method_version: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        public_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        signed_values: z.ZodArray<z.ZodObject<{
            nature: z.ZodString;
            plain_data: z.ZodString;
            signed_data: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            nature: string;
            plain_data: string;
            signed_data: string;
        }, {
            nature: string;
            plain_data: string;
            signed_data: string;
        }>, "atleastone">;
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    }, {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    }>>>;
    total_cost: z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>;
    total_fixed_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_energy: z.ZodNumber;
    total_energy_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_time: z.ZodNumber;
    total_time_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_parking_time: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    total_parking_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_reservation_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    remark: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    invoice_reference_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    credit: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    credit_reference_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    end_date_time: Date;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    charging_periods: [{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, ...{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[]];
    total_cost: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    };
    total_energy: number;
    total_time: number;
    cdr_token: {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    cdr_location: {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    };
    meter_id?: string | null | undefined;
    tariffs?: {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }[] | null | undefined;
    total_parking_time?: number | null | undefined;
    remark?: string | null | undefined;
    signed_data?: {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    } | null | undefined;
    session_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
    total_fixed_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_energy_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_time_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_parking_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_reservation_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    invoice_reference_id?: string | null | undefined;
    credit?: boolean | null | undefined;
    credit_reference_id?: string | null | undefined;
}, {
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    end_date_time: Date;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    charging_periods: [{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, ...{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[]];
    total_cost: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    };
    total_energy: number;
    total_time: number;
    cdr_token: {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    cdr_location: {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    };
    meter_id?: string | null | undefined;
    tariffs?: {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }[] | null | undefined;
    total_parking_time?: number | null | undefined;
    remark?: string | null | undefined;
    signed_data?: {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    } | null | undefined;
    session_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
    total_fixed_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_energy_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_time_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_parking_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_reservation_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    invoice_reference_id?: string | null | undefined;
    credit?: boolean | null | undefined;
    credit_reference_id?: string | null | undefined;
}>;
export declare const Cdrs: z.ZodArray<z.ZodObject<{
    country_code: z.ZodString;
    party_id: z.ZodString;
    id: z.ZodString;
    start_date_time: z.ZodDate;
    end_date_time: z.ZodDate;
    session_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cdr_token: z.ZodObject<{
        uid: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>>>;
        contract_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }, {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    }>;
    auth_method: z.ZodEnum<["AUTH_REQUEST", "COMMAND", "WHITELIST"]>;
    authorization_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cdr_location: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address: z.ZodString;
        city: z.ZodString;
        postal_code: z.ZodString;
        country: z.ZodString;
        coordinates: z.ZodObject<{
            latitude: z.ZodString;
            longitude: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            latitude: string;
            longitude: string;
        }, {
            latitude: string;
            longitude: string;
        }>;
        evse_uid: z.ZodString;
        evse_id: z.ZodString;
        connector_id: z.ZodString;
        connector_standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "PANTOGRAPH_BOTTOM_UP", "PANTOGRAPH_TOP_DOWN", "TESLA_R", "TESLA_S"]>;
        connector_format: z.ZodEnum<["SOCKET", "CABLE"]>;
        connector_power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    }, {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    }>;
    meter_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodString;
    tariffs: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        country_code: z.ZodString;
        party_id: z.ZodString;
        id: z.ZodString;
        currency: z.ZodString;
        type: z.ZodOptional<z.ZodNullable<z.ZodEnum<["AD_HOC_PAYMENT", "PROFILE_CHEAP", "PROFILE_FAST", "PROFILE_GREEN", "REGULAR"]>>>;
        tariff_alt_text: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>, "many">>>;
        tariff_alt_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        min_price: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            excl_vat: z.ZodNumber;
            incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }>>>;
        max_price: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            excl_vat: z.ZodNumber;
            incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }, {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        }>>>;
        elements: z.ZodArray<z.ZodObject<{
            price_components: z.ZodArray<z.ZodObject<{
                type: z.ZodEnum<["ENERGY", "FLAT", "PARKING_TIME", "TIME"]>;
                price: z.ZodNumber;
                vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                step_size: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, {
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }>, "atleastone">;
            restrictions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                start_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                end_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                start_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                end_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                min_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_current: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_current: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                min_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                max_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                day_of_week: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]>, "many">>>;
                reservation: z.ZodOptional<z.ZodNullable<z.ZodEnum<["RESERVATION", "RESERVATION_EXPIRES"]>>>;
            }, "strip", z.ZodTypeAny, {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            }, {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, {
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }>, "atleastone">;
        start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        end_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        energy_mix: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            is_green_energy: z.ZodBoolean;
            energy_sources: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                source: z.ZodEnum<["NUCLEAR", "GENERAL_FOSSIL", "COAL", "GAS", "GENERAL_GREEN", "SOLAR", "WIND", "WATER"]>;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }, {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }>, "many">>>;
            environ_impact: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                source: z.ZodEnum<["NUCLEAR_WASTE", "CARBON_DIOXIDE"]>;
                amount: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }, {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }>, "many">>>;
            supplier_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            energy_product_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        }, {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        }>>>;
        last_updated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }, {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }>, "many">>>;
    charging_periods: z.ZodArray<z.ZodObject<{
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
    }>, "atleastone">;
    signed_data: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        encoding_method: z.ZodString;
        encoding_method_version: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        public_key: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        signed_values: z.ZodArray<z.ZodObject<{
            nature: z.ZodString;
            plain_data: z.ZodString;
            signed_data: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            nature: string;
            plain_data: string;
            signed_data: string;
        }, {
            nature: string;
            plain_data: string;
            signed_data: string;
        }>, "atleastone">;
        url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    }, {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    }>>>;
    total_cost: z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>;
    total_fixed_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_energy: z.ZodNumber;
    total_energy_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_time: z.ZodNumber;
    total_time_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_parking_time: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    total_parking_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    total_reservation_cost: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        excl_vat: z.ZodNumber;
        incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }, {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    }>>>;
    remark: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    invoice_reference_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    credit: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    credit_reference_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    end_date_time: Date;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    charging_periods: [{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, ...{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[]];
    total_cost: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    };
    total_energy: number;
    total_time: number;
    cdr_token: {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    cdr_location: {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    };
    meter_id?: string | null | undefined;
    tariffs?: {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }[] | null | undefined;
    total_parking_time?: number | null | undefined;
    remark?: string | null | undefined;
    signed_data?: {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    } | null | undefined;
    session_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
    total_fixed_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_energy_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_time_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_parking_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_reservation_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    invoice_reference_id?: string | null | undefined;
    credit?: boolean | null | undefined;
    credit_reference_id?: string | null | undefined;
}, {
    id: string;
    currency: string;
    last_updated: Date;
    country_code: string;
    party_id: string;
    start_date_time: Date;
    end_date_time: Date;
    auth_method: "AUTH_REQUEST" | "WHITELIST" | "COMMAND";
    charging_periods: [{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }, ...{
        start_date_time: Date;
        dimensions: [{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }, ...{
            type: "ENERGY" | "PARKING_TIME" | "TIME" | "MAX_CURRENT" | "MIN_CURRENT" | "CURRENT" | "ENERGY_EXPORT" | "ENERGY_IMPORT" | "MAX_POWER" | "MIN_POWER" | "POWER" | "RESERVATION_TIME" | "STATE_OF_CHARGE";
            volume: number;
        }[]];
        tariff_id?: string | null | undefined;
    }[]];
    total_cost: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    };
    total_energy: number;
    total_time: number;
    cdr_token: {
        uid: string;
        contract_id: string;
        type?: "OTHER" | "AD_HOC_USER" | "APP_USER" | "RFID" | null | undefined;
    };
    cdr_location: {
        address: string;
        city: string;
        id: string;
        country: string;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        evse_id: string;
        postal_code: string;
        evse_uid: string;
        connector_id: string;
        connector_standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "PANTOGRAPH_BOTTOM_UP" | "PANTOGRAPH_TOP_DOWN" | "TESLA_R" | "TESLA_S";
        connector_format: "SOCKET" | "CABLE";
        connector_power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        name?: string | null | undefined;
    };
    meter_id?: string | null | undefined;
    tariffs?: {
        id: string;
        currency: string;
        last_updated: Date;
        country_code: string;
        party_id: string;
        elements: [{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }, ...{
            price_components: [{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }, ...{
                type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
                price: number;
                step_size: number;
                vat?: number | null | undefined;
            }[]];
            restrictions?: {
                start_time?: string | null | undefined;
                end_time?: string | null | undefined;
                start_date?: string | null | undefined;
                end_date?: string | null | undefined;
                min_kwh?: number | null | undefined;
                max_kwh?: number | null | undefined;
                min_current?: number | null | undefined;
                max_current?: number | null | undefined;
                min_power?: number | null | undefined;
                max_power?: number | null | undefined;
                min_duration?: number | null | undefined;
                max_duration?: number | null | undefined;
                day_of_week?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] | null | undefined;
                reservation?: "RESERVATION" | "RESERVATION_EXPIRES" | null | undefined;
            } | null | undefined;
        }[]];
        type?: "AD_HOC_PAYMENT" | "PROFILE_CHEAP" | "PROFILE_FAST" | "PROFILE_GREEN" | "REGULAR" | null | undefined;
        energy_mix?: {
            is_green_energy: boolean;
            energy_sources?: {
                percentage: number;
                source: "NUCLEAR" | "GENERAL_FOSSIL" | "COAL" | "GAS" | "GENERAL_GREEN" | "SOLAR" | "WIND" | "WATER";
            }[] | null | undefined;
            environ_impact?: {
                amount: number;
                source: "NUCLEAR_WASTE" | "CARBON_DIOXIDE";
            }[] | null | undefined;
            supplier_name?: string | null | undefined;
            energy_product_name?: string | null | undefined;
        } | null | undefined;
        tariff_alt_text?: {
            language: string;
            text: string;
        }[] | null | undefined;
        tariff_alt_url?: string | null | undefined;
        min_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        max_price?: {
            excl_vat: number;
            incl_vat?: number | null | undefined;
        } | null | undefined;
        start_date_time?: Date | null | undefined;
        end_date_time?: Date | null | undefined;
    }[] | null | undefined;
    total_parking_time?: number | null | undefined;
    remark?: string | null | undefined;
    signed_data?: {
        encoding_method: string;
        signed_values: [{
            nature: string;
            plain_data: string;
            signed_data: string;
        }, ...{
            nature: string;
            plain_data: string;
            signed_data: string;
        }[]];
        url?: string | null | undefined;
        encoding_method_version?: number | null | undefined;
        public_key?: string | null | undefined;
    } | null | undefined;
    session_id?: string | null | undefined;
    authorization_reference?: string | null | undefined;
    total_fixed_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_energy_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_time_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_parking_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    total_reservation_cost?: {
        excl_vat: number;
        incl_vat?: number | null | undefined;
    } | null | undefined;
    invoice_reference_id?: string | null | undefined;
    credit?: boolean | null | undefined;
    credit_reference_id?: string | null | undefined;
}>, "many">;
//# sourceMappingURL=ocpi.cdrs.v22.d.ts.map