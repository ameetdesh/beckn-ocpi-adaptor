import { appConfig } from '../config/app.config';
import { getRedisClient } from './redis.client';
import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';

export type CachedItem = ItemData & { id: string };

export type CachedTariff = {
    id: string;
    currency: string;
    start_date_time?: string;
    end_date_time?: string;
    country_code?: string;
    price_components: Array<{
        type: string;
        price: number;
        vat?: number | null;
        step_size?: number | null;
    }>;
};

export type OCPIDataSnapshot = {
    fetched_at: string;
    locations: LocationData[];
    items: CachedItem[];
    tariffs: CachedTariff[];
};

const SNAPSHOT_KEY = 'ocpi:snapshot';

export const getSnapshot = async (): Promise<OCPIDataSnapshot | null> => {
    try {
        const client = await getRedisClient();
        const payload = await client.get(SNAPSHOT_KEY);
        if (!payload) return null;
        return JSON.parse(payload) as OCPIDataSnapshot;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to read OCPI snapshot from Redis:`, error);
        return null;
    }
};

export const setSnapshot = async (snapshot: OCPIDataSnapshot): Promise<void> => {
    try {
        const client = await getRedisClient();
        await client.set(
            SNAPSHOT_KEY,
            JSON.stringify(snapshot),
            {
                EX: appConfig.cache.ttl_seconds
            }
        );
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to store OCPI snapshot in Redis:`, error);
    }
};

export const clearSnapshot = async (): Promise<void> => {
    try {
        const client = await getRedisClient();
        await client.del(SNAPSHOT_KEY);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Failed to clear OCPI snapshot from Redis:`, error);
    }
};
