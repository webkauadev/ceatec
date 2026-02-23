import { useEffect } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { PricingTiers } from '@/components/landing/PricingTiers';
import { SocialProof } from '@/components/landing/SocialProof';
import { Trust } from '@/components/landing/Trust';
import { Equipment } from '@/components/landing/Equipment';
import { MappingShowcase } from '@/components/landing/MappingShowcase';
import { Instructors } from '@/components/landing/Instructors';
import { Guarantee } from '@/components/landing/Guarantee';
import { LimitedSpots } from '@/components/landing/LimitedSpots';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { trackViewContent } from '@/lib/tracking';

const Index = () => {
  useEffect(() => {
    trackViewContent({
      content_ids: ['essencial', 'profissional', 'expert'],
      content_name: 'CEATEC Drones Agrícolas Landing Page',
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PricingTiers />
        <SocialProof />
        <Trust />
        <Equipment />
        <MappingShowcase />
        <Instructors />
        <Guarantee />
        <LimitedSpots />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
