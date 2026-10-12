# Poznámky k práci s AI

Podklad pro sekci README o tom, jak jsem pracoval s AI: kde se agent spletl, jak jsem chybu odhalil a jak se opravila.

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
