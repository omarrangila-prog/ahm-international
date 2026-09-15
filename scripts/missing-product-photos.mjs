/**
 * Lists catalogue garments that still have no photograph.
 *
 * Vector stand-ins used to fill these slots. Those files are gone: an article
 * without a photo is listed without an image. This prints what still has to
 * be shot so the frames can come back.
 *
 * Run: npm run photos:needed
 */
import { execSync } from "node:child_process";

const { resolveAsset } = await import("../data/assets.ts");

/** What each remaining render depicts, for whoever produces the image. */
const BRIEF = {
  "renders.workJacket": "Four-pocket work jacket, front, on white. Reinforced stress points visible",
  "renders.workTrouser": "Work trouser, front, on white. Triple-needle seams, bar-tacked pockets",
  "renders.utilityWorkShirt": "Utility work shirt, front, on white. Twin chest pockets. NO logo or branding",
  "renders.buttonFrontShirt": "Plain button-front woven shirt, front, on white. NO logo or branding",
  "renders.chefCoat": "Double-breasted chef coat, front, on white",
  "renders.chefBeanie": "Chef beanie or skull cap, on white",
  "renders.waistApron": "Waist apron with server pockets, on white",
  "renders.safetyVest": "Hi-vis safety vest with reflective tape, on white. Reflective tape must be visible",
  "renders.uniformCap": "Six-panel structured uniform cap, on white. Unbranded",
  "renders.uniformTie": "Plain woven uniform tie, on white",
  "renders.workShort": "Work short, front, on white",
  "renders.crewNeckTee": "Plain crew-neck t-shirt, front, on white. NO print or logo",
  "renders.crewneckSweatshirt": "Plain crew-neck sweatshirt, front, on white. NO print or logo",
};

// `--exclude` drops the file; piping to `grep -v` would not, because `-o` prints
// only the matched text and that never contains the filename.
const referenced = execSync(
  `grep -rhoE '"renders\\.[a-zA-Z]+"' app components data --include=*.ts --include=*.tsx --exclude=assets.ts || true`,
).toString();

const counts = {};
for (const m of referenced.matchAll(/"(renders\.[a-zA-Z]+)"/g)) {
  counts[m[1]] = (counts[m[1]] ?? 0) + 1;
}

const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);

console.log(`garments still waiting on a photograph: ${rows.length}\n`);
console.log("  uses  file to supply                              what it should show");
console.log("  ----  -------------------------------------------  -------------------");

for (const [key, uses] of rows) {
  const src = resolveAsset(key).src.replace(/^\/assets\//, "");
  console.log(`  ${String(uses).padStart(4)}  ${src.padEnd(43)}  ${BRIEF[key] ?? "—"}`);
}

console.log(`
All 1600 x 1600, garment centred on plain white, no model.
Drop into assets-master/ at the path shown, then:
  npm run images:build && npm run assets && npm run images:audit`);
