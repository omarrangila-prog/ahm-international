import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ExportSection } from "@/components/sections/ExportSection";
import { ExportGlobe } from "@/components/sections/ExportGlobe";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { hasAsset } from "@/data/assets";
import { markets, MARKET_STATEMENT, ORIGIN } from "@/data/markets";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Export from Pakistan",
  description:
    "Where AHM ships from, which markets are documented versus targeted, and what FOB covers up to handover at Port Qasim, Karachi.",
  path: "/export",
});

const exportFaqs = [
  {
    question: "Which markets has AHM exported to?",
    answer:
      "AHM has documented FOB apparel export experience from Port Qasim, Karachi to the United States. Other markets shown on this site are target buyer markets and are labelled as such. They are not presented as shipment history.",
  },
  {
    question: "Do you have offices in our country?",
    answer:
      "No. AHM International manufactures in Pakistan and supplies buyers internationally. We do not operate a local office in any buyer market, and we do not claim one.",
  },
  {
    question: "Who arranges the freight?",
    answer:
      "You do. Under FOB the forwarder is normally the buyer's nomination, and we coordinate the booking and document release with them.",
  },
  {
    question: "How long does export documentation take?",
    answer:
      "Documentation is prepared alongside packing rather than after it, so it is ready when the shipment is. The binding constraint is usually vessel booking rather than paperwork.",
  },
];

export default function ExportPage() {
  return (
    <>
      <PageViewEvent event="export_process_viewed" />
      <PageHero
        eyebrow="FOB export"
        headingLines={[{ text: "Documented FOB" }, { text: "from Port Qasim.", className: "text-cobalt" }]}
        intro="AHM International has documented FOB apparel export experience from Port Qasim, Karachi to the United States. Everything up to loading on board is ours; freight and insurance from that point are yours."
        trail={[{ name: "Export", path: "/export" }]}
        zone="cream"
        asset="export.containerLoading"
        priority
        primaryCta={{ label: "Discuss an FOB Program", href: "/request-a-quote" }}
        secondaryCta={{ label: "How FOB works", href: "/fob-apparel-manufacturing" }}
      />

      <ExportSection />

      {/* Markets */}
      <Section zone="forest" spacing="lg" tooth aria-labelledby="markets-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-14 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5 lg:self-center">
            <Eyebrow>Markets</Eyebrow>
            <MaskedHeading
              as="h2"
              id="markets-heading"
              className="mt-5 font-display text-h1 text-cream"
              lines={[{ text: "Documented," }, { text: "and targeted.", className: "text-lime" }]}
            />
            <p className="mt-6 text-cream/75">
              We separate the two deliberately. One is a shipment we can evidence; the rest are
              markets we sell into. A map covered in invented destinations is the fastest way for a
              supplier to lose a buyer&apos;s trust.
            </p>
            <p className="mt-5 text-sm text-cream/70">
              So the globe draws one lane, not five: {ORIGIN.port}, Karachi to the United States.
              The markets below it are listed, not plotted.
            </p>
            <p className="mt-5 text-sm text-cream/70">{MARKET_STATEMENT}</p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ExportGlobe />
          </div>

          <div className="col-span-12">
            <ul className="border-t border-cream/20">
              {markets.map((market) => (
                <li key={market.code} className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/20 py-5">
                  <div className="flex items-center gap-4">
                    <span className="numeral w-9 text-sm text-cream/70">{market.code}</span>
                    <div>
                      <p className="font-display text-base font-bold tracking-[-0.02em] text-cream">
                        {market.name}
                      </p>
                      <p className="text-xs text-cream/70">Representative hub. {market.hub}</p>
                    </div>
                  </div>
                  <span
                    className={
                      market.documentedExport
                        ? "border border-lime bg-lime px-3 py-1.5 label text-ink"
                        : "border border-cream/40 px-3 py-1.5 label text-cream/75"
                    }
                  >
                    {market.documentedExport ? "Documented export" : "Target market"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Packing and marking imagery */}
      <Section zone="ivory" spacing="lg" aria-labelledby="packing-heading">
        <div className="shell-wide">
          <Eyebrow>Packing and dispatch</Eyebrow>
          <MaskedHeading
            as="h2"
            id="packing-heading"
            className="mt-5 font-display text-h1 text-ink"
            lines={[{ text: "Cartons that match" }, { text: "the packing list." }]}
          />
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.06}>
            {(["factory.packing", "export.cartonMarking", "export.warehouse", "export.containerLoading"] as const)
              .filter(hasAsset)
              .map((asset) => (
                <RevealItem key={asset}>
                  <div className="zoom-frame group aspect-[4/3] w-full overflow-hidden bg-cream">
                    <SmartImage asset={asset} sizes={SIZES.quarter} className="h-full w-full" imageClassName="object-cover" />
                  </div>
                </RevealItem>
              ))}
          </RevealGroup>
        </div>
      </Section>

      <Section zone="cream" spacing="lg" aria-labelledby="exp-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading as="h2" id="exp-faq" className="mt-5 font-display text-h1 text-ink" lines={[{ text: "About" }, { text: "export." }]} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={exportFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "DISCUSS AN" }, { text: "FOB PROGRAM." }]}
        body="Send the article, quantity and destination port. We will come back with an FOB position against your specification."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "FOB export process", href: "/manufacturing/fob-export" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "FOB apparel manufacturing explained", href: "/fob-apparel-manufacturing", description: "FOB compared with EXW and CIF, and who carries what." },
          { label: "Apparel exporter in Pakistan", href: "/apparel-exporter-pakistan", description: "Export workflow and documentation from Karachi." },
          { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB program, anonymised." },
        ]}
      />
    </>
  );
}
