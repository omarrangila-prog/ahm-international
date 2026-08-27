import { productCategories } from "./products";
import { manufacturingStages } from "./manufacturing";
import { sourcingPillars } from "./sourcing";
import { industries } from "./industries";
import { industryDetail } from "./industry-detail";
import { caseStudies } from "./caseStudies";
import { guides } from "./guides";

/**
 * ROUTE REGISTRY
 * ==============
 *
 * The single list of what this site publishes. The sitemap, the audit script and
 * the IndexNow submission all read from here, so a page cannot be in one and
 * missing from another.
 *
 * `priority` reflects genuine commercial importance rather than being set to 1.0
 * everywhere — a sitemap where every URL claims maximum priority communicates
 * nothing.
 */

export type RouteEntry = {
  path: string;
  /** Relative importance within this site, 0–1. */
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  /** Excluded from the sitemap and marked noindex. */
  noindex?: boolean;
};

export const routes: RouteEntry[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },

  // Commercial
  { path: "/benchmark-a-style", priority: 0.9, changeFrequency: "monthly" },
  { path: "/request-a-quote", priority: 0.9, changeFrequency: "monthly" },
  { path: "/send-tech-pack", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },

  // Sourcing pillars — the primary organic entry points
  { path: "/sourcing", priority: 0.8, changeFrequency: "monthly" },
  ...sourcingPillars.map((p) => ({
    path: `/${p.slug}`,
    priority: 0.9,
    changeFrequency: "monthly" as const,
  })),

  // Products
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  ...productCategories.map((c) => ({
    path: `/products/${c.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
  })),

  // Capability and process
  { path: "/capabilities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/manufacturing", priority: 0.8, changeFrequency: "monthly" },
  ...manufacturingStages.map((s) => ({
    path: `/manufacturing/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/development", priority: 0.85, changeFrequency: "monthly" },
  { path: "/quality", priority: 0.8, changeFrequency: "monthly" },
  { path: "/materials", priority: 0.8, changeFrequency: "monthly" },
  { path: "/export", priority: 0.8, changeFrequency: "monthly" },

  // Industries
  { path: "/industries", priority: 0.75, changeFrequency: "monthly" },
  ...industries
    .filter((i) => industryDetail[i.slug])
    .map((i) => ({
      path: `/industries/${i.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),

  // Resources
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/glossary", priority: 0.6, changeFrequency: "monthly" },
  ...guides.map((g) => ({
    path: `/resources/${g.slug}`,
    priority: 0.65,
    changeFrequency: "monthly" as const,
  })),

  // Proof and company
  { path: "/case-studies", priority: 0.75, changeFrequency: "monthly" },
  ...caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  })),
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sustainability", priority: 0.5, changeFrequency: "yearly" },

  // Legal. Low priority but genuinely indexable — a procurement reviewer looks
  // for these, and a site that hides them looks like it has something to hide.
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

/** Only routes that should appear in the sitemap and be crawled. */
export const indexableRoutes = routes.filter((r) => !r.noindex);
