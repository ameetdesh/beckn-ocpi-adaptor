import { z } from "zod";

export default z.object({ "@type": z.string().describe("JSON-LD type for a date-time period"), "schema:startDate": z.string().datetime({ offset: true }).describe("Start instant (inclusive)").optional(), "schema:endDate": z.string().datetime({ offset: true }).describe("End instant (exclusive or inclusive per domain semantics)").optional() }).and(z.union([z.any(), z.any()])).describe("Time window with date-time precision for availability/validity");
