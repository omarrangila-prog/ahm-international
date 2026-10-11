import { currentStaff } from "@/lib/pipeline/session";
import { can } from "@/lib/pipeline/staff";
import { listLeads } from "@/lib/pipeline/store";
import { outcomeOf, stageLabel, toCsv } from "@/lib/pipeline/model";

/**
 * GET /pipeline/export: the register as CSV, for admins.
 *
 * The way out if AHM later moves to a hosted CRM: every column the board
 * shows, one row per enquiry. Contact details stay in the lead records and the
 * mailbox; the export carries company and country, not people.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const staff = await currentStaff();
  if (!staff) return new Response("Sign in first.", { status: 401, headers: { "cache-control": "no-store" } });
  if (!can(staff.role, "export")) return new Response("Your role cannot export.", { status: 403, headers: { "cache-control": "no-store" } });

  const leads = await listLeads();
  const csv = toCsv(
    leads.map((l) => ({
      reference: l.ref,
      received: l.createdAt,
      company: l.company,
      country: l.country,
      product: l.category,
      quantity: l.quantity,
      form: l.variant,
      files: l.files,
      source: l.source,
      stage: stageLabel(l.stage),
      outcome: outcomeOf(l),
      owner: l.owner,
      follow_up: l.followUpAt,
      first_contact: l.firstContactAt,
      last_contact: l.lastContactAt,
      quotation: l.quoteRef,
    })),
  );

  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(`﻿${csv}`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="ahm-enquiries-${stamp}.csv"`,
      "cache-control": "private, no-store",
    },
  });
}
