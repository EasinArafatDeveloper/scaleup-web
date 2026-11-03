"use client";

import * as React from "react";
import { BadgeCheck, Star } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { useSwapIn } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

/** "70% faster order fulfillment" → ["70%", "faster order fulfillment"] */
function splitResult(r: string): [string, string] {
  const m = r.match(/^([+]?[\d.]+[%x]?)\s*(.*)$/i);
  return m ? [m[1], m[2]] : [r, ""];
}

export function TestimonialsSection() {
  const [i, setI] = React.useState(0);
  const panelRef = React.useRef<HTMLDivElement>(null);
  useSwapIn(panelRef, i, ".t-swap", { stagger: 0.08 });

  const t = testimonialsData[i];
  const [big, rest] = splitResult(t.results);

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                <span key="l1">Don&apos;t take</span>,
                <span key="l2">
                  <span className="serif-accent text-accent">our</span> word for it.
                </span>
              ]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            Owners of stores, clinics and brands we&apos;ve built systems for.
          </p>
        </div>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Client selector */}
          <div role="tablist" aria-label="Testimonials" className="flex flex-col gap-3 lg:col-span-4">
            {testimonialsData.map((item, idx) => {
              const active = idx === i;
              const [n] = splitResult(item.results);
              return (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setI(idx)}
                  className={cn(
                    "group rounded-2xl border p-4 text-left transition-colors duration-300",
                    active ? "border-line-strong bg-surface" : "border-line hover:bg-surface/60"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-xs transition-colors duration-300",
                        active ? "bg-accent text-accent-ink" : "bg-surface-2 text-muted"
                      )}
                    >
                      {item.avatarText}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-sm font-medium", active ? "text-fg" : "text-muted group-hover:text-fg")}>
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-muted-2">{item.company}</span>
                    </span>
                    <span className={cn("font-display text-xl font-semibold", active ? "text-accent" : "text-muted-2")}>{n}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quote */}
          <figure
            ref={panelRef}
            className="flex min-h-[420px] flex-col justify-between gap-10 rounded-[2rem] border border-line-strong bg-surface p-7 sm:p-10 lg:col-span-8"
          >
            <div>
              <div className="t-swap flex items-center gap-1 text-accent">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="t-swap serif-accent mt-6 text-[clamp(1.8rem,3.2vw,3rem)] leading-[1.12] text-fg">
                “{t.content}”
              </blockquote>
            </div>

            <figcaption className="t-swap grid grid-cols-1 items-end gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 font-mono text-xs text-fg">
                  {t.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-fg">
                    {t.name} <BadgeCheck className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-xs text-muted">
                    {t.role}, {t.company} · {t.location}
                  </div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 sm:justify-end">
                <span className="font-display text-4xl font-semibold tracking-[-0.05em] text-accent">{big}</span>
                <span className="text-sm text-fg">{rest}</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
