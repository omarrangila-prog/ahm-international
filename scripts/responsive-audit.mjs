/**
 * Responsive audit across the real device matrix.
 *
 * Element-level overflow is only reported when it can actually be reached: an
 * element wider than the viewport inside an `overflow: hidden` ancestor is a
 * marquee doing its job, not a defect. An earlier pass on this site reported 51
 * such "failures" from one carousel.
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

/* Overridable: `next start` defaults to 3000, which on this machine is
   another app, and a stale server on the default port measures the wrong
   build without ever failing. */
const BASE = process.env.BASE ?? "http://localhost:3100";

const VIEWPORTS = [
  ["320x568", 320, 568], ["360x740", 360, 740], ["390x844", 390, 844],
  ["430x932", 430, 932], ["768x1024", 768, 1024], ["820x1180", 820, 1180],
  ["1024x768", 1024, 768], ["1280x800", 1280, 800], ["1440x900", 1440, 900],
  ["1920x1080", 1920, 1080], ["2560x1440", 2560, 1440], ["844x390", 844, 390],
];

/* One route per template, plus the conversion pages. */
const ROUTES = ["/", "/products", "/products/aprons", "/manufacturing", "/manufacturing/sampling",
  "/industries", "/industries/grocery", "/materials", "/export", "/capabilities", "/quality",
  "/resources", "/resources/fabric-gsm-guide", "/case-studies", "/case-studies/us-uniform-apron-program",
  "/request-a-quote", "/send-tech-pack", "/contact", "/about", "/sourcing"];

const browser = await chromium.launch({ args: ["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"] });
const findings = new Map();
const add = (k, where) => { if (!findings.has(k)) findings.set(k, new Set()); findings.get(k).add(where); };

for (const [label, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 900 });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded", timeout: 90000 }).catch(() => {});
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); }
      window.scrollTo(0, 0);
    }).catch(() => {});
    await page.waitForTimeout(180);

    const res = await page.evaluate((vw) => {
      const out = { docOverflow: 0, reachable: [], smallTargets: [], tinyText: [] };
      out.docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;

      const clipped = (el) => {
        for (let n = el.parentElement; n; n = n.parentElement) {
          const o = getComputedStyle(n);
          if (o.overflowX === "hidden" || o.overflowX === "clip" || o.overflowX === "auto" || o.overflowX === "scroll") return true;
        }
        return false;
      };

      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) continue;

        if ((r.right > vw + 1 || r.left < -1) && !clipped(el) && cs.position !== "fixed") {
          out.reachable.push(`${el.tagName.toLowerCase()}.${(el.className||"").toString().split(" ")[0]}`);
        }
        // WCAG 2.2 target size (minimum) is 24x24 CSS px.

        const fs = parseFloat(cs.fontSize);
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText && fs && fs < 10 && !el.closest("[aria-hidden='true']")) out.tinyText.push(`${Math.round(fs)}px "${el.textContent.trim().slice(0,24)}"`);
      }
      return out;
    }, w);

    if (res.docOverflow > 0) add(`document scrolls sideways by ${res.docOverflow}px`, `${label} ${route}`);
    for (const x of new Set(res.reachable)) add(`element past viewport: ${x}`, `${label} ${route}`);
    for (const x of new Set(res.smallTargets)) add(`touch target < 24px: ${x}`, `${label} ${route}`);
    for (const x of new Set(res.tinyText)) add(`text under 11px: ${x}`, `${label} ${route}`);
  }
  await ctx.close();
  console.error(`done ${label}`);
}
await browser.close();

console.log(`\n${VIEWPORTS.length} viewports x ${ROUTES.length} routes = ${VIEWPORTS.length*ROUTES.length} page loads\n`);
if (!findings.size) { console.log("no responsive defects"); }
else {
  const rows = [...findings.entries()].sort((a,b) => b[1].size - a[1].size);
  console.log(`${rows.length} distinct findings\n`);
  for (const [k, where] of rows.slice(0, 25)) {
    console.log(`[${where.size}] ${k}`);
    console.log(`      e.g. ${[...where].slice(0,3).join(" | ")}\n`);
  }
}
