/**
 * LEGAL CONTENT
 * =============
 *
 * Drafted from what this application actually does — the fields the RFQ form
 * collects, the upload policy in `lib/upload-policy.ts`, the rate limiter, the
 * absence of any analytics provider — rather than from a template.
 *
 * That matters: a privacy policy describing cookies the site does not set, or
 * omitting the file uploads it does accept, is worse than none. Every statement
 * below is checkable against the code.
 *
 * These are a first draft. They require review against the jurisdictions AHM
 * operates and sells into before launch. `LEGAL_REVIEW_NOTICE` renders on each
 * page so that is never quietly forgotten.
 */

export const LEGAL_REVIEW_NOTICE =
  "This policy is published in draft and describes how this website currently behaves. It has not yet been reviewed against the data-protection law of every market AHM International supplies. Contact us with any question about your data and we will answer it directly." as const;

export const LEGAL_EFFECTIVE = "September 2026" as const;

export type LegalSection = { heading: string; body: string[]; list?: string[] };

export const privacySections: LegalSection[] = [
  {
    heading: "What this policy covers",
    body: [
      "This policy covers the AHM International website and the enquiry forms on it. It explains what we collect, why, how long we keep it, and what you can ask us to do with it.",
      "AHM International is an apparel manufacturing and export business in Karachi, Pakistan. We supply buyers internationally, including in the United Kingdom and the European Union, so this policy is written to the standard those buyers expect.",
    ],
  },
  {
    heading: "What we collect",
    body: ["Only what you type into a form. There is no account system, no profiling and no tracking of you across other websites."],
    list: [
      "Quotation requests: your name, company, business email, and country. Optionally a job title, phone number, website, and the commercial details of your enquiry. Product, quantity, materials, decoration, target price, destination and delivery window.",
      "Files you attach: tech packs, sketches, bills of materials, size specifications and reference images. Accepted formats are PDF, XLSX, XLS, DOCX, DOC, JPG, PNG, WEBP and ZIP — up to six files, 15 MB per file and 40 MB per submission.",
      "Technical data needed to accept a submission: your IP address is used to rate-limit the form against automated abuse. It is not stored alongside your enquiry and is not used to identify you.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "To read your enquiry, ask the questions we need to quote accurately, and reply to you. That is the whole purpose.",
      "The lawful basis is your request: you contacted us about a possible commercial relationship, and we are responding to it.",
    ],
  },
  {
    heading: "Your specifications are confidential",
    body: [
      "Tech packs, drawings, specifications, target prices and commercial terms you share are treated as confidential business information. We do not publish them, share them with other buyers, or use them to develop products for anyone else.",
      "This website publishes no customer name anywhere. The single case study shown is anonymised, and the customer's identity is absent from the data behind the page rather than merely hidden in it.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This website sets no advertising cookies and runs no third-party tracking scripts.",
      "No analytics provider is currently installed. The site contains an analytics layer that stays inactive unless a provider is configured, and if one is added it will be behind a consent mechanism and this policy will be updated before it is switched on.",
    ],
  },
  {
    heading: "Who else sees your data",
    body: [
      "Our commercial and development team, for the purpose of answering you.",
      "The infrastructure provider that hosts this website. It processes data on our instruction and does not use it for its own purposes. No email or CRM provider is connected to the enquiry form yet; if one is added, this page will name the category of provider before it is switched on.",
      "We do not sell data, and we do not share enquiries with other manufacturers or agents.",
    ],
  },
  {
    heading: "Where your data goes",
    body: [
      "AHM International is based in Pakistan, so an enquiry sent from the United Kingdom, the European Union or elsewhere is transferred outside your country in order to be read and answered. Sending us an enquiry is a request for that.",
      "If your organisation requires a specific transfer mechanism or a data-processing agreement before sharing a specification, tell us and we will work to it.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "This describes the site as it behaves today, and it will change when enquiry delivery is connected. Right now the website does not store your submission. A file you attach is checked for type and size and is then discarded when the request ends — its contents are never written to disk and never forwarded. What is recorded is the enquiry text and the names and sizes of the files, so that nothing is silently lost.",
      "Once delivery is connected, enquiries and attachments will be kept for as long as the commercial conversation is live, and afterwards for as long as we may reasonably need them — for example to honour a repeat order against a specification you approved earlier. This page will be updated before that happens.",
      "Ask us to delete anything we hold about you and we will, unless we are required to retain a record for tax or legal reasons.",
    ],
  },
  {
    heading: "Your rights",
    body: ["Whatever your location, you can ask us to do any of the following and we will respond."],
    list: [
      "Tell you what we hold about you.",
      "Correct anything that is wrong.",
      "Delete anything we hold about you.",
      "Send you a copy of what we hold. While the website does not store submissions, that is the enquiry text and your file names rather than the files themselves.",
      "Stop using your details for anything other than answering you.",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS. Uploads are validated on the server for file type, extension and size before being accepted, and filenames are sanitised. Submissions are rate-limited.",
      "No transmission over the internet is completely secure. If a specification is unusually sensitive, tell us before sending and we will agree a route that suits you.",
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      "If this policy changes materially we will update the date at the top of the page.",
      "For any question about your data, or to exercise any of the rights above, use the contact page. Your request goes to the same team that handles enquiries.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "About these terms",
    body: [
      "These terms cover your use of this website. They do not cover a manufacturing order. That is governed by the written quotation, purchase order and any agreement signed between us.",
      "Where this website and a signed commercial document disagree, the signed document is what applies.",
    ],
  },
  {
    heading: "The website is information, not an offer",
    body: [
      "Product descriptions, material specifications, weights, finishes and capabilities on this site describe what AHM International can manufacture to a buyer's specification. They are not an offer to sell, and they are not a warranty of any particular result.",
      "Fabric weights shown are typical ranges for each construction, given so you can scope a program. They are not a stock list. Final composition, weight, construction, finish and performance are confirmed against your specification during development.",
      "No price, minimum quantity, sampling cost or lead time is published on this site, because each depends on the article. All four are quoted in writing against a specification.",
    ],
  },
  {
    heading: "Product imagery",
    body: [
      "Photographs show articles manufactured to buyer specification. They are construction references, not an offer of a specific garment, and no customer is named anywhere on this site. Garments carrying a third party\u2019s brand mark are not published here.",
      "Where a product type has no photograph yet, the article is listed without an image. This site does not publish illustrations, diagrams or invented pictures of garments.",
    ],
  },
  {
    heading: "Quotation requests",
    body: [
      "Submitting an enquiry does not create a contract. It starts a commercial conversation.",
      "By submitting, you confirm that you are entitled to share the specification and artwork you send, and that doing so does not breach anyone else's rights or an obligation you owe to a third party.",
      "Do not upload malicious files, and do not use the form to send anything unrelated to a manufacturing enquiry.",
    ],
  },
  {
    heading: "Your material",
    body: [
      "Designs, specifications and artwork you send remain yours. We use them only to evaluate, quote and produce your enquiry.",
      "Where we develop a pattern for your program from your reference garment, it is developed for your program.",
    ],
  },
  {
    heading: "Our material",
    body: [
      "The content, text, layout and design of this website belong to AHM International. You may read it, share links to it and quote it with attribution. You may not republish it as your own.",
    ],
  },
  {
    heading: "Compliance is the buyer's decision",
    body: [
      "AHM International does not provide legal or compliance advice for your market. Final market-specific labelling, documentation, testing and regulatory compliance are approved by the buyer.",
      "Where a program requires conformity to a named standard, that standard must be nominated by the buyer and confirmed through approved testing before any claim is made.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We take care to keep this site accurate, but we do not guarantee it is complete or current at every moment, and we are not liable for a decision taken solely on the basis of a web page.",
      "Nothing here limits liability that cannot lawfully be limited.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These website terms are governed by the law of Pakistan. The governing law of a manufacturing contract is agreed separately in that contract, and is frequently the buyer's jurisdiction.",
    ],
  },
];

export const cookieSections: LegalSection[] = [
  {
    heading: "The short version",
    body: [
      "This website sets no advertising cookies, no tracking cookies and no third-party marketing pixels. There is no consent banner because there is currently nothing to consent to.",
    ],
  },
  {
    heading: "What is actually stored",
    body: ["Only what is needed for the site to function."],
    list: [
      "No analytics cookie: no analytics provider is installed. The site includes an inactive analytics layer that sends nothing unless a provider is configured.",
      "No advertising or social cookie: there are no embedded social widgets, no advertising tags and no remarketing pixels.",
      "No preference cookie: the site has no theme switch, no language selector and no login, so there is nothing to remember between visits.",
      "Standard server logs, kept by our hosting provider, record requests for security and reliability. These are infrastructure logs, not cookies, and are not used to profile visitors.",
    ],
  },
  {
    heading: "Fonts and assets",
    body: [
      "Typefaces are self-hosted and served from this domain. The site makes no request to a third-party font service, so no data is shared with one.",
      "Images are served from this domain. There is no external image host or CDN pixel.",
    ],
  },
  {
    heading: "If this changes",
    body: [
      "If analytics are added, they will load only after consent, this page will be updated first, and the choice will be honoured.",
    ],
  },
];
