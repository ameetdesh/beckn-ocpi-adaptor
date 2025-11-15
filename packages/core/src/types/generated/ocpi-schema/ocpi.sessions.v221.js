"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sessions = exports.Session = exports.ProfileType = exports.SessionStatus = void 0;
const zod_1 = require("zod");
const ocpi_cdrs_v221_1 = require("./ocpi.cdrs.v221");
const ocpi_common_v221_1 = require("./ocpi.common.v221");
exports.SessionStatus = zod_1.z.enum(["ACTIVE", "COMPLETED", "INVALID", "PENDING", "RESERVATION"]);
exports.ProfileType = zod_1.z.enum(["CHEAP", "FAST", "GREEN", "REGULAR"]);
exports.Session = zod_1.z.object({
    country_code: zod_1.z.string().length(2),
    party_id: zod_1.z.string().max(3),
    id: zod_1.z.string().max(36),
    start_date_time: zod_1.z.date(),
    end_date_time: zod_1.z.date().nullish(),
    kwh: zod_1.z.number().nonnegative(),
    cdr_token: ocpi_cdrs_v221_1.CdrToken,
    auth_method: ocpi_cdrs_v221_1.AuthMethod,
    authorization_reference: zod_1.z.string().max(36).nullish(),
    location_id: zod_1.z.string().max(36),
    evse_uid: zod_1.z.string().max(36),
    connector_id: zod_1.z.string().max(36),
    meter_id: zod_1.z.string().max(255).nullish(),
    currency: zod_1.z.string().length(3),
    charging_periods: zod_1.z.array(ocpi_cdrs_v221_1.ChargingPeriod).nullish(),
    total_cost: ocpi_common_v221_1.Price.nullish(),
    status: exports.SessionStatus,
    last_updated: zod_1.z.date(),
});
exports.Sessions = zod_1.z.array(exports.Session);
//# sourceMappingURL=ocpi.sessions.v221.js.map