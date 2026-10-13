# Kontrola rychlosti a přístupnosti

Stav: 13. 10. 2026, fáze 3. Měřeno proti produkci https://etf-landing-sigma.vercel.app/ pro reklamu A (`utm_content=a_naklady`) i B (`utm_content=b_srovnani`). Požadavky do Umami byly při všech testech zablokované, do statistik nic neodešlo. Odeslání formuláře v testech mělo podvrženou odpověď `/api/lead`, do databáze nic nešlo.

## Nástroje

| Nástroj | Verze | Nastavení |
|---|---|---|
| Lighthouse | 12.8.2 | mobil: výchozí simulace (RTT 150 ms, 1,6 Mb/s, CPU 4× zpomalené); desktop: `--preset=desktop`. Každá kombinace 3 běhy, `--blocked-url-patterns='*umami.is*'`. |
| axe-core | 4.14.0 (přes `@axe-core/puppeteer`) | pravidla WCAG 2.0, 2.1 a 2.2 úrovně A a AA a best practices; 375 × 667 a 1440 × 900; stavy: načteno s rozbalenou metodikou, chyby formuláře, po odeslání |
| Vlastní skript (puppeteer) | | průchod tabulátorem, zalomení na 320 px, fokus na liště |

Nástroje běžely jen dočasně mimo repozitář, projekt nemá žádnou novou závislost.

## Lighthouse

Rozsah ze 3 běhů. Skóre: výkon / přístupnost / best practices / SEO.

| | Před opravami | Po opravách |
|---|---|---|
| A mobil | 100 / 100 / 100 / 100, LCP 1,5 až 1,6 s, CLS do 0,014 | 99 až 100 / 100 / 100 / 100, LCP 1,5 až 1,8 s, CLS do 0,014 |
| B mobil | 96 až 100 / 100 / 100 / 92 až 100, LCP 1,5 až 2,4 s | 100 / 100 / 100 / 100, LCP 1,5 až 1,6 s, CLS 0 |
| A desktop | 99 až 100 / 100 / 100 / 100, LCP 0,4 až 0,5 s | 100 / 100 / 100 / 100, LCP 0,4 až 0,5 s |
| B desktop | 100 / 100 / 100 / 100, LCP 0,5 s | 100 / 100 / 100 / 100, LCP 0,4 až 0,5 s |
| Přenesená data | 209 kB | 134 kB |
| TBT (blokování hlavního vlákna) | 0 ms | 0 ms |

Rozptyl mezi běhy (např. B mobil 96 a LCP 2,4 s v jednom běhu) dělá síť, ne stránka: stejná stránka měla v dalších bězích 100 a 1,5 s. Největší prvek (LCP) je nadpis první sekce, ne obrázek.

**Pozor:** Lighthouse simuluje pomalý telefon, ale není to skutečný iPhone s mobilními daty ani prohlížeč v Instagramu. Ten má vlastní načítání a ubírá výšku obrazovky.

## Nálezy a opravy

| # | Nález | Zdroj | Závažnost | Oprava |
|---|---|---|---|---|
| 1 | Lišta s výzvou mimo orientační oblasti stránky (`region`) | axe, všech 12 stavů | střední | lišta je `<aside aria-label="Stažení PDF">` |
| 2 | Skrytá lišta (u formuláře, po odeslání) zůstala v pořadí fokusu: tabulátor skočil na neviditelný odkaz "Chci PDF" mimo obrazovku | průchod tabulátorem | vysoká pro klávesnici (WCAG 2.4.3, 2.4.7) | skrytá lišta má po dojetí `visibility: hidden`, takže ji fokus ani čtečka obrazovky nenajde |
| 3 | U reklamy B je srovnání vidět nahoře, ale v kódu bylo až za kalkulačkou. Tabulátor i čtečka šly nejdřív do kalkulačky. | průchod tabulátorem | střední (WCAG 1.3.2, 2.4.3) | skript u B přesune srovnání i v DOM. CSS `order` zůstává, aby stránka neproblikla před načtením skriptu. |
| 4 | Náhled PDF v PNG 154 kB | Lighthouse | nízká (načítá se líně, pod ohybem) | WebP 79 kB, PNG zůstává pro prohlížeče bez WebP; obojí generuje `npm run pdf` |
| 5 | Řetězení skriptů: `app.js` načítá `data.js` a `calc.js` až po sobě | Lighthouse | nízká | `modulepreload` pro oba moduly |
| 6 | Chybí `robots.txt` (SEO 92 v jednom běhu) | Lighthouse | nízká | `public/robots.txt` povoluje vše |

Žádná oprava nemění vzhled ani texty. Screenshoty 375 × 667 (A, B, konec stránky po odeslání) a 1440 × 900 (A, B) jsou před a po opravách pixelově shodné.

Po opravách: axe 0 porušení ve všech 12 stavech (45 až 46 pravidel prošlo, nic k ruční kontrole).

## Ruční kontrola

| Co | Výsledek |
|---|---|
| Průchod tabulátorem, A i B, 375 a 1440 px | pořadí odpovídá obrazovce; každý prvek má viditelný fokus (černý obrys a žlutý lem, u polí žlutý lem rámečku); žádný prvek s fokusem není schovaný pod lištou |
| Po odeslání | fokus jde na potvrzení "Hotovo, PDF je vaše."; další tabulátor na "Otevřít PDF"; skrytá lišta se přeskočí |
| Chyby formuláře | hlášky jsou v `aria-live`, fokus jde do prvního chybného pole, e-mail má `aria-invalid` |
| Fokus na liště (černé pozadí) | černý obrys na černé splyne, žlutý lem kolem žlutého tlačítka je vidět. Vyhovuje, viz návrh níže. |
| Zalomení na 320 px (WCAG 1.4.10) | A i B bez vodorovného posuvníku, nic nepřetéká |
| Zvětšení 200 % (WCAG 1.4.4) | zoom prohlížeče na 1440 px dává 720 px, tedy mobilní kolonku, ověřenou na 768 a 375 px |
| Kontrast | barvy se nezměnily, poměry v [vizualni-styl.md](vizualni-styl.md), sekce 3; axe `color-contrast` prošlo |
| Dotykové plochy | tlačítka 44 až 56 px, zaškrtávací pole 24 px s klikatelným textem (WCAG 2.5.8) |

## Vědomě neřešeno

- **CLS do 0,014** při výměně písma (záložní písmo → Archivo). Hranice "dobré" je 0,1. Oprava by vyžadovala ladit metriky záložního písma, přínos je zanedbatelný.
- **Náhled ve 2× rozlišení i pro obrazovky 1×** (Lighthouse "responsive images", asi 40 kB navíc jen na desktopech s 1× obrazovkou). Obrázek se načítá líně až pod ohybem a telefony mají 2× až 3×.
- **Netestováno:** VoiceOver na iPhonu a rychlost na skutečných mobilních datech. Patří do kontroly funnelu na telefonu (krok 4 fáze 3).

## Návrh ke schválení (mění vzhled)

- **Fokus na tmavém pozadí bílým obrysem** (lišta, odkazy v patičce): dnes je vidět jen žlutý lem, černý obrys na černé splývá. Změna by byla vidět jen při ovládání klávesnicí. Nutné to není, požadavky WCAG AA už teď splňujeme.
