import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Mail, MessageCircle } from "lucide-react";
import { removeLead, saveLead } from "../../actions";
import { PipelineHeader, Notice } from "@/components/pipeline/PipelineHeader";
import { requireStaff } from "@/lib/pipeline/session";
import { getLead } from "@/lib/pipeline/store";
import { can, staffList } from "@/lib/pipeline/staff";
import { LOST_REASONS, outcomeOf, STAGES, stageLabel, today } from "@/lib/pipeline/model";
import { cn } from "@/lib/utils";

type Params = Promise<{ ref: string }>;
type Search = Record<string, string | string[] | undefined>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  // The reference only: a buyer's company name does not belong in a tab title
  // or in browser history.
  return { title: (await params).ref };
}

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Karachi",
  });

const size = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} kB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

const field = "h-11 w-full border border-ink/25 bg-paper px-3 text-sm text-ink";
const fieldLabel = "flex flex-col gap-1.5 text-xs font-medium text-ink/75";

export default async function LeadPage({ params, searchParams }: { params: Params; searchParams: Promise<Search> }) {
  const staff = await requireStaff();
  const { ref } = await params;
  const search = await searchParams;
  const lead = await getLead(ref);
  if (!lead) notFound();

  const editable = can(staff.role, "edit");
  const owners = [...staffList().keys()];
  const outcome = outcomeOf(lead);
  const phoneDigits = lead.contact.phone?.replace(/[^\d]/g, "") ?? "";
  const subject = encodeURIComponent(`RE: RFQ ${lead.ref}${lead.interest.category ? `, ${lead.interest.category}` : ""}`);
  const save = saveLead.bind(null, lead.ref);
  const remove = removeLead.bind(null, lead.ref);

  const contactRows = [
    ["Contact", lead.contact.name],
    ["Job title", lead.contact.jobTitle],
    ["Email", lead.contact.email],
    ["Phone", lead.contact.phone],
    ["Country", lead.contact.country],
    ["Website", lead.contact.website],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const campaign = Object.entries(lead.attribution.campaign).map(([k, v]) => `${k}: ${v}`);
  const sourceRows = [
    ["Form", lead.sourceForm],
    ["Campaign", campaign.length ? campaign.join(", ") : null],
    ["Referring site", lead.attribution.referrer],
    ["Landing page", lead.attribution.landing],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <>
      <PipelineHeader staff={staff} />
      <div className="shell-wide py-8">
        <Link href="/pipeline" className="inline-flex items-center gap-1.5 py-1 text-sm text-ink/75 hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Board
        </Link>

        <div className="mt-3 flex flex-col gap-3">
          {search.saved && <Notice>Saved.</Notice>}
          {search.confirm && <Notice>To delete, type the reference exactly as shown.</Notice>}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="font-mono text-sm text-ink/70">{lead.ref}</p>
            <h1 className="mt-1 font-display text-h2 text-ink [overflow-wrap:anywhere]">{lead.contact.company || lead.contact.name}</h1>
            <p className="mt-2 text-sm text-ink/75">
              Received {when(lead.createdAt)} PKT via the {lead.variant === "mini" ? "short" : "full"} form
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="border border-ink px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-ink">{stageLabel(lead.stage)}</span>
            <span
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em]",
                outcome === "won" ? "bg-lime text-ink" : outcome === "lost" ? "bg-ink text-paper" : "bg-paper-deep text-ink",
              )}
            >
              {outcome === "won" ? "Won" : outcome === "lost" ? `Lost${lead.lostReason ? `: ${lead.lostReason}` : ""}` : "Open"}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* ----------------------------- The enquiry ----------------------------- */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            <section aria-labelledby="contact">
              <h2 id="contact" className="font-display text-h3 text-ink">Buyer</h2>
              <dl className="mt-4 border-t border-line">
                {contactRows.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-2.5 text-sm">
                    <dt className="text-ink/70">{label}</dt>
                    <dd className="text-ink [overflow-wrap:anywhere]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`mailto:${lead.contact.email}?subject=${subject}`}
                  className="inline-flex h-11 items-center gap-2 bg-ink px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-paper hover:bg-lime hover:text-ink"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Reply by email
                </a>
                {phoneDigits.length >= 8 && (
                  <a
                    href={`https://wa.me/${phoneDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 border border-ink/25 px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
              </div>
            </section>

            <section aria-labelledby="enquiry">
              <h2 id="enquiry" className="font-display text-h3 text-ink">Enquiry</h2>
              <dl className="mt-4 border-t border-line">
                {[["Product", lead.interest.category], ["Quantity", lead.interest.quantity], ...lead.details.map((d) => [d.label, d.value])].map(
                  ([label, value]) => (
                    <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-2.5 text-sm">
                      <dt className="text-ink/70">{label}</dt>
                      <dd className="whitespace-pre-line text-ink [overflow-wrap:anywhere]">{value}</dd>
                    </div>
                  ),
                )}
              </dl>
            </section>

            <section aria-labelledby="files">
              <h2 id="files" className="font-display text-h3 text-ink">Files</h2>
              {lead.files.length === 0 ? (
                <p className="mt-3 text-sm text-ink/75">
                  No files were stored with this enquiry.
                  {lead.variant === "full" && " Files sent inside the form, when storage was off, are attached to the notification email instead."}
                </p>
              ) : (
                <ul className="mt-4 flex flex-col gap-2">
                  {lead.files.map((file, index) => (
                    <li key={file.pathname}>
                      <a
                        href={`/pipeline/files/${lead.ref}/${index}`}
                        className="flex items-center justify-between gap-4 border border-line px-4 py-3 text-sm hover:border-ink"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="truncate font-medium text-ink">{file.name}</span>
                        </span>
                        <span className="shrink-0 text-xs text-ink/70">{size(file.size)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {lead.refusedFiles.length > 0 && (
                <div className="mt-4 border-l-2 border-ink pl-3 text-sm text-ink/75">
                  <p className="font-medium text-ink">Not accepted, and the buyer was asked to email them:</p>
                  <ul className="mt-1">
                    {lead.refusedFiles.map((f) => (
                      <li key={f.name}>
                        {f.name} ({f.reason})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {sourceRows.length > 0 && (
              <section aria-labelledby="source">
                <h2 id="source" className="font-display text-h3 text-ink">Where it came from</h2>
                <dl className="mt-4 border-t border-line">
                  {sourceRows.map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-2.5 text-sm">
                      <dt className="text-ink/70">{label}</dt>
                      <dd className="text-ink [overflow-wrap:anywhere]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          {/* ------------------------------ Working it ------------------------------ */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            {editable ? (
              <section aria-labelledby="update" className="border border-line p-5">
                <h2 id="update" className="font-display text-h3 text-ink">Update</h2>
                <form action={save} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className={cn(fieldLabel, "sm:col-span-2")}>
                    Stage
                    <select name="stage" defaultValue={lead.stage} className={field}>
                      {STAGES.map((s, i) => (
                        <option key={s.id} value={s.id}>
                          {i + 1}. {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={fieldLabel}>
                    Status
                    <select name="status" defaultValue={lead.status} className={field}>
                      <option value="open">Open</option>
                      <option value="lost">Lost</option>
                    </select>
                  </label>
                  <label className={fieldLabel}>
                    If lost, why
                    <select name="lostReason" defaultValue={lead.lostReason ?? ""} className={field}>
                      <option value="">—</option>
                      {LOST_REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={cn(fieldLabel, "sm:col-span-2")}>
                    Commercial owner
                    <select name="owner" defaultValue={lead.owner ?? ""} className={field}>
                      <option value="">Unassigned</option>
                      {owners.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={fieldLabel}>
                    Follow-up date
                    <input type="date" name="followUpAt" defaultValue={lead.followUpAt ?? ""} className={field} />
                  </label>
                  <label className={fieldLabel}>
                    Last communication
                    <input type="date" name="lastContactAt" defaultValue={lead.lastContactAt ?? ""} max={today()} className={field} />
                  </label>
                  <label className={cn(fieldLabel, "sm:col-span-2")}>
                    Quotation reference
                    <input name="quoteRef" defaultValue={lead.quoteRef ?? ""} maxLength={60} className={field} />
                  </label>
                  <button
                    type="submit"
                    className="h-11 bg-ink font-display text-xs font-bold uppercase tracking-[0.08em] text-paper hover:bg-lime hover:text-ink sm:col-span-2"
                  >
                    Save changes
                  </button>
                </form>
              </section>
            ) : (
              <p className="border border-line p-5 text-sm text-ink/75">Your role can view enquiries but not change them.</p>
            )}

            <section aria-labelledby="activity">
              <h2 id="activity" className="font-display text-h3 text-ink">Activity</h2>
              {editable && (
                <form action={save} className="mt-4 flex flex-col gap-3">
                  <label className={fieldLabel}>
                    Add a note
                    <textarea
                      name="note"
                      rows={3}
                      maxLength={2000}
                      required
                      placeholder="Call notes, what the buyer asked, what was sent"
                      className="border border-ink/25 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/65"
                    />
                  </label>
                  <button type="submit" className="h-10 self-start border border-ink/25 px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:border-ink">
                    Add note
                  </button>
                </form>
              )}
              <ol className="mt-5 flex flex-col border-l border-line">
                {[...lead.activity].reverse().map((a, i) => (
                  <li key={`${a.at}-${i}`} className="relative pb-4 pl-5 text-sm">
                    <span className="absolute -left-[4.5px] top-1.5 h-2 w-2 bg-ink" aria-hidden="true" />
                    <p className="text-xs text-ink/70">
                      {when(a.at)} · {a.by === "website" ? "Website" : a.by.split("@")[0]}
                    </p>
                    <p className={cn("mt-0.5 whitespace-pre-line text-ink [overflow-wrap:anywhere]", a.kind !== "note" && "text-ink/80")}>{a.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            {can(staff.role, "delete") && (
              <section aria-labelledby="delete" className="border border-ink/25 p-5">
                <h2 id="delete" className="font-display text-base font-bold text-ink">Delete this enquiry</h2>
                <p className="mt-2 text-sm text-ink/75">
                  Removes the record and its files permanently, for example at the buyer&rsquo;s request or for a spam submission.
                  Type <span className="font-mono">{lead.ref}</span> to confirm.
                </p>
                <form action={remove} className="mt-3 flex flex-wrap gap-3">
                  <label className="sr-only" htmlFor="confirm-delete">
                    Reference to confirm
                  </label>
                  <input id="confirm-delete" name="confirm" autoComplete="off" className="h-10 w-48 border border-ink/25 bg-paper px-3 font-mono text-sm" />
                  <button type="submit" className="h-10 border border-ink px-4 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper">
                    Delete
                  </button>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
