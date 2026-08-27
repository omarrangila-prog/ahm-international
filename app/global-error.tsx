"use client";

import { useEffect } from "react";

/**
 * Root error boundary.
 *
 * Catches a failure in the root layout itself — the one case `app/error.tsx`
 * cannot handle, because at that point the layout providing the header, footer
 * and stylesheet has not rendered.
 *
 * It therefore renders its own `<html>` and carries inline styles rather than
 * Tailwind classes: if the layout failed, the stylesheet may not have loaded,
 * and a page that depends on it would show unstyled text at the worst possible
 * moment. The palette is hard-coded here for the same reason.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF8F2",
          color: "#101315",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#D84A1E",
              margin: 0,
            }}
          >
            Something went wrong
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 800,
              margin: "1.25rem 0 0",
            }}
          >
            This page failed to load.
          </h1>

          <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, color: "rgba(16,19,21,0.72)", marginTop: "1.5rem" }}>
            The problem is on our side. Try again: and if it persists, send your enquiry through the
            quote form and we will pick it up directly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                height: "3.5rem",
                padding: "0 2rem",
                border: "none",
                background: "#2754FF",
                color: "#fff",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/request-a-quote"
              style={{
                height: "3.5rem",
                padding: "0 2rem",
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(16,19,21,0.25)",
                color: "#101315",
                textDecoration: "none",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Request a quote
            </a>
          </div>

          {error.digest && (
            <p style={{ marginTop: "2.5rem", fontSize: "0.75rem", color: "rgba(16,19,21,0.45)" }}>
              Reference: <span style={{ fontFamily: "ui-monospace, monospace" }}>{error.digest}</span>
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
