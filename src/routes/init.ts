import { Request, Response, Router } from 'express';
import type { InitReqBody, OnInitReqBody } from '@beckn/ocpi-adaptor-core';
import { createOnInitResponse } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';

const router = Router();
const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
    action: 'init',
    stage: 'order'
});


//POST /init
router.post('/', async (req: Request, res: Response) => initHandler(req, res));

export default router;

export const initHandler = async (req: Request, res: Response) => {
    const initRequest: InitReqBody = req.body;
    const context = initRequest.context;

    try {
        //Send ACK to protocol server
        sendAck(req, res, context);

        //Process the select request
        const onInitResponse = await createOnInitResponse(initRequest);

        //Send the onSelect response to protocol server
        await sendToProtocolServer(onInitResponse, context);

    } catch (error: any) {
        handleError(error, req, res, context);
    }
};


