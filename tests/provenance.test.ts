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
    // What the marks are drawn on is derived from the image's record by the
    // page, so the hand-written note must not say it and go stale.
    assert.doesNotMatch(c.callouts.note, /render|illustration|photograph/i, c.slug);
  }
});

test("a verified pairing outranks the generated list, and each origin has its own words", async () => {
  const { originOf } = await import("../data/assets.ts");
  const { provenanceMark, provenanceSentence, isRendered } = await import("../lib/provenance.ts");
  assert.equal(originOf(undefined), "photograph");
  assert.equal(originOf({ generated: true }), "ai-render");
  assert.equal(originOf({ origin: "enhanced" }), "enhanced");
  assert.equal(originOf({ generated: true, origin: "representative" }), "representative");
  assert.equal(provenanceMark("photograph"), null);
  assert.equal(provenanceMark("ai-render"), "AI render");
  assert.equal(provenanceMark("enhanced"), "Actual product · enhanced");
  assert.equal(provenanceMark("enhanced", "facility"), "Actual facility · enhanced");
  assert.match(provenanceSentence("enhanced"), /^Actual product — digitally enhanced photography/);
  assert.match(provenanceSentence("enhanced-footage"), /^Actual manufacturing footage — professionally enhanced/);
  assert.ok(isRendered("representative") && isRendered("ai-render") && !isRendered("enhanced"));
});

test("every recorded pairing is complete, and an enhanced one cleared the measured bar", async () => {
  const { THRESHOLD } = await import("../scripts/provenance-pair.mjs");
  const verified: Record<string, { sha256: string; origin: string; ssim?: number; reviewedBy?: string; original: { sha256: string } }> =
    JSON.parse(readFileSync(join(root, "data/verified-originals.json"), "utf8")).files;
  for (const [path, v] of Object.entries(verified)) {
    assert.match(v.sha256, /^[0-9a-f]{64}$/, path);
    assert.match(v.original.sha256, /^[0-9a-f]{64}$/, path);
    assert.ok(["enhanced", "representative", "footage", "enhanced-footage"].includes(v.origin), path);
    if (v.origin === "enhanced") assert.ok((v.ssim ?? 0) >= THRESHOLD, `${path} was recorded as enhanced below the threshold`);
    if (v.origin === "representative") assert.ok(v.reviewedBy, `${path} needs the reviewer's name`);
    // A generated file cannot be its own camera original.
    assert.ok(!Object.values(generated).some((g) => g.sha256 === v.original.sha256), `${path}: the original is a generated file`);
  }
});

test("a file whose content credential says it was generated is refused as an original", async () => {
  const { credential } = await import("../scripts/provenance-pair.mjs");
  const signed = Buffer.from("....c2pa....digitalSourceType http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia ... gpt-image ...");
  assert.deepEqual(credential(signed), { generated: true, agent: "gpt-image" });
  assert.equal(credential(Buffer.from("\xff\xd8\xff\xe1Exif\0\0 a phone photograph")), null);
  const edited = Buffer.from("c2pa ... digitalsourcetype/compositeCapture ...");
  assert.equal(credential(edited)?.generated, false);
});

test("the portfolio holds photographs only, and its page is hidden while it is empty", async () => {
  const { portfolioItems } = await import("../data/portfolio.ts");
  const { routes } = await import("../data/routes.ts");
  const items = portfolioItems();
  for (const item of items) assert.ok(["photograph", "enhanced"].includes(resolveAsset(item.asset).origin), item.name);
  assert.equal(routes.find((r) => r.path === "/our-work")?.noindex, items.length === 0);
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
  assert.match(imagerySection(true).body.join(" "), /AI-generated images/);
  assert.match(imagerySection(true, true).body.join(" "), /paired with its camera original/);
  assert.doesNotMatch(imagerySection(true, false).body.join(" "), /enhanced/);
  assert.doesNotMatch(imagerySection(true).body.join(" "), /^Photographs show/);
  assert.doesNotMatch(imagerySection(false).body.join(" "), /does not publish illustrations/);
});
