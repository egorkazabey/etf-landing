# Měření (tracking plán)

Stav: implementováno 12. 10. 2026 (fáze 2, krok 5). Nastavení funnelů v Umami a kontrola na produkci jsou ve fázi 3 (záznam kontroly na konci tohoto dokumentu).

## Nástroj

**Umami Cloud, tarif Hobby** (výběr a zdroje viz [vizualni-styl.md](vizualni-styl.md), Stack). Bez cookies, proto stránka nemá cookie lištu. Website ID je ve zdrojovém kódu stránky, není tajné (vidí ho každý návštěvník).

| Co | Jak |
|---|---|
| Načtení | Inline skript v `<head>` ([public/index.html](../public/index.html)) vloží `https://cloud.umami.is/script.js`. Data odcházejí na `gateway.umami.is/api/send` (zjištěno při testu, viz níže). |
| Reklama A / B | Atribut `data-tag` = `ad-a` nebo `ad-b` podle `utm_content` (`b_srovnani` = B, cokoli jiného = A). Tag nese zobrazení stránky i všechny eventy. Navíc má každý event vlastnost `ad`. |
| UTM | Umami ukládá adresu včetně `utm_*` u zobrazení stránky. Přehled UTM v Umami rozkládá všech 5 standardních parametrů. |
| Lokální vývoj | Na `localhost` a `127.0.0.1` se skript nenačte. |
| Jen produkce | `data-domains="etf-landing-sigma.vercel.app"`: skript měří jen produkční doménu, náhledová nasazení Vercelu a testy ne (doplněno 12. 10. 2026 po nasazení). |
| Fronta | Eventy, které vzniknou před načtením skriptu, čekají ve `window.__trackQueue` a odešlou se po načtení. |
| Vlastní návštěvy | Skript Umami kontroluje v `localStorage` klíč `umami.disabled` (ověřeno v kódu skriptu 12. 10. 2026). Na vlastním telefonu: `localStorage.setItem("umami.disabled", 1)` v konzoli, nebo měřit testovací návštěvy přes UTM `utm_source=test`. |

**Nikdy neposíláme osobní údaje.** Do Umami nejde e-mail ani text z formuláře. Z kalkulačky jen částka a počet let (čísla, ne osobní údaj). Ověřeno testem (viz níže).

## Eventy

