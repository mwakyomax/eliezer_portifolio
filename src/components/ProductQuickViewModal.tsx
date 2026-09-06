import React from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Bookmark, 
  CheckCircle2, 
  Calendar, 
  Tag, 
  Layers, 
  Terminal,
  ShieldCheck,
  Star
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';

export const ProductQuickViewModal: React.FC = () => {
  const { 
    activeProject, 
    setActiveProject, 
    toggleBookmark, 
    isBookmarked,
    showToast 
  } = usePortfolio();

  if (!activeProject) return null;

  const bookmarked = isBookmarked(activeProject.id || activeProject._id || '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveProject(null)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl z-10 border border-[#F1EBEB]"
        >
          {/* Header Bar */}
          <div className="relative aspect-[16/9] w-full bg-zinc-900 overflow-hidden">
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Tag */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#761A30] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              {activeProject.category}
            </div>

            {/* Bottom Title in Image Header */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{activeProject.title}</h2>
              <p className="text-xs text-white/80 mt-1">Full-Stack Architecture & Implementation</p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Tech Stack Chips */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#71717A]">
                <Layers className="w-3.5 h-3.5 text-[#761A30]" />
                <span>Technologies & Frameworks:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#FAF3F5] text-[#761A30] font-bold text-xs border border-[#F4ECEE]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview / Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                Project Overview
              </h4>
              <p className="text-sm text-[#52525B] leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Problem & Solution Breakdown */}
            {(activeProject.problemStatement || activeProject.solution) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {activeProject.problemStatement && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F8] border border-[#F1EBEB] space-y-1.5">
                    <h5 className="text-xs font-black text-[#761A30]">Problem Statement</h5>
                    <p className="text-xs text-[#52525B] leading-relaxed">{activeProject.problemStatement}</p>
                  </div>
                )}
                {activeProject.solution && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F8] border border-[#F1EBEB] space-y-1.5">
                    <h5 className="text-xs font-black text-emerald-800">Engineered Solution</h5>
                    <p className="text-xs text-[#52525B] leading-relaxed">{activeProject.solution}</p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features List */}
            {activeProject.features && activeProject.features.length > 0 && (
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                  Key Features & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProject.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#52525B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#761A30] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar Footer */}
            <div className="pt-6 border-t border-[#F1EBEB] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => toggleBookmark(activeProject.id || activeProject._id || '')}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-bold transition-all border ${
                  bookmarked
                    ? 'bg-[#761A30] text-white border-[#761A30]'
                    : 'bg-white text-[#18181B] hover:bg-[#FAF3F5] hover:text-[#761A30] border-[#E4E4E7]'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                <span>{bookmarked ? 'Saved to Project Dock' : 'Save to Project Dock'}</span>
              </button>

              <div className="flex items-center space-x-3">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#18181B] hover:bg-black text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                >
                  <span>GitHub Repository</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
