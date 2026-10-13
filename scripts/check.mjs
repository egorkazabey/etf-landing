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

// 2b. Výchozí čísla v public/index.html (vidět před načtením skriptu) sedí s daty a vzorcem
const { FUNDS, ESMA, BROKERS } = await import("../public/data.js");
const html = readFileSync(root + "public/index.html", "utf8");
const norm = s => s.replace(/&nbsp;|\u00a0/g, " ").replace(/&amp;/g, "&").trim();
const fmt = n => Math.round(n).toLocaleString("cs-CZ");
const pct = n => n.toLocaleString("cs-CZ", { maximumFractionDigits: 4 }) + " %";
const fund = t => FUNDS.find(f => f.ticker === t);
const eu = FUNDS.filter(f => f.type === "UCITS" && f.index.startsWith("S&P 500"));
const range = (arr, k) => [Math.min(...arr.map(f => f[k])), Math.max(...arr.map(f => f[k]))];
const [euLo, euHi] = range(eu, "ter");
const [szLo, szHi] = range(eu, "assetsUsd");
const cost = ter => feeCost(2000, 20, ter);
const expected = {
  'data-out="voo"': fmt(cost(fund("VOO").ter)) + " Kč",
  'data-out="eu"': fmt(cost(euLo)) + " až " + fmt(cost(euHi)) + " Kč",
  'data-out="avg"': fmt(cost(ESMA.avg_fund.ter)) + " Kč",
  'data-ter="voo"': pct(fund("VOO").ter),
  'data-ter="eu"': pct(euLo).replace(" %", "") + " až " + pct(euHi),
  'data-ter="avg"': pct(ESMA.avg_fund.ter),
  'data-f="ter"': pct(fund("VOO").ter),
  'data-f="eu-ter"': pct(euLo).replace(" %", "") + " až " + pct(euHi),
  'data-f="size"': fmt(fund("VOO").assetsUsd / 1e9) + " mld. USD",
  'data-f="eu-size"': fmt(szLo / 1e9) + " až " + fmt(szHi / 1e9) + " mld. USD",
  'data-f="brokers"': BROKERS.filter(b => b.verified).map(b => b.broker.split(" ")[0] + " " + b.usEtf).join(", ")
};
for (const [attr, want] of Object.entries(expected)) {
  const m = html.match(new RegExp(attr + "[^>]*>([^<]*)"));
  if (!m) fail(`public/index.html: chybí prvek ${attr}`);
  else if (norm(m[1]) !== norm(want)) fail(`public/index.html ${attr}: v HTML "${norm(m[1])}", z dat "${norm(want)}"`);
}

// 2c. PDF: zdroj odpovídá datům, PDF je vytištěné z aktuálního zdroje, upozornění na první a poslední straně
const { renderTahak, sha256, HTML_PATH, SHA_PATH } = await import("./build-pdf.mjs");
const tahak = existsSync(HTML_PATH) ? readFileSync(HTML_PATH, "utf8") : "";
if (tahak !== renderTahak()) fail("reward/tahak.html neodpovídá datům, spusťte npm run pdf");
else if (!existsSync(SHA_PATH) || readFileSync(SHA_PATH, "utf8").trim() !== sha256(tahak)) fail("PDF není vytištěné z aktuálního reward/tahak.html, spusťte npm run pdf");
for (const f of ["public/srovnani-etf.pdf", "public/odmena-nahled.png", "public/odmena-nahled.webp"]) if (!existsSync(root + f)) fail(`chybí ${f}, spusťte npm run pdf`);
const pagesHtml = tahak.split('<section class="page">').slice(1);
const disclaimer = "nejde o investiční doporučení";
if (!pagesHtml.length || !pagesHtml[0].includes(disclaimer) || !pagesHtml.at(-1).includes(disclaimer)) {
  fail(`PDF: "${disclaimer}" musí být na první i poslední straně`);
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
console.log(`OK: data aktuální, ${rows.length} výpočtů sedí s dokumentací, ${Object.keys(expected).length} výchozích hodnot v HTML sedí s daty, PDF aktuální (${pagesHtml.length} stran), ${textFiles.length} souborů bez dlouhých pomlček`);