Všechny eventy mají vlastnost `ad` (`a` / `b`). Názvy do 50 znaků (limit Umami, [docs.umami.is/docs/track-events](https://docs.umami.is/docs/track-events)).

| Event | Kdy | Data | K čemu |
|---|---|---|---|
| (zobrazení stránky) | automaticky při načtení | adresa s `utm_*`, tag | vstup do funnelu, počet návštěvníků |
| `fund_switch` | klepnutí na VOO / SPY / IVV | `fund` | zájem o srovnání (prvek B) |
| `calc_change` | první změna částky nebo počtu let (jednou za návštěvu) | `field` | zájem o kalkulačku (prvek A) |
| `second_section_view` | druhá sekce je z poloviny vidět (jednou) | `section` | kolik lidí doroluje za první obrazovku. Pozor: započítá se i průjezd sekcí po klepnutí na lištu, při vyhodnocení brát spolu s `cta_click`. |
| `cta_click` | klepnutí na lištu "Chci PDF" | `where: bar` | síla výzvy, hypotéza "lišta hned vs. po interakci" |
| `form_view` | formulář je z poloviny vidět (jednou) | | kolik lidí formulář vůbec vidí |
| `form_start` | první klepnutí do pole e-mailu (jednou) | | zájem o odměnu |
| `form_error` | odeslání neprojde kontrolou v prohlížeči | `reason`: `email_empty`, `email_invalid`, `consent`, kombinace přes `+` | kde formulář brzdí, hlavně povinný souhlas |
| `form_submit` | odeslání prošlo kontrolou v prohlížeči | `monthly`, `years` | |
| `lead_saved` | server odpověděl, že kontakt uložil | `monthly`, `years` | **konverze** |
| `lead_error` | uložení selhalo | `status` (HTTP kód nebo chyba sítě) | technické problémy |
| `pdf_open` | klepnutí na "Otevřít PDF" | | doručení odměny |
| `details_open` | rozbalení sekce s metodikou | `topic`: `vypocet`, `zdroje`, `nyse` | kdo ověřuje čísla |

## Funnely (nastavit v Umami ve fázi 3)

Umami funnel: kroky jsou adresa nebo event, musí jít v pořadí, mezi nimi může být cokoli jiného, okno = nejdelší dovolená pauza mezi kroky v minutách ([docs.umami.is/docs/funnel](https://docs.umami.is/docs/funnel)).

| Funnel | Kroky | Okno |
|---|---|---|
| **Celá cesta** | `/` → `form_view` → `form_start` → `lead_saved` → `pdf_open` | 60 min |
| **Kalkulačka** | `/` → `calc_change` → `form_view` → `lead_saved` | 60 min |
| **Srovnání** | `/` → `fund_switch` → `form_view` → `lead_saved` | 60 min |
| **Lišta** | `/` → `cta_click` → `form_start` → `lead_saved` | 60 min |

### Návod na nastavení v Umami Cloud

Podle dokumentace Umami, ověřeno 13. 10. 2026 ([Funnel](https://docs.umami.is/docs/funnel), [Filters](https://docs.umami.is/docs/filters), [Tags](https://docs.umami.is/docs/tags)). Nastavuje uživatel, agent se do Umami nepřihlašuje.

1. Umami Cloud → web *etf-landing-sigma.vercel.app* → sekce **Analysis** → **Funnel** → **Add funnel**.
2. Název podle tabulky výše, **Window** 60 (minut mezi dvěma po sobě jdoucími kroky).
3. Kroky přidávat tlačítkem **Add** v pořadí z tabulky:
   - první krok typu **Viewed page**, hodnota `/` (adresa bez `utm_*`; Umami ukládá cestu a query zvlášť, viz Filters: "Path, Query"),
   - ostatní kroky typu **Triggered event**, hodnota přesně podle názvu eventu (např. `form_view`).
4. **Save** a spustit. Totéž pro všechny 4 funnely.
5. **Rozdělení na A a B:** filtr **Tag** je `ad-a`, pak `ad-b`. Filtr nastavený na přehledu webu podle dokumentace platí "to all screens and reports"; mezi filtry je v sekci Other i "Tag".
6. **Bez testovacích návštěv:** filtr **UTM Source** je *Is not* `test` a **Hostname** je `etf-landing-sigma.vercel.app` (vyřadí i jedno zobrazení z `etf.test` z 12. 10. 2026).

**Ověří se v rozhraní** (dokumentace funnelu filtry výslovně nezmiňuje):
- jestli se filtr Tag a UTM Source opravdu použije i na funnel. Kontrola: funnel s filtrem `ad-a` a s filtrem `ad-b` musí dát v prvním kroku různé počty, dohromady zhruba počet bez filtru,
- jestli krok `/` zachytí i návštěvy s `?utm_...` v adrese.

**Záloha, když funnel filtr nepřevezme:** rozdělení A a B podle vlastnosti `ad` u eventů (stránka Events, filtr Event properties), konverze = `lead_saved` s `ad=a` / `ad=b` vůči zobrazením s tagem `ad-a` / `ad-b` na přehledu.

## Ukazatele

| Ukazatel | Výpočet | Zdroj |
|---|---|---|
| **Konverze** (hlavní) | `lead_saved` / návštěvníci, zvlášť pro `ad-a` a `ad-b` | Umami |
| Počet kontaktů (kontrolní) | řádky v tabulce `leads` podle `utm_content` a `ad` | Neon |
| Dosah výzvy | `form_view` / návštěvníci | Umami |
| Tření formuláře | `form_error` / (`form_submit` + `form_error`), rozpad podle `reason` | Umami |
| Doručení odměny | `pdf_open` / `lead_saved` | Umami |

Počet kontaktů bereme z databáze, ne z Umami: část návštěvníků může měření blokovat (např. blokátorem reklam), uložení do databáze ne. Rozdíl mezi `lead_saved` a řádky v databázi ukáže, kolik měření chybí.

## Ověření (12. 10. 2026, lokálně)

Automatický test v headless Chrome (puppeteer), stránka na testovací doméně `etf.test` namapované na lokální server, aby se skript Umami načetl jako na produkci. Všechny požadavky na `*.umami.is/api/send` test zachytil a neposlal dál.

Průchod: reklama B → přepnutí SPY a IVV → kalkulačka, změna částky → lišta → prázdné odeslání → e-mail a souhlas → odeslání → Otevřít PDF → rozbalení "Odkud jsou čísla".

Výsledek: 13 záznamů v tomto pořadí: zobrazení stránky, `fund_switch` (SPY), `fund_switch` (IVV), `second_section_view` (kalkulacka), `calc_change` (monthly), `cta_click` (bar), `form_view`, `form_error` (`email_empty+consent`), `form_start`, `form_submit`, `lead_saved`, `pdf_open`, `details_open` (zdroje). Všechny s tagem `ad-b` a adresou s `utm_*`. E-mail v datech pro Umami není.

Co test odhalil a co se opravilo:
- Event pro první sekci (vidět hned po načtení) odešel dřív než zobrazení stránky. Funnel vyžaduje pořadí, proto se měří jen dočtení druhé sekce.
- Lišta posouvala na začátek sekce s odměnou a dávala fokus do pole e-mailu bez posunu. Od přidání náhledu PDF (krok 4) bylo pole mimo obrazovku a `form_view` přišel až po `form_start`. Lišta teď posune tak, aby byl vidět celý formulář a nad ním spodek náhledu, bez automatického fokusu. Na desktopu (13. 10. 2026), kde se celá sekce vejde do okna, posune na začátek sekce: formulář vedle celého náhledu. Pořadí `cta_click`, `form_view`, `form_start` ověřeno na 1440 × 900 pro A i B.
- Při ladění testu odešlo do skutečného Umami **jedno zobrazení stránky z hostitele `etf.test`** (12. 10. 2026 kolem 23:05), než test zachytával správnou adresu `gateway.umami.is`. Při vyhodnocení ho vyfiltrovat podle hostitele. Od nasazení je měření omezené atributem `data-domains` na produkční doménu.

## Ověření na produkci (12. 10. 2026, automaticky)

Produkční URL: **https://etf-landing-sigma.vercel.app/** (Vercel, napojeno na GitHub, každý push na `main` se nasadí sám, nasazení trvalo asi 30 s).

Headless Chrome 375 × 667 přímo proti produkci, požadavky do Umami opět zachycené (do statistik nic neodešlo):
- reklama A (`utm_content=a_naklady`): nahoře kalkulačka, nadpis "Kolik vás za 20 let stojí samotný fond?", načtení 0,9 až 1,4 s (headless, bez omezení sítě, není to měření pro mobil),
- reklama B (`utm_content=b_srovnani`): nahoře srovnání, nadpis "VOO vedle evropského fondu na stejný index",
- B: přepnutí SPY → lišta → e-mail a souhlas → odeslání: potvrzení zobrazeno, kontakt v Neonu uložen s `ad=b`, `utm_source=meta`, `utm_content=b_srovnani`,
- odkaz na PDF: 200, `application/pdf`, 103 189 B,
- Umami: 9 záznamů (zobrazení `ad-a`, zobrazení `ad-b`, `fund_switch`, `cta_click`, `second_section_view`, `form_view`, `form_start`, `form_submit`, `lead_saved`), hostitel `etf-landing-sigma.vercel.app`, e-mail v datech není,
- testovací kontakt z databáze smazán, tabulka `leads` je prázdná.

## Kontrola funnelu na produkci (fáze 3)

Postup schválený 13. 10. 2026. Testuje uživatel na iPhonu, výsledek zapíše agent (sekce Výsledek níže). Testovací kontakty s `utm_source=test` agent po testu smaže (potvrzeno předem).

### Odkazy

Stejné jako v reklamě, jen `utm_source=test`, aby šly testovací návštěvy vyfiltrovat v Umami i v databázi.

- A: `https://etf-landing-sigma.vercel.app/?utm_source=test&utm_medium=paid_social&utm_campaign=etf_srovnani&utm_content=a_naklady`
- B: `https://etf-landing-sigma.vercel.app/?utm_source=test&utm_medium=paid_social&utm_campaign=etf_srovnani&utm_content=b_srovnani`

**Prohlížeč v Instagramu:** odkaz poslat sám sobě v Instagram DM (nebo z druhého účtu) a otevřít z konverzace, otevře se ve vestavěném prohlížeči.

**E-maily:** pro každý průchod jiná adresa (např. `vase.jmeno+etf-a-safari@...`, `+etf-b-instagram`). Databáze má e-mail unikátní: druhé odeslání stejné adresy jen zvýší počítadlo a ponechá `ad` a `utm_*` z prvního odeslání.

### Průchody

| # | Prohlížeč | Odkaz |
|---|---|---|
| 1 | Safari | A |
| 2 | Safari | B |
| 3 | Instagram | A |
| 4 | Instagram | B |

### Co ověřit v každém průchodu

1. **První obrazovka** (screenshot hned po načtení): nadpis a výsledek kalkulačky (A) nebo srovnání s podnadpisem a poznámkou (B) jsou nad lištou. Ze screenshotu z Instagramu zjistíme, kolik výšky ubere jeho prohlížeč.
2. **Rychlost:** na mobilních datech (vypnutá Wi-Fi) je obsah vidět do zhruba 2 s. Stačí pocit, případně stopky.
3. **Prvek:** A: změnit částku nebo roky, čísla i nadpis se přepočítají. B: přepnout SPY a IVV.
4. **Lišta:** klepnout "Chci PDF", stránka sjede k formuláři, lišta zmizí.
5. **Chyby:** odeslat prázdný formulář: obě hlášky (e-mail, souhlas), bez přiblížení stránky při klepnutí do pole.
6. **Odeslání:** e-mail podle pravidla výše a souhlas, "Stáhnout PDF": potvrzení "Hotovo, PDF je vaše."
7. **PDF:** "Otevřít PDF" otevře 6 stran, čitelné bez zoomování.
8. **Konec stránky:** dojet až dolů, pod černou patičkou není bílý pruh (ani při přetažení).
9. **Jen v průchodu 2, VoiceOver** (Nastavení → Zpřístupnění → VoiceOver, nebo trojklik bočního tlačítka, pokud je nastavený): rotor Nadpisy přečte nadpisy sekcí; pole přečte "Váš e-mail"; po prázdném odeslání přečte chybu; lišta se ohlásí jako "Stažení PDF".

Zapsat: číslo průchodu, co neprošlo, screenshot první obrazovky. Čas testu (stačí přibližně) pomůže najít návštěvy v Umami.

### Co pak zkontroluje agent

- **Umami** (screenshot nebo export od uživatele, filtr UTM Source = `test`): 4 návštěvy, u každé eventy v pořadí zobrazení → (`calc_change` / `fund_switch`) → `cta_click` → `form_view` → `form_error` → `form_start` → `form_submit` → `lead_saved` → `pdf_open`; správný tag `ad-a` / `ad-b`; žádný e-mail v datech.
- **Neon:** skript spočítá řádky s `utm_source = 'test'` podle `ad` a `utm_content` (očekáváno 2× `a`, 2× `b`). `DATABASE_URL` čte jen z prostředí, nic tajného nevypisuje, e-maily nevypisuje.
- **Úklid:** smazání řádků s `utm_source = 'test'` a kontrola, že žádný jiný řádek nezmizel (počet před a po).

### Výsledek (13. 10. 2026)

**Telefon (uživatel, iPhone, 4 průchody: Safari A a B, prohlížeč Instagramu A a B):**

| Bod | Výsledek |
|---|---|
| První obrazovka | A i B nad lištou i v prohlížeči Instagramu; jeho horní lišta ubere místo, výsledek kalkulačky je pořád vidět |
| Kalkulačka, přepínač VOO / SPY / IVV, lišta | funguje |
| Chybové hlášky, odeslání, "Hotovo" | funguje |
| PDF | otevře se v Safari i v prohlížeči Instagramu, všech 6 stran jde listovat |
| Konec stránky | pod patičkou už není bílý pruh (oprava z 13. 10. 2026) |
| VoiceOver | prošel bez problémů |
| Nalezená chyba | v PDF na straně 4 citace DEGIRO jen anglicky ("can generally not offer"); opraveno na český překlad s originálem v závorce, PDF přegenerováno |

**Umami (uživatel):** dorazilo všech 11 typů eventů, které měl test vyvolat, včetně `form_error`, `lead_saved` a `pdf_open`. Dvanáctý event z plánu, `lead_error`, při testu nevznikl, protože žádné uložení neselhalo.

**Neon (agent, `npm run test-leads`):** výsledek neodpovídá očekávání (4 řádky s `utm_source=test`).
- Řádků s `utm_source=test`: **0**, smazáno nic.
- Tabulka má 1 řádek (id 17): vznikl 13. 10. 2026 ve 21:02 bez `utm_*` (zřejmě dřívější test z adresy bez parametrů), teď má 3 odeslání, poslední ve 22:17.
- Vysvětlení: testovací odeslání použila stejný e-mail jako tento řádek. E-mail je v tabulce unikátní, opakované odeslání jen zvýší `submissions` a přepíše `ad` a kalkulačku, `utm_*` zůstává z prvního odeslání. Proto řádek nemá `utm_source=test` a průchody se v databázi nedají rozlišit.
- Řádek 17 je testovací, ale pravidlo úklidu (`utm_source=test`) ho nezachytí; smaže se po potvrzení uživatele.

**Poučení pro vyhodnocení kampaně:** počet kontaktů z databáze je počet unikátních e-mailů, ne počet odeslání. Opakovaná odeslání jsou ve sloupci `submissions`. Atribuce k reklamě (`utm_*`) je podle prvního odeslání; `ad` podle posledního.
