# Vizuální styl

Stav: **schváleno 12. 10. 2026: varianta 1 (Cenovka)**, s opravami náhledu z revize (viz sekce 7). Varianta 2 zůstává v repozitáři jako zamítnutý návrh.

Náhledy první obrazovky (otevřít v prohlížeči, kalkulačka i přepínač fungují):
- [design/varianta-1-cenovka.html](../design/varianta-1-cenovka.html) (schválená)
- [design/varianta-2-datovy-clanek.html](../design/varianta-2-datovy-clanek.html) (zamítnutá)

Obě varianty mají stejný obsah, stejná data a stejnou strukturu první obrazovky. Liší se jen vizuálním jazykem, aby šlo vybírat styl, ne obsah.

---

## 1. Směr: jak má stránka působit

Návštěvník je rozhodnutý začátečník z Instagramu (viz [strategie.md](strategie.md), Rozhodnutí 1). Stránce dá pár vteřin, drží telefon v jedné ruce, často venku. Bojí se, že přeplatí nebo koupí "špatný" fond, a od reklamy na finance čeká, že mu někdo něco prodává.

**Stránka má působit jako srovnávací test, ne jako prodejce.** Důvěra stojí na čtyřech věcech, které musí být vidět bez scrollování:

1. **Číslo hned.** Výsledek kalkulačky (A) nebo srovnání fondů (B) je na první obrazovce. Hodnota je zřejmá dřív, než po návštěvníkovi cokoli chceme.
2. **Zdroj a datum u čísla.** "data k 12. 10. 2026" v hlavičce, zdroj (emitenti, ESMA) přímo pod výsledkem. Žádné číslo bez původu.
3. **Nic neprodáváme.** Žádná loga brokerů, žádné "začněte investovat", žádné sliby výnosu, žádné grafy růstu, žádné fotky usměvavých lidí s mobilem. Výpočet je bez zhodnocení.
4. **Věcný tón.** Krátké věty, vykání (navazuje na reklamy), konkrétní čísla místo přídavných jmen. Upozornění "nejde o doporučení" je součástí stránky, ne schované.

## 2. Dvě varianty

### Varianta 1: Cenovka

Stránka jako cenovka v obchodě nebo štítek spotřebitelského testu. Hlavní je číslo v korunách, čitelné na první pohled.

