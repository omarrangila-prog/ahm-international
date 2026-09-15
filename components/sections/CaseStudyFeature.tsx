import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { Button } from "@/components/ui/Button";
import { caseStudies, CASE_STUDY_NOTE } from "@/data/caseStudies";

/**
 * Anonymised proof.
 *
 * Presented as a technical record rather than a testimonial: category, material,
 * requirement, delivery mode. A sourcing manager trusts a spec sheet more than a
 * quote from an unnamed "happy client", and unlike a testimonial every line here
 * is documented.
 *
 * The customer is not identifiable anywhere in this section — the data model has
 * no field for their name.
 */

export function CaseStudyFeature() {
  const study = caseStudies[0];

  const rows = [
    { label: "Market", value: study.market },
    { label: "Category", value: study.category },
    { label: "Material", value: study.material },
    { label: "Requirement", value: study.requirement },
    { label: "Delivery", value: study.exportMode },
  ];

  return (
    <Section zone="paper" spacing="lg" aria-labelledby="proof-heading">
      <div className="shell-wide">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <MaskedHeading
              as="h2"
              id="proof-heading"
              className="mt-6 font-display text-h1 text-ink"
              lines={[{ text: "A documented" }, { text: "program, not a" }, { text: "testimonial." }]}
            />
            <p className="mt-7 max-w-md text-ink/70">
              We publish the specification and the shipping mode. We do not publish the customer.
              That is the same discretion your program would get.
            </p>

            <p className="mt-6 max-w-md border-l-2 border-ink/20 pl-4 text-sm text-ink/70">
              {CASE_STUDY_NOTE}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`/case-studies/${study.slug}`} size="lg" withArrow>
                See how we work
              </Button>
              <Button href="/case-studies" variant="outline" size="lg">
                All case studies
              </Button>
            </div>
          </div>

          {/* Technical record card */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block border border-ink/12 bg-paper shadow-[0_30px_70px_-50px_rgba(16,19,21,0.6)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {hasAsset("products.apron.front") && (
                  <div className="relative aspect-square w-full overflow-hidden bg-white">
                    <SmartImage
                      asset="products.apron.front"
                      sizes={SIZES.third}
                      className="h-full w-full"
                      imageClassName="object-contain p-8 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      alt="Bib apron of the type produced for the documented uniform program"
                    />
                    <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 label text-lime">
                      Documented
                    </span>
                  </div>
                  )}

                  <div className="flex flex-col justify-center p-6 sm:p-7">
                    <p className="label text-ink/65">Case study</p>
                    <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink">
                      {study.anonymisedTitle}
                    </h3>

                    <dl className="mt-6 flex flex-col">
                      {rows.map((row) => (
                        <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-ink/10 py-2.5">
                          <dt className="label text-ink/65">{row.label}</dt>
                          <dd className="text-[0.8125rem] leading-snug text-ink/80">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <p className="border-t border-ink/12 px-6 py-4 text-sm text-ink/65 sm:px-7">
                  {study.outcome}
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
