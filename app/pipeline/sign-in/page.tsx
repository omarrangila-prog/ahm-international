import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requestSignIn } from "../actions";
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

export default async function SignInPage({ searchParams }: { searchParams: Promise<Search> }) {
  if (await currentStaff()) redirect("/pipeline");
  const params = await searchParams;
  const status = pipelineStatus();
  const message = Object.keys(MESSAGES).find((key) => params[key]);

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
              For AHM staff. Enter your work email and we will send a one-time sign-in link to it. There is no password.
            </p>
            {message && (
              <p role="status" className="mt-5 border-l-2 border-ink pl-3 text-sm text-ink">
                {MESSAGES[message]}
              </p>
            )}
            <form action={requestSignIn} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
                Work email
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="h-12 border border-ink/25 bg-paper px-3 text-base font-normal text-ink"
                />
              </label>
              <button
                type="submit"
                className="h-12 bg-ink font-display text-xs font-bold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-lime hover:text-ink"
              >
                Email me a sign-in link
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
