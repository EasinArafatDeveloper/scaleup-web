"use client";

import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

/** Two-line reveal headline + optional intro, used inside inner pages. */
export function SectionHead({
  title,
  accent,
  intro,
  className,
  size = "md",
  stacked = false
}: {
  stacked?: boolean;
  /** No longer displayed; kept so existing pages compile. */
  index?: string;
  label?: string;
  title: string;
  accent?: string;
  intro?: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const lines = accent
    ? [<span key="t">{title}</span>, <span key="a" className="serif-accent text-accent">{accent}</span>]
    : [<span key="t">{title}</span>];

  return (
    <div className={cn("grid grid-cols-1 items-end gap-8", !stacked && "lg:grid-cols-12", className)}>
      <div className={stacked ? undefined : "lg:col-span-7"}>
        <SplitReveal
          className={cn(
            "font-display font-semibold leading-[0.95] text-fg",
            size === "lg" ? "text-5xl sm:text-7xl" : "text-4xl sm:text-6xl"
          )}
          lines={lines}
        />
      </div>
      {intro && (
        <p
          className={cn(
            "max-w-sm text-[15px] leading-relaxed text-muted",
            !stacked && "lg:col-span-5 lg:justify-self-end"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
