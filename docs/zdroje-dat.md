# Zdroje dat a kontrola čísel

Data jsou ve třech souborech:
- [data/etf.csv](../data/etf.csv): fondy,
- [data/esma.csv](../data/esma.csv): průměrné náklady fondů v EU podle ESMA (dosud jen v tabulce níže, převedeno 12. 10. 2026 beze změny čísel),
- [data/brokeri.csv](../data/brokeri.csv): co který broker umožňuje s US ETF (dosud jen v [strategie.md](strategie.md), převedeno beze změny; sloupec `overeno` odlišuje ověřené z primárního zdroje).

Stránka čísla nepřepisuje ručně: `npm run build` z nich vygeneruje `public/data.js` a `npm run check` ověří, že je soubor aktuální a že vzorec kalkulačky (`public/calc.js`) dává stejné částky jako tabulka v sekci Výpočty.

Tento dokument popisuje, odkud čísla jsou, jak byla získána a kde je na stránce zdroje najdete při kontrole.

## Jak byla data získána

- Datum získání: **12. 10. 2026** (sloupec `ziskano`).
- Zdroj: výhradně oficiální stránka fondu u emitenta (iShares/BlackRock, Vanguard, State Street SSGA). Žádné agregátory (justETF, ETF.com, Morningstar) jako zdroj čísel.
- Postup: stránka stažena přes `curl`, převedena na text a hodnoty přepsal agent do CSV. U Vanguardu jsou data vložená ve stránce jako JSON (stejná čísla, jaká stránka zobrazuje v prohlížeči).
- Každá hodnota má vlastní datum "as of" podle zdroje. Emitenti uvádějí různá data pro různá pole (aktiva denně, výkonnost ke konci měsíce, počet pozic ke konci předchozího měsíce).

## Co znamenají sloupce

| Sloupec | Význam |
|---|---|
| `role` | **srovnávaný fond z NYSE Arca** (předmět srovnání podle zadání) nebo **UCITS ekvivalent, není na NYSE** (evropský fond se stejným nebo podobným indexem, jen pro srovnání) |
| `typ` | `US` = fond domicilovaný v USA. `UCITS` = evropský (irský) fond |
| `burza_primarni`, `burza_zdroj` | burza podle emitenta a přesné místo na stránce emitenta, kde je uvedená |
| `ter_pct` | roční nákladovost v % (expense ratio / TER / OCF podle terminologie emitenta). U SPY jde o "Gross Expense Ratio" |
| `ter_as_of` | datum, ke kterému emitent TER uvádí. "prospekt" = emitent uvádí "as stated in the prospectus" bez data |
| `aktiva_usd` | čistá aktiva v USD. **Pozor, nejsou srovnatelná 1:1:** iShares a SSGA u US fondů uvádějí celý fond, Vanguard uvádí zvlášť ETF třídu a celý fond (ten má i podílové třídy pro neETF investory). Úroveň je ve sloupci `aktiva_uroven` |
| `vynos_*_pct` | průměrná roční celková výkonnost (NAV, s reinvesticí výplat, po nákladech fondu) v USD, ke konci měsíce |
| `pocet_pozic` | počet držených cenných papírů |
| `zamereni` | krátký český popis, co fond sleduje (odvozený z indexu, přidáno 12. 10. 2026 pro PDF). Není to číslo ze zdroje. |
| `registrace_cz` | zda emitent uvádí Českou republiku mezi zeměmi registrace k nabízení |

## Kde hodnotu na stránce zdroje najdete

| Emitent | TER | Aktiva | Výkonnost | Počet pozic |
|---|---|---|---|---|
| iShares US (IVV, AGG) | hlavička "Expense Ratio" a sekce Fees | Key Facts, "Net Assets of Fund" | Performance, záložka "Average Annual", řádek "Total Return (%)" | Portfolio Characteristics, "Number of Holdings" |
| Vanguard US (VOO, VTI, VT, VYM) | Overview, "Expense ratio" | Portfolio, "Fund total net assets" / "Share class total net assets" | Price & Performance, "Average annual returns", měsíční, řádek fondu (NAV) | Portfolio, "Number of stocks" |
| SSGA US (SPY) | Key Features, "Gross Expense Ratio" | "Assets Under Management" | Fund Performance, Month End, řádek "NAV" | Fund Characteristics, "Number of Holdings" |
| iShares UCITS (CSPX) | Key Facts, "Total Expense Ratio" | Key Facts, "Net Assets" (třída) a "Net Assets of Fund" | v HTML jen kalendářní roky, průměrná výkonnost se načítá skriptem: nevyplněno | Portfolio Characteristics |
| Vanguard UCITS (VUAA, VWCE) | hlavička "OCF/TER" | Fund facts, "Share Class Assets" a "Total Assets" (bez data) | v HTML není: nevyplněno | "Number of stocks" |
| SSGA UCITS (SPYL) | "TER" | "Share Class Assets" a "Total Fund Assets" | Fund Performance, Annualised, Month End, "Fund Net" | Fund Characteristics |

