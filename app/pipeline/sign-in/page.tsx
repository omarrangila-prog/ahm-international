import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requestSignIn, signInWithPin } from "../actions";
import { pipelineStatus } from "@/lib/pipeline/config";
import { currentStaff } from "@/lib/pipeline/session";

export const metadata: Metadata = { title: "Sign in" };

type Search = Record<string, string | string[] | undefined>;

const MESSAGES: Record<string, string> = {
  sent: "If that address has access, a sign-in link is on its way. It works once and expires in 15 minutes.",
  expired: "That sign-in link has expired or is not valid. Ask for a new one below.",
  used: "That sign-in link has already been used. Ask for a new one below.",
  signedout: "You are signed out.",
};

/** Keyed by the value of `?pin=`. The wrong-PIN message does not say how many attempts are left. */
const PIN_MESSAGES: Record<string, string> = {
  wrong: "That PIN is not right.",
  locked: "PIN sign-in is paused until midnight UTC (5 am in Karachi) after too many wrong attempts.",
  busy: "Too many attempts from this connection. Wait 15 minutes and try again.",
  error: "The PIN could not be checked just now. Try again in a minute.",
};

const inputClass = "h-12 border border-ink/25 bg-paper px-3 text-base font-normal text-ink";
const buttonClass =
  "h-12 bg-ink font-display text-xs font-bold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-lime hover:text-ink";

export default async function SignInPage({ searchParams }: { searchParams: Promise<Search> }) {
  if (await currentStaff()) redirect("/pipeline");
  const params = await searchParams;
  const status = pipelineStatus();
  const message = Object.keys(MESSAGES).find((key) => params[key]);
  const pinMessage = typeof params.pin === "string" && Object.hasOwn(PIN_MESSAGES, params.pin) ? params.pin : null;

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md border border-line bg-paper p-8">
        <p className="label text-ink/65">AHM International</p>
        <h1 className="mt-3 font-display text-h2 text-ink">Enquiry register</h1>

        {!status.signIn ? (
          <div className="mt-6 text-sm leading-relaxed text-ink/75">
            <p>Sign-in is not available on this deployment yet. It needs:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {status.missing.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              {status.pin && status.link
                ? "For AHM staff. Sign in with the PIN, or have a one-time link emailed to your work address."
                : status.pin
                  ? "For AHM staff. Enter the PIN."
                  : "For AHM staff. Enter your work email and we will send a one-time sign-in link to it. There is no password."}
            </p>
            {status.pinIssue && (
              <p className="mt-5 border-l-2 border-ink pl-3 text-sm font-medium text-ink">{status.pinIssue}</p>
            )}
            {message && (
              <p role="status" className="mt-5 border-l-2 border-ink pl-3 text-sm text-ink">
                {MESSAGES[message]}
              </p>
            )}
            {pinMessage && (
              <p role="alert" className="mt-5 border-l-2 border-ink pl-3 text-sm font-medium text-ink">
                {PIN_MESSAGES[pinMessage]}
                {pinMessage === "locked" && status.link && " Use the emailed link below instead."}
              </p>
            )}
            {status.pin && (
              <form action={signInWithPin} className="mt-6 flex flex-col gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  PIN
                  <input
                    type="password"
                    name="pin"
                    required
                    inputMode="numeric"
                    pattern="[0-9]*"
                    minLength={4}
                    maxLength={12}
                    autoComplete="current-password"
                    className={`${inputClass} tracking-[0.3em]`}
                  />
                </label>
                <button type="submit" className={buttonClass}>
                  Sign in
                </button>
              </form>
            )}
            {status.pin && status.link && (
              <p className="mt-8 border-t border-line pt-6 text-sm text-ink/75">Or sign in with an emailed link:</p>
            )}
            {status.link && (
              <form action={requestSignIn} className={`${status.pin ? "mt-4" : "mt-6"} flex flex-col gap-4`}>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                  Work email
                  <input type="email" name="email" required autoComplete="email" className={inputClass} />
                </label>
                <button type="submit" className={buttonClass}>
                  Email me a sign-in link
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
