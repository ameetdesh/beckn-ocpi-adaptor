"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cdrs = exports.Cdr = exports.SignedData = exports.SignedValue = exports.ChargingPeriod = exports.CdrLocation = exports.CdrToken = exports.CdrDimension = exports.AuthMethod = void 0;
const zod_1 = require("zod");
const ocpi_common_v22_1 = require("./ocpi.common.v22");
const ocpi_location_v22_1 = require("./ocpi.location.v22");
const ocpi_common_v22_2 = require("./ocpi.common.v22");
const ocpi_tariff_v22_1 = require("./ocpi.tariff.v22");
exports.AuthMethod = zod_1.z.enum(["AUTH_REQUEST", "COMMAND", "WHITELIST"]);
const CdrDimensionType = zod_1.z.enum([
    "CURRENT",
    "ENERGY",
    "ENERGY_EXPORT",
    "ENERGY_IMPORT",
    "MAX_CURRENT",
    "MIN_CURRENT",
    "MAX_POWER",
    "MIN_POWER",
    "PARKING_TIME",
    "POWER",
    "RESERVATION_TIME",
    "STATE_OF_CHARGE",
    "TIME",
]);
exports.CdrDimension = zod_1.z.object({
    type: CdrDimensionType,
    volume: zod_1.z.number(),
});
exports.CdrToken = zod_1.z.object({
    uid: zod_1.z.string().max(36),
    type: ocpi_common_v22_1.TokenType.nullish(),
    contract_id: zod_1.z.string().max(36),
});
exports.CdrLocation = zod_1.z.object({
    id: zod_1.z.string().max(36),
    name: zod_1.z.string().max(255).nullish(),
    address: zod_1.z.string().max(45),
    city: zod_1.z.string().max(45),
    postal_code: zod_1.z.string().max(10),
    country: zod_1.z.string().length(3),
    coordinates: ocpi_location_v22_1.GeoLocation,
    evse_uid: zod_1.z.string().max(36),
    evse_id: zod_1.z.string().max(48).regex(/^(([A-Z]{2}\*?[A-Z0-9]{3}\*?E[A-Z0-9\*]{1,30})|(\+?[0-9]{1,3}\*[0-9]{3}\*[0-9\*]{1,32}))$/),
    connector_id: zod_1.z.string().max(36),
    connector_standard: ocpi_location_v22_1.ConnectorType,
    connector_format: ocpi_location_v22_1.ConnectorFormat,
    connector_power_type: ocpi_location_v22_1.PowerType,
});
exports.ChargingPeriod = zod_1.z.object({
    start_date_time: zod_1.z.date(),
    dimensions: zod_1.z.array(exports.CdrDimension).nonempty(),
    tariff_id: zod_1.z.string().max(36).nullish(),
});
exports.SignedValue = zod_1.z.object({
    nature: zod_1.z.string().max(32),
    plain_data: zod_1.z.string().max(512),
    signed_data: zod_1.z.string().max(512)
});
exports.SignedData = zod_1.z.object({
    encoding_method: zod_1.z.string().max(36),
    encoding_method_version: zod_1.z.number().int().nullish(),
    public_key: zod_1.z.string().max(512).nullish(),
    signed_values: zod_1.z.array(exports.SignedValue).nonempty(),
    url: zod_1.z.string().max(512).nullish()
});
exports.Cdr = zod_1.z.object({
    country_code: zod_1.z.string().length(2),
    party_id: zod_1.z.string().max(3),
    id: zod_1.z.string().max(39),
    start_date_time: zod_1.z.date(),
    end_date_time: zod_1.z.date(),
    session_id: zod_1.z.string().max(36).nullish(),
    cdr_token: exports.CdrToken,
    auth_method: exports.AuthMethod,
    authorization_reference: zod_1.z.string().max(36).nullish(),
    cdr_location: exports.CdrLocation,
    meter_id: zod_1.z.string().max(255).nullish(),
    currency: zod_1.z.string().length(3),
    tariffs: zod_1.z.array(ocpi_tariff_v22_1.Tariff).nullish(),
    charging_periods: zod_1.z.array(exports.ChargingPeriod).nonempty(),
    signed_data: exports.SignedData.nullish(),
    total_cost: ocpi_common_v22_2.Price,
    total_fixed_cost: ocpi_common_v22_2.Price.nullish(),
    total_energy: zod_1.z.number().nonnegative(),
    total_energy_cost: ocpi_common_v22_2.Price.nullish(),
    total_time: zod_1.z.number().nonnegative(),
    total_time_cost: ocpi_common_v22_2.Price.nullish(),
    total_parking_time: zod_1.z.number().nonnegative().nullish(),
    total_parking_cost: ocpi_common_v22_2.Price.nullish(),
    total_reservation_cost: ocpi_common_v22_2.Price.nullish(),
    remark: zod_1.z.string().max(255).nullish(),
    invoice_reference_id: zod_1.z.string().max(39).nullish(),
    credit: zod_1.z.boolean().nullish(),
    credit_reference_id: zod_1.z.string().max(39).nullish(),
    last_updated: zod_1.z.date(),
});
exports.Cdrs = zod_1.z.array(exports.Cdr);
//# sourceMappingURL=ocpi.cdrs.v22.js.map