import { z } from 'zod';

import {
    Location as OcpiLocationSchema,
    Locations as OcpiLocationsSchema,
    Evse as OcpiEvseSchema,
    Connector as OcpiConnectorSchema,
} from '../../specs/ocpi-schema/ocpi.location.v221';
import {
    Tariff as OcpiTariffSchema,
    Tariffs as OcpiTariffsSchema,
} from '../../specs/ocpi-schema/ocpi.tariff.v221';

export const OCPILocationSchema = OcpiLocationSchema;
export const OCPILocationsSchema = OcpiLocationsSchema;
export type OCPILocation = z.infer<typeof OCPILocationSchema>;

export const OCPIEVSESchema = OcpiEvseSchema;
export type OCPIEVSE = z.infer<typeof OCPIEVSESchema>;

export const OCPIConnectorSchema = OcpiConnectorSchema;
export type OCPIConnector = z.infer<typeof OCPIConnectorSchema>;

export const OCPITariffSchema = OcpiTariffSchema;
export const OCPITariffsSchema = OcpiTariffsSchema;
export type OCPITariff = z.infer<typeof OCPITariffSchema>;

/**
 * Aggregated tariff representation used within the application when combining
 * OCPI tariff data with associated price components.
 */
export type Tariff = {
    id: any;
    start_date_time: any;
    end_date_time: any;
    currency: any;
    country_code: any;
    price_components: Array<{
        id: string;
        type: string;
        price: number;
        step_size: number;
        vat: number;
    }>;
};
