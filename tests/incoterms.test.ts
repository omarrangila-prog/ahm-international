import { test } from "node:test";
import assert from "node:assert/strict";
import { incoterms, shipmentSteps, AHM_DEFAULT_TERM } from "../data/incoterms.ts";

/**
 * A buyer reads this table and allocates cost and risk against it. The
 * structural invariants are cheap to assert and the mistakes they catch are
 * not — a term missing a step renders a blank cell that reads as "nobody",
 * and a risk point past the end of the chain would draw the marker off the
 * chart.
 */

test("every term allocates every step", () => {
  for (const term of incoterms) {
    for (const step of shipmentSteps) {
      const party = term.carriedBy[step.index];
      assert.ok(
        party === "seller" || party === "buyer",
        `${term.code} does not say who carries step ${step.index} (${step.label})`,
      );
    }
  }
});

test("risk passes at a real point on the chain", () => {
  for (const term of incoterms) {
    assert.ok(
      term.riskPassesAfter >= 1 && term.riskPassesAfter <= shipmentSteps.length,
      `${term.code}: riskPassesAfter ${term.riskPassesAfter} is off the chain`,
    );
  }
});

test("the seller never carries risk beyond what it pays for", () => {
  // The reverse — paying past the risk point — is legitimate and is exactly
  // what CFR and CIF do. Bearing risk for a step you have no involvement in is
  // not a term, it is a mistake in the table.
  for (const term of incoterms) {
    const lastSellerStep = Math.max(
      ...shipmentSteps.filter((s) => term.carriedBy[s.index] === "seller").map((s) => s.index),
      0,
    );
    assert.ok(
      term.riskPassesAfter <= lastSellerStep,
      `${term.code}: risk passes after ${term.riskPassesAfter} but the seller's last step is ${lastSellerStep}`,
    );
  }
});

test("CFR and CIF keep cost and risk apart", () => {
  // The single most expensive misunderstanding in the set, and the reason the
  // chart models the two separately. If a refactor ever collapses them, this
  // fails rather than quietly teaching buyers the wrong thing.
  for (const code of ["CFR", "CIF"]) {
    const term = incoterms.find((t) => t.code === code)!;
    const lastPaid = Math.max(
      ...shipmentSteps.filter((s) => term.carriedBy[s.index] === "seller").map((s) => s.index),
    );
    assert.ok(
      term.riskPassesAfter < lastPaid,
      `${code}: risk should pass before the last step the seller pays for`,
    );
    assert.equal(term.riskPassesAfter, 5, `${code}: risk passes when the goods are on board`);
  }
});

test("FOB puts the seller on the hook to the ship's rail and no further", () => {
  const fob = incoterms.find((t) => t.code === "FOB")!;
  assert.equal(fob.riskPassesAfter, 5);
  assert.equal(fob.carriedBy[5], "seller"); // loading on board
  assert.equal(fob.carriedBy[6], "buyer"); // sea freight
});

test("EXW leaves everything but packing with the buyer", () => {
  const exw = incoterms.find((t) => t.code === "EXW")!;
  assert.equal(exw.carriedBy[1], "seller");
  for (const step of shipmentSteps.filter((s) => s.index > 1)) {
    assert.equal(exw.carriedBy[step.index], "buyer", `EXW step ${step.index}`);
  }
});

test("DAP leaves risk with the seller through import clearance", () => {
  // The buyer clears import at step 9 while the goods are still at the
  // seller's risk. Passing risk at 8 would make DAP read like CIF and hand the
  // buyer a loss it does not own.
  const dap = incoterms.find((t) => t.code === "DAP")!;
  assert.equal(dap.riskPassesAfter, 10);
});

test("DAP is non-contiguous, and deliberately so", () => {
  // The seller carries past the destination terminal and on to the door while
  // import clearance stays with the buyer. Drawn as one unbroken bar it would
  // be tidier and wrong.
  const dap = incoterms.find((t) => t.code === "DAP")!;
  assert.equal(dap.carriedBy[8], "seller");
  assert.equal(dap.carriedBy[9], "buyer"); // import clearance and duty
  assert.equal(dap.carriedBy[10], "seller"); // onward delivery
});

test("DDP leaves nothing with the buyer", () => {
  const ddp = incoterms.find((t) => t.code === "DDP")!;
  for (const step of shipmentSteps) {
    assert.equal(ddp.carriedBy[step.index], "seller", `DDP step ${step.index}`);
  }
});

test("the term AHM quotes is on the chart", () => {
  assert.ok(incoterms.some((t) => t.code === AHM_DEFAULT_TERM));
});

test("steps are numbered in order with no gaps", () => {
  shipmentSteps.forEach((step, i) => assert.equal(step.index, i + 1));
});
