import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';

export interface ServerConfig {
    port: number;
    enableCors?: boolean;
    corsOptions?: cors.CorsOptions;
}

export interface ServerDependencies {
    routes: express.Router;
    onStartup?: () => Promise<void>;
    onShutdown?: () => Promise<void>;
}

/**
 * Creates an Express server application with middleware and routes.
 * This factory function accepts dependencies for dependency injection.
 */
export const createServer = (config: ServerConfig, dependencies: ServerDependencies): Express => {
    const app = express();

    // CORS middleware
    if (config.enableCors !== false) {
        app.use(cors(config.corsOptions));
    }

    // Body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Request logging middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });

    // API Routes
    app.use('/', dependencies.routes);

    // Health check endpoint
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({ status: 'ok' });
    });

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

    return app;
};

/**
 * Starts the Express server and runs startup hooks.
 */
export const startServer = async (
    app: Express,
    config: ServerConfig,
    dependencies: ServerDependencies
): Promise<void> => {
    // Run startup hook if provided
    if (dependencies.onStartup) {
        await dependencies.onStartup();
    }

    // Start the server
    app.listen(config.port, () => {
        console.log(`[${new Date().toISOString()}] Server is running on http://localhost:${config.port}`);
    });

    // Setup process handlers
    process.on('unhandledRejection', (reason, promise) => {
        console.error(
            `[${new Date().toISOString()}] Unhandled promise rejection detected`,
            { reason, promise }
        );
    });

    process.on('uncaughtException', (error) => {
        console.error(`[${new Date().toISOString()}] Uncaught exception detected`, error);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
        console.log(`[${new Date().toISOString()}] SIGTERM received, shutting down gracefully...`);
        if (dependencies.onShutdown) {
            await dependencies.onShutdown();
        }
        process.exit(0);
    });

    process.on('SIGINT', async () => {
        console.log(`[${new Date().toISOString()}] SIGINT received, shutting down gracefully...`);
        if (dependencies.onShutdown) {
            await dependencies.onShutdown();
        }
        process.exit(0);
    });
};


