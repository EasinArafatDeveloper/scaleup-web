"use server";

import { headers } from "next/headers";
import { z } from "zod";

/**
 * Contact + free-audit forms → ScaleUp Admin (admin.scaleupweb.xyz) as a new lead.
 * Sent server-to-server over the Docker network (ADMIN_INBOUND_URL) with a shared secret,
 * so the secret never reaches the browser.
 */
export type SubmitResult = { ok: true } | { ok: false; error: string };

const text = (max: number) => z.string().trim().max(max).optional().default("");

const leadSchema = z.object({
  form: z.enum(["contact", "audit"]),
  name: z.string().trim().min(1, "Please enter your name").max(120),
  phone: z.string().trim().min(6, "Please enter your phone / WhatsApp").max(40),
  email: text(160),
  business: text(160),
  website: text(300),
  facebook: text(300),
  service: text(120),
  details: z.record(z.string(), z.string().max(4000)).optional().default({}),
  /** Honeypot: humans never see this field; bots fill it. */
  company: text(200)
});

// Max 5 submissions per IP per 10 minutes (in-memory, resets on restart).
const hits = new Map<string, { n: number; until: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now > h.until) {
    hits.set(ip, { n: 1, until: now + 10 * 60 * 1000 });
    return false;
  }
  h.n++;
  return h.n > 5;
}

export async function submitLead(input: z.input<typeof leadSchema>): Promise<SubmitResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const { company, ...lead } = parsed.data;
  if (company) return { ok: true }; // bot — pretend it worked

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) return { ok: false, error: "Too many submissions. Please message us on WhatsApp instead." };

  const url = process.env.ADMIN_INBOUND_URL;
  const secret = process.env.INBOUND_SECRET;
  if (!url || !secret) {
    console.error("[submit-lead] ADMIN_INBOUND_URL / INBOUND_SECRET not set");
    return { ok: false, error: "We couldn't send your message right now. Please message us on WhatsApp." };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-inbound-secret": secret },
      body: JSON.stringify(lead),
      cache: "no-store",
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) throw new Error(`admin responded ${res.status}`);
    return { ok: true };
  } catch (e) {
    console.error("[submit-lead] failed:", e);
    return { ok: false, error: "We couldn't send your message right now. Please message us on WhatsApp." };
  }
}
