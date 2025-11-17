import { Request, Response, Router } from 'express';
import type { InitReqBody, OnInitReqBody } from '@beckn/ocpi-adaptor-core';
import { createOnInitResponse } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

type LogServiceType = ReturnType<typeof createLogService> | null;

export const createInitHandler = (logService: LogServiceType) => {
    const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
        action: 'init',
        stage: 'order'
    }, logService);

    return async (req: Request, res: Response) => {
        const initRequest: InitReqBody = req.body;
        const context = initRequest.context;

        try {
            //Send ACK to protocol server
            sendAck(req, res, context);

            //Process the init request
            const onInitResponse = await createOnInitResponse(initRequest);

            //Send the onInit response to protocol server
            await sendToProtocolServer(onInitResponse, context);

        } catch (error: any) {
            handleError(error, req, res, context);
        }
    };
};

export const createInitRouter = (logService: LogServiceType) => {
    const router = Router();
    const initHandler = createInitHandler(logService);

    //POST /init
    router.post('/', async (req: Request, res: Response) => initHandler(req, res));

    return router;
};
