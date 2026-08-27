"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal in-view observer.
 *
 * Sets `inView` once, the first time the element crosses the threshold, then
 * disconnects. That is the entire runtime cost of the site's scroll-reveal
 * system — the animation itself is CSS.
 *
 * Elements start visible for anyone with `prefers-reduced-motion`, and the CSS
 * enforces the same, so content is never gated behind an effect that will not
 * play.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Root margin, e.g. "0px 0px -12% 0px" to trigger slightly early. */
  margin?: string;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support: show immediately rather than staying hidden
    // forever. This synchronises with a genuine external capability check —
    // there is no render-time equivalent, since feature detection itself must
    // run after mount.
    if (typeof IntersectionObserver === "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0, rootMargin: options?.margin ?? "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.margin]);

  return { ref, inView };
}
