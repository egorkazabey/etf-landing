# Reklamy (Instagram a Facebook, mobil)

Dvě verze s jiným úhlem. Vizuály vzniknou ve fázi 3 (`ads/`). Všechna čísla mají zdroj v [strategie.md](strategie.md) a [zdroje-dat.md](zdroje-dat.md).

**Společná pravidla**
- Formáty: Feed 4:5 (1080 × 1350) a Stories/Reels 9:16 (1080 × 1920). Rozměry jsou pracovní, při tvorbě vizuálů je ověříme v dokumentaci Meta.
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

**Vizuál (koncept):** dvě čísla pod sebou přes celou plochu: "1 400 Kč" (malý sloupec) a "61 000 Kč" (vysoký sloupec), nad nimi "2 000 Kč měsíčně, 20 let, jen náklady fondu". Dole drobně "ETF na S&P 500, TER 0,03 % / průměrný akciový fond v EU, 1,38 % (ESMA 2026). Bez poplatků brokera a daní." Žádné grafy růstu ani fotky lidí s mobilem.

**Navazující první obrazovka (`utm_content=a_naklady`):**
- Nadpis: "Kolik vás za 20 let stojí samotný fond?"
- Podnadpis: "2 000 Kč měsíčně: asi 1 400 Kč u ETF, asi 61 000 Kč u průměrného akciového fondu. Zadejte svou částku."
- Hned pod tím kalkulačka s předvyplněnými hodnotami 2 000 Kč a 20 let, výsledek je vidět bez scrollování.

---

## Reklama B: US ETF vedle evropského fondu se stejným indexem

**Úhel:** návštěvník zná VOO nebo SPY ze sociálních sítí. Ukazujeme mu fakta: kde fond kótuje, jestli ho v ČR koupí, a že na stejný index existuje evropský fond. Nic mu nedoporučujeme, srovnáváme.

**Fakta za reklamou:** VOO a SPY jsou kótované na NYSE Arca. U Fio jdou US ETF koupit (7,95 USD za obchod), DEGIRO je bez KID nenabízí, XTB jen jako CFD. Evropské fondy na S&P 500: SPYL (0,03 %), VUAA a CSPX (0,07 %), všechny registrované v ČR.

| Prvek | Text |
|---|---|
| Primární text | Vídáte na Instagramu VOO nebo SPY? Jsou to americké fondy z burzy NYSE Arca a ne každý broker dostupný v Česku vám je prodá. Na stejný index S&P 500 existují i evropské fondy. Dali jsme je vedle sebe: náklady, velikost, kde je v Česku koupíte. |
| Titulek | VOO vedle evropského fondu na stejný index |
| Popis | Srovnání podle dat emitentů, říjen 2026. |
| Tlačítko | Learn more (přesný český popisek ověříme v Ads Manageru) |

**Vizuál (koncept):** dvě "karty" fondů vedle sebe jako ve srovnávači: vlevo "VOO, NYSE Arca, USA, TER 0,03 %", vpravo "VUAA, Irsko, TER 0,07 %", obě s indexem "S&P 500". Mezi nimi znak "vs". Dole "Koupíte ho z Česka? Srovnání brokerů uvnitř."

**Navazující první obrazovka (`utm_content=b_srovnani`):**
- Nadpis: "VOO, SPY a evropské fondy na stejný index vedle sebe"
- Podnadpis: "Náklady, velikost a kde je v Česku koupíte. Data od emitentů k říjnu 2026."
- Hned pod tím přepínač karet (VOO vs. VUAA) s řádkem "Koupím ho z ČR?".

---

## Výchozí hlavička (bez `utm_content` nebo s neznámou hodnotou)

Použije se verze reklamy A. Kalkulačka je hlavní prvek stránky a funguje i pro návštěvníky, kteří nepřišli z reklamy.

## Otevřené body

- Pravidla Meta pro finanční reklamy jsme neověřili (omezení do README). Před spuštěním je potřeba projít [Financial and Insurance Products and Services](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/financial-services/).
- Formáty a bezpečné zóny ověříme při tvorbě vizuálů ve fázi 3.
