"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Numbered construction points on a garment image, with the explanations
 * beside it.
 *
 * The list carries everything: the markers are a visual index into it and are
 * hidden from assistive technology, so nothing depends on pointing at the
 * picture. Hovering an explanation lights its marker, which is how a buyer
 * finds the strap slider on a black apron at a glance.
 *
 * The image arrives as a rendered node from the server, so the image registry
 * and its "AI illustration" label stay where they are decided.
 */

type Point = { x: number; y: number; title: string; body: string };

export function ConstructionCallouts({ image, points, note }: { image: React.ReactNode; points: Point[]; note: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-x-14">
      <div className="col-span-12 lg:col-span-6">
        <div className="relative aspect-square w-full bg-white">
          {image}
          {points.map((p, i) => (
            <span
              key={p.title}
              aria-hidden="true"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={cn(
                "absolute z-[3] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white font-display text-xs font-bold shadow-[0_4px_14px_rgba(16,19,21,0.35)] transition-[transform,background-color,color] duration-300",
                active === i ? "scale-125 bg-lime text-ink" : "bg-ink text-paper",
              )}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 lg:self-center">
        <ol className="divide-y divide-line border-y border-line">
          {points.map((p, i) => (
            <li
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={cn("flex gap-5 px-2 py-5 transition-colors duration-300", active === i && "bg-ink/[0.04]")}
            >
              <span className="numeral w-6 shrink-0 text-lg text-ink">{i + 1}</span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-ink/70">{note}</p>
      </div>
    </div>
  );
}
