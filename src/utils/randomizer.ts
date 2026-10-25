import { IconConfig, ShapeType, BackgroundType, FontFamily } from '../types/icon';
import { ICON_REGISTRY } from '../data/icons';

const SHAPES: ShapeType[] = ['square', 'rounded-rect', 'circle', 'squircle', 'hexagon', 'shield', 'diamond', 'octagon', 'badge'];

const DARK_BASES = [
  '#09090b', // Zinc black
  '#0f172a', // Slate navy
  '#030712', // Obsidian
  '#18181b', // Carbon
  '#022c22', // Emerald deep
  '#1e1b4b', // Deep indigo
  '#2e1065', // Deep violet
  '#1c1917', // Warm black
  '#082f49', // Deep oceanic
  '#000000'  // Pure black
];

const ACCENT_PAIRS = [
  { main: '#10b981', secondary: '#34d399', border: '#059669', name: 'Electric Emerald' },
  { main: '#84cc16', secondary: '#a3e635', border: '#65a30d', name: 'Cyber Lime' },
  { main: '#a855f7', secondary: '#c084fc', border: '#7c3aed', name: 'Deep Violet' },
  { main: '#38bdf8', secondary: '#7dd3fc', border: '#0284c7', name: 'Sky Cyan' },
  { main: '#fbbf24', secondary: '#fde68a', border: '#d97706', name: 'Solar Gold' },
  { main: '#f97316', secondary: '#fb923c', border: '#ea580c', name: 'Neon Amber' },
  { main: '#ffffff', secondary: '#e4e4e7', border: '#71717a', name: 'Crisp White' }
];

const MONOGRAM_SAMPLES = ['IM', 'GO', 'FX', 'JS', 'AI', 'PX', 'HQ', 'LAB', 'NX', 'UI', 'DEV', 'X'];

const FONTS: FontFamily[] = ['Plus Jakarta Sans', 'JetBrains Mono', 'Georgia', 'Impact'];

export function generateRandomIconConfig(): IconConfig {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const darkBase = DARK_BASES[Math.floor(Math.random() * DARK_BASES.length)];
  const accent = ACCENT_PAIRS[Math.floor(Math.random() * ACCENT_PAIRS.length)];
  const isTextMode = Math.random() > 0.65;
  const hasBorder = Math.random() > 0.3;
  const isPattern = Math.random() > 0.7;

  const bgType: BackgroundType = isPattern ? 'pattern' : 'solid';
  const patternTypes: ('grid' | 'dots' | 'stripes')[] = ['grid', 'dots', 'stripes'];
  const pattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];

  const randomIcon = ICON_REGISTRY[Math.floor(Math.random() * ICON_REGISTRY.length)].id;
  const randomText = MONOGRAM_SAMPLES[Math.floor(Math.random() * MONOGRAM_SAMPLES.length)];
  const randomFont = FONTS[Math.floor(Math.random() * FONTS.length)];

  return {
    shape,
    borderRadius: shape === 'rounded-rect' ? Math.floor(Math.random() * 30 + 15) : 24,
    bgType,
    bgColor: darkBase,
    bgGradientColorEnd: darkBase,
    bgGradientAngle: 135,
    patternType: pattern,
    patternOpacity: 0.12,
    borderWidth: hasBorder ? (Math.random() > 0.5 ? 2 : 3) : 0,
    borderColor: hasBorder ? accent.border : 'transparent',
    borderStyle: 'solid',
    contentMode: isTextMode ? 'text' : 'icon',
    iconName: randomIcon,
    iconSize: Math.floor(Math.random() * 15 + 50),
    iconStrokeWidth: 2.2,
    iconColor: accent.main,
    iconOffsetX: 0,
    iconOffsetY: 0,
    iconRotation: 0,
    text: randomText,
    fontFamily: randomFont,
    fontWeight: '800',
    fontSize: Math.floor(Math.random() * 15 + 48),
    letterSpacing: -1,
    textColor: accent.main,
    textOffsetX: 0,
    textOffsetY: 0,
    textRotation: 0,
    imageScale: 70,
    shadowBlur: Math.random() > 0.4 ? 12 : 0,
    shadowColor: accent.main,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    cornerBadge: {
      enabled: Math.random() > 0.7,
      type: 'dot',
      position: 'top-right',
      color: accent.secondary,
      size: 12
    }
  };
}
