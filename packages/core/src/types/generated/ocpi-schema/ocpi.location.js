"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locations = exports.Location = exports.EnergyMix = exports.Evse = exports.Connector = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
const ConnectorFormat = zod_1.z.enum(["SOCKET", "CABLE"]);
const PowerType = zod_1.z.enum(["AC_1_PHASE", "AC_3_PHASE", "DC"]);
const ConnectorType = zod_1.z.enum([
    "CHADEMO",
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
    "TESLA_R",
    "TESLA_S",
]);
exports.Connector = zod_1.z.object({
    id: zod_1.z.string().max(36),
    standard: ConnectorType,
    format: ConnectorFormat,
    power_type: PowerType,
    voltage: zod_1.z.number().int(),
    amperage: zod_1.z.number().int(),
    tariff_id: zod_1.z.string().max(36).nullish(),
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
    period_end: zod_1.z.date().nullish(),
    status: EvseStatus,
});
const Capability = zod_1.z.enum([
    "CHARGING_PROFILE_CAPABLE",
    "CREDIT_CARD_PAYABLE",
    "REMOTE_START_STOP_CAPABLE",
    "RESERVABLE",
    "RFID_READER",
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
    coordinates: ocpi_common_1.GeoLocation.nullish(),
    physical_reference: zod_1.z.string().max(16).nullish(),
    directions: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    parking_restrictions: zod_1.z.array(ParkingRestriction).nullish(),
    images: zod_1.z.array(ocpi_common_1.Image).nullish(),
    last_updated: zod_1.z.date(),
});
const LocationType = zod_1.z.enum([
    "ON_STREET",
    "PARKING_GARAGE",
    "UNDERGROUND_GARAGE",
    "PARKING_LOT",
    "OTHER",
    "UNKNOWN",
]);
const AdditionalGeoLocation = zod_1.z.object({
    latitude: zod_1.z
        .string()
        .max(10)
        .regex(/-?[0-9]{1,2}\.[0-9]{6}/),
    longitude: zod_1.z
        .string()
        .max(11)
        .regex(/-?[0-9]{1,3}\.[0-9]{6}/),
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
    "BUS_STOP",
    "TAXI_STAND",
    "TRAIN_STATION",
    "AIRPORT",
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
exports.Location = zod_1.z.object({
    id: zod_1.z.string().max(39),
    type: LocationType,
    name: zod_1.z.string().max(255).nullish(),
    address: zod_1.z.string().max(45),
    city: zod_1.z.string().max(45),
    postal_code: zod_1.z.string().max(10),
    country: zod_1.z.string().length(3),
    coordinates: ocpi_common_1.GeoLocation,
    related_locations: zod_1.z.array(AdditionalGeoLocation).nullish(),
    evses: zod_1.z.array(exports.Evse).nullish(),
    directions: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    operator: ocpi_common_1.BusinessDetails.nullish(),
    suboperator: ocpi_common_1.BusinessDetails.nullish(),
    owner: ocpi_common_1.BusinessDetails.nullish(),
    facilities: zod_1.z.array(Facility).nullish(),
    time_zone: zod_1.z.string().max(255).nullish(),
    opening_times: Hours.nullish(),
    charging_when_closed: zod_1.z.boolean().nullish(),
    images: zod_1.z.array(ocpi_common_1.Image).nullish(),
    energy_mix: exports.EnergyMix.nullish(),
    last_updated: zod_1.z.date(),
});
exports.Locations = zod_1.z.array(exports.Location);
//# sourceMappingURL=ocpi.location.js.map