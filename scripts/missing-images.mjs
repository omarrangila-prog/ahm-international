/**
 * Lists the image slots that actually leave a visible gap.
 *
 * A missing file only matters if a component asks for its key. Most placeholder
 * files in `public/assets` are slots nothing renders, or have a working
 * fallback, so the raw placeholder count badly overstates the work.
 *
 * Run: npm run images:missing
 */
import { execSync } from "node:child_process";

const { assetRegistry, resolveAsset } = await import("../data/assets.ts");

const keys = Object.keys(assetRegistry);
const missing = keys.filter((k) => !resolveAsset(k).available);

/**
 * Keys referenced anywhere that ends up rendered.
 *
 * `data` belongs in this list and was missing from it. Asset keys are declared
 * almost entirely in `data/*.ts` — a manufacturing stage names its photograph
 * there, not in the component that draws it — so grepping only `app` and
 * `components` matched almost nothing and this reported "0 leave a visible gap"
 * while sixty-six pages were rendering an empty panel in the navigation.
 *
 * Even corrected this is inference: it cannot see that a component asked
 * `hasAsset()` and restructured. The ground truth is the rendered HTML, which
 * `npm run images:gaps` counts directly.
 */
const referenced = execSync(
  `grep -rhoE '"[a-zA-Z]+\\.[a-zA-Z0-9.]+"' app components data || true`,
).toString();

const blocking = missing.filter((k) => referenced.includes(`"${k}"`));

const ROLE = (src) =>
  src.includes("/hero/") ? "1920 x 1080"
  : src.includes("/products/") || src.includes("/case-studies/") ? "1600 x 1600"
  : "1600 x 900";

const groups = blocking.reduce((m, k) => {
  const g = k.split(".")[0];
  (m[g] ??= []).push(k);
  return m;
}, {});

console.log(`registry keys        ${keys.length}`);
console.log(`missing files        ${missing.length}`);
console.log(`referenced somewhere ${blocking.length}   (see npm run images:gaps for what actually renders empty)\n`);

for (const [group, ks] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${group.toUpperCase()}  (${ks.length})`);
  for (const k of ks.sort()) {
    const src = resolveAsset(k).src;
    console.log(`  ${src.replace(/^\/assets\//, "").padEnd(52)} ${ROLE(src)}`);
  }
  console.log("");
}

console.log("Drop originals into assets-master/ mirroring these paths, then:");
console.log("  npm run images:build && npm run images:audit");
