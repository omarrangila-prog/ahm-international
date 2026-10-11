import { test } from "node:test";
import assert from "node:assert/strict";
import { rfqSchema, FIELD_STEP, RFQ_STEPS } from "../lib/rfq-schema.ts";

/**
 * The full quote form shipped unable to submit for any buyer who left Gender
 * unanswered: the select's placeholder posts "", the schema's enum refused it,
 * and the error rendered on step 2 while the buyer pressed send on step 7.
 * These hold the fix and the safety net.
 */

const minimal = {
  company: "Example Uniforms",
  name: "Ada Buyer",
  email: "ada@example.com",
  country: "United Kingdom",
  category: "Aprons",
  quantity: "Under 500 pcs",
};

test("a buyer who answers only the required fields can submit, whatever the optional selects post", () => {
  // What the browser actually sends for untouched selects and inputs.
  const asPosted = { ...minimal, gender: "", repeatProgram: "", fabric: "", weight: "", decoration: [], source: "rfq_page" };
  const parsed = rfqSchema.safeParse(asPosted);
  assert.ok(parsed.success, JSON.stringify(parsed.error?.issues));
  assert.ok(rfqSchema.safeParse(minimal).success);
});

test("optional selects still refuse values that are not options", () => {
  assert.equal(rfqSchema.safeParse({ ...minimal, gender: "Robot" }).success, false);
  assert.equal(rfqSchema.safeParse({ ...minimal, repeatProgram: "Maybe" }).success, false);
  assert.ok(rfqSchema.safeParse({ ...minimal, gender: "Women's", repeatProgram: "Yes" }).success);
});

test("every field the form validates belongs to a step, so a failed submit can go to it", () => {
  const fields = Object.keys(rfqSchema.shape).filter((k) => k !== "faxNumber" && k !== "source");
  const unmapped = fields.filter((f) => FIELD_STEP[f] === undefined);
  assert.deepEqual(unmapped, []);
  for (const step of Object.values(FIELD_STEP)) assert.ok(step >= 0 && step < RFQ_STEPS.length);
});
