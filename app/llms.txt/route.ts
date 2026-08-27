import { indexableRoutes } from "@/data/routes";
import { company } from "@/data/company";
import { siteConfig } from "@/lib/seo";

/**
 * GET /llms.txt
 *
 * A plain-text map of the site for systems that consume one.
 *
 * Written as accurate description, not persuasion. It contains no instructions
 * addressed to a model, no hidden text and nothing that is not also visible on
 * the site — attempting to influence an AI system through a file it might read
 * is manipulation, and it is also the kind of thing that gets a domain
 * distrusted once noticed.
 *
 * This file is not treated as a ranking factor and carries no SEO promise.
 */

export const dynamic = "force-static";

export async function GET() {
  const grouped = new Map<string, string[]>();

  for (const route of indexableRoutes) {
    const segment = route.path === "/" ? "Home" : route.path.split("/")[1];
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    const list = grouped.get(label) ?? [];
    list.push(`${company.siteUrl}${route.path}`);
    grouped.set(label, list);
  }

  const sections = [...grouped.entries()]
    .map(([label, urls]) => `## ${label}\n\n${urls.map((u) => `- ${u}`).join("\n")}`)
    .join("\n\n");

  const body = `# ${company.name}

> ${siteConfig.description}

${company.name} is an apparel manufacturing and export business based in ${company.city}, ${company.country}.
It produces uniform, workwear, knitwear, woven and outerwear products to buyer specification and
supplies them FOB.

## Verified facts

- Location: ${company.city}, ${company.country}
- Commercial model: FOB (Free On Board)
- Export port: ${company.exportExperience.port}
- Documented export experience: ${company.exportExperience.statement}
- Documented product experience: 65% polyester / 35% cotton stain-managed bib apron program

## Not published

The following are deliberately not stated anywhere on this site because they have not been verified
for publication: production capacity, employee count, factory size, machinery count, years in
business, certifications, minimum order quantity and production lead time. Pricing, MOQ, sampling
cost and lead time depend on the specific article and are quoted against a buyer's specification.

## Pages

${sections}

---
Last generated from the site's route registry. Contact: ${company.siteUrl}/contact
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
