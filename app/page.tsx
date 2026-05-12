import { AudienceSection } from "@/components/landing/AudienceSection";
import { BusinessStructureSection } from "@/components/landing/BusinessStructureSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { InstagramVsWebsiteSection } from "@/components/landing/InstagramVsWebsiteSection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { NextGenShowcaseSection } from "@/components/landing/NextGenShowcaseSection";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { SkillsSection } from "@/components/landing/SkillsSection";
import { TapFlowSection } from "@/components/landing/TapFlowSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TapFlowSection />
      <AudienceSection />
      <ProblemSection />
      <FeaturesSection />
      <SkillsSection />
      <NextGenShowcaseSection />
      <BusinessStructureSection />
      <InstagramVsWebsiteSection />
      <PortfolioSection />
      <PricingSection />
      <ProcessSection />
      <LeadFormSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
