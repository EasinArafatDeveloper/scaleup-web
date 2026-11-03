"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

/**
 * Pill buttons. Hover runs a fill sweep from the bottom so every CTA
 * feels like the same physical object across the site.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group/btn relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-tight transition-[color,border-color,transform] duration-500 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none";

    // The ::before layer is the hover sweep.
    const sweep =
      "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-full before:transition-transform before:duration-500 before:ease-out-expo hover:before:translate-y-0";

    const variants = {
      primary: cn("bg-accent text-accent-ink before:bg-fg hover:text-ink", sweep),
      cyan: cn("bg-accent text-accent-ink before:bg-fg hover:text-ink", sweep),
      light: cn("bg-fg text-ink before:bg-accent hover:text-accent-ink", sweep),
      secondary: cn(
        "border border-line-strong bg-transparent text-fg before:bg-fg hover:text-ink hover:border-fg",
        sweep
      ),
      outline: cn(
        "border border-line-strong bg-transparent text-fg before:bg-fg hover:text-ink hover:border-fg",
        sweep
      ),
      ghost: "bg-transparent text-muted hover:text-fg"
    };

    const sizes = {
      sm: "text-xs px-4 h-9 gap-1.5",
      md: "text-sm px-5 h-11 gap-2",
      lg: "text-[15px] px-7 h-14 gap-2.5"
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
