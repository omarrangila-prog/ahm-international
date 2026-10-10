/**
 * Measurement (GA4) configuration.
 *
 * Off unless NEXT_PUBLIC_GA_ID holds a GA4 measurement ID. When it is set, the
 * site still sends nothing until a visitor chooses "Allow" in the consent bar:
 * gtag.js is not even requested before then. That is the promise the cookie
 * policy made before any analytics existed, and it is kept here rather than in
 * a tag manager where it could be quietly undone.
 *
 * Read by three places that must agree: the CSP (which origins to allow), the
 * legal pages (what to disclose), and the client (whether to ask). It is a
 * NEXT_PUBLIC_ value, so the build and the browser see the same answer.
 */

const raw = (process.env.NEXT_PUBLIC_GA_ID ?? "").trim();

/** Only a well-formed ID is used: it is interpolated into an inline script. */
export const GA_MEASUREMENT_ID: string | null = /^G-[A-Z0-9]{4,20}$/.test(raw) ? raw : null;

export const measurementEnabled = GA_MEASUREMENT_ID !== null;

/**
 * The origins GA4 needs, and no others. Collection goes to regional hosts
 * (region1.google-analytics.com and the like), which is why connect-src and
 * img-src take a subdomain wildcard on those two Google-owned domains; the
 * script itself comes from one exact host.
 */
export const GA_CSP = {
  script: ["https://www.googletagmanager.com"],
  connect: ["https://*.google-analytics.com", "https://*.analytics.google.com", "https://www.googletagmanager.com"],
  img: ["https://*.google-analytics.com", "https://www.googletagmanager.com"],
} as const;

/** localStorage key for the visitor's choice. A preference, not a cookie. */
export const CONSENT_KEY = "ahm-measurement-consent";
/** Fired to reopen the consent bar, e.g. from the cookie policy page. */
export const CONSENT_RESET_EVENT = "ahm:measurement-consent-reset";
