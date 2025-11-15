import { z } from "zod";

export default z.object({ "callback_phone": z.string().regex(new RegExp("^\\+?[1-9]\\d{1,14}$")).optional(), "email": z.string().email().optional(), "phone": z.string().regex(new RegExp("^\\+?[1-9]\\d{1,14}$")).optional(), "ref_id": z.string().optional(), "url": z.string().url().optional() }).strict().describe("Details of customer support");
