import { Request, Response, Router } from 'express';
import { createSearchHandler } from './search';
import { createSelectHandler } from './select';
import { createInitHandler } from './init';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

type LogServiceType = ReturnType<typeof createLogService> | null;

export const createAutoRouter = (logService: LogServiceType) => {
    const router = Router();
    const searchHandler = createSearchHandler(logService);
    const selectHandler = createSelectHandler(logService);
    const initHandler = createInitHandler(logService);

    //POST /auto
    router.post('/', async (req: Request, res: Response) => {
        const context = req.body.context;
        const action = context?.action;

        switch (action) {
            case 'search':
                await searchHandler(req, res);
                break;
            case 'select':
                await selectHandler(req, res);
                break;
            case 'init':
                await initHandler(req, res);
                break;
            default:
                res.status(400).json({
                    status: 'error',
                    message: 'Invalid action'
                });
                break;
        }
    });

    return router;
};
