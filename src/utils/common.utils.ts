/**
 * Legacy wrapper - re-exports transformations from core package
 * This maintains backward compatibility while using the new factory-based approach
 */

import { createTransformationsFactory } from '@beckn/ocpi-adaptor-core';
import { appConfig } from '../config/app.config';
import { createDBUtils } from '@beckn/ocpi-adaptor-core';
import { createOCPIUtils } from '@beckn/ocpi-adaptor-core';
import { createOCPICache } from '@beckn/ocpi-adaptor-core';

// This will be initialized in src/index.ts
let transformationsInstance: ReturnType<typeof createTransformationsFactory> | null = null;

export const initializeTransformations = async (deps: {
    ocpiCache: ReturnType<typeof createOCPICache> | null;
    ocpiUtils: ReturnType<typeof createOCPIUtils>;
}) => {
    try {
        // Create DB utils
        const dbUtils = createDBUtils({
            ocpiCache: deps.ocpiCache || {
                getSnapshot: async () => null
            },
            ocpiUtils: {
                buildOCPIDataSnapshot: deps.ocpiUtils.buildOCPIDataSnapshot,
                refreshOCPIcache: deps.ocpiUtils.refreshOCPIcache
            },
            useCache: appConfig.app.initialization.use_cache
        });

        // Create transformations factory
        const factoryResult = createTransformationsFactory({
            becknVersion: appConfig.beckn.version,
            dbUtils,
            ocpiUtils: {
                checkEVSEStatus: deps.ocpiUtils.checkEVSEStatus
            },
            config: {
                app: {
                    discovery: {
                        default_radius_meters: appConfig.app.discovery.default_radius_meters,
                        share_location_details: appConfig.app.discovery.share_location_details
                    },
                    defaults: {
                        item_name: appConfig.app.defaults.item_name
                    }
                },
                beckn: {
                    bpp_id: appConfig.beckn.bpp_id,
                    bpp_uri: appConfig.beckn.bpp_uri,
                    protocol_server_url: appConfig.beckn.protocol_server_url
                }
            }
        });

        if (!factoryResult) {
            throw new Error('createTransformationsFactory returned null or undefined');
        }

        transformationsInstance = factoryResult;
        console.log(`[${new Date().toISOString()}] Transformations factory created successfully`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error initializing transformations:`, error);
        throw error;
    }
};

// Verification function
export const isTransformationsInitialized = (): boolean => {
    return transformationsInstance !== null;
};

// Legacy exports for backward compatibility
export const createCatalogFromIntent = async (request: any) => {
    if (!transformationsInstance) {
        throw new Error('Transformations not initialized. Call initializeTransformations first.');
    }
    return transformationsInstance.createCatalogFromIntent(request);
};

export const createDiscoverCatalog = async (request: any) => {
    if (!transformationsInstance) {
        throw new Error('Transformations not initialized. Call initializeTransformations first.');
    }
    return transformationsInstance.createDiscoverCatalog(request);
};

export const createOnInitResponse = async (request: any) => {
    if (!transformationsInstance) {
        throw new Error('Transformations not initialized. Call initializeTransformations first.');
    }
    return transformationsInstance.createOnInitResponse(request);
};

export const createOnSelectResponse = async (request: any) => {
    if (!transformationsInstance) {
        throw new Error('Transformations not initialized. Call initializeTransformations first.');
    }
    return transformationsInstance.createOnSelectResponse(request);
};
