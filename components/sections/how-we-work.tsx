"use client";

import * as React from "react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

const steps = [
  {
    title: "Free discovery & audit",
    desc: "We look at your site speed, ad tracking and inbox response times, then show you exactly where money is leaking. No sales pressure.",
    meta: "Day 1–2"
  },
  {
    title: "Fixed-price plan",
    desc: "A written scope with a fixed price in BDT or USD and clear milestones. No surprise invoices halfway through.",
    meta: "Day 3"
  },
  {
    title: "Design & build sprints",
    desc: "Conversion-first design in Figma, clean Next.js code, and a Loom video update from us every single week.",
    meta: "Week 1–3"
  },
  {
    title: "Tracking, testing, handover",
    desc: "We verify Meta CAPI and GA4 events, connect courier and payment APIs, and train your team to run it.",
    meta: "Launch week"
  },
  {
    title: "Warranty & growth",
    desc: "1–3 months of free support after launch. When you want SEO, GEO or AI agents, we're already in context.",
    meta: "Ongoing"
  }
];

/** Vertical timeline: the spine fills as you scroll and the step in the middle of the screen lights up. */
export function HowWeWorkSection() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".step");
      items.forEach((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom+=24 center", // include the gap so one step is always lit
          toggleClass: "is-active"
        })
      );

      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".spine-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-6xl"
              lines={[
                "From first call",
                <>
                  to <span className="serif-accent text-accent">launch day.</span>
                </>
              ]}
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              Five steps, no guesswork. You always know what&apos;s happening, what it costs and
              when it ships.
            </p>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-7">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-line" />
          <div className="spine-fill absolute bottom-2 left-[19px] top-2 w-px origin-top bg-accent" />

          <ol className="space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="step group relative flex gap-8">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink font-mono text-xs text-muted transition-all duration-500 group-[.is-active]:border-accent group-[.is-active]:bg-accent group-[.is-active]:text-accent-ink group-[.is-active]:shadow-[0_0_0_6px_var(--accent-glow)]">
                  0{i + 1}
                </span>
                <div className="-mt-2 flex-1 rounded-3xl border border-transparent p-6 opacity-50 transition-all duration-500 group-[.is-active]:border-line-strong group-[.is-active]:bg-surface group-[.is-active]:opacity-100">
                  <div className="text-sm font-medium text-accent">{s.meta}</div>
                  <h3 className="font-display mt-2 text-3xl font-semibold text-fg sm:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
