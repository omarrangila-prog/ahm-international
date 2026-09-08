"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  GSM_CUTTER_AREA_CM2,
  fabricWeightGrams,
  gsmToOzPerSqYard,
  ozPerSqYardToGsm,
  rangeCovers,
  rollAreaSqMetres,
  swatchGsm,
} from "@/lib/gsm";
import { materials } from "@/data/materials";
import { cn } from "@/lib/utils";

/**
 * GSM CALCULATOR
 * ==============
 *
 * Three jobs a sourcing manager actually does with fabric weight, and no
 * fourth one invented to round the set out.
 *
 * **Convert** is the one that costs money. Buyers in the US and UK specify
 * ounces per square yard; mills across Pakistan, India and Bangladesh quote
 * grams per square metre. The conversion is exact — the ounce and the yard
 * have been defined since 1959 — so this is arithmetic, not an estimate.
 *
 * **Weigh a swatch** takes an area rather than assuming one. The bench
 * shortcut is "grams times a hundred", which is correct only because a
 * standard round cutter takes exactly 100 cm². Applied to a hand-cut 15x15
 * square it overstates the weight by 125%, and it fails silently: the answer
 * still looks like a plausible GSM.
 *
 * **Roll weight** exists because a buyer comparing two mills on price per kilo
 * needs the same basis on both, and because it is what decides freight.
 *
 * What is deliberately not here is fabric consumption per garment. It is the
 * number buyers most want and it cannot be derived from a weight: it comes
 * from the marker, and depends on the pattern, the size ratio, the fabric
 * width and the nap. A rule of thumb would be a figure someone costs a program
 * against, which is exactly what this site does not publish.
 *
 * The result panel lists AHM's own published constructions whose range covers
 * the answer. Those ranges are read from `data/materials.ts`, so a construction
 * cannot appear here without being published there.
 */

type Mode = "convert" | "swatch" | "roll";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "convert", label: "Convert units", hint: "oz/yd² to gsm, and back" },
  { id: "swatch", label: "Weigh a swatch", hint: "From a cut sample" },
  { id: "roll", label: "Roll weight", hint: "Fabric mass for an order" },
];

/** Empty until typed in, so the panel never opens showing an invented number. */
const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

