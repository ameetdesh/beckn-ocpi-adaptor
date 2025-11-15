"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions = exports.Session = exports.SessionLocation = exports.ChargingPeriod = exports.AuthMethod = void 0;
const zod_1 = require("zod");
const ocpi_location_1 = require("./ocpi.location");
exports.AuthMethod = zod_1.z.enum(["AUTH_REQUEST", "WHITELIST"]);
const CdrDimensionType = zod_1.z.enum([
    "ENERGY",
    "FLAT",
    "MAX_CURRENT",
    "MIN_CURRENT",
    "PARKING_TIME",
    "TIME",
]);
const CdrDimension = zod_1.z.object({
    type: CdrDimensionType,
    volume: zod_1.z.number(),
});
exports.ChargingPeriod = zod_1.z.object({
    start_date_time: zod_1.z.date(),
    dimensions: zod_1.z.array(CdrDimension).nonempty(),
});
const SessionStatus = zod_1.z.enum(["ACTIVE", "COMPLETED", "INVALID", "PENDING"]);
exports.SessionLocation = ocpi_location_1.Location.merge(zod_1.z.object({
    evses: zod_1.z
        .array(ocpi_location_1.Evse.merge(zod_1.z.object({
        connectors: zod_1.z.array(ocpi_location_1.Connector).length(1),
    })))
        .length(1),
})); // Overriden Location to force single EVSE and Connector
exports.Session = zod_1.z.object({
    id: zod_1.z.string().max(36),
    start_datetime: zod_1.z.date(),
    end_datetime: zod_1.z.date().nullish(),
    kwh: zod_1.z.number().nonnegative(),
    auth_id: zod_1.z.string().max(36),
    auth_method: exports.AuthMethod,
    location: exports.SessionLocation,
    meter_id: zod_1.z.string().max(255).nullish(),
    currency: zod_1.z.string().length(3),
    charging_periods: zod_1.z.array(exports.ChargingPeriod).nullish(),
    total_cost: zod_1.z.number().nonnegative().nullish(),
    status: SessionStatus,
    last_updated: zod_1.z.date(),
});
exports.Sessions = zod_1.z.array(exports.Session);
//# sourceMappingURL=ocpi.session.js.map