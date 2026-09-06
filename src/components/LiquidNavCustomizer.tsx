import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Droplets, 
  Sparkles, 
  Layers, 
  Sliders, 
  RotateCcw, 
  Check, 
  Smartphone, 
  Sun, 
  Moon, 
  Zap, 
  Maximize2, 
  Wind,
  Eye,
  Activity
} from 'lucide-react';
import { useLiquidNav } from '../context/LiquidNavContext';
import { 
  LiquidNavTheme, 
  LiquidNavMode, 
  LiquidSpringPhysics, 
  LiquidIndicatorStyle, 
  LiquidBlurIntensity 
} from '../types/liquidNav';

export const LiquidNavCustomizer: React.FC = () => {
  const { config, updateConfig, resetConfig, isCustomizerOpen, setIsCustomizerOpen } = useLiquidNav();

  if (!isCustomizerOpen) return null;

  const themes: { id: LiquidNavTheme; label: string; desc: string; icon: React.FC<{ className?: string }>; bgPreview: string }[] = [
    {
      id: 'crystal',
      label: 'Crystal Glass',
      desc: 'Translucent frosted white glass with specular boundary highlights',
      icon: Sun,
      bgPreview: 'bg-white/80 border-slate-200 text-slate-900',
    },
    {
      id: 'burgundy',
      label: 'Burgundy Velvet',
      desc: 'Signature royal burgundy liquid glass with deep wine ambiance',
      icon: Sparkles,
      bgPreview: 'bg-[#761A30] text-white border-[#8A233C]',
    },
    {
      id: 'minimal',
      label: 'Minimal Pure',
      desc: 'Ultra-clean borderless fluid capsule with airy negative space',
      icon: Wind,
      bgPreview: 'bg-[#F4F1F2] border-transparent text-slate-800',
    },
    {
      id: 'dark-glass',
      label: 'Dark Obsidian',
      desc: 'Futuristic stealth liquid glass with illuminated accents',
      icon: Moon,
      bgPreview: 'bg-[#0B0F19] text-white border-white/15',
    },
  ];

  const modes: { id: LiquidNavMode; label: string; desc: string }[] = [
    {
      id: 'island',
      label: 'Dynamic Floating Island',
      desc: 'Morphs fluidly from edge-to-edge into a compact floating pill upon scrolling',
    },
    {
      id: 'floating-pill',
      label: 'Always Floating Pill',
      desc: 'Centered floating liquid capsule suspended gracefully over content',
    },
    {
      id: 'docked',
      label: 'Docked Glass Bar',
      desc: 'Full-width top header with dynamic liquid indicators and frosted backdrop',
    },
  ];

  const indicatorStyles: { id: LiquidIndicatorStyle; label: string; desc: string }[] = [
    { id: 'capsule', label: 'Liquid Capsule', desc: 'Fluid mercury pill flowing behind the active link' },
    { id: 'underline', label: 'Fluid Underline', desc: 'Sliding droplet line tracking your current section' },
    { id: 'pill-glow', label: 'Luminous Glow', desc: 'Subtle ambient perimeter halo with active light' },
  ];

  const physicsOptions: { id: LiquidSpringPhysics; label: string; desc: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'bouncy', label: 'Bouncy Mercury', desc: 'Organic elastic recoil physics', icon: Droplets },
    { id: 'smooth', label: 'Silk Flow', desc: 'Ultra-gentle fluid glide motion', icon: Wind },
    { id: 'snappy', label: 'Snappy Instant', desc: 'Immediate tactile responsiveness', icon: Zap },
  ];

  const blurOptions: { id: LiquidBlurIntensity; label: string }[] = [
    { id: 'low', label: 'Light Frost (12px)' },
    { id: 'medium', label: 'Deep Glass (20px)' },
    { id: 'high', label: 'Liquid Blur (32px)' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCustomizerOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#FDFBFB] rounded-3xl border border-[#F1EBEB] shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#F1EBEB] flex items-center justify-between bg-white/50 backdrop-blur-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF3F5] text-[#761A30] flex items-center justify-center font-bold shadow-xs">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#18181B] tracking-tight flex items-center space-x-2">
                  <span>Customize Liquid Navigation</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#FAF3F5] text-[#761A30] px-2 py-0.5 rounded-full">
                    Live Preview
                  </span>
                </h3>
                <p className="text-xs text-[#71717A] mt-0.5">
                  Fine-tune glass aesthetics, sliding mercury physics, and floating layouts in real-time.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="p-2 rounded-full hover:bg-[#F4ECEE] text-[#71717A] hover:text-[#18181B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Scrollable Options */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* 1. Theme Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Liquid Glass Aesthetic</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {themes.map((t) => {
                  const isSelected = config.theme === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => updateConfig({ theme: t.id })}
                      className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/15'
                          : 'border-[#E4E4E7] bg-white hover:border-[#761A30]/40 hover:bg-[#FAF8F8]'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${t.bgPreview}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#18181B]">{t.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#761A30]" />}
                        </div>
                        <p className="text-[11px] text-[#71717A] mt-0.5 leading-snug">{t.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Navigation Mode */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30] flex items-center space-x-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>2. Floating Geometry & Behavior</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {modes.map((m) => {
                  const isSelected = config.mode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => updateConfig({ mode: m.id })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/15'
                          : 'border-[#E4E4E7] bg-white hover:border-[#761A30]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#18181B]">{m.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#761A30]" />}
                      </div>
                      <p className="text-[10px] text-[#71717A] leading-snug">{m.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Liquid Indicator Style */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30] flex items-center space-x-1.5">
                <Droplets className="w-3.5 h-3.5" />
                <span>3. Fluid Indicator Style</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {indicatorStyles.map((item) => {
                  const isSelected = config.indicatorStyle === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => updateConfig({ indicatorStyle: item.id })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/15'
                          : 'border-[#E4E4E7] bg-white hover:border-[#761A30]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#18181B]">{item.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#761A30]" />}
                      </div>
                      <p className="text-[10px] text-[#71717A] leading-snug">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Motion Spring Physics */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30] flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>4. Spring Dynamics & Feel</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {physicsOptions.map((p) => {
                  const isSelected = config.physics === p.id;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => updateConfig({ physics: p.id })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center space-x-2.5 ${
                        isSelected
                          ? 'border-[#761A30] bg-[#FAF3F5] ring-2 ring-[#761A30]/15'
                          : 'border-[#E4E4E7] bg-white hover:border-[#761A30]/40'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#761A30] text-white' : 'bg-[#FAF8F8] text-[#71717A]'}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-black text-[#18181B]">{p.label}</p>
                        <p className="text-[10px] text-[#71717A] truncate">{p.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Blur & Glass Depth */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30] flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>5. Frosted Glass Depth</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {blurOptions.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => updateConfig({ blurIntensity: b.id })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      config.blurIntensity === b.id
                        ? 'bg-[#761A30] text-white shadow-xs'
                        : 'bg-white text-[#52525B] border border-[#E4E4E7] hover:bg-[#FAF8F8]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Feature Toggles */}
            <div className="space-y-3 pt-2 border-t border-[#F1EBEB]">
              <label className="text-xs font-black uppercase tracking-wider text-[#761A30]">
                Interactive Features
              </label>

              <div className="space-y-2.5">
                {/* Mobile Dock Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E4E4E7]">
                  <div className="flex items-center space-x-2.5">
                    <Smartphone className="w-4 h-4 text-[#761A30]" />
                    <div>
                      <p className="text-xs font-bold text-[#18181B]">Mobile Liquid Floating Dock</p>
                      <p className="text-[10px] text-[#71717A]">Display a floating glass action dock at the bottom of mobile screens</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showMobileLiquidDock}
                    onChange={(e) => updateConfig({ showMobileLiquidDock: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                </div>

                {/* Ambient Glow Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E4E4E7]">
                  <div className="flex items-center space-x-2.5">
                    <Sparkles className="w-4 h-4 text-[#761A30]" />
                    <div>
                      <p className="text-xs font-bold text-[#18181B]">Ambient Light Aura & Shimmer</p>
                      <p className="text-[10px] text-[#71717A]">Subtle liquid specular reflection and border luminescence</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showGlow}
                    onChange={(e) => updateConfig({ showGlow: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                </div>

                {/* Compact on scroll */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#E4E4E7]">
                  <div className="flex items-center space-x-2.5">
                    <Maximize2 className="w-4 h-4 text-[#761A30]" />
                    <div>
                      <p className="text-xs font-bold text-[#18181B]">Compact Fluid Morph on Scroll</p>
                      <p className="text-[10px] text-[#71717A]">Gently contracts height and pads inwards as you scroll downward</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.compactOnScroll}
                    onChange={(e) => updateConfig({ compactOnScroll: e.target.checked })}
                    className="w-4 h-4 accent-[#761A30] cursor-pointer"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#F1EBEB] flex items-center justify-between">
            <button
              onClick={resetConfig}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#71717A] hover:text-[#761A30] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => setIsCustomizerOpen(false)}
              className="px-6 py-2.5 rounded-full bg-[#761A30] hover:bg-[#5E1426] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Save & Apply
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
