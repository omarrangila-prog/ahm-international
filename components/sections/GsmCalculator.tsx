"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import {
  GSM_CUTTER_AREA_CM2,
  fabricWeightGrams,
  gsmToOzPerSqYard,
  ozPerSqYardToGsm,
  parseWeightRange,
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
 * DESIGN
 * ------
 * The answer is on ink with the figure in lime, which is the one place the
 * palette rules allow lime as text. The first version put it on `paper-deep`
 * inside a `paper` section — #efebe3 against #f7f5f0, eight points apart — so
 * the panel carrying the entire point of the tool was the flattest thing on
 * the page.
 *
 * Underneath, every construction AHM publishes is plotted on one gsm axis with
 * a marker at the result. A number alone answers "what is it"; the scale
 * answers "where does it sit", which is the question a buyer is actually
 * holding. The bars are read from `data/materials.ts`, so a construction
 * cannot appear on the scale without being published on the page above it.
 */

type Mode = "convert" | "swatch" | "roll";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "convert", label: "Convert units", hint: "oz/yd² to gsm, and back" },
  { id: "swatch", label: "Weigh a swatch", hint: "From a cut sample" },
  { id: "roll", label: "Roll weight", hint: "Fabric mass for an order" },
];

/** Empty until typed in, so the panel never opens showing an invented number. */
const num = (v: string) => (v.trim() === "" ? NaN : Number(v));

/** Published ranges, parsed once. Anything unparseable is left off the scale. */
const PLOTTED = materials
  .map((m) => ({ material: m, range: parseWeightRange(m.typicalWeight) }))
  .filter((row): row is { material: (typeof materials)[number]; range: { min: number; max: number } } =>
    Boolean(row.range),
  )
  .sort((a, b) => a.range.min - b.range.min);

