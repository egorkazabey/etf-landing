// Cena za lead, rozpočet a velikost vzorku pro A/B testy. Výstup a zdroje: docs/strategie.md, Rozhodnutí 10.
// npm run kampan            tabulky
// npm run kampan -- --sim   navíc ověření síly testu simulací (druhá metoda)

// ---------- Vstupy (zdroj a datum u každého, odhady označené) ----------

// LocaliQ (WordStream), Facebook Advertising Benchmarks, aktualizováno 23. 9. 2026, získáno 14. 10. 2026:
// Finance & Insurance, traffic campaigns, CPC 0,86 USD. Zdroj neuvádí zemi ani počet kampaní.
const CPC_USD = 0.86;
// AdAmigo, Meta Ads CPM & CPC Benchmarks by Country in 2026, 4. 10. 2026, získáno 14. 10. 2026:
// Česko, průměrné CPC 0,95 USD, všechna odvětví, projekce bez uvedené metodiky. Jen pro srovnání řádu.
const CPC_CZ_USD = 0.95;
// ČNB, kurz devizového trhu 13. 10. 2026 (pořadí 197), USD = 21,788 Kč, získáno 14. 10. 2026.
const USD_CZK = 21.788;
// Konverze návštěva → odeslaný formulář: 2 % odhad autora, 3,8 % střed rozsahu 3,7 až 3,9 %
// (Ruler 2026, Unbounce 2024), 7 % uvnitř rozsahu 6,3 až 8,3 % (Ruler, Unbounce). Viz Rozhodnutí 5.
const RATES = [0.02, 0.038, 0.07];
const BUDGET = 10000; // Kč
// Předpoklad (odhad autora): rozpočet 10 000 Kč za týden. Předpoklad: 1 klik = 1 návštěva (optimistické).
const WEEKLY_BUDGET = 10000;

// A/B test: výchozí konverze 3,8 %, oboustranný test dvou podílů, alfa 0,05, síla 80 %
const BASE = 0.038, ALPHA = 0.05, POWER = 0.8;
const LIFTS = [0.25, 0.5];

// ---------- Výpočty ----------

// Inverzní distribuční funkce normálního rozdělení (Acklam, relativní chyba pod 1,15e-9)
function normInv(p) {
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  if (p < lo) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - lo) return -normInv(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

// Návštěvy na variantu pro test dvou podílů (normální aproximace, bez korekce na spojitost)
export function sampleSize(p1, p2, alpha = ALPHA, power = POWER) {
  const za = normInv(1 - alpha / 2), zb = normInv(power), pm = (p1 + p2) / 2;
  const n = (za * Math.sqrt(2 * pm * (1 - pm)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p2 - p1) ** 2;
  return Math.ceil(n);
}

// Druhá metoda: podíl simulovaných testů, ve kterých z-test rozdíl odhalí (má vyjít kolem 80 %)
function simulatedPower(p1, p2, n, runs = 10000, seed = 1) {
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const za = normInv(1 - ALPHA / 2);
  const draw = p => { let k = 0; for (let i = 0; i < n; i++) if (rnd() < p) k++; return k; };
  let hits = 0;
  for (let r = 0; r < runs; r++) {
    const x1 = draw(p1), x2 = draw(p2), pool = (x1 + x2) / (2 * n);
    const z = (x2 - x1) / n / Math.sqrt(pool * (1 - pool) * 2 / n);
    if (Math.abs(z) > za) hits++;
  }
  return hits / runs;
}

const fmt = (n, d = 0) => n.toLocaleString("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d });
const pct = p => (p * 100).toLocaleString("cs-CZ", { maximumFractionDigits: 2 }) + " %";

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const cpc = CPC_USD * USD_CZK;
  console.log(`Cena za klik: ${fmt(CPC_USD, 2)} USD × ${fmt(USD_CZK, 3)} = ${fmt(cpc, 2)} Kč (pro srovnání ČR všechna odvětví: ${fmt(CPC_CZ_USD * USD_CZK, 2)} Kč)\n`);
  console.log("| Konverze | Cena za lead | Kontaktů za 10 000 Kč |");
  for (const r of RATES) console.log(`| ${pct(r)} | ${fmt(cpc / r)} Kč | ${fmt(BUDGET / cpc * r)} |`);

  const perDay = WEEKLY_BUDGET / 7 / cpc;
  console.log(`\nNávštěv za den při ${fmt(WEEKLY_BUDGET)} Kč týdně: ${fmt(perDay)}\n`);
  console.log("| Změna konverze | Z → na | Návštěv na variantu | Celkem | Dní | Kč |");
  for (const lift of LIFTS) {
    const p2 = BASE * (1 + lift), n = sampleSize(BASE, p2), total = 2 * n;
    console.log(`| +${pct(lift)} | ${pct(BASE)} → ${pct(p2)} | ${fmt(n)} | ${fmt(total)} | ${fmt(Math.ceil(total / perDay))} | ${fmt(total * cpc)} |`);
    if (process.argv.includes("--sim")) console.log(`  simulace (10 000 testů): síla ${pct(simulatedPower(BASE, p2, n))}`);
  }
}
