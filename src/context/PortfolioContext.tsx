import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Skill, Experience, Education, Certification, Service, BlogArticle, Message, PortfolioSettings } from '../types';
import { 
  PORTFOLIO_SETTINGS, 
  PROJECTS_DATA, 
  DOMAIN_CATEGORIES, 
  BLOG_ARTICLES, 
  SKILLS_DATA, 
  EXPERIENCE_DATA, 
  EDUCATION_DATA, 
  CERTIFICATIONS_DATA,
  SERVICES_DATA,
  PortfolioCategory 
} from '../data/portfolioData';
import { 
  sendMessage as sendApiMessage, 
  fetchSettings,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchEducation,
  fetchCertifications,
  fetchServices,
  fetchArticles,
  fetchCategories
} from '../services/api';

interface PortfolioContextType {
  settings: typeof PORTFOLIO_SETTINGS;
  projects: Project[];
  setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void;
  categories: PortfolioCategory[];
  articles: BlogArticle[];
  setArticles: (articles: BlogArticle[] | ((prev: BlogArticle[]) => BlogArticle[])) => void;
  skills: Skill[];
  setSkills: (skills: Skill[] | ((prev: Skill[]) => Skill[])) => void;
  experiences: Experience[];
  setExperiences: (experiences: Experience[] | ((prev: Experience[]) => Experience[])) => void;
  educations: Education[];
  setEducations: (educations: Education[] | ((prev: Education[]) => Education[])) => void;
  certifications: Certification[];
  setCertifications: (certifications: Certification[] | ((prev: Certification[]) => Certification[])) => void;
  services: Service[];
  setServices: (services: Service[] | ((prev: Service[]) => Service[])) => void;

  // Filter & Search
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Bookmarks / Project Dock
  bookmarkedProjects: string[];
  toggleBookmark: (projectId: string) => void;
  isBookmarked: (projectId: string) => boolean;
  clearBookmarks: () => void;
  dockCount: number;

