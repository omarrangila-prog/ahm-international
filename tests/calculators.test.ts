import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CONTAINERS, UNITS, cartonLoad, chooseDecoration, convertUnit, costSheet, deviationPct, fabricKg, fabricMetres, fabricPrice,
  markerConsumption, splitSizes, toleranceRange, yarnCounts,
} from "../lib/calculators.ts";

/**
 * Each calculator against a worked example a reader can repeat by hand, plus
 * the rule that matters most: no tool returns a number it was not given the
 * ingredients for.
 */

const close = (a: number | null | undefined, b: number, tol = 1e-9) => {
  assert.ok(a !== null && a !== undefined, "expected a number");
  assert.ok(Math.abs(a - b) <= tol, `${a} is not ${b} (±${tol})`);
};

test("unit conversions use the exact defined factors", () => {
  close(convertUnit("length", 1, "in", "cm"), 2.54);
  close(convertUnit("length", 1, "yd", "m"), 0.9144);
  close(convertUnit("length", 36, "in", "yd"), 1);
  close(convertUnit("area", 1, "yd²", "m²"), 0.83612736);
  close(convertUnit("mass", 1, "lb", "g"), 453.59237);
  close(convertUnit("mass", 16, "oz", "lb"), 1, 1e-9);
  assert.equal(convertUnit("length", 1, "in", "kg"), null);
  assert.equal(convertUnit("length", NaN, "in", "cm"), null);
  // Every unit table is consistent with itself: there and back is the identity.
  for (const dim of Object.keys(UNITS) as (keyof typeof UNITS)[]) {
    const names = Object.keys(UNITS[dim]);
    for (const a of names) for (const b of names) close(convertUnit(dim, convertUnit(dim, 7.5, a, b)!, b, a), 7.5, 1e-9);
  }
});

test("yarn counts agree across tex, denier, Nm and Ne", () => {
  const ne30 = yarnCounts(30, "ne")!;
  close(ne30.tex, 19.685, 0.001); // 590.5412 / 30
  close(ne30.nm, 50.8, 0.01);
  close(ne30.denier, 177.17, 0.01);
  close(yarnCounts(100, "tex")!.denier, 900);
  close(yarnCounts(900, "denier")!.tex, 100);
  close(yarnCounts(50, "nm")!.tex, 20);
  // Round trip through every system.
  for (const sys of ["tex", "denier", "nm", "ne"] as const) {
    const all = yarnCounts(25, sys)!;
    for (const back of ["tex", "denier", "nm", "ne"] as const) close(yarnCounts(all[back], back)![sys], 25, 1e-9);
  }
  assert.equal(yarnCounts(0, "tex"), null);
  assert.equal(yarnCounts(-3, "ne"), null);
});

test("fabric weight and length", () => {
  close(fabricKg(200, 1.5, 100), 30); // the roll in the GSM guide
  close(fabricMetres(200, 1.5, 30), 100);
  assert.equal(fabricKg(0, 1.5, 100), null);
  assert.equal(fabricMetres(200, 1.5, -1), null);
});

test("fabric price per kg, per metre and per yard are one price", () => {
  const p = fabricPrice({ gsm: 200, widthM: 1.5, pricePerKg: 5 })!;
  close(p.kgPerMetre, 0.3);
  close(p.pricePerMetre, 1.5);
  close(p.pricePerYard, 1.5 * 0.9144);
  close(p.metresPerKg, 1 / 0.3);
  const back = fabricPrice({ gsm: 200, widthM: 1.5, pricePerMetre: 1.5 })!;
  close(back.pricePerKg, 5);
  assert.equal(fabricPrice({ gsm: 200, widthM: 1.5 }), null, "no price given, no price returned");
});

test("marker consumption is the marker's length over its garments, and nothing else", () => {
  const m = markerConsumption({ markerLengthM: 2.4, garmentsInMarker: 6, usableWidthM: 1.5, quantity: 1000, allowancePct: 3, gsm: 200 })!;
  close(m.perGarmentM, 0.4);
  close(m.totalM, 412);
  close(m.totalYd, 412 / 0.9144);
  close(m.totalKg, (200 * 1.5 * 412) / 1000);
  assert.equal(m.efficiency, null, "no pattern area, no efficiency");
  const e = markerConsumption({ markerLengthM: 2.4, garmentsInMarker: 6, usableWidthM: 1.5, quantity: 100, allowancePct: 0, patternAreaM2: 0.5 })!;
  close(e.efficiency, (0.5 * 6) / (2.4 * 1.5)); // 0.8333: area covered by pattern over area of the marker
  assert.equal(markerConsumption({ markerLengthM: 0, garmentsInMarker: 6, usableWidthM: 1.5, quantity: 1, allowancePct: 0 }), null);
  assert.equal(markerConsumption({ markerLengthM: 2.4, garmentsInMarker: 6, usableWidthM: 1.5, quantity: 1, allowancePct: -1 }), null);
});

