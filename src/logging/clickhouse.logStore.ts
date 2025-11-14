import { v4 as uuidv4 } from 'uuid';
import type { LogData } from '../models/log.model';
import { getClickHouseClient, ensureLogTable, getLogTableName } from './clickhouse.client';
import type { LogQueryParams, LogQueryResult, LogStore } from './logStore';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const stringifyMaybe = (value: unknown) => {
    if (value === undefined || value === null) {
        return null;
    }
    if (typeof value === 'string') {
        return value;
    }
    try {
        return JSON.stringify(value);
    } catch (error) {
        console.warn(`[${new Date().toISOString()}] Failed to stringify log payload`, error);
        return null;
    }
};

const formatDateForClickHouse = (input: string | Date) => {
    const date = input instanceof Date ? input : new Date(input);
    return date.toISOString().replace('T', ' ').replace('Z', '');
};

const buildInsertRow = (log: LogData) => {
    const id = log.id ?? uuidv4();
    const created_at = formatDateForClickHouse(
        log.created_at instanceof Date ? log.created_at : log.created_at ?? new Date()
    );

    return {
        id,
        created_at,
        transaction_id: log.transaction_id,
        message_id: log.message_id,
        bap_id: log.bap_id ?? 'evcharging-bap.becknprotocol.io',
        protocol: log.protocol,
        action: log.action,
        stage: log.stage,
        endpoint: log.endpoint,
        method: log.method,
        status: log.status,
        status_code: log.status_code ?? null,
        duration: log.duration ?? null,
        request_data: stringifyMaybe(log.request_data),
        response_data: stringifyMaybe(log.response_data),
        error_message: log.error_message ?? null
    };
};

const fetchLogRows = async (params: LogQueryParams) => {
    const client = getClickHouseClient();
    const table = getLogTableName();
    const limit = params.limit && params.limit > 0 ? params.limit : 100;

    const filters: string[] = [];
    const queryParams: Record<string, unknown> = { limit };

    const addFilter = (name: string, value: unknown, clause: string) => {
        if (value !== undefined && value !== null && value !== '') {
            filters.push(clause);
            queryParams[name] = value;
        }
    };

    addFilter('transaction_id', params.transaction_id, 'transaction_id = {transaction_id:String}');
    addFilter('message_id', params.message_id, 'message_id = {message_id:String}');
    addFilter('bap_id', params.bap_id, 'bap_id = {bap_id:String}');
    addFilter('protocol', params.protocol, 'protocol = {protocol:String}');
    addFilter('action', params.action, 'action = {action:String}');
    addFilter('stage', params.stage, 'stage = {stage:String}');
    addFilter('status', params.status, 'status = {status:String}');
    addFilter('method', params.method, 'method = {method:String}');

    if (params.since) {
        filters.push('created_at >= parseDateTimeBestEffort({since:String})');
        queryParams.since = formatDateForClickHouse(params.since);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
        SELECT *
        FROM ${table}
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT {limit:UInt32}
    `;

    const result = await client.query({
        query,
        format: 'JSONEachRow',
        query_params: queryParams
    });

    const rows = await result.json<LogData[]>();
    return {
        count: rows.length,
        data: rows
    };
};

export const createClickHouseLogStore = (): LogStore => ({
    async init(): Promise<boolean> {
        const maxAttempts = Number(process.env.CLICKHOUSE_INIT_RETRIES ?? 10);
        const baseDelayMs = Number(process.env.CLICKHOUSE_INIT_RETRY_DELAY_MS ?? 2000);

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await ensureLogTable();
                return true;
            } catch (error) {
                const timestamp = new Date().toISOString();
                if (attempt === maxAttempts) {
                    console.error(
                        `[${timestamp}] Failed to initialize ClickHouse after ${attempt} attempts. Proceeding without log store.`,
                        error
                    );
                    return false;
                }

                const delay = baseDelayMs * attempt;
                console.warn(
                    `[${timestamp}] ClickHouse not reachable (attempt ${attempt}/${maxAttempts}). Retrying in ${delay}ms...`
                );
                await sleep(delay);
            }
        }

        return false;
    },

    async insert(log: LogData): Promise<void> {
        const client = getClickHouseClient();
        const table = getLogTableName();
        const row = buildInsertRow(log);
        const now = new Date().toISOString();

        try {
            await client.insert({
                table,
                format: 'JSONEachRow',
                values: [row]
            });
        } catch (error) {
            console.error(`[${now}] Failed to insert log into ClickHouse`, error);
            throw error;
        }
    },

    async fetch(params: LogQueryParams): Promise<LogQueryResult> {
        return fetchLogRows(params);
    }
});
