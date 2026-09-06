#!/usr/bin/env node
/**
 * Runtime errors on the rendered page, across every route.
 *
 *   npm run start &
 *   npm run console
 *
 * Three separate things, none of which the other audits would notice:
 *
 *   - uncaught exceptions (`pageerror`) — a thrown error stops the rest of that
 *     component tree hydrating, so an interactive control silently stops working
 *     while the page still looks correct.
 *   - console errors, including React's hydration mismatch warnings, which are
 *     logged rather than thrown and so leave no other trace.
 *   - requests that failed or returned >= 400. A broken image is invisible to
 *     `images:gaps`, which asks the registry what *should* render rather than
 *     watching what actually loaded.
 *
 * Routes come from the sitemap rather than a hand-kept list, so a new page is
 * covered the day it ships. `/showroom/*` is excluded: it is token-gated and a
 * 404 there is the access control working.
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const BASE = process.env.BASE ?? "http://localhost:3100";

const sitemap = await fetch(`${BASE}/sitemap.xml`)
  .then((r) => r.text())
  .catch((err) => {
    // A stack trace here reads as a bug in the audit rather than as "nothing is
    // listening", which is what it almost always means.
    console.log(`cannot reach ${BASE}/sitemap.xml — ${String(err).split("\n")[0]}`);
    console.log("start the production server first, or set BASE.");
    process.exit(1);
  });
const ROUTES = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .filter((p) => !p.startsWith("/showroom"));

if (!ROUTES.length) {
  console.log(`no routes found in ${BASE}/sitemap.xml — is the server up?`);
  process.exit(1);
}

/* Noise that is not a defect. Kept deliberately short: an exclusion list is the
   easiest place to hide a real failure, so each entry needs a reason. */
const IGNORE = [
  /favicon\.ico/, // requested by the browser, not the page
  /Download the React DevTools/, // dev-tools advert, informational
];
const ignored = (t) => IGNORE.some((re) => re.test(t));

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();

const unreachable = [];
const problems = new Map(); // message -> Set<route>
const note = (msg, route) => {
  if (ignored(msg)) return;
  const key = msg.slice(0, 160);
  if (!problems.has(key)) problems.set(key, new Set());
  problems.get(key).add(route);
};

let current = "";
page.on("pageerror", (e) => note(`UNCAUGHT  ${String(e).split("\n")[0]}`, current));
page.on("console", (m) => {
  if (m.type() === "error") note(`CONSOLE   ${m.text()}`, current);
});
page.on("requestfailed", (r) => {
  const err = r.failure()?.errorText ?? "failed";
  /*
   * A cancelled request is not a failed one. Navigating to the next route
   * aborts whatever the previous one still had in flight — prefetches above
   * all — and reporting those produced 24 "problems" on the first run, every
   * one of them this loop cancelling its own work. Filtering by error text
   * rather than by URL, because the same abort lands on /_next/image too.
   */
  if (err === "net::ERR_ABORTED") return;
  note(`REQUEST   ${err} ${new URL(r.url()).pathname}`, current);
});
page.on("response", (r) => {
  if (r.status() >= 400) note(`HTTP ${r.status()}  ${new URL(r.url()).pathname}`, current);
});

for (const route of ROUTES) {
  current = route;
  const nav = await page
    .goto(`${BASE}${route}`, { waitUntil: "load", timeout: 90000 })
    .catch((err) => ({ __failed: String(err).split("\n")[0] }));
  if (!nav || nav.__failed) {
    unreachable.push(`${route} — ${nav?.__failed ?? "no response"}`);
    continue;
  }
  // Scroll the page so lazily-mounted work runs: the globe, in-view observers,
  // and anything deferred to requestIdleCallback.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
}

await browser.close();

console.log(`\nruntime audit — ${ROUTES.length} routes at ${BASE}\n`);

if (unreachable.length) {
  console.log(`${unreachable.length} route(s) never rendered — this run proves nothing:`);
  for (const u of unreachable.slice(0, 8)) console.log(`  ${u}`);
  process.exitCode = 1;
} else if (!problems.size) {
  console.log("no uncaught exceptions, console errors or failed requests");
} else {
  const rows = [...problems.entries()].sort((a, b) => b[1].size - a[1].size);
  console.log(`${rows.length} distinct problem(s)\n`);
  for (const [msg, routes] of rows.slice(0, 25)) {
    console.log(`[${routes.size} route(s)] ${msg}`);
    console.log(`   e.g. ${[...routes].slice(0, 3).join(" | ")}\n`);
  }
  process.exitCode = 1;
}
