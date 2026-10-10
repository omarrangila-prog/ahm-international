/**
 * Host consolidation.
 *
 * The site answers on more hostnames than the one it should rank under. Each
 * extra host serves a complete copy of every page, and although the canonical
 * tag already names www.ahminternationals.com, a canonical is a hint a crawler
 * may ignore; a redirect is not. These hosts send every path, with its query
 * string, to the same path on the canonical origin.
 *
 * Matched by exact hostname on purpose. Preview deployments get generated
 * hostnames under the same vercel.app suffix, and they are the staging copy
 * that has to keep working; a suffix match would redirect them to production.
 *
 * The apex ahminternationals.com is not here. Vercel redirects it at the domain
 * level, before a request reaches this application.
 */

export const CANONICAL_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ahminternationals.com"
).replace(/\/+$/, "");

export const LEGACY_HOSTS = [
  // The original production alias, linked from anywhere the site was shared
  // before the custom domain went live.
  "ahm-international.vercel.app",
  // A second Vercel project connected to the same repository. It rebuilds on
  // every push and published a full copy without the contact settings.
  "ahm-international-sk7y.vercel.app",
] as const;

/** Redirect rules in the shape `next.config.ts` returns from `redirects()`. */
export function legacyHostRedirects(origin: string = CANONICAL_ORIGIN) {
  const canonicalHost = new URL(origin).host;
  return LEGACY_HOSTS
    // Never redirect a host to itself: that is a loop on every request.
    .filter((host) => host !== canonicalHost)
    .map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${origin}/:path*`,
      permanent: true,
    }));
}
