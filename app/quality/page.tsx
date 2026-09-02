import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { QualityProcess } from "@/components/sections/QualityProcess";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { QualityGates } from "@/components/sections/QualityGates";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { QUALITY_STANDARD_STATEMENT } from "@/data/process";
import { pageMetadata } from "@/lib/seo";
import { hasAsset } from "@/data/assets";

export const metadata: Metadata = pageMetadata({
  title: "Quality Assurance & Inspection",
  description:
    "Inspection across incoming material, pre-production, inline assembly, measurement, finishing and packing. Aligned to your standard.",
  path: "/quality",
});

const qualityFaqs = [
  {
    question: "What inspection standard do you work to?",
    answer:
      "Yours. Where your program specifies an inspection level, a defect classification or a third-party inspector, we work to it and confirm it in writing before production. We do not publish an inspection level as a general claim, because the only meaningful answer is the standard agreed for your order.",
  },
  {
    question: "Can we send our own or a third-party inspector?",
    answer:
      "Yes, and it is routine. The inspection standard is confirmed before production specifically so there is no disagreement about the criteria on the day of inspection.",
  },
  {
    question: "What happens if a batch fails inspection?",
    answer:
      "It depends where the failure was found. Inline checks exist so that a construction fault is caught while the batch can still be corrected. A failure found at final inspection is reworked or replaced, and the cause is traced back to the stage that let it through.",
  },
  {
    question: "How are measurements checked?",
    answer:
      "Against the approved size specification and its tolerance, by size, across the run rather than once at the start. Tolerances are agreed at development. A measurement chart without tolerance cannot be inspected against.",
  },
  {
    question: "Are you audited or certified?",
    answer:
      "Certification and audit status is confirmed in writing during commercial discussion. We do not display accreditations or audit scores on this site, because we publish only what we can evidence with a document.",
  },
];

export default function QualityPage() {
  return (
    <>
      <PageViewEvent event="quality_process_viewed" />
      <PageHero
        eyebrow="Quality assurance"
        headingLines={[{ text: "Inspection that" }, { text: "can still change", className: "text-ink" }, { text: "something." }]}
        intro="Quality control that only happens at the end can reject a shipment but cannot save one. Inspection runs across every point where a problem is still correctable."
        trail={[{ name: "Quality", path: "/quality" }]}
        zone="paper"
        asset="factory.qualityControl"
        priority
        primaryCta={{ label: "Discuss Your Standard", href: "/request-a-quote" }}
        secondaryCta={{ label: "See the process", href: "/manufacturing/quality-control" }}
      />

      <QualityProcess />

      <Section zone="paper" spacing="lg" aria-labelledby="standard-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Standards</Eyebrow>
            <MaskedHeading
              as="h2"
              id="standard-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Your standard" }, { text: "is the standard." }]}
            />
            <p className="mt-6 max-w-md text-lead text-ink/75">{QUALITY_STANDARD_STATEMENT}</p>
            <p className="mt-5 max-w-md text-ink/65">
              We publish no AQL level, audit score or certification on this site. Not because there
              is nothing to say, but because a claim without a document behind it is worth less than
              silence to a buyer who checks.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            {(() => {
              const shots = (["factory.fabricInspection", "development.measurement", "factory.finishing", "factory.packing"] as const).filter(hasAsset);
              if (shots.length === 0) {
                // No process photography yet. Rather than four empty frames, the
                // column carries the statement that belongs beside the timeline.
                return (
                  <div className="border-l-2 border-ink pl-6">
                    <p className="text-lead text-ink/80">
                      Every stage produces a record: an inspection sheet, a measurement report, a
                      packing verification. Those records are what a buyer can audit, not a
                      photograph of a factory floor.
                    </p>
                    <p className="mt-5 text-ink/70">
                      Documentation from your order is shared on request during production.
                    </p>
                  </div>
                );
              }
              return (
                <RevealGroup className="grid grid-cols-2 gap-3" stagger={0.06}>
                  {shots.map((asset) => (
                    <RevealItem key={asset}>
                      <div className="zoom-frame group aspect-[4/3] w-full overflow-hidden bg-paper">
                        <SmartImage asset={asset} sizes={SIZES.third} className="h-full w-full" imageClassName="object-cover" />
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              );
            })()}
          </div>
        </div>
      </Section>

      {/* Spec §19 — the nine gates, each with the record it produces and what a
          failure stops. Not collapsed: this is an argument, not a journey. */}
      <Section zone="paper" spacing="lg" aria-labelledby="gates-heading">
        <div className="shell-wide">
          <Eyebrow>Quality gates</Eyebrow>
          <h2
            id="gates-heading"
            className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            Nine gates, and what each one stops.
          </h2>
          <p className="mt-4 max-w-xl text-ink/65">
            A list of checks tells you what is looked at. What matters to a buyer is
            what happens when one of them fails, so every gate states its own stop
            condition.
          </p>
          <div className="mt-10">
            <QualityGates />
          </div>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="q-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="q-faq"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "About" }, { text: "inspection." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={qualityFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND US YOUR" }, { text: "INSPECTION STANDARD." }]}
        body="Tell us the level, the defect classification and whether a third-party inspector is involved. We confirm it in writing before production starts."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Quality control process", href: "/manufacturing/quality-control" }}
        zone="ink"
      />

      <RelatedLinks
        guidesFor="/quality"
        title="Explore next"
        links={[
          { label: "Quality control process", href: "/manufacturing/quality-control", description: "Stage-by-stage detail and what usually goes wrong." },
          { label: "Manufacturing process", href: "/manufacturing", description: "Nine stages from development to FOB handover." },
          { label: "Export packing", href: "/manufacturing/packing", description: "Assortment, ratio, marking and verification before sealing." },
        ]}
      />
    </>
  );
}
