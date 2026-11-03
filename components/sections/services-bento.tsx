"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { serviceCategories, formatStartingPrice, lowestStartingPriceBDT } from "@/data/services";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";
import { useSwapIn } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

/** Index-style service list: big numbered rows that expand in place. */
export function ServicesBentoSection() {
  const [open, setOpen] = React.useState<string | undefined>(serviceCategories[0]?.slug);
  const listRef = React.useRef<HTMLDivElement>(null);
  useSwapIn(listRef, open, open ? `[data-panel="${open}"] .svc-item` : "", { y: 10, duration: 0.5, stagger: 0.04 });

  return (
    <section className="relative bg-ink-alt py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-7xl"
              lines={[
                "Five engines,",
                <>
                  one <span className="serif-accent text-accent">growth</span> system.
                </>
              ]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted lg:col-span-4">
            Everything to automate the busywork, convert your traffic and scale — designed, built and
            maintained under one roof.
          </p>
        </div>

        <div ref={listRef}>
          <StaggerContainer className="mt-20 border-t border-line" staggerDelay={0.06}>
            {serviceCategories.map((cat, i) => {
              const isOpen = open === cat.slug;
              const minPrice = lowestStartingPriceBDT(cat.services);
              return (
                <div
                  key={cat.slug}
                  data-panel={cat.slug}
                  className={cn("relative border-b border-line transition-colors duration-500", isOpen && "bg-surface/40")}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 w-px bg-accent transition-all duration-700 ease-out-expo",
                      isOpen ? "h-full" : "h-0"
                    )}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? undefined : cat.slug)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-6 py-7 pl-4 text-left sm:gap-10 sm:pl-6"
                  >
                    <span className={cn("font-mono text-xs transition-colors", isOpen ? "text-accent" : "text-muted-2")}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-display flex-1 text-3xl font-semibold transition-all duration-500 ease-out-expo sm:text-5xl lg:text-6xl",
                        isOpen ? "translate-x-2 text-fg" : "text-muted group-hover:translate-x-2 group-hover:text-fg"
                      )}
                    >
                      {cat.title}
                    </span>
                    <span className="hidden text-right md:block">
                      <span className="block text-sm text-muted">{minPrice ? `From ৳${minPrice.toLocaleString()}` : "Custom quote"}</span>
                      <span className="block text-xs text-muted-2">{cat.services.length} services</span>
                    </span>
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out-expo",
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-accent-ink"
                          : "border-line-strong text-fg group-hover:border-accent group-hover:text-accent"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Expanding body (CSS grid-rows trick, no JS height maths) */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 gap-8 pb-10 pl-4 pr-4 sm:pl-[5.5rem] lg:grid-cols-12 lg:pr-6">
                        <div className="lg:col-span-4">
                          <p className="svc-item max-w-sm text-[15px] leading-relaxed text-muted">{cat.shortDesc}</p>
                          <Link
                            href={`/services/${cat.slug}`}
                            className="svc-item group/e mt-6 inline-flex items-center gap-3 text-sm font-medium text-fg"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover/e:rotate-45">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                            Explore {cat.title}
                          </Link>
                        </div>
                        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:col-span-8">
                          {cat.services.map((s) => (
                            <li key={s.slug} className="svc-item">
                              <Link
                                href={`/services/${cat.slug}/${s.slug}`}
                                className="group/s flex items-center justify-between gap-3 border-b border-line py-3.5 text-sm text-fg transition-colors hover:text-accent"
                              >
                                <span>{s.title}</span>
                                <span className="flex shrink-0 items-center gap-2">
                                  <span className="text-xs text-muted-2">{formatStartingPrice(s.startingPriceBDT)}</span>
                                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-2 transition-all duration-300 group-hover/s:-translate-y-0.5 group-hover/s:translate-x-0.5 group-hover/s:text-accent" />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
