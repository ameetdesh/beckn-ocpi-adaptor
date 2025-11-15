"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearProfileResult = exports.ChargingProfileResult = exports.ActiveChargingProfileResult = exports.ChargingProfileResponse = exports.SetChargingProfile = exports.ActiveChargingProfile = exports.ChargingProfile = void 0;
const zod_1 = require("zod");
const ChargingProfileResponseType = zod_1.z.enum([
    "ACCEPTED",
    "NOT_SUPPORTED",
    "REJECTED",
    "TOO_OFTEN",
    "UNKNOWN_SESSION"
]);
const ChargingRateUnit = zod_1.z.enum([
    "W",
    "A"
]);
const ChargingProfilePeriod = zod_1.z.object({
    start_period: zod_1.z.number().int().nonnegative(),
    limit: zod_1.z.number().multipleOf(0.1).nonnegative(),
});
exports.ChargingProfile = zod_1.z.object({
    start_date_time: zod_1.z.date().nullish(),
    duration: zod_1.z.number().int().nonnegative().nullish(),
    charging_rate_unit: ChargingRateUnit,
    min_charging_rate: zod_1.z.number().multipleOf(0.1).nonnegative().nullish(),
    charging_profile_period: zod_1.z.array(ChargingProfilePeriod).nullish()
});
const ChargingProfileResultType = zod_1.z.enum([
    "ACCEPTED",
    "REJECTED",
    "UNKNOWN"
]);
exports.ActiveChargingProfile = zod_1.z.object({
    start_date_time: zod_1.z.date(),
    charging_profile: exports.ChargingProfile
});
exports.SetChargingProfile = zod_1.z.object({
    charging_profile: exports.ChargingProfile,
    response_url: zod_1.z.string().url(),
});
exports.ChargingProfileResponse = zod_1.z.object({
    result: ChargingProfileResponseType,
    timeout: zod_1.z.number().int().nonnegative(),
});
exports.ActiveChargingProfileResult = zod_1.z.object({
    result: ChargingProfileResultType,
    profile: exports.ActiveChargingProfile.nullish(),
});
exports.ChargingProfileResult = zod_1.z.object({
    result: ChargingProfileResultType,
});
exports.ClearProfileResult = zod_1.z.object({
    result: ChargingProfileResultType,
});
//# sourceMappingURL=ocpi.chargingprofiles.v22.js.map