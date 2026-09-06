export type LiquidNavTheme = 'crystal' | 'burgundy' | 'minimal' | 'dark-glass';
export type LiquidNavMode = 'island' | 'floating-pill' | 'docked';
export type LiquidSpringPhysics = 'bouncy' | 'smooth' | 'snappy';
export type LiquidIndicatorStyle = 'capsule' | 'underline' | 'pill-glow';
export type LiquidBlurIntensity = 'low' | 'medium' | 'high';

export interface LiquidNavConfig {
  theme: LiquidNavTheme;
  mode: LiquidNavMode;
  physics: LiquidSpringPhysics;
  indicatorStyle: LiquidIndicatorStyle;
  blurIntensity: LiquidBlurIntensity;
  showMobileLiquidDock: boolean;
  showGlow: boolean;
  compactOnScroll: boolean;
}

export const DEFAULT_LIQUID_NAV_CONFIG: LiquidNavConfig = {
  theme: 'crystal',
  mode: 'island',
  physics: 'bouncy',
  indicatorStyle: 'capsule',
  blurIntensity: 'high',
  showMobileLiquidDock: true,
  showGlow: true,
  compactOnScroll: true,
};
