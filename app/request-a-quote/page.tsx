import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RfqForm } from "@/components/forms/RfqForm";
import { Faq } from "@/components/ui/Faq";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { commercialAnswers } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request an FOB Quote",
  description:
    "Send a specification and get costed against it. Seven short steps covering product, material, decoration, terms and tech pack upload.",
  path: "/request-a-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        headingLines={[{ text: "LET'S COST" }, { text: "YOUR NEXT", className: "text-cobalt" }, { text: "PROGRAM." }]}
        intro="Six required fields across seven short steps. Send what you have. A tech pack if you have one, a description if you do not, and we will tell you what is missing before we quote."
        trail={[{ name: "Request a Quote", path: "/request-a-quote" }]}
        zone="cream"
      />

      <Section zone="cream" spacing="none">
        <div className="shell-wide grid grid-cols-12 gap-y-12 pb-24 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8">
            <Suspense
              fallback={
                <div className="border border-ink/15 bg-cream p-10">
                  <p className="label text-ink/60">Loading the quote form…</p>
                </div>
              }
            >
              <RfqForm />
            </Suspense>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="border border-line bg-ivory p-6">
                <h2 className="font-display text-h3 text-ink">What happens next</h2>
                <ol className="mt-5 flex flex-col gap-4">
                  {[
                    { title: "We read it properly", body: "A person reviews the specification, not an autoresponder." },
                    { title: "We list what's missing", body: "Before quoting, so the price is not padded for unknowns." },
                    { title: "We come back with a position", body: "Construction, materials, decoration and commercial FOB costing." },
                  ].map((item, i) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="numeral text-sm text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="block font-display text-sm font-bold tracking-[-0.015em] text-ink">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm text-ink/60">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 border-t border-line pt-4 text-xs text-ink/70">
                  We do not publish a response timeframe we have not committed to. Your enquiry is
                  reviewed by the commercial team.
                </p>
              </div>

              <div className="mt-4 border border-line bg-cream p-6">
                <p className="label text-ink/60">Confidentiality</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Tech packs, specifications and commercial terms are treated as confidential. This
                  site publishes no customer name, and our one published case study is anonymised.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section zone="ivory" spacing="lg" aria-labelledby="rfq-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Before you send</Eyebrow>
            <MaskedHeading as="h2" id="rfq-faq" className="mt-5 font-display text-h1 text-ink" lines={[{ text: "Straight" }, { text: "answers." }]} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={commercialAnswers} />
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="Useful before quoting"
        links={[
          { label: "Tech pack checklist", href: "/development", description: "What a complete apparel tech pack contains, and the gaps we most often find." },
          { label: "How FOB pricing works", href: "/fob-apparel-manufacturing", description: "What an FOB price includes and which levers move it." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and applications." },
        ]}
      />
    </>
  );
}
