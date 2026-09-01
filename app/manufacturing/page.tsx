import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { WorkflowMap } from "@/components/sections/WorkflowMap";
import { ManufacturingScroll } from "@/components/sections/ManufacturingScroll";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";

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

      {/* The nine stages, read in order rather than compared as a grid. See
          components/sections/ManufacturingScroll.tsx for why. */}
      <Section zone="ink" spacing="lg" tooth aria-labelledby="stages-heading">
        <div className="shell-wide">
          <Eyebrow>The nine stages</Eyebrow>
          <MaskedHeading
            as="h2"
            id="stages-heading"
            className="mt-5 max-w-3xl font-display text-h1 text-cream"
            lines={[{ text: "From your spec" }, { text: "to on board.", className: "text-lime" }]}
          />
          <p className="mt-6 max-w-xl text-cream/75">
            Read it in order. Each stage names what you receive and the failure that
            stage is prone to, because the point where a program stalls is almost
            always the point nobody was watching.
          </p>
          <div className="mt-14">
            <ManufacturingScroll />
          </div>
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
        guidesFor="/manufacturing"
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
