import { z } from "zod";
export declare const OcpiCredentials: z.ZodObject<{
    token: z.ZodString;
    url: z.ZodString;
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
    url: string;
    token: string;
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
}, {
    url: string;
    token: string;
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
}>;
//# sourceMappingURL=ocpi.credentials.d.ts.map