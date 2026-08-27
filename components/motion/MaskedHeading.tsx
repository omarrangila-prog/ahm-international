"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Line-by-line masked heading reveal.
 *
 * Each line sits in its own overflow-hidden track and rides up into view, which
 * reads as typography being set rather than text fading in. Lines are supplied
 * as an array so the break points are deliberate at every viewport instead of
 * landing wherever the text happens to wrap — a wrapped line inside one track
 * would reveal two lines at once and break the effect.
 *
 * Accessibility: the animated lines are `aria-hidden` and the full heading is
 * exposed once via a visually hidden span, so it is announced as one string.
 * Above-the-fold headings use `immediate`, which plays a CSS animation on load
 * and needs no observer at all.
 *
 * The visually-hidden span is styled inline (`VISUALLY_HIDDEN`), not with the
 * `sr-only` utility class. This component is used for large multi-line
 * headings throughout the site, and that span holds the *entire* heading as
 * one plain-text run — full page width, several lines tall. Measured directly
 * from a production trace: for one early frame, before the stylesheet had been
 * applied, that span rendered at its unstyled block size before collapsing
 * once the class took effect, and the collapse alone produced a CLS of 0.284 —
 * effectively the whole score, from an element no one ever saw. An inline
 * style has nothing to wait for, so it is correct from the very first paint.
 */
const VISUALLY_HIDDEN: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export type HeadingLine = {
  text: string;
  /** Tailwind class for this line only — used to colour a single word. */
  className?: string;
};

type Props = {
  lines: (string | HeadingLine)[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Seconds before the first line moves. */
  delay?: number;
  /** Plays on mount rather than on scroll. Use above the fold. */
  immediate?: boolean;
  /**
   * Renders with no entrance at all.
   *
   * Use for the largest text above the fold. An entrance animation with
   * `fill-mode: both` holds the element outside its mask until the delay
   * elapses, so the browser cannot count it as painted — which hands Largest
   * Contentful Paint to whatever loads next, usually an image. Painting the
   * headline immediately and animating everything around it is both faster and
   * a better read: the statement is simply there, and the page assembles round it.
   */
  instant?: boolean;
  id?: string;
};

export function MaskedHeading({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
  instant = false,
  id,
}: Props) {
  const normalised: HeadingLine[] = lines.map((l) => (typeof l === "string" ? { text: l } : l));
  const plain = normalised.map((l) => l.text).join(" ");

  const { ref, inView } = useInView<HTMLElement>({ margin: "0px 0px -12% 0px" });

  if (instant) {
    return (
      <Tag id={id} className={className}>
        {normalised.map((line, i) => (
          <span key={i} className={cn("block", line.className)}>
            {line.text}
          </span>
        ))}
      </Tag>
    );
  }

  const content = normalised.map((line, i) => {
    // Tighter stagger above the fold: every 10 ms of delay here is 10 ms of LCP.
    const stepDelay = `${delay + i * (immediate ? 0.055 : 0.085)}s`;
    return (
      <span
        key={i}
        className="mask-line"
        data-mask-line=""
        style={
          immediate
            ? ({ "--enter-delay": stepDelay } as React.CSSProperties)
            : ({ "--mask-delay": stepDelay } as React.CSSProperties)
        }
      >
        <span className={cn("block", line.className)}>{line.text}</span>
      </span>
    );
  });

  if (immediate) {
    return (
      <Tag id={id} className={className}>
        <span style={VISUALLY_HIDDEN}>{plain}</span>
        <span aria-hidden="true" className="enter-mask block">
          {content}
        </span>
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} ref={ref as React.Ref<never>} data-inview={inView ? "true" : "false"}>
      <span style={VISUALLY_HIDDEN}>{plain}</span>
      <span aria-hidden="true" className="block">
        {content}
      </span>
    </Tag>
  );
}
