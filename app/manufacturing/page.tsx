import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { WorkflowMap } from "@/components/sections/WorkflowMap";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { manufacturingStages } from "@/data/manufacturing";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Manufacturing Process",
  description:
    "Nine manufacturing stages, from product development and fabric sourcing through cut and sew and quality control to FOB export.",
  path: "/manufacturing",
});

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        headingLines={[
          { text: "Nine stages." },
          { text: "One accountable", className: "text-cobalt" },
          { text: "partner." },
        ]}
        intro="From the first review of your specification to handover on board at Port Qasim. Each stage below has a defined output and a point where you approve something, and each page names what usually goes wrong there."
        trail={[{ name: "Manufacturing", path: "/manufacturing" }]}
        zone="cream"
        asset="factory.sewing"
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "See capabilities", href: "/capabilities" }}
      />

      <Section zone="cream" spacing="none" aria-labelledby="stages-heading">
        <div className="shell-wide pb-24">
          <h2 id="stages-heading" className="sr-only">
            Manufacturing stages
          </h2>

          <RevealGroup className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {manufacturingStages.map((stage) => (
              <RevealItem key={stage.slug}>
                <Link
                  href={`/manufacturing/${stage.slug}`}
                  className="group flex h-full flex-col bg-cream transition-colors duration-300 hover:bg-white"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-ivory">
                    <SmartImage
                      asset={stage.asset}
                      sizes={SIZES.third}
                      className="h-full w-full"
                      imageClassName="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span className="numeral text-2xl text-ink/60 transition-colors group-hover:text-cobalt">
                          {numeral(stage.index)}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.025em] text-ink">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">
                        {stage.intro.split(". ")[0]}.
                      </p>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Spec §17 — the full 26-stage model, grouped into six phases a buyer can
          locate themselves inside. Deliberately not 26 equal cards. */}
      <Section zone="paper" spacing="lg" aria-labelledby="workflow-heading">
        <div className="shell-wide">
          <Eyebrow>The full workflow</Eyebrow>
          <h2
            id="workflow-heading"
            className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            Twenty-six stages, and who owns each one.
          </h2>
          <p className="mt-4 max-w-xl text-ink/65">
            The stages above are the shape of a program. This is the whole of it, in
            order, including what you are asked for at each point.
          </p>
          <div className="mt-10">
            <WorkflowMap />
          </div>
        </div>
      </Section>

      <Section zone="forest" spacing="lg" tooth aria-labelledby="approach-heading">
        <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Operating model</Eyebrow>
            <MaskedHeading
              as="h2"
              id="approach-heading"
              className="mt-5 font-display text-h1 text-cream"
              lines={[{ text: "What we do" }, { text: "and do not" }, { text: "claim." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <dl className="flex flex-col divide-y divide-cream/15 border-t border-cream/15">
              {[
                {
                  q: "Commercial model",
                  a: "FOB. Goods are delivered on board at Port Qasim, Karachi, and freight and insurance from that point are the buyer's responsibility.",
                },
                {
                  q: "Production capacity",
                  a: "Not published. We confirm feasibility against your quantity, article and schedule during commercial discussion rather than advertising a figure.",
                },
                {
                  q: "Certifications",
                  a: "Certification status is confirmed in writing during commercial discussion. We do not display accreditations we cannot evidence with a certificate.",
                },
                {
                  q: "Minimum quantity and lead time",
                  a: "Confirmed once the article, fabric and colour count are reviewed. Fabric is usually the constraint, not the stitching.",
                },
                {
                  q: "Documented export experience",
                  a: "FOB apparel export from Port Qasim, Karachi to the United States.",
                },
              ].map((row) => (
                <div key={row.q} className="py-5">
                  <dt className="font-display text-base font-bold tracking-[-0.02em] text-cream">{row.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-cream/65">{row.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND ONE" }, { text: "SPECIFICATION." }]}
        body="A single style is enough to see how the process runs. We review it and come back with construction, materials and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "Quality assurance process", href: "/quality", description: "Where inspection happens and what is checked at each stage." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
          { label: "FOB export from Port Qasim", href: "/export", description: "Documentation, packing, carton marking and handover." },
        ]}
      />
    </>
  );
}
