import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import Link from "next/link";
import { ContentBlocks, blockId } from "@/components/ui/ContentBlocks";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { guides, getGuide } from "@/data/guides";
import { REVIEWED_BY, LAST_REVIEWED } from "@/data/editorial";
import { pageMetadata, articleSchema } from "@/lib/seo";
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

function TocList({ items }: { items: { id: string; label: string }[] }) {
  return (
    <ol className="mt-3 space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className="inline-block min-h-6 text-ink/75 underline-offset-4 hover:text-ink hover:underline">
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  // Anchors match the ids ContentBlocks gives each section.
  const toc = [...guide.blocks.map((b) => ({ id: blockId(b.heading), label: b.heading })), { id: "guide-faq", label: "Related questions" }];

  const headingLines = guide.headline.split("\n").map((text, i) => ({
    text,
    className: i === 1 ? "text-ink" : undefined,
  }));

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={articleSchema({
          title: guide.title,
          description: guide.seoDescription,
          path: `/resources/${guide.slug}`,
          author: REVIEWED_BY,
          ...(guide.updated ? { dateModified: guide.updated.iso } : { reviewedBy: REVIEWED_BY, lastReviewed: LAST_REVIEWED }),
          section: guide.category,
        })}
      />

      <PageHero
        eyebrow={guide.category}
        headingLines={headingLines}
        intro={guide.intro}
        trail={[
          { name: "Resources", path: "/resources" },
          { name: guide.title, path: `/resources/${guide.slug}` },
        ]}
        zone="paper"
        asset={guide.heroAsset}
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      {/* Short answer */}
      <Section zone="paper" spacing="md">
        <div className="shell-wide">
          <div className="max-w-4xl border-l-2 border-ink pl-6 lg:pl-8">
            <p className="label text-ink/65">In short</p>
            <p className="mt-3 text-lead text-ink/80">{guide.summary}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
            <p className="label text-ink/65">{guide.readingTime}</p>
            {guide.updated ? (
              <>
                <p className="text-sm text-ink/65">Written by the {REVIEWED_BY}</p>
                <p className="text-sm text-ink/65">Updated {guide.updated.label}. Every worked figure is checked by automated tests.</p>
              </>
            ) : (
              <>
                <p className="text-sm text-ink/65">Reviewed by {REVIEWED_BY}</p>
                <p className="text-sm text-ink/65">Last reviewed {LAST_REVIEWED}</p>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section zone="paper" spacing="lg">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* On this page: a list on large screens, a disclosure on small ones. */}
          <nav aria-label="On this page" data-print="hide" className="col-span-12 lg:col-span-3">
            <details className="border border-line p-4 lg:hidden">
              <summary className="label min-h-6 cursor-pointer text-ink/70">On this page</summary>
              <TocList items={toc} />
            </details>
            <div className="hidden lg:sticky lg:top-28 lg:block">
              <p className="label text-ink/65">On this page</p>
              <TocList items={toc} />
            </div>
          </nav>
          <div className="col-span-12 lg:col-span-9">
            <ContentBlocks blocks={guide.blocks} />
          </div>
        </div>
      </Section>

      {guide.tools && guide.tools.length > 0 && (
        <Section zone="paper" spacing="md" aria-labelledby="guide-tools" data-print="hide">
          <div className="shell-wide">
            <Eyebrow>Work the numbers</Eyebrow>
            <h2 id="guide-tools" className="mt-4 font-display text-h2 text-ink">
              Try it on your own fabric.
            </h2>
            <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              {guide.tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="group flex h-full flex-col gap-2 bg-paper p-6 transition-colors hover:bg-white">
                    <span className="font-display text-lg font-bold tracking-[-0.025em] text-ink group-hover:underline">{tool.label}</span>
                    <span className="text-sm leading-relaxed text-ink/70">{tool.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section zone="paper" spacing="lg" aria-labelledby="guide-faq">
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
