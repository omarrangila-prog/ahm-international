import { productCategories, type ProductArticle, type ProductCategory, type SpecRow } from "./products";
import type { CapabilityStatus } from "./verification";
import { itemsCore } from "./items-core";
import { itemsService } from "./items-service";
import { itemsSpecialist } from "./items-specialist";

/**
 * ITEM PAGES
 * ==========
 *
 * One page per article in the catalogue, at /products/<family>/<item>, asked
 * for by the owner on 10 November 2026.
 *
 * An item belongs to one family, its home, and lives under that family's URL.
 * Where the catalogue lists the same garment under two families (the chef coat
 * is in workwear and hospitality) or under two names (a "Bib Apron" in
 * hospitality is the aprons family's bib apron), `names` holds every name and
 * each card links to the one page. Two URLs for one garment would be duplicate
 * content, and would split whatever a search engine gives it between them.
 *
 * Every page is written for its garment: what a size chart must measure on it,
 * the construction choices that are particular to it, where a logo goes, and
 * questions a buyer of that garment asks. `tests/product-items.test.ts` fails
 * the build if two pages share an intro or a question, so a page cannot be
 * produced by changing the noun in another.
 *
 * Same rules as the family pages: weights are market orientation, nothing
 * states a price, MOQ or lead time, and the image and capability status come
 * from the family's article rather than being restated.
 */

export type { Term, Measurement, ProductItem } from "./item-helpers";
import type { ProductItem } from "./item-helpers";

export const productItems: ProductItem[] = [...itemsCore, ...itemsService, ...itemsSpecialist];

export function getItem(family: string, slug: string): ProductItem | undefined {
  return productItems.find((i) => i.family === family && i.slug === slug);
}

export const itemPath = (item: ProductItem) => `/products/${item.family}/${item.slug}`;

/** The page an article card opens, whichever family it is listed under. */
export function itemForArticle(name: string): ProductItem | undefined {
  return productItems.find((i) => i.names.includes(name));
}

export function itemsInFamily(family: string): ProductItem[] {
  return productItems.filter((i) => i.family === family);
}

/** The catalogue article this page shows: the first name, looked up in its home family first. */
export function articleFor(item: ProductItem): { article: ProductArticle; family: ProductCategory } | undefined {
  const home = productCategories.find((c) => c.slug === item.family);
  const ordered = home ? [home, ...productCategories.filter((c) => c !== home)] : productCategories;
  for (const name of item.names) {
    for (const family of ordered) {
      const article = family.articles.find((a) => a.name === name);
      if (article) return { article, family };
    }
  }
  return undefined;
}

export function itemStatus(item: ProductItem): CapabilityStatus {
  const found = articleFor(item);
  const home = productCategories.find((c) => c.slug === item.family);
  return found?.article.capabilityStatus ?? home?.capabilityStatus ?? "development_available";
}

/** Commercial rows every item page carries, answered by the commercial team. */
export const COMMERCIAL_ROWS: SpecRow[] = [
  { label: "Minimum quantity", value: null },
  { label: "Sampling", value: null },
  { label: "Lead time", value: null },
];
