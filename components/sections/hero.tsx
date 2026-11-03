"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Starfield } from "@/components/motion/starfield";
import { EarthGlobe } from "@/components/motion/earth-globe";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { getWhatsAppUrl } from "@/data/site";
import { statsData } from "@/data/stats";

const rotatingWords = ["grow.", "sell.", "scale.", "convert."];

/** Swaps the last word of the headline every few seconds. */
function RotatingWord() {
  const [i, setI] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % rotatingWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (i === 0) return;
      gsap.from(".rw", { yPercent: 100, autoAlpha: 0, duration: 0.8, ease: "expo.out" });
    },
    { scope: ref, dependencies: [i] }
  );

  return (
    <span ref={ref} className="relative inline-flex overflow-hidden pb-[0.12em] align-bottom">
      <span key={i} className="rw serif-accent text-accent inline-block">
        {rotatingWords[i]}
      </span>
    </span>
  );
}

/** "Planet rise" hero: starfield, soft aurora, and the Earth rising under the stats bar. */
export function HeroSection() {
  const ref = React.useRef<HTMLElement>(null);
  const stats = statsData.filter((s) => s.value > 0);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Intro
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-earth", { y: 160, autoAlpha: 0, duration: 2 }, 0.1)
          .from(".hero-line", { yPercent: 105, duration: 1.2, stagger: 0.12 }, 0.15)
          .from(".hero-fade", { y: 18, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.5);

        // Scroll parallax
        const scroll = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-content", { yPercent: 30, autoAlpha: 0, ease: "none", scrollTrigger: scroll });
        gsap.to(".hero-earth-wrap", { y: -140, scale: 1.08, ease: "none", scrollTrigger: scroll });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pb-6 pt-28 sm:pt-32">
      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Starfield />
        <div className="hero-beams" />
        <div className="hero-aurora hero-aurora-a" />
        <div className="hero-aurora hero-aurora-b" />
      </div>

      {/* Earth */}
      <div
        aria-hidden
        className="hero-earth-wrap pointer-events-none absolute left-1/2 top-[calc(100%-300px)] -z-10 -translate-x-1/2 sm:top-[calc(100%-360px)]"
      >
        <div className="hero-earth relative">
          <div className="hero-earth-atmosphere" />
          <EarthGlobe className="w-[760px] sm:w-[1300px]" />
        </div>
      </div>

      {/* Content */}
      <div className="hero-content relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 text-center sm:px-8">
        <h1 className="font-display hero-headline text-[clamp(2.7rem,6.2vw,6.6rem)] font-semibold leading-[0.95]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">
              <span className="hero-grad">We build websites &amp; AI</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-line block">
              <span className="hero-grad">that make brands</span> <RotatingWord />
            </span>
          </span>
        </h1>

        <p className="hero-fade mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Fast Next.js websites, 24/7 AI chatbots, WhatsApp automation and ad tracking that counts
          every sale — designed and engineered by one focused studio.
        </p>

        <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Button href="/free-audit" variant="primary" size="lg" className="hero-cta">
              Get a free audit <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button
            href={getWhatsAppUrl("Hi ScaleUp Web! I am looking for a website / automation solution for my business.")}
            isExternal
            variant="secondary"
            size="lg"
            className="bg-surface/40 backdrop-blur-md"
          >
            Chat on WhatsApp
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="hero-fade relative mx-auto mt-10 w-full max-w-3xl px-5 sm:px-8">
        <div
          className="grid overflow-hidden rounded-3xl border border-line-strong bg-surface/40 backdrop-blur-xl"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((s, i) => (
            <div key={s.id} className={`px-3 py-5 text-center sm:px-5 ${i > 0 ? "border-l border-line" : ""}`}>
              <div className="font-display text-3xl font-semibold tracking-[-0.04em] text-fg sm:text-4xl">
                {s.value}
                {s.suffix}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
