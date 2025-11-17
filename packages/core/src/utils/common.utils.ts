import type {
    OnSearchResponse,
    SearchReqBody,
    InitReqBody,
    OnInitReqBody,
    SelectRequest,
    OnSelectResponse
} from '../types/beckn';
import type {
    BecknV2DiscoverRequest,
    BecknV2DiscoverResponse,
    BecknV2InitRequest,
    BecknV2OnInitResponse,
    BecknV2OnSelectResponse,
    BecknV2SelectRequest
} from '../types/becknV2';

export interface TransformationsDependencies {
    becknVersion: '1.0' | '2.0';
    v1Adapter: {
        createCatalogFromIntent: (request: SearchReqBody) => Promise<OnSearchResponse | null>;
        createOnInitResponse: (request: InitReqBody) => Promise<OnInitReqBody>;
        createOnSelectResponse: (request: SelectRequest) => Promise<OnSelectResponse>;
    };
    v2Adapter: {
        createCatalogFromIntent: (request: BecknV2DiscoverRequest) => Promise<BecknV2DiscoverResponse | null>;
        createOnInitResponse: (request: BecknV2InitRequest) => Promise<BecknV2OnInitResponse>;
        createOnSelectResponse: (request: BecknV2SelectRequest) => Promise<BecknV2OnSelectResponse>;
    };
}

export const createTransformations = (deps: TransformationsDependencies) => {
    const adaptersByVersion = {
        '1.0': deps.v1Adapter,
        '2.0': deps.v2Adapter
    };

    const getAdapters = () => adaptersByVersion[deps.becknVersion];

    return {
        createCatalogFromIntent: (request: SearchReqBody | BecknV2DiscoverRequest): Promise<OnSearchResponse | BecknV2DiscoverResponse | null> => {
            if (deps.becknVersion === '1.0') {
                return getAdapters().createCatalogFromIntent(request as any) as Promise<OnSearchResponse | null>;
            } else {
                return getAdapters().createCatalogFromIntent(request as any) as Promise<BecknV2DiscoverResponse | null>;
            }
        },

        createDiscoverCatalog: (request: BecknV2DiscoverRequest) => {
            if (deps.becknVersion === '1.0') {
                return Promise.reject(new Error('Discover flow is not available for Beckn v1.'));
            }
            // For v2, createDiscoverCatalog is the same as createCatalogFromIntent
            // (v2 uses discover/on_discover instead of search/on_search)
            return getAdapters().createCatalogFromIntent(request as any) as Promise<BecknV2DiscoverResponse | null>;
        },

        createOnInitResponse: (request: InitReqBody | BecknV2InitRequest): Promise<OnInitReqBody | BecknV2OnInitResponse> => {
            if (deps.becknVersion === '1.0') {
                return getAdapters().createOnInitResponse(request as any) as Promise<OnInitReqBody>;
            } else {
                return getAdapters().createOnInitResponse(request as any) as Promise<BecknV2OnInitResponse>;
            }
        },

        createOnSelectResponse: (request: SelectRequest | BecknV2SelectRequest): Promise<OnSelectResponse | BecknV2OnSelectResponse> => {
            if (deps.becknVersion === '1.0') {
                return getAdapters().createOnSelectResponse(request as any) as Promise<OnSelectResponse>;
            } else {
                return getAdapters().createOnSelectResponse(request as any) as Promise<BecknV2OnSelectResponse>;
            }
        }
    };
};
