// Kontroly před commitem: npm run check
// 1. public/data.js odpovídá data/*.csv
// 2. vzorec v public/calc.js dává stejné částky jako tabulka v docs/zdroje-dat.md (Výpočty)
// 3. v textech nejsou dlouhé pomlčky (CLAUDE.md, pravidlo 5)
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildData, OUT } from "./build-data.mjs";
import { feeCost } from "../public/calc.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const errors = [];
const fail = msg => errors.push(msg);

// 1. Data
if (readFileSync(OUT, "utf8") !== buildData()) fail("public/data.js neodpovídá data/*.csv, spusťte npm run build");

// 2. Vzorec proti dokumentaci (2 000 Kč měsíčně, 20 let, 0 % výnos)
const doc = readFileSync(root + "docs/zdroje-dat.md", "utf8");
const section = doc.split("## Výpočty")[1]?.split("\n## ")[0] ?? "";
const rows = [...section.matchAll(/^\| ([^|]+) \| ([\d,]+) % \| ([\d ]+) Kč \|$/gm)];
if (rows.length < 5) fail(`v docs/zdroje-dat.md (Výpočty) nalezeno jen ${rows.length} řádků tabulky`);
for (const [, label, ter, amount] of rows) {
  const got = Math.round(feeCost(2000, 20, Number(ter.replace(",", "."))));
  const want = Number(amount.replace(/ /g, ""));
  if (got !== want) fail(`výpočet ${label.trim()}: vzorec ${got} Kč, dokumentace ${want} Kč`);
}

// 3. Dlouhé pomlčky (U+2013, U+2014)
function files(dir, exts) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap(name => {
    const p = dir + "/" + name;
    if (statSync(p).isDirectory()) return files(p, exts);
    return exts.some(e => p.endsWith(e)) ? [p] : [];
  });
}
const textFiles = [
  "CLAUDE.md", "README.md",
  ...files("docs", [".md"]),
  ...files("public", [".html", ".js"]),
  ...files("reward", [".html"]),
  ...files("api", [".js"]),
  ...files("design", [".html"])
].filter(f => existsSync(root + f));
for (const f of textFiles) {
  readFileSync(root + f, "utf8").split("\n").forEach((line, i) => {
    if (/[–—]/.test(line)) fail(`dlouhá pomlčka: ${f}:${i + 1}`);
  });
}

if (errors.length) {
  console.error("CHYBY:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`OK: data aktuální, ${rows.length} výpočtů sedí s dokumentací, ${textFiles.length} souborů bez dlouhých pomlček`);
