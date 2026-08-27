import { test } from "node:test";
import assert from "node:assert/strict";
import { catalogue, catalogueFacets, filterCatalogue, EMPTY_FILTER } from "../data/catalogue.ts";
import { productCategories } from "../data/products.ts";

/**
 * Spec §63 — unit tests over the pure data transforms.
 *
 * Uses node:test and native type stripping, so the suite adds no dependency.
 * Only genuinely pure logic is covered here; rendering is verified by the
 * production build, which fails on a type or prerender error.
 */

test("catalogue derives one entry per article, with nothing lost", () => {
  const expected = productCategories.reduce((n, c) => n + c.articles.length, 0);
  assert.equal(catalogue.length, expected);
  assert.ok(catalogue.length > 0, "catalogue must not be empty");
});

test("every entry inherits a resolvable category", () => {
  for (const e of catalogue) {
    assert.ok(
      productCategories.some((c) => c.slug === e.categorySlug),
      `${e.id} points at unknown category ${e.categorySlug}`,
    );
  }
});

test("article capability overrides the category, otherwise inherits it", () => {
  for (const c of productCategories) {
    c.articles.forEach((a, i) => {
      const entry = catalogue.find((e) => e.id === `${c.slug}--${i}`);
      assert.ok(entry);
      assert.equal(entry.capabilityStatus, a.capabilityStatus ?? c.capabilityStatus);
    });
  }
});

test("no filter returns everything", () => {
  assert.equal(filterCatalogue(catalogue, EMPTY_FILTER).length, catalogue.length);
});

test("facets are AND-ed, so each choice can only narrow the list", () => {
  const category = catalogueFacets.categories[0].slug;
  const byCategory = filterCatalogue(catalogue, { ...EMPTY_FILTER, category });
  const application = byCategory[0]?.applications[0];
  const both = filterCatalogue(catalogue, { ...EMPTY_FILTER, category, application });

  assert.ok(byCategory.length <= catalogue.length);
  assert.ok(both.length <= byCategory.length, "adding a facet must not widen results");
  assert.ok(both.every((e) => e.categorySlug === category));
});

test("search matches name, note and category, and is case-insensitive", () => {
  const target = catalogue[0];
  const word = target.name.split(" ")[0];
  const hits = filterCatalogue(catalogue, { ...EMPTY_FILTER, q: word.toUpperCase() });
  assert.ok(hits.some((e) => e.id === target.id), `"${word}" should match ${target.name}`);
});

test("multi-word search requires every term (AND, not OR)", () => {
  const hits = filterCatalogue(catalogue, { ...EMPTY_FILTER, q: "polo apron" });
  assert.equal(hits.length, 0, "no single article is both a polo and an apron");
});

test("unmatched filter returns empty rather than falling back to everything", () => {
  const hits = filterCatalogue(catalogue, { ...EMPTY_FILTER, q: "zzzznotathing" });
  assert.equal(hits.length, 0);
});

test("facet values are unique and free of casing duplicates", () => {
  for (const list of [catalogueFacets.applications, catalogueFacets.decoration]) {
    assert.equal(new Set(list).size, list.length, "facet values must be unique");
    const lowered = list.map((v) => v.toLowerCase());
    assert.equal(new Set(lowered).size, lowered.length, "facets differing only by case");
  }
});
