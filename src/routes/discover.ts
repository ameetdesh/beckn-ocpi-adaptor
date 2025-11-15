import { Request, Response, Router } from 'express';
import { appConfig } from '../config/app.config';
import { createRouteHandler } from '../utils/routeHandlers.utils';
import { createDiscoverCatalog } from '../utils/common.utils';
import type { BecknV2DiscoverRequest } from '@beckn/ocpi-adaptor-core';

const router = Router();
const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
    action: 'discover',
    stage: 'discovery'
});

router.post('/', async (req: Request, res: Response) => {
    if (appConfig.beckn.version !== '2.0') {
        res.status(501).json({
            status: 'error',
            message: 'discover endpoint is only available when Beckn version is set to 2.0'
        });
        return;
    }

    await discoverHandler(req, res);
});

export default router;

export const discoverHandler = async (req: Request, res: Response) => {
    const discoverRequest: BecknV2DiscoverRequest = req.body;
    const context = discoverRequest.context;

    try {
        sendAck(req, res, context);

        const onDiscoverResponse = await createDiscoverCatalog(discoverRequest);
        if (!onDiscoverResponse) {
            console.warn(`[${new Date().toISOString()}] No catalog generated for discover request`);
            return;
        }

        await sendToProtocolServer(onDiscoverResponse, context);
    } catch (error: unknown) {
        handleError(error, req, res, context);
    }
};
