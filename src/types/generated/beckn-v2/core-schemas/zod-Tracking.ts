import { z } from "zod";

export default z.object({ "tl_method": z.enum(["http/get","http/post","http/redirect","ws/handle","custom"]).describe("Transport/method used to access the tracking handle."), "url": z.string().url().describe("Link/handle to off-network tracking UI or endpoint."), "status": z.enum(["active","disabled","completed"]), "expires_at": z.string().datetime({ offset: true }).describe("ISO 8601 expiry timestamp for the tracking handle.").optional() }).strict().describe("Non-streaming tracking handle per legacy semantics (url/transport/status).\n");
