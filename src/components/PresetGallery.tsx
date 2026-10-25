import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Sparkles, Filter } from 'lucide-react';
import { PresetItem, IconConfig } from '../types/icon';
import { PRESETS } from '../data/presets';
import { renderIconToCanvas } from '../utils/canvasRenderer';

interface PresetGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetItem) => void;
  currentConfig: IconConfig;
}

const PresetThumbnail: React.FC<{ preset: PresetItem; active: boolean; onSelect: () => void }> = ({
  preset,
  active,
  onSelect
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderIconToCanvas(canvasRef.current, preset.config as IconConfig, 128);
    }
  }, [preset]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex flex-col items-center rounded-xl border p-3.5 text-center transition-all ${
        active
          ? 'border-lime-400 bg-neutral-900 shadow-lg shadow-lime-950/20'
          : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 hover:bg-neutral-900/60'
      }`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-neutral-900/80 p-2 mb-3 shadow-inner">
        <canvas ref={canvasRef} className="h-16 w-16 rounded" />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-center gap-1.5">
          <span className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
            {preset.name}
          </span>
          {active && <Check className="h-3.5 w-3.5 text-lime-400 shrink-0" />}
        </div>
        <div className="mt-0.5 text-[10px] text-neutral-400">{preset.category}</div>
      </div>
    </button>
  );
};

export const PresetGallery: React.FC<PresetGalleryProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentConfig
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Tech', 'Monogram', 'Creative', 'Minimal', 'Security'];

  const filteredPresets = selectedCategory === 'All'
    ? PRESETS
    : PRESETS.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-lime-400" />
              <span>Preset Library</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Curated, production-tested favicon styles. Click to load instantly into your workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 border-b border-neutral-800 px-6 py-3">
          <Filter className="h-3.5 w-3.5 text-neutral-500" />
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-lime-400 border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredPresets.map(preset => {
              const isActive = preset.name === (currentConfig as any).presetName;
              return (
                <PresetThumbnail
                  key={preset.id}
                  preset={preset}
                  active={isActive}
                  onSelect={() => {
                    onSelectPreset(preset);
                    onClose();
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-6 py-3 bg-neutral-900/40">
          <span className="text-xs text-neutral-400">
            {filteredPresets.length} presets available
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-neutral-800 px-4 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
