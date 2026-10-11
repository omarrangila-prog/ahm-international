import type { Metadata } from "next";
import Link from "next/link";
import { PipelineHeader, Notice } from "@/components/pipeline/PipelineHeader";
import { requireStaff } from "@/lib/pipeline/session";
import { listLeads } from "@/lib/pipeline/store";
import { daysBetween, isOverdue, outcomeOf, STAGES, stageLabel, type LeadSummary } from "@/lib/pipeline/model";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Board" };

type Search = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const SHOW = { open: "Open", won: "Won", lost: "Lost", all: "All" } as const;
type Show = keyof typeof SHOW;

function filterLeads(leads: LeadSummary[], { q, owner, show, me }: { q: string; owner: string; show: Show; me: string }) {
  const needle = q.trim().toLowerCase();
  return leads.filter((l) => {
    if (show !== "all" && outcomeOf(l) !== show) return false;
    if (owner === "me" && l.owner !== me) return false;
    if (owner === "none" && l.owner) return false;
    if (!needle) return true;
    return [l.ref, l.company, l.name, l.country, l.category, l.quoteRef ?? ""].some((v) => v.toLowerCase().includes(needle));
  });
}

const date = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Karachi" });

function LeadCard({ lead, now }: { lead: LeadSummary; now: Date }) {
  const overdue = isOverdue(lead, now);
  const age = daysBetween(lead.createdAt, now);
  return (
    <li>
      <Link
        href={`/pipeline/leads/${lead.ref}`}
        className="block border border-line bg-paper p-3.5 transition-colors hover:border-ink focus-visible:border-ink"
      >
        <span className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-xs text-ink/70">{lead.ref}</span>
          {overdue && <span className="bg-ink px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-paper">Follow up</span>}
        </span>
        <span className="mt-1.5 block font-display text-[0.9375rem] font-bold leading-snug tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
          {lead.company || lead.name}
        </span>
        <span className="mt-1 block text-xs text-ink/75">
          {[lead.country, lead.category].filter(Boolean).join(" · ")}
        </span>
        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink/70">
          <span>{lead.quantity}</span>
          {lead.files > 0 && <span>{lead.files} {lead.files === 1 ? "file" : "files"}</span>}
          <span>{age === 0 ? "today" : `${age}d ago`}</span>
        </span>
        <span className="mt-2 block text-xs text-ink/70">
          {lead.owner ? lead.owner.split("@")[0] : "Unassigned"}
          {lead.followUpAt && !overdue ? ` · follow up ${lead.followUpAt}` : ""}
        </span>
      </Link>
    </li>
  );
}

