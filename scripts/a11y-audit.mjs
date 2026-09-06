#!/usr/bin/env node
/**
 * WCAG audit with axe-core, against the rendered page.
 *
 *   npm run start &
 *   npm run a11y
 *
 * The site already audits two criteria properly — `contrast` parses oklab() and
 * `targets` applies 2.5.8's own exceptions — but those are two rules out of
 * roughly ninety. This covers the rest: labels, names, roles, landmarks,
 * duplicate ids, heading order, language, aria validity.
 *
 * Run at two widths because several rules are layout-dependent. The mobile nav
 * and the mega menu are mounted-but-hidden at every width, so an aria mistake in
 * either is present on every page of the site rather than on one.
 *
 * Rules deliberately left to the specialist audits:
 *
 *   color-contrast — axe reads computed colour but bails to "incomplete" on the
 *   text-over-image and mix-blend cases this design uses; `npm run contrast`
 *   resolves oklab() itself and reports a ratio for every pairing.
 *
 *   target-size — axe implements 2.5.8 without the spacing exception, which is
 *   what produced 700+ phantom failures the last time it was measured here.
 */
import fs from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve("axe-core"), "utf8");
const BASE = process.env.BASE ?? "http://localhost:3100";

/* One route per template. Product and resource detail pages are generated from
   one component each, so auditing twelve of them measures the same markup. */
const ROUTES = [
  "/",
  "/products",
  "/products/polos-tshirts",
  "/materials",
  "/capabilities",
  "/quality",
  "/export",
  "/industries",
  "/industries/hospitality",
  "/request-a-quote",
  "/send-tech-pack",
  "/resources",
  "/resources/tech-pack-checklist",
  "/case-studies",
  "/about",
  "/contact",
  "/privacy",
];

const VIEWPORTS = [
  ["mobile", 390, 844],
  ["desktop", 1440, 900],
];

const SKIP = new Set(["color-contrast", "target-size"]);

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

const unreachable = [];
/** rule id -> { impact, help, nodes: Set<string>, where: Set<string> } */
const found = new Map();

for (const [label, width, height] of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 768,
    hasTouch: width < 768,
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    // Same rule as the other audits here: a swallowed navigation turns every
    // check below into a pass against a page that never rendered.
    const nav = await page
      .goto(`${BASE}${route}`, { waitUntil: "load", timeout: 90000 })
      .catch((err) => ({ __failed: String(err).split("\n")[0] }));
    if (!nav || nav.__failed || (typeof nav.status === "function" && nav.status() >= 400)) {
      unreachable.push(`${label} ${route} — ${nav?.__failed ?? `HTTP ${nav.status()}`}`);
      continue;
    }
    await page.waitForTimeout(700);

    await page.evaluate(AXE);
    const result = await page.evaluate(async () => {
      // @ts-expect-error injected above
      return await window.axe.run(document, {
        resultTypes: ["violations"],
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] },
      });
    });

    for (const v of result.violations) {
      if (SKIP.has(v.id)) continue;
      if (!found.has(v.id))
        found.set(v.id, { impact: v.impact, help: v.help, nodes: new Set(), where: new Set() });
      const entry = found.get(v.id);
      entry.where.add(`${label} ${route}`);
      for (const n of v.nodes) entry.nodes.add(n.target.join(" "));
    }
  }
  await ctx.close();
  console.error(`done ${label}`);
}
await browser.close();

const ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3 };
console.log(
  `\naxe-core WCAG 2.2 AA — ${ROUTES.length} routes x ${VIEWPORTS.length} widths at ${BASE}\n`,
);

if (unreachable.length) {
  console.log(`${unreachable.length} page load(s) never rendered — this run proves nothing:`);
  for (const u of unreachable.slice(0, 8)) console.log(`  ${u}`);
  process.exitCode = 1;
} else if (!found.size) {
  console.log("no WCAG violations (contrast and target size covered separately)");
} else {
  const rows = [...found.entries()].sort(
    (a, b) => (ORDER[a[1].impact] ?? 9) - (ORDER[b[1].impact] ?? 9),
  );
  console.log(`${rows.length} distinct violation(s)\n`);
  for (const [id, v] of rows) {
    console.log(`[${(v.impact ?? "?").toUpperCase()}] ${id} — ${v.help}`);
    console.log(`   ${v.where.size} page/width combination(s), ${v.nodes.size} element(s)`);
    for (const n of [...v.nodes].slice(0, 3)) console.log(`     ${n.slice(0, 110)}`);
    console.log(`   e.g. ${[...v.where].slice(0, 3).join(" | ")}\n`);
  }
  // Serious and critical fail the run; moderate and minor are reported only.
  if (rows.some(([, v]) => v.impact === "critical" || v.impact === "serious")) process.exitCode = 1;
}
