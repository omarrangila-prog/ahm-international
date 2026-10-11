/**
 * Enquiry delivery configuration, read from the server environment.
 *
 * Separate from lib/rfq-mail.ts so that pages which only need to know *whether*
 * mail is configured (the privacy policy describes it) do not import a mail
 * library to find out. See lib/rfq-mail.ts for what each variable does.
 */

import { storageEnabled } from "./storage/namespace";
import { assistantEnabled } from "./assistant/config";
import { fileRetentionDays } from "./retention";

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  acknowledge: boolean;
};

type Env = Record<string, string | undefined>;

export function mailConfig(env: Env = process.env): MailConfig | null {
  const pass = env.SMTP_PASS?.trim();
  const user = (env.SMTP_USER ?? env.NEXT_PUBLIC_SALES_EMAIL)?.trim();
  if (!pass || !user) return null;

  const port = Number(env.SMTP_PORT ?? 465);
  return {
    host: env.SMTP_HOST?.trim() || "smtp.hostinger.com",
    port,
    // 465 is TLS from the first byte; 587 starts plain and upgrades. Getting
    // this backwards fails the handshake rather than falling back to plaintext.
    secure: port === 465,
    user,
    pass,
    to: env.RFQ_NOTIFY_TO?.trim() || user,
    acknowledge: env.RFQ_SEND_ACKNOWLEDGEMENT === "true",
  };
}

/**
 * What this deployment does with an enquiry and with what a visitor types,
 * read from the same environment the handlers read. The privacy policy is
 * generated from this, so it describes the deployment it is served from.
 */
export function enquiryDelivery(env: Env = process.env): EnquiryDelivery {
  return {
    mail: mailConfig(env) !== null,
    webhook: Boolean(env.RFQ_WEBHOOK_URL?.trim()),
    storage: storageEnabled(env),
    assistant: assistantEnabled(env),
    retentionDays: fileRetentionDays(env),
  };
}

export type EnquiryDelivery = {
  mail: boolean;
  webhook: boolean;
  /** Files and the enquiry register in the private store. */
  storage?: boolean;
  /** The sourcing assistant, which sends questions to Anthropic. */
  assistant?: boolean;
  retentionDays?: number;
};
