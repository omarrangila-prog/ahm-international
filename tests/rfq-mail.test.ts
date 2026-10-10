import { test } from "node:test";
import assert from "node:assert/strict";
import { mailConfig, buildNotification, buildAcknowledgement } from "../lib/rfq-mail.ts";

/**
 * The RFQ notification is the record of a buyer's enquiry, and the receipt is
 * the one message this site sends to an address it was given. Both are built
 * by pure functions so these properties can be held without a mail server.
 */

const base = {
  reference: "AHM-261010-TEST",
  variant: "full" as const,
  attachments: [],
  rejected: [],
  receivedAt: new Date("2026-10-10T09:30:00Z"),
};

test("mail is off unless a password is set, and defaults to Hostinger over TLS", () => {
  assert.equal(mailConfig({ NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" }), null);

  const config = mailConfig({ SMTP_PASS: "x", NEXT_PUBLIC_SALES_EMAIL: "info@ahminternationals.com" });
  assert.ok(config);
  assert.equal(config.host, "smtp.hostinger.com");
  assert.equal(config.port, 465);
  assert.equal(config.secure, true);
  assert.equal(config.user, "info@ahminternationals.com");
  assert.equal(config.to, "info@ahminternationals.com");
  assert.equal(config.acknowledge, false, "the buyer receipt is opt-in");
});

test("port 587 negotiates STARTTLS rather than implicit TLS", () => {
  const config = mailConfig({ SMTP_PASS: "x", SMTP_USER: "a@b.com", SMTP_PORT: "587" });
  assert.equal(config?.secure, false);
});

test("a subject cannot be split into extra header lines", () => {
  const mail = buildNotification({
    ...base,
    fields: { company: "Acme\r\nBcc: victim@example.com", email: "buyer@acme.com", category: "Aprons" },
  });
  assert.ok(!/[\r\n]/.test(mail.subject), mail.subject);
  assert.match(mail.subject, /^RFQ AHM-261010-TEST: Acme Bcc/);
});

test("replies go to the buyer, and every submitted field arrives", () => {
  const mail = buildNotification({
    ...base,
    fields: {
      company: "Acme",
      name: "Sam",
      email: "buyer@acme.com",
      quantity: "1,000-5,000 pcs",
      decoration: ["Embroidery", "Screen print"],
      openToAlternatives: true,
      futureField: "kept",
      faxNumber: "",
    },
  });
  assert.equal(mail.replyTo.address, "buyer@acme.com");
  assert.match(mail.text, /Quantity: 1,000-5,000 pcs/);
  assert.match(mail.text, /Decoration: Embroidery, Screen print/);
  assert.match(mail.text, /Open to alternatives: Yes/);
  assert.match(mail.text, /futureField: kept/, "an unlabelled field must not be dropped");
  assert.ok(!/faxNumber/.test(mail.text), "the honeypot is not part of the enquiry");
});

test("refused files are listed so the team knows to expect them by email", () => {
  const mail = buildNotification({
    ...base,
    fields: { company: "Acme", email: "buyer@acme.com" },
    rejected: [{ name: "techpack.pdf", reason: "over the 4 MB form limit" }],
  });
  assert.match(mail.text, /techpack\.pdf: over the 4 MB form limit/);
});

test("the buyer receipt carries nothing the buyer typed", () => {
  const receipt = buildAcknowledgement("AHM-261010-TEST");
  assert.match(receipt.text, /AHM-261010-TEST/);
  assert.match(receipt.subject, /AHM-261010-TEST/);
  // Fixed text only: there is no parameter through which submitted content
  // could reach a third party's inbox.
  assert.equal(buildAcknowledgement.length, 1);
});
