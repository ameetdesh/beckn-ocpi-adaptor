/**
 * Example: Using the SDK with custom cache and log store implementations
 * 
 * This demonstrates how to use the refactored SDK with dependency injection.
 * You can provide your own implementations of CacheStore and LogStore.
 */

import { 
    createOCPICache, 
    createLogService,
    type CacheStore,
    type LogStore,
    type OCPIDataSnapshot,
    type LogData,
    type LogQueryParams,
    type LogQueryResult
} from '@beckn/ocpi-adaptor-core';

// Example: Custom in-memory cache implementation
class InMemoryCacheStore<T> implements CacheStore<T> {
    private cache: T | null = null;

    async get(): Promise<T | null> {
        return this.cache;
    }

    async set(value: T): Promise<void> {
        this.cache = value;
    }

    async clear(): Promise<void> {
        this.cache = null;
    }
}

// Example: Custom console log store implementation
class ConsoleLogStore implements LogStore {
    async init(): Promise<boolean> {
        console.log('Console log store initialized');
        return true;
    }

    async insert(log: LogData): Promise<void> {
        console.log('Log entry:', JSON.stringify(log, null, 2));
    }

    async fetch(params: LogQueryParams): Promise<LogQueryResult> {
        console.log('Fetch logs with params:', params);
        return { count: 0, data: [] };
    }
}

// Usage example:
export function exampleUsage() {
    // Create custom implementations
    const cacheStore: CacheStore<OCPIDataSnapshot> = new InMemoryCacheStore();
    const logStore: LogStore = new ConsoleLogStore();

    // Create services using factory functions
    const ocpiCache = createOCPICache(cacheStore);
    const logService = createLogService(logStore);

    // Use the services
    // ocpiCache.getSnapshot();
    // ocpiCache.setSnapshot(snapshot);
    // logService.insertLog(logData);
}

