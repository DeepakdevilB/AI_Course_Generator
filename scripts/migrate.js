import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const main = async () => {
    try {
        const sql = neon(process.env.DATABASE_URL);
        console.log("Running migration...");
        await sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "points" integer DEFAULT 0;`;
        console.log("Migration successful!");
    } catch (e) {
        console.log("Failed: ", e.message);
    }
}
main();
