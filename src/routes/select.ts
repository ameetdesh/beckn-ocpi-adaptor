import { Request, Response, Router } from 'express';
import type { SelectRequest } from '@beckn/ocpi-adaptor-core';
import { createOnSelectResponse } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

type LogServiceType = ReturnType<typeof createLogService> | null;

export const createSelectHandler = (logService: LogServiceType) => {
    const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
        action: 'select',
        stage: 'order'
    }, logService);

    return async (req: Request, res: Response) => {
        const selectRequest: SelectRequest = req.body;
        const context = selectRequest.context;

        try {
            //Send ACK to protocol server
            sendAck(req, res, context);

            //Process the select request
            const onSelectResponse = await createOnSelectResponse(selectRequest);

            //Send the onSelect response to protocol server
            await sendToProtocolServer(onSelectResponse, context);

        } catch (error: any) {
            handleError(error, req, res, context);
        }
    };
};

export const createSelectRouter = (logService: LogServiceType) => {
    const router = Router();
    const selectHandler = createSelectHandler(logService);

    //POST /select
    router.post('/', async (req: Request, res: Response) => selectHandler(req, res));

    return router;
};
