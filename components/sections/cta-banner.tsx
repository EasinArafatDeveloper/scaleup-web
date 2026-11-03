"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, MapPin, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitReveal } from "@/components/motion/split-reveal";
import { StaggerContainer } from "@/components/motion/reveal";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/** Live Dhaka clock + whether we're inside office hours (10:00–22:00). */
function useDhakaStatus() {
  const [now, setNow] = React.useState<{ time: string; open: boolean } | null>(null);
  React.useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => {
      const time = fmt.format(new Date());
      const h = Number(time.slice(0, 2));
      setNow({ time, open: h >= 10 && h < 22 });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Big round "free audit" button. */
function RoundButton() {
  return (
    <Magnetic strength={0.35} className="shrink-0 self-start lg:self-end">
      <Link href="/free-audit" className="group relative flex items-center justify-center">
        <span className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-ink shadow-[0_20px_60px_-15px_var(--accent)] sm:h-48 sm:w-48">
          <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-700 ease-out-expo group-hover:translate-y-0" />
          <span className="relative flex flex-col items-center gap-1 text-center font-display text-lg font-semibold transition-colors duration-500 group-hover:text-ink">
            <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" />
            Get a free
            <br />
            audit
          </span>
        </span>
      </Link>
    </Magnetic>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };
  return (
    <button
      onClick={copy}
      aria-label={`Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
        copied ? "border-success/40 bg-success/10 text-success" : "border-line-strong text-muted hover:border-fg hover:text-fg"
      )}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const card =
  "group relative flex flex-col justify-between gap-6 rounded-[1.5rem] border border-line bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-line-strong";

/** Closing statement: giant type, a round CTA, and three ways to reach us. */
export function CTABannerSection({
  line1 = "Let’s build",
  line2 = "your",
  accent = "engine."
}: {
  /** No longer displayed; kept so existing pages compile. */
  index?: string;
  eyebrow?: string;
  line1?: string;
  line2?: string;
  accent?: string;
} = {}) {
  const status = useDhakaStatus();

  return (
    <section className="relative isolate overflow-hidden border-t border-line py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-hairline-grid absolute inset-0" />
        <div className="hero-aurora hero-aurora-a" />
        <div className="hero-aurora hero-aurora-b" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <SplitReveal
            as="h2"
            className="font-display text-[clamp(3.5rem,12vw,11.5rem)] font-semibold leading-[0.88] text-fg"
            lines={[
              <span key="l1">{line1}</span>,
              <span key="l2">
                {line2} <span className="serif-accent text-accent">{accent}</span>
              </span>
            ]}
          />
          <RoundButton />
        </div>

        <StaggerContainer className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* WhatsApp */}
          <a
            href={getWhatsAppUrl("Hi ScaleUp Web! I would like to book a call or discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className={card}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">WhatsApp · fastest</div>
              <div className="font-display mt-1 text-xl font-semibold text-fg">{siteConfig.whatsappDisplay}</div>
            </div>
          </a>

          {/* Email */}
          <a href={`mailto:${siteConfig.contactEmail}`} className={card}>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 font-display text-lg font-semibold text-accent">
                @
              </span>
              <CopyButton value={siteConfig.contactEmail} />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">Email</div>
              <div className="font-display mt-1 break-all text-xl font-semibold text-fg">{siteConfig.contactEmail}</div>
            </div>
          </a>

          {/* Studio + live status */}
          <div className={card}>
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-fg">
                <MapPin className="h-5 w-5" />
              </span>
              {status && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                    status.open ? "bg-success/10 text-success" : "bg-surface-2 text-muted"
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", status.open ? "animate-pulse bg-success" : "bg-muted-2")} />
                  {status.open ? "Online now" : "Back at 10am"}
                </span>
              )}
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                Studio · Dhaka {status ? status.time : "--:--"}
              </div>
              <div className="font-display mt-1 text-xl font-semibold text-fg">
                {siteConfig.address.street}
              </div>
            </div>
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
