import React from 'react';
import { motion } from 'motion/react';
import { Home, FolderGit2, Layers, BookOpen, Search, Bookmark, Send, Sliders } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLiquidNav } from '../context/LiquidNavContext';

export const MobileLiquidDock: React.FC = () => {
  const { dockCount, setIsDockOpen, setIsSearchOpen, setIsContactOpen } = usePortfolio();
  const { config, activeSection, setActiveSection, setIsCustomizerOpen } = useLiquidNav();

  if (!config.showMobileLiquidDock) return null;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'featured-projects', label: 'Projects', icon: FolderGit2 },
    { id: 'technical-skills', label: 'Stack', icon: Layers },
    { id: 'tech-journal', label: 'Journal', icon: BookOpen },
  ];

  // Theme styling for mobile dock
  const getDockTheme = () => {
    switch (config.theme) {
      case 'burgundy':
        return 'bg-[#761A30]/90 text-white border-[#8A233C]/80 shadow-2xl shadow-[#761A30]/30';
      case 'dark-glass':
        return 'bg-[#0B0F19]/90 text-white border-white/15 shadow-2xl shadow-black/50';
      case 'minimal':
        return 'bg-[#FAF8F8]/95 text-[#18181B] border-transparent shadow-xl';
      case 'crystal':
      default:
        return 'bg-white/85 text-[#18181B] border-[#F1EBEB] shadow-2xl shadow-black/10';
    }
  };

  const getActivePillTheme = () => {
    switch (config.theme) {
      case 'burgundy':
        return 'bg-white text-[#761A30] shadow-sm';
      case 'dark-glass':
        return 'bg-white/20 text-white shadow-xs';
      case 'minimal':
      case 'crystal':
      default:
        return 'bg-[#FAF3F5] text-[#761A30] shadow-xs';
    }
  };

  const springSettings = config.physics === 'bouncy' 
    ? { type: 'spring', stiffness: 420, damping: 24 }
    : config.physics === 'snappy'
    ? { type: 'spring', stiffness: 550, damping: 38 }
    : { type: 'spring', stiffness: 280, damping: 32 };

  return (
    <div className="md:hidden fixed bottom-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={springSettings}
        className={`pointer-events-auto flex items-center px-2 py-1.5 rounded-full border backdrop-blur-2xl transition-colors duration-300 ${getDockTheme()}`}
      >
        {/* Navigation Items with fluid active capsule */}
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-3 py-2 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-liquid-pill"
                  transition={springSettings}
                  className={`absolute inset-0 rounded-full ${getActivePillTheme()}`}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon className={`w-4 h-4 ${isActive ? (config.theme === 'burgundy' ? 'text-[#761A30]' : 'text-[#761A30]') : 'opacity-70'}`} />
                <span className={`text-[9px] font-bold mt-0.5 tracking-tight ${isActive ? (config.theme === 'burgundy' ? 'text-[#761A30]' : 'text-[#761A30]') : 'opacity-70'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-current opacity-15 mx-1" />

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all opacity-80 hover:opacity-100 cursor-pointer"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Saved Projects Dock */}
        <button
          onClick={() => setIsDockOpen(true)}
          className="relative p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all opacity-80 hover:opacity-100 cursor-pointer"
          title="Bookmarks Dock"
        >
          <Bookmark className="w-4 h-4" />
          {dockCount > 0 && (
            <span className="absolute 1 top-0.5 right-0.5 bg-[#761A30] text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-white">
              {dockCount}
            </span>
          )}
        </button>

        {/* Customize Liquid Nav Trigger */}
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="p-2.5 rounded-full hover:bg-black/5 active:scale-95 transition-all opacity-80 hover:opacity-100 text-[#761A30] cursor-pointer"
          title="Customize Liquid Navigation"
        >
          <Sliders className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
