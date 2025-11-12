import { z } from "zod";

export default z.object({ "dsa": z.string().describe("The signing algorithm used by the sender").optional(), "mimetype": z.string().describe("indicates the nature and format of the document, file, or assortment of bytes. MIME types are defined and standardized in IETF's RFC 6838").optional(), "signature": z.string().describe("The digital signature of the file signed by the sender").optional(), "url": z.string().url().describe("The URL of the file").optional() }).strict().describe("This object contains a url to a media file.");
