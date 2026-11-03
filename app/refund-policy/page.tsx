import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/page/legal-page";

export const metadata = pageMetadata({
  title: "Refund Policy",
  description: "ScaleUp Web's transparent refund and project cancellation terms.",
  path: "/refund-policy"
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund"
      accent="policy."
      updated="Last updated · October 2026"
      intro={
        <p>
          We operate with complete transparency. Because engineering and automation work requires dedicated time and
          technical allocation, our refund guidelines are defined below.
        </p>
      }
      sections={[
        {
          title: "Cancellation before kickoff",
          body: (
            <p>
              If you cancel a project within 48 hours of initial advance payment and before discovery wireframes or sprint
              development have commenced, we will refund your deposit minus a 10% administrative and payment processing fee.
            </p>
          )
        },
        {
          title: "Work in progress",
          body: (
            <p>
              Once UI/UX design or code implementation has commenced, deposit payments are non-refundable as they directly
              compensate for developer hours worked. If a project is discontinued mid-way, you will receive all completed
              source files and assets corresponding to the work completed to date.
            </p>
          )
        },
        {
          title: "Monthly retainer services",
          body: (
            <p>
              Monthly management retainers (SEO / GEO retainers, server maintenance, AI chatbot hosting) may be
              canceled at any time with a 15-day notice before the next billing cycle. No partial refunds are issued for
              mid-month cancellations.
            </p>
          )
        },
        {
          title: "Third-party costs",
          body: (
            <p>
              Payments made directly to third-party vendors (such as Meta ad spend, domain registries, hosting servers, or
              OpenAI API credits) are subject to the respective provider&apos;s refund terms and are strictly
              non-refundable by ScaleUp Web.
            </p>
          )
        }
      ]}
    />
  );
}
