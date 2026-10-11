import { del, get, head, rename } from "@vercel/blob";
import { DIRECT_LIMITS, SIGNATURE_BYTES, extensionOf, sanitiseFilename, signatureMatches } from "../upload-policy";
import { claimedPathname, isClaimablePathname } from "./paths";

/**
 * Turning files the browser put in the store into files an enquiry owns.
 *
 * The browser uploaded straight to private storage with a token the server
 * issued for one pathname, one size ceiling and the content types of one
 * extension. None of that proves the file is what its name says, so the same
 * three checks the in-form path applies are applied here before a file is
 * attached to anything: it exists and is within the limits, it is recent, and
 * its leading bytes match its extension. A file that fails is deleted, named
 * back to the buyer with the reason, and does not fail the enquiry.
 */

export type ReportedUpload = { pathname: string; name: string };
export type StoredFile = { name: string; size: number; contentType: string; pathname: string };
export type RefusedFile = { name: string; reason: string };

/** An upload older than this was not made for the submission now claiming it. */
const MAX_UPLOAD_AGE_MS = 6 * 60 * 60 * 1000;

const mb = (bytes: number) => Math.round(bytes / 1024 / 1024);

/** The `uploads` field the form posts: a JSON list, bounded and shape-checked. */
export function parseReportedUploads(raw: unknown): ReportedUpload[] {
  if (typeof raw !== "string" || raw.length > 8_000) return [];
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const entries: ReportedUpload[] = [];
  for (const item of value.slice(0, DIRECT_LIMITS.maxFiles * 2)) {
    if (!item || typeof item !== "object") continue;
    const { pathname, name } = item as Record<string, unknown>;
    if (typeof pathname !== "string" || typeof name !== "string" || pathname.length > 400) continue;
    if (seen.has(pathname)) continue;
    seen.add(pathname);
    entries.push({ pathname, name: name.slice(0, 200) });
  }
  return entries;
}

/** The first bytes of a stored file, without downloading the rest of it. */
async function leadingBytes(pathname: string): Promise<Uint8Array> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return new Uint8Array();
  const reader = result.stream.getReader();
  const parts: Uint8Array[] = [];
  let length = 0;
  while (length < SIGNATURE_BYTES) {
    const { value, done } = await reader.read();
    if (done || !value) break;
    parts.push(value);
    length += value.length;
  }
  await reader.cancel().catch(() => {});
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    bytes.set(part, offset);
    offset += part.length;
  }
  return bytes.subarray(0, SIGNATURE_BYTES);
}

export async function claimUploads({
  namespace,
  uploadId,
  reported,
  reference,
}: {
  namespace: string;
  uploadId: string;
  reported: ReportedUpload[];
  reference: string;
}): Promise<{ files: StoredFile[]; refused: RefusedFile[] }> {
  const files: StoredFile[] = [];
  const refused: RefusedFile[] = [];
  const discard: string[] = [];
  let total = 0;

  for (const entry of reported) {
    const name = sanitiseFilename(entry.name);
    const refuse = (reason: string, deleteIt: boolean) => {
      refused.push({ name, reason });
      if (deleteIt) discard.push(entry.pathname);
    };

    // A pathname outside this upload is never touched, let alone deleted.
    if (!isClaimablePathname(namespace, uploadId, entry.pathname, name)) {
      refuse("not an upload from this form", false);
      continue;
    }
    if (files.length >= DIRECT_LIMITS.maxFiles) {
      refuse(`more than ${DIRECT_LIMITS.maxFiles} files were attached`, true);
      continue;
    }

    let meta: Awaited<ReturnType<typeof head>>;
    try {
      meta = await head(entry.pathname);
    } catch {
      refuse("the upload did not finish", false);
      continue;
    }

    if (Date.now() - meta.uploadedAt.getTime() > MAX_UPLOAD_AGE_MS) {
      refuse("the upload expired before the form was sent", true);
      continue;
    }
    if (meta.size === 0) {
      refuse("the file is empty", true);
      continue;
    }
    if (meta.size > DIRECT_LIMITS.maxFileBytes) {
      refuse(`over the ${mb(DIRECT_LIMITS.maxFileBytes)} MB per-file limit`, true);
      continue;
    }
    if (total + meta.size > DIRECT_LIMITS.maxTotalBytes) {
      refuse(`over the ${mb(DIRECT_LIMITS.maxTotalBytes)} MB total`, true);
      continue;
    }
    if (!signatureMatches(name, await leadingBytes(entry.pathname))) {
      refuse(`does not appear to be a valid ${extensionOf(name).toUpperCase()} file`, true);
      continue;
    }

    const target = claimedPathname(namespace, reference, files.length, name);
    try {
      await rename(entry.pathname, target, { access: "private", contentType: meta.contentType });
    } catch {
      // Left where it is; the daily job removes unclaimed uploads.
      refuse("could not be stored; please email it", false);
      continue;
    }
    total += meta.size;
    files.push({ name, size: meta.size, contentType: meta.contentType, pathname: target });
  }

  if (discard.length) await del(discard).catch(() => {});
  return { files, refused };
}

/**
 * Which stored files also travel as email attachments.
 *
 * The mailbox has been the record of an enquiry since mail delivery was built,
 * and staff read it on a phone, so files go with the notification while they
 * fit. Base64 grows a message by a third, and 10 MB of files is a 14 MB
 * message, comfortably inside what mail servers accept. Anything past the
 * budget is listed with a link to the enquiry register instead.
 */
export const MAIL_ATTACHMENT_BUDGET = 10 * 1024 * 1024;

export function selectAttachments(files: StoredFile[], budget = MAIL_ATTACHMENT_BUDGET): StoredFile[] {
  const chosen: StoredFile[] = [];
  let used = 0;
  for (const file of files) {
    if (used + file.size > budget) continue;
    chosen.push(file);
    used += file.size;
  }
  return chosen;
}

export async function readStoredFile(pathname: string): Promise<Buffer | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return Buffer.from(await new Response(result.stream).arrayBuffer());
}
