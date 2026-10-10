import { test } from "node:test";
import assert from "node:assert/strict";
import { productCategories } from "../data/products.ts";

/**
 * A sourcing manager filtering for aprons reads every article in the family as
 * an apron. A chef beanie sat in that list until a buyer-side review caught it.
 */

test("every article in the apron family is an apron", () => {
  const aprons = productCategories.find((c) => c.slug === "aprons");
  assert.ok(aprons, "the apron family exists");
  const misfiled = aprons.articles.filter((a) => !/apron/i.test(a.name)).map((a) => a.name);
  assert.deepEqual(misfiled, [], `not aprons: ${misfiled.join(", ")}`);
});

test("chef headwear is catalogued with chef wear", () => {
  const hospitality = productCategories.find((c) => c.slug === "hospitality-food-service");
  assert.ok(hospitality?.articles.some((a) => /beanie/i.test(a.name)));
});
