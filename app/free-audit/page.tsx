"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/data/site";
import { industriesData } from "@/data/industries";
import { PageHero } from "@/components/page/page-hero";
import { Field, ChoicePills, controlClass } from "@/components/ui/field";
import { submitLead } from "@/app/actions/submit-lead";

const problems = [
  { value: "automate-replies", label: "Slow Messenger replies" },
  { value: "fake-orders", label: "Fake COD / courier returns" },
  { value: "no-website", label: "Need a fast website" },
  { value: "ad-tracking", label: "Ads not tracking / low ROAS" },
  { value: "custom-software", label: "Need custom CRM / inventory" }
];

const spends = [
  { value: "none", label: "No ads yet" },
  { value: "under-25k", label: "< ৳25k / mo" },
  { value: "25k-50k", label: "৳25k – 50k" },
  { value: "50k-150k", label: "৳50k – 1.5L" },
  { value: "150k-plus", label: "৳1.5L+" }
];

const youGet = [
  "Speed & mobile check of your site or store",
  "Messenger / WhatsApp response-time review",
  "Meta Pixel & CAPI tracking health check",
  "Checkout and courier flow walkthrough",
  "A private Loom video with your top 3 fixes"
];

export default function FreeAuditPage() {
  const [form, setForm] = React.useState({
    name: "",
    businessName: "",
    facebookUrl: "",
    websiteUrl: "",
    whatsapp: "",
    industry: industriesData[0]?.slug ?? "",
    mainProblem: "automate-replies",
    monthlyAdSpend: "50k-150k"
  });
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const honeypot = React.useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const bdPhoneRegex = /^(?:\+?88|0088)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(form.whatsapp.replace(/[\s-]/g, ""))) {
      setError("Please enter a valid Bangladeshi mobile / WhatsApp number (e.g. 017XXXXXXXX or +8801XXXXXXXXX).");
      return;
    }
    if (!form.name || !form.businessName || !form.facebookUrl) {
      setError("Please fill in your name, business name and Facebook page URL.");
      return;
    }

    setIsSubmitting(true);
    try {
      const label = (list: { value: string; label: string }[], v: string) => list.find((o) => o.value === v)?.label ?? v;
      const res = await submitLead({
        form: "audit",
        name: form.name,
        phone: form.whatsapp,
        business: form.businessName,
        website: form.websiteUrl,
        facebook: form.facebookUrl,
        details: {
          industry: industriesData.find((i) => i.slug === form.industry)?.name ?? form.industry,
          mainProblem: label(problems, form.mainProblem),
          monthlyAdSpend: label(spends, form.monthlyAdSpend)
        },
        company: honeypot.current?.value ?? ""
      });
      if (res.ok) setSubmitted(true);
      else setError(res.error);
    } catch {
      setError("Submission failed. Please message us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        label="Free audit"
        meta="100% free · 24h turnaround"
        title={["Find where your", "sales"]}
        accent="leak."
        intro="We personally inspect your page, website speed and checkout, then send a private video showing exactly where sales are slipping — and how to fix it."
      />

      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
          {/* What you get */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                <span className="text-accent">(✓)</span> — What you get
              </div>
              <ul className="mt-6 border-t border-line">
                {youGet.map((y, i) => (
                  <li key={y} className="flex gap-5 border-b border-line py-5">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] text-fg">{y}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                No sales call required. If we can&apos;t help, we&apos;ll say so — and you keep the video.
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -10 }} className="space-y-12" noValidate>
                  {/* Honeypot — hidden from people, bots fill it in */}
                  <input ref={honeypot} name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <Field index="01" label="Your name *">
                      <input value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Tanvir Hasan" className={controlClass} />
                    </Field>
                    <Field index="02" label="Business / brand *">
                      <input value={form.businessName} onChange={(e) => set("businessName")(e.target.value)} placeholder="Luxe Wear BD" className={controlClass} />
                    </Field>
                    <Field index="03" label="WhatsApp number *" hint="Your private video link goes here.">
                      <input value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="017XXXXXXXX" inputMode="tel" className={controlClass} />
                    </Field>
                    <Field index="04" label="Facebook page URL *">
                      <input value={form.facebookUrl} onChange={(e) => set("facebookUrl")(e.target.value)} placeholder="facebook.com/yourbrand" className={controlClass} />
                    </Field>
                  </div>

                  <Field index="05" label="Website (if you have one)">
                    <input value={form.websiteUrl} onChange={(e) => set("websiteUrl")(e.target.value)} placeholder="https://yourbrand.com" className={controlClass} />
                  </Field>

                  <Field index="06" label="Industry">
                    <select value={form.industry} onChange={(e) => set("industry")(e.target.value)} className={`${controlClass} cursor-pointer`}>
                      {industriesData.map((ind) => (
                        <option key={ind.slug} value={ind.slug} className="bg-surface text-fg">
                          {ind.name}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      <span className="text-accent">07</span> Biggest bottleneck
                    </span>
                    <ChoicePills name="Main bottleneck" value={form.mainProblem} onChange={set("mainProblem")} options={problems} />
                  </div>

                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      <span className="text-accent">08</span> Monthly ad spend
                    </span>
                    <ChoicePills name="Monthly ad spend" value={form.monthlyAdSpend} onChange={set("monthlyAdSpend")} options={spends} />
                  </div>

                  {error && (
                    <p role="alert" className="border-l-2 border-accent pl-4 text-sm text-fg">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-2">We never share your details or spam your WhatsApp.</p>
                    <Button type="submit" disabled={isSubmitting} variant="primary" size="lg">
                      {isSubmitting ? "Submitting…" : "Request my free audit"} <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[2rem] border border-line bg-surface p-10 sm:p-14"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-6 w-6" />
                  </span>
                  <h2 className="font-display mt-8 text-4xl font-semibold text-fg sm:text-5xl">
                    Audit <span className="serif-accent text-accent">requested.</span>
                  </h2>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                    Thanks {form.name}! We&apos;ll review <span className="text-fg">{form.businessName}</span> and send your
                    video breakdown to <span className="text-fg">{form.whatsapp}</span> within 24 hours.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button
                      href={getWhatsAppUrl(`Hi ScaleUp Web! I just submitted a Free Audit request for ${form.businessName}.`)}
                      isExternal
                      variant="primary"
                      size="lg"
                    >
                      <MessageCircle className="h-4 w-4" /> Message us now
                    </Button>
                    <Button href="/" variant="secondary" size="lg">
                      Back to home
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
