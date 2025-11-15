import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import type { CacheStore } from '../interfaces/cache.interface';

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

/**
 * Creates an OCPI cache service using the provided cache store.
 * This factory function accepts dependency injection for the cache store.
 */
export const createOCPICache = (store: CacheStore<OCPIDataSnapshot>) => {
    return {
        getSnapshot: async (): Promise<OCPIDataSnapshot | null> => store.get(),
        setSnapshot: async (snapshot: OCPIDataSnapshot): Promise<void> => store.set(snapshot),
        clearSnapshot: async (): Promise<void> => store.clear()
    };
};

