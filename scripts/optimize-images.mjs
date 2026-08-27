#!/usr/bin/env node
/**
 * Master -> web derivative pipeline.
 *
 *   npm run images:build
 *
 * Reads high-resolution originals from `assets-master/` (archived at the repo
 * root, never deployed) and writes correctly-sized, correctly-compressed web
 * derivatives into `public/assets/`.
 *
 * The recipes below are declarative on purpose: each names its source, its
 * crop, its role and its destination, so regenerating the whole web set after a
 * quality change is one command rather than a hand-run list of ffmpeg calls.
 *
 * Encoded dimensions come from `data/image-spec.ts`. next/image generates the
 * smaller responsive variants from these at request time — a phone is never
 * served the desktop file.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = path.join(root, "assets-master");
const WEB = path.join(root, "public", "assets");

/* Mirrors data/image-spec.ts. Kept as plain data so this script needs no build. */
const SPEC = {
  hero: { w: 1920, h: 1080, q: 82 },
  productSquare: { w: 1600, h: 1600, q: 86 },
  productThumb: { w: 800, h: 800, q: 76 },
  modelPortrait: { w: 1200, h: 1600, q: 84 },
  technicalDetail: { w: 1400, h: 933, q: 84 },
  fabricMacro: { w: 1200, h: 1200, q: 88 },
  industry: { w: 1600, h: 900, q: 82 },
  social: { w: 1200, h: 630, q: 82 },
};

/** Product renders keep their own 9:11 studio ratio — squaring them would crop the garment. */
const RENDER_RATIO = { w: 1350, h: 1650, q: 86 };

const RENDERS = {
  "AHM-PO-001": "classic-polo", "AHM-PO-002": "long-sleeve-polo", "AHM-TS-001": "crew-neck-tee",
  "AHM-SH-001": "button-front-shirt", "AHM-SH-002": "utility-work-shirt", "AHM-SW-001": "crewneck-sweatshirt",
  "AHM-HD-001": "pullover-hoodie", "AHM-CH-001": "chef-coat", "AHM-AP-001": "bib-apron",
  "AHM-AP-002": "waist-apron", "AHM-WJ-001": "work-jacket", "AHM-FL-001": "fleece-jacket",
  "AHM-HW-001": "uniform-cap", "AHM-SV-001": "safety-vest", "AHM-TR-001": "work-trouser",
  "AHM-SH-003": "work-short", "AHM-HW-002": "chef-beanie", "AHM-AC-001": "uniform-tie",
};

const FABRICS = {
  poly_cotton_twill_1600x1000: "polycotton-twill", cotton_pique_1600x1000: "cotton-pique",
  performance_polyester_1600x1000: "polyester-performance", brushed_fleece_1600x1000: "fleece",
  canvas_1600x1000: "canvas", softshell_1600x1000: "softshell",
  single_jersey_1600x1000: "single-jersey", rib_1600x1000: "rib", mesh_1600x1000: "mesh",
};

/** Detail sheets: verified panel geometry — x 820..1680, row 2 at y 660, 320 tall, ground #e9e9e7. */
const DETAILS = {
  "AHM-AP-001": "apron", "AHM-PO-001": "polo", "AHM-FL-001": "fleece",
  "AHM-SH-002": "woven-shirt", "AHM-TR-001": "bottoms", "AHM-WJ-001": "outerwear", "AHM-TS-001": "tee",
};

const recipes = [];

for (const [code, slug] of Object.entries(RENDERS)) {
  recipes.push({
    src: `renders/${code}_front_transparent.png`,
    out: `products/renders/${slug}.webp`,
    role: "productRender",
    vf: `scale=${RENDER_RATIO.w}:${RENDER_RATIO.h}:force_original_aspect_ratio=decrease:flags=lanczos`,
    q: RENDER_RATIO.q,
    alpha: true,
  });
}

for (const [file, slug] of Object.entries(FABRICS)) {
  const s = SPEC.fabricMacro;
  recipes.push({
    src: `fabrics/${file}.jpg`,
    out: `fabrics/${slug}.webp`,
    role: "fabricMacro",
    // Square crop from the right of the frame, clear of the caption card that
    // sits bottom-left in every source file.
    vf: `crop=800:800:760:100,scale=${s.w}:${s.h}:flags=lanczos`,
    q: s.q,
  });
}

for (const [code, slug] of Object.entries(DETAILS)) {
  const s = SPEC.technicalDetail;
  recipes.push({
    src: `detail-sheets/${code}_detail_sheet.jpg`,
    out: `products/details/${slug}-construction.webp`,
    role: "technicalDetail",
    // Panel is 860x320; padded out to the target ratio on its own ground so the
    // construction is never cropped.
    vf: `crop=860:320:820:660,pad=1290:860:215:270:color=0xe9e9e7,scale=${s.w}:${s.h}:flags=lanczos`,
    q: s.q,
  });
}

