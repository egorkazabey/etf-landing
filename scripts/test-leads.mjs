// Testovací kontakty (utm_source = 'test') po kontrole funnelu na telefonu, viz docs/mereni.md.
// npm run test-leads            počty testovacích řádků podle ad a utm_content, bez e-mailů
// npm run test-leads -- --delete smaže testovací řádky a ukáže počet všech řádků před a po
// DATABASE_URL se čte z prostředí (lokálně z .env), nikdy se nevypisuje.
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("Chybí DATABASE_URL (lokálně v .env).");
  process.exit(1);
}
const sql = neon(process.env.DATABASE_URL);
const total = async () => (await sql`select count(*)::int as n from leads`)[0].n;

const rows = await sql`
  select ad, utm_content, count(*)::int as n, sum(submissions)::int as odeslani,
         min(created_at) as prvni, max(created_at) as posledni
  from leads where utm_source = 'test'
  group by ad, utm_content order by ad, utm_content`;
console.log("Testovací řádky (utm_source = 'test'):");
console.table(rows.map(r => ({ ad: r.ad, utm_content: r.utm_content, radku: r.n, odeslani: r.odeslani,
  prvni: new Date(r.prvni).toISOString(), posledni: new Date(r.posledni).toISOString() })));
const before = await total();
console.log(`Všech řádků v tabulce: ${before}`);

if (process.argv.includes("--delete")) {
  const deleted = await sql`delete from leads where utm_source = 'test' returning id`;
  const after = await total();
  console.log(`Smazáno: ${deleted.length}. Všech řádků: před ${before}, po ${after}.`);
  if (before - after !== deleted.length) {
    console.error("Nesedí počet řádků před a po, zkontrolovat ručně.");
    process.exit(1);
  }
}
