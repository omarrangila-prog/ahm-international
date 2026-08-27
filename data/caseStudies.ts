import type { AssetKey } from "./assets";

/**
 * CASE STUDIES
 * ============
 *
 * Structured so a CMS can take this over later, and gated so a customer can
 * never be identified by accident.
 *
 * `client` is intentionally absent from the type. Identity is carried only by
 * `anonymisedTitle`. A logo requires BOTH a logo path and `logoPermission: true`
 * — the renderer checks the flag, so forgetting to hide something is not a
 * possible failure mode.
 */

export type CaseStudy = {
  slug: string;
  /** Anonymised program title. Never a customer name. */
  anonymisedTitle: string;
  market: string;
  category: string;
  /** Only facts that are documented. */
  material: string;
  requirement: string;
  development: string;
  manufacturing: string;
  quality: string;
  exportMode: string;
  outcome: string;
  assets: { hero: AssetKey; product: AssetKey; fabric: AssetKey; detail: AssetKey };
  /** Written publication permission on file. Nothing attributed renders without it. */
  logoPermission: false;
  logo: null;
  /** True where every published fact is documented. */
  verified: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "us-uniform-apron-program",
    anonymisedTitle: "U.S. Uniform Program",
    market: "United States",
    category: "Bib Apron",
    material: "65% Polyester / 35% Cotton",
    requirement: "Stain-resistant apron for a customer-facing uniform program.",
    development:
      "Construction, pocket configuration, strap hardware and reinforcement points were confirmed against the buyer's specification before sampling, with the stain-management requirement driving the fabric selection.",
    manufacturing:
      "Cut and sewn to the approved construction, with bar-tacked reinforcement at pocket mouths and strap attachment points.",
    quality:
      "Inspection covered fabric shade and weight, measurement against the approved size specification, construction, appearance and packing verification.",
    exportMode: "FOB Pakistan. Port Qasim, Karachi",
    outcome:
      "Documented FOB export of a poly-cotton uniform apron program from Port Qasim, Karachi to the United States.",
    assets: {
      hero: "caseStudy.apronProgram.hero",
      product: "caseStudy.apronProgram.product",
      fabric: "caseStudy.apronProgram.fabric",
      detail: "caseStudy.apronProgram.detail",
    },
    logoPermission: false,
    logo: null,
    verified: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

/**
 * Shown where a buyer would expect more references than we can currently
 * evidence. Saying this plainly reads better than padding the page.
 */
export const CASE_STUDY_NOTE =
  "We publish a program only where the facts are documented and the customer's identity is protected. Further references are available under NDA during commercial discussion." as const;
