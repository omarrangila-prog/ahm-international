/**
 * GET /indexnow-key.txt: the IndexNow key file.
 *
 * IndexNow accepts a submission only if the key it carries is served by the
 * site at the `keyLocation` it names. The submission route
 * (app/api/indexnow/route.ts) names this path. It sat unused until 10 November
 * 2026: the route named `/<key>.txt`, which nothing served, so every
 * submission would have failed verification. A file at the root covers every
 * URL on the host.
 *
 * The key is not a secret (IndexNow publishes it by design); the secret that
 * authorises a submission is INDEXNOW_SECRET, which is never served.
 */

export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key)) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
