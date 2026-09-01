import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { IndustryRows } from "@/components/sections/IndustryRows";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { performanceOptions, PERFORMANCE_DISCLAIMER } from "@/data/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Uniform Program Industries",
  description:
    "How uniform requirements change by sector. Grocery, hospitality, food service, retail, facilities, industrial, corporate and events.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        headingLines={[
          { text: "Same garment." },
          { text: "Different", className: "text-cobalt" },
          { text: "requirement." },
        ]}
        intro="A polo for a grocery checkout and a polo for a corporate reception are not the same product. These pages set out what each environment actually does to a garment, and how the program should be specified because of it."
        trail={[{ name: "Industries", path: "/industries" }]}
        zone="cream"
        primaryCta={{ label: "Discuss a Program", href: "/request-a-quote" }}
        secondaryCta={{ label: "See product range", href: "/products" }}
      />

      {/* Rows rather than tiles; see components/sections/IndustryRows.tsx. */}
      <Section zone="cream" spacing="none" aria-labelledby="ind-heading">
        <div className="shell-wide pb-24">
          <h2 id="ind-heading" className="sr-only">
            Industries served
          </h2>
          <IndustryRows />
        </div>
      </Section>

      <Section zone="ivory" spacing="lg" aria-labelledby="perf-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Performance</Eyebrow>
            <MaskedHeading
              as="h2"
              id="perf-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Specified," }, { text: "not promised." }]}
            />
            <p className="mt-6 text-ink/70">
              Every option below depends on the fabric selected and the approved specification. None
              of them are properties of the stitching.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2" stagger={0.05}>
              {performanceOptions.map((option) => (
                <RevealItem key={option.name}>
                  <div className="border-l-2 border-orange pl-4">
                    <p className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-ink">
                      {option.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/60">{option.note}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-8 border-t border-line pt-5 text-xs text-ink/70">{PERFORMANCE_DISCLAIMER}</p>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "PLAN YOUR" }, { text: "PROGRAM." }]}
        body="Tell us the roles, the environment and the articles. We will come back on fabric, construction and commercial FOB costing across the whole program."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="forest"
      />

      <RelatedLinks
        guidesFor="/industries"
        title="Explore next"
        links={[
          { label: "Uniform & workwear manufacturing", href: "/products/uniform-workwear", description: "Work shirts, service apparel, chef wear and hi-vis." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
          { label: "Product development", href: "/development", description: "How a specification becomes an executable manufacturing document." },
        ]}
      />
    </>
  );
}
