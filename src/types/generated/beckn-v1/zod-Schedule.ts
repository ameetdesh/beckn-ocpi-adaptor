import { z } from "zod";

export default z.object({ "frequency": z.string().describe("Describes duration as per ISO8601 format").optional(), "holidays": z.array(z.string().datetime({ offset: true })).optional(), "times": z.array(z.string().datetime({ offset: true })).optional() }).strict().describe("Describes a schedule");
