import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { Calculators } from "@/components/tools/Calculators";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Calculators for Buyers",
  description:
    "Free apparel calculators: fabric weight and price, marker consumption, FOB cost builder, carton CBM, size runs, tolerance, yarn count, unit conversion and a decoration chooser.",
  path: "/resources/calculators",
});

const JUMP = [
  ["fabric-weight", "Fabric metres and kilos"],
  ["fabric-price", "Fabric price"],
  ["consumption", "Marker consumption"],
  ["cost-builder", "FOB cost builder"],
  ["cartons", "Carton CBM"],
  ["size-run", "Size run"],
  ["tolerance", "Tolerance"],
  ["decoration", "Decoration chooser"],
  ["yarn", "Yarn count"],
  ["units", "Unit converter"],
] as const;

export default function CalculatorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer tools"
        headingLines={[{ text: "Work the" }, { text: "numbers.", className: "text-ink" }]}
        intro="Calculators for the arithmetic of buying garments. Each shows its formula and what it assumes, and none holds a price, a rate or a yield: you enter yours. They are working tools, not quotations."
        trail={[{ name: "Knowledge Center", path: "/resources" }, { name: "Calculators", path: "/resources/calculators" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      <Section zone="paper" spacing="md" aria-label="Calculators">
        <div className="shell-wide">
          <nav aria-label="Calculators on this page" className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink/15 py-4">
            <span className="label text-ink/65">Jump to</span>
            {JUMP.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="min-h-6 text-sm text-ink/75 underline-offset-4 hover:text-ink hover:underline">
                {label}
              </a>
            ))}
          </nav>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink/70">
            Looking for GSM and ounce conversion, swatch weight, roll weight or shrinkage? Those are on the{" "}
            <Link href="/materials#gsm-heading" className="text-ink underline underline-offset-4">
              materials page
            </Link>
            , and the Incoterms chain is on the{" "}
            <Link href="/export#incoterms-heading" className="text-ink underline underline-offset-4">
              export page
            </Link>
            .
          </p>
          <Calculators />
        </div>
      </Section>

      <Section zone="paper" spacing="md" aria-labelledby="calc-honest">
        <div className="shell-wide max-w-3xl">
          <Eyebrow>What these are not</Eyebrow>
          <h2 id="calc-honest" className="mt-4 font-display text-h2 text-ink">
            Arithmetic, not a quotation.
          </h2>
          <p className="mt-4 text-ink/75">
            A calculator can add up numbers you supply and convert units exactly. It cannot know what a mill charges, how
            efficiently a pattern lays out, what a container will really hold, or how a decoration will wash. Those come
            from your suppliers, your own markers and a test on your own fabric. For a costing against your specification,
            send it to us and we will answer with an FOB figure and the questions behind it.
          </p>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "NUMBERS DONE?" }, { text: "SEND THE SPEC." }]}
        body="A calculator gets you to a sensible question. A specification gets you an FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
