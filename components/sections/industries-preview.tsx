"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  GraduationCap,
  Home,
  ShoppingBag,
  Shirt,
  Sparkles,
  Stethoscope,
  Utensils,
  type LucideIcon
} from "lucide-react";
import { industriesData } from "@/data/industries";
import { getCaseStudyBySlug } from "@/data/caseStudies";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { useSwapIn } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Shirt,
  Sparkles,
  Stethoscope,
  GraduationCap,
  Home,
  Utensils,
  ShoppingBag
};

/** Industry tabs on the left, the plan for the selected industry on the right. */
export function IndustriesPreviewSection() {
  const [active, setActive] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);
  useSwapIn(panelRef, active, ".ind-swap", { stagger: 0.07 });

  const ind = industriesData[active];
  const study = ind.caseStudySlug ? getCaseStudyBySlug(ind.caseStudySlug) : undefined;

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-7xl"
              lines={[
                "Built for",
                <>
                  <span className="serif-accent text-accent">your</span> industry.
                </>
              ]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            No generic templates. Each industry gets a conversion stack shaped around how its customers
            actually buy.
          </p>
        </div>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Tabs */}
          <div role="tablist" aria-label="Industries" className="lg:col-span-4">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {industriesData.map((item, i) => {
                const TabIcon = icons[item.icon] ?? Sparkles;
                const isActive = i === active;
                return (
                  <button
                    key={item.slug}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 lg:w-full",
                      isActive ? "border-line-strong bg-surface" : "border-transparent hover:bg-surface/60"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                        isActive ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted group-hover:text-fg"
                      )}
                    >
                      <TabIcon className="h-4 w-4" />
                    </span>
                    <span
                      className={cn(
                        "font-display flex-1 whitespace-nowrap text-base font-semibold transition-colors lg:text-lg",
                        isActive ? "text-fg" : "text-muted group-hover:text-fg"
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div
            ref={panelRef}
            className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-surface p-7 sm:p-10 lg:col-span-8"
          >
            <h3 className="ind-swap font-display max-w-2xl text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl">
              {ind.headline}
            </h3>

            <div className="ind-swap mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line p-5">
                <div className="text-sm font-medium text-muted">Today</div>
                <ul className="mt-3 space-y-2.5">
                  {ind.painPoints.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-muted">
                      <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-warning" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-success/30 bg-success/[0.06] p-5">
                <div className="text-sm font-medium text-success">With ScaleUp</div>
                <ul className="mt-3 space-y-2.5">
                  {ind.keyBenefits.map((b) => (
                    <li key={b} className="flex gap-2.5 text-sm text-fg">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ind-swap mt-8">
              <div className="text-sm font-medium text-muted">Your stack</div>
              <ol className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {ind.recommendedStack.map((s, i) => (
                  <li key={s} className="rounded-xl border border-line p-3.5">
                    <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                    <p className="mt-1.5 text-[13px] leading-snug text-fg">{s}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ind-swap mt-8 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <div className="text-xs text-muted-2">Suggested</div>
                  <div className="mt-1 text-sm font-medium text-fg">{ind.suggestedPackage}</div>
                </div>
                {study && (
                  <div className="border-l border-line pl-6">
                    <div className="text-xs text-muted-2">{study.client}</div>
                    <div className="mt-1 text-sm text-fg">
                      <span className="font-display text-lg font-semibold text-accent">{study.metrics[0].value}</span>{" "}
                      {study.metrics[0].label}
                    </div>
                  </div>
                )}
              </div>
              <Link
                href={`/industries/${ind.slug}`}
                className="group inline-flex items-center gap-3 self-start rounded-full border border-line-strong py-1.5 pl-5 pr-1.5 text-sm text-fg transition-colors hover:border-accent sm:self-auto"
              >
                Learn more
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
