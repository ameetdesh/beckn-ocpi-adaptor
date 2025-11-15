import { z } from "zod";

export default z.object({ "@context": z.string().url().describe("JSON-LD context URI for the specific domain schema (e.g., ElectronicItem)"), "@type": z.string().describe("JSON-LD type within the domain schema") }).catchall(z.any()).describe("JSON-LD aware bag for domain-specific attributes of an Item. MUST include @context (URI) and @type (compact or full IRI). Any additional properties are allowed and interpreted per the provided JSON-LD context.\n");
