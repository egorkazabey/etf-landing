// Vytvoří tabulky podle db/schema.sql. Spuštění: npm run db:migrate
// DATABASE_URL se čte z prostředí (lokálně z .env), nikdy se nevypisuje.
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("Chybí DATABASE_URL (lokálně v .env).");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");
const statements = schema
  .split("\n").filter(l => !l.trim().startsWith("--")).join("\n")
  .split(";").map(s => s.trim()).filter(Boolean);

for (const s of statements) await sql.query(s);
const [{ count }] = await sql`select count(*)::int as count from leads`;
console.log(`Hotovo: ${statements.length} příkaz(ů), tabulka leads má ${count} řádků.`);
