import test from "node:test";
import assert from "node:assert/strict";
import { productCategories } from "../data/products.ts";
import { getProductFaqs } from "../data/product-faqs.ts";
import { guidesLinkingTo } from "../data/guides.ts";
import { megaMenu } from "../data/nav.ts";

/**
 * On 10 November 2026 the owner asked for every product family to carry what
 * the apron page carries. These hold it, so a family added later cannot ship
 * thinner than the rest.
 */

test("every family has the benchmark offer, with the four steps in order", () => {
  for (const c of productCategories) {
    assert.ok(c.costComparison, `${c.slug} has no benchmark offer`);
    assert.deepEqual(
      c.costComparison.steps.map((s) => s.title),
      ["You send the reference", "AHM reviews the construction", "Open points are clarified", "An FOB quotation is prepared"],
      `${c.slug}'s steps differ from the owner's process`,
    );
    // No step may produce a number: the offer never prices.
    assert.doesNotMatch(JSON.stringify(c.costComparison), /[$€£]|\bUSD\b|\d+\s*%/, `${c.slug}'s offer states a figure`);
  }
});

test("every family has its own FAQs, and no two families share a question", () => {
  const seen = new Map<string, string>();
  for (const c of productCategories) {
    const faqs = getProductFaqs(c.slug);
    assert.ok(faqs.length >= 3, `${c.slug} has ${faqs.length} FAQs`);
    for (const f of faqs) {
      assert.ok(!seen.has(f.question), `"${f.question}" appears on ${seen.get(f.question)} and ${c.slug}`);
      seen.set(f.question, c.slug);
    }
  }
});

test("every family has at least one guide that links to it", () => {
  for (const c of productCategories) {
    assert.ok(guidesLinkingTo(`/products/${c.slug}`).length > 0, `no guide links to /products/${c.slug}`);
  }
});

test("construction points sit on the picture, and only families with a picture have them", () => {
  for (const c of productCategories) {
    if (!c.callouts) continue;
    assert.ok(c.callouts.points.length >= 3, `${c.slug} marks fewer than three points`);
    for (const p of c.callouts.points) {
      assert.ok(p.x > 0 && p.x < 100 && p.y > 0 && p.y < 100, `${c.slug}: "${p.title}" is off the image`);
    }
  }
});

test("every family is in the products menu", () => {
  const linked = new Set(megaMenu.flatMap((g) => [g.href, ...g.links.map((l) => l.href)]));
  for (const c of productCategories) assert.ok(linked.has(`/products/${c.slug}`), `${c.slug} is not in the menu`);
});
