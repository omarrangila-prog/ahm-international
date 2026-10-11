import nodemailer from "nodemailer";
import type { MailConfig } from "./mail-config";

export { mailConfig, type MailConfig } from "./mail-config";

/**
 * RFQ email delivery through the company mailbox.
 *
 * Every accepted request is sent to info@ahminternationals.com through
 * Hostinger's authenticated SMTP, with the buyer's attachments on the message.
 * Nothing is ever written to a public URL. When the private store is
 * configured, files also live there (see lib/uploads/claim.ts): attached while
 * they fit in one message, and otherwise listed with a link to the enquiry
 * register, which only signed-in staff can open.
 *
 * Configuration is environment-only and server-only. None of these variables
 * carry a NEXT_PUBLIC_ prefix, so none of them can be inlined into a browser
 * bundle.
 *
 *   SMTP_PASS        required. The mailbox password.
 *   SMTP_USER        defaults to NEXT_PUBLIC_SALES_EMAIL.
 *   SMTP_HOST        defaults to smtp.hostinger.com.
 *   SMTP_PORT        defaults to 465 (implicit TLS). 587 uses STARTTLS.
 *   RFQ_NOTIFY_TO    defaults to the sending mailbox.
 *   RFQ_SEND_ACKNOWLEDGEMENT  "true" to also email the buyer a receipt.
 *
 * The builders below are pure so they can be tested without a mail server;
 * `sendRfqMail` is the only function that opens a connection.
 */

/** Human labels, in the order the commercial team reads an enquiry. */
const FIELD_LABELS: [key: string, label: string][] = [
  ["company", "Company"],
  ["name", "Contact"],
  ["email", "Email"],
  ["phone", "Phone / WhatsApp"],
  ["country", "Country"],
  ["website", "Website"],
  ["category", "Product"],
  ["styleName", "Style name"],
  ["gender", "Fit / gender"],
  ["quantity", "Quantity"],
  ["annualQuantity", "Annual quantity"],
  ["repeatProgram", "Repeat program"],
  ["sizeRange", "Size range"],
  ["colours", "Colours"],
  ["fabric", "Fabric"],
  ["composition", "Composition"],
  ["weight", "Weight / GSM"],
  ["finish", "Finish"],
  ["performance", "Performance requirements"],
  ["needsRecommendation", "Wants a fabric recommendation"],
  ["openToAlternatives", "Open to alternatives"],
  ["decoration", "Decoration"],
  ["decorationNotes", "Decoration notes"],
  ["targetPrice", "Target price"],
  ["targetDelivery", "Target delivery"],
  ["destinationPort", "Destination port"],
  ["notes", "Notes"],
  ["source", "Submitted from"],
];

/**
 * One line, bounded. Header values come from a public form; nodemailer encodes
 * headers, but a subject is also read by people and by mail filters, so a
 * value that tries to look like several lines is flattened here as well.
 */
function oneLine(value: unknown, max = 120): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, max);
}

