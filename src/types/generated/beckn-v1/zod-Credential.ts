import { z } from "zod";

export default z.object({ "id": z.string().optional(), "type": z.string().default("VerifiableCredential"), "url": z.string().url().describe("URL of the credential").optional() }).strict().describe("Describes a credential of an entity - Person or Organization");
