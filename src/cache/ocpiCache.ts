import { appConfig } from '../config/app.config';
import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import { createRedisTTLCacheStore, createNoopTTLCacheStore } from './ttlCacheStore';

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

const ttlCacheStore =
    appConfig.cache.store === 'redis'
        ? createRedisTTLCacheStore<OCPIDataSnapshot>('ocpi:snapshot', appConfig.cache.ttl_seconds)
        : createNoopTTLCacheStore<OCPIDataSnapshot>(appConfig.cache.ttl_seconds);

export const getSnapshot = async (): Promise<OCPIDataSnapshot | null> => ttlCacheStore.get();

export const setSnapshot = async (snapshot: OCPIDataSnapshot): Promise<void> => ttlCacheStore.set(snapshot);

export const clearSnapshot = async (): Promise<void> => ttlCacheStore.clear();
