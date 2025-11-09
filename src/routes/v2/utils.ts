import { Request, Response } from 'express';

export const notImplemented = (action: string) => (_req: Request, res: Response) => {
    res.status(501).json({
        status: 'error',
        message: `Beckn v2 ${action} is not implemented yet.`
    });
};
