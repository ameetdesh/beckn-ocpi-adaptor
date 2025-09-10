import { Pool, PoolConfig } from 'pg';
import fs from 'fs';
import path from 'path';
import format from 'pg-format';
import { appConfig } from '../config/app.config';

import { withTransaction } from '../utils/db.utils';

const MIGRATIONS_PATH = path.join(process.cwd(), 'src', 'db', 'migrations');

// Database connection configuration
const dbConfig: PoolConfig = {
  connectionString: appConfig.database.url,
  ssl: appConfig.node_env === 'production' ? { rejectUnauthorized: false } : false,
};

// Create a new pool
const pool = new Pool(dbConfig);

// Test the connection
const testConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(`[${new Date().toISOString()}] Successfully connected to PostgreSQL`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error connecting to PostgreSQL:`, err);
    process.exit(1);
  }
};

testConnection();

// Run migrations
const runMigrations = async () => {
  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        run_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get all migration files
    const migrationFiles = fs.readdirSync(MIGRATIONS_PATH)
      .filter(file => file.endsWith('.sql'))
      .sort();

    // Run each migration that hasn't been run yet
    for (const file of migrationFiles) {
      const migrationName = file.split('.')[0];
      const result = await pool.query('SELECT id FROM migrations WHERE name = $1', [migrationName]);
      
      if (result.rows.length === 0) {
        console.log(`[${new Date().toISOString()}] Running migration: ${file}`);
        const sql = fs.readFileSync(path.join(MIGRATIONS_PATH, file), 'utf8');
        
        try {
          await withTransaction(async (client) => {
            await client.query(sql);
            await client.query('INSERT INTO migrations (name) VALUES ($1)', [migrationName]);
          });
          console.log(`[${new Date().toISOString()}] Migration ${file} completed successfully`);
        } catch (error) {
          console.error(`[${new Date().toISOString()}] Error running migration ${file}:`, error);
          process.exit(1);
        }
      }
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error running migrations:`, error);
    process.exit(1);
  }
};

// Export the pool and functions
export { pool, runMigrations, format };