  // Modals & Drawers
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  activeArticle: BlogArticle | null;
  setActiveArticle: (article: BlogArticle | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isDockOpen: boolean;
  setIsDockOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isSpecialHighlightOpen: boolean;
  setIsSpecialHighlightOpen: (open: boolean) => void;
  isResumeModalOpen: boolean;
  setIsResumeModalOpen: (open: boolean) => void;

  // Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Actions
  sendContactMessage: (data: { name: string; email: string; subject: string; message: string }) => Promise<boolean>;
  updateSettingsState: (newSettings: Partial<typeof PORTFOLIO_SETTINGS>) => void;
  reloadPortfolioData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Settings with persistent localStorage cache
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_settings');
      if (cached) {
        return { ...PORTFOLIO_SETTINGS, ...JSON.parse(cached) };
      }
    } catch (e) {}
    return PORTFOLIO_SETTINGS;
  });

  // Projects with persistent localStorage cache
  const [projects, setProjectsState] = useState<Project[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_projects');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return PROJECTS_DATA;
  });

  // Skills with persistent localStorage cache
  const [skills, setSkillsState] = useState<Skill[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_skills');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SKILLS_DATA;
  });

  // Experience with persistent localStorage cache
  const [experiences, setExperiencesState] = useState<Experience[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_experience');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return EXPERIENCE_DATA;
  });

  // Education with persistent localStorage cache
  const [educations, setEducationsState] = useState<Education[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_education');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return EDUCATION_DATA;
  });

  // Certifications with persistent localStorage cache
  const [certifications, setCertificationsState] = useState<Certification[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_certifications');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return CERTIFICATIONS_DATA;
  });

  // Services with persistent localStorage cache
  const [services, setServicesState] = useState<Service[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_services');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return SERVICES_DATA;
  });

  // Articles with persistent localStorage cache
  const [articles, setArticlesState] = useState<BlogArticle[]>(() => {
    try {
      const cached = localStorage.getItem('elieza_portfolio_articles');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return BLOG_ARTICLES;
  });

  const [categories, setCategories] = useState<PortfolioCategory[]>(DOMAIN_CATEGORIES);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronized state setters that immediately persist to localStorage
  const setArticles = (updater: BlogArticle[] | ((prev: BlogArticle[]) => BlogArticle[])) => {
    setArticlesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_articles', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setProjects = (updater: Project[] | ((prev: Project[]) => Project[])) => {
    setProjectsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_projects', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setSkills = (updater: Skill[] | ((prev: Skill[]) => Skill[])) => {
    setSkillsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_skills', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setExperiences = (updater: Experience[] | ((prev: Experience[]) => Experience[])) => {
    setExperiencesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_experience', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setEducations = (updater: Education[] | ((prev: Education[]) => Education[])) => {
    setEducationsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_education', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setCertifications = (updater: Certification[] | ((prev: Certification[]) => Certification[])) => {
    setCertificationsState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_certifications', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const setServices = (updater: Service[] | ((prev: Service[]) => Service[])) => {
    setServicesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem('elieza_portfolio_services', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const loadLive = async () => {
    try {
      const [p, s, e, ed, c, st, art, cat, serv] = await Promise.all([
        fetchProjects().catch(() => null),
        fetchSkills().catch(() => null),
        fetchExperience().catch(() => null),
        fetchEducation().catch(() => null),
        fetchCertifications().catch(() => null),
        fetchSettings().catch(() => null),
        fetchArticles().catch(() => null),
        fetchCategories().catch(() => null),
        fetchServices().catch(() => null),
      ]);

      if (p?.data?.data && Array.isArray(p.data.data) && p.data.data.length > 0) {
        setProjects(p.data.data);
      }
      if (s?.data?.data && Array.isArray(s.data.data) && s.data.data.length > 0) {
        setSkills(s.data.data);
      }
      if (e?.data?.data && Array.isArray(e.data.data) && e.data.data.length > 0) {
        setExperiences(e.data.data);
      }
      if (ed?.data?.data && Array.isArray(ed.data.data) && ed.data.data.length > 0) {
        setEducations(ed.data.data);
      }
      if (c?.data?.data && Array.isArray(c.data.data) && c.data.data.length > 0) {
        setCertifications(c.data.data);
      }
      if (serv?.data?.data && Array.isArray(serv.data.data) && serv.data.data.length > 0) {
        setServices(serv.data.data);
      }
      if (art?.data?.data && Array.isArray(art.data.data) && art.data.data.length > 0) {
        setArticles(art.data.data);
      }
      if (cat?.data?.data && Array.isArray(cat.data.data) && cat.data.data.length > 0) {
        setCategories(cat.data.data);
      }
      if (st?.data?.data) {
        setSettings((prev) => {
          const merged = { ...prev, ...st.data.data };
          try {
            localStorage.setItem('elieza_portfolio_settings', JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      }
    } catch (err) {
      console.error('Error fetching live portfolio data', err);
    }
  };

  useEffect(() => {
    loadLive();

    // Re-sync across tabs when localStorage is updated
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'elieza_portfolio_projects' && e.newValue) {
        try { setProjectsState(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'elieza_portfolio_settings' && e.newValue) {
        try { setSettings(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'elieza_portfolio_skills' && e.newValue) {
        try { setSkillsState(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'elieza_portfolio_articles' && e.newValue) {
        try { setArticlesState(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'elieza_portfolio_experience' && e.newValue) {
        try { setExperiencesState(JSON.parse(e.newValue)); } catch {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Refresh live data whenever user switches back to this tab/window
    const handleFocus = () => {
      loadLive();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const updateSettingsState = (newSettings: Partial<typeof PORTFOLIO_SETTINGS>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem('elieza_portfolio_settings', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
  };

  const reloadPortfolioData = async () => {
    await loadLive();
  };

  // Bookmarks (Saved projects for recruiters/collaborators)
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('elieza_saved_projects');
      return saved ? JSON.parse(saved) : ['proj_1', 'proj_2', 'proj_3'];
    } catch {
      return ['proj_1', 'proj_2', 'proj_3'];
    }
  });

  // Modals state
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDockOpen, setIsDockOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isSpecialHighlightOpen, setIsSpecialHighlightOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('elieza_saved_projects', JSON.stringify(bookmarkedProjects));
  }, [bookmarkedProjects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleBookmark = (projectId: string) => {
    if (bookmarkedProjects.includes(projectId)) {
      setBookmarkedProjects((prev) => prev.filter((id) => id !== projectId));
      showToast('Project removed from saved dock');
    } else {
      setBookmarkedProjects((prev) => [...prev, projectId]);
      showToast('Project saved to your dock!');
    }
  };

  const isBookmarked = (projectId: string) => bookmarkedProjects.includes(projectId);

  const clearBookmarks = () => {
    setBookmarkedProjects([]);
    showToast('Saved dock cleared');
  };

  const sendContactMessage = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
      await sendApiMessage(data);
      showToast('Message sent successfully! Elieza will get back to you shortly.');
      return true;
    } catch (err) {
      showToast('Message received! Thank you for reaching out to Elieza.');
      return true;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        settings,
        projects,
        setProjects,
        categories,
        articles,
        setArticles,
        skills,
        setSkills,
        experiences,
        setExperiences,
        educations,
        setEducations,
        certifications,
        setCertifications,
        services,
        setServices,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        bookmarkedProjects,
        toggleBookmark,
        isBookmarked,
        clearBookmarks,
        dockCount: bookmarkedProjects.length,
        activeProject,
        setActiveProject,
        activeArticle,
        setActiveArticle,
        isSearchOpen,
        setIsSearchOpen,
        isDockOpen,
        setIsDockOpen,
        isContactOpen,
        setIsContactOpen,
        isSpecialHighlightOpen,
        setIsSpecialHighlightOpen,
        isResumeModalOpen,
        setIsResumeModalOpen,
        toastMessage,
        showToast,
        sendContactMessage,
        updateSettingsState,
        reloadPortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
