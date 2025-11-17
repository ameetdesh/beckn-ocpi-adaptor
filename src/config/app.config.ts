import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as dotenv from 'dotenv';
import { parseArgs } from 'util';

// Load environment variables from .env file
dotenv.config();

/**
 * Defines the shape of the application's configuration object.
 */
export interface AppConfig {
    node_env: 'development' | 'production' | 'test';
    port: number;
    ocpi: {
        url: string;
        auth_key: string;
    };
    beckn: {
        version: '1.0' | '2.0';
        bpp_id: string;
        bpp_uri: string;
        protocol_server_url: string;
    };
    app: {
        discovery: {
            default_radius_meters: number;
            standard_session_kwh: number;
            share_location_details: boolean;
        };
        cancellation_terms?: Array<{
            fulfillment_state: string;
            cancellation_fee: {
                amount?: {
                    maximum?: number;
                    minimum?: number;
                    estimated?: number;
                };
                percentage?: number;
            }
        }>;
        defaults: {
            item_name: string;
        };
        initialization: {
            refresh_ocpi_cache_on_startup: boolean;
            use_cache: boolean;
        };
    };
    cache: {
        store: 'redis' | 'noop';
        host?: string;
        port?: number;
        password?: string;
        ttl_seconds: number;
    };
    logging: {
        store: 'clickhouse' | 'noop';
    };
    clickhouse?: {
        host: string;
        port: number;
        database: string;
        username?: string;
        password?: string;
        log_table: string;
    };
}


