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
