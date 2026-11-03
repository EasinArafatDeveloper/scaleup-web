import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  serviceCategories,
  getCategoryBySlug,
  formatStartingPrice,
  lowestStartingPriceBDT
} from "@/data/services";
import { PageHero } from "@/components/page/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CTABannerSection } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return serviceCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return pageMetadata({
    title: `${category.title} Services in Bangladesh`,
    description: category.shortDesc,
    path: `/services/${category.slug}`
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const catIndex = serviceCategories.findIndex((c) => c.slug === category.slug);
  const minPrice = lowestStartingPriceBDT(category.services);
  const words = category.title.split(" ");
  const accent = words.pop();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: category.title }]}
        label={`Discipline 0${catIndex + 1}`}
        meta={`${category.services.length} services${minPrice ? ` · from ৳${minPrice.toLocaleString()}` : ""}`}
        title={words.length ? [words.join(" ")] : []}
        accent={accent}
        intro={category.shortDesc}
      >
        <Button href="/free-audit" variant="primary" size="lg">
          Get a free audit <ArrowUpRight className="h-4 w-4" />
        </Button>
      </PageHero>

      {/* Service cards — big alternating panels */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-7xl space-y-4 px-5 sm:px-8">
          {category.services.map((s, i) => (
            <Reveal key={s.slug}>
              <article className="group grid grid-cols-1 gap-10 rounded-[2rem] border border-line bg-surface p-8 transition-colors duration-500 hover:border-line-strong sm:p-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                    {String(catIndex + 1).padStart(2, "0")}.{i + 1}
                  </div>
                  <h2 className="font-display mt-4 text-3xl font-semibold leading-[1.05] text-fg sm:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">{s.shortPitch}</p>

                  <div className="mt-10 flex flex-wrap items-end gap-10">
                    <div>
                      <div className="font-display text-4xl font-semibold tracking-[-0.04em] text-fg">
                        {formatStartingPrice(s.startingPriceBDT)}
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                        {s.startingPriceUSD > 0 ? `Starting · $${s.startingPriceUSD}` : "Priced per project"}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-4xl font-semibold tracking-[-0.04em] text-fg">{s.timeline}</div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">Timeline</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:col-span-6 lg:border-l lg:border-line lg:pl-10">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">What you get</div>
                  <ul className="mt-4 flex-1">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-4 border-b border-line py-3 text-sm text-fg">
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${category.slug}/${s.slug}`}
                    className="mt-8 inline-flex items-center justify-between rounded-full border border-line-strong py-2 pl-5 pr-2 text-sm text-fg transition-colors hover:border-accent"
                  >
                    Packages, process &amp; FAQ
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Other disciplines */}
      <section className="border-t border-line bg-ink-alt py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-2">Other disciplines</div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/services/${c.slug}`}
                  className="group flex items-center justify-between border-b border-line py-5 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span className="font-display text-xl font-semibold text-muted transition-colors group-hover:text-fg">
                    {c.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-2 transition-all group-hover:rotate-45 group-hover:text-accent" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABannerSection index="03" eyebrow={`Start with ${category.title}`} />
    </>
  );
}
