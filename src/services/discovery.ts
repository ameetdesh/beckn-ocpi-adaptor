import { runMigrations } from "../db";
import { refreshOCPIcache } from "../utils/ocpi.utils";

async function main() {
    // Initialize database
    await runMigrations();
    console.log(`[${new Date().toISOString()}] Database initialized and migrations applied`);
    await refreshOCPIcache();
    console.log(`[${new Date().toISOString()}] OCPI Cache refreshed`);
}
    
main();