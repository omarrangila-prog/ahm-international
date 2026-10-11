import { BlobPreconditionFailedError, del, get, put } from "@vercel/blob";

/**
 * Small JSON documents in the private Blob store, with optimistic concurrency.
 *
 * The enquiry register is a few hundred records a year read by a handful of
 * staff. That is a document store's job, not a database's, and the store
 * already exists for the tech packs, so the register lives beside them instead
 * of adding a second service with its own account, terms and token.
 *
 * What makes that safe is the ETag. Every write states the version it read
 * (`ifMatch`), and a write against a version someone else has since replaced
 * is refused rather than silently overwriting it; `update` re-reads and
 * re-applies the change. Reads bypass the CDN cache (`useCache: false`), so a
 * record read straight after a write is the written one. Both behaviours were
 * checked against the live store before this was built on them.
 */

const ACCESS = "private" as const;

export type Versioned<T> = { data: T; etag: string };

export async function readJson<T>(pathname: string): Promise<Versioned<T> | null> {
  const result = await get(pathname, { access: ACCESS, useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const text = await new Response(result.stream).text();
  return { data: JSON.parse(text) as T, etag: strongEtag(result.blob.etag) };
}

/**
 * A read of a document large enough to be compressed in transit comes back
 * with a weak ETag, `W/"<hash>"`, and a conditional write given that form is
 * always refused. The hash inside is the stored object's strong ETag; checked
 * against head() on the live store, where a 3 kB lead record read back weak
 * and a 7-byte probe did not.
 */
export function strongEtag(etag: string): string {
  return etag.replace(/^W\//, "");
}

function body(data: unknown) {
  return JSON.stringify(data);
}

/** Writes only if nothing exists at the pathname. Returns false if something does. */
export async function createJson(pathname: string, data: unknown): Promise<boolean> {
  try {
    await put(pathname, body(data), {
      access: ACCESS,
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: false,
      cacheControlMaxAge: 60,
    });
    return true;
  } catch (error) {
    if (isAlreadyExists(error)) return false;
    throw error;
  }
}

/** The SDK reports an existing blob as a generic error; its message is the only signal. */
function isAlreadyExists(error: unknown): boolean {
  return error instanceof Error && /already exists/i.test(error.message);
}

export class ConflictError extends Error {
  constructor(pathname: string) {
    super(`Could not save ${pathname}: it kept changing underneath this write.`);
  }
}

/**
 * Read, change, write, and retry if someone else wrote first.
 *
 * `change` receives the current document (or `initial` when there is none) and
 * returns the next one, or `null` to leave it untouched. It may run more than
 * once, so it must not have side effects.
 */
export async function updateJson<T>(
  pathname: string,
  initial: () => T,
  change: (current: T) => T | null,
  attempts = 6,
): Promise<T> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const current = await readJson<T>(pathname);
    const next = change(current ? current.data : initial());
    if (next === null) return current ? current.data : initial();

    try {
      if (current) {
        await put(pathname, body(next), {
          access: ACCESS,
          contentType: "application/json",
          addRandomSuffix: false,
          allowOverwrite: true,
          ifMatch: current.etag,
          cacheControlMaxAge: 60,
        });
      } else if (!(await createJson(pathname, next))) {
        // Created by someone else between the read and this write.
        throw new BlobPreconditionFailedError();
      }
      return next;
    } catch (error) {
      if (!(error instanceof BlobPreconditionFailedError)) throw error;
      // Back off a little, with jitter, so two writers do not collide again.
      await new Promise((resolve) => setTimeout(resolve, 40 * (attempt + 1) + Math.random() * 60));
    }
  }
  throw new ConflictError(pathname);
}

export async function deleteBlobs(pathnames: string[]): Promise<void> {
  if (pathnames.length) await del(pathnames);
}
