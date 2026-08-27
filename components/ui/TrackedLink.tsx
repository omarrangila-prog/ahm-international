"use client";

import Link from "next/link";
import { track, type AnalyticsEvent } from "@/lib/analytics";

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
