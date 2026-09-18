import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, Globe, ArrowUpRight, Shield, CheckCircle2, 
  RefreshCw, Plus, Sparkles, Bell
} from 'lucide-react';
import { PortfolioSettings } from '../../../types';

interface AdminHeaderProps {
  activeTab: string;
  onOpenMobileMenu: () => void;
  unreadMessagesCount: number;
  onSelectTab: (tab: string) => void;
  onOpenNewProject: () => void;
  isSeeding: boolean;
  onSeedDatabase: () => void;
  settings: PortfolioSettings | null;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileMenu,
  unreadMessagesCount,
  onSelectTab,
  onOpenNewProject,
  isSeeding,
  onSeedDatabase,
  settings,
}) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return { category: 'Console', title: 'Executive Overview' };
      case 'projects': return { category: 'Workspace', title: 'Projects Management' };
      case 'skills': return { category: 'Workspace', title: 'Technical Stack' };
      case 'services': return { category: 'Workspace', title: 'Services & Solutions' };
      case 'experience': return { category: 'Career', title: 'Work Experience' };
      case 'education': return { category: 'Credentials', title: 'Education & Academics' };
      case 'certifications': return { category: 'Credentials', title: 'Certifications' };
      case 'messages': return { category: 'Communications', title: 'Inquiries Inbox' };
      case 'settings': return { category: 'System', title: 'Profile & Settings' };
      default: return { category: 'Console', title: 'Dashboard' };
    }
  };

  const { category, title } = getTabTitle(activeTab);

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-[#F1EBEB] px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center space-x-2 text-[11px] font-bold text-[#71717A]">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#761A30]">{category}</span>
          </div>
          <h1 className="text-base sm:text-lg font-black text-[#18181B] tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right: Status, Quick Actions & User Avatar */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* System Online Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px]">Database Active</span>
        </div>

        {/* Quick Add Project Button */}
        {activeTab === 'projects' ? (
          <button
            onClick={onOpenNewProject}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Publish Project</span>
            <span className="sm:hidden">Add</span>
          </button>
        ) : (
          <button
            onClick={onSeedDatabase}
            disabled={isSeeding}
            className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-[#52525B] border border-[#E4E4E7] text-xs font-bold transition-all shadow-2xs disabled:opacity-50"
            title="Synchronize database with default portfolio data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#761A30] ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Syncing...' : 'Sync Data'}</span>
          </button>
        )}

        {/* Inquiries Notification Pill */}
        <button
          onClick={() => onSelectTab('messages')}
          className="relative p-2 rounded-2xl bg-[#FAF3F5] hover:bg-[#F4ECEE] text-[#761A30] transition-colors"
          title="Inquiries Messages"
        >
          <Bell className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#761A30] text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* Public Site Button */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7] text-xs font-bold transition-all shadow-2xs"
        >
          <span>Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* User Mini Avatar */}
        <button
          onClick={() => onSelectTab('settings')}
          className="flex items-center pl-1 cursor-pointer group"
          title="Portfolio Settings"
        >
          {settings?.profileImage ? (
            <img
              src={settings.profileImage}
              alt="Admin avatar"
              className="w-8 h-8 rounded-full object-cover border-2 border-[#761A30]/30 group-hover:border-[#761A30] transition-colors"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#761A30] text-white flex items-center justify-center font-black text-xs">
              E
            </div>
          )}
        </button>
      </div>
    </header>
  );
};
