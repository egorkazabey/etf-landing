# Strategie

Stav: **krok A (zjištění) hotový, krok B (rozhodnutí) čeká na schválení.**

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
| DEGIRO | **Ne.** ETF bez KID v místním jazyce "can generally not offer". Existující pozice lze držet a prodat. | [degiro.cz helpdesk, PRIIPs](https://www.degiro.cz/helpdesk/trading-possibilities/impact-new-priips-regulation) |
| XTB | **Jen jako CFD** (derivát), ne skutečný fond: "Obchodujte CFD na IEF.US". Skutečné akcie a ETF s 0 % poplatkem do obratu 100 000 EUR/měsíc (nad limit 0,2 %, min. 10 EUR), konverze měny až 0,5 %. | [xtb.com/cz/etf-cfd/ief-us](https://www.xtb.com/cz/etf-cfd/ief-us), [akcie.xtb.com](https://akcie.xtb.com/investujte-do-akcii-bez-poplatku) |
| Trading 212 | **Ne** na investičním účtu (US ETF jen "view only", obchodovatelné jen přes CFD). **NEOVĚŘENO** z oficiální nápovědy, jen z odpovědí na komunitním fóru Trading 212. | [community.trading212.com](https://community.trading212.com/t/why-no-us-listed-us-index-etfs-etps/55400) |
| Interactive Brokers | Podle IBKR knowledge base blokuje PRIIPs produkty bez KID pro retail. **NEOVĚŘENO**: stránka vrací HTTP 403, informace jen z výsledků vyhledávání. | [ibkr.info/de/node/3324](https://www.ibkr.info/de/node/3324) |
| Patria, Revolut, Portu | **NEOVĚŘENO**, nekontrolováno. | |

Licence brokerů v registru ČNB (JERRS) **NEOVĚŘENO**: registr je webová aplikace, kterou nelze načíst bez prohlížeče. K ruční kontrole.

### UCITS ekvivalenty jsou v ČR registrované

Emitenti uvádějí Českou republiku mezi zeměmi registrace u všech čtyř vybraných UCITS fondů (CSPX, VUAA, SPYL, VWCE). Zdroje v [data/etf.csv](../data/etf.csv).

### Burza: NYSE vs. NYSE Arca

Všechny vybrané US ETF (SPY, IVV, VOO, VTI, VT, VYM, AGG) jsou kótované na **NYSE Arca**, burze skupiny NYSE pro ETF. Zdroj: stránky emitentů (viz [zdroje-dat.md](zdroje-dat.md)). Fio to potvrzuje: NYSE Arca je "trh pro obchodování s ETF". Zadání říká "ETF obchodované na NYSE": vykládám jako skupinu NYSE včetně NYSE Arca (rozhodnutí do README).

### Daně

**Nezkoumáno.** Časový test a srážková daň u US vs. irských fondů se ověří z primárních zdrojů (zákon o daních z příjmů, Finanční správa), jen pokud se dostanou na stránku nebo do odměny.

## 2. Data ETF

Viz [data/etf.csv](../data/etf.csv) a [zdroje-dat.md](zdroje-dat.md). Nejzajímavější pro stránku:

- **Stejný index, různá cena:** SPY má TER 0,0945 %, IVV a VOO 0,03 %. Průměrná roční výkonnost za 10 let k 30. 9. 2026 (NAV): SPY 15,18 %, IVV 15,30 %, VOO 15,29 %. SPY tedy zaostal o 0,11 až 0,12 p. b. ročně, rozdíl v TER je 0,0645 p. b. Zbytek rozdílu má jinou příčinu, kterou jsem neověřoval, proto na stránce ukazovat jen TER a výkonnost, ne vysvětlení rozdílu.
- **UCITS S&P 500 pro Čechy:** SPYL 0,03 %, CSPX 0,07 %, VUAA 0,07 %.

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

**Meta Ad Library: NEOVĚŘENO.** Knihovna vrací HTTP 403 (vyžaduje prohlížeč). K ruční kontrole, dotazy:
- https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CZ&q=ETF&search_type=keyword_unordered
- totéž s `q=investování`, `q=Portu`, `q=Fondee`, `q=XTB`, `q=porovnejfondy`

**Mezera na trhu (pracovní závěr):** nikdo z nalezených neodpovídá na otázku "ETF z NYSE, které vidím na sociálních sítích (VOO, SPY): můžu je koupit z Česka a co místo nich?" a nikdo nemá lead magnet stavěný na mobil a reklamu.

## 5. Benchmark konverze

**Unbounce Conversion Benchmark Report 2024**: 41 000+ landing pages, 464 mil. návštěvníků, 57 mil.+ konverzí. Období dat neuvedeno ("in the past year"). Konverze zahrnuje kliky i formuláře. Zdroje: [přehled reportu](https://unbounce.com/conversion-benchmark-report/), [Finance & Insurance](https://unbounce.com/conversion-benchmark-report/finance-insurance-conversion-rate/).

| Ukazatel | Hodnota | Typ |
|---|---|---|
| všechna odvětví | 6,6 % | medián |
| finanční služby | 8,3 % | medián |
| finanční služby, podkategorie investování | 3,9 % | neoznačeno (medián?) |
| investování, nejlepší stránky | až 20,6 % | |
| finanční služby, provoz z Facebooku | 10,1 % | medián |
| finanční služby, provoz z Instagramu | 15,5 % | medián |
| finanční služby, mobil | 11,5 % | "average" |
| finanční služby, čtenost 5. až 7. třída | 18,1 % | medián |
| doporučená délka stránky | 195 až 715 slov | |

**Výhrady:** (1) Unbounce počítá i konverze typu klik, my měříme odeslaný formulář, reálná čísla budou nižší. (2) Investování je nejbližší podkategorie a je výrazně pod průměrem financí. (3) Jediný primární zdroj; ostatní "2026 benchmarky" v článcích jsou převyprávěná data Unbounce.

Tři varianty očekávané konverze navrhnu v kroku B.

## 6. Regulace obsahu a pravidla reklamy

- **Investiční doporučení vs. poradenství**, [ČNB RS2018-08](https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2018-08) (25. 5. 2018): doporučení může být osobní i když jde více lidem najednou (např. e-mailem), pokud je prezentované jako vhodné pro danou osobu. Příklady z ČNB: "tento produkt je pro Vás nejlepším řešením Vašich financí", nepřímo "lidé Vám podobní si pořizují tento produkt" nebo doporučení založené na okolnostech osoby.
- **Důsledek pro stránku:** kalkulačka a srovnání můžou ukazovat fakta (poplatky, dopad TER) pro zadanou částku. **Nesmí** vybrat "váš ETF" podle odpovědí návštěvníka. Kvíz typu "který ETF je pro vás" vypadá jako poradenství, nepoužít.
- **Meta, pravidla pro finanční produkty: NEOVĚŘENO.** Stránka [Financial and Insurance Products and Services](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/) se bez prohlížeče nenačte. Z výsledků vyhledávání: investiční produkty mohou v některých zemích vyžadovat licenci, CFD a binární opce jsou zakázané. K ruční kontrole před spuštěním reklamy.

---

# Rozhodnutí

Doplní se v kroku B po schválení.
