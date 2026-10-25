import React, { useEffect, useState } from 'react';
import { Download, Monitor, Smartphone, Search, X, Volume2, Plus, Globe } from 'lucide-react';
import { IconConfig } from '../types/icon';
import { generatePngDataUrl, generatePngBlob } from '../utils/canvasRenderer';
import { downloadBlob } from '../utils/zipExporter';

interface PreviewMatrixProps {
  config: IconConfig;
  onOpenExport: () => void;
}

export const PreviewMatrix: React.FC<PreviewMatrixProps> = ({ config, onOpenExport }) => {
  const [dataUrls, setDataUrls] = useState<Record<number, string>>({});
  const [previewTab, setPreviewTab] = useState<'tabs' | 'mobile' | 'search'>('tabs');
  const [tabTheme, setTabTheme] = useState<'dark' | 'light'>('dark');

  const SIZES = [
    { size: 16, label: '16 × 16', desc: 'Browser Tab' },
    { size: 32, label: '32 × 32', desc: 'Retina Tab / Taskbar' },
    { size: 48, label: '48 × 48', desc: 'Desktop Shortcut' },
    { size: 64, label: '64 × 64', desc: 'Bookmarks' },
    { size: 128, label: '128 × 128', desc: 'Dock / Store' },
    { size: 256, label: '256 × 256', desc: 'High-Res App' }
  ];

  useEffect(() => {
    let isCancelled = false;
    const generateAll = async () => {
      const results: Record<number, string> = {};
      for (const item of SIZES) {
        results[item.size] = await generatePngDataUrl(config, item.size);
      }
      if (!isCancelled) {
        setDataUrls(results);
      }
    };
    generateAll();
    return () => {
      isCancelled = true;
    };
  }, [config]);

  const handleDownloadSize = async (size: number) => {
    const blob = await generatePngBlob(config, size);
    downloadBlob(blob, `favicon-${size}x${size}.png`);
  };

  return (
    <div id="previews" className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white">Live Real-World Previews</h2>
          <p className="text-xs text-neutral-400">Crisp sub-pixel rendering across browser tabs and platforms</p>
        </div>

        {/* Mockup switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-neutral-800 bg-neutral-950 p-1">
          <button
            type="button"
            onClick={() => setPreviewTab('tabs')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              previewTab === 'tabs' ? 'bg-neutral-800 text-lime-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Browser Tab</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab('mobile')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              previewTab === 'mobile' ? 'bg-neutral-800 text-lime-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile Dock</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab('search')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              previewTab === 'search' ? 'bg-neutral-800 text-lime-400' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Google Search</span>
          </button>
        </div>
      </div>

      {/* Mockup Display Area */}
      <div className="my-4">
        {previewTab === 'tabs' && (
          <div className="space-y-3">
            {/* Theme toggle */}
            <div className="flex items-center justify-end gap-2 text-xs">
              <span className="text-neutral-400">Tab Bar Theme:</span>
              <button
                type="button"
                onClick={() => setTabTheme('dark')}
                className={`rounded px-2 py-0.5 font-medium ${
                  tabTheme === 'dark' ? 'bg-neutral-800 text-lime-400' : 'text-neutral-500'
                }`}
              >
                Dark
              </button>
              <button
                type="button"
                onClick={() => setTabTheme('light')}
                className={`rounded px-2 py-0.5 font-medium ${
                  tabTheme === 'light' ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
                }`}
              >
                Light
              </button>
            </div>

            {/* Browser Window Mockup */}
            <div
              className={`overflow-hidden rounded-lg border transition-colors ${
                tabTheme === 'dark'
                  ? 'border-neutral-800 bg-neutral-950 text-neutral-200'
                  : 'border-neutral-300 bg-neutral-100 text-neutral-800'
              }`}
            >
              {/* Tab Bar Header */}
              <div
                className={`flex items-center gap-2 border-b px-3 pt-2.5 ${
                  tabTheme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-300 bg-neutral-200'
                }`}
              >
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5 pr-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                </div>

                {/* Active Tab */}
                <div
                  className={`flex max-w-[200px] items-center gap-2 rounded-t-lg border-t border-x px-3 py-1.5 text-xs font-medium shadow-sm ${
                    tabTheme === 'dark'
                      ? 'border-neutral-800 bg-neutral-950 text-white'
                      : 'border-neutral-300 bg-white text-neutral-900'
                  }`}
                >
                  {dataUrls[16] ? (
                    <img
                      src={dataUrls[16]}
                      alt="Active Tab Favicon"
                      className="h-4 w-4 shrink-0 rounded-sm"
                    />
                  ) : (
                    <div className="h-4 w-4 rounded-sm bg-neutral-700"></div>
                  )}
                  <span className="truncate">IconMint Studio</span>
                  <X className="h-3 w-3 shrink-0 opacity-60 hover:opacity-100" />
                </div>

                {/* Inactive Tab */}
                <div
                  className={`hidden sm:flex max-w-[160px] items-center gap-2 px-3 py-1.5 text-xs opacity-60 ${
                    tabTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">GitHub - Project</span>
                </div>

                <Plus className="h-3.5 w-3.5 opacity-40 hover:opacity-100" />
              </div>

              {/* URL Address Bar */}
              <div
                className={`flex items-center gap-3 px-4 py-2 border-b ${
                  tabTheme === 'dark' ? 'border-neutral-800/80 bg-neutral-950' : 'border-neutral-300/80 bg-white'
                }`}
              >
                <div
                  className={`flex flex-1 items-center gap-2 rounded-md px-3 py-1 text-xs font-mono ${
                    tabTheme === 'dark' ? 'bg-neutral-900 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  <span className="text-lime-500">https://</span>
                  <span>iconmint.dev/workspace</span>
                </div>
              </div>

              {/* Viewport Content Stub */}
              <div className="p-6 text-center">
                <p className="text-xs text-neutral-400">
                  Simulated 16×16px tab icon rendering in desktop browser environment
                </p>
              </div>
            </div>
          </div>
        )}

        {previewTab === 'mobile' && (
          <div className="flex justify-center p-4">
            {/* Phone Screen Mockup */}
            <div className="w-64 rounded-2xl border-4 border-neutral-800 bg-neutral-950 p-4 shadow-xl">
              <div className="mx-auto mb-4 h-3.5 w-20 rounded-full bg-neutral-800"></div>
              <div className="text-[10px] font-mono text-center text-neutral-500 mb-6">9:41</div>

              {/* App Icon Grid */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 p-1 shadow-md">
                    {dataUrls[128] ? (
                      <img src={dataUrls[128]} alt="Mobile App Icon" className="h-12 w-12 rounded-lg" />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-neutral-800"></div>
                    )}
                  </div>
                  <span className="text-[11px] font-medium text-neutral-300 truncate w-16">IconMint</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-40">
                  <div className="h-14 w-14 rounded-xl bg-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-400">
                    Maps
                  </div>
                  <span className="text-[11px] text-neutral-400">Maps</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 opacity-40">
                  <div className="h-14 w-14 rounded-xl bg-neutral-800 flex items-center justify-center text-xs font-mono text-neutral-400">
                    Mail
                  </div>
                  <span className="text-[11px] text-neutral-400">Mail</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {previewTab === 'search' && (
          <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800">
                  {dataUrls[16] ? (
                    <img src={dataUrls[16]} alt="Search Favicon" className="h-3.5 w-3.5 rounded-sm" />
                  ) : null}
                </div>
                <div className="text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-200">IconMint</span>
                  <span className="text-neutral-500 ml-1">· https://iconmint.dev</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-sky-400 hover:underline cursor-pointer">
                IconMint: Professional Browser Favicon Creator
              </h3>
              <p className="text-xs text-neutral-400 max-w-lg">
                Create sharp, high-resolution favicon packages with custom shapes, monograms, vector graphics, and instant ZIP exports directly in your browser.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Multiple Size Matrix Grid */}
      <div className="mt-4 border-t border-neutral-800 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-neutral-300">Standard Export Matrix</span>
          <button
            type="button"
            onClick={onOpenExport}
            className="text-xs font-medium text-lime-400 hover:underline"
          >
            Open Full Export Dialog
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {SIZES.map(item => (
            <div
              key={item.size}
              className="flex flex-col items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-center transition-colors hover:border-neutral-700"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded bg-neutral-900 border border-neutral-800/80 p-1 mb-2">
                {dataUrls[item.size] ? (
                  <img
                    src={dataUrls[item.size]}
                    alt={`${item.size}px preview`}
                    style={{
                      width: Math.min(item.size, 48),
                      height: Math.min(item.size, 48),
                      imageRendering: item.size <= 32 ? 'pixelated' : 'auto'
                    }}
                  />
                ) : (
                  <div className="h-6 w-6 rounded bg-neutral-800 animate-pulse"></div>
                )}
              </div>

              <div className="w-full">
                <div className="font-mono text-xs font-bold text-neutral-200">{item.label}</div>
                <div className="text-[10px] text-neutral-500 truncate mb-2">{item.desc}</div>

                <button
                  type="button"
                  onClick={() => handleDownloadSize(item.size)}
                  className="flex w-full items-center justify-center gap-1 rounded border border-neutral-800 bg-neutral-900 py-1 text-[11px] font-medium text-neutral-300 hover:border-lime-500/50 hover:text-lime-400 transition-colors"
                >
                  <Download className="h-3 w-3" />
                  <span>PNG</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
