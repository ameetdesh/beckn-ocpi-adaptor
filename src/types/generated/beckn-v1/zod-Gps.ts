import { z } from "zod";

export default z.string().regex(new RegExp("^[-+]?([1-8]?\\d(\\.\\d{6,})?|90(\\.0{6,})?),\\s*[-+]?(180(\\.0{6,})?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d{6,})?)$")).describe("Describes a gps coordinate");
