"use client";

import { useState, useSyncExternalStore } from "react";
import { setVisitorCounting, visitorCountingOff } from "@/lib/traffic/client";

/**
 * The opt-out for the visit-count cookie, on the cookie page. Switching off
 * replaces the date with "off"; switching back on deletes the cookie, so the
 * next visit is counted as new.
 *
 * The cookie and Global Privacy Control are read from the browser, so the
 * server renders nothing and the switch appears once the page has hydrated.
 */
type State = "off" | "on" | "gpc";

const noop = () => () => {};
const read = (): State =>
  (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true
    ? "gpc"
    : visitorCountingOff()
      ? "off"
      : "on";

export function VisitorCountingSwitch() {
  const initial = useSyncExternalStore<State | null>(noop, read, () => null);
  const [chosen, setChosen] = useState<State | null>(null);
  const state = chosen ?? initial;
  if (state === null) return null;

  return (
    <div className="mt-10 border border-line p-5">
      <h2 className="font-display text-lg font-bold text-ink">Visit-count cookie</h2>
      <p role="status" className="mt-2 text-sm text-ink/75">
        {state === "gpc"
          ? "Your browser sends Global Privacy Control, so this site does not set the visit-count cookie for you."
          : state === "off"
            ? "Switched off. This browser is not counted as a visitor; its visits still add to the daily page totals, with nothing stored."
            : "Switched on. The cookie holds only the date this browser was last counted."}
      </p>
      {state !== "gpc" && (
        <button
          type="button"
          onClick={() => {
            const next = state === "off" ? "on" : "off";
            setVisitorCounting(next === "on");
            setChosen(next);
          }}
          className="mt-4 h-11 border border-ink px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:bg-ink hover:text-paper"
        >
          {state === "off" ? "Switch the cookie back on" : "Switch the cookie off"}
        </button>
      )}
    </div>
  );
}
