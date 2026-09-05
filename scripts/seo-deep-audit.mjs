#!/usr/bin/env node
/**
 * Deep SEO crawl — the checks `npm run audit` does not cover.
 *
 *   npm run dev        # in another terminal
 *   npm run seo:deep
 *
 * `npm run audit` checks titles, descriptions, H1 count, canonicals and
 * internal links. This adds the rest of what a crawler and a rich-result
 * pipeline actually read: OpenGraph and Twitter completeness, heading level
 * skips, images without alt, `html lang`, valid and typed JSON-LD, and a
 * BreadcrumbList on every page but the home page.
 */
const BASE = process.env.SEO_BASE || "http://localhost:3100";

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/",
);

const findings = [];
const add = (kind, route, detail) => findings.push({ kind, route, detail });
const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`, "i")) || [])[1];

for (const route of routes) {
  const html = await (await fetch(`${BASE}${route}`)).text();

  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/i)?.[0];
  const desc = descTag ? attr(descTag, "content") : "";
  if (title.length > 60) add("title-long", route, `${title.length} chars`);
  if (desc.length > 160) add("desc-long", route, `${desc.length} chars`);
  if (desc.length && desc.length < 70) add("desc-short", route, `${desc.length} chars`);

  for (const p of ["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name"]) {
    if (!new RegExp(`property="${p}"`).test(html)) add("og-missing", route, p);
  }
  for (const n of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    if (!new RegExp(`name="${n}"`).test(html)) add("twitter-missing", route, n);
  }

  const h1s = [...html.matchAll(/<h1[^>]*>/gi)];
  if (h1s.length !== 1) add("h1-count", route, String(h1s.length));
  const levels = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      add("heading-skip", route, `h${levels[i - 1]} -> h${levels[i]}`);
      break;
    }
  }

  const imgs = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt=/.test(t));
  if (noAlt.length) add("img-no-alt", route, `${noAlt.length} of ${imgs.length}`);

  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!blocks.length) add("no-jsonld", route, "none");
  for (const b of blocks) {
    try {
      const parsed = JSON.parse(b);
      const types = (Array.isArray(parsed) ? parsed : [parsed]).map((x) => x["@type"]).join(",");
      if (!types) add("jsonld-untyped", route, b.slice(0, 60));
    } catch (e) {
      add("jsonld-invalid", route, String(e).slice(0, 80));
    }
  }
  if (route !== "/" && !blocks.some((b) => b.includes("BreadcrumbList"))) {
    add("no-breadcrumb", route, "no BreadcrumbList");
  }

  if (!/<html[^>]+lang="/.test(html)) add("no-lang", route, "html lang missing");
  if (!/rel="canonical"/.test(html)) add("no-canonical", route, "missing");
}

console.log(`crawled ${routes.length} routes\n`);
if (!findings.length) {
  console.log("nothing found");
} else {
  const grouped = new Map();
  for (const f of findings) {
    const key = `${f.kind}${f.kind.endsWith("-missing") ? ` (${f.detail})` : ""}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(f.kind.endsWith("-missing") ? f.route : `${f.route} [${f.detail}]`);
  }
  for (const [key, where] of [...grouped.entries()].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`${key} — ${where.length} route(s)`);
    console.log("   " + where.slice(0, 6).join("\n   ") + "\n");
  }
  process.exitCode = 1;
}
