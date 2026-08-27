import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { guides, getGuide } from "@/data/guides";
import { REVIEWED_BY, LAST_REVIEWED } from "@/data/editorial";
import { pageMetadata, articleSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/resources/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const headingLines = guide.headline.split("\n").map((text, i) => ({
    text,
    className: i === 1 ? "text-cobalt" : undefined,
  }));

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.seoDescription,
          path: `/resources/${guide.slug}`,
          reviewedBy: REVIEWED_BY,
          lastReviewed: LAST_REVIEWED,
          section: guide.category,
        })}
      />
      <JsonLd data={faqSchema(guide.faqs)} />

      <PageHero
        eyebrow={guide.category}
        headingLines={headingLines}
        intro={guide.intro}
        trail={[
          { name: "Resources", path: "/resources" },
          { name: guide.title, path: `/resources/${guide.slug}` },
        ]}
        zone="cream"
        asset={guide.heroAsset}
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      {/* Short answer */}
      <Section zone="ivory" spacing="md">
        <div className="shell-wide">
          <div className="max-w-4xl border-l-2 border-cobalt pl-6 lg:pl-8">
            <p className="label text-ink/60">In short</p>
            <p className="mt-3 text-lead text-ink/80">{guide.summary}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
            <p className="label text-ink/60">{guide.readingTime}</p>
            <p className="text-sm text-ink/60">Reviewed by {REVIEWED_BY}</p>
            <p className="text-sm text-ink/60">Last reviewed {LAST_REVIEWED}</p>
          </div>
        </div>
      </Section>

      <Section zone="cream" spacing="lg">
        <div className="shell-wide">
          <ContentBlocks blocks={guide.blocks} />
        </div>
      </Section>

      <Section zone="ivory" spacing="lg" aria-labelledby="guide-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Related questions</Eyebrow>
            <MaskedHeading as="h2" id="guide-faq" className="mt-5 font-display text-h1 text-ink" lines={[{ text: "Also" }, { text: "asked." }]} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={guide.faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "PUT IT INTO" }, { text: "PRACTICE." }]}
        body="Send one specification and we will apply exactly this thinking to your style. Construction, materials and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks title="Explore next" links={guide.related} />
    </>
  );
}
