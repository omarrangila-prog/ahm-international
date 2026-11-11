import test from "node:test";
import assert from "node:assert/strict";
import { productCategories } from "../data/products.ts";
import { productItems, itemPath, articleFor, itemForArticle } from "../data/items.ts";
import { itemHrefByName } from "../data/item-index.ts";
import { getProductFaqs } from "../data/product-faqs.ts";
import { routes } from "../data/routes.ts";

/**
 * One page per catalogue article, asked for by the owner on 10 November 2026.
 * These hold the three things that make forty-odd pages worth having rather
 * than a liability: every card opens one, no two say the same thing, and none
 * says more than the site can stand behind.
 */

const allArticleNames = [...new Set(productCategories.flatMap((c) => c.articles.map((a) => a.name)))];

test("every article in the catalogue opens exactly one item page", () => {
  for (const name of allArticleNames) {
    const owners = productItems.filter((i) => i.names.includes(name));
    assert.equal(owners.length, 1, `"${name}" is claimed by ${owners.length} item pages`);
  }
  for (const item of productItems) {
    for (const name of item.names) assert.ok(allArticleNames.includes(name), `${item.slug} names "${name}", which no family lists`);
    assert.ok(articleFor(item), `${item.slug} has no catalogue article`);
  }
});

test("an item lives under a family that lists it, at a unique address", () => {
  const paths = new Set<string>();
  for (const item of productItems) {
    const family = productCategories.find((c) => c.slug === item.family);
    assert.ok(family, `${item.slug}: no family ${item.family}`);
    assert.ok(family.articles.some((a) => item.names.includes(a.name)), `${item.slug} is not listed by its home family`);
    assert.ok(!paths.has(itemPath(item)), `${itemPath(item)} is used twice`);
    paths.add(itemPath(item));
    assert.match(item.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/);
  }
});

test("the browser catalogue's links agree with the item pages", () => {
  const derived = Object.fromEntries(productItems.flatMap((i) => i.names.map((n) => [n, itemPath(i)])));
  assert.deepEqual(itemHrefByName, derived);
  for (const name of allArticleNames) assert.equal(itemForArticle(name) ? itemPath(itemForArticle(name)!) : null, itemHrefByName[name]);
});

test("each page is written for its garment: nothing shared between two pages", () => {
  const seen = new Map<string, string>();
  const once = (kind: string, text: string, slug: string) => {
    const key = `${kind}:${text.toLowerCase()}`;
    assert.ok(!seen.has(key), `${kind} "${text}" appears on ${seen.get(key)} and ${slug}`);
    seen.set(key, slug);
  };
  const familyQuestions = new Set(productCategories.flatMap((c) => getProductFaqs(c.slug).map((f) => f.question)));
  for (const i of productItems) {
    once("intro", i.intro, i.slug);
    once("summary", i.summary, i.slug);
    once("title", i.seoTitle, i.slug);
    once("description", i.seoDescription, i.slug);
    for (const f of i.faqs) {
      once("question", f.question, i.slug);
      assert.ok(!familyQuestions.has(f.question), `${i.slug} repeats a family FAQ: "${f.question}"`);
    }
  }
});

test("each page has real substance", () => {
  for (const i of productItems) {
    assert.ok(i.features.length >= 4, `${i.slug}: ${i.features.length} construction choices`);
    assert.ok(i.measurements.length >= 4, `${i.slug}: ${i.measurements.length} points of measure`);
    assert.ok(i.specification.length >= 4, `${i.slug}: ${i.specification.length} specification rows`);
    assert.ok(i.logoPositions.length >= 2, `${i.slug}: ${i.logoPositions.length} logo positions`);
    assert.ok(i.faqs.length >= 3, `${i.slug}: ${i.faqs.length} questions`);
  }
});

test("no item page prices, promises or speaks for a factory", () => {
  for (const i of productItems) {
    const text = JSON.stringify(i);
    assert.doesNotMatch(text, /[$€£]|\bUSD\b|\bper (piece|pc)\b/i, `${i.slug} states a price`);
    assert.doesNotMatch(text, /\bMOQ\b|minimum order of \d|\bin \d+ (days|weeks)\b/i, `${i.slug} states an MOQ or lead time`);
    assert.doesNotMatch(text, /\bguarantee|\bcertified by AHM|\bour (factory|machines|laboratory)\b/i, `${i.slug} overclaims`);
    // The one documented export is the bib apron; no other page may claim one.
    if (i.slug !== "bib-apron") assert.doesNotMatch(text, /documented (FOB )?export/i, `${i.slug} claims an export`);
  }
});

test("titles and descriptions fit the search result", () => {
  for (const i of productItems) {
    assert.ok(i.seoTitle.length <= 42, `${i.slug} title is ${i.seoTitle.length} characters`);
    assert.ok(i.seoDescription.length <= 155, `${i.slug} description is ${i.seoDescription.length} characters`);
  }
});

test("every item page is in the sitemap", () => {
  const paths = new Set(routes.map((r) => r.path));
  for (const i of productItems) assert.ok(paths.has(itemPath(i)), `${itemPath(i)} missing from routes`);
});
