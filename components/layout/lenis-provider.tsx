"use client";

import * as React from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";

/** Smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, touchMultiplier: 2 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
