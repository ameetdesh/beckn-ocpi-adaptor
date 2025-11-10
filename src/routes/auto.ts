import { Request, Response, Router } from 'express';
import { searchHandler } from './search';
import { selectHandler } from './select';
import { initHandler } from './init';

const router = Router();

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

export default router;
