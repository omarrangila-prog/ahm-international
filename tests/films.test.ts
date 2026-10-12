import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { assetManifest } from "../data/asset-manifest.ts";
import { filmSlots, filmPath, resolveFilm } from "../data/films.ts";

/**
 * A film plays only when it is footage, recorded as such. These hold the gate,
 * not the player: the player was checked in a browser (autoplay in view, pause,
 * reduced motion shows the poster) and has no logic worth a unit test.
 */

const root = join(import.meta.dirname, "..");

test("the build script and the data agree on the slots", () => {
  const src = readFileSync(join(root, "scripts/build-film.mjs"), "utf8");
  const slots = JSON.parse(src.match(/const SLOTS = (\[[^\]]*\])/)![1]);
  assert.deepEqual(slots, filmSlots.map((s) => s.id));
});

test("a film without a footage record never resolves, whatever is in the folder", () => {
  const { src, poster } = filmPath("process");
  const before = { film: assetManifest[src], still: assetManifest[poster] };
  try {
    assetManifest[src] = { width: 1280, height: 720, blur: null, duration: 20 };
    assetManifest[poster] = { width: 1280, height: 720, blur: null };
    assert.equal(resolveFilm("process"), null, "an unrecorded clip played");
    assetManifest[src] = { width: 1280, height: 720, blur: null, duration: 20, generated: true };
    assert.equal(resolveFilm("process"), null, "a generated clip played");
    assetManifest[src] = { width: 1280, height: 720, blur: null, duration: 20, origin: "enhanced-footage" };
    assert.equal(resolveFilm("process")?.origin, "enhanced-footage");
    delete assetManifest[poster];
    assert.equal(resolveFilm("process"), null, "a film without its poster played");
  } finally {
    for (const [k, v] of [[src, before.film], [poster, before.still]] as const) {
      if (v) assetManifest[k] = v;
      else delete assetManifest[k];
    }
  }
});

test("every film in the manifest is recorded as footage", () => {
  for (const [path, entry] of Object.entries(assetManifest)) {
    if (!/\.(mp4|webm)$/.test(path)) continue;
    assert.ok(entry.origin === "footage" || entry.origin === "enhanced-footage", `${path} has no footage record`);
  }
});
