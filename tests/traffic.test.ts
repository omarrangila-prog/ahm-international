import test from "node:test";
import assert from "node:assert/strict";
import {
  applyBatch,
  classifySource,
  cleanPath,
  emptyDay,
  isBot,
  isApronPath,
  mergeDay,
  parseBatch,
  summarise,
  COUNTED_EVENTS,
} from "../lib/traffic/model.ts";

test("referrers become platforms, and an unknown site keeps its own row", () => {
  assert.equal(classifySource("www.google.com", null).key, "google");
  assert.equal(classifySource("www.google.co.uk", null).key, "google");
  assert.equal(classifySource("chatgpt.com", null).key, "chatgpt");
  assert.equal(classifySource("www.linkedin.com", null).key, "linkedin");
  assert.equal(classifySource("l.facebook.com", null).key, "facebook");
  assert.equal(classifySource("t.co", null).key, "x");
  assert.equal(classifySource("some-blog.example", null).key, "site:some-blog.example");
});

test("no referrer, or the site itself, is direct", () => {
  assert.equal(classifySource(null, null).key, "direct");
  assert.equal(classifySource("www.ahminternationals.com", null).key, "direct");
  assert.equal(classifySource("ahm-international.vercel.app", null).key, "direct");
});

test("a utm_source wins over the referrer, and is cleaned", () => {
  assert.equal(classifySource("www.linkedin.com", "LinkedIn Nov!").key, "utm:linkedin-nov");
});

test("a host that merely ends in a platform name is not that platform", () => {
  assert.notEqual(classifySource("notgoogle.com", null).key, "google");
  assert.notEqual(classifySource("evil-linkedin.com", null).key, "linkedin");
});

test("crawlers and scripts are not counted; a real browser is", () => {
  assert.ok(isBot("Mozilla/5.0 (compatible; Googlebot/2.1)"));
  assert.ok(isBot("Mozilla/5.0 Chrome-Lighthouse"));
  assert.ok(isBot("HeadlessChrome/120"));
  assert.ok(isBot(""));
  assert.ok(isBot(null));
  assert.ok(!isBot("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) AppleWebKit/605 Safari/604"));
});

test("paths lose their query, and the register and API are never counted", () => {
  assert.equal(cleanPath("/resources/fabric-gsm-guide?utm_source=x#top"), "/resources/fabric-gsm-guide");
  assert.equal(cleanPath("/products/aprons/"), "/products/aprons");
  assert.equal(cleanPath("/"), "/");
  assert.equal(cleanPath("/pipeline/leads/AHM-1"), null);
  assert.equal(cleanPath("/api/rfq"), null);
  assert.equal(cleanPath("https://evil.example/x"), null);
  assert.equal(cleanPath("/a b"), null);
  assert.equal(cleanPath("/" + "a".repeat(200)), null);
});

test("a posted body is reduced to the known shape", () => {
  const ok = parseBatch(JSON.stringify({ views: ["/", "/products/aprons"], ref: "www.google.com", landed: true, events: { knowledge_search: 2, hacked: 9, email_click: -1 } }));
  assert.deepEqual(ok?.views, ["/", "/products/aprons"]);
  assert.deepEqual(ok?.events, { knowledge_search: 2 });
  assert.equal(parseBatch("not json"), null);
  assert.equal(parseBatch(JSON.stringify({ views: ["/pipeline"] })), null);
  assert.equal(parseBatch("x".repeat(5000)), null);
  assert.equal(parseBatch(JSON.stringify({ views: ["/"], ref: "bad host/with slash" }))?.ref, null);
});

test("a batch is added to a day: a visit once, every view, and the platform", () => {
  let day = emptyDay("2026-11-10");
  day = applyBatch(day, parseBatch(JSON.stringify({ views: ["/", "/products/aprons"], ref: "chatgpt.com", landed: true, events: { whatsapp_click: 1 } }))!);
  day = applyBatch(day, parseBatch(JSON.stringify({ views: ["/resources"], landed: false }))!);
  assert.equal(day.visits, 1);
  assert.equal(day.views, 3);
  assert.deepEqual(day.sources, { chatgpt: 1 });
  assert.deepEqual(day.landings, { "/": 1 });
  assert.equal(day.events.whatsapp_click, 1);
});

