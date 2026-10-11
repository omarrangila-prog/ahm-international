import { ACCEPTED_UPLOADS, extensionOf, sanitiseFilename } from "../upload-policy";
import { incomingPathname } from "./paths";

/**
 * Browser side of a direct upload: one file, straight to the private store,
 * with progress.
 *
 * The Blob client is imported on first use, so the quote page does not carry
 * it for buyers who attach nothing. Files over 8 MB go multipart, which the
 * store retries part by part, so a dropped connection costs a part rather than
 * the whole file.
 */

export type DirectUploadResult =
  | { ok: true; name: string; pathname: string }
  | { ok: false; name: string; reason: string };

function reasonFor(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (/too large|file_too_large|maximumSizeInBytes/i.test(message)) return "larger than the form accepts";
  if (/content.?type/i.test(message)) return "not an accepted file type";
  if (/rate|too many/i.test(message)) return "too many uploads in a short time; wait a few minutes";
  if (/network|failed to fetch|load failed|aborted/i.test(message)) return "the connection dropped during the upload";
  return "the upload did not complete";
}

/**
 * How long an upload may go without sending a byte before it is given up.
 *
 * The Blob client retries a failed request ten times with exponential
 * backoff, which on a dead connection is about seventeen minutes of a progress
 * bar at 0%. Measured from the last progress event rather than from the start,
 * so a large file on a slow connection is never cut off while it is moving.
 */
const STALL_MS = 45_000;

export async function uploadDirect(
  file: File,
  options: { namespace: string; uploadId: string; onProgress: (percentage: number) => void },
): Promise<DirectUploadResult> {
  const name = sanitiseFilename(file.name);
  const controller = new AbortController();
  let lastProgress = Date.now();
  const watchdog = setInterval(() => {
    if (Date.now() - lastProgress > STALL_MS) controller.abort();
  }, 2_000);

  try {
    const { upload } = await import("@vercel/blob/client");
    const result = await upload(incomingPathname(options.namespace, options.uploadId, name), file, {
      access: "private",
      handleUploadUrl: "/api/rfq/upload",
      // Stated rather than inferred: browsers disagree about ZIP and legacy
      // Office types, and the token only allows this extension's types.
      contentType: ACCEPTED_UPLOADS[extensionOf(name)]?.[0],
      multipart: file.size > 8 * 1024 * 1024,
      abortSignal: controller.signal,
      onUploadProgress: ({ percentage }) => {
        lastProgress = Date.now();
        options.onProgress(percentage);
      },
    });
    return { ok: true, name, pathname: result.pathname };
  } catch (error) {
    return { ok: false, name, reason: controller.signal.aborted ? "the upload stalled; the connection may have dropped" : reasonFor(error) };
  } finally {
    clearInterval(watchdog);
  }
}
