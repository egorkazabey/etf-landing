# Strategie

Stav: **zjištění i rozhodnutí hotová, rozhodnutí schválena 12. 10. 2026 s úpravami z revize** (viz [ai-notes.md](ai-notes.md), záznamy 4 a 5).

Všechny zdroje získány **12. 10. 2026**, pokud není uvedeno jinak. Co není ověřené z primárního zdroje, je označené **NEOVĚŘENO** a nepoužívá se jako podklad pro rozhodnutí.

---

# Zjištění

## 1. Co si český drobný investor reálně koupí a přes koho

### Regulace: PRIIPs a KID

- Nařízení PRIIPs ukládá tomu, kdo investiční produkt **prodává nebo k němu poskytuje poradenství**, předat retailovému investorovi sdělení klíčových informací (KID). Zdroj: [ČNB, Sdělení klíčových informací (PRIIPs)](https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/sdeleni-klicovych-informaci-priips/index.html).
- **ČNB, Otázky a odpovědi k nařízení PRIIPs** (stanovisko, publikováno 22. 10. 2018): "obstarávání nákupu investičních nástrojů na pokyn zákazníka" kritérium prodeje podle čl. 4 odst. 5 nesplňuje a takového obchodníka "nelze jej považovat za subjekt povinnosti podle čl. 13 odst. 1 nařízení PRIIPs". Podmínka: obchodník produkt nenabízí ani k němu neradí. Zdroj: [cnb.cz RS2018-0015](https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2018-0015). Pozn.: v dokumentu je uvedeno číslo RS2018-12, v URL RS2018-0015.
- **Důsledek:** v ČR neplatí jednoduché "americká ETF nekoupíte". Záleží na brokerovi: kdo jen provádí pokyny (execution-only), může US ETF zpřístupnit, ale nesmí je aktivně nabízet. Většina zahraničních brokerů je přesto blokuje (viz níže).

### Brokeři (primární zdroje brokerů)

