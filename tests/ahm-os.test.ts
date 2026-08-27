import { test } from "node:test";
import assert from "node:assert/strict";
import { toLead, toRfq, toBenchmarkRequest } from "../lib/ahm-os/mappers.ts";
import { AHM_OS_EVENTS, isAhmOsEvent } from "../lib/ahm-os/events.ts";

const META = { reference: "AHM-260826-AB12", source: "website:rfq", createdAt: "2026-08-26T00:00:00.000Z" };

test("a submission always becomes a lead at the head of the pipeline", () => {
  const lead = toLead({ company: "Acme", name: "Jo", email: "jo@acme.com", country: "US" }, META);
  assert.equal(lead.status, "lead");
  assert.equal(lead.id, META.reference);
  assert.equal(lead.source, "website:rfq");
});

test("blank and whitespace-only fields become undefined, never empty strings", () => {
  const lead = toLead({ company: "Acme", name: "  ", email: "jo@acme.com", country: "US", message: "   " }, META);
  assert.equal(lead.contactName, "");
  assert.equal(lead.notes, undefined);
});

test("quantity is coerced, and rejects zero, negatives and nonsense", () => {
  for (const [input, expected] of [["250", 250], [0, undefined], [-5, undefined], ["abc", undefined], ["", undefined]] as const) {
    const lead = toLead({ quantity: input }, META);
    assert.equal(lead.estimatedQuantity, expected, `quantity ${JSON.stringify(input)}`);
  }
});

test("product interest drops empty entries rather than carrying holes", () => {
  const lead = toLead({ category: "Aprons", product: "" }, META);
  assert.deepEqual(lead.productInterest, ["Aprons"]);
});

test("an rfq always carries at least one line item", () => {
  const rfq = toRfq({}, { reference: META.reference, createdAt: META.createdAt });
  assert.equal(rfq.lineItems.length, 1);
  assert.equal(rfq.lineItems[0].product, "Unspecified");
});

test("target FOB is carried as the buyer's target, never invented", () => {
  const rfq = toRfq({ targetPrice: "4.20" }, { reference: META.reference, createdAt: META.createdAt });
  assert.equal(rfq.lineItems[0].targetFob, "4.20");
  const blank = toRfq({}, { reference: META.reference, createdAt: META.createdAt });
  assert.equal(blank.lineItems[0].targetFob, undefined, "must not default to a figure");
});

test("benchmark requests map their own fields", () => {
  const b = toBenchmarkRequest({ category: "Polos", gsm: "200", currentSourcingCountry: "BD" }, { reference: META.reference });
  assert.equal(b.category, "Polos");
  assert.equal(b.gsm, "200");
  assert.equal(b.currentSourcingCountry, "BD");
});

test("the event list and the type guard agree", () => {
  for (const e of AHM_OS_EVENTS) assert.ok(isAhmOsEvent(e), `${e} should be recognised`);
  assert.equal(isAhmOsEvent("lead.deleted"), false);
  assert.equal(isAhmOsEvent(""), false);
});
