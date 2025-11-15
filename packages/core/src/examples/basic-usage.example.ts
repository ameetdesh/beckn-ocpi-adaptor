/**
 * Example: Basic usage of @beckn/ocpi-adaptor-core
 * 
 * Run with: npx ts-node src/examples/basic-usage.example.ts
 */

import { createOCPICache, createLogService } from '../index';
import type { CacheStore, LogStore, OCPIDataSnapshot, LogData } from '../index';

// Example: In-memory cache implementation
class InMemoryCacheStore<T> implements CacheStore<T> {
    private cache: T | null = null;

    async get(): Promise<T | null> {
        return this.cache;
    }

    async set(value: T): Promise<void> {
        this.cache = value;
        console.log('Cache set:', JSON.stringify(value).substring(0, 100) + '...');
    }

    async clear(): Promise<void> {
        this.cache = null;
        console.log('Cache cleared');
    }
}

// Example: Console log store implementation
class ConsoleLogStore implements LogStore {
    async init(): Promise<boolean> {
        console.log('Console log store initialized');
        return true;
    }

    async insert(log: LogData): Promise<void> {
        console.log('Log entry:', JSON.stringify(log, null, 2));
    }

    async fetch(): Promise<{ count: number; data: LogData[] }> {
        console.log('Fetch logs called');
        return { count: 0, data: [] };
    }
}

// Test the core package
async function testCorePackage() {
    console.log('=== Testing @beckn/ocpi-adaptor-core ===\n');

    // Test cache
    console.log('1. Testing Cache Store...');
    const cacheStore: CacheStore<OCPIDataSnapshot> = new InMemoryCacheStore();
    const ocpiCache = createOCPICache(cacheStore);

    const testSnapshot: OCPIDataSnapshot = {
        fetched_at: new Date().toISOString(),
        locations: [],
        items: [],
        tariffs: []
    };

    await ocpiCache.setSnapshot(testSnapshot);
    const retrieved = await ocpiCache.getSnapshot();
    console.log('Retrieved snapshot:', retrieved ? 'Success' : 'Failed');
    console.log('');

    // Test log service
    console.log('2. Testing Log Service...');
    const logStore: LogStore = new ConsoleLogStore();
    const logService = createLogService(logStore);

    await logService.init();
    await logService.insertLog({
        id: 'test-123',
        transaction_id: 'txn-123',
        message_id: 'msg-123',
        protocol: 'beckn',
        action: 'search',
        stage: 'discovery',
        status: 'success'
    });
    console.log('');

    console.log('✅ Core package tests completed successfully!');
}

// Run if executed directly
if (require.main === module) {
    testCorePackage().catch(console.error);
}

export { testCorePackage };


