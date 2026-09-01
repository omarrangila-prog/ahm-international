import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { getSourcingPillar } from "@/data/sourcing";
import { pageMetadata } from "@/lib/seo";
import { REVIEWED_BY, LAST_REVIEWED } from "@/data/editorial";


/**
 * SOURCING PILLAR RENDERER
 * ========================
 *
 * Brief §38 wants these at keyword-first root URLs (`/apparel-manufacturer-pakistan`)
 * rather than nested under `/sourcing/`. Rather than a root `[slug]` catch-all —
 * which would silently shadow every future static route — each pillar gets an
 * explicit root page file, and they all render through here.
 *
 * `basePath` exists so the breadcrumb and canonical describe the URL actually
 * being served. Two URLs rendering one component must not claim the same canonical.
 */

export function pillarMetadata(slug: string, basePath: string) {
  const pillar = getSourcingPillar(slug);
  if (!pillar) return {};
  return pageMetadata({
    title: pillar.seoTitle,
    description: pillar.seoDescription,
    path: basePath,
  });
}

export function SourcingPillar({ slug, basePath }: { slug: string; basePath: string }) {
  const pillar = getSourcingPillar(slug);
  if (!pillar) notFound();

  const headingLines = pillar.headline.split("\n").map((text, i) => ({
    text,
    className: i === 1 ? "text-cobalt" : undefined,
  }));

  // The URL is root-level for keyword weight, but in the site's information
  // architecture these are children of the /sourcing hub, which links to all of
  // them. Breadcrumbs describe that hierarchy rather than the URL depth.
  const trail = [
    { name: "Sourcing", path: "/sourcing" },
    { name: pillar.seoTitle.split(". ")[0], path: basePath },
  ];

return (
    <>
      <ReadingProgress />

      <PageHero
        eyebrow={pillar.eyebrow}
        headingLines={headingLines}
        intro={pillar.intro}
        trail={trail}
        zone="cream"
        asset={pillar.heroAsset}
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
      />

      {/* Short answer */}
      <Section zone="ivory" spacing="md">
        <div className="shell-wide">
          <div className="max-w-4xl border-l-2 border-cobalt pl-6 lg:pl-8">
            <h2 className="font-display text-h3 text-ink">{pillar.definition.question}</h2>
            <p className="mt-4 text-lead text-ink/80">{pillar.definition.answer}</p>
          </div>
        </div>
      </Section>

      {/* Body */}
      <Section zone="cream" spacing="lg">
        <div className="shell-wide">
          <ContentBlocks blocks={pillar.blocks} />
        </div>
      </Section>

      {/* FAQ */}
      <Section zone="ivory" spacing="lg" aria-labelledby="pillar-faq-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="pillar-faq-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Common" }, { text: "questions." }]}
            />
            <div className="mt-8 border-t border-line pt-5">
              <p className="label text-ink/60">Reviewed by</p>
              <p className="mt-2 text-sm text-ink/70">{REVIEWED_BY}</p>
              <p className="mt-1 text-xs text-ink/60">Last reviewed {LAST_REVIEWED}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={pillar.faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND ONE" }, { text: "SPECIFICATION." }]}
        body="One style is enough to evaluate a supplier. We review it and come back on construction, materials, decoration and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks title="Explore next" links={pillar.related} />
    </>
  );
}
