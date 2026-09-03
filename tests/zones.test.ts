import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * `data-zone` is a three-value bucket, not a palette name.
 *
 * `<Section>` maps its zone through `zoneAttr()` to `light`, `dark` or `lime`,
 * and the CSS keys off those: the woven ground screens on `dark` and multiplies
 * everywhere else, focus rings and selection colours flip on `dark`, and the
 * alternating ground targets `light`.
 *
 * Three components set the attribute by hand instead, and a palette rename
 * rewrote their strings to `paper` and `ink`. Those match `[data-zone]` but
 * none of the value-specific rules, so the footer silently multiplied a weave
 * into near-black — present in the DOM, invisible on screen. Nothing failed;
 * it just quietly stopped working.
 */

const ALLOWED = new Set(["light", "dark", "lime"]);

function sources(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sources(full);
    return /\.tsx?$/.test(entry) ? [full] : [];
  });
}

test("every hand-written data-zone uses a bucket value", () => {
  const offenders: string[] = [];
  for (const file of [...sources("app"), ...sources("components")]) {
    const src = readFileSync(file, "utf8");
    for (const match of src.matchAll(/data-zone=\{?"([a-z-]+)"/g)) {
      if (!ALLOWED.has(match[1])) offenders.push(`${file}: data-zone="${match[1]}"`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `data-zone must be one of ${[...ALLOWED].join(", ")} — Section derives it via zoneAttr():\n${offenders.join("\n")}`,
  );
});
