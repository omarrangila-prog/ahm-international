import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
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
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-14">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Documented program</Eyebrow>
            <MaskedHeading
              as="h2"
              id="proof-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "A documented" }, { text: "program, not a" }, { text: "testimonial." }]}
            />
            <p className="mt-7 max-w-md text-lead text-ink/70">
              We publish the specification and the shipping mode. We do not publish the
              customer. That is the same discretion your program would get.
            </p>

            <p className="mt-6 max-w-md border-l-2 border-ink pl-5 text-sm leading-relaxed text-ink/70">
              {CASE_STUDY_NOTE}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`/case-studies/${study.slug}`} size="lg" withArrow>
                Read the program
              </Button>
              <Button href="/case-studies" variant="outline" size="lg">
                All case studies
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block border border-ink/15 bg-paper transition-colors duration-300 hover:bg-white"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {hasAsset("products.apron.front") && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-white p-8 sm:aspect-auto sm:min-h-full sm:p-10">
                      <SmartImage
                        asset="products.apron.front"
                        sizes={SIZES.third}
                        className="h-full w-full"
                        imageClassName="object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                        alt="Bib apron of the type produced for the documented uniform program"
                      />
                      <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 label text-lime">
                        Documented
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col justify-center border-t border-ink/10 p-7 sm:border-t-0 sm:border-l sm:p-8">
                    <p className="label text-ink/65">{study.market}</p>
                    <h3 className="mt-3 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-3xl">
                      {study.anonymisedTitle}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink/70">{study.category}</p>

                    <dl className="mt-8 flex flex-col border-t border-ink/12">
                      {rows.map((row) => (
                        <div
                          key={row.label}
                          className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-ink/10 py-3"
                        >
                          <dt className="label text-ink/65">{row.label}</dt>
                          <dd className="text-[0.8125rem] leading-snug text-ink/80">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <p className="border-t border-ink/12 bg-ink/[0.03] px-7 py-5 text-sm leading-relaxed text-ink/70 sm:px-8">
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
