import { z } from "zod";

export default z.object({ "email": z.string().optional(), "jcard": z.record(z.any()).describe("A Jcard object as per draft-ietf-jcardcal-jcard-03 specification").optional(), "phone": z.string().optional() }).strict();
