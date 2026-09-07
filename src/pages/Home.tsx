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

export const Home: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#1E1E24] flex flex-col justify-between selection:bg-[#761A30] selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Main Content Layout */}
      <main className="flex-1">
        {/* 1. Hero Section with Professional Developer Focus */}
        <Hero />

        {/* 2. Core Technical Domains Grid */}
        <PopularCategory />

        {/* 3. Featured Milestone Banner */}
        <SpecialOffers />

        {/* 4. Featured Projects Catalog */}
        <FeaturedItems />

        {/* 5. Technical Stack, Experience & Credentials Matrix */}
        <TechnicalStack />

        {/* 6. Technical Journal & Publications */}
        <BlogSection />
      </main>

      {/* 7. Executive Burgundy Footer */}
      <Footer />

      {/* Clean Interactive Drawers & Modals */}
      <CartDrawer />
      <ProductQuickViewModal />
      <SearchModal />
      <BlogModal />
      <SpecialOffersModal />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <Toast />
    </div>
  );
};
