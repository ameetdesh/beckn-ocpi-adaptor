import { z } from "zod";

export default z.object({ "eligibleRegion": z.string().optional(), "eligibleQuantity": z.object({ "min": z.number().optional(), "max": z.number().optional() }).optional() });
