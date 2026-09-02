#!/usr/bin/env node
/**
 * WCAG contrast audit against the rendered page.
 *
 *   npm run dev          # in another terminal
 *   npm run contrast
 *
 * Written because a palette change touches every pairing on the site at once,
 * and a two-colour system has exactly one dangerous combination — lime on
 * paper, about 1.4:1 — which no amount of reading the diff will catch.
 *
 * The important detail is the colour parsing. Tailwind v4 compiles
 * `text-ink/70` to a `color-mix()`, and Chromium reports the used value as
 * `oklab(0.173 0.0000079 0.0000035 / 0.7)`. Parsing that as if the first number
 * were red — which is what a naive rgb() regex does — reported around seventy
 * contrast failures on this site that did not exist. A canvas does not rescue
 * it either: `ctx.fillStyle` will not normalise oklab to rgb. So the conversion
 * is done properly here: oklab to linear sRGB to sRGB, then composited over the
 * nearest opaque ancestor before the ratio is taken.
 *
 * Thresholds are WCAG 2.2 AA: 4.5:1 for body text, 3:1 for large text
 * (>=24px, or >=18.66px when bold).
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const BASE = process.env.CONTRAST_BASE || "http://localhost:3100";

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/",
);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const findings = new Map();

for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  }).catch(() => {});
  await page.waitForTimeout(300);

  const bad = await page.evaluate(() => {
    /* ---- colour parsing ---------------------------------------------- */
    const srgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

    function oklabToRgb(L, a, bb) {
      const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
      const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
      const s_ = L - 0.0894841775 * a - 1.291485548 * bb;
      const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
      const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
      const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
      const b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
      return [r, g, b2].map((v) => Math.max(0, Math.min(255, Math.round(srgb(v) * 255))));
    }

    function parse(str) {
      if (!str) return null;
      let m = str.match(/^rgba?\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        return { rgb: parts.slice(0, 3), a: parts.length > 3 ? parts[3] : 1 };
      }
      m = str.match(/^oklab\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        return { rgb: oklabToRgb(parts[0], parts[1], parts[2]), a: parts.length > 3 ? parts[3] : 1 };
      }
      m = str.match(/^oklch\(([^)]+)\)/);
      if (m) {
        const [L, C, H, A] = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        const h = (H * Math.PI) / 180;
        return { rgb: oklabToRgb(L, C * Math.cos(h), C * Math.sin(h)), a: A ?? 1 };
      }
      return null;
    }

    const over = (fg, bg, a) => fg.map((f, i) => a * f + (1 - a) * bg[i]);

    function lum([r, g, b]) {
      const f = (v) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    }

    function ratio(a, b) {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    }

    /** Nearest opaque painted ancestor, compositing any translucent layers. */
    function background(el) {
      let stack = [];
      for (let n = el; n; n = n.parentElement) {
        const p = parse(getComputedStyle(n).backgroundColor);
        if (!p || p.a === 0) continue;
        stack.push(p);
        if (p.a === 1) break;
      }
      let base = [255, 255, 255];
      for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i].rgb, base, stack[i].a);
      return base;
    }

    const out = [];
    for (const el of document.querySelectorAll("body *")) {
      if (el.children.length && ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const text = el.textContent?.trim();
      if (!text) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;

      const fg = parse(cs.color);
      if (!fg) continue;
      const bg = background(el);
      const composited = over(fg.rgb, bg, fg.a);
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const need = large ? 3 : 4.5;
      const r = ratio(composited, bg);
      if (r < need) {
        out.push({
          ratio: +r.toFixed(2),
          need,
          size: Math.round(size),
          cls: (el.className || "").toString().slice(0, 70),
          text: text.slice(0, 40),
        });
      }
    }
    return out;
  });

  for (const f of bad) {
    const key = `${f.ratio}:1 (needs ${f.need}) · ${f.cls}`;
    if (!findings.has(key)) findings.set(key, { ...f, routes: new Set() });
    findings.get(key).routes.add(route);
  }
}

await browser.close();

console.log(`contrast audit — ${routes.length} routes at ${BASE}\n`);
if (!findings.size) {
  console.log("no text below WCAG AA");
} else {
  const rows = [...findings.values()].sort((a, b) => a.ratio - b.ratio);
  console.log(`${rows.length} distinct failing pairings\n`);
  for (const r of rows.slice(0, 40)) {
    console.log(`${String(r.ratio).padStart(6)}:1  needs ${r.need}  ${r.size}px  ${[...r.routes].length} route(s)`);
    console.log(`         class: ${r.cls}`);
    console.log(`         text:  "${r.text}"`);
    console.log(`         e.g.   ${[...r.routes][0]}\n`);
  }
  process.exitCode = 1;
}
