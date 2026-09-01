/**
 * HTTP SECURITY HEADERS
 * =====================
 *
 * Applied to every response in `next.config.ts`.
 *
 * A procurement or IT reviewer at a large buyer will run this domain through a
 * header scanner before approving a supplier, so these are commercial signals as
 * well as controls. Each one below is chosen for what it actually prevents on
 * this site, not copied from a checklist.
 */

/**
 * Content Security Policy.
 *
 * `script-src` carries `'unsafe-inline'` and that is a deliberate trade, not an
 * oversight. Eliminating it requires per-request nonces, which requires
 * middleware, which makes every page dynamic — and this site is 55 statically
 * prerendered pages. Trading static generation for a marginal XSS control on a
 * site with no user-generated HTML would cost real performance for very little
 * security.
 *
 * The compensating controls are that everything else is locked down: no external
 * script origins, no framing, no plugins, no arbitrary form targets, and the
 * only HTML this site injects is JSON-LD that is escaped at the point of
 * serialisation (see `lib/json-ld.ts`).
 *
 * If analytics are added later behind consent, add that origin to `script-src`
 * and `connect-src` explicitly rather than widening to a wildcard.
 *
 * `'unsafe-eval'` is added in development and never in production. React's dev
 * build uses `eval()` for debugging features — reconstructing a callstack from
 * another environment, chiefly — and logs a console error when the policy blocks
 * it. React's own message says it "will never use eval() in production mode",
 * and Next's production bundles do not call it either, so allowing it while
 * developing costs the shipped site nothing. The switch reads `NODE_ENV`, which
 * `next build` pins to "production" regardless of the surrounding shell, and
 * `tests/security-headers.test.ts` asserts the production policy cannot contain
 * it.
 */
export function buildCsp({ development }: { development: boolean }) {
  return [
    "default-src 'self'",
    // Next's hydration bootstrap is inline; see the note above.
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
    // Tailwind and React style props emit inline styles.
    "style-src 'self' 'unsafe-inline'",
    // data: for blur placeholders, blob: for the file previews in the RFQ form.
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    // The RFQ form must not be able to post anywhere but this origin.
    "form-action 'self'",
    // Clickjacking: the modern replacement for X-Frame-Options.
    "frame-ancestors 'none'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

const csp = buildCsp({ development: process.env.NODE_ENV === "development" });

export const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },

  /**
   * Two years, subdomains included, preload-eligible.
   *
   * Only meaningful over HTTPS, and it is deliberately strict: once a browser
   * sees this it will refuse plain HTTP to this host for the duration. Confirm
   * every subdomain is HTTPS-capable before submitting to the preload list.
   */
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },

  /** Stops a browser MIME-sniffing an upload or asset into something executable. */
  { key: "X-Content-Type-Options", value: "nosniff" },

  /** Legacy clickjacking control for browsers that predate frame-ancestors. */
  { key: "X-Frame-Options", value: "DENY" },

  /**
   * Send the full URL only to this origin. A buyer clicking out to a supplier
   * directory should not leak which quotation page they came from.
   */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /** This site needs none of these. Denying them removes the attack surface. */
  {
    key: "Permissions-Policy",
    value: [
      "camera=()", "microphone=()", "geolocation=()", "payment=()", "usb=()",
      "magnetometer=()", "gyroscope=()", "accelerometer=()", "midi=()",
      "interest-cohort=()", "browsing-topics=()",
    ].join(", "),
  },

  /** Isolates this origin from windows it opens or that open it. */
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },

  /** Prevents Adobe cross-domain policy files being honoured on this host. */
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },

  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/**
 * Extra headers for the API routes.
 *
 * Nothing under /api should ever be cached or indexed: responses carry
 * submission references and validation detail specific to one request.
 */
export const apiHeaders = [
  { key: "Cache-Control", value: "no-store, max-age=0" },
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];
