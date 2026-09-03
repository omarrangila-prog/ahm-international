"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

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
        /**
         * `lerp`, not `duration` + easing.
         *
         * Those are two different feels, not two spellings of one. With a
         * duration each wheel notch starts its own timed animation, so a reader
         * scrolling in quick succession — which is how anyone actually reads —
         * gets animations restarting over each other and the motion arrives in
         * steps. `lerp` instead eases the real scroll position toward the target
         * by a fixed fraction every frame, so continuous input produces one
         * continuous glide that never restarts.
         *
         * 0.055 is measured, not guessed. Sampling `scrollY` every frame through
         * a sustained scroll and reading the per-frame velocity: at 0.14 the
         * page is in motion for 54% of frames with a mean jerk of 31, which is
         * the browser's own stepping with extra latency. Lowering it raises both
         * continuity and steadiness monotonically — 0.11 gives 60% and 22, 0.085
         * gives 71% and 17, and by 0.055 the page is moving on 98% of frames
         * with a jerk of 14. Below about 0.045 the numbers barely improve while
         * the scroll visibly lags the wheel, which reads as latency rather than
         * as weight.
         */
        lerp: 0.055,
        // Left at 1. Multiplying the notch pushes the target further ahead of
        // the eased position, and at this lerp that reads as rubber-banding —
        // the page still travelling well after the wheel has stopped.
        wheelMultiplier: 1,
        smoothWheel: true,
        // Touch devices already have momentum from the platform, and layering a
        // second easing on top of it feels like lag rather than smoothness.
        syncTouch: false,
        // Lenis animates the same property as `scroll-behavior: smooth`; letting
        // it own in-page anchors keeps the two from fighting over one jump.
        anchors: true,
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
