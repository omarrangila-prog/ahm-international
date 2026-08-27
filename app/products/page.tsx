import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CatalogueExplorer } from "@/components/products/CatalogueExplorer";
import { ProductCard } from "@/components/products/ProductCard";
import { SpecTable } from "@/components/ui/SpecTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { SIZES } from "@/components/ui/SmartImage";
import { productCategories } from "@/data/products";
import { pageMetadata, itemListSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import type { AssetKey } from "@/data/assets";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Product Range",
  description:
    "Seven apparel families made to buyer specification in Karachi: uniform and workwear, knits, aprons, woven shirts, bottoms and outerwear.",
  path: "/products",
});

/** Zone and render paired per category so every card keeps its contrast. */
/**
 * Card art overrides. A category already carries its own `zone` and `heroAsset`,
 * so this map exists only where the card wants a different image from the page
 * hero — typically a clean render rather than a photograph. Anything absent
 * falls back to the category, which is why adding a category cannot break this
 * page.
 */
const cardVisuals: Record<string, { zone: string; asset: AssetKey; secondary?: AssetKey }> = {
  "uniform-workwear": { zone: "forest", asset: "renders.workJacket", secondary: "products.wovenShirt.front" },
  "polos-tshirts": { zone: "cobalt", asset: "photo.poloWhiteTipped", secondary: "products.polo.front" },
  "fleece-sweatshirts": { zone: "plum", asset: "photo.hoodieNavy", secondary: "products.fleece.front" },
  aprons: { zone: "orange", asset: "products.apron.front", secondary: "products.apron.front" },
  "woven-shirts": { zone: "sky", asset: "renders.utilityWorkShirt", secondary: "products.wovenShirt.front" },
  bottoms: { zone: "sand", asset: "renders.workTrouser", secondary: "products.bottoms.front" },
  outerwear: { zone: "ink", asset: "photo.zipHoodieNavy", secondary: "products.outerwear.front" },
  "hospitality-food-service": { zone: "plum", asset: "renders.chefCoat", secondary: "products.apron.front" },
  denim: { zone: "ink", asset: "photo.denimWorkShirt", secondary: "photo.denimUtilityJacket" },
  athleisure: { zone: "sky", asset: "photo.joggerGreyGraphic", secondary: "photo.hoodieHeatherGraphic" },
  womenswear: { zone: "orange", asset: "photo.poloCream", secondary: "photo.hoodiePinkGraphic" },
  kidswear: { zone: "sand", asset: "photo.onesieWhitePrint", secondary: "photo.onesieWhiteText" },
};

/** What AHM needs in order to quote anything, regardless of category. */
const quoteRequirements = [
  { label: "Article", value: "What the garment is, and a reference or sketch if you have one" },
  { label: "Construction", value: "Tech pack, an existing garment, or a written description" },
  { label: "Fabric", value: "Composition and weight, or the requirement it has to meet" },
  { label: "Quantity", value: "Per style and per colour, even approximately" },
  { label: "Colours", value: "How many, and against what reference" },
  { label: "Sizes", value: "Size range and your measurement specification if one exists" },
  { label: "Decoration", value: "Embroidery, print or labels, with artwork where available" },
  { label: "Packing", value: "Folded or hanging, ratio or solid pack, carton marking" },
  { label: "Destination", value: "Port and target delivery window" },
  { label: "Target price", value: null },
];

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

      <Section zone="cream" spacing="none" aria-labelledby="range-heading">
        <div className="shell-wide pb-24">
          <h2 id="range-heading" className="sr-only">
            Product categories
          </h2>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {productCategories.map((category) => {
              const visual =
                cardVisuals[category.slug] ??
                { zone: category.zone, asset: category.heroAsset };
              return (
                <RevealItem key={category.slug}>
                  <ProductCard
                    index={category.index}
                    name={category.name}
                    href={`/products/${category.slug}`}
                    zone={visual.zone}
                    items={category.subcategories.slice(0, 4)}
                    asset={visual.asset}
                    secondaryAsset={visual.secondary}
                    capabilityStatus={category.capabilityStatus}
                    sizes={SIZES.third}
                    className="h-full min-h-[28rem]"
                  />
                </RevealItem>
              );
            })}
          </RevealGroup>
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
              You do not need all of it. Send what you have and we will tell you what is missing. 
              but a request carrying these answers gets an accurate quotation instead of a cautious
              one.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <SpecTable rows={quoteRequirements} />
            <p className="mt-6 text-xs text-ink/70">
              A target price is genuinely useful and is not used against you. It tells us which
              fabric and construction options are worth presenting.
            </p>
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
