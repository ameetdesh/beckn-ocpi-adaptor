import { z } from "zod";

export default z.object({ "@type": z.literal("beckn:Location").optional(), "geo": z.object({ "type": z.enum(["Point","LineString","Polygon","MultiPoint","MultiLineString","MultiPolygon","GeometryCollection"]), "coordinates": z.array(z.any()).describe("Coordinates per RFC 7946 for all types **except** GeometryCollection. Order is **[lon, lat, (alt)]**. For Polygons, this is an array of linear rings; each ring is an array of positions.\n").optional(), "geometries": z.array(z.any()).describe("Member geometries when `type` is **GeometryCollection**.\n").optional(), "bbox": z.array(z.any()).min(4).max(4).describe("Optional bounding box `[west, south, east, north]` in degrees.").optional() }).catchall(z.any()).describe("**GeoJSON geometry** per RFC 7946. Coordinates are in **EPSG:4326 (WGS-84)** and MUST follow **[longitude, latitude, (altitude?)]** order.\nSupported types: - Point, LineString, Polygon - MultiPoint, MultiLineString, MultiPolygon - GeometryCollection (uses `geometries` instead of `coordinates`)\nNotes: - For rectangles, use a Polygon with a single linear ring where the first\n  and last positions are identical.\n- Circles are **not native** to GeoJSON. For circular searches, use\n  `SpatialConstraint` with `op: s_dwithin` and a Point + `distanceMeters`,\n  or approximate the circle as a Polygon.\n- Optional `bbox` is `[west, south, east, north]` in degrees.\n"), "address": z.any().superRefine((x, ctx) => {
    const schemas = [z.string(), z.object({ "streetAddress": z.string().describe("Street address (building name/number and street).").optional(), "extendedAddress": z.string().describe("Address extension (apt/suite/floor, C/O).").optional(), "addressLocality": z.string().describe("City/locality.").optional(), "addressRegion": z.string().describe("State/region/province.").optional(), "postalCode": z.string().describe("Postal/ZIP code.").optional(), "addressCountry": z.string().describe("Country name or ISO-3166-1 alpha-2 code.").optional() }).strict().describe("**Postal address** aligned with schema.org `PostalAddress`. Use for human-readable addresses. Geometry lives in `Location.geo` as GeoJSON.\n")];
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
  }).describe("Optional human-readable address for the same place/area.").optional() }).strict().describe("A **place** represented by **GeoJSON geometry** (Point/Polygon/Multi*) and optional human-readable `address`. This unifies all Beckn location fields into a single, widely-adopted representation (GeoJSON).\n");
