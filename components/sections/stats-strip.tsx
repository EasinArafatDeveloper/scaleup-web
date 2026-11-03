import { statsData } from "@/data/stats";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";

export function StatsStripSection() {
  const visibleStats = statsData.filter((s) => s.value > 0);

  return (
    <section className="border-y border-line bg-ink-alt py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {visibleStats.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1}>
              <div className="text-center">
                <div className="flex items-center justify-center font-mono text-3xl font-semibold text-fg sm:text-4xl lg:text-5xl">
                  <Counter
                    value={item.value}
                    suffix={item.suffix}
                    decimals={item.id === "ad_roas" ? 1 : 0}
                    className="text-gradient-primary"
                  />
                </div>
                <h4 className="mt-2 text-sm font-bold text-fg/90">
                  {item.label}
                </h4>
                {item.sublabel && (
                  <p className="mt-1 text-xs text-muted">
                    {item.sublabel}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
