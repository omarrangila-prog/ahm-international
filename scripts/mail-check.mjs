/**
 * Mailbox password check.
 *
 * Logs in to the SMTP server with the same settings the site uses and logs
 * out again. Nothing is sent. Run it before putting a password into Vercel:
 * a wrong SMTP_PASS does not fail the build, it fails every sign-in link and
 * every RFQ email afterwards, quietly, with "535 authentication failed" in the
 * runtime log.
 *
 * The password is typed at a hidden prompt (or read from SMTP_PASS) and is
 * never printed or written anywhere.
 *
 *   npm run mail:check
 */
import nodemailer from "nodemailer";

const user = (process.env.SMTP_USER || process.env.NEXT_PUBLIC_SALES_EMAIL || "info@ahminternationals.com").trim();
const host = (process.env.SMTP_HOST || "smtp.hostinger.com").trim();
const port = Number(process.env.SMTP_PORT || 465);

function askHidden(question) {
  return new Promise((resolve) => {
    const { stdin, stdout } = process;
    if (!stdin.isTTY) {
      console.error("No terminal to type into. Run this in a terminal, or set SMTP_PASS.");
      process.exit(1);
    }
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.setRawMode(false);
          stdin.pause();
          stdin.off("data", onData);
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (ch === "\u0003") {
          stdin.setRawMode(false);
          stdout.write("\n");
          process.exit(130);
        }
        if (ch === "\u007f" || ch === "\b") value = value.slice(0, -1);
        else value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

const pass = process.env.SMTP_PASS?.trim() || (await askHidden(`Password for ${user}: `));
if (!pass) {
  console.error("No password entered.");
  process.exit(1);
}

const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });

try {
  await transport.verify();
  console.log(`OK: ${host}:${port} accepted the password for ${user}. Nothing was sent.`);
} catch (error) {
  const message = String(error?.message ?? error);
  console.error(`REFUSED: ${message}`);
  if (/535|auth/i.test(message)) {
    console.error(
      "The server rejected this username and password. This is the mailbox password\n" +
        "(the one that opens webmail for this address), not the Hostinger account login.",
    );
  }
  process.exit(1);
} finally {
  transport.close();
}
