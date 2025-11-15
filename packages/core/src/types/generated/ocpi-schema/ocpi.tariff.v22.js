"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tariffs = exports.Tariff = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
const ocpi_common_v22_1 = require("./ocpi.common.v22");
const ocpi_location_v22_1 = require("./ocpi.location.v22");
const TariffDimensionType = zod_1.z.enum(["ENERGY", "FLAT", "PARKING_TIME", "TIME"]);
const PriceComponent = zod_1.z.object({
    type: TariffDimensionType,
    price: zod_1.z.number().nonnegative(),
    vat: zod_1.z.number().nonnegative().nullish(),
    step_size: zod_1.z.number().int().nonnegative(),
});
const DayOfWeek = zod_1.z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
]);
const ReservationRestrictionType = zod_1.z.enum(["RESERVATION", "RESERVATION_EXPIRES"]);
const TariffRestrictions = zod_1.z.object({
    start_time: zod_1.z
        .string()
        .length(5)
        .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
        .nullish(),
    end_time: zod_1.z
        .string()
        .length(5)
        .regex(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)
        .nullish(),
    start_date: zod_1.z
        .string()
        .length(10)
        .regex(/([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)
        .nullish(),
    end_date: zod_1.z
        .string()
        .length(10)
        .regex(/([12][0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/)
        .nullish(),
    min_kwh: zod_1.z.number().nonnegative().nullish(),
    max_kwh: zod_1.z.number().nonnegative().nullish(),
    min_current: zod_1.z.number().nonnegative().nullish(),
    max_current: zod_1.z.number().nonnegative().nullish(),
    min_power: zod_1.z.number().nonnegative().nullish(),
    max_power: zod_1.z.number().nonnegative().nullish(),
    min_duration: zod_1.z.number().int().nonnegative().nullish(),
    max_duration: zod_1.z.number().int().nonnegative().nullish(),
    day_of_week: zod_1.z.array(DayOfWeek).nullish(),
    reservation: ReservationRestrictionType.nullish()
});
const TariffElement = zod_1.z.object({
    price_components: zod_1.z.array(PriceComponent).nonempty(),
    restrictions: TariffRestrictions.nullish(),
});
const TariffType = zod_1.z.enum([
    "AD_HOC_PAYMENT",
    "PROFILE_CHEAP",
    "PROFILE_FAST",
    "PROFILE_GREEN",
    "REGULAR"
]);
exports.Tariff = zod_1.z.object({
    country_code: zod_1.z.string().length(2),
    party_id: zod_1.z.string().max(3),
    id: zod_1.z.string().max(36),
    currency: zod_1.z.string().length(3),
    type: TariffType.nullish(),
    tariff_alt_text: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    tariff_alt_url: zod_1.z.string().url().nullish(),
    min_price: ocpi_common_v22_1.Price.nullish(),
    max_price: ocpi_common_v22_1.Price.nullish(),
    elements: zod_1.z.array(TariffElement).nonempty(),
    start_date_time: zod_1.z.date().nullish(),
    end_date_time: zod_1.z.date().nullish(),
    energy_mix: ocpi_location_v22_1.EnergyMix.nullish(),
    last_updated: zod_1.z.date(),
});
exports.Tariffs = zod_1.z.array(exports.Tariff);
//# sourceMappingURL=ocpi.tariff.v22.js.map