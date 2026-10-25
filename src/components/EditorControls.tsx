import React, { useState } from 'react';
import { 
  Square, 
  Circle, 
  Shield, 
  Type, 
  Smile, 
  Upload, 
  Palette, 
  Sliders, 
  Sparkles, 
  Search,
  Check,
  CircleDot
} from 'lucide-react';
import { IconConfig, ShapeType, BackgroundType, PatternType, ContentMode, FontFamily } from '../types/icon';
import { ICON_REGISTRY, IconDefinition } from '../data/icons';

interface EditorControlsProps {
  config: IconConfig;
  onChange: (updater: (prev: IconConfig) => IconConfig) => void;
}

type TabKey = 'shape' | 'content' | 'effects';

export const EditorControls: React.FC<EditorControlsProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('shape');
  const [iconSearch, setIconSearch] = useState<string>('');
  const [selectedIconCategory, setSelectedIconCategory] = useState<string>('All');

  const updateConfig = (key: keyof IconConfig, value: any) => {
    onChange(prev => ({ ...prev, [key]: value }));
  };

  const updateBadge = (key: string, value: any) => {
    onChange(prev => ({
      ...prev,
      cornerBadge: { ...prev.cornerBadge, [key]: value }
    }));
  };

  // Quick color palettes
  const BG_SWATCHES = [
    { label: 'Obsidian', hex: '#09090b' },
    { label: 'Navy Slate', hex: '#0f172a' },
    { label: 'Deep Emerald', hex: '#022c22' },
    { label: 'Midnight Violet', hex: '#2e1065' },
    { label: 'Deep Indigo', hex: '#1e1b4b' },
    { label: 'Warm Carbon', hex: '#1c1917' },
    { label: 'Pure Black', hex: '#000000' },
    { label: 'Pure White', hex: '#ffffff' }
  ];

  const ACCENT_SWATCHES = [
    { label: 'Electric Lime', hex: '#10b981' },
    { label: 'Cyber Lime', hex: '#84cc16' },
    { label: 'Sky Cyan', hex: '#38bdf8' },
    { label: 'Deep Violet', hex: '#a855f7' },
    { label: 'Solar Gold', hex: '#fbbf24' },
    { label: 'Neon Orange', hex: '#f97316' },
    { label: 'Crimson', hex: '#ef4444' },
    { label: 'Pure White', hex: '#ffffff' }
  ];

  const SHAPE_LIST: { id: ShapeType; label: string }[] = [
    { id: 'squircle', label: 'Squircle' },
    { id: 'rounded-rect', label: 'Rounded' },
    { id: 'circle', label: 'Circle' },
    { id: 'square', label: 'Square' },
    { id: 'hexagon', label: 'Hexagon' },
    { id: 'shield', label: 'Shield' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'octagon', label: 'Octagon' },
    { id: 'badge', label: 'Seal' }
  ];

  const filteredIcons = ICON_REGISTRY.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(iconSearch.toLowerCase()) || 
                          item.id.toLowerCase().includes(iconSearch.toLowerCase());
    const matchesCat = selectedIconCategory === 'All' || item.category === selectedIconCategory;
    return matchesSearch && matchesCat;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(prev => ({
            ...prev,
            contentMode: 'image',
            imageScale: prev.imageScale || 75,
            iconOffsetX: 0,
            iconOffsetY: 0,
            iconRotation: 0,
            customImageDataUrl: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(prev => ({
            ...prev,
            contentMode: 'image',
            imageScale: prev.imageScale || 75,
            iconOffsetX: 0,
            iconOffsetY: 0,
            iconRotation: 0,
            customImageDataUrl: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-neutral-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('shape')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'shape'
              ? 'bg-neutral-800 text-lime-400 border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Square className="h-3.5 w-3.5" />
          <span>Shape & Background</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'content'
              ? 'bg-neutral-800 text-lime-400 border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Smile className="h-3.5 w-3.5" />
          <span>Content & Graphics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('effects')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeTab === 'effects'
              ? 'bg-neutral-800 text-lime-400 border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="h-3.5 w-3.5" />
          <span>Borders & Effects</span>
        </button>
      </div>

      {/* Tab 1: Shape & Canvas */}
      {activeTab === 'shape' && (
        <div className="mt-4 space-y-5">
          {/* Shape Selection */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">Base Shape</label>
            <div className="grid grid-cols-3 gap-2">
              {SHAPE_LIST.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateConfig('shape', item.id)}
                  className={`flex items-center justify-center rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors ${
                    config.shape === item.id
                      ? 'border-lime-400 bg-neutral-800 text-lime-400'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Radius Slider (for rounded-rect) */}
          {config.shape === 'rounded-rect' && (
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                <span>Corner Radius</span>
                <span className="font-mono text-neutral-400">{config.borderRadius}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={config.borderRadius}
                onChange={e => updateConfig('borderRadius', parseInt(e.target.value, 10))}
                className="w-full accent-lime-400 cursor-pointer"
              />
            </div>
          )}

          {/* Background Type */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">Background Mode</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['solid', 'gradient', 'radial', 'pattern', 'transparent'] as BackgroundType[]).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateConfig('bgType', type)}
                  className={`rounded-md border px-2 py-1.5 text-xs capitalize transition-colors ${
                    config.bgType === type
                      ? 'border-lime-400 bg-neutral-800 text-lime-400 font-medium'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers when not transparent */}
          {config.bgType !== 'transparent' && (
            <div className="space-y-4">
              {/* Primary Background Color */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  {config.bgType === 'gradient' || config.bgType === 'radial' ? 'Start Color' : 'Background Color'}
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={config.bgColor}
                    onChange={e => updateConfig('bgColor', e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.bgColor}
                    onChange={e => updateConfig('bgColor', e.target.value)}
                    className="w-28 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                  />
                </div>
                {/* Swatches */}
                <div className="flex flex-wrap gap-1.5">
                  {BG_SWATCHES.map(s => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => updateConfig('bgColor', s.hex)}
                      title={s.label}
                      className={`h-6 w-6 rounded border transition-transform ${
                        config.bgColor.toLowerCase() === s.hex.toLowerCase()
                          ? 'border-lime-400 scale-110'
                          : 'border-neutral-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Gradient end color */}
              {(config.bgType === 'gradient' || config.bgType === 'radial') && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">End Color</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="color"
                      value={config.bgGradientColorEnd}
                      onChange={e => updateConfig('bgGradientColorEnd', e.target.value)}
                      className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                    />
                    <input
                      type="text"
                      value={config.bgGradientColorEnd}
                      onChange={e => updateConfig('bgGradientColorEnd', e.target.value)}
                      className="w-28 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                    />
                  </div>
                </div>
              )}

              {/* Gradient Angle Slider */}
              {config.bgType === 'gradient' && (
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Gradient Angle</span>
                    <span className="font-mono text-neutral-400">{config.bgGradientAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={config.bgGradientAngle}
                    onChange={e => updateConfig('bgGradientAngle', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>
              )}

              {/* Pattern options */}
              {config.bgType === 'pattern' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Pattern Style</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['grid', 'dots', 'stripes', 'checker'] as PatternType[]).map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => updateConfig('patternType', p)}
                          className={`rounded border px-2 py-1 text-xs capitalize ${
                            config.patternType === p
                              ? 'border-lime-400 bg-neutral-800 text-lime-400'
                              : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                      <span>Pattern Opacity</span>
                      <span className="font-mono text-neutral-400">{Math.round(config.patternOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="40"
                      value={Math.round(config.patternOpacity * 100)}
                      onChange={e => updateConfig('patternOpacity', parseInt(e.target.value, 10) / 100)}
                      className="w-full accent-lime-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Content & Graphics */}
      {activeTab === 'content' && (
        <div className="mt-4 space-y-5">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-2">Content Layer</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => updateConfig('contentMode', 'icon')}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors ${
                  config.contentMode === 'icon'
                    ? 'border-lime-400 bg-neutral-800 text-lime-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white'
                }`}
              >
                <Smile className="h-3.5 w-3.5" />
                <span>Vector Icon</span>
              </button>

              <button
                type="button"
                onClick={() => updateConfig('contentMode', 'text')}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors ${
                  config.contentMode === 'text'
                    ? 'border-lime-400 bg-neutral-800 text-lime-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white'
                }`}
              >
                <Type className="h-3.5 w-3.5" />
                <span>Monogram</span>
              </button>

              <button
                type="button"
                onClick={() => updateConfig('contentMode', 'image')}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors ${
                  config.contentMode === 'image'
                    ? 'border-lime-400 bg-neutral-800 text-lime-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Upload SVG/PNG</span>
              </button>
            </div>
          </div>

          {/* Mode: Vector Icon Picker */}
          {config.contentMode === 'icon' && (
            <div className="space-y-4">
              {/* Category pills and Search */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Search 80+ icons (terminal, zap, cloud, shield...)"
                    value={iconSearch}
                    onChange={e => setIconSearch(e.target.value)}
                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 py-1.5 pl-8 pr-3 text-xs text-neutral-200 placeholder-neutral-500 focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1 text-[11px]">
                  {['All', 'Dev & Tech', 'Creative & Brand', 'Commerce & Finance', 'Shapes & Symbols', 'General'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedIconCategory(cat)}
                      className={`rounded px-2 py-0.5 transition-colors ${
                        selectedIconCategory === cat
                          ? 'bg-neutral-800 text-lime-400 font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Icon Grid */}
              <div className="max-h-44 overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-950 p-2">
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
                  {filteredIcons.map(item => {
                    const IconComponent = item.icon;
                    const isSelected = config.iconName === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => updateConfig('iconName', item.id)}
                        title={item.label}
                        className={`flex h-9 w-9 items-center justify-center rounded border transition-colors ${
                          isSelected
                            ? 'border-lime-400 bg-lime-950/40 text-lime-400'
                            : 'border-transparent text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900 hover:text-white'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Icon Color */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">Icon Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={config.iconColor}
                    onChange={e => updateConfig('iconColor', e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.iconColor}
                    onChange={e => updateConfig('iconColor', e.target.value)}
                    className="w-28 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENT_SWATCHES.map(s => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => updateConfig('iconColor', s.hex)}
                      title={s.label}
                      className={`h-6 w-6 rounded border transition-transform ${
                        config.iconColor.toLowerCase() === s.hex.toLowerCase()
                          ? 'border-lime-400 scale-110'
                          : 'border-neutral-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Icon Size & Stroke Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Icon Scale</span>
                    <span className="font-mono text-neutral-400">{config.iconSize}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="85"
                    value={config.iconSize}
                    onChange={e => updateConfig('iconSize', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Stroke Width</span>
                    <span className="font-mono text-neutral-400">{config.iconStrokeWidth}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="3.5"
                    step="0.2"
                    value={config.iconStrokeWidth}
                    onChange={e => updateConfig('iconStrokeWidth', parseFloat(e.target.value))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Rotation & Offset */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Offset X</span>
                    <span className="font-mono text-neutral-400">{config.iconOffsetX}</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={config.iconOffsetX}
                    onChange={e => updateConfig('iconOffsetX', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Offset Y</span>
                    <span className="font-mono text-neutral-400">{config.iconOffsetY}</span>
                  </div>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={config.iconOffsetY}
                    onChange={e => updateConfig('iconOffsetY', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Rotation</span>
                    <span className="font-mono text-neutral-400">{config.iconRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={config.iconRotation}
                    onChange={e => updateConfig('iconRotation', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mode: Monogram / Text */}
          {config.contentMode === 'text' && (
            <div className="space-y-4">
              {/* Text Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Monogram Text (1-3 letters)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={config.text}
                  onChange={e => updateConfig('text', e.target.value.toUpperCase())}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm font-bold tracking-wider text-lime-400 focus:border-lime-400 focus:outline-none"
                  placeholder="IM"
                />
              </div>

              {/* Font Family */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Font Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(['Plus Jakarta Sans', 'JetBrains Mono', 'Georgia', 'Impact'] as FontFamily[]).map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => updateConfig('fontFamily', f)}
                      className={`rounded border px-2 py-1.5 text-xs transition-colors ${
                        config.fontFamily === f
                          ? 'border-lime-400 bg-neutral-800 text-lime-400 font-semibold'
                          : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                      }`}
                      style={{ fontFamily: f }}
                    >
                      {f.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">Letter Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={e => updateConfig('textColor', e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.textColor}
                    onChange={e => updateConfig('textColor', e.target.value)}
                    className="w-28 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENT_SWATCHES.map(s => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => updateConfig('textColor', s.hex)}
                      title={s.label}
                      className={`h-6 w-6 rounded border transition-transform ${
                        config.textColor.toLowerCase() === s.hex.toLowerCase()
                          ? 'border-lime-400 scale-110'
                          : 'border-neutral-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size & Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                    <span>Font Size</span>
                    <span className="font-mono text-neutral-400">{config.fontSize}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={config.fontSize}
                    onChange={e => updateConfig('fontSize', parseInt(e.target.value, 10))}
                    className="w-full accent-lime-400 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Weight</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['600', '700', '800'] as const).map(w => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => updateConfig('fontWeight', w)}
                        className={`rounded border py-1 text-xs ${
                          config.fontWeight === w
                            ? 'border-lime-400 bg-neutral-800 text-lime-400 font-bold'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode: Image Upload */}
          {config.contentMode === 'image' && (
            <div className="space-y-4">
              <div 
                onDragOver={e => e.preventDefault()}
                onDrop={handleDropImage}
                className="rounded-lg border-2 border-dashed border-neutral-700 p-5 text-center bg-neutral-950/40 hover:border-lime-500/50 transition-colors"
              >
                <input
                  type="file"
                  id="custom-img-upload"
                  accept="image/svg+xml,image/png,image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {config.customImageDataUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-900 p-1 shadow-sm">
                      <img 
                        src={config.customImageDataUrl} 
                        alt="Uploaded preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="custom-img-upload"
                        className="cursor-pointer rounded-md bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-lime-400 hover:bg-neutral-700"
                      >
                        Change Image
                      </label>
                      <button
                        type="button"
                        onClick={() => onChange(prev => ({ ...prev, customImageDataUrl: undefined, contentMode: 'icon' }))}
                        className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="custom-img-upload"
                      className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-xs font-semibold text-lime-400 hover:bg-neutral-700"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Choose PNG or SVG File</span>
                    </label>
                    <p className="mt-2 text-xs text-neutral-400">
                      or drag & drop your image here (transparent PNG or SVG recommended)
                    </p>
                  </>
                )}
              </div>

              {config.customImageDataUrl && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                      <span>Image Scale</span>
                      <span className="font-mono text-neutral-400">{config.imageScale ?? 75}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={config.imageScale ?? 75}
                      onChange={e => updateConfig('imageScale', parseInt(e.target.value, 10))}
                      className="w-full accent-lime-400 cursor-pointer"
                    />
                  </div>

                  {/* Position & Rotation */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                        <span>Offset X</span>
                        <span className="font-mono text-neutral-400">{config.iconOffsetX ?? 0}</span>
                      </div>
                      <input
                        type="range"
                        min="-40"
                        max="40"
                        value={config.iconOffsetX ?? 0}
                        onChange={e => updateConfig('iconOffsetX', parseInt(e.target.value, 10))}
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                        <span>Offset Y</span>
                        <span className="font-mono text-neutral-400">{config.iconOffsetY ?? 0}</span>
                      </div>
                      <input
                        type="range"
                        min="-40"
                        max="40"
                        value={config.iconOffsetY ?? 0}
                        onChange={e => updateConfig('iconOffsetY', parseInt(e.target.value, 10))}
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                        <span>Rotation</span>
                        <span className="font-mono text-neutral-400">{config.iconRotation ?? 0}°</span>
                      </div>
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        value={config.iconRotation ?? 0}
                        onChange={e => updateConfig('iconRotation', parseInt(e.target.value, 10))}
                        className="w-full accent-lime-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Borders & Effects */}
      {activeTab === 'effects' && (
        <div className="mt-4 space-y-5">
          {/* Border Width */}
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
              <span>Border Width</span>
              <span className="font-mono text-neutral-400">{config.borderWidth}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={config.borderWidth}
              onChange={e => updateConfig('borderWidth', parseInt(e.target.value, 10))}
              className="w-full accent-lime-400 cursor-pointer"
            />
          </div>

          {/* Border Color & Style */}
          {config.borderWidth > 0 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">Border Color</label>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="color"
                    value={config.borderColor}
                    onChange={e => updateConfig('borderColor', e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.borderColor}
                    onChange={e => updateConfig('borderColor', e.target.value)}
                    className="w-28 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {ACCENT_SWATCHES.map(s => (
                    <button
                      key={s.hex}
                      type="button"
                      onClick={() => updateConfig('borderColor', s.hex)}
                      title={s.label}
                      className={`h-6 w-6 rounded border transition-transform ${
                        config.borderColor.toLowerCase() === s.hex.toLowerCase()
                          ? 'border-lime-400 scale-110'
                          : 'border-neutral-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: s.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Border Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => updateConfig('borderStyle', 'solid')}
                    className={`rounded border py-1.5 text-xs ${
                      config.borderStyle === 'solid'
                        ? 'border-lime-400 bg-neutral-800 text-lime-400 font-medium'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    Solid
                  </button>
                  <button
                    type="button"
                    onClick={() => updateConfig('borderStyle', 'dashed')}
                    className={`rounded border py-1.5 text-xs ${
                      config.borderStyle === 'dashed'
                        ? 'border-lime-400 bg-neutral-800 text-lime-400 font-medium'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                    }`}
                  >
                    Dashed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shadow & Glow */}
          <div className="space-y-3 pt-2 border-t border-neutral-800">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-300 mb-1.5">
                <span>Glow / Shadow Blur</span>
                <span className="font-mono text-neutral-400">{config.shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={config.shadowBlur}
                onChange={e => updateConfig('shadowBlur', parseInt(e.target.value, 10))}
                className="w-full accent-lime-400 cursor-pointer"
              />
            </div>

            {config.shadowBlur > 0 && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Glow Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.shadowColor.startsWith('#') ? config.shadowColor : '#10b981'}
                    onChange={e => updateConfig('shadowColor', e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-neutral-700 bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={config.shadowColor}
                    onChange={e => updateConfig('shadowColor', e.target.value)}
                    className="w-40 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Corner Badge / Indicator */}
          <div className="space-y-3 pt-2 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300">Corner Indicator Badge</label>
              <button
                type="button"
                onClick={() => updateBadge('enabled', !config.cornerBadge?.enabled)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  config.cornerBadge?.enabled
                    ? 'bg-lime-400 text-neutral-950'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {config.cornerBadge?.enabled ? 'Active' : 'Disabled'}
              </button>
            </div>

            {config.cornerBadge?.enabled && (
              <div className="space-y-3 rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <div className="grid grid-cols-3 gap-2">
                  {(['dot', 'star', 'count'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateBadge('type', t)}
                      className={`rounded border py-1 text-xs capitalize ${
                        config.cornerBadge?.type === t
                          ? 'border-lime-400 bg-neutral-800 text-lime-400'
                          : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Badge Position</label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => updateBadge('position', p)}
                        className={`rounded border py-1 capitalize ${
                          config.cornerBadge?.position === p
                            ? 'border-lime-400 bg-neutral-800 text-lime-400'
                            : 'border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {p.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Badge Color</label>
                  <div className="flex flex-wrap gap-1.5">
                    {ACCENT_SWATCHES.map(s => (
                      <button
                        key={s.hex}
                        type="button"
                        onClick={() => updateBadge('color', s.hex)}
                        className={`h-5 w-5 rounded border ${
                          config.cornerBadge?.color === s.hex ? 'border-white scale-110' : 'border-neutral-700'
                        }`}
                        style={{ backgroundColor: s.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
