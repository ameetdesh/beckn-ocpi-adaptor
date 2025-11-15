export type LiveItemToken = {
    location_id: string;
    evse_uid: string;
    connector_id: string;
    tariff_id: string;
};

const SEPARATOR = '|';

const encodePart = (value: string): string => encodeURIComponent(value ?? '');

export const encodeLiveItemId = (token: LiveItemToken): string => {
    const output = [
        encodePart(token.location_id),
        encodePart(token.evse_uid),
        encodePart(token.connector_id),
        encodePart(token.tariff_id)
    ].join(SEPARATOR);
    return output;
};

export const decodeLiveItemId = (value: string): LiveItemToken | null => {
    try {
        const parts = value.split(SEPARATOR);
        if (parts.length !== 4) return null;
        return {
            location_id: decodeURIComponent(parts[0]),
            evse_uid: decodeURIComponent(parts[1]),
            connector_id: decodeURIComponent(parts[2]),
            tariff_id: decodeURIComponent(parts[3])
        };
    } catch {
        return null;
    }
};
