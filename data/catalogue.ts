import { productCategories, type ProductCategory, type ProductArticle } from "./products";
import type { CapabilityStatus } from "./verification";
import type { AssetKey } from "./assets";

/**
 * CATALOGUE
 * =========
 *
 * Master spec §11. A flat, filterable view over the article lists that already
 * live inside each category.
 *
 * This is a *derivation*, not a second source of truth. Nothing is retyped here:
 * every entry is assembled from `productCategories` at module load, so adding an
 * article to a category adds it to the catalogue, and the two can never disagree.
 * The facet lists are likewise computed from the data rather than hand-listed,
 * which is what stopped "Food Service" and "Food service" from becoming two
 * filters the day a category was added.
 */

export type CatalogueEntry = {
  id: string;
  name: string;
  note: string;
  asset: AssetKey;
  /** The category this article belongs to. */
  categorySlug: string;
  categoryName: string;
  zone: ProductCategory["zone"];
  /** Article override where present, otherwise the category's own status. */
  capabilityStatus: CapabilityStatus;
  applications: string[];
  decoration: string[];
  subcategories: string[];
  /** Everything a free-text search should match, lowercased once at build. */
  haystack: string;
};

function build(): CatalogueEntry[] {
  const out: CatalogueEntry[] = [];
  for (const c of productCategories) {
    c.articles.forEach((a: ProductArticle, i) => {
      const entry: Omit<CatalogueEntry, "haystack"> = {
        id: `${c.slug}--${i}`,
        name: a.name,
        note: a.note,
        asset: a.asset,
        categorySlug: c.slug,
        categoryName: c.name,
        zone: c.zone,
        capabilityStatus: a.capabilityStatus ?? c.capabilityStatus,
        applications: c.applications,
        decoration: c.decoration,
        subcategories: c.subcategories,
      };
      out.push({
        ...entry,
        haystack: [
          entry.name, entry.note, entry.categoryName,
          ...entry.applications, ...entry.decoration, ...entry.subcategories,
        ].join(" ").toLowerCase(),
      });
    });
  }
  return out;
}

export const catalogue: CatalogueEntry[] = build();

/** Unique, sorted facet values — computed, never hand-maintained. */
function facet(key: "applications" | "decoration"): string[] {
  return [...new Set(catalogue.flatMap((e) => e[key]))].sort();
}

export const catalogueFacets = {
  categories: productCategories.map((c) => ({ slug: c.slug, name: c.name })),
  applications: facet("applications"),
  decoration: facet("decoration"),
  capability: [...new Set(catalogue.map((e) => e.capabilityStatus))],
};

export type CatalogueFilter = {
  q: string;
  category: string | null;
  application: string | null;
  decoration: string | null;
  capability: CapabilityStatus | null;
};

export const EMPTY_FILTER: CatalogueFilter = {
  q: "", category: null, application: null, decoration: null, capability: null,
};

/**
 * Pure, so it can be unit-tested without React and reused server-side.
 * Terms are AND-ed: a buyer narrowing a list expects each choice to remove rows.
 */
export function filterCatalogue(
  entries: CatalogueEntry[],
  f: CatalogueFilter,
): CatalogueEntry[] {
  const q = f.q.trim().toLowerCase();
  const terms = q ? q.split(/\s+/) : [];
  return entries.filter((e) => {
    if (f.category && e.categorySlug !== f.category) return false;
    if (f.application && !e.applications.includes(f.application)) return false;
    if (f.decoration && !e.decoration.includes(f.decoration)) return false;
    if (f.capability && e.capabilityStatus !== f.capability) return false;
    return terms.every((t) => e.haystack.includes(t));
  });
}