const validateConfig = (config: AppConfig) => {
    // Backwards-compatible default for use_cache
    if ((config as any).app?.initialization?.use_cache === undefined) {
        (config as any).app.initialization.use_cache = true;
    }

    if ((config as any).beckn?.version === undefined) {
        console.warn('[appConfig] beckn.version missing in config. Falling back to 2.0');
        (config as any).beckn.version = '2.0';
    }

    if (!config.cache) {
        throw new Error('cache configuration is required');
    }

    if ((config as any).cache?.store === undefined) {
        (config as any).cache.store = 'redis';
    }

    if (!['redis', 'noop'].includes(config.cache.store)) {
        throw new Error('cache.store must be either "redis" or "noop"');
    }

    if (!(config as any).logging) {
        (config as any).logging = { store: 'noop' };
    }

    if ((config as any).logging?.store === undefined) {
        (config as any).logging.store = 'noop';
    }

    if (!['clickhouse', 'noop'].includes(config.logging.store)) {
        throw new Error('app.logging.store must be either "clickhouse" or "noop"');
    }

    // --- Required Fields Validation ---
    const requiredFields = [
        'node_env',
        'port',
        'ocpi.url',
        'ocpi.auth_key',
        'beckn.version',
        'beckn.bpp_id',
        'beckn.bpp_uri',
        'beckn.protocol_server_url',
        'app.discovery.default_radius_meters',
        'app.discovery.standard_session_kwh',
        'app.discovery.share_location_details',
        'app.defaults.item_name',
        'app.initialization.refresh_ocpi_cache_on_startup',
        'app.initialization.use_cache',
        'cache.store',
        'cache.ttl_seconds',
        'logging.store'
    ];

    const missingFields = requiredFields.filter(field => {
        const parts = field.split('.');
        let value: any = config;
        for (const part of parts) {
            if (value[part] === undefined || value[part] === '') {
                return true;
            }
            value = value[part];
        }
        return false;
    });

    if (missingFields.length > 0) {
        throw new Error(`Missing required configuration fields: ${missingFields.join(', ')}`);
    }

    const needsClickHouse = config.logging.store === 'clickhouse';
    const needsRedis = config.cache.store === 'redis';

    if (needsClickHouse) {
        if (!config.clickhouse) {
            throw new Error('clickhouse configuration is required when logging.store is set to "clickhouse"');
        }

        const clickhouseFields = ['clickhouse.host', 'clickhouse.port', 'clickhouse.database'];
        const missingClickhouse = clickhouseFields.filter(field => {
            const parts = field.split('.');
            let value: any = config;
            for (const part of parts) {
                if (value[part] === undefined || value[part] === '') {
                    return true;
                }
                value = value[part];
            }
            return false;
        });

        if (missingClickhouse.length > 0) {
            throw new Error(`Missing required ClickHouse configuration fields: ${missingClickhouse.join(', ')}`);
        }
    }

    // Validate that if cancellation_terms exists, it's an array
    if (config.app.cancellation_terms && !Array.isArray(config.app.cancellation_terms)) {
        throw new Error('app.cancellation_terms must be an array if provided');
    }

    // Validate and convert port
    config.port = Number(config.port);
    if (isNaN(config.port) || config.port < 1 || config.port > 65535) {
        throw new Error('PORT must be a valid port number between 1 and 65535.');
    }

    // Validate NODE_ENV
    const validNodeEnvs = ['development', 'production', 'test'] as const;
    if (!validNodeEnvs.includes(config.node_env)) {
        throw new Error(`NODE_ENV must be one of: ${validNodeEnvs.join(', ')}.`);
    }

    const validBecknVersions = ['1.0', '2.0'] as const;
    if (!validBecknVersions.includes(config.beckn.version)) {
        throw new Error(`beckn.version must be one of: ${validBecknVersions.join(', ')}.`);
    }

    if (needsRedis) {
        if (!config.cache.host || config.cache.host.trim() === '') {
            throw new Error('cache.host is required when cache.store is set to "redis"');
        }

        if (config.cache.port === undefined || config.cache.port === null) {
            throw new Error('cache.port is required when cache.store is set to "redis"');
        }

        config.cache.port = Number(config.cache.port);
        if (Number.isNaN(config.cache.port) || config.cache.port <= 0) {
            throw new Error('cache.port must be a positive number.');
        }
    } else {
        delete (config.cache as any).host;
        delete (config.cache as any).port;
    }

    config.cache.ttl_seconds = Number(config.cache.ttl_seconds);
    if (Number.isNaN(config.cache.ttl_seconds) || config.cache.ttl_seconds <= 0) {
        throw new Error('cache.ttl_seconds must be a positive number.');
    }

    if (needsClickHouse && config.clickhouse) {
        config.clickhouse.port = Number(config.clickhouse.port);
        if (Number.isNaN(config.clickhouse.port) || config.clickhouse.port <= 0) {
            throw new Error('clickhouse.port must be a positive number.');
        }

        if (!config.clickhouse.log_table || config.clickhouse.log_table.trim() === '') {
            config.clickhouse.log_table = 'app_logs';
        }
    }

    // Validate discovery settings
    config.app.discovery.default_radius_meters = Number(config.app.discovery.default_radius_meters);
    if (isNaN(config.app.discovery.default_radius_meters) || config.app.discovery.default_radius_meters <= 0) {
        throw new Error('app.discovery.default_radius_meters must be a positive number.');
    }

    config.app.discovery.standard_session_kwh = Number(config.app.discovery.standard_session_kwh);
    if (isNaN(config.app.discovery.standard_session_kwh) || config.app.discovery.standard_session_kwh <= 0) {
        throw new Error('app.discovery.standard_session_kwh must be a positive number.');
    }

    if (typeof config.app.discovery.share_location_details !== 'boolean') {
        throw new Error('app.discovery.share_location_details must be a boolean');
    }

    if (typeof config.app.initialization.refresh_ocpi_cache_on_startup !== 'boolean') {
        throw new Error('app.initialization.refresh_ocpi_cache_on_startup must be a boolean');
    }

    if (typeof config.app.initialization.use_cache !== 'boolean') {
        throw new Error('app.initialization.use_cache must be a boolean');
    }

    if (config.app.cancellation_terms) {
        config.app.cancellation_terms.forEach((term, index) => {
            if (!term.fulfillment_state) {
                throw new Error(`app.cancellation_terms[${index}].fulfillment_state is required`);
            }
            if(!term.cancellation_fee){
                throw new Error(`app.cancellation_terms[${index}].cancellation_fee is required`);
            }
            if (term.cancellation_fee) {
                if (term.cancellation_fee.percentage === undefined &&
                    (!term.cancellation_fee.amount ||
                        (term.cancellation_fee.amount.maximum === undefined &&
                            term.cancellation_fee.amount.minimum === undefined &&
                            term.cancellation_fee.amount.estimated === undefined))) {
                    throw new Error(
                        `app.cancellation_terms[${index}].cancellation_fee must have either a percentage or at least one amount field (maximum, minimum, or estimated)`
                    );
                }
            }
        });
    }
}

