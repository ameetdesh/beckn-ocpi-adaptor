"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cdrs = exports.Cdr = void 0;
const zod_1 = require("zod");
const ocpi_session_1 = require("./ocpi.session");
const ocpi_tariff_1 = require("./ocpi.tariff");
exports.Cdr = zod_1.z.object({
    id: zod_1.z.string().max(36),
    start_date_time: zod_1.z.date(),
    stop_date_time: zod_1.z.date(),
    auth_id: zod_1.z.string().max(36),
    auth_method: ocpi_session_1.AuthMethod,
    location: ocpi_session_1.SessionLocation,
    meter_id: zod_1.z.string().max(255).nullish(),
    currency: zod_1.z.string().length(3),
    tariffs: zod_1.z.array(ocpi_tariff_1.Tariff).nullish(),
    charging_periods: zod_1.z.array(ocpi_session_1.ChargingPeriod).nonempty(),
    total_cost: zod_1.z.number().nonnegative(),
    total_energy: zod_1.z.number().nonnegative(),
    total_time: zod_1.z.number().nonnegative(),
    total_parking_time: zod_1.z.number().nonnegative().nullish(),
    remark: zod_1.z.string().max(255).nullish(),
    last_updated: zod_1.z.date(),
});
exports.Cdrs = zod_1.z.array(exports.Cdr);
//# sourceMappingURL=ocpi.cdr.js.map