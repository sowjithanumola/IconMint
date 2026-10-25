import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-lime-400" />
            <h2 className="text-base font-bold text-white">Privacy Policy</h2>
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
            <h3 className="text-sm font-semibold text-white mb-1">1. Complete Client-Side Processing</h3>
            <p>
              IconMint operates entirely inside your local web browser. Every image rendering computation, vector path calculation, and ZIP archive creation happens on your personal device using standard HTML5 Canvas and Web APIs. No graphics, uploaded files, or icon configurations are ever transmitted to external servers.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">2. Local Storage Autosave</h3>
            <p>
              To ensure you never lose your creative work upon page reload, IconMint stores your active editor configuration inside your browser local storage under the key <code className="font-mono text-lime-400">iconmint_state_v1</code>. This data stays on your machine and is never shared with third parties. You can clear this anytime using the Reset control or clearing your browser site data.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">3. Zero Tracking and Zero Cookies</h3>
            <p>
              IconMint does not use tracking cookies, analytics pixels, or third-party behavioral scripts. We believe in privacy by design. We do not sell, rent, or monetize your personal data or creations.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">4. Uploaded Asset Handling</h3>
            <p>
              When you upload custom SVG or PNG files into the editor, they are read directly into memory via the FileReader API as base64 data strings. They never leave your browser sandbox.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-1">5. Policy Updates</h3>
            <p>
              Any future adjustments to this policy will be reflected on this page. Effective date: October 2026.
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
