import React, { useState } from 'react';
import { CandidateResume, ComprehensiveReport, InterviewSession } from '../types';
import { X, Award, CheckCircle2, Copy, Check, Download, TrendingUp, Sparkles, BookOpen, AlertCircle, ArrowUpRight } from 'lucide-react';

interface FeedbackReportModalProps {
  report: ComprehensiveReport;
  session: InterviewSession;
  candidate: CandidateResume;
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackReportModal: React.FC<FeedbackReportModalProps> = ({
  report,
  session,
  candidate,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const md = `
# InterviewLM Personalized Candidate Feedback Report
**Candidate**: ${candidate.name}
**Target Role**: ${session.targetRole}
**Interview Track**: ${session.interviewType}
**Overall Score**: ${report.overallScore}/100 (Grade: ${report.letterGrade})
**Hiring Signal**: ${report.hiringSignal}

## Category Breakdown:
- Clarity & Structure: ${report.categoryScores.clarity}%
- Question Relevance: ${report.categoryScores.relevance}%
- Technical Completeness: ${report.categoryScores.completeness}%
- STAR Methodology: ${report.categoryScores.starMethod}%
- Resume Alignment & Truthfulness: ${report.categoryScores.resumeAlignment}%

## Executive Summary:
${report.executiveSummary}

## Top Strengths:
${report.topStrengths.map((s) => `- ${s}`).join('\n')}

## Critical Areas for Improvement:
${report.criticalAreasForImprovement.map((i) => `- ${i}`).join('\n')}

## Resume-Grounded Optimization Tips:
${report.resumeGroundedTips.map((t) => `### ${t.resumePoint}\n${t.suggestion}`).join('\n\n')}

## Recommended Next Steps:
${report.recommendedNextSteps.map((n) => `- ${n}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Personalized Interview Feedback Report
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated for {candidate.name} · {session.targetRole}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="p-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1 transition-colors"
              title="Copy Report Markdown"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg flex items-center gap-1 transition-colors"
              title="Print Report"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Executive Score Card */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Overall Interview Performance
              </span>
              <h2 className="text-2xl font-bold text-white">
                {candidate.name}
              </h2>
              <p className="text-xs text-slate-300">
                {session.targetRole} · {session.interviewType.toUpperCase().replace('-', ' ')}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-extrabold font-mono tabular-nums text-emerald-400">
                  {report.overallScore}
                  <span className="text-lg text-slate-400 font-sans font-normal">/100</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Grade: <span className="font-bold text-white">{report.letterGrade}</span>
                </div>
              </div>

              <div className="px-3.5 py-2 bg-slate-800 rounded-xl border border-slate-700 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Hiring Signal</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5 whitespace-nowrap">
                  {report.hiringSignal}
                </div>
              </div>
            </div>
          </div>

          {/* 5-Category Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Evaluation Criteria Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { label: 'Clarity & Delivery', val: report.categoryScores.clarity },
                { label: 'Relevance', val: report.categoryScores.relevance },
                { label: 'Completeness', val: report.categoryScores.completeness },
                { label: 'STAR Adherence', val: report.categoryScores.starMethod },
                { label: 'Resume Grounding', val: report.categoryScores.resumeAlignment },
              ].map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                >
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    {cat.label}
                  </div>
                  <div className="text-xl font-extrabold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                    {cat.val}%
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        cat.val >= 85 ? 'bg-emerald-500' : cat.val >= 70 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              Executive Calibration Summary
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {report.executiveSummary}
            </p>
          </div>

          {/* 2-Column Split: Strengths vs Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strengths */}
            <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Verified Candidate Strengths
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                {report.topStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="leading-relaxed">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="p-5 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Critical Opportunities for Improvement
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                {report.criticalAreasForImprovement.map((imp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">→</span>
                    <span className="leading-relaxed">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resume Grounded Tailored Tips */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Tailored Resume-Grounded Optimization Tips
            </h4>
            <div className="space-y-3">
              {report.resumeGroundedTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs shadow-2xs"
                >
                  <div className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Resume Bullet Anchor: {tip.resumePoint}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-4">
                    {tip.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="p-5 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-2 text-xs">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              Recommended Rehearsal &amp; Calibration Plan
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pl-4 list-disc">
              {report.recommendedNextSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <span className="text-[11px] text-slate-400 font-mono">
            Calibrated via InterviewLM Grounded Engine
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
