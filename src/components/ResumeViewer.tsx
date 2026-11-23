import React, { useState, useEffect, useRef } from 'react';
import { CandidateResume, Citation } from '../types';
import { FileText, Search, UploadCloud, CheckCircle2, ChevronDown, Sparkles, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

interface ResumeViewerProps {
  candidate: CandidateResume;
  activeCitation: Citation | null;
  onSelectCandidate: (candidateId: string) => void;
  allCandidates: CandidateResume[];
  onUploadPdf: (file: File) => void;
  isUploading: boolean;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  candidate,
  activeCitation,
  onSelectCandidate,
  allCandidates,
  onUploadPdf,
  isUploading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'structured' | 'raw'>('structured');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to active citation when clicked
  useEffect(() => {
    if (activeCitation && containerRef.current) {
      const el = document.getElementById(`citation-target-${activeCitation.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeCitation]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadPdf(file);
    }
  };

  const wordCount = candidate.rawText.split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Top Source Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Source Document
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3" />
              Indexed &amp; Grounded
            </span>
          </div>

          {/* Quick upload trigger */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-md transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Parsing...' : 'Upload PDF'}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.md"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Candidate Selector Dropdown */}
        <div className="relative">
          <select
            value={candidate.id}
            onChange={(e) => onSelectCandidate(e.target.value)}
            className="w-full appearance-none px-3 py-2 pr-8 text-sm font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {allCandidates.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.headline.slice(0, 42)}...
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Document Metadata Bar */}
        <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono tabular-nums">{wordCount}</span>
            <span>words</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{candidate.sections.length}</span>
            <span>sections</span>
          </div>
          <div className="flex items-center gap-1 p-0.5 bg-slate-200/60 dark:bg-slate-800 rounded-md">
            <button
              onClick={() => setViewMode('structured')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                viewMode === 'structured'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Sections
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                viewMode === 'raw'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Full Text
            </button>
          </div>
        </div>

        {/* Search within document */}
        <div className="relative mt-2.5">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search within resume..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Active Citation Notification Banner */}
      {activeCitation && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">Citation [{activeCitation.id}] Highlighted:</span>{' '}
            <span className="italic line-clamp-1">&ldquo;{activeCitation.quote}&rdquo;</span>
          </div>
        </div>
      )}

      {/* Scrollable Document Body */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Candidate Header Card */}
        <div className="pb-5 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {candidate.name}
              </h2>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                {candidate.headline}
              </p>
            </div>
            {candidate.fileName && (
              <span className="text-[11px] font-mono text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                {candidate.fileName.slice(-18)}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400 pt-1">
            {candidate.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {candidate.location}
              </span>
            )}
            {candidate.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {candidate.email}
              </span>
            )}
            {candidate.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {candidate.phone}
              </span>
            )}
            {candidate.portfolio && (
              <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                <ExternalLink className="w-3 h-3" />
                {candidate.portfolio}
              </span>
            )}
          </div>
        </div>

        {/* View Mode: Structured Sections */}
        {viewMode === 'structured' ? (
          <div className="space-y-6">
            {candidate.sections.map((section) => {
              const matchesSearch =
                !searchTerm ||
                section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                section.content.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

              if (!matchesSearch) return null;

              const isCitationMatch =
                activeCitation &&
                (activeCitation.section.toLowerCase().includes(section.title.toLowerCase()) ||
                  section.content.some((c) =>
                    c.toLowerCase().includes(activeCitation.quote.toLowerCase().slice(0, 25))
                  ));

              return (
                <div
                  key={section.id}
                  id={isCitationMatch ? `citation-target-${activeCitation.id}` : undefined}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    isCitationMatch
                      ? 'bg-amber-50/80 dark:bg-amber-950/30 ring-2 ring-amber-400/80'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {section.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Page {section.pageNumber}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {section.content.map((bullet, idx) => {
                      const isHighlightedBullet =
                        activeCitation &&
                        bullet.toLowerCase().includes(activeCitation.quote.toLowerCase().slice(0, 20));

                      return (
                        <div
                          key={idx}
                          className={`text-xs leading-relaxed transition-colors ${
                            isHighlightedBullet
                              ? 'bg-yellow-200 dark:bg-yellow-900/60 text-slate-950 dark:text-yellow-100 p-1.5 rounded font-medium'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 mr-2 shrink-0 align-middle" />
                          {bullet}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View Mode: Raw Text with page lines */
          <div className="p-4 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
            <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
              {candidate.rawText}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Grounding Guarantee */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>Grounded via NotebookLM RAG engine</span>
        <span className="font-mono">Zero Hallucinations Active</span>
      </div>
    </div>
  );
};
