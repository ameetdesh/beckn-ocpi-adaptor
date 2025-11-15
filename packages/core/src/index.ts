/**
 * @beckn/ocpi-adaptor-core
 * 
 * Core SDK for converting OCPI data to Beckn protocol format.
 * This package provides the core transformation logic without infrastructure dependencies.
 */

// Interfaces
export type { CacheStore } from './interfaces/cache.interface';
export type { LogStore, LogQueryParams, LogQueryResult } from './interfaces/log.interface';

// Models
export type { LogData } from './models/log.model';
export type { LocationData } from './models/location.model';
export type { ItemData } from './models/item.model';
export type { PriceComponentData } from './models/priceComponent.model';
export type { TariffData } from './models/tariff.model';

// Cache
export { createOCPICache } from './cache/ocpiCache';
export type { OCPIDataSnapshot, CachedItem, CachedTariff } from './cache/ocpiCache';

// Logging
export { createLogService } from './logging/log.service';

// Utils
export { encodeLiveItemId, decodeLiveItemId } from './utils/itemId.utils';
export type { LiveItemToken } from './utils/itemId.utils';
export { createOCPIUtils } from './utils/ocpi.utils';
export type { OCPIUtilsConfig, FetchFromOCPIOptions } from './utils/ocpi.utils';
export { createCatalogFromIntent } from './utils/common.utils';

// Types
export type {
  OnSearchResponse,
  SearchReqBody,
  OnInitReqBody,
  OnSelectResponse
} from './types/beckn';

