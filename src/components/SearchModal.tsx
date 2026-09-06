import React, { useState } from 'react';
import { Search, X, Tag, ArrowRight, Code2, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'motion/react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    projects,
    skills,
    setActiveProject,
  } = usePortfolio();

  const [inputVal, setInputVal] = useState(searchQuery);

  if (!isSearchOpen) return null;

  const popularKeywords = ['React', 'Node.js', 'Python', 'Django', 'PHP', 'Android', 'MongoDB', 'Algorithms', 'MySQL'];

  const results = inputVal.trim()
    ? projects.filter((p) =>
        p.title.toLowerCase().includes(inputVal.toLowerCase()) ||
        p.category.toLowerCase().includes(inputVal.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(inputVal.toLowerCase()))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal);
    setIsSearchOpen(false);
    const target = document.getElementById('featured-projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTag = (kw: string) => {
    setInputVal(kw);
    setSearchQuery(kw);
    setIsSearchOpen(false);
    const target = document.getElementById('featured-projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="min-h-screen px-4 flex items-start justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F1EBEB] z-10 p-6 space-y-6"
        >
          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-[#761A30]" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects by name, language, or stack (e.g. React, Python, Android)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-[#FAF8F8] rounded-2xl text-sm font-medium text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#761A30]/30 border border-[#E4E4E7]"
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 p-1.5 rounded-full text-[#71717A] hover:text-[#18181B]"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Tags */}
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-[#71717A]">
              <Tag className="w-3.5 h-3.5 text-[#761A30]" />
              <span>Popular Search Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => handleSelectTag(kw)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white text-xs font-semibold transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Instant Results preview */}
          {results.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#F1EBEB] text-left max-h-64 overflow-y-auto">
              <p className="text-xs font-bold text-[#71717A]">Found {results.length} matching implementations:</p>
              <div className="space-y-2">
                {results.slice(0, 5).map((res) => (
                  <div
                    key={res.id || res._id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveProject(res);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#FAF8F8] cursor-pointer transition-colors border border-transparent hover:border-[#F1EBEB]"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={res.image} alt={res.title} className="w-11 h-11 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-[#18181B]">{res.title}</p>
                        <p className="text-[10px] text-[#A1A1AA]">{res.category} • {res.technologies.slice(0, 3).join(', ')}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#761A30] flex items-center space-x-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
