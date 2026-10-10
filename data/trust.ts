/**
 * BUYER TRUST
 * ===========
 *
 * Two lists that used to live inline in /about and in a homepage band titled
 * "What this site does not claim".
 *
 * The brief of 10 October 2026 asked for the order to be reversed: a buyer
 * should meet what AHM can stand behind before the list of what it does not
 * publish. The honesty is not removed, it is moved to /verification, where a
 * buyer who wants it goes looking for it.
 *
 * Every strength names where it can be checked. A strength with nowhere to
 * point does not belong in this list.
 */

export type TrustStrength = {
  title: string;
  body: string;
  /** What the claim rests on, in the buyer's terms. */
  basis: "Documented" | "Stated by AHM" | "Published here";
  href: string;
  linkLabel: string;
};

export const trustStrengths: TrustStrength[] = [
  {
    title: "Own manufacturing operations",
    body: "AHM runs its own manufacturing as well as working with partners.",
    basis: "Stated by AHM",
    href: "/manufacturing-network",
    linkLabel: "How the network works",
  },
  {
    title: "Specialist production partners",
    body: "Partner factories cover products and requirements an operation is better equipped for, and are never presented as AHM's own.",
    basis: "Stated by AHM",
    href: "/manufacturing-network",
    linkLabel: "Own versus partner",
  },
  {
    title: "Documented FOB export",
    body: "A uniform apron program shipped FOB from Port Qasim, Karachi to the United States.",
    basis: "Documented",
    href: "/case-studies/us-uniform-apron-program",
    linkLabel: "Read the program",
  },
  {
    title: "Development and specification review",
    body: "A specification is reviewed for what it leaves open before it is costed, so the price answers the question you asked.",
    basis: "Published here",
    href: "/development",
    linkLabel: "The development process",
  },
  {
    title: "Fabric and construction knowledge",
    body: "Constructions, weights, finishes and the trade-offs between them, published for buyers to read and check.",
    basis: "Published here",
    href: "/materials",
    linkLabel: "Materials",
  },
  {
    title: "Sampling before bulk",
    body: "Development, fit and pre-production samples, each approved before the next commitment is made.",
    basis: "Published here",
    href: "/resources/apparel-sampling-process",
    linkLabel: "The sampling stages",
  },
];

/** How to check AHM International without relying on this website. */
export const verificationSteps = [
  {
    title: "Ask for the registration documents",
    body: "Company registration and tax registration (NTN), sent directly. We do not publish an NTN until the number is verified, so ask for it in writing. If a supplier hesitates, that is your answer about everything else on their site.",
  },
  {
    title: "Check the exporter registers",
    body: "Pakistan's Trade Development Authority publishes exporter listings with company name, address and tax number. A supplier that appears where they say they operate is a supplier that exists.",
  },
  {
    title: "Request a physical sample",
    body: "The most reliable audit of a factory is a garment it made. Send a specification and judge the construction, the measurements and the finish in your hands rather than on a screen.",
  },
  {
    title: "Nominate your own inspection agency",
    body: "SGS, Bureau Veritas, Intertek or your own QA. A supplier confident in their output does not object to someone else opening the cartons before they ship. AHM confirms third-party inspection arrangements in writing against the sealed sample.",
  },
  {
    title: "Ask what a claim rests on",
    body: "For any figure on any supplier's site, ask what document supports it. That question is why this site publishes a short list rather than a long one.",
  },
] as const;
