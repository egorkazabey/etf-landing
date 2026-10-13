# Poznámky k práci s AI

Podklad pro sekci README o tom, jak jsem pracoval s AI: kde se agent spletl, jak jsem chybu odhalil a jak se opravila.

## Metoda kontroly

Výstupy agenta (plány, dokumenty, data) kontroluji s druhou instancí Claude v chatu, která nevidí kontext agenta: dostane jen výstup a zadání. Námitky obou instancí posuzuji a o úpravách rozhoduji já. Čísla proti zdrojům kontroluje také druhá instance Claude (ne člověk), výsledek je v tabulce v [zdroje-dat.md](zdroje-dat.md).

## Formát záznamu

```
### N. Krátký název
- Datum a fáze:
- Chyba agenta:
- Jak jsem ji odhalil:
- Oprava:
```

## Záznamy

### 1. Příkaz, který na macOS nefunguje
- Datum a fáze: 12. 10. 2026, fáze 0 (založení)
- Chyba agenta: v plánu navrhl kontrolu dlouhých pomlček přes `grep -P`. BSD grep na macOS volbu `-P` nepodporuje, kontrola by vůbec neproběhla.
- Jak jsem ji odhalil: při revizi plánu před schválením.
- Oprava: kontrola přes `perl` (příkaz je v CLAUDE.md).

### 2. Formulář a měření odsunuté na konec
- Datum a fáze: 12. 10. 2026, fáze 0 (založení)
- Chyba agenta: v harmonogramu odsunul napojení formuláře a měření eventů až na čtvrtek a export konverzací až na pátek.
- Jak jsem ji odhalil: při revizi plánu. Stránka bez funkčního formuláře a měření není hotová a export má být průběžný, ne na poslední chvíli.
- Oprava: formulář a měření přesunuty do fáze 2 spolu se stránkou, ve čtvrtek už jen kontrola funnelu. Export na konci každé fáze.

### 3. Hypotéza z paměti, která pro ČR neplatí
- Datum a fáze: 12. 10. 2026, fáze 1 (strategie a data)
- Chyba agenta: v plánu fáze 1 vycházel z předpokladu, že drobný investor v EU americká ETF kvůli PRIIPs koupit nemůže. Kdyby se to bez ověření propsalo do stránky a reklamy ("VOO z Česka nekoupíte"), bylo by to pro klienty Fio nepravdivé.
- Jak jsem ji odhalil: plán ji označil jako hypotézu k ověření a průzkum začal právě u ní. Stanovisko ČNB (Q&A k PRIIPs, 2018) říká, že obchodník, který jen provádí pokyny, není povinen KID předat; Fio na tom staví a US ETF zpřístupňuje. DEGIRO, XTB (mimo CFD) a Trading 212 je naopak blokují.
- Oprava: ve strategii je stav popsaný přesně ("záleží na brokerovi"), ne zjednodušeně.

### 4. Kalkulačka postavená na rozdílu, který v korunách nic neznamená
- Datum a fáze: 12. 10. 2026, fáze 1 (strategie a data)
- Chyba agenta: navrhl kalkulačku a reklamu A postavené na rozdílu poplatků SPY (0,0945 %) a VOO (0,03 %) a v reklamě poměr "víc než 3× jiný poplatek". Při 2 000 Kč měsíčně a 20 letech je to rozdíl asi 3 100 Kč (bez zhodnocení). Na stránce by to vyznělo jako zklamání a poměr bez absolutní částky působí zavádějícím dojmem.
- Jak jsem ji odhalil: při revizi návrhu rozhodnutí (s druhou instancí Claude). Přepočet na koruny pro typický měsíční vklad.
- Oprava: kalkulačka srovnává VOO, UCITS fond se stejným indexem a průměrný akciový fond v EU (průběžné náklady 1,38 % podle ESMA 2025, ne z paměti). Reklama A uvádí absolutní částky v Kč (asi 1 400 Kč vs. asi 61 000 Kč). Pod výsledkem je uvedeno, že jde jen o roční náklady fondu bez poplatků brokera.

### 5. Text reklamy jako investiční doporučení
- Datum a fáze: 12. 10. 2026, fáze 1 (strategie a data)
- Chyba agenta: v reklamě B navrhl text "Tady je, co koupit místo něj". Je to formulace investičního doporučení, přestože agent sám o pár odstavců dříve citoval stanovisko ČNB RS2018-08 o hranici mezi informací a doporučením. Pravidlo z rešerše nepřenesl do vlastních textů.
- Jak jsem ji odhalil: při revizi návrhu reklam (s druhou instancí Claude).
- Oprava: reklama B je přeformulovaná na srovnání ("evropský fond na stejný index"). Do strategie přibylo pravidlo "srovnáváme, nedoporučujeme" s tabulkou zakázaných a povolených formulací. Platí pro stránku, tahák, e-mail i reklamy.