recipes.push(
  {
    src: "packaging/packaging_options_2000x1200.jpg",
    out: "export/cartons.webp",
    role: "industry",
    vf: `crop=770:770:690:250,pad=1370:770:300:0:color=0xefefed,scale=${SPEC.industry.w}:${SPEC.industry.h}:flags=lanczos`,
    q: SPEC.industry.q,
  },
  {
    src: "packaging/packaging_options_2000x1200.jpg",
    out: "export/carton-marking.webp",
    role: "fabricMacro",
    vf: `crop=770:770:690:250,scale=${SPEC.fabricMacro.w}:${SPEC.fabricMacro.h}:flags=lanczos`,
    q: SPEC.fabricMacro.q,
  },
);

/** Supplied caption-free macros: re-encode to spec rather than pass through. */
for (const [file, out] of Object.entries({
  "apron-fabric-macro.webp": "products/aprons/apron-fabric-macro.webp",
  "polo-fabric-macro.webp": "products/polos/polo-fabric-macro.webp",
  "fleece-fabric-macro.webp": "products/fleece/fleece-fabric-macro.webp",
  "tee-fabric-macro.webp": "products/tshirts/tee-fabric-macro.webp",
  "woven.webp": "fabrics/woven.webp",
})) {
  const s = SPEC.fabricMacro;
  recipes.push({
    src: `supplied-macros/${file}`,
    out,
    role: "fabricMacro",
    vf: `scale=${s.w}:${s.h}:force_original_aspect_ratio=increase,crop=${s.w}:${s.h}`,
    q: s.q,
  });
}

/** Per-file quality, where the role default cannot hit the byte budget. */
const QUALITY_OVERRIDE = {
  "case-studies/uniform-apron-program/fabric.webp": 58,
  "case-studies/uniform-apron-program/detail.webp": 60,
  "development/fabric-swatches.webp": 74,
};

/**
 * Delivered photography pack — factory, development, export, hero, case study.
 *
 * These arrive already cropped to the target aspect, so the recipe re-encodes to
 * the role's quality budget rather than transforming the frame. Scaling with
 * `decrease` means an original larger than the target is brought down and one
 * that already matches is left at size — never upscaled, which would add bytes
 * for no detail.
 *
 * Roles differ on purpose: `industry` for 16:9 scenes, `hero` for the LCP image
 * (its own budget, since it is the one picture that gates the score), and
 * `productSquare` for the 1:1 case-study and product frames.
 */
for (const [src, role] of Object.entries({
  "factory/fabric-inspection.webp": "industry",
  "factory/cutting.webp": "industry",
  "factory/sewing.webp": "industry",
  "factory/embroidery.webp": "industry",
  "factory/finishing.webp": "industry",
  "factory/quality-control.webp": "industry",
  "factory/packing.webp": "industry",
  "development/tech-pack.webp": "industry",
  "development/pattern.webp": "industry",
  "development/fabric-swatches.webp": "industry",
  "development/trims.webp": "industry",
  "development/measurement.webp": "industry",
  "export/warehouse.webp": "industry",
  "export/container-loading.webp": "industry",
  "hero/hero-sewing-01.webp": "hero",
  "case-studies/uniform-apron-program/product.webp": "productSquare",
  "case-studies/uniform-apron-program/fabric.webp": "productSquare",
  "case-studies/uniform-apron-program/detail.webp": "productSquare",
  "products/aprons/apron-black-front.webp": "productSquare",
})) {
  const s = SPEC[role];
  recipes.push({
    src,
    out: src,
    role,
    vf: `scale=${s.w}:${s.h}:force_original_aspect_ratio=decrease:flags=lanczos`,
    // Dense fabric texture defeats the role default — weave detail is
    // high-frequency everywhere, so the encoder has nothing flat to save on and
    // these two land well over budget at the shared quality. Dropped only for
    // them; lowering the global setting would soften every clean product render
    // to fix two textiles.
    q: QUALITY_OVERRIDE[src] ?? s.q,
  });
}

/* ------------------------------------------------------------------ */

let built = 0, skipped = 0, failed = 0;
const results = [];

for (const r of recipes) {
  const src = path.join(MASTER, r.src);
  const out = path.join(WEB, r.out);

  if (!fs.existsSync(src)) {
    skipped++;
    continue;
  }

  fs.mkdirSync(path.dirname(out), { recursive: true });

  const args = ["-v", "error", "-y", "-i", src, "-vf", r.vf, "-c:v", "libwebp", "-q:v", String(r.q), "-compression_level", "6"];
  // Transparency must survive the round trip for the cut-out product renders.
  if (r.alpha) args.push("-pix_fmt", "yuva420p");
  args.push(out);

  try {
    execFileSync("ffmpeg", args, { stdio: "pipe" });
    const bytes = fs.statSync(out).size;
    results.push({ out: r.out, role: r.role, bytes });
    built++;
  } catch (error) {
    console.error(`  FAILED ${r.out}: ${String(error).slice(0, 120)}`);
    failed++;
  }
}

const total = results.reduce((sum, r) => sum + r.bytes, 0);
console.log(`\nimages: ${built} built, ${skipped} skipped (no master), ${failed} failed`);
console.log(`total web payload: ${(total / 1024 / 1024).toFixed(2)} MB across ${built} files`);

const heaviest = results.sort((a, b) => b.bytes - a.bytes).slice(0, 5);
console.log("\nheaviest:");
for (const r of heaviest) console.log(`  ${(r.bytes / 1024).toFixed(0).padStart(5)} KB  ${r.out}`);
