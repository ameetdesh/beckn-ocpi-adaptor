import type { LogData } from '../models/log.model';

export type LogQueryParams = {
    transaction_id?: string;
    message_id?: string;
    bap_id?: string;
    protocol?: string;
    action?: string;
    stage?: string;
    status?: string;
    method?: string;
    since?: string;
    limit?: number;
};

export type LogQueryResult = {
    count: number;
    data: LogData[];
};

/**
 * Log Store Interface
 * 
 * This interface defines the contract for log store implementations.
 * Consumers of the SDK can provide their own log store implementation.
 */
export interface LogStore {
    init(): Promise<boolean>;
    insert(log: LogData): Promise<void>;
    fetch(params: LogQueryParams): Promise<LogQueryResult>;
}

