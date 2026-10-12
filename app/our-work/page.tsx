import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = pageMetadata({
  title: "Production Portfolio",
  description:
    "Apparel AHM International has manufactured, photographed from production: construction, fabric and decoration options for each article, with a quote request for any style.",
  path: "/our-work",
});

/**
 * Production portfolio. Every article here is a photograph of the article,
 * never a render (data/portfolio.ts), and the page does not exist until one
 * qualifies.
 */
export default function OurWorkPage() {
  const items = portfolioItems();
  if (items.length === 0) notFound();

  return (
    <>
      <PageHero
        eyebrow="Production portfolio"
        headingLines={[{ text: "Made by AHM." }, { text: "From" }, { text: "production." }]}
        intro="Articles from AHM's production, each with its construction, fabric and decoration options. Customer marks are kept out of frame, and no customer is named."
        trail={[{ name: "Our work", path: "/our-work" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote?source=portfolio" }}
        secondaryCta={{ label: "Benchmark a Style", href: "/benchmark-a-style" }}
      />

      <Section zone="paper" spacing="lg" aria-label="Portfolio">
        <ul className="shell-wide grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.asset} className="flex flex-col">
              <div className="bg-white">
                <SmartImage asset={item.asset} sizes={SIZES.third} fixedRatio imageClassName="object-contain" />
              </div>
              <p className="label mt-5 text-ink/70">
                <Link href={`/products/${item.category.slug}`} className="underline-offset-4 hover:underline">
                  {item.category.name}
                </Link>
              </p>
              <h2 className="mt-2 font-display text-h3 text-ink">{item.name}</h2>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="label text-ink/65">Construction</dt>
                  <dd className="mt-1 text-ink/80">{item.construction}</dd>
                </div>
                {item.fabric && (
                  <div>
                    <dt className="label text-ink/65">Fabric options</dt>
                    <dd className="mt-1 text-ink/80">{item.fabric}</dd>
                  </div>
                )}
                {item.decoration.length > 0 && (
                  <div>
                    <dt className="label text-ink/65">Customisation</dt>
                    <dd className="mt-1 text-ink/80">{item.decoration.join(", ")}</dd>
                  </div>
                )}
              </dl>
              <Link
                href={`/request-a-quote?category=${encodeURIComponent(item.category.name)}&style=${encodeURIComponent(item.name)}&source=portfolio`}
                className="mt-5 inline-flex min-h-11 items-center self-start font-display text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                Request quote for this style
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND ONE" }, { text: "SPECIFICATION." }]}
        body="Send the article, fabric, quantity and destination port for an FOB costing against your specification."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote?source=portfolio" }}
        secondary={{ label: "Benchmark a Style", href: "/benchmark-a-style" }}
        zone="lime"
      />
    </>
  );
}
