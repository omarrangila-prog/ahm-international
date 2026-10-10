import { NextResponse } from "next/server";
import { isConfigured, publish, toLead } from "@/lib/ahm-os";
import { z } from "zod";
import {
  rfqSchema,
  miniRfqSchema,
  isAcceptedUpload,
  sanitiseFilename,
  extensionOf,
  MAX_FILE_BYTES,
  MAX_TOTAL_BYTES,
  MAX_FILES,
} from "@/lib/rfq-schema";
import { signatureMatches, SIGNATURE_BYTES } from "@/lib/upload-policy";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { mailConfig, sendRfqMail, type Attachment, type RejectedFile } from "@/lib/rfq-mail";

/**
 * POST /api/rfq
 *
 * Receives a quotation request as multipart form data.
 *
 * Delivery has three destinations, attempted together, none of which may fail
 * the others:
 *
 *   - the company mailbox over authenticated SMTP (lib/rfq-mail.ts), with the
 *     buyer's files attached. This is how a person sees the enquiry, and the
 *     mailbox is where it is kept.
 *   - an optional webhook (RFQ_WEBHOOK_URL), for a CRM or automation tool.
 *   - AHM OS, where it becomes a Lead, when that is configured.
 *
 * `delivered` is true only when the mailbox or the webhook accepted the
 * request. The buyer's confirmation screen reads it, so a submission that
 * reached no one is never shown as received.
 *
 * An attachment that fails a check no longer fails the submission. The text of
 * an enquiry is the part a buyer cannot easily recreate; a file can be sent
 * again. Refused files are named in the response and in the notification, and
 * the buyer is told to email them with the reference.
 */

export const runtime = "nodejs";
/** Uploads make this inherently dynamic. */
export const dynamic = "force-dynamic";
/** SMTP to an external host, with attachments. The mail timeouts sit inside this. */
export const maxDuration = 30;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 5 submissions per 10 minutes per IP

/** Short, human-quotable reference so a buyer can follow up on their enquiry. */
function makeReference(): string {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AHM-${stamp}-${random}`;
}

/**
 * The webhook destination, for a CRM or an automation tool. Optional.
 *
 * Receives the fields and a summary of the files, not the files themselves:
 * a tech pack goes to the mailbox and nowhere else.
 */
async function deliverToWebhook(payload: {
  fields: Record<string, unknown>;
  files: { name: string; size: number; type: string }[];
  rejectedFiles: RejectedFile[];
  reference: string;
}): Promise<boolean> {
  const url = process.env.RFQ_WEBHOOK_URL;
  if (!url) return false;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.RFQ_WEBHOOK_TOKEN
        ? { authorization: `Bearer ${process.env.RFQ_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });
  return response.ok;
}

/**
 * AHM OS (spec §55).
 *
 * Runs alongside the webhook rather than replacing it: the webhook is how the
 * enquiry reaches a human today, AHM OS is where it becomes a Lead. Neither is
 * allowed to fail the buyer's submission, so the result is recorded and the
 * request continues either way.
 */
async function publishToAhmOs(payload: {
  fields: Record<string, unknown>;
  reference: string;
  source: string;
}): Promise<boolean> {
  if (!isConfigured()) return false;

  const createdAt = new Date().toISOString();
  const lead = toLead(payload.fields, {
    reference: payload.reference,
    source: payload.source,
    createdAt,
  });

  const result = await publish("lead.created", lead, { idempotencyKey: payload.reference });
  return result.published;
}

