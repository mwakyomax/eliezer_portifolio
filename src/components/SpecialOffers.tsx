import React from 'react';
import { ArrowRight, Sparkles, Code2, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SpecialOffers: React.FC = () => {
  const { setIsSpecialHighlightOpen } = usePortfolio();

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container matching mockup */}
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-[#631427] via-[#761A30] to-[#450B19] text-white shadow-2xl p-8 sm:p-12 lg:p-16">
          
          {/* Subtle background circular glow */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Typography & Action matching mockup */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              {/* Script tag matching cursive "Special Offers" in mockup */}
              <div className="font-serif italic text-2xl sm:text-3xl text-amber-200 font-normal">
                Featured Milestone
              </div>

              {/* Headline matching "New Arrivals for Clothing" */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Flagship Platforms: Mwakyoma Online Market & Smart Hospital Queue
              </h2>

              <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed font-normal">
                Solving urban supply-chain bottlenecks and clinical triage congestion through robust TypeScript, Node.js, and MongoDB architectures. Built with sub-50ms API response rates and offline-resilient local caching.
              </p>

              {/* Key Highlights list */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90 pt-1">
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-time Triage Algorithms</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MERN Stack Production Deployed</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Offline Android Sync</span>
                </span>
              </div>

              {/* Pill Button matching "View Detail" in mockup */}
              <div className="pt-2">
                <button
                  onClick={() => setIsSpecialHighlightOpen(true)}
                  className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF8F8] text-[#761A30] font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
                >
                  <span>View Case Studies & Live Demos</span>
                  <ArrowRight className="w-4 h-4 text-[#761A30]" />
                </button>
              </div>

            </div>

            {/* Right Column: Visual Showcase Preview matching mockup image block */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 group">
                <img
                  src="/src/assets/images/project_market_1786536018642.jpg"
                  alt="Mwakyoma Online Market Platform"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating pill inside image */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-2xl p-3 text-left border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-extrabold text-white">Mwakyoma Market v2.4</p>
                      <p className="text-[10px] text-white/70">Full-Stack E-Commerce & Inventory</p>
                    </div>
                    <span className="bg-[#761A30] text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
