export type ItemData = {
    location_id: string;  // Foreign key to locations.id
    name?: string;        // Name/number printed on the EVSE (max 16 chars)
    evse_uid: string;     // Unique identifier for the EVSE
    status: string;       // Current status of the EVSE
    format?: string;
    max_voltage?: number;
    max_amperage?: number;
    max_electric_power?: number;
    connector_id?: string; // Optional connector ID
    standard?: string;    // Connector standard (e.g., "IEC_62196_T2")
    power_type?: string;  // Power type (e.g., "AC_1_PHASE", "DC")
    tariff_id?: string | null;   // Optional foreign key to tariffs.id
};