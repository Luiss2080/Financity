import { useState } from 'react';
import InstallModal from '../components/InstallModal';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ChallengesCarousel from '../components/landing/ChallengesCarousel';
import FAQSection from '../components/landing/FAQSection';

export default function LandingPage() {
  const [isInstallOpen, setInstallOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

      <HeroSection onOpenInstall={() => setInstallOpen(true)} />
      <FeaturesSection />
      <ChallengesCarousel />
      <FAQSection />

      {/* Modal */}
      {isInstallOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </div>
  );
}
