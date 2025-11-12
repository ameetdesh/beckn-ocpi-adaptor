import { z } from "zod";

export default z.string().regex(new RegExp("^[+-]?([0-9]*[.])?[0-9]+")).describe("Describes a decimal value");
