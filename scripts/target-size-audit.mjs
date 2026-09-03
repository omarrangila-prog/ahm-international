/**
 * WCAG 2.2 SC 2.5.8 Target Size (Minimum), with its exceptions applied.
 *
 * A bare "is it 24x24" check fails almost every text link on a well-set page
 * and is not what the criterion says. Three exceptions matter here:
 *
 *   - Spacing: an undersized target passes if a 24px-diameter circle centred on
 *     it does not intersect the circle of any other target.
 *   - Inline: a target inside a sentence, whose size is constrained by the
 *     line-height of surrounding text, is exempt.
 *   - Not visible / not actionable: sr-only skip links and proxied inputs.
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const VIEWPORTS = [["320", 320, 700], ["390", 390, 844], ["768", 768, 1024], ["1440", 1440, 900]];
const ROUTES = ["/", "/products", "/manufacturing", "/materials", "/export", "/industries",
  "/resources", "/request-a-quote", "/contact", "/about", "/case-studies", "/quality"];

const browser = await chromium.launch();
const findings = new Map();

for (const [label, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 900 });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    await page.goto(`http://localhost:3100${route}`, { waitUntil: "domcontentloaded", timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(150);
    const bad = await page.evaluate(() => {
      const sel = "a[href], button, input:not([type=hidden]), select, textarea, [role=button]";
      const all = [...document.querySelectorAll(sel)].filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.pointerEvents === "none") return false;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) return false;           // sr-only proxies
        if (el.closest("[aria-hidden='true']")) return false;
        return true;
      });
      const boxes = all.map((el) => ({ el, r: el.getBoundingClientRect() }));
      const out = [];
      for (const { el, r } of boxes) {
        if (r.width >= 24 && r.height >= 24) continue;
        // Inline exception: the link sits inside a run of text.
        const parentText = (el.parentElement?.textContent || "").trim();
        const own = (el.textContent || "").trim();
        if (parentText.length > own.length + 12 && getComputedStyle(el).display.includes("inline")) continue;
        // Spacing exception: no other target's 24px circle intersects this one.
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const crowded = boxes.some(({ el: o, r: b }) => {
          if (o === el) return false;
          const ox = b.left + b.width / 2, oy = b.top + b.height / 2;
          return Math.hypot(cx - ox, cy - oy) < 24;
        });
        if (!crowded) continue;
        out.push(`${el.tagName.toLowerCase()} ${Math.round(r.width)}x${Math.round(r.height)} "${own.slice(0, 26)}"`);
      }
      return [...new Set(out)];
    });
    for (const b of bad) {
      const k = b;
      if (!findings.has(k)) findings.set(k, new Set());
      findings.get(k).add(`${label} ${route}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\n${VIEWPORTS.length} viewports x ${ROUTES.length} routes\n`);
if (!findings.size) console.log("no target-size failures once 2.5.8 exceptions are applied");
else {
  for (const [k, where] of [...findings.entries()].sort((a,b)=>b[1].size-a[1].size).slice(0, 20)) {
    console.log(`[${where.size}] ${k}\n      e.g. ${[...where].slice(0,3).join(" | ")}`);
  }
}
