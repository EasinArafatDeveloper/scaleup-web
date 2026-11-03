"use client";

import * as React from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

/** Headline reveal: each line slides up from behind a mask when scrolled into view. */
export function SplitReveal({
  lines,
  className,
  delay = 0,
  as: Tag = "h2"
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".split-line", {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          delay,
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      <Tag className={className}>
        {lines.map((line, i) => (
          // Extra bottom room so descenders (g, y, p) aren't clipped by the mask.
          <span key={i} className="-mb-[0.18em] block overflow-hidden pb-[0.18em]">
            <span className="split-line block">{line}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
