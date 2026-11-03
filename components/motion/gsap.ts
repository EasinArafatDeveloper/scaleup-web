"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

/** Runs only when the visitor hasn't asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Fades `selector` (inside `scope`) in each time `key` changes —
 * for tabs, toggles and anything else that swaps content in place.
 */
export function useSwapIn(
  scope: React.RefObject<HTMLElement | null>,
  key: unknown,
  selector: string,
  vars: gsap.TweenVars = {}
) {
  const shown = React.useRef(key);
  useGSAP(
    () => {
      if (shown.current === key) return;
      shown.current = key;
      if (!selector) return;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(selector, { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.06, ...vars });
      });
    },
    { scope, dependencies: [key] }
  );
}

export { gsap, ScrollTrigger, useGSAP };
