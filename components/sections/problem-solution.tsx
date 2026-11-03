"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";
import { useSwapIn } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

const rows = [
  {
    tag: "Inbox",
    before: {
      title: "Orders stuck in the Messenger inbox",
      desc: "Customers wait 40+ minutes for a reply to the same price question and buy from a competitor instead.",
      points: ["Ready buyers lost to slow replies", "Typed addresses → courier returns", "Nothing logged after hours"]
    },
    after: {
      title: "A 24/7 AI assistant that closes the sale",
      desc: "Replies in 2 seconds in Banglish or English, collects the address and books the courier for you.",
      points: ["2-second replies, day and night", "1-click courier booking", "Zero lost night-time orders"]
    }
  },
  {
    tag: "Trust",
    before: {
      title: "Only a Facebook page — low buyer trust",
      desc: "High-ticket buyers hesitate to pay in advance, and one page ban can switch your whole business off.",
      points: ["Fake COD orders", "One ban away from zero sales", "Invisible on Google"]
    },
    after: {
      title: "A fast website you fully own",
      desc: "A Next.js storefront that loads in about a second, takes bKash and card, and ranks on Google.",
      points: ["Under 1.2s load, Lighthouse 95+", "Your customers, your data", "Free traffic from search"]
    }
  },
  {
    tag: "Tracking",
    before: {
      title: "Ad budget burned on blind tracking",
      desc: "Browser pixels miss 30–45% of purchases, so Meta optimises for clickers instead of buyers.",
      points: ["Cost per purchase keeps rising", "Can't retarget warm shoppers", "No idea which ad made profit"]
    },
    after: {
      title: "Server-side tracking that counts every sale",
      desc: "Conversions API sends verified purchases straight to Meta, so the algorithm finds real buyers.",
      points: ["8.5+ Event Match Quality", "Funnels built for mobile", "Every sale reported in GA4"]
    }
  }
];

export function ProblemSolutionSection() {
  const [after, setAfter] = React.useState(false);
  const cardsRef = React.useRef<HTMLDivElement>(null);
  useSwapIn(cardsRef, after, ".ps-body", { stagger: 0.08 });

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                "Why good brands",
                <>
                  hit a <span className="serif-accent text-accent">ceiling.</span>
                </>
              ]}
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              Manual work and broken tracking quietly drain time and ad budget. Switch to see what
              changes after we step in.
            </p>

            {/* Before / After switch */}
            <div
              role="radiogroup"
              aria-label="Show before or after"
              className="relative mt-10 inline-grid grid-cols-2 rounded-full border border-line-strong bg-surface/60 p-1 text-sm font-medium"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full transition-all duration-500 ease-out-expo",
                  after ? "translate-x-full bg-accent" : "translate-x-0 bg-fg"
                )}
              />
              {["Without us", "With ScaleUp"].map((label, i) => {
                const active = after === (i === 1);
                return (
                  <button
                    key={label}
                    role="radio"
                    aria-checked={active}
                    onClick={() => setAfter(i === 1)}
                    className={cn(
                      "relative z-10 px-6 py-3 transition-colors duration-300",
                      active ? (i === 1 ? "text-white" : "text-ink") : "text-muted hover:text-fg"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div ref={cardsRef} className="lg:col-span-7">
          <StaggerContainer className="space-y-5">
            {rows.map((row, idx) => {
              const side = after ? row.after : row.before;
              return (
                <article
                  key={row.tag}
                  className={cn(
                    "rounded-[1.75rem] border p-7 transition-colors duration-700 sm:p-9",
                    after ? "border-accent/30 bg-surface" : "border-line bg-surface/60"
                  )}
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">
                    0{idx + 1} / {row.tag}
                  </div>
                  <div className="ps-body mt-5">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-fg sm:text-3xl">{side.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{side.desc}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {side.points.map((p) => (
                        <li
                          key={p}
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs",
                            after ? "border-success/30 bg-success/10 text-fg" : "border-line text-muted"
                          )}
                        >
                          {after ? (
                            <Check className="h-3 w-3 text-success" />
                          ) : (
                            <span className="h-1 w-1 rounded-full bg-warning" />
                          )}
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
