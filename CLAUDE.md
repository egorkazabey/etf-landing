# ETF landing page (zadání B)

Plné zadání: [docs/zadani.md](docs/zadani.md)

## Cíl

Konverzní landing page, která funguje jako lead magnet: porovnání ETF obchodovaných na NYSE pro českého drobného investora. Návštěvník přichází z reklamy na mobilu a stránce věnuje jen několik sekund. Stránka mu musí nabídnout zřejmou hodnotu a výměnou za ni získat kontakt.

## Hlavní kritérium

**Dala by se na stránku zítra pustit reklama?**

Každé rozhodnutí (texty, design, data, formulář, měření) se posuzuje touto otázkou. Pěkný design nestačí, stránka musí přinášet kontakty a nesmí vypadat jako výchozí výstup od Claude.

## Co musí být v repozitáři při odevzdání

- [ ] Veřejná URL stránky na bezplatném hostingu (např. Vercel)
- [ ] Kód s průběžnou historií commitů
- [ ] Obě verze reklamy
- [ ] Skutečná data s uvedením zdroje a data získání
- [ ] Měření celé cesty od příchodu po odeslání formuláře
- [ ] Obsah odměny, kterou návštěvník dostane po odeslání formuláře
- [ ] README:
  - [ ] jak jsem pracoval s AI (pokyny pro agenty, kontrola výstupu, kde se agent spletl)
  - [ ] rozhodnutí u nejasností v zadání a jejich zdůvodnění
  - [ ] cílová skupina, co návštěvník dostane za kontakt a kdy o něj žádáme
  - [ ] zdůvodnění pořadí sekcí
  - [ ] očekávaná konverze (s benchmarkem a zdrojem)
  - [ ] tři hypotézy na A/B test seřazené podle očekávaného dopadu
  - [ ] co v řešení chybí
- [ ] `ai-log/` s exporty konverzací z Claude Code (`/export`)

## Termín

Odevzdání **pátek 16. 10. 2026**: odkaz na veřejný repozitář na GitHubu a URL stránky. Pátek je rezerva, práce má být hotová ve čtvrtek.

## Pravidla práce

1. **Před každým větším krokem plán a čekat na schválení.** Bez schválení nezačínat implementaci.
2. **Po každém kroku commit a push.** Commit zprávy vždy anglicky. Dokumenty a texty stránky česky.
3. **Žádná čísla z paměti modelu.** U každého údaje (poplatky, výkonnost, velikost fondu, benchmarky, statistiky) uvést zdroj a datum získání. Když zdroj nemám, číslo nepoužít.
4. **Chyby agenta zapisovat do [docs/ai-notes.md](docs/ai-notes.md):** co agent udělal špatně, jak jsem to odhalil a jak se to opravilo. Je to podklad pro README.
5. **V textech nepoužívat dlouhé pomlčky** (en dash U+2013, em dash U+2014). Použít spojovník, čárku, dvojtečku nebo větu přeformulovat. Kontrola (funguje na macOS, prázdný výstup = v pořádku):
   ```sh
   perl -CSD -ne 'print "$ARGV:$.: $_" if /[\x{2013}\x{2014}]/; close ARGV if eof' CLAUDE.md README.md docs/*.md
   ```
   Při práci na stránce přidat do kontroly i zdrojové soubory s texty.
6. **Export konverzace na konci každé fáze.** Agent na konci fáze připomene, uživatel spustí `/export ai-log/NN-nazev.txt` (např. `ai-log/00-zalozeni.txt`, `ai-log/01-strategie.txt`), agent export commitne a pushne.
7. **Vizuální styl vždy nejdřív ke schválení, teprve potom kód.** Stránka nesmí vypadat jako výchozí výstup od Claude.
8. **Tajné údaje nikdy nevypisovat.** Export konverzace jde do veřejného repozitáře. Agent nikdy nečte ani nevypisuje obsah `.env`, `DATABASE_URL` ani jiné klíče a hesla: ani v příkazech, ani ve výstupech, ani v commitech. `.env` vytváří a spravuje jen uživatel. Agent smí ověřit jen to, že proměnná existuje (např. `test -n "$DATABASE_URL" && echo nastaveno`), nikdy její hodnotu. Kód čte tajné údaje jen z proměnných prostředí. V repozitáři je jen `.env.example` s názvy proměnných bez hodnot.

## Harmonogram

Každá fáze končí commitem, pushem a exportem `ai-log/NN-nazev.txt`.

| Fáze | Kdy | Obsah | Výstup v repozitáři |
|---|---|---|---|
| 0. Založení | po 12. 10. večer | zadání, pravidla, harmonogram, git | `docs/zadani.md`, `CLAUDE.md`, `docs/ai-notes.md`, `ai-log/00-zalozeni.txt` |
| 1. Strategie a data | út 13. 10. | cílová skupina; co návštěvník dostane za kontakt a kdy o něj požádat; výběr ETF a interaktivních prvků; sběr skutečných dat (zdroj + datum); ruční kontrola čísel proti zdroji; benchmark konverze lead magnet stránek ve financích se zdrojem; krátký pohled na konkurenci v ČR; texty obou reklam | `docs/strategie.md` (vč. konkurence a benchmarku), `docs/reklamy.md`, `data/` + `docs/zdroje-dat.md` (zdroje, data, výsledek ruční kontroly), `ai-log/01-strategie.txt` |
| 2. Stránka | st 14. 10. | nejdřív návrh vizuálního stylu ke schválení (typografie, barvy, tón, odlišení od generického vzhledu); pak stack, sekce, texty, interaktivní prvek, formulář s minimem polí napojený na backend, měření eventů celé cesty, stav po odeslání, skutečně vytvořený obsah odměny (ne jen nápad), mobile first, nasazení náhledu | `docs/vizualni-styl.md`, kód stránky, odměna (např. v `public/`), `docs/mereni.md` (tracking plán), náhledová URL, `ai-log/02-stranka.txt` |
| 3. Kontrola, reklamy, produkce | čt 15. 10. | proklikání celého funnelu na mobilu a ověření v analytice, rychlost a přístupnost, vizuály obou reklam, produkční nasazení, koncept README | `ads/`, produkční URL, záznam kontroly funnelu v `docs/mereni.md`, `README.md` (koncept), `ai-log/03-kontrola.txt` |
| 4. Rezerva a odevzdání | pá 16. 10. | dodělání, finální kontrola podle checklistu výše, dokončení README | finální `README.md`, `ai-log/04-odevzdani.txt`, odkaz na repo + URL |

Stránka bez funkčního formuláře a měření eventů není hotová, proto obojí patří do fáze 2.
