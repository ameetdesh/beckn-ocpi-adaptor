import { z } from "zod";

export default z.object({ "@type": z.literal("beckn:Rating").describe("Type of the rating"), "beckn:ratingValue": z.number().gte(0).lte(5).describe("Rating value (0-5)").optional(), "beckn:ratingCount": z.number().int().gte(0).describe("Number of ratings").optional() });
