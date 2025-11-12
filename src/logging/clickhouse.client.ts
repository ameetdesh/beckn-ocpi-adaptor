import { createClient, type ClickHouseClient } from '@clickhouse/client';
import { appConfig } from '../config/app.config';

let client: ClickHouseClient | null = null;
let ensuringTable = false;

const LOG_TABLE = () => appConfig.clickhouse.log_table ?? 'app_logs';

export const getClickHouseClient = (): ClickHouseClient => {
    if (!client) {
        const { host, port, username, password, database } = appConfig.clickhouse;
        const normalizedHost = host.startsWith('http')
            ? host
            : `http://${host}:${port}`;

        client = createClient({
            host: normalizedHost,
            username,
            password,
            database
        });
    }
    return client;
};

export const ensureLogTable = async () => {
    if (ensuringTable) return;
    ensuringTable = true;
    try {
        const client = getClickHouseClient();
        const table = LOG_TABLE();

        await client.exec({
            query: `
            CREATE TABLE IF NOT EXISTS ${table} (
                id String,
                created_at DateTime64(3, 'UTC') DEFAULT now(),
                transaction_id String,
                message_id String,
                bap_id String,
                protocol String,
                action String,
                stage String,
                endpoint String,
                method String,
                status String,
                status_code Nullable(Int32),
                duration Nullable(Float64),
                request_data Nullable(String),
                response_data Nullable(String),
                error_message Nullable(String)
            )
            ENGINE = MergeTree
            ORDER BY (created_at, id)
            `
        });
    } finally {
        ensuringTable = false;
    }
};

export const getLogTableName = (): string => LOG_TABLE();
