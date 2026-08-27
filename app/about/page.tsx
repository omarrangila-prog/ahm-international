import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { company, publicValue, NOT_PUBLISHED } from "@/data/company";
import { hasAsset } from "@/data/assets";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "About AHM International",
  description:
    "A Pakistan-based apparel manufacturing and export partner focused on product development and international uniform sourcing programs.",
  path: "/about",
});

const beliefs = [
  { title: "Good manufacturing begins before production.", body: "By the time fabric is cut, most of the cost and most of the risk have already been decided." },
  { title: "Better communication reduces surprises.", body: "Status a buyer is told is worth more than status a buyer has to chase." },
  { title: "Better development creates better commercial outcomes.", body: "A resolved specification gets an accurate quotation. A vague one gets a defensive one." },
  { title: "Long-term programs are built through consistency.", body: "The second shipment matching the first is the product. Everything else is a sample." },
];

export default function AboutPage() {
  const street = publicValue(company.streetAddress);
  const legal = publicValue(company.legalName);

  const facts = [
    { label: "Location", value: `${company.city}, ${company.country}` },
    { label: "Commercial model", value: "FOB" },
    { label: "Export port", value: company.exportExperience.port },
    { label: "Documented lane", value: `Pakistan → ${company.exportExperience.destination}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="About"
        headingLines={[{ text: "A manufacturing" }, { text: "partner, not a", className: "text-cobalt" }, { text: "catalogue." }]}
        intro="AHM International is a Pakistan-based apparel manufacturing and export partner focused on commercial product development and international sourcing programs."
        trail={[{ name: "About", path: "/about" }]}
        zone="cream"
        asset="factory.sewing"
        priority
        facts={facts}
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "See capabilities", href: "/capabilities" }}
      />

      <Section zone="ivory" spacing="lg" aria-labelledby="believe-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>What we believe</Eyebrow>
            <MaskedHeading
              as="h2"
              id="believe-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Four positions" }, { text: "we actually" }, { text: "work to." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <RevealGroup className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2" stagger={0.06}>
              {beliefs.map((belief, i) => (
                <RevealItem key={belief.title}>
                  <div className="h-full bg-cream p-7">
                    <span className="numeral text-lg text-ink/65">{numeral(i + 1)}</span>
                    <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-[-0.025em] text-ink">
                      {belief.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{belief.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Verified record */}
      <Section zone="ink" spacing="lg" tooth aria-labelledby="record-heading">
        <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>The record</Eyebrow>
            <MaskedHeading
              as="h2"
              id="record-heading"
              className="mt-5 font-display text-h1 text-cream"
              lines={[{ text: "What we can" }, { text: "evidence." }]}
            />
            <p className="mt-6 max-w-md text-cream/65">
              Most supplier sites publish a capacity figure, a headcount and a wall of certification
              logos. We publish what we can produce a document for. If that list is shorter, at
              least every line of it survives a question.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <dl className="border-t border-cream/15">
              {[
                { label: "Manufacturing location", value: `${company.city}, ${company.country}`, status: "verified" },
                { label: "Commercial model", value: "FOB", status: "verified" },
                { label: "Export experience", value: company.exportExperience.statement, status: "verified" },
                { label: "Documented product", value: "65% polyester / 35% cotton stain-managed bib apron program", status: "verified" },
                { label: "Registered legal name", value: legal ?? NOT_PUBLISHED, status: legal ? "verified" : "pending" },
                { label: "Street address", value: street ?? "Confirmed during commercial discussion", status: street ? "verified" : "pending" },
                { label: "Certifications", value: "Confirmed in writing during commercial discussion", status: "pending" },
                { label: "Production capacity", value: "Confirmed against your quantity and schedule", status: "pending" },
                { label: "Employee count", value: "Not published", status: "pending" },
              ].map((row) => (
                // Only dt and dd may sit inside a dl's div wrapper, so the
                // status rides inside the dd rather than as a third sibling.
                <div key={row.label} className="grid grid-cols-1 gap-2 border-b border-cream/15 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="label pt-0.5 text-cream/60">{row.label}</dt>
                  <dd className="flex flex-col gap-2 text-sm leading-relaxed text-cream/80 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <span className="sm:flex-1">{row.value}</span>
                    <span
                      className={
                        row.status === "verified"
                          ? "label shrink-0 self-start text-lime sm:w-28"
                          : "label shrink-0 self-start text-cream/70 sm:w-28"
                      }
                    >
                      {row.status === "verified" ? "Documented" : "Not published"}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Verification.

          The table above says what AHM will and will not claim. This says how to
          check it without taking AHM's word for any of it — which is the part
          almost no supplier site offers, and the reason it belongs here rather
          than buried in a FAQ.

          Every item is framed as something the buyer can request or check, not
          as a promise AHM is making. That distinction matters: a promise needs
          verifying too, whereas an invitation to check is self-evidencing. */}
      <Section zone="cream" spacing="lg" aria-labelledby="verify-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Verification</Eyebrow>
            <MaskedHeading
              as="h2"
              id="verify-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Don't take this" }, { text: "page on trust." }]}
            />
            <p className="mt-6 max-w-md text-ink/70">
              Every supplier says the same things about quality and service. The
              difference between a claim and a fact is whether you can check it, so
              here is how to check this one. None of it requires AHM&rsquo;s
              cooperation to start.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ol className="border-t border-ink/15">
              {[
                {
                  n: "01",
                  title: "Ask for the registration documents",
                  body: "Company registration and tax registration, sent directly. If a supplier hesitates on this, that is your answer about everything else on their site.",
                },
                {
                  n: "02",
                  title: "Check the exporter registers",
                  body: "Pakistan's Trade Development Authority publishes exporter listings with company name, address and tax number. A supplier that appears where they say they operate is a supplier that exists.",
                },
                {
                  n: "03",
                  title: "Request a physical sample",
                  body: "The most reliable audit of a factory is a garment it made. Send a specification and judge the construction, the measurements and the finish in your hands rather than on a screen.",
                },
                {
                  n: "04",
                  title: "Nominate your own inspection agency",
                  body: "SGS, Bureau Veritas, Intertek or your own QA. A supplier confident in their output does not object to someone else opening the cartons before they ship.",
                },
                {
                  n: "05",
                  title: "Ask what a claim rests on",
                  body: "For any figure on any supplier's site, ask what document supports it. That question is why this site publishes a short list rather than a long one.",
                },
              ].map((step) => (
                <li
                  key={step.n}
                  className="grid grid-cols-1 gap-2 border-b border-ink/15 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span className="numeral text-lg text-cobalt">{step.n}</span>
                  <div>
                    <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section zone="cream" spacing="lg" aria-labelledby="work-heading">
        <div className="shell-wide">
          <Eyebrow>The work</Eyebrow>
          <MaskedHeading
            as="h2"
            id="work-heading"
            className="mt-5 font-display text-h1 text-ink"
            lines={[{ text: "Development, production," }, { text: "and everything between." }]}
          />
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4" stagger={0.06}>
            {(["development.techPack", "factory.cutting", "factory.qualityControl", "export.warehouse"] as const)
              .filter(hasAsset)
              .map((asset) => (
                <RevealItem key={asset}>
                  <div className="zoom-frame group aspect-[4/5] w-full overflow-hidden bg-ivory">
                    <SmartImage asset={asset} sizes={SIZES.quarter} className="h-full w-full" imageClassName="object-cover" />
                  </div>
                </RevealItem>
              ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "TEST US WITH" }, { text: "ONE STYLE." }]}
        body="The most useful thing you can do with a new supplier is give them something real and small. Send one specification."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Contact the team", href: "/contact" }}
        zone="lime"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "Manufacturing capabilities", href: "/capabilities", description: "Thirteen capabilities, each described by what it produces for you." },
          { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB program, anonymised." },
          { label: "Sourcing from Karachi", href: "/garment-manufacturer-karachi", description: "Why the manufacturer's city affects your schedule." },
        ]}
      />
    </>
  );
}
