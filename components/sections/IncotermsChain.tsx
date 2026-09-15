"use client";

import { useState } from "react";
import {
  AHM_DEFAULT_TERM,
  INCOTERMS_NOTE,
  incoterms,
  shipmentSteps,
} from "@/data/incoterms";
import { cn, numeral } from "@/lib/utils";

/**
 * WHO CARRIES WHAT, AND FROM WHERE
 * ================================
 *
 * The chain from the factory floor to the buyer's door, with the selected
 * Incoterms® rule deciding which party carries each link.
 *
 * It is built around one thing a "who pays" table cannot show. Under CFR and
 * CIF the seller pays the freight all the way to the destination port, so a
 * cost table puts the handover there — but risk passes when the goods are on
 * board at origin. A container lost mid-ocean on CIF terms is the buyer's
 * loss, claimed on a policy the seller bought. So cost and risk are drawn as
 * two separate things, and where they disagree the component says so in words
 * rather than leaving it to be inferred from shading.
 *
 * FOB is the default because it is what AHM quotes. The others are context, and
 * the note under the chart says as much: a rule appearing here is not a service
 * being offered.
 *
 * Stacked rows rather than a horizontal bar. Ten segments across a phone would
 * be four characters wide each, and the labels are the content — "import
 * clearance and duty" is the step a buyer needs to read, not a coloured slice
 * they have to match against a key.
 */
export function IncotermsChain() {
  const [code, setCode] = useState(AHM_DEFAULT_TERM);
  const term = incoterms.find((t) => t.code === code) ?? incoterms[0];

  const sellerSteps = shipmentSteps.filter((s) => term.carriedBy[s.index] === "seller");
  const lastPaidStep = Math.max(...sellerSteps.map((s) => s.index), 0);
  const costAndRiskDiverge = term.riskPassesAfter < lastPaidStep;

  return (
    <div>
      <fieldset>
        <legend className="label text-ink/65">Incoterms® 2020 rule</legend>
        <ul className="mt-3.5 flex flex-wrap gap-2">
          {incoterms.map((t) => {
            const on = t.code === code;
            return (
              <li key={t.code}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCode(t.code)}
                  className={cn(
                    "border px-4 py-2.5 font-display text-sm font-bold tracking-[-0.01em] transition-colors duration-200 motion-reduce:transition-none",
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/25 text-ink/75 hover:border-ink hover:text-ink",
                  )}
                >
                  {t.code}
                  {t.code === AHM_DEFAULT_TERM && (
                    <span className={cn("ml-2 text-xs font-normal", on ? "text-lime" : "text-ink/65")}>
                      AHM quotes this
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div aria-live="polite">
        <p className="mt-8 max-w-2xl font-display text-xl font-bold leading-snug tracking-[-0.02em] text-ink sm:text-2xl">
          {term.name}
        </p>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/75">{term.summary}</p>
        <p className="mt-3 text-sm text-ink/65">
          Names {term.namedPlace} in the contract.
        </p>

        {/* The divergence stated outright. On CIF this is the difference
            between what a buyer thinks they bought and what they own. */}
        {costAndRiskDiverge && (
          <p className="mt-6 max-w-2xl border-l-2 border-ink bg-ink/[0.04] py-4 pl-5 pr-4 text-sm leading-relaxed text-ink">
            <span className="font-display font-bold">Cost and risk part company here.</span> AHM
            pays through step {numeral(lastPaidStep)} — but the risk of loss or damage is yours
            from step {numeral(term.riskPassesAfter + 1)} onward. Goods lost in transit are your
            loss, claimed on the policy, even though the freight was on the invoice.
          </p>
        )}
      </div>

      <ol className="mt-10 border-t border-ink/15">
        {shipmentSteps.map((step) => {
          const party = term.carriedBy[step.index];
          const seller = party === "seller";
          const riskPassesHere = step.index === term.riskPassesAfter;

          return (
            <li key={step.index}>
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-1.5 border-b border-ink/15 py-4">
                <span
                  className={cn(
                    "numeral col-span-2 text-sm sm:col-span-1",
                    seller ? "text-ink" : "text-ink/70",
                  )}
                >
                  {numeral(step.index)}
                </span>

                <div className="col-span-10 sm:col-span-7">
                  <p
                    className={cn(
                      "font-display text-sm font-bold tracking-[-0.01em]",
                      seller ? "text-ink" : "text-ink/70",
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{step.detail}</p>
                </div>

                <p className="col-span-12 sm:col-span-4 sm:text-right">
                  <span
                    className={cn(
                      "inline-block border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em]",
                      seller
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/25 text-ink/70",
                    )}
                  >
                    {seller ? "AHM carries this" : "You carry this"}
                  </span>
                </p>
              </div>

              {/* The handover, drawn where it happens rather than described in
                  a legend the reader has to hold in their head. */}
              {riskPassesHere && (
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-ink bg-ink px-4 py-3 text-paper">
                  <span className="label text-lime">Risk passes to you here</span>
                  <span className="text-sm text-paper/75">
                    After step {numeral(step.index)}, loss or damage is the buyer&rsquo;s.
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-8 max-w-prose text-sm leading-relaxed text-ink/70">
        AHM quotes <span className="font-display font-bold text-ink">{AHM_DEFAULT_TERM} Karachi</span>.
        The other rules are here for comparison — a rule appearing on this chart is not a
        service being offered, and any term other than {AHM_DEFAULT_TERM} is a commercial
        agreement to be made in writing.
      </p>
      <p className="mt-4 max-w-prose text-xs leading-relaxed text-ink/70">{INCOTERMS_NOTE}</p>
    </div>
  );
}
