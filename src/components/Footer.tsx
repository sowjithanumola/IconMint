import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenPresets: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenPresets
}) => {
  return (
    <footer className="mt-12 border-t border-neutral-800 bg-neutral-950 py-6 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand info */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-neutral-900 border border-neutral-800">
              <span className="h-2 w-2 rounded-sm bg-lime-400"></span>
            </div>
            <span className="text-xs font-semibold text-neutral-200">
              IconMint Studio
            </span>
            <span className="text-xs text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">
              Free, browser-based icon creator
            </span>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <button
              type="button"
              onClick={onOpenPresets}
              className="hover:text-white transition-colors"
            >
              Presets
            </button>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
