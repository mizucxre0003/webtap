import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { IndustriesSection } from "@/components/landing/IndustriesSection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { PositioningSection } from "@/components/landing/PositioningSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { SelectedWorkSection } from "@/components/landing/SelectedWorkSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WhyWebTapSection } from "@/components/landing/WhyWebTapSection";
import { ownerWhatsappRedirectUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export default function Home() {
  const whatsappHref = ownerWhatsappRedirectUrl();

  return (
    <main className="bg-[#0a0a0a] text-white">
      <HeroSection whatsappHref={whatsappHref} />
      <SelectedWorkSection />
      <PositioningSection />
      <ServicesSection />
      <WhyWebTapSection />
      <ProcessSection />
      <IndustriesSection />
      <PricingSection />
      <LeadFormSection whatsappHref={whatsappHref} />
      <Footer />
    </main>
  );
}