### 6. Výchozí evropský fond v kalkulačce zkresluje srovnání
- Datum a fáze: 12. 10. 2026, fáze 1 (strategie a data)
- Chyba agenta: v kalkulačce nastavil jako výchozí evropský fond VUAA (TER 0,07 %), přestože ve vlastních datech měl SPYL se stejným TER jako VOO (0,03 %). Výsledek by vyzněl tak, že evropská verze je vždy dražší než americká, a to neplatí. Stejný problém měl koncept vizuálu reklamy B (VOO vs. VUAA). Navíc výběr jednoho konkrétního fondu jako výchozího může působit jako doporučení.
- Jak jsem ji odhalil: při kontrole čísel druhou instancí Claude (recenzent bez kontextu agenta).
- Oprava: agent navrhl místo jednoho fondu ukazovat rozsah evropských fondů na S&P 500 (0,03 až 0,07 %, fondy v neutrálním pořadí). Uživatel schválil 12. 10. 2026, promítnuto do [strategie.md](strategie.md) a [reklamy.md](reklamy.md).

### 7. Hodnota z benchmarku označená jako medián bez opory ve zdroji
- Datum a fáze: 12. 10. 2026, fáze 1 (strategie a data)
- Chyba agenta: u Unbounce, podkategorie investování (3,9 %) ve strategii psal "medián?" a v návrhu rozhodnutí ji v chatu nazval mediánem. Stránka Unbounce u této hodnoty neuvádí, zda jde o medián, nebo průměr.
- Jak jsem ji odhalil: při kontrole zdrojů druhou instancí Claude.
- Oprava: v [strategie.md](strategie.md) je u hodnoty uvedeno, že zdroj typ statistiky neuvádí.

### 8. Tvrzení o registraci v ČR rozšířené na neověřený fond
- Datum a fáze: 12. 10. 2026, fáze 2 (návrh vizuálního stylu)
- Chyba agenta: v náhledu obrazovky B napsal u všech tří evropských fondů (CSPX, SPYL, VUAA) "registrované v ČR podle emitentů". Recenzent to ověřil jen u CSPX a SPYL, u VUAA je v tabulce kontroly "neověřeno". Agent převzal hodnotu z CSV a tabulku kontroly přehlédl.
- Jak jsem ji odhalil: při revizi náhledu proti tabulce kontroly v [zdroje-dat.md](zdroje-dat.md).
- Oprava: agent registraci VUAA ověřil na stránce Vanguardu (Fund facts, "Register countries", v seznamu "Czech Republic") a zapsal to do [zdroje-dat.md](zdroje-dat.md) s datem a místem na stránce.

### 9. Lišta s výzvou a texty v rozporu se schválenou strategií
- Datum a fáze: 12. 10. 2026, fáze 2 (návrh vizuálního stylu)
- Chyba agenta: v náhledu dal pevnou lištu s výzvou hned od načtení, přestože strategie říkala "až po zobrazení výsledku", a rozpor neuvedl mezi odchylkami. V liště navíc slíbil "pošleme na e-mail", přestože doručení e-mailem nebylo rozhodnuté a strategie jako hlavní cestu uváděla stažení PDF.
- Jak jsem ji odhalil: při revizi náhledu proti [strategie.md](strategie.md).
- Oprava: strategie upřesněná a zdůvodněná (výsledek je vidět bez interakce, proto lišta od načtení), lišta až po interakci zapsaná jako hypotéza na A/B test. Texty opravené na "zdarma, stáhnete hned".

### 10. Obrazovka B "se vejde", ale na pár vteřin je moc hutná
- Datum a fáze: 12. 10. 2026, fáze 2 (návrh vizuálního stylu)
- Chyba agenta: kontroloval jen to, jestli se obsah vejde do 375 × 667 (screenshot z headless Chrome), ne jestli se dá přečíst za pár vteřin. Nadpis měl 4 řádky a poznámka s hvězdičkou byla těsně nad lištou, v mém prohlížeči pod ní.
- Jak jsem ji odhalil: při otevření náhledu v prohlížeči.
- Oprava: nadpis zkrácený na doslovný titulek reklamy B ("VOO vedle evropského fondu na stejný index", 2 řádky), hvězdička nahrazená popiskem přímo pod číslem, poznámka je s rezervou nad lištou.

