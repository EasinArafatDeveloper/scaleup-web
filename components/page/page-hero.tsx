"use client";

import * as React from "react";
import Link from "next/link";
import { gsap, MOTION_OK, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Shared hero for every inner page: mono breadcrumb row, huge display
 * headline (last word set in serif accent), intro + optional right slot.
 */
export function PageHero({
  crumbs,
  label,
  meta,
  title,
  accent,
  intro,
  size = "xl",
  children
}: {
  crumbs?: Crumb[];
  label: string;
  meta?: string;
  title: string[];
  accent?: string;
  intro?: string;
  size?: "xl" | "lg";
  children?: React.ReactNode;
}) {
  const lines: React.ReactNode[] = title.map((t, i) =>
    i === title.length - 1 && accent ? (
      <>
        {t} <span className="serif-accent text-accent">{accent}</span>
      </>
    ) : (
      t
    )
  );
  if (title.length === 0 && accent) lines.push(<span className="serif-accent text-accent">{accent}</span>);

  const ref = React.useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline()
          .from(".ph-crumbs", { autoAlpha: 0, duration: 0.8 }, 0)
          .from(".ph-line", { yPercent: 105, duration: 1.05, ease: "expo.out", stagger: 0.09 }, 0.1)
          .from(".ph-intro", { autoAlpha: 0, y: 16 }, 0.45);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div aria-hidden className="bg-hairline-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -top-20 h-[560px] w-[560px] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent-glow), transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="ph-crumbs flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
        >
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
            {crumbs?.length ? (
              crumbs.map((c, i) => (
                <React.Fragment key={`${c.label}-${i}`}>
                  {i > 0 && <span className="text-muted-2">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-fg">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-fg">{c.label}</span>
                  )}
                </React.Fragment>
              ))
            ) : (
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {label}
              </span>
            )}
          </nav>
          {meta && <span className="text-muted-2">{meta}</span>}
        </div>

        {crumbs?.length ? (
          <div className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {label}
          </div>
        ) : null}

        <h1
          className={cn(
            "font-display font-semibold text-fg",
            crumbs?.length ? "mt-6" : "mt-12",
            size === "xl"
              ? "text-[clamp(2.9rem,8.5vw,8.5rem)] leading-[0.9]"
              : "text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95]"
          )}
        >
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.07em]">
              <span className="ph-line block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        {(intro || children) && (
          <div className="ph-intro mt-12 grid grid-cols-1 items-end gap-10 md:grid-cols-12"
          >
            {intro && (
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg md:col-span-6">{intro}</p>
            )}
            {children && <div className="md:col-span-6 md:justify-self-end">{children}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
