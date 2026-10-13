// Vizuály reklam A a B pro Feed (4:5) a Stories/Reels (9:16), texty a koncept v docs/reklamy.md.
// Všechna čísla bere z public/data.js (tedy z data/*.csv) a ze vzorce v public/calc.js, stejně jako stránka a PDF.
//
// npm run ads
//   1. vygeneruje ads/src/{a,b}-{feed,stories}.html (HTML zdroj, v gitu, kontroluje ho npm run check)
//   2. headless Chrome z nich vyfotí ads/{a,b}-feed-4x5.png a ads/{a,b}-stories-9x16.png
//   3. vyfotí kontrolní obrázky s vyznačenými bezpečnými zónami Mety: ads/kontrola/*-zony.png
//   4. zapíše otisk HTML do ads/src/ads.sha256, aby check poznal neaktuální PNG
// Formáty a zóny podle Meta Ads Guide (ověřeno 13. 10. 2026):
//   Feed 4:5, 1440 × 1800; Meta pro Feed zóny neuvádí, držíme okraj 6 %.
//   Stories a Reels 9:16, 1440 × 2560; volné asi 14 % nahoře, 35 % dole, 6 % po stranách.
// Chrome: proměnná CHROME, jinak výchozí cesta na macOS.
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { RETRIEVED, FUNDS, ESMA } from "../public/data.js";
import { feeCost } from "../public/calc.js";

const root = fileURLToPath(new URL("..", import.meta.url));
export const SRC_DIR = root + "ads/src/";
export const SHA_PATH = SRC_DIR + "ads.sha256";

export const FORMATS = {
  feed: { w: 1440, h: 1800, file: "feed-4x5", zone: { top: 0.06, bottom: 0.06, side: 0.06 } },
  stories: { w: 1440, h: 2560, file: "stories-9x16", zone: { top: 0.14, bottom: 0.35, side: 0.06 } }
};
export const ADS = ["a", "b"];

// ---------- formátování ----------
const fmt = n => Math.round(n).toLocaleString("cs-CZ").replace(/\s/g, " ");
const pct = n => n.toLocaleString("cs-CZ", { maximumFractionDigits: 4 }) + " %";
const date = iso => { const [y, m, d] = iso.split("-"); return `${+d}.\u00a0${+m}.\u00a0${y}`; };
// Zaokrouhlení dolů na 2 platné číslice, jako v textu reklamy (1 443 → 1 400, 61 171 → 61 000)
const floor2 = n => { const p = 10 ** Math.max(0, Math.floor(Math.log10(n)) - 1); return Math.floor(n / p) * p; };

// ---------- data ----------
const MONTHLY = 2000, YEARS = 20;
const SP500 = FUNDS.filter(f => f.index.startsWith("S&P 500"));
const EU = SP500.filter(f => f.type === "UCITS");
const VOO = FUNDS.find(f => f.ticker === "VOO");
const etfTer = Math.min(...SP500.map(f => f.ter));
const euTer = [Math.min(...EU.map(f => f.ter)), Math.max(...EU.map(f => f.ter))];
const AVG = ESMA.avg_fund;
const etfCost = floor2(feeCost(MONTHLY, YEARS, etfTer));
const avgCost = floor2(feeCost(MONTHLY, YEARS, AVG.ter));
const esmaDate = date(AVG.published);

// ---------- obsah ----------
function adA() {
  const bar = n => ((n / avgCost) * 100).toFixed(2) + "%";
  return `
  <div class="main">
  <h1 class="q">Kolik vás stojí samotný fond?</h1>
  <p class="ctx">${fmt(MONTHLY)}&nbsp;Kč měsíčně, ${YEARS}&nbsp;let, i&nbsp;bez zhodnocení:</p>
  <div class="rows">
    <div class="row">
      <div class="row-top"><p class="name">ETF na S&amp;P&nbsp;500<small>${pct(etfTer)} ročně</small></p><p class="amount">${fmt(etfCost)}&nbsp;Kč</p></div>
      <div class="track"><div class="fill" style="width:${bar(etfCost)}"></div></div>
    </div>
    <div class="row big">
      <div class="row-top"><p class="name">Průměrný akciový fond v&nbsp;EU<small>${pct(AVG.ter)} ročně (ESMA)</small></p><p class="amount">${fmt(avgCost)}&nbsp;Kč</p></div>
      <div class="track"><div class="fill" style="width:100%"></div></div>
    </div>
  </div>
  </div>
  <div class="foot">
    <p>Jen roční náklady fondu, zaokrouhleno dolů. Bez poplatků brokera, směny měn a daní. Zdroj: emitenti fondů ${date(RETRIEVED)}, ESMA ${esmaDate}.</p>
    <p class="disc">Nejde o investiční doporučení.</p>
  </div>`;
}

