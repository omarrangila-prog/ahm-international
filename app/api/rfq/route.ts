import { NextResponse } from "next/server";
import { randomInt } from "node:crypto";
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
import { storageEnabled, storageNamespace } from "@/lib/storage/namespace";
import { isUploadId } from "@/lib/uploads/paths";
import { claimUploads, parseReportedUploads, readStoredFile, selectAttachments, type StoredFile } from "@/lib/uploads/claim";
import { parseAttribution, describeAttribution } from "@/lib/attribution";
import { leadFromSubmission } from "@/lib/pipeline/model";
import { createLead } from "@/lib/pipeline/store";
import { pipelineOrigin, pipelineStatus } from "@/lib/pipeline/config";

/**
 * POST /api/rfq
 *
 * Receives a quotation request as multipart form data.
 *
 * Files arrive one of two ways. Where the private store is configured, the
 * browser has already uploaded them there (see /api/rfq/upload) and this
 * request carries only their pathnames, which are verified and claimed for the
 * enquiry. Otherwise they travel inside this request, under the 4 MB ceiling
 * Vercel imposes on function bodies.
 *
 * Delivery has four destinations, attempted so that none can fail another:
 *
 *   - the enquiry register (lib/pipeline), when the store is configured.
 *     Written first, because the notification email links to it.
 *   - the company mailbox over authenticated SMTP (lib/rfq-mail.ts), with the
 *     files attached while they fit in one message.
 *   - an optional webhook (RFQ_WEBHOOK_URL), for a CRM or automation tool.
 *   - AHM OS, where it becomes a Lead, when that is configured.
 *
 * `delivered` is true only when a person will see the enquiry: the mailbox or
 * the webhook accepted it, or it is in a register staff can sign in to. The
 * buyer's confirmation screen reads it, so a submission that reached no one is
 * never shown as received.
 *
 * An attachment that fails a check does not fail the submission. The text of
 * an enquiry is the part a buyer cannot easily recreate; a file can be sent
 * again. Refused files are named in the response and in the notification, and
 * the buyer is told to email them with the reference.
 */

export const runtime = "nodejs";
/** Uploads make this inherently dynamic. */
export const dynamic = "force-dynamic";
/** Store checks, then SMTP to an external host with attachments. The mail timeouts sit inside this. */
export const maxDuration = 60;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 5 submissions per 10 minutes per IP

const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Short, human-quotable reference so a buyer can follow up on their enquiry. */
function makeReference(): string {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  let random = "";
  for (let i = 0; i < 4; i++) random += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  return `AHM-${stamp}-${random}`;
}

type FileSummary = { name: string; size: number; type: string };

/**
 * The webhook destination, for a CRM or an automation tool. Optional.
 *
 * Receives the fields and a summary of the files, not the files themselves:
 * a tech pack goes to the mailbox and the private store and nowhere else.
 */
async function deliverToWebhook(payload: {
  fields: Record<string, unknown>;
  files: FileSummary[];
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

/** Fields the form posts that are not part of the enquiry schema. */
const TRANSPORT_FIELDS = ["uploadId", "uploads", "attribution", "variant"] as const;

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
  const uploadId = form.get("uploadId");
  const reported = parseReportedUploads(form.get("uploads"));
  const attribution = parseAttribution(form.get("attribution"));

  // Collect scalar fields. Repeated keys (checkbox groups) become arrays.
  const raw: Record<string, unknown> = {};
  for (const [field, value] of form.entries()) {
    if (value instanceof File) continue;
    if ((TRANSPORT_FIELDS as readonly string[]).includes(field)) continue;
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

  const reference = makeReference();
  const fields = parsed.data as Record<string, unknown>;
  const receivedAt = new Date();

  /* ------------------------- Files in the request ------------------------ */
  // Each file is checked on its own and either attached or refused with a
  // reason. The browser applies the same limits first, so a refusal here is
  // rare and usually means a file that is not what its extension says.
  const uploads = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  const attachments: Attachment[] = [];
  const fileSummaries: FileSummary[] = [];
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

  /* ----------------------- Files already in the store -------------------- */
  let stored: StoredFile[] = [];
  const storedOnly: StoredFile[] = [];
  if (reported.length) {
    if (!storageEnabled() || !isUploadId(uploadId)) {
      for (const entry of reported) rejectedFiles.push({ name: sanitiseFilename(entry.name), reason: "the upload could not be matched to this form" });
    } else {
      try {
        const claimed = await claimUploads({ namespace: storageNamespace(), uploadId, reported, reference });
        stored = claimed.files;
        rejectedFiles.push(...claimed.refused);
      } catch (error) {
        console.error("[rfq] could not claim stored uploads", { reference, error: String(error) });
        for (const entry of reported) rejectedFiles.push({ name: sanitiseFilename(entry.name), reason: "could not be stored; please email it" });
      }

      // Attach what fits in one message; the rest is linked to the register.
      const toAttach = new Set(selectAttachments(stored).map((f) => f.pathname));
      for (const file of stored) {
        const content = toAttach.has(file.pathname) ? await readStoredFile(file.pathname).catch(() => null) : null;
        if (content) attachments.push({ filename: file.name, content, contentType: file.contentType });
        else storedOnly.push(file);
        fileSummaries.push({ name: file.name, size: file.size, type: file.contentType });
      }
    }
  }

  /* ------------------------------ Register ------------------------------- */
  const pipeline = pipelineStatus();
  let recorded = false;
  if (pipeline.records) {
    try {
      recorded = await createLead(
        leadFromSubmission({ reference, receivedAt, variant, fields, files: stored, refusedFiles: rejectedFiles, attribution }),
      );
      if (!recorded) console.error("[rfq] reference already in use; not recorded", { reference });
    } catch (error) {
      console.error("[rfq] could not record the enquiry", { reference, error: String(error) });
    }
  }
  const leadUrl =
    recorded && pipeline.signIn ? `${pipelineOrigin(process.env, request.headers.get("host"))}/pipeline/leads/${reference}` : null;

  /* ------------------------------ Delivery ------------------------------- */
  const mail = mailConfig();

  // Every destination is attempted and none may fail the others. A rejected
  // promise is logged by reference only: the buyer's details are already in
  // the mailbox when it worked, and do not belong in platform logs when it
  // did not.
  const [mailed, webhooked, publishedToOs] = await Promise.all([
    mail
      ? sendRfqMail(
          {
            reference,
            variant,
            fields,
            attachments,
            rejected: rejectedFiles,
            receivedAt,
            storedOnly: storedOnly.map((f) => ({ name: f.name, size: f.size })),
            leadUrl,
            arrivedVia: describeAttribution(attribution),
          },
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

  const delivered = mailed.delivered || webhooked || (recorded && pipeline.signIn);

  if (!mail && !process.env.RFQ_WEBHOOK_URL && !recorded) {
    // Nothing is configured. Say so in the logs, by reference, so an operator
    // can see that requests are arriving and going nowhere.
    console.warn("[rfq] received with no delivery destination configured", {
      reference,
      files: attachments.length + stored.length,
    });
  }

  return NextResponse.json({
    ok: true,
    reference,
    delivered,
    acknowledged: mailed.acknowledged,
    files: fileSummaries.length,
    rejectedFiles,
    // Reported for observability. The buyer's confirmation does not depend on them.
    recorded,
    ahmOs: publishedToOs,
  });
}

/** Anything other than POST is not meaningful here. */
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
