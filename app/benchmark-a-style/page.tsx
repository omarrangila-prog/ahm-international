import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Benchmark } from "@/components/sections/Benchmark";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/data/sourcing";

/**
 * BENCHMARK A STYLE
 * =================
 *
 * Master spec §24. The configurator already existed as a homepage section; what it
 * did not have was a URL — so it could not be linked from an email, put in a
 * signature, run as a campaign destination or measured as a landing page.
 *
 * This route reuses the same component rather than forking it. One configurator,
 * two placements: the homepage section catches passing traffic, this page catches
 * intent that arrives already knowing what it wants.
 */

export const metadata: Metadata = pageMetadata({
  title: "Benchmark a Style",
  description:
    "Send one current or upcoming style. AHM reviews the construction, material, quantity and development requirements, and returns a commercial FOB evaluation.",
  path: "/benchmark-a-style",
});

const blocks: ContentBlock[] = [
  {
    type: "list",
    heading: "What a benchmark actually tells you",
    intro:
      "This is a test of a supplier, run at low cost, before you commit a program to one. You learn four things.",
    items: [
      {
        term: "Whether the construction is understood",
        detail:
          "The questions a factory asks about a style reveal more than any capability deck. Vague questions mean vague sampling later.",
      },
      {
        term: "Where the material actually lands",
        detail:
          "Composition, weight, construction and finish against what your current supplier ships — with options where the requirement can be met more than one way.",
      },
      {
        term: "What development the style needs",
        detail:
          "Pattern work, trims, decoration route and how many sample rounds are realistic before an approved sealed sample.",
      },
      {
        term: "Whether the commercial case is real",
        detail:
          "An honest FOB evaluation at your quantity, or a straight answer that the style is not competitive here. The second answer is worth more than a hopeful first one.",
      },
    ],
  },
  {
    type: "callout",
    heading: "Why one style, and not a catalogue",
    body:
      "Benchmarking a whole range wastes both sides' time before trust exists. One style — ideally one you are currently buying, so you can compare against a known number — is enough to judge whether the development conversation is worth continuing.",
  },
  {
    type: "callout",
    heading: "No price is estimated here",
    body:
      "The configurator produces a specification, not a quotation. A price that arrives before anyone has read a tech pack is a number chosen to win an enquiry, and it moves the moment costing is done properly. AHM prices after reviewing the specification.",
  },
];

export default function BenchmarkAStylePage() {
  return (
    <>
      <PageHero
        eyebrow="Benchmark a style"
        headingLines={[
          { text: "Give us one style" },
          { text: "to benchmark.", className: "text-ink" },
        ]}
        intro="Send one current or upcoming style. Share the tech pack, reference, quantity, material requirement and target delivery, and AHM will evaluate the development and commercial FOB opportunity."
        trail={[{ name: "Benchmark a Style", path: "/benchmark-a-style" }]}
        zone="paper"
      />

      <Benchmark />

      <Section zone="paper">
        <div className="shell-wide max-w-3xl">
          <ContentBlocks blocks={blocks} />
        </div>
      </Section>

      <RelatedLinks
        title="Related"
        zone="paper"
        links={[
          {
            label: "Send a tech pack",
            href: "/send-tech-pack",
            description: "Already have the specification? Upload it and skip the configurator.",
          },
          {
            label: "Request an FOB quote",
            href: "/request-a-quote",
            description: "For a defined style, quantity and delivery requirement.",
          },
          {
            label: "Product development",
            href: "/development",
            description: "How a brief becomes an approved sealed sample.",
          },
          {
            label: "Materials",
            href: "/materials",
            description: "Fabric families, weights and where each is normally used.",
          },
        ]}
      />
    </>
  );
}