const PUBLISHED_MIN = Math.min(...PLOTTED.map((r) => r.range.min));
const PUBLISHED_MAX = Math.max(...PLOTTED.map((r) => r.range.max));

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

  /* What those constructions are used for. A weight on its own prompts "and
     what is that for?", and `useCases` already answers it in published data. */
  const uses = [...new Set(matching.flatMap((m) => m.useCases))];

  /* Carry the answer into the quote form. The weight always; the fabric only
     when one construction covers it, because naming one of three would be
     choosing on the buyer's behalf. */
  const rfqHref = valid
    ? `/request-a-quote?${new URLSearchParams({
        weight: `${Math.round(gsm!)} gsm`,
        ...(matching.length === 1 ? { fabric: matching[0].name } : {}),
        source: "gsm_calculator",
      }).toString()}`
    : "/request-a-quote";

  /* The axis stretches to include the answer rather than clipping it. A swatch
     mis-cut at 15x15 reads 80 gsm, well under everything published; pinning the
     scale to the published range would put the marker off the end of it, which
     is the moment it most needs to be visible. */
  const axisMin = Math.min(100, Math.floor((valid ? gsm! : PUBLISHED_MIN) / 50) * 50);
  const axisMax = Math.max(400, Math.ceil((valid ? gsm! : PUBLISHED_MAX) / 50) * 50);
  const pct = (value: number) => ((value - axisMin) / (axisMax - axisMin)) * 100;

  /* ---------------------------- Dragging the scale ---------------------------
   * The scale started read-only, which left the most interesting question on
   * the page unanswerable: what else is made at this weight? Dragging answers
   * it directly — the bars fill and empty as the marker crosses them.
   *
   * A drag writes into the gsm field and switches to Convert, so there is one
   * source of truth rather than a second hidden weight that disagrees with the
   * inputs.
   */
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromScale = (value: number) => {
    setMode("convert");
    setOz("");
    setGsmIn(String(Math.min(axisMax, Math.max(axisMin, value))));
  };

  const valueFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return null;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return Math.round(axisMin + ratio * (axisMax - axisMin));
  };

  const onScaleKeyDown = (event: React.KeyboardEvent) => {
    const current = valid ? Math.round(gsm!) : Math.round((axisMin + axisMax) / 2);
    const step = event.shiftKey ? 25 : 5;
    let next: number | null = null;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = current - step;
    else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = current + step;
    else if (event.key === "Home") next = axisMin;
    else if (event.key === "End") next = axisMax;
    if (next === null) return;
    event.preventDefault();
    setFromScale(next);
  };

  const ticks: number[] = [];
  for (let t = axisMin; t <= axisMax; t += 100) ticks.push(t);

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16">
        {/* ------------------------------- Controls ------------------------------ */}
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
                      "border px-4 py-2.5 font-display text-sm font-bold tracking-[-0.01em] transition-colors duration-200 motion-reduce:transition-none",
                      on
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/25 text-ink/75 hover:border-ink hover:text-ink",
                    )}
                  >
                    {m.label}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3.5 text-sm text-ink/65">{MODES.find((m) => m.id === mode)!.hint}</p>

          <div className="mt-9 space-y-6">
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
                {/* A rule with the word set into it, rather than a floating
                    "or": the two fields are alternatives, and the divider
                    should look like one. */}
                <div className="flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-ink/15" />
                  <span className="text-xs uppercase tracking-[0.18em] text-ink/70">or</span>
                  <span className="h-px flex-1 bg-ink/15" />
                </div>
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
                  placeholder="e.g. 1.8"
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
                          "border px-3.5 py-2.5 text-sm transition-colors duration-200 motion-reduce:transition-none",
                          useCutter === opt.on
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/25 text-ink/75 hover:border-ink hover:text-ink",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                {!useCutter && (
                  <div className="grid grid-cols-2 gap-4">
                    <Field id={`${id}-w`} label="Width" value={swatchW} onChange={setSwatchW} suffix="cm" step="0.1" />
                    <Field id={`${id}-h`} label="Height" value={swatchH} onChange={setSwatchH} suffix="cm" step="0.1" />
                  </div>
                )}
                <p className="max-w-prose text-sm leading-relaxed text-ink/65">
                  A standard round cutter takes exactly 100 cm², which is the only reason
                  &ldquo;grams times a hundred&rdquo; works. On a hand-cut swatch it does not.
                </p>
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
                  placeholder="e.g. 200"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    id={`${id}-rl`}
                    label="Length"
                    value={rollLength}
                    onChange={setRollLength}
                    suffix="m"
                    step="1"
                    placeholder="e.g. 100"
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
                <p className="max-w-prose text-sm leading-relaxed text-ink/65">
                  Usable width, not full width — the selvedge is not cuttable. Two mill
                  quotations compared on price per kilo need the same basis on both.
                </p>
              </>
            )}
          </div>
        </div>

        {/* -------------------------------- Result ------------------------------- */}
        <div className="col-span-12 lg:col-span-6">
          {/* Ink ground, lime figure. The palette allows lime as text only on
              ink, and this is the one number the whole section exists for. */}
          <div className="bg-ink p-8 text-paper sm:p-10" data-zone="dark">
            <p className="label text-paper/65">Result</p>

            {/* aria-live: the figure updates in place with no submit step, so
                nothing else would announce it. */}
            <div aria-live="polite">
              {valid ? (
                <>
                  <p className="mt-5 font-display text-[clamp(3rem,10vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.045em] text-lime">
                    {Math.round(gsm!)}
                    <span className="ml-2.5 align-baseline font-sans text-base font-normal tracking-normal text-paper/70">
                      gsm
                    </span>
                  </p>
                  <p className="mt-6 flex flex-wrap items-baseline gap-x-3 border-t border-paper/20 pt-6">
                    <span className="font-display text-2xl font-bold tracking-[-0.02em] text-paper">
                      {gsmToOzPerSqYard(gsm!).toFixed(2)}
                    </span>
                    <span className="text-sm text-paper/70">oz/yd²</span>
                  </p>
                  {secondary && <p className="mt-3 text-sm text-paper/75">{secondary}</p>}
                </>
              ) : (
                <p className="mt-5 max-w-sm text-paper/70">
                  Enter a figure and the equivalent appears here, with every construction
                  published on this page that covers it.
                </p>
              )}
            </div>

            {valid && (
              <div className="mt-8 border-t border-paper/20 pt-6">
                <p className="label text-paper/65">
                  {matching.length > 0
                    ? `Published at this weight · ${matching.length} of ${materials.length}`
                    : "No published construction covers this weight"}
                </p>
                {matching.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {matching.map((m) => (
                      <li key={m.slug} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="font-display text-sm font-bold tracking-[-0.01em] text-paper">
                          {m.name}
                        </span>
                        <span className="text-sm text-paper/70">
                          {m.family} · {m.typicalWeight}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/75">
                    That sits outside the constructions listed above. It does not mean it
                    cannot be developed — send the requirement and we will say whether it is.
                  </p>
                )}

                {uses.length > 0 && (
                  <div className="mt-7">
                    <p className="label text-paper/65">Typically used for</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {uses.map((use) => (
                        <li
                          key={use}
                          className="border border-paper/25 px-2.5 py-1 text-xs text-paper/85"
                        >
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* The weight travels into the form rather than being retyped.
                    The RFQ reads `weight` and `fabric` from the query string,
                    so the buyer arrives with the figure already in the field
                    they were about to fill in by hand. */}
                <Link
                  href={rfqHref}
                  className="mt-8 inline-flex min-h-12 items-center gap-2 bg-lime px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink transition-opacity duration-200 hover:opacity-90 motion-reduce:transition-none"
                >
                  Quote this weight
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink/70">
            This works out fabric weight, not fabric consumption. How many metres a garment
            takes comes from the marker — the pattern, the size ratio, the width and the nap
            all move it — and that is produced at sampling rather than estimated from a
            weight.{" "}
            <Link
              href="/request-a-quote"
              className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
            >
              Send the specification
            </Link>{" "}
            and we will come back on construction and commercial FOB costing.
          </p>
        </div>
      </div>

      {/* -------------------------------- Scale --------------------------------- */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-8">
          <p className="label text-ink/65">Every construction on this page, by weight</p>
          {valid && (
            <p className="text-sm text-ink/70">
              Marker at {Math.round(gsm!)} gsm
            </p>
          )}
        </div>

        {/* The bars carry no information the rows do not already state in text,
            so the whole chart is hidden from assistive technology and the
            names and ranges beside it do the work. */}
        <div className="mt-8 space-y-3.5">
          {/* The axis lives in the same grid columns as the bars. Laid out
              full-width above them it labelled positions the bars do not
              occupy, which is worse than no axis at all. */}
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-12 sm:col-span-7 sm:col-start-4">
              <div className="relative h-4" aria-hidden="true">
                {ticks.map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "absolute top-0 text-[0.6875rem] tabular-nums text-ink/70",
                      i === 0 && "translate-x-0",
                      i === ticks.length - 1 && "-translate-x-full",
                      i > 0 && i < ticks.length - 1 && "-translate-x-1/2",
                    )}
                    style={{ left: `${pct(t)}%` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* The scale is the control, not just a picture of the answer.
                  A real slider role rather than a div with handlers: it is
                  reachable by keyboard, announces its value, and arrow keys
                  step 5 gsm (25 with shift). `pan-y` keeps vertical scrolling
                  working on a phone while the horizontal axis is captured —
                  the same trade the compare slider makes. */}
              <div
                ref={trackRef}
                role="slider"
                tabIndex={0}
                aria-label="Fabric weight"
                aria-valuemin={axisMin}
                aria-valuemax={axisMax}
                aria-valuenow={valid ? Math.round(gsm!) : undefined}
                aria-valuetext={valid ? `${Math.round(gsm!)} grams per square metre` : undefined}
                onKeyDown={onScaleKeyDown}
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture(event.pointerId);
                  dragging.current = true;
                  const value = valueFromClientX(event.clientX);
                  if (value !== null) setFromScale(value);
                }}
                onPointerMove={(event) => {
                  if (!dragging.current) return;
                  const value = valueFromClientX(event.clientX);
                  if (value !== null) setFromScale(value);
                }}
                onPointerUp={(event) => {
                  dragging.current = false;
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }}
                onPointerCancel={() => {
                  dragging.current = false;
                }}
                className="group relative mt-1 h-9 cursor-ew-resize select-none"
                style={{ touchAction: "pan-y" }}
              >
                <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink/20" />
                {valid && (
                  <span
                    className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-ink bg-paper transition-colors duration-200 group-hover:bg-ink motion-reduce:transition-none"
                    style={{ left: `${Math.min(100, Math.max(0, pct(gsm!)))}%` }}
                  />
                )}
              </div>
              <p className="mt-1 text-xs text-ink/65">
                Drag, or use the arrow keys, to see what else is made at a weight.
              </p>
            </div>
          </div>

          {PLOTTED.map(({ material, range }) => {
            const covers = valid && gsm! >= range.min && gsm! <= range.max;
            return (
              <div
                key={material.slug}
                className="grid grid-cols-12 items-center gap-x-4 gap-y-1.5"
              >
                <p className="col-span-12 sm:col-span-3">
                  <span
                    className={cn(
                      "font-display text-sm font-bold tracking-[-0.01em]",
                      covers ? "text-ink" : "text-ink/70",
                    )}
                  >
                    {material.name}
                  </span>
                  <span className="ml-2 whitespace-nowrap text-xs text-ink/65 sm:hidden">
                    {material.typicalWeight}
                  </span>
                </p>

                <div className="col-span-12 sm:col-span-7">
                  <div className="relative h-7 bg-ink/[0.06]" aria-hidden="true">
                    <span
                      className={cn(
                        "absolute inset-y-0 transition-colors duration-300 motion-reduce:transition-none",
                        covers ? "bg-ink" : "bg-ink/20",
                      )}
                      style={{
                        left: `${pct(range.min)}%`,
                        width: `${pct(range.max) - pct(range.min)}%`,
                      }}
                    />
                    {valid && (
                      /* Paper core with an ink ring: legible against the empty
                         track and against a solid ink bar, which a single
                         flat colour cannot be. Lime is not an option — it is
                         about 1.4:1 on paper. */
                      <span
                        className={cn(
                          "absolute w-0.5 bg-paper",
                          /* Rows are 14px apart, so a marker clipped to the bar
                             breaks into eight separate ticks. Bleeding 7px past
                             each edge closes the gaps and it reads as one weight
                             cutting across every construction. Only from `sm`:
                             below that the name sits above its bar and a
                             continuous line would run through the text. */
                          "inset-y-0 sm:-inset-y-[7px]",
                        )}
                        style={{
                          left: `${Math.min(100, Math.max(0, pct(gsm!)))}%`,
                          boxShadow: "0 0 0 1px var(--color-ink)",
                        }}
                      />
                    )}
                  </div>
                </div>

                <p className="col-span-12 hidden text-xs text-ink/65 sm:col-span-2 sm:block">
                  {material.typicalWeight}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-7 max-w-prose text-sm leading-relaxed text-ink/70">
          Ranges are the constructions published above, not a stock list. A weight outside
          all of them is a development question rather than a refusal.
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
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
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
          /* A focused number input takes the page's scroll and changes its own
             value. On a long page that reads as the answer changing by itself. */
          onWheel={(e) => e.currentTarget.blur()}
          className="w-full bg-transparent px-4 py-3.5 font-display text-lg font-bold tracking-[-0.01em] text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink/35"
        />
        <span className="flex shrink-0 items-center border-l border-ink/15 bg-ink/[0.04] px-4 text-sm text-ink/70">
          {suffix}
        </span>
      </div>
    </div>
  );
}
