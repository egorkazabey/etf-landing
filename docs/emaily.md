# E-maily po odeslání formuláře

Zapsáno 14. 10. 2026 (fáze 4). **Jen texty, nic se neodesílá.** Odesílání potřebuje vlastní doménu (viz [strategie.md](strategie.md), Zjištění 6) a dosazeného provozovatele (README, Chybí).

## Pravidla

- **Souhlas:** e-maily 2 a 3 smí odejít jen kontaktům se souhlasem. Souhlas zní "posílalo aktualizace srovnání a nová srovnání ETF", proto jsou oba e-maily srovnání, ne prodej. E-mail 1 je doručení odměny, o kterou si návštěvník řekl.
- **Srovnáváme, nedoporučujeme** ([strategie.md](strategie.md), Rozhodnutí, tabulka formulací). Žádné "kupte", "doporučujeme", "nejlepší", "pro vás". Personalizace jen u výpočtu ("pro částku, kterou jste zadali").
- **Čísla jen z dat:** fondy z [data/etf.csv](../data/etf.csv), průměry z [data/esma.csv](../data/esma.csv), brokeři jen ověření řádky z [data/brokeri.csv](../data/brokeri.csv), výpočet [public/calc.js](../public/calc.js). Data k 12. 10. 2026. `npm run check` hlídá, že částky v příkladech sedí s výpočtem a že v textech nejsou zakázané formulace.
- **Proměnné:** `{monthly}` a `{years}` jsou hodnoty z kalkulačky, uložené s kontaktem v databázi. Když chybí, použije se 2 000 Kč a 20 let (výchozí hodnoty stránky). `{rok}` je tvar slova podle počtu (rok, roky, let), jako na stránce. Příklady níže jsou pro výchozí hodnoty.
- **Patička každého e-mailu:**
  > Dostáváte to, protože jste na etf-landing-sigma.vercel.app požádali o srovnání ETF. Odhlásit se: {odkaz na odhlášení}. Správce údajů: {provozovatel}, {e-mail provozovatele}. Srovnání slouží pro informaci, nejde o investiční doporučení.

## 1. Hned: odkaz na PDF

**Cíl:** doručit odměnu i těm, kdo stránku zavřeli dřív, než PDF otevřeli, a ověřit, že adresa existuje (nedoručený e-mail = neplatný kontakt, metrika hypotézy 1).

**Předmět:** Vaše srovnání ETF v PDF

**Náhledový text:** VOO, SPY a evropské fondy na stejný index, 6 stran.

**Text:**

> Dobrý den,
>
> tady je srovnání, o které jste si řekli: {odkaz na PDF}
>
> Na 6 stranách najdete:
> - všech 7 fondů z NYSE Arca (VOO, SPY, IVV, VTI, VT, VYM, AGG) s náklady a velikostí,
> - 4 evropské fondy se stejným nebo podobným indexem s ISIN, podle kterého je najdete u brokera,
> - co umožňují brokeři DEGIRO, Fio a XTB podle jejich vlastních stránek,
> - jak číst TER a co kalkulačka nepočítá.
>
> Data jsou ze stránek emitentů a ESMA k 12. 10. 2026. Zdroj u každého čísla je na poslední straně.
>
> ETF v korunách

## 2. Den 3: náklady pro zadanou částku

**Cíl:** vrátit čtenáře k jeho vlastnímu výpočtu a ukázat celé rozpětí nákladů, které na stránce není vidět najednou. Měříme otevření a klik na odkaz na kalkulačku (s `utm_source=email&utm_content=den3`).

**Předmět:** Kolik z {monthly} Kč měsíčně spotřebuje fond za {years} {rok}

**Náhledový text:** Šest fondů na stejný index a průměr EU vedle sebe.

**Text** (příklad pro 2 000 Kč měsíčně a 20 let):

> Dobrý den,
>
> do kalkulačky jste zadali 2 000 Kč měsíčně na 20 let. Takhle vychází jen roční náklady fondu (TER), bez zhodnocení:
>
> | Fondy | Náklady ročně | Za 20 let |
> |---|---|---|
> | IVV, SPYL, VOO | 0,03 % | 1 443 Kč |
> | CSPX, VUAA | 0,07 % | 3 359 Kč |
> | SPY | 0,0945 % | 4 528 Kč |
> | průměrné akciové ETF v EU (ESMA) | 0,22 % | 10 461 Kč |
> | průměrný akciový fond v EU (ESMA) | 1,38 % | 61 171 Kč |
>
> Prvních šest fondů sleduje stejný index S&P 500. Rozdíl mezi nimi je za 20 let do 3 100 Kč. Proti průměrnému akciovému fondu v EU je to přes 56 000 Kč.
>
> TER si nepřičítáte zvlášť, fond ho strhává průběžně z hodnoty investice. Proto ho na výpisu nevidíte.
>
> Jinou částku nebo dobu si spočítáte tady: {odkaz na stránku s UTM}
>
> ETF v korunách

U jiné částky se tabulka a obě věty pod ní přepočítají stejným vzorcem jako na stránce.

## 3. Den 7: co jsme ověřili u brokerů

**Cíl:** odpovědět na otázku, na kterou se ptá reklama B ("Koupíte VOO z Česka?"), a jasně říct, co ověřené není. Měříme klik na stránku 4 PDF nebo na srovnání (s `utm_content=den7`).

**Předmět:** Koupíte VOO z Česka? Co uvádějí tři brokeři

**Náhledový text:** Fio, DEGIRO a XTB podle vlastních stránek, ověřeno 12. 10. 2026.

**Text:**

> Dobrý den,
>
> jestli americké ETF jako VOO koupíte, záleží na brokerovi. Kdo investiční produkt prodává nebo k němu radí, musí podle nařízení PRIIPs předat sdělení klíčových informací (KID). Podle ČNB tuto povinnost nemá obchodník, který jen provede váš pokyn a produkt nenabízí.
>
> Co uvádějí brokeři na svých stránkách (ověřeno 12. 10. 2026, abecedně):
> - **DEGIRO: ne.** ETF bez KID v místním jazyce obecně nemůže nabízet. Existující pozice lze držet a prodat.
> - **Fio banka (e-Broker): ano.** "U nás můžete obchodovat i s americkými ETF." Poplatek v USA 7,95 USD za obchod do 100 ks.
> - **XTB: jen jako CFD.** CFD je derivát, ne podíl ve fondu.
>
> Trading 212, Interactive Brokers, Patria, Revolut a Portu jsme z jejich vlastních stránek neověřili.
>
> Na stejný index S&P 500 existují i evropské fondy (CSPX, SPYL, VUAA) s TER 0,03 až 0,07 %. Jsou registrované k nabízení v ČR. Vedle VOO je najdete tady: {odkaz na srovnání s UTM}
>
> Pořadí brokerů je abecední, nejde o doporučení brokera.
>
> ETF v korunách

## Co se do e-mailů nedostalo a proč

- **Výkonnost fondů:** u fondů Vanguardu nebyla ověřena druhou kontrolou, proto není ani na stránce.
- **"Který fond si vybrat":** výběr podle čtenáře by byl investiční doporučení (ČNB RS2018-08).
- **Další brokeři:** jen ověření z primárních zdrojů, stejně jako na stránce.
