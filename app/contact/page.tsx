import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText, MessageSquare, Package, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { EmailLink, PhoneLink, WhatsAppLink } from "@/components/ui/ContactActions";
import { company, publicValue, NOT_PUBLISHED } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact AHM International",
  description:
    "Start a sourcing conversation. Send an RFQ, a tech pack, a development brief or a commercial enquiry to our team in Karachi.",
  path: "/contact",
});

const routes = [
  {
    icon: FileText,
    title: "New RFQ",
    body: "You have a style and want it costed. Seven short steps, six required fields.",
    cta: { label: "Request FOB Quote", href: "/request-a-quote" },
  },
  {
    icon: Package,
    title: "Product Development",
    body: "You have a requirement but not yet a specification. Send what you have and we will resolve the rest.",
    cta: { label: "Start a Development", href: "/development" },
  },
  {
    icon: MessageSquare,
    title: "Commercial Inquiry",
    body: "Terms, programs, capacity for a specific quantity, or an ongoing supply conversation.",
    cta: { label: "Talk to Commercial", href: "/request-a-quote" },
  },
  {
    icon: Mail,
    title: "General Contact",
    body: "Anything else. Partnership, media or a question the site did not answer.",
    cta: { label: "Send a Message", href: "/request-a-quote" },
  },
];

export default function ContactPage() {
  const email = publicValue(company.email);
  const phone = publicValue(company.phone);
  const street = publicValue(company.streetAddress);
  const hours = publicValue(company.businessHours);
  const whatsapp = publicValue(company.whatsapp);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        headingLines={[{ text: "START A" }, { text: "SOURCING", className: "text-ink" }, { text: "CONVERSATION." }]}
        intro="Pick the route that matches what you need. Every one reaches the same commercial team. The difference is how much context arrives with you."
        trail={[{ name: "Contact", path: "/contact" }]}
        zone="paper"
      />

      <Section zone="paper" spacing="none">
        <div className="shell-wide pb-20">
          <RevealGroup className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2" stagger={0.06}>
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <RevealItem key={route.title}>
                  <Link
                    href={route.cta.href}
                    className="group flex h-full flex-col justify-between gap-8 bg-paper p-7 transition-colors duration-300 hover:bg-white lg:p-9"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <Icon className="h-6 w-6 text-ink" aria-hidden="true" />
                        <ArrowUpRight
                          className="h-5 w-5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="mt-5 font-display text-h3 text-ink">{route.title}</h2>
                      <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink/65">{route.body}</p>
                    </div>
                    <span className="label text-ink">{route.cta.label}</span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <Section zone="ink" spacing="lg" tooth aria-labelledby="details-heading">
        <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Details</Eyebrow>
            <MaskedHeading
              as="h2"
              id="details-heading"
              className="mt-5 font-display text-h1 text-paper"
              lines={[{ text: "Where we" }, { text: "are." }]}
            />
            <p className="mt-6 max-w-md text-paper/65">
              We publish contact details only once they are verified. Where a line below says
              &ldquo;{NOT_PUBLISHED}&rdquo;, the quote form is the reliable route and reaches the
              same team.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <dl className="border-t border-paper/15">
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                <dt className="label text-paper/60">Location</dt>
                <dd className="text-paper/85">
                  {street ? `${street}, ` : ""}
                  {company.city}, {company.country}
                </dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                <dt className="label text-paper/60">Email</dt>
                <dd className="min-w-0 [overflow-wrap:anywhere] text-paper/85">
                  {email ? <EmailLink email={email} /> : <span className="text-paper/70">{NOT_PUBLISHED}</span>}
                </dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                <dt className="label text-paper/60">Phone</dt>
                <dd className="text-paper/85">
                  {phone ? <PhoneLink phone={phone} /> : <span className="text-paper/70">{NOT_PUBLISHED}</span>}
                </dd>
              </div>
              {whatsapp && (
                <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                  <dt className="label text-paper/60">WhatsApp</dt>
                  <dd className="text-paper/85">
                    <WhatsAppLink number={whatsapp} label={phone ?? whatsapp} />
                  </dd>
                </div>
              )}
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                <dt className="label text-paper/60">Hours</dt>
                <dd className="text-paper/85">
                  {hours ?? "Pakistan Standard Time. Confirmed on contact"}
                  {whatsapp && (
                    <span className="mt-1 block text-sm text-paper/60">{company.whatsappNote}</span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-paper/15 py-5">
                <dt className="label text-paper/60">Export port</dt>
                <dd className="text-paper/85">{company.exportExperience.port}</dd>
              </div>
            </dl>

            <p className="mt-6 text-xs leading-relaxed text-paper/60">
              A map is published once the exact verified business address is supplied and approved
              for publication. We do not display an approximate pin.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND ONE" }, { text: "SPECIFICATION." }]}
        body="The fastest way to start a useful conversation is with a real style. Send it and we will come back with a commercial position."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="lime"
      />
    </>
  );
}
