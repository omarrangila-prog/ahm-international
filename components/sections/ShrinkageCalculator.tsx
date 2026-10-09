"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  directionResult,
  formatShrinkagePercent,
  type DirectionResult,
} from "@/lib/shrinkage";
import { cn } from "@/lib/utils";

/**
 * SHRINKAGE CALCULATOR
 * ====================
 *
 * Two directions, one formula. Length (warp / wale) and width (weft / course)
 * almost never move equally, so a single percentage is not a usable answer.
 *
 * Exact arithmetic — same honesty bar as the GSM tool. What is deliberately
 * absent: any claim that a result is "within AHM tolerance" or an acceptable
 * program band. That belongs in the tech pack against a named wash method.
 *
 * DESIGN
 * ------
 * Ink result panel, lime figures — the palette allows lime as text only on ink.
 */

const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

function readingLabel(r: DirectionResult): string {
  if (r.reading === "stable") return "No measurable change";
  if (r.reading === "extension") return "Grew (extension)";
  return "Contracted (shrinkage)";
}

export function ShrinkageCalculator() {
  const id = useId();
  const [lengthBefore, setLengthBefore] = useState("50");
  const [lengthAfter, setLengthAfter] = useState("");
  const [widthBefore, setWidthBefore] = useState("50");
  const [widthAfter, setWidthAfter] = useState("");

  const length = directionResult(num(lengthBefore), num(lengthAfter));
  const width = directionResult(num(widthBefore), num(widthAfter));
  const valid = length !== null || width !== null;

  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16">
      <div className="col-span-12 lg:col-span-6">
        <p className="text-sm text-ink/65">
          Measure before and after the wash or finish you care about. Units cancel —
          use centimetres, inches or marked intervals, but the same unit on both sides.
        </p>

        <div className="mt-9 space-y-8">
          <fieldset>
            <legend className="label text-ink/65">Length · warp or wale</legend>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <Field
                id={`${id}-lb`}
                label="Original"
                value={lengthBefore}
                onChange={setLengthBefore}
                step="0.1"
              />
              <Field
                id={`${id}-la`}
                label="After"
                value={lengthAfter}
                onChange={setLengthAfter}
                step="0.1"
                placeholder="e.g. 48.5"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="label text-ink/65">Width · weft or course</legend>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <Field
                id={`${id}-wb`}
                label="Original"
                value={widthBefore}
                onChange={setWidthBefore}
                step="0.1"
              />
              <Field
                id={`${id}-wa`}
                label="After"
                value={widthAfter}
                onChange={setWidthAfter}
                step="0.1"
                placeholder="e.g. 49"
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6">
        <div className="bg-ink p-8 text-paper sm:p-10" data-zone="dark">
          <p className="label text-paper/65">Result</p>
          <div aria-live="polite" className="mt-5 space-y-8">
            {valid ? (
              <>
                <DirectionBlock label="Length" result={length} />
                <DirectionBlock label="Width" result={width} />
              </>
            ) : (
              <p className="max-w-sm text-paper/70">
                Enter an after-wash measurement for length, width, or both. The
                percentage for each direction appears here.
              </p>
            )}
          </div>

          {valid && (
            <div className="mt-8 border-t border-paper/20 pt-6">
              <p className="max-w-sm text-sm leading-relaxed text-paper/75">
                A usable specification names both directions, a test method, and a
                residual tolerance — not only a single percentage from one wash.
              </p>
              <Link
                href="/resources/fabric-shrinkage-guide"
                className="mt-6 inline-flex min-h-12 items-center gap-2 bg-lime px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink transition-opacity duration-200 hover:opacity-90 motion-reduce:transition-none"
              >
                Read the shrinkage guide
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>

        <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink/70">
          This is arithmetic on your measurements, not an approval band. Agree the
          wash method and residual tolerance in writing before sampling.{" "}
          <Link
            href="/materials#gsm-heading"
            className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
          >
            Weight (GSM)
          </Link>{" "}
          is a separate question — cloth that shrinks in area can also gain gsm.
        </p>
      </div>
    </div>
  );
}

function DirectionBlock({
  label,
  result,
}: {
  label: string;
  result: DirectionResult | null;
}) {
  if (!result) {
    return (
      <div>
        <p className="label text-paper/65">{label}</p>
        <p className="mt-2 text-sm text-paper/55">Not entered</p>
      </div>
    );
  }

  const display = formatShrinkagePercent(result.percent);
  const unit = result.reading === "stable" ? "" : "%";

  return (
    <div>
      <p className="label text-paper/65">{label}</p>
      <p className="mt-2 font-display text-[clamp(2.5rem,8vw,4rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-lime">
        {display}
        {unit && (
          <span className="ml-1.5 align-baseline font-sans text-base font-normal tracking-normal text-paper/70">
            %
          </span>
        )}
      </p>
      <p
        className={cn(
          "mt-3 text-sm",
          result.reading === "stable" ? "text-paper/70" : "text-paper/80",
        )}
      >
        {readingLabel(result)}
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  step,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  step: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-ink/65">
        {label}
      </label>
      <div className="mt-2.5 flex items-stretch border border-ink/20 bg-paper transition-colors focus-within:border-ink motion-reduce:transition-none">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full bg-transparent px-4 py-3.5 font-display text-lg font-bold tracking-[-0.01em] text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink/35"
        />
      </div>
    </div>
  );
}
