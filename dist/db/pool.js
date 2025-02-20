import pg from "pg";
const { Pool } = pg;
const { Client } = pg;
let client = null;
let pool = null;
export function getClient() {
    if (client) {
        return client;
    }
    client = new Client({
        port: parseInt(process.env.PGPORT || "5432", 10),
        ssl: {
            rejectUnauthorized: false,
        },
    });
    return client;
}
export function getPool() {
    if (pool) {
        return pool;
    }
    pool = new Pool({
        port: parseInt(process.env.PGPORT || "5432", 10),
        ssl: {
            rejectUnauthorized: false,
        },
    });
    return pool;
}
