import { Router } from 'express';
import searchRouter from './search';
import selectRouter from './select';
import initRouter from './init';
import autoRouter from './auto';

const router = Router();

router.use('/search', searchRouter);
router.use('/select', selectRouter);
router.use('/init', initRouter);
router.use('/auto', autoRouter);

export default router;
