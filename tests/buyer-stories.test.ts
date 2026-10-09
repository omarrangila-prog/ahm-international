import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buyerStories,
  BUYER_STORY_DISCLAIMER,
  getBuyerStory,
} from "../data/buyerStories.ts";
import { caseStudies } from "../data/caseStudies.ts";

/**
 * Teaching scenarios must stay outside the verified case-study model.
 */

test("every buyer story carries the teaching disclaimer constant", () => {
  assert.ok(BUYER_STORY_DISCLAIMER.includes("Teaching scenario"));
  assert.ok(BUYER_STORY_DISCLAIMER.includes("not a published customer program"));
});

test("buyer stories are never mixed into caseStudies", () => {
  const caseSlugs = new Set(caseStudies.map((c) => c.slug));
  for (const story of buyerStories) {
    assert.ok(
      !caseSlugs.has(story.slug),
      `${story.slug} must not appear in caseStudies`,
    );
  }
});

test("buyer stories have no customer identity fields", () => {
  for (const story of buyerStories) {
    const keys = Object.keys(story);
    assert.ok(!keys.includes("client"));
    assert.ok(!keys.includes("customer"));
    assert.ok(!keys.includes("logo"));
    assert.ok(!keys.includes("verified"));
    assert.ok(story.related.length >= 2, `${story.slug} needs outbound links`);
  }
});

test("getBuyerStory resolves published slugs", () => {
  assert.equal(buyerStories.length, 4);
  for (const story of buyerStories) {
    assert.equal(getBuyerStory(story.slug)?.slug, story.slug);
  }
  assert.equal(getBuyerStory("not-a-story"), undefined);
});

test("only one verified case study is published", () => {
  assert.equal(caseStudies.length, 1);
  assert.equal(caseStudies[0]!.verified, true);
  assert.equal(caseStudies[0]!.logoPermission, false);
});
