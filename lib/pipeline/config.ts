import { mailConfig } from "../mail-config";
import { storageEnabled } from "../storage/namespace";
import { secretSource } from "./tokens";
import { staffList } from "./staff";

type Env = Record<string, string | undefined>;

/**
 * Whether the enquiry register is usable on this deployment, and if not, why.
 *
 * Recording needs the private store. Signing in also needs mail, because the
 * sign-in link is emailed: without SMTP there is no way in, and the register
 * would hold enquiries nobody can read, so the RFQ route only counts a stored
 * enquiry as delivered when sign-in works too.
 */
export function pipelineStatus(env: Env = process.env) {
  const storage = storageEnabled(env);
  const mail = mailConfig(env) !== null;
  const staff = staffList(env).size > 0;
  const secret = secretSource(env) !== null;
  return {
    records: storage,
    signIn: storage && mail && staff && secret,
    missing: [
      ...(storage ? [] : ["the private file store (BLOB_READ_WRITE_TOKEN)"]),
      ...(mail ? [] : ["the mailbox password (SMTP_PASS), which sign-in links are sent with"]),
      ...(staff ? [] : ["at least one staff address (PIPELINE_STAFF)"]),
    ],
  };
}

/**
 * The origin sign-in links and email links point at.
 *
 * Never the request's Host header. A sign-in request with a forged Host would
 * otherwise email a staff member a genuine, signed link to someone else's
 * server. Production uses the canonical site; a preview uses its own Vercel
 * URL; local development uses localhost, which nobody else can receive.
 */
export function pipelineOrigin(env: Env = process.env, localHost?: string | null): string {
  if (env.PIPELINE_ORIGIN?.trim()) return env.PIPELINE_ORIGIN.trim().replace(/\/+$/, "");
  if (env.VERCEL_ENV === "production") {
    return (env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.ahminternationals.com").replace(/\/+$/, "");
  }
  if (env.VERCEL_ENV === "preview") {
    const host = env.VERCEL_BRANCH_URL || env.VERCEL_URL;
    if (host) return `https://${host}`;
  }
  if (localHost && /^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(localHost)) return `http://${localHost}`;
  return (env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.ahminternationals.com").replace(/\/+$/, "");
}
