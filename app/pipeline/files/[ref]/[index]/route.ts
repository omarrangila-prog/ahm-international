import { get } from "@vercel/blob";
import { currentStaff } from "@/lib/pipeline/session";
import { getLead } from "@/lib/pipeline/store";

/**
 * GET /pipeline/files/<ref>/<n>
 *
 * Streams one file of one enquiry to a signed-in member of staff. The store is
 * private, so its own URLs answer 403 to everyone; this route is the only way
 * a file leaves it, and it checks the session on every request.
 *
 * Always a download, never rendered: the bytes came from a public form, and an
 * HTML or SVG file opened inline on this origin would run with its cookies.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ ref: string; index: string }> }) {
  const staff = await currentStaff();
  if (!staff) return new Response("Sign in to download files.", { status: 401, headers: { "cache-control": "no-store" } });

  const { ref, index } = await params;
  const lead = await getLead(ref);
  const file = lead && /^\d{1,2}$/.test(index) ? lead.files[Number(index)] : undefined;
  if (!file) return new Response("Not found.", { status: 404, headers: { "cache-control": "no-store" } });

  const stored = await get(file.pathname, { access: "private", useCache: false });
  if (!stored || stored.statusCode !== 200) {
    return new Response("This file is no longer stored. It may have been removed under the retention policy.", {
      status: 410,
      headers: { "cache-control": "no-store" },
    });
  }

  const ascii = file.name.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  return new Response(stored.stream, {
    headers: {
      "content-type": "application/octet-stream",
      "content-disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      "content-length": String(stored.blob.size),
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
