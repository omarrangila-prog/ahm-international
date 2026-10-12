import { FilmBand } from "@/components/sections/FilmBand";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ManufacturingModel } from "@/components/sections/ManufacturingModel";
import { ProductUniverse } from "@/components/sections/ProductUniverse";
import { MaterialIntelligence } from "@/components/sections/MaterialIntelligence";
import { DevelopmentTimeline } from "@/components/sections/DevelopmentTimeline";
import { QualityProcess } from "@/components/sections/QualityProcess";
import { BuyerTrust } from "@/components/sections/BuyerTrust";
import { CaseStudyFeature } from "@/components/sections/CaseStudyFeature";
import { ExportSection } from "@/components/sections/ExportSection";
import { Benchmark } from "@/components/sections/Benchmark";
import { MiniRfqSection } from "@/components/sections/MiniRfqSection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Apron & Uniform Manufacturer in Pakistan",
    description:
      "Custom aprons, uniforms, workwear and private-label apparel made in Pakistan through AHM's own operations and specialist partners, supplied FOB.",
    path: "/",
  }),
  // Absolute — the root template is already "%s | AHM International". A string
  // title here would suffix the brand twice in the browser tab.
  title: { absolute: "AHM International | Apron & Uniform Manufacturer, Pakistan" },
};

/**
 * Homepage, in the order a sourcing manager decides.
 *
 * What AHM makes and where (hero), how it makes it (model, products, process,
 * quality), why to believe it (trust, the documented program, export), and a
 * low-commitment way to test it (benchmark, then the inquiry). The order and the
 * section titles follow the brief of 10 October 2026.
 *
 * The ground alternates so no more than two light sections run together: the
 * closing CtaBand was dropped because the inquiry section now is the close, and
 * two consecutive asks read as one too many.
 */
export default function HomePage() {
  return (
    <>
      {/* 01 · Hero */}                         <Hero />
      {/*      Capability strip */}             <TrustStrip />
      {/* 02 · Manufacturing model (ink) */}    <ManufacturingModel />
      {/*      Production film, once verified */} <FilmBand id="process" eyebrow="Production" />
      {/* 03 · Flagship products */}            <ProductUniverse />
      {/*      Material and construction */}    <MaterialIntelligence />
      {/* 04 · How we make your product */}     <DevelopmentTimeline />
      {/* 05 · Quality assurance */}            <QualityProcess />
      {/* 06 · Buyer trust */}                  <BuyerTrust />
      {/* 07 · Documented production */}       <CaseStudyFeature />
      {/*      FOB export (ink) */}             <ExportSection />
      {/* 08 · Benchmark a style */}            <Benchmark />
      {/* 09 · Inquiry and contact */}          <MiniRfqSection />
    </>
  );
}
