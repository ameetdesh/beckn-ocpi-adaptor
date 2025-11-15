import { z, ZodTypeAny } from "zod";
export declare const GeoLocation: z.ZodObject<{
    latitude: z.ZodString;
    longitude: z.ZodString;
}, "strip", z.ZodTypeAny, {
    latitude: string;
    longitude: string;
}, {
    latitude: string;
    longitude: string;
}>;
export declare const DisplayText: z.ZodObject<{
    language: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    language: string;
    text: string;
}, {
    language: string;
    text: string;
}>;
export declare const ImageCategory: z.ZodEnum<["CHARGER", "ENTRANCE", "LOCATION", "NETWORK", "OPERATOR", "OTHER", "OWNER"]>;
export declare const Image: z.ZodObject<{
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
}>;
export declare const BusinessDetails: z.ZodObject<{
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
export declare const ocpiSuccessResponse: (dataSchema: ZodTypeAny) => z.ZodObject<{
    data: z.ZodTypeAny;
    status_code: z.ZodNumber;
    status_message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    timestamp: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    status_code: number;
    data?: any;
    status_message?: string | null | undefined;
}, {
    timestamp: Date;
    status_code: number;
    data?: any;
    status_message?: string | null | undefined;
}>;
export declare const OcpiErrorResponse: z.ZodObject<{
    data: z.ZodOptional<z.ZodNullable<z.ZodAny>>;
    status_code: z.ZodNumber;
    status_message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    timestamp: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    timestamp: Date;
    status_code: number;
    data?: any;
    status_message?: string | null | undefined;
}, {
    timestamp: Date;
    status_code: number;
    data?: any;
    status_message?: string | null | undefined;
}>;
export declare const OcpiEmpty: z.ZodVoid;
//# sourceMappingURL=ocpi.common.d.ts.map