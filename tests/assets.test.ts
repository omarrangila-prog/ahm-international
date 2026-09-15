import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { assetRegistry, resolveAsset, hasAsset } from "../data/assets.ts";
import { industries } from "../data/industries.ts";

/**
 * Photographs only. Vector garment drawings used to fill empty slots and read
 * as products AHM had already made. These tests fail the build if they come back.
 */

test("no registry path points at the withdrawn vector renders", () => {
  const offenders: string[] = [];
  for (const [key, asset] of Object.entries(assetRegistry)) {
    if (asset.src.includes("/renders/")) offenders.push(`${key} src`);
    if ("fallbackSrc" in asset && typeof asset.fallbackSrc === "string" && asset.fallbackSrc.includes("/renders/")) {
      offenders.push(`${key} fallbackSrc`);
    }
  }
  assert.deepEqual(offenders, [], `vector render paths still referenced: ${offenders.join(", ")}`);
});

test("the renders directory is not serving files", () => {
  const dir = "public/assets/products/renders";
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter((f) => !f.startsWith("."));
  assert.deepEqual(files, [], `vector renders still on disk: ${files.join(", ")}`);
});

test("vector construction diagrams are not serving files", () => {
  const dir = "public/assets/products/details";
  if (!existsSync(dir)) return;
  const files = readdirSync(dir).filter((f) => f.endsWith(".webp"));
  assert.deepEqual(files, [], `vector construction diagrams still on disk: ${files.join(", ")}`);
});

test("no registry path points at construction diagram stand-ins", () => {
  const offenders: string[] = [];
  for (const [key, asset] of Object.entries(assetRegistry)) {
    if (asset.src.includes("/products/details/")) offenders.push(`${key} src`);
    if (
      "fallbackSrc" in asset &&
      typeof asset.fallbackSrc === "string" &&
      asset.fallbackSrc.includes("/products/details/")
    ) {
      offenders.push(`${key} fallbackSrc`);
    }
  }
  assert.deepEqual(offenders, [], `construction diagram paths still referenced: ${offenders.join(", ")}`);
});

test("pending article keys do not resolve to an image", () => {
  assert.equal(hasAsset("renders.chefCoat"), false);
  assert.equal(hasAsset("renders.workJacket"), false);
  assert.equal(resolveAsset("renders.crewNeckTee").available, false);
  assert.equal(hasAsset("products.wovenShirt.detail"), false);
});

test("industry representatives resolve to a real photograph", () => {
  const missing = industries.filter((i) => !hasAsset(i.representative)).map((i) => i.slug);
  assert.deepEqual(missing, [], `industry cards with no photograph: ${missing.join(", ")}`);
});
