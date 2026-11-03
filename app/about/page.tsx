import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { statsData } from "@/data/stats";
import { techStackList } from "@/data/clients";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { FounderSection } from "@/components/sections/founder-section";
import { PartnerSection } from "@/components/sections/partner-section";
import { TeamSection } from "@/components/sections/team-section";
import { CTABannerSection } from "@/components/sections/cta-banner";

export const metadata = pageMetadata({
  title: "About Us — Web Development Studio in Dhaka",
  description:
    "Meet ScaleUp Web, the Dhaka studio founded by Easin Arafat: our team, our tech partnership with Next Leaders, and how we build websites, SaaS and AI automation for growing businesses.",
  path: "/about"
});

const principles = [
  {
    title: "Honesty over hype",
    body: "If a simple landing page will beat a costly custom app for your goal, we'll tell you — even if it means a smaller invoice."
  },
  {
    title: "You own everything",
    body: "Code, repositories, hosting, domains and ad accounts are yours. No proprietary lock-in, no holding assets hostage."
  },
  {
    title: "Talk to the builders",
    body: "No account managers in the middle. You work directly with the engineers designing and coding your system."
  }
];

export default function AboutPage() {
  const stats = statsData.filter((s) => s.value > 0);

  return (
    <>
      <PageHero
        label="The studio"
        meta={`${siteConfig.address.city}, ${siteConfig.address.country} · Est. 2023`}
        title={["Small studio.", "Serious"]}
        accent="engineering."
        intro="ScaleUp Web is an engineering-first studio in Dhaka. We bring modern web tech, AI, SEO and honest tracking together so growing businesses can sell more with less manual work."
      />

      {/* Stats band */}
      <section className="border-y border-line bg-ink-alt">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:grid-cols-3 sm:px-8">
          {stats.map((s, i) => (
            <div
              key={s.id}
              className={`py-10 sm:py-12 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-6" : "sm:pr-6"}`}
            >
              <div className="font-display text-6xl font-semibold tracking-[-0.06em] text-fg">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm text-fg">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <TeamSection />

      <FounderSection showPartner={false} />

      <PartnerSection />

      {/* Principles */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead index="02" label="Principles" title="How we" accent="work." size="lg" />
          <div className="mt-16 grid grid-cols-1 border-t border-line md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className={`py-10 md:px-8 ${i === 0 ? "md:pl-0" : "border-t border-line md:border-l md:border-t-0"}`}
              >
                <div className="font-display text-[5rem] font-semibold leading-none tracking-[-0.06em] text-accent">
                  {i + 1}
                </div>
                <h3 className="font-display mt-6 text-2xl font-semibold text-fg">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Toolbox */}
      <section className="border-t border-line bg-ink-alt py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            index="03"
            label="Toolbox"
            title="Tools we"
            accent="trust."
            intro="A deliberately small, modern stack we know inside out — so your project ships faster and stays maintainable."
          />
          <div className="mt-14 flex flex-wrap gap-3">
            {techStackList.map((t) => (
              <span
                key={t.name}
                className="font-display rounded-full border border-line-strong px-6 py-3 text-xl font-semibold text-fg transition-colors hover:border-accent hover:text-accent sm:text-2xl"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Legal identity */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">Registered business</div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: "Trade license", value: siteConfig.tradeLicense },
              { label: "Jurisdiction", value: "Dhaka South City Corporation (DSCC)" },
              {
                label: "Head office",
                value: `${siteConfig.address.street}, ${siteConfig.address.area}, ${siteConfig.address.city}`
              }
            ].map((f) => (
              <div key={f.label} className="border-t border-line pt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">{f.label}</div>
                <div className="mt-2 text-sm text-fg">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABannerSection index="04" eyebrow="Want to work with us?" line1="Say hello" line2="to the" accent="team." />
    </>
  );
}
