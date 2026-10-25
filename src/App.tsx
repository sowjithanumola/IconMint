/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CanvasPreview } from './components/CanvasPreview';
import { EditorControls } from './components/EditorControls';
import { PreviewMatrix } from './components/PreviewMatrix';
import { PresetGallery } from './components/PresetGallery';
import { ExportModal } from './components/ExportModal';
import { PrivacyModal } from './components/PrivacyModal';
import { TermsModal } from './components/TermsModal';
import { Footer } from './components/Footer';
import { IconConfig, PresetItem } from './types/icon';
import { DEFAULT_CONFIG } from './data/presets';
import { generateRandomIconConfig } from './utils/randomizer';

const STORAGE_KEY = 'iconmint_state_v1';

export default function App() {
  // Load saved config or default
  const [config, setConfig] = useState<IconConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return DEFAULT_CONFIG as IconConfig;
  });

  // History stack for Undo / Redo
  const [history, setHistory] = useState<IconConfig[]>([config]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Modals state
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);

  // Autosave to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [config]);

  // Handler to push updates to history
  const handleConfigChange = useCallback((updater: (prev: IconConfig) => IconConfig) => {
    setConfig(prev => {
      const next = updater(prev);
      setHistory(hPrev => {
        const sliced = hPrev.slice(0, historyIndex + 1);
        return [...sliced, next];
      });
      setHistoryIndex(iPrev => iPrev + 1);
      return next;
    });
  }, [historyIndex]);

  // Undo / Redo handlers
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setConfig(history[prevIndex]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setConfig(history[nextIndex]);
    }
  }, [history, historyIndex]);

  // Reset to default
  const handleReset = () => {
    handleConfigChange(() => DEFAULT_CONFIG as IconConfig);
  };

  // Randomize generator
  const handleRandomize = () => {
    const randomConfig = generateRandomIconConfig();
    handleConfigChange(() => randomConfig);
  };

  // Select Preset
  const handleSelectPreset = (preset: PresetItem) => {
    handleConfigChange(prev => ({
      ...prev,
      ...preset.config,
      presetName: preset.name
    } as IconConfig));
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        e.preventDefault();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        handleRedo();
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Top Bar Header */}
      <Header
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onRandomize={handleRandomize}
      />

      {/* Main Workspace Area Centered */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center space-y-6">
        {/* Workspace Intro Kicker Centered */}
        <div className="w-full text-center max-w-2xl mx-auto space-y-2 py-3 border-b border-neutral-800/80">
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <span>Icon Design Studio</span>
            <span aria-hidden="true">·</span>
            <span className="text-lime-400">100% Client-Side</span>
            <span aria-hidden="true">·</span>
            <span>Zero API Dependencies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Create Production-Grade Icons
          </h1>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPresetsOpen(true)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3.5 py-1.5 text-xs font-semibold text-neutral-200 transition-colors hover:border-neutral-700 hover:text-white"
            >
              Browse 20+ Presets
            </button>
            <button
              type="button"
              onClick={() => setIsExportOpen(true)}
              className="rounded-lg bg-lime-400 px-3.5 py-1.5 text-xs font-bold text-neutral-950 transition-colors hover:bg-lime-300"
            >
              Export Suite
            </button>
          </div>
        </div>

        {/* 2-Column Workstation Grid Centered and Balanced */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-center">
          {/* Left Column: Interactive Canvas & Actions */}
          <div className="w-full space-y-6">
            <CanvasPreview
              config={config}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < history.length - 1}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onReset={handleReset}
              onRandomize={handleRandomize}
              onOpenExport={() => setIsExportOpen(true)}
            />
          </div>

          {/* Right Column: Workstation Controls */}
          <div className="w-full">
            <EditorControls
              config={config}
              onChange={handleConfigChange}
            />
          </div>
        </div>

        {/* Full-Width Real-World Previews & Resolution Grid */}
        <div className="w-full">
          <PreviewMatrix
            config={config}
            onOpenExport={() => setIsExportOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        config={config}
      />

      <PresetGallery
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
        currentConfig={config}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
}
