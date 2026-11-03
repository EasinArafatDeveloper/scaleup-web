"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pricingBundles, pricingNotes } from "@/data/pricing";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";
import { useSwapIn } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

export type Currency = "BDT" | "USD";

export function CurrencyToggle({
  currency,
  onChange,
  className
}: {
  currency: Currency;
  onChange: (c: Currency) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-grid grid-cols-2 rounded-full border border-line-strong p-1 font-mono text-[11px] uppercase tracking-[0.16em]",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-fg transition-transform duration-500 ease-out-expo",
          currency === "USD" ? "translate-x-full" : "translate-x-0"
        )}
      />
      {(["BDT", "USD"] as const).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          aria-pressed={currency === c}
          className={cn(
            "relative z-10 px-6 py-2.5 transition-colors",
            currency === c ? "text-ink" : "text-muted hover:text-fg"
          )}
        >
          {c === "BDT" ? "৳ BDT" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

/** Three plans fused into one object; the popular plan is inverted. */
export function BundleGrid({ currency }: { currency: Currency }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useSwapIn(ref, currency, ".bundle-price", { yPercent: 60, y: 0, duration: 0.5, stagger: 0.05 });

  return (
    <div ref={ref}>
    <StaggerContainer className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-0">
      {pricingBundles.map((b, i) => {
        const popular = !!b.popular;
        const price = currency === "BDT" ? b.priceBDT : b.priceUSD;
        return (
          <div
            key={b.id}
            className={cn(
              "relative flex flex-col rounded-[1.75rem] p-8 sm:p-10",
              popular
                ? "z-10 bg-fg text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] lg:-my-6 lg:py-16"
                : "border border-line bg-surface text-fg",
              !popular && i === 0 && "lg:rounded-r-none lg:border-r-0",
              !popular && i === 2 && "lg:rounded-l-none lg:border-l-0"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold">{b.name}</h3>
              {popular && (
                <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">
                  Most chosen
                </span>
              )}
            </div>
            <p className={cn("mt-2 text-sm", popular ? "text-ink/60" : "text-muted")}>{b.tagline}</p>

            <div className="mt-10 h-[4.5rem] overflow-hidden">
              <div className="bundle-price font-display text-6xl font-semibold tracking-[-0.05em]">{price}</div>
            </div>
            <div
              className={cn(
                "mt-2 font-mono text-[11px] uppercase tracking-[0.14em]",
                popular ? "text-ink/50" : "text-muted-2"
              )}
            >
              {b.timeline} · {b.support}
            </div>

            <ul className={cn("mt-8 flex-1 space-y-3 border-t pt-8 text-sm", popular ? "border-ink/15" : "border-line")}>
              {b.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className={popular ? "text-ink/80" : "text-muted"}>{f}</span>
                </li>
              ))}
            </ul>

            <Button
              href={b.ctaLink}
              variant={popular ? "primary" : "secondary"}
              size="lg"
              className={cn("mt-10 w-full", popular && "before:bg-ink hover:text-fg")}
            >
              {b.ctaText} <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </StaggerContainer>
    </div>
  );
}

export function PricingPreviewSection() {
  const [currency, setCurrency] = React.useState<Currency>("BDT");

  return (
    <section className="bg-ink-alt py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-7xl"
              lines={[
                <span key="l1">
                  Clear <span className="serif-accent text-accent">prices.</span>
                </span>,
                <span key="l2">Zero surprises.</span>
              ]}
            />
          </div>
          <CurrencyToggle currency={currency} onChange={setCurrency} className="self-start md:self-end" />
        </div>

        <div className="mt-16">
          <BundleGrid currency={currency} />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center">
          <p>{pricingNotes.paymentTerms}</p>
          <Link
            href="/pricing"
            className="inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg hover:text-accent"
          >
            Full price list <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
