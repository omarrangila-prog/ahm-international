#!/usr/bin/env node
/**
 * Counts the image frames that actually render empty.
 *
 *   npm run dev            # in another terminal
 *   npm run images:gaps
 *
 * Every other asset report infers: it compares the registry against the
 * manifest and guesses what that means on screen. Inference was wrong in both
 * directions — `assets-needed.md` overstated the work by fifteen slots, and
 * `images:missing` reported no visible gap at all while the product mega-menu
 * rendered an empty panel on all sixty-six pages.
 *
 * This measures instead. `SmartImage` emits one specific tonal panel when a
 * file is unavailable, so counting that string in the served HTML is ground
 * truth for what a visitor sees.
 */
const BASE = "http://localhost:3100";
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/");

let total = 0;
const perRoute = [];
for (const r of routes) {
  const html = await (await fetch(`${BASE}${r}`)).text();
  // The unavailable branch: a `tooth` panel at 6% of the current colour.
  const n = (html.match(/class="tooth relative h-full w-full bg-current\/\[0\.06\]"/g) || []).length;
  if (n) { perRoute.push(`${String(n).padStart(2)}  ${r}`); total += n; }
}
console.log(`empty image frames rendered across ${routes.length} routes: ${total}`);
for (const line of perRoute) console.log("   " + line);
if (!total) console.log("   (none — every rendered image surface resolves to a file)");
