import { test } from "node:test";
import assert from "node:assert/strict";
import { getShowroom } from "../data/showrooms.ts";
import { qualityGates } from "../data/quality-gates.ts";
import { workflowStages, workflowGroups, stagesInGroup } from "../data/workflow.ts";

/**
 * Spec §27/§49 — the showroom is the only route on this site that grants access
 * on a secret, so its failure modes are asserted rather than assumed.
 */

test("an unknown token returns null, not a default showroom", () => {
  assert.equal(getShowroom("definitely-not-a-token"), null);
  assert.equal(getShowroom(""), null);
  assert.equal(getShowroom("demo"), null, "a prefix of a real token must not match");
});

test("the demo token resolves and is labelled as a demonstration", () => {
  const s = getShowroom("demo-showroom-not-a-real-buyer");
  assert.ok(s);
  assert.equal(s.demo, true);
  assert.ok(s.categories.length > 0);
});

test("no committed showroom names a real buyer", () => {
  const s = getShowroom("demo-showroom-not-a-real-buyer");
  assert.ok(s);
  assert.match(s.buyerLabel, /demonstration/i);
});

test("an expired showroom stops resolving", () => {
  const prev = process.env.SHOWROOM_CONFIG;
  process.env.SHOWROOM_CONFIG = JSON.stringify([
    { token: "expired-token-1234567890", buyerLabel: "X", categories: ["aprons"], expiresAt: "2020-01-01" },
    { token: "live-token-abcdefghij1234", buyerLabel: "Y", categories: ["aprons"], expiresAt: "2999-01-01" },
  ]);
  assert.equal(getShowroom("expired-token-1234567890"), null);
  assert.ok(getShowroom("live-token-abcdefghij1234"));
  process.env.SHOWROOM_CONFIG = prev;
});

test("malformed configuration is ignored rather than throwing", () => {
  const prev = process.env.SHOWROOM_CONFIG;
  process.env.SHOWROOM_CONFIG = "{not json";
  assert.doesNotThrow(() => getShowroom("anything"));
  assert.ok(getShowroom("demo-showroom-not-a-real-buyer"), "demo must still resolve");
  process.env.SHOWROOM_CONFIG = prev;
});

test("short tokens are rejected by configuration validation", () => {
  const prev = process.env.SHOWROOM_CONFIG;
  process.env.SHOWROOM_CONFIG = JSON.stringify([{ token: "short", buyerLabel: "Z", categories: ["aprons"] }]);
  assert.equal(getShowroom("short"), null, "tokens under 16 chars must not be accepted");
  process.env.SHOWROOM_CONFIG = prev;
});

/* ------------------------------------------------------- structural models */

test("nine quality gates, sequential, each with a stop condition", () => {
  assert.equal(qualityGates.length, 9);
  qualityGates.forEach((g, i) => {
    assert.equal(g.index, i + 1);
    assert.ok(g.onFailure.length > 0, `${g.name} has no stop condition`);
    assert.ok(g.checks.length > 0, `${g.name} has no checks`);
    assert.ok(g.record.length > 0, `${g.name} produces no record`);
  });
});

test("26 workflow stages, sequential, fully partitioned across six groups", () => {
  assert.equal(workflowStages.length, 26);
  workflowStages.forEach((s, i) => assert.equal(s.index, i + 1));

  const covered = workflowGroups.reduce((n, g) => n + stagesInGroup(g.id).length, 0);
  assert.equal(covered, 26, "every stage must belong to exactly one group");
  assert.equal(workflowGroups.length, 6);
});

test("every workflow stage says what AHM delivers", () => {
  for (const s of workflowStages) {
    assert.ok(s.ahmDelivers.length > 0, `stage ${s.index} delivers nothing`);
  }
});

