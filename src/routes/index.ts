import { Router } from 'express';
import searchRouter from './search';
import selectRouter from './select';
import logsRouter from './logs';
import autoRouter from './auto';

const router = Router();

// API routes
router.use('/search', searchRouter);
router.use('/select', selectRouter);
router.use('/auto', autoRouter);

// Health check endpoint
router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

//Logs endpoint
router.use('/beckn-logs', logsRouter);

export default router;
