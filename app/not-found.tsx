import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const links = [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pb-20 pt-32">
      <div aria-hidden className="bg-hairline-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">(404)</span> — Page not found
        </div>
        <h1 className="font-display mt-8 text-[clamp(5rem,22vw,20rem)] font-semibold leading-[0.8] tracking-[-0.07em] text-fg">
          4<span className="serif-accent text-accent">0</span>4
        </h1>
        <div className="mt-12 grid grid-cols-1 items-end gap-10 border-t border-line pt-8 md:grid-cols-12">
          <p className="max-w-md text-lg leading-relaxed text-muted md:col-span-6">
            This page moved or never existed. Here&apos;s where most people were heading:
          </p>
          <div className="flex flex-wrap gap-2 md:col-span-6 md:justify-end">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
            <Button href="/" variant="primary" size="md">
              Home <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
