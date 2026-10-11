import type { Metadata } from "next";
import Link from "next/link";
import { completeSignIn } from "../actions";
import { secretSource, verifyToken, type LoginPayload } from "@/lib/pipeline/tokens";
import { staffList } from "@/lib/pipeline/staff";

export const metadata: Metadata = { title: "Confirm sign-in", referrer: "no-referrer" };

type Search = Record<string, string | string[] | undefined>;

/**
 * The page a sign-in link opens. It checks the link but does not use it:
 * signing in takes a button press, so a mail scanner that opens the link to
 * inspect it cannot spend it, and the referrer policy keeps the token out of
 * any request this page makes.
 */
export default async function VerifyPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const secret = secretSource();
  const payload = secret ? verifyToken<LoginPayload>(token, secret, "login") : null;
  const valid = payload !== null && staffList().has(payload.e);

  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md border border-line bg-paper p-8">
        <p className="label text-ink/65">Enquiry register</p>
        {valid ? (
          <>
            <h1 className="mt-3 font-display text-h2 text-ink">Sign in</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              Signing in as <span className="font-medium text-ink [overflow-wrap:anywhere]">{payload.e}</span>. You will stay signed
              in on this browser for seven days.
            </p>
            <form action={completeSignIn} className="mt-6">
              <input type="hidden" name="token" value={token} />
              <button
                type="submit"
                className="h-12 w-full bg-ink font-display text-xs font-bold uppercase tracking-[0.08em] text-paper transition-colors hover:bg-lime hover:text-ink"
              >
                Sign in
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mt-3 font-display text-h2 text-ink">Link not valid</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              This sign-in link has expired, has been changed, or is not for an address with access.
            </p>
            <Link href="/pipeline/sign-in" className="mt-6 inline-block py-1 text-sm font-medium text-ink underline underline-offset-4">
              Ask for a new link
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
