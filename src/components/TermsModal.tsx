import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-lime-400" />
            <h2 className="text-base font-bold text-white">Terms and Conditions</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs leading-relaxed text-neutral-300">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">1. Acceptance of Terms</h3>
            <p>
              By accessing and using IconMint, you agree to these Terms and Conditions. IconMint is an open, client-side utility provided free of charge for creating favicons and digital application icons.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">2. Ownership and Intellectual Property of Created Icons</h3>
            <p>
              You own full rights to the favicons, images, and configuration bundles you produce using IconMint. You are granted an unconditional, perpetual, worldwide right to use your generated assets for both personal and commercial projects without attribution, licensing fees, or royalties.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">3. Third-Party Icon Assets</h3>
            <p>
              Vector icons included in the icon library are based on the Lucide icon set, released under the permissive ISC license. You are free to incorporate these symbols into your software and websites.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">4. Disclaimer of Warranty</h3>
            <p>
              IconMint is provided as is, without warranty of any kind, express or implied. In no event shall the authors or contributors be liable for any damages arising out of the use or inability to use this tool.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">5. Acceptable Use</h3>
            <p>
              You agree not to use IconMint to generate content that promotes unlawful activities, infringes upon existing trademarks, or violates applicable local and international copyright regulations.
            </p>
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
