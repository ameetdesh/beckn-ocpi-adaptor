/**
 * Factory for creating Beckn transformation functions
 * This wires together v1/v2 adapters with all their dependencies
 */

import type {
    SearchReqBody,
    InitReqBody,
    SelectRequest,
    OnSearchResponse,
    OnInitReqBody,
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
import { createDBUtils, type DBUtilsDependencies } from './db.utils';
import { createTransformations, type TransformationsDependencies } from './common.utils';
import { setV1UtilsDependencies } from './beckn/v1.utils';
import { setV2UtilsDependencies } from './beckn/v2.utils';
import * as v1Utils from './beckn/v1.utils';
import * as v2Utils from './beckn/v2.utils';

export interface TransformationsFactoryConfig {
    becknVersion: '1.0' | '2.0';
    dbUtils: ReturnType<typeof createDBUtils>;
    ocpiUtils: {
        checkEVSEStatus: (locationId: string, evseUid: string, context?: any) => Promise<any>;
    };
    config: {
        app: {
            discovery: { default_radius_meters: number; share_location_details: boolean };
            defaults: { item_name: string };
        };
        beckn: { bpp_id: string; bpp_uri: string; protocol_server_url: string };
    };
}

export const createTransformationsFactory = (factoryConfig: TransformationsFactoryConfig) => {
    // Set up v1 utils dependencies (they use a global setter for now)
    setV1UtilsDependencies({
        dbUtils: factoryConfig.dbUtils,
        ocpiUtils: factoryConfig.ocpiUtils,
        config: factoryConfig.config
    });

    // Set up v2 utils dependencies
    setV2UtilsDependencies({
        dbUtils: factoryConfig.dbUtils,
        ocpiUtils: factoryConfig.ocpiUtils,
        config: {
            beckn: factoryConfig.config.beckn
        }
    });

    // Create v1 adapter
    const v1Adapter = {
        createCatalogFromIntent: async (request: SearchReqBody): Promise<OnSearchResponse | null> => {
            return v1Utils.createCatalogFromIntent(request as any);
        },
        createOnInitResponse: async (request: InitReqBody): Promise<OnInitReqBody> => {
            return v1Utils.createOnInitResponse(request as any);
        },
        createOnSelectResponse: async (request: SelectRequest): Promise<OnSelectResponse> => {
            return v1Utils.createOnSelectResponse(request as any) as OnSelectResponse;
        }
    };

    // Create v2 adapter (TODO: refactor v2.utils similarly)
    const v2Adapter = {
        createCatalogFromIntent: async (request: BecknV2DiscoverRequest): Promise<BecknV2DiscoverResponse | null> => {
            return v2Utils.createDiscoverCatalog(request as any);
        },
        createDiscoverCatalog: async (request: BecknV2DiscoverRequest): Promise<BecknV2DiscoverResponse | null> => {
            return v2Utils.createDiscoverCatalog(request as any);
        },
        createOnInitResponse: async (request: BecknV2InitRequest): Promise<BecknV2OnInitResponse> => {
            return v2Utils.createOnInitResponse(request as any);
        },
        createOnSelectResponse: async (request: BecknV2SelectRequest): Promise<BecknV2OnSelectResponse> => {
            return v2Utils.createOnSelectResponse(request as any);
        }
    };

    // Create transformations using the factory
    const transformations = createTransformations({
        becknVersion: factoryConfig.becknVersion,
        v1Adapter,
        v2Adapter
    });

    return transformations;
};

