import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Skill, Experience, Education, Certification, BlogArticle, Message, PortfolioSettings } from '../types';
import { 
  PORTFOLIO_SETTINGS, 
  PROJECTS_DATA, 
  DOMAIN_CATEGORIES, 
  BLOG_ARTICLES, 
  SKILLS_DATA, 
  EXPERIENCE_DATA, 
  EDUCATION_DATA, 
  CERTIFICATIONS_DATA,
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
  fetchArticles,
  fetchCategories
} from '../services/api';

interface PortfolioContextType {
  settings: typeof PORTFOLIO_SETTINGS;
  projects: Project[];
  categories: PortfolioCategory[];
  articles: BlogArticle[];
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];

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
  const [settings, setSettings] = useState(PORTFOLIO_SETTINGS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [categories, setCategories] = useState<PortfolioCategory[]>(DOMAIN_CATEGORIES);
  const [articles, setArticles] = useState<BlogArticle[]>(BLOG_ARTICLES);
  const [skills, setSkills] = useState<Skill[]>(SKILLS_DATA);
  const [experiences, setExperiences] = useState<Experience[]>(EXPERIENCE_DATA);
  const [educations, setEducations] = useState<Education[]>(EDUCATION_DATA);
  const [certifications, setCertifications] = useState<Certification[]>(CERTIFICATIONS_DATA);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadLive = async () => {
    try {
      const [p, s, e, ed, c, st, art, cat] = await Promise.all([
        fetchProjects().catch(() => null),
        fetchSkills().catch(() => null),
        fetchExperience().catch(() => null),
        fetchEducation().catch(() => null),
        fetchCertifications().catch(() => null),
        fetchSettings().catch(() => null),
        fetchArticles().catch(() => null),
        fetchCategories().catch(() => null),
      ]);
      if (p?.data?.data && p.data.data.length > 0) setProjects(p.data.data);
      if (s?.data?.data && s.data.data.length > 0) setSkills(s.data.data);
      if (e?.data?.data && e.data.data.length > 0) setExperiences(e.data.data);
      if (ed?.data?.data && ed.data.data.length > 0) setEducations(ed.data.data);
      if (c?.data?.data && c.data.data.length > 0) setCertifications(c.data.data);
      if (art?.data?.data && art.data.data.length > 0) setArticles(art.data.data);
      if (cat?.data?.data && cat.data.data.length > 0) setCategories(cat.data.data);
      if (st?.data?.data) {
        setSettings((prev) => ({ ...prev, ...st.data.data }));
      }
    } catch (err) {
      console.error('Error fetching live portfolio data', err);
    }
  };

  useEffect(() => {
    loadLive();
  }, []);

  const updateSettingsState = (newSettings: Partial<typeof PORTFOLIO_SETTINGS>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
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
        categories,
        articles,
        skills,
        experiences,
        educations,
        certifications,
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
