import * as React from "react";
import { cn } from "@/lib/utils";

/** Editorial form controls: label in mono, underline-only inputs. */

export const controlClass =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base text-fg placeholder:text-muted-2 transition-colors focus:border-accent focus:outline-none focus:ring-0";

export function Field({
  label,
  hint,
  index,
  className,
  children
}: {
  label: string;
  hint?: string;
  index?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {index && <span className="text-accent">{index}</span>}
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block text-xs text-muted-2">{hint}</span>}
    </label>
  );
}

/** Pill radio group — replaces <select> where options are few. */
export function ChoicePills<T extends string>({
  options,
  value,
  onChange,
  name
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-4 flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all duration-300",
              active
                ? "border-accent bg-accent text-accent-ink"
                : "border-line-strong text-muted hover:border-fg hover:text-fg"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
