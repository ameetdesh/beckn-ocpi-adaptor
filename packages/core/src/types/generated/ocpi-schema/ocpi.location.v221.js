"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locations = exports.Location = exports.PublishTokenType = exports.EnergyMix = exports.Evse = exports.Connector = exports.ConnectorType = exports.PowerType = exports.ConnectorFormat = exports.GeoLocation = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
const ocpi_common_v221_1 = require("./ocpi.common.v221");
exports.GeoLocation = zod_1.z.object({
    latitude: zod_1.z
        .string()
        .max(10)
        .regex(/-?[0-9]{1,2}\.[0-9]{5,7}/),
    longitude: zod_1.z
        .string()
        .max(11)
        .regex(/-?[0-9]{1,3}\.[0-9]{5,7}/),
});
exports.ConnectorFormat = zod_1.z.enum(["SOCKET", "CABLE"]);
exports.PowerType = zod_1.z.enum([
    "AC_1_PHASE",
    "AC_2_PHASE",
    "AC_2_PHASE_SPLIT",
    "AC_3_PHASE",
    "DC"
]);
exports.ConnectorType = zod_1.z.enum([
    "CHADEMO",
    "CHAOJI",
    "DOMESTIC_A",
    "DOMESTIC_B",
    "DOMESTIC_C",
    "DOMESTIC_D",
    "DOMESTIC_E",
    "DOMESTIC_F",
    "DOMESTIC_G",
    "DOMESTIC_H",
    "DOMESTIC_I",
    "DOMESTIC_J",
    "DOMESTIC_K",
    "DOMESTIC_L",
    "DOMESTIC_M",
    "DOMESTIC_N",
    "DOMESTIC_O",
    "GBT_AC",
    "GBT_DC",
    "IEC_60309_2_single_16",
    "IEC_60309_2_three_16",
    "IEC_60309_2_three_32",
    "IEC_60309_2_three_64",
    "IEC_62196_T1",
    "IEC_62196_T1_COMBO",
    "IEC_62196_T2",
    "IEC_62196_T2_COMBO",
    "IEC_62196_T3A",
    "IEC_62196_T3C",
    "NEMA_5_20",
    "NEMA_6_30",
    "NEMA_6_50",
    "NEMA_10_30",
    "NEMA_10_50",
    "NEMA_14_30",
    "NEMA_14_50",
    "PANTOGRAPH_BOTTOM_UP",
    "PANTOGRAPH_TOP_DOWN",
    "TESLA_R",
    "TESLA_S",
]);
exports.Connector = zod_1.z.object({
    id: zod_1.z.string().max(36),
    standard: exports.ConnectorType,
    format: exports.ConnectorFormat,
    power_type: exports.PowerType,
    max_voltage: zod_1.z.number().int(),
    max_amperage: zod_1.z.number().int(),
    max_electric_power: zod_1.z.number().int().nullish(),
    tariff_ids: zod_1.z.array(zod_1.z.string().max(36).nullish()).nullish(),
    terms_and_conditions: zod_1.z.string().url().nullish(),
    last_updated: zod_1.z.date(),
});
const EvseStatus = zod_1.z.enum([
    "AVAILABLE",
    "BLOCKED",
    "CHARGING",
    "INOPERATIVE",
    "OUTOFORDER",
    "PLANNED",
    "REMOVED",
    "RESERVED",
    "UNKNOWN",
]);
const StatusSchedule = zod_1.z.object({
    period_begin: zod_1.z.date(),
    period_end: zod_1.z.date().nullable(),
    status: EvseStatus,
});
const Capability = zod_1.z.enum([
    "CHARGING_PROFILE_CAPABLE",
    "CHARGING_PREFERENCES_CAPABLE",
    "CHIP_CARD_SUPPORT",
    "CONTACTLESS_CARD_SUPPORT",
    "CREDIT_CARD_PAYABLE",
    "DEBIT_CARD_PAYABLE",
    "PED_TERMINAL",
    "REMOTE_START_STOP_CAPABLE",
    "RESERVABLE",
    "RFID_READER",
    "START_SESSION_CONNECTOR_REQUIRED",
    "TOKEN_GROUP_CAPABLE",
    "UNLOCK_CAPABLE",
]);
const ParkingRestriction = zod_1.z.enum([
    "EV_ONLY",
    "PLUGGED",
    "DISABLED",
    "CUSTOMERS",
    "MOTORCYCLES",
]);
exports.Evse = zod_1.z.object({
    uid: zod_1.z.string().max(39),
    evse_id: zod_1.z.string().max(48).regex(/^(([A-Z]{2}\*?[A-Z0-9]{3}\*?E[A-Z0-9\*]{1,30})|(\+?[0-9]{1,3}\*[0-9]{3}\*[0-9\*]{1,32}))$/).nullish(),
    status: EvseStatus,
    status_schedule: zod_1.z.array(StatusSchedule).nullish(),
    capabilities: zod_1.z.array(Capability).nullish(),
    connectors: zod_1.z.array(exports.Connector).nonempty(),
    floor_level: zod_1.z.string().max(4).nullish(),
    coordinates: exports.GeoLocation.nullish(),
    physical_reference: zod_1.z.string().max(16).nullish(),
    directions: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    parking_restrictions: zod_1.z.array(ParkingRestriction).nullish(),
    images: zod_1.z.array(ocpi_common_1.Image).nullish(),
    last_updated: zod_1.z.date(),
});
const ParkingType = zod_1.z.enum([
    "ALONG_MOTORWAY",
    "ON_STREET",
    "ON_DRIVEWAY",
    "PARKING_GARAGE",
    "UNDERGROUND_GARAGE",
    "PARKING_LOT",
]);
const AdditionalGeoLocation = zod_1.z.object({
    latitude: zod_1.z
        .string()
        .max(10)
        .regex(/-?[0-9]{1,2}\.[0-9]{5,7}/),
    longitude: zod_1.z
        .string()
        .max(11)
        .regex(/-?[0-9]{1,3}\.[0-9]{5,7}/),
    name: ocpi_common_1.DisplayText.nullish(),
});
const Facility = zod_1.z.enum([
    "HOTEL",
    "RESTAURANT",
    "CAFE",
    "MALL",
    "SUPERMARKET",
    "SPORT",
    "RECREATION_AREA",
    "NATURE",
    "MUSEUM",
    "BIKE_SHARING",
    "BUS_STOP",
    "TAXI_STAND",
    "TRAM_STOP",
    "METRO_STATION",
    "TRAIN_STATION",
    "AIRPORT",
    "PARKING_LOT",
    "CARPOOL_PARKING",
    "FUEL_STATION",
    "WIFI",
]);
const ExceptionalPeriod = zod_1.z.object({
    period_begin: zod_1.z.date(),
    period_end: zod_1.z.date(),
});
const RegularHours = zod_1.z.object({
    weekday: zod_1.z.number().int().min(1).max(7),
    period_begin: zod_1.z
        .string()
        .length(5)
        .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
    period_end: zod_1.z
        .string()
        .length(5)
        .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
});
const Hours = zod_1.z.object({
    regular_hours: zod_1.z.array(RegularHours).nullish(),
    twentyfourseven: zod_1.z.boolean(),
    exceptional_openings: zod_1.z.array(ExceptionalPeriod).nullish(),
    exceptional_closings: zod_1.z.array(ExceptionalPeriod).nullish(),
});
const EnergySourceCategory = zod_1.z.enum([
    "NUCLEAR",
    "GENERAL_FOSSIL",
    "COAL",
    "GAS",
    "GENERAL_GREEN",
    "SOLAR",
    "WIND",
    "WATER",
]);
const EnergySource = zod_1.z.object({
    source: EnergySourceCategory,
    percentage: zod_1.z.number().min(0).max(100),
});
const EnvironmentalImpactCategory = zod_1.z.enum(["NUCLEAR_WASTE", "CARBON_DIOXIDE"]);
const EnvironmentalImpact = zod_1.z.object({
    source: EnvironmentalImpactCategory,
    amount: zod_1.z.number(),
});
exports.EnergyMix = zod_1.z.object({
    is_green_energy: zod_1.z.boolean(),
    energy_sources: zod_1.z.array(EnergySource).nullish(),
    environ_impact: zod_1.z.array(EnvironmentalImpact).nullish(),
    supplier_name: zod_1.z.string().max(64).nullish(),
    energy_product_name: zod_1.z.string().max(64).nullish(),
});
exports.PublishTokenType = zod_1.z.object({
    uid: zod_1.z.string().max(36).nullish(),
    type: ocpi_common_v221_1.TokenType.nullish(),
    visual_number: zod_1.z.string().max(64).nullish(),
    issuer: zod_1.z.string().max(64).nullish(),
    group_id: zod_1.z.string().max(36).nullish(),
});
exports.Location = zod_1.z.object({
    country_code: zod_1.z.string().length(2),
    party_id: zod_1.z.string().max(3),
    id: zod_1.z.string().max(36),
    publish: zod_1.z.boolean(),
    publish_allowed_to: zod_1.z.array(exports.PublishTokenType).nullish(),
    name: zod_1.z.string().max(255).nullish(),
    address: zod_1.z.string().max(45),
    city: zod_1.z.string().max(45),
    postal_code: zod_1.z.string().max(10).nullish(),
    state: zod_1.z.string().max(20).nullish(),
    country: zod_1.z.string().length(3),
    coordinates: exports.GeoLocation,
    related_locations: zod_1.z.array(AdditionalGeoLocation).nullish(),
    parking_type: ParkingType.nullish(),
    evses: zod_1.z.array(exports.Evse).nullish(),
    directions: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    operator: ocpi_common_1.BusinessDetails.nullish(),
    suboperator: ocpi_common_1.BusinessDetails.nullish(),
    owner: ocpi_common_1.BusinessDetails.nullish(),
    facilities: zod_1.z.array(Facility).nullish(),
    time_zone: zod_1.z.string().max(255),
    opening_times: Hours.nullish(),
    charging_when_closed: zod_1.z.boolean().nullish(),
    images: zod_1.z.array(ocpi_common_1.Image).nullish(),
    energy_mix: exports.EnergyMix.nullish(),
    last_updated: zod_1.z.date(),
});
exports.Locations = zod_1.z.array(exports.Location);
//# sourceMappingURL=ocpi.location.v221.js.map