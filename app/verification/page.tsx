import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { company, displayValue, publicValue, NOT_PUBLISHED, PER_PROJECT } from "@/data/company";
import { verificationSteps } from "@/data/trust";
import { notClaimed } from "@/data/sourcing-context";
import { provenanceMark, provenanceSentence, type Origin } from "@/lib/provenance";

export const metadata: Metadata = pageMetadata({
  title: "Business Verification",
  description:
    "What AHM International publishes and on what basis, how to request registration and export documents, and how to check a supplier independently.",
  path: "/verification",
});

/**
 * Business verification.
 *
 * The page a careful buyer looks for before sending a specification. It holds
 * three things that used to be scattered or missing: every published fact with
 * what it rests on, a way to ask for the documents that are deliberately not
 * published, and the list of claims this site does not make (which used to be
 * the homepage's first credibility statement).
 *
 * The fact table reads the same Field values the rest of the site does, so a
 * fact cannot be "on request" here and printed elsewhere, or the reverse.
 */

type Basis = "Confirmed by the owner" | "Documented" | "Stated by the owner" | "Published" | "On request" | "Per order";

const email = publicValue(company.email);
const phone = publicValue(company.phone);

function onRequest(value: string): Basis {
  return value === NOT_PUBLISHED || value === PER_PROJECT ? "On request" : "Confirmed by the owner";
}

const facts: { label: string; value: string; basis: Basis }[] = [
  { label: "Registered name", value: displayValue(company.legalName), basis: "Confirmed by the owner" },
  { label: "Location", value: `${company.city}, ${company.country}`, basis: "Confirmed by the owner" },
  { label: "Business email", value: email ?? NOT_PUBLISHED, basis: email ? "Published" : "On request" },
  { label: "Phone and WhatsApp", value: phone ?? NOT_PUBLISHED, basis: phone ? "Published" : "On request" },
  { label: "Business hours", value: displayValue(company.businessHours), basis: "Confirmed by the owner" },
  {
    label: "Manufacturing model",
    value: "Own operations and specialist partner factories",
    basis: "Stated by the owner",
  },
  { label: "Export lane", value: "Port Qasim, Karachi to the United States, FOB", basis: "Documented" },
  { label: "Tax registration (NTN)", value: displayValue(company.ntn), basis: onRequest(displayValue(company.ntn)) },
  { label: "Street address", value: displayValue(company.streetAddress), basis: onRequest(displayValue(company.streetAddress)) },
  {
    label: "Certifications",
    value: company.certifications.length ? company.certifications.map((c) => c.name).join(", ") : "None published",
    basis: company.certifications.length ? "Documented" : "On request",
  },
  { label: "Facility size, machinery and capacity", value: NOT_PUBLISHED, basis: "On request" },
  { label: "Minimum quantity and lead time", value: PER_PROJECT, basis: "Per order" },
];

/**
 * The request is an email, not a form. Verification documents are sent by a
 * person to a person, and a pre-written message with the questions that make a
 * request answerable is a working route today without a new system behind it.
 */
const requestSubject = "Verification documents request";
const requestBody = [
  "Company:",
  "Your name and role:",
  "Product or program you are evaluating:",
  "",
  "Documents requested (delete any you do not need):",
  "- Company registration and tax registration (NTN)",
  "- Export registration / exporter listing",
  "- Facility details for the products above",
  "- Third-party inspection arrangements",
  "",
  "Anything your compliance process requires in a specific form:",
].join("\n");
const requestHref = email
  ? `mailto:${email}?subject=${encodeURIComponent(requestSubject)}&body=${encodeURIComponent(requestBody)}`
  : "/contact";

export default function VerificationPage() {
  return (
    <>
      <PageHero
        eyebrow="Business verification"
        headingLines={[{ text: "Check us" }, { text: "before you" }, { text: "trust us." }]}
        intro="What AHM International publishes and what each fact rests on, how to request registration and export documents, and how to check any supplier without relying on its website."
        trail={[{ name: "Business verification", path: "/verification" }]}
        zone="paper"
        primaryCta={{ label: "Request documents", href: "#request" }}
        secondaryCta={{ label: "How to check us", href: "#independent" }}
      />

      <Section zone="paper" spacing="lg" aria-labelledby="facts-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>The record</Eyebrow>
            <MaskedHeading
              as="h2"
              id="facts-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What is published," }, { text: "and on what basis." }]}
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">
              <strong className="font-semibold text-ink">Documented</strong> means a record exists and has been
              seen. <strong className="font-semibold text-ink">Confirmed</strong> or{" "}
              <strong className="font-semibold text-ink">stated by the owner</strong> means AHM says so and you
              can ask for the evidence. <strong className="font-semibold text-ink">On request</strong> means it is
              not printed here, but you can ask for it.
            </p>
          </div>
          <dl className="col-span-12 border-t border-ink lg:col-span-8">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[13rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <dt className="text-sm text-ink/70">{f.label}</dt>
                <dd className="font-medium text-ink [overflow-wrap:anywhere]">{f.value}</dd>
                <dd className="label text-ink/65 sm:text-right">{f.basis}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section zone="ink" spacing="lg" tooth id="request" aria-labelledby="request-heading">
        <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>Request documents</Eyebrow>
            <MaskedHeading
              as="h2"
              id="request-heading"
              className="mt-5 font-display text-h1 text-paper"
              lines={[{ text: "Ask for what" }, { text: "is not printed.", className: "text-lime" }]}
            />
            <p className="mt-6 max-w-md text-paper/70">
              Registration papers, export records and facility details are sent to a named buyer rather than
              published to everyone. Tell us who you are and what you are evaluating, and say if your compliance
              process needs a document in a particular form.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={requestHref} variant="lime" size="lg" withArrow>
                Request verification documents
              </Button>
            </div>
            {email && (
              <p className="mt-4 text-sm text-paper/70">
                Opens an email to <span className="text-paper">{email}</span> with the questions already set out.
              </p>
            )}
          </div>
          <ul className="col-span-12 space-y-5 border-t border-paper/15 pt-6 lg:col-span-6 lg:mt-14">
            <li className="text-sm leading-relaxed text-paper/75">
              <span className="font-medium text-paper">Confidential documents</span> may be shared under a
              non-disclosure agreement. Say if you need one.
            </li>
            <li className="text-sm leading-relaxed text-paper/75">
              <span className="font-medium text-paper">Buyer agreements</span> and other customers&apos;
              documents are never shared, with you or about you.
            </li>
            <li className="text-sm leading-relaxed text-paper/75">
              <span className="font-medium text-paper">Ask for facility details</span> for the products you are
              evaluating, including whether they would be made in AHM&apos;s own operations or at a partner.
            </li>
          </ul>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" id="independent" aria-labelledby="independent-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Independent checks</Eyebrow>
            <MaskedHeading
              as="h2"
              id="independent-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Don't take this" }, { text: "page on trust." }]}
            />
            <p className="mt-6 max-w-md text-ink/70">
              The difference between a claim and a fact is whether you can check it. None of these needs
              AHM&rsquo;s cooperation to start.
            </p>
          </div>
          <ol className="col-span-12 border-t border-ink/15 lg:col-span-7">
            {verificationSteps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-1 gap-2 border-b border-ink/15 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6"
              >
                <span className="numeral text-lg text-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" id="imagery" aria-labelledby="imagery-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Images</Eyebrow>
            <h2 id="imagery-heading" className="mt-5 font-display text-h2 text-ink">
              How images are labelled.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">
              Every image carries a mark saying what it is, taken from a record of each file rather than written by
              hand. When a camera original is supplied, the published image is compared with it, and if it still
              shows the same garment its mark becomes &ldquo;Actual product &middot; enhanced&rdquo; everywhere at once.
            </p>
          </div>
          <dl className="col-span-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {(["photograph", "enhanced", "representative", "ai-render"] as Origin[]).map((origin) => (
              <div key={origin} className="bg-paper p-6">
                <dt className="font-display text-sm font-bold tracking-[-0.01em] text-ink">
                  {provenanceMark(origin) ?? "No mark"}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/70">{provenanceSentence(origin)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="not-claimed-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Before you ask</Eyebrow>
            <h2 id="not-claimed-heading" className="mt-5 font-display text-h2 text-ink">
              Standard claims, answered directly.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70">
              Supplier profiles from this region usually lead with these four. Here is where AHM stands on each, and
              what you can ask for.
            </p>
          </div>
          <ul className="col-span-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {notClaimed.map((row) => (
              <li key={row.claim} className="bg-paper p-6">
                <p className="font-display text-sm font-bold tracking-[-0.01em] text-ink">{row.claim}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{row.position}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "THEN TEST US" }, { text: "WITH ONE STYLE." }]}
        body="Documents tell you a company exists. A sample tells you what it makes. Send one specification and judge the garment."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Benchmark a Style", href: "/benchmark-a-style" }}
        zone="lime"
      />

      <RelatedLinks
        guidesFor="/verification"
        title="Explore next"
        links={[
          { label: "Manufacturing network", href: "/manufacturing-network", description: "Own operations, partner factories and what each makes." },
          { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB program, anonymised." },
          { label: "About AHM International", href: "/about", description: "Who the company is and how it works." },
        ]}
      />
    </>
  );
}
