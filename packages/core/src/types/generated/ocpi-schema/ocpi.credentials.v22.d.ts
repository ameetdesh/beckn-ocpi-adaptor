import { z } from "zod";
export declare const Role: z.ZodEnum<["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"]>;
export declare const CredentialsRole: z.ZodObject<{
    role: z.ZodEnum<["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"]>;
    business_details: z.ZodObject<{
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
    }>;
    party_id: z.ZodString;
    country_code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    country_code: string;
    party_id: string;
    business_details: {
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
    };
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}, {
    country_code: string;
    party_id: string;
    business_details: {
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
    };
    role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
}>;
export declare const OcpiCredentials: z.ZodObject<{
    token: z.ZodString;
    url: z.ZodString;
    roles: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<["CPO", "EMSP", "HUB", "NAP", "NSP", "OTHER", "SCSP"]>;
        business_details: z.ZodObject<{
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
        }>;
        party_id: z.ZodString;
        country_code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }, {
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }>, "atleastone">;
}, "strip", z.ZodTypeAny, {
    url: string;
    token: string;
    roles: [{
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }, ...{
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }[]];
}, {
    url: string;
    token: string;
    roles: [{
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }, ...{
        country_code: string;
        party_id: string;
        business_details: {
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
        };
        role: "OTHER" | "CPO" | "EMSP" | "HUB" | "NAP" | "NSP" | "SCSP";
    }[]];
}>;
//# sourceMappingURL=ocpi.credentials.v22.d.ts.map