"use client";

import { useTheme } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

/** Half-filled circle toggle — reads as "light / dark" without an icon set. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
    >
      <span
        className={cn(
          "relative h-3.5 w-3.5 overflow-hidden rounded-full border border-current transition-transform duration-500 ease-out-expo",
          theme === "light" ? "rotate-180" : "rotate-0"
        )}
      >
        <span className="absolute inset-y-0 left-0 w-1/2 bg-current" />
      </span>
    </button>
  );
}
