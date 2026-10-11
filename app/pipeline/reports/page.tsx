import type { Metadata } from "next";
import { reindex } from "../actions";
import { PipelineHeader, Notice } from "@/components/pipeline/PipelineHeader";
import { requireStaff } from "@/lib/pipeline/session";
import { listLeads } from "@/lib/pipeline/store";
import { can } from "@/lib/pipeline/staff";
import { buildReport, type Count } from "@/lib/pipeline/model";

export const metadata: Metadata = { title: "Reports" };

type Search = Record<string, string | string[] | undefined>;

const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : "—");

function CountTable({ title, rows, caption }: { title: string; rows: Count[]; caption: string }) {
  const max = Math.max(1, ...rows.map((r) => r.total));
  return (
    <section aria-labelledby={title} className="border border-line p-5">
      <h2 id={title} className="font-display text-h3 text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-ink/75">No enquiries yet.</p>
      ) : (
        <table className="mt-4 w-full text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="text-xs text-ink/70">
            <tr>
              <th scope="col" className="pb-2 font-medium">{title.replace("By ", "")}</th>
              <th scope="col" className="w-12 pb-2 text-right font-medium">All</th>
              <th scope="col" className="w-16 pb-2 text-right font-medium">Qualified</th>
              <th scope="col" className="w-14 pb-2 text-right font-medium">Quoted</th>
              <th scope="col" className="w-12 pb-2 text-right font-medium">Won</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 12).map((r) => (
              <tr key={r.key} className="border-t border-line">
                <th scope="row" className="py-2 pr-3 font-normal text-ink">
                  <span className="block [overflow-wrap:anywhere]">{r.key}</span>
                  <span className="mt-1 block h-1 bg-ink/12" aria-hidden="true">
                    <span className="block h-full bg-ink" style={{ width: `${(r.total / max) * 100}%` }} />
                  </span>
                </th>
                <td className="py-2 text-right font-mono text-ink/75">{r.total}</td>
                <td className="py-2 text-right font-mono text-ink">{r.qualified}</td>
                <td className="py-2 text-right font-mono text-ink">{r.quoted}</td>
                <td className="py-2 text-right font-mono font-semibold text-ink">{r.won}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function Figure({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="bg-paper p-4">
      <dt className="text-xs text-ink/70">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink">{value}</dd>
      {note && <dd className="mt-1 text-xs text-ink/70">{note}</dd>}
    </div>
  );
}

export default async function ReportsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const staff = await requireStaff();
  const params = await searchParams;
  const leads = await listLeads();
  const report = buildReport(leads);
  const top = Math.max(1, report.funnel[0]?.reached ?? 0);

  return (
    <>
      <PipelineHeader staff={staff} active="reports" />
      <div className="shell-wide py-8">
        {typeof params.reindexed === "string" && <Notice>Index rebuilt from {params.reindexed} enquiry records.</Notice>}
        <h1 className="mt-2 font-display text-h2 text-ink">Reports</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/75">
          Counts of records in the register, nothing estimated. &ldquo;Qualified&rdquo; means someone moved the enquiry past
          New inquiry. Website traffic is in Google Analytics, when it is switched on; this page covers what happened after a
          buyer wrote in.
        </p>

        <section aria-labelledby="quality" className="mt-8">
          <h2 id="quality" className="sr-only">Enquiry quality and follow-up</h2>
          <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            <Figure label="Enquiries received" value={report.quality.total} />
            <Figure label="Qualified" value={report.quality.qualified} note={pct(report.quality.qualified, report.quality.total)} />
            <Figure label="Sent a file" value={report.quality.withFiles} note={pct(report.quality.withFiles, report.quality.total)} />
            <Figure label="Used the full form" value={report.quality.fullForm} note={pct(report.quality.fullForm, report.quality.total)} />
            <Figure label="Open, follow-up overdue" value={report.followUp.overdue} note={`of ${report.followUp.open} open`} />
            <Figure label="Open, no follow-up date" value={report.followUp.withoutDate} />
            <Figure label="Open, never contacted" value={report.followUp.neverContacted} />
            <Figure
              label="Median days to first contact"
              value={report.followUp.medianDaysToFirstContact === null ? "—" : report.followUp.medianDaysToFirstContact}
            />
          </dl>
        </section>

        <section aria-labelledby="conversion" className="mt-8 border border-line p-5">
          <h2 id="conversion" className="font-display text-h3 text-ink">Conversion</h2>
          <p className="mt-1 text-xs text-ink/70">
            Each rate with the two counts it is made of. Visitor-to-enquiry needs website visits, which are in Google Analytics
            once it is switched on.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {report.conversion.map((c) => (
              <Figure key={c.step} label={c.step} value={pct(c.part, c.whole)} note={`${c.part} of ${c.whole}`} />
            ))}
          </dl>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section aria-labelledby="funnel" className="border border-line p-5">
            <h2 id="funnel" className="font-display text-h3 text-ink">Stage reached</h2>
            <p className="mt-1 text-xs text-ink/70">Furthest stage each enquiry has reached, so moving one back does not rewrite history.</p>
            <ol className="mt-4 flex flex-col gap-2">
              {report.funnel.map((row, i) => (
                <li key={row.stage} className="grid grid-cols-[10.5rem_1fr_3rem] items-center gap-3 text-sm">
                  <span className="text-ink">{row.label}</span>
                  <span className="h-2 bg-ink/12" aria-hidden="true">
                    <span className="block h-full bg-ink" style={{ width: `${(row.reached / top) * 100}%` }} />
                  </span>
                  <span className="text-right font-mono text-ink">
                    {row.reached}
                    {i > 0 && <span className="sr-only"> ({pct(row.reached, report.funnel[i - 1].reached)} of the stage before)</span>}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="quotes" className="border border-line p-5">
            <h2 id="quotes" className="font-display text-h3 text-ink">Quotation outcomes</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line">
              <Figure label="Quotations issued" value={report.quotation.issued} />
              <Figure label="Won (purchase order or later)" value={report.quotation.won} note={pct(report.quotation.won, report.quotation.issued)} />
              <Figure label="Lost after quoting" value={report.quotation.lost} note={pct(report.quotation.lost, report.quotation.issued)} />
              <Figure label="Still open" value={report.quotation.open} />
            </dl>
          </section>

          <CountTable title="By country" rows={report.byCountry} caption="Enquiries by buyer country" />
          <CountTable title="By product" rows={report.byCategory} caption="Enquiries by product category" />
          <CountTable title="By source" rows={report.bySource} caption="Enquiries, quotations and orders by campaign, referring site or form" />
        </div>

        {can(staff.role, "delete") && (
          <section aria-labelledby="maintenance" className="mt-10 border-t border-line pt-6">
            <h2 id="maintenance" className="font-display text-base font-bold text-ink">Maintenance</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink/75">
              The board reads an index of the enquiry records. If an enquiry you know arrived is missing from it, rebuild the index
              from the records themselves.
            </p>
            <form action={reindex} className="mt-3">
              <button type="submit" className="h-10 border border-ink/25 px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:border-ink">
                Rebuild index
              </button>
            </form>
          </section>
        )}
      </div>
    </>
  );
}
