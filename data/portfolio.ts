import { productCategories } from "./products";
import { resolveAsset, type AssetKey } from "./assets";
import type { Origin } from "../lib/provenance";

/**
 * The production portfolio: articles shown in a photograph of the article
 * itself, or an enhanced photograph paired with its camera original.
 *
 * Derived, not curated. An article joins the moment its image file is a
 * photograph (data/verified-originals.json, or a camera file that matches no
 * generated hash), and an AI render never qualifies, however good. While no
 * article qualifies, /our-work answers 404 and stays out of the sitemap, the
 * navigation and every internal link, so the page cannot ship empty.
 *
 * Fabric and decoration come from the category's published specification,
 * so nothing here is written separately from the product pages.
 */

export type PortfolioItem = {
  name: string;
  asset: AssetKey;
  origin: Extract<Origin, "photograph" | "enhanced">;
  construction: string;
  category: { slug: string; name: string };
  fabric: string | null;
  decoration: string[];
};

export function portfolioItems(): PortfolioItem[] {
  const seen = new Set<string>();
  const out: PortfolioItem[] = [];
  for (const c of productCategories) {
    const fabric = c.specification.find((r) => r.label === "Fabric options")?.value ?? null;
    for (const a of c.articles) {
      const r = resolveAsset(a.asset);
      if (!r.available || r.kind !== "garment" || (r.origin !== "photograph" && r.origin !== "enhanced")) continue;
      // An article listed under two categories appears once, under the first.
      if (seen.has(r.src)) continue;
      seen.add(r.src);
      out.push({
        name: a.name,
        asset: a.asset,
        origin: r.origin,
        construction: a.note,
        category: { slug: c.slug, name: c.name },
        fabric,
        decoration: c.decoration,
      });
    }
  }
  return out;
}