## Výběr fondů (schváleno, zdůvodnění v [strategie.md](strategie.md), Rozhodnutí 4)

- **S&P 500 od tří emitentů (SPY, IVV, VOO):** stejný index, různé poplatky. Nejsilnější srovnání pro stránku: rozdíl v TER je vidět i ve výkonnosti za 10 let.
- **VTI, VT:** celý americký trh a celý svět, typická volba pasivního investora.
- **VYM:** dividendový fond. Původně zamýšlený SCHD (Schwab) vypadl, protože stránky Schwabu vracejí HTTP 403 a čísla nešla ověřit z primárního zdroje.
- **AGG:** dluhopisy, ukazuje, že ETF nejsou jen akcie.
- **QQQ vyřazen:** je kótovaný na Nasdaqu, ne na NYSE.
- **UCITS ekvivalenty (CSPX, VUAA, SPYL, VWCE):** fondy, které český drobný investor reálně koupí u většiny brokerů (viz [strategie.md](strategie.md), sekce Dostupnost). VWCE sleduje FTSE All-World, VT sleduje FTSE Global All Cap: podobné, ne totožné indexy.

## Známá omezení dat

- Všechny vybrané US fondy jsou kótované na **NYSE Arca** (burza skupiny NYSE pro ETF), ne na hlavním trhu NYSE. Ověřeno na stránkách emitentů.
- UCITS fondy nemají ve stažené stránce průměrnou roční výkonnost (načítá se skriptem). Výjimka je SPYL (jen 1 rok, fond existuje od 10/2023).
- `registrace_cz` u US fondů je NEOVĚŘENO: neověřoval jsem po jednotlivých fondech, že nejsou v ČR registrované.
- Výkonnost je v USD. Českého investora ovlivní i kurz USD/CZK, který tu není zahrnut.

## Srovnávací náklady mimo ETF (pro kalkulačku)

