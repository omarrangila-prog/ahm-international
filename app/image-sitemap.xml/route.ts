import { assetRegistry, resolveAsset, type AssetKey } from "@/data/assets";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";
import { manufacturingStages } from "@/data/manufacturing";
import { industries } from "@/data/industries";
import { industryDetail } from "@/data/industry-detail";

/**
 * GET /image-sitemap.xml
 *
 * A dedicated image sitemap for Google Images discovery.
 *
 * Two rules it follows strictly:
 *
 *  1. Only images that actually exist are listed. A sitemap advertising files
 *     that 404 damages crawl trust, and most of this site's photography slots are
 *     still pending — so the sitemap grows automatically as real assets land.
 *
 *  2. Each image is listed against a page that genuinely displays it, with the
 *     caption taken from the same alt text the page renders. The sitemap
 *     describes the site rather than making claims about it.
 */

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Maps each page to the assets it displays. */
function pageImageMap(): Map<string, AssetKey[]> {
  const map = new Map<string, AssetKey[]>();

  const add = (path: string, keys: AssetKey[]) => {
    const existing = map.get(path) ?? [];
    map.set(path, [...new Set([...existing, ...keys])]);
  };

  // Homepage carries the hero and the category renders.
  add("/", [
    "hero.sewing",
    "renders.workJacket",
    "photo.poloWhiteTipped",
    "photo.hoodieNavy",
    "products.apron.front",
    "renders.utilityWorkShirt",
    "renders.workTrouser",
    "photo.zipHoodieNavy",
  ]);

  for (const category of productCategories) {
    add(`/products/${category.slug}`, [
      category.heroAsset,
      ...category.detailAssets,
      ...category.articles.map((a) => a.asset),
    ]);
  }

  for (const stage of manufacturingStages) {
    add(`/manufacturing/${stage.slug}`, [stage.asset, ...stage.supportingAssets]);
  }

  for (const industry of industries) {
    if (!industryDetail[industry.slug]) continue;
    add(`/industries/${industry.slug}`, [industry.asset, industry.representative]);
  }

  add("/case-studies/us-uniform-apron-program", [
    "products.apron.front",
    "caseStudy.apronProgram.product",
    "caseStudy.apronProgram.fabric",
    "caseStudy.apronProgram.detail",
  ]);

  add("/materials", Object.keys(assetRegistry).filter((k) => k.startsWith("fabrics.")) as AssetKey[]);
  add("/export", ["export.cartons", "export.cartonMarking", "export.warehouse", "export.containerLoading"]);
  add("/quality", ["factory.qualityControl", "factory.fabricInspection", "factory.finishing", "factory.packing"]);

  return map;
}

export async function GET() {
  const map = pageImageMap();
  const entries: string[] = [];

  for (const [path, keys] of map) {
    // Only real files; decorative specimens are not images to index.
    const available = keys.map(resolveAsset).filter((asset) => asset.available);
    if (available.length === 0) continue;

    const images = available
      .map(
        (asset) => `    <image:image>
      <image:loc>${escapeXml(`${company.siteUrl}${asset.src}`)}</image:loc>
      <image:title>${escapeXml(asset.alt)}</image:title>
    </image:image>`,
      )
      .join("\n");

    entries.push(`  <url>
    <loc>${escapeXml(`${company.siteUrl}${path}`)}</loc>
${images}
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
