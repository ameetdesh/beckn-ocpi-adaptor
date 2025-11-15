/**
 * Example: Using the implementation packages with the core SDK
 * 
 * This demonstrates how to use @beckn/cache-redis and @beckn/log-clickhouse
 * with the core SDK package.
 */

import { createOCPICache, createLogService, createOCPIUtils } from '@beckn/ocpi-adaptor-core';
// Note: These packages are available but need to be installed/linked properly
// import { createRedisCacheStore } from '@beckn/cache-redis';
// import { createClickHouseLogStore } from '@beckn/log-clickhouse';
import type { OCPIDataSnapshot } from '@beckn/ocpi-adaptor-core';

// Example: Setting up with Redis cache and ClickHouse logging
export function exampleWithImplementationPackages() {
    // Example: Create Redis cache store
    // Uncomment when @beckn/cache-redis is properly installed
    // const cacheStore = createRedisCacheStore<OCPIDataSnapshot>({
    //     host: process.env.REDIS_HOST || 'localhost',
    //     port: Number(process.env.REDIS_PORT) || 6379,
    //     password: process.env.REDIS_PASSWORD,
    //     key: 'ocpi:snapshot',
    //     ttlSeconds: 3600
    // });

    // Example: Create ClickHouse log store
    // Uncomment when @beckn/log-clickhouse is properly installed
    // const logStore = createClickHouseLogStore({
    //     host: process.env.CLICKHOUSE_HOST || 'localhost',
    //     port: Number(process.env.CLICKHOUSE_PORT) || 8123,
    //     database: process.env.CLICKHOUSE_DATABASE || 'default',
    //     username: process.env.CLICKHOUSE_USERNAME,
    //     password: process.env.CLICKHOUSE_PASSWORD,
    //     logTable: process.env.CLICKHOUSE_LOG_TABLE || 'app_logs',
    //     initRetries: 10,
    //     initRetryDelayMs: 2000
    // });

    // For now, using placeholder - replace with actual implementations
    const cacheStore: any = null;
    const logStore: any = null;

    // Create services using factory functions
    const ocpiCache = createOCPICache(cacheStore);
    const logService = createLogService(logStore);

    // Create OCPI utils with dependencies
    const ocpiUtils = createOCPIUtils({
        ocpiUrl: process.env.OCPI_URL || '',
        ocpiAuthKey: process.env.OCPI_AUTH_KEY || '',
        cache: ocpiCache,
        logger: logService
    });

    // Use the services
    // await logService.init();
    // await ocpiUtils.refreshOCPIcache();
    // const snapshot = await ocpiCache.getSnapshot();
}

