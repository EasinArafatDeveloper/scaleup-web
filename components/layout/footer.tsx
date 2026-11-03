"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { Logo } from "@/components/ui/logo";

function DhakaClock() {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dhaka",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

export function Footer() {
  const year = 2026;

  const columns = [
    {
      title: "Services",
      links: serviceCategories.map((c) => ({ href: `/services/${c.slug}`, label: c.title }))
    },
    {
      title: "Studio",
      links: [
        { href: "/work", label: "Case studies" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About the studio" },
        { href: "/easin-arafat", label: "Easin Arafat, founder" },
        { href: "/free-audit", label: "Free audit" },
        { href: "/contact", label: "Contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy policy" },
        { href: "/terms", label: "Terms of service" },
        { href: "/refund-policy", label: "Refund policy" }
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-alt">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              An independent studio from Dhaka building fast websites, AI automation and tracked
              growth systems for ambitious businesses.
            </p>

            <div className="mt-8 space-y-1">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="group flex items-center gap-2 font-display text-2xl font-semibold text-fg sm:text-3xl"
              >
                {siteConfig.contactEmail}
                <ArrowUpRight className="h-6 w-6 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted hover:text-fg"
              >
                WhatsApp {siteConfig.whatsappDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} ScaleUp Web · {siteConfig.address.city}, {siteConfig.address.country}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Dhaka <DhakaClock /> GMT+6
          </span>
          <div className="flex gap-5">
            <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              Facebook
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              LinkedIn
            </a>
            <span className="normal-case tracking-normal">Lic. {siteConfig.tradeLicense}</span>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div aria-hidden className="pointer-events-none select-none px-2">
        <div className="font-display text-center text-[21vw] font-bold leading-[0.78] tracking-[-0.06em] text-fg/[0.06]">
          ScaleUp
        </div>
      </div>
    </footer>
  );
}
