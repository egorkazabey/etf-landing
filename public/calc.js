// Náklady fondu v Kč. Model popsaný v docs/zdroje-dat.md, sekce Výpočty:
// vklad na začátku měsíce, roční náklady strhávané měsíčně jako (1 - TER)^(1/12), výnos 0 %.
// Výsledek = součet vkladů minus konečná hodnota.
export function feeCost(monthly, years, terPct) {
  const keep = Math.pow(1 - terPct / 100, 1 / 12);
  let value = 0;
  for (let i = 0; i < years * 12; i++) value = (value + monthly) * keep;
  return monthly * years * 12 - value;
}
