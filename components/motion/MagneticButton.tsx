"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only magnetic hover.
 *
 * Lets a CTA lean a few pixels toward the cursor. Implemented as a plain CSS
 * transform with a transition rather than a spring — the movement is small
 * enough that the difference is invisible, and it avoids shipping an animation
 * runtime for one effect.
 *
 * The capability check runs in an effect rather than during render: the server
 * cannot know the pointer type, so testing `matchMedia` inline would make the
 * first client render disagree with the HTML. Starting disabled and enabling
 * after mount means the two agree, and touch devices never attach the listener.
 */
export function MagneticButton({
  children,
  /** Maximum displacement in pixels. */
  strength = 8,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const query = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(motionOk && query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  function handleMove(event: React.MouseEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!enabled || !node) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength;
    const y = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength;
    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", transition: "transform 0.35s var(--ease-out-expo)" }}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? reset : undefined}
    >
      {children}
    </span>
  );
}
