import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { company, displayValue } from "@/data/company";
import {
  capabilityMatrix,
  hybridBenefits,
  buyerQuestions,
} from "@/data/manufacturing-network";

export const metadata: Metadata = pageMetadata({
  title: "Own and Partner Manufacturing Network",
  description:
    "How AHM International combines its own manufacturing with specialist partner factories, and a capability matrix for every product family.",
  path: "/manufacturing-network",
});

/**
 * The manufacturing network.
 *
 * AHM makes garments in its own operations and through specialist partner
 * factories. This page exists to make that plain, because the commonest way a
 * sourcing company misleads a buyer is by letting a partner's floor be read as
 * its own. So the page says which is which wherever it is known, says it is
 * not published wherever it is not, and gives the buyer the four questions
 * that settle it for their own order.
 *
 * Nothing here describes a partner factory as AHM's, gives a location, size,
 * machine list or capacity for either, or describes a procedure (how partners
 * are chosen, when the facility is disclosed): none of those has been supplied.
 * Where a procedure would go, the page gives the buyer the question to ask.
 */

const facilityFacts = [
  // Not company.streetAddress: the office address is not necessarily where the
  // factory is, and reusing it would publish a facility location by accident.
  { label: "Location of the facility", value: "Available on request" },
  { label: "Floor area", value: displayValue(company.facilitySize) },
  { label: "Machinery", value: displayValue(company.machineCount) },
  { label: "Monthly capacity", value: displayValue(company.monthlyCapacity) },
];

// Columns appear when at least one row has a real value. Twelve identical
// "available after review" cells say less than one sentence above the table.
const showRoute = capabilityMatrix.some((r) => r.routeKnown);

const faqs = [
  {
    question: "Does AHM International own a factory?",
    answer:
      "AHM runs its own manufacturing operations and also works with specialist partner factories. Ask which of them would produce your order: it is a fair question to put to any supplier, and the answer belongs in writing before an order is placed.",
  },
  {
    question: "Is a partner factory part of AHM?",
    answer:
      "No. A partner factory is an independent business that AHM works with for particular products or requirements. This site never describes one as AHM's own facility.",
  },
  {
    question: "Why not make everything in one factory?",
    answer:
      "Because no single floor is the right one for every article. An apron, a fleece and a woven shirt use different machines and different skills; matching each article to an operation equipped for it is what the model is for.",
  },
  {
    question: "Who do I deal with if something goes wrong?",
    answer:
      "AHM International. Your commercial relationship, your approved sample and your specification are held by AHM whichever facility makes the bulk.",
  },
];

