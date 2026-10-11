/**
 * Which private store this deployment writes to, and under what prefix.
 *
 * One Vercel Blob store (`ahm-rfq-files`, private) holds three things: the
 * files buyers attach to an enquiry, the enquiry register behind /pipeline, and
 * a few single-use markers. It is connected to production, preview and
 * development alike, so without a prefix a test enquiry sent from a preview
 * deployment would land in the production register, and a local run could
 * overwrite it. Production writes at the root; everything else writes under its
 * own environment name.
 *
 * Pure, so the browser form can be told its upload prefix at build time and the
 * tests can check the rule without a store.
 */

type Env = Record<string, string | undefined>;

/** True when the private store's token is configured. Nothing here reads it. */
export function storageEnabled(env: Env = process.env): boolean {
  return Boolean(env.BLOB_READ_WRITE_TOKEN?.trim());
}

/**
 * "" in production, "preview/" on a preview deployment, "local/" anywhere
 * else. `BLOB_NAMESPACE` overrides it, which is how the end-to-end checks keep
 * their records apart and delete them afterwards.
 */
export function storageNamespace(env: Env = process.env): string {
  const explicit = env.BLOB_NAMESPACE?.trim().replace(/^\/+|\/+$/g, "");
  if (explicit) return `${explicit}/`;
  const target = env.VERCEL_ENV?.trim();
  if (target === "production") return "";
  return `${target || "local"}/`;
}
