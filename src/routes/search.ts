import { Request, Response, Router } from 'express';
import type { OnSearchResponse, SearchReqBody } from '../types/beckn';
import { createCatalogFromIntent } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';

const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
    action: 'search',
    stage: 'discovery'
});

const router = Router();

//POST /search
router.post('/', async (req: Request, res: Response) => searchHandler(req, res));

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
