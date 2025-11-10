import { Router, Request, Response } from 'express';
import { createRouteHandler } from '../../utils/routeHandlers.utils';
import type { SearchReqBody, SelectRequest, InitReqBody } from '../../types/beckn';
import {
    createCatalogFromIntent as createCatalogFromIntentV1,
    createOnSelectResponse as createOnSelectResponseV1,
    createOnInitResponse as createOnInitResponseV1
} from '../../utils/beckn/v1.utils';
import type { OnSearchResponse, OnSelectResponse, OnInitReqBody } from '../../types/beckn';

const router = Router();

const searchHandlers = createRouteHandler({
    action: 'search',
    stage: 'discovery'
});

const selectHandlers = createRouteHandler({
    action: 'select',
    stage: 'order'
});

const initHandlers = createRouteHandler({
    action: 'init',
    stage: 'order'
});

router.post('/search', async (req: Request, res: Response) => {
    const searchRequest = req.body as SearchReqBody;
    const context = searchRequest.context;

    try {
        searchHandlers.sendAck(req, res, context);
        const response = await createCatalogFromIntentV1(searchRequest) as OnSearchResponse | null;
        if (!response) {
            console.warn(`[${new Date().toISOString()}] [v1] Failed to create catalog from intent`);
            return;
        }
        await searchHandlers.sendToProtocolServer(response, context);
    } catch (error: unknown) {
        searchHandlers.handleError(error, req, res, context);
    }
});

router.post('/select', async (req: Request, res: Response) => {
    const selectRequest = req.body as SelectRequest;
    const context = selectRequest.context;

    try {
        selectHandlers.sendAck(req, res, context);
        const response = await createOnSelectResponseV1(selectRequest) as OnSelectResponse;
        await selectHandlers.sendToProtocolServer(response, context);
    } catch (error: unknown) {
        selectHandlers.handleError(error, req, res, context);
    }
});

router.post('/init', async (req: Request, res: Response) => {
    const initRequest = req.body as InitReqBody;
    const context = initRequest.context;

    try {
        initHandlers.sendAck(req, res, context);
        const response = await createOnInitResponseV1(initRequest) as OnInitReqBody;
        await initHandlers.sendToProtocolServer(response, context);
    } catch (error: unknown) {
        initHandlers.handleError(error, req, res, context);
    }
});

export default router;
