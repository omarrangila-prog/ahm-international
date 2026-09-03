import type { Metadata } from "next";
import { SourcingPillar, pillarMetadata } from "@/components/pages/SourcingPillar";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SourcingContext } from "@/components/sections/SourcingContext";

/**
 * Keyword-first landing page (brief §38). The old `/sourcing/apparel-manufacturer-pakistan`
 * path permanently redirects here, so only one URL is canonical.
 */

const SLUG = "apparel-manufacturer-pakistan";
const PATH = "/apparel-manufacturer-pakistan";

export const metadata: Metadata = pillarMetadata(SLUG, PATH) as Metadata;

export default function Page() {
  return (
    <SourcingPillar
      slug={SLUG}
      basePath={PATH}
      context={
        /* Only this pillar carries it: it is the page a buyer reaches while
           choosing a country, and the one where origin is the question. */
        <Section zone="ink" spacing="lg" aria-labelledby="origin-heading">
          <div className="shell-wide">
            <Eyebrow>Origin</Eyebrow>
            <MaskedHeading
              as="h2"
              id="origin-heading"
              className="mt-5 max-w-4xl font-display text-h1 text-paper"
              lines={[{ text: "What Pakistan gives you," }, { text: "and what we don't claim.", className: "text-lime" }]}
            />
            <div className="mt-14">
              <SourcingContext />
            </div>
          </div>
        </Section>
      }
    />
  );
}
