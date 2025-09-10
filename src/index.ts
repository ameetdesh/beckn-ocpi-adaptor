import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { runMigrations } from './db';
import { refreshOCPIcache } from './utils/ocpi.utils';
import { appConfig } from './config/app.config';

const app = express();
const PORT = appConfig.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// API Routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${new Date().toISOString()}] Unhandled error:`, err);
    res.status(500).json({
        error: {
            message: 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { details: err.message })
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Server is running on http://localhost:${PORT}`);
});

async function main() {
    // Initialize database
    //await runMigrations();
    console.log(`[${new Date().toISOString()}] Database initialized and migrations applied`);
    //await refreshOCPIcache();
    console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
}
    
main();