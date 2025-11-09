import { Router } from 'express';
import searchRouter from './search';
import selectRouter from './select';
import initRouter from './init';
import logsRouter from './logs';
import autoRouter from './auto';
import becknV2Router from './v2';

const router = Router();

// API routes
router.use('/search', searchRouter);
router.use('/select', selectRouter);
router.use('/init', initRouter);
router.use('/auto', autoRouter);
router.use('/v2', becknV2Router);

// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

//Logs endpoint
router.use('/beckn-logs', logsRouter);

export default router;
