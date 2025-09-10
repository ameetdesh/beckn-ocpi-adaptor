export type LogData = {
    id: string;
    transaction_id: string;
    message_id: string;
    bap_id: string;
    protocol: string;
    action: string;
    stage: string;
    endpoint: string;
    method: string;
    status: string;
    duration?: number;
    status_code?: number;
    request_data?: Record<string, any>;
    response_data?: Record<string, any>;
    error_message?: string;
    created_at?: string | Date;
};