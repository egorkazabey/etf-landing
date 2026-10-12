#!/bin/sh
# Statické řezy Archivo pro PDF (reward/fonts/). Variabilní písmo by Chrome vložil do PDF
# jako mnoho fontů Type3 a PDF by bylo zhruba 3x větší.
# Zdroj a znaky stejné jako scripts/subset-font.sh.
# Použití: scripts/pdf-fonts.sh <cesta k Archivo[wdth,wght].ttf> [python]
set -eu
SRC="$1"
PY="${2:-python3}"
OUT="reward/fonts"
TMP="$(mktemp -d)"
UNICODES="U+0020-007E,U+00A0,U+00A7,U+00A9,U+00B0,U+00B7,U+00D7,U+00C1,U+00E1,U+010C,U+010D,U+010E,U+010F,U+00C9,U+00E9,U+011A,U+011B,U+00CD,U+00ED,U+0147,U+0148,U+00D3,U+00F3,U+0158,U+0159,U+0160,U+0161,U+0164,U+0165,U+00DA,U+00FA,U+016E,U+016F,U+00DD,U+00FD,U+017D,U+017E,U+2011,U+2018,U+201A,U+201C,U+201E,U+2026,U+2192,U+2212,U+20AC"
mkdir -p "$OUT"
for spec in "400 100 regular" "700 100 bold" "850 100 black" "850 75 black-condensed"; do
  set -- $spec
  "$PY" -I -m fontTools.varLib.instancer "$SRC" wght=$1 wdth=$2 --static -q -o "$TMP/$3.ttf"
  "$PY" -I -m fontTools.subset "$TMP/$3.ttf" --unicodes="$UNICODES" \
    --layout-features="kern,liga,calt,tnum,lnum,ccmp,locl" --flavor=woff2 --output-file="$OUT/archivo-$3.woff2"
done
rm -rf "$TMP"
ls -l "$OUT"
