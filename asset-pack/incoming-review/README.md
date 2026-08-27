# Incoming assets — held for review

These files were placed into `public/assets/` at the canonical slot paths, but
they are **concept design boards, not photography**. Each carries baked-in
typography — section headlines ("04 CUTTING", "07 QUALITY CONTROL"), banner
titles ("GROCERY & RETAIL UNIFORM PROGRAMS"), article codes, and a "CONCEPT
VISUAL" watermark.

Rendering them inside the site's own layouts would put a second, conflicting
headline inside every section — the page heading and the image heading fighting
each other — and would present concept diagrams as documentary photographs,
which the asset pack's own truthfulness rule forbids.

They are held here rather than deleted so nothing is lost.

## What was kept

Five files from this batch were genuinely clean — pure fabric texture with no
text — and are live on the site now:

- `products/aprons/apron-fabric-macro.webp`
- `products/polos/polo-fabric-macro.webp`
- `products/fleece/fleece-fabric-macro.webp`
- `products/tshirts/tee-fabric-macro.webp`
- `fabrics/woven.webp`

## What the site uses instead

Nine fabric macros and seven construction detail crops were extracted from these
same source boards with the captions cropped out, plus the export carton mockup.
Those are live. See `assets-needed.md` for the slots still genuinely awaiting a
camera.

## To use any file from this folder

Crop the baked-in text out first, then move it to its path under
`public/assets/` and run `npm run assets`.
