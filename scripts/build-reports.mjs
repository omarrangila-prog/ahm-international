/**
 * Generates reports/seo-audit.md from the *built* output.
 *
 * Reading .next/server/app rather than the source means the report describes what
 * is actually served — a title assembled at request time from three helpers is
 * still just a title in the HTML, and that is what a crawler sees.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const APP = ".next/server/app";
const pick = (html, re) => (html.match(re)?.[1] ?? "").trim();
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
  return out;
}

const rows = walk(APP).map((file) => {
  const html = readFileSync(file, "utf8");
  const route = "/" + relative(APP, file).replace(/\.html$/, "").replace(/^index$/, "");
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
  // The accessible heading is the visually-hidden span, not the decorative lines.
  const h1 = h1s.length
    ? decode(h1s[0][1].replace(/<span[^>]*aria-hidden="true"[\s\S]*?<\/span>\s*$/, "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim()
    : "";
  return {
    route,
    title: decode(pick(html, /<title>([\s\S]*?)<\/title>/)),
    description: decode(pick(html, /<meta name="description" content="([^"]*)"/)),
    canonical: pick(html, /<link rel="canonical" href="([^"]*)"/),
    h1, h1Count: h1s.length,
    noindex: /noindex/.test(pick(html, /<meta name="robots" content="([^"]*)"/)),
    schema: [...new Set([...html.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)].map((m) => m[1]))],
    imgs: (html.match(/<img\b/g) || []).length,
    imgsNoAlt: (html.match(/<img\b(?![^>]*\balt=)[^>]*>/g) || []).length,
    bytes: html.length,
  };
}).sort((a, b) => a.route.localeCompare(b.route));

const dup = (key) => {
  const seen = {};
  rows.forEach((r) => { if (r[key]) (seen[r[key]] ??= []).push(r.route); });
  return Object.entries(seen).filter(([, v]) => v.length > 1);
};

const fail = [];
rows.forEach((r) => {
  if (!r.title) fail.push(`${r.route} — missing title`);
  if (!r.description) fail.push(`${r.route} — missing description`);
  if (!r.canonical) fail.push(`${r.route} — missing canonical`);
  if (r.h1Count !== 1) fail.push(`${r.route} — ${r.h1Count} H1 elements (want exactly 1)`);
  if (r.imgsNoAlt) fail.push(`${r.route} — ${r.imgsNoAlt} <img> without alt`);
  if (r.title.length > 62) fail.push(`${r.route} — title ${r.title.length} chars (>62 truncates in SERP)`);
  if (r.description && (r.description.length < 70 || r.description.length > 165))
    fail.push(`${r.route} — description ${r.description.length} chars (want 70–165)`);
});
dup("title").forEach(([v, rs]) => fail.push(`duplicate title "${v}" on ${rs.join(", ")}`));
dup("description").forEach(([, rs]) => fail.push(`duplicate description on ${rs.join(", ")}`));

const md = [
  "# SEO AUDIT",
  "",
  `Generated from the production build: **${rows.length} pages**.`,
  `Every value below was read out of the served HTML, not from source.`,
  "",
  "## Summary",
  "",
  `| Check | Result |`,
  `|---|---|`,
  `| Pages audited | ${rows.length} |`,
  `| Unique titles | ${new Set(rows.map((r) => r.title)).size} / ${rows.length} |`,
  `| Unique descriptions | ${new Set(rows.map((r) => r.description)).size} / ${rows.length} |`,
  `| Pages with canonical | ${rows.filter((r) => r.canonical).length} / ${rows.length} |`,
  `| Pages with exactly one H1 | ${rows.filter((r) => r.h1Count === 1).length} / ${rows.length} |`,
  `| Images missing alt | ${rows.reduce((n, r) => n + r.imgsNoAlt, 0)} |`,
  `| Distinct schema types | ${new Set(rows.flatMap((r) => r.schema)).size} |`,
  `| **Findings** | **${fail.length}** |`,
  "",
  fail.length ? "## Findings\n\n" + fail.map((f) => `- ${f}`).join("\n") : "## Findings\n\nNone.",
  "",
  "## Per-page",
  "",
  "| Route | Title (len) | Desc len | H1 | Schema |",
  "|---|---|---|---|---|",
  ...rows.map((r) =>
    `| \`${r.route}\` | ${r.title.slice(0, 46)}${r.title.length > 46 ? "…" : ""} (${r.title.length}) | ${r.description.length} | ${r.h1 ? r.h1.slice(0, 34) : "**none**"} | ${r.schema.join(", ") || "—"} |`),
  "",
].join("\n");

mkdirSync("reports", { recursive: true });
writeFileSync("reports/seo-audit.md", md);
console.log(`reports/seo-audit.md — ${rows.length} pages, ${fail.length} findings`);
