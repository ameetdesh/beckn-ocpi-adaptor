import { createOCPIUtils } from '@beckn/ocpi-adaptor-core';
import { appConfig } from '../config/app.config';

async function main() {
    // Create OCPI utils (without cache/logger for simple discovery script)
    const ocpiUtils = createOCPIUtils({
        ocpiUrl: appConfig.ocpi.url,
        ocpiAuthKey: appConfig.ocpi.auth_key
        // cache and logger are optional - discovery script doesn't need them
    });

    // Prime Redis with the latest OCPI data
    await ocpiUtils.refreshOCPIcache();
    console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
}
    
main();