| Položka | Hodnota | Zdroj | Kde v dokumentu |
|---|---|---|---|
| Akciové UCITS fondy (bez ETF), EU27, retail, průběžné náklady | 1,38 % ročně | [ESMA, Costs and Performance of EU Retail Investment Products 2025](https://www.esma.europa.eu/sites/default/files/2026-03/ESMA50-1949966494-4065_Market_Report_-_Costs_and_Performance_of_EU_Retail_Investment_Products.pdf), publikováno 3. 3. 2026, období 2020 až 2024, 5letý horizont | strana 6, tabulka "Essential statistics - UCITS", sloupec Equity (Funds non-ETF), řádek "Ongoing charges" |
| Akciová ETF, EU27, průběžné náklady | 0,22 % ročně | tamtéž | tamtéž, sloupec ETFs Equity |

ESMA neuvádí hodnotu za ČR zvlášť.

## Výpočty

Model: měsíční vklad na začátku měsíce, náklad fondu strhávaný měsíčně jako `(1 - TER)^(1/12)`, výnos 0 %. "Náklady" = rozdíl mezi konečnou hodnotou bez nákladů a s náklady. Při 0 % výnosu je konečná hodnota bez nákladů rovna součtu vkladů (480 000 Kč).

2 000 Kč měsíčně, 20 let, 0 % výnos:

| Fond | TER | Náklady fondu za 20 let |
|---|---|---|
| VOO, SPYL | 0,03 % | 1 443 Kč |
| CSPX, VUAA | 0,07 % | 3 359 Kč |
| SPY | 0,0945 % | 4 528 Kč |
| průměr akciových ETF (ESMA) | 0,22 % | 10 461 Kč |
| průměr akciových fondů bez ETF (ESMA) | 1,38 % | 61 171 Kč |

Pro představu, s hypotetickým výnosem 5 % ročně (jen ilustrace, na stránce ne jako výchozí): VOO 2 841 Kč, CSPX/VUAA 6 611 Kč, SPY 8 910 Kč, průměrný fond 119 582 Kč.

## Ostatní zdroje (regulace, brokeři, průzkumy, benchmark)

Jsou uvedené přímo u jednotlivých zjištění v [strategie.md](strategie.md) s URL a datem získání.

## Kontrola čísel

**Kdo a jak:** kontrolu neprováděl člověk, ale **druhá instance Claude v chatu** (recenzent bez kontextu agenta), **12. 10. 2026**, přímo na stránkách emitentů a v původních dokumentech. Výsledek předal uživatel, který rozhodoval o úpravách. Hodnoty označené "neověřeno" recenzent nepotvrdil a stojí jen na sběru agenta.

Legenda: **OK** = sedí přesně, **≈** = sedí řádově (jiné datum zdroje), **neověřeno** = recenzent nekontroloval nebo nemohl načíst.

| Ticker | TER | Burza / listing | Aktiva | Výkonnost 1/3/5/10 | Počet pozic | Registrace ČR | Zdroj kontroly |
|---|---|---|---|---|---|---|---|
| SPY | OK | OK | OK | OK | OK | n/a | stránka emitenta |
| IVV | OK | OK | OK | OK | OK | n/a | stránka emitenta |
| AGG | OK | OK | OK | OK | OK | n/a | stránka emitenta |
| VOO | OK (0,03 %) | OK | ≈ | neověřeno | neověřeno | n/a | factsheet Vanguard F0968, stav k 30. 6. 2026 |
| VTI | OK (0,03 %) | OK | ≈ | neověřeno | neověřeno | n/a | factsheet Vanguard F0970, stav k 30. 6. 2026 |
| VT | OK (0,06 %) | OK | ≈ | neověřeno | neověřeno | n/a | factsheet Vanguard F3141, stav k 30. 6. 2026 |
| VYM | OK (0,04 %) | OK | ≈ | neověřeno | neověřeno | n/a | factsheet Vanguard F0923, stav k 30. 6. 2026 |
| CSPX | OK (0,07 %) | OK | OK | (v CSV není) | neověřeno | OK | stránka emitenta |
| VUAA | OK (0,07 %) | OK | OK | (v CSV není) | neověřeno | OK* | stránka emitenta |
| SPYL | OK (0,03 %) | OK | OK | neověřeno (jen 1 rok) | neověřeno | OK | stránka emitenta |
| VWCE | OK (0,14 %) | OK | OK | (v CSV není) | neověřeno | OK* | stránka emitenta |

ISIN a domicil u všech čtyř UCITS fondů: OK.

**Poznámky ke kontrole**
- Vanguard US (VOO, VTI, VT, VYM): stránka investor.vanguard.com se recenzentovi bez prohlížeče nenačetla, proto kontrola přes oficiální factsheety na fund-docs.vanguard.com. Aktiva v CSV jsou k 30. 9. 2026, factsheety k 30. 6. 2026, proto jen řádová shoda. Výkonnost těchto čtyř fondů zůstává neověřená recenzentem: na stránce ji použít až po kontrole, nebo jen u SPY a IVV.
- "n/a" u US fondů: registrace v ČR je v CSV vedená jako NEOVĚŘENO.
- \* Registraci VUAA v ČR recenzent neověřil. Na upozornění uživatele ji 12. 10. 2026 znovu ověřil agent přímo na stránce emitenta (Vanguard NL, Fund facts, řádek "Register countries", v seznamu "Czech Republic"). Na stránce proto smí stát "registrované v ČR" u všech tří evropských fondů na S&P 500 (CSPX, SPYL, VUAA). Stejně agent 12. 10. 2026 ověřil VWCE (Vanguard NL, Fund facts, "Register countries", v seznamu "Czech Republic"), kvůli tabulce evropských fondů v PDF.

**Ostatní zdroje**

| Údaj | Výsledek |
|---|---|
| ESMA 2025 (report z 3. 3. 2026), str. 6: akciové fondy bez ETF 1,38 %, akciová ETF 0,22 % | OK |
| Ruler Analytics (26. 5. 2026): finance 6,3 %, placené sociální sítě 3,7 % | OK |
| Unbounce 2024: finanční služby 8,3 % (medián) | OK |
| Unbounce 2024: podkategorie investování 3,9 % | OK, ale stránka **neuvádí, zda jde o medián**. Formulace v [strategie.md](strategie.md) opravena. |
| Meta Ad Library | **neověřeno**, nenačte se ani recenzentovi. Do README jako omezení. |
