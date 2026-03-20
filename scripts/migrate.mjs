import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const main = async () => {
    try {
        const envFile = fs.readFileSync('.env', 'utf-8');
        const dbUrlLine = envFile.split('\n').find(line => line.startsWith('DATABASE_URL='));
        const dbUrl = dbUrlLine.split('=')[1].trim();
        
        const sql = neon(dbUrl);
        console.log("Running migration...");
        try {
            await sql`ALTER TABLE "users" ADD COLUMN "points" integer DEFAULT 0`;
        } catch (e) {
            console.log("Column may already exist", e.message);
        }
        console.log("Migration successful!");
    } catch (e) {
        console.log("Failed: ", e.message);
    }
}
main();
