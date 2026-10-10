"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  CONSENT_KEY,
  CONSENT_RESET_EVENT,
  GA_MEASUREMENT_ID,
  measurementEnabled,
} from "@/lib/measurement";

/**
 * Consent-gated GA4.
 *
 * Renders nothing at all unless a measurement ID is configured. With one, it
 * asks once, remembers the answer in localStorage, and only after "Allow"
 * injects gtag.js. "Decline" loads nothing. Withdrawing consent later (the
 * button on /cookies) deletes Google's cookies and reloads, so a script that
 * was already running stops.
 *
 * The choice is read through useSyncExternalStore so the server render and the
 * first client render agree (both "unknown"), and the bar never flashes on a
 * returning visitor who has already answered.
 */

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Private mode or blocked storage: ask, and do not remember.
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_RESET_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_RESET_EVENT, onChange);
  };
}

/** GA's own cookies, on this host and on the registrable domain it prefers. */
function clearGoogleCookies() {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!/^_ga/.test(name)) continue;
    for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }
}

function choose(choice: Choice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Not remembered; the choice still applies to this page view.
  }
  window.dispatchEvent(new Event(CONSENT_RESET_EVENT));
}

export function Measurement() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "unknown" as const);

  if (!measurementEnabled || !GA_MEASUREMENT_ID || choice === "unknown") return null;

  if (choice === "granted") {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
        </Script>
      </>
    );
  }

  if (choice === "denied") return null;

  return (
    <section
      aria-label="Measurement consent"
      className="fixed inset-x-4 bottom-20 z-[60] max-w-md border border-ink/20 bg-paper p-5 shadow-[0_18px_40px_-18px_rgba(16,19,21,0.45)] sm:inset-x-auto sm:left-6 lg:bottom-6"
      data-print="hide"
    >
      <p className="font-display text-sm font-bold tracking-[-0.01em] text-ink">May we measure how this site is used?</p>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">
        Google Analytics, only if you allow it, to see which pages buyers find useful. No advertising and no
        tracking across other sites.{" "}
        <Link href="/cookies" className="inline-block py-1 text-ink underline underline-offset-4">
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-10 bg-ink px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-lime hover:text-ink"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-10 border border-ink/25 px-5 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
        >
          Decline
        </button>
      </div>
    </section>
  );
}

/**
 * Reopens the choice. Used on /cookies so consent can be withdrawn as easily
 * as it was given; withdrawing removes Google's cookies and reloads.
 */
export function ConsentReset() {
  const choice = useSyncExternalStore(subscribe, readChoice, () => "unknown" as const);
  if (!measurementEnabled) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4 border-l-2 border-ink pl-4 text-sm text-ink/75">
      <p>
        Your current choice:{" "}
        <span className="font-medium text-ink">
          {choice === "granted" ? "measurement allowed" : choice === "denied" ? "measurement declined" : "not yet made"}
        </span>
      </p>
      <button
        type="button"
        onClick={() => {
          const wasGranted = readChoice() === "granted";
          try {
            window.localStorage.removeItem(CONSENT_KEY);
          } catch {
            // Nothing stored to remove.
          }
          if (wasGranted) {
            clearGoogleCookies();
            window.location.reload();
            return;
          }
          window.dispatchEvent(new Event(CONSENT_RESET_EVENT));
        }}
        className="inline-flex h-10 items-center border border-ink/25 px-4 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
      >
        Change your choice
      </button>
    </div>
  );
}
