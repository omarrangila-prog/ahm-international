import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Signed tokens for the register's sign-in links and sessions.
 *
 * A token is `base64url(json).base64url(hmac)`. The key is derived per purpose
 * from a secret the deployment already holds: `PIPELINE_SECRET` if set,
 * otherwise the private store's own token. Anyone holding the store token can
 * already read every record in it, so a key derived from it grants nothing new,
 * and it saves the owner one more secret to create and paste. Rotating the
 * store token signs everyone out, which is the right consequence.
 *
 * Separate purposes get separate keys, so a sign-in link can never be replayed
 * as a session cookie or the other way round.
 */

type Env = Record<string, string | undefined>;
export type Purpose = "login" | "session";

export function secretSource(env: Env = process.env): string | null {
  return env.PIPELINE_SECRET?.trim() || env.BLOB_READ_WRITE_TOKEN?.trim() || null;
}

function keyFor(secret: string, purpose: Purpose): Buffer {
  return createHmac("sha256", secret).update(`ahm-pipeline:${purpose}:v1`).digest();
}

const encode = (buffer: Buffer) => buffer.toString("base64url");

export function signToken(payload: Record<string, unknown>, secret: string, purpose: Purpose): string {
  const body = encode(Buffer.from(JSON.stringify(payload)));
  const mac = encode(createHmac("sha256", keyFor(secret, purpose)).update(body).digest());
  return `${body}.${mac}`;
}

/**
 * Returns the payload only if the signature is valid and `x` (expiry, epoch
 * milliseconds) is in the future. Anything malformed is simply invalid.
 */
export function verifyToken<T extends { x: number }>(
  token: string | undefined | null,
  secret: string,
  purpose: Purpose,
  now: number = Date.now(),
): T | null {
  if (!token || token.length > 2048) return null;
  const [body, mac, extra] = token.split(".");
  if (!body || !mac || extra !== undefined) return null;

  const expected = createHmac("sha256", keyFor(secret, purpose)).update(body).digest();
  let given: Buffer;
  try {
    given = Buffer.from(mac, "base64url");
  } catch {
    return null;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;
    if (typeof payload?.x !== "number" || payload.x <= now) return null;
    return payload;
  } catch {
    return null;
  }
}

export function nonce(): string {
  return randomBytes(18).toString("base64url");
}

export const LOGIN_TTL_MS = 15 * 60 * 1000;
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type LoginPayload = { e: string; n: string; x: number };
export type SessionPayload = { e: string; i: number; x: number };
