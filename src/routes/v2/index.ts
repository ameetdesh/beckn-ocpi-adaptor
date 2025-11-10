import { Router } from 'express';
import selectRouter from './select';
import initRouter from './init';
import autoRouter from './auto';
import discoverRouter from './discover';

const router = Router();

router.use('/discover', discoverRouter);
router.use('/select', selectRouter);
router.use('/init', initRouter);
router.use('/auto', autoRouter);

export default router;
