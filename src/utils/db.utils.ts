import { appConfig } from '../config/app.config';
import type { LocationData } from '../models/location.model';
import type { ItemData } from '../models/item.model';
import type { OCPIDataSnapshot, CachedItem, CachedTariff } from '../cache/ocpiCache';
import { getSnapshot } from '../cache/ocpiCache';
import { refreshOCPIcache, buildOCPIDataSnapshot } from './ocpi.utils';

const shouldUseCache = () => appConfig.app.initialization.use_cache;

const loadSnapshot = async (): Promise<OCPIDataSnapshot> => {
    if (!shouldUseCache()) {
        return buildOCPIDataSnapshot();
    }

    const cached = await getSnapshot();
    if (cached) {
        return cached;
    }

    return refreshOCPIcache();
};

export const getAllLocations = async (): Promise<LocationData[]> => {
    const snapshot = await loadSnapshot();
    return snapshot.locations;
};

export const getLocationById = async (id: string): Promise<LocationData | null> => {
    const snapshot = await loadSnapshot();
    return snapshot.locations.find(location => location.id === id) ?? null;
};

export const getItemsByLocation = async (locationId: string): Promise<CachedItem[]> => {
    const snapshot = await loadSnapshot();
    return snapshot.items.filter(item => item.location_id === locationId);
};

export const getItemById = async (id: string | number): Promise<(ItemData & { id: string }) | null> => {
    const itemId = String(id);
    const snapshot = await loadSnapshot();
    let item = snapshot.items.find(current => current.id === itemId) ?? null;

    if (!item && shouldUseCache()) {
        const refreshed = await refreshOCPIcache();
        item = refreshed.items.find(current => current.id === itemId) ?? null;
    }

    return item ?? null;
};

export const getAllTariffs = async (): Promise<CachedTariff[]> => {
    const snapshot = await loadSnapshot();
    return snapshot.tariffs;
};

export const getAllItems = async (): Promise<CachedItem[]> => {
    const snapshot = await loadSnapshot();
    return snapshot.items;
};

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

export const getActiveTariffWithComponents = async (id: string): Promise<ActiveTariff | null> => {
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
};
