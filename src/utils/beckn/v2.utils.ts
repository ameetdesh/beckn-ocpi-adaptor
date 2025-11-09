import type {
    SearchReqBody,
    InitReqBody,
    OnSearchResponse,
    OnInitReqBody,
    SelectRequest,
    OnSelectResponse
} from '../../types/beckn';

export const createCatalogFromIntent = async (_request: SearchReqBody): Promise<OnSearchResponse | null> => {
    return Promise.reject(
        new Error('Beckn v2 createCatalogFromIntent is not implemented yet.')
    );
};

export const createOnInitResponse = async (_request: InitReqBody): Promise<OnInitReqBody> => {
    return Promise.reject(
        new Error('Beckn v2 createOnInitResponse is not implemented yet.')
    );
};

export const createOnSelectResponse = async (_request: SelectRequest): Promise<OnSelectResponse> => {
    return Promise.reject(
        new Error('Beckn v2 createOnSelectResponse is not implemented yet.')
    );
};
