"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/**
 * Renders its children on the public site and nothing inside /pipeline.
 *
 * The enquiry register shares the root layout, because a second root layout
 * would mean moving every public route into a route group. Staff working
 * through enquiries do not need the announcement bar, the mega menu or a
 * "Request a quote" bar, so those are wrapped in this instead. The children
 * are server-rendered as usual; this only decides whether to show them.
 */
export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/pipeline")) return null;
  return <>{children}</>;
}

/**
 * Notes where this visit came from, once, for the enquiry it may lead to. In
 * page memory only; see lib/attribution.ts for why nothing is written to the
 * visitor's device.
 */
export function ArrivalCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
