import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import {
  buyerStories,
  getBuyerStory,
  BUYER_STORY_DISCLAIMER,
} from "@/data/buyerStories";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

export function generateStaticParams() {
  return buyerStories.map((story) => ({ slug: story.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const story = getBuyerStory(slug);
  if (!story) return {};
  return pageMetadata({
    title: story.seoTitle,
    description: story.seoDescription,
    path: `/resources/stories/${story.slug}`,
  });
}

export default async function BuyerStoryPage({ params }: Params) {
  const { slug } = await params;
  const story = getBuyerStory(slug);
  if (!story) notFound();

  const beats = [
    { title: "Situation", body: story.situation },
    { title: "Where it broke", body: story.failure },
    { title: "The correction", body: story.correction },
    { title: "Takeaway", body: story.takeaway },
  ];

  const titleWords = story.title.split(" ");
  const mid = Math.ceil(titleWords.length / 2);
  const headingLines = [
    { text: titleWords.slice(0, mid).join(" ") },
    { text: titleWords.slice(mid).join(" "), className: "text-ink" as const },
  ].filter((line) => line.text.length > 0);

  return (
    <>
      <ReadingProgress />
      <PageHero
        eyebrow={`Scenario · ${story.theme}`}
        headingLines={headingLines}
        intro={story.hook}
        trail={[
          { name: "Resources", path: "/resources" },
          { name: "Scenarios", path: "/resources/stories" },
          { name: story.title, path: `/resources/stories/${story.slug}` },
        ]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "All scenarios", href: "/resources/stories" }}
      />

      <Section zone="paper" spacing="md">
        <div className="shell-wide">
          <p className="max-w-3xl border-l-2 border-ink bg-ink/[0.03] py-4 pl-5 pr-4 text-sm leading-relaxed text-ink/70">
            {BUYER_STORY_DISCLAIMER}
          </p>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="scenario-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>The scenario</Eyebrow>
            <MaskedHeading
              as="h2"
              id="scenario-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What" }, { text: "happened." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <ol className="border-t border-line">
              {beats.map((beat, i) => (
                <li
                  key={beat.title}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7"
                >
                  <span className="numeral text-lg text-ink">{numeral(i + 1)}</span>
                  <div>
                    <h3 className="font-display text-h3 text-ink">{beat.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/70">
                      {beat.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section zone="ink" spacing="md">
        <div className="shell-wide">
          <p className="label text-lime">Not a case study</p>
          <p className="mt-4 max-w-2xl text-paper/80">
            For a documented manufacturing program with verified facts, see{" "}
            <Link
              href="/case-studies"
              className="text-lime underline decoration-lime/40 underline-offset-4 hover:decoration-lime"
            >
              case studies
            </Link>
            . Scenarios exist to teach; case studies exist to evidence.
          </p>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "COST THE" }, { text: "REAL SPEC." }]}
        body="Use the linked guides and tools, then send one style for commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "More scenarios", href: "/resources/stories" }}
        zone="lime"
      />

      <RelatedLinks title="Guides and tools" links={story.related} />
    </>
  );
}
