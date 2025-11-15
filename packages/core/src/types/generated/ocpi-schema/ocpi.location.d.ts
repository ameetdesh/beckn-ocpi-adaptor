import { z } from "zod";
export declare const Connector: z.ZodObject<{
    id: z.ZodString;
    standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "TESLA_R", "TESLA_S"]>;
    format: z.ZodEnum<["SOCKET", "CABLE"]>;
    power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
    voltage: z.ZodNumber;
    amperage: z.ZodNumber;
    tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    terms_and_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
    format: "SOCKET" | "CABLE";
    power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
    last_updated: Date;
    voltage: number;
    amperage: number;
    terms_and_conditions?: string | null | undefined;
    tariff_id?: string | null | undefined;
}, {
    id: string;
    standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
    format: "SOCKET" | "CABLE";
    power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
    last_updated: Date;
    voltage: number;
    amperage: number;
    terms_and_conditions?: string | null | undefined;
    tariff_id?: string | null | undefined;
}>;
export declare const Evse: z.ZodObject<{
    uid: z.ZodString;
    evse_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
    status_schedule: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        period_begin: z.ZodDate;
        period_end: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
    }, "strip", z.ZodTypeAny, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        period_begin: Date;
        period_end?: Date | null | undefined;
    }, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        period_begin: Date;
        period_end?: Date | null | undefined;
    }>, "many">>>;
    capabilities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["CHARGING_PROFILE_CAPABLE", "CREDIT_CARD_PAYABLE", "REMOTE_START_STOP_CAPABLE", "RESERVABLE", "RFID_READER", "UNLOCK_CAPABLE"]>, "many">>>;
    connectors: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "TESLA_R", "TESLA_S"]>;
        format: z.ZodEnum<["SOCKET", "CABLE"]>;
        power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
        voltage: z.ZodNumber;
        amperage: z.ZodNumber;
        tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        terms_and_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        last_updated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }, {
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }>, "atleastone">;
    floor_level: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coordinates: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        latitude: z.ZodString;
        longitude: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        latitude: string;
        longitude: string;
    }, {
        latitude: string;
        longitude: string;
    }>>>;
    physical_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    directions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        language: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
        text: string;
    }, {
        language: string;
        text: string;
    }>, "many">>>;
    parking_restrictions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["EV_ONLY", "PLUGGED", "DISABLED", "CUSTOMERS", "MOTORCYCLES"]>, "many">>>;
    images: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
        type: z.ZodString;
        width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }>, "many">>>;
    last_updated: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
    last_updated: Date;
    uid: string;
    connectors: [{
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }, ...{
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }[]];
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    coordinates?: {
        latitude: string;
        longitude: string;
    } | null | undefined;
    evse_id?: string | null | undefined;
    status_schedule?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        period_begin: Date;
        period_end?: Date | null | undefined;
    }[] | null | undefined;
    capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
    floor_level?: string | null | undefined;
    physical_reference?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
}, {
    status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
    last_updated: Date;
    uid: string;
    connectors: [{
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }, ...{
        id: string;
        standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
        format: "SOCKET" | "CABLE";
        power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
        last_updated: Date;
        voltage: number;
        amperage: number;
        terms_and_conditions?: string | null | undefined;
        tariff_id?: string | null | undefined;
    }[]];
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    coordinates?: {
        latitude: string;
        longitude: string;
    } | null | undefined;
    evse_id?: string | null | undefined;
    status_schedule?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        period_begin: Date;
        period_end?: Date | null | undefined;
    }[] | null | undefined;
    capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
    floor_level?: string | null | undefined;
    physical_reference?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
}>;
export declare const EnergyMix: z.ZodObject<{
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
}>;
export declare const Location: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["ON_STREET", "PARKING_GARAGE", "UNDERGROUND_GARAGE", "PARKING_LOT", "OTHER", "UNKNOWN"]>;
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
    related_locations: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        latitude: z.ZodString;
        longitude: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }, {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }>, "many">>>;
    evses: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        uid: z.ZodString;
        evse_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
        status_schedule: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
            status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
        }, "strip", z.ZodTypeAny, {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }, {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }>, "many">>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["CHARGING_PROFILE_CAPABLE", "CREDIT_CARD_PAYABLE", "REMOTE_START_STOP_CAPABLE", "RESERVABLE", "RFID_READER", "UNLOCK_CAPABLE"]>, "many">>>;
        connectors: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "TESLA_R", "TESLA_S"]>;
            format: z.ZodEnum<["SOCKET", "CABLE"]>;
            power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
            voltage: z.ZodNumber;
            amperage: z.ZodNumber;
            tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            terms_and_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            last_updated: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, {
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }>, "atleastone">;
        floor_level: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        coordinates: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            latitude: z.ZodString;
            longitude: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            latitude: string;
            longitude: string;
        }, {
            latitude: string;
            longitude: string;
        }>>>;
        physical_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        directions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>, "many">>>;
        parking_restrictions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["EV_ONLY", "PLUGGED", "DISABLED", "CUSTOMERS", "MOTORCYCLES"]>, "many">>>;
        images: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>, "many">>>;
        last_updated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }>, "many">>>;
    directions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        language: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
        text: string;
    }, {
        language: string;
        text: string;
    }>, "many">>>;
    operator: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    suboperator: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    facilities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["HOTEL", "RESTAURANT", "CAFE", "MALL", "SUPERMARKET", "SPORT", "RECREATION_AREA", "NATURE", "MUSEUM", "BUS_STOP", "TAXI_STAND", "TRAIN_STATION", "AIRPORT", "CARPOOL_PARKING", "FUEL_STATION", "WIFI"]>, "many">>>;
    time_zone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    opening_times: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        regular_hours: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            weekday: z.ZodNumber;
            period_begin: z.ZodString;
            period_end: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            period_begin: string;
            period_end: string;
            weekday: number;
        }, {
            period_begin: string;
            period_end: string;
            weekday: number;
        }>, "many">>>;
        twentyfourseven: z.ZodBoolean;
        exceptional_openings: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            period_begin: Date;
            period_end: Date;
        }, {
            period_begin: Date;
            period_end: Date;
        }>, "many">>>;
        exceptional_closings: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            period_begin: Date;
            period_end: Date;
        }, {
            period_begin: Date;
            period_end: Date;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    }, {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    }>>>;
    charging_when_closed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    images: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
        type: z.ZodString;
        width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }>, "many">>>;
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
    type: "OTHER" | "UNKNOWN" | "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT";
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    last_updated: Date;
    postal_code: string;
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    name?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    related_locations?: {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }[] | null | undefined;
    evses?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }[] | null | undefined;
    operator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    suboperator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    owner?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    facilities?: ("HOTEL" | "RESTAURANT" | "CAFE" | "MALL" | "SUPERMARKET" | "SPORT" | "RECREATION_AREA" | "NATURE" | "MUSEUM" | "BUS_STOP" | "TAXI_STAND" | "TRAIN_STATION" | "AIRPORT" | "CARPOOL_PARKING" | "FUEL_STATION" | "WIFI")[] | null | undefined;
    time_zone?: string | null | undefined;
    opening_times?: {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    } | null | undefined;
    charging_when_closed?: boolean | null | undefined;
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
}, {
    type: "OTHER" | "UNKNOWN" | "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT";
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    last_updated: Date;
    postal_code: string;
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    name?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    related_locations?: {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }[] | null | undefined;
    evses?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }[] | null | undefined;
    operator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    suboperator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    owner?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    facilities?: ("HOTEL" | "RESTAURANT" | "CAFE" | "MALL" | "SUPERMARKET" | "SPORT" | "RECREATION_AREA" | "NATURE" | "MUSEUM" | "BUS_STOP" | "TAXI_STAND" | "TRAIN_STATION" | "AIRPORT" | "CARPOOL_PARKING" | "FUEL_STATION" | "WIFI")[] | null | undefined;
    time_zone?: string | null | undefined;
    opening_times?: {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    } | null | undefined;
    charging_when_closed?: boolean | null | undefined;
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
}>;
export declare const Locations: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["ON_STREET", "PARKING_GARAGE", "UNDERGROUND_GARAGE", "PARKING_LOT", "OTHER", "UNKNOWN"]>;
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
    related_locations: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        latitude: z.ZodString;
        longitude: z.ZodString;
        name: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }, {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }>, "many">>>;
    evses: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        uid: z.ZodString;
        evse_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
        status_schedule: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
            status: z.ZodEnum<["AVAILABLE", "BLOCKED", "CHARGING", "INOPERATIVE", "OUTOFORDER", "PLANNED", "REMOVED", "RESERVED", "UNKNOWN"]>;
        }, "strip", z.ZodTypeAny, {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }, {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }>, "many">>>;
        capabilities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["CHARGING_PROFILE_CAPABLE", "CREDIT_CARD_PAYABLE", "REMOTE_START_STOP_CAPABLE", "RESERVABLE", "RFID_READER", "UNLOCK_CAPABLE"]>, "many">>>;
        connectors: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            standard: z.ZodEnum<["CHADEMO", "DOMESTIC_A", "DOMESTIC_B", "DOMESTIC_C", "DOMESTIC_D", "DOMESTIC_E", "DOMESTIC_F", "DOMESTIC_G", "DOMESTIC_H", "DOMESTIC_I", "DOMESTIC_J", "DOMESTIC_K", "DOMESTIC_L", "IEC_60309_2_single_16", "IEC_60309_2_three_16", "IEC_60309_2_three_32", "IEC_60309_2_three_64", "IEC_62196_T1", "IEC_62196_T1_COMBO", "IEC_62196_T2", "IEC_62196_T2_COMBO", "IEC_62196_T3A", "IEC_62196_T3C", "TESLA_R", "TESLA_S"]>;
            format: z.ZodEnum<["SOCKET", "CABLE"]>;
            power_type: z.ZodEnum<["AC_1_PHASE", "AC_3_PHASE", "DC"]>;
            voltage: z.ZodNumber;
            amperage: z.ZodNumber;
            tariff_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            terms_and_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            last_updated: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, {
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }>, "atleastone">;
        floor_level: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        coordinates: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            latitude: z.ZodString;
            longitude: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            latitude: string;
            longitude: string;
        }, {
            latitude: string;
            longitude: string;
        }>>>;
        physical_reference: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        directions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            language: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            language: string;
            text: string;
        }, {
            language: string;
            text: string;
        }>, "many">>>;
        parking_restrictions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["EV_ONLY", "PLUGGED", "DISABLED", "CUSTOMERS", "MOTORCYCLES"]>, "many">>>;
        images: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>, "many">>>;
        last_updated: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }, {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }>, "many">>>;
    directions: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        language: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
        text: string;
    }, {
        language: string;
        text: string;
    }>, "many">>>;
    operator: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    suboperator: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        logo: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
            type: z.ZodString;
            width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }, {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }, {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    }>>>;
    facilities: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodEnum<["HOTEL", "RESTAURANT", "CAFE", "MALL", "SUPERMARKET", "SPORT", "RECREATION_AREA", "NATURE", "MUSEUM", "BUS_STOP", "TAXI_STAND", "TRAIN_STATION", "AIRPORT", "CARPOOL_PARKING", "FUEL_STATION", "WIFI"]>, "many">>>;
    time_zone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    opening_times: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        regular_hours: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            weekday: z.ZodNumber;
            period_begin: z.ZodString;
            period_end: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            period_begin: string;
            period_end: string;
            weekday: number;
        }, {
            period_begin: string;
            period_end: string;
            weekday: number;
        }>, "many">>>;
        twentyfourseven: z.ZodBoolean;
        exceptional_openings: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            period_begin: Date;
            period_end: Date;
        }, {
            period_begin: Date;
            period_end: Date;
        }>, "many">>>;
        exceptional_closings: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            period_begin: z.ZodDate;
            period_end: z.ZodDate;
        }, "strip", z.ZodTypeAny, {
            period_begin: Date;
            period_end: Date;
        }, {
            period_begin: Date;
            period_end: Date;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    }, {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    }>>>;
    charging_when_closed: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    images: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        category: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
        type: z.ZodString;
        width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }, {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }>, "many">>>;
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
    type: "OTHER" | "UNKNOWN" | "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT";
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    last_updated: Date;
    postal_code: string;
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    name?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    related_locations?: {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }[] | null | undefined;
    evses?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }[] | null | undefined;
    operator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    suboperator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    owner?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    facilities?: ("HOTEL" | "RESTAURANT" | "CAFE" | "MALL" | "SUPERMARKET" | "SPORT" | "RECREATION_AREA" | "NATURE" | "MUSEUM" | "BUS_STOP" | "TAXI_STAND" | "TRAIN_STATION" | "AIRPORT" | "CARPOOL_PARKING" | "FUEL_STATION" | "WIFI")[] | null | undefined;
    time_zone?: string | null | undefined;
    opening_times?: {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    } | null | undefined;
    charging_when_closed?: boolean | null | undefined;
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
}, {
    type: "OTHER" | "UNKNOWN" | "ON_STREET" | "PARKING_GARAGE" | "UNDERGROUND_GARAGE" | "PARKING_LOT";
    address: string;
    city: string;
    id: string;
    country: string;
    coordinates: {
        latitude: string;
        longitude: string;
    };
    last_updated: Date;
    postal_code: string;
    images?: {
        url: string;
        type: string;
        category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
        height?: number | null | undefined;
        width?: number | null | undefined;
        thumbnail?: string | null | undefined;
    }[] | null | undefined;
    name?: string | null | undefined;
    directions?: {
        language: string;
        text: string;
    }[] | null | undefined;
    related_locations?: {
        latitude: string;
        longitude: string;
        name?: {
            language: string;
            text: string;
        } | null | undefined;
    }[] | null | undefined;
    evses?: {
        status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
        last_updated: Date;
        uid: string;
        connectors: [{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }, ...{
            id: string;
            standard: "CHADEMO" | "DOMESTIC_A" | "DOMESTIC_B" | "DOMESTIC_C" | "DOMESTIC_D" | "DOMESTIC_E" | "DOMESTIC_F" | "DOMESTIC_G" | "DOMESTIC_H" | "DOMESTIC_I" | "DOMESTIC_J" | "DOMESTIC_K" | "DOMESTIC_L" | "IEC_60309_2_single_16" | "IEC_60309_2_three_16" | "IEC_60309_2_three_32" | "IEC_60309_2_three_64" | "IEC_62196_T1" | "IEC_62196_T1_COMBO" | "IEC_62196_T2" | "IEC_62196_T2_COMBO" | "IEC_62196_T3A" | "IEC_62196_T3C" | "TESLA_R" | "TESLA_S";
            format: "SOCKET" | "CABLE";
            power_type: "AC_1_PHASE" | "AC_3_PHASE" | "DC";
            last_updated: Date;
            voltage: number;
            amperage: number;
            terms_and_conditions?: string | null | undefined;
            tariff_id?: string | null | undefined;
        }[]];
        images?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        }[] | null | undefined;
        coordinates?: {
            latitude: string;
            longitude: string;
        } | null | undefined;
        evse_id?: string | null | undefined;
        status_schedule?: {
            status: "AVAILABLE" | "BLOCKED" | "CHARGING" | "INOPERATIVE" | "OUTOFORDER" | "PLANNED" | "REMOVED" | "RESERVED" | "UNKNOWN";
            period_begin: Date;
            period_end?: Date | null | undefined;
        }[] | null | undefined;
        capabilities?: ("CHARGING_PROFILE_CAPABLE" | "CREDIT_CARD_PAYABLE" | "REMOTE_START_STOP_CAPABLE" | "RESERVABLE" | "RFID_READER" | "UNLOCK_CAPABLE")[] | null | undefined;
        floor_level?: string | null | undefined;
        physical_reference?: string | null | undefined;
        directions?: {
            language: string;
            text: string;
        }[] | null | undefined;
        parking_restrictions?: ("EV_ONLY" | "PLUGGED" | "DISABLED" | "CUSTOMERS" | "MOTORCYCLES")[] | null | undefined;
    }[] | null | undefined;
    operator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    suboperator?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    owner?: {
        name: string;
        website?: string | null | undefined;
        logo?: {
            url: string;
            type: string;
            category: "CHARGER" | "ENTRANCE" | "LOCATION" | "NETWORK" | "OPERATOR" | "OTHER" | "OWNER";
            height?: number | null | undefined;
            width?: number | null | undefined;
            thumbnail?: string | null | undefined;
        } | null | undefined;
    } | null | undefined;
    facilities?: ("HOTEL" | "RESTAURANT" | "CAFE" | "MALL" | "SUPERMARKET" | "SPORT" | "RECREATION_AREA" | "NATURE" | "MUSEUM" | "BUS_STOP" | "TAXI_STAND" | "TRAIN_STATION" | "AIRPORT" | "CARPOOL_PARKING" | "FUEL_STATION" | "WIFI")[] | null | undefined;
    time_zone?: string | null | undefined;
    opening_times?: {
        twentyfourseven: boolean;
        regular_hours?: {
            period_begin: string;
            period_end: string;
            weekday: number;
        }[] | null | undefined;
        exceptional_openings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
        exceptional_closings?: {
            period_begin: Date;
            period_end: Date;
        }[] | null | undefined;
    } | null | undefined;
    charging_when_closed?: boolean | null | undefined;
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
}>, "many">;
//# sourceMappingURL=ocpi.location.d.ts.map