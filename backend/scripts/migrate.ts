import { config } from "dotenv";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { closePool, getPoll } from "../src/db/pool";

config({ path: resolve(process.cwd(), ".env") });

async function main() {
    const sqlDir = resolve(process.cwd(), "sql")
    const files = readdirSync(sqlDir).filter(file => file.endsWith(".sql")).sort();
    const pool = getPoll();

    for (const file of files) {
        const sql = readFileSync(resolve(sqlDir, file), "utf-8");
        await pool.query(sql);
        console.log(`Executed sql file: ${file}`);
    }
    await closePool();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
})
