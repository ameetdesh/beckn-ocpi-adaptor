/**
 * Example: Testing @beckn/cache-redis package
 * 
 * Run with: npx ts-node src/examples/test-redis.example.ts
 * 
 * Requires: Redis server running on localhost:6379
 */

import { createRedisCacheStore, disconnectRedisClient } from '../index';

interface TestData {
    message: string;
    timestamp: string;
}

async function testRedisCache() {
    console.log('=== Testing @beckn/cache-redis ===\n');

    try {
        // Create Redis cache store
        const cacheStore = createRedisCacheStore<TestData>({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
            password: process.env.REDIS_PASSWORD,
            key: 'test:cache',
            ttlSeconds: 60
        });

        console.log('1. Setting cache...');
        await cacheStore.set({
            message: 'Hello from Redis!',
            timestamp: new Date().toISOString()
        });
        console.log('✅ Cache set successfully');

        console.log('\n2. Getting cache...');
        const data = await cacheStore.get();
        if (data) {
            console.log('✅ Cache retrieved:', data);
        } else {
            console.log('❌ Cache not found');
        }

        console.log('\n3. Clearing cache...');
        await cacheStore.clear();
        console.log('✅ Cache cleared');

        console.log('\n4. Verifying cache is cleared...');
        const cleared = await cacheStore.get();
        if (!cleared) {
            console.log('✅ Cache is cleared');
        } else {
            console.log('❌ Cache still exists');
        }

        // Cleanup
        await disconnectRedisClient();
        console.log('\n✅ Redis cache tests completed successfully!');
    } catch (error) {
        console.error('❌ Error testing Redis cache:', error);
        console.error('\nMake sure Redis is running on localhost:6379');
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    testRedisCache().catch(console.error);
}

export { testRedisCache };


