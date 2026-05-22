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
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { TapFlowSection } from "@/components/landing/TapFlowSection";
import { ownerWhatsappRedirectUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function Home() {
  const whatsappHref = ownerWhatsappRedirectUrl();

  return (
    <main className="pb-20 sm:pb-0">
      <HeroSection whatsappHref={whatsappHref} />
      <AudienceSection />
      <ProblemSection />
      <TapFlowSection />
      <BusinessStructureSection />
      <ReviewsSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <LeadFormSection whatsappHref={whatsappHref} />
      <FAQSection />
      <Footer />
    </main>
  );
}
