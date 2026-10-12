import { FUNDS, ESMA, BROKERS } from "/data.js";
import { feeCost } from "/calc.js";

const $ = (sel, root = document) => root.querySelector(sel);
const fmt = n => Math.round(n).toLocaleString("cs-CZ");
const kc = n => fmt(n) + "\u00a0Kč";
const pct = n => n.toLocaleString("cs-CZ", { maximumFractionDigits: 4 }) + "\u00a0%";
const digits = s => parseInt(String(s).replace(/\D/g, ""), 10) || 0;
const fund = t => FUNDS.find(f => f.ticker === t);

// ---------- Měření ----------
// Umami, tracking plán v docs/mereni.md. Nikdy neposílat e-mail ani jiné osobní údaje.
const AD = document.documentElement.dataset.ad;
function track(name, data = {}) {
  const payload = { ad: AD, ...data };
  if (window.__trackDebug) window.__trackDebug.push([name, payload]); // jen pro lokální testy
  if (window.umami) window.umami.track(name, payload);
  else if (Array.isArray(window.__trackQueue)) window.__trackQueue.push([name, payload]);
}
const sent = new Set();
function trackOnce(name, data) {
  if (sent.has(name)) return;
  sent.add(name);
  track(name, data);
}
// Event jednou za návštěvu, když je prvek z poloviny vidět
function trackWhenSeen(el, name, data) {
  new IntersectionObserver((entries, obs) => {
    if (entries.some(e => e.isIntersecting)) { trackOnce(name, data); obs.disconnect(); }
  }, { threshold: 0.5 }).observe(el);
}

// Evropské fondy na S&P 500 (UCITS ekvivalenty), v abecedním pořadí, žádný není výchozí
const EU = FUNDS.filter(f => f.type === "UCITS" && f.index.startsWith("S&P 500"))
  .sort((a, b) => a.ticker.localeCompare(b.ticker));
const euTer = [Math.min(...EU.map(f => f.ter)), Math.max(...EU.map(f => f.ter))];
const VOO = fund("VOO");
const AVG = ESMA.avg_fund;

// ---------- Kalkulačka ----------

const monthlyEl = $("#monthly");
const yearsEl = $("#years");

// 1 rok, 2 až 4 roky, 5 a víc let
const yearWord = n => (n === 1 ? "rok" : n >= 2 && n <= 4 ? "roky" : "let");

function readInputs() {
  return {
    monthly: Math.min(digits(monthlyEl.value), 1000000),
    years: Math.min(Math.max(digits(yearsEl.value), 1), 50)
  };
}

function renderCalc() {
  const { monthly, years } = readInputs();
  const voo = feeCost(monthly, years, VOO.ter);
  const euMin = feeCost(monthly, years, euTer[0]);
  const euMax = feeCost(monthly, years, euTer[1]);
  const avg = feeCost(monthly, years, AVG.ter);

  $('[data-out="voo"]').textContent = kc(voo);
  $('[data-out="eu"]').textContent = euMin === euMax ? kc(euMin) : fmt(euMin) + " až " + kc(euMax);
  $('[data-out="avg"]').textContent = kc(avg);

  const width = n => (avg > 0 ? (n / avg) * 100 : 0).toFixed(2) + "%";
  $('[data-bar="voo"]').style.width = width(voo);
  $('[data-bar="eu"]').style.width = width(euMax);
  $('[data-bar="avg"]').style.width = width(avg);

  $("#kalk-title").textContent = `Kolik vás za ${years} ${yearWord(years)} stojí samotný fond?`;
  $("#years-unit").textContent = yearWord(digits(yearsEl.value) || years);
}

monthlyEl.addEventListener("input", renderCalc);
yearsEl.addEventListener("input", renderCalc);
monthlyEl.addEventListener("input", () => trackOnce("calc_change", { field: "monthly" }));
yearsEl.addEventListener("input", () => trackOnce("calc_change", { field: "years" }));
monthlyEl.addEventListener("blur", () => { monthlyEl.value = fmt(readInputs().monthly); });
yearsEl.addEventListener("blur", () => { yearsEl.value = readInputs().years; renderCalc(); });
// Při kliknutí do pole označit celé číslo, aby šlo rovnou přepsat
[monthlyEl, yearsEl].forEach(el => el.addEventListener("focus", () => el.select()));

// TER v popiscích z dat (výchozí text v HTML je stejný, kontroluje ho npm run check)
$('[data-ter="voo"]').textContent = pct(VOO.ter);
$('[data-ter="eu"]').textContent = pct(euTer[0]).replace("\u00a0%", "") + " až " + pct(euTer[1]);
$('[data-ter="avg"]').textContent = pct(AVG.ter);
renderCalc();

// ---------- Srovnání US fond vs. evropské fondy ----------

const mld = usd => fmt(usd / 1e9) + " mld. USD";
const classNote = f => (f.assetsLevel === "fond" ? "" : "<small>jen třída ETF</small>");
const brokersLine = BROKERS.filter(b => b.verified).map(b => b.broker.split(" ")[0] + " " + b.usEtf).join(", ");
const euSize = [Math.min(...EU.map(f => f.assetsUsd)), Math.max(...EU.map(f => f.assetsUsd))];

