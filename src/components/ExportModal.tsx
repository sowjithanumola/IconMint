import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Archive, 
  FileCode, 
  Check, 
  Copy, 
  Code, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { IconConfig } from '../types/icon';
import { generatePngBlob } from '../utils/canvasRenderer';
import { generateIcoBlob } from '../utils/icoGenerator';
import { createFaviconZipBundle, downloadBlob } from '../utils/zipExporter';
import { generateSvgString } from '../utils/svgExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: IconConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, config }) => {
  const [copiedHtml, setCopiedHtml] = useState<boolean>(false);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [isGeneratingZip, setIsGeneratingZip] = useState<boolean>(false);
  const [appName, setAppName] = useState<string>('My Web App');

  if (!isOpen) return null;

  const SIZES = [
    { size: 16, name: 'favicon-16x16.png', label: '16 × 16 px', desc: 'Standard browser tab' },
    { size: 32, name: 'favicon-32x32.png', label: '32 × 32 px', desc: 'Retina tab & taskbar' },
    { size: 48, name: 'favicon-48x48.png', label: '48 × 48 px', desc: 'Windows tile & desktop' },
    { size: 128, name: 'icon-128x128.png', label: '128 × 128 px', desc: 'Chrome Web Store & dock' },
    { size: 180, name: 'apple-touch-icon.png', label: '180 × 180 px', desc: 'Apple iOS touch bookmark' },
    { size: 256, name: 'icon-256x256.png', label: '256 × 256 px', desc: 'High-resolution app icon' }
  ];

  const handleDownloadSinglePng = async (size: number, filename: string) => {
    const blob = await generatePngBlob(config, size);
    downloadBlob(blob, filename);
  };

  const handleDownloadIco = async () => {
    const blob = await generateIcoBlob(config, [16, 32, 48]);
    downloadBlob(blob, 'favicon.ico');
  };

  const handleDownloadSvg = () => {
    const svgContent = generateSvgString(config, 512);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, 'favicon.svg');
  };

  const handleDownloadZip = async () => {
    setIsGeneratingZip(true);
    try {
      const zipBlob = await createFaviconZipBundle(config, appName);
      downloadBlob(zipBlob, 'iconmint-favicon-bundle.zip');
    } catch (err) {
      console.error('Failed to create zip bundle', err);
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const htmlSnippet = `<!-- Favicon & Touch Icons -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${config.bgColor || '#09090b'}">`;

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleCopySvg = () => {
    const svgContent = generateSvgString(config, 512);
    navigator.clipboard.writeText(svgContent);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Download className="h-4 w-4 text-lime-400" />
              <span>Export Production Package</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Download individual formats or generate the full multi-resolution production ZIP bundle.
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

        {/* Body content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Hero Zip Export Banner */}
          <div className="rounded-xl border border-lime-500/40 bg-neutral-900 p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-lime-400" />
                  <h3 className="text-sm font-bold text-white">Full Web Package (.ZIP)</h3>
                </div>
                <p className="mt-1 text-xs text-neutral-400 max-w-md">
                  Includes multi-resolution favicon.ico, 16/32/48/180/192/512px PNGs, site.webmanifest, and HTML setup code.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={isGeneratingZip}
                className="flex items-center justify-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-xs font-bold text-neutral-950 transition-colors hover:bg-lime-300 disabled:opacity-50 shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>{isGeneratingZip ? 'Generating Bundle...' : 'Download Favicon Pack (.ZIP)'}</span>
              </button>
            </div>
          </div>

          {/* Individual PNG Exports */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Individual PNG Formats
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {SIZES.map(item => (
                <div
                  key={item.size}
                  className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-2.5 hover:border-neutral-700"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-mono text-xs font-semibold text-neutral-200">{item.label}</div>
                    <div className="text-[10px] text-neutral-400 truncate">{item.desc}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadSinglePng(item.size, item.name)}
                    className="flex h-7 items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2 text-[11px] font-medium text-neutral-200 hover:border-lime-500/50 hover:text-lime-400 shrink-0"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Special Formats: ICO & SVG */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              Specialized Formats
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Windows Favicon (.ICO)</div>
                  <div className="text-[10px] text-neutral-400">16px + 32px + 48px multi-resolution container</div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadIco}
                  className="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:border-lime-400 hover:text-lime-400"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>.ICO File</span>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
                <div>
                  <div className="text-xs font-semibold text-neutral-200">Vector Format (.SVG)</div>
                  <div className="text-[10px] text-neutral-400">Scalable vector markup</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleCopySvg}
                    className="flex items-center gap-1 rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs text-neutral-300 hover:text-white"
                    title="Copy SVG"
                  >
                    {copiedSvg ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSvg}
                    className="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-2.5 py-1.5 text-xs font-medium text-neutral-200 hover:border-lime-400 hover:text-lime-400"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>.SVG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* HTML Embed Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300">HTML &lt;head&gt; Integration Snippet</span>
              <button
                type="button"
                onClick={handleCopyHtml}
                className="flex items-center gap-1 text-xs font-medium text-lime-400 hover:underline"
              >
                {copiedHtml ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 p-3 font-mono text-xs text-neutral-300">
              {htmlSnippet}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-neutral-800 px-6 py-3 bg-neutral-900/40">
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
