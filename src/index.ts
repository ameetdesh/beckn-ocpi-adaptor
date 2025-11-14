import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { refreshOCPIcache } from './utils/ocpi.utils';
import { appConfig } from './config/app.config';
import { initLogStore } from './logging/log.service';

const app = express();
const PORT = appConfig.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${new Date().toISOString()}] Unhandled error:`, err);
    res.status(500).json({
        error: {
            message: 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Server is running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(
        `[${new Date().toISOString()}] Unhandled promise rejection detected`,
        { reason, promise }
    );
});

process.on('uncaughtException', error => {
    console.error(`[${new Date().toISOString()}] Uncaught exception detected`, error);
});

async function main() {
    const { refresh_ocpi_cache_on_startup } = appConfig.app.initialization;

    if (appConfig.logging.store === 'clickhouse') {
        const logStoreReady = await initLogStore();
        if (logStoreReady) {
            console.log(`[${new Date().toISOString()}] ClickHouse log store ready`);
        } else {
            console.warn(`[${new Date().toISOString()}] ClickHouse log store unavailable at startup. Logging will be best effort.`);
        }
    } else {
        console.warn(`[${new Date().toISOString()}] No log store selected; logs will not be persisted.`);
    }

    if (appConfig.cache.store == 'redis') {
        console.log(`[${new Date().toISOString()}] Using Redis cache with TTL ${appConfig.cache.ttl_seconds}s`);
    } else {
        console.warn(
            `[${new Date().toISOString()}] No external cache database selected; using in-memory snapshot cache with TTL ${appConfig.cache.ttl_seconds}s`
        );
    }

    if (refresh_ocpi_cache_on_startup) {
        await refreshOCPIcache();
        console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
    } else {
        console.log(`[${new Date().toISOString()}] Skipping OCPI cache refresh (disabled via configuration)`);
    }

    // log if the cache is disabled
    if (!appConfig.app.initialization.use_cache) {
        console.log(`[${new Date().toISOString()}] OCPI cache usage is disabled via configuration`);
    }
}
    
main();
