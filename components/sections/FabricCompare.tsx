"use client";

import { useId, useState } from "react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { materials, MATERIAL_DISCLAIMER } from "@/data/materials";
import { cn } from "@/lib/utils";

/**
 * FABRIC COMPARE
 * ==============
 *
 * A buyer choosing between two constructions is almost never choosing in the
 * abstract — it is pique against jersey for a polo, or twill against canvas for
 * a work trouser. The list above answers "what is this fabric"; this answers
 * "which of these two", which is the question that actually stalls a spec.
 *
 * Two things it deliberately does not do:
 *
 *   1. **It does not let the photographs carry the argument.** The macros come
 *      from a texture library shot under one lighting sweep, so pique and jersey
 *      read more alike than they are. The spec row underneath is therefore not a
 *      caption — it is the half of the comparison that is actually reliable, and
 *      it is the half a sourcing manager quotes from.
 *   2. **It does not imply stock.** Every construction on this page is a
 *      construction, not an inventory line, so `MATERIAL_DISCLAIMER` travels
 *      with it exactly as it does everywhere else materials are rendered.
 *
 * The handle is a real `<input type="range">`, styled rather than reimplemented.
 * A div with pointer handlers would need keyboard support, focus, touch and an
 * accessible name rebuilt from nothing, and would still not be announced as a
 * slider. Everything below `range-thumb` in globals.css exists to make the
 * native control look like the seam it is dragging.
 */

/** Width of the native thumb in globals.css, needed to keep the seam under it. */
const THUMB_PX = 44;

/** Only constructions whose macro actually exists can be compared. */
const comparable = materials.filter((m) => hasAsset(m.asset));

/** Pique against jersey: the comparison this site publishes a whole guide about. */
const defaultLeft = comparable.findIndex((m) => m.slug === "cotton-pique");
const defaultRight = comparable.findIndex((m) => m.slug === "single-jersey");

export function FabricCompare() {
  const [position, setPosition] = useState(50);
  const [leftIndex, setLeftIndex] = useState(defaultLeft === -1 ? 0 : defaultLeft);
  const [rightIndex, setRightIndex] = useState(defaultRight === -1 ? 1 : defaultRight);
  const sliderId = useId();

  const left = comparable[leftIndex];
  const right = comparable[rightIndex];
  if (!left || !right) return null;

  // Matches how a native range insets its thumb by half its width at each end;
  // without it the seam and the grip separate by up to 22px at the extremes.
  const seam = `calc(${position}% + ${((50 - position) / 100) * THUMB_PX}px)`;

  const specs = [
    { label: "Construction", a: left.construction, b: right.construction },
    { label: "Typical weight", a: left.typicalWeight, b: right.typicalWeight },
    { label: "Weight class", a: left.weightClass, b: right.weightClass },
    { label: "Stretch", a: left.stretch, b: right.stretch },
    { label: "Hand feel", a: left.handFeel, b: right.handFeel },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FabricPicker
          label="Left of the seam"
          value={leftIndex}
          exclude={rightIndex}
          onChange={setLeftIndex}
        />
        <FabricPicker
          label="Right of the seam"
          value={rightIndex}
          exclude={leftIndex}
          onChange={setRightIndex}
        />
      </div>

      <div className="relative mt-8 aspect-[4/3] w-full select-none overflow-hidden bg-paper sm:aspect-[2/1]">
        {/* Right-hand fabric fills the frame; the left one is clipped over it. */}
        <SmartImage
          asset={right.asset}
          sizes={SIZES.full}
          className="absolute inset-0 h-full w-full"
          imageClassName="object-cover"
          alt={`${right.name} fabric structure`}
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <SmartImage
            asset={left.asset}
            sizes={SIZES.full}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-cover"
            alt={`${left.name} fabric structure`}
          />
        </div>

        {/* The seam. Decorative: the control that moves it is the range below.
            The offset matches how a native range insets its thumb by half its
            width at each end — without it the line and the grip separate by up
            to 22px at the extremes. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-lime"
          style={{ left: seam }}
          aria-hidden="true"
        />
        {/* The grip. Drawn here rather than left to the native thumb, which
            WebKit pins to the top of the track. */}
        <div
          className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-lime bg-ink"
          style={{ left: seam }}
          aria-hidden="true"
        >
          <span className="h-3.5 w-px bg-lime" />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-ink/80 px-2.5 py-1 label text-paper">
          {left.name}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-ink/80 px-2.5 py-1 label text-paper">
          {right.name}
        </span>

        <label className="sr-only" htmlFor={sliderId}>
          Position of the seam between {left.name} and {right.name}
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="compare-range absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent"
        />
      </div>

      <dl className="mt-10 border-t border-line">
        <div className="grid grid-cols-12 gap-4 border-b border-line py-3">
          <dt className="col-span-12 label text-ink/60 sm:col-span-4">Comparing</dt>
          <dd className="col-span-6 font-display text-sm font-bold tracking-[-0.02em] text-ink sm:col-span-4">
            {left.name}
          </dd>
          <dd className="col-span-6 font-display text-sm font-bold tracking-[-0.02em] text-ink sm:col-span-4">
            {right.name}
          </dd>
        </div>
        {specs.map((row) => (
          <div key={row.label} className="grid grid-cols-12 gap-4 border-b border-line py-3">
            <dt className="col-span-12 label text-ink/60 sm:col-span-4">{row.label}</dt>
            <dd
              className={cn(
                "col-span-6 text-sm sm:col-span-4",
                row.a === row.b ? "text-ink/60" : "text-ink/80",
              )}
            >
              {row.a}
            </dd>
            <dd
              className={cn(
                "col-span-6 text-sm sm:col-span-4",
                row.a === row.b ? "text-ink/60" : "text-ink/80",
              )}
            >
              {row.b}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-ink/70">{MATERIAL_DISCLAIMER}</p>
    </div>
  );
}

/**
 * The other side's current fabric is removed from the options rather than
 * disabled: comparing a fabric with itself is not a state worth being able to
 * reach, and a disabled option in a native select is still announced.
 */
function FabricPicker({
  label,
  value,
  exclude,
  onChange,
}: {
  label: string;
  value: number;
  exclude: number;
  onChange: (index: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label block text-ink/60">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full border border-line bg-white px-4 py-3 font-display text-sm font-bold tracking-[-0.01em] text-ink"
      >
        {comparable.map((material, i) =>
          i === exclude ? null : (
            <option key={material.slug} value={i}>
              {material.name}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
