import type { LogData } from '@beckn/ocpi-adaptor-core';

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

export interface LogStore {
    init(): Promise<boolean>;
    insert(log: LogData): Promise<void>;
    fetch(params: LogQueryParams): Promise<LogQueryResult>;
}
