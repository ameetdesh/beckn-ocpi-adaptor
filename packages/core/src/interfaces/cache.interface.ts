/**
 * Cache Store Interface
 * 
 * This interface defines the contract for cache implementations.
 * Consumers of the SDK can provide their own cache implementation.
 */
export interface CacheStore<T> {
    get(): Promise<T | null>;
    set(value: T): Promise<void>;
    clear(): Promise<void>;
}

