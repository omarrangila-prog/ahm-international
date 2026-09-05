import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { routes } from "../data/routes.ts";

/**
 * LAUNCH.md is followed literally, so its URLs have to exist.
 *
 * Four of the sixteen "request indexing for these first" URLs were routes that
 * had been restructured since the document was written — `/sourcing/...`
 * pillars that now live at the root, and `/product-development` which is
 * `/development`. Following that list on launch day means submitting four dead
 * URLs to Search Console, which is the one day it is most expensive to do.
 *
 * Checked against `data/routes.ts` rather than the app directory. A first
 * attempt walked the filesystem and reported `/products/aprons` as missing:
 * it is generated from data through `[slug]`, so it has no directory of its
 * own. The registry is what the sitemap is built from, which makes it the same
 * definition of "a real route" that a crawler will use.
 */

test("every URL cited in LAUNCH.md is a real route", () => {
  const known = new Set(routes.map((r) => r.path));
  const doc = readFileSync("LAUNCH.md", "utf8");
  const cited = [...doc.matchAll(/^\s*\d+\.\s+`?(\/[a-z0-9/-]*)`?\s*$/gm)].map((m) => m[1]);

  assert.ok(cited.length > 0, "expected LAUNCH.md to cite some URLs");
  const missing = cited.filter((url) => !known.has(url));
  assert.deepEqual(missing, [], `LAUNCH.md cites routes that do not exist:\n${missing.join("\n")}`);
});
