import { Router } from 'express';
import searchRouter from './search';
import selectRouter from './select';
import initRouter from './init';
import logsRouter from './logs';
import autoRouter from './auto';
import becknV2Router from './v2';
import discoverRouter from './discover';
import becknV1Router from './v1';

const router = Router();

// API routes
router.use('/search', searchRouter);
router.use('/discover', discoverRouter);
router.use('/select', selectRouter);
router.use('/init', initRouter);
router.use('/auto', autoRouter);
router.use('/v2', becknV2Router);
router.use('/v1', becknV1Router);

// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

//Logs endpoint
router.use('/beckn-logs', logsRouter);

export default router;
