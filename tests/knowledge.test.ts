import { test } from "node:test";
import assert from "node:assert/strict";
import { guides } from "../data/guides.ts";
import { gsmGuide } from "../data/guide-gsm.ts";
import { routes } from "../data/routes.ts";
import { guideTopics, knowledgeEntries, queryGroups, topics } from "../data/knowledge.ts";
import { buildIndex, normalise, search } from "../lib/knowledge-search.ts";
import { gsmToOzPerSqYard, ozPerSqYardToGsm, swatchGsm, fabricWeightGrams } from "../lib/gsm.ts";

/**
 * The Knowledge Center's two promises: a reader finds the page that answers
 * their question however they phrase it, and a number in a guide is a number
 * the calculator would also give.
 */

const entries = knowledgeEntries();
const index = buildIndex(entries, queryGroups);
const top = (q: string, n = 3) => search(index, q).slice(0, n).map((r) => r.entry.href);

test("every guide belongs to a topic, and every topic reference is real", () => {
  const ids = new Set(topics.map((t) => t.id));
  for (const g of guides) {
    assert.ok((guideTopics[g.slug] ?? []).length > 0, `${g.slug} has no topic`);
    for (const t of guideTopics[g.slug]) assert.ok(ids.has(t), `${g.slug}: unknown topic ${t}`);
  }
  for (const slug of Object.keys(guideTopics)) assert.ok(guides.some((g) => g.slug === slug), `topic map names a guide that does not exist: ${slug}`);
});

test("every entry points at a page that exists", () => {
  const paths = new Set(routes.map((r) => r.path));
  for (const e of entries) {
    const path = e.href.split("#")[0];
    assert.ok(paths.has(path), `${e.id} -> ${path} is not a route`);
  }
});

test("each Search Console query, in any wording, finds the page that answers it first", () => {
  const hrefs = new Set(entries.map((e) => e.href));
  for (const group of queryGroups) {
    if (!hrefs.has(group.target)) continue; // brand query: answered by the homepage, not by search
    for (const q of group.queries) assert.equal(top(q, 1)[0], group.target, `"${q}" should lead to ${group.target}`);
  }
});

test("phrasings that are not on the list still reach the GSM guide or its calculator", () => {
  for (const q of ["what does gsm mean in cotton", "g/m2", "oz/yd2 converter", "grams per square metre", "GSM?", "fabric weight", "gsm to oz"]) {
    const found = top(q, 3);
    assert.ok(found.some((h) => h === "/resources/fabric-gsm-guide" || h === "/materials#gsm-heading"), `"${q}" -> ${found.join(", ")}`);
  }
});

test("search tolerates one wrong letter, and does not guess between two", () => {
  assert.ok(top("polyestor dyeing").includes("/resources/polyester-dyeing-for-buyers"));
  assert.ok(top("shrinkge").some((h) => h.includes("shrinkage")));
  assert.deepEqual(search(index, "qqqqzzzz"), []);
  assert.deepEqual(search(index, ""), []);
  assert.deepEqual(search(index, "what is the"), []);
});

test("every word must match, and a topic filter narrows without needing a query", () => {
  const both = search(index, "gsm apron");
  const full = both.filter((r) => !r.partial);
  assert.ok(full.length > 0 && full.length < 8, `"gsm apron" returned ${full.length} full matches`);
  assert.ok(search(index, "gsm").length > full.length, "a second word should narrow the full matches");
  // Related results come after every full match, never before.
  const firstPartial = both.findIndex((r) => r.partial);
  if (firstPartial >= 0) assert.ok(both.slice(firstPartial).every((r) => r.partial));
  const decoration = search(index, "", "printing-embroidery");
  assert.ok(decoration.length >= 2 && decoration.every((r) => r.entry.topics.includes("printing-embroidery")));
});

test("a query with few full matches is topped up with related results, clearly separate", () => {
  const r = search(index, "fob manufacturing");
  assert.equal(r[0].entry.href, "/fob-apparel-manufacturing");
  assert.ok(r.some((x) => x.partial && x.entry.href === "/resources/how-fob-costing-works"), "the FOB costing guide should be offered as related");
  // A specific, well-answered query is not diluted.
  assert.ok(search(index, "what is gsm").every((x) => !x.partial));
});

