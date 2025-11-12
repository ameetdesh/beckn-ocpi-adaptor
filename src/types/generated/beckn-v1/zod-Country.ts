import { z } from "zod";

export default z.object({ "code": z.string().describe("Country code as per ISO 3166-1 and ISO 3166-2 format").optional(), "name": z.string().describe("Name of the country").optional() }).strict().describe("Describes a country.");