export function GsmCalculator() {
  const [mode, setMode] = useState<Mode>("convert");

  const [oz, setOz] = useState("6");
  const [gsmIn, setGsmIn] = useState("");
  const [grams, setGrams] = useState("");
  const [swatchW, setSwatchW] = useState("10");
  const [swatchH, setSwatchH] = useState("10");
  const [useCutter, setUseCutter] = useState(true);
  const [rollGsm, setRollGsm] = useState("");
  const [rollLength, setRollLength] = useState("");
  const [rollWidth, setRollWidth] = useState("150");

  const id = useId();

  /* One GSM figure drives the whole result panel, whichever mode produced it. */
  let gsm: number | null = null;
  let secondary: string | null = null;

  if (mode === "convert") {
    const o = num(oz);
    const g = num(gsmIn);
    if (Number.isFinite(o) && o > 0) gsm = ozPerSqYardToGsm(o);
    else if (Number.isFinite(g) && g > 0) gsm = g;
  } else if (mode === "swatch") {
    const area = useCutter ? GSM_CUTTER_AREA_CM2 : num(swatchW) * num(swatchH);
    gsm = swatchGsm(num(grams), area);
    if (gsm !== null && !useCutter) secondary = `Swatch area ${area.toFixed(0)} cm²`;
  } else {
    const g = num(rollGsm);
    const area = rollAreaSqMetres(num(rollLength), num(rollWidth));
    if (Number.isFinite(g) && g > 0) gsm = g;
    if (area !== null && gsm !== null) {
      const kg = fabricWeightGrams(gsm, area)! / 1000;
      secondary = `${area.toFixed(1)} m² of fabric · ${kg.toFixed(1)} kg`;
    }
  }

  const valid = gsm !== null && Number.isFinite(gsm) && gsm > 0;
  const matching = valid ? materials.filter((m) => rangeCovers(m.typicalWeight, gsm!)) : [];

  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16">
      <div className="col-span-12 lg:col-span-6">
        <ul className="flex flex-wrap gap-2">
          {MODES.map((m) => {
            const on = m.id === mode;
            return (
              <li key={m.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "border px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none",
                    on ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/75 hover:border-ink",
                  )}
                >
                  {m.label}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-sm text-ink/65">{MODES.find((m) => m.id === mode)!.hint}</p>

        <div className="mt-8 space-y-5">
          {mode === "convert" && (
            <>
              <Field
                id={`${id}-oz`}
                label="Ounces per square yard"
                value={oz}
                onChange={(v) => {
                  setOz(v);
                  setGsmIn("");
                }}
                suffix="oz/yd²"
                step="0.1"
              />
              <p className="text-center text-xs uppercase tracking-[0.18em] text-ink/70">or</p>
              <Field
                id={`${id}-gsm`}
                label="Grams per square metre"
                value={gsmIn}
                onChange={(v) => {
                  setGsmIn(v);
                  setOz("");
                }}
                suffix="gsm"
                step="1"
              />
            </>
          )}

          {mode === "swatch" && (
            <>
              <Field
                id={`${id}-grams`}
                label="Swatch weight"
                value={grams}
                onChange={setGrams}
                suffix="grams"
                step="0.01"
              />
              <fieldset>
                <legend className="label text-ink/65">Swatch area</legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {[
                    { on: true, label: "Round cutter (100 cm²)" },
                    { on: false, label: "Cut rectangle" },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      aria-pressed={useCutter === opt.on}
                      onClick={() => setUseCutter(opt.on)}
                      className={cn(
                        "border px-3 py-2 text-sm transition-colors duration-200 motion-reduce:transition-none",
                        useCutter === opt.on
                          ? "border-ink bg-ink text-paper"
                          : "border-ink/25 text-ink/75 hover:border-ink",
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              {!useCutter && (
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id={`${id}-w`}
                    label="Width"
                    value={swatchW}
                    onChange={setSwatchW}
                    suffix="cm"
                    step="0.1"
                  />
                  <Field
                    id={`${id}-h`}
                    label="Height"
                    value={swatchH}
                    onChange={setSwatchH}
                    suffix="cm"
                    step="0.1"
                  />
                </div>
              )}
            </>
          )}

          {mode === "roll" && (
            <>
              <Field
                id={`${id}-rg`}
                label="Fabric weight"
                value={rollGsm}
                onChange={setRollGsm}
                suffix="gsm"
                step="1"
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  id={`${id}-rl`}
                  label="Length"
                  value={rollLength}
                  onChange={setRollLength}
                  suffix="m"
                  step="1"
                />
                <Field
                  id={`${id}-rw`}
                  label="Usable width"
                  value={rollWidth}
                  onChange={setRollWidth}
                  suffix="cm"
                  step="1"
                />
              </div>
              <p className="text-sm leading-relaxed text-ink/65">
                Usable width, not full width — the selvedge is not cuttable. Two mill
                quotations compared on price per kilo need the same basis on both.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6">
        <div className="border border-ink/15 bg-paper-deep p-8 sm:p-10">
          <p className="label text-ink/65">Result</p>

          {/* aria-live so the answer is announced as it changes: the figure
              updates in place with no submit step to move focus to. */}
          <div aria-live="polite">
            {valid ? (
              <>
                <p className="mt-4 font-display text-[clamp(2.75rem,9vw,4.5rem)] font-extrabold leading-none tracking-[-0.04em] text-ink">
                  {Math.round(gsm!)}
                  <span className="ml-2 align-baseline font-sans text-base font-normal tracking-normal text-ink/60">
                    gsm
                  </span>
                </p>
                <p className="mt-3 text-ink/70">
                  {gsmToOzPerSqYard(gsm!).toFixed(2)} oz/yd²
                </p>
                {secondary && <p className="mt-1.5 text-sm text-ink/65">{secondary}</p>}
              </>
            ) : (
              <p className="mt-4 max-w-sm text-ink/60">
                Enter a figure and the equivalent appears here, with any construction
                published on this page that covers it.
              </p>
            )}
          </div>

          {valid && (
            <div className="mt-8 border-t border-ink/15 pt-6">
              <p className="label text-ink/65">
                {matching.length > 0
                  ? "Constructions published at this weight"
                  : "No construction on this page covers that weight"}
              </p>
              {matching.length > 0 ? (
                <ul className="mt-4 space-y-2.5">
                  {matching.map((m) => (
                    <li key={m.slug} className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-display text-sm font-bold tracking-[-0.01em] text-ink">
                        {m.name}
                      </span>
                      <span className="text-sm text-ink/65">
                        {m.family} · {m.typicalWeight}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                  That is outside the range of the constructions listed above. It does not
                  mean it cannot be developed — send the requirement and we will say
                  whether it is.
                </p>
              )}
              <p className="mt-6 text-sm leading-relaxed text-ink/70">
                Weight is one of five things that decide how a cloth behaves.{" "}
                <Link
                  href="/request-a-quote"
                  className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
                >
                  Send the specification
                </Link>{" "}
                and we will come back on construction and commercial FOB costing.
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink/65">
          This works out fabric weight, not fabric consumption. How many metres a
          garment takes comes from the marker — the pattern, the size ratio, the width
          and the nap all move it — and that is produced at sampling rather than
          estimated from a weight.
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  suffix,
  step,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
  step: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-ink/65">
        {label}
      </label>
      <div className="mt-2 flex items-stretch border border-ink/20 focus-within:border-ink">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          /* A focused number input takes the page's scroll and changes its own
             value. On a long page that reads as the answer changing by itself. */
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full bg-transparent px-3.5 py-3 text-[0.9375rem] text-ink outline-none"
        />
        <span className="flex shrink-0 items-center border-l border-ink/15 px-3.5 text-sm text-ink/60">
          {suffix}
        </span>
      </div>
    </div>
  );
}
