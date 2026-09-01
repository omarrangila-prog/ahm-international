#!/usr/bin/env node
/**
 * Pre-deployment SEO and accessibility audit.
 *
 * Crawls every route in the registry against a running server and fails on the
 * problems that actually cost rankings or break pages, rather than producing a
 * score. Run it against a production build before deploying:
 *
 *   npm run build && npm run start &
 *   npm run audit
 *
 * Checks: HTTP status, unique title, title length, meta description presence and
 * length, exactly one H1, self-referencing canonical, accidental noindex,
 * OpenGraph completeness, valid JSON-LD, internal link targets, image alt
 * coverage, and heading order.
 *
 * The route list is read from the served sitemap rather than imported from the
 * source. That audits what the site actually publishes — if a page is missing
 * from the sitemap, the audit sees the same gap a crawler would.
 */

/** Reads the published sitemap and returns the routes it declares. */
async function loadRoutes() {
  const response = await fetch(`${BASE}/sitemap.xml`);
  if (!response.ok) {
    console.error(`Could not read ${BASE}/sitemap.xml (${response.status}). Is the server running?`);
    process.exit(1);
  }
  const xml = await response.text();
  const routes = [];
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = new URL(loc).pathname;
    routes.push({ path: path === "" ? "/" : path });
  }
  if (routes.length === 0) {
    console.error("Sitemap contained no URLs.");
    process.exit(1);
  }
  return routes;
}

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3100";
import fs from "node:fs";

/**
 * Read from the same place the pages read it, not a copy.
 *
 * This was hardcoded to a domain that `data/company.ts` no longer publishes,
 * so the audit failed every route on a canonical the site had got right. A
 * check that carries its own copy of the truth eventually disagrees with it.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? readSiteUrlFromCompanyData();

function readSiteUrlFromCompanyData() {
  const source = fs.readFileSync(new URL("../data/company.ts", import.meta.url), "utf8");
  const match = source.match(/siteUrl:[^"']*["']([^"']+)["']/);
  if (!match) throw new Error("could not read siteUrl from data/company.ts");
  return match[1].replace(/\/$/, "");
}

const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();
const seen = new Set();

function fail(route, message) {
  errors.push(`${route}  ✗  ${message}`);
}
function warn(route, message) {
  warnings.push(`${route}  !  ${message}`);
}

function textBetween(html, open, close) {
  const start = html.indexOf(open);
  if (start === -1) return null;
  const from = start + open.length;
  const end = html.indexOf(close, from);
  return end === -1 ? null : html.slice(from, end);
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match ? match[1] : null;
}

function metaContent(html, key, value) {
  const re = new RegExp(`<meta[^>]*${key}=["']${value}["'][^>]*>`, "i");
  const tag = html.match(re);
  return tag ? attr(tag[0], "content") : null;
}

async function auditRoute(route) {
  const url = `${BASE}${route.path}`;
  let response;
  try {
    response = await fetch(url, { redirect: "manual" });
  } catch (error) {
    fail(route.path, `request failed: ${error.message}`);
    return;
  }

  if (response.status !== 200) {
    fail(route.path, `expected 200, got ${response.status}`);
    return;
  }

  const html = await response.text();
  seen.add(route.path);

  /* ---- title ---- */
  const title = textBetween(html, "<title>", "</title>");
  if (!title) {
    fail(route.path, "missing <title>");
  } else {
    if (titles.has(title)) fail(route.path, `duplicate title, also on ${titles.get(title)}`);
    titles.set(title, route.path);
    if (title.length > 62) warn(route.path, `title is ${title.length} chars (may truncate in SERP)`);
    if (title.length < 20) warn(route.path, `title is only ${title.length} chars`);
  }

  /* ---- description ---- */
  const description = metaContent(html, "name", "description");
  if (!description) {
    fail(route.path, "missing meta description");
  } else {
    if (descriptions.has(description)) {
      fail(route.path, `duplicate meta description, also on ${descriptions.get(description)}`);
    }
    descriptions.set(description, route.path);
    if (description.length > 160) warn(route.path, `description is ${description.length} chars`);
    if (description.length < 70) warn(route.path, `description is only ${description.length} chars`);
  }

  /* ---- headings ---- */
  const h1s = html.match(/<h1[^>]*>/gi) ?? [];
  if (h1s.length === 0) fail(route.path, "no <h1>");
  if (h1s.length > 1) fail(route.path, `${h1s.length} <h1> elements (expected exactly 1)`);

  // Heading order: no level should be skipped on the way down.
  const levels = [...html.matchAll(/<h([1-6])[^>]*>/gi)].map((m) => Number(m[1]));
  let previous = 0;
  for (const level of levels) {
    if (previous && level > previous + 1) {
      warn(route.path, `heading jumps from h${previous} to h${level}`);
      break;
    }
    previous = level;
  }

  /* ---- canonical ---- */
  const canonicalTag = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  const canonical = canonicalTag ? attr(canonicalTag[0], "href") : null;
  const expected = `${SITE}${route.path === "/" ? "/" : route.path}`;
  if (!canonical) {
    fail(route.path, "missing canonical link");
  } else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) {
    fail(route.path, `canonical mismatch: ${canonical} (expected ${expected})`);
  }

  /* ---- robots ---- */
  const robots = metaContent(html, "name", "robots");
  if (robots && /noindex/i.test(robots)) {
    fail(route.path, `page is noindex but listed in the sitemap: "${robots}"`);
  }

  /* ---- OpenGraph ---- */
  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!metaContent(html, "property", property)) warn(route.path, `missing ${property}`);
  }

  /* ---- JSON-LD ---- */
  const scripts = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, json] of scripts) {
    try {
      JSON.parse(json);
    } catch {
      fail(route.path, "invalid JSON-LD block");
    }
  }

  /* ---- images ---- */
  const imgs = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = imgs.filter((tag) => attr(tag, "alt") === null);
  if (missingAlt.length) fail(route.path, `${missingAlt.length} <img> without an alt attribute`);

  /* ---- internal links ---- */
  for (const [, href] of html.matchAll(/<a[^>]*href=["'](\/[^"'#?]*)["']/gi)) {
    internalLinks.add(href.replace(/\/$/, "") || "/");
  }
}

