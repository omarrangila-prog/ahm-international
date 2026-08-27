"use client";

import { track } from "@/lib/analytics";

/**
 * Contact actions that report engagement.
 *
 * Split into a client component so the surrounding contact page can stay a
 * server component — only the click handler needs to run in the browser.
 */

export function EmailLink({ email, className }: { email: string; className?: string }) {
  return (
    <a
      href={`mailto:${email}`}
      onClick={() => {
        track("email_click");
        track("contact_clicked", { channel: "email" });
      }}
      className={className ?? "inline-block py-1 underline underline-offset-4 transition-colors hover:text-lime"}
    >
      {email}
    </a>
  );
}

export function PhoneLink({ phone, className }: { phone: string; className?: string }) {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      onClick={() => {
        track("phone_click");
        track("contact_clicked", { channel: "phone" });
      }}
      className={className ?? "inline-block py-1 underline underline-offset-4 transition-colors hover:text-lime"}
    >
      {phone}
    </a>
  );
}

/**
 * WhatsApp link.
 *
 * International sourcing runs on WhatsApp far more than on email in this trade,
 * and it sidesteps the 8–12 hour offset between Karachi and the buyer markets.
 * `wa.me` needs digits only — no plus, no spaces.
 */
export function WhatsAppLink({
  number,
  label,
  className,
}: {
  number: string;
  label?: string;
  className?: string;
}) {
  const digits = number.replace(/[^\d]/g, "");
  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("contact_clicked", { channel: "whatsapp" });
      }}
      className={className ?? "inline-block py-1 underline underline-offset-4 transition-colors hover:text-lime"}
    >
      {label ?? number}
    </a>
  );
}
