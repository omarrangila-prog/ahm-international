/**
 * WhatsApp links with a message already written.
 *
 * A bare wa.me link opens an empty chat, and the buyer's first message is
 * then "hi" from a number AHM has never seen. Prefilling it says where they
 * came from (the page) or what it is about (the RFQ reference), so the reply
 * can start on the substance. The buyer can edit or delete it before sending;
 * nothing is sent on their behalf.
 */

const SITE = "www.ahminternationals.com";

/** wa.me needs the number as digits only: no plus, no spaces. */
export function whatsappHref(number: string, message?: string): string {
  const digits = number.replace(/[^\d]/g, "");
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}

/** The message for a link on a page, naming the page the buyer was reading. */
export function pageMessage(pathname: string | null | undefined): string {
  const path = pathname && pathname !== "/" ? pathname.split(/[?#]/)[0] : "";
  return `Hello AHM International, I'm contacting you from ${SITE}${path}. I'd like to discuss a sourcing enquiry.`;
}

/** The message after an RFQ, carrying its reference so the two are joined up. */
export function referenceMessage(reference: string): string {
  return `Hello AHM International, I've just sent an RFQ through your website. My reference is ${reference}.`;
}
