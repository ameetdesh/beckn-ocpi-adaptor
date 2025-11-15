import { Router } from 'express';
import { fetchLogs } from '../logging/log.service';

const router = Router();

router.get('/', async (req, res) => {
    try {
        console.log(`[${new Date().toISOString()}] All Logs Request:`, req.query);

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
            limit
        } = req.query;

        const limitNumber = limit ? Number(limit) : undefined;

        const result = await fetchLogs({
            transaction_id: transaction_id as string | undefined,
            message_id: message_id as string | undefined,
            bap_id: bap_id as string | undefined,
            protocol: protocol as string | undefined,
            action: action as string | undefined,
            stage: stage as string | undefined,
            status: status as string | undefined,
            method: method as string | undefined,
            since: since as string | undefined,
            limit: Number.isFinite(limitNumber) ? limitNumber : undefined
        });

        res.json({
            status: 'success',
            count: result.count,
            data: result.data
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
