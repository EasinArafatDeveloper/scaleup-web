"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

/** Lightweight twinkling star canvas. Hidden in light mode via CSS (.starfield). */
export function Starfield({ density = 0.00012 }: { density?: number }) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(width * height * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        r: Math.random() * 1.1 + 0.2,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 1.2
      }));
    };

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      for (const st of stars) {
        const a = reduce ? 0.5 : 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(st.p + (t / 1000) * st.s));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#cfdcff";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, reduce]);

  return <canvas ref={ref} aria-hidden className="starfield pointer-events-none absolute inset-0 h-full w-full" />;
}
