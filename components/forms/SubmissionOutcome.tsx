import { Check, Send } from "lucide-react";
import { company, publicValue } from "@/data/company";
import type { RejectedFile } from "@/lib/rfq-client";
import { cn } from "@/lib/utils";

/**
 * What a buyer sees after pressing send.
 *
 * Two different screens, not one screen with a caveat. Both forms used to show
 * "RFQ received" and "our commercial team will review your requirements" even
 * when the server reported that nothing had been delivered, with the real
 * position in a smaller paragraph underneath. A buyer reads the heading. So the
 * heading now says what happened, and the undelivered state makes the direct
 * channels the primary action, with the reference already in the subject line.
 */

export function SubmissionOutcome({
  kind,
  reference,
  rejectedFiles,
  size = "lg",
  children,
}: {
  kind: "delivered" | "undelivered";
  reference: string | null;
  rejectedFiles: RejectedFile[];
  size?: "lg" | "md";
  children?: React.ReactNode;
}) {
  const email = publicValue(company.email);
  const whatsapp = publicValue(company.whatsapp);
  const subject = encodeURIComponent(reference ? `RFQ ${reference}` : "RFQ");
  const delivered = kind === "delivered";
  const Heading = size === "lg" ? "h2" : "h3";

  return (
    <div
      className={cn("enter border border-ink/15 bg-paper", size === "lg" ? "p-8 lg:p-12" : "p-8 lg:p-10")}
      role="status"
    >
      <span
        className={cn(
          "flex items-center justify-center",
          size === "lg" ? "h-14 w-14" : "h-12 w-12",
          delivered ? "bg-lime text-ink" : "bg-ink text-paper",
        )}
      >
        {delivered ? <Check className="h-6 w-6" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
      </span>

      <Heading
        className={cn(
          "font-display text-ink",
          size === "lg" ? "mt-7 text-display" : "mt-5 text-2xl font-extrabold tracking-[-0.03em]",
        )}
      >
        {delivered ? "RFQ received." : "One more step."}
      </Heading>

      <p className={cn("max-w-xl text-ink/75", size === "lg" ? "mt-5 text-lead" : "mt-3")}>
        {delivered
          ? "Thank you. Your request has reached our commercial team, who will review it against your specification."
          : "Your request did not reach our team automatically. Send it to us directly so nothing is lost."}
      </p>

      {reference && (
        <p className="mt-4 text-ink/70">
          Your reference is <span className="font-mono font-semibold text-ink">{reference}</span>.{" "}
          {delivered ? "Quote it in any follow-up." : "Put it in the subject line."}
        </p>
      )}

      {!delivered && (
        <ul className="mt-5 space-y-2 border-l-2 border-ink pl-4 text-ink/75">
          {email && (
            <li>
              <span className="text-ink/65">Email</span>{" "}
              <a
                href={`mailto:${email}?subject=${subject}`}
                className="[overflow-wrap:anywhere] font-medium text-ink underline underline-offset-4"
              >
                {email}
              </a>
            </li>
          )}
          {whatsapp && (
            <li>
              <span className="text-ink/65">WhatsApp</span>{" "}
              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-4"
              >
                {whatsapp}
              </a>
            </li>
          )}
          {!email && !whatsapp && (
            <li>
              <a href="/contact" className="font-medium text-ink underline underline-offset-4">
                Contact the commercial team
              </a>
            </li>
          )}
        </ul>
      )}

      {/* A refused attachment no longer costs the buyer the enquiry, but it
          does need sending another way, and saying which file and why is what
          makes that a thirty-second job rather than a guess. */}
      {rejectedFiles.length > 0 && (
        <div className="mt-6 max-w-xl border border-ink/15 p-4 text-sm text-ink/75">
          <p className="font-medium text-ink">
            {rejectedFiles.length === 1 ? "One file was not attached:" : "These files were not attached:"}
          </p>
          <ul className="mt-2 space-y-1">
            {rejectedFiles.map((f) => (
              <li key={f.name} className="[overflow-wrap:anywhere]">
                {f.name} <span className="text-ink/65">({f.reason})</span>
              </li>
            ))}
          </ul>
          {email && (
            <p className="mt-3">
              Email {rejectedFiles.length === 1 ? "it" : "them"} to{" "}
              <a
                href={`mailto:${email}?subject=${subject}`}
                className="[overflow-wrap:anywhere] font-medium text-ink underline underline-offset-4"
              >
                {email}
              </a>{" "}
              with your reference in the subject.
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
