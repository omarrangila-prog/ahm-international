import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ArrowLink } from "@/components/ui/Button";
import { trustStrengths } from "@/data/trust";

/**
 * Homepage section 06: what AHM can stand behind.
 *
 * Replaces a band headed "What this site does not claim". That band was true
 * and still is, but it was the first credibility statement on the page, so a
 * buyer met the gaps before the strengths. The brief asked for the order to be
 * reversed. The list of what is not published now lives on /verification,
 * linked from here, rather than being dropped.
 *
 * Each strength is labelled with what it rests on and links to where it can be
 * checked: "Documented", "Stated by AHM", "Published here". A strength with
 * nowhere to point is not on the list.
 */

export function BuyerTrust() {
  return (
    <Section zone="paper" spacing="lg" aria-labelledby="trust-heading">
      <div className="shell-wide">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow>Buyer trust</Eyebrow>
            <MaskedHeading
              as="h2"
              id="trust-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Built on verifiable" }, { text: "manufacturing experience." }]}
            />
          </div>
          <p className="col-span-12 max-w-xl text-ink/70 lg:col-span-6 lg:self-end">
            Each point below says what it rests on and where to check it. What AHM does not publish, and why,
            is set out on the verification page.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {trustStrengths.map((s) => (
            <li key={s.title} className="flex flex-col bg-paper p-7">
              <p className="label text-ink/65">{s.basis}</p>
              <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em] text-ink">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">{s.body}</p>
              <Link
                href={s.href}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                {s.linkLabel}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
          <p className="max-w-lg text-sm text-ink/70">
            Registration documents, inspection access and what this site deliberately leaves out.
          </p>
          <ArrowLink href="/verification">How to verify AHM International</ArrowLink>
        </div>
      </div>
    </Section>
  );
}