### 11. Dvě stejné výzvy na první obrazovce a sbalené sekce, které nevypadají klikatelně
- Datum a fáze: 12. 10. 2026, fáze 2 (stránka)
- Chyba agenta: pod kalkulačkou i pod srovnáním nechal tlačítko "Stáhněte si srovnání... v PDF", přestože stejnou výzvu nese pevná lišta. Na první obrazovce A tak byly dvě stejné výzvy a tlačítko bylo napůl pod lištou. Sbalené sekce (`details`) měly skrytou výchozí značku a nic nenaznačovalo, že jdou rozbalit. Agent měl screenshoty 375 × 667 a hlásil "všechno nad lištou", ale kontroloval jen, jestli se obsah vejde, ne jestli se výzvy neopakují a jestli jsou ovládací prvky poznat.
- Jak jsem ji odhalil: při vlastní kontrole stránky na 375 × 667.
- Oprava: tlačítka pod prvky odstraněna, k formuláři vede jen lišta (strategie upravená). Sbalené sekce mají vpravo čtvercovou značku "+", po rozbalení "−" (znak minus) na černém poli.

### 12. Skok z lišty k formuláři rozbitý přidáním náhledu PDF
- Datum a fáze: 12. 10. 2026, fáze 2 (stránka, krok 5)
- Chyba agenta: v kroku 2 nastavil lištu tak, že posune na začátek sekce s odměnou a dá fokus do pole e-mailu bez dalšího posunu. V kroku 4 přidal mezi nadpis a formulář náhled PDF a chování lišty znovu neověřil. Pole s fokusem tak bylo mimo obrazovku; na mobilu by vyskočila klávesnice nad skrytým polem.
- Jak jsem ji odhalil: agent sám, při testu měření v kroku 5: event `form_view` přišel až po `form_start`, což při správném chování nejde.
- Oprava: lišta posune tak, aby byl vidět celý formulář a nad ním spodek náhledu, bez automatického fokusu. Ověřeno screenshotem na 375 × 667.

### 13. Testovací návštěva odeslaná do skutečného Umami
- Datum a fáze: 12. 10. 2026, fáze 2 (stránka, krok 5)
- Chyba agenta: test měl zachytávat požadavky na `cloud.umami.is/api/send`, ale skript posílá na `gateway.umami.is`. Ladicí běh, který nic nezachytával, poslal do produkčního Umami jedno zobrazení stránky z testovací domény `etf.test`.
- Jak jsem ji odhalil: agent sám, z výpisu síťových požadavků při ladění.
- Oprava: test zachytává vše na `*.umami.is/api/send` a vypisuje, že nic neodešlo. Záznam z `etf.test` je popsaný v [mereni.md](mereni.md) k vyfiltrování; na produkci se měření omezí atributem `data-domains`.

### 14. Bílý pruh pod patičkou po skrytí lišty a stránka nepromyšlená pro desktop
- Datum a fáze: 13. 10. 2026, fáze 3 (kontrola)
- Chyba agenta: místo pro pevnou lištu držel `padding-bottom` na `body` s bílým pozadím. Když lišta zajela (u formuláře a po odeslání), zůstal pod černou patičkou bílý pruh 68 px. Agent kontroloval jen první obrazovku a formulář, konec stránky ve stavu se skrytou lištou ne. Stránku navíc testoval jen na šířce 375 px, i když ji hodnotitel nejspíš otevře na počítači.
- Jak jsem ji odhalil: při testu na iPhonu (Safari i prohlížeč v aplikaci). Desktop při úvaze, kdo bude stránku hodnotit.
- Oprava: místo pro lištu je v odsazení patičky (černé) a `html` má černé pozadí, takže pod patičkou není bílá ani při pružení stránky na iOS. Ověřeno měřením v headless Chrome na 375 × 667 a 390 × 844 ve stavech lišta viditelná, skrytá u formuláře a po odeslání (spodní hrana patičky = spodní hrana okna). Desktop od 1024 px viz [vizualni-styl.md](vizualni-styl.md), sekce 8.

### 15. Neviditelná lišta v pořadí fokusu a pořadí sekcí u B jen v CSS
- Datum a fáze: 13. 10. 2026, fáze 3 (kontrola přístupnosti); chyby vznikly ve fázi 2
- Chyba agenta: skrytou lištu jen vysunul transformací z obrazovky, takže odkaz "Chci PDF" zůstal dostupný tabulátorem i čtečce obrazovky. Pořadí sekcí u reklamy B změnil jen vlastností CSS `order`, takže klávesnice a čtečka šly v jiném pořadí, než jaké bylo vidět. Testoval jen dotykové ovládání.
- Jak jsem ji odhalil: agent sám, při kontrole přístupnosti průchodem tabulátorem (axe-core ani Lighthouse ani jednu chybu nenašly).
- Oprava: skrytá lišta má po dojetí `visibility: hidden`, u B skript přesune srovnání i v DOM. Detail v [kontrola.md](kontrola.md).
