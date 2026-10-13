# Reklamy (Instagram a Facebook, mobil)

Dvě verze s jiným úhlem. Vizuály a podklady pro Ads Manager jsou v [ads/](../ads/README.md) (fáze 3, 13. 10. 2026). Všechna čísla mají zdroj v [strategie.md](strategie.md) a [zdroje-dat.md](zdroje-dat.md).

**Společná pravidla**
- Formáty podle Meta Ads Guide (ověřeno 13. 10. 2026): Feed 4:5 (1440 × 1800) a Stories/Reels 9:16 (1440 × 2560, volné asi 14 % nahoře, 35 % dole a 6 % po stranách). Zdroje v [ads/README.md](../ads/README.md).
- Texty srovnávají a nic nedoporučují (pravidlo v [strategie.md](strategie.md), sekce Rozhodnutí).
- Žádné sliby výnosu. Čísla v korunách počítáme **bez zhodnocení**, jsou to jen náklady fondu.
- Odkaz na stránku obsahuje `utm_source=meta&utm_medium=paid_social&utm_campaign=etf_srovnani&utm_content=a_naklady` (nebo `b_srovnani`). Podle `utm_content` se přepne text v hlavičce stránky.

---

## Reklama A: náklady v korunách

**Úhel:** pro Čecha není velký rozdíl mezi dvěma levnými ETF, ale mezi levným ETF a běžným akciovým fondem. Ukazujeme absolutní částky v Kč.

**Výpočet za reklamou:** 2 000 Kč měsíčně, 20 let, bez zhodnocení. Náklady fondu jsou asi 1 440 Kč u ETF na S&P 500 s TER 0,03 % (VOO, SPYL) a asi 61 170 Kč u průměrného akciového fondu v EU s průběžnými náklady 1,38 % (ESMA, 3. 3. 2026). V reklamě jsou čísla zaokrouhlená dolů.

| Prvek | Text |
|---|---|
| Primární text | Spoříte 2 000 Kč měsíčně? Za 20 let zaplatíte jen na nákladech fondu asi 1 400 Kč u ETF na index S&P 500 (0,03 % ročně). U průměrného akciového fondu v EU je to asi 61 000 Kč (1,38 % ročně podle ESMA). A to i kdyby se vaše peníze vůbec nezhodnotily. Spočítejte si to pro svou částku. |
| Titulek | 1 400 Kč, nebo 61 000 Kč? |
| Popis | Kalkulačka nákladů fondů. Zdarma, bez registrace. |
| Tlačítko | Learn more (přesný český popisek ověříme v Ads Manageru) |

**Vizuál (hotový, [ads/a-feed-4x5.png](../ads/a-feed-4x5.png)):** změna proti konceptu schválená 13. 10. 2026: nahoře velká otázka "Kolik vás stojí samotný fond?" jako háček, protože ve Feedu člověk vidí nejdřív obrázek a text reklamy často nečte. Pod ní "2 000 Kč měsíčně, 20 let, i bez zhodnocení" a dva řádky jako výsledek kalkulačky na stránce. Původní koncept: dvě čísla pod sebou přes celou plochu: "1 400 Kč" (malý sloupec) a "61 000 Kč" (vysoký sloupec), nad nimi "2 000 Kč měsíčně, 20 let, jen náklady fondu". Dole drobně "ETF na S&P 500, TER 0,03 % / průměrný akciový fond v EU, 1,38 % (ESMA 2026). Bez poplatků brokera a daní." Žádné grafy růstu ani fotky lidí s mobilem.

**Navazující první obrazovka (`utm_content=a_naklady`):**
- Nadpis: "Kolik vás za 20 let stojí samotný fond?"
- Bez podnadpisu (změna schválená 12. 10. 2026). Původně "2 000 Kč měsíčně: asi 1 400 Kč u ETF, asi 61 000 Kč u průměrného akciového fondu. Zadejte svou částku." Stejná čísla ukazuje výsledek kalkulačky hned pod nadpisem a podnadpis by ho odsunul pod ohyb.
- Hned pod nadpisem kalkulačka s předvyplněnými hodnotami 2 000 Kč a 20 let, výsledek je vidět bez scrollování.

