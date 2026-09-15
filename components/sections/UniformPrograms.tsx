import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SIZES } from "@/components/ui/SmartImage";
import { IndustryCard } from "@/components/products/IndustryCard";
import { ArrowLink } from "@/components/ui/Button";
import { industries, performanceOptions, PERFORMANCE_DISCLAIMER } from "@/data/industries";

/**
 * Uniform program expertise.
 *
 * The distinction this section is making — garments versus programs — is the one
 * that separates a factory from a supplier a buyer will consolidate spend with.
 *
 * The imagery shows environments, never customers. Nothing here names an
 * organisation, and the photography brief for these slots excludes logos and
 * branding so that stays true when the real images land.
 */

export function UniformPrograms() {
  const featured = industries.slice(0, 4);

  return (
    <Section zone="ink" spacing="lg" tooth aria-labelledby="programs-heading">
      <div className="shell-wide relative z-10">
        <div className="max-w-4xl">
          <MaskedHeading
              as="h2"
              id="programs-heading"
              className="mt-6 font-display text-display text-paper"
              lines={[{ text: "NOT JUST GARMENTS." }, { text: "UNIFORM PROGRAMS.", className: "text-lime" }]}
            />
          <p className="mt-7 max-w-2xl text-lead text-paper/70">
              A program is a set of articles that has to match each other, match last year&apos;s
              delivery, and keep matching after industrial laundering. That is a different problem
              from making one good garment, and it is the one we are set up for.
            </p>
        </div>

        {/* Environments */}
        <RevealGroup className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.08}>
          {featured.map((industry) => (
            <RevealItem key={industry.slug}>
              <Link href={`/industries/${industry.slug}`} className="block">
                <IndustryCard industry={industry} tone="dark" sizes={SIZES.quarter} />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Full industry list */}
        <Reveal className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <li key={`chip-${industry.slug}`}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="inline-flex min-h-11 items-center border border-paper/20 px-3.5 py-2.5 text-xs text-paper/75 transition-colors hover:border-lime hover:text-lime"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Performance options */}
        <div className="mt-20 grid grid-cols-12 gap-y-8 border-t border-paper/15 pt-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <h3 className="font-display text-h2 text-paper">
              Performance is specified,
              <span className="block text-paper/65">not promised.</span>
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <RevealGroup className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2" stagger={0.05}>
              {performanceOptions.map((option) => (
                <RevealItem key={option.name}>
                  <div className="border-l border-lime/40 pl-4">
                    <p className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-paper">
                      {option.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-paper/70">{option.note}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <p className="mt-9 max-w-2xl border-t border-paper/15 pt-5 text-xs text-paper/65">
              {PERFORMANCE_DISCLAIMER}
            </p>

            <div className="mt-7">
              <ArrowLink href="/products/uniform-workwear" className="text-lime">
                Explore uniform &amp; workwear
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
