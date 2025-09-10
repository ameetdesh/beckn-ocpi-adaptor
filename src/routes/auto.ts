import { Request, Response, Router } from 'express';
import { searchHandler } from './search';
import { selectHandler } from './select';
import { initHandler } from './init';

const router = Router();

//POST /auto
router.post('/', async (req: Request, res: Response) => {
    const context = req.body.context;
    const action = context.action;

    switch (action) {
        case 'search':
            searchHandler(req, res);
            break;
        case 'select':
            selectHandler(req, res);
            break;
        case 'init':
            initHandler(req, res);
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