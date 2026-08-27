"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { restartAttributeAnimation } from "@/lib/restart-animation";

/**
 * ROUTE TRANSITION
 * ================
 *
 * Brief §60: "Keep transitions fast. Never block navigation for animation."
 *
 * Nothing here gates navigation. Next has already swapped the route by the time
 * this runs — the animation plays over content that is *already mounted*, so a
 * user who navigates again mid-animation is never held up.
 *
 * Three deliberate constraints:
 *
 * 1. **Nothing animates on first load.** The `first` ref swallows the mount
 *    pass, so the initial paint is identical to having no transition at all.
 *    Animating the first paint delays the largest element, and this codebase has
 *    measured that cost before: a root `loading.tsx` was worth CLS 0.284 and 17
 *    Lighthouse points.
 *
 * 2. **Opacity and transform only.** Neither triggers layout, so the animation
 *    cannot contribute to CLS. Animating height, margin or top would.
 *
 * 3. **No state, and no key on the wrapper.** Setting state from an effect
 *    triggers a second render pass, and keying the wrapper on the pathname would
 *    unmount and remount the whole subtree on every navigation. The attribute is
 *    set directly on the node instead, and the forced reflow between remove and
 *    add is what restarts the animation on repeat navigations.
 *
 * React 19.2 stable does not export `ViewTransition` — it is canary-only — and
 * moving the whole app onto a canary React to get a crossfade is not a trade
 * worth making.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    restartAttributeAnimation(ref.current, "data-route-enter");
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
