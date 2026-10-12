// Odměna za kontakt: PDF "VOO, SPY a evropské fondy na stejný index".
// Všechna čísla bere z public/data.js (tedy z data/*.csv) a ze vzorce v public/calc.js.
//
// npm run pdf
//   1. vygeneruje reward/tahak.html (HTML zdroj PDF, v gitu, kontroluje ho npm run check)
//   2. headless Chrome z něj vytiskne public/srovnani-etf.pdf
//   3. vyfotí první stranu jako náhled nad formulářem: public/odmena-nahled.png
//   4. zapíše otisk HTML do reward/tahak.sha256, aby check poznal neaktuální PDF
// Chrome: proměnná CHROME, jinak výchozí cesta na macOS.
import { writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { RETRIEVED, FUNDS, ESMA, BROKERS } from "../public/data.js";
import { feeCost } from "../public/calc.js";

const root = fileURLToPath(new URL("..", import.meta.url));
export const HTML_PATH = root + "reward/tahak.html";
export const SHA_PATH = root + "reward/tahak.sha256";
const PDF_PATH = root + "public/srovnani-etf.pdf";
const PREVIEW_PATH = root + "public/odmena-nahled.png";
const PAGES = 6;
// Rozměr strany jako displej telefonu: v mobilním prohlížeči PDF zhruba 1:1, čitelné bez zoomování
const PAGE_W = 378, PAGE_H = 673;

// ---------- formátování ----------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nb = s => s.replace(/ (%|Kč|USD|mld\.)/g, "\u00a0$1");
const fmt = n => Math.round(n).toLocaleString("cs-CZ");
const pct = n => n.toLocaleString("cs-CZ", { maximumFractionDigits: 4 }) + "\u00a0%";
const date = iso => { const [y, m, d] = iso.split("-"); return `${+d}. ${+m}. ${y}`; };
const mld = usd => fmt(usd / 1e9) + "\u00a0mld.\u00a0USD";
const byTicker = (a, b) => a.ticker.localeCompare(b.ticker);
// Abecední pořadí všude, aby žádný fond nepůsobil jako "vítěz"
const US = FUNDS.filter(f => f.type === "US").sort(byTicker);
const EU = FUNDS.filter(f => f.type === "UCITS").sort(byTicker);
const SP500 = FUNDS.filter(f => f.index.startsWith("S&P 500")).sort(byTicker);
const fund = t => FUNDS.find(f => f.ticker === t);

function sizeLevel(f) {
  if (f.assetsLevel === "fond") return "";
  const level = f.assetsLevel.split(" (")[0].replace("ETF třída", "třída ETF");
  return "jen " + level;
}
const payout = f => (f.payout === "akumulace" ? "nevyplácí, reinvestuje" : "vyplácí " + f.payout);
const payoutShort = f => (f.payout === "akumulace" ? "reinvestuje" : "vyplácí");
const minMax = arr => [Math.min(...arr), Math.max(...arr)];

// ---------- strany ----------
function page(n, title, body, { kicker = "", disclaimer = false } = {}) {
  return `
<section class="page">
  <header class="top"><span class="logo"><b>ETF</b>v korunách</span><span class="asof">data k ${date(RETRIEVED)}</span></header>
  ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
  <h${n === 1 ? 1 : 2} class="h">${title}</h${n === 1 ? 1 : 2}>
  ${body}
  <footer class="foot">
    ${disclaimer ? `<p class="disc">Srovnání slouží pro informaci, nejde o investiční doporučení.</p>` : ""}
    <p class="pg"><span>ETF v korunách</span><span>${n}/${PAGES}</span></p>
  </footer>
</section>`;
}

function page1() {
  const [lo, hi] = minMax(SP500.map(f => f.ter));
  const rows = SP500.map(f => `
    <tr>
      <td><strong>${f.ticker}</strong></td>
      <td>${f.type === "US" ? "USA, NYSE Arca" : "Irsko, Evropa"}</td>
      <td class="num">${pct(f.ter)}</td>
      <td>${payoutShort(f)}</td>
    </tr>`).join("");
  return page(1, "VOO, SPY a evropské fondy na stejný index", `
  <p class="lead">Šest fondů sleduje stejný index S&amp;P&nbsp;500. Liší se ročními náklady, sídlem a tím, jestli výnosy vyplácejí.</p>
  <table class="t">
    <thead><tr><th>Fond</th><th>Sídlo, burza</th><th>Náklady (TER)</th><th>Výnosy</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="callout">
    <p class="big">${fmt(feeCost(2000, 20, lo))} až ${fmt(feeCost(2000, 20, hi))}&nbsp;Kč</p>
    <p>stojí těchto šest fondů za 20 let při 2&nbsp;000&nbsp;Kč měsíčně, bez zhodnocení. Průměrný akciový fond v EU: ${fmt(feeCost(2000, 20, ESMA.avg_fund.ter))}&nbsp;Kč.</p>
  </div>
  <p class="toc">Dál: všech 7 fondů z NYSE Arca · evropské fondy s ISIN · co umožňují brokeři · jak číst TER · zdroje</p>`,
  { kicker: "Srovnání pro Čechy", disclaimer: true });
}

function page2() {
  const dates = [...new Set(US.map(f => f.assetsAsOf))].sort();
  const rows = US.map(f => `
    <li>
      <p class="fund"><strong>${f.ticker}</strong><b>${esc(f.focus)}</b><span class="issuer">${esc(f.issuer.split(" (")[0])}</span></p>
      <p class="facts"><span class="num">TER ${pct(f.ter)}</span><span>${mld(f.assetsUsd)}</span><span>${payout(f)}</span></p>
    </li>`).join("");
  return page(2, "Všech 7 fondů z NYSE Arca", `
  <p class="lead">Americké fondy kótované na NYSE Arca, burze skupiny NYSE pro ETF.</p>
  <ul class="list">${rows}</ul>
  <p class="note">Velikost = čistá aktiva podle emitenta k ${dates.map(date).join(" až ")}. U fondů Vanguardu (${US.filter(f => sizeLevel(f)).map(f => f.ticker).join(", ")}) jen třída ETF, fondy mají i další třídy.</p>`);
}

function page3() {
  const vt = fund("VT");
  const rows = EU.map(f => {
    const same = US.filter(u => u.index === "S&P 500" && f.index.startsWith("S&P 500")).map(u => u.ticker);
    const twin = same.length
      ? `Stejný index jako ${same.join(", ")}`
      : `Podobný, ne stejný index jako ${vt.ticker} (${esc(f.index)} vs. ${esc(vt.index.split(" (")[0])})`;
    return `
    <li>
      <p class="fund"><strong>${f.ticker}</strong><span>${esc(f.name)}</span></p>
      <p class="facts"><span class="num">TER ${pct(f.ter)}</span><span>${mld(f.assetsUsd)} <small>(${sizeLevel(f)})</small></span><span>${payout(f)}</span></p>
      <p class="meta">${esc(f.identifier)} · ${f.registeredCz === "ano" ? "registrovaný k nabízení v ČR" : "registrace v ČR neověřena"}</p>
      <p class="meta">${twin}</p>
    </li>`;
  }).join("");
  return page(3, "4 evropské fondy se stejným nebo podobným indexem", `
  <p class="lead">Na NYSE nejsou. Mají sídlo v Irsku (UCITS) a obchodují se na evropských burzách. Podle ISIN je najdete u brokera.</p>
  <ul class="list">${rows}</ul>`);
}

function page4() {
  const verified = BROKERS.filter(b => b.verified).sort((a, b) => a.broker.localeCompare(b.broker));
  const tag = s => ({ ano: "ANO", ne: "NE", "jen CFD": "JEN CFD" }[s] || s.toUpperCase());
  const rows = verified.map(b => `
    <li>
      <p class="broker"><strong>${esc(b.broker)}</strong><span class="tag">${tag(b.usEtf)}</span></p>
      <p>${esc(b.evidence)}</p>
      ${b.feeUs ? `<p class="meta">Poplatek v USA: ${esc(b.feeUs)}</p>` : ""}
      <p class="meta">Ověřeno ${date(b.retrieved)}</p>
    </li>`).join("");
  const unverified = BROKERS.filter(b => !b.verified).map(b => b.broker);
  return page(4, "Koupím americké ETF z Česka?", `
  <p class="lead">Kdo investiční produkt prodává nebo k němu radí, musí podle nařízení PRIIPs předat sdělení klíčových informací (KID). Podle ČNB tuto povinnost nemá obchodník, který jen provede váš pokyn a produkt nenabízí. Proto záleží na brokerovi.</p>
  <ul class="list brokers">${rows}</ul>
  <p class="note">CFD je derivát, ne podíl ve fondu. Z primárních zdrojů jsme neověřili: ${unverified.concat(["Patria", "Revolut", "Portu"]).join(", ")}. Pořadí je abecední, nejde o doporučení brokera.</p>`);
}

function page5() {
  const tiers = [...new Set(SP500.map(f => f.ter))].sort((a, b) => a - b).map(ter => ({
    label: SP500.filter(f => f.ter === ter).map(f => f.ticker).join(", "), ter
  }));
  tiers.push({ label: "průměrné akciové ETF v EU (ESMA)", ter: ESMA.avg_etf.ter });
  tiers.push({ label: "průměrný akciový fond v EU (ESMA)", ter: ESMA.avg_fund.ter, big: true });
  const rows = tiers.map(t => `
    <tr${t.big ? ' class="hl"' : ""}><td>${esc(t.label)}</td><td class="num">${pct(t.ter)}</td><td class="num">${fmt(feeCost(2000, 20, t.ter))}&nbsp;Kč</td></tr>`).join("");
  const fio = BROKERS.find(b => b.broker.startsWith("Fio"));
  return page(5, "Jak číst TER a co kalkulačka nepočítá", `
  <p class="lead">TER (u evropských fondů také OCF, průběžné náklady) je roční náklad fondu v procentech z hodnoty vaší investice. Neplatíte ho zvlášť, fond si ho strhává průběžně.</p>
  <table class="t">
    <thead><tr><th>2&nbsp;000&nbsp;Kč měsíčně, 20 let</th><th>Náklady</th><th>Za 20 let</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="note">Bez zhodnocení: částka je jen to, co z vložených peněz spotřebují náklady fondu.</p>
  <h3>Co v tom není</h3>
  <ul class="bullets">
    <li>Poplatky brokera za nákup a prodej. Například Fio: ${esc(fio.feeUs.split(" (")[0])}.</li>
    <li>Směna korun na dolary nebo eura a její poplatek.</li>
    <li>Pohyb kurzu koruny vůči měně fondu.</li>
    <li>Daně. V tomto srovnání jsme je nezkoumali.</li>
  </ul>`);
}

function page6() {
  const short = url => url.replace(/^https?:\/\/(www\.)?/, "");
  const fundSources = FUNDS.slice().sort(byTicker).map(f => `<li><strong>${f.ticker}</strong> ${esc(short(f.sourceUrl))}</li>`).join("");
  const brokerSources = BROKERS.filter(b => b.verified).map(b => `<li><strong>${esc(b.broker.split(" ")[0])}</strong> ${esc(short(b.sourceUrl))}</li>`).join("");
  return page(6, "Zdroje a data", `
  <p class="lead small">Fondy: oficiální stránky emitentů, získáno ${date(RETRIEVED)}.</p>
  <ul class="src">${fundSources}</ul>
  <ul class="src">
    <li><strong>ESMA</strong> ${esc(ESMA.avg_fund.source.replace(/^ESMA, /, "").split(" (")[0])}, ${date(ESMA.avg_fund.published)}, ${esc(ESMA.avg_fund.where.split(",")[0])}</li>
    ${brokerSources}
    <li><strong>ČNB</strong> Otázky a odpovědi k nařízení PRIIPs: cnb.cz, stanovisko RS2018-0015</li>
  </ul>
  <p class="note">Výkonnost neuvádíme, u části fondů nebyla ověřena druhou kontrolou. Postup a kontrola čísel: github.com/egorkazabey/etf-landing. Ukázkový projekt do výběrového řízení: Yehor Havrylov, havrylov.yehor@gmail.com.</p>`,
  { disclaimer: true });
}

// ---------- dokument ----------
export function renderTahak() {
  return `<!doctype html>
<!-- Vygenerováno skriptem scripts/build-pdf.mjs z data/*.csv. Needitovat ručně. -->
<html lang="cs">
<head>
<meta charset="utf-8">
<title>VOO, SPY a evropské fondy na stejný index: srovnání pro Čechy</title>
<style>
  /* Statické řezy (scripts/pdf-fonts.sh): variabilní písmo by Chrome vložil jako fonty Type3 a PDF by bylo zhruba 3x větší */
  @font-face { font-family: "Archivo"; src: url("fonts/archivo-regular.woff2") format("woff2"); font-weight: 400; font-stretch: 100%; }
  @font-face { font-family: "Archivo"; src: url("fonts/archivo-bold.woff2") format("woff2"); font-weight: 700; font-stretch: 100%; }
  @font-face { font-family: "Archivo"; src: url("fonts/archivo-black.woff2") format("woff2"); font-weight: 850; font-stretch: 100%; }
  @font-face { font-family: "Archivo"; src: url("fonts/archivo-black-condensed.woff2") format("woff2"); font-weight: 850; font-stretch: 75%; }
  @page { size: ${PAGE_W}px ${PAGE_H}px; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: "Archivo", sans-serif; font-variant-numeric: tabular-nums; color: #111; background: #fff; font-size: 14px; line-height: 1.35; }
  .page { width: ${PAGE_W}px; height: ${PAGE_H}px; padding: 0 18px; position: relative; overflow: hidden; break-after: page; display: flex; flex-direction: column; }
  .page:last-child { break-after: auto; }
  .top { display: flex; justify-content: space-between; align-items: center; height: 40px; border-bottom: 2px solid #111; margin: 0 -18px; padding: 0 18px; flex: none; }
  .logo { display: flex; align-items: center; gap: 6px; font-weight: 850; font-size: 14px; }
  .logo b { background: #111; color: #fff; padding: 1px 5px; font-stretch: 75%; font-weight: 850; }
  .asof { font-size: 12px; color: #4a4a4a; }
  .kicker { margin-top: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
  .h { font-stretch: 75%; font-weight: 850; line-height: 1.0; letter-spacing: -0.01em; margin-top: 12px; }
  h1.h { font-size: 33px; margin-top: 4px; }
  h2.h { font-size: 27px; }
  h3 { font-size: 15px; font-weight: 850; margin-top: 12px; }
  .lead { margin-top: 8px; font-size: 14px; }
  .lead.small { font-size: 13px; }
  small { display: block; font-size: 12px; font-weight: 400; color: #4a4a4a; }
  .num { white-space: nowrap; }
  .t { width: 100%; border-collapse: collapse; margin-top: 10px; border-top: 2px solid #111; }
  .t th { text-align: left; font-size: 12px; font-weight: 700; color: #4a4a4a; padding: 5px 4px 5px 0; border-bottom: 2px solid #111; vertical-align: bottom; }
  .t td { padding: 5px 4px 5px 0; border-bottom: 1px solid #111; vertical-align: top; font-size: 14px; }
  .t td strong { font-stretch: 75%; font-weight: 850; font-size: 18px; line-height: 1.1; display: block; }
  .t td.num { font-weight: 850; }
  .t tr.hl td { background: #ffd400; }
  .callout { margin-top: 12px; border: 2px solid #111; padding: 8px 10px; }
  .callout .big { display: inline-block; background: #ffd400; font-stretch: 75%; font-weight: 850; font-size: 26px; line-height: 1; padding: 3px 6px 2px; }
  .callout p + p { margin-top: 6px; font-size: 13px; }
  .toc { margin-top: 10px; font-size: 12px; color: #4a4a4a; }
  .list { list-style: none; margin-top: 10px; border-top: 2px solid #111; }
  .list li { padding: 6px 0 7px; border-bottom: 1px solid #111; }
  .fund { display: flex; align-items: baseline; gap: 8px; }
  .fund strong { font-stretch: 75%; font-weight: 850; font-size: 20px; line-height: 1.1; flex: none; }
  .fund span { font-size: 12px; color: #4a4a4a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fund b { font-size: 13px; font-weight: 700; }
  .fund .issuer { margin-left: auto; flex: none; overflow: visible; }
  .facts { display: flex; flex-wrap: wrap; gap: 0 10px; font-size: 13px; margin-top: 1px; }
  .facts small { display: inline; }
  .facts .num { font-weight: 850; }
  .meta { font-size: 12px; color: #4a4a4a; margin-top: 2px; }
  .broker { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 3px; }
  .broker strong { font-stretch: 75%; font-weight: 850; font-size: 20px; }
  .tag { background: #111; color: #fff; font-weight: 850; font-stretch: 75%; font-size: 15px; padding: 2px 7px; }
  .brokers li > p:nth-child(2) { font-size: 13px; }
  .note { margin-top: 8px; font-size: 12px; color: #4a4a4a; }
  .bullets { margin-top: 4px; padding-left: 18px; font-size: 13px; }
  .bullets li + li { margin-top: 3px; }
  .src { list-style: none; margin-top: 8px; border-top: 1px solid #111; font-size: 11px; line-height: 1.25; }
  .src li { padding: 1px 0; border-bottom: 1px solid #ccc; word-break: break-all; }
  .src strong { word-break: normal; margin-right: 4px; }
  .foot { margin-top: auto; padding-bottom: 12px; flex: none; }
  .disc { font-weight: 850; font-size: 13px; border-top: 2px solid #111; padding-top: 6px; }
  .pg { display: flex; justify-content: space-between; font-size: 11px; color: #4a4a4a; margin-top: 6px; }
</style>
</head>
<body>
${[page1(), page2(), page3(), page4(), page5(), page6()].map(nb).join("\n")}
<script>
  // Pro build: strany, kde obsah přetéká a nevejde se patička. Tisk neovlivní.
  document.fonts.ready.then(() => {
    const over = [...document.querySelectorAll(".page")].map((p, i) => (p.scrollHeight > p.clientHeight + 1 ? i + 1 : 0)).filter(Boolean);
    document.body.setAttribute("data-overflow", over.join(",") || "none");
  });
</script>
</body>
</html>
`;
}

export const sha256 = text => createHash("sha256").update(text).digest("hex");

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const html = renderTahak();
  mkdirSync(root + "reward", { recursive: true });
  writeFileSync(HTML_PATH, html);
  const url = "file://" + HTML_PATH;
  const common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=3000", "--allow-file-access-from-files"];
  const dom = execFileSync(chrome, [...common, "--dump-dom", url], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  const overflow = dom.match(/data-overflow="([^"]*)"/)?.[1];
  if (overflow !== "none") {
    console.error(overflow ? `Obsah přetéká na straně ${overflow}, PDF nevytvořeno.` : "Kontrola přetečení neproběhla, PDF nevytvořeno.");
    process.exit(1);
  }
  execFileSync(chrome, [...common, "--no-pdf-header-footer", "--print-to-pdf=" + PDF_PATH, url], { stdio: "ignore" });
  execFileSync(chrome, [...common, `--window-size=${PAGE_W},${PAGE_H}`, "--force-device-scale-factor=2", "--screenshot=" + PREVIEW_PATH, url], { stdio: "ignore" });
  writeFileSync(SHA_PATH, sha256(html) + "\n");
  console.log("reward/tahak.html, public/srovnani-etf.pdf, public/odmena-nahled.png vygenerováno");
}
