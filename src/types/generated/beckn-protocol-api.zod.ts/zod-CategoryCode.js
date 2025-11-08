import { z } from "zod";

export default z.object({ "@type": z.literal("schema:CategoryCode").describe("Type of the category code"), "schema:codeValue": z.string().describe("Category code value"), "schema:name": z.string().describe("Category name").optional(), "schema:description": z.string().describe("Category description").optional() });
