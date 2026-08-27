/**
 * Upload policy.
 *
 * Deliberately free of any validation-library dependency. These constants and
 * helpers are needed by the upload widget, which appears on pages that should
 * not have to ship a schema validator in order to describe a file-size limit.
 *
 * The server re-applies every rule here before accepting anything.
 */

export const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB per file
export const MAX_TOTAL_BYTES = 40 * 1024 * 1024; // 40 MB per submission
export const MAX_FILES = 6;

/** Accepted upload types, keyed by extension. */
export const ACCEPTED_UPLOADS: Record<string, string[]> = {
  pdf: ["application/pdf"],
  xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  xls: ["application/vnd.ms-excel"],
  docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  doc: ["application/msword"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
  webp: ["image/webp"],
  zip: ["application/zip", "application/x-zip-compressed", "multipart/x-zip"],
};

export const ACCEPT_ATTRIBUTE = ".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png,.webp,.zip";

/**
 * Strips directory components and control characters from an uploaded filename.
 *
 * The value arrives from the client and is echoed into confirmation output and
 * logs, so it is treated as untrusted. This neutralises traversal sequences and
 * characters that would let a filename misrepresent itself.
 */
export function sanitiseFilename(raw: string): string {
  const base = raw.split(/[\\/]/).pop() ?? "file";
  const cleaned = base
    .replace(/[\x00-\x1f\x7f]/g, "")
    .replace(/[^A-Za-z0-9._ -]/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 120)
    .trim();
  return cleaned || "file";
}

export function extensionOf(filename: string): string {
  const parts = sanitiseFilename(filename).split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

/** Extension and declared MIME type must agree — either alone is trivially spoofed. */
export function isAcceptedUpload(filename: string, mimeType: string): boolean {
  const ext = extensionOf(filename);
  const allowed = ACCEPTED_UPLOADS[ext];
  if (!allowed) return false;
  // Some browsers send an empty type for less common formats such as .zip.
  return mimeType === "" || allowed.includes(mimeType);
}

/* ------------------------------------------------------------------ */
/* Content verification                                                */
/* ------------------------------------------------------------------ */

/**
 * File signatures ("magic bytes") for the formats this site accepts.
 *
 * Both the extension and the `Content-Type` on a multipart upload are supplied
 * by the client and can be set to anything. Checking them is necessary but not
 * sufficient: renaming `payload.exe` to `techpack.pdf` and declaring
 * `application/pdf` passes both. The first bytes of the file are the only part
 * the client cannot trivially lie about while keeping the file usable.
 */
const SIGNATURES: Record<string, number[][]> = {
  // %PDF
  pdf: [[0x25, 0x50, 0x44, 0x46]],
  // OOXML and ZIP share a container: PK\x03\x04, plus the empty and spanned variants.
  xlsx: [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06], [0x50, 0x4b, 0x07, 0x08]],
  docx: [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06], [0x50, 0x4b, 0x07, 0x08]],
  zip: [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06], [0x50, 0x4b, 0x07, 0x08]],
  // Legacy Office compound binary format.
  xls: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  doc: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  jpg: [[0xff, 0xd8, 0xff]],
  jpeg: [[0xff, 0xd8, 0xff]],
  png: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  // RIFF....WEBP — bytes 8-11 are checked separately.
  webp: [[0x52, 0x49, 0x46, 0x46]],
};

/** Longest signature above, so callers know how many bytes to read. */
export const SIGNATURE_BYTES = 12;

function startsWith(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false;
  return sig.every((b, i) => bytes[i] === b);
}

/**
 * Confirms the file's leading bytes match the format its name claims.
 *
 * Returns true when the extension has no registered signature, so adding a new
 * accepted type to `ACCEPTED_UPLOADS` never silently starts rejecting it — the
 * extension and MIME checks still apply in that case.
 */
export function signatureMatches(filename: string, head: Uint8Array): boolean {
  const ext = extensionOf(filename);
  const signatures = SIGNATURES[ext];
  if (!signatures) return true;

  const matched = signatures.some((sig) => startsWith(head, sig));
  if (!matched) return false;

  // WEBP is a RIFF container; the format tag at offset 8 is what distinguishes it.
  if (ext === "webp") {
    const tag = String.fromCharCode(...Array.from(head.slice(8, 12)));
    return tag === "WEBP";
  }
  return true;
}
