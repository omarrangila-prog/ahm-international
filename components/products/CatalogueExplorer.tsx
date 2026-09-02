"use client";

import { useMemo, useState, useId } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CapabilityBadge } from "@/components/ui/ProofBadge";
import {
  catalogue,
  catalogueFacets,
  filterCatalogue,
  EMPTY_FILTER,
  type CatalogueFilter,
} from "@/data/catalogue";
import { CAPABILITY_LABEL, type CapabilityStatus } from "@/data/verification";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * CATALOGUE EXPLORER
 * ==================
 *
 * Master spec §11. Search and facets across every article AHM lists.
 *
 * Deliberately client-side and un-paginated: 42 entries is small enough that
 * filtering is instant and a buyer can see the whole range shrink as they narrow
 * it. That feedback is the point — a paginated server round-trip per facet would
 * hide exactly the thing being communicated, which is how much AHM makes.
 *
 * No result count is faked and no empty state is dressed up. If a combination
 * returns nothing, it says so and offers the way back.
 */

function FacetRow({
  label,
  options,
  value,
  onChange,
  format = (v: string) => v,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  format?: (v: string) => string;
}) {
  const id = useId();
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span id={id} className="label w-full text-ink/65 sm:w-24 sm:shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-labelledby={id}>
        {options.map((o) => {
          const active = value === o;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : o)}
              className={cn(
                "border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink",
              )}
            >
              {format(o)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CatalogueExplorer() {
  const [filter, setFilter] = useState<CatalogueFilter>(EMPTY_FILTER);
  const results = useMemo(() => filterCatalogue(catalogue, filter), [filter]);

  const active =
    filter.q.trim() !== "" ||
    Boolean(filter.category || filter.application || filter.decoration || filter.capability);

  function set<K extends keyof CatalogueFilter>(key: K, value: CatalogueFilter[K]) {
    setFilter((f) => ({ ...f, [key]: value }));
    if (value) track("product_filtered", { facet: key, value: String(value) });
  }

  return (
    <div>
      <div className="border border-ink/15 bg-paper p-5 sm:p-7">
        <label htmlFor="catalogue-search" className="label text-ink/65">
          Search the range
        </label>
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden="true"
          />
          <input
            id="catalogue-search"
            type="search"
            value={filter.q}
            onChange={(e) => setFilter((f) => ({ ...f, q: e.target.value }))}
            placeholder="Polo, apron, twill, hi-vis, embroidery…"
            className="h-12 w-full border border-ink/20 bg-paper pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus-visible:border-ink"
          />
        </div>

        <div className="mt-6 space-y-4">
          <FacetRow
            label="Category"
            options={catalogueFacets.categories.map((c) => c.slug)}
            value={filter.category}
            onChange={(v) => set("category", v)}
            format={(slug) =>
              catalogueFacets.categories.find((c) => c.slug === slug)?.name ?? slug
            }
          />
          <FacetRow
            label="Industry"
            options={catalogueFacets.applications}
            value={filter.application}
            onChange={(v) => set("application", v)}
          />
          <FacetRow
            label="Branding"
            options={catalogueFacets.decoration}
            value={filter.decoration}
            onChange={(v) => set("decoration", v)}
          />
          <FacetRow
            label="Capability"
            options={catalogueFacets.capability}
            value={filter.capability}
            onChange={(v) => set("capability", v as CapabilityStatus | null)}
            format={(v) => CAPABILITY_LABEL[v as CapabilityStatus]}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/65" role="status" aria-live="polite">
          {results.length} of {catalogue.length} articles
        </p>
        {active && (
          <button
            type="button"
            onClick={() => setFilter(EMPTY_FILTER)}
            className="inline-flex items-center gap-1.5 text-sm text-ink/65 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 border border-dashed border-ink/25 bg-paper p-10 text-center">
          <p className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            Nothing matches that combination
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65">
            That does not mean AHM cannot make it. The range shown here is what is
            already documented — send the specification and it will be reviewed directly.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setFilter(EMPTY_FILTER)}
              className="border border-ink/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-lime hover:text-ink hover:text-paper"
            >
              Clear filters
            </button>
            <Link
              href="/send-tech-pack"
              className="bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-lime hover:text-ink"
            >
              Send a tech pack
            </Link>
          </div>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((e) => (
            <li key={e.id}>
              <Link
                href={`/products/${e.categorySlug}`}
                className="group flex h-full flex-col border border-ink/15 bg-paper transition-colors duration-300 hover:border-ink/40"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <SmartImage
                    asset={e.asset}
                    sizes={SIZES.quarter}
                    className="h-full w-full"
                    imageClassName="object-contain p-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    alt=""
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="label text-ink/65">{e.categoryName}</span>
                  <h3 className="mt-1.5 font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                    {e.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/60">
                    {e.note}
                  </p>
                  {e.capabilityStatus !== "current_capability" && (
                    <CapabilityBadge status={e.capabilityStatus} className="mt-3 self-start" />
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