function adB() {
  const euRange = pct(euTer[0]).replace(" %", "") + " až " + pct(euTer[1]);
  return `
  <div class="main">
  <h1 class="q">Koupíte VOO z&nbsp;Česka?</h1>
  <div class="vs">
    <div class="card"><p class="fund">${VOO.ticker}</p><p class="ter"><small>TER</small>${pct(VOO.ter)}</p></div>
    <p class="vs-mark">vs</p>
    <div class="card"><p class="fund eu">Evropský fond na stejný index</p><p class="ter"><small>TER</small>${euRange}</p></div>
  </div>
  </div>
  <div class="foot">
    <p>TER = roční náklady fondu. Index S&amp;P&nbsp;500. Zdroj: emitenti fondů, ${date(RETRIEVED)}.</p>
    <p class="disc">Nejde o investiční doporučení.</p>
  </div>`;
}

// ---------- stránka ----------
export function renderAd(ad, format, { zones = false } = {}) {
  const F = FORMATS[format];
  const z = F.zone;
  const top = Math.round(F.h * z.top), bottom = Math.round(F.h * z.bottom), side = Math.round(F.w * z.side);
  // Stories mají na obsah jen střední pás, proto menší měřítko
  const k = format === "stories" ? 0.82 : 1;
  const px = n => Math.round(n * k) + "px";
  return `<!doctype html>
<html lang="cs" data-ad="${ad}" data-format="${format}">
<head>
<meta charset="utf-8">
<title>Reklama ${ad.toUpperCase()}, ${format}</title>
<style>
  @font-face {
    font-family: "Archivo";
    src: url("../../public/fonts/archivo-cs.woff2") format("woff2");
    font-weight: 400 900;
    font-stretch: 72% 100%;
  }
  :root { --ink: #111111; --paper: #ffffff; --muted: #4a4a4a; --tag: #ffd400; --red: #b3261e; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${F.w}px; height: ${F.h}px; overflow: hidden; }
  body {
    font-family: "Archivo", sans-serif; font-variant-numeric: tabular-nums; color: var(--ink); background: var(--paper);
    line-height: 1.25; position: relative;
  }
  /* Obsah jen uvnitř bezpečné zóny */
  .band {
    position: absolute; top: ${top}px; bottom: ${bottom}px; left: ${side}px; right: ${side}px;
    padding: ${px(24)} ${px(16)}; display: flex; flex-direction: column; overflow: hidden;
  }
  .logo { display: flex; align-items: center; gap: ${px(12)}; font-weight: 800; font-size: ${px(40)}; }
  .logo b { background: var(--ink); color: var(--paper); padding: ${px(4)} ${px(10)}; font-stretch: 75%; font-weight: 900; }
  .q {
    font-stretch: 72%; font-weight: 850; font-size: ${px(ad === "a" ? 200 : 230)}; line-height: .95; letter-spacing: -0.01em;
    text-wrap: balance;
  }
  /* Hlavní obsah vycentrovaný mezi logem a poznámkou dole */
  .main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: ${px(40)} 0; }
  .ctx { font-size: ${px(54)}; font-weight: 700; margin-top: ${px(48)}; }

  /* A: dva řádky jako výsledek kalkulačky na stránce */
  .rows { margin-top: ${px(44)}; border-top: ${px(6)} solid var(--ink); }
  .row { padding: ${px(32)} 0 ${px(34)}; border-bottom: ${px(3)} solid var(--ink); }
  .row-top { display: flex; justify-content: space-between; align-items: center; gap: ${px(32)}; }
  .name { font-size: ${px(48)}; font-weight: 700; line-height: 1.15; }
  .name small { display: block; font-size: ${px(40)}; font-weight: 400; color: var(--muted); margin-top: ${px(8)}; }
  .amount { font-stretch: 75%; font-weight: 850; font-size: ${px(150)}; line-height: 1; white-space: nowrap; }
  .row.big .amount { background: var(--tag); padding: ${px(10)} ${px(18)} ${px(4)}; }
  .track { height: ${px(36)}; margin-top: ${px(26)}; position: relative; }
  .fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--ink); min-width: ${px(12)}; }
  .row.big .fill { background: var(--red); }

  /* B: VOO a evropský fond pod sebou, vlevo název, vpravo jen TER */
  .vs { margin-top: ${px(64)}; }
  .card {
    border: ${px(6)} solid var(--ink); padding: ${px(36)} ${px(44)};
    display: flex; justify-content: space-between; align-items: center; gap: ${px(40)};
  }
  .fund { font-stretch: 72%; font-weight: 850; font-size: ${px(150)}; line-height: .95; }
  .fund.eu { font-size: ${px(84)}; line-height: 1; max-width: ${px(560)}; }
  .ter { font-stretch: 75%; font-weight: 850; font-size: ${px(120)}; line-height: 1; text-align: right; white-space: nowrap; }
  .ter small { display: block; font-stretch: 100%; font-weight: 700; font-size: ${px(40)}; color: var(--muted); margin-bottom: ${px(10)}; }
  .vs-mark { text-align: center; font-stretch: 72%; font-weight: 850; font-size: ${px(72)}; line-height: 1; padding: ${px(20)} 0; }

  .foot { margin-top: auto; font-size: ${px(30)}; line-height: 1.35; color: var(--muted); }
  .foot .disc { color: var(--ink); font-weight: 700; margin-top: ${px(10)}; }

  /* Kontrolní vrstva: bezpečné zóny Mety (jen v ads/kontrola/) */
  .zone { position: absolute; background: rgba(179, 38, 30, .28); }
  .zone-label { position: absolute; font: 700 32px/1 sans-serif; color: #fff; background: var(--red); padding: 6px 10px; }
</style>
</head>
<body>
<div class="band">
  <p class="logo"><b>ETF</b>v korunách</p>
  ${ad === "a" ? adA() : adB()}
</div>
${zones ? `
<div class="zone" style="left:0;right:0;top:0;height:${top}px"></div>
<div class="zone" style="left:0;right:0;bottom:0;height:${bottom}px"></div>
<div class="zone" style="left:0;top:${top}px;bottom:${bottom}px;width:${side}px"></div>
<div class="zone" style="right:0;top:${top}px;bottom:${bottom}px;width:${side}px"></div>
<p class="zone-label" style="left:${side}px;top:${Math.max(0, top - 50)}px">horní zóna ${Math.round(z.top * 100)} %</p>
<p class="zone-label" style="left:${side}px;bottom:${Math.max(0, bottom - 50)}px">spodní zóna ${Math.round(z.bottom * 100)} %</p>` : ""}
<script>
  // Pro build: přetéká obsah z bezpečné zóny? Snímek neovlivní.
  document.fonts.ready.then(() => {
    const b = document.querySelector(".band");
    document.body.setAttribute("data-overflow", b.scrollHeight > b.clientHeight + 1 || b.scrollWidth > b.clientWidth + 1 ? "yes" : "none");
  });
</script>
</body>
</html>
`;
}

