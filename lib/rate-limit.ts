/**
 * In-memory rate limiter.
 *
 * A fixed-window counter keyed by client IP, sized for a single instance. It is
 * deliberately simple and deliberately documented as a floor rather than a
 * ceiling: on a multi-instance deployment each instance keeps its own counter,
 * so the effective limit multiplies by the instance count.
 *
 * For production behind more than one instance, swap the Map for Redis or the
 * platform's own rate limiting — the interface below is what would need to be
 * reimplemented, and nothing else changes.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Prevents unbounded growth from one-off IPs. */
const MAX_TRACKED = 10_000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED) {
      // Drop expired entries before admitting a new key.
      for (const [k, v] of buckets) {
        if (v.resetAt <= now) buckets.delete(k);
      }
      if (buckets.size >= MAX_TRACKED) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { allowed: false, remaining: 0, retryAfter };
  }

  return { allowed: true, remaining: limit - existing.count, retryAfter };
}

/**
 * Best-effort client IP.
 *
 * `x-forwarded-for` is only trustworthy behind a proxy that overwrites it. On a
 * platform that does (Vercel, Cloudflare, a correctly configured nginx) this is
 * the client. Directly exposed, it is client-controlled — which is why rate
 * limiting here is one layer, not the only one.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip") ?? "unknown";
}
