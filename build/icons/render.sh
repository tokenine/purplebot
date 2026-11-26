#!/bin/bash
# Renders the PurpleBot icon set from the design in build/icon.svg with headless Chrome.
# Use it after a change of the mark. It needs Google Chrome and ImageMagick.
#
#   bash build/icons/render.sh /tmp/purplebot-icons
#
# Then copy the files into place and build the container formats:
#   cp /tmp/purplebot-icons/production.png build/icon-production.png
#   cp /tmp/purplebot-icons/production-safe.png build/icon-production-macos-safe-area.png
#   cp /tmp/purplebot-icons/{dev,preview}{,-safe}.png build/   # rename -safe to -macos-safe-area
#   cp /tmp/purplebot-icons/color-<name>.png build/logo-colors/icon-<name>.png
#   magick production.png -define icon:auto-resize=256,128,64,48,32,16 build/icon-production.ico
#   magick icon_16x16.png ... icon_512x512@2x.png -> iconutil -c icns build/icon-production.iconset
#
# The face is one design: two pill eyes and a mouth line, in stroke units of a 1024 box.
set -euo pipefail
OUT="$1"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d /tmp/purplebot-chrome.XXXXXX)"
rm -rf "$OUT"
mkdir -p "$OUT"

# render NAME SIZE INSET_PERCENT KIND EYE [TOP BOTTOM | FLAT]
#   KIND is "gradient" or "flat". INSET_PERCENT keeps the shape inside a transparent margin.
render() {
  local name="$1" size="$2" inset="$3" kind="$4" eye="$5"
  local inset_px=$(( size * inset / 100 ))
  local side=$(( size - 2 * inset_px ))
  local defs="" paint
  if [ "$kind" = gradient ]; then
    defs="<defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"$6\"/><stop offset=\"1\" stop-color=\"$7\"/></linearGradient></defs>"
    paint="url(#g)"
  else
    paint="$6"
  fi
  local face="<g stroke=\"$eye\" stroke-linecap=\"round\"><g stroke-width=\"145\"><path d=\"M357 360v176\"/><path d=\"M667 360v176\"/></g><path stroke-width=\"78\" d=\"M437 694h150\"/></g>"
  local svg="<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"$side\" height=\"$side\" viewBox=\"0 0 1024 1024\">$defs<rect width=\"1024\" height=\"1024\" fill=\"$paint\"/>$face</svg>"
  local page="$OUT/$name.html" shot="$OUT/$name.png"
  printf '<!doctype html><html><head><style>html,body{margin:0;padding:0;background:transparent}svg{position:absolute;left:0;top:0;display:block;width:%spx;height:%spx;border-radius:%spx;overflow:hidden}</style></head><body>%s</body></html>' \
    "$side" "$side" "$(awk -v s="$side" 'BEGIN { printf "%.2f", s * 0.2237 }')" "$svg" > "$page"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run --user-data-dir="$PROFILE" \
    --default-background-color=00000000 --window-size="$side,$side" --screenshot="$shot" "file://$page" >/dev/null 2>&1
  rm -f "$page"
  if [ "$inset_px" -gt 0 ]; then magick "$shot" -bordercolor none -border "$inset_px" "$shot"; fi
}

VIOLET_TOP="#8B5CF6"
VIOLET_BOTTOM="#6D28D9"
DARK_FACE="#05030A"

render production 1600 0 gradient "#FFFFFF" "$VIOLET_TOP" "$VIOLET_BOTTOM"
render production-safe 1600 10 gradient "#FFFFFF" "$VIOLET_TOP" "$VIOLET_BOTTOM"
render dev 1600 0 flat "$DARK_FACE" "#E3B866"
render dev-safe 1600 10 flat "$DARK_FACE" "#E3B866"
render preview 1600 0 flat "$DARK_FACE" "#61C985"
render preview-safe 1600 10 flat "$DARK_FACE" "#61C985"
while read -r name hex; do
  render "color-$name" 1600 0 flat "$DARK_FACE" "$hex"
  render "color-$name-safe" 1600 10 flat "$DARK_FACE" "$hex"
done <<'COLORS'
beige #EDCEC3
blue #84ADDE
gold #DCB470
gray #B4B4B4
green #7CC68A
pink #DBA3BD
rose #D99293
terracotta #CB9071
white #FEFDFF
COLORS

rm -rf "$PROFILE"
echo "Rendered the PurpleBot icons into $OUT"