| Broker | US ETF (např. VOO) jako skutečný cenný papír | Zdroj |
|---|---|---|
| Fio banka (e-Broker) | **Ano.** "U nás můžete obchodovat i s americkými ETF." Zároveň: "Fio banka svým klientům ani dalším osobám nenabízí žádné ETF." Poplatek USA: 7,95 USD za obchod do 100 ks, 9,95 USD nad 100 ks (Ceník základních služeb, soubor změněn 3. 7. 2026). Přístup na NYSE, NYSE Arca, Nasdaq. | [fio.cz/akcie-investice/etf](https://www.fio.cz/akcie-investice/etf), [Ceník (PDF)](https://www.fio.cz/docs/cz/C_zaklad.pdf), [fio.cz akcie USA](https://www.fio.cz/akcie-investice/akcie/akcie-usa) |
| DEGIRO | **Ne.** ETF bez KID v místním jazyce obecně nemůže nabízet (v originále "can generally not offer"). Existující pozice lze držet a prodat. | [degiro.cz helpdesk, PRIIPs](https://www.degiro.cz/helpdesk/trading-possibilities/impact-new-priips-regulation) |
| XTB | **Jen jako CFD** (derivát), ne skutečný fond: "Obchodujte CFD na IEF.US". Skutečné akcie a ETF s 0 % poplatkem do obratu 100 000 EUR/měsíc (nad limit 0,2 %, min. 10 EUR), konverze měny až 0,5 %. | [xtb.com/cz/etf-cfd/ief-us](https://www.xtb.com/cz/etf-cfd/ief-us), [akcie.xtb.com](https://akcie.xtb.com/investujte-do-akcii-bez-poplatku) |
| Trading 212 | **Ne** na investičním účtu (US ETF jen "view only", obchodovatelné jen přes CFD). **NEOVĚŘENO** z oficiální nápovědy, jen z odpovědí na komunitním fóru Trading 212. | [community.trading212.com](https://community.trading212.com/t/why-no-us-listed-us-index-etfs-etps/55400) |
| Interactive Brokers | Podle IBKR knowledge base blokuje PRIIPs produkty bez KID pro retail. **NEOVĚŘENO**: stránka vrací HTTP 403, informace jen z výsledků vyhledávání. | [ibkr.info/de/node/3324](https://www.ibkr.info/de/node/3324) |
| Patria, Revolut, Portu | **NEOVĚŘENO**, nekontrolováno. | |

Licence brokerů v registru ČNB (JERRS) **NEOVĚŘENO**: registr je webová aplikace, kterou nelze načíst bez prohlížeče. Nekontroluje se, do README jako omezení.

### UCITS ekvivalenty jsou v ČR registrované

Emitenti uvádějí Českou republiku mezi zeměmi registrace u všech čtyř vybraných UCITS fondů (CSPX, VUAA, SPYL, VWCE). Zdroje v [data/etf.csv](../data/etf.csv).

### Burza: NYSE vs. NYSE Arca

- Všechny vybrané US ETF (SPY, IVV, VOO, VTI, VT, VYM, AGG) jsou kótované na **NYSE Arca**. Zdroj u každého fondu: stránka emitenta, přesné místo ve sloupci `burza_zdroj` v [data/etf.csv](../data/etf.csv).
- NYSE o sobě: "NYSE Group operates five equities markets with distinct trading and pricing models" a NYSE Arca je "the leading U.S. exchange for the listing and trading of exchange-traded products (ETPs)". Zdroj: [nyse.com/markets/nyse-arca](https://www.nyse.com/markets/nyse-arca).
- Fio: NYSE Arca je "trh pro obchodování s ETF" ze skupiny NYSE. Zdroj: [fio.cz akcie USA](https://www.fio.cz/akcie-investice/akcie/akcie-usa).
- Rozhodnutí viz sekce Rozhodnutí, bod 4.

### Daně

**Nezkoumáno.** Časový test a srážková daň u US vs. irských fondů se ověří z primárních zdrojů (zákon o daních z příjmů, Finanční správa), jen pokud se dostanou na stránku nebo do odměny.

## 2. Data ETF

Viz [data/etf.csv](../data/etf.csv) a [zdroje-dat.md](zdroje-dat.md). Nejzajímavější pro stránku:

- **Stejný index, různá cena:** SPY má TER 0,0945 %, IVV a VOO 0,03 %. Průměrná roční výkonnost za 10 let k 30. 9. 2026 (NAV): SPY 15,18 %, IVV 15,30 %, VOO 15,29 %. SPY tedy zaostal o 0,11 až 0,12 p. b. ročně, rozdíl v TER je 0,0645 p. b. Zbytek rozdílu má jinou příčinu, kterou jsem neověřoval, proto na stránce ukazovat jen TER a výkonnost, ne vysvětlení rozdílu.
- **UCITS S&P 500 pro Čechy:** SPYL 0,03 %, CSPX 0,07 %, VUAA 0,07 %.
- **V korunách je rozdíl mezi levnými ETF malý.** 2 000 Kč měsíčně, 20 let, bez zhodnocení: náklady fondu asi 1 440 Kč (TER 0,03 %) vs. asi 4 530 Kč (SPY, 0,0945 %). Výpočet viz [zdroje-dat.md](zdroje-dat.md), sekce Výpočty.

### Náklady běžných fondů (srovnání pro kalkulačku)

- **ESMA, Costs and Performance of EU Retail Investment Products 2025** (ESMA50-1949966494-4065, publikováno 3. 3. 2026), tabulka "Essential statistics - UCITS", EU27, retailoví investoři, 5letý horizont 2020 až 2024:
  - akciové UCITS fondy (bez ETF): **průběžné náklady 1,38 % ročně**, vstupní poplatky 0,51 % ročně, náklady celkem 1,9 % ročně,
  - akciová ETF: průběžné náklady 0,22 % ročně.
  - Zdroj: [ESMA report (PDF)](https://www.esma.europa.eu/sites/default/files/2026-03/ESMA50-1949966494-4065_Market_Report_-_Costs_and_Performance_of_EU_Retail_Investment_Products.pdf), strana 6.
- **Omezení:** ESMA neuvádí náklady za ČR zvlášť (v přílohách je ČR jen u inflace a obchodů s ETF). KID konkrétního českého bankovního fondu (Erste AM: SPOROTREND, TOP STOCKS) se nepodařilo získat, stránky Erste AM se vykreslují JavaScriptem a odkazy na KID nejsou v HTML. Na stránce proto píšeme "průměrný akciový fond v EU (ESMA)", ne "fond z české banky".

## 3. Cílová skupina: data o českých investorech

| Zjištění | Zdroj |
|---|---|
| 55 % Čechů aktivně investuje (dříve 41 %). Fondy/ETF vč. penzijních využívá asi 59 % investorů, u lidí do 30 let víc. | [Index prosperity Česka 2026, Finanční investice](https://www.indexprosperity.cz/2026/financni-investice/) (Česká spořitelna, Evropa v datech, publikováno 11. 3. 2026). Velikost vzorku a agentura na stránce neuvedeny. |
| Investoři jsou častěji muži do 40 let s VŠ a vyššími příjmy. Digitální investoři mají průměrně 35 let, noví investoři na pobočce 59. | tamtéž |
| Bariéry: hlavně nedostatek peněz, pak **strach ze ztráty**, strach ze špatného rozhodnutí, volatilita. Mladí výrazně častěji říkají, že **nevědí, jak začít**. Asi 46 % neinvestorů by začalo, kdyby měli jistotu, že nepřijdou o peníze; asi pětina, kdyby jim to někdo vysvětlil. | tamtéž |
| 89 % považuje za důležité sledovat investice (např. v aplikaci), mobilní aplikace jsou nejčastější způsob. | tamtéž |
| ETF uvedlo 19 % respondentů v 2025, v 2026 o 2 až 3 p. b. víc. Nejčastěji 27 až 35 let (28 %), muži (28 %), Praha (34 %), domácnosti s příjmem nad 80 000 Kč (41 %). 75 % lidí s rezervou používá spořicí účet. | Ipsos pro Home Credit, online, 1 026 respondentů 18 až 65 let, sběr 06/2026, přes [FeedIT.cz 24. 9. 2026](https://feedit.cz/2026/09/24/cesi-presouvaji-sve-financni-rezervy-z-beznych-a-sporicich-uctu-do-investicnich-produktu/). Originální tisková zpráva nenalezena. |
| DIP: 244 217 smluv k 31. 3. 2026, 9,5 mld. Kč. | **NEOVĚŘENO** (jen zpravodajství [kurzy.cz](https://zpravy.kurzy.cz/856684-s-dip-lide-investuji-na-duchod-jiz-9-5-miliardy-korun-pocet-smluv-se-blizi-ctvrt-milionu/) citující AKAT, originál AKAT nedohledán). |
| "Více než 60 % [klientů] investuje přes ETF" | **Zaujatý zdroj** (broker XTB o vlastních klientech, [ekonom.cz](https://ekonom.cz/c1-67892720-cesi-prestavaji-spekulovat-vice-nez-60-procent-jich-uz-investuje-pres-etf-rika-cesky-broker)). Nepoužívat. |

## 4. Konkurence v ČR

| Kdo | Co nabízí | Za kontakt | Poznámka |
|---|---|---|---|
| [ETF průvodce](https://etfpruvodce.cz/srovnani) | srovnávač 5 131 ETF s výnosy v CZK, kalkulačky, "kde koupit", modelová portfolia | nic, žádný sběr e-mailů | data "justETF / vlastní databáze", aktualizováno 12. 10. 2026; deklaruje "bez provizí a reklam" |
| [PorovnejFondy.cz](https://www.porovnejfondy.cz/fondy/etf/) | srovnání 37 ETF, kalkulačky, backtest | **e-mail brána** před srovnáním (e-mail povinný, telefon a banka nepovinné), PDF taháky ("ETF tahák", "Daňový tahák"), exit popup, newsletter, "zavoláme vám" | provozuje Lendel Capital Management; kontakty předává vázanému zástupci, odměna provizí. **Nejbližší konkurent lead magnetu.** |
| [FinHacker](https://www.finhacker.cz/etf-kalkulacka-nakladu/) | kalkulačka nákladů ETF (TER dvou ETF, roky, výsledek v Kč, graf) | jen newsletter v patičce | příjem z affiliate odkazů na brokery |
| [Fondee](https://www.fondee.cz/cs/) | robo-advisor, investiční kalkulačka (vklad, měsíčně, roky) | bez lead magnetu, CTA "Začít investovat" | "až 11,7 %" historická simulace před poplatky; od 500 Kč |
| [XTB](https://www.xtb.com/cz/videokurzy) | videokurzy, e-booky | registrace | e-book o ETF v nabídce nenalezen |
| Portu | | | **NEOVĚŘENO**: stránka se bez prohlížeče nenačetla |

**Meta Ad Library: NEOVĚŘENO.** Knihovna vrací HTTP 403 (vyžaduje prohlížeč), nenačetla se ani recenzentovi (druhá instance Claude, 12. 10. 2026). Do README jako omezení. Dotazy pro budoucí kontrolu v prohlížeči:
- https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CZ&q=ETF&search_type=keyword_unordered
- totéž s `q=investování`, `q=Portu`, `q=Fondee`, `q=XTB`, `q=porovnejfondy`

**Mezera na trhu (pracovní závěr):** nikdo z nalezených neodpovídá na otázku "ETF z NYSE, které vidím na sociálních sítích (VOO, SPY): můžu je koupit z Česka a co místo nich?" a nikdo nemá lead magnet stavěný na mobil a reklamu.

## 5. Benchmark konverze

**Unbounce Conversion Benchmark Report 2024**: 41 000+ landing pages, 464 mil. návštěvníků, 57 mil.+ konverzí. Období dat neuvedeno ("in the past year"). Konverze zahrnuje kliky i formuláře. Zdroje: [přehled reportu](https://unbounce.com/conversion-benchmark-report/), [Finance & Insurance](https://unbounce.com/conversion-benchmark-report/finance-insurance-conversion-rate/).

| Ukazatel | Hodnota | Typ |
|---|---|---|
| všechna odvětví | 6,6 % | medián |
| finanční služby | 8,3 % | medián |
| finanční služby, podkategorie investování | 3,9 % | stránka neuvádí, zda jde o medián, nebo průměr |
| investování, nejlepší stránky | až 20,6 % | |
| finanční služby, provoz z Facebooku | 10,1 % | medián |
| finanční služby, provoz z Instagramu | 15,5 % | medián |
| finanční služby, mobil | 11,5 % | "average" |
| finanční služby, čtenost 5. až 7. třída | 18,1 % | medián |
| doporučená délka stránky | 195 až 715 slov | |

**Druhý nezávislý zdroj: Ruler Analytics, Conversion Rate Benchmarks 2026** (publikováno 26. 5. 2026): 110 mil.+ sessions, 5 mil.+ konverzí, 13 odvětví, data klientů platformy Ruler. Konverze = "a qualified lead or sale". Období dat neuvedeno. Zdroj: [ruleranalytics.com](https://www.ruleranalytics.com/blog/insight/conversion-rate-by-industry/).

| Ukazatel (finance) | Hodnota |
|---|---|
| celkem | 6,3 % |
| placené vyhledávání | 6,3 % |
| organické vyhledávání | 5,4 % |
| **placené sociální sítě** | **3,7 %** |

**Výhrady:** (1) Unbounce počítá i konverze typu klik, my měříme odeslaný formulář, reálná čísla budou nižší. (2) Investování je nejbližší podkategorie Unbounce a je výrazně pod průměrem financí. (3) Ruler měří kvalifikované leady (přísnější definice než náš e-mail), data jsou z jeho klientů (převážně UK, neověřeno), ne z ČR. (4) Žádný z obou zdrojů nemá data za Českou republiku ani za lead magnety ve financích zvlášť. (5) Další nalezené "benchmarky 2026" jsou převyprávěná data Unbounce nebo nemají metodiku (např. Focus Digital), nepoužity.

Oba nezávislé zdroje se pro náš případ (finance/investování, placené sociální sítě) shodují kolem 3,7 až 3,9 %.

## 6. Doručení odměny e-mailem bez vlastní domény

| Služba | Bez vlastní domény? | Zdroj |
|---|---|---|
| Resend | **Ne.** "You must add and verify at least one domain to send emails with Resend." | [resend.com/docs](https://resend.com/docs/dashboard/domains/introduction) |
| Brevo | **Částečně.** Doménu typu gmail.com nelze ověřit; Brevo odesílatele dočasně přepíše na adresu `@brevosend.com` ("stopgap measure"). Limity bezplatného tarifu **NEOVĚŘENO** (ceník se bez prohlížeče nenačetl). | [help.brevo.com, požadavky Gmail/Yahoo](https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders), [Create a new sender](https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email) |
| EmailJS | **Ano**, odesílá přes připojený osobní Gmail. Bezplatně 200 požadavků měsíčně, nad limit se požadavky zahazují. EmailJS sám uvádí, že osobní účty jsou "for development purposes or very low volume usage" a při překročení denního limitu poskytovatele hrozí blokace účtu. | [emailjs.com/pricing](https://www.emailjs.com/pricing/), [Connecting email services](https://www.emailjs.com/docs/user-guide/connecting-email-services/) |

Závěr: bez domény to jde jen s omezeními (malý objem, cizí odesílatel, horší doručitelnost). Pro skutečnou kampaň je potřeba vlastní doména (omezení do README).

## 7. Regulace obsahu a pravidla reklamy

- **Investiční doporučení vs. poradenství**, [ČNB RS2018-08](https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2018-08) (25. 5. 2018): doporučení může být osobní i když jde více lidem najednou (např. e-mailem), pokud je prezentované jako vhodné pro danou osobu. Příklady z ČNB: "tento produkt je pro Vás nejlepším řešením Vašich financí", nepřímo "lidé Vám podobní si pořizují tento produkt" nebo doporučení založené na okolnostech osoby.
- **Důsledek pro stránku:** kalkulačka a srovnání můžou ukazovat fakta (poplatky, dopad TER) pro zadanou částku. **Nesmí** vybrat "váš ETF" podle odpovědí návštěvníka. Kvíz typu "který ETF je pro vás" vypadá jako poradenství, nepoužít.
- **Meta, pravidla pro finanční produkty: NEOVĚŘENO.** Stránka [Financial and Insurance Products and Services](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/) se bez prohlížeče nenačte. Z výsledků vyhledávání: investiční produkty mohou v některých zemích vyžadovat licenci, CFD a binární opce jsou zakázané. Ruční kontrola se nedělá, do README jako omezení (stejně jako registr ČNB JERRS).

---

# Rozhodnutí

Schváleno uživatelem 12. 10. 2026. Body 1, 2 a 4 v původní podobě, ostatní s úpravami z revize.

## Pravidlo pro všechny texty: srovnáváme, nedoporučujeme

Stránka, tahák, e-mail i reklamy fakta **srovnávají**, nic **nedoporučují** (ČNB RS2018-08, viz Zjištění 7).

| Nepoužívat | Použít místo toho |
|---|---|
| "co koupit místo VOO", "kupte", "doporučujeme" | "evropský fond se stejným indexem", "srovnání" |
| "nejlepší ETF", "nejvýhodnější volba" | "nejnižší TER v tomto srovnání" (jen když to plyne z dat) |
| "pro vás", "hodí se vám", "lidé jako vy" | "pro částku, kterou jste zadali" (jen u výpočtu) |
| výběr fondu podle odpovědí návštěvníka | návštěvník si sám vybere, co chce srovnat |

Na stránce a v taháku bude věta: "Srovnání slouží pro informaci, nejde o investiční doporučení." Podle ČNB samotné upozornění nestačí, rozhoduje forma textu, proto platí tabulka výše.

## 1. Cílová skupina: rozhodnutý začátečník (varianta B)

- **Kdo:** 25 až 40 let, chytrý telefon, do ETF investovat chce nebo už má první investiční aplikaci. Pojem S&P 500 zná. Na sociálních sítích vídá tickery VOO a SPY.
- **Co neví:** který z fondů na stejný index vybrat, jestli je z Česka vůbec koupí a u koho, kolik ho stojí náklady fondu.
- **Čeho se bojí:** že přeplatí, že koupí "špatný" fond, že udělá chybu (strach ze ztráty a ze špatného rozhodnutí jsou podle Indexu prosperity 2026 hlavní bariéry hned po nedostatku peněz).
- **Proč tahle skupina:** ETF nejčastěji uvádějí lidé ve věku 27 až 35 let (Ipsos pro Home Credit 2026). Srovnání ETF z NYSE má hodnotu právě pro toho, kdo se už rozhodl. Na otázku "VOO z Česka a evropský fond se stejným indexem" nikdo z nalezené konkurence neodpovídá. Varianta A (začátečník se spořicím účtem, "jak začít") je širší, ale obsazená (Fondee, Portu, XTB) a srovnání konkrétních fondů pro ni přichází příliš brzy.

## 2. Odměna a moment žádosti o kontakt

- **Odměna:** PDF tahák "VOO, SPY a evropské fondy se stejným indexem: srovnání pro Čechy", 2 až 4 strany čitelné na mobilu.
  - **Upřesněno 12. 10. 2026 (fáze 2):** 6 stran ve formátu telefonu (378 × 673 px) místo 2 až 4 stran A5. Mobilní prohlížeč PDF zobrazí stranu zhruba 1:1, takže text 14 px je čitelný bez zoomování; strana A5 by se zmenšila asi na dvě třetiny. První strana stojí sama o sobě (srovnání šesti fondů na S&P 500 a náklady v Kč) a slouží jako náhled nad formulářem. Výkonnost v PDF není, u Vanguard US fondů nebyla ověřena druhou kontrolou. Obsah:
  1. tabulka US fondů z NYSE Arca a UCITS fondů se stejným indexem (TER, velikost, akumulace/výplata, registrace v ČR),
  2. co který broker dostupný v ČR umožňuje (US ETF ano/ne/jen CFD), s datem ověření,
  3. jak číst TER a co kalkulačka nepočítá (poplatky brokera, směna měn, daně),
  4. zdroje a data.
- **Hodnota viditelná před formulářem:** náhled stran taháku (obrázky) a výsledek kalkulačky zdarma přímo na stránce. **Upřesněno 12. 10. 2026:** náhled první strany PDF stojí přímo nad formulářem, aby byla hodnota vidět, ne jen popsaná.
- **Kdy žádáme o kontakt:** až když návštěvník vidí hodnotu, tedy výsledek kalkulačky (A) nebo srovnání (B). Protože výsledek i srovnání jsou vidět **už na první obrazovce bez interakce**, je pevná lišta s výzvou vidět **od načtení** (upřesněno 12. 10. 2026). Zdůvodnění: (1) hodnota je zřejmá dřív než výzva, i když návštěvník nic nevyplní; (2) část návštěvníků z reklamy počítat nechce a lišta jim ukazuje odměnu hned; (3) lišta je jen odkaz na odměnu, ne formulář: pole pro e-mail se objeví až pod výsledkem nebo po klepnutí na lištu. Lišta až po první interakci je hypotéza na A/B test (viz Hypotézy).
- **Formulář (upřesněno 12. 10. 2026):** jen e-mail a **povinný** nezaškrtnutý souhlas. Bez souhlasu formulář neodejde. Souhlas je transparentní: přímo nad tlačítkem jedna věta, k čemu e-mail použijeme a že se lze jedním klikem odhlásit, a odkaz na zásady zpracování osobních údajů.
  - **Alternativa (nezvolená):** PDF dostane každý, e-mail se uloží jen se zaškrtnutým souhlasem, bez souhlasu se zaznamená jen anonymní event. Měřená konverze by byla "lead se souhlasem".
- **Doručení (rozhodnuto 12. 10. 2026):** ve fázi 2 **jen stažení PDF hned po odeslání**, žádný e-mail. Kontakt se uloží do databáze. Texty nesmí slibovat zaslání e-mailem ("pošleme"), jen okamžité stažení. Doručení e-mailem je hypotéza na A/B test (viz Hypotézy).

## 3. Interaktivní prvky

### a) Kalkulačka nákladů fondu (hlavní prvek)

- **Srovnává tři položky:**
  1. VOO, US ETF z NYSE Arca, TER 0,03 %,
  2. evropské (UCITS) fondy na S&P 500 jako **rozsah 0,03 až 0,07 %**, žádný fond není výchozí ani zvýrazněný; pod řádkem výpis v abecedním pořadí: CSPX 0,07 %, SPYL 0,03 %, VUAA 0,07 % (abecedně, ne podle nákladů, aby nevznikl dojem "vítěze"),
  3. průměrný akciový fond v EU podle ESMA, průběžné náklady 1,38 %.
- **Vstupy:** měsíční částka (výchozí 2 000 Kč) a počet let (výchozí 20).
- **Výpočet:** výchozí bez zhodnocení ("i kdyby se peníze vůbec nezhodnotily"), takže výsledek nic neslibuje o výnosech. Volitelný vlastní předpoklad výnosu označený jako hypotetický rozhodneme ve fázi 2.
- **Ilustrace s výchozími hodnotami:** VOO asi 1 440 Kč, evropské fondy na S&P 500 asi 1 440 až 3 360 Kč, průměrný akciový fond asi 61 170 Kč. Z výsledku je vidět, že evropský fond může stát stejně jako VOO; hlavní rozdíl je mezi ETF a běžným fondem.
- **Text pod výsledkem (povinný):** "Jde jen o roční náklady fondu (TER, průběžné náklady). Nejsou v tom poplatky brokera, směna měn ani daně."
- **Cesta ke kontaktu:** pevná lišta "Chci PDF" vede k formuláři. Samostatné tlačítko pod výsledkem bylo vyřazeno 12. 10. 2026: na první obrazovce by byly dvě stejné výzvy a tlačítko bylo napůl pod lištou.

### b) Přepínač "US ETF z NYSE Arca vs. evropský fond se stejným indexem"

- Dvě karty vedle sebe: VOO a karta "Evropské fondy na S&P 500" se třemi řádky (CSPX, SPYL, VUAA, abecedně). Fakta: TER, velikost, domicil, výplata výnosů a "Koupím ho z ČR?" podle zjištění u brokerů s datem ověření.
- **Cesta ke kontaktu:** pevná lišta, stejně jako u kalkulačky (samostatné tlačítko vyřazeno ze stejného důvodu).

### Vyřazeno

- Kvíz "který ETF je pro vás": podle ČNB by to bylo osobní doporučení.

Události k měření (podrobně v `docs/mereni.md` ve fázi 2): zobrazení kalkulačky, změna vstupu, zobrazení výsledku, přepnutí karet, klik na výzvu, začátek vyplňování formuláře, odeslání, stažení PDF.

## 4. Fondy a burza

- **Srovnávané fondy z NYSE Arca (7):** SPY, IVV, VOO (S&P 500), VTI (celý US trh), VT (celý svět), VYM (dividendy), AGG (dluhopisy).
- **UCITS fondy se stejným nebo podobným indexem (4), jasně odlišené jako ekvivalenty, ne fondy z NYSE:** CSPX, VUAA, SPYL (S&P 500), VWCE (FTSE All-World, podobný index jako VT).
- **Na stránce:** kalkulačka a přepínač s fondy na S&P 500, celá tabulka v taháku. V `data/etf.csv` odlišuje sloupec `role`.
- **SCHD vyřazen:** web Schwabu vrací 403, čísla nejdou ověřit. **QQQ vyřazen:** je kótovaný na Nasdaqu.

**NYSE Arca bereme jako "NYSE" ze zadání.** Zdůvodnění pro README:
1. NYSE Arca je jedna z burz skupiny NYSE ("NYSE Group operates five equities markets") a podle NYSE je "the leading U.S. exchange for the listing and trading of exchange-traded products" ([nyse.com](https://www.nyse.com/markets/nyse-arca)).
2. Všechny velké ETF, které čeští investoři znají (SPY, IVV, VOO, VTI, VT), mají primární kótaci na NYSE Arca (stránky emitentů). Při doslovném výkladu (jen hlavní trh NYSE) by srovnání nemělo smysl, protože by v něm chyběly všechny známé ETF.
3. Fondy z Nasdaqu (QQQ) nezahrnujeme, aby výklad zůstal v rámci skupiny NYSE.
4. Na stránce píšeme přesně "NYSE Arca (burza skupiny NYSE)", nic nezamlčujeme.

## 5. Očekávaná konverze (návštěva stránky → odeslaný formulář)

| Varianta | Konverze | Odkud |
|---|---|---|
| Pesimistická | 2 % | **Odhad autora (uživatele), ne benchmark.** Pod oběma zdroji, protože měříme jen odeslaný formulář ze studeného mobilního provozu. |
| Realistická | 3,7 až 3,9 % | Ruler Analytics 2026, finance, placené sociální sítě 3,7 %. Unbounce 2024, podkategorie investování 3,9 % (stránka neuvádí, zda medián, nebo průměr). |
| Optimistická | 6,3 až 8,3 % | Ruler, finance celkem 6,3 %. Unbounce, medián finančních služeb 8,3 %. |

Omezení: dva zdroje, oba ze zahraničí, s jinou definicí konverze než naše (viz Zjištění 5).

## 6. Reklamy

Viz [reklamy.md](reklamy.md). Reklama A stojí na nákladech v korunách, reklama B na srovnání US ETF s evropským fondem se stejným indexem. Text v hlavičce stránky navazuje podle `utm_content`.

## 7. Omezení do README (z fáze 1 a 2)

- Registr ČNB (JERRS), pravidla Meta pro finanční reklamy a Meta Ad Library nejsou ověřené.
- Kontrolu čísel dělala druhá instance Claude, ne člověk; výkonnost Vanguard US fondů (VOO, VTI, VT, VYM) zůstala neověřená (viz [zdroje-dat.md](zdroje-dat.md)).
- ESMA neuvádí náklady fondů za ČR zvlášť a KID českého bankovního fondu se nepodařilo získat.
- Benchmark konverze nemá data za ČR.
- Doručení e-mailem bez vlastní domény je omezené. Ve fázi 2 se PDF jen stahuje, e-mail se neposílá, takže adresa není ověřená.
- Bez Meta Pixelu (rozhodnuto 12. 10. 2026): skutečná kampaň optimalizovaná na leady ho potřebuje, spolu s cookie lištou. Doplní se ve fázi 3, pokud zbude čas.
- Vercel Hobby je podle podmínek Vercelu jen pro nekomerční použití, placená kampaň by potřebovala tarif Pro (viz [vizualni-styl.md](vizualni-styl.md), Stack).
- Umami uvádí, že nepoužívá cookies a nepotřebuje cookie lištu. Právní posouzení jsme nedělali.
- Povinný souhlas jako podmínka pro získání PDF je podmíněný souhlas (GDPR čl. 7 odst. 4). Právně neověřeno, před ostrým spuštěním konzultovat s právníkem. Alternativa je popsaná v Rozhodnutí 2.
- PDF leží veřejně v `public/` (`/srovnani-etf.pdf`): kdo zná odkaz, stáhne ho i bez formuláře. Pro skutečnou kampaň by bylo potřeba podepsaný odkaz s omezenou platností nebo doručení e-mailem.
- Trading 212, Interactive Brokers, Patria, Revolut a Portu nejsou ověřené z primárních zdrojů.
- Formulář chrání proti robotům jen skryté pole. Omezení počtu požadavků (rate limiting) ani CAPTCHA nejsou: při skutečné kampani by bylo potřeba doplnit, jinak lze databázi zaplnit falešnými adresami.

## 8. Hypotézy na A/B test (podklad pro README)

Sbíráno průběžně. Pořadí podle očekávaného dopadu je v README (koncept 13. 10. 2026).

| Hypotéza | Varianta A | Varianta B | Co měříme | Zapsáno |
|---|---|---|---|---|
| Doručení odměny | okamžité stažení PDF po odeslání (vyšší konverze, víc falešných adres) | PDF jen e-mailem (ověřený kontakt, nižší konverze) | konverze na odeslání; podíl platných adres | 12. 10. 2026 |
| Kdy ukázat lištu s výzvou | lišta od načtení | lišta až po první interakci (změna vstupu, přepnutí fondu, scroll) | konverze na odeslání; klik na lištu | 12. 10. 2026 |
| Povinný souhlas | souhlas je podmínka pro PDF | PDF dostane každý, e-mail se uloží jen se souhlasem (alternativa z Rozhodnutí 2) | konverze; `form_error` s důvodem `consent` | 13. 10. 2026 |

## 9. Pořadí sekcí na stránce (podklad pro README)

Zapsáno 12. 10. 2026 při stavbě stránky (fáze 2).

1. **Sekce, kterou slíbila reklama:** u reklamy A (a bez `utm_content`) kalkulačka, u reklamy B srovnání VOO / SPY / IVV s evropskými fondy. První obrazovka plní slib reklamy a ukazuje hodnotu bez jakékoli akce.
2. **Druhý interaktivní prvek:** u A srovnání, u B kalkulačka. Kdo nereagoval na výzvu, dostane další hodnotu z jiného úhlu.
3. **Odměna a formulář:** obsah PDF (4 body), e-mail a souhlas. Je až za oběma prvky, protože hodnotu už návštěvník viděl. Vede sem pevná lišta, která je vidět odkudkoli (samostatná tlačítka pod prvky byla vyřazena, aby na první obrazovce nebyly dvě stejné výzvy).
4. **Jak počítáme a odkud jsou čísla:** sbalené, pro ty, kdo chtějí ověřit. Neodvádí pozornost od formuláře, ale je k dispozici.
5. **Patička:** upozornění, že nejde o doporučení, správce osobních údajů, označení ukázkového projektu.

Technicky je pořadí sekcí 1 a 2 přepnuté přes CSS (`order`) podle `utm_content` ještě před vykreslením, takže stránka neproblikne. Od fáze 3 skript přesune sekci i v DOM, aby pořadí pro klávesnici a čtečku obrazovky odpovídalo tomu, co je vidět (viz [ai-notes.md](ai-notes.md), záznam 15).

## 10. Cena za lead a rozpočet

Zapsáno 14. 10. 2026 (fáze 4). Výpočet: `npm run kampan` ([scripts/kampan.mjs](../scripts/kampan.mjs)).

**Vstupy:**

| Údaj | Hodnota | Zdroj, datum | Výhrada |
|---|---|---|---|
| Cena za klik (CPC), finance | 0,86 USD | [LocaliQ, Facebook Advertising Benchmarks](https://localiq.com/blog/facebook-advertising-benchmarks/), Finance & Insurance, traffic campaigns; aktualizováno 23. 9. 2026, získáno 14. 10. 2026 | Stránka neuvádí zemi, počet kampaní ani zda jde o medián, nebo průměr. Data WordStream/LocaliQ jsou podle všeho z USA (neověřeno, stránka WordStream s metodikou vrací 403). |
| CPC v ČR, všechna odvětví | 0,95 USD | [AdAmigo, Meta Ads CPM & CPC Benchmarks by Country in 2026](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026), 4. 10. 2026, získáno 14. 10. 2026 | Projekce "based on industry benchmarks and late 2025 data", zdroj dat neuveden. Jen pro kontrolu řádu. |
| CPM v ČR | 6,20 USD (AdAmigo), 5,70 USD ([Lebesgue](https://lebesgue.io/facebook-ads/facebook-cpm-by-country), e-commerce, 27. 7. 2026) | získáno 14. 10. 2026 | Ani jeden zdroj neuvádí metodiku. Do výpočtu nevstupuje: přepočet na klik by potřeboval CTR za ČR, které nemám. |
| Kurz USD | 21,788 Kč | ČNB, kurz devizového trhu 13. 10. 2026, získáno 14. 10. 2026 | |
| Konverze | 2 / 3,8 / 7 % | Rozhodnutí 5: 2 % odhad autora, 3,8 % střed rozsahu 3,7 až 3,9 %, 7 % uvnitř rozsahu 6,3 až 8,3 % | |

Data za finance v ČR ani v EU jsem nenašel. Cena za klik 0,86 USD (18,74 Kč) je proto **odhad**: finanční CPC z (pravděpodobně) amerických dat. Pro kontrolu: CPC v ČR za všechna odvětví vychází podobně (0,95 USD, 20,70 Kč).

**Výsledek** (předpoklad: 1 klik = 1 návštěva stránky; ve skutečnosti část kliků stránku nenačte, cena za lead bude vyšší):

| Konverze | Cena za lead | Kontaktů za 10 000 Kč |
|---|---|---|
| 2 % | 937 Kč | 11 |
| 3,8 % | 493 Kč | 20 |
| 7 % | 268 Kč | 37 |

Cena za lead = CPC / konverze. Kontakty = 10 000 Kč / CPC × konverze.

## 11. Velikost vzorku pro A/B testy

Zapsáno 14. 10. 2026 (fáze 4). Výpočet: `npm run kampan` (s `-- --sim` i simulace).

**Parametry (zadané uživatelem):** výchozí konverze 3,8 %, detekovaná změna o 25 % relativně (3,8 % → 4,75 %), oboustranný test dvou podílů, alfa 0,05, síla 80 %. Pro srovnání i změna o 50 % (3,8 % → 5,7 %).

**Předpoklady (odhad autora):** rozpočet 10 000 Kč týdně, cena za klik 18,74 Kč (Rozhodnutí 10), 1 klik = 1 návštěva. To je 76 návštěv denně.

| Změna konverze | Návštěv na variantu | Celkem | Dní | Cena |
|---|---|---|---|---|
| +25 % (3,8 → 4,75 %) | 7 117 | 14 234 | 187 | 266 712 Kč |
| +50 % (3,8 → 5,7 %) | 1 967 | 3 934 | 52 | 73 714 Kč |

**Platí pro všechny tři hypotézy:** všechny mají jako hlavní metriku stejnou konverzi (odeslaný formulář), takže potřebují stejný vzorek. Hypotéza 3 má jako vedlejší metriku `cta_click`, jehož výchozí míru zatím neznáme (z Umami jsou jen testovací návštěvy). Až bude známá, dá se pro ni vzorek přepočítat. Hypotéza 1 navíc předpokládá doručování e-mailů (zatím chybí).

**Ověření třemi způsoby:**
1. Vzorec pro dva podíly s normální aproximací (skript): 7 117 a 1 967.
2. Simulace 10 000 testů se stejným z-testem (`--sim`): síla 80,0 % a 79,7 %.
3. Pro kontrolu i aproximace přes arkussinus (Cohenovo h): 7 098 a 1 950 na variantu.

**Závěr:** s rozpočtem 10 000 Kč týdně trvá jeden test na změnu o 25 % přes půl roku a stojí 27× víc, než je týdenní rozpočet. Všechny tři testy za sebou by trvaly přes 1,5 roku. Doporučení:
- testovat postupně podle očekávaného dopadu (hypotéza 1, pak 2, pak 3), ne souběžně, protože souběh dělí provoz;
- testovat jen velké změny: při změně o 50 % stačí 52 dní; malé úpravy (barva, text tlačítka) při tomto provozu měřitelné nejsou;
- nebo zvýšit rozpočet: délka testu klesá úměrně rozpočtu.

