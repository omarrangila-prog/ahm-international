import { mailConfig } from "../mail-config";
import { storageEnabled } from "../storage/namespace";
import { pinAccount, pinFrom } from "./pin";
import { secretSource } from "./tokens";
import { staffList } from "./staff";

type Env = Record<string, string | undefined>;

/**
 * Whether the enquiry register is usable on this deployment, and if not, why.
 *
 * Recording needs the private store. Signing in needs a way in: the emailed
 * link (mail and a staff address) or the PIN (`PIPELINE_PIN` and an admin to
 * sign in as). Without either the register would hold enquiries nobody can
 * read, so the RFQ route only counts a stored enquiry as delivered when
 * sign-in works too.
 */
export function pipelineStatus(env: Env = process.env) {
  const storage = storageEnabled(env);
  const mail = mailConfig(env) !== null;
  const staff = staffList(env).size > 0;
  const secret = secretSource(env) !== null;
  const ready = storage && secret;
  const link = ready && mail && staff;
  const pin = ready && pinFrom(env) !== null && pinAccount(env) !== null;
  const pinSet = Boolean(env.PIPELINE_PIN?.trim());
  return {
    records: storage,
    signIn: link || pin,
    /** The emailed one-time link is available. */
    link,
    /** PIN sign-in is available. */
    pin,
    missing: [
      ...(storage ? [] : ["the private file store (BLOB_READ_WRITE_TOKEN)"]),
      ...(mail || pin ? [] : ["the mailbox password (SMTP_PASS), which sign-in links are sent with, or a PIN (PIPELINE_PIN)"]),
      ...(staff ? [] : ["at least one staff address (PIPELINE_STAFF)"]),
      ...(pinSet && !pinFrom(env) ? ["a PIN of 4 to 12 digits: PIPELINE_PIN is set but is not one"] : []),
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
