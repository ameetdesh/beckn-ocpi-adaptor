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

type BecknAdapters = {
    createCatalogFromIntent: typeof becknV1.createCatalogFromIntent;
    createOnInitResponse: typeof becknV1.createOnInitResponse;
    createOnSelectResponse: typeof becknV1.createOnSelectResponse;
};

const adaptersByVersion: Record<'1.0' | '2.0', BecknAdapters> = {
    '1.0': {
        createCatalogFromIntent: becknV1.createCatalogFromIntent,
        createOnInitResponse: becknV1.createOnInitResponse,
        createOnSelectResponse: becknV1.createOnSelectResponse
    },
    '2.0': {
        createCatalogFromIntent: becknV2.createCatalogFromIntent,
        createOnInitResponse: becknV2.createOnInitResponse,
        createOnSelectResponse: becknV2.createOnSelectResponse
    }
};

const getAdapters = (): BecknAdapters => adaptersByVersion[appConfig.beckn.version];

export const createCatalogFromIntent = (request: SearchReqBody) =>
    getAdapters().createCatalogFromIntent(request);

export const createOnInitResponse = (request: InitReqBody) =>
    getAdapters().createOnInitResponse(request);

export const createOnSelectResponse = (request: SelectRequest) =>
    getAdapters().createOnSelectResponse(request);
