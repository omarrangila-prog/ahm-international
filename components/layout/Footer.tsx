import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { footerNav } from "@/data/nav";
import { company, publicValue } from "@/data/company";
import { Logo } from "@/components/ui/Logo";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { EmailLink, PhoneLink, WhatsAppLink } from "@/components/ui/ContactActions";

/**
 * Footer.
 *
 * Contact rows render the real value where one is configured and the approved
 * "Available on request" wording where none is — the same rule the rest of the
 * site follows, applied at the point buyers look hardest for a shortcut.
 */

export function Footer() {
  const email = publicValue(company.email);
  const phone = publicValue(company.phone);
  const whatsapp = publicValue(company.whatsapp);
  const linkedin = publicValue(company.social.linkedin);
  const instagram = publicValue(company.social.instagram);
  const year = new Date().getFullYear();

  return (
    <footer className="tooth relative bg-ink text-paper" data-zone="dark">
      <div className="shell-wide relative z-10 pt-20 pb-10 lg:pt-28">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-8">
          {/* Identity */}
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 max-w-xs font-display text-xl font-bold tracking-[-0.025em]">
              From tech pack to FOB shipment.
            </p>
            <p className="mt-4 text-sm text-paper/70">
              {company.city}, {company.country}
            </p>
          </div>

          {/* Navigation */}
          {footerNav.map((column) => (
            <div key={column.title} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <p className="label mb-5 text-paper/65">{column.title}</p>
              <ul className="flex flex-col gap-1 sm:gap-1.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1.5 text-sm text-paper/80 transition-colors hover:text-lime"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          {/* The four link columns fill the row beside the brand, so contact
              always starts a row of its own at lg. Laid out across it, the
              address no longer breaks mid-word in a two-column cell. */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-12">
            <p className="label mb-5 text-paper/65">Contact</p>
            <ul className="flex flex-col gap-4 text-sm lg:flex-row lg:flex-wrap lg:items-end lg:gap-x-14">
              <li>
                <p className="text-paper/65">Email</p>
                {email ? (
                  <EmailLink
                    email={email}
                    location="footer"
                    className="inline-block [overflow-wrap:anywhere] py-1.5 text-paper/80 transition-colors hover:text-lime"
                  />
                ) : (
                  <Link
                    href="/send-tech-pack"
                    className="inline-block py-1.5 text-paper/80 underline-offset-4 transition-colors hover:text-lime hover:underline"
                  >
                    Send a tech pack &rarr;
                  </Link>
                )}
              </li>
              <li>
                <p className="text-paper/65">Phone</p>
                {phone ? (
                  <PhoneLink
                    phone={phone}
                    location="footer"
                    className="inline-block py-1.5 text-paper/80 transition-colors hover:text-lime"
                  />
                ) : (
                  <Link
                    href="/request-a-quote"
                    className="inline-block py-1.5 text-paper/80 underline-offset-4 transition-colors hover:text-lime hover:underline"
                  >
                    Request a quote &rarr;
                  </Link>
                )}
              </li>
              {whatsapp && (
                <li>
                  <p className="text-paper/65">WhatsApp</p>
                  <WhatsAppLink
                    number={whatsapp}
                    location="footer"
                    label="Message us on WhatsApp"
                    className="inline-block py-1.5 text-paper/80 transition-colors hover:text-lime"
                  />
                </li>
              )}
              <li>
                <Link href="/request-a-quote" className="inline-flex items-center gap-1 py-1.5 text-lime hover:underline">
                  Send an RFQ
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>

            {(linkedin || instagram) && (
              <div className="mt-6 flex items-center gap-3">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-line-invert text-paper/70 transition-colors hover:border-lime hover:text-lime"
                    aria-label="AHM International on LinkedIn"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center border border-line-invert text-paper/70 transition-colors hover:border-lime hover:text-lime"
                    aria-label="AHM International on Instagram"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Closing statement. Not "Let's build your next program": the
            homepage's inquiry section now carries that line directly above,
            and the same sentence twice in a row reads as a template. */}
        <div className="mt-20 border-t border-line-invert pt-12 lg:mt-28">
          <Link href="/request-a-quote" className="group block">
            <MaskedHeading
              lines={[
                { text: "START WITH" },
                { text: "ONE STYLE." },
              ]}
              as="p"
              className="font-display text-mega text-paper transition-colors duration-500 group-hover:text-lime"
            />
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-invert pt-7 text-xs text-paper/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Apparel manufacturing and FOB export, {company.city}, {company.country}.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/cookies" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="inline-block py-1.5 text-paper/70 transition-colors hover:text-lime">
                {link.label}
              </Link>
            ))}
            {/* Each image carries its own mark; the footer points to what the
                marks mean rather than repeating a disclaimer on every page. */}
            <Link href="/verification#imagery" className="inline-block py-1.5 text-paper/70 transition-colors hover:text-lime">
              How images are labelled
            </Link>
            <span className="max-w-md py-1.5 text-paper/70">Commercial terms confirmed in writing.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
