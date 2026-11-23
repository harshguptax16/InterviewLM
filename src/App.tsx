import React, { useState, useEffect } from 'react';
import { CandidateResume, Citation, ComprehensiveReport, InterviewSession } from './types';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { extractTextFromPdf, parseRawResumeToSections } from './utils/pdfExtractor';
import { Navbar } from './components/Navbar';
import { ResumeViewer } from './components/ResumeViewer';
import { RecruiterChat } from './components/RecruiterChat';
import { RecruiterFitAnalysis } from './components/RecruiterFitAnalysis';
import { MockInterviewSession } from './components/MockInterviewSession';
import { CandidateResumeCoach } from './components/CandidateResumeCoach';
import { FeedbackReportModal } from './components/FeedbackReportModal';
import { ShareModal } from './components/ShareModal';
import { Briefcase, UserCheck, Sparkles, MessageSquare, PanelLeftClose, PanelLeft, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [candidates, setCandidates] = useState<CandidateResume[]>(SAMPLE_RESUMES);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('elena-rostova');
  const [currentView, setCurrentView] = useState<'recruiter-chat' | 'recruiter-match' | 'jobseeker-interview' | 'jobseeker-coach'>('recruiter-chat');
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<{ report: ComprehensiveReport; session: InterviewSession } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isViewerCollapsed, setIsViewerCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isPublicMode, setIsPublicMode] = useState(false);

  // Sync theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Check URL parameters for shared public profile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const candParam = params.get('candidate');
      const viewParam = params.get('view');
      if (candParam) {
        const found = candidates.find((c) => c.id === candParam);
        if (found) {
          setActiveCandidateId(candParam);
        }
      }
      if (viewParam === 'public') {
        setIsPublicMode(true);
        setCurrentView('recruiter-chat');
      }
    }
  }, [candidates]);

  const activeCandidate = candidates.find((c) => c.id === activeCandidateId) || candidates[0];

  // Handle PDF or text file upload
  const handleUploadPdf = async (file: File) => {
    setIsUploading(true);
    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const { rawText, pages } = await extractTextFromPdf(file);
        const parsed = parseRawResumeToSections(rawText, file.name, pages);
        setCandidates((prev) => [parsed, ...prev]);
        setActiveCandidateId(parsed.id);
      } else {
        // Plain text or markdown
        const text = await file.text();
        const parsed = parseRawResumeToSections(text, file.name, [
          { pageNumber: 1, text },
        ]);
        setCandidates((prev) => [parsed, ...prev]);
        setActiveCandidateId(parsed.id);
      }
    } catch (err) {
      console.error('File parsing error:', err);
      alert('Could not parse PDF file directly. Please check file formatting or try a text version.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCitationClick = (citation: Citation) => {
    setActiveCitation(citation);
    if (isViewerCollapsed) {
      setIsViewerCollapsed(false);
    }
  };

  const handleOpenReport = (report: ComprehensiveReport, session: InterviewSession) => {
    setReportModalData({ report, session });
  };

  // Determine active primary role tab
  const isRecruiterInterface = currentView === 'recruiter-chat' || currentView === 'recruiter-match';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        activeCandidate={activeCandidate}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isPublicMode={isPublicMode}
      />

      {/* Interface Mode Bar & Toolbar */}
      <div className="px-6 py-2.5 bg-white dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Segmented Interface Selector (Recruiter Mode vs Job Seeker Mode) */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setCurrentView('recruiter-chat')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                isRecruiterInterface
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Recruiter Interface</span>
            </button>
            <button
              onClick={() => setCurrentView('jobseeker-interview')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                !isRecruiterInterface
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Job Seeker Interface</span>
            </button>
          </div>

          {/* Sub-view Secondary Tabs */}
          {isRecruiterInterface ? (
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
              <button
                onClick={() => setCurrentView('recruiter-chat')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  currentView === 'recruiter-chat'
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Grounded Q&amp;A Chat
              </button>
              <button
                onClick={() => setCurrentView('recruiter-match')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  currentView === 'recruiter-match'
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Job Description Matcher
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
              <button
                onClick={() => setCurrentView('jobseeker-interview')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  currentView === 'jobseeker-interview'
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Mock Interview Lab
              </button>
              <button
                onClick={() => setCurrentView('jobseeker-coach')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                  currentView === 'jobseeker-coach'
                    ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Resume Coach &amp; Gap Explorer
              </button>
            </div>
          )}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Grounding Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>2-Way Grounding Enforced</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hallucinations</span>
          </div>

          {/* Toggle Document Viewer Pane Button */}
          <button
            onClick={() => setIsViewerCollapsed(!isViewerCollapsed)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
            title={isViewerCollapsed ? 'Expand Source Document Pane' : 'Collapse Source Document Pane'}
          >
            {isViewerCollapsed ? (
              <>
                <PanelLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Show Resume Pane</span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span className="hidden sm:inline">Hide Resume Pane</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: NotebookLM-style Source Document Viewer */}
        <div
          className={`h-full transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 ${
            isViewerCollapsed
              ? 'w-0 opacity-0 pointer-events-none'
              : 'w-full md:w-[38%] lg:w-[36%] xl:w-[34%] min-w-[320px] max-w-[500px]'
          }`}
        >
          <ResumeViewer
            candidate={activeCandidate}
            activeCitation={activeCitation}
            onSelectCandidate={setActiveCandidateId}
            allCandidates={candidates}
            onUploadPdf={handleUploadPdf}
            isUploading={isUploading}
          />
        </div>

        {/* Right: Interactive Viewport (Recruiter Q&A, Job Match, Mock Interview, or Resume Coach) */}
        <main className="flex-1 h-full overflow-hidden bg-white dark:bg-slate-900">
          {currentView === 'recruiter-chat' && (
            <RecruiterChat
              candidate={activeCandidate}
              onCitationClick={handleCitationClick}
            />
          )}

          {currentView === 'recruiter-match' && (
            <RecruiterFitAnalysis candidate={activeCandidate} />
          )}

          {currentView === 'jobseeker-interview' && (
            <MockInterviewSession
              candidate={activeCandidate}
              onOpenReport={handleOpenReport}
            />
          )}

          {currentView === 'jobseeker-coach' && (
            <CandidateResumeCoach
              candidate={activeCandidate}
              onCitationClick={handleCitationClick}
            />
          )}
        </main>
      </div>

      {/* Share Profile Modal */}
      <ShareModal
        candidate={activeCandidate}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onOpenPublicPreview={() => {
          setIsPublicMode(true);
          setCurrentView('recruiter-chat');
        }}
      />

      {/* Comprehensive Feedback Report Modal */}
      {reportModalData && (
        <FeedbackReportModal
          report={reportModalData.report}
          session={reportModalData.session}
          candidate={activeCandidate}
          isOpen={Boolean(reportModalData)}
          onClose={() => setReportModalData(null)}
        />
      )}
    </div>
  );
}
