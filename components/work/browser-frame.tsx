import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/** A project screenshot inside a minimal browser window (grows slightly on parent `group` hover). */
export function BrowserFrame({
  project,
  priority,
  className
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-ink/60 px-3 py-1 text-[11px] text-muted">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
          <span className="truncate">{project.domain}</span>
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} homepage`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 680px, 100vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
