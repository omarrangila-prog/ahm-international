"use client";

import { useState } from "react";
import { handFeelFactors, factorValue, HAND_FEEL_SUMMARY } from "@/data/hand-feel";
import { materials, MATERIAL_DISCLAIMER } from "@/data/materials";
import { cn, numeral } from "@/lib/utils";

/**
 * WHAT GSM DOES NOT TELL YOU
 * ==========================
 *
 * The page above leads with `typicalWeight` in GSM, set in the accent colour,
 * because it is the number buyers ask for first. This section is the correction
 * to the anchor that creates: two fabrics can hit the same GSM and behave
 * nothing alike, and the difference is where a program fails at bulk after the
 * sample was approved.
 *
 * It is built as a cross-reference rather than an essay. Picking a factor shows
 * what that factor actually resolves to for every construction on the page, so
 * the reader ends up reading AHM's own specification table through it. A buyer
 * comparing pique and jersey learns more from seeing their constructions side by
 * side under "Construction" than from any amount of prose about weave.
 *
 * Where a factor has no field behind it the cell says so rather than going
 * blank. `factorValue` returns null and the row reads "Not published" — the same
 * honesty the rest of this site applies to facts it cannot evidence, applied
 * here to fabric properties AHM does not currently publish.
 */
export function HandFeel() {
  const [active, setActive] = useState(handFeelFactors[0].id);
  const factor = handFeelFactors.find((f) => f.id === active) ?? handFeelFactors[0];

  return (
    <div className="grid grid-cols-12 gap-y-12 lg:gap-x-16">
      <div className="col-span-12 lg:col-span-5">
        <p className="max-w-prose font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
          {HAND_FEEL_SUMMARY}
        </p>
        <p className="mt-6 max-w-prose leading-relaxed text-ink/75">
          Five things decide how a cloth behaves. A specification that names only
          weight leaves four of them to whoever is making it, which is how two mills
          both hit 220 gsm and ship fabrics that wear differently.
        </p>

        {/* Five short rows, and the description below them rather than inside
            the open one.
            Expanding in place pushed the cross-reference table roughly a
            screen and a half down on a phone, so picking a factor changed
            something the reader could not see — the classic case of a control
            separated from its result. Kept flat, the list is five lines on any
            width and the answer is always the next thing on screen. */}
        <ul className="mt-10 flex flex-wrap gap-2 lg:mt-8">
          {handFeelFactors.map((f, i) => {
            const on = f.id === active;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(f.id)}
                  className={cn(
                    "flex items-baseline gap-2 border px-3 py-2 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none",
                    on ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/75 hover:border-ink",
                  )}
                >
                  <span className={cn("numeral text-xs", on ? "text-paper/70" : "text-ink/65")}>
                    {numeral(i + 1)}
                  </span>
                  {f.name}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 border-t border-line pt-6">
          <p className="max-w-prose text-sm leading-relaxed text-ink/75">{factor.effect}</p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/70">
            <span className="label text-ink/65">Put in the tech pack</span> {factor.specify}
          </p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <p className="label text-ink/65">
          {factor.name} across every construction on this page
        </p>

        <dl className="mt-6 border-t border-line">
          {materials.map((material) => {
            const value = factorValue(material, factor);
            return (
              <div
                key={material.slug}
                className="grid grid-cols-12 items-baseline gap-x-6 gap-y-1 border-b border-line py-4"
              >
                <dt className="col-span-12 font-display text-sm font-bold tracking-[-0.01em] text-ink sm:col-span-5">
                  {material.name}
                  <span className="ml-2 whitespace-nowrap font-sans text-xs font-normal text-ink/65">
                    {material.typicalWeight}
                  </span>
                </dt>
                <dd
                  className={cn(
                    "col-span-12 text-sm leading-relaxed sm:col-span-7",
                    value ? "text-ink/75" : "text-ink/65",
                  )}
                >
                  {value ?? "Not published for this construction"}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="mt-6 text-sm leading-relaxed text-ink/70">
          Every row above is the same weight class it was before. Switch the factor and
          the fabrics reorder — which is the point: the number they share is the one
          that separates them least.
        </p>
        <p className="mt-5 text-xs leading-relaxed text-ink/70">{MATERIAL_DISCLAIMER}</p>
      </div>
    </div>
  );
}
