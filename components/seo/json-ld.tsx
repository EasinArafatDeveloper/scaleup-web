import { toJsonLd } from "@/lib/seo";

/** Structured data for search engines and AI assistants. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(data) }} />;
}
