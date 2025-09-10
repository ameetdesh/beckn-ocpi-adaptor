import { Request, Response, Router } from 'express';
import type { SelectRequest } from '../types/beckn';
import { createOnSelectResponse } from '../utils/common.utils';
import { createRouteHandler } from '../utils/routeHandlers.utils';

const router = Router();
const { sendAck, sendToProtocolServer, handleError } = createRouteHandler({
    action: 'select',
    stage: 'order'
});


//POST /select
router.post('/', async (req: Request, res: Response) => selectHandler(req, res));

export default router;

export const selectHandler = async (req: Request, res: Response) => {
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

