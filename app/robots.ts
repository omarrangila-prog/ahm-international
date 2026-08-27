import type { MetadataRoute } from "next";
import { company } from "@/data/company";

/**
 * robots.txt
 *
 * Open by default. The API surface accepts POST submissions and has nothing to
 * index; private showrooms are per-buyer surfaces. CSS, JS and images are deliberately not
 * blocked; blocking them prevents search engines rendering the page as a user
 * sees it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private showrooms carry per-buyer content and are
        // additionally noindex at the page level. Disallowing them here keeps the
        // paths out of crawl logs as well — spec §27 and §49.
        disallow: ["/api/", "/showroom/"],
      },
    ],
    sitemap: [`${company.siteUrl}/sitemap.xml`, `${company.siteUrl}/image-sitemap.xml`],
    host: company.siteUrl,
  };
}
