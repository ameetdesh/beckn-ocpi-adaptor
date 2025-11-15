/**
 * Example: Testing @beckn/log-clickhouse package
 * 
 * Run with: npx ts-node src/examples/test-clickhouse.example.ts
 * 
 * Requires: ClickHouse server running
 */

import { createClickHouseLogStore } from '../index';
import type { LogData } from '@beckn/ocpi-adaptor-core';

async function testClickHouseLog() {
    console.log('=== Testing @beckn/log-clickhouse ===\n');

    try {
        // Create ClickHouse log store
        const logStore = createClickHouseLogStore({
            host: process.env.CLICKHOUSE_HOST || 'localhost',
            port: Number(process.env.CLICKHOUSE_PORT) || 8123,
            database: process.env.CLICKHOUSE_DATABASE || 'default',
            username: process.env.CLICKHOUSE_USERNAME,
            password: process.env.CLICKHOUSE_PASSWORD,
            logTable: process.env.CLICKHOUSE_LOG_TABLE || 'app_logs',
            initRetries: 3,
            initRetryDelayMs: 1000
        });

        console.log('1. Initializing log store...');
        const initialized = await logStore.init();
        if (initialized) {
            console.log('✅ Log store initialized successfully');
        } else {
            console.log('❌ Failed to initialize log store');
            return;
        }

        console.log('\n2. Inserting test log...');
        const testLog: LogData = {
            id: 'test-' + Date.now(),
            transaction_id: 'txn-test-123',
            message_id: 'msg-test-123',
            bap_id: 'test-bap',
            protocol: 'beckn',
            action: 'search',
            stage: 'discovery',
            endpoint: '/search',
            method: 'POST',
            status: 'success',
            status_code: 200,
            duration: 150,
            request_data: { test: 'data' },
            response_data: { result: 'success' }
        };

        await logStore.insert(testLog);
        console.log('✅ Log inserted successfully');

        console.log('\n3. Fetching logs...');
        const result = await logStore.fetch({
            transaction_id: 'txn-test-123',
            limit: 10
        });
        console.log(`✅ Fetched ${result.count} logs`);
        if (result.data.length > 0) {
            console.log('Sample log:', JSON.stringify(result.data[0], null, 2));
        }

        console.log('\n✅ ClickHouse log tests completed successfully!');
    } catch (error) {
        console.error('❌ Error testing ClickHouse log:', error);
        console.error('\nMake sure ClickHouse is running and accessible');
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    testClickHouseLog().catch(console.error);
}

export { testClickHouseLog };


