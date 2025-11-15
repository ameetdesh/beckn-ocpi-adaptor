import type { LogData } from '../models/log.model';
import type { LogStore, LogQueryParams, LogQueryResult } from '../interfaces/log.interface';

/**
 * Creates a log service using the provided log store.
 * This factory function accepts dependency injection for the log store.
 */
export const createLogService = (store: LogStore | null) => {
    return {
        init: async (): Promise<boolean> => {
            if (!store) return false;
            return store.init();
        },
        insertLog: async (log: LogData): Promise<void> => {
            if (!store) return;
            await store.insert(log);
        },
        fetchLogs: async (params: LogQueryParams): Promise<LogQueryResult> => {
            if (!store) {
                return { count: 0, data: [] };
            }
            return store.fetch(params);
        }
    };
};

