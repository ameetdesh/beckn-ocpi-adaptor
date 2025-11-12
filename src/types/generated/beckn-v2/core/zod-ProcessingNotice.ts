import { z } from "zod";

export default z.object({ "code": z.string(), "message": z.string(), "details": z.record(z.any()).optional() });
