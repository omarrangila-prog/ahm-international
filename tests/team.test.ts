import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { organisation, teamPublished, teamTotal, unitTotal, hasFigure, type Organisation } from "../data/team.ts";
import { routes } from "../data/routes.ts";

/**
 * The team page shows real people and real numbers or nothing. These hold the
 * rules in data/team.ts against whatever is filled in later.
 */

const example: Organisation = {
  source: "Owner, test",
  asOf: "2026-11-11",
  leadership: [{ name: "A Person", title: "Director", consent: true }],
  departments: [
    { id: "a", name: "Development", headcount: 4, children: [{ id: "a1", name: "Pattern", headcount: 3 }] },
    { id: "b", name: "Export" },
  ],
  partnerFactories: { headcount: 500, note: "Partner staff" },
};

test("totals are sums of the figures given, partner staff never included", () => {
  assert.equal(unitTotal(example.departments[0]), 7);
  assert.equal(teamTotal(example), 8);
  assert.ok(!hasFigure(example.departments[1]), "a department without a figure shows no number");
});

test("the page exists only with a structure and its source", () => {
  assert.ok(teamPublished(example));
  assert.ok(!teamPublished({ ...example, source: null }));
  assert.ok(!teamPublished({ ...example, departments: [] }));
});

test("while unpublished, /team is out of the sitemap and nothing links to it", () => {
  const route = routes.find((r) => r.path === "/team");
  assert.ok(route);
  assert.equal(route.noindex, !teamPublished());
  if (!teamPublished()) {
    const about = readFileSync("app/about/page.tsx", "utf8");
    assert.match(about, /teamPublished\(\)/, "the About link must be conditional");
  }
});

test("every named person in the real data has consent recorded", () => {
  const people = [
    ...organisation.leadership,
    ...organisation.departments.flatMap(function walk(u): { consent: unknown }[] {
      return [...(u.lead ? [u.lead] : []), ...(u.children ?? []).flatMap(walk)];
    }),
  ];
  for (const p of people) assert.equal(p.consent, true);
});

test("the published figures are the owner's: 200 in cutting and stitching, a floor overall, partners apart", async () => {
  const { totalIsFloor, formatCount } = await import("../data/team.ts");
  assert.ok(teamPublished());
  assert.equal(teamTotal(), 200);
  assert.ok(totalIsFloor(), "other teams have no figure, so the total shows as 200+");
  assert.equal(formatCount(teamTotal(), totalIsFloor()), "200+");
  assert.equal(organisation.partnerFactories?.headcount, 1000);
  assert.equal(formatCount(1000, true), "1,000+");
  assert.match(organisation.source ?? "", /owner/i);
});