function display(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;
  if (Array.isArray(value)) return value.length ? value.join(", ") : null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export type Attachment = { filename: string; content: Buffer; contentType: string };
export type RejectedFile = { name: string; reason: string };

export type RfqMailInput = {
  reference: string;
  variant: "full" | "mini";
  fields: Record<string, unknown>;
  attachments: Attachment[];
  rejected: RejectedFile[];
  receivedAt: Date;
  /** Files held in the private store that were too large to attach. */
  storedOnly?: { name: string; size: number }[];
  /** The enquiry in the register, when the register is on. */
  leadUrl?: string | null;
  /** Campaign, referring site or landing page, already reduced to one line. */
  arrivedVia?: string | null;
};

/** The notification the commercial team receives. */
export function buildNotification(input: RfqMailInput) {
  const { reference, fields, attachments, rejected } = input;
  const company = oneLine(fields.company) || "Unknown company";
  const product = oneLine(fields.category);
  const storedOnly = input.storedOnly ?? [];

  const lines: string[] = [
    `Request for quotation ${reference}`,
    `Received ${input.receivedAt.toISOString().replace("T", " ").slice(0, 16)} UTC via the ${input.variant === "mini" ? "short" : "full"} form.`,
    ...(input.arrivedVia ? [`Arrived via: ${oneLine(input.arrivedVia, 200)}`] : []),
    ...(input.leadUrl ? [`Enquiry register: ${input.leadUrl}`] : []),
    "",
  ];

  const known = new Set(FIELD_LABELS.map(([k]) => k));
  for (const [key, label] of FIELD_LABELS) {
    const value = display(fields[key]);
    if (value !== null) lines.push(`${label}: ${value}`);
  }
  // A field added to the schema later still arrives, under its own key, rather
  // than being dropped because nobody updated the label list.
  for (const [key, raw] of Object.entries(fields)) {
    if (known.has(key) || key === "faxNumber" || key === "variant") continue;
    const value = display(raw);
    if (value !== null) lines.push(`${key}: ${value}`);
  }

  lines.push("");
  if (attachments.length) {
    lines.push(`Attached (${attachments.length}):`);
    for (const a of attachments) lines.push(`  - ${a.filename} (${Math.round(a.content.length / 1024)} kB)`);
  } else if (!storedOnly.length) {
    lines.push("No files attached.");
  }
  if (storedOnly.length) {
    if (attachments.length) lines.push("");
    lines.push(`Too large to attach, kept in the enquiry register (${storedOnly.length}):`);
    for (const f of storedOnly) lines.push(`  - ${f.name} (${(f.size / 1024 / 1024).toFixed(1)} MB)`);
    if (input.leadUrl) lines.push(`  Download them from ${input.leadUrl}`);
  }
  if (rejected.length) {
    lines.push("");
    lines.push("Files the buyer selected that were not accepted, and were told to email instead:");
    for (const r of rejected) lines.push(`  - ${r.name}: ${r.reason}`);
  }
  lines.push("");
  lines.push(`Reply to this email to answer the buyer directly. Quote ${reference} in any follow-up.`);

  return {
    subject: oneLine(`RFQ ${reference}: ${company}${product ? `, ${product}` : ""}`, 160),
    text: lines.join("\n"),
    replyTo: {
      name: oneLine(fields.name, 80) || company,
      address: String(fields.email ?? ""),
    },
    attachments,
  };
}

/**
 * The buyer's receipt.
 *
 * It contains nothing the buyer typed except their own address. A form that
 * sends mail to whatever address it is given, carrying text it was given, is a
 * way to send messages from this company's mailbox to anyone; a fixed receipt
 * with only a reference number is useless for that.
 */
export function buildAcknowledgement(reference: string) {
  return {
    subject: `We received your request for quotation (${reference})`,
    text: [
      "Thank you for your request for quotation.",
      "",
      `Your reference is ${reference}. Please quote it in any follow-up.`,
      "",
      "Our commercial team reviews each request against the specification before replying. If a detail is needed to cost it accurately, we will ask rather than assume.",
      "",
      "You can reply to this email to add files or information.",
      "",
      "AHM International",
      "Karachi, Pakistan",
    ].join("\n"),
  };
}

export type DeliveryResult = { delivered: boolean; acknowledged: boolean };

/**
 * Sends the notification, then the receipt if enabled.
 *
 * `delivered` is true only when the SMTP server accepted the notification. The
 * receipt is best-effort and cannot change that answer: a buyer whose enquiry
 * reached the team should not be told otherwise because their own mail server
 * refused a courtesy copy.
 */
export function transportFor(config: MailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
    // Bounded so a slow mail server fails the delivery inside the function's
    // time limit instead of hanging the buyer's submission.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export async function sendRfqMail(input: RfqMailInput, config: MailConfig): Promise<DeliveryResult> {
  const transport = transportFor(config);

  const notification = buildNotification(input);
  const info = await transport.sendMail({
    from: { name: "AHM International website", address: config.user },
    to: config.to,
    replyTo: notification.replyTo,
    subject: notification.subject,
    text: notification.text,
    attachments: notification.attachments,
  });
  const delivered = info.accepted.length > 0;

  let acknowledged = false;
  if (delivered && config.acknowledge) {
    try {
      const receipt = buildAcknowledgement(input.reference);
      await transport.sendMail({
        from: { name: "AHM International", address: config.user },
        to: String(input.fields.email),
        subject: receipt.subject,
        text: receipt.text,
      });
      acknowledged = true;
    } catch {
      acknowledged = false;
    }
  }

  transport.close();
  return { delivered, acknowledged };
}
