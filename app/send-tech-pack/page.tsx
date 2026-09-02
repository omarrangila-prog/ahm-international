import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { RfqForm } from "@/components/forms/RfqForm";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/data/sourcing";

export const metadata: Metadata = pageMetadata({
  title: "Send a Tech Pack",
  description:
    "Upload a tech pack, sketch or reference specification for review and commercial FOB costing. PDF, XLSX, DOCX, JPG, PNG or ZIP.",
  path: "/send-tech-pack",
});

const blocks: ContentBlock[] = [
  {
    type: "list",
    heading: "What to include",
    intro: "Send what you have. This is what we look for, and what we will ask about if it is missing.",
    items: [
      { term: "Technical sketch", detail: "Front and back flats, plus detail views of anything non-obvious." },
      { term: "Bill of materials", detail: "Fabrics, trims, threads, labels and packaging with placement." },
      { term: "Measurement chart", detail: "Points of measure by size, with tolerances." },
      { term: "Fabric specification", detail: "Composition, weight, construction and finish, or the requirement it must meet." },
      { term: "Artwork", detail: "Vector files for embroidery and print, with placement, size and colour references." },
      { term: "Packing instruction", detail: "Fold or hang, polybag, ratio or solid pack, carton marking." },
    ],
  },
  {
    type: "callout",
    heading: "No tech pack yet?",
    body:
      "A reference garment, a sketch or a written description all work. A reference garment is often better than a partial tech pack, because it answers construction questions directly. Use the same form and describe what you have.",
  },
];

export default function SendTechPackPage() {
  return (
    <>
      <PageHero
        eyebrow="Send a tech pack"
        headingLines={[{ text: "Send the spec." }, { text: "We'll cost", className: "text-ink" }, { text: "against it." }]}
        intro="Upload a tech pack, sketch, bill of materials or size specification. We review the construction, materials and commercial requirements before proposing an FOB solution."
        trail={[{ name: "Send a Tech Pack", path: "/send-tech-pack" }]}
        zone="paper"
      />

      <Section zone="paper" spacing="none">
        <div className="shell-wide grid grid-cols-12 gap-y-12 pb-24 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-8">
            <Suspense
              fallback={
                <div className="border border-ink/15 bg-paper p-10">
                  <p className="label text-ink/60">Loading the upload form…</p>
                </div>
              }
            >
              <RfqForm />
            </Suspense>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="border border-line bg-paper p-6 lg:sticky lg:top-28">
              <p className="label text-ink/60">Accepted formats</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["PDF", "XLSX", "DOCX", "JPG", "PNG", "ZIP"].map((format) => (
                  <li key={format} className="border border-ink/20 px-3 py-1.5 text-xs text-ink/70">
                    {format}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink/65">
                Up to 15 MB per file and 6 files per submission. Everything you send is treated as
                confidential.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section zone="paper" spacing="lg">
        <div className="shell-wide">
          <Eyebrow>Tech pack guidance</Eyebrow>
          <div className="mt-8">
            <ContentBlocks blocks={blocks} />
          </div>
        </div>
      </Section>

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "Product development", href: "/development", description: "How a specification becomes an executable manufacturing document." },
          { label: "Sampling process", href: "/manufacturing/sampling", description: "Proto, fit, size set and pre-production samples." },
          { label: "Request an FOB quote", href: "/request-a-quote", description: "The full quotation form with commercial terms." },
        ]}
      />
    </>
  );
}
