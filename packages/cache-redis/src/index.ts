import { createClient, type RedisClientType } from 'redis';
import type { CacheStore } from '@beckn/ocpi-adaptor-core';

export interface RedisCacheConfig {
    host: string;
    port: number;
    password?: string;
    key: string;
    ttlSeconds: number;
}

let client: RedisClientType | null = null;
let connecting: Promise<void> | null = null;
let hasLoggedConnection = false;

const createRedisClient = (config: Pick<RedisCacheConfig, 'host' | 'port' | 'password'>) => {
    const instance = createClient({
        socket: {
            host: config.host,
            port: config.port
        },
        password: config.password || undefined
    }) as RedisClientType;

    instance.on('error', (err: unknown) => {
        console.error(`[${new Date().toISOString()}] Redis client error:`, err);
    });

    return instance;
};

const getRedisClient = async (config: Pick<RedisCacheConfig, 'host' | 'port' | 'password'>): Promise<RedisClientType> => {
    if (!client) {
        client = createRedisClient(config);
    }

    if (!client.isOpen) {
        if (!connecting) {
            const connectPromise = client.connect().then(() => {
                if (!hasLoggedConnection) {
                    console.log(`[${new Date().toISOString()}] Connected to Redis at ${config.host}:${config.port}`);
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

/**
 * Creates a Redis-based cache store implementation.
 * This can be used with @beckn/ocpi-adaptor-core's createOCPICache function.
 */
export const createRedisCacheStore = <T>(config: RedisCacheConfig): CacheStore<T> => {
    const logPrefix = `[${new Date().toISOString()}] RedisCacheStore`;

    return {
        async get(): Promise<T | null> {
            try {
                const client = await getRedisClient(config);
                const payload = await client.get(config.key);
                return payload ? (JSON.parse(payload) as T) : null;
            } catch (error) {
                console.error(`${logPrefix} Failed to read key ${config.key} from Redis`, error);
                return null;
            }
        },
        async set(value: T): Promise<void> {
            try {
                const client = await getRedisClient(config);
                await client.set(config.key, JSON.stringify(value), { EX: config.ttlSeconds });
            } catch (error) {
                console.error(`${logPrefix} Failed to write key ${config.key} to Redis`, error);
            }
        },
        async clear(): Promise<void> {
            try {
                const client = await getRedisClient(config);
                await client.del(config.key);
            } catch (error) {
                console.error(`${logPrefix} Failed to clear key ${config.key} from Redis`, error);
            }
        }
    };
};

/**
 * Disconnects the Redis client.
 * Useful for cleanup on application shutdown.
 */
export const disconnectRedisClient = async (): Promise<void> => {
    if (client && client.isOpen) {
        await client.quit();
        client = null;
    }
};

