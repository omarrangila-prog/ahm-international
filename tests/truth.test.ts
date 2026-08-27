import { test } from "node:test";
import assert from "node:assert/strict";
import { isPublishable, VERIFICATION_LABEL, CAPABILITY_LABEL } from "../data/verification.ts";
import { publicValue, company } from "../data/company.ts";
import { caseStudies } from "../data/caseStudies.ts";
import { productCategories } from "../data/products.ts";
import { trims } from "../data/trims.ts";

/**
 * The rules from spec §2, asserted rather than trusted.
 *
 * These are the tests worth having: they fail if someone publishes an
 * unverified fact, which is the one mistake on this site that costs a customer.
 */

test("pending_verification is the only status that cannot be published", () => {
  assert.equal(isPublishable("pending_verification"), false);
  for (const s of ["verified", "internally_verified", "development_capability", "qualification_required"] as const) {
    assert.equal(isPublishable(s), true, s);
  }
});

test("every status has a label, so nothing renders as a raw enum", () => {
  for (const k of Object.keys(VERIFICATION_LABEL)) assert.ok(VERIFICATION_LABEL[k as keyof typeof VERIFICATION_LABEL]);
  for (const k of Object.keys(CAPABILITY_LABEL)) assert.ok(CAPABILITY_LABEL[k as keyof typeof CAPABILITY_LABEL]);
});

test("publicValue withholds anything not both verified and public", () => {
  assert.equal(publicValue({ value: "x", verified: false, public: true }), null);
  assert.equal(publicValue({ value: "x", verified: true, public: false }), null);
  assert.equal(publicValue({ value: null, verified: true, public: true }), null);
  assert.equal(publicValue({ value: "x", verified: true, public: true }), "x");
});

test("no certification or public customer is published without evidence", () => {
  assert.deepEqual(company.certifications, [], "certifications must stay empty until documented");
  assert.deepEqual(company.publicCustomers, [], "customer names require written approval");
});

test("case studies cannot carry a customer logo", () => {
  for (const cs of caseStudies) {
    assert.equal(cs.logoPermission, false);
    assert.equal(cs.logo, null);
  }
});

test("every product category declares a capability status", () => {
  for (const c of productCategories) {
    assert.ok(c.capabilityStatus, `${c.slug} is missing capabilityStatus`);
  }
});

test("protective and children's items are never presented as already qualified", () => {
  const reflective = trims.find((t) => t.slug === "reflective-tape");
  assert.equal(reflective?.capabilityStatus, "technical_qualification_required");

  const kids = productCategories.find((c) => c.slug === "kidswear");
  assert.ok(kids);
  const bodysuits = kids.articles.filter((a) => a.name.toLowerCase().includes("bodysuit"));
  assert.ok(bodysuits.length > 0);
  for (const a of bodysuits) {
    assert.equal(a.capabilityStatus, "technical_qualification_required", a.name);
  }
});