test("size splits add up to the order, and no size is more than one garment from its share", () => {
  const rows = splitSizes(1000, [{ size: "S", ratio: 1 }, { size: "M", ratio: 2 }, { size: "L", ratio: 2 }, { size: "XL", ratio: 1 }])!;
  assert.deepEqual(rows.map((r) => r.qty), [167, 333, 333, 167]);
  for (let total = 1; total <= 400; total += 7) {
    const ratios = [{ size: "XS", ratio: 1 }, { size: "S", ratio: 3 }, { size: "M", ratio: 5 }, { size: "L", ratio: 4 }, { size: "XL", ratio: 2 }, { size: "XXL", ratio: 1 }];
    const sum = ratios.reduce((a, r) => a + r.ratio, 0);
    const out = splitSizes(total, ratios)!;
    assert.equal(out.reduce((a, r) => a + r.qty, 0), total);
    out.forEach((r, i) => assert.ok(Math.abs(r.qty - (total * ratios[i].ratio) / sum) < 1, `${r.size} at ${total}`));
  }
  assert.equal(splitSizes(100, [{ size: "M", ratio: 0 }]), null);
  assert.equal(splitSizes(10.5, [{ size: "M", ratio: 1 }]), null);
});

test("carton volume, count and container share", () => {
  const c = cartonLoad({ lengthCm: 60, widthCm: 40, heightCm: 30, piecesPerCarton: 12, pieces: 100, cartonKg: 8 })!;
  close(c.cbmPerCarton, 0.072);
  assert.equal(c.cartons, 9);
  assert.equal(c.lastCarton, 4);
  close(c.totalCbm, 0.648);
  close(c.grossKg, 72);
  close(c.containers[0].share, 0.648 / CONTAINERS[0].nominalCbm);
  assert.equal(cartonLoad({ lengthCm: 60, widthCm: 40, heightCm: 30, piecesPerCarton: 12, pieces: 96 })!.lastCarton, 12);
  assert.equal(cartonLoad({ lengthCm: 60, widthCm: 40, heightCm: 30, piecesPerCarton: 12.5, pieces: 100 }), null);
});

test("the cost sheet adds up to its own total, from inputs only", () => {
  const c = costSheet({ fabricPerPiece: 1.2, fabricPricePerM: 3, fabricWastePct: 5, make: 1, trims: 0.2, decoration: 0.3, packing: 0.1, testing: 0.1, overheadPct: 10, marginPct: 8, quantity: 2000 })!;
  close(c.lines[0].value, 1.2 * 1.05 * 3); // 3.78
  const direct = 3.78 + 1 + 0.2 + 0.3 + 0.1 + 0.1;
  close(c.lines[6].value, direct * 0.1);
  close(c.perPiece, direct * 1.1 * 1.08);
  close(c.lines.reduce((a, l) => a + l.value, 0), c.perPiece);
  close(c.total, c.perPiece * 2000);
  assert.equal(costSheet({ fabricPerPiece: 1.2, fabricPricePerM: -3, fabricWastePct: 5, make: 1, trims: 0, decoration: 0, packing: 0, testing: 0, overheadPct: 0, marginPct: 0, quantity: 1 }), null);
});

test("tolerance and deviation", () => {
  const r = toleranceRange(200, 5, "percent")!;
  close(r.min, 190);
  close(r.max, 210);
  close(toleranceRange(60, 1.5, "absolute")!.max, 61.5);
  close(deviationPct(194, 200), -3);
  assert.equal(toleranceRange(200, 0, "percent"), null);
  assert.equal(deviationPct(10, 0), null);
});

test("the decoration chooser gives reasons, is honest about hard limits, and never prices", () => {
  const fit = (input: Parameters<typeof chooseDecoration>[0], method: string) => chooseDecoration(input).find((a) => a.method.startsWith(method))!;
  const base = { fabric: "polyester" as const, dark: false, size: "large" as const, colours: "photo" as const, run: "small" as const };
  assert.equal(fit(base, "Sublimation").fit, "suits");
  assert.equal(fit({ ...base, fabric: "cotton" }, "Sublimation").fit, "avoid");
  assert.equal(fit({ ...base, dark: true }, "Sublimation").fit, "avoid");
  assert.equal(fit(base, "Machine embroidery").fit, "avoid", "photographic artwork cannot be stitched");
  assert.equal(fit(base, "Screen printing").fit, "avoid");
  assert.equal(fit({ ...base, colours: "few", size: "small", fabric: "polycotton" }, "Machine embroidery").fit, "suits");
  for (const advice of chooseDecoration({ ...base, fabric: "stretch" })) {
    assert.ok(advice.reasons.length > 0, advice.method);
    for (const reason of advice.reasons) assert.doesNotMatch(reason, /[$£€]|\bcheap(est)?\b|\bguarantee/i, `${advice.method}: ${reason}`);
  }
  // Best fits first.
  const order = chooseDecoration(base).map((a) => a.fit);
  assert.deepEqual([...order].sort((a, b) => ["suits", "consider", "avoid"].indexOf(a) - ["suits", "consider", "avoid"].indexOf(b)), order);
});
