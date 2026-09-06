import React from 'react';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Github, 
  Send, 
  Layers, 
  Bookmark, 
  Download,
  Share2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    isDockOpen, 
    setIsDockOpen, 
    bookmarkedProjects, 
    projects, 
    toggleBookmark, 
    clearBookmarks,
    setIsContactOpen,
    setActiveProject,
    showToast
  } = usePortfolio();

  if (!isDockOpen) return null;

  const savedList = projects.filter((p) => bookmarkedProjects.includes(p.id || p._id || ''));

  const handleCopyStackSummary = () => {
    const summary = savedList.map(p => `• ${p.title} (${p.category}): ${p.technologies.join(', ')} - ${p.githubUrl}`).join('\n');
    navigator.clipboard?.writeText(`Elieza Mwakyoma - Saved Portfolio Projects:\n\n${summary}`);
    showToast('Saved projects summary copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDockOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#F1EBEB] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#18181B]">Saved Projects Dock</h3>
                <p className="text-[11px] text-[#71717A]">{savedList.length} bookmarked projects</p>
              </div>
            </div>

            <button
              onClick={() => setIsDockOpen(false)}
              className="p-2 rounded-full text-[#71717A] hover:text-[#18181B] hover:bg-[#FAF8F8]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of Saved Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
            {savedList.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Bookmark className="w-12 h-12 text-[#E4E4E7] mx-auto" />
                <h4 className="text-sm font-bold text-[#18181B]">Your Project Dock is Empty</h4>
                <p className="text-xs text-[#71717A] max-w-xs mx-auto">
                  Click the bookmark icon on any project card in the catalog to save it here for quick review or sharing.
                </p>
              </div>
            ) : (
              savedList.map((prod) => (
                <div
                  key={prod.id || prod._id}
                  className="group bg-[#FAF8F8] rounded-2xl p-3.5 border border-[#F1EBEB] hover:border-[#761A30]/40 transition-all flex items-start space-x-3.5"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-white border border-[#E4E4E7]"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-black uppercase text-[#761A30] tracking-wider">
                      {prod.category}
                    </span>
                    <h4 
                      onClick={() => {
                        setIsDockOpen(false);
                        setActiveProject(prod);
                      }}
                      className="text-xs font-bold text-[#18181B] hover:text-[#761A30] cursor-pointer truncate"
                    >
                      {prod.title}
                    </h4>
                    <p className="text-[10px] text-[#71717A] truncate">
                      {prod.technologies.slice(0, 3).join(', ')}
                    </p>

                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => {
                          setIsDockOpen(false);
                          setActiveProject(prod);
                        }}
                        className="text-[10px] font-bold text-[#761A30] hover:underline"
                      >
                        Details
                      </button>
                      <span className="text-zinc-300">•</span>
                      <a
                        href={prod.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold text-[#52525B] hover:text-black flex items-center space-x-1"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleBookmark(prod.id || prod._id || '')}
                    className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {savedList.length > 0 && (
            <div className="p-6 border-t border-[#F1EBEB] space-y-3 bg-[#FAF8F8]">
              <div className="flex items-center justify-between text-xs font-bold text-[#18181B]">
                <span>Total Bookmarked:</span>
                <span className="text-[#761A30] font-black">{savedList.length} Implementations</span>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCopyStackSummary}
                  className="w-full py-3 rounded-full bg-white hover:bg-[#FAF3F5] text-[#761A30] font-bold text-xs border border-[#F4ECEE] transition-all flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Technical Summary</span>
                </button>

                <button
                  onClick={() => {
                    setIsDockOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <span>Discuss Saved Stack with Elieza</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={clearBookmarks}
                className="w-full text-center text-[10px] font-bold text-[#A1A1AA] hover:text-rose-600 pt-1"
              >
                Clear all saved projects
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
