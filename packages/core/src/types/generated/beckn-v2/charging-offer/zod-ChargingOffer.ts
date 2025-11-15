import { z } from "zod";

export default z.object({ "tariffModel": z.enum(["PER_KWH","PER_MINUTE","SUBSCRIPTION","TIME_OF_DAY"]).describe("Tariff model classification used by the provider.").optional(), "buyerFinderFee": z.object({ "feeType": z.enum(["PERCENTAGE","AMOUNT"]).optional(), "feeValue": z.number().gte(0).optional() }).strict().describe("Commission payable by provider to the BAP for this offer.").optional(), "idleFeePolicy": z.string().describe("Human-readable policy for post-charge idle fees.").optional() }).strict();
