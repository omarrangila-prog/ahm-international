import type { Metadata } from "next";
import Link from "next/link";
import { PipelineHeader } from "@/components/pipeline/PipelineHeader";
import { requireStaff } from "@/lib/pipeline/session";
import { listLeads } from "@/lib/pipeline/store";
import { storageEnabled } from "@/lib/storage/namespace";
import { readDays } from "@/lib/traffic/store";
import { COUNTED_EVENTS, lastDays, sourceLabel, summarise, type Ranked } from "@/lib/traffic/model";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Traffic" };
export const dynamic = "force-dynamic";

const RANGES = [7, 14, 30] as const;
const GROUP: Record<string, string> = {
  direct: "Direct",
  search: "Search engine",
  ai: "AI assistant",
  social: "Social",
  email: "Email",
  campaign: "Tagged link",
  other: "Other site",
};

const pct = (part: number, whole: number) => (whole ? `${Math.round((part / whole) * 100)}%` : "—");
const longDay = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

function Figure({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="bg-paper p-4">
      <dt className="text-xs text-ink/70">{label}</dt>
      <dd className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] text-ink">{value}</dd>
      {note && <dd className="mt-1 text-xs text-ink/70">{note}</dd>}
    </div>
  );
}

function RankTable({
  title,
  rows,
  total,
  empty,
  render = (k) => k,
  extra,
}: {
  title: string;
  rows: Ranked[];
  total: number;
  empty: string;
  render?: (key: string) => string;
  extra?: (key: string) => string | null;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <section aria-labelledby={title.replace(/\s/g, "-")} className="border border-line p-5">
      <h2 id={title.replace(/\s/g, "-")} className="font-display text-h3 text-ink">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-ink/75">{empty}</p>
      ) : (
        <table className="mt-4 w-full text-left text-sm">
          <caption className="sr-only">{title}</caption>
          <thead className="text-xs text-ink/70">
            <tr>
              <th scope="col" className="pb-2 font-medium">Name</th>
              <th scope="col" className="w-14 pb-2 text-right font-medium">Count</th>
              <th scope="col" className="w-12 pb-2 text-right font-medium">Share</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-line">
                <th scope="row" className="py-2 pr-3 font-normal text-ink">
                  <span className="block [overflow-wrap:anywhere]">{render(r.key)}</span>
                  {extra?.(r.key) && <span className="block text-xs text-ink/70">{extra(r.key)}</span>}
                  <span className="mt-1 block h-1 bg-ink/12" aria-hidden="true">
                    <span className="block h-full bg-ink" style={{ width: `${(r.count / max) * 100}%` }} />
                  </span>
                </th>
                <td className="py-2 text-right font-mono text-ink">{r.count}</td>
                <td className="py-2 text-right font-mono text-ink/75">{pct(r.count, total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default async function TrafficPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const staff = await requireStaff();
  const params = await searchParams;
  const asked = Number(Array.isArray(params.range) ? params.range[0] : params.range);
  const range = (RANGES as readonly number[]).includes(asked) ? asked : 14;

  const now = new Date();
  const days = lastDays(range, now);
  const [totals, leads] = await Promise.all([
    storageEnabled() ? readDays(days) : Promise.resolve([]),
    storageEnabled() ? listLeads() : Promise.resolve([]),
  ]);

  const enquiriesOn = (day: string) => leads.filter((l) => l.createdAt.slice(0, 10) === day).length;
  const all = summarise(totals);
  const todayT = totals[0];
  const yesterdayT = totals[1];
  const week = summarise(totals.slice(0, 7));
  const firstDay = [...totals].reverse().find((d) => d.views > 0)?.day ?? null;

  const enquiriesInRange = days.reduce((n, d) => n + enquiriesOn(d), 0);
  const apronEnquiries = leads.filter((l) => days.includes(l.createdAt.slice(0, 10)) && /apron/i.test(l.category)).length;
  const maxVisitors = Math.max(1, ...totals.map((d) => d.uniques));

  return (
    <>
      <PipelineHeader staff={staff} active="traffic" />
      <div className="shell-wide py-8">
        <h1 className="font-display text-h2 text-ink">Website traffic</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink/75">
          Daily totals counted by this website itself. Visitors are counted with one cookie that holds only a date, and
          nothing identifies a person. Days are UTC,
          so a day here runs from 5 am to 5 am Karachi time.
          {firstDay ? ` Counting began on ${longDay(firstDay)}; earlier days are empty because nothing was counted.` : " Nothing has been counted yet."}
        </p>

        {!storageEnabled() && (
          <p role="status" className="mt-4 border-l-2 border-ink bg-paper-deep px-4 py-3 text-sm text-ink">
            The private store is not connected on this deployment, so there is nowhere to keep daily totals.
          </p>
        )}

        <nav aria-label="Period" className="mt-6 flex gap-2 text-sm">
          {RANGES.map((r) => (
            <Link
              key={r}
              href={`/pipeline/traffic?range=${r}`}
              aria-current={r === range ? "page" : undefined}
              className={cn(
                "inline-flex h-10 items-center border px-4 font-medium",
                r === range ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink",
              )}
            >
              {r} days
            </Link>
          ))}
        </nav>

        <section aria-labelledby="headline" className="mt-6">
          <h2 id="headline" className="sr-only">Headline figures</h2>
          <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            <Figure
              label="Visitors today"
              value={todayT?.uniques ?? 0}
              note={`${todayT?.newVisitors ?? 0} new · ${todayT?.visits ?? 0} visits · ${todayT?.views ?? 0} page views`}
            />
            <Figure
              label="Visitors yesterday"
              value={yesterdayT?.uniques ?? 0}
              note={`${yesterdayT?.newVisitors ?? 0} new · ${yesterdayT?.visits ?? 0} visits · ${yesterdayT?.views ?? 0} page views`}
            />
            <Figure label="New visitors, last 7 days" value={week.newVisitors} note={`${week.visits} visits · ${week.views} page views`} />
            {range === 7 ? (
              <Figure label="Page views per visit" value={all.visits ? (all.views / all.visits).toFixed(1) : "—"} note="last 7 days" />
            ) : (
              <Figure label={`New visitors, last ${range} days`} value={all.newVisitors} note={`${all.visits} visits · ${all.views} page views`} />
            )}
            <Figure
              label="Searches on the site"
              value={all.searches + all.searchMisses}
              note={all.searches + all.searchMisses ? `${all.searchMisses} found nothing (${pct(all.searchMisses, all.searches + all.searchMisses)})` : "Knowledge Center search"}
            />
            <Figure label="Contact clicks" value={all.contacts} note="email, phone and WhatsApp" />
            <Figure label="Quote forms sent" value={all.events.rfq_completed ?? 0} note="confirmed by the form" />
            <Figure label="Enquiries in the register" value={enquiriesInRange} note={`${pct(enquiriesInRange, all.visits)} of visits`} />
          </dl>
        </section>

        <section aria-labelledby="daily" className="mt-8 border border-line p-5">
          <h2 id="daily" className="font-display text-h3 text-ink">Day by day</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[48rem] text-left text-sm">
              <caption className="sr-only">Visitors, new visitors, visits, page views, searches, contact clicks and enquiries for each day</caption>
              <thead className="text-xs text-ink/70">
                <tr>
                  <th scope="col" className="pb-2 font-medium">Day</th>
                  <th scope="col" className="pb-2 font-medium">Visitors</th>
                  <th scope="col" className="w-14 pb-2 text-right font-medium">New</th>
                  <th scope="col" className="w-14 pb-2 text-right font-medium">Visits</th>
                  <th scope="col" className="w-20 pb-2 text-right font-medium">Page views</th>
                  <th scope="col" className="w-20 pb-2 text-right font-medium">Searches</th>
                  <th scope="col" className="w-24 pb-2 text-right font-medium">Found nothing</th>
                  <th scope="col" className="w-20 pb-2 text-right font-medium">Contacts</th>
                  <th scope="col" className="w-20 pb-2 text-right font-medium">Enquiries</th>
                </tr>
              </thead>
              <tbody>
                {totals.map((d) => {
                  const e = d.events;
                  return (
                    <tr key={d.day} className="border-t border-line">
                      <th scope="row" className="whitespace-nowrap py-2 pr-3 font-normal text-ink">{longDay(d.day)}</th>
                      <td className="py-2 pr-3">
                        <span className="flex items-center gap-3">
                          <span className="w-8 font-mono text-ink">{d.uniques}</span>
                          <span className="h-2 flex-1 bg-ink/12" aria-hidden="true">
                            <span className="block h-full bg-ink" style={{ width: `${(d.uniques / maxVisitors) * 100}%` }} />
                          </span>
                        </span>
                      </td>
                      <td className="py-2 text-right font-mono text-ink/75">{d.newVisitors}</td>
                      <td className="py-2 text-right font-mono text-ink/75">{d.visits}</td>
                      <td className="py-2 text-right font-mono text-ink/75">{d.views}</td>
                      <td className="py-2 text-right font-mono text-ink/75">{e.knowledge_search ?? 0}</td>
                      <td className="py-2 text-right font-mono text-ink/75">{e.knowledge_search_miss ?? 0}</td>
                      <td className="py-2 text-right font-mono text-ink/75">{(e.email_click ?? 0) + (e.phone_click ?? 0) + (e.whatsapp_click ?? 0)}</td>
                      <td className="py-2 text-right font-mono font-semibold text-ink">{enquiriesOn(d.day)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RankTable
            title="Where visits came from"
            rows={all.sources}
            total={all.visits}
            empty="No visits counted in this period."
            render={(k) => sourceLabel(k).label}
            extra={(k) => GROUP[sourceLabel(k).group]}
          />

          <section aria-labelledby="aprons" className="border border-line p-5">
            <h2 id="aprons" className="font-display text-h3 text-ink">Aprons</h2>
            <p className="mt-1 text-xs text-ink/70">Any page with &ldquo;apron&rdquo; in its address: the product pages and the apron guides.</p>
            <dl className="mt-4 grid grid-cols-3 gap-px border border-line bg-line">
              <Figure label="Page views" value={all.apron.views} note={pct(all.apron.views, all.views) + " of all"} />
              <Figure label="Visits that began on an apron page" value={all.apron.landings} note={pct(all.apron.landings, all.visits) + " of visits"} />
              <Figure label="Apron enquiries" value={apronEnquiries} note={`of ${enquiriesInRange}`} />
            </dl>
            {all.apron.pages.length > 0 && (
              <ul className="mt-4 text-sm">
                {all.apron.pages.map((r) => (
                  <li key={r.key} className="flex justify-between gap-4 border-t border-line py-2">
                    <span className="[overflow-wrap:anywhere] text-ink">{r.key}</span>
                    <span className="font-mono text-ink">{r.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <RankTable title="Most viewed pages" rows={all.pages} total={all.views} empty="No page views counted in this period." />
          <RankTable title="Pages visits began on" rows={all.landings} total={all.visits} empty="No visits counted in this period." />

          <section aria-labelledby="actions" className="border border-line p-5 lg:col-span-2">
            <h2 id="actions" className="font-display text-h3 text-ink">What visitors did</h2>
            <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
              {(Object.keys(COUNTED_EVENTS) as (keyof typeof COUNTED_EVENTS)[]).map((k) => (
                <Figure key={k} label={COUNTED_EVENTS[k]} value={all.events[k] ?? 0} />
              ))}
            </dl>
          </section>
        </div>

        <section aria-labelledby="limits" className="mt-10 border-t border-line pt-6">
          <h2 id="limits" className="font-display text-base font-bold text-ink">What these numbers are, and are not</h2>
          <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-sm text-ink/80">
            <li>
              A <strong>visitor</strong> is a browser counted once per day by the <code>ahm_seen</code> cookie, which holds only
              the date it was last counted. <strong>New</strong> means no cookie yet. One person on a phone and a laptop is two
              visitors, and someone who clears cookies is new again. Visitors who switch the cookie off, block cookies or send
              Global Privacy Control are counted as visits only.
            </li>
            <li>
              A <strong>visit</strong> is a first page view in a browser tab, so a page reload counts as a new one. Visitors over
              several days are not added up: one browser on three days is three visitor-days, which is why the period figures
              show new visitors instead.
            </li>
            <li>
              Crawlers and obvious scripts are skipped by their browser name. Some get through, and some visitors block the
              counter, so read the figures as indicative, not exact.
            </li>
            <li>
              <strong>Searches</strong> are searches in the site&rsquo;s own Knowledge Center box, counted but never recorded: the
              words typed are not kept. They are not Google searches.
            </li>
            <li>
              What people typed into Google or Bing to find the site is only in Google Search Console and Bing Webmaster Tools.
              A search engine reports it as &ldquo;Google search&rdquo; here, without the words.
            </li>
            <li>Enquiries come from the register itself, not from the counter, so they are exact. Staff pages are not counted.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
