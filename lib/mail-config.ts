/**
 * Enquiry delivery configuration, read from the server environment.
 *
 * Separate from lib/rfq-mail.ts so that pages which only need to know *whether*
 * mail is configured (the privacy policy describes it) do not import a mail
 * library to find out. See lib/rfq-mail.ts for what each variable does.
 */

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

/** Where enquiries go on this deployment. Read once, at build or request time. */
export function enquiryDelivery(env: Env = process.env) {
  return {
    mail: mailConfig(env) !== null,
    webhook: Boolean(env.RFQ_WEBHOOK_URL?.trim()),
  };
}

export type EnquiryDelivery = ReturnType<typeof enquiryDelivery>;
