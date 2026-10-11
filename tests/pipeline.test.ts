import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyChanges,
  buildDigest,
  buildReport,
  isDay,
  leadFromSubmission,
  outcomeOf,
  STAGES,
  stageIndex,
  summarise,
  toCsv,
  type Lead,
  type LeadSummary,
} from "../lib/pipeline/model.ts";
import { signToken, verifyToken } from "../lib/pipeline/tokens.ts";
import { can, staffList } from "../lib/pipeline/staff.ts";
import { pipelineOrigin, pipelineStatus } from "../lib/pipeline/config.ts";
import { pinAccount, pinDay, pinFrom, pinMatches } from "../lib/pipeline/pin.ts";

/**
 * The enquiry register's rules: the stages are the owner's, history is kept
 * rather than overwritten, sign-in links and sessions cannot be forged or
 * swapped, and nothing a stranger sends can point a staff email elsewhere.
 */

const NOW = new Date("2026-10-10T09:00:00Z");

function lead(overrides: Partial<Lead> = {}): Lead {
  return {
    ...leadFromSubmission({
      reference: "AHM-261010-ABCD",
      receivedAt: new Date("2026-10-01T09:00:00Z"),
      variant: "full",
      fields: {
        name: "Ada Buyer",
        company: "Example Uniforms",
        email: "ada@example.com",
        country: "United Kingdom",
        category: "Aprons",
        quantity: "1,000-5,000 pcs",
        fabric: "Cotton Canvas",
        decoration: ["Embroidery", "Woven badges"],
        needsRecommendation: true,
        source: "rfq_page",
      },
      files: [],
      refusedFiles: [],
      attribution: { landing: "/products/aprons", referrer: "www.google.com", campaign: {} },
    }),
    ...overrides,
  };
}

test("the stages are the eleven in the owner's brief, in order", () => {
  assert.deepEqual(
    STAGES.map((s) => s.label),
    [
      "New inquiry",
      "Qualification",
      "Specification review",
      "FOB costing",
      "Quotation sent",
      "Sampling",
      "Negotiation",
      "Purchase order",
      "Production",
      "Shipment",
      "Repeat business",
    ],
  );
});

test("a submission becomes a new, open, unassigned lead with its details labelled", () => {
  const l = lead();
  assert.equal(l.stage, "new");
  assert.equal(l.status, "open");
  assert.equal(l.owner, null);
  assert.equal(l.contact.company, "Example Uniforms");
  assert.deepEqual(l.details.find((d) => d.label === "Decoration"), { label: "Decoration", value: "Embroidery, Woven badges" });
  assert.deepEqual(l.details.find((d) => d.label === "Wants a fabric recommendation"), { label: "Wants a fabric recommendation", value: "Yes" });
  assert.equal(l.activity.length, 1);
  assert.equal(summarise(l).source, "www.google.com");
});

test("changes are logged, and an unchanged save is a no-op", () => {
  const l = lead();
  assert.equal(applyChanges(l, { stage: "new", owner: null, note: null }, "ali@ahm", NOW), l);

  const moved = applyChanges(l, { stage: "quoted", owner: "ali@ahm", quoteRef: "Q-114", lastContactAt: "2026-10-09" }, "ali@ahm", NOW);
  assert.equal(moved.stage, "quoted");
  assert.equal(moved.maxStage, stageIndex("quoted"));
  assert.equal(moved.firstContactAt, "2026-10-09");
  assert.deepEqual(
    moved.activity.slice(1).map((a) => a.kind),
    ["stage", "owner", "contact", "quote"],
  );
  assert.equal(moved.updatedAt, NOW.toISOString());

  // Moving back keeps the furthest stage reached, so the funnel is not rewritten.
  const back = applyChanges(moved, { stage: "costing" }, "ali@ahm", NOW);
  assert.equal(back.maxStage, stageIndex("quoted"));
  // First contact is the first one, not the latest.
  assert.equal(applyChanges(moved, { lastContactAt: "2026-10-10" }, "x", NOW).firstContactAt, "2026-10-09");
});

test("lost is a status beside the stage, with a reason, and reopening clears the reason", () => {
  const lost = applyChanges(lead({ stage: "quoted" }), { status: "lost", lostReason: "Price" }, "a", NOW);
  assert.equal(outcomeOf(lost), "lost");
  assert.equal(lost.lostReason, "Price");
  assert.equal(lost.stage, "quoted");
  const reopened = applyChanges(lost, { status: "open" }, "a", NOW);
  assert.equal(reopened.lostReason, null);
  assert.equal(outcomeOf(applyChanges(lead(), { stage: "purchase-order" }, "a", NOW)), "won");
});

test("dates are real calendar days", () => {
  assert.ok(isDay("2026-02-28"));
  assert.ok(!isDay("2026-02-30"));
  assert.ok(!isDay("2026-2-3"));
  assert.ok(!isDay("2026-10-10T00:00"));
});

const summary = (over: Partial<LeadSummary>): LeadSummary => ({ ...summarise(lead()), ...over });

