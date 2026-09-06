import React from 'react';
import { X, Sparkles, ExternalLink, Github, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';

export const SpecialOffersModal: React.FC = () => {
  const { isSpecialHighlightOpen, setIsSpecialHighlightOpen, projects, setActiveProject } = usePortfolio();

  if (!isSpecialHighlightOpen) return null;

  const flagshipProjects = projects.filter((p) => p.featured);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSpecialHighlightOpen(false)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl z-10 border border-[#F1EBEB]"
        >
          {/* Banner Header */}
          <div className="relative bg-gradient-to-r from-[#631427] via-[#761A30] to-[#450B19] text-white p-8 sm:p-10">
            <button
              onClick={() => setIsSpecialHighlightOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-serif italic text-2xl text-amber-200">
              Featured Milestone Innovations
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              Architectural Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl mt-2 leading-relaxed font-normal">
              Flagship digital products designed by Elieza Mwakyoma, focusing on high availability, responsive UX, and real-world African market utility.
            </p>
          </div>

          {/* Grid of Flagship Solutions */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flagshipProjects.map((prod) => (
                <div
                  key={prod.id || prod._id}
                  onClick={() => {
                    setIsSpecialHighlightOpen(false);
                    setActiveProject(prod);
                  }}
                  className="group bg-[#FAF8F8] rounded-3xl p-5 border border-[#F1EBEB] hover:border-[#761A30] hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white mb-4">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#761A30] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                      {prod.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-[#18181B] group-hover:text-[#761A30] transition-colors">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {prod.technologies.slice(0, 4).map((t, idx) => (
                        <span key={idx} className="text-[9px] font-bold bg-white text-[#761A30] px-2 py-0.5 rounded-md border border-[#F4ECEE]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E7] mt-3">
                      <span className="text-xs font-bold text-[#761A30] flex items-center space-x-1">
                        <span>Open Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="text-[10px] font-bold text-[#71717A]">Case Study Ready</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4 border-t border-[#F1EBEB]">
              <button
                onClick={() => setIsSpecialHighlightOpen(false)}
                className="px-8 py-3.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                Back to Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
