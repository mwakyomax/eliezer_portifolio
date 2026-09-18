import React, { useState } from 'react';
import { 
  User, Image as ImageIcon, Camera, Upload, RotateCcw, 
  Trash2, Sliders, Droplets, CheckCircle, Save, Sparkles, 
  MapPin, Phone, Mail, Github, Globe, FileText
} from 'lucide-react';
import { PortfolioSettings } from '../../../types';
import { useLiquidNav } from '../../../context/LiquidNavContext';

interface SettingsTabProps {
  settings: PortfolioSettings | null;
  onUpdateSettings: (newSettings: PortfolioSettings) => void;
  onSaveSettings: () => Promise<void>;
  onResetOriginalPhoto: () => void;
  onRemovePhoto: () => void;
  onFileSelect: (file: File) => void;
  profileInputRef: React.RefObject<HTMLInputElement>;
  isProcessingImage: boolean;
  imageMeta: { sizeKb?: number; width?: number; height?: number; name?: string } | null;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onUpdateSettings,
  onSaveSettings,
  onResetOriginalPhoto,
  onRemovePhoto,
  onFileSelect,
  profileInputRef,
  isProcessingImage,
  imageMeta,
  notify,
}) => {
  const { config: liquidConfig, updateConfig: updateLiquidConfig } = useLiquidNav();
  const [activeSection, setActiveSection] = useState<'portrait' | 'bio' | 'metrics' | 'liquid'>('portrait');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!settings) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSettings();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Save Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-[#EAE3E5] shadow-xs">
        <div>
          <h2 className="text-xl font-black text-[#18181B] tracking-tight">
            Profile & System Configuration
          </h2>
          <p className="text-xs text-[#71717A] mt-1">
            Customize developer identity, high-resolution portrait, headline metrics, and the liquid navigation physics.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Settings Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'portrait', label: 'Portrait & Gallery', icon: Camera },
          { id: 'bio', label: 'Bio & Contact Details', icon: User },
          { id: 'metrics', label: 'Portfolio Statistics', icon: Sliders },
          { id: 'liquid', label: 'Liquid Nav Engine', icon: Droplets },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#761A30] text-white shadow-xs'
                  : 'bg-white text-[#52525B] hover:bg-[#FAF3F5] hover:text-[#761A30] border border-[#EAE3E5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: PORTRAIT & GALLERY */}
      {activeSection === 'portrait' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-black text-lg text-[#18181B]">
                Hero Portrait & Profile Visuals
              </h3>
              <p className="text-xs text-[#71717A] mt-0.5">
                Upload your high-resolution portrait from your device gallery or enter a direct image URL.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Live Preview Column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-3xl bg-[#FAF9FA] border border-[#F1EBEB] space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                  Live Hero Arch Preview
                </span>

                <div className="relative w-48 h-64 rounded-t-full rounded-b-2xl overflow-hidden border-3 border-[#761A30] shadow-md bg-white">
                  {settings.profileImage ? (
                    <img
                      src={settings.profileImage}
                      alt="Hero Arch Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#71717A] space-y-2">
                      <Camera className="w-8 h-8" />
                      <span className="text-xs font-bold">No Photo</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#761A30] shadow-xs">
                    {settings.profileImage && (
                      <img src={settings.profileImage} alt="Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-[#18181B]">Nav Avatar & Bio</p>
                    <p className="text-[#71717A] text-[11px]">Synchronized globally</p>
                  </div>
                </div>

                {imageMeta && (
                  <div className="w-full p-3 rounded-2xl bg-white border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Optimized Upload</span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      {imageMeta.name && <span className="font-semibold">{imageMeta.name} • </span>}
                      {imageMeta.sizeKb} KB • {imageMeta.width}x{imageMeta.height}px
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Controls Column (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                {/* Drag and drop upload box */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      onFileSelect(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => profileInputRef.current?.click()}
                  className={`p-8 rounded-3xl border-2 border-dashed text-center cursor-pointer transition-all space-y-3 ${
                    isDragging
                      ? 'border-[#761A30] bg-[#FAF3F5]'
                      : 'border-[#E4E4E7] hover:border-[#761A30] bg-[#FAFAFA]'
                  }`}
                >
                  <input
                    type="file"
                    ref={profileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onFileSelect(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#18181B]">
                      Click or drag a photo from your computer
                    </p>
                    <p className="text-xs text-[#71717A] mt-1">
                      Supports JPG, PNG, WEBP. Automatically auto-crops and optimizes.
                    </p>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#18181B]">
                    Direct Image URL
                  </label>
                  <input
                    type="text"
                    value={settings.profileImage || ''}
                    onChange={(e) => onUpdateSettings({ ...settings, profileImage: e.target.value })}
                    placeholder="https://images.unsplash.com/... or paste image URL"
                    className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={onResetOriginalPhoto}
                    className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#52525B] text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Original Elieza Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRemovePhoto}
                    className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: BIO & CONTACT */}
      {activeSection === 'bio' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-6">
          <div>
            <h3 className="font-serif font-black text-lg text-[#18181B]">
              Personal Identity & Contact Information
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              These details are rendered across the hero headline, about section, and contact channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Full Name</label>
              <input
                type="text"
                value={settings.fullName || ''}
                onChange={(e) => onUpdateSettings({ ...settings, fullName: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Professional Headline / Title</label>
              <input
                type="text"
                value={settings.title || ''}
                onChange={(e) => onUpdateSettings({ ...settings, title: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#18181B]">Executive Summary / Bio</label>
            <textarea
              rows={4}
              value={settings.bio || ''}
              onChange={(e) => onUpdateSettings({ ...settings, bio: e.target.value })}
              className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Location</label>
              <input
                type="text"
                value={settings.location || ''}
                onChange={(e) => onUpdateSettings({ ...settings, location: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Primary Contact Email</label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => onUpdateSettings({ ...settings, email: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#18181B]">Phone Number</label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => onUpdateSettings({ ...settings, phone: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1EBEB] space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B]">
              Social & Developer Profiles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">GitHub Profile URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.github || ''}
                  onChange={(e) => onUpdateSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, github: e.target.value }
                  })}
                  placeholder="https://github.com/eliezamwakyoma"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#18181B]">LinkedIn Profile URL</label>
                <input
                  type="text"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) => onUpdateSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/in/elieza-mwakyoma"
                  className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs focus:outline-none focus:border-[#761A30]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: METRICS & STATISTICS */}
      {activeSection === 'metrics' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-6">
          <div>
            <h3 className="font-serif font-black text-lg text-[#18181B]">
              Hero Portfolio Counters & Statistics
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              These highlighted impact numbers are featured in your portfolio hero ribbon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Projects Completed</label>
              <input
                type="text"
                value={settings.stats?.projectsCompleted || '25+'}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  stats: { ...settings.stats, projectsCompleted: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E4E4E7] text-sm font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Years Experience</label>
              <input
                type="text"
                value={settings.stats?.yearsExperience || '4+'}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  stats: { ...settings.stats, yearsExperience: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E4E4E7] text-sm font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Technologies Mastered</label>
              <input
                type="text"
                value={settings.stats?.technologiesMastered || '20+'}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  stats: { ...settings.stats, technologiesMastered: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E4E4E7] text-sm font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9FA] border border-[#E4E4E7] space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Industry Certifications</label>
              <input
                type="text"
                value={settings.stats?.certifications || '6+'}
                onChange={(e) => onUpdateSettings({
                  ...settings,
                  stats: { ...settings.stats, certifications: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl bg-white border border-[#E4E4E7] text-sm font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: LIQUID NAV ENGINE */}
      {activeSection === 'liquid' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3E5] shadow-xs space-y-6">
          <div>
            <h3 className="font-serif font-black text-lg text-[#18181B]">
              Liquid Navigation Physics & Themes
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Configure dynamic fluid morphing, spring dampening, and specular refraction for the public navbar.
            </p>
          </div>

          {/* Theme Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#18181B]">Liquid Theme Preset</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'crystal', label: 'Crystal Clear', desc: 'Ultra-pure refraction' },
                { id: 'burgundy', label: 'Deep Burgundy', desc: 'Velvet signature tint' },
                { id: 'minimal', label: 'Minimalist Clean', desc: 'Pure neutral border' },
                { id: 'obsidian', label: 'Obsidian Dark', desc: 'Smoked glass & neon' },
              ].map((theme) => {
                const isSelected = liquidConfig.theme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      updateLiquidConfig({ theme: theme.id as any });
                      notify(`Theme updated to ${theme.label}`);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/20'
                        : 'border-[#E4E4E7] bg-[#FAFAFA] hover:border-[#761A30]'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#18181B]">{theme.label}</p>
                    <p className="text-[10px] text-[#71717A] mt-0.5">{theme.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Nav Geometry & Layout Mode</label>
              <select
                value={liquidConfig.mode}
                onChange={(e) => {
                  updateLiquidConfig({ mode: e.target.value as any });
                  notify('Nav geometry layout updated');
                }}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              >
                <option value="island">Dynamic Floating Island (Morphs on Scroll)</option>
                <option value="floating-pill">Always Floating Pill (Centered Capsule)</option>
                <option value="docked">Docked Glass Bar (Edge-to-Edge)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#18181B]">Spring Dynamic Physics</label>
              <select
                value={liquidConfig.physics}
                onChange={(e) => {
                  updateLiquidConfig({ physics: e.target.value as any });
                  notify('Liquid spring physics updated');
                }}
                className="w-full p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#18181B] focus:outline-none focus:border-[#761A30]"
              >
                <option value="bouncy">Bouncy Mercury (Elastic Spring)</option>
                <option value="smooth">Silk Flow (Gentle Ease)</option>
                <option value="snappy">Snappy Instant (Tactile Quick)</option>
              </select>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
              <input
                type="checkbox"
                checked={liquidConfig.showMobileLiquidDock}
                onChange={(e) => updateLiquidConfig({ showMobileLiquidDock: e.target.checked })}
                className="w-4 h-4 accent-[#761A30] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#18181B]">Mobile Floating Dock</span>
            </label>

            <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
              <input
                type="checkbox"
                checked={liquidConfig.showGlow}
                onChange={(e) => updateLiquidConfig({ showGlow: e.target.checked })}
                className="w-4 h-4 accent-[#761A30] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#18181B]">Specular Ambient Glow</span>
            </label>

            <label className="flex items-center space-x-2.5 p-3 rounded-2xl bg-[#FAFAFA] border border-[#E4E4E7] cursor-pointer">
              <input
                type="checkbox"
                checked={liquidConfig.compactOnScroll}
                onChange={(e) => updateLiquidConfig({ compactOnScroll: e.target.checked })}
                className="w-4 h-4 accent-[#761A30] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#18181B]">Compact On Scroll</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