export default function ManufacturingNetworkPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing network"
        headingLines={[{ text: "One partner." }, { text: "Multiple production" }, { text: "capabilities." }]}
        intro={company.manufacturingModel.summary}
        trail={[{ name: "Manufacturing network", path: "/manufacturing-network" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "See the matrix", href: "#matrix" }}
        facts={[
          { label: "Own operations", value: "Yes" },
          { label: "Specialist partners", value: "Yes" },
          { label: "Commercial model", value: "FOB" },
          { label: "Documented lane", value: "Pakistan → United States" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* The two kinds of production, side by side                          */}
      {/* ---------------------------------------------------------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="model-heading">
        <div className="shell-wide">
          <div className="max-w-3xl">
            <Eyebrow>The model</Eyebrow>
            <MaskedHeading
              as="h2"
              id="model-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Own manufacturing." }, { text: "Specialist partners." }, { text: "One program." }]}
            />
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
            <article className="bg-paper p-8 lg:p-10" aria-labelledby="own-heading">
              <p className="label text-ink/65">01</p>
              <h3 id="own-heading" className="mt-4 font-display text-h3 text-ink">
                AHM&apos;s own operations
              </h3>
              <p className="mt-4 max-w-prose text-ink/75">
                AHM International runs its own manufacturing. This is the part of the network AHM operates
                directly: development, production and quality coordination under its own management.
              </p>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {facilityFacts.map((f) => (
                  <div key={f.label} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                    <dt className="text-sm text-ink/70">{f.label}</dt>
                    <dd className="text-sm font-medium text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ink/70">
                Photographs of the facility are not published yet. Figures above are given during commercial
                discussion rather than printed without the evidence behind them, and a visit or your own
                inspection agency is the reliable way to see the floor.
              </p>
            </article>

            <article className="bg-paper p-8 lg:p-10" aria-labelledby="partner-heading">
              <p className="label text-ink/65">02</p>
              <h3 id="partner-heading" className="mt-4 font-display text-h3 text-ink">
                Specialist partner factories
              </h3>
              <p className="mt-4 max-w-prose text-ink/75">
                AHM also works with specialist partner factories for additional product categories, particular
                manufacturing requirements and export orders that suit an operation equipped for them.
              </p>
              <ul className="mt-8 space-y-4 border-t border-line pt-6">
                <li className="text-sm leading-relaxed text-ink/75">
                  <span className="font-medium text-ink">They are not AHM&apos;s facilities.</span> A partner is an
                  independent business, and this site never describes one as company-owned.
                </li>
                <li className="text-sm leading-relaxed text-ink/75">
                  <span className="font-medium text-ink">Your agreement is with AHM.</span> The specification,
                  the approved sample and the commercial relationship stay with AHM whichever floor makes the bulk.
                </li>
                <li className="text-sm leading-relaxed text-ink/75">
                  <span className="font-medium text-ink">Which partner makes which article</span> is not published.
                  Ask about your own order before you place it.
                </li>
              </ul>
            </article>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why it is set up this way                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section zone="ink" spacing="lg" tooth aria-labelledby="why-heading">
        <div className="shell-wide relative z-10">
          <div className="max-w-3xl">
            <Eyebrow>Why a network</Eyebrow>
            <MaskedHeading
              as="h2"
              id="why-heading"
              className="mt-5 font-display text-h1 text-paper"
              lines={[{ text: "What it changes" }, { text: "for the buyer.", className: "text-lime" }]}
            />
          </div>
          <ul className="mt-14 grid grid-cols-1 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {hybridBenefits.map((b) => (
              <li key={b.title} className="bg-ink p-7">
                <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-paper">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{b.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-paper/70">
            None of these is a capacity, quality or lead-time promise. Those depend on your specification,
            and belong in the quotation rather than on a web page.
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Capability matrix                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section zone="paper" spacing="lg" id="matrix" aria-labelledby="matrix-heading">
        <div className="shell-wide">
          <div className="grid grid-cols-12 gap-y-6 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow>Capability matrix</Eyebrow>
              <MaskedHeading
                as="h2"
                id="matrix-heading"
                className="mt-5 font-display text-h1 text-ink"
                lines={[{ text: "What is made," }, { text: "and on what basis." }]}
              />
            </div>
            <div className="col-span-12 space-y-4 text-ink/75 lg:col-span-7 lg:pt-10">
              <p>
                Every product family, with its track record, the fabrics it is made in and the decoration it
                takes. <strong className="font-semibold text-ink">Documented export production</strong> means a
                published, documented program; <strong className="font-semibold text-ink">current capability</strong>{" "}
                means AHM makes the product class today; <strong className="font-semibold text-ink">development
                available</strong> means it starts with a development sample.
              </p>
              {!showRoute && (
                <p>
                  Whether a family is made in AHM&apos;s own operations or at a partner is not published yet, so
                  the table does not guess. Capacity and minimum quantity are available after specification review:
                  they depend on fabric, colour count and decoration, and a figure given without them would be a
                  guess too.
                </p>
              )}
            </div>
          </div>

          {/* One table, restyled as cards below md. A second, mobile-only copy
              would be hidden in print and read twice by a screen reader. */}
          <table className="mt-12 w-full border-collapse text-left text-sm max-md:block">
            <caption className="sr-only">AHM International capability by product family</caption>
            <thead className="max-md:hidden">
              <tr className="border-b border-ink text-ink">
                <th scope="col" className="py-3 pr-6 font-display text-xs font-bold uppercase tracking-[0.08em]">Product family</th>
                <th scope="col" className="py-3 pr-6 font-display text-xs font-bold uppercase tracking-[0.08em]">Track record</th>
                {showRoute && (
                  <th scope="col" className="py-3 pr-6 font-display text-xs font-bold uppercase tracking-[0.08em]">Production</th>
                )}
                <th scope="col" className="py-3 pr-6 font-display text-xs font-bold uppercase tracking-[0.08em]">Fabrics</th>
                <th scope="col" className="py-3 font-display text-xs font-bold uppercase tracking-[0.08em]">Decoration</th>
              </tr>
            </thead>
            <tbody className="max-md:block max-md:space-y-3">
              {capabilityMatrix.map((row) => (
                <tr
                  key={row.slug}
                  className="border-b border-line align-top max-md:block max-md:border max-md:p-4"
                >
                  <th scope="row" className="py-4 pr-6 font-normal max-md:block max-md:p-0">
                    <Link
                      href={row.href}
                      className="font-display text-base font-bold tracking-[-0.015em] text-ink underline-offset-4 hover:underline"
                    >
                      {row.name}
                    </Link>
                  </th>
                  <td className="py-4 pr-6 max-md:block max-md:pt-2 max-md:pb-0">
                    <span className="md:hidden text-ink/65">Track record: </span>
                    <span className={row.documented ? "font-semibold text-ink" : "text-ink/75"}>{row.record}</span>
                  </td>
                  {showRoute && (
                    <td className="py-4 pr-6 text-ink/75 max-md:block max-md:pt-2 max-md:pb-0">
                      <span className="md:hidden text-ink/65">Production: </span>
                      {row.route}
                    </td>
                  )}
                  <td className="py-4 pr-6 text-ink/75 max-md:block max-md:pt-2 max-md:pb-0">
                    <span className="md:hidden text-ink/65">Fabrics: </span>
                    {row.materials}
                  </td>
                  <td className="py-4 text-ink/75 max-md:block max-md:pt-2 max-md:pb-0">
                    <span className="md:hidden text-ink/65">Decoration: </span>
                    {row.decoration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
            <div className="bg-paper p-7">
              <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">
                What any family needs to enter development
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                A tech pack, a reference garment or a written specification; the fabric and colour standard; the
                size range; decoration artwork; and the quantity and destination. The{" "}
                <Link href="/resources/tech-pack-checklist" className="text-ink underline underline-offset-4">
                  tech pack checklist
                </Link>{" "}
                lists each item.
              </p>
            </div>
            <div className="bg-paper p-7">
              <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">
                What it is checked against
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                The approved sample and the agreed specification, whichever facility makes the bulk. Where
                inspection happens and what is checked is set out on the{" "}
                <Link href="/quality" className="text-ink underline underline-offset-4">
                  quality page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The four questions                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="questions-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>For your order</Eyebrow>
            <MaskedHeading
              as="h2"
              id="questions-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Four questions" }, { text: "worth asking." }]}
            />
            <p className="mt-6 max-w-sm text-ink/70">
              Ask them of any supplier that uses more than one factory. They are the difference between a
              sourcing partner and an intermediary.
            </p>
          </div>
          <ol className="col-span-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {buyerQuestions.map((q, i) => (
              <li key={q.question} className="bg-paper p-7">
                <p className="label text-ink/65">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em] text-ink">{q.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{q.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="network-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Direct answers</Eyebrow>
            <MaskedHeading
              as="h2"
              id="network-faq"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Owned, partnered," }, { text: "accountable." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "ASK WHERE IT" }, { text: "WILL BE MADE.", className: "text-lime" }]}
        body="Send one style, and ask anything about where and how it would be made before you commit to a sample."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Benchmark a Style", href: "/benchmark-a-style" }}
        zone="ink"
      />

      <RelatedLinks
        guidesFor="/manufacturing-network"
        title="Explore next"
        links={[
          { label: "Capabilities", href: "/capabilities", description: "What each production stage produces for you." },
          { label: "Quality assurance", href: "/quality", description: "Where inspection happens and what is checked." },
          { label: "About AHM International", href: "/about", description: "What the company can evidence, and how to verify it." },
        ]}
      />
    </>
  );
}
