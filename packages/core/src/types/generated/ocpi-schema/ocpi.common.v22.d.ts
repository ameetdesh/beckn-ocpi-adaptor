import { z } from "zod";
export declare const Price: z.ZodObject<{
    excl_vat: z.ZodNumber;
    incl_vat: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    excl_vat: number;
    incl_vat?: number | null | undefined;
}, {
    excl_vat: number;
    incl_vat?: number | null | undefined;
}>;
export declare const TokenType: z.ZodEnum<["AD_HOC_USER", "APP_USER", "OTHER", "RFID"]>;
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
//# sourceMappingURL=ocpi.common.v22.d.ts.map