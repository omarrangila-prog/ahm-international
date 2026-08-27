"use client";

import { useInView } from "@/lib/use-in-view";

/**
 * Scroll-triggered entrance.
 *
 * A thin client wrapper that flips `data-inview`; the transition itself is CSS.
 * That keeps the reveal system to one small observer per group instead of an
 * animation runtime, and lets everything it wraps stay server-rendered.
 *
 * Runs once. Collapses to a plain render under `prefers-reduced-motion`, which
 * is enforced in CSS rather than in JS, so it holds even before hydration.
 */

type Direction = "up" | "down" | "left" | "right" | "none";

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const { ref, inView } = useInView<HTMLElement>({ margin: "0px 0px -12% 0px" });

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-reveal-dir={direction}
      data-inview={inView ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers direct children.
 *
 * One observer for the whole group; the stagger is a per-child CSS delay applied
 * by `nth-child`, so no wrapper element is added around each item.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  /** Ignored — retained so callers reading as a prop keep working. */
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const { ref, inView } = useInView<HTMLElement>({ margin: "0px 0px -10% 0px" });

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal-group=""
      data-inview={inView ? "true" : "false"}
      className={className}
      style={{ "--stagger": `${stagger}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** A staggered child. Server-renderable — it carries attributes, not behaviour. */
export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag data-reveal="" data-reveal-dir="up" className={className}>
      {children}
    </Tag>
  );
}
