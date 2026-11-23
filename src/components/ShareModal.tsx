import React, { useState } from 'react';
import { CandidateResume } from '../types';
import { Copy, Check, Share2, Globe, ShieldCheck, X, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  candidate: CandidateResume;
  isOpen: boolean;
  onClose: () => void;
  onOpenPublicPreview: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onOpenPublicPreview,
}) => {
  const [copied, setCopied] = useState(false);
  const [allowPublicChat, setAllowPublicChat] = useState(true);
  const [requireRecruiterEmail, setRequireRecruiterEmail] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://interviewlm.dev';
  const shareUrl = `${origin}?candidate=${candidate.id}&view=public`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Shareable Resume AI Link
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Allow recruiters to chat with {candidate.name}&apos;s grounded AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Public InterviewLM URL
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                <Globe className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                <span className="truncate">{shareUrl}</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Privacy & Guardrails */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              NotebookLM Grounding & Privacy Guardrails
            </h4>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-medium text-slate-900 dark:text-slate-200">
                  Allow Recruiter Q&A Chat
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Visitors can ask questions strictly grounded in your resume
                </div>
              </div>
              <input
                type="checkbox"
                checked={allowPublicChat}
                onChange={(e) => setAllowPublicChat(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 cursor-pointer">
              <div>
                <div className="text-xs font-medium text-slate-900 dark:text-slate-200">
                  Require Recruiter Work Email
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ask recruiters to introduce themselves before chatting
                </div>
              </div>
              <input
                type="checkbox"
                checked={requireRecruiterEmail}
                onChange={(e) => setRequireRecruiterEmail(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </label>
          </div>

          <div className="p-3.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
            <div className="font-semibold">Anti-Hallucination Guarantee Active</div>
            <p className="text-[11px] leading-relaxed opacity-90">
              When recruiters chat with this link, the AI is constrained by strict RAG. If asked about technologies, dates, or metrics not on {candidate.name}&apos;s resume, it explicitly clarifies that the information is absent.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => {
              onClose();
              onOpenPublicPreview();
            }}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Preview</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
