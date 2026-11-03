import { HeroSection } from "@/components/sections/hero";
import { LogoMarqueeSection } from "@/components/sections/logo-marquee";
import { ProblemSolutionSection } from "@/components/sections/problem-solution";
import { ServicesBentoSection } from "@/components/sections/services-bento";
import { IndustriesPreviewSection } from "@/components/sections/industries-preview";
import { FeaturedCaseStudiesSection } from "@/components/sections/featured-case-studies";
import { HowWeWorkSection } from "@/components/sections/how-we-work";
import { WhyUsSection } from "@/components/sections/why-us";
import { PricingPreviewSection } from "@/components/sections/pricing-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FounderSection } from "@/components/sections/founder-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTABannerSection } from "@/components/sections/cta-banner";

// Organization / WebSite / founder structured data lives in the root layout.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarqueeSection />
      <ProblemSolutionSection />
      <ServicesBentoSection />
      <IndustriesPreviewSection />
      <FeaturedCaseStudiesSection />
      <HowWeWorkSection />
      <WhyUsSection />
      <PricingPreviewSection />
      <TestimonialsSection />
      <FounderSection />
      <FAQSection />
      <CTABannerSection />
    </>
  );
}
