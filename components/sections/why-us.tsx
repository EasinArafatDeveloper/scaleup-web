import { Check } from "lucide-react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Counter } from "@/components/motion/counter";
import { StaggerContainer } from "@/components/motion/reveal";
import { statsData } from "@/data/stats";

const guarantees = [
  { title: "Fixed price, upfront", desc: "Every cost is written down before you pay. No mid-project invoice surprises." },
  { title: "2 revision rounds", desc: "Structured rounds in design and build so the result matches your brand." },
  { title: "Up to 3 months support", desc: "Bug fixes and technical help after launch, included." },
  { title: "You own everything", desc: "Code, servers, domain and Meta assets belong to your company. No lock-in." },
  { title: "Weekly video updates", desc: "A Loom walkthrough every week: what shipped, what's next." },
  { title: "Replies within 2 hours", desc: "Direct WhatsApp line with the engineers, 10am–10pm." }
];

export function WhyUsSection() {
  const stats = statsData.filter((s) => s.value > 0);

  return (
    <section className="border-t border-line py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitReveal
              className="font-display text-5xl font-semibold leading-[0.95] text-fg sm:text-7xl"
              lines={[
                <span key="l1">Promises we</span>,
                <span key="l2">
                  <span className="serif-accent text-accent">actually</span> keep.
                </span>
              ]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted lg:col-span-5 lg:justify-self-end">
            No “unlimited revisions” or “24/7 magic support”. Just clear guarantees, written into
            every contract.
          </p>
        </div>

        {/* Numbers */}
        <StaggerContainer className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.id} className="bg-surface p-6 sm:p-8">
              <div className="font-display text-5xl font-semibold tracking-[-0.06em] text-fg sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm font-medium text-fg">{s.label}</div>
              <div className="mt-1 text-xs text-muted">{s.sublabel}</div>
            </div>
          ))}
        </StaggerContainer>

        {/* Guarantees */}
        <StaggerContainer className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.07}>
          {guarantees.map((g) => (
            <div
              key={g.title}
              className="rounded-[1.5rem] border border-line bg-surface/60 p-6 transition-colors duration-500 hover:border-accent/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-4 w-4" />
              </span>
              <h3 className="font-display mt-5 text-xl font-semibold text-fg">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.desc}</p>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