test("the report counts records and nothing else", () => {
  const leads = [
    summary({ ref: "A", country: "United Kingdom", maxStage: stageIndex("quoted"), stage: "quoted" }),
    summary({ ref: "B", country: "United Kingdom", maxStage: 0, stage: "new", files: 2 }),
    summary({ ref: "C", country: "Canada", maxStage: stageIndex("production"), stage: "production", firstContactAt: "2026-10-03" }),
    summary({ ref: "D", country: "Canada", maxStage: stageIndex("quoted"), stage: "quoted", status: "lost" }),
  ];
  const r = buildReport(leads, NOW);
  assert.deepEqual(r.byCountry.map((c) => [c.key, c.total, c.qualified]), [
    ["Canada", 2, 2],
    ["United Kingdom", 2, 1],
  ]);
  assert.deepEqual(r.quotation, { issued: 3, won: 1, lost: 1, open: 1 });
  assert.equal(r.funnel[0].reached, 4);
  assert.equal(r.funnel[stageIndex("purchase-order")].reached, 1);
  assert.equal(r.quality.withFiles, 1);
  assert.equal(r.followUp.medianDaysToFirstContact, 2);

  // Each breakdown row is carried to the order: Canada sent the one that was won.
  assert.deepEqual(r.byCountry.map((c) => [c.key, c.quoted, c.won]), [
    ["Canada", 2, 1],
    ["United Kingdom", 1, 0],
  ]);
  const step = (name: string) => r.conversion.find((c) => c.step === name)!;
  assert.deepEqual([step("Enquiry to qualified").part, step("Enquiry to qualified").whole], [3, 4]);
  assert.deepEqual([step("Qualified to quotation").part, step("Qualified to quotation").whole], [3, 3]);
  assert.deepEqual([step("Quotation to order").part, step("Quotation to order").whole], [1, 3]);
  // Production is past sampling in the stage order, so the order counts as sampled.
  assert.deepEqual([step("Quotation to sample").part, step("Order to repeat business").whole], [1, 1]);
});

test("conversion on an empty register is all zeros, not a division by zero", () => {
  const r = buildReport([], NOW);
  for (const c of r.conversion) assert.deepEqual([c.part, c.whole], [0, 0], c.step);
});

test("the digest finds overdue follow-ups and quiet quotations, and nothing that is fine", () => {
  const leads = [
    summary({ ref: "DUE", followUpAt: "2026-10-09" }),
    summary({ ref: "LATER", followUpAt: "2026-10-20", stage: "qualification", createdAt: NOW.toISOString() }),
    summary({ ref: "QUIET", stage: "quoted", lastContactAt: "2026-09-25", createdAt: NOW.toISOString() }),
    summary({ ref: "LOST", stage: "quoted", status: "lost", lastContactAt: "2026-09-01" }),
  ];
  const sections = buildDigest(leads, NOW);
  const refs = Object.fromEntries(sections.map((s) => [s.title, s.leads.map((l) => l.ref)]));
  assert.deepEqual(refs["Follow-ups due"], ["DUE"]);
  assert.deepEqual(refs["Quotations with no contact for 7+ days"], ["QUIET"]);
  assert.ok(!sections.some((s) => s.leads.some((l) => l.ref === "LATER" || l.ref === "LOST")));
});

test("the CSV export cannot carry a spreadsheet formula", () => {
  const csv = toCsv([{ company: "=HYPERLINK(\"http://x\")", note: "a,b", n: 3 }]);
  const row = csv.split("\r\n")[1];
  assert.ok(row.startsWith(`"'=HYPERLINK(""http://x"")"`), row);
  assert.ok(row.includes('"a,b"'));
});

/* ------------------------------ Sign-in ------------------------------ */

const SECRET = "test-secret-not-a-real-token";

test("a token verifies only unaltered, unexpired, and for its own purpose", () => {
  const future = Date.now() + 60_000;
  const token = signToken({ e: "a@b.co", n: "nonce-123456", x: future }, SECRET, "login");
  assert.equal(verifyToken<{ e: string; x: number }>(token, SECRET, "login")?.e, "a@b.co");
  assert.equal(verifyToken(token, SECRET, "session"), null, "a sign-in link must not work as a session");
  assert.equal(verifyToken(token, "another-secret", "login"), null);

  const [body, mac] = token.split(".");
  const forged = Buffer.from(JSON.stringify({ e: "attacker@x.co", n: "n", x: future })).toString("base64url");
  assert.equal(verifyToken(`${forged}.${mac}`, SECRET, "login"), null);
  assert.equal(verifyToken(`${body}.${mac}x`, SECRET, "login"), null);

  const expired = signToken({ e: "a@b.co", x: Date.now() - 1 }, SECRET, "session");
  assert.equal(verifyToken(expired, SECRET, "session"), null);
  assert.equal(verifyToken("not-a-token", SECRET, "session"), null);
});

