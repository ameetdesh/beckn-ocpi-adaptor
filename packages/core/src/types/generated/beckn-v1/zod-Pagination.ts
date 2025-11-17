import { z } from "zod";

export default z.object({ "page": z.number().int().gte(1).describe("Page number for pagination").optional(), "limit": z.number().int().gte(1).lte(100).describe("Number of items per page").optional() });
