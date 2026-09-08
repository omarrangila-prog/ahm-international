import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { productCategories } from "../data/products.ts";

/**
 * Two kinds of copy that went wrong by being generated rather than written.
 *
 * 1. Category names dropped into sentences. `shortName` is plural and several
 *    are compound, so the product template produced "How a aprons program
 *    starts", "How a athleisure program starts" and "SEND ONE POLOS &
 *    T-SHIRTS SPEC." on live pages. No a/an helper fixes "a polos &
 *    t-shirts"; the noun has to be authored.
 *
 * 2. Upload limits written out by hand. Four places stated them and no two
 *    agreed — the tech-pack page named six formats and omitted WEBP and the
 *    40 MB submission cap, so a buyer could follow it, attach six 15 MB
 *    files, and be refused by a limit that page never mentioned.
 */

/* ------------------------------- 1. Copy ------------------------------- */

test("every product category has an authored singular programNoun", () => {
  for (const category of productCategories) {
    assert.ok(
      category.programNoun && category.programNoun.trim().length > 0,
      `${category.name} has no programNoun`,
    );
    assert.ok(
      !/&/.test(category.programNoun),
      `${category.name}: programNoun "${category.programNoun}" is a compound category label, not a noun`,
    );
  }
});

test("the program heading reads grammatically for every category", () => {
  for (const category of productCategories) {
    const sentence = `How your ${category.programNoun} program starts.`;
    assert.ok(
      !/\ba (?:a|e|i|o|u)/i.test(sentence),
      `${category.name}: "${sentence}" needs "an", not "a"`,
    );
    // The bug this replaces: a plural noun after an indefinite article.
    assert.ok(
      !/\bhow a /i.test(sentence),
      `${category.name}: "${sentence}" reintroduces the indefinite article`,
    );
  }
});

/* ------------------------------ 2. Uploads ----------------------------- */

const SRC_DIRS = ["app", "components"];

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) sourceFiles(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

test("no page states an upload limit as a literal", () => {
  const offenders: string[] = [];
  for (const dir of SRC_DIRS) {
    for (const file of sourceFiles(dir)) {
      const src = readFileSync(file, "utf8");
      // A megabyte figure written next to "file" or "submission" is a limit
      // being restated rather than derived from lib/upload-policy.ts.
      for (const line of src.split("\n")) {
        if (/\b\d{1,3}\s?MB\b/.test(line) && /file|submission|upload|total/i.test(line)) {
          offenders.push(`${file}: ${line.trim().slice(0, 90)}`);
        }
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `Upload limits must come from lib/upload-policy.ts:\n  ${offenders.join("\n  ")}`,
  );
});

test("no page writes out its own list of accepted upload formats", () => {
  const offenders: string[] = [];
  for (const dir of SRC_DIRS) {
    for (const file of sourceFiles(dir)) {
      for (const line of readFileSync(file, "utf8").split("\n")) {
        // Three or more upper-case extensions in a row is a hand-written list.
        if (/\b(PDF|XLSX|DOCX|JPG|PNG|WEBP|ZIP)\b(,\s*\w+){2,}/.test(line)) {
          offenders.push(`${file}: ${line.trim().slice(0, 90)}`);
        }
      }
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `Use ACCEPTED_LABEL from lib/upload-policy.ts:\n  ${offenders.join("\n  ")}`,
  );
});
