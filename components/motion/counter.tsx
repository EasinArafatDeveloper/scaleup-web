"use client";

import * as React from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/** Counts up to `value` the first time it scrolls into view. */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = ""
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const numRef = React.useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const state = { n: 0 };
        const render = () => {
          if (numRef.current) numRef.current.textContent = state.n.toFixed(decimals);
        };
        render();
        gsap.to(state, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: render,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true }
        });
      });
    },
    { scope: ref, dependencies: [value, decimals] }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numRef}>{value.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
