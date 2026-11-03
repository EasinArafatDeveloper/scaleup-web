import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { LegalPage } from "@/components/page/legal-page";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "ScaleUp Web's privacy policy and data protection terms for clients and website visitors.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      accent="policy."
      updated="Last updated · October 2026"
      intro={
        <p>
          ScaleUp Web (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy and
          confidential business information.
        </p>
      }
      sections={[
        {
          title: "Information we collect",
          body: (
            <>
              <p>
                When you request a Free Audit, contact us, or engage our web development and AI automation services, we
                collect information you voluntarily provide:
              </p>
              <ul>
                <li>Contact details: name, phone/WhatsApp number, and email address.</li>
                <li>Business data: Facebook page URL, website address, company industry, and marketing spend.</li>
                <li>
                  Technical credentials: API keys and hosting logins provided strictly for development purposes under a
                  Non-Disclosure Agreement (NDA).
                </li>
              </ul>
            </>
          )
        },
        {
          title: "How we use your data",
          body: (
            <>
              <p>We use your information exclusively to:</p>
              <ul>
                <li>Deliver your requested website audit and project proposal.</li>
                <li>Communicate project sprint updates and support via WhatsApp or email.</li>
                <li>Configure server-side Meta Conversions API (CAPI) and Google Analytics 4 as contracted.</li>
              </ul>
              <p>We never sell, rent, or trade your personal or business data to third-party advertisers.</p>
            </>
          )
        },
        {
          title: "Data security & ownership",
          body: (
            <p>
              All client credentials, database schemas, and codebase repositories are held with strict encryption and
              role-based access. Upon project completion and final payment, full ownership and repository administrative
              privileges are handed over to you.
            </p>
          )
        },
        {
          title: "Contact",
          body: (
            <>
              <p>For questions regarding our privacy practices or to request data deletion, contact us at:</p>
              <p className="text-fg">
                ScaleUp Web, {siteConfig.address.street}, {siteConfig.address.area}, Dhaka, Bangladesh.
                <br />
                Email: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
                <br />
                Phone/WhatsApp: {siteConfig.phone}
              </p>
            </>
          )
        }
      ]}
    />
  );
}
