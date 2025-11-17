/**
 * Example: Using the server package with factory functions
 * 
 * This demonstrates how to use @beckn/server to create an Express app
 * with dependency injection.
 */

import { createServer, startServer } from '@beckn/server';
import { createOCPICache, createLogService, createOCPIUtils, type OCPIDataSnapshot } from '@beckn/ocpi-adaptor-core';
import { createRedisCacheStore } from '@beckn/cache-redis';
import { createClickHouseLogStore } from '@beckn/log-clickhouse';
import { createRoutes } from '../routes';

// Example: Setting up server with all dependencies
export async function exampleWithServerPackage() {
    // Create cache store
    const cacheStore = createRedisCacheStore<OCPIDataSnapshot>({
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        key: 'ocpi:snapshot',
        ttlSeconds: 300
    });

    // Create log store
    const logStore = createClickHouseLogStore({
        host: process.env.CLICKHOUSE_HOST || 'localhost',
        port: Number(process.env.CLICKHOUSE_PORT) || 8123,
        database: process.env.CLICKHOUSE_DATABASE || 'default',
        username: process.env.CLICKHOUSE_USERNAME,
        password: process.env.CLICKHOUSE_PASSWORD,
        logTable: process.env.CLICKHOUSE_LOG_TABLE || 'app_logs'
    });

    // Create services
    const ocpiCache = createOCPICache(cacheStore);
    const logService = createLogService(logStore);

    // Initialize log store
    await logService.init();

    // Create OCPI utils
    const ocpiUtils = createOCPIUtils({
        ocpiUrl: process.env.OCPI_URL || '',
        ocpiAuthKey: process.env.OCPI_AUTH_KEY || '',
        cache: ocpiCache,
        logger: logService
    });

    // Refresh cache on startup
    if (process.env.REFRESH_CACHE_ON_STARTUP === 'true') {
        await ocpiUtils.refreshOCPIcache();
    }

    // Create routes with logService
    const routes = createRoutes(logService);

    // Create server
    const app = createServer(
        {
            port: Number(process.env.PORT) || 3000,
            enableCors: true
        },
        {
            routes,
            onStartup: async () => {
                console.log('Server startup complete');
            },
            onShutdown: async () => {
                console.log('Server shutdown complete');
            }
        }
    );

    // Start server
    await startServer(app, { port: Number(process.env.PORT) || 3000 }, {
        routes,
        onStartup: async () => {
            console.log('Server startup complete');
        }
    });
}

// Run the example
exampleWithServerPackage();
