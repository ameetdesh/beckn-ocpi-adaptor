import { z } from "zod";

export default z.object({ "currency": z.string().describe("ISO 4217 code").optional(), "value": z.number().describe("Total value for this spec node").optional(), "components": z.array(z.object({ "type": z.enum(["UNIT","TAX","DELIVERY","DISCOUNT","FEE","SURCHARGE"]).optional(), "value": z.number().optional(), "currency": z.string().optional(), "description": z.string().optional() })).describe("Optional components (tax, shipping, discount, fee, surcharge)").optional() }).catchall(z.any());
