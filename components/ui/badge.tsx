import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "cyan" | "success" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-fg/5 text-muted border-line",
    primary: "bg-accent/10 text-accent border-accent/30",
    cyan: "bg-accent/10 text-accent border-accent/30",
    success: "bg-success/10 text-success border-success/30",
    outline: "bg-transparent text-fg/80 border-line-strong"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
