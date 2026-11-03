import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Handshake, Mail, MapPin, MessageCircle } from "lucide-react";
import { founderData } from "@/data/team";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { projectsData } from "@/data/projects";
import { nextLeaders } from "@/data/partners";
import { techStackList } from "@/data/clients";
import { FOUNDER_PATH, breadcrumbs, founderPerson, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal, StaggerContainer } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/work/browser-frame";
import { CTABannerSection } from "@/components/sections/cta-banner";

const name = founderData.name;

export const metadata = pageMetadata({
  title: `${name} — Founder of ScaleUp Web | Web Developer in Dhaka`,
  absoluteTitle: true,
  description: `${name} is a web developer in Dhaka, Bangladesh, and the founder of ScaleUp Web. He builds SaaS products, e-commerce stores and websites end to end — design, full-stack development, SEO and launch.`,
  path: FOUNDER_PATH,
  type: "profile",
  image: { url: founderData.photo, width: 1600, height: 1600, alt: `${name}, founder of ScaleUp Web` }
});

const skills = [
  "Full-stack web development",
  "SaaS products",
  "E-commerce stores",
  "AI automation",
  "SEO",
  "GEO (AI search)",
  "Pixel + CAPI tracking",
  "Deployment & hosting"
];

/** Plain, factual Q&A — the format AI assistants quote when asked about a person. */
const faqs = [
  {
    q: `Who is ${name}?`,
    a: `${name} is a web developer based in Dhaka, Bangladesh. He is the founder of ScaleUp Web, a studio that builds websites, SaaS products, e-commerce stores and AI automation.`
  },
  {
    q: `What has ${name} built?`,
    a: `Projects include ${projectsData.map((p) => `${p.name} (${p.domain})`).join(", ")}. Each was built end to end — design, full-stack development, SEO and launch.`
  },
  {
    q: `Is ${name} working with ${nextLeaders.company}?`,
    a: `Yes. Through ScaleUp Web, ${name} is the tech partner of ${nextLeaders.company}, working with ${nextLeaders.person}.`
  },
  {
    q: `How can I contact ${name}?`,
    a: `On LinkedIn (${founderData.linkedin}), by email at ${siteConfig.contactEmail}, or on WhatsApp at ${siteConfig.whatsappDisplay}.`
  }
];

export default function FounderPage() {
  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteConfig.url}${FOUNDER_PATH}`,
    name: `${name} — Founder of ScaleUp Web`,
    mainEntity: founderPerson()
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };

  return (
    <>
      <JsonLd data={profileLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbs([["About", "/about"], [name, FOUNDER_PATH]])} />

      {/* Intro */}
      <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div aria-hidden className="bg-hairline-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] border border-line bg-surface lg:mx-0">
              <Image
                src={founderData.photo}
                alt={`${name}, founder of ScaleUp Web`}
                fill
                priority
                sizes="(min-width: 1024px) 400px, 90vw"
                className="object-cover object-[55%_30%]"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/about" className="hover:text-fg">
                About
              </Link>{" "}
              / <span className="text-fg">{name}</span>
            </nav>
            <h1 className="font-display mt-6 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.92] text-fg">
              {name}
            </h1>
            <p className="mt-5 text-xl text-fg sm:text-2xl">
              Founder of <span className="serif-accent text-accent">ScaleUp Web</span> · Web developer
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
              {name} is a web developer in {siteConfig.address.city}, {siteConfig.address.country}. He founded ScaleUp Web
              to build fast websites, SaaS products and online stores for growing businesses — handling everything from
              design and full-stack development to SEO, tracking and launch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={founderData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-fg py-1.5 pl-5 pr-1.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Connect on LinkedIn
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fg transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href={getWhatsAppUrl(`Hi ${name.split(" ")[0]}! I'd like to talk about a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-accent"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-accent"
              >
                <Mail className="h-4 w-4 text-accent" /> Email
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {siteConfig.address.city}, {siteConfig.address.country}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Handshake className="h-4 w-4" /> Tech partner of {nextLeaders.company}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-semibold leading-[0.95] text-fg sm:text-6xl">
              Projects <span className="serif-accent text-accent">built.</span>
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted">
              Live products {name.split(" ")[0]} has designed, developed, optimised for search and launched.
            </p>
          </div>

          <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-[1.5rem] border border-line bg-surface p-3 transition-colors hover:border-accent/50"
              >
                <BrowserFrame project={p} className="shadow-none" />
                <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-fg">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted">{p.category}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-accent" />
                </div>
              </a>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Partnership */}
      <section className="border-t border-line bg-ink-alt py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-semibold leading-[0.95] text-fg sm:text-5xl">
              Working with <span className="serif-accent text-accent">{nextLeaders.company}.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">{nextLeaders.summary}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm text-fg hover:text-accent">
              See photos from the partnership <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] max-w-xs overflow-hidden rounded-[1.5rem] border border-line lg:ml-auto">
              <Image
                src={nextLeaders.photos[0].src}
                alt={nextLeaders.photos[0].alt}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-semibold leading-[0.95] text-fg sm:text-5xl">
            What he <span className="serif-accent text-accent">works on.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((s) => (
              <span key={s} className="font-display rounded-full border border-line-strong px-5 py-2.5 text-lg font-semibold text-fg">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {techStackList.map((t) => (
              <span key={t.name} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-4xl font-semibold leading-[0.95] text-fg sm:text-5xl">
            About <span className="serif-accent text-accent">{name.split(" ")[0]}.</span>
          </h2>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-display text-xl font-semibold text-fg">{f.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTABannerSection line1="Let’s build" line2="something" accent="together." />
    </>
  );
}
