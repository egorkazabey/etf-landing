#!/bin/sh
# Vyrobí public/fonts/archivo-cs.woff2: Archivo jen s osami, které stránka používá
# (šířka 72 až 100, váha 400 až 900) a jen se znaky pro češtinu a stránku.
#
# Zdroj: https://github.com/google/fonts/tree/main/ofl/archivo (SIL OFL 1.1, viz public/fonts/OFL.txt)
# Potřebuje Python s balíčky fonttools a brotli.
#
# Použití: scripts/subset-font.sh <cesta k Archivo[wdth,wght].ttf> [python]
set -eu
SRC="$1"
PY="${2:-python3}"
OUT="public/fonts/archivo-cs.woff2"
TMP="$(mktemp -d)"

"$PY" -I -m fontTools.varLib.instancer "$SRC" wdth=72:100 wght=400:900 -o "$TMP/limited.ttf"

# ASCII, nezlomitelná mezera, česká diakritika, české uvozovky, ×, …, šipka, minus
"$PY" -I -m fontTools.subset "$TMP/limited.ttf" \
  --unicodes="U+0020-007E,U+00A0,U+00A7,U+00A9,U+00B0,U+00B7,U+00D7,U+00C1,U+00E1,U+010C,U+010D,U+010E,U+010F,U+00C9,U+00E9,U+011A,U+011B,U+00CD,U+00ED,U+0147,U+0148,U+00D3,U+00F3,U+0158,U+0159,U+0160,U+0161,U+0164,U+0165,U+00DA,U+00FA,U+016E,U+016F,U+00DD,U+00FD,U+017D,U+017E,U+2011,U+2018,U+201A,U+201C,U+201E,U+2026,U+2192,U+2212,U+20AC" \
  --layout-features="kern,liga,calt,tnum,lnum,ccmp,locl" \
  --flavor=woff2 --output-file="$OUT"

rm -rf "$TMP"
ls -l "$OUT"
