import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CatalogueExplorer } from "@/components/products/CatalogueExplorer";
import { ProductIndex } from "@/components/products/ProductIndex";
import { QuoteReadiness } from "@/components/products/QuoteReadiness";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { productCategories } from "@/data/products";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Product Range",
  description:
    "Twelve apparel families made to buyer specification in Karachi: uniform and workwear, polos, fleece, aprons, woven shirts, bottoms, outerwear and more.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema({
          name: "Apparel product families",
          path: "/products",
          items: productCategories.map((c) => ({
            name: c.name,
            path: `/products/${c.slug}`,
            description: c.intro,
          })),
        })}
      />

      <PageHero
        eyebrow="Product range"
        headingLines={[
          { text: "Twelve families." },
          { text: "One specification", className: "text-cobalt" },
          { text: "standard." },
        ]}
        intro="Every article below is manufactured to a buyer's specification rather than sold from a catalogue. Pick the closest category and send what you have. A tech pack, a sample or a description."
        trail={[{ name: "Products", path: "/products" }]}
        zone="cream"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
      />

      {/* Twelve families as a list that opens in place, not twelve cards.
          See components/products/ProductIndex.tsx. */}
      <Section zone="cream" spacing="none" aria-labelledby="range-heading">
        <div className="shell-wide pb-24">
          <h2 id="range-heading" className="sr-only">
            Product categories
          </h2>
          <ProductIndex />
        </div>
      </Section>

      {/* What we need to quote. The most practically useful block on the page */}
      {/* Spec §11 — search and facets across every article, below the category grid.
          Categories answer "what does AHM make"; this answers "do they make mine". */}
      <Section zone="ivory" spacing="lg" aria-labelledby="catalogue-heading">
        <div className="shell-wide">
          <Eyebrow>Explore the range</Eyebrow>
          <h2
            id="catalogue-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            Find the article, then send the specification.
          </h2>
          <p className="mt-4 max-w-xl text-ink/65">
            Every article AHM documents, filtered by category, industry, branding route
            and capability. Nothing here is priced — the specification comes first.
          </p>
          <div className="mt-10">
            <CatalogueExplorer />
          </div>
        </div>
      </Section>

      <Section zone="ivory" spacing="lg" aria-labelledby="quote-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Before you send an RFQ</Eyebrow>
            <MaskedHeading
              as="h2"
              id="quote-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What we need" }, { text: "to quote." }]}
            />
            <p className="mt-6 text-ink/70">
              You do not need all of it. Send what you have and we will tell you what is
              missing — but a request carrying these answers gets an accurate quotation
              instead of a cautious one.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <QuoteReadiness />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "GIVE US" }, { text: "ONE STYLE." }]}
        body="Send a single article to benchmark. We review the specification and come back on construction, materials, decoration and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "Manufacturing capabilities", href: "/capabilities", description: "Every stage from development through to FOB handover." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
          { label: "Uniform program industries", href: "/industries", description: "How requirements change between grocery, hospitality, retail and industrial work." },
        ]}
      />
    </>
  );
}
