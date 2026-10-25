export type ShapeType = 
  | 'square' 
  | 'rounded-rect' 
  | 'circle' 
  | 'squircle' 
  | 'hexagon' 
  | 'shield' 
  | 'diamond' 
  | 'octagon'
  | 'badge';

export type BackgroundType = 'solid' | 'gradient' | 'radial' | 'transparent' | 'pattern';

export type PatternType = 'grid' | 'dots' | 'stripes' | 'checker';

export type ContentMode = 'icon' | 'text' | 'image';

export type FontFamily = 'Plus Jakarta Sans' | 'JetBrains Mono' | 'Georgia' | 'Impact' | 'Courier New';

export interface CornerBadgeConfig {
  enabled: boolean;
  type: 'dot' | 'count' | 'star';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  color: string;
  countText?: string;
  size: number;
}

export interface IconConfig {
  // Shape & Dimensions
  shape: ShapeType;
  borderRadius: number; // 0 to 50 (percentage for rounded-rect)
  
  // Background
  bgType: BackgroundType;
  bgColor: string;
  bgGradientColorEnd: string;
  bgGradientAngle: number; // 0 to 360
  patternType: PatternType;
  patternOpacity: number; // 0.05 to 0.4
  
  // Border
  borderWidth: number; // 0 to 32
  borderColor: string;
  borderStyle: 'solid' | 'dashed';
  
  // Content Mode
  contentMode: ContentMode;
  
  // Icon mode properties
  iconName: string;
  iconSize: number; // percentage 20 to 90
  iconStrokeWidth: number; // 1 to 4
  iconColor: string;
  iconOffsetX: number; // -100 to 100
  iconOffsetY: number; // -100 to 100
  iconRotation: number; // -180 to 180
  
  // Monogram / Text mode properties
  text: string;
  fontFamily: FontFamily;
  fontWeight: '400' | '600' | '700' | '800';
  fontSize: number; // percentage 20 to 100
  letterSpacing: number; // -5 to 20
  textColor: string;
  textOffsetX: number;
  textOffsetY: number;
  textRotation: number;
  
  // Custom image upload
  customImageDataUrl?: string;
  imageScale: number; // 20 to 100
  
  // Shadow & Glow
  shadowBlur: number; // 0 to 40
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  
  // Badge
  cornerBadge: CornerBadgeConfig;
}

export interface PresetItem {
  id: string;
  name: string;
  category: 'Tech' | 'Monogram' | 'Creative' | 'Minimal' | 'Security';
  config: Partial<IconConfig>;
}

export interface ExportSize {
  name: string;
  size: number;
  description: string;
  filename: string;
}
