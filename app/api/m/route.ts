import { after } from "next/server";
import { storageEnabled } from "@/lib/storage/namespace";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { isBot, parseBatch } from "@/lib/traffic/model";
import { recordBatch } from "@/lib/traffic/store";

/**
 * POST /api/m: one visit's worth of counts, posted when the visitor leaves.
 *
 * Always answers 204 with no body, whether the batch was counted or not, so the
 * endpoint tells a caller nothing about what it accepted. Nothing identifying
 * is read for the count: the user agent is used once, to skip crawlers, and the
 * IP address only as a rate-limit key in memory. Neither is stored.
 *
 * The counts are not fraud-proof. Anyone can post to this URL; the limits keep
 * a script from doing much, and the dashboard says these are indicative.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const done = () => new Response(null, { status: 204 });

export async function POST(request: Request) {
  if (!storageEnabled()) return done();
  if (isBot(request.headers.get("user-agent"))) return done();

  // A browser sends Origin on a cross-origin post; refuse another site's page
  // counting into ours. Absent means same-origin or a non-browser: the bot
  // check and the rate limit cover those.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      const own = request.headers.get("host")?.split(":")[0];
      if (host !== own && !/(^|\.)ahminternationals\.com$/.test(host)) return done();
    } catch {
      return done();
    }
  }

  if (!rateLimit(`m:${clientKey(request.headers)}`, 30, 60_000).allowed) return done();

  const batch = parseBatch(await request.text());
  if (batch) {
    after(async () => {
      try {
        await recordBatch(batch);
      } catch {
        // Counting is best effort. A lost batch is a small undercount, never an error for the visitor.
      }
    });
  }
  return done();
}