test("the staff list defaults to the company mailbox as admin, and roles gate actions", () => {
  assert.deepEqual([...staffList({ NEXT_PUBLIC_SALES_EMAIL: "Info@AHMinternationals.com" })], [["info@ahminternationals.com", "admin"]]);
  const staff = staffList({ PIPELINE_STAFF: "boss@ahm.com:admin, ali@ahm.com, view@ahm.com:viewer, not-an-email:admin" });
  assert.deepEqual([...staff], [
    ["boss@ahm.com", "admin"],
    ["ali@ahm.com", "sales"],
    ["view@ahm.com", "viewer"],
  ]);
  assert.ok(can("admin", "delete") && can("admin", "export"));
  assert.ok(can("sales", "edit") && !can("sales", "delete") && !can("sales", "export"));
  assert.ok(can("viewer", "view") && !can("viewer", "edit"));
});

test("email links never follow the request's Host header outside local development", () => {
  assert.equal(pipelineOrigin({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.ahminternationals.com" }, "evil.example"), "https://www.ahminternationals.com");
  assert.equal(pipelineOrigin({ VERCEL_ENV: "preview", VERCEL_BRANCH_URL: "ahm-git-x.vercel.app" }, "evil.example"), "https://ahm-git-x.vercel.app");
  assert.equal(pipelineOrigin({}, "localhost:3200"), "http://localhost:3200");
  assert.equal(pipelineOrigin({}, "evil.example"), "https://www.ahminternationals.com");
  assert.equal(pipelineOrigin({}, "localhost.evil.example"), "https://www.ahminternationals.com");
});

test("sign-in needs the store, the mailbox and a staff address, and says which is missing", () => {
  assert.equal(pipelineStatus({}).signIn, false);
  assert.equal(pipelineStatus({ BLOB_READ_WRITE_TOKEN: "x" }).records, true);
  const partial = pipelineStatus({ BLOB_READ_WRITE_TOKEN: "x", NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" });
  assert.equal(partial.signIn, false);
  assert.ok(partial.missing.some((m) => m.includes("SMTP_PASS")));
  assert.equal(pipelineStatus({ BLOB_READ_WRITE_TOKEN: "x", SMTP_PASS: "p", NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" }).signIn, true);
});

test("a PIN alone is a way in, as the first admin, and only when it is 4 to 12 digits", () => {
  const base = { BLOB_READ_WRITE_TOKEN: "x", NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" };

  const pinOnly = pipelineStatus({ ...base, PIPELINE_PIN: " 8126 " });
  assert.deepEqual([pinOnly.signIn, pinOnly.pin, pinOnly.link], [true, true, false]);
  assert.deepEqual(pinOnly.missing, []);

  const both = pipelineStatus({ ...base, PIPELINE_PIN: "8126", SMTP_PASS: "p" });
  assert.deepEqual([both.pin, both.link], [true, true]);

  for (const bad of ["123", "12ab", "1234567890123", "12 34"]) {
    assert.equal(pinFrom({ PIPELINE_PIN: bad }), null, bad);
    const status = pipelineStatus({ ...base, PIPELINE_PIN: bad });
    assert.equal(status.pin, false, bad);
    assert.ok(status.missing.some((m) => m.includes("4 to 12 digits")), bad);
    assert.match(status.pinIssue ?? "", /not 4 to 12 plain digits/, bad);
  }
  assert.equal(pinOnly.pinIssue, null);
  assert.equal(pipelineStatus(base).pinIssue, null, "no PIN set is not a problem");
  // Quotes typed around the PIN, and digits from a non-Latin keyboard, are not plain digits.
  for (const typed of ['"4444"', "\u06F4\u06F4\u06F4\u06F4"]) {
    assert.ok(pipelineStatus({ ...base, SMTP_PASS: "p", PIPELINE_PIN: typed }).pinIssue, typed);
  }

  // The PIN needs the store as much as the link does: the attempt count lives there.
  assert.equal(pipelineStatus({ NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com", PIPELINE_PIN: "8126" }).pin, false);

  assert.equal(pinAccount({ NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" }), "info@ahminternationals.com");
  assert.equal(pinAccount({ PIPELINE_STAFF: "a@x.com:sales, b@x.com:admin, c@x.com:admin" }), "b@x.com");
  assert.equal(pinAccount({ PIPELINE_STAFF: "a@x.com:sales" }), null);
  assert.equal(pipelineStatus({ ...base, PIPELINE_STAFF: "a@x.com:sales", PIPELINE_PIN: "8126" }).pin, false);
  assert.match(pipelineStatus({ ...base, PIPELINE_STAFF: "a@x.com:sales", PIPELINE_PIN: "8126" }).pinIssue ?? "", /no admin/);
});

test("a PIN matches only itself, and attempts are counted per UTC day", () => {
  assert.equal(pinMatches("8126", "8126"), true);
  for (const wrong of ["", "812", "81260", "8127", " 8126"]) assert.equal(pinMatches(wrong, "8126"), false, wrong);
  assert.equal(pinDay(new Date("2026-10-11T23:59:59Z")), "2026-10-11");
  // 04:30 in Karachi is still the previous day in UTC, which is what the lock message says.
  assert.equal(pinDay(new Date("2026-10-12T04:30:00+05:00")), "2026-10-11");
});
