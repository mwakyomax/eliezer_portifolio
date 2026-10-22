import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { SEO } from '../components/SEO';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PopularCategory } from '../components/PopularCategory';
import { SpecialOffers } from '../components/SpecialOffers';
import { FeaturedItems } from '../components/FeaturedItems';
import { TechnicalStack } from '../components/TechnicalStack';
import { BlogSection } from '../components/BlogSection';
import { Footer } from '../components/Footer';

import { Toast } from '../components/Toast';

// Code-split heavy interactive modals & drawers for optimal initial page load performance
const CartDrawer = React.lazy(() => import('../components/CartDrawer').then(m => ({ default: m.CartDrawer })));
const ProductQuickViewModal = React.lazy(() => import('../components/ProductQuickViewModal').then(m => ({ default: m.ProductQuickViewModal })));
const SearchModal = React.lazy(() => import('../components/SearchModal').then(m => ({ default: m.SearchModal })));
const BlogModal = React.lazy(() => import('../components/BlogModal').then(m => ({ default: m.BlogModal })));
const SpecialOffersModal = React.lazy(() => import('../components/SpecialOffersModal').then(m => ({ default: m.SpecialOffersModal })));
const ContactModal = React.lazy(() => import('../components/ContactModal').then(m => ({ default: m.ContactModal })));

export const Home: React.FC = () => {
  const { settings, reloadPortfolioData } = usePortfolio();
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    reloadPortfolioData();
  }, []);

  const seoTitle = settings?.fullName && settings?.title
    ? `${settings.fullName} - ${settings.title}`
    : 'Elieza Mwakyoma - Software Developer & Networker';

  const seoDescription = settings?.bio || 'Professional developer & networking portfolio for Elieza Mwakyoma, featuring full-stack web, mobile Android, networking systems, and database engineering.';

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-[#1E1E24] flex flex-col justify-between selection:bg-[#761A30] selection:text-white">
      <SEO title={seoTitle} description={seoDescription} canonicalPath="/" />
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

      {/* Clean Interactive Drawers & Modals (Lazy Loaded) */}
      <React.Suspense fallback={null}>
        <CartDrawer />
        <ProductQuickViewModal />
        <SearchModal />
        <BlogModal />
        <SpecialOffersModal />
        <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </React.Suspense>
      <Toast />
    </div>
  );
};
