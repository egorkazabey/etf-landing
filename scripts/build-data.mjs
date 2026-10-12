// Převede data/*.csv na public/data.js, aby stránka a PDF braly čísla z jednoho místa.
// Spuštění: npm run build (nebo node scripts/build-data.mjs). Výstup se needituje ručně.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
export const OUT = root + "public/data.js";

// CSV podle RFC 4180: čárky, uvozovky, zdvojené uvozovky uvnitř pole.
export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [head, ...body] = rows;
  return body.map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

const read = name => parseCsv(readFileSync(root + "data/" + name, "utf8"));
const num = s => (s === "" ? null : Number(s));

export function buildData() {
  const funds = read("etf.csv").map(r => ({
    ticker: r.ticker,
    name: r.nazev,
    issuer: r.emitent,
    type: r.typ, // US nebo UCITS
    nyse: r.typ === "US",
    exchange: r.burza_primarni,
    domicile: r.domicil,
    index: r.index,
    ter: num(r.ter_pct),
    terAsOf: r.ter_as_of,
    assetsUsd: num(r.aktiva_usd),
    assetsLevel: r.aktiva_uroven,
    assetsAsOf: r.aktiva_as_of,
    payout: r.vyplata_vynosu,
    registeredCz: r.registrace_cz,
    sourceUrl: r.zdroj_url,
    retrieved: r.ziskano
  }));
  const esma = Object.fromEntries(read("esma.csv").map(r => [r.id, {
    label: r.polozka,
    ter: num(r.naklady_pct),
    source: r.zdroj,
    where: r.misto_ve_zdroji,
    published: r.publikovano,
    sourceUrl: r.zdroj_url,
    retrieved: r.ziskano
  }]));
  const brokers = read("brokeri.csv").map(r => ({
    broker: r.broker,
    usEtf: r.us_etf_kratce,
    verified: r.overeno === "ano",
    evidence: r.doklad,
    feeUs: r.poplatek_us,
    sourceUrl: r.zdroj_url,
    retrieved: r.ziskano
  }));

  const json = v => JSON.stringify(v, null, 2);
  return `// Vygenerováno z data/*.csv skriptem scripts/build-data.mjs. Needitovat ručně.
export const RETRIEVED = ${json(funds[0].retrieved)};
export const FUNDS = ${json(funds)};
export const ESMA = ${json(esma)};
export const BROKERS = ${json(brokers)};
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFileSync(OUT, buildData());
  console.log("public/data.js vygenerováno");
}
