import { Router } from 'express';
import { createSearchRouter } from './search';
import { createDiscoverRouter } from './discover';
import { createSelectRouter } from './select';
import { createInitRouter } from './init';
import { createAutoRouter } from './auto';
import { createLogsRouter } from './logs';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

type LogServiceType = ReturnType<typeof createLogService> | null;

export const createRoutes = (logService: LogServiceType) => {
    const router = Router();

    // API routes
    router.use('/search', createSearchRouter(logService));
    router.use('/discover', createDiscoverRouter(logService));
    router.use('/select', createSelectRouter(logService));
    router.use('/init', createInitRouter(logService));
    router.use('/auto', createAutoRouter(logService));
    router.use('/beckn-logs', createLogsRouter(logService));

    // Health check endpoint
    router.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok' });
    });

    return router;
};

export default createRoutes;
