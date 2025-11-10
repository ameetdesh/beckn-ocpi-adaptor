import { Request, Response, Router } from 'express';
import type { OnSearchResponse, SearchReqBody } from '../types/beckn';
import { createCatalogFromIntent } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';
import { appConfig } from '../config/app.config';

const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
    action: 'search',
    stage: 'discovery'
});

const router = Router();

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

export default router;

export const searchHandler = async (req: Request, res: Response) => {
    const searchRequest: SearchReqBody = req.body;
    const context = searchRequest.context;

    try {
        // Send immediate ACK
        sendAck(req, res, context);

        // Process the search request
        const response: OnSearchResponse | null = await createCatalogFromIntent(searchRequest);

        if (!response) {``
            console.log(`[${new Date().toISOString()}] Failed to create catalog from intent`)
        } else {
            await sendToProtocolServer(response, context);
        }
    } catch (error: any) {
        handleError(error, req, res, context);
    }
};
