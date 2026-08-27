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

// Keys referenced anywhere in the rendered app.
const referenced = execSync(
  `grep -rhoE '"[a-zA-Z]+\\.[a-zA-Z0-9.]+"' app components || true`,
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
console.log(`leave a visible gap  ${blocking.length}\n`);

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