function renderFund(ticker) {
  const f = fund(ticker);
  $('[data-f="ticker"]').textContent = f.ticker;
  $('[data-f="ter"]').textContent = pct(f.ter);
  $('[data-f="size"]').innerHTML = mld(f.assetsUsd) + classNote(f);
  document.querySelectorAll("[data-fund]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.fund === ticker)));
}

document.querySelectorAll("[data-fund]").forEach(btn =>
  btn.addEventListener("click", () => {
    renderFund(btn.dataset.fund);
    track("fund_switch", { fund: btn.dataset.fund });
  }));

$('[data-f="eu-ter"]').textContent = pct(euTer[0]).replace("\u00a0%", "") + " až " + pct(euTer[1]);
$('[data-f="eu-size"]').innerHTML = fmt(euSize[0] / 1e9) + " až " + mld(euSize[1]) + "<small>jen třídy Acc</small>";
$('[data-f="brokers"]').textContent = brokersLine;
renderFund("VOO");

// ---------- Lišta s výzvou ----------

const bar = $("#bar");
const reward = $("#odmena");
let leadDone = false;

// Lišta zmizí, když je vidět sekce s formulářem (nepřekrývá ho), a po odeslání úplně
new IntersectionObserver(([entry]) => {
  bar.classList.toggle("off", leadDone || entry.isIntersecting);
}, { threshold: 0.15 }).observe(reward);

function goToForm(event) {
  event.preventDefault();
  track("cta_click", { where: event.currentTarget.dataset.cta });
  // Celý formulář dole na obrazovce, nad ním spodek náhledu PDF. Bez automatického fokusu:
  // klávesnice by na mobilu zakryla náhled a na iOS se po zpoždění stejně spolehlivě neotevře.
  const target = leadDone ? $("#done") : $("#lead");
  target.scrollIntoView({ block: "end", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
document.querySelectorAll('[data-cta]').forEach(a => a.addEventListener("click", goToForm));

// Dočtení druhé sekce (první je vidět hned po načtení, event by předběhl zobrazení stránky)
if (AD === "b") trackWhenSeen($("#kalkulacka"), "second_section_view", { section: "kalkulacka" });
else trackWhenSeen($("#srovnani"), "second_section_view", { section: "srovnani" });
document.querySelectorAll("details[data-topic]").forEach(d => d.addEventListener("toggle", () => {
  if (d.open) track("details_open", { topic: d.dataset.topic });
}));

// ---------- Formulář ----------

const form = $("#lead");
const emailEl = $("#email");
const consentEl = $("#consent");
const submitEl = form.querySelector(".submit");
const errors = { email: $("#email-error"), consent: $("#consent-error"), form: $("#form-error") };

trackWhenSeen(form, "form_view");
emailEl.addEventListener("focus", () => trackOnce("form_start"));
$("[data-pdf]").addEventListener("click", () => track("pdf_open"));

function utm() {
  const p = new URLSearchParams(location.search);
  return Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content"]
    .map(k => [k, (p.get(k) || "").slice(0, 100)]));
}

function validate() {
  errors.email.textContent = "";
  errors.consent.textContent = "";
  let ok = true;
  if (!emailEl.value.trim()) { errors.email.textContent = "Vyplňte e-mail."; ok = false; }
  else if (!emailEl.checkValidity()) { errors.email.textContent = "Zkontrolujte e-mail, chybí v něm něco."; ok = false; }
  if (!consentEl.checked) { errors.consent.textContent = "Bez souhlasu vám PDF neumíme dát. Odhlásit se můžete kdykoli."; ok = false; }
  emailEl.setAttribute("aria-invalid", String(!!errors.email.textContent));
  return ok;
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  errors.form.textContent = "";
  if (!validate()) {
    const reasons = [];
    if (errors.email.textContent) reasons.push(emailEl.value.trim() ? "email_invalid" : "email_empty");
    if (errors.consent.textContent) reasons.push("consent");
    track("form_error", { reason: reasons.join("+") });
    (errors.email.textContent ? emailEl : consentEl).focus();
    return;
  }
  submitEl.disabled = true;
  submitEl.textContent = "Ukládám…";
  const { monthly, years } = readInputs();
  track("form_submit", { monthly, years });
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailEl.value.trim(),
        consent: consentEl.checked,
        consentText: $("#consent-text").textContent.trim(),
        web: form.elements.web.value,
        ad: document.documentElement.dataset.ad,
        monthly,
        years,
        ...utm()
      })
    });
    if (!res.ok) throw new Error(String(res.status));
    track("lead_saved", { monthly, years });
    leadDone = true;
    bar.classList.add("off");
    form.hidden = true;
    const done = $("#done");
    done.hidden = false;
    done.focus();
  } catch (err) {
    track("lead_error", { status: String(err.message).slice(0, 20) });
    errors.form.textContent = "Uložení se nepovedlo. Zkuste to prosím znovu.";
    submitEl.disabled = false;
    submitEl.textContent = "Stáhnout PDF";
  }
});
