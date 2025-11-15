import { z } from "zod";
export declare const ChargingProfile: z.ZodObject<{
    start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    charging_rate_unit: z.ZodEnum<["W", "A"]>;
    min_charging_rate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    charging_profile_period: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        start_period: z.ZodNumber;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        start_period: number;
        limit: number;
    }, {
        start_period: number;
        limit: number;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    charging_rate_unit: "W" | "A";
    duration?: number | null | undefined;
    start_date_time?: Date | null | undefined;
    min_charging_rate?: number | null | undefined;
    charging_profile_period?: {
        start_period: number;
        limit: number;
    }[] | null | undefined;
}, {
    charging_rate_unit: "W" | "A";
    duration?: number | null | undefined;
    start_date_time?: Date | null | undefined;
    min_charging_rate?: number | null | undefined;
    charging_profile_period?: {
        start_period: number;
        limit: number;
    }[] | null | undefined;
}>;
export declare const ActiveChargingProfile: z.ZodObject<{
    start_date_time: z.ZodDate;
    charging_profile: z.ZodObject<{
        start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        charging_rate_unit: z.ZodEnum<["W", "A"]>;
        min_charging_rate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        charging_profile_period: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            start_period: z.ZodNumber;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            start_period: number;
            limit: number;
        }, {
            start_period: number;
            limit: number;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    }, {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    start_date_time: Date;
    charging_profile: {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    };
}, {
    start_date_time: Date;
    charging_profile: {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    };
}>;
export declare const SetChargingProfile: z.ZodObject<{
    charging_profile: z.ZodObject<{
        start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
        duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        charging_rate_unit: z.ZodEnum<["W", "A"]>;
        min_charging_rate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        charging_profile_period: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            start_period: z.ZodNumber;
            limit: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            start_period: number;
            limit: number;
        }, {
            start_period: number;
            limit: number;
        }>, "many">>>;
    }, "strip", z.ZodTypeAny, {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    }, {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    }>;
    response_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    charging_profile: {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    };
    response_url: string;
}, {
    charging_profile: {
        charging_rate_unit: "W" | "A";
        duration?: number | null | undefined;
        start_date_time?: Date | null | undefined;
        min_charging_rate?: number | null | undefined;
        charging_profile_period?: {
            start_period: number;
            limit: number;
        }[] | null | undefined;
    };
    response_url: string;
}>;
export declare const ChargingProfileResponse: z.ZodObject<{
    result: z.ZodEnum<["ACCEPTED", "NOT_SUPPORTED", "REJECTED", "TOO_OFTEN", "UNKNOWN_SESSION"]>;
    timeout: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "TOO_OFTEN" | "UNKNOWN_SESSION";
    timeout: number;
}, {
    result: "ACCEPTED" | "NOT_SUPPORTED" | "REJECTED" | "TOO_OFTEN" | "UNKNOWN_SESSION";
    timeout: number;
}>;
export declare const ActiveChargingProfileResult: z.ZodObject<{
    result: z.ZodEnum<["ACCEPTED", "REJECTED", "UNKNOWN"]>;
    profile: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        start_date_time: z.ZodDate;
        charging_profile: z.ZodObject<{
            start_date_time: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
            duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            charging_rate_unit: z.ZodEnum<["W", "A"]>;
            min_charging_rate: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            charging_profile_period: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
                start_period: z.ZodNumber;
                limit: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                start_period: number;
                limit: number;
            }, {
                start_period: number;
                limit: number;
            }>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        }, {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        start_date_time: Date;
        charging_profile: {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        };
    }, {
        start_date_time: Date;
        charging_profile: {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        };
    }>>>;
}, "strip", z.ZodTypeAny, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
    profile?: {
        start_date_time: Date;
        charging_profile: {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        };
    } | null | undefined;
}, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
    profile?: {
        start_date_time: Date;
        charging_profile: {
            charging_rate_unit: "W" | "A";
            duration?: number | null | undefined;
            start_date_time?: Date | null | undefined;
            min_charging_rate?: number | null | undefined;
            charging_profile_period?: {
                start_period: number;
                limit: number;
            }[] | null | undefined;
        };
    } | null | undefined;
}>;
export declare const ChargingProfileResult: z.ZodObject<{
    result: z.ZodEnum<["ACCEPTED", "REJECTED", "UNKNOWN"]>;
}, "strip", z.ZodTypeAny, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
}, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
}>;
export declare const ClearProfileResult: z.ZodObject<{
    result: z.ZodEnum<["ACCEPTED", "REJECTED", "UNKNOWN"]>;
}, "strip", z.ZodTypeAny, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
}, {
    result: "UNKNOWN" | "ACCEPTED" | "REJECTED";
}>;
//# sourceMappingURL=ocpi.chargingprofiles.v221.d.ts.map