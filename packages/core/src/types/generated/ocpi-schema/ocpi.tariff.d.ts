import { z } from "zod";
export declare const Tariff: z.ZodObject<{
    id: z.ZodString;
    currency: z.ZodString;
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
    elements: z.ZodArray<z.ZodObject<{
        price_components: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["ENERGY", "FLAT", "PARKING_TIME", "TIME"]>;
            price: z.ZodNumber;
            step_size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, {
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }>, "atleastone">;
        restrictions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            start_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            end_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            start_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            end_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            min_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            min_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            min_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            day_of_week: z.ZodOptional<z.ZodNullable<z.ZodEnum<["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]>>>;
        }, "strip", z.ZodTypeAny, {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        }, {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, {
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }>, "atleastone">;
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
    elements: [{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, ...{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }[]];
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
}, {
    id: string;
    currency: string;
    last_updated: Date;
    elements: [{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, ...{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }[]];
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
}>;
export declare const Tariffs: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    currency: z.ZodString;
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
    elements: z.ZodArray<z.ZodObject<{
        price_components: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["ENERGY", "FLAT", "PARKING_TIME", "TIME"]>;
            price: z.ZodNumber;
            step_size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, {
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }>, "atleastone">;
        restrictions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            start_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            end_time: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            start_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            end_date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            min_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_kwh: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            min_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_power: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            min_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            max_duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            day_of_week: z.ZodOptional<z.ZodNullable<z.ZodEnum<["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]>>>;
        }, "strip", z.ZodTypeAny, {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        }, {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, {
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }>, "atleastone">;
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
    elements: [{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, ...{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }[]];
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
}, {
    id: string;
    currency: string;
    last_updated: Date;
    elements: [{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }, ...{
        price_components: [{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }, ...{
            type: "ENERGY" | "FLAT" | "PARKING_TIME" | "TIME";
            price: number;
            step_size: number;
        }[]];
        restrictions?: {
            start_time?: string | null | undefined;
            end_time?: string | null | undefined;
            start_date?: string | null | undefined;
            end_date?: string | null | undefined;
            min_kwh?: number | null | undefined;
            max_kwh?: number | null | undefined;
            min_power?: number | null | undefined;
            max_power?: number | null | undefined;
            min_duration?: number | null | undefined;
            max_duration?: number | null | undefined;
            day_of_week?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY" | null | undefined;
        } | null | undefined;
    }[]];
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
}>, "many">;
//# sourceMappingURL=ocpi.tariff.d.ts.map