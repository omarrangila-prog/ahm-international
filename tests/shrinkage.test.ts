import { test } from "node:test";
import assert from "node:assert/strict";
import {
  directionResult,
  formatShrinkagePercent,
  shrinkagePercent,
} from "../lib/shrinkage.ts";

/**
 * Same bar as GSM: a visitor can check these on their own calculator.
 */

test("ten centimetres that finish at nine are 10% shrinkage", () => {
  assert.equal(shrinkagePercent(10, 9), 10);
});

test("length and width are independent measurements", () => {
  assert.equal(shrinkagePercent(50, 48.5), 3);
  assert.equal(shrinkagePercent(100, 97), 3);
});

test("growth reads as negative percentage (extension)", () => {
  assert.equal(shrinkagePercent(100, 102), -2);
});

test("exact hold is zero", () => {
  assert.equal(shrinkagePercent(25, 25), 0);
});

test("nonsense inputs return null rather than inventing zero", () => {
  for (const bad of [0, -1, NaN]) {
    assert.equal(shrinkagePercent(bad, 10), null);
    assert.equal(shrinkagePercent(10, bad === 0 ? -1 : bad), null);
  }
  assert.equal(shrinkagePercent(10, -0.1), null);
});

test("directionResult labels shrinkage, extension and stable", () => {
  assert.deepEqual(directionResult(100, 97), { percent: 3, reading: "shrinkage" });
  assert.deepEqual(directionResult(100, 102), { percent: -2, reading: "extension" });
  assert.equal(directionResult(100, 100)?.reading, "stable");
});

test("formatShrinkagePercent is one decimal for display", () => {
  assert.equal(formatShrinkagePercent(3.14159), "3.1");
  assert.equal(formatShrinkagePercent(0), "0");
  assert.equal(formatShrinkagePercent(-1.26), "-1.3");
});
