import { siteConfig } from "@/data/site";
import { founderData } from "@/data/team";
import { serviceCategories, formatStartingPrice } from "@/data/services";
import { projectsData } from "@/data/projects";
import { nextLeaders } from "@/data/partners";
import { homeFAQList } from "@/data/faq";
import { pricingNotes } from "@/data/pricing";
import { FOUNDER_PATH } from "@/lib/seo";

/**
 * /llms.txt — a plain-Markdown summary of the studio for AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini). Built from the same data as the site,
 * so it never drifts out of date. Spec: https://llmstxt.org
 */
export function GET() {
  const u = siteConfig.url;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} is a web development studio in ${siteConfig.address.city}, ${siteConfig.address.country}, founded by ${founderData.name}. It builds websites, SaaS products, e-commerce stores and AI automation, and offers SEO, GEO (generative engine optimization) and conversion tracking. It is the tech partner of ${nextLeaders.company}, working with ${nextLeaders.person}.`,
    "",
    "## Key facts",
    `- Founder: ${founderData.name} (${founderData.role}) — ${u}${FOUNDER_PATH}`,
    `- Founder LinkedIn: ${founderData.linkedin}`,
    `- Location: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`,
    `- Hours: ${siteConfig.officeHours}`,
    `- Contact: ${siteConfig.contactEmail} · WhatsApp ${siteConfig.whatsappDisplay}`,
    `- Partnership: tech partner of ${nextLeaders.company} (${nextLeaders.person})`,
    `- Payment terms: ${pricingNotes.paymentTerms}`,
    "",
    "## Services"
  ];

  for (const cat of serviceCategories) {
    lines.push(`- [${cat.title}](${u}/services/${cat.slug}): ${cat.shortDesc}`);
    for (const s of cat.services) {
      lines.push(`  - [${s.title}](${u}/services/${cat.slug}/${s.slug}) — ${s.shortPitch} (from ${formatStartingPrice(s.startingPriceBDT)})`);
    }
  }

  lines.push("", "## Live projects built by ScaleUp Web");
  for (const p of projectsData) {
    lines.push(`- [${p.name}](${p.url}) — ${p.category}. ${p.summary}`);
  }

  lines.push("", "## Frequently asked questions");
  for (const f of homeFAQList) {
    lines.push(`### ${f.question}`, f.answer, "");
  }

  lines.push(
    "## Pages",
    `- [Home](${u}/)`,
    `- [Services](${u}/services)`,
    `- [Work / portfolio](${u}/work)`,
    `- [Pricing](${u}/pricing)`,
    `- [About the studio](${u}/about)`,
    `- [${founderData.name}, founder](${u}${FOUNDER_PATH})`,
    `- [Contact](${u}/contact)`,
    `- [Free audit](${u}/free-audit)`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" }
  });
}
