import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Benchmark } from "@/components/sections/Benchmark";
import { ProductUniverse } from "@/components/sections/ProductUniverse";
import { DevelopmentTimeline } from "@/components/sections/DevelopmentTimeline";
import { QualityProcess } from "@/components/sections/QualityProcess";
import { ExportSection } from "@/components/sections/ExportSection";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apparel Manufacturer & FOB Exporter in Pakistan",
    description:
      "Karachi-based apparel manufacturing and FOB export for international uniform, workwear and sourcing programs.",
    path: "/",
  }),
  // The homepage is the canonical root; keep the title as written rather than
  // running it through the "%s | AHM International" template twice.
  title: "AHM International | Apparel Manufacturer, Pakistan",
};

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero */}  <Hero />
      {/* 02 · Credibility */}  <TrustStrip />
      {/* 04 · Benchmark a style */}  <Benchmark />
      {/* 05 · Products */}  <ProductUniverse />
      {/* 06 · Development */}  <DevelopmentTimeline />
      {/* 07 · Quality */}  <QualityProcess />
      {/* 09 · Export */}  <ExportSection />
      {/* 08 · Verified case study */}  <CaseStudyFeature />
      {/* 15 · Final CTA */}
      <CtaBand
        headingLines={[
          "WHAT ARE YOU",
          { text: "SOURCING NEXT?", className: "text-lime" },
        ]}
        body="Send AHM one existing or upcoming style and our team will review the product, material, construction, quantity and FOB opportunity."
        primary={{ label: "Benchmark a Style", href: "/benchmark-a-style" }}
        secondary={{ label: "Send Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
