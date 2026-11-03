import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ScaleUp Web — home"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-[19px] font-semibold text-fg",
        className
      )}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-[7px] bg-accent transition-transform duration-500 ease-out-expo group-hover:rotate-90" />
        <span className="relative h-2 w-2 rounded-full bg-accent-ink" />
      </span>
      <span>
        ScaleUp<span className="serif-accent text-[1.12em] text-muted">web</span>
      </span>
    </Link>
  );
}
