import { test } from "node:test";
import assert from "node:assert/strict";
import { privacySections, privacySectionsFor, cookieSections, cookieSectionsFor } from "../data/legal.ts";
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

/**
 * The cookie policy promised, before any analytics existed, that analytics
 * would load only after consent and that the page would say so first. Both
 * versions of the page are checked, because only one is ever deployed at a time.
 */
const cookieTextFor = (analytics: boolean) =>
  cookieSectionsFor(analytics)
    .flatMap((s) => [...s.body, ...(s.list ?? [])])
    .join(" ");

test("without a measurement ID, the cookie policy says there is nothing to consent to", () => {
  const text = cookieTextFor(false);
  assert.match(text, /no analytics provider is installed/i);
  assert.match(text, /no consent banner/i);
});

test("with a measurement ID, the cookie policy names GA4, consent first, and how to withdraw", () => {
  const text = cookieTextFor(true);
  assert.match(text, /Google Analytics/);
  assert.match(text, /only if you (choose )?allow/i);
  assert.match(text, /withdrawing consent deletes the analytics cookies/i);
  assert.doesNotMatch(text, /no analytics provider is installed/i);
  assert.doesNotMatch(text, /no consent banner/i);
});

/**
 * Private storage, the staff register and the assistant each change what the
 * policy must say. Every state is checked, because only one is deployed at a
 * time and the others would otherwise go unread until they were switched on.
 */
const fullText = (delivery: Parameters<typeof privacySectionsFor>[0]) =>
  privacySectionsFor(delivery, false)
    .flatMap((s) => [s.heading, ...s.body, ...(s.list ?? [])])
    .join(" ");

test("with private storage on, the policy states the direct-upload limits, the register, and the retention period", () => {
  const text = fullText({ mail: true, webhook: false, storage: true, retentionDays: 730 });
  assert.match(text, /25 MB per file and 60 MB in total/);
  assert.match(text, /enquiry register/);
  assert.match(text, /only AHM staff who sign in can open it/);
  assert.match(text, /deleted from storage automatically 2 years after/);
  assert.match(text, /never sent .* deleted within two days/);
  assert.doesNotMatch(text, /keeps no copy/i, "the no-copy claim is false once files are stored");
  assert.doesNotMatch(text, /4 MB in total/);
});

test("without private storage, the policy keeps the in-form limits and the no-copy statement", () => {
  const text = fullText({ mail: true, webhook: false, storage: false });
  assert.match(text, /4 MB in total/);
  assert.match(text, /keeps no copy/);
  assert.doesNotMatch(text, /enquiry register/);
});

test("the assistant is disclosed, with Anthropic named, only when it is on", () => {
  const on = fullText({ mail: true, webhook: false, assistant: true });
  assert.match(on, /The sourcing assistant/);
  assert.match(on, /Anthropic/);
  assert.match(on, /does not store the conversation/);
  assert.doesNotMatch(fullText({ mail: true, webhook: false, assistant: false }), /Anthropic|sourcing assistant/);
});

test("the cookie policy names the staff sign-in cookie only where the register exists", () => {
  const text = (register: boolean) =>
    cookieSectionsFor(false, { register })
      .flatMap((s) => [...s.body, ...(s.list ?? [])])
      .join(" ");
  assert.match(text(true), /sign-in cookie for AHM staff/);
  assert.doesNotMatch(text(false), /sign-in cookie/);
  assert.match(text(false), /not in a cookie or browser storage/);
});

test("the privacy policy names Google only when analytics are on", () => {
  const on = privacySectionsFor({ mail: true, webhook: false }, true).flatMap((s) => [...s.body, ...(s.list ?? [])]).join(" ");
  const off = privacySectionsFor({ mail: true, webhook: false }, false).flatMap((s) => [...s.body, ...(s.list ?? [])]).join(" ");
  assert.match(on, /Google, as the analytics provider/);
  assert.doesNotMatch(off, /Google/);
});
