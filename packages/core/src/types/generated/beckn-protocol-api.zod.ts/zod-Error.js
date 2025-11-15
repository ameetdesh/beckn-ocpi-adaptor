import { z } from "zod";

export default z.object({ "code": z.string().describe("Error code"), "message": z.string().describe("Human-readable error message"), "details": z.record(z.any()).describe("Additional error details").optional() });
