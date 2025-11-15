import { createServer, startServer, routes } from '@beckn/server';
import { createOCPICache, createLogService, createOCPIUtils, type OCPIDataSnapshot } from '@beckn/ocpi-adaptor-core';
import { createRedisCacheStore } from '@beckn/cache-redis';
import { createClickHouseLogStore } from '@beckn/log-clickhouse';
import { appConfig } from './config/app.config';

async function main() {
    const { refresh_ocpi_cache_on_startup } = appConfig.app.initialization;

    // Create cache store
    const cacheStore = appConfig.cache.store === 'redis'
        ? createRedisCacheStore({
            host: appConfig.cache.host || 'localhost',
            port: appConfig.cache.port || 6379,
            password: appConfig.cache.password,
            key: 'ocpi:snapshot',
            ttlSeconds: appConfig.cache.ttl_seconds
        })
        : null; // fallback to in-memory

    // Create log store
    const logStore = appConfig.logging.store === 'clickhouse' && appConfig.clickhouse
        ? createClickHouseLogStore({
            host: appConfig.clickhouse.host,
            port: appConfig.clickhouse.port,
            database: appConfig.clickhouse.database,
            username: appConfig.clickhouse.username,
            password: appConfig.clickhouse.password,
            logTable: appConfig.clickhouse.log_table
        })
        : null;

    // Create services
    const ocpiCache = cacheStore ? createOCPICache(cacheStore as any) : null;
    const logService = logStore ? createLogService(logStore) : null;

    // Initialize log store
    if (logService) {
        const logStoreReady = await logService.init();
        if (logStoreReady) {
            console.log(`[${new Date().toISOString()}] ClickHouse log store ready`);
        } else {
            console.warn(`[${new Date().toISOString()}] ClickHouse log store unavailable at startup. Logging will be best effort.`);
        }
    } else {
        console.warn(`[${new Date().toISOString()}] No log store selected; logs will not be persisted.`);
    }

    if (cacheStore) {
        console.log(`[${new Date().toISOString()}] Using Redis cache with TTL ${appConfig.cache.ttl_seconds}s`);
    } else {
        console.warn(
            `[${new Date().toISOString()}] No external cache database selected; using in-memory snapshot cache with TTL ${appConfig.cache.ttl_seconds}s`
        );
    }

    // Create OCPI utils
    const ocpiUtils = createOCPIUtils({
        ocpiUrl: appConfig.ocpi.url,
        ocpiAuthKey: appConfig.ocpi.auth_key,
        cache: ocpiCache ? { setSnapshot: ocpiCache.setSnapshot } : undefined,
        logger: logService ? { insertLog: logService.insertLog } : undefined
    });

    if (refresh_ocpi_cache_on_startup) {
        await ocpiUtils.refreshOCPIcache();
        console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
    } else {
        console.log(`[${new Date().toISOString()}] Skipping OCPI cache refresh (disabled via configuration)`);
    }

    // log if the cache is disabled
    if (!appConfig.app.initialization.use_cache) {
        console.log(`[${new Date().toISOString()}] OCPI cache usage is disabled via configuration`);
    }

    // Create server
    const app = createServer(
        {
            port: appConfig.port,
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
    await startServer(app, { port: appConfig.port }, {
        routes,
        onStartup: async () => {
            console.log('Server startup complete');
        }
    });
}

main();