export const sha256 = text => createHash("sha256").update(text).digest("hex");
export const allSources = () => ADS.flatMap(ad => Object.keys(FORMATS).map(format => renderAd(ad, format))).join("");

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const common = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=3000", "--allow-file-access-from-files", "--force-device-scale-factor=1"];
  // Headless Chrome se občas zasekne: limit 60 s a jeden další pokus
  const run = (args, opts) => {
    for (let i = 0; ; i++) {
      try { return execFileSync(chrome, args, { timeout: 60000, ...opts }); }
      catch (err) { if (i >= 1) throw err; }
    }
  };
  mkdirSync(SRC_DIR, { recursive: true });
  mkdirSync(root + "ads/kontrola", { recursive: true });
  for (const ad of ADS) for (const [format, F] of Object.entries(FORMATS)) {
    const name = `${ad}-${format}`;
    const src = SRC_DIR + name + ".html";
    writeFileSync(src, renderAd(ad, format));
    const dom = run([...common, `--window-size=${F.w},${F.h}`, "--dump-dom", "file://" + src], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    const overflow = dom.match(/data-overflow="([^"]*)"/)?.[1];
    if (overflow !== "none") {
      console.error(overflow ? `${name}: obsah přetéká z bezpečné zóny, PNG nevytvořeno.` : `${name}: kontrola přetečení neproběhla.`);
      process.exit(1);
    }
    run([...common, `--window-size=${F.w},${F.h}`, "--screenshot=" + root + `ads/${ad}-${F.file}.png`, "file://" + src], { stdio: "ignore" });
    // Kontrolní obrázek se zónami: dočasné HTML vedle zdroje (kvůli relativní cestě k písmu), po snímku smazat
    const tmp = SRC_DIR + `.${name}-zony.html`;
    writeFileSync(tmp, renderAd(ad, format, { zones: true }));
    run([...common, `--window-size=${F.w},${F.h}`, "--screenshot=" + root + `ads/kontrola/${ad}-${F.file}-zony.png`, "file://" + tmp], { stdio: "ignore" });
    rmSync(tmp);
  }
  writeFileSync(SHA_PATH, sha256(allSources()) + "\n");
  console.log("ads/src/*.html, ads/*.png a ads/kontrola/*-zony.png vygenerováno");
}
