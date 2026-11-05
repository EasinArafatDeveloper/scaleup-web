"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page/page-hero";
import { Field, ChoicePills, controlClass } from "@/components/ui/field";
import { submitLead } from "@/app/actions/submit-lead";

const services = [
  "Landing Page",
  "Business Website",
  "E-commerce Website",
  "AI Chatbot",
  "WhatsApp Automation",
  "Pixel + CAPI Tracking",
  "SEO / GEO",
  "Custom Software / ERP",
  "Grow Bundle"
] as const;

const budgets = ["৳10,000 – ৳25,000", "৳25,000 – ৳50,000", "৳50,000 – ৳1,00,000", "৳1,00,000+"] as const;

export default function ContactPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "E-commerce Website" as string,
    budget: "৳25,000 – ৳50,000" as string,
    message: ""
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const honeypot = React.useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const res = await submitLead({
      form: "contact",
      name: form.name,
      phone: form.phone,
      email: form.email,
      service: form.service,
      details: { budget: form.budget, message: form.message },
      company: honeypot.current?.value ?? ""
    }).catch(() => ({ ok: false as const, error: "We couldn't send your message right now. Please message us on WhatsApp." }));
    setIsSubmitting(false);
    if (res.ok) setSubmitted(true);
    else setError(res.error);
  };

  const channels = [
    { label: "WhatsApp — fastest", value: siteConfig.whatsappDisplay, href: getWhatsAppUrl(), note: "Usually under 15 min", external: true },
    { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { label: "Email", value: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` }
  ];

  return (
    <>
      <PageHero
        label="Contact"
        meta="Replies within 2 hours · 10am–10pm"
        title={["Let’s"]}
        accent="talk."
        intro="Have a project in mind or just want advice on automation? Pick whatever's easiest — we answer every message ourselves."
      />

      <section className="border-t border-line py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
          {/* Channels */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="border-t border-line">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group block border-b border-line py-7"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
                      {c.label}
                      <ArrowUpRight className="h-4 w-4 transition-all group-hover:rotate-45 group-hover:text-accent" />
                    </div>
                    <div className="font-display mt-3 break-all text-2xl font-semibold text-fg transition-colors group-hover:text-accent sm:text-3xl">
                      {c.value}
                    </div>
                    {c.note && <div className="mt-1 text-xs text-muted">{c.note}</div>}
                  </a>
                ))}
                <div className="border-b border-line py-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">Studio</div>
                  <div className="mt-3 text-lg text-fg">
                    {siteConfig.address.street}, {siteConfig.address.area}
                    <br />
                    {siteConfig.address.city} {siteConfig.address.postalCode}
                  </div>
                  <div className="mt-2 text-xs text-muted">{siteConfig.officeHours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <Field index="01" label="Your name *">
                      <input required value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Mahfuz Rahman" className={controlClass} />
                    </Field>
                    <Field index="02" label="WhatsApp / phone *">
                      <input required type="tel" value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="01XXXXXXXXX" className={controlClass} />
                    </Field>
                  </div>

                  <Field index="03" label="Email (optional)">
                    <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@company.com" className={controlClass} />
                  </Field>

                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      <span className="text-accent">04</span> I&apos;m interested in
                    </span>
                    <ChoicePills
                      name="Service"
                      value={form.service}
                      onChange={set("service")}
                      options={services.map((s) => ({ value: s, label: s }))}
                    />
                  </div>

                  <div>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      <span className="text-accent">05</span> Budget
                    </span>
                    <ChoicePills
                      name="Budget"
                      value={form.budget}
                      onChange={set("budget")}
                      options={budgets.map((b) => ({ value: b, label: b }))}
                    />
                  </div>

                  <Field index="06" label="Tell us about the project *">
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="What do you want to build? Any challenges or reference sites you like?"
                      className={`${controlClass} resize-none`}
                    />
                  </Field>

                  {/* Honeypot — hidden from people, bots fill it in */}
                  <input ref={honeypot} name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                  {error && (
                    <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-fg">
                      {error}{" "}
                      <a href={getWhatsAppUrl(`Hi ScaleUp Web! I'm ${form.name}. ${form.message}`)} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline">
                        Open WhatsApp
                      </a>
                    </p>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-2">We reply with a fixed-scope estimate. No spam, ever.</p>
                    <Button type="submit" disabled={isSubmitting} variant="primary" size="lg">
                      {isSubmitting ? "Sending…" : "Send inquiry"} <ArrowUpRight className="h-4 w-4" />
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
                    Message <span className="serif-accent text-accent">received.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
                    Thanks, {form.name || "friend"}. We&apos;ll reach out on WhatsApp or phone shortly.
                  </p>
                  <Button href="/" variant="secondary" size="md" className="mt-8">
                    Back to home
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
