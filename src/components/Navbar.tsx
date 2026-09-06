import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Send, 
  Github, 
  Shield, 
  Sliders, 
  Droplets,
  Layers,
  FolderGit2,
  BookOpen
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLiquidNav } from '../context/LiquidNavContext';

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { 
    dockCount, 
    setIsDockOpen, 
    setIsSearchOpen, 
    setIsContactOpen,
    categories,
    setSelectedCategory 
  } = usePortfolio();

  const { 
    config, 
    activeSection, 
    setActiveSection, 
    setIsCustomizerOpen 
  } = useLiquidNav();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 25;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'featured-projects', label: 'Projects' },
    { id: 'popular-domains', label: 'Domains', hasDropdown: true },
    { id: 'technical-skills', label: 'Skills & Stack' },
    { id: 'tech-journal', label: 'Journal' },
  ];

  // Dynamic Theme Styling
  const getHeaderTheme = () => {
    const blurClass = 
      config.blurIntensity === 'low' ? 'backdrop-blur-md' :
      config.blurIntensity === 'medium' ? 'backdrop-blur-xl' : 'backdrop-blur-2xl';

    switch (config.theme) {
      case 'burgundy':
        return `bg-[#761A30]/90 text-white border-[#8A233C]/80 ${blurClass} shadow-xl shadow-[#761A30]/20`;
      case 'dark-glass':
        return `bg-[#0B0F19]/90 text-white border-white/15 ${blurClass} shadow-2xl shadow-black/40`;
      case 'minimal':
        return `bg-[#FAF8F8]/90 text-[#18181B] border-transparent ${blurClass} shadow-md shadow-black/[0.03]`;
      case 'crystal':
      default:
        return `bg-white/80 text-[#18181B] border-[#F1EBEB]/80 ${blurClass} shadow-lg shadow-black/[0.03]`;
    }
  };

  const getActiveIndicatorTheme = () => {
    switch (config.theme) {
      case 'burgundy':
        return 'bg-white text-[#761A30] shadow-sm';
      case 'dark-glass':
        return 'bg-white/20 text-white border border-white/20 shadow-xs';
      case 'minimal':
        return 'bg-white text-[#761A30] shadow-xs';
      case 'crystal':
      default:
        return 'bg-[#FAF3F5] text-[#761A30] border border-[#F4ECEE] shadow-xs';
    }
  };

  const getHoverDropletTheme = () => {
    switch (config.theme) {
      case 'burgundy':
        return 'bg-white/10';
      case 'dark-glass':
        return 'bg-white/10';
      case 'minimal':
      case 'crystal':
      default:
        return 'bg-black/[0.04]';
    }
  };

  // Spring physics setup
  const springConfig = config.physics === 'bouncy'
    ? { type: 'spring' as const, stiffness: 420, damping: 24 }
    : config.physics === 'snappy'
    ? { type: 'spring' as const, stiffness: 550, damping: 38 }
    : { type: 'spring' as const, stiffness: 280, damping: 32 };

  // Floating Geometry Calculations
  const isFloating = 
    config.mode === 'floating-pill' || 
    (config.mode === 'island' && scrolled);

  const containerLayoutClass = isFloating
    ? 'fixed top-3 inset-x-0 z-40 max-w-6xl mx-auto px-3 sm:px-4'
    : 'sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8';

  const innerNavClass = isFloating
    ? 'rounded-full border px-4 sm:px-6 h-16 transition-all duration-300'
    : 'border-b transition-all duration-300 ' + (config.compactOnScroll && scrolled ? 'h-16' : 'h-20');

  const textColorClass = 
    config.theme === 'burgundy' || config.theme === 'dark-glass' 
      ? 'text-white' 
      : 'text-[#18181B]';

  const subtleTextClass = 
    config.theme === 'burgundy' 
      ? 'text-white/70' 
      : config.theme === 'dark-glass' 
      ? 'text-white/60' 
      : 'text-[#52525B]';

  return (
    <>
      <header className={containerLayoutClass}>
        <motion.div 
          layout
          transition={springConfig}
          className={`flex items-center justify-between mx-auto ${innerNavClass} ${getHeaderTheme()} ${config.showGlow ? 'ring-1 ring-white/20' : ''}`}
        >
          {/* Logo Section with liquid avatar pulse */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group select-none shrink-0" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#761A30] to-[#4D0E1D] flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                E
              </div>
              <div 
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/30 animate-pulse" 
                title="Available for Work" 
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className={`font-serif font-black text-xl tracking-tight transition-colors ${textColorClass}`}>
                  Elieza
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#761A30]" />
              </div>
              <span className={`text-[9px] tracking-widest uppercase font-bold -mt-1 hidden sm:inline-block ${subtleTextClass}`}>
                Software Dev
              </span>
            </div>
          </div>

          {/* Desktop Liquid Navigation Track */}
          <nav 
            className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-black/[0.02] p-1.5 rounded-full"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      onMouseEnter={() => {
                        setHoveredNav(item.id);
                        setCategoryDropdownOpen(true);
                      }}
                      className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer z-10 ${
                        isActive 
                          ? config.theme === 'burgundy' ? 'text-[#761A30]' : 'text-[#761A30]' 
                          : subtleTextClass
                      }`}
                    >
                      {/* Fluid Active Capsule */}
                      {isActive && config.indicatorStyle === 'capsule' && (
                        <motion.div
                          layoutId="desktop-liquid-nav-bubble"
                          transition={springConfig}
                          className={`absolute inset-0 rounded-full z-0 ${getActiveIndicatorTheme()}`}
                        />
                      )}

                      {/* Fluid Underline */}
                      {isActive && config.indicatorStyle === 'underline' && (
                        <motion.div
                          layoutId="desktop-liquid-underline"
                          transition={springConfig}
                          className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-[#761A30]"
                        />
                      )}

                      {/* Hover Droplet */}
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="desktop-liquid-hover"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          className={`absolute inset-0 rounded-full z-0 ${getHoverDropletTheme()}`}
                        />
                      )}

                      <span className="relative z-10">{item.label}</span>
                      <ChevronDown 
                        className={`relative z-10 w-3 h-3 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-[#761A30]' : ''}`} 
                      />
                    </button>

                    {/* Liquid Glass Dropdown */}
                    <AnimatePresence>
                      {categoryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={springConfig}
                          onMouseLeave={() => setCategoryDropdownOpen(false)}
                          className="absolute top-full left-0 mt-2 w-64 rounded-2xl p-2 z-50 bg-white/95 backdrop-blur-2xl border border-[#F1EBEB] shadow-2xl"
                        >
                          <div className="p-2 border-b border-[#F4ECEE] mb-1">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#761A30]">
                              Technical Specializations
                            </p>
                          </div>
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setSelectedCategory(cat.slug);
                                setCategoryDropdownOpen(false);
                                scrollToSection('featured-projects');
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#18181B] hover:bg-[#FAF3F5] hover:text-[#761A30] transition-colors flex items-center justify-between cursor-pointer"
                            >
                              <span>{cat.name}</span>
                              <span className="text-[10px] text-[#A1A1AA] bg-[#F4F4F5] px-2 py-0.5 rounded-full">
                                {cat.itemCount}
                              </span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${
                    isActive 
                      ? config.theme === 'burgundy' ? 'text-[#761A30]' : 'text-[#761A30]' 
                      : subtleTextClass
                  }`}
                >
                  {/* Fluid Active Capsule */}
                  {isActive && config.indicatorStyle === 'capsule' && (
                    <motion.div
                      layoutId="desktop-liquid-nav-bubble"
                      transition={springConfig}
                      className={`absolute inset-0 rounded-full z-0 ${getActiveIndicatorTheme()}`}
                    />
                  )}

                  {/* Fluid Underline */}
                  {isActive && config.indicatorStyle === 'underline' && (
                    <motion.div
                      layoutId="desktop-liquid-underline"
                      transition={springConfig}
                      className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-[#761A30]"
                    />
                  )}

                  {/* Hover Droplet */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="desktop-liquid-hover"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className={`absolute inset-0 rounded-full z-0 ${getHoverDropletTheme()}`}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}

            {/* Direct Contact Button */}
            <button
              onClick={() => (onOpenContact ? onOpenContact() : setIsContactOpen(true))}
              onMouseEnter={() => setHoveredNav('contact')}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${subtleTextClass}`}
            >
              {hoveredNav === 'contact' && (
                <motion.div
                  layoutId="desktop-liquid-hover"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className={`absolute inset-0 rounded-full z-0 ${getHoverDropletTheme()}`}
                />
              )}
              <span className="relative z-10">Contact</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Customize Liquid Navigation Button */}
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white border border-[#F4ECEE] text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Customize Liquid Navigation & Theme"
            >
              <Droplets className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden lg:inline text-[11px]">Liquid Nav</span>
              <Sliders className="w-3 h-3 opacity-70" />
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer ${textColorClass}`}
              title="Search projects & skills (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Projects Dock Button */}
            <button
              onClick={() => setIsDockOpen(true)}
              className={`relative p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer ${textColorClass}`}
              title="View Bookmarked Projects Dock"
            >
              <Bookmark className="w-4 h-4" />
              {dockCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#761A30] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white"
                >
                  {dockCount}
                </motion.span>
              )}
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/mwakyomax"
              target="_blank"
              rel="noreferrer"
              className={`hidden sm:flex p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer ${textColorClass}`}
              title="GitHub Profile (@mwakyomax)"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Connect CTA Pill */}
            <button
              onClick={() => (onOpenContact ? onOpenContact() : setIsContactOpen(true))}
              className="hidden md:inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#761A30] to-[#5E1426] hover:from-[#5E1426] hover:to-[#460E1C] text-white text-[11px] font-bold tracking-wide uppercase shadow-sm transition-all hover:shadow-md active:scale-95 cursor-pointer"
            >
              <span>Get In Touch</span>
              <Send className="w-3 h-3" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl hover:bg-black/5 cursor-pointer ${textColorClass}`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Navigation with frosted glass theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={springConfig}
            className="md:hidden fixed inset-x-0 top-20 z-30 bg-white/95 backdrop-blur-2xl border-b border-[#F1EBEB] px-4 pt-4 pb-6 space-y-2 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-[#FAF3F5] text-[#761A30]'
                    : 'text-[#18181B] hover:bg-[#FAF8F8]'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#761A30]" />
                )}
              </button>
            ))}

            {/* Quick Liquid Customize button on mobile menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCustomizerOpen(true);
              }}
              className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold text-[#761A30] bg-[#FAF3F5] hover:bg-[#F4ECEE] transition-all flex items-center justify-between"
            >
              <span className="flex items-center space-x-2">
                <Droplets className="w-4 h-4" />
                <span>Customize Liquid Navigation</span>
              </span>
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <div className="pt-3 border-t border-[#F1EBEB] flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContact) onOpenContact();
                  else setIsContactOpen(true);
                }}
                className="w-full py-2.5 rounded-full bg-[#761A30] text-white font-bold text-xs tracking-wider uppercase text-center shadow-md"
              >
                Contact Elieza
              </button>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 rounded-full bg-slate-900 text-white/80 hover:text-white font-mono text-[11px] tracking-wider uppercase text-center flex items-center justify-center space-x-2"
              >
                <Shield className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
