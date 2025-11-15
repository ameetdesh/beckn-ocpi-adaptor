import { ItemData } from '../models/item.model';

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

import { LocationData } from '../models/location.model';
