import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { LegalPage } from "@/components/page/legal-page";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: "Standard terms and commercial agreement conditions for ScaleUp Web development and automation projects.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of"
      accent="service."
      updated="Effective · October 2026"
      intro={
        <p>
          These Terms govern the engagement and delivery of web development, AI automation, SEO and tracking systems provided
          by ScaleUp Web (Trade License: {siteConfig.tradeLicense}).
        </p>
      }
      sections={[
        {
          title: "Scope of work & deliverables",
          body: (
            <p>
              All projects are governed by an agreed written proposal or Scope of Work (SOW). Any features, integrations,
              or pages requested outside the agreed SOW will be scoped separately with transparent pricing.
            </p>
          )
        },
        {
          title: "Payment milestones",
          body: (
            <p>
              Standard projects require a 50% advance deposit to initiate design and development sprints. The remaining
              50% balance is due upon successful staging review, testing, and before production domain DNS handover.
              Monthly retainer services (chatbot maintenance, ad management) are billed in advance on the 1st of each
              calendar month.
            </p>
          )
        },
        {
          title: "Revision policy",
          body: (
            <p>
              Every fixed-price project includes up to two (2) rounds of formal design and functional revisions.
              Revisions must align with the original project scope.
            </p>
          )
        },
        {
          title: "Intellectual property & source code",
          body: (
            <p>
              Upon settlement of all contracted fees, 100% ownership of the custom code, design assets, and database
              configurations transfers to the client. ScaleUp Web retains the right to display non-confidential project
              visuals and metrics in our portfolio and case studies.
            </p>
          )
        },
        {
          title: "Warranty & post-launch support",
          body: (
            <p>
              All custom builds include 1 to 3 months of complimentary warranty support against technical bugs and errors
              present in the original deliverables.
            </p>
          )
        }
      ]}
    />
  );
}
