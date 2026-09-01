import { test } from "node:test";
import assert from "node:assert/strict";
import { guides, guidesLinkingTo } from "../data/guides.ts";

/**
 * The guide link graph.
 *
 * Seven of the nine published guides once had a single inbound link, all from
 * `/resources`. `guidesLinkingTo` fixed that by deriving the back-link from
 * each guide's own `related` list, which only works while those lists stay
 * meaningful — so that is what these assert.
 */

test("every published guide relates to at least two routes", () => {
  for (const guide of guides) {
    assert.ok(
      guide.related.length >= 2,
      `${guide.slug} relates to ${guide.related.length} route(s); it will surface almost nowhere`,
    );
  }
});

test("no guide lists the same destination twice", () => {
  for (const guide of guides) {
    const hrefs = guide.related.map((r) => r.href);
    assert.equal(
      new Set(hrefs).size,
      hrefs.length,
      `${guide.slug} repeats a destination: ${hrefs.join(", ")}`,
    );
  }
});

test("every guide is surfaced by at least one route it relates to", () => {
  for (const guide of guides) {
    const surfaced = guide.related.some((related) =>
      guidesLinkingTo(related.href).some((g) => g.href === `/resources/${guide.slug}`),
    );
    assert.ok(surfaced, `${guide.slug} is not reachable from any page it relates to`);
  }
});

test("guidesLinkingTo is reciprocal and never self-referential", () => {
  for (const guide of guides) {
    for (const related of guide.related) {
      const back = guidesLinkingTo(related.href);
      assert.ok(
        back.some((g) => g.href === `/resources/${guide.slug}`),
        `${guide.slug} claims ${related.href} but is not returned for it`,
      );
      assert.ok(
        !back.some((g) => g.href === related.href),
        `${related.href} links to itself`,
      );
    }
  }
});
