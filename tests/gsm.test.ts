import { test } from "node:test";
import assert from "node:assert/strict";
import {
  GSM_PER_OZ_PER_SQ_YARD,
  GSM_CUTTER_AREA_CM2,
  circleAreaCm2,
  fabricWeightGrams,
  gsmToOzPerSqYard,
  ozPerSqYardToGsm,
  parseWeightRange,
  rangeCovers,
  rollAreaSqMetres,
  swatchGsm,
} from "../lib/gsm.ts";
import { materials } from "../data/materials.ts";

/**
 * These are the only numbers on this site a visitor can check on their own
 * calculator, and they will be quoted back to a mill. A wrong constant is not a
 * cosmetic bug: a garment ordered at the wrong weight is a rejected shipment.
 */

test("one ounce per square yard is 33.906 g/m²", () => {
  // 28.349523125 g / 0.83612736 m². Both figures are exact by definition of the
  // international ounce and yard, so this conversion has no tolerance to argue
  // about — only arithmetic to get right.
  assert.ok(Math.abs(GSM_PER_OZ_PER_SQ_YARD - 33.905748) < 0.000_01);
});

test("the published conversions of common shirt weights are right", () => {
  // Checked against the figures a buyer would recognise.
  assert.equal(Math.round(ozPerSqYardToGsm(4)), 136);
  assert.equal(Math.round(ozPerSqYardToGsm(6)), 203);
  assert.equal(Math.round(ozPerSqYardToGsm(10)), 339); // 10 oz denim
});

test("converting back returns the original weight", () => {
  for (const gsm of [115, 180, 220, 340, 380]) {
    assert.ok(Math.abs(gsmToOzPerSqYard(ozPerSqYardToGsm(gsm)) - gsm) < 1e-9);
  }
});

test("a 100 cm² cutter makes GSM one hundred times the gram weight", () => {
  // The shortcut every QC bench uses. It holds *only* at 100 cm², which is the
  // reason swatchGsm takes an area rather than assuming one.
  assert.equal(swatchGsm(1.8, GSM_CUTTER_AREA_CM2), 180);
  assert.equal(swatchGsm(2.2, GSM_CUTTER_AREA_CM2), 220);
});

test("a hand-cut swatch is not the same as a cutter swatch", () => {
  // 10x10 cm happens to equal the cutter. 15x15 does not, and applying the
  // "times one hundred" shortcut to it overstates the weight by 125%.
  assert.equal(swatchGsm(2, 10 * 10), 200);
  assert.equal(swatchGsm(2, 15 * 15), 88.88888888888889);
});

test("the standard round cutter is 100 cm² at about 112.8 mm", () => {
  assert.ok(Math.abs(circleAreaCm2(11.284) - GSM_CUTTER_AREA_CM2) < 0.01);
});

test("weights and areas reject nonsense rather than returning zero", () => {
  for (const bad of [0, -1, NaN]) {
    assert.equal(swatchGsm(bad, 100), null);
    assert.equal(swatchGsm(2, bad), null);
    assert.equal(fabricWeightGrams(bad, 1), null);
    assert.equal(rollAreaSqMetres(bad, 150), null);
  }
});

test("roll area uses usable width in centimetres", () => {
  assert.equal(rollAreaSqMetres(100, 150), 150);
  // 100 m of 150 cm goods at 200 gsm weighs 30 kg.
  assert.equal(fabricWeightGrams(200, rollAreaSqMetres(100, 150)!), 30_000);
});

test("every published weight range parses", () => {
  for (const material of materials) {
    const range = parseWeightRange(material.typicalWeight);
    assert.ok(range, `${material.name}: "${material.typicalWeight}" did not parse`);
    assert.ok(
      range.min < range.max,
      `${material.name}: range ${range.min}-${range.max} is not ascending`,
    );
  }
});

test("range matching includes the endpoints", () => {
  assert.equal(rangeCovers("180-220 gsm", 180), true);
  assert.equal(rangeCovers("180-220 gsm", 220), true);
  assert.equal(rangeCovers("180-220 gsm", 179), false);
  assert.equal(rangeCovers("180-220 gsm", 221), false);
  assert.equal(rangeCovers("available on request", 200), false);
});
