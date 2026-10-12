// POST /api/lead: uloží kontakt z formuláře do Neonu (tabulka leads, db/schema.sql).
// Odpověď { ok: true } znamená uloženo, prohlížeč pak nabídne PDF.
import { neon } from "@neondatabase/serverless";

const MAX_BODY = 4096;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  // Vercel tělo JSON požadavku už rozparsuje, lokální server ne
  if (req.body !== undefined) return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY) throw new Error("too large");
  }
  return JSON.parse(raw || "{}");
}

const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : null);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { ok: false, error: "method" });
  }
  if (!String(req.headers["content-type"] || "").startsWith("application/json")) {
    return send(res, 415, { ok: false, error: "content-type" });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return send(res, 400, { ok: false, error: "body" });
  }
  if (!body || typeof body !== "object") return send(res, 400, { ok: false, error: "body" });

  // Skryté pole vyplní jen robot: odpovíme jako by se uložilo, ale neuložíme nic
  if (text(body.web, 200)) return send(res, 200, { ok: true });

  const email = text(body.email, 254).toLowerCase();
  if (!EMAIL.test(email)) return send(res, 400, { ok: false, error: "email" });
  // Souhlas je povinný (docs/strategie.md, Rozhodnutí 2)
  const consentText = text(body.consentText, 600);
  if (body.consent !== true || !consentText.startsWith("Souhlasím")) {
    return send(res, 400, { ok: false, error: "consent" });
  }

  const ad = body.ad === "b" ? "b" : "a";
  const monthly = int(body.monthly, 0, 1000000);
  const years = int(body.years, 1, 50);
  const utm = Object.fromEntries(UTM.map(k => [k, text(body[k], 100) || null]));

  try {
    const sql = neon(process.env.DATABASE_URL);
    // Opakované odeslání: obnovit souhlas, utm_* nechat z prvního dotyku
    await sql`
      insert into leads (email, consent, consent_text, ad, monthly, years,
                         utm_source, utm_medium, utm_campaign, utm_content)
      values (${email}, true, ${consentText}, ${ad}, ${monthly}, ${years},
              ${utm.utm_source}, ${utm.utm_medium}, ${utm.utm_campaign}, ${utm.utm_content})
      on conflict (email) do update set
        consent = true,
        consent_text = excluded.consent_text,
        consent_at = now(),
        submissions = leads.submissions + 1,
        ad = excluded.ad,
        monthly = excluded.monthly,
        years = excluded.years`;
  } catch (err) {
    // Do logu nikdy e-mail ani připojovací řetězec, jen typ chyby
    console.error("lead insert failed:", err?.code || err?.name || "unknown");
    return send(res, 500, { ok: false, error: "db" });
  }

  return send(res, 200, { ok: true });
}