---

## Reklama B: US ETF vedle evropského fondu se stejným indexem

**Úhel:** návštěvník zná VOO nebo SPY ze sociálních sítí. Ukazujeme mu fakta: kde fond kótuje, jestli ho v ČR koupí, a že na stejný index existuje evropský fond. Nic mu nedoporučujeme, srovnáváme.

**Fakta za reklamou:** VOO a SPY jsou kótované na NYSE Arca. U Fio jdou US ETF koupit (7,95 USD za obchod), DEGIRO je bez KID nenabízí, XTB jen jako CFD. Evropské fondy na S&P 500: CSPX (0,07 %), SPYL (0,03 %), VUAA (0,07 %), podle stránek emitentů všechny registrované v ČR.

| Prvek | Text |
|---|---|
| Primární text | Vídáte na Instagramu VOO nebo SPY? Jsou to americké fondy z burzy NYSE Arca a ne každý broker dostupný v Česku vám je prodá. Na stejný index S&P 500 existují i evropské fondy. Dali jsme je vedle sebe: náklady, velikost, kde je v Česku koupíte. |
| Titulek | VOO vedle evropského fondu na stejný index |
| Popis | Srovnání podle dat emitentů, říjen 2026. |
| Tlačítko | Learn more (přesný český popisek ověříme v Ads Manageru) |

**Vizuál (hotový, [ads/b-feed-4x5.png](../ads/b-feed-4x5.png)):** změna proti konceptu schválená 13. 10. 2026: dvě karty se čtyřmi řádky byly na Feed moc hutné. Nahoře velká otázka "Koupíte VOO z Česka?", pod ní VOO a "evropský fond na stejný index" jen s TER. Odpověď na otázku je na stránce (řádek "Koupím ho z Česka?"). Původní koncept: dvě "karty" fondů vedle sebe jako ve srovnávači: vlevo "VOO, NYSE Arca, USA, TER 0,03 %", vpravo "Evropské fondy na S&P 500, Irsko, TER 0,03 až 0,07 %", obě s indexem "S&P 500". Žádný konkrétní evropský fond se v reklamě nevyzdvihuje. Mezi nimi znak "vs". Dole "Koupíte ho z Česka? Srovnání brokerů uvnitř."

**Navazující první obrazovka (`utm_content=b_srovnani`):**
- Nadpis: "VOO vedle evropského fondu na stejný index", doslova titulek reklamy (změna schválená 12. 10. 2026). Původní "VOO, SPY a evropské fondy na stejný index vedle sebe" měl na mobilu 4 řádky.
- Podnadpis: "U Fio ano, u DEGIRO ne, u XTB jen jako CFD. Vedle něj evropský fond na stejný index." (změna schválená 13. 10. 2026: obrázek B se ptá "Koupíte VOO z Česka?" a první obrazovka na to má hned odpovědět. Jen ověření brokeři z [data/brokeri.csv](../data/brokeri.csv), text se skládá z dat a hlídá ho `npm run check`. Předtím: "Náklady, velikost a kde je v Česku koupíte. Data od emitentů.")
- Hned pod tím přepínač amerického fondu (VOO / SPY / IVV) a srovnání s evropskými fondy na S&P 500 (CSPX, SPYL, VUAA abecedně) včetně řádku "Koupím ho z Česka?".

---

## Výchozí hlavička (bez `utm_content` nebo s neznámou hodnotou)

Použije se verze reklamy A. Kalkulačka je hlavní prvek stránky a funguje i pro návštěvníky, kteří nepřišli z reklamy.

## Otevřené body

- Pravidla Meta pro finanční reklamy jsme neověřili (omezení do README). Před spuštěním je potřeba projít [Financial and Insurance Products and Services](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/).
- Formáty a bezpečné zóny ověřeny 13. 10. 2026 (viz [ads/README.md](../ads/README.md)). Titulek B má 42 znaků, Meta doporučuje do 40.
