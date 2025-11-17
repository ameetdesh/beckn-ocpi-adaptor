import { v4 as uuidv4 } from 'uuid';
import { appConfig } from '../config/app.config';
import { Request, Response } from 'express';
import axios from 'axios';
import type { createLogService } from '@beckn/ocpi-adaptor-core';

interface RouteHandlerConfig {
    action: string;
    stage: string;
}

type LogServiceType = ReturnType<typeof createLogService> | null;

const sanitizePayload = (payload: unknown, maxPreviewLength = 8000) => {
    try {
        const serialized = JSON.stringify(payload);
        if (serialized.length <= maxPreviewLength) {
            return payload;
        }
        return {
            truncated: true,
            preview: serialized.slice(0, maxPreviewLength)
        };
    } catch (error) {
        return {
            error: 'Unserializable payload',
            message: (error as Error).message
        };
    }
};

export const createRouteHandler = (config: RouteHandlerConfig, logService: LogServiceType) => {
    const { action, stage } = config;

    const sendAck = (req: Request, res: Response, context: any) => {
        const ack_response = { message: { ack: { status: 'ACK' } } };

        res.json(ack_response);

        if (logService) {
            logService.insertLog({
            id: uuidv4(),
            transaction_id: context.transaction_id!,
            message_id: context.message_id!,
            bap_id: context.bap_id || '',
            protocol: 'beckn',
            action: context.action || action,
            stage,
            endpoint: `/${action}`,
            method: 'POST',
            status: 'success',
            status_code: 200,
            request_data: req.body,
            response_data: ack_response
        }).catch(err => {
            console.error(`[${new Date().toISOString()}] Failed to write ack log`, err);
        });
        }
    };

    const sendToProtocolServer = async (data: any, context: any, is_error: boolean = false) => {
        const protocolServerUrl = new URL(appConfig.beckn.protocol_server_url);
        protocolServerUrl.pathname = `/on_${action}`;
        const sanitizedRequest = sanitizePayload(data);

        let responseStatus = 0;
        let responseBody: unknown = null;
        let transportError: Error | null = null;

        try {
            const protocolServerResponse = await axios.post(protocolServerUrl.href, data, {
                validateStatus: () => true
            });
            responseStatus = protocolServerResponse.status;
            responseBody = protocolServerResponse.data;

            console.log(
                `[${new Date().toISOString()}] On ${action} response sent to protocol server ${protocolServerUrl}`
            );
            console.log(
                `[${new Date().toISOString()}] Protocol server response status:`,
                protocolServerResponse.status,
                JSON.stringify(data)
            );
        } catch (error) {
            transportError = error as Error;
            console.error(
                `[${new Date().toISOString()}] Failed to reach protocol server for on_${action}:`,
                transportError
            );
        }

        const succeeded = Boolean(!is_error && responseStatus && responseStatus >= 200 && responseStatus < 300 && !transportError);
        const finalStatus = is_error ? 'error' : succeeded ? 'success' : 'error';
        const sanitizedResponse = sanitizePayload(
            responseBody ?? {
                error: transportError?.message ?? 'No response body'
            }
        );

        if (logService) {
        try {
                await logService.insertLog({
                id: uuidv4(),
                transaction_id: context.transaction_id ?? '',
                message_id: context.message_id ?? '',
                bap_id: context.bap_id || '',
                protocol: 'beckn',
                action: `on_${action}`,
                stage,
                endpoint: `/on_${action}`,
                method: 'POST',
                status: finalStatus,
                status_code: responseStatus || undefined,
                request_data: sanitizedRequest,
                response_data: sanitizedResponse,
                error_message: transportError?.message
            });
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Failed to write protocol response log`, error);
            }
        }

        return {
            success: succeeded,
            statusCode: responseStatus,
            error: transportError
        };
    };

    const handleError = (error: any, req: Request, res: Response, context: any) => {
        console.error(`[${new Date().toISOString()}] Error in ${action} handler:`);
        console.log(error);

        const errorResponse = {
            context: {
                ...context,
                action: `on_${action}`,
                timestamp: new Date().toISOString(),
                bpp_id: appConfig.beckn.bpp_id,
                bpp_uri: appConfig.beckn.bpp_uri
            },
            error: {
                code: '500',
                message: 'Internal server error'
            }
        };

        sendToProtocolServer(errorResponse, context, true).catch(err => {
            console.error(
                `[${new Date().toISOString()}] Failed to notify protocol server about ${action} error`,
                err
            );
        });
    };

    return {
        sendAck,
        sendToProtocolServer,
        handleError
    };
};
