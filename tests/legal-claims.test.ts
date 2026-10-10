import { test } from "node:test";
import assert from "node:assert/strict";
import { privacySections, privacySectionsFor, cookieSections } from "../data/legal.ts";
import { ACCEPTED_UPLOADS, MAX_FILE_BYTES, MAX_TOTAL_BYTES, MAX_FILES } from "../lib/upload-policy.ts";

/**
 * The legal pages claim to describe what this application actually does, so the
 * checkable parts are checked.
 *
 * The privacy policy listed seven accepted upload formats while the server
 * accepted nine — `xls` and `doc` were missing — and stated the per-file and
 * per-submission size caps without the six-file cap. Those are exactly the
 * statements a buyer relies on before sending a specification, and exactly the
 * ones that rot silently when the policy is prose and the limit is a constant.
 */

const privacyText = privacySections.flatMap((s) => [...s.body, ...(s.list ?? [])]).join(" ");
const cookieText = cookieSections.flatMap((s) => [...s.body, ...(s.list ?? [])]).join(" ");

test("every accepted upload format is named in the privacy policy", () => {
  const named = privacyText.toUpperCase();
  const missing = Object.keys(ACCEPTED_UPLOADS)
    // jpeg and jpg are one format to a reader; naming either is enough.
    .filter((ext) => ext !== "jpeg")
    .filter((ext) => !new RegExp(`\\b${ext.toUpperCase()}\\b`).test(named));
  assert.deepEqual(missing, [], `formats the server accepts but the policy does not name: ${missing.join(", ")}`);
});

test("the stated upload limits are the enforced ones", () => {
  assert.match(privacyText, new RegExp(`${MAX_TOTAL_BYTES / 1024 / 1024}\\s?MB in total`));
  // A separate per-file cap only needs stating when it is lower than the total.
  if (MAX_FILE_BYTES < MAX_TOTAL_BYTES) {
    assert.match(privacyText, new RegExp(`${MAX_FILE_BYTES / 1024 / 1024}\\s?MB per file`));
  }
  assert.match(
    privacyText,
    new RegExp(`\\b(six|${MAX_FILES})\\b[^.]*files`, "i"),
    "the policy must state the file-count cap the server enforces",
  );
});

test("the cookie policy does not claim a consent banner that does not exist", () => {
  // Asserted the other way round on purpose: the claim is that there is nothing
  // to consent to, which is only true while no provider is wired up.
  assert.match(cookieText, /no analytics provider is installed/i);
});

/**
 * The policy is written for each delivery state, because it once promised to
 * name the email provider "before it is switched on" while the code that
 * switched it on knew nothing about the promise.
 */
const textFor = (mail: boolean, webhook: boolean) =>
  privacySectionsFor({ mail, webhook })
    .flatMap((s) => [...s.body, ...(s.list ?? [])])
    .join(" ");

test("with mail delivery on, the policy names the mailbox and drops the 'not connected' claim", () => {
  const text = textFor(true, false);
  assert.match(text, /business email provider/i);
  assert.match(text, /delivered by email to our business mailbox/i);
  assert.doesNotMatch(text, /No email or CRM provider is connected/i);
  assert.doesNotMatch(text, /never forwarded/i);
});

test("with nothing connected, the policy says enquiries are neither delivered nor stored", () => {
  const text = textFor(false, false);
  assert.match(text, /No email or CRM provider is connected/i);
  assert.match(text, /neither delivers nor stores/i);
  assert.doesNotMatch(text, /business email provider/i);
});

test("a connected webhook is disclosed, and only then", () => {
  assert.match(textFor(false, true), /tool we use to track enquiries/i);
  assert.doesNotMatch(textFor(false, false), /tool we use to track enquiries/i);
});
