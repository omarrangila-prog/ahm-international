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

import { ACCEPTED_LABEL, uploadLimitsText } from "../lib/upload-policy";
import { enquiryDelivery, type EnquiryDelivery } from "../lib/mail-config";
import { measurementEnabled } from "../lib/measurement";
import { describeDays, DEFAULT_RETENTION_DAYS } from "../lib/retention";
import { assetManifest } from "./asset-manifest";

/**
 * What this deployment actually does with an enquiry, read from the same
 * environment the form handler reads. The privacy policy is written for each
 * state rather than for the intended one: it once said the site would "name the
 * category of provider before it is switched on", and binding the wording to
 * the configuration is what makes that promise keep itself.
 */
const delivery = enquiryDelivery();

export const LEGAL_REVIEW_NOTICE = `This policy is published in draft and describes how this website currently behaves — including ${
  delivery.mail ? "that enquiries are delivered by email to our business mailbox" : "that enquiry delivery depends on server configuration"
} and ${
  measurementEnabled ? "that analytics load only if you allow them" : "that no analytics provider is installed"
}. It has not yet been reviewed against the data-protection law of every market AHM International supplies. Questions about your data: use the request-a-quote form so the message reaches the commercial team.`;

export const LEGAL_EFFECTIVE = "September 2026" as const;

export type LegalSection = { heading: string; body: string[]; list?: string[] };

