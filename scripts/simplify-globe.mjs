#!/usr/bin/env node
/**
 * Trims `data/globe.json` to what the globe actually draws.
 *
 *   node scripts/simplify-globe.mjs
 *
 * The source is the Natural Earth admin-0 collection vendored with three-globe:
 * https://github.com/vasturiano/three-globe/blob/master/example/datasets/ne_110m_admin_0_countries.geojson
 *
 * That file carries 6-decimal coordinates (~10 cm) and 90-odd Natural Earth
 * attributes per country. The globe renders it as a hex grid at resolution 3,
 * where a single cell spans tens of kilometres, and colours every cell the same
 * — so neither the precision nor the attributes reach the screen. They only
 * reach the client bundle: 136 KB gzipped of the 709 KB WebGL chunk.
 *
 * This rounds coordinates to 2 decimals (~1.1 km, still an order of magnitude
 * finer than the hex grid), drops repeated points and every property, and
 * discards rings left with fewer than four points. Idempotent: running it on
 * already-simplified data changes nothing.
 */

import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DECIMALS = 2;
const file = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "data/globe.json",
);

const before = fs.readFileSync(file);
const source = JSON.parse(before.toString("utf8"));

const round = (n) => Number(n.toFixed(DECIMALS));

/** Rounds a ring, drops points that collapse onto their neighbour, keeps it closed. */
function simplifyRing(ring) {
  const out = [];
  let last = null;
  for (const [lng, lat] of ring) {
    const point = [round(lng), round(lat)];
    if (!last || point[0] !== last[0] || point[1] !== last[1]) {
      out.push(point);
      last = point;
    }
  }
  const first = out[0];
  const end = out[out.length - 1];
  if (out.length > 3 && (first[0] !== end[0] || first[1] !== end[1])) out.push(first);
  // A ring of three or fewer points encloses no area worth hexing.
  return out.length > 3 ? out : null;
}

const features = [];
for (const feature of source.features) {
  const { type, coordinates } = feature.geometry;
  const simplified =
    type === "Polygon"
      ? coordinates.map(simplifyRing).filter(Boolean)
      : coordinates.map((polygon) => polygon.map(simplifyRing).filter(Boolean)).filter((p) => p.length);
  if (!simplified.length) continue;
  features.push({ type: "Feature", properties: {}, geometry: { type, coordinates: simplified } });
}

const after = JSON.stringify({ type: "FeatureCollection", features });
fs.writeFileSync(file, after);

const gz = (buf) => zlib.gzipSync(buf).length / 1024;
console.log(`globe.json: ${source.features.length} features in, ${features.length} out`);
console.log(`  raw ${(before.length / 1024).toFixed(0)} KB -> ${(after.length / 1024).toFixed(0)} KB`);
console.log(`  gzipped ${gz(before).toFixed(0)} KB -> ${gz(after).toFixed(0)} KB`);
