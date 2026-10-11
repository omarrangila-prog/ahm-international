import { NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { storageEnabled, storageNamespace } from "@/lib/storage/namespace";
import { CLAIMED_DIR, INCOMING_DIR } from "@/lib/uploads/paths";
import { fileRetentionDays, UNCLAIMED_UPLOAD_HOURS } from "@/lib/retention";
import { claimJob, listLeads, pipelinePaths } from "@/lib/pipeline/store";
import { buildDigest, today } from "@/lib/pipeline/model";
import { sendDigestMail } from "@/lib/pipeline/mail";
import { pipelineOrigin } from "@/lib/pipeline/config";
import { staffList } from "@/lib/pipeline/staff";

/**
 * GET /api/cron/daily, run by Vercel Cron once a day (vercel.json).
 *
 *   1. Deletes uploads no enquiry claimed, after a day.
 *   2. Deletes enquiry files older than the retention period.
 *   3. Clears used sign-in markers and old job markers.
 *   4. Emails staff the follow-up digest, if anything needs attention.
 *
 * When CRON_SECRET is set, Vercel sends it and this route requires it. Without
 * it the route is callable by anyone, which is tolerable because of the marker:
 * the job runs at most once per calendar day whoever calls it, and everything
 * it does is what the schedule would have done anyway.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** Every blob under a prefix older than a cutoff. Paginates; the store is small. */
async function olderThan(prefix: string, cutoff: number): Promise<string[]> {
  const found: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    for (const blob of page.blobs) if (blob.uploadedAt.getTime() < cutoff) found.push(blob.pathname);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return found;
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!storageEnabled()) return NextResponse.json({ ok: true, skipped: "no store configured" });

  const now = new Date();
  const date = today(now);
  if (!(await claimJob(`daily-${date}`))) return NextResponse.json({ ok: true, skipped: "already ran today" });

  const ns = storageNamespace();
  const paths = pipelinePaths(ns);
  const t = now.getTime();

  const [unclaimed, expired, usedLinks, oldJobs, pinDays] = await Promise.all([
    olderThan(`${ns}${INCOMING_DIR}/`, t - UNCLAIMED_UPLOAD_HOURS * HOUR),
    olderThan(`${ns}${CLAIMED_DIR}/`, t - fileRetentionDays() * DAY),
    olderThan(paths.usedDir, t - DAY),
    olderThan(paths.jobsDir, t - 30 * DAY),
    olderThan(paths.pinDir, t - 2 * DAY),
  ]);

  const toDelete = [...unclaimed, ...expired, ...usedLinks, ...oldJobs, ...pinDays];
  for (let i = 0; i < toDelete.length; i += 500) await del(toDelete.slice(i, i + 500));

  let digest = { sections: 0, sent: false };
  try {
    const sections = buildDigest(await listLeads(), now);
    const recipients = [...staffList()].filter(([, role]) => role !== "viewer").map(([email]) => email);
    const sent = sections.length ? await sendDigestMail(recipients, sections, pipelineOrigin(), date) : false;
    digest = { sections: sections.length, sent };
  } catch (error) {
    console.error("[cron] digest failed", { error: String(error) });
  }

  return NextResponse.json({
    ok: true,
    deleted: { unclaimedUploads: unclaimed.length, expiredFiles: expired.length, usedLinks: usedLinks.length, oldJobs: oldJobs.length, pinDays: pinDays.length },
    digest,
  });
}
