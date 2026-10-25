import { PresetItem } from '../types/icon';

export const PRESETS: PresetItem[] = [
  // Tech & Dev
  {
    id: 'terminal-mint',
    name: 'Mint Terminal',
    category: 'Tech',
    config: {
      shape: 'squircle',
      borderRadius: 24,
      bgType: 'solid',
      bgColor: '#0a0f0d',
      borderWidth: 2,
      borderColor: '#10b981',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'terminal',
      iconSize: 58,
      iconStrokeWidth: 2.5,
      iconColor: '#10b981',
      shadowBlur: 14,
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#10b981', size: 12 }
    }
  },
  {
    id: 'cyber-cpu',
    name: 'Cyber Core',
    category: 'Tech',
    config: {
      shape: 'hexagon',
      borderRadius: 16,
      bgType: 'solid',
      bgColor: '#09090b',
      borderWidth: 2,
      borderColor: '#84cc16',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'cpu',
      iconSize: 55,
      iconStrokeWidth: 2,
      iconColor: '#a3e635',
      shadowBlur: 12,
      shadowColor: 'rgba(132, 204, 22, 0.35)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#84cc16', size: 10 }
    }
  },
  {
    id: 'cloud-vault',
    name: 'Cloud Vault',
    category: 'Tech',
    config: {
      shape: 'rounded-rect',
      borderRadius: 28,
      bgType: 'solid',
      bgColor: '#172554',
      borderWidth: 0,
      borderColor: '#38bdf8',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'cloud',
      iconSize: 58,
      iconStrokeWidth: 2,
      iconColor: '#38bdf8',
      shadowBlur: 10,
      shadowColor: 'rgba(56, 189, 248, 0.3)',
      cornerBadge: { enabled: true, type: 'dot', position: 'top-right', color: '#10b981', size: 14 }
    }
  },
  {
    id: 'database-pro',
    name: 'Data Engine',
    category: 'Tech',
    config: {
      shape: 'circle',
      borderRadius: 50,
      bgType: 'solid',
      bgColor: '#18181b',
      borderWidth: 3,
      borderColor: '#a855f7',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'database',
      iconSize: 52,
      iconStrokeWidth: 2,
      iconColor: '#c084fc',
      shadowBlur: 8,
      shadowColor: 'rgba(168, 85, 247, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#a855f7', size: 12 }
    }
  },
  {
    id: 'git-flow',
    name: 'Git Matrix',
    category: 'Tech',
    config: {
      shape: 'rounded-rect',
      borderRadius: 22,
      bgType: 'pattern',
      bgColor: '#09090b',
      patternType: 'grid',
      patternOpacity: 0.15,
      borderWidth: 2,
      borderColor: '#27272a',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'git-branch',
      iconSize: 56,
      iconStrokeWidth: 2.2,
      iconColor: '#f97316',
      shadowBlur: 10,
      shadowColor: 'rgba(249, 115, 22, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#f97316', size: 12 }
    }
  },

  // Monograms
  {
    id: 'monogram-im',
    name: 'IconMint Flagship',
    category: 'Monogram',
    config: {
      shape: 'squircle',
      borderRadius: 26,
      bgType: 'solid',
      bgColor: '#0f172a',
      borderWidth: 2,
      borderColor: '#10b981',
      borderStyle: 'solid',
      contentMode: 'text',
      text: 'IM',
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: '800',
      fontSize: 52,
      letterSpacing: -1,
      textColor: '#10b981',
      shadowBlur: 12,
      shadowColor: 'rgba(16, 185, 129, 0.35)',
      cornerBadge: { enabled: true, type: 'dot', position: 'top-right', color: '#a855f7', size: 13 }
    }
  },
  {
    id: 'mono-bold-x',
    name: 'Obsidian X',
    category: 'Monogram',
    config: {
      shape: 'square',
      borderRadius: 0,
      bgType: 'solid',
      bgColor: '#000000',
      borderWidth: 3,
      borderColor: '#ffffff',
      borderStyle: 'solid',
      contentMode: 'text',
      text: 'X',
      fontFamily: 'JetBrains Mono',
      fontWeight: '800',
      fontSize: 65,
      letterSpacing: 0,
      textColor: '#ffffff',
      shadowBlur: 0,
      shadowColor: 'transparent',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#ffffff', size: 10 }
    }
  },
  {
    id: 'mono-editorial-a',
    name: 'Editorial Serif',
    category: 'Monogram',
    config: {
      shape: 'circle',
      borderRadius: 50,
      bgType: 'solid',
      bgColor: '#1c1917',
      borderWidth: 2,
      borderColor: '#d97706',
      borderStyle: 'solid',
      contentMode: 'text',
      text: 'A',
      fontFamily: 'Georgia',
      fontWeight: '700',
      fontSize: 66,
      letterSpacing: 0,
      textColor: '#fbbf24',
      shadowBlur: 6,
      shadowColor: 'rgba(251, 191, 36, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#fbbf24', size: 10 }
    }
  },
  {
    id: 'mono-code-js',
    name: 'JavaScript Studio',
    category: 'Monogram',
    config: {
      shape: 'rounded-rect',
      borderRadius: 20,
      bgType: 'solid',
      bgColor: '#ca8a04',
      borderWidth: 0,
      borderColor: '#eab308',
      borderStyle: 'solid',
      contentMode: 'text',
      text: 'JS',
      fontFamily: 'JetBrains Mono',
      fontWeight: '800',
      fontSize: 54,
      letterSpacing: -2,
      textColor: '#09090b',
      shadowBlur: 0,
      shadowColor: 'transparent',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#000000', size: 10 }
    }
  },
  {
    id: 'mono-duo-co',
    name: 'Company Duo',
    category: 'Monogram',
    config: {
      shape: 'squircle',
      borderRadius: 25,
      bgType: 'solid',
      bgColor: '#2e1065',
      borderWidth: 2,
      borderColor: '#a855f7',
      borderStyle: 'solid',
      contentMode: 'text',
      text: 'CO',
      fontFamily: 'Plus Jakarta Sans',
      fontWeight: '800',
      fontSize: 48,
      letterSpacing: -1,
      textColor: '#f5d0fe',
      shadowBlur: 8,
      shadowColor: 'rgba(168, 85, 247, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#a855f7', size: 12 }
    }
  },

  // Creative & Brand
  {
    id: 'creative-sparkle',
    name: 'Neon Spark',
    category: 'Creative',
    config: {
      shape: 'squircle',
      borderRadius: 24,
      bgType: 'solid',
      bgColor: '#18181b',
      borderWidth: 2,
      borderColor: '#10b981',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'sparkles',
      iconSize: 58,
      iconStrokeWidth: 2.2,
      iconColor: '#34d399',
      shadowBlur: 14,
      shadowColor: 'rgba(52, 211, 153, 0.4)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#34d399', size: 12 }
    }
  },
  {
    id: 'creative-rocket',
    name: 'Launchpad',
    category: 'Creative',
    config: {
      shape: 'circle',
      borderRadius: 50,
      bgType: 'solid',
      bgColor: '#022c22',
      borderWidth: 2,
      borderColor: '#059669',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'rocket',
      iconSize: 55,
      iconStrokeWidth: 2.2,
      iconColor: '#34d399',
      shadowBlur: 10,
      shadowColor: 'rgba(52, 211, 153, 0.3)',
      cornerBadge: { enabled: true, type: 'star', position: 'top-right', color: '#fbbf24', size: 15 }
    }
  },
  {
    id: 'creative-atom',
    name: 'Quantum Lab',
    category: 'Creative',
    config: {
      shape: 'squircle',
      borderRadius: 26,
      bgType: 'solid',
      bgColor: '#0c0a09',
      borderWidth: 2,
      borderColor: '#a3e635',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'atom',
      iconSize: 58,
      iconStrokeWidth: 2.2,
      iconColor: '#a3e635',
      shadowBlur: 12,
      shadowColor: 'rgba(163, 230, 53, 0.4)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#a3e635', size: 12 }
    }
  },
  {
    id: 'creative-flame',
    name: 'Solar Flare',
    category: 'Creative',
    config: {
      shape: 'badge',
      borderRadius: 20,
      bgType: 'solid',
      bgColor: '#451a03',
      borderWidth: 2,
      borderColor: '#ea580c',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'flame',
      iconSize: 55,
      iconStrokeWidth: 2.2,
      iconColor: '#fb923c',
      shadowBlur: 10,
      shadowColor: 'rgba(251, 146, 60, 0.4)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#ea580c', size: 12 }
    }
  },

  // Minimal & Clean
  {
    id: 'minimal-transparent-code',
    name: 'Alpha Code (Transparent)',
    category: 'Minimal',
    config: {
      shape: 'square',
      borderRadius: 0,
      bgType: 'transparent',
      bgColor: '#000000',
      borderWidth: 0,
      borderColor: 'transparent',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'code',
      iconSize: 76,
      iconStrokeWidth: 2.5,
      iconColor: '#10b981',
      shadowBlur: 0,
      shadowColor: 'transparent',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#10b981', size: 10 }
    }
  },
  {
    id: 'minimal-zap',
    name: 'Pure Lightning',
    category: 'Minimal',
    config: {
      shape: 'squircle',
      borderRadius: 22,
      bgType: 'solid',
      bgColor: '#18181b',
      borderWidth: 1,
      borderColor: '#27272a',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'zap',
      iconSize: 58,
      iconStrokeWidth: 2.5,
      iconColor: '#facc15',
      shadowBlur: 8,
      shadowColor: 'rgba(250, 204, 21, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#facc15', size: 10 }
    }
  },
  {
    id: 'minimal-target',
    name: 'Focus Ring',
    category: 'Minimal',
    config: {
      shape: 'circle',
      borderRadius: 50,
      bgType: 'solid',
      bgColor: '#09090b',
      borderWidth: 2,
      borderColor: '#3f3f46',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'crosshair',
      iconSize: 60,
      iconStrokeWidth: 2.2,
      iconColor: '#e4e4e7',
      shadowBlur: 4,
      shadowColor: 'rgba(255, 255, 255, 0.1)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#ffffff', size: 10 }
    }
  },
  {
    id: 'minimal-star',
    name: 'North Star',
    category: 'Minimal',
    config: {
      shape: 'squircle',
      borderRadius: 25,
      bgType: 'solid',
      bgColor: '#030712',
      borderWidth: 2,
      borderColor: '#38bdf8',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'star',
      iconSize: 56,
      iconStrokeWidth: 2.2,
      iconColor: '#38bdf8',
      shadowBlur: 10,
      shadowColor: 'rgba(56, 189, 248, 0.4)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#38bdf8', size: 10 }
    }
  },

  // Security & Trust
  {
    id: 'sec-shield',
    name: 'Armor Guard',
    category: 'Security',
    config: {
      shape: 'shield',
      borderRadius: 16,
      bgType: 'solid',
      bgColor: '#082f49',
      borderWidth: 2,
      borderColor: '#0284c7',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'shield',
      iconSize: 52,
      iconStrokeWidth: 2.2,
      iconColor: '#38bdf8',
      shadowBlur: 12,
      shadowColor: 'rgba(56, 189, 248, 0.35)',
      cornerBadge: { enabled: true, type: 'dot', position: 'top-right', color: '#10b981', size: 13 }
    }
  },
  {
    id: 'sec-lock',
    name: 'Cipher Key',
    category: 'Security',
    config: {
      shape: 'rounded-rect',
      borderRadius: 24,
      bgType: 'solid',
      bgColor: '#1e1b4b',
      borderWidth: 2,
      borderColor: '#6366f1',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'lock',
      iconSize: 54,
      iconStrokeWidth: 2.2,
      iconColor: '#a5b4fc',
      shadowBlur: 8,
      shadowColor: 'rgba(99, 102, 241, 0.3)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#6366f1', size: 12 }
    }
  },
  {
    id: 'sec-verified',
    name: 'Verified Status',
    category: 'Security',
    config: {
      shape: 'octagon',
      borderRadius: 18,
      bgType: 'solid',
      bgColor: '#064e3b',
      borderWidth: 2,
      borderColor: '#10b981',
      borderStyle: 'solid',
      contentMode: 'icon',
      iconName: 'check-circle',
      iconSize: 54,
      iconStrokeWidth: 2.4,
      iconColor: '#6ee7b7',
      shadowBlur: 10,
      shadowColor: 'rgba(16, 185, 129, 0.35)',
      cornerBadge: { enabled: false, type: 'dot', position: 'top-right', color: '#10b981', size: 12 }
    }
  }
];

export const DEFAULT_CONFIG = PRESETS[0].config;
