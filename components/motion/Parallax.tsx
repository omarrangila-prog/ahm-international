import { cn } from "@/lib/utils";

/**
 * Restrained parallax frame.
 *
 * Kept as a plain overflow container. A scroll-linked transform was the only
 * reason this needed the browser, and the effect was subtle enough that the
 * cost — a scroll listener plus an animation runtime on every page that used
 * it — was not worth paying. The frame and its crop behaviour are unchanged.
 */
export function Parallax({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  /** Retained for call-site compatibility; no longer used. */
  distance?: number;
}) {
  return <div className={cn("overflow-hidden", className)}>{children}</div>;
}
