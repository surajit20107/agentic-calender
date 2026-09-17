import { Pool } from "pg";

let pool: Pool | null = null;

export function getPoll():Pool {
    if (!pool) {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) {
            throw new Error("DATABASE_URL is not set");
        }
        pool = new Pool({ connectionString });
    }
    return pool;
}

export function closePool():void {
    if (pool) {
        pool.end();
        pool = null;
    }
}