/* ------------------------------------------------------------------ */

const indexableRoutes = await loadRoutes();

console.log(`Auditing ${indexableRoutes.length} routes against ${BASE}\n`);

for (const route of indexableRoutes) {
  await auditRoute(route);
}

/* Broken internal links: any linked path that is not a known route. */
const known = new Set(indexableRoutes.map((r) => (r.path === "/" ? "/" : r.path.replace(/\/$/, ""))));
for (const link of internalLinks) {
  if (!known.has(link)) {
    const response = await fetch(`${BASE}${link}`, { redirect: "manual" });
    if (response.status >= 400) {
      errors.push(`${link}  ✗  linked internally but returns ${response.status}`);
    } else {
      warnings.push(`${link}  !  linked internally but not in the route registry or sitemap`);
    }
  }
}

/* Orphan pages: in the sitemap but linked from nowhere. */
for (const route of indexableRoutes) {
  const path = route.path === "/" ? "/" : route.path.replace(/\/$/, "");
  if (path !== "/" && !internalLinks.has(path)) {
    warnings.push(`${route.path}  !  orphan — in the sitemap but not linked from any audited page`);
  }
}

console.log(`Pages checked:   ${seen.size}`);
console.log(`Unique titles:   ${titles.size}`);
console.log(`Internal links:  ${internalLinks.size}`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ${w}`);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) console.log(`  ${e}`);
  console.log("\nAudit FAILED.");
  process.exit(1);
}

console.log("\nAudit passed.");
