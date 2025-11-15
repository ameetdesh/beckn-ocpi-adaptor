export type ItemData = {
    location_id: string;
    name?: string;
    evse_uid: string;
    status: string;
    format?: string;
    max_voltage?: number;
    max_amperage?: number;
    max_electric_power?: number;
    connector_id?: string;
    standard?: string;
    power_type?: string;
    tariff_id?: string | null;
};
