"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SMOOTH SCROLL
 * =============
 *
 * Lenis takes the wheel and touch input and eases the scroll position, which is
 * what gives a page that continuous, weighted feel rather than the browser's
 * stepped default.
 *
 * Three things it has to get right on this site, none of them optional:
 *
 *   1. **`prefers-reduced-motion` disables it entirely.** Hijacking scrolling is
 *      precisely the class of motion that setting exists to switch off, and it
 *      is a documented trigger for vestibular symptoms. The effect never starts
 *      for those readers, and the page keeps the browser's own scrolling.
 *   2. **Anchor links must still work.** Native `scroll-behavior: smooth` and
 *      Lenis both animate the same property and fight; the CSS rule is turned
 *      off while Lenis is running and restored when it stops.
 *   3. **It must not outlive the page.** The RAF loop and the instance are torn
 *      down on unmount, so a route change cannot leave two loops driving one
 *      scroll position.
 *
 * Renders nothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    function start() {
      if (lenis) return;
      lenis = new Lenis({
        // Long enough to read as weight, short enough that a deliberate scroll
        // still lands where the reader aimed it.
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        // Touch devices already have momentum from the platform, and layering
        // a second easing on top of it feels like lag rather than smoothness.
        syncTouch: false,
      });
      // Lenis animates scrollTop itself; leaving the CSS rule on makes the two
      // compete on every in-page anchor.
      document.documentElement.style.scrollBehavior = "auto";

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    function stop() {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
      document.documentElement.style.removeProperty("scroll-behavior");
    }

    const apply = () => (query.matches ? stop() : start());
    apply();
    query.addEventListener("change", apply);

    return () => {
      query.removeEventListener("change", apply);
      stop();
    };
  }, []);

  return null;
}
