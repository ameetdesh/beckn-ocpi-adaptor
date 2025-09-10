import { Router } from 'express';
import { pool } from '../db/index';
import { LogData } from '../models/log.model';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.get('/', async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] All Logs Request:`, req.query);
        
        // Extract query parameters
        const {
            transaction_id,
            message_id,
            bap_id,
            protocol,
            action,
            stage,
            status,
            method,
            since,
            limit = '100' // Default limit to 100 records if not specified
        } = req.query;

        // Start building the query
        let query = 'SELECT * FROM app_logs';
        const params: any[] = [];
        const conditions: string[] = [];
        let paramIndex = 1;

        // Helper function to add conditions
        const addCondition = (field: string, value: any, operator = '=') => {
            if (value) {
                conditions.push(`${field} ${operator} $${paramIndex++}`);
                params.push(value);
            }
        };

        // Add conditions for each possible filter
        addCondition('transaction_id', transaction_id);
        addCondition('message_id', message_id);
        addCondition('bap_id', bap_id);
        addCondition('protocol', protocol);
        addCondition('action', action);
        addCondition('stage', stage);
        addCondition('status', status);
        addCondition('method', method);

        // Handle timestamp filter (since)
        if (since) {
            conditions.push(`created_at >= $${paramIndex++}`);
            params.push(new Date(since as string));
        }

        // Add WHERE clause if there are any conditions
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Add ORDER BY to sort by created_at descending (newest first)
        query += ' ORDER BY created_at DESC';

        // Add LIMIT
        const limitNum = parseInt(limit as string, 10);
        if (!isNaN(limitNum) && limitNum > 0) {
            query += ` LIMIT $${paramIndex++}`;
            params.push(limitNum);
        }

        // Execute the query
        const result = await pool.query(query, params);
        
        res.json({
            status: 'success',
            count: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in All Logs:`, error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch logs',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});


export default router;


const query = async (text: string, params: any[] = []) => {
    try {
        const result = await pool.query(text, params);
        return result.rows;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Database query error:`, error);
        throw error;
    }
};

export const insertLog = async (log: LogData) => {
    try {
        log = JSON.parse(JSON.stringify(log));
        if(!log.transaction_id || !log.protocol || !log.action || !log.stage || !log.endpoint || !log.method || !log.status){
            throw new Error('Transaction id, protocol, action, stage, endpoint, method, status and timestamp are required');
        }
        const id = uuidv4();

        /*
        if(log.request_data?.context?.bap_id){
            log.request_data.context.bap_id = 'evcharging-bap.becknprotocol.io';
        }
        if(log.request_data?.context?.bpp_id){
            log.request_data.context.bpp_id = 'evcharging-bpp.becknprotocol.io';
        }
        if(log.request_data?.context?.bpp_uri){
            log.request_data.context.bpp_uri = 'https://evcharging-bpp.becknprotocol.io/';
        }
        if(log.request_data?.context?.bap_uri){
            log.request_data.context.bap_uri = 'https://evcharging-bap.becknprotocol.io/';
        }

        if(log.response_data?.context?.bap_id){
            log.response_data.context.bap_id = 'evcharging-bap.becknprotocol.io';
        }
        if(log.response_data?.context?.bpp_id){
            log.response_data.context.bpp_id = 'evcharging-bpp.becknprotocol.io';
        }
        if(log.response_data?.context?.bap_uri){
            log.response_data.context.bpp_uri = 'https://evcharging-bpp.becknprotocol.io/';
        }
        if(log.response_data?.context?.bpp_uri){
            log.response_data.context.bpp_uri = 'https://evcharging-bpp.becknprotocol.io/';
        }*/

        // Stringify objects before inserting into the database
        const requestData = typeof log.request_data === 'object' ? JSON.stringify(log.request_data) : log.request_data;
        const responseData = typeof log.response_data === 'object' ? JSON.stringify(log.response_data) : log.response_data;

        const result = await pool.query(
            'INSERT INTO app_logs (id, transaction_id, message_id, bap_id, protocol, action, stage, endpoint, method, status, request_data, response_data, error_message, status_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
            [id, log.transaction_id, log.message_id, 'evcharging-bap.becknprotocol.io', log.protocol, log.action, log.stage, log.endpoint, log.method, log.status, requestData, responseData, log.error_message, log.status_code]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Database insert error:`, error);
        throw error;
    }
};
    