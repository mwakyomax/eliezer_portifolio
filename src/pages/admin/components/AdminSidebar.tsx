import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Code2, Briefcase, GraduationCap, 
  Award, Layers, Mail, Settings, LogOut, RefreshCw, Globe, 
  ArrowUpRight, Shield, X, Sparkles, Sliders
} from 'lucide-react';
import { PortfolioSettings } from '../../../types';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeMobileMenu?: () => void;
  projectsCount: number;
  skillsCount: number;
  experienceCount: number;
  educationCount: number;
  certificationsCount: number;
  servicesCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
  settings: PortfolioSettings | null;
  isSeeding: boolean;
  onSeedDatabase: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  closeMobileMenu,
  projectsCount,
  skillsCount,
  experienceCount,
  educationCount,
  certificationsCount,
  servicesCount,
  messagesCount,
  unreadMessagesCount,
  settings,
  isSeeding,
  onSeedDatabase,
  onLogout,
}) => {
  const navSections: NavSection[] = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'projects', label: 'Projects', icon: FolderKanban, count: projectsCount },
        { id: 'skills', label: 'Technical Stack', icon: Code2, count: skillsCount },
        { id: 'services', label: 'Services', icon: Layers, count: servicesCount },
      ],
    },
    {
      title: 'CAREER & HONORS',
      items: [
        { id: 'experience', label: 'Experience', icon: Briefcase, count: experienceCount },
        { id: 'education', label: 'Education', icon: GraduationCap, count: educationCount },
        { id: 'certifications', label: 'Certifications', icon: Award, count: certificationsCount },
      ],
    },
    {
      title: 'COMMUNICATIONS & SYSTEM',
      items: [
        { 
          id: 'messages', 
          label: 'Inquiries Inbox', 
          icon: Mail, 
          count: messagesCount,
          badge: unreadMessagesCount 
        },
        { id: 'settings', label: 'Profile & Settings', icon: Settings },
      ],
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-white text-[#18181B] select-none">
      {/* Top Brand Header */}
      <div className="p-5 border-b border-[#F1EBEB]">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#761A30] to-[#4D0E1D] flex items-center justify-center text-white font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                E
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/30 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1">
                <span className="font-serif font-black text-lg text-[#18181B] tracking-tight group-hover:text-[#761A30] transition-colors">
                  Elieza
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#761A30]" />
              </div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#71717A] -mt-1">
                Admin Console
              </span>
            </div>
          </Link>

          {closeMobileMenu && (
            <button
              onClick={closeMobileMenu}
              className="lg:hidden p-1.5 rounded-xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Admin User Mini Card */}
        <div className="mt-4 p-3 rounded-2xl bg-[#FAF3F5]/80 border border-[#F4ECEE] flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            {settings?.profileImage ? (
              <img
                src={settings.profileImage}
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover border border-[#761A30]/30 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#761A30] text-white flex items-center justify-center font-bold text-xs shrink-0">
                E
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-black text-[#18181B] truncate">
                {settings?.fullName || 'Elieza Mwakyoma'}
              </p>
              <div className="flex items-center space-x-1">
                <Shield className="w-2.5 h-2.5 text-[#761A30]" />
                <span className="text-[10px] font-bold text-[#761A30] uppercase tracking-wider">
                  Super Administrator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav List with Clean Section Grouping */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-3 text-[10px] font-black uppercase tracking-wider text-[#A1A1AA]">
              {section.title}
            </p>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (closeMobileMenu) closeMobileMenu();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#761A30] text-white shadow-sm font-black'
                        : 'text-[#52525B] hover:text-[#761A30] hover:bg-[#FAF3F5]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#761A30]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      {item.badge && item.badge > 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black animate-pulse">
                          {item.badge} new
                        </span>
                      ) : item.count !== undefined ? (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-[#F4F4F5] text-[#71717A]'
                        }`}>
                          {item.count}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions & System Utilities */}
      <div className="p-4 border-t border-[#F1EBEB] space-y-2 bg-[#FAF9FA]">
        {/* Database Sync Action */}
        <button
          onClick={onSeedDatabase}
          disabled={isSeeding}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-50"
          title="Sync & populate MongoDB database with all default records"
        >
          <div className="flex items-center space-x-2">
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Syncing DB...' : 'Sync Database'}</span>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-100/60 px-1.5 py-0.5 rounded-md">
            Live
          </span>
        </button>

        {/* View Public Site Link */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF3F5] text-[#52525B] hover:text-[#761A30] border border-[#E4E4E7] text-xs font-bold transition-all shadow-2xs"
        >
          <div className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-[#761A30]" />
            <span>Public Portfolio</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
        </Link>

        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-rose-50/70 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-bold transition-all cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};
