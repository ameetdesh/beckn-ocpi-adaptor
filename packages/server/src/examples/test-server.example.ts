/**
 * Example: Testing @beckn/server package
 * 
 * Run with: npx ts-node src/examples/test-server.example.ts
 */

import { createServer, startServer } from '../index';
import { Router, type Request, type Response } from 'express';

async function testServer() {
    console.log('=== Testing @beckn/server ===\n');

    // Create a simple test router
    const testRoutes = Router();
    testRoutes.get('/test', (_req: Request, res: Response) => {
        res.json({ message: 'Server is working!' });
    });

    // Create server
    console.log('1. Creating server...');
    const app = createServer(
        {
            port: 3001, // Use different port to avoid conflicts
            enableCors: true
        },
        {
            routes: testRoutes,
            onStartup: async () => {
                console.log('✅ Server startup hook executed');
            },
            onShutdown: async () => {
                console.log('✅ Server shutdown hook executed');
            }
        }
    );

    console.log('✅ Server created successfully');

    // Start server
    console.log('\n2. Starting server...');
    await startServer(
        app,
        { port: 3001 },
        {
            routes: testRoutes,
            onStartup: async () => {
                console.log('✅ Server started on http://localhost:3001');
                console.log('   Test endpoint: http://localhost:3001/test');
                console.log('   Health check: http://localhost:3001/health');
                console.log('\n   Press Ctrl+C to stop the server');
            }
        }
    );
}

// Run if executed directly
if (require.main === module) {
    testServer().catch(console.error);
}

export { testServer };

