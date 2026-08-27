"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Fires one buyer-intent event when a page mounts.
 *
 * Spec §36 asks for intent events rather than vanity pageviews, and the pages
 * that carry intent — materials, quality, export, an industry, a case study —
 * are server components with no client boundary of their own. Rather than
 * converting any of them, this drops a single effect in.
 *
 * The payload carries only what the page is about. No buyer identity, no query
 * string, nothing that could turn the analytics stream into PII (§36, §50).
 */
export function PageViewEvent({
  event,
  detail,
}: {
  event: AnalyticsEvent;
  /** Optional non-identifying context, e.g. an industry slug. */
  detail?: string;
}) {
  useEffect(() => {
    track(event, detail ? { detail } : {});
  }, [event, detail]);

  return null;
}
