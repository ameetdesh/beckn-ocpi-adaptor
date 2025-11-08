import { z } from "zod";

export default z.object({ "id": z.string().describe("Id of the object being rated").optional(), "rating_category": z.string().describe("Category of the entity being rated").optional(), "value": z.string().describe("Rating value given to the object. This can be a single value or can also contain an inequality operator like gt, gte, lt, lte. This can also contain an inequality expression containing logical operators like && and ||.").optional() }).strict().describe("Describes the rating of an entity");
