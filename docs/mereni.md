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
| `second_section_view` | druhá sekce je z poloviny vidět (jednou) | `section` | kolik lidí doroluje za první obrazovku |
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

Každý funnel zvlášť pro tag `ad-a` a `ad-b`. **Neověřeno:** zda jde funnel v Umami filtrovat podle tagu. Ověří se při nastavení ve fázi 3; když ne, rozdělí se podle vlastnosti `ad` v přehledu eventů.

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
- Lišta posouvala na začátek sekce s odměnou a dávala fokus do pole e-mailu bez posunu. Od přidání náhledu PDF (krok 4) bylo pole mimo obrazovku a `form_view` přišel až po `form_start`. Lišta teď posune tak, aby byl vidět celý formulář a nad ním spodek náhledu, bez automatického fokusu.
- Při ladění testu odešlo do skutečného Umami **jedno zobrazení stránky z hostitele `etf.test`** (12. 10. 2026 kolem 23:05), než test zachytával správnou adresu `gateway.umami.is`. Při vyhodnocení ho vyfiltrovat podle hostitele. Na produkci se omezí atributem `data-domains` na produkční doménu (fáze 3, po nasazení).

## Kontrola funnelu na produkci (fáze 3)

Doplní se: proklikání na skutečném telefonu z odkazů reklamy A i B, kontrola eventů v Umami, kontrola řádku v Neonu, smazání testovacích kontaktů.
