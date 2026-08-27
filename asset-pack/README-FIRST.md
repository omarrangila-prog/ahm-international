# AHM International — Website Asset Pack

This ZIP is the complete **production asset structure + prompt library + design references** for the AHM International website.

## Included

- Exact `/public/assets` directory tree for Claude Code / Next.js.
- 60+ named asset targets across brand, hero, products, industries, factory, development, fabric, export and case studies.
- One dedicated generation prompt for every image target.
- `ASSET_MANIFEST.csv` and `ASSET_MANIFEST.json` with target dimensions and usage.
- `assets.ts` so Claude can use semantic asset keys instead of scattering filenames through components.
- Two generated reference boards from the design work in ChatGPT.
- 4K production standards and photography direction.

## Important

The `.PLACEHOLDER.txt` files are **asset slots and generation briefs**, not fake photographs. Replace them with the final `.webp/.svg/.png/.webm` files using the exact filename beside each placeholder.

This pack deliberately does not pretend cropped thumbnails or low-resolution mockup imagery are final 4K production assets. The master generation prompts are included so the final images can be produced consistently.

## Master quality

- Landscape photography: 3840×2160
- Square products / fabric macros: 3000×3000 or higher
- Portrait industry imagery: 2160×2880 or higher
- Logos: SVG vector
- Hero motion: 4K source, compressed WebM/MP4 derivative for production

## Final website delivery

Keep high-resolution masters outside the deployed bundle when necessary. Export optimized WebP/AVIF versions for the website and let `next/image` serve responsive sizes.
