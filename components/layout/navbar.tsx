"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes (adjust state during render, not in an effect).
  const [lastPath, setLastPath] = React.useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const linkClass = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
      active ? "text-fg" : "text-muted hover:text-fg"
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 pl-5 transition-all duration-500 ease-out-expo",
          isScrolled || mobileMenuOpen
            ? "border-line bg-[var(--surface-glass)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              className={cn(linkClass(servicesOpen || pathname.startsWith("/services")), "flex items-center gap-1")}
            >
              Services
              <Plus
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-300",
                  servicesOpen && "rotate-45 text-accent"
                )}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4"
                >
                  <div className="overflow-hidden rounded-3xl border border-line bg-surface p-2 shadow-2xl shadow-black/40">
                    {serviceCategories.map((cat, i) => (
                      <Link
                        key={cat.slug}
                        href={`/services/${cat.slug}`}
                        className="group flex items-center gap-5 rounded-2xl px-4 py-3.5 transition-colors hover:bg-surface-2"
                      >
                        <span className="font-mono text-[11px] text-muted-2 group-hover:text-accent">
                          0{i + 1}
                        </span>
                        <div className="flex-1">
                          <div className="font-display text-[17px] font-semibold text-fg">
                            {cat.title}
                          </div>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted">{cat.shortDesc}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="mt-1 flex items-center justify-between rounded-2xl bg-surface-2 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted hover:text-fg"
                    >
                      All services &amp; packages <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(pathname.startsWith(l.href))}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href="/free-audit" variant="primary" size="sm" className="hidden sm:inline-flex">
            Free audit <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line-strong md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300",
                mobileMenuOpen ? "rotate-45" : "-translate-y-[3px]"
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-300",
                mobileMenuOpen ? "-rotate-45" : "translate-y-[3px]"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 -z-10 flex flex-col justify-between bg-ink px-6 pb-8 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {[{ href: "/services", label: "Services" }, ...links].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    className="flex items-baseline justify-between border-b border-line py-4"
                  >
                    <span className="font-display text-5xl font-semibold text-fg">{l.label}</span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-4">
              <Button href="/free-audit" variant="primary" size="lg" className="w-full">
                Get a free audit <ArrowUpRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  {siteConfig.whatsappDisplay}
                </a>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
