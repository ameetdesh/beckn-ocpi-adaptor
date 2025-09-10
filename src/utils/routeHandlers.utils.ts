import { v4 as uuidv4 } from 'uuid';
import { insertLog } from '../routes/logs';
import { appConfig } from '../config/app.config';
import { Request, Response } from 'express';
import axios from 'axios';

interface RouteHandlerConfig {
    action: string;
    stage: string;
}

export const createRouteHandler = (config: RouteHandlerConfig) => {
    const { action, stage } = config;

    const sendAck = (req: Request, res: Response, context: any) => {
        const ack_response = { message: { ack: { status: 'ACK' } } };

        res.json(ack_response);

        insertLog({
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
        });
    };

    const sendToProtocolServer = async (data: any, context: any, is_error: boolean = false) => {
        const protocolServerUrl = new URL(appConfig.beckn.protocol_server_url);
        protocolServerUrl.pathname = `/on_${action}`;
        const protocolServerResponse = await axios.post(protocolServerUrl.href, data, {
            validateStatus: () => true
        });

        const status = is_error 
                            ? 'error' 
                            : protocolServerResponse.status.toString().startsWith('2') 
                                ? 'success' 
                                : 'error';

        await insertLog({
            id: uuidv4(),
            transaction_id: context.transaction_id!,
            message_id: context.message_id!,
            bap_id: context.bap_id || '',
            protocol: 'beckn',
            action: `on_${action}`,
            stage,
            endpoint: `/on_${action}`,
            method: 'POST',
            status,
            status_code: protocolServerResponse.status,
            request_data: data,
            response_data: protocolServerResponse.data
        });

        console.log(`[${new Date().toISOString()}] On ${action} response sent to protocol server ${protocolServerUrl}`);
        console.log(`[${new Date().toISOString()}] Protocol server response status:`, protocolServerResponse.status, JSON.stringify(data));

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

        sendToProtocolServer(errorResponse, context, true);
    };

    return {
        sendAck,
        sendToProtocolServer,
        handleError
    };
};