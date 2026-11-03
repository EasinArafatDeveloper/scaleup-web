import {
  Building2,
  GraduationCap,
  Leaf,
  Newspaper,
  Ship,
  Shirt,
  Stethoscope,
  type LucideIcon
} from "lucide-react";
import { techStackList, clientList, type TechItem } from "@/data/clients";
import { statsData } from "@/data/stats";

const categoryDot: Record<TechItem["category"], string> = {
  frontend: "bg-accent",
  backend: "bg-[#8b95ab]",
  ai: "bg-[#a78bfa]",
  payment: "bg-success",
  marketing: "bg-[#e7c27a]"
};

/** A business-type icon and brand colour per client, matched on its industry. */
const clientMarks: { match: RegExp; Icon: LucideIcon; color: string }[] = [
  { match: /organic|food/i, Icon: Leaf, color: "#22a35a" },
  { match: /news|media/i, Icon: Newspaper, color: "#c2410c" },
  { match: /fashion|retail/i, Icon: Shirt, color: "#db2777" },
  { match: /health|dental|clinic/i, Icon: Stethoscope, color: "#0d9488" },
  { match: /export|trading|agro/i, Icon: Ship, color: "#d97706" },
  { match: /education|study/i, Icon: GraduationCap, color: "#2563eb" }
];

function markFor(industry: string) {
  return clientMarks.find((m) => m.match.test(industry)) ?? { Icon: Building2, color: "var(--accent)" };
}

/** Quiet "trusted by" wall: client wordmarks on top, stack chips below. */
export function LogoMarqueeSection() {
  const clients = statsData.find((s) => s.id === "clients")?.value ?? 48;
  const fade = "[mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]";

  return (
    <section aria-label="Clients and technology" className="select-none border-y border-line bg-ink-alt py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[240px_1fr] lg:gap-14">
        {/* Label */}
        <div className="lg:border-r lg:border-line lg:pr-10">
          <div className="font-display text-5xl font-semibold tracking-[-0.05em] text-fg">
            {clients}
            <span className="text-accent">+</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            businesses trust us across <span className="text-fg">Bangladesh</span> &amp; beyond
          </p>
        </div>

        <div className="min-w-0 space-y-6">
          {/* Client wordmarks */}
          <div className={`group/row relative overflow-hidden ${fade}`}>
            <div className="animate-marquee items-center group-hover/row:[animation-play-state:paused]">
              {[...clientList, ...clientList].map((c, i) => {
                const { Icon, color } = markFor(c.industry);
                return (
                <div
                  key={`${c.name}-${i}`}
                  className="group mr-4 flex shrink-0 items-center gap-3 rounded-2xl border border-transparent px-4 py-2.5 transition-colors duration-300 hover:border-line hover:bg-surface"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ color, backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="leading-tight">
                    <span className="block whitespace-nowrap font-display text-lg font-semibold text-fg/80 transition-colors duration-300 group-hover:text-fg">
                      {c.name}
                    </span>
                    <span className="block whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-muted-2">
                      {c.industry}
                    </span>
                  </span>
                </div>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-line" />

          {/* Stack chips */}
          <div className={`group/row relative overflow-hidden ${fade}`}>
            <div className="animate-marquee-slow items-center [animation-direction:reverse] group-hover/row:[animation-play-state:paused]">
              {[...techStackList, ...techStackList].map((t, i) => (
                <span
                  key={`${t.name}-${i}`}
                  className="mr-2.5 flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${categoryDot[t.category]}`} />
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
