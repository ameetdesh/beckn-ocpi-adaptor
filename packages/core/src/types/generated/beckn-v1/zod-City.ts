import { z } from "zod";

export default z.object({ "code": z.string().describe("City code").optional(), "name": z.string().describe("Name of the city").optional() }).strict().describe("Describes a city");
