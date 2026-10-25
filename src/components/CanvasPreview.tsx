import React, { useRef, useEffect, useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Grid3X3, 
  Sparkles, 
  RotateCcw, 
  Undo2, 
  Redo2, 
  Check, 
  Radio, 
  Layers, 
  Maximize2,
  Download
} from 'lucide-react';
import { IconConfig } from '../types/icon';
import { renderIconToCanvas, generatePngDataUrl } from '../utils/canvasRenderer';
import { downloadBlob } from '../utils/zipExporter';
import { generatePngBlob } from '../utils/canvasRenderer';

interface CanvasPreviewProps {
  config: IconConfig;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onRandomize: () => void;
  onOpenExport: () => void;
}

export const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  config,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onRandomize,
  onOpenExport
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showCheckerboard, setShowCheckerboard] = useState<boolean>(true);

  // Render on config change
  useEffect(() => {
    if (canvasRef.current) {
      renderIconToCanvas(canvasRef.current, config, 512);
    }
  }, [config]);

  const handleQuickDownload = async () => {
    const blob = await generatePngBlob(config, 256);
    downloadBlob(blob, 'iconmint-256x256.png');
  };

  return (
    <div className="flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 sm:p-5">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-3.5">
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <span className="font-semibold text-neutral-200">Master Canvas</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums text-neutral-400">512 × 512 px</span>
        </div>

        {/* Action button cluster */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Redo2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onRandomize}
            title="Generate Random Aesthetic Icon"
            className="flex h-8 items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2.5 text-xs font-medium text-neutral-200 transition-colors hover:border-lime-500/50 hover:text-lime-400"
          >
            <Sparkles className="h-3.5 w-3.5 text-lime-400" />
            <span>Randomize</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            title="Reset to default"
            className="flex h-8 items-center gap-1 rounded-md border border-neutral-800 bg-neutral-950 px-2 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative my-4 flex min-h-[340px] items-center justify-center overflow-hidden rounded-lg border border-neutral-800/60 bg-neutral-950 p-6">
        {/* Background checkerboard layer if enabled */}
        <div 
          className={`absolute inset-0 transition-opacity ${showCheckerboard ? 'bg-checkerboard opacity-100' : 'bg-neutral-950 opacity-100'}`}
        />

        {/* Canvas container with zoom transform */}
        <div 
          className="relative transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas
            ref={canvasRef}
            className="h-64 w-64 rounded-md shadow-2xl ring-1 ring-white/10 sm:h-72 sm:w-72"
          />

          {/* Optional Grid overlay */}
          {showGrid && (
            <div className="pointer-events-none absolute inset-0 rounded-md border border-dashed border-lime-400/30">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-lime-400/25"></div>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-r border-lime-400/25"></div>
              <div className="absolute inset-4 rounded-full border border-lime-400/20"></div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Canvas Controls Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* View toggles */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCheckerboard(!showCheckerboard)}
            title="Toggle transparency checkerboard"
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors ${
              showCheckerboard 
                ? 'border-neutral-700 bg-neutral-800 text-neutral-100' 
                : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Checkerboard</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle alignment guides"
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors ${
              showGrid 
                ? 'border-lime-500/50 bg-neutral-800 text-lime-400' 
                : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            <span>Guides</span>
          </button>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 rounded-md border border-neutral-800 bg-neutral-950 p-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
              disabled={zoomLevel <= 0.75}
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:text-white disabled:opacity-30"
              title="Zoom out"
            >
              <ZoomOut className="h-3 w-3" />
            </button>
            <span className="px-1 text-[11px] font-mono tabular-nums text-neutral-300">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(1.5, prev + 0.25))}
              disabled={zoomLevel >= 1.5}
              className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:text-white disabled:opacity-30"
              title="Zoom in"
            >
              <ZoomIn className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Quick Export */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleQuickDownload}
            className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
            title="Download single high-res PNG"
          >
            <Download className="h-3.5 w-3.5 text-lime-400" />
            <span>Download 256px PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