export async function POST(request: Request) {
  /* ---------------------------- Rate limiting ---------------------------- */
  const key = clientKey(request.headers);
  const limit = rateLimit(`rfq:${key}`, RATE_LIMIT, RATE_WINDOW_MS);

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } },
    );
  }

  /* ------------------------------ Parsing -------------------------------- */
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the submission." },
      { status: 400 },
    );
  }

  const variant = form.get("variant") === "mini" ? "mini" : "full";

  // Collect scalar fields. Repeated keys (checkbox groups) become arrays.
  const raw: Record<string, unknown> = {};
  for (const [field, value] of form.entries()) {
    if (value instanceof File) continue;
    if (field === "decoration") {
      const list = (raw.decoration as string[] | undefined) ?? [];
      list.push(value);
      raw.decoration = list;
      continue;
    }
    if (value === "true" || value === "false") {
      raw[field] = value === "true";
      continue;
    }
    raw[field] = value;
  }

  /* ------------------------------ Honeypot ------------------------------- */
  // Accepted silently: telling a bot it was detected only helps it adapt.
  //
  // `delivered: false` because nothing was delivered, and this file does not
  // report deliveries that did not happen — the no-destination branch below
  // says so in as many words. A bot does not read the flag; a person whose
  // autofill reached a field marked aria-hidden, tabIndex -1 and
  // autocomplete="off" does, and it points them at a channel that works
  // instead of losing the enquiry behind a clean confirmation.
  if (typeof raw.faxNumber === "string" && raw.faxNumber.length > 0) {
    return NextResponse.json({ ok: true, reference: makeReference(), delivered: false });
  }

  /* ----------------------------- Validation ------------------------------ */
  const schema = variant === "mini" ? miniRfqSchema : rfqSchema;
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of (parsed.error as z.ZodError).issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Some fields need attention.", fieldErrors },
      { status: 422 },
    );
  }

  /* ------------------------------- Files --------------------------------- */
  // Each file is checked on its own and either attached or refused with a
  // reason. The browser applies the same limits first, so a refusal here is
  // rare and usually means a file that is not what its extension says.
  const uploads = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  const attachments: Attachment[] = [];
  const fileSummaries: { name: string; size: number; type: string }[] = [];
  const rejectedFiles: RejectedFile[] = [];
  let totalBytes = 0;

  for (const file of uploads) {
    const safeName = sanitiseFilename(file.name);
    const refuse = (reason: string) => rejectedFiles.push({ name: safeName, reason });

    if (attachments.length >= MAX_FILES) {
      refuse(`more than ${MAX_FILES} files were attached`);
      continue;
    }
    if (!isAcceptedUpload(safeName, file.type)) {
      refuse("not an accepted file type");
      continue;
    }
    if (file.size > MAX_FILE_BYTES || totalBytes + file.size > MAX_TOTAL_BYTES) {
      refuse(`over the ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} MB form limit`);
      continue;
    }

    // Extension and Content-Type are both client-supplied. The leading bytes
    // are the only part that has to stay honest for the file to remain usable,
    // so they are the check that actually holds.
    const content = Buffer.from(await file.arrayBuffer());
    if (!signatureMatches(safeName, new Uint8Array(content.subarray(0, SIGNATURE_BYTES)))) {
      refuse(`does not appear to be a valid ${extensionOf(safeName).toUpperCase()} file`);
      continue;
    }

    totalBytes += file.size;
    attachments.push({ filename: safeName, content, contentType: file.type || "application/octet-stream" });
    fileSummaries.push({ name: safeName, size: file.size, type: file.type });
  }

  /* ------------------------------ Delivery ------------------------------- */
  const reference = makeReference();
  const fields = parsed.data as Record<string, unknown>;
  const mail = mailConfig();

  // Every destination is attempted and none may fail the others. A rejected
  // promise is logged by reference only: the buyer's details are already in
  // the mailbox when it worked, and do not belong in platform logs when it
  // did not.
  const [mailed, webhooked, publishedToOs] = await Promise.all([
    mail
      ? sendRfqMail(
          { reference, variant, fields, attachments, rejected: rejectedFiles, receivedAt: new Date() },
          mail,
        ).catch((error: unknown) => {
          console.error("[rfq] mail delivery failed", { reference, error: String(error) });
          return { delivered: false, acknowledged: false };
        })
      : Promise.resolve({ delivered: false, acknowledged: false }),
    deliverToWebhook({ fields, files: fileSummaries, rejectedFiles, reference }).catch((error: unknown) => {
      console.error("[rfq] webhook delivery failed", { reference, error: String(error) });
      return false;
    }),
    publishToAhmOs({ fields, reference, source: "website:rfq" }).catch(() => false),
  ]);

  const delivered = mailed.delivered || webhooked;

  if (!mail && !process.env.RFQ_WEBHOOK_URL) {
    // Nothing is configured. Say so in the logs, by reference, so an operator
    // can see that requests are arriving and going nowhere.
    console.warn("[rfq] received with no delivery destination configured", {
      reference,
      files: attachments.length,
    });
  }

  return NextResponse.json({
    ok: true,
    reference,
    delivered,
    acknowledged: mailed.acknowledged,
    files: attachments.length,
    rejectedFiles,
    // Reported for observability. The buyer's confirmation does not depend on it.
    ahmOs: publishedToOs,
  });
}

/** Anything other than POST is not meaningful here. */
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
