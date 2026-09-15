"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { materials, materialFacets, MATERIAL_DISCLAIMER, RECYCLED_FOOTNOTE } from "@/data/materials";
import { CAPABILITY_LABEL, CAPABILITY_MEANING } from "@/data/verification";
import { cn, numeral } from "@/lib/utils";

/**
 * MATERIAL INDEX
 * ==============
 *
 * Replaces eight full-width rows, each carrying a square macro and a
 * four-column spec table, that ran 3,273px on their own — a quarter of the
 * page, to list eight things.
 *
 * Length was not the only cost. This page ended up showing the same eight
 * constructions three times: once as that list, once as the hand-feel
 * cross-reference, and once inside the compare slider. Three treatments of one
 * dataset is not depth, it is a reader scrolling past the same fabrics looking
 * for the difference between them.
 *
 * So the three now do different jobs. This is the index — every construction on
 * one screen, with weight and capability visible closed, because those are the
 * two facts a buyer scans for. The hand-feel section below is the comparison
 * across a single property. The slider is the visual check. Opening a row here
 * gives the full specification without leaving the list, so the page never asks
 * the reader to hold one fabric in their head while scrolling to another.
 *
 * The filters come from `materialFacets()`, which derives them from the data
 * rather than listing them by hand — the same rule the product catalogue
 * follows, and the reason "Performance" cannot become two facets the day
 * someone types it differently. They existed unused until now: a buyer scoping
 * "a mid-weight woven that holds structure" had to read all eight and hold the
 * answer in their head.
 */

const facets = materialFacets();

type Filters = { family: string | null; weight: string | null; stretch: string | null };
const NONE: Filters = { family: null, weight: null, stretch: null };

export function MaterialIndex() {
  const [open, setOpen] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(NONE);

  const shown = materials.filter(
    (m) =>
      (!filters.family || m.family === filters.family) &&
      (!filters.weight || m.weightClass === filters.weight) &&
      (!filters.stretch || m.stretch === filters.stretch),
  );
  const active = Object.values(filters).filter(Boolean).length;

  /** Toggling the value that is already set clears it, so every chip is its own undo. */
  const set = (key: keyof Filters, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: prev[key] === value ? null : value }));
  const reduced = useReducedMotion();
  const timing = reduced ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-x-10 gap-y-5">
        <FacetGroup label="Construction" values={facets.families} active={filters.family} onPick={(v) => set("family", v)} />
        <FacetGroup label="Weight" values={[...facets.weightClasses]} active={filters.weight} onPick={(v) => set("weight", v)} />
        <FacetGroup label="Stretch" values={facets.stretch} active={filters.stretch} onPick={(v) => set("stretch", v)} />
      </div>

      <p aria-live="polite" className="mb-4 text-sm text-ink/70">
        {shown.length} of {materials.length} constructions
        {active > 0 && (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setFilters(NONE)}
              className="underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
            >
              Clear {active === 1 ? "filter" : "filters"}
            </button>
          </>
        )}
      </p>

      <ul className="border-t border-line">
        {shown.map((material, i) => {
          const isOpen = open === material.slug;
          const panelId = `material-${material.slug}`;

          return (
            <li key={material.slug} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : material.slug)}
                  className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6"
                >
                  <span
                    className={cn(
                      "numeral shrink-0 text-sm transition-colors duration-300 motion-reduce:transition-none",
                      isOpen ? "text-ink" : "text-ink/65",
                    )}
                  >
                    {numeral(i + 1)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block font-display text-lg font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors duration-300 motion-reduce:transition-none sm:text-xl",
                        isOpen ? "text-ink" : "text-ink group-hover:text-ink/70",
                      )}
                    >
                      {material.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-ink/70">
                      {material.family} · {material.construction}
                    </span>
                    {/* Weight repeated into the flow below `sm`, where the
                        right-hand column is hidden. It is the fact a buyer
                        scans a fabric list for; leaving it desktop-only made
                        the index unscannable on the device most of them are
                        holding. */}
                    <span className="mt-1.5 block text-sm text-ink sm:hidden">
                      {material.typicalWeight}
                      <span className="text-ink/70"> · {material.weightClass} weight</span>
                    </span>
                  </span>

                  {/* Weight and capability stay on the closed row: they are what a
                      buyer scans for, and hiding either behind a click makes the
                      list unscannable. */}
                  <span className="hidden shrink-0 text-right sm:block">
                    <span className="block font-display text-sm font-bold tracking-[-0.02em] text-ink">
                      {material.typicalWeight}
                    </span>
                    <span className="mt-1 block text-xs text-ink/70">{material.weightClass} weight</span>
                  </span>

                  <span
                    title={CAPABILITY_MEANING[material.capabilityStatus]}
                    className="hidden shrink-0 border border-ink/20 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-ink/75 lg:block print:block"
                  >
                    {CAPABILITY_LABEL[material.capabilityStatus]}
                  </span>

                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink/65 transition-transform duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none print:hidden",
                      isOpen && "rotate-45",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    key={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={timing}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-x-10 gap-y-8 pb-10">
                      <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                        {hasAsset(material.asset) && (
                        <div className="aspect-square w-full overflow-hidden bg-paper">
                          <SmartImage
                            asset={material.asset}
                            sizes={SIZES.quarter}
                            className="h-full w-full"
                            imageClassName="object-cover"
                            alt={`${material.name} fabric structure`}
                          />
                        </div>
                        )}
                      </div>

                      <div className="col-span-12 sm:col-span-8 lg:col-span-9">
                        <p className="max-w-prose text-sm italic leading-relaxed text-ink/75">
                          {material.handFeel}
                        </p>

                        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                          <Row label="Common compositions" value={material.compositions.join(" · ")} />
                          <Row label="Surface" value={material.surface} />
                          <Row label="Stretch" value={material.stretch} />
                          <Row label="Finish options" value={material.finishOptions.join(" · ")} />
                          <Row label="Used for" value={material.useCases.join(" · ")} />
                        </dl>

                        <p className="mt-6 text-sm leading-relaxed text-ink/70 lg:hidden">
                          {CAPABILITY_LABEL[material.capabilityStatus]}.{" "}
                          {CAPABILITY_MEANING[material.capabilityStatus]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {shown.length === 0 && (
        <p className="border-b border-line py-10 text-sm text-ink/70">
          No construction on this page matches that combination. Clear a filter, or send the
          requirement and we will say whether it is developable.
        </p>
      )}

      <div className="mt-8 max-w-3xl space-y-3">
        <p className="text-xs leading-relaxed text-ink/70">{MATERIAL_DISCLAIMER}</p>
        <p className="text-xs leading-relaxed text-ink/70">{RECYCLED_FOOTNOTE}</p>
      </div>
    </div>
  );
}

function FacetGroup({
  label,
  values,
  active,
  onPick,
}: {
  label: string;
  values: readonly string[];
  active: string | null;
  onPick: (value: string) => void;
}) {
  return (
    <div>
      <p className="label text-ink/65">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {values.map((value) => {
          const on = active === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(value)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors duration-200 motion-reduce:transition-none",
                on ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/75 hover:border-ink",
              )}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-ink/65">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{value}</dd>
    </div>
  );
}