| | |
|---|---|
| **Inspirace** | cenovky s jednotkovou cenou v obchodě, energetický štítek EU, tabulky spotřebitelských testů, orientační systémy (jasná hierarchie, žádná dekorace) |
| **Písmo** | [Archivo](https://fonts.google.com/specimen/Archivo) (variabilní, osa šířky i váhy). Titulky a částky v zúžené šířce (72 až 80 %) a váze 850, aby se dlouhá čísla jako "61 171 Kč" vešla na řádek. Text v normální šířce. Číslice tabulkové (`tabular-nums`), aby částky lícovaly. |
| **Barvy** | bílá `#FFFFFF`, inkoust `#111111`, šedá pro popisky `#4A4A4A`, žlutá cenovka `#FFD400` (jen jedna na obrazovce: nejdražší položka a tlačítko), tmavě červená `#B3261E` jen pro sloupec průměrného fondu |
| **Tvar** | nulové zaoblení, linky 2 px černé, pole formuláře jako orámované štítky, pevná černá lišta s výzvou dole, tlačítko žluté |
| **Silné stránky** | nejvyšší kontrast (18,9 : 1), čte se za 2 vteřiny i na slunci; vypadá jako nástroj, ne jako reklama; žádná šablona takhle nevypadá |
| **Riziko** | žlutá a černá může sklouznout k letáku se slevami. Proto: žlutá maximálně jednou na obrazovce, žádné přeškrtnuté ceny, vykřičníky ani "akce" |

### Varianta 2: Datový článek

Stránka jako graf v datové rubrice kvalitních novin. Důvěra stojí na redakčním tónu a zdrojích jako poznámkách pod čarou.

| | |
|---|---|
| **Inspirace** | grafy v datových rubrikách novin (zdroj a datum pod každým grafem), Our World in Data |
| **Písmo** | [Newsreader](https://fonts.google.com/specimen/Newsreader) (patkové, optické velikosti) na titulky, [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) na text, vstupy a čísla |
| **Barvy** | papír `#F5F0E6`, inkoust `#1C1B19`, šedá `#57534B`, petrolejová `#0E5A5E` (ETF, odkazy, tlačítko), rezavá `#A63D1E` (průměrný fond), vlasová linka `#CFC6B4` (jen dekorace) |
| **Tvar** | tenké linky místo rámečků, zaoblení 4 px jen u tlačítka, kalkulačka jako věta s podtrženými poli ("Když ukládám 2 000 Kč měsíčně po dobu 20 let..."), horní indexy ¹ ² odkazují na zdroje |
| **Silné stránky** | působí nezávisle a vysvětluje; věta s poli je srozumitelná i pro úplného začátečníka |
| **Riziko** | teplý papír s patkovým písmem je dnes častý vzhled výstupů AI (včetně Claude), takže míjí cíl "nesmí vypadat jako výchozí výstup od Claude". Patkový titulek se na malém displeji čte pomaleji a styl působí spíš na čtení než na dvě vteřiny. |

### Doporučení: varianta 1 (Cenovka)

Pro studený mobilní provoz z Instagramu je rozhodující, jak rychle návštěvník pochopí výsledek. Cenovka ukazuje částku největším písmem na stránce, má nejvyšší kontrast a nevypadá jako žádná šablona. Z varianty 2 bych převzal zdroje u čísel ve formě krátké poznámky pod výsledkem (už je v náhledu).

## 3. Kontrast pro mobil na slunci

Cíl: běžný text alespoň 7 : 1 (WCAG 2.2, úroveň AAA, [SC 1.4.6](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html)), vedlejší text alespoň 4,5 : 1 (AA, [SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)), grafické prvky a ovládací prvky alespoň 3 : 1 ([SC 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). Poměry spočítané vzorcem WCAG pro relativní jas (skript, 12. 10. 2026).

| Varianta | Dvojice | Poměr | Použití |
|---|---|---|---|
| 1 | inkoust / bílá | 18,88 | text, částky |
| 1 | šedá `#4A4A4A` / bílá | 8,86 | popisky, poznámky |
| 1 | inkoust / žlutá | 13,19 | cenovka, tlačítko |
| 1 | žlutá / inkoust | 13,19 | (rezerva, text na liště je bílý: 18,88) |
| 1 | červená / bílá | 6,54 | jen sloupec grafu |
| 2 | inkoust / papír | 15,15 | text |
| 2 | šedá `#57534B` / papír | 6,74 | popisky, poznámky (AA, ne AAA) |
| 2 | petrolejová / papír | 7,00 | vstupy, sloupce, odkazy |
| 2 | bílá / petrolejová | 7,95 | tlačítko |
| 2 | rezavá / papír | 5,59 | sloupec a částka průměrného fondu |
| 2 | vlasová linka / papír | 1,49 | jen dekorace, nenese informaci |

Další pravidla pro obě varianty: text nikde pod 12 px, vstupy alespoň 16 px (jinak iOS při kliknutí do pole přiblíží stránku), dotykové plochy alespoň 44 px vysoké, žádné tenké řezy písma.

## 4. Co odlišuje stránku od výchozího výstupu Claude

| Typický výchozí výstup | Tady místo toho |
|---|---|
| Inter nebo systémové písmo | Archivo v zúžené šířce (V1), Newsreader + IBM Plex Sans (V2) |
| fialový nebo modrofialový gradient v hlavičce | jednobarevné plochy, žádný gradient |
| mřížka karet s ikonami v barevných kolečkách | žádné ikony; obsah je tabulka a graf s čísly |
| emoji v nadpisech a odrážkách | žádné emoji |
| "Odemkněte svou finanční budoucnost", "Investujte chytře" | otázka s konkrétní částkou: "Kolik vás za 20 let stojí samotný fond?" |
| hero s ilustrací nebo fotkou a velkým tlačítkem, obsah až pod ohybem | výsledek kalkulačky je hero, tlačítko je v pevné liště |
| zaoblení 16 px, stíny, rozmazané pozadí | ostré hrany a linky (V1), vlasové linky (V2), žádné stíny |
| odznaky "Nové", hvězdičky hodnocení, smyšlené recenze | datum dat a zdroj |
| tři sloupce výhod "Rychle, Bezpečně, Zdarma" | jedna věc: srovnání nákladů |

## 5. První obrazovka 375 × 667 px

V náhledech je každá obrazovka přesně 375 × 667 px s oříznutím, takže je vidět přesně to, co návštěvník uvidí bez scrollování. Prohlížeč uvnitř Instagramu ubere část výšky svou lištou. Kolik přesně, změříme ve fázi 3 na skutečném telefonu; proto je nejdůležitější obsah (titulek a výsledek) nahoře a výzva v pevné liště dole, která je vidět vždy.

### Reklama A (`utm_content=a_naklady`, zároveň výchozí)

Shora dolů:
1. Hlavička 44 px: název, "data k 12. 10. 2026".
2. Titulek: "Kolik vás za 20 let stojí samotný fond?" (počet let v titulku se mění podle vstupu).
3. Dva vstupy vedle sebe: měsíčně (2 000 Kč), po dobu (20 let).
4. Výsledek, tři řádky s částkou a sloupcem: VOO 1 443 Kč; evropské fondy na S&P 500 (CSPX, SPYL, VUAA) 1 443 až 3 359 Kč; průměrný akciový fond v EU (ESMA) 61 171 Kč.
5. Poznámka: bez zhodnocení, jen náklady fondu, bez poplatků brokera, směny měn a daní; zdroj.
6. Pevná lišta: "Srovnání 11 fondů v PDF, zdarma, stáhnete hned" + tlačítko "Chci PDF". Lišta je vidět od načtení, zdůvodnění v [strategie.md](strategie.md), Rozhodnutí 2.

**Odchylka od původního návrhu v [reklamy.md](reklamy.md)** (schváleno 12. 10. 2026, zapsáno i tam): bez podnadpisu "2 000 Kč měsíčně: asi 1 400 Kč u ETF, asi 61 000 Kč...". Stejná čísla ukazuje výsledek kalkulačky o pár řádků níž, podnadpis by jen zabral místo a výsledek by spadl pod ohyb. Návaznost na reklamu drží titulek a stejné částky ve výsledku.

### Reklama B (`utm_content=b_srovnani`)

Shora dolů:
1. Hlavička jako u A.
2. Titulek doslova podle titulku reklamy B: "VOO vedle evropského fondu na stejný index" (2 řádky; původní "VOO, SPY a evropské fondy na stejný index vedle sebe" měl 4 řádky a obrazovka byla na pár vteřin moc hutná).
3. Podnadpis: "Náklady, velikost a kde je v Česku koupíte. Data od emitentů." (datum je v hlavičce, proto bez "k říjnu 2026").
4. Přepínač amerického fondu: VOO / SPY / IVV.
5. Srovnání ve dvou sloupcích (vybraný US fond vs. evropské fondy CSPX, SPYL, VUAA): index, roční náklady (TER), velikost (u VOO a evropských fondů s drobným "jen třída ETF/Acc" přímo pod číslem, bez hvězdičky), "Koupím ho z Česka?" (US: Fio ano, DEGIRO ne, XTB jen CFD; evropské: registrované v ČR podle emitentů, ověřeno u všech tří, viz [zdroje-dat.md](zdroje-dat.md)).
6. Poznámka nad lištou: "Srovnání slouží pro informaci, nejde o doporučení."
7. Pevná lišta jako u A ("Všech 11 fondů v PDF, zdarma, stáhnete hned").

Všechna čísla v náhledech jsou z [data/etf.csv](../data/etf.csv) a výpočty odpovídají tabulce v [zdroje-dat.md](zdroje-dat.md), sekce Výpočty (ověřeno spuštěním vzorce, 12. 10. 2026).

## 6. Stack

Zdroje ověřeny **12. 10. 2026**.

| Část | Volba | Proč |
|---|---|---|
| Stránka | statické HTML + CSS + malý skript bez frameworku | jedna stránka, jedna kalkulačka, jeden formulář. Framework by přidal kód ke stažení a nic by nepřinesl. Hotové HTML se zobrazí hned i na pomalém mobilním připojení. |
| Písma | vlastní hosting (woff2, jen podmnožiny latin a latin-ext), `font-display: swap`, přednačtení hlavního řezu | žádný požadavek na servery Google (rychlost i ochrana údajů). Podpora češtiny ověřena: všechny tři rodiny mají v Google Fonts podmnožinu latin-ext. Velikost souborů změříme při implementaci. |
| Hosting | Vercel (Hobby) | zadání. **Pozor:** Vercel uvádí "Hobby teams are restricted to non-commercial personal use only" a mezi komerční použití řadí "Advertising the sale of a product or service" ([Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines)). Pro úkol stačí, pro skutečnou placenou kampaň je potřeba tarif Pro. Do README jako omezení. |
| Formulář | Vercel Function `api/lead` (Node) | validace e-mailu a souhlasu na serveru, skryté pole proti robotům, uložení. Hobby zahrnuje 1 000 000 volání funkcí měsíčně (tamtéž). |
| Ukládání leadů | [Neon](https://neon.com/pricing) Postgres, tarif Free | zdarma, 1 GB na projekt. Nečinná databáze se po 5 minutách uspí a při dalším dotazu se "reactivates automatically within a few hundred milliseconds" ([Neon docs, Scale to zero](https://neon.com/docs/introduction/scale-to-zero)). Ukládáme e-mail, souhlas (ano/ne, znění, čas), `utm_*`, verzi hlavičky. |
| Měření | [Umami Cloud](https://umami.is/pricing), tarif Hobby | 0 USD, do 100 000 eventů měsíčně, 1 web, data 6 měsíců. Hobby obsahuje vlastní eventy, funnel analýzu a UTM parametry (tabulka funkcí na stránce ceníku). Umami o sobě uvádí, že nepoužívá cookies a nepotřebuje cookie lištu; servery v USA a EU. Právní posouzení jsme nedělali, do README jako omezení. |

**Proč ne jiné možnosti**
- **Supabase:** bezplatné projekty "are paused after 1 week of inactivity" ([supabase.com/pricing](https://supabase.com/pricing)). Kdyby hodnotitel stránku zkoušel po týdnu bez provozu, formulář by neuložil lead.
- **Vercel Web Analytics:** "Custom Events are available on Enterprise and Pro plans" ([Vercel docs](https://vercel.com/docs/analytics/custom-events)). Na Hobby bychom neměřili cestu po odeslání formuláře.
- **Google Analytics 4:** používá cookies, potřebuje souhlasovou lištu. Lišta na první obrazovce bere místo výsledku a část návštěvníků by v datech chyběla.

## 7. Rozhodnutí (12. 10. 2026)

1. **Varianta 1 (Cenovka).**
2. **Název "ETF v korunách" zůstává.** Patička: správce osobních údajů Yehor Havrylov, kontaktní e-mail, označení "ukázkový projekt do výběrového řízení".
3. **Obě odchylky od reklam schváleny** a zapsané v [reklamy.md](reklamy.md).
4. **Ve fázi 2 bez e-mailu:** kontakt se uloží a PDF jde stáhnout hned. Texty slibující zaslání e-mailem jsou opravené na okamžité stažení. Doručení jen e-mailem vs. okamžité stažení je hypotéza na A/B test ([strategie.md](strategie.md), Hypotézy).
5. **Meta Pixel ve fázi 2 ne.** Do README: skutečná kampaň optimalizovaná na leady ho potřebuje, spolu s cookie lištou. Doplní se ve čtvrtek, pokud zbude čas.

**Opravy náhledu z revize:** registrace v ČR ověřena i u VUAA; obrazovka B má kratší nadpis a poznámka je vidět nad lištou; lišta s výzvou od načtení je sjednocená se strategií (viz [strategie.md](strategie.md), Rozhodnutí 2). Chyby agenta jsou v [ai-notes.md](ai-notes.md), záznamy 8 a 9.
