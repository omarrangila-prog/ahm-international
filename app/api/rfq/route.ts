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

/**
 * POST /api/rfq
 *
 * Receives a quotation request as multipart form data.
 *
 * The delivery step is intentionally pluggable. No mail provider, CRM or object
 * store is wired in, because none has been chosen and hard-coding one would mean
 * committing credentials or a vendor to the repository. `deliverSubmission`
 * below is the single seam where that integration goes; everything around it —
 * validation, rate limiting, upload policy, error shapes — is production
 * behaviour and does not change when it is filled in.
 *
 * Until then submissions are recorded server-side so nothing is silently lost,
 * and the route reports honestly whether it could hand the enquiry on.
 */

export const runtime = "nodejs";
/** Uploads make this inherently dynamic. */
export const dynamic = "force-dynamic";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 5 submissions per 10 minutes per IP

type Delivery = { delivered: boolean; reference: string };

/** Short, human-quotable reference so a buyer can follow up on their enquiry. */
function makeReference(): string {
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `AHM-${stamp}-${random}`;
}

/**
 * The integration seam.
 *
 * Replace the body with a mail send (Resend/SES/Postmark), a CRM create, or a
 * queue publish. Read credentials from environment variables — never from a
 * committed file, and never from anything reachable by the client.
 */
async function deliverSubmission(payload: {
  fields: Record<string, unknown>;
  files: { name: string; size: number; type: string }[];
  reference: string;
}): Promise<Delivery> {
  const configured = Boolean(process.env.RFQ_WEBHOOK_URL);

  if (!configured) {
    // No destination configured yet. Record it rather than dropping it, and do
    // not tell the buyer it was delivered.
    console.info(
      "[rfq] received (no delivery target configured)",
      JSON.stringify({
        reference: payload.reference,
        company: payload.fields.company,
        email: payload.fields.email,
        category: payload.fields.category,
        quantity: payload.fields.quantity,
        files: payload.files.map((f) => `${f.name} (${Math.round(f.size / 1024)}kB)`),
      }),
    );
    return { delivered: false, reference: payload.reference };
  }

  const response = await fetch(process.env.RFQ_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.RFQ_WEBHOOK_TOKEN
        ? { authorization: `Bearer ${process.env.RFQ_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
  });

  return { delivered: response.ok, reference: payload.reference };
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
  if (typeof raw.faxNumber === "string" && raw.faxNumber.length > 0) {
    return NextResponse.json({ ok: true, reference: makeReference(), delivered: true });
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
  const uploads = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (uploads.length > MAX_FILES) {
    return NextResponse.json(
      { ok: false, error: `Please attach no more than ${MAX_FILES} files.` },
      { status: 413 },
    );
  }

  let totalBytes = 0;
  const fileSummaries: { name: string; size: number; type: string }[] = [];

  for (const file of uploads) {
    const safeName = sanitiseFilename(file.name);

    if (!isAcceptedUpload(safeName, file.type)) {
      return NextResponse.json(
        { ok: false, error: `"${safeName}" is not an accepted file type.` },
        { status: 415 },
      );
    }

    // Extension and Content-Type are both client-supplied. The leading bytes
    // are the only part that has to stay honest for the file to remain usable,
    // so they are the check that actually holds.
    const head = new Uint8Array(await file.slice(0, SIGNATURE_BYTES).arrayBuffer());
    if (!signatureMatches(safeName, head)) {
      return NextResponse.json(
        {
          ok: false,
          error: `"${safeName}" does not appear to be a valid ${extensionOf(safeName).toUpperCase()} file. Please re-export it and try again.`,
        },
        { status: 415 },
      );
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `"${safeName}" is larger than ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB.`,
        },
        { status: 413 },
      );
    }

    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `Attachments total more than ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} MB.`,
        },
        { status: 413 },
      );
    }

    fileSummaries.push({ name: safeName, size: file.size, type: file.type });
  }

  /* ------------------------------ Delivery ------------------------------- */
  const reference = makeReference();

  try {
    const fields = parsed.data as Record<string, unknown>;

    // Both destinations are attempted; neither may fail the submission. The
    // webhook is how a human sees it, AHM OS is where it becomes a Lead.
    const [result, publishedToOs] = await Promise.all([
      deliverSubmission({ fields, files: fileSummaries, reference }),
      publishToAhmOs({ fields, reference, source: "website:rfq" }).catch(() => false),
    ]);

    return NextResponse.json({
      ok: true,
      reference: result.reference,
      delivered: result.delivered,
      files: fileSummaries.length,
      // Reported for observability. The buyer's confirmation does not depend on it.
      ahmOs: publishedToOs,
    });
  } catch (error) {
    // Never leak provider errors to the client.
    console.error("[rfq] delivery failed", { reference, error });
    return NextResponse.json(
      {
        ok: false,
        error: "We could not submit your request. Please try again, or email us directly.",
      },
      { status: 502 },
    );
  }
}

/** Anything other than POST is not meaningful here. */
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}
