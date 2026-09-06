import React, { createContext, useContext, useState, useEffect } from 'react';
import { LiquidNavConfig, DEFAULT_LIQUID_NAV_CONFIG } from '../types/liquidNav';

interface LiquidNavContextType {
  config: LiquidNavConfig;
  updateConfig: (updates: Partial<LiquidNavConfig>) => void;
  resetConfig: () => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const STORAGE_KEY = 'elieza_liquid_nav_config';

const LiquidNavContext = createContext<LiquidNavContextType | undefined>(undefined);

export const LiquidNavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LiquidNavConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_LIQUID_NAV_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_LIQUID_NAV_CONFIG;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  // Section Observer / Scrollspy
  useEffect(() => {
    const sections = ['hero', 'popular-domains', 'featured-projects', 'technical-skills', 'tech-journal'];
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 180;
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection((prev) => (prev !== sections[i] ? sections[i] : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateConfig = (updates: Partial<LiquidNavConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_LIQUID_NAV_CONFIG);
  };

  return (
    <LiquidNavContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        isCustomizerOpen,
        setIsCustomizerOpen,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </LiquidNavContext.Provider>
  );
};

export const useLiquidNav = (): LiquidNavContextType => {
  const context = useContext(LiquidNavContext);
  if (!context) {
    throw new Error('useLiquidNav must be used within a LiquidNavProvider');
  }
  return context;
};
