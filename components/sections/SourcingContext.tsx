import { ArrowUpRight } from "lucide-react";
import { sourcingContext, notClaimed } from "@/data/sourcing-context";

/**
 * SOURCING CONTEXT
 * ================
 *
 * Two halves that only make sense together.
 *
 * On the left, facts about Pakistan as an origin — each with its primary source
 * and the date that source was read, because a trade preference can be
 * suspended and an undated claim about one has an unknown expiry. They are
 * framed as country facts throughout: the preference belongs to the origin, not
 * to AHM, and a buyer's duty position depends on their own classification.
 *
 * On the right, the claims AHM does not make. That half is the reason the first
 * half is credible. Supplier profiles from this region carry a standard list —
 * vertical integration, certifications, capacity, a roster of brands — and a
 * buyer arriving here will be looking for it. Naming the list and saying which
 * parts cannot be evidenced is more useful than silence, and it is the only
 * honest way to put country-level advantages on a page without letting them
 * read as company-level ones.
 */
export function SourcingContext() {
  return (
    <div className="grid grid-cols-12 gap-y-14 lg:gap-x-16">
      <div className="col-span-12 lg:col-span-7">
        <p className="label text-current/70">Country context, with sources</p>
        <ul className="mt-8 border-t border-current/20">
          {sourcingContext.map((fact) => (
            <li key={fact.id} className="border-b border-current/20 py-8">
              <p className="max-w-prose font-display text-xl font-bold leading-snug tracking-[-0.02em] sm:text-2xl">
                {fact.claim}
              </p>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-current/75">
                {fact.relevance}
              </p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-current/70">
                <a
                  href={fact.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 underline decoration-current/40 underline-offset-4 hover:decoration-current"
                >
                  {fact.source.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </a>
                <span>Checked {fact.checkedOn}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <p className="label text-current/70">What AHM does not claim</p>
        <dl className="mt-8 border-t border-current/20">
          {notClaimed.map((item) => (
            <div key={item.claim} className="border-b border-current/20 py-6">
              <dt className="font-display text-sm font-bold uppercase tracking-[0.02em] text-current/60 line-through decoration-current/40">
                {item.claim}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-current/75">{item.position}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
