import { z } from "zod";

export default z.object({ "@type": z.literal("beckn:Descriptor").describe("Type of the descriptor"), "schema:name": z.string().describe("Name of the item").optional(), "beckn:shortDesc": z.string().describe("Short description of the item").optional(), "beckn:longDesc": z.string().describe("Detailed description of the item").optional(), "schema:image": z.array(z.string().url()).optional() });
