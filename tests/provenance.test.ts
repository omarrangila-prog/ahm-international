import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { assetManifest } from "../data/asset-manifest.ts";
import { assetRegistry, resolveAsset, type AssetKey } from "../data/assets.ts";
import { facilitySlots, facilityPhotos } from "../data/facility-gallery.ts";
import { productCategories } from "../data/products.ts";
import { pageMessage, referenceMessage, whatsappHref } from "../lib/whatsapp.ts";

/**
 * Generated images are labelled, never captioned as photographs, and never
 * stand for the facility.
 *
 * Every garment image on the site in October 2026 was generated, and the
 * product pages headed them "Photographed from production". These tests hold
 * the three rules that came out of finding that.
 */

const root = join(import.meta.dirname, "..");
const generated: Record<string, { sha256: string; evidence: string }> = JSON.parse(
  readFileSync(join(root, "data/generated-images.json"), "utf8"),
).files;
const keys = Object.keys(assetRegistry) as AssetKey[];

test("the manifest marks exactly the files whose contents match a generated hash, wherever they sit", () => {
  const hashes = new Set(Object.values(generated).map((g) => g.sha256));
  for (const [path, entry] of Object.entries(assetManifest)) {
    const file = join(root, "public", path);
    const matches = existsSync(file) && hashes.has(createHash("sha256").update(readFileSync(file)).digest("hex"));
    assert.equal(Boolean(entry.generated), matches, `${path}: run npm run assets`);
  }
  for (const [path, { evidence }] of Object.entries(generated)) assert.ok(evidence.length > 20, `${path} needs its evidence`);
});

test("no generated image is described as a photograph", () => {
  for (const key of keys) {
    const r = resolveAsset(key);
    if (r.available && r.generated) assert.doesNotMatch(r.alt, /photograph/i, key);
  }
});

test("no image of the facility is generated", () => {
  for (const key of keys) {
    const r = resolveAsset(key);
    if (r.kind === "factory") assert.ok(!(r.available && r.generated), `${key} is a generated picture of a factory`);
  }
});

test("a facility photograph's attribution is its path, and the gallery shows only photographs", () => {
  for (const slot of facilitySlots) {
    const src = (assetRegistry[slot.asset] as { src: string }).src;
    assert.ok(src.startsWith(`/assets/facility/${slot.facility}/`), `${slot.asset} must live under facility/${slot.facility}/`);
  }
  for (const facility of ["own", "partner"] as const) {
    for (const photo of facilityPhotos(facility)) {
      assert.equal(photo.facility, facility);
      assert.equal(resolveAsset(photo.asset).generated, false);
    }
  }
});

test("construction callouts sit on the image they describe", () => {
  for (const c of productCategories) {
    if (!c.callouts) continue;
    assert.ok(c.callouts.asset in assetRegistry, c.slug);
    assert.ok(c.callouts.points.length > 0 && c.callouts.points.length <= 6, c.slug);
    for (const p of c.callouts.points) {
      assert.ok(p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100, `${c.slug}: ${p.title}`);
    }
    // A marked illustration has to say it is one.
    if (resolveAsset(c.callouts.asset).generated) assert.match(c.callouts.note, /AI illustration/, c.slug);
  }
});

test("WhatsApp links carry digits only and an editable message", () => {
  assert.equal(whatsappHref("+92 334 7037531"), "https://wa.me/923347037531");
  const href = whatsappHref("+92 334 7037531", referenceMessage("AHM-261011-AB12"));
  assert.match(href, /^https:\/\/wa\.me\/923347037531\?text=/);
  assert.match(decodeURIComponent(href.split("text=")[1]), /AHM-261011-AB12/);
  assert.match(pageMessage("/products/aprons?x=1#a"), /www\.ahminternationals\.com\/products\/aprons\./);
  assert.doesNotMatch(pageMessage("/"), /\.com\//);
});

test("the terms describe the product images that are deployed", async () => {
  const { imagerySection, termsSections } = await import("../data/legal.ts");
  const deployed = termsSections.find((s) => s.heading === "Product imagery")!;
  const anyGenerated = Object.values(assetManifest).some((e) => e.generated);
  assert.deepEqual(deployed, imagerySection(anyGenerated));
  assert.match(imagerySection(true).body.join(" "), /AI-generated illustrations/);
  assert.doesNotMatch(imagerySection(true).body.join(" "), /^Photographs show/);
  assert.doesNotMatch(imagerySection(false).body.join(" "), /does not publish illustrations/);
});
