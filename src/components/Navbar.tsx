import React from 'react';
import { CandidateResume } from '../types';
import { Share2, Moon, Sun, Sparkles, UserCheck, Briefcase } from 'lucide-react';

interface NavbarProps {
  currentView: 'recruiter-chat' | 'recruiter-match' | 'jobseeker-interview' | 'jobseeker-coach';
  onSelectView: (view: 'recruiter-chat' | 'recruiter-match' | 'jobseeker-interview' | 'jobseeker-coach') => void;
  activeCandidate: CandidateResume;
  onOpenShareModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isPublicMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  activeCandidate,
  onOpenShareModal,
  darkMode,
  onToggleDarkMode,
  isPublicMode = false,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
            ILM
          </span>
          <span>InterviewLM</span>
        </a>
        <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
          Grounded Resume RAG
        </span>
      </div>

      {/* Zone 2: Navigation Links (4-5 single line labels with active state) */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <button
          onClick={() => onSelectView('recruiter-chat')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer pb-0.5 ${
            currentView === 'recruiter-chat'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-bold'
              : ''
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Recruiter Chat</span>
        </button>

        <button
          onClick={() => onSelectView('jobseeker-interview')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer pb-0.5 ${
            currentView === 'jobseeker-interview'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-bold'
              : ''
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Mock Interview</span>
        </button>

        <button
          onClick={() => onSelectView('recruiter-match')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer pb-0.5 ${
            currentView === 'recruiter-match'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-bold'
              : ''
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Job Fit Screener</span>
        </button>

        <button
          onClick={() => onSelectView('jobseeker-coach')}
          className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer pb-0.5 ${
            currentView === 'jobseeker-coach'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-bold'
              : ''
          }`}
        >
          <span>Candidate Coach</span>
        </button>
      </nav>

      {/* Zone 3: Primary Action & Theme Toggle */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Active Candidate Badge */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {activeCandidate.name.split(' ')[0]}
          </span>
          <span>·</span>
          <span className="truncate max-w-[120px] font-mono text-[11px]">
            {activeCandidate.headline.split('|')[0].trim()}
          </span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={onOpenShareModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Resume AI</span>
        </button>
      </div>
    </header>
  );
};
