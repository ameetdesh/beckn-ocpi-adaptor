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
export { createDBUtils } from './utils/db.utils';
export type { DBUtilsDependencies, ActiveTariff } from './utils/db.utils';
export { createTransformations } from './utils/common.utils';
export type { TransformationsDependencies } from './utils/common.utils';
export { createTransformationsFactory } from './utils/transformations.factory';
export type { TransformationsFactoryConfig } from './utils/transformations.factory';
export { error_messages } from './utils/error_codes';

// Types - Beckn v1
export type {
  OnSearchResponse,
  SearchReqBody,
  InitReqBody,
  OnInitReqBody,
  OnSelectResponse,
  SelectRequest,
  Context,
  Item,
  Location,
  Catalog,
  Fulfillment,
  Quote,
  SearchRequest,
  SyncResponse
} from './types/beckn';
export {
  LocationSchema,
  ContextSchema,
  CatalogSchema,
  ItemSchema,
  FulfillmentSchema,
  QuoteSchema,
  SearchRequestSchema,
  SelectRequestSchema,
  OnSearchResponseSchema,
  OnSelectResponseSchema,
  SyncResponseSchema,
  locationWithRadiusSchema
} from './types/beckn';

// Types - Beckn v2
export type {
  BecknV2DiscoverRequest,
  BecknV2DiscoverResponse,
  BecknV2SelectRequest,
  BecknV2OnSelectResponse,
  BecknV2InitRequest,
  BecknV2OnInitResponse
} from './types/becknV2';
export {
  BecknV2DiscoverRequestSchema,
  BecknV2DiscoverResponseSchema,
  BecknV2SelectRequestSchema,
  BecknV2OnSelectResponseSchema,
  BecknV2InitRequestSchema,
  BecknV2OnInitResponseSchema
} from './types/becknV2';

// Types - OCPI
export {
  OCPILocationSchema,
  OCPILocationsSchema,
  OCPIEVSESchema,
  OCPIConnectorSchema,
  OCPITariffSchema,
  OCPITariffsSchema
} from './types/ocpi';
export type {
  OCPILocation,
  OCPIEVSE,
  OCPIConnector,
  OCPITariff
} from './types/ocpi';

