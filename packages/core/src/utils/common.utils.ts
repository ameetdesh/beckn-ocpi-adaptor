import type {
    OnSearchResponse,
    SearchReqBody,
    InitReqBody,
    OnInitReqBody,
    SelectRequest,
    OnSelectResponse
} from '../types/beckn';
import { appConfig } from '../config/app.config';
import * as becknV1 from './beckn/v1.utils';
import * as becknV2 from './beckn/v2.utils';
import type {
    BecknV2DiscoverRequest,
    BecknV2DiscoverResponse,
    BecknV2InitRequest,
    BecknV2OnInitResponse,
    BecknV2OnSelectResponse,
    BecknV2SelectRequest
} from '../types/becknV2';

type BecknAdapters = {
    createCatalogFromIntent: (request: unknown) => Promise<unknown>;
    createDiscoverCatalog?: (request: BecknV2DiscoverRequest) => Promise<BecknV2DiscoverResponse | null>;
    createOnInitResponse: (request: unknown) => Promise<unknown>;
    createOnSelectResponse: (request: unknown) => Promise<unknown>;
};

const adaptersByVersion: Record<'1.0' | '2.0', BecknAdapters> = {
    '1.0': {
        createCatalogFromIntent: (request: unknown) =>
            becknV1.createCatalogFromIntent(request as SearchReqBody),
        createOnInitResponse: (request: unknown) =>
            becknV1.createOnInitResponse(request as InitReqBody),
        createOnSelectResponse: (request: unknown) =>
            becknV1.createOnSelectResponse(request as SelectRequest)
    },
    '2.0': {
        createCatalogFromIntent: becknV2.createCatalogFromIntent,
        createDiscoverCatalog: becknV2.createDiscoverCatalog,
        createOnInitResponse: (request: unknown) =>
            becknV2.createOnInitResponse(request as BecknV2InitRequest),
        createOnSelectResponse: (request: unknown) =>
            becknV2.createOnSelectResponse(request as BecknV2SelectRequest)
    }
};

const getAdapters = (): BecknAdapters => adaptersByVersion[appConfig.beckn.version];

export const createCatalogFromIntent = (request: SearchReqBody) =>
    getAdapters().createCatalogFromIntent(request) as Promise<OnSearchResponse | null>;

export const createDiscoverCatalog = (request: BecknV2DiscoverRequest) => {
    const adapters = getAdapters();
    if (!adapters.createDiscoverCatalog) {
        return Promise.reject(
            new Error('Discover flow is not available for Beckn v1.')
        );
    }
    return adapters.createDiscoverCatalog(request);
};

export const createOnInitResponse = (request: InitReqBody | BecknV2InitRequest) =>
    getAdapters().createOnInitResponse(request) as Promise<OnInitReqBody | BecknV2OnInitResponse>;

export const createOnSelectResponse = (request: SelectRequest | BecknV2SelectRequest) =>
    getAdapters().createOnSelectResponse(request) as Promise<OnSelectResponse | BecknV2OnSelectResponse>;
