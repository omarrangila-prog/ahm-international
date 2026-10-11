import type { Attribution } from "./pipeline/model";

/**
 * Where an enquiry came from: the page a buyer first opened in this visit, the
 * site that linked to it, and any utm_* tags on that link.
 *
 * Held in the open page's memory, and nowhere else. Not a cookie, not
 * localStorage or sessionStorage: writing campaign data to a visitor's device
 * is not strictly necessary for anything they asked for, so in the EU and UK
 * it would need consent first. The browser already sends the referrer and the
 * URL with every request; keeping them in a variable until the visitor
 * chooses to send an enquiry stores nothing on the device.
 *
 * The site navigates client-side, so the variable survives moving from the
 * landing page to the quote form. A full reload starts again, and the enquiry
 * then simply records less.
 */

const UTM = ["source", "medium", "campaign", "term", "content"] as const;

let arrival: Attribution | null = null;

const clip = (value: string | null | undefined, max: number) => {
  const s = (value ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
  return s || null;
};

/** Runs once, on the first page of a visit. Never overwrites: the landing page is the first page. */
export function captureAttribution(): void {
  if (arrival) return;
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign: Attribution["campaign"] = {};
    for (const key of UTM) {
      const value = clip(params.get(`utm_${key}`), 100);
      if (value) campaign[key] = value;
    }
    let referrer: string | null = null;
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) referrer = clip(host, 120);
    }
    arrival = { landing: clip(window.location.pathname, 200), referrer, campaign };
  } catch {
    // A malformed referrer: the enquiry simply has no source.
  }
}

/** The JSON the forms post with an enquiry, or null if nothing was noted. */
export function readAttribution(): string | null {
  return arrival ? JSON.stringify(arrival) : null;
}

/** Server side: the posted field, bounded and reduced to the known shape. */
export function parseAttribution(raw: unknown): Attribution {
  const empty: Attribution = { landing: null, referrer: null, campaign: {} };
  if (typeof raw !== "string" || raw.length > 2_000) return empty;
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    const campaignIn = (value.campaign && typeof value.campaign === "object" ? value.campaign : {}) as Record<string, unknown>;
    const campaign: Attribution["campaign"] = {};
    for (const key of UTM) {
      const v = typeof campaignIn[key] === "string" ? clip(campaignIn[key] as string, 100) : null;
      if (v) campaign[key] = v;
    }
    const landing = typeof value.landing === "string" && value.landing.startsWith("/") ? clip(value.landing, 200) : null;
    const referrer =
      typeof value.referrer === "string" && /^[a-z0-9.-]+$/i.test(value.referrer) ? clip(value.referrer, 120) : null;
    return { landing, referrer, campaign };
  } catch {
    return empty;
  }
}

/** One line for the notification email. */
export function describeAttribution(a: Attribution): string | null {
  const parts: string[] = [];
  if (a.campaign.source) parts.push(`campaign ${[a.campaign.source, a.campaign.medium, a.campaign.campaign].filter(Boolean).join(" / ")}`);
  if (a.referrer) parts.push(`link from ${a.referrer}`);
  if (a.landing) parts.push(`landed on ${a.landing}`);
  return parts.length ? parts.join("; ") : null;
}
