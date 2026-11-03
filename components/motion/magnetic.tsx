"use client";

import * as React from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";

/** Pulls its child slightly toward the cursor while hovered. */
export function Magnetic({
  children,
  strength = 0.3,
  className
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const move = React.useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  useGSAP(
    () => {
      move.current = {
        x: gsap.quickTo(ref.current, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" }),
        y: gsap.quickTo(ref.current, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" })
      };
    },
    { scope: ref }
  );

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current || !move.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    move.current.x((e.clientX - (r.left + r.width / 2)) * strength);
    move.current.y((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    move.current?.x(0);
    move.current?.y(0);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={className ?? "inline-block"}>
      {children}
    </div>
  );
}
