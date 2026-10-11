import { ACCEPTED_UPLOADS, extensionOf, sanitiseFilename } from "../upload-policy";

/**
 * Where uploaded files live in the private store, and the rules a pathname
 * must satisfy before the server will sign for it or accept it.
 *
 *   <ns>rfq-incoming/<uploadId>/<name>   written by the browser, unclaimed
 *   <ns>rfq/<reference>/<n>-<name>       claimed by a submitted enquiry
 *
 * The split is what makes abandoned uploads deletable. A file under
 * rfq-incoming belongs to no enquiry, so the daily job removes anything there
 * older than a day; a file under rfq/ is part of a record and is kept for the
 * retention period.
 *
 * Pure and dependency-free: the browser builds pathnames with it, and the
 * upload-token route and the submission route check them with it.
 */

export const INCOMING_DIR = "rfq-incoming";
export const CLAIMED_DIR = "rfq";

/** A browser-generated v4 UUID: random, so one buyer cannot address another's upload. */
const UPLOAD_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function isUploadId(value: unknown): value is string {
  return typeof value === "string" && UPLOAD_ID.test(value);
}

/** The pathname the browser asks to upload a file to. */
export function incomingPathname(namespace: string, uploadId: string, filename: string): string {
  return `${namespace}${INCOMING_DIR}/${uploadId}/${sanitiseFilename(filename)}`;
}

/**
 * Checks a pathname the browser wants a token for. The filename must already
 * be in its sanitised form and of an accepted type, so nothing the server signs
 * for can carry traversal sequences or an executable extension.
 */
export function parseUploadRequest(
  namespace: string,
  pathname: string,
): { uploadId: string; filename: string; extension: string; contentTypes: string[] } | null {
  const prefix = `${namespace}${INCOMING_DIR}/`;
  if (!pathname.startsWith(prefix)) return null;

  const rest = pathname.slice(prefix.length).split("/");
  if (rest.length !== 2) return null;
  const [uploadId, filename] = rest;
  if (!isUploadId(uploadId)) return null;
  if (!filename || filename !== sanitiseFilename(filename)) return null;

  const extension = extensionOf(filename);
  const contentTypes = ACCEPTED_UPLOADS[extension];
  if (!contentTypes) return null;

  return { uploadId, filename, extension, contentTypes };
}

/**
 * Checks a pathname the browser reports having uploaded to. The store appends
 * a random suffix, so the stored name is not the requested one; what must hold
 * is the directory (this upload, nothing else) and the extension (the one the
 * buyer's file had).
 */
export function isClaimablePathname(namespace: string, uploadId: string, pathname: string, displayName: string): boolean {
  const prefix = `${namespace}${INCOMING_DIR}/${uploadId}/`;
  if (!pathname.startsWith(prefix)) return false;
  const stored = pathname.slice(prefix.length);
  if (!stored || stored.includes("/") || stored.includes("..")) return false;
  const extension = extensionOf(displayName);
  return Boolean(ACCEPTED_UPLOADS[extension]) && extensionOf(stored) === extension;
}

/** Where a claimed file is kept. Numbered so two files with one name cannot collide. */
export function claimedPathname(namespace: string, reference: string, index: number, displayName: string): string {
  return `${namespace}${CLAIMED_DIR}/${reference}/${index + 1}-${sanitiseFilename(displayName)}`;
}
