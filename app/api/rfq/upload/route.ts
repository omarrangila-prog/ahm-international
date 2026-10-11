import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { DIRECT_LIMITS } from "@/lib/upload-policy";
import { parseUploadRequest } from "@/lib/uploads/paths";
import { storageEnabled, storageNamespace } from "@/lib/storage/namespace";
import { rateLimit, clientKey } from "@/lib/rate-limit";

/**
 * POST /api/rfq/upload
 *
 * Issues a short-lived token that lets the buyer's browser put one file into
 * the private store. The file itself never passes through here, which is the
 * point: Vercel refuses function bodies over 4.5 MB, and a tech pack is often
 * larger.
 *
 * The token is the control. It names one pathname under this deployment's
 * namespace, the content types of that file's extension, a size ceiling, and a
 * thirty-minute expiry, and the store enforces all four. What it cannot prove
 * is that the bytes are what the extension claims; the submission route checks
 * that before the file is attached to an enquiry.
 *
 * Completion callbacks are not used. The submission reports what was uploaded
 * and the server verifies each file then, so there is no webhook to secure and
 * nothing that behaves differently on a preview or on localhost.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Six files per enquiry, with room for a retry or two. */
const RATE_LIMIT = 24;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  if (!storageEnabled()) {
    return NextResponse.json({ error: "Uploads go with the form on this deployment." }, { status: 404 });
  }

  const limit = rateLimit(`upload:${clientKey(request.headers)}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait a few minutes and try again." },
      { status: 429, headers: { "retry-after": String(limit.retryAfter) } },
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Could not read the request." }, { status: 400 });
  }
  if (body?.type !== "blob.generate-client-token") {
    return NextResponse.json({ error: "Not accepted here." }, { status: 400 });
  }

  const namespace = storageNamespace();

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const parsed = parseUploadRequest(namespace, pathname);
        if (!parsed) throw new Error("refused pathname");
        return {
          allowedContentTypes: parsed.contentTypes,
          maximumSizeInBytes: DIRECT_LIMITS.maxFileBytes,
          addRandomSuffix: true,
          allowOverwrite: false,
          validUntil: Date.now() + 30 * 60 * 1000,
          cacheControlMaxAge: 60,
        };
      },
    });
    return NextResponse.json(result);
  } catch {
    // Deliberately unspecific: the reasons are all "this is not a file the
    // form would ask to upload", and naming the rule only helps someone probe it.
    return NextResponse.json({ error: "This file cannot be uploaded through the form." }, { status: 400 });
  }
}
