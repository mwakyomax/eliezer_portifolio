import React from 'react';
import { X, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';

export const BlogModal: React.FC = () => {
  const { activeArticle, setActiveArticle, showToast } = usePortfolio();

  if (!activeArticle) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Article link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveArticle(null)}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl z-10 border border-[#F1EBEB]"
        >
          {/* Header Image */}
          <div className="relative aspect-[16/9] w-full bg-zinc-900">
            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-[#761A30] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
              {activeArticle.category}
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-4 text-xs text-[#71717A]">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeArticle.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeArticle.readTime}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{activeArticle.author}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#18181B] tracking-tight leading-tight">
                {activeArticle.title}
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="prose text-sm text-[#52525B] leading-relaxed space-y-4">
              {activeArticle.content.split('\n\n').map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Footer actions */}
            <div className="pt-4 border-t border-[#F1EBEB] flex items-center justify-between">
              <span className="text-xs text-[#71717A]">
                Published by <strong className="text-[#18181B]">{activeArticle.author}</strong>
              </span>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 text-xs font-bold text-[#761A30] hover:text-[#5E1426] p-2 rounded-xl hover:bg-[#FAF3F5] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
