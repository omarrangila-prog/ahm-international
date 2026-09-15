import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { CtaBand } from "@/components/sections/CtaBand";
import { caseStudies, CASE_STUDY_NOTE } from "@/data/caseStudies";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Documented Manufacturing Programs",
  description:
    "Anonymised manufacturing programs, including a documented FOB bib apron program shipped from Port Qasim to the United States.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        headingLines={[{ text: "Documented" }, { text: "programs, not", className: "text-ink" }, { text: "testimonials." }]}
        intro="We publish a program only where the facts are documented and the customer's identity is protected. That produces a shorter list than most supplier sites, and one where every line survives a question."
        trail={[{ name: "Case Studies", path: "/case-studies" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      <Section zone="paper" spacing="none">
        <div className="shell-wide pb-24">
          <div className="flex flex-col gap-6">
            {caseStudies.map((study) => (
              <Reveal key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group grid grid-cols-1 border border-line bg-paper transition-colors hover:bg-white sm:grid-cols-3"
                >
                  {hasAsset("products.apron.front") && (
                  <div className="aspect-square w-full overflow-hidden bg-white sm:aspect-auto">
                    <SmartImage
                      asset="products.apron.front"
                      sizes={SIZES.third}
                      className="h-full w-full"
                      imageClassName="object-contain p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      alt="Bib apron produced for a documented United States uniform program"
                    />
                  </div>
                  )}
                  <div className="p-7 sm:col-span-2 lg:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-ink px-2.5 py-1 label text-lime">Documented</span>
                      <span className="label text-ink/65">{study.market}</span>
                    </div>
                    <h2 className="mt-4 font-display text-h2 text-ink">{study.anonymisedTitle}</h2>
                    <p className="mt-4 max-w-xl text-ink/70">{study.requirement}</p>
                    <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-5 sm:grid-cols-3">
                      {[
                        { label: "Category", value: study.category },
                        { label: "Material", value: study.material },
                        { label: "Delivery", value: study.exportMode },
                      ].map((row) => (
                        <div key={row.label}>
                          <dt className="label text-ink/65">{row.label}</dt>
                          <dd className="mt-1.5 text-sm text-ink/80">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      Read the full program
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 max-w-2xl border-l-2 border-ink/20 pl-5">
            <p className="text-sm leading-relaxed text-ink/65">{CASE_STUDY_NOTE}</p>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "BE THE NEXT" }, { text: "PROGRAM." }]}
        body="Send one style. We will review the specification and come back on construction, materials and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
