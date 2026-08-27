import { timingSafeEqual } from "node:crypto";

/**
 * PRIVATE SHOWROOMS
 * =================
 *
 * Master spec §27, under the constraints of §49 (token guessing) and §50
 * (never expose buyer identity).
 *
 * Two rules shape this module:
 *
 * 1. **No real buyer ever enters the repository.** A showroom names a prospect,
 *    which is exactly the information §50 forbids publishing. So real showrooms
 *    are configured through `SHOWROOM_CONFIG` — a JSON array in the environment —
 *    and the committed registry contains only a demonstration entry, labelled as
 *    one on the page itself.
 *
 * 2. **Lookup is timing-safe and does not distinguish failure modes.** A wrong
 *    token and an unknown token both produce the same 404, so the route cannot be
 *    used to enumerate which prospects exist.
 *
 * Tokens should be at least 32 random characters. Generate with:
 *   node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
 */

export type ShowroomEntry = {
  token: string;
  /** Shown as the showroom's title. For real entries this is a company name. */
  buyerLabel: string;
  /** Category slugs to show, in order. Everything else is hidden. */
  categories: string[];
  /** Optional note from the AHM team, shown at the top. */
  intro?: string;
  /** Marks the entry as a demonstration so the UI can say so. */
  demo?: boolean;
  /** ISO date. Past this, the showroom 404s. */
  expiresAt?: string;
};

/**
 * The only committed entry. It names no real prospect, and the page renders a
 * visible demonstration notice for it.
 */
const DEMO: ShowroomEntry = {
  token: "demo-showroom-not-a-real-buyer",
  buyerLabel: "Demonstration Showroom",
  categories: ["polos-tshirts", "aprons", "uniform-workwear", "woven-shirts", "bottoms", "outerwear"],
  intro:
    "This is a demonstration of the private showroom format, not a real buyer's showroom. A live showroom is created per prospect, shows only the categories relevant to their program, and is reachable only through its own token.",
  demo: true,
};

function fromEnvironment(): ShowroomEntry[] {
  const raw = process.env.SHOWROOM_CONFIG?.trim();
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is ShowroomEntry =>
        typeof e === "object" && e !== null &&
        typeof (e as ShowroomEntry).token === "string" &&
        (e as ShowroomEntry).token.length >= 16 &&
        Array.isArray((e as ShowroomEntry).categories),
    );
  } catch {
    // Malformed configuration must not take the site down, and must not be
    // reported to the client.
    console.error("[showroom] SHOWROOM_CONFIG is not valid JSON; ignoring it");
    return [];
  }
}

/** Constant-time compare so lookup cannot be timed to recover a token. */
function tokenMatches(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function getShowroom(token: string): ShowroomEntry | null {
  if (!token) return null;
  const all = [DEMO, ...fromEnvironment()];

  // Every candidate is compared, so the time taken does not reveal how early a
  // match was found.
  let found: ShowroomEntry | null = null;
  for (const entry of all) {
    if (tokenMatches(entry.token, token)) found = entry;
  }

  if (found?.expiresAt && Date.parse(found.expiresAt) < Date.now()) return null;
  return found;
}
