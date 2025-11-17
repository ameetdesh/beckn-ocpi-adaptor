import { z } from "zod";

export default z.object({ "op": z.enum(["s_within","s_contains","s_intersects","s_disjoint","s_overlaps","s_crosses","s_touches","s_equals","s_dwithin"]).describe("OGC CQL2 spatial operator."), "targets": z.any().superRefine((x, ctx) => {
    const schemas = [z.string(), z.array(z.string())];
    const errors = schemas.reduce<z.ZodError[]>(
      (errors, schema) =>
        ((result) =>
          result.error ? [...errors, result.error] : errors)(
          schema.safeParse(x),
        ),
      [],
    );
    if (schemas.length - errors.length !== 1) {
      ctx.addIssue({
        path: ctx.path,
        code: "invalid_union",
        unionErrors: errors,
        message: "Invalid input: Should pass single schema",
      });
    }
  }).describe("One or more JSONPath-like pointers to geometry fields within the item. Example pointers: - `$['beckn:availableAt'][*]['geo']` (array of site Points) - `$['beckn:itemAttributes']['ride:dropOff']['geo']` (drop zone Polygon)\n"), "geometry": z.object({ "type": z.enum(["Point","LineString","Polygon","MultiPoint","MultiLineString","MultiPolygon","GeometryCollection"]), "coordinates": z.array(z.any()).describe("Coordinates per RFC 7946 for all types **except** GeometryCollection. Order is **[lon, lat, (alt)]**. For Polygons, this is an array of linear rings; each ring is an array of positions.\n").optional(), "geometries": z.array(z.any()).describe("Member geometries when `type` is **GeometryCollection**.\n").optional(), "bbox": z.array(z.any()).min(4).max(4).describe("Optional bounding box `[west, south, east, north]` in degrees.").optional() }).catchall(z.any()).describe("**GeoJSON geometry** per RFC 7946. Coordinates are in **EPSG:4326 (WGS-84)** and MUST follow **[longitude, latitude, (altitude?)]** order.\nSupported types: - Point, LineString, Polygon - MultiPoint, MultiLineString, MultiPolygon - GeometryCollection (uses `geometries` instead of `coordinates`)\nNotes: - For rectangles, use a Polygon with a single linear ring where the first\n  and last positions are identical.\n- Circles are **not native** to GeoJSON. For circular searches, use\n  `SpatialConstraint` with `op: s_dwithin` and a Point + `distanceMeters`,\n  or approximate the circle as a Polygon.\n- Optional `bbox` is `[west, south, east, north]` in degrees.\n").optional(), "distanceMeters": z.number().gte(0).describe("For `s_dwithin`: maximum distance in meters from the target geometry to `geometry` (e.g., “within 5000 m of this Point”). Ignored for other ops.\n").optional(), "quantifier": z.enum(["any","all","none"]).describe("How to evaluate when `targets` resolves to an array: - **any**: at least one element matches (default) - **all**: every element must match - **none**: no element may match\n").default("any"), "srid": z.string().describe("Coordinate Reference System identifier for `geometry`. Default is `\"EPSG:4326\"`. If provided, servers MAY reproject to EPSG:4326 internally.\n").optional() }).strict().describe("**Spatial predicate** using **OGC CQL2 (JSON semantics)** applied to one or more geometry targets in an item. This is where clients express spatial intent.\nKey ideas: - `targets`: one or more **JSONPath-like** pointers that locate geometry\n  fields within each item document (e.g., `$['beckn:availableAt'][*]['geo']`).\n- `op`: spatial operator (CQL2). Common ones:\n    • `s_within`     (A is completely inside B)\n    • `s_intersects` (A intersects B)\n    • `s_contains`   (A contains B)\n    • `s_dwithin`    (A within distance of B)\n- `geometry`: **GeoJSON** literal used as the predicate reference geometry. - `distanceMeters`: required for `s_dwithin` when using a GeoJSON Point/shape. - `quantifier`: if a target resolves to an array, choose whether **any** (default),\n  **all**, or **none** of elements must satisfy the predicate.\n\nCRS: unless otherwise stated, all coordinates are **EPSG:4326**.\n");
