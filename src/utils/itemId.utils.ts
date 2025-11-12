import { Buffer } from 'buffer';

export type LiveItemToken = {
    location_id: string;
    evse_uid: string;
    connector_id: string;
    tariff_id: string;
};

export const encodeLiveItemId = (token: LiveItemToken): string => {
    const base64 = Buffer.from(JSON.stringify({ v: 1, ...token }), 'utf8').toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decodeLiveItemId = (value: string): LiveItemToken | null => {
    try {
        const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
        const json = Buffer.from(padded, 'base64').toString('utf8');
        const parsed = JSON.parse(json);
        if (
            parsed?.v === 1 &&
            typeof parsed.location_id === 'string' &&
            typeof parsed.evse_uid === 'string' &&
            typeof parsed.connector_id === 'string' &&
            typeof parsed.tariff_id === 'string'
        ) {
            return {
                location_id: parsed.location_id,
                evse_uid: parsed.evse_uid,
                connector_id: parsed.connector_id,
                tariff_id: parsed.tariff_id
            };
        }
    } catch {
        // ignore parse errors
    }
    return null;
};
