"use client";

import Link from "next/link";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { Button } from "./Button";

/**
 * A link that reports an analytics event on click.
 *
 * Exists so that server components can keep a single interactive element without
 * becoming client components themselves — the tracking is the only part that
 * needs the browser.
 */
export function RfqClickLink({
  href,
  event,
  location,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track(event, { location })}>
      {children}
    </Link>
  );
}

/**
 * The site's Button, reporting an event on click. Same reason as RfqClickLink:
 * a server-rendered section keeps its primary action measurable without the
 * section itself shipping to the browser.
 */
export function TrackedButton({
  event,
  location,
  ...props
}: React.ComponentProps<typeof Button> & { href: string; event: AnalyticsEvent; location: string }) {
  return <Button {...props} onClick={() => track(event, { location })} />;
}
