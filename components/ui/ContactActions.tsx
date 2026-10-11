"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { pageMessage, whatsappHref } from "@/lib/whatsapp";

/**
 * Contact actions that report engagement.
 *
 * Split into a client component so the surrounding contact page can stay a
 * server component — only the click handler needs to run in the browser.
 */

export function EmailLink({ email, className, location }: { email: string; className?: string; location?: string }) {
  return (
    <a
      href={`mailto:${email}`}
      onClick={() => {
        track("email_click", { location });
        track("contact_clicked", { channel: "email", location });
      }}
      className={cn("[overflow-wrap:anywhere]", className ?? "inline-block py-1 underline underline-offset-4 transition-colors hover:text-lime")}
    >
      {email}
    </a>
  );
}

export function PhoneLink({ phone, className, location }: { phone: string; className?: string; location?: string }) {
  return (
    <a
      href={`tel:${phone.replace(/\s/g, "")}`}
      onClick={() => {
        track("phone_click", { location });
        track("contact_clicked", { channel: "phone", location });
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
 *
 * The chat opens with a message naming the page the buyer was on, unless the
 * caller supplies one (the RFQ outcome supplies the reference).
 */
export function WhatsAppLink({
  number,
  label,
  className,
  message,
  location,
}: {
  number: string;
  label?: React.ReactNode;
  className?: string;
  message?: string;
  location?: string;
}) {
  const pathname = usePathname();
  return (
    <a
      href={whatsappHref(number, message ?? pageMessage(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("whatsapp_click", { location });
        track("contact_clicked", { channel: "whatsapp", location });
      }}
      className={className ?? "inline-block py-1 underline underline-offset-4 transition-colors hover:text-lime"}
    >
      {label ?? number}
    </a>
  );
}
