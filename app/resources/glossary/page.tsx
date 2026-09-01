import type { Metadata } from "next";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { glossary, glossaryGroups } from "@/data/glossary";

/**
 * SOURCING GLOSSARY
 * =================
 *
 * Spec §7 lists four resource sub-routes. This is the one that carries genuine
 * standalone value: the other three would each hold one or two of the five
 * published guides, which is the thin doorway-page pattern §61 forbids. They are
 * deferred until there is content to fill them — see docs/upgrade-plan.md.
 *
 * Server component, no filtering UI: a glossary is read by Ctrl-F and by
 * following cross-references, and a JS filter would break the first of those.
 * DefinedTermSet schema so the definitions are machine-readable.
 */

export const metadata: Metadata = pageMetadata({
  title: "Apparel Sourcing Glossary",
  description:
    "Plain definitions of the specification, materials, sampling, quality and export terms used in apparel sourcing — including the ones most often confused.",
  path: "/resources/glossary",
});

export default function GlossaryPage() {
  const sorted = [...glossary].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "Apparel Sourcing Glossary",
          hasDefinedTerm: sorted.map((t) => ({
            "@type": "DefinedTerm",
            name: t.term,
            description: t.definition,
          })),
        }}
      />

      <PageHero
        eyebrow="Glossary"
        headingLines={[
          { text: "The words a" },
          { text: "specification", className: "text-cobalt" },
          { text: "is written in." },
        ]}
        intro="Definitions of the terms used across apparel sourcing, and — where it matters more — the distinctions that are most often collapsed. A specification that means two things is the most expensive kind."
        trail={[
          { name: "Resources", path: "/resources" },
          { name: "Glossary", path: "/resources/glossary" },
        ]}
        zone="cream"
      />

      {glossaryGroups.map((group, i) => (
        <Section
          key={group}
          zone={i % 2 === 0 ? "cream" : "paper"}
          spacing="lg"
          aria-labelledby={`glossary-${group}`}
        >
          <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-3">
              <Eyebrow>{group}</Eyebrow>
              <h2
                id={`glossary-${group}`}
                className="mt-3 font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.03em] text-ink"
              >
                {group}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-9">
              <dl className="divide-y divide-ink/12 border-y border-ink/12">
                {glossary
                  .filter((t) => t.group === group)
                  .map((t) => (
                    <div key={t.term} className="py-6">
                      <dt
                        id={`term-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="font-display text-base font-bold uppercase tracking-tight text-ink"
                      >
                        {t.term}
                      </dt>
                      <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">
                        {t.definition}
                        {t.confusedWith && (
                          <span className="mt-3 block border-l-2 border-orange pl-3 text-ink/65">
                            <span className="label text-orange-deep">Often confused with</span>{" "}
                            <span className="block mt-1">{t.confusedWith}</span>
                          </span>
                        )}
                        {t.seeAlso && t.seeAlso.length > 0 && (
                          <span className="mt-3 block text-xs text-ink/65">
                            See also: {t.seeAlso.join(", ")}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      <RelatedLinks
        title="Related"
        zone="ivory"
        links={[
          { label: "Guides", href: "/resources", description: "Longer technical explainers for buyers and merchandisers." },
          { label: "Materials", href: "/materials", description: "Fabric families, weights and where each is normally specified." },
          { label: "Quality", href: "/quality", description: "The gates a program passes through before release." },
          { label: "FOB export", href: "/export", description: "What the trade term actually covers, and where risk transfers." },
        ]}
      />
    </>
  );
}
