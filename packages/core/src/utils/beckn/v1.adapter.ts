/**
 * Factory for creating Beckn v1 adapter functions
 * This wraps the v1.utils functions with dependency injection
 */

import type { SearchReqBody, InitReqBody, SelectRequest, OnSearchResponse, OnInitReqBody, OnSelectResponse } from '../../types/beckn';
import * as v1Utils from './v1.utils';

export interface V1AdapterConfig {
    dbUtils: ReturnType<typeof import('../db.utils').createDBUtils>;
    defaultRadiusMeters: number;
    shareLocationDetails: boolean;
    defaultItemName: string;
    bppId: string;
    bppUri: string;
    protocolServerUrl: string;
}

// Note: This is a temporary wrapper until v1.utils.ts is fully refactored
// The v1.utils.ts file still uses appConfig internally, so we need to set it up
// For now, we'll create the adapter by directly calling the functions
// TODO: Refactor v1.utils.ts to accept dependencies instead of using appConfig

export const createV1Adapter = (config: V1AdapterConfig) => {
    // For now, we need to make appConfig available to v1.utils
    // This is a temporary solution until v1.utils is fully refactored
    // The actual functions will be refactored in a future step
    
    return {
        createCatalogFromIntent: async (request: SearchReqBody): Promise<OnSearchResponse | null> => {
            // TODO: Pass config to v1.utils functions
            return v1Utils.createCatalogFromIntent(request);
        },
        
        createOnInitResponse: async (request: InitReqBody): Promise<OnInitReqBody> => {
            return v1Utils.createOnInitResponse(request);
        },
        
        createOnSelectResponse: async (request: SelectRequest): Promise<OnSelectResponse> => {
            return v1Utils.createOnSelectResponse(request) as OnSelectResponse;
        }
    };
};