test("a flood of distinct paths cannot grow a document without bound", () => {
  let day = emptyDay("2026-11-10");
  for (let i = 0; i < 400; i++) day = applyBatch(day, { views: [`/p${i}`], ref: null, utm: null, landed: true, events: {} });
  assert.ok(Object.keys(day.paths).length <= 151);
  assert.equal(day.views, 400);
  assert.equal(Object.values(day.paths).reduce((a, b) => a + b, 0), 400);
});

test("shards add back to one day, and the summary picks out aprons", () => {
  const a = applyBatch(emptyDay("d"), { views: ["/products/aprons", "/"], ref: null, utm: null, landed: true, events: { knowledge_search: 1 } });
  const b = applyBatch(emptyDay("d"), { views: ["/resources/apron-types-and-specification"], ref: "www.bing.com", utm: null, landed: true, events: { knowledge_search_miss: 1 } });
  const s = summarise([mergeDay("d", [a, b])]);
  assert.equal(s.visits, 2);
  assert.equal(s.views, 3);
  assert.equal(s.searches, 1);
  assert.equal(s.searchMisses, 1);
  assert.equal(s.apron.views, 2);
  assert.equal(s.apron.landings, 2);
  assert.ok(isApronPath("/products/aprons"));
  assert.ok(!isApronPath("/products/shirts"));
});

test("every counted event is one the site actually emits", async () => {
  const { readFileSync } = await import("node:fs");
  const { execSync } = await import("node:child_process");
  const code = execSync(`grep -rhoE "(track\\(|event=)\\"[a-z_]+\\"" components app lib --include=*.tsx --include=*.ts`, { encoding: "utf8" });
  const emitted = new Set([...code.matchAll(/"([a-z_]+)"/g)].map((m) => m[1]));
  const knowledge = readFileSync("components/sections/KnowledgeSearch.tsx", "utf8");
  for (const name of Object.keys(COUNTED_EVENTS)) {
    assert.ok(emitted.has(name) || knowledge.includes(`"${name}"`), `${name} is counted but nothing emits it`);
  }
});

test("the cookie answers new, returning, or already counted, and never more", async () => {
  const { visitorFromCookie, SEEN_OFF } = await import("../lib/traffic/model.ts");
  assert.equal(visitorFromCookie(null, "2026-11-10"), "new");
  assert.equal(visitorFromCookie("garbage", "2026-11-10"), "new");
  assert.equal(visitorFromCookie("2026-11-09", "2026-11-10"), "returning");
  assert.equal(visitorFromCookie("2026-11-10", "2026-11-10"), null);
  assert.equal(visitorFromCookie(SEEN_OFF, "2026-11-10"), null);
});

test("a unique visitor is counted with its visit and its platform, and only with a visit", () => {
  let day = emptyDay("d");
  day = applyBatch(day, { views: ["/"], ref: "www.google.com", utm: null, landed: true, uv: "new", events: {} });
  day = applyBatch(day, { views: ["/products/aprons"], ref: "chatgpt.com", utm: null, landed: true, uv: "returning", events: {} });
  day = applyBatch(day, { views: ["/resources"], ref: null, utm: null, landed: true, uv: null, events: {} });
  day = applyBatch(day, { views: ["/x"], ref: null, utm: null, landed: false, uv: "new", events: {} });
  assert.equal(day.visits, 3);
  assert.equal(day.uniques, 2);
  assert.equal(day.newVisitors, 1);
  assert.deepEqual(day.uniqueSources, { google: 1, chatgpt: 1 });
  assert.equal(parseBatch(JSON.stringify({ views: ["/"], landed: true, uv: "evil" }))?.uv, null);
});

test("the cookie holds a date, lives thirteen months, and has nothing to identify", async () => {
  const { readFileSync } = await import("node:fs");
  const client = readFileSync("lib/traffic/client.ts", "utf8");
  const { SEEN_MAX_AGE } = await import("../lib/traffic/model.ts");
  assert.equal(SEEN_MAX_AGE, 395 * 86400);
  // The only values ever written are a day key, "off", or nothing.
  const writes = [...client.matchAll(/writeSeen\(([^)]*)\)/g)].map((m) => m[1]).filter((a) => a !== "value: string");
  assert.deepEqual(writes.sort(), ["SEEN_OFF", "today"]);
  assert.doesNotMatch(client, /random|uuid|crypto/i);
});
