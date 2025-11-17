import { Request, Response, Router } from 'express';
import type { OnSearchResponse, SearchReqBody } from '@beckn/ocpi-adaptor-core';
import { createCatalogFromIntent } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';
import { appConfig } from '../config/app.config';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

type LogServiceType = ReturnType<typeof createLogService> | null;

export const createSearchHandler = (logService: LogServiceType) => {
    const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
        action: 'search',
        stage: 'discovery'
    }, logService);

    return async (req: Request, res: Response) => {
        const searchRequest: SearchReqBody = req.body;
        const context = searchRequest.context;

        try {
            // Send immediate ACK
            sendAck(req, res, context);

            // Process the search request
            // Note: This route only handles v1, so we can safely cast to OnSearchResponse
            const response = await createCatalogFromIntent(searchRequest) as OnSearchResponse | null;

            if (!response) {
                console.log(`[${new Date().toISOString()}] Failed to create catalog from intent`)
            } else {
                await sendToProtocolServer(response, context);
            }
        } catch (error: any) {
            handleError(error, req, res, context);
        }
    };
};

export const createSearchRouter = (logService: LogServiceType) => {
    const router = Router();
    const searchHandler = createSearchHandler(logService);

    //POST /search
    router.post('/', async (req: Request, res: Response) => {
        if (appConfig.beckn.version === '2.0') {
            res.status(501).json({
                status: 'error',
                message: 'search/on_search flow is not supported in Beckn v2. Please use discover/on_discover.'
            });
            return;
        }

        await searchHandler(req, res);
    });

    return router;
};
