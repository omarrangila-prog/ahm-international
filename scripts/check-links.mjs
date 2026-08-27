/**
 * Internal link checker.
 *
 * Every internal href in the built HTML must resolve to a prerendered page, a
 * redirect declared in next.config.ts, a file in public/, or one of the special
 * routes Next serves from app/ (icons, sitemap, robots).
 *
 * Runs against the build output rather than the source, so it sees the links
 * that are actually served — including ones assembled from data at render time.
 *
 * Exits non-zero on a broken link so it can gate a deploy.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const APP = ".next/server/app";

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (entry.endsWith(".html")) out.push(p);
  }
  return out;
}

const routeOf = (file) =>
  "/" + relative(APP, file).replace(/\.html$/, "").replace(/^index$/, "");

const files = walk(APP);
const pages = new Set(files.map(routeOf));

const config = readFileSync("next.config.ts", "utf8");
const redirects = new Set([...config.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]));

// Served by Next from app/ rather than appearing as prerendered HTML.
const SPECIAL = new Set([
  "/sitemap.xml", "/robots.txt", "/image-sitemap.xml",
  "/opengraph-image", "/favicon.ico", "/icon.png",
]);

const broken = new Map();

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const from = routeOf(file);

  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1].replace(/\/$/, "") || "/";
    if (href.startsWith("/_next") || href.startsWith("/api/") || href.startsWith("/assets/")) continue;
    if (pages.has(href) || redirects.has(href) || SPECIAL.has(href)) continue;
    // Tokenised showrooms are dynamic and intentionally unlisted.
    if (href.startsWith("/showroom/")) continue;
    if (existsSync(join("public", href.slice(1)))) continue;

    if (!broken.has(href)) broken.set(href, new Set());
    broken.get(href).add(from);
  }
}

console.log(`pages scanned: ${files.length}`);
if (broken.size === 0) {
  console.log("broken links: none");
} else {
  console.log(`broken links: ${broken.size}`);
  for (const [href, sources] of broken) {
    console.log(`  ${href}  <-  ${[...sources].slice(0, 3).join(", ")}`);
  }
  process.exitCode = 1;
}
