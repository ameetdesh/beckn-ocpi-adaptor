import { refreshOCPIcache } from "../utils/ocpi.utils";

async function main() {
    // Prime Redis with the latest OCPI data
    await refreshOCPIcache();
    console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
}
    
main();
