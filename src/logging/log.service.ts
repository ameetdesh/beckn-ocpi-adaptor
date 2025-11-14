import { appConfig } from '../config/app.config';
import { createClickHouseLogStore } from './clickhouse.logStore';
import type { LogData } from '../models/log.model';
import type { LogQueryParams, LogQueryResult, LogStore } from './logStore';

const logStore: LogStore | null =
    appConfig.logging.store === 'clickhouse' ? createClickHouseLogStore() : null;

export const initLogStore = async (): Promise<boolean> => {
    if (!logStore) return false;
    return logStore.init();
};

export const insertLog = async (log: LogData): Promise<void> => {
    if (!logStore) return;
    await logStore.insert(log);
};

export const fetchLogs = async (params: LogQueryParams): Promise<LogQueryResult> => {
    if (!logStore) {
        return { count: 0, data: [] };
    }
    return logStore.fetch(params);
};
