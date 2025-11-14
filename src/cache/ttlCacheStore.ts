import { getRedisClient } from './redis.client';

export interface TTLCacheStore<T> {
    get(): Promise<T | null>;
    set(value: T): Promise<void>;
    clear(): Promise<void>;
}

export const createRedisTTLCacheStore = <T>(key: string, ttlSeconds: number): TTLCacheStore<T> => {
    const logPrefix = `[${new Date().toISOString()}] TTLCacheStore`;

    return {
        async get(): Promise<T | null> {
            try {
                const client = await getRedisClient();
                const payload = await client.get(key);
                return payload ? (JSON.parse(payload) as T) : null;
            } catch (error) {
                console.error(`${logPrefix} Failed to read key ${key} from Redis`, error);
                return null;
            }
        },
        async set(value: T): Promise<void> {
            try {
                const client = await getRedisClient();
                await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
            } catch (error) {
                console.error(`${logPrefix} Failed to write key ${key} to Redis`, error);
            }
        },
        async clear(): Promise<void> {
            try {
                const client = await getRedisClient();
                await client.del(key);
            } catch (error) {
                console.error(`${logPrefix} Failed to clear key ${key} from Redis`, error);
            }
        }
    };
};

export const createNoopTTLCacheStore = <T>(ttlSeconds: number): TTLCacheStore<T> => {
    let cache: T | null = null;
    let expiresAt: number | null = null;

    const isExpired = () => {
        if (expiresAt === null) return true;
        return Date.now() >= expiresAt;
    };

    const clearCache = () => {
        cache = null;
        expiresAt = null;
    };

    return {
        async get(): Promise<T | null> {
            if (cache === null || isExpired()) {
                if (cache !== null && isExpired()) {
                    clearCache();
                }
                return null;
            }
            return cache;
        },
        async set(value: T): Promise<void> {
            cache = value;
            expiresAt = Date.now() + ttlSeconds * 1000;
        },
        async clear(): Promise<void> {
            clearCache();
        }
    };
};
