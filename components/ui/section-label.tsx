import { cn } from "@/lib/utils";

/** Mono index label used at the top of every section: "(03) — Services". */
export function SectionLabel({
  index,
  children,
  className
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted",
        className
      )}
    >
      <span className="text-accent">({index})</span>
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
