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

        <ul className="mt-10 border-t border-line">
          {handFeelFactors.map((f, i) => {
            const open = f.id === active;
            return (
              <li key={f.id} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`factor-${f.id}`}
                  onClick={() => setActive(f.id)}
                  className="group flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span
                    className={cn(
                      "numeral text-sm transition-colors duration-300 motion-reduce:transition-none",
                      // /50 measures 3.5:1 on the deeper alternating ground.
                      open ? "text-ink" : "text-ink/65",
                    )}
                  >
                    {numeral(i + 1)}
                  </span>
                  <span className="flex-1">
                    <span
                      className={cn(
                        "block font-display text-lg font-bold uppercase tracking-[-0.02em] transition-colors duration-300 motion-reduce:transition-none",
                        open ? "text-ink" : "text-ink/60 group-hover:text-ink",
                      )}
                    >
                      {f.name}
                    </span>
                    {open && (
                      <span id={`factor-${f.id}`} className="mt-2 block">
                        <span className="block text-sm leading-relaxed text-ink/75">{f.effect}</span>
                        <span className="mt-3 block text-sm leading-relaxed text-ink/70">
                          <span className="label text-ink/60">Put in the tech pack</span>{" "}
                          {f.specify}
                        </span>
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <p className="label text-ink/60">
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
                  <span className="ml-2 whitespace-nowrap font-sans text-xs font-normal text-ink/60">
                    {material.typicalWeight}
                  </span>
                </dt>
                <dd
                  className={cn(
                    "col-span-12 text-sm leading-relaxed sm:col-span-7",
                    value ? "text-ink/75" : "text-ink/50",
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