export default async function PipelineBoard({ searchParams }: { searchParams: Promise<Search> }) {
  const staff = await requireStaff();
  const params = await searchParams;
  const q = one(params.q).slice(0, 100);
  const owner = ["me", "none"].includes(one(params.owner)) ? one(params.owner) : "all";
  const show: Show = one(params.show) in SHOW ? (one(params.show) as Show) : "open";
  const view = one(params.view) === "list" ? "list" : "board";

  const now = new Date();
  const all = await listLeads();
  const leads = filterLeads(all, { q, owner, show, me: staff.email });

  const open = all.filter((l) => outcomeOf(l) === "open");
  const stats = [
    { label: "Open enquiries", value: open.length },
    { label: "Received in the last 7 days", value: all.filter((l) => daysBetween(l.createdAt, now) < 7).length },
    { label: "Follow-ups due", value: open.filter((l) => isOverdue(l, now)).length },
    { label: "Quotations out", value: open.filter((l) => l.stage === "quoted").length },
  ];

  const filterLink = (patch: Record<string, string>) => {
    const next = new URLSearchParams({ ...(q && { q }), owner, show, view, ...patch });
    return `/pipeline?${next.toString()}`;
  };

  return (
    <>
      <PipelineHeader staff={staff} active="board" />
      <div className="shell-wide py-8">
        <div className="flex flex-col gap-3">
          {params.denied && <Notice>Your role does not allow that action.</Notice>}
          {params.deleted && <Notice>The enquiry and its files were deleted.</Notice>}
          {params.missing && <Notice>That enquiry no longer exists.</Notice>}
        </div>

        <h1 className="font-display text-h2 text-ink">Enquiries</h1>

        <dl className="mt-6 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper p-4">
              <dt className="text-xs text-ink/70">{s.label}</dt>
              <dd className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <form method="get" action="/pipeline" className="mt-6 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-xs text-ink/70">
            Search
            <input
              name="q"
              defaultValue={q}
              placeholder="Company, country, product, reference"
              className="h-10 w-72 max-w-full border border-ink/25 bg-paper px-3 text-sm text-ink placeholder:text-ink/65"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink/70">
            Owner
            <select name="owner" defaultValue={owner} className="h-10 border border-ink/25 bg-paper px-2 text-sm text-ink">
              <option value="all">Everyone</option>
              <option value="me">Mine</option>
              <option value="none">Unassigned</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs text-ink/70">
            Show
            <select name="show" defaultValue={show} className="h-10 border border-ink/25 bg-paper px-2 text-sm text-ink">
              {Object.entries(SHOW).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <input type="hidden" name="view" value={view} />
          <button type="submit" className="h-10 bg-ink px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-paper hover:bg-lime hover:text-ink">
            Apply
          </button>
          <span className="ml-auto flex gap-4 text-sm">
            <Link href={filterLink({ view: "board" })} className={cn("inline-block py-2", view === "board" ? "font-semibold text-ink" : "text-ink/70 underline underline-offset-4")} aria-current={view === "board" ? "true" : undefined}>
              Board
            </Link>
            <Link href={filterLink({ view: "list" })} className={cn("inline-block py-2", view === "list" ? "font-semibold text-ink" : "text-ink/70 underline underline-offset-4")} aria-current={view === "list" ? "true" : undefined}>
              List
            </Link>
          </span>
        </form>

        {all.length === 0 ? (
          <div className="mt-10 border border-dashed border-ink/25 p-8 text-ink/75">
            <p className="font-medium text-ink">No enquiries yet.</p>
            <p className="mt-2 text-sm">Each request sent through the website&rsquo;s quote forms appears here as it arrives.</p>
          </div>
        ) : leads.length === 0 ? (
          <p className="mt-10 text-ink/75">Nothing matches those filters.</p>
        ) : view === "list" ? (
          <div className="mt-8 overflow-x-auto border border-line">
            <table className="w-full min-w-[56rem] text-left text-sm">
              <caption className="sr-only">Enquiries, newest first</caption>
              <thead className="bg-paper-deep text-xs text-ink/75">
                <tr>
                  {["Reference", "Received", "Company", "Country", "Product", "Quantity", "Stage", "Owner", "Follow-up"].map((h) => (
                    <th key={h} scope="col" className="px-3 py-2.5 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.ref} className="border-t border-line">
                    <td className="px-3 py-2.5">
                      <Link href={`/pipeline/leads/${l.ref}`} className="font-mono text-xs text-ink underline underline-offset-4">
                        {l.ref}
                      </Link>
                    </td>
                    <td className="px-3 py-2.5 text-ink/75">{date(l.createdAt)}</td>
                    <td className="px-3 py-2.5 font-medium text-ink">{l.company}</td>
                    <td className="px-3 py-2.5 text-ink/75">{l.country}</td>
                    <td className="px-3 py-2.5 text-ink/75">{l.category}</td>
                    <td className="px-3 py-2.5 text-ink/75">{l.quantity}</td>
                    <td className="px-3 py-2.5 text-ink/75">
                      {stageLabel(l.stage)}
                      {l.status === "lost" && " (lost)"}
                    </td>
                    <td className="px-3 py-2.5 text-ink/75">{l.owner?.split("@")[0] ?? "—"}</td>
                    <td className={cn("px-3 py-2.5", isOverdue(l, now) ? "font-semibold text-ink" : "text-ink/75")}>{l.followUpAt ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Columns side by side from lg; stacked below it, where empty stages are hidden.
          <div className="mt-8 grid grid-cols-1 gap-6 lg:auto-cols-[16.5rem] lg:grid-flow-col lg:overflow-x-auto lg:pb-4">
            {STAGES.map((stage) => {
              const inStage = leads.filter((l) => l.stage === stage.id);
              return (
                <section key={stage.id} aria-label={stage.label} className={cn(inStage.length === 0 && "hidden lg:block")}>
                  <h2 className="flex items-baseline justify-between border-b-2 border-ink pb-2 font-display text-sm font-bold uppercase tracking-[0.04em] text-ink">
                    {stage.label}
                    <span className="font-mono text-xs font-normal text-ink/70">{inStage.length}</span>
                  </h2>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {inStage.map((lead) => (
                      <LeadCard key={lead.ref} lead={lead} now={now} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
