import React from 'react';
import { ArrowRight, Star, Sparkles, Download, CheckCircle2, Terminal, Code, Cpu, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { settings, setIsSpecialHighlightOpen } = usePortfolio();

  const scrollToProjects = () => {
    const target = document.getElementById('featured-projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FAF3F5] via-[#FFF8F9] to-transparent rounded-full -z-10 blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs matching mockup */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Sub-eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF3F5] border border-[#F4ECEE] text-[#761A30] text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#761A30] animate-ping" />
              <span>Software Developer & Network Specialist</span>
            </div>

            {/* Main Headline matching "Collection and style for everyone 🟡" */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#18181B] tracking-tight leading-[1.12]">
              Building digital solutions and scalable software for everyone <span className="inline-block text-[#F59E0B] select-none text-3xl sm:text-5xl">🟡</span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl font-normal">
              Hi, I'm <strong className="text-[#18181B] font-bold">Elieza Mwakyoma</strong>, a software developer and networker with a Bachelor of Science in Computer Science from St. Joseph University in Tanzania. I engineer resilient full-stack web applications, robust network configurations, and offline-first mobile systems that turn complex challenges into high-performance digital products.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsSpecialHighlightOpen(true)}
                className="inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-white hover:bg-[#FAF8F8] text-[#18181B] font-bold text-sm border border-[#E4E4E7] transition-all shadow-xs hover:border-[#761A30] hover:text-[#761A30]"
              >
                <Sparkles className="w-4 h-4 text-[#761A30]" />
                <span>Featured Milestone</span>
              </button>
            </div>

            {/* Social Proof / Stats Box matching the avatar + 4.9 rating in the mockup */}
            <div className="pt-6 border-t border-[#F1EBEB] flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center -space-x-2 overflow-hidden">
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-[#761A30] text-white flex items-center justify-center text-xs font-bold font-mono">
                  JS
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold font-mono">
                  TS
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-[#10B981] text-white flex items-center justify-center text-xs font-bold font-mono">
                  PY
                </div>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold font-mono">
                  DB
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                  <span className="text-xs font-bold text-[#18181B] ml-1">4.9 / 5.0 Rating</span>
                </div>
                <p className="text-xs text-[#71717A]">
                  12+ production projects built • 18+ tech stacks mastered • Open for full-time & freelance
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Arched Model Visual with Floating Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* The Signature Arched Burgundy Container matching mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[44px] bg-gradient-to-b from-[#761A30] via-[#651528] to-[#450B19] shadow-2xl p-3 flex flex-col justify-end overflow-hidden group"
            >
              {/* Decorative arched inner glow */}
              <div className="absolute inset-0 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[44px] border-4 border-white/15 pointer-events-none" />

              {/* Developer Portrait Image */}
              <img
                src={settings.profileImage}
                alt="Elieza Mwakyoma - Software Developer & Networker"
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover rounded-t-[130px] sm:rounded-t-[170px] rounded-b-[38px] group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
