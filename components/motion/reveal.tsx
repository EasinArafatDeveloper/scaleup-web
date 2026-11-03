"use client";

import * as React from "react";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";

const TRIGGER_START = "top 88%";

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  yOffset = 32
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current, {
          autoAlpha: 0,
          y: yOffset,
          duration,
          delay,
          scrollTrigger: { trigger: ref.current, start: TRIGGER_START, once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Reveals its direct children one after another. */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const items = ref.current ? Array.from(ref.current.children) : [];
        gsap.from(items, {
          autoAlpha: 0,
          y: 28,
          stagger: staggerDelay,
          scrollTrigger: { trigger: ref.current, start: TRIGGER_START, once: true }
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Kept for existing markup; StaggerContainer animates its children directly. */
export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
