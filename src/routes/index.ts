import { Router } from 'express';
import searchRouter from './search';
import discoverRouter from './discover';
import selectRouter from './select';
import initRouter from './init';
import autoRouter from './auto';
import logsRouter from './logs';

const router = Router();

// API routes
router.use('/search', searchRouter);
router.use('/discover', discoverRouter);
router.use('/select', selectRouter);
router.use('/init', initRouter);
router.use('/auto', autoRouter);
router.use('/beckn-logs', logsRouter);

// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

export default router;
