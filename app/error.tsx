"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

/**
 * Route error boundary.
 *
 * Shows a recovery path rather than a stack trace. The underlying error is
 * logged to the console for the developer; the visitor gets a plain statement
 * and two ways forward, because a buyer who hits an error and finds no route to
 * a human simply leaves.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error);
  }, [error]);

  return (
    <Section zone="cream" spacing="lg">
      <div className="shell-wide max-w-3xl">
        <p className="label text-orange-deep">Something went wrong</p>
        <h1 className="mt-5 font-display text-display text-ink">
          This page failed
          <span className="block text-cobalt">to load.</span>
        </h1>
        <p className="mt-7 text-lead text-ink/70">
          The problem is on our side, not yours. Try again: and if it persists, send your enquiry
          through the quote form and we will pick it up directly.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-14 items-center bg-cobalt px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-ink"
          >
            Try again
          </button>
          <Link
            href="/request-a-quote"
            className="inline-flex h-14 items-center border border-ink/25 px-8 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Request a Quote
          </Link>
        </div>

        {error.digest && (
          <p className="mt-10 border-t border-line pt-5 text-xs text-ink/60">
            Reference: <span className="font-mono">{error.digest}</span>
          </p>
        )}
      </div>
    </Section>
  );
}