export function privacySectionsFor(delivery: EnquiryDelivery, analytics: boolean = measurementEnabled): LegalSection[] {
  const storage = Boolean(delivery.storage);
  const assistant = Boolean(delivery.assistant);
  const retention = describeDays(delivery.retentionDays ?? DEFAULT_RETENTION_DAYS);

  return [
    {
      heading: "What this policy covers",
      body: [
        `This policy covers the AHM International website and the enquiry forms on it${assistant ? ", and the sourcing assistant" : ""}. It explains what we collect, why, how long we keep it, and what you can ask us to do with it.`,
        "AHM International is an apparel manufacturing and export business in Karachi, Pakistan. We supply buyers internationally, including in the United Kingdom and the European Union, so this policy is written to the standard those buyers expect.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Only what you send us, and where an enquiry came from. There are no visitor accounts, no profiling and no tracking of you across other websites.",
      ],
      list: [
        "Quotation requests: your name, company, business email, and country. Optionally a job title, phone number, website, and the commercial details of your enquiry. Product, quantity, materials, decoration, target price, destination and delivery window.",
        `Files you attach: tech packs, sketches, bills of materials, size specifications and reference images. Accepted formats are ${ACCEPTED_LABEL}; DOC and XLS are also accepted. ${uploadLimitsText(storage ? "direct" : "form")}`,
        "Where an enquiry came from: the page you first opened on this visit, the website that linked you here, and any campaign tags in that link (such as utm_source). Your browser sends these to every site it visits. This site keeps them in the open page only, writes nothing to your device, and passes them to us only if you send an enquiry.",
        ...(assistant
          ? ["Questions you type into the sourcing assistant, and its answers, while the conversation is open in your browser. See “The sourcing assistant” below."]
          : []),
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
        analytics
          ?"Google Analytics 4 measures which pages are used, and only if you choose Allow when asked. Declining loads nothing. You can change your choice at any time on the cookie policy page, and withdrawing it deletes the analytics cookies."
          : "No analytics provider is currently installed. The site contains an analytics layer that stays inactive unless a provider is configured, and if one is added it will be behind a consent mechanism and this policy will be updated before it is switched on.",
      ],
    },
    {
      heading: "Who else sees your data",
      body: [
        "Our commercial and development team, for the purpose of answering you.",
        delivery.mail
          ? "The infrastructure provider that hosts this website, and the business email provider that hosts our mailbox: your enquiry and any files you attach are delivered to that mailbox by email. Both process data on our instruction and do not use it for their own purposes."
          : storage
            ? "The infrastructure provider that hosts this website. It processes data on our instruction and does not use it for its own purposes."
            : "The infrastructure provider that hosts this website. It processes data on our instruction and does not use it for its own purposes. No email or CRM provider is connected to the enquiry form yet; if one is added, this page will name the category of provider before it is switched on.",
        ...(storage
          ? [
              "The same hosting provider stores your enquiry and the files you attach in private storage, which is our enquiry register. Nothing in it is reachable at a public web address: only AHM staff who sign in can open it.",
            ]
          : []),
        ...(assistant
          ? [
              "Anthropic, which provides the AI model behind the sourcing assistant, receives what you type into the assistant in order to answer it, and processes it as our service provider. It receives nothing from the quote form.",
            ]
          : []),
        ...(delivery.webhook
          ? ["The enquiry text, without your files, is also passed to the tool we use to track enquiries through to quotation. It processes the data on our instruction."]
          : []),
        ...(analytics
          ? ["Google, as the analytics provider, if you allow measurement. It receives page visits and site events, never the content of an enquiry or the files you attach."]
          : []),
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
        ...(storage
          ? [
              `Your enquiry is recorded in our enquiry register${delivery.mail ? " and delivered by email to our business mailbox" : ""}. Files you attach go from your browser to private storage, and are attached to the email too while they fit in one message. Nothing is published at a web address.`,
              `Files are deleted from storage automatically ${retention} after the enquiry they belong to. Files uploaded to a form that was never sent belong to no enquiry and are deleted within two days.`,
              `${delivery.mail ? "The register and the mailbox keep" : "The register keeps"} the enquiry, and our notes on it, for as long as the commercial conversation is live, and afterwards for as long as we may reasonably need them — for example to honour a repeat order against a specification you approved earlier.`,
            ]
          : delivery.mail
          ? [
              "Your enquiry and any files you attach are delivered by email to our business mailbox. The website itself keeps no copy: a file is held in memory only while the request is processed, and is never written to the website's storage or published at a web address.",
              "In the mailbox, enquiries and attachments are kept for as long as the commercial conversation is live, and afterwards for as long as we may reasonably need them — for example to honour a repeat order against a specification you approved earlier.",
            ]
          : [
              "This describes the site as it behaves today. Right now the website neither delivers nor stores your submission. A file you attach is checked for type and size and is then discarded when the request ends — its contents are never written to disk and never forwarded. Only a reference number is recorded.",
              "The form tells you this when you submit, and gives you our email address with that reference so you can send the enquiry to us directly. Once delivery is connected, this page will describe where enquiries are kept and for how long before it is switched on.",
            ]),
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
        delivery.mail || storage
          ? "Send you a copy of what we hold."
          : "Send you a copy of what we hold. While the website does not deliver submissions, it holds nothing from the form beyond a reference number.",
        "Stop using your details for anything other than answering you.",
      ],
    },
    ...(assistant
      ? [
          {
            heading: "The sourcing assistant",
            body: [
              "The assistant answers questions from the information published on this website, using an AI model provided by Anthropic. What you type is sent to Anthropic to produce the answer. This website does not store the conversation; it exists in your browser until you close the panel.",
              "Please do not enter confidential specifications, target prices or customer names there: use the quote form, which goes to our commercial team. Answers can be wrong, and nothing the assistant says is a quotation or a commitment by AHM International.",
            ],
          },
        ]
      : []),
    {
      heading: "Security",
      body: [
        storage
          ? "The site is served over HTTPS. Files go from your browser straight to private storage, are checked on our server for type, extension, size and content before they are attached to an enquiry, and can be downloaded only by signed-in AHM staff. Filenames are sanitised and submissions are rate-limited."
          : "The site is served over HTTPS. Uploads are validated on the server for file type, extension and size before being accepted, and filenames are sanitised. Submissions are rate-limited.",
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
}

export const privacySections = privacySectionsFor(delivery);

/**
 * What the product images are, from the same manifest that labels them. Until
 * October 2026 this said they were photographs of production and that the
 * site published no illustrations of garments; every garment image was
 * generated. It now describes whichever is deployed, class by class, in the
 * words of the marks themselves (lib/provenance.ts).
 */
export function imagerySection(generated: boolean, enhanced = false): LegalSection {
  const enhancedLine = enhanced
    ? ["Images marked \u201cActual product \u00b7 enhanced\u201d are photographs of actual products, digitally retouched. Each has been paired with its camera original and checked that it still shows the same garment."]
    : [];
  return {
    heading: "Product imagery",
    body: generated
      ? [
          "Every image on this site is labelled by origin. Those marked \u201cAI render\u201d are AI-generated images of the article types AHM International manufactures. They are not photographs of its production, not construction references and not an offer of a specific garment. Ask for a physical sample before relying on any construction detail.",
          ...enhancedLine,
          "No customer is named anywhere on this site, and garments carrying a third party\u2019s brand mark are not published here. A photograph of a facility, where one is published, is a photograph of that facility, and a partner\u2019s facility is labelled as a partner\u2019s.",
        ]
      : [
          "Photographs show articles manufactured to buyer specification. They are construction references, not an offer of a specific garment, and no customer is named anywhere on this site. Garments carrying a third party\u2019s brand mark are not published here.",
          ...enhancedLine,
          "Where a product type has no photograph yet, the article is listed without an image.",
        ],
  };
}

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
  imagerySection(
    Object.values(assetManifest).some((e) => e.generated),
    Object.values(assetManifest).some((e) => e.origin === "enhanced"),
  ),
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

/**
 * The cookie policy, written for whether a measurement ID is configured and
 * whether the staff enquiry register exists on this deployment.
 */
export function cookieSectionsFor(analytics: boolean, { register = false }: { register?: boolean } = {}): LegalSection[] {
  return [
    {
      heading: "The short version",
      body: [
        analytics
          ? "This website sets no advertising cookies and no third-party marketing pixels. Analytics cookies are set only if you allow them, and nothing is loaded if you decline."
          : "This website sets no advertising cookies, no tracking cookies and no third-party marketing pixels. There is no consent banner because there is currently nothing to consent to.",
      ],
    },
    {
      heading: "What is actually stored",
      body: [analytics ? "What the site needs to function, and analytics only with your consent." : "Only what is needed for the site to function."],
      list: [
        analytics
          ? "Analytics cookies, only if you choose Allow: Google Analytics 4 sets cookies whose names begin with _ga to count visits and see which pages are used. They are not set before you choose, and never if you decline."
          : "No analytics cookie: no analytics provider is installed. The site includes an inactive analytics layer that sends nothing unless a provider is configured.",
        "No advertising or social cookie: there are no embedded social widgets, no advertising tags and no remarketing pixels.",
        analytics
          ? "Your analytics choice is remembered in your browser's local storage so you are not asked on every page. It is not a cookie, holds only \"granted\" or \"denied\", and is never sent to us."
          : "No preference cookie: the site has no theme switch, no language selector and no visitor login, so there is nothing to remember between visits.",
        "Nothing for campaign tracking: the page you arrived on and any campaign tags in the link are held in the open page only, not in a cookie or browser storage, and reach us only with an enquiry you send.",
        ...(register
          ? [
              "A sign-in cookie for AHM staff, set only on the internal enquiry register (under /pipeline) after a staff member signs in. It is strictly necessary for that sign-in, is never set for visitors, and is never sent with a request for a public page.",
            ]
          : []),
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
    analytics
      ? {
          heading: "Changing your choice",
          body: [
            "Use the button on this page to change your choice at any time. Withdrawing consent deletes the analytics cookies and stops measurement from that moment.",
          ],
        }
      : {
          heading: "If this changes",
          body: [
            "If analytics are added, they will load only after consent, this page will be updated first, and the choice will be honoured.",
          ],
        },
  ];
}

export const cookieSections = cookieSectionsFor(measurementEnabled, { register: Boolean(delivery.storage) });
