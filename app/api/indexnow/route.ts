import { NextResponse } from "next/server";
import { indexableRoutes } from "@/data/routes";
import { company } from "@/data/company";
import { rateLimit, clientKey } from "@/lib/rate-limit";

/**
 * POST /api/indexnow
 *
 * Notifies IndexNow-participating engines (Bing, Yandex, Seznam, Naver) that
 * specific URLs have changed.
 *
 * Two deliberate constraints:
 *
 *  1. It requires `INDEXNOW_KEY` and an authorising `INDEXNOW_SECRET`. The key is
 *     read from the environment, never committed, and the endpoint is not
 *     publicly triggerable — otherwise anyone could make this site spam the
 *     protocol on our behalf.
 *
 *  2. It submits only URLs passed in the request body, validated against the
 *     route registry. Resubmitting the whole sitemap on every deploy is exactly
 *     the misuse IndexNow asks publishers to avoid, so bulk submission is opt-in
 *     via `all: true` and intended for launch, not for routine deploys.
 *
 * The key file must also be served at `/{key}.txt` containing the key — see
 * `app/[key]/route.ts` note in the SEO documentation.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(request: Request) {
  const key = process.env.INDEXNOW_KEY;
  const secret = process.env.INDEXNOW_SECRET;

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "IndexNow is not configured. Set INDEXNOW_KEY." },
      { status: 501 },
    );
  }

  // Authorise the caller. Without this the endpoint is a public spam vector.
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  }

  const limit = rateLimit(`indexnow:${clientKey(request.headers)}`, 10, 60 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }

  let body: { urls?: string[]; all?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const host = new URL(company.siteUrl).host;
  const known = new Set(indexableRoutes.map((r) => `${company.siteUrl}${r.path}`));

  const urls = body.all
    ? [...known]
    : (body.urls ?? []).filter((url) => known.has(url));

  if (urls.length === 0) {
    return NextResponse.json(
      { ok: false, error: "No valid URLs. URLs must be canonical routes of this site." },
      { status: 400 },
    );
  }

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${company.siteUrl}/${key}.txt`,
      urlList: urls,
    }),
  });

  return NextResponse.json(
    { ok: response.ok, submitted: urls.length, status: response.status },
    { status: response.ok ? 200 : 502 },
  );
}
