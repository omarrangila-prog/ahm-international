import { test } from "node:test";
import assert from "node:assert/strict";
import { claimedPathname, incomingPathname, isClaimablePathname, parseUploadRequest } from "../lib/uploads/paths.ts";
import { parseReportedUploads, selectAttachments } from "../lib/uploads/claim.ts";
import { storageEnabled, storageNamespace } from "../lib/storage/namespace.ts";
import { DIRECT_LIMITS, FORM_LIMITS, uploadLimitsText } from "../lib/upload-policy.ts";
import { fileRetentionDays, describeDays } from "../lib/retention.ts";
import { buildCsp } from "../lib/security-headers.ts";
import { strongEtag } from "../lib/storage/json-store.ts";

test("a weak ETag from a compressed read is turned back into the strong one writes are checked against", () => {
  assert.equal(strongEtag('W/"f82c9833acc9f8dbd862db08be4c7e80"'), '"f82c9833acc9f8dbd862db08be4c7e80"');
  assert.equal(strongEtag('"abc"'), '"abc"');
});

/**
 * Direct uploads hand the browser a token for one pathname. These are the
 * rules that decide which pathnames the server will sign for and later accept,
 * and the namespacing that keeps previews out of production's files.
 */

const ID = "3f2a8c1e-5b7d-4e9f-a123-0c4d5e6f7a8b";

test("the server signs only for a sanitised, accepted file in this upload's folder", () => {
  assert.deepEqual(parseUploadRequest("", `rfq-incoming/${ID}/techpack.pdf`)?.contentTypes, ["application/pdf"]);
  assert.ok(parseUploadRequest("preview/", `preview/rfq-incoming/${ID}/spec.xlsx`));

  const refused = [
    `rfq-incoming/${ID}/../pipeline/index.json`,
    `rfq-incoming/${ID}/run.exe`,
    `rfq-incoming/${ID}/page.html`,
    `rfq-incoming/${ID}/a b/c.pdf`,
    `rfq-incoming/not-a-uuid/a.pdf`,
    `rfq-incoming/${ID}/tech pack (v2).pdf`, // not in sanitised form
    `pipeline/leads/AHM-1.json`,
    `preview/rfq-incoming/${ID}/a.pdf`, // another environment's namespace
  ];
  for (const p of refused) assert.equal(parseUploadRequest("", p), null, p);
});

test("the browser builds the same sanitised pathname the server expects", () => {
  const p = incomingPathname("", ID, "Tech Pack (v2).pdf");
  assert.ok(parseUploadRequest("", p), p);
});

test("a reported upload must be in this upload's folder with the file's own extension", () => {
  assert.ok(isClaimablePathname("", ID, `rfq-incoming/${ID}/techpack-Xy12AbCd.pdf`, "techpack.pdf"));
  assert.ok(!isClaimablePathname("", ID, `rfq-incoming/${ID}/techpack-Xy12AbCd.png`, "techpack.pdf"));
  assert.ok(!isClaimablePathname("", ID, `rfq-incoming/00000000-0000-4000-8000-000000000000/a.pdf`, "a.pdf"));
  assert.ok(!isClaimablePathname("", ID, `rfq/AHM-261010-ABCD/1-a.pdf`, "a.pdf"));
  assert.equal(claimedPathname("", "AHM-261010-ABCD", 0, "a b.pdf"), "rfq/AHM-261010-ABCD/1-a b.pdf");
});

test("the reported list is bounded and shape-checked", () => {
  assert.deepEqual(parseReportedUploads("not json"), []);
  assert.deepEqual(parseReportedUploads(JSON.stringify({ pathname: "x" })), []);
  const many = Array.from({ length: 40 }, (_, i) => ({ pathname: `p${i}`, name: `n${i}.pdf` }));
  assert.equal(parseReportedUploads(JSON.stringify(many)).length, DIRECT_LIMITS.maxFiles * 2);
  assert.equal(parseReportedUploads(JSON.stringify([{ pathname: "a", name: "a.pdf" }, { pathname: "a", name: "b.pdf" }])).length, 1);
});

test("files go with the email while they fit, in order, and the rest are linked", () => {
  const f = (name: string, mb: number) => ({ name, size: mb * 1024 * 1024, contentType: "application/pdf", pathname: name });
  assert.deepEqual(selectAttachments([f("a", 4), f("b", 7), f("c", 5)]).map((x) => x.name), ["a", "c"]);
});

test("production writes at the root, everything else under its own name", () => {
  assert.equal(storageNamespace({ VERCEL_ENV: "production" }), "");
  assert.equal(storageNamespace({ VERCEL_ENV: "preview" }), "preview/");
  assert.equal(storageNamespace({}), "local/");
  assert.equal(storageNamespace({ VERCEL_ENV: "production", BLOB_NAMESPACE: "/e2e-1/" }), "e2e-1/");
  assert.equal(storageEnabled({}), false);
  assert.equal(storageEnabled({ BLOB_READ_WRITE_TOKEN: " " }), false);
});

test("the limits sentence states the per-file cap only when it is lower than the total", () => {
  assert.match(uploadLimitsText("form"), /^Up to 6 files and 4 MB in total\./);
  assert.match(uploadLimitsText("direct"), /^Up to 6 files, 25 MB per file and 60 MB in total\./);
  assert.ok(FORM_LIMITS.maxTotalBytes < 4.5 * 1024 * 1024, "form mode must stay under Vercel's 4.5 MB body limit");
});

test("retention has a floor and reads as words", () => {
  assert.equal(fileRetentionDays({}), 730);
  assert.equal(fileRetentionDays({ RFQ_FILE_RETENTION_DAYS: "7" }), 730);
  assert.equal(fileRetentionDays({ RFQ_FILE_RETENTION_DAYS: "365" }), 365);
  assert.equal(describeDays(730), "2 years");
  assert.equal(describeDays(365), "one year");
  assert.equal(describeDays(540), "18 months");
});

test("direct uploads add the Blob API to connect-src and nothing else", () => {
  const off = buildCsp({ development: false }).split("; ");
  const on = buildCsp({ development: false, directUploads: true }).split("; ");
  for (let i = 0; i < off.length; i++) {
    if (off[i].startsWith("connect-src")) assert.equal(on[i], `${off[i]} https://vercel.com`);
    else assert.equal(on[i], off[i]);
  }
});
