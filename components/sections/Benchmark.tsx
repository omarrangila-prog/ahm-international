"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Upload } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { productCategories } from "@/data/products";
import { materials } from "@/data/materials";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * ONE STYLE BENCHMARK
 * ===================
 *
 * The site's most important section: it converts "we already have a supplier"
 * into a single, low-commitment test.
 *
 * It is a working tool rather than a picture of one. Every selection is carried
 * into the RFQ form as query parameters, so a buyer who configures a style here
 * arrives at the quote page with it already filled in. That is the whole point —
 * the section reduces the cost of starting, and throwing the selections away at
 * the boundary would put that cost straight back.
 *
 * No price is shown or estimated. The output is a specification, which is what
 * AHM can honestly produce without seeing the tech pack.
 */

const QUANTITIES = [
  "Under 500 pcs",
  "500-1,000 pcs",
  "1,000-5,000 pcs",
  "5,000-10,000 pcs",
  "10,000-25,000 pcs",
  "25,000+ pcs",
];

const DECORATIONS = ["Embroidery", "Screen print", "Heat transfer", "Woven badge", "None", "To be confirmed"];

const DELIVERIES = ["Within 60 days", "60-90 days", "90-120 days", "Flexible", "To be confirmed"];

const DESTINATIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Netherlands",
  "Australia",
  "Other",
];

type FieldProps = {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  accent?: boolean;
};

/**
 * A spec row that is also a control.
 *
 * Native `<select>` on purpose: it is keyboard accessible for free, opens as a
 * native wheel on phones, and cannot drift out of sync with the value it shows.
 * The chrome is hidden so it reads as a technical document, not a form.
 */
function SpecField({ label, value, options, onChange, accent = false }: FieldProps) {
  return (
    <div className="group relative grid grid-cols-[9rem_1fr] items-center gap-3 border-b border-ink/10 py-3.5 transition-colors last:border-b-0 hover:bg-ink/[0.025] sm:grid-cols-[11rem_1fr]">
      <label className="label text-ink/65" htmlFor={`bench-${label}`}>
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          id={`bench-${label}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            "w-full cursor-pointer appearance-none truncate bg-transparent pr-8 font-display text-[0.9375rem] font-semibold tracking-[-0.015em] outline-none",
            accent ? "text-ink" : "text-ink",
          )}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-0 h-3.5 w-3.5 text-ink/30 transition-colors group-hover:text-ink"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5 L6 8 L9.5 4.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

export function Benchmark() {
  const [category, setCategory] = useState(productCategories[3].name); // Aprons. The documented article
  const [fabric, setFabric] = useState(materials[2].name); // Poly-cotton twill
  const [decoration, setDecoration] = useState(DECORATIONS[0]);
  const [quantity, setQuantity] = useState(QUANTITIES[2]);
  const [delivery, setDelivery] = useState(DELIVERIES[1]);
  const [destination, setDestination] = useState(DESTINATIONS[0]);

  const categoryNames = useMemo(() => productCategories.map((c) => c.name), []);
  const fabricNames = useMemo(() => [...materials.map((m) => m.name), "Not sure. Recommend options"], []);

  /** Construction is derived from the chosen category rather than asked again. */
  const construction = useMemo(() => {
    const match = productCategories.find((c) => c.name === category);
    return match?.subcategories[0] ?? "To your specification";
  }, [category]);

  /** Selections travel with the buyer into the RFQ form. */
  const quoteHref = useMemo(() => {
    const params = new URLSearchParams({
      category,
      fabric,
      decoration,
      quantity,
      delivery,
      destination,
      source: "benchmark",
    });
    return `/request-a-quote?${params.toString()}`;
  }, [category, fabric, decoration, quantity, delivery, destination]);

  return (
    <Section zone="paper" spacing="lg" tooth aria-labelledby="benchmark-heading">
      <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-12 lg:gap-x-12">
        {/* ---------------- Argument ---------------- */}
        <div className="col-span-12 lg:col-span-5">
          <Eyebrow>Already sourcing?</Eyebrow>

          <MaskedHeading
            as="h2"
            id="benchmark-heading"
            className="mt-6 font-display text-display text-ink"
            lines={[{ text: "Give us" }, { text: "one style" }, { text: "to benchmark.", className: "text-ink" }]}
          />

          <div className="mt-8 max-w-md space-y-5 text-ink/70">
            <p className="text-lead">
              You don&apos;t need to move an entire program to evaluate AHM.
            </p>
            <p>
              Send one existing or upcoming style. We review the specification and come back on
              construction, fabric, trims, development, commercial FOB costing and lead time, with
              the cost-engineering options attached, not hidden.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {["Construction", "Fabric", "Trims", "Development", "FOB costing", "Lead time"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-ink/65">
                <span className="h-1 w-1 shrink-0 bg-ink" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              href="/request-a-quote#files"
              size="lg"
              withArrow
              onClick={() => track("techpack_upload_start", { location: "benchmark" })}
            >
              Upload a Tech Pack
            </Button>
            <Button href={quoteHref} variant="outline" size="lg" onClick={() => track("benchmark_completed", { category, fabric, quantity })}>
              Request Benchmark Costing
            </Button>
          </div>
        </div>

        {/* ---------------- The tool ---------------- */}
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="border border-ink/12 bg-paper shadow-[0_30px_70px_-45px_rgba(16,19,21,0.5)]">
            {/* Card header. Reads as a spec sheet masthead */}
            <div className="flex items-center justify-between gap-4 border-b border-ink/12 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 bg-ink" aria-hidden="true" />
                <p className="label text-ink/70">Benchmark Specification</p>
              </div>
              <p className="label text-ink/70">Draft</p>
            </div>

            <div className="px-6 py-2 sm:px-8">
              <SpecField label="Product" value={category} options={categoryNames} onChange={setCategory} accent />
              <div className="grid grid-cols-[9rem_1fr] items-center gap-3 border-b border-ink/10 py-3.5 sm:grid-cols-[11rem_1fr]">
                <span className="label text-ink/65">Construction</span>
                <span className="font-display text-[0.9375rem] font-semibold tracking-[-0.015em] text-ink/65">
                  {construction}
                </span>
              </div>
              <SpecField label="Fabric" value={fabric} options={fabricNames} onChange={setFabric} />
              <SpecField label="Decoration" value={decoration} options={DECORATIONS} onChange={setDecoration} />
              <SpecField label="Quantity" value={quantity} options={QUANTITIES} onChange={setQuantity} />
              <SpecField label="Target delivery" value={delivery} options={DELIVERIES} onChange={setDelivery} />
              <SpecField label="Destination" value={destination} options={DESTINATIONS} onChange={setDestination} />
            </div>

            {/* Card footer. The honest output */}
            <div className="border-t border-ink/12 bg-paper px-6 py-6 sm:px-8">
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="label mb-2 text-ink/65">Commercial FOB price</p>
                  <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-ink">
                    Quoted against specification
                  </p>
                  <p className="mt-2 max-w-sm text-xs text-ink/70">
                    We don&apos;t publish an estimate before seeing the tech pack. Price follows
                    construction, fabric, decoration, quantity and schedule.
                  </p>
                </div>
                <Button href={quoteHref} size="md" withArrow onClick={() => track("benchmark_completed", { category, fabric, quantity })}>
                  Cost this style
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 flex items-start gap-2.5 text-xs text-ink/65">
            <Upload className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <p>
              Your selections carry through to the quote form. Attach a tech pack there and we
              review against the actual specification.
              <ArrowRight className="ml-1 inline h-3 w-3" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
