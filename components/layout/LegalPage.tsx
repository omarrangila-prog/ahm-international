import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { LEGAL_REVIEW_NOTICE, LEGAL_EFFECTIVE, type LegalSection } from "@/data/legal";
import { numeral } from "@/lib/utils";

/**
 * Shared layout for the legal pages.
 *
 * Set at a comfortable reading measure with numbered sections, because these are
 * documents people actually check — a procurement or legal reviewer will read
 * them properly, and burying the content in small grey type signals that the
 * publisher hoped nobody would.
 *
 * The review notice is part of the template rather than optional, so the draft
 * status cannot be lost by editing one page.
 */
export function LegalPage({
  eyebrow,
  headingLines,
  intro,
  path,
  sections,
}: {
  eyebrow: string;
  headingLines: { text: string; className?: string }[];
  intro: string;
  path: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        headingLines={headingLines}
        intro={intro}
        trail={[{ name: eyebrow, path }]}
        zone="cream"
      />

      <Section zone="cream" spacing="none">
        <div className="shell-wide pb-24">
          <div className="max-w-3xl">
            <div className="border-l-2 border-orange bg-ivory p-5 lg:p-6">
              <p className="label mb-2 text-ink/70">Draft. Pending legal review</p>
              <p className="text-sm leading-relaxed text-ink/75">{LEGAL_REVIEW_NOTICE}</p>
            </div>

            <p className="mt-6 label text-ink/70">Effective {LEGAL_EFFECTIVE}</p>

            <div className="mt-12 flex flex-col gap-12">
              {sections.map((section, i) => (
                <Reveal key={section.heading} as="section">
                  <div className="flex items-baseline gap-4">
                    <span className="numeral text-sm text-cobalt">{numeral(i + 1)}</span>
                    <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
                  </div>

                  <div className="mt-4 space-y-4 pl-9 text-[1.0625rem] leading-relaxed text-ink/75">
                    {section.body.map((paragraph, j) => (
                      <p key={j}>{paragraph}</p>
                    ))}

                    {section.list && (
                      <ul className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[0.6rem] h-1 w-1 shrink-0 bg-cobalt" aria-hidden="true" />
                            <span className="text-[0.9375rem]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "QUESTIONS ABOUT" }, { text: "YOUR DATA?" }]}
        body="Ask us directly. Requests about your enquiry, your specifications or your files reach the same team that handles quotations."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Request a quote", href: "/request-a-quote" }}
        zone="ink"
      />
    </>
  );
}
