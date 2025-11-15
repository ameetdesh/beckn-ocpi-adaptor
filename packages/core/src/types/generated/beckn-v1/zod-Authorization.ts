import { z } from "zod";

export default z.object({ "status": z.string().describe("Status of the token").optional(), "token": z.string().describe("Token used for authorization").optional(), "type": z.string().describe("Type of authorization mechanism used").optional(), "valid_from": z.string().datetime({ offset: true }).describe("Timestamp in RFC3339 format from which token is valid").optional(), "valid_to": z.string().datetime({ offset: true }).describe("Timestamp in RFC3339 format until which token is valid").optional() }).strict().describe("Describes an authorization mechanism");
