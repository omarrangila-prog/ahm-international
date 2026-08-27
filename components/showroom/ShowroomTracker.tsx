"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Records that a showroom was opened (spec §27).
 *
 * The token is **not** sent to analytics: it is a credential, and §36 is explicit
 * that PII must not be forwarded. Only the label travels, which is what makes the
 * event useful internally without turning the analytics stream into a list of
 * working showroom URLs.
 */
export function ShowroomTracker({ token, label }: { token: string; label: string }) {
  useEffect(() => {
    track("showroom_opened", { showroom: label });
    // `token` is intentionally unused in the payload; it is in the dependency
    // list so navigating between showrooms re-fires the event.
  }, [token, label]);

  return null;
}
