import { qualityGates, QUALITY_GATES_DISCLAIMER } from "@/data/quality-gates";
import { numeral } from "@/lib/utils";

/**
 * QUALITY GATES
 * =============
 *
 * Master spec §19. Nine gates as a server-rendered reference, no accordion.
 *
 * The choice not to collapse these is deliberate and the opposite of the
 * decision on the 26-stage workflow. That model is a *journey* a buyer locates
 * themselves inside, so hiding the phases they are not in helps. This is an
 * *argument* — that quality is a process rather than a final inspection — and an
 * argument that requires nine clicks to read does not get read.
 *
 * "If it fails" is given equal weight to the checks. A list of checks with no
 * stop condition describes an aspiration; the stop condition is what a sourcing
 * manager is actually trying to establish.
 */
export function QualityGates() {
  return (
    <div>
      <ol className="border-t border-ink/15">
        {qualityGates.map((g) => (
          <li
            key={g.index}
            className="grid grid-cols-1 gap-x-8 gap-y-4 border-b border-ink/15 py-8 md:grid-cols-12"
          >
            <div className="md:col-span-3">
              <span className="numeral text-3xl leading-none text-ink">
                {numeral(g.index)}
              </span>
              <h3 className="mt-2 font-display text-lg font-extrabold uppercase leading-tight tracking-[-0.02em] text-ink">
                {g.name}
              </h3>
            </div>

            <div className="md:col-span-5">
              <p className="text-sm leading-relaxed text-ink/70">{g.purpose}</p>
              <ul className="mt-4 space-y-1.5">
                {g.checks.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-ink/65">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-ink/30" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4">
              <div>
                <span className="label text-ink/65">Record produced</span>
                <p className="mt-1 text-sm text-ink/70">{g.record}</p>
              </div>
              <div className="mt-4 border-l-2 border-ink pl-3">
                <span className="label text-ink">If it fails</span>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{g.onFailure}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/65">
        {QUALITY_GATES_DISCLAIMER}
      </p>
    </div>
  );
}
