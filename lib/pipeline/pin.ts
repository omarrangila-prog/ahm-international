import { createHash, timingSafeEqual } from "node:crypto";
import { staffList } from "./staff";

/**
 * PIN sign-in for the register, alongside the emailed link.
 *
 * The PIN is `PIPELINE_PIN` in the deployment environment, never the source:
 * the repository is public. It signs in as the first admin on the staff list,
 * which is the company mailbox when `PIPELINE_STAFF` is unset.
 *
 * Four digits is ten thousand guesses, so the limit is what protects it, and
 * the limit has to hold across every instance and every visitor: an in-memory
 * counter per IP would let a botnet try them all in an afternoon. Wrong
 * attempts are counted per UTC day in the private store (`attemptPin` in
 * store.ts), and after PIN_DAILY_LIMIT the PIN stops working for everyone
 * until midnight UTC. The emailed link is unaffected, so a stranger exhausting
 * the day's attempts locks out the PIN, not the owner.
 *
 * The limit makes a random PIN slow to guess. It does nothing for one that is
 * guessed first: 1234, 0000 and repeated digits are on every list, and inside
 * ten tries.
 */

type Env = Record<string, string | undefined>;

export const PIN_FORMAT = /^\d{4,12}$/;
export const PIN_DAILY_LIMIT = 10;

export function pinFrom(env: Env = process.env): string | null {
  const value = env.PIPELINE_PIN?.trim();
  return value && PIN_FORMAT.test(value) ? value : null;
}

/** The account a PIN signs in as: the first admin on the staff list. */
export function pinAccount(env: Env = process.env): string | null {
  for (const [email, role] of staffList(env)) if (role === "admin") return email;
  return null;
}

/** Compared as digests, so neither the length nor the first wrong digit shows in the timing. */
export function pinMatches(given: string, expected: string): boolean {
  if (!given) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export type PinDay = { attempts: number };

/** The UTC day an attempt is counted against. */
export function pinDay(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}
