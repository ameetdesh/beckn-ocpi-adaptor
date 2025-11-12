import { z } from "zod";

export default z.object({ "code": z.string().describe("State code as per country or international standards").optional(), "name": z.string().describe("Name of the state").optional() }).strict().describe("A bounded geopolitical region of governance inside a country.");
