import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import type { OCPIDataSnapshot, CachedItem, CachedTariff } from '../cache/ocpiCache';

export interface DBUtilsDependencies {
    ocpiCache: {
        getSnapshot: () => Promise<OCPIDataSnapshot | null>;
    };
    ocpiUtils: {
        buildOCPIDataSnapshot: () => Promise<OCPIDataSnapshot>;
        refreshOCPIcache: () => Promise<OCPIDataSnapshot>;
    };
    useCache: boolean;
}

export type ActiveTariff = {
    id: string;
    start_date_time?: string;
    end_date_time?: string;
    currency: string;
    country_code?: string;
    price_components: Array<{
        id: string;
        price: number;
        type: string;
        vat: number | null;
        step_size: number | null;
    }>;
};

export const createDBUtils = (deps: DBUtilsDependencies) => {
    const loadSnapshot = async (): Promise<OCPIDataSnapshot> => {
        if (!deps.useCache) {
            return deps.ocpiUtils.buildOCPIDataSnapshot();
        }

        const cached = await deps.ocpiCache.getSnapshot();
        if (cached) {
            return cached;
        }

        return deps.ocpiUtils.refreshOCPIcache();
    };

    return {
        getOcpiSnapshot: async (): Promise<OCPIDataSnapshot> => loadSnapshot(),

        getLocationById: async (id: string): Promise<LocationData | null> => {
            const snapshot = await loadSnapshot();
            return snapshot.locations.find(location => location.id === id) ?? null;
        },

        getItemsByLocation: async (locationId: string): Promise<CachedItem[]> => {
            const snapshot = await loadSnapshot();
            return snapshot.items.filter(item => item.location_id === locationId);
        },

        getItemById: async (id: string | number): Promise<(ItemData & { id: string }) | null> => {
            const itemId = String(id);
            const snapshot = await loadSnapshot();
            let item = snapshot.items.find(current => current.id === itemId) ?? null;

            if (!item && deps.useCache) {
                const refreshed = await deps.ocpiUtils.refreshOCPIcache();
                item = refreshed.items.find(current => current.id === itemId) ?? null;
            }

            return item ?? null;
        },

        getActiveTariffWithComponents: async (id: string): Promise<ActiveTariff | null> => {
            const snapshot = await loadSnapshot();
            const tariff = snapshot.tariffs.find(current => current.id === id);
            if (!tariff) return null;

            return {
                id: tariff.id,
                start_date_time: tariff.start_date_time,
                end_date_time: tariff.end_date_time,
                currency: tariff.currency,
                country_code: tariff.country_code,
                price_components: tariff.price_components.map((component, index) => ({
                    id: `${tariff.id}-${index}`,
                    price: component.price,
                    type: component.type,
                    vat: component.vat ?? null,
                    step_size: component.step_size ?? null
                }))
            };
        }
    };
};

// ActiveTariff is already exported above
