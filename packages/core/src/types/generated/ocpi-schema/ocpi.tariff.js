"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tariffs = exports.Tariff = void 0;
const zod_1 = require("zod");
const ocpi_common_1 = require("./ocpi.common");
const ocpi_location_1 = require("./ocpi.location");
const TariffDimensionType = zod_1.z.enum(["ENERGY", "FLAT", "PARKING_TIME", "TIME"]);
const PriceComponent = zod_1.z.object({
    type: TariffDimensionType,
    price: zod_1.z.number().nonnegative(),
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
const TariffRestrictions = zod_1.z.object({
    start_time: zod_1.z
        .string()
        .length(5)
        .regex(/[0-2][0-9]:[0-5][0-9]/)
        .nullish(),
    end_time: zod_1.z
        .string()
        .length(5)
        .regex(/[0-2][0-9]:[0-5][0-9]/)
        .nullish(),
    start_date: zod_1.z.string().length(10).nullish(),
    end_date: zod_1.z.string().length(10).nullish(),
    min_kwh: zod_1.z.number().nonnegative().nullish(),
    max_kwh: zod_1.z.number().nonnegative().nullish(),
    min_power: zod_1.z.number().nonnegative().nullish(),
    max_power: zod_1.z.number().nonnegative().nullish(),
    min_duration: zod_1.z.number().nonnegative().nullish(),
    max_duration: zod_1.z.number().nonnegative().nullish(),
    day_of_week: DayOfWeek.nullish(),
});
const TariffElement = zod_1.z.object({
    price_components: zod_1.z.array(PriceComponent).nonempty(),
    restrictions: TariffRestrictions.nullish(),
});
exports.Tariff = zod_1.z.object({
    id: zod_1.z.string().max(36),
    currency: zod_1.z.string().length(3),
    tariff_alt_text: zod_1.z.array(ocpi_common_1.DisplayText).nullish(),
    tariff_alt_url: zod_1.z.string().url().nullish(),
    elements: zod_1.z.array(TariffElement).nonempty(),
    energy_mix: ocpi_location_1.EnergyMix.nullish(),
    last_updated: zod_1.z.date(),
});
exports.Tariffs = zod_1.z.array(exports.Tariff);
//# sourceMappingURL=ocpi.tariff.js.map