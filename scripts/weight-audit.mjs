#!/usr/bin/env node
/**
 * What a phone actually downloads, measured rather than estimated.
 *
 *   npm run build && npm run start &
 *   npm run weight
 *
 * The launch plan asked for delivered image and JavaScript bytes from a
 * repeatable mobile lab run, and specifically for no score to be published
 * before it had been measured. Two things make the naive version wrong:
 *
 *   1. `next build` under Turbopack no longer prints First Load JS, so the
 *      familiar table is not available to read off. The only honest number is
 *      the one the network panel sees.
 *   2. Transfer size is not resource size. Text assets arrive gzipped, so
 *      summing `content-length` from the filesystem overstates JS by roughly
 *      three times and understates nothing. `encodedDataLength` from CDP is
 *      what crossed the wire, and that is what a buyer on a phone pays for.
 *
 * Cache state matters as much as the numbers: every route is loaded in a fresh
 * context, so these are cold-load figures. A second visit is far cheaper and is
 * not what decides whether someone waits.
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const BASE = process.env.BASE ?? "http://localhost:3000";

/* One route per template rather than all 66: templates are what differ, and a
   sweep of every product page measures the same layout twelve times. */
const ROUTES = [
  "/",
  "/products",
  "/products/polos-tshirts",
  "/materials",
  "/capabilities",
  "/export",
  "/industries/hospitality",
  "/request-a-quote",
  "/resources/tech-pack-checklist",
  "/contact",
];

/* Regular 4G. Slower than a sourcing manager on office wifi, faster than a
   phone on a factory floor. The point is that it is the same every run. */
const NETWORK = {
  offline: false,
  downloadThroughput: (4 * 1024 * 1024) / 8,
  uploadThroughput: (3 * 1024 * 1024) / 8,
  latency: 70,
};

const kind = (url, resourceType) => {
  if (resourceType === "document") return "html";
  if (resourceType === "script") return "js";
  if (resourceType === "stylesheet") return "css";
  if (resourceType === "font") return "font";
  if (resourceType === "image" || /\.(webp|avif|png|jpe?g|svg|gif)(\?|$)/i.test(url))
    return "image";
  if (resourceType === "fetch" || resourceType === "xhr") return "data";
  return "other";
};

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const rows = [];

for (const route of ROUTES) {
  // A fresh context per route: shared caches would make whichever route ran
  // second look free, which is the opposite of a cold load.
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 " +
      "(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", NETWORK);

  const seen = new Map(); // requestId -> {type, bytes}
  const types = new Map();
  cdp.on("Network.responseReceived", (e) => {
    seen.set(e.requestId, { type: kind(e.response.url, e.type?.toLowerCase() ?? ""), bytes: 0 });
  });
  cdp.on("Network.loadingFinished", (e) => {
    const r = seen.get(e.requestId);
    if (!r) return;
    // encodedDataLength is bytes on the wire, compression included.
    types.set(r.type, (types.get(r.type) ?? 0) + e.encodedDataLength);
  });

  await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 120000 }).catch(() => {});
  // Let lazily-mounted work settle — the globe on /export is deliberately
  // deferred, and finishing at `load` would report it as weighing nothing.
  await page.waitForTimeout(3500);

  /*
   * `getEntriesByType("largest-contentful-paint")` returns nothing: LCP is not
   * kept in the default entry buffer, so it is only readable through an
   * observer with `buffered: true`, which replays what was recorded before the
   * observer existed. Read the wrong way it reports null on every route, which
   * looks like a site with no content rather than a bug in the harness.
   */
  const paint = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = null;
        new PerformanceObserver((list) => {
          lcp = list.getEntries().at(-1)?.startTime ?? lcp;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        requestAnimationFrame(() =>
          setTimeout(() => {
            const nav = performance.getEntriesByType("navigation")[0];
            resolve({
              lcp: lcp === null ? null : Math.round(lcp),
              dcl: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
            });
          }, 100),
        );
      }),
  );

  const total = [...types.values()].reduce((a, b) => a + b, 0);
  rows.push({ route, types: Object.fromEntries(types), total, ...paint });
  await ctx.close();
}

await browser.close();

const kb = (n) => (n ? (n / 1024).toFixed(0) : "0");
const COLS = ["html", "css", "js", "image", "font", "data", "other"];

console.log(`\nCold mobile load — 390x844, regular 4G, ${BASE}\n`);
console.log(
  ["route".padEnd(32), ...COLS.map((c) => c.padStart(7)), "TOTAL".padStart(8), "LCP".padStart(7)].join(""),
);
console.log("-".repeat(32 + COLS.length * 7 + 15));
for (const r of rows) {
  console.log(
    [
      r.route.padEnd(32),
      ...COLS.map((c) => kb(r.types[c]).padStart(7)),
      kb(r.total).padStart(8),
      (r.lcp === null ? "-" : `${r.lcp}ms`).padStart(7),
    ].join(""),
  );
}

const worst = [...rows].sort((a, b) => b.total - a.total)[0];
const median = [...rows].sort((a, b) => a.total - b.total)[Math.floor(rows.length / 2)];
console.log(
  `\nmedian route ${kb(median.total)} kB · heaviest ${worst.route} at ${kb(worst.total)} kB` +
    ` (js ${kb(worst.types.js)} kB, images ${kb(worst.types.image)} kB)\n`,
);
