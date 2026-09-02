import { CapabilityBadge } from "@/components/ui/ProofBadge";
import { trims, trimCategories, TRIM_DISCLAIMER } from "@/data/trims";

/**
 * TRIMS LIBRARY
 * =============
 *
 * Master spec §15, rendered as a specification table rather than a picture grid.
 *
 * A trim catalogue with photographs invites a buyer to shop, which is the wrong
 * interaction: trims are nominated or approved, not browsed. What is useful is
 * the column headed "What you specify" — those are the decisions that stall a
 * sampling round when they are left open, and listing them lets a buyer arrive
 * with the answers.
 *
 * Server component. Grouped by category so the table scans, with the notes that
 * carry a standard or a safety requirement called out inline rather than
 * buried in a footnote.
 */
export function TrimsLibrary() {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            Trim components by category, with the specification decision each requires
          </caption>
          <thead>
            <tr className="border-b border-ink/20">
              <th scope="col" className="label py-3 pr-4 text-ink/65">Component</th>
              <th scope="col" className="label py-3 pr-4 text-ink/65">Material</th>
              <th scope="col" className="label py-3 pr-4 text-ink/65">What you specify</th>
              <th scope="col" className="label py-3 text-ink/65">Applications</th>
            </tr>
          </thead>
          {trimCategories.map((category) => {
            const rows = trims.filter((t) => t.category === category);
            return (
              <tbody key={category}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className="pb-2 pt-7 font-display text-xs font-bold uppercase tracking-[0.12em] text-ink"
                  >
                    {category}
                  </th>
                </tr>
                {rows.map((t) => (
                  <tr key={t.slug} className="border-b border-ink/10 align-top">
                    <td className="py-3.5 pr-4">
                      <span className="font-semibold text-ink">{t.name}</span>
                      {t.capabilityStatus !== "current_capability" && (
                        <CapabilityBadge status={t.capabilityStatus} className="mt-2 flex w-fit" />
                      )}
                      {t.note && (
                        <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink/65">{t.note}</p>
                      )}
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-ink/70">{t.material}</td>
                    <td className="py-3.5 pr-4 text-sm text-ink/70">{t.decision}</td>
                    <td className="py-3.5 text-sm text-ink/60">{t.applications.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </div>

      <p className="mt-6 max-w-2xl border-l-2 border-ink/20 pl-4 text-sm leading-relaxed text-ink/65">
        {TRIM_DISCLAIMER}
      </p>
    </div>
  );
}
