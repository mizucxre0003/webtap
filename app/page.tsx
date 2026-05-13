import { AudienceSection } from "@/components/landing/AudienceSection";
import { BusinessStructureSection } from "@/components/landing/BusinessStructureSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { TapFlowSection } from "@/components/landing/TapFlowSection";
import { ownerWhatsappUrl } from "@/lib/whatsapp";

export default function Home() {
  return (
    <main className="pb-20 sm:pb-0">
      <HeroSection />
      <AudienceSection />
      <ProblemSection />
      <TapFlowSection />
      <BusinessStructureSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <LeadFormSection whatsappHref={ownerWhatsappUrl("Здравствуйте! Пишу с сайта WebTap.kz")} />
      <FAQSection />
      <Footer />
    </main>
  );
}
