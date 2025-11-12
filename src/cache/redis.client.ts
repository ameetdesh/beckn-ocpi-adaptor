import { createClient } from 'redis';
import { appConfig } from '../config/app.config';

type RedisClient = ReturnType<typeof createClient>;

let client: RedisClient | null = null;
let connecting: Promise<void> | null = null;
let hasLoggedConnection = false;

const createRedisClient = () => {
    const instance = createClient({
        socket: {
            host: appConfig.cache.host,
            port: appConfig.cache.port
        },
        password: appConfig.cache.password || undefined
    });

    instance.on('error', (err: unknown) => {
        console.error(`[${new Date().toISOString()}] Redis client error:`, err);
    });

    return instance;
};

export const getRedisClient = async (): Promise<RedisClient> => {
    if (!client) {
        client = createRedisClient();
    }

    if (!client.isOpen) {
        if (!connecting) {
            const connectPromise = client.connect().then(() => {
                if (!hasLoggedConnection) {
                    console.log(`[${new Date().toISOString()}] Connected to Redis at ${appConfig.cache.host}:${appConfig.cache.port}`);
                    hasLoggedConnection = true;
                }
            });
            connecting = connectPromise.catch((err: unknown) => {
                connecting = null;
                console.error(`[${new Date().toISOString()}] Failed to connect to Redis:`, err);
                throw err;
            });
        }
        await connecting;
        connecting = null;
    }

    return client!;
};

export const disconnectRedisClient = async () => {
    if (client && client.isOpen) {
        await client.quit();
    }
};