const loadConfig = (): AppConfig => {

    console.log("args", process.argv)

    const {values} = parseArgs({
        options: {
            config: {
                type: 'string',
                short: 'c',
                default: './config/default.yaml',
            },
        }
    })

    const yamlPath = path.join('./', values.config);
    const resolvedYamlPath = path.resolve(yamlPath);
    console.log(`[appConfig] Loading configuration file from ${resolvedYamlPath}`);
    let fileContents: string;

    try {
        // Read the YAML file template
        fileContents = fs.readFileSync(yamlPath, 'utf8');
    } catch (e) {
        console.error('Failed to read configuration file:', yamlPath, e);
        throw new Error(`Could not read ${yamlPath}. Make sure the file exists.`);
    }

    // Regex to find all placeholders like ${VAR_NAME}
    const envVarRegex = /\$\{([^}]+)\}/g;

    // Replace placeholders with environment variable values
    const resolvedYaml = fileContents.replace(envVarRegex, (match, varName) => {
        const value = process.env[varName];
        if (value === undefined) {
            // Throw an error if a required environment variable is not set
            throw new Error(`FATAL: Environment variable '${varName}' is not set. Please define it in your .env file or environment.`);
        }
        return value;
    });

    // Parse the resolved YAML string into a JavaScript object
    const config = yaml.load(resolvedYaml) as AppConfig;

    console.log(`[appConfig] Raw beckn.version value read from YAML: ${config?.beckn?.version ?? '(undefined)'}`);

    const envCacheStore = process.env.CACHE_STORE?.trim();
    if (envCacheStore) {
        (config as any).cache = config.cache ?? {};
        (config as any).cache.store = envCacheStore as 'redis' | 'noop';
    }

    const envLogStore = process.env.LOG_STORE?.trim();
    if (envLogStore) {
        (config as any).logging = config.logging ?? { store: 'noop' };
        (config as any).logging.store = envLogStore as 'clickhouse' | 'noop';
    }

    validateConfig(config);


    // Validate cancellation terms
    if (config.app.cancellation_terms && Array.isArray(config.app.cancellation_terms)) {
        for (const [index, term] of config.app.cancellation_terms.entries()) {
            if (term.cancellation_fee?.percentage !== undefined) {
                const percentage = Number(term.cancellation_fee.percentage);
                if (isNaN(percentage) || percentage < 0 || percentage > 100) {
                    throw new Error(`cancellation_terms[${index}].cancellation_fee.percentage must be a number between 0 and 100.`);
                }
                term.cancellation_fee.percentage = percentage;
            }

            if (term.cancellation_fee?.amount) {
                const amount = term.cancellation_fee.amount;
                if (amount.maximum !== undefined) {
                    const max = Number(amount.maximum);
                    if (isNaN(max) || max < 0) {
                        throw new Error(`cancellation_terms[${index}].cancellation_fee.amount.maximum must be a non-negative number.`);
                    }
                    amount.maximum = max;
                }
                if (amount.minimum !== undefined) {
                    const min = Number(amount.minimum);
                    if (isNaN(min) || min < 0) {
                        throw new Error(`cancellation_terms[${index}].cancellation_fee.amount.minimum must be a non-negative number.`);
                    }
                    amount.minimum = min;
                }
                if (amount.estimated !== undefined) {
                    const est = Number(amount.estimated);
                    if (isNaN(est) || est < 0) {
                        throw new Error(`cancellation_terms[${index}].cancellation_fee.amount.estimated must be a non-negative number.`);
                    }
                    amount.estimated = est;
                }
            }
        }
    }

    // Validate URLs
    const validateUrl = (url: string, name: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            throw new Error(`Invalid URL for ${name}: ${url}`);
        }
    };
    if (config.ocpi.url) validateUrl(config.ocpi.url, 'ocpi.url');
    if (config.beckn.bpp_uri) validateUrl(config.beckn.bpp_uri, 'beckn.bpp_uri');
    if (config.beckn.protocol_server_url) validateUrl(config.beckn.protocol_server_url, 'beckn.protocol_server_url');

    console.log(`[appConfig] Final validated beckn.version=${config.beckn.version}`);
    return config;
};

// --- Export a singleton instance ---
// The configuration is loaded once and frozen to prevent modifications at runtime.
export const appConfig: AppConfig = Object.freeze(loadConfig());
