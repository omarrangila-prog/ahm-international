import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/data/routes";
import { contentDates } from "@/data/content-dates";
import { company } from "@/data/company";

/**
 * XML sitemap.
 *
 * Generated from the route registry, so it can only contain URLs the site
 * actually serves. Nothing noindexed, no query URLs, no redirects.
 *
 * `lastModified` comes from `data/content-dates.ts`, generated from git history
 * rather than the build clock. That matters: a build-time date tells a crawler
 * every page changed on every deploy, which is false, and a signal that is
 * always "just changed" is one a crawler learns to ignore.
 */

/** Maps a route to its content group in the generated date table. */
function groupFor(routePath: string): string {
  const s = routePath.split("/").filter(Boolean);
  if (s.length === 0) return "home";

  const [head, tail] = s;
  switch (head) {
    case "products": return tail ? "productCategory" : "products";
    case "manufacturing": return tail ? "manufacturingStage" : "manufacturing";
    case "industries": return tail ? "industry" : "industries";
    case "sourcing": return tail ? "sourcingPillar" : "sourcing";
    case "resources": return tail ? "guide" : "resources";
    case "case-studies": return tail ? "caseStudy" : "caseStudies";
    default: return head;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const fallback = new Date();

  return indexableRoutes.map((route) => {
    const stamp = contentDates[groupFor(route.path)];
    return {
      url: `${company.siteUrl}${route.path}`,
      lastModified: stamp ? new Date(stamp) : fallback,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
