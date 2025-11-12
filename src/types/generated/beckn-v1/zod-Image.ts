import { z } from "zod";

export default z.object({ "height": z.string().describe("Height of the image in pixels").optional(), "size_type": z.enum(["xs","sm","md","lg","xl","custom"]).describe("The size of the image. The network policy can define the default dimensions of each type").optional(), "url": z.string().url().describe("URL to the image. This can be a data url or an remote url"), "width": z.string().describe("Width of the image in pixels").optional() }).strict().describe("Describes an image");
