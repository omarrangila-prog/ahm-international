# Claude Code — Asset Integration Instructions

Use the contents of `public/assets` as the canonical visual hierarchy.

1. Copy `code/assets.ts` to the project `data/assets.ts` (or equivalent).
2. Never hardcode asset paths directly inside many components; import semantic keys.
3. For `.PLACEHOLDER.txt` slots, render a tasteful neutral fallback until the corresponding final file exists.
4. Every image must use `next/image` with `sizes`, meaningful `alt`, and correct aspect ratio.
5. `hero-sewing-01.webp` is the primary LCP candidate and may use `priority`.
6. No other below-fold asset should use `priority`.
7. Prefer object-position per asset rather than destructive cropping.
8. Keep user-facing text separate from imagery. No text baked into photos.
9. Do not expose confidential buyer logos or customer names in visuals.
10. Preserve the photography language described in the prompt library.