test("question words and plurals do not change the answer", () => {
  assert.deepEqual(normalise("What is GSM in fabric?"), normalise("gsm fabric"));
  assert.deepEqual(normalise("aprons"), normalise("apron"));
  assert.deepEqual(normalise("poly-cotton"), normalise("polycotton"));
});

/* ------------------------- the GSM guide's numbers ------------------------ */

const text = JSON.stringify(gsmGuide);
const r1 = (n: number) => n.toFixed(1);
const r2 = (n: number) => n.toFixed(2);

test("the worked examples in the GSM guide are what the calculator gives", () => {
  assert.equal(swatchGsm(1.85, 100), 185);
  assert.equal(r1(swatchGsm(4.2, 225)!), "186.7");
  assert.equal(4.2 * 100, 420); // the shortcut the guide warns against, on a 225 cm² swatch
  assert.equal(r2(gsmToOzPerSqYard(200)), "5.90");
  assert.equal(r1(ozPerSqYardToGsm(6)), "203.4");
  assert.equal(r1(ozPerSqYardToGsm(8)), "271.2");
  assert.equal(r2(gsmToOzPerSqYard(400)), "11.80");
  assert.equal(r2(200 / 0.5 / 1000), "0.40");
  assert.equal(r2(200 / 0.9 / 1000), "0.22");
  assert.equal((fabricWeightGrams(30, 10_000)! / 1000) * 1, 300); // 30 g × 10,000 garments = 300 kg
  for (const shown of ["185 gsm", "186.7 gsm", "420 gsm (wrong)", "5.90 oz/yd²", "203.4 gsm", "271.2 gsm", "11.80 oz/yd²", "0.40 g/cm³", "0.22 g/cm³", "300 kg", "190 and 210 gsm"]) {
    assert.ok(text.includes(shown), `the guide no longer says "${shown}"`);
  }
  assert.ok(text.includes("33.906") && Math.abs(33.906 - 33.9057474748823) < 0.001);
});

test("every row of the GSM table carries the right ounce equivalent", () => {
  const table = gsmGuide.blocks.find((b) => b.type === "table" && b.heading === "What common GSM values usually mean");
  assert.ok(table && table.type === "table");
  assert.equal(table.rows.length, 9);
  for (const [gsm, oz] of table.rows) assert.equal(r2(gsmToOzPerSqYard(Number(gsm))), oz, `${gsm} gsm`);
});

test("the GSM guide never presents a range as an AHM production specification", () => {
  assert.doesNotMatch(text, /AHM (produces|makes|stocks|guarantees)/i);
  assert.match(text, /not AHM production specifications/);
});

/* ---------------------- guides that nobody has reviewed yet ---------------------- */

test("a guide marked updated claims no review, and names no AHM capability it cannot back", () => {
  const unreviewed = guides.filter((g) => g.updated);
  assert.ok(unreviewed.length >= 11, "the GSM guide and the ten new guides");
  for (const g of unreviewed) {
    const body = JSON.stringify(g);
    assert.doesNotMatch(body, /reviewed by|technically reviewed|peer.reviewed/i, `${g.slug} claims a review`);
    assert.doesNotMatch(body, /\bAHM (guarantees|certifies|has an in-house|owns|operates)\b|\bwe (test|certify|guarantee)\b/i, `${g.slug} claims an AHM capability`);
    // Where a choice depends on a factory, a guide must say to ask, not assert.
    assert.doesNotMatch(body, /\bour (factory|machines|laboratory|lab)\b/i, `${g.slug} speaks for a factory`);
  }
});

test("every tool a guide points to lives on a real page", () => {
  const paths = new Set(routes.map((r) => r.path));
  for (const g of guides) for (const t of g.tools ?? []) assert.ok(paths.has(t.href.split("#")[0]), `${g.slug} -> ${t.href}`);
});

test("every calculator has a search entry that points at its own section", () => {
  const ids = ["fabric-weight", "fabric-price", "consumption", "cost-builder", "cartons", "size-run", "tolerance", "decoration", "yarn", "units"];
  for (const id of ids) assert.ok(entries.some((e) => e.href === `/resources/calculators#${id}`), `no search entry for #${id}`);
  assert.equal(search(index, "cbm calculator")[0].entry.href, "/resources/calculators#cartons");
  assert.equal(search(index, "ne to tex")[0].entry.href, "/resources/calculators#yarn");
  assert.equal(search(index, "fob price calculator")[0].entry.href, "/resources/calculators#cost-builder");
});
