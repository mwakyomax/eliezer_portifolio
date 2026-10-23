import React from 'react';
import { 
  FolderKanban, Code2, Briefcase, Mail, Plus, ArrowUpRight, 
  Sparkles, CheckCircle2, Clock, MessageSquare, Send, User, 
  ExternalLink, ArrowRight, Shield, Award, GraduationCap, RefreshCw
} from 'lucide-react';
import { Project, Skill, Experience, Message, PortfolioSettings } from '../../../types';

interface OverviewTabProps {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  messages: Message[];
  settings: PortfolioSettings | null;
  onNavigateTab: (tab: string) => void;
  onOpenNewProject: () => void;
  onOpenNewExperience: () => void;
  onToggleMessageRead: (id: string, currentRead: boolean) => void;
  onSeedDatabase: () => void;
  isSeeding: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  projects,
  skills,
  experience,
  messages,
  settings,
  onNavigateTab,
  onOpenNewProject,
  onOpenNewExperience,
  onToggleMessageRead,
  onSeedDatabase,
  isSeeding,
}) => {
  const unreadMessages = messages.filter((m) => !m.read);
  const recentMessages = messages.slice(0, 5);

  const featuredProjectsCount = projects.filter((p) => p.featured).length;
  const avgProficiency = skills.length > 0 
    ? Math.round(skills.reduce((acc, s) => acc + (s.proficiency || 80), 0) / skills.length) 
    : 0;

  const currentRole = experience.find((e) => e.current) || experience[0];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#761A30] via-[#5E1426] to-[#3B0A16] text-white p-6 sm:p-8 shadow-lg">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-48 h-48 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-[11px] font-bold text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Executive Control Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
              Welcome, {settings?.fullName || 'Elieza Mwakyoma'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Your portfolio is active and fully synchronized. Manage your project case studies, 
              network architectures, credentials, and respond to professional client inquiries.
            </p>
          </div>

          {/* Action Hub in Hero */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <button
              onClick={onOpenNewProject}
              className="px-4 py-2.5 rounded-full bg-white text-[#761A30] hover:bg-white/90 text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Project</span>
            </button>
            <button
              onClick={onOpenNewExperience}
              className="px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Add Role</span>
            </button>
            <button
              onClick={() => onNavigateTab('messages')}
              className="relative px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Inbox</span>
              {unreadMessages.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Projects */}
        <div 
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">Projects</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center group-hover:bg-[#761A30] group-hover:text-white transition-colors">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-black text-[#18181B] tracking-tight">
              {projects.length}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#71717A]">
              <span>{featuredProjectsCount} featured highlights</span>
              <span className="text-[#761A30] font-bold group-hover:underline inline-flex items-center">
                Manage <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Stat 2: Skills */}
        <div 
          onClick={() => onNavigateTab('skills')}
          className="p-5 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">Technical Skills</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center group-hover:bg-[#761A30] group-hover:text-white transition-colors">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-black text-[#18181B] tracking-tight">
              {skills.length}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#71717A]">
              <span>Avg {avgProficiency}% proficiency</span>
              <span className="text-[#761A30] font-bold group-hover:underline inline-flex items-center">
                View Stack <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Stat 3: Career Experience */}
        <div 
          onClick={() => onNavigateTab('experience')}
          className="p-5 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">Experience</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center group-hover:bg-[#761A30] group-hover:text-white transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-serif font-black text-[#18181B] tracking-tight">
              {experience.length}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#71717A]">
              <span className="truncate max-w-[130px]">{currentRole?.title || 'Active Roles'}</span>
              <span className="text-[#761A30] font-bold group-hover:underline inline-flex items-center">
                Timeline <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Stat 4: Inquiries */}
        <div 
          onClick={() => onNavigateTab('messages')}
          className="p-5 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">Inquiries Inbox</span>
            <div className="w-9 h-9 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center group-hover:bg-[#761A30] group-hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-serif font-black text-[#18181B] tracking-tight">
                {messages.length}
              </span>
              {unreadMessages.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black">
                  {unreadMessages.length} unread
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-[#71717A]">
              <span>Client & hiring inquiries</span>
              <span className="text-[#761A30] font-bold group-hover:underline inline-flex items-center">
                Open Inbox <ArrowRight className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Section Grid: Recent Messages + Profile Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Recent Inquiries */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#18181B] tracking-tight">
                  Recent Inquiries & Contact Leads
                </h3>
                <p className="text-xs text-[#71717A]">Direct client inquiries sent via your portfolio contact form</p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('messages')}
              className="text-xs font-bold text-[#761A30] hover:underline inline-flex items-center space-x-1"
            >
              <span>View All ({messages.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="py-12 text-center text-[#71717A] space-y-2">
              <Mail className="w-8 h-8 mx-auto text-[#A1A1AA]" />
              <p className="text-sm font-bold">No messages received yet</p>
              <p className="text-xs max-w-sm mx-auto">When visitors reach out via your contact form, their inquiries will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => {
                const id = msg._id || msg.id;
                return (
                  <div
                    key={id}
                    className={`p-4 rounded-2xl border transition-all ${
                      msg.read 
                        ? 'bg-[#FAFAFA] border-[#E4E4E7]' 
                        : 'bg-[#FAF3F5]/60 border-[#F4ECEE] shadow-2xs'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${msg.read ? 'bg-slate-300' : 'bg-[#761A30] ring-4 ring-[#761A30]/20'}`} />
                        <span className="font-bold text-sm text-[#18181B] truncate">{msg.name}</span>
                        <span className="text-xs text-[#71717A] truncate">&lt;{msg.email}&gt;</span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[11px] text-[#A1A1AA] flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </span>
                        <button
                          onClick={() => onToggleMessageRead(id, !!msg.read)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                            msg.read 
                              ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                              : 'bg-[#761A30] text-white hover:bg-[#5E1426]'
                          }`}
                        >
                          {msg.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                          className="p-1.5 rounded-lg bg-white border border-[#E4E4E7] text-[#761A30] hover:bg-[#FAF3F5] transition-colors"
                          title="Reply via Email client"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-2 pl-5">
                      <p className="text-xs font-bold text-[#18181B]">{msg.subject || 'Portfolio Inquiry'}</p>
                      <p className="text-xs text-[#52525B] mt-1 line-clamp-2 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right 4 Cols: Developer Profile & Quick Health Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3E5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1EBEB] pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#18181B]">
                Profile Identity
              </h3>
              <button
                onClick={() => onNavigateTab('settings')}
                className="text-xs font-bold text-[#761A30] hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="relative inline-block">
                {settings?.profileImage ? (
                  <img
                    src={settings.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover mx-auto border-3 border-[#761A30]/30 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#761A30] text-white flex items-center justify-center font-serif font-black text-2xl mx-auto shadow-sm">
                    E
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-500/20" />
              </div>

              <div>
                <h4 className="font-serif font-black text-base text-[#18181B]">
                  {settings?.fullName || 'Elieza Mwakyoma'}
                </h4>
                <p className="text-xs text-[#761A30] font-bold mt-0.5">
                  {settings?.title || 'Lead Software & Network Engineer'}
                </p>
                <p className="text-xs text-[#71717A] mt-1">
                  St. Joseph University in Tanzania
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1EBEB] space-y-2 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-[#71717A]">Location:</span>
                <span className="font-bold text-[#18181B]">{settings?.location || 'Dar es Salaam, Tanzania'}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#71717A]">Primary Email:</span>
                <span className="font-bold text-[#18181B] truncate max-w-[150px]">{settings?.email || 'elieza@example.com'}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#71717A]">Database Connection:</span>
                <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                  Connected
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('settings')}
              className="w-full py-2.5 rounded-2xl bg-[#FAF3F5] text-[#761A30] hover:bg-[#761A30] hover:text-white font-bold text-xs transition-all border border-[#F4ECEE] cursor-pointer"
            >
              Update Portrait & Details
            </button>
          </div>

          {/* Quick Database Recovery Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-sm space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                System Synchronization
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ensure all default projects, skills, education, and credentials are fully loaded into MongoDB.
            </p>
            <button
              onClick={onSeedDatabase}
              disabled={isSeeding}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Syncing...' : 'Sync MongoDB Data'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
