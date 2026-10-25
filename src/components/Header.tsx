import React from 'react';
import { Download, Sparkles, Globe, Shield, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenExport: () => void;
  onOpenPresets: () => void;
  onRandomize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExport,
  onOpenPresets,
  onRandomize
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-700 shadow-sm">
            <span className="h-3.5 w-3.5 rounded-sm bg-lime-400"></span>
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Icon<span className="text-lime-400">Mint</span>
          </span>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <button 
            type="button" 
            onClick={onOpenPresets}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-left"
          >
            Presets Gallery
          </button>
          <a 
            href="#previews" 
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Tab Previews
          </a>
          <button 
            type="button" 
            onClick={onRandomize}
            className="flex items-center gap-1.5 hover:text-lime-400 transition-colors whitespace-nowrap shrink-0 text-left"
          >
            <Sparkles className="h-3.5 w-3.5 text-lime-400" />
            <span>Randomize</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-lg bg-lime-400 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400/50 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5 text-neutral-950" />
            <span>Export Icon Pack</span>
          </button>
        </div>
      </div>
    </header>
  );
};
