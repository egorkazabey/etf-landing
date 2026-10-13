# Reklamy pro Ads Manager

Dvě reklamy (A a B), každá pro Feed a pro Stories/Reels. Všechno potřebné pro zadání v Meta Ads Manageru je níže. Zdůvodnění úhlů, výpočty a návaznost na stránku: [docs/reklamy.md](../docs/reklamy.md).

## Společné nastavení

| | |
|---|---|
| Cíl kampaně | leady na webu (konverze = odeslaný formulář, event `lead_saved` v Umami, viz [docs/mereni.md](../docs/mereni.md)) |
| Umístění | Instagram a Facebook: Feed, Stories, Reels. Feed dostane PNG 4 : 5, Stories a Reels PNG 9 : 16. |
| Tlačítko | "Learn more" (přesný český popisek ověříme v Ads Manageru) |
| Stránka | https://etf-landing-sigma.vercel.app/ |

## Reklama A: náklady v korunách

| Prvek | Obsah |
|---|---|
| Primární text | Spoříte 2 000 Kč měsíčně? Za 20 let zaplatíte jen na nákladech fondu asi 1 400 Kč u ETF na index S&P 500 (0,03 % ročně). U průměrného akciového fondu v EU je to asi 61 000 Kč (1,38 % ročně podle ESMA). A to i kdyby se vaše peníze vůbec nezhodnotily. Spočítejte si to pro svou částku. |
| Titulek | 1 400 Kč, nebo 61 000 Kč? |
| Popis | Kalkulačka nákladů fondů. Zdarma, bez registrace. |
| Odkaz | `https://etf-landing-sigma.vercel.app/?utm_source=meta&utm_medium=paid_social&utm_campaign=etf_srovnani&utm_content=a_naklady` |
| Feed (4 : 5) | [a-feed-4x5.png](a-feed-4x5.png) |
| Stories, Reels (9 : 16) | [a-stories-9x16.png](a-stories-9x16.png) |

## Reklama B: VOO vedle evropského fondu

| Prvek | Obsah |
|---|---|
| Primární text | Vídáte na Instagramu VOO nebo SPY? Jsou to americké fondy z burzy NYSE Arca a ne každý broker dostupný v Česku vám je prodá. Na stejný index S&P 500 existují i evropské fondy. Dali jsme je vedle sebe: náklady, velikost, kde je v Česku koupíte. |
| Titulek | VOO vedle evropského fondu na stejný index |
| Popis | Srovnání podle dat emitentů, říjen 2026. |
| Odkaz | `https://etf-landing-sigma.vercel.app/?utm_source=meta&utm_medium=paid_social&utm_campaign=etf_srovnani&utm_content=b_srovnani` |
| Feed (4 : 5) | [b-feed-4x5.png](b-feed-4x5.png) |
| Stories, Reels (9 : 16) | [b-stories-9x16.png](b-stories-9x16.png) |

`utm_content` přepne první obrazovku stránky (A kalkulačka, B srovnání) a odliší reklamy v Umami i v databázi.

## Délky textů proti doporučení Mety

Meta Ads Guide (Instagram Feed, obrázek, ověřeno 13. 10. 2026) doporučuje primární text do 125 znaků a titulek do 40 znaků. Delší text se zkrátí a zbytek je pod "více".

| Text | Znaků | Poznámka |
|---|---|---|
| A primární | 283 | prvních 125 znaků obsahuje otázku i částku 1 400 Kč; 61 000 Kč už je za zkrácením, nese ho ale obrázek a titulek |
| A titulek | 25 | v pořádku |
| B primární | 243 | prvních 125 znaků obsahuje otázku, NYSE Arca a "ne každý broker vám je prodá" |
| B titulek | 42 | o 2 znaky nad doporučením, konec se může zkrátit. Doslova odpovídá nadpisu stránky B. |

## Vizuály

| Soubor | Rozměr | Obsah |
|---|---|---|
| `a-feed-4x5.png` | 1440 × 1800 | otázka "Kolik vás stojí samotný fond?", 2 000 Kč měsíčně, 20 let: ETF na S&P 500 1 400 Kč vs. průměrný akciový fond v EU 61 000 Kč |
| `a-stories-9x16.png` | 1440 × 2560 | totéž v bezpečném pásu |
| `b-feed-4x5.png` | 1440 × 1800 | otázka "Koupíte VOO z Česka?", VOO TER 0,03 % vs. evropský fond na stejný index TER 0,03 až 0,07 % |
| `b-stories-9x16.png` | 1440 × 2560 | totéž v bezpečném pásu |
| `kontrola/*-zony.png` | | stejné vizuály s vyznačenými bezpečnými zónami (jen pro kontrolu, nenahrávat) |

**Formáty a zóny** podle Meta Ads Guide, ověřeno 13. 10. 2026:
- Feed: 4 : 5, doporučeno 1440 × 1800, JPG nebo PNG ([Instagram Feed](https://www.facebook.com/business/ads-guide/update/image/instagram-feed), [Facebook Feed](https://www.facebook.com/business/ads-guide/update/image/facebook-feed)). Zóny Meta pro Feed neuvádí, držíme okraj 6 %.
- Stories a Reels: 9 : 16, doporučeno 1440 × 2560; "zhruba 14 % ... v horní části, 35 % ve spodní části a 6 % po obou stranách mělo zůstat volných" ([Instagram Stories](https://www.facebook.com/business/ads-guide/update/image/instagram-story), [Instagram Reels](https://www.facebook.com/business/ads-guide/update/image/instagram-reels)).

**Čísla** jsou z `public/data.js` a vzorce v `public/calc.js`, stejně jako na stránce a v PDF. Částky v A jsou zaokrouhlené dolů na 2 platné číslice (1 443 Kč na 1 400 Kč, 61 171 Kč na 61 000 Kč), jako v textu reklamy. Zdroj a datum jsou drobně přímo ve vizuálu.

**Jak vznikají:** `npm run ads` vygeneruje HTML zdroje v `ads/src/` a headless Chrome je vyfotí. Když by obsah přetekl z bezpečné zóny, skript PNG nevytvoří. `npm run check` hlídá, že zdroje odpovídají datům a PNG jsou vyfocené z aktuálních zdrojů.

## Před spuštěním

- Projít pravidla Meta pro finanční reklamy ([Financial and Insurance Products and Services](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/)). Neověřeno.
- Náhled všech umístění v Ads Manageru (zkrácení textů, překrytí tlačítkem).
- Vercel Hobby je jen pro nekomerční použití; placená kampaň potřebuje tarif Pro (viz [docs/vizualni-styl.md](../docs/vizualni-styl.md), Stack).
