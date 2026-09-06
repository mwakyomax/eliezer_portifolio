import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PopularCategory } from '../components/PopularCategory';
import { SpecialOffers } from '../components/SpecialOffers';
import { FeaturedItems } from '../components/FeaturedItems';
import { TechnicalStack } from '../components/TechnicalStack';
import { BlogSection } from '../components/BlogSection';
import { Footer } from '../components/Footer';

import { CartDrawer } from '../components/CartDrawer';
import { ProductQuickViewModal } from '../components/ProductQuickViewModal';
import { SearchModal } from '../components/SearchModal';
import { BlogModal } from '../components/BlogModal';
import { SpecialOffersModal } from '../components/SpecialOffersModal';
import { ContactModal } from '../components/ContactModal';
import { Toast } from '../components/Toast';
import { LiquidNavCustomizer } from '../components/LiquidNavCustomizer';
import { MobileLiquidDock } from '../components/MobileLiquidDock';

export const Home: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#1E1E24] flex flex-col justify-between selection:bg-[#761A30] selection:text-white pb-16 md:pb-0">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Main Content Layout matching exact UI/UX */}
      <main className="flex-1">
        {/* 1. Hero Section with Arched Developer Visual & Floating Badges */}
        <Hero />

        {/* 2. Core Technical Domains Grid (6 Categories matching mockup) */}
        <PopularCategory />

        {/* 3. Featured Milestone Banner (Special Highlight for Mwakyoma Market & Smart Queue) */}
        <SpecialOffers />

        {/* 4. Featured Projects Catalog (8-Grid Project Cards) */}
        <FeaturedItems />

        {/* 5. Technical Stack, Experience & Certifications Matrix */}
        <TechnicalStack />

        {/* 6. Our Tech Journal (3 Engineering Article Cards) */}
        <BlogSection />
      </main>

      {/* 7. Dark Burgundy Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <ProductQuickViewModal />
      <SearchModal />
      <BlogModal />
      <SpecialOffersModal />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Toast />

      {/* Customized Liquid Navigation Components */}
      <LiquidNavCustomizer />
      <MobileLiquidDock />
    </div>
  );
};
