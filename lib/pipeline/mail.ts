import { mailConfig } from "../mail-config";
import { transportFor } from "../rfq-mail";
import { stageLabel, type DigestSection } from "./model";

/**
 * The register's two emails, both internal: a sign-in link to a staff member,
 * and the daily follow-up digest. Neither ever goes to a buyer.
 */

export function buildSignInMail(link: string) {
  return {
    subject: "Sign in to the AHM enquiry register",
    text: [
      "Someone asked to sign in to the AHM International enquiry register with this address.",
      "",
      `Open this link within 15 minutes to sign in:`,
      link,
      "",
      "It works once. If you did not ask for it, ignore this email: nobody can sign in without opening the link.",
    ].join("\n"),
  };
}

export async function sendSignInMail(to: string, link: string): Promise<boolean> {
  const config = mailConfig();
  if (!config) return false;
  const transport = transportFor(config);
  try {
    const mail = buildSignInMail(link);
    const info = await transport.sendMail({
      from: { name: "AHM enquiry register", address: config.user },
      to,
      subject: mail.subject,
      text: mail.text,
    });
    return info.accepted.length > 0;
  } finally {
    transport.close();
  }
}

export function buildDigestMail(sections: DigestSection[], origin: string, date: string) {
  const total = sections.reduce((n, s) => n + s.leads.length, 0);
  const lines = [`Enquiry register, ${date}: ${total} ${total === 1 ? "item needs" : "items need"} attention.`, ""];
  for (const section of sections) {
    lines.push(`${section.title} (${section.leads.length})`);
    for (const lead of section.leads.slice(0, 25)) {
      const who = [lead.company, lead.country].filter(Boolean).join(", ");
      const extra = [stageLabel(lead.stage), lead.owner ? `owner ${lead.owner}` : "unassigned", lead.followUpAt ? `follow-up ${lead.followUpAt}` : null]
        .filter(Boolean)
        .join(" · ");
      lines.push(`  - ${lead.ref} ${who}: ${extra}`);
      lines.push(`    ${origin}/pipeline/leads/${lead.ref}`);
    }
    if (section.leads.length > 25) lines.push(`  …and ${section.leads.length - 25} more on the board.`);
    lines.push("");
  }
  lines.push(`Board: ${origin}/pipeline`);
  lines.push("This reminder is internal. Nothing has been sent to any buyer.");
  return { subject: `Enquiry register: ${total} to follow up (${date})`, text: lines.join("\n") };
}

export async function sendDigestMail(to: string[], sections: DigestSection[], origin: string, date: string): Promise<boolean> {
  const config = mailConfig();
  if (!config || !to.length || !sections.length) return false;
  const transport = transportFor(config);
  try {
    const mail = buildDigestMail(sections, origin, date);
    const info = await transport.sendMail({
      from: { name: "AHM enquiry register", address: config.user },
      to,
      subject: mail.subject,
      text: mail.text,
    });
    return info.accepted.length > 0;
  } finally {
    transport.close();
  }
}
