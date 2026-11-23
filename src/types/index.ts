export interface ResumeSection {
  id: string;
  title: string;
  pageNumber: number;
  content: string[];
}

export interface CandidateResume {
  id: string;
  name: string;
  headline: string;
  email: string;
  location: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary: string;
  sections: ResumeSection[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    location?: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    details?: string[];
  }[];
  rawText: string;
  fileName?: string;
  uploadedAt: string;
}

export interface Citation {
  id: number;
  section: string;
  quote: string;
  pageNumber: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  role: 'recruiter' | 'candidate';
  text: string;
  timestamp: string;
  citations?: Citation[];
  groundedScore?: number; // 0-100 grounding certainty
  isUnanswerable?: boolean; // if info was missing from resume
}

export interface RubricScore {
  criterion: 'clarity' | 'relevance' | 'completeness' | 'starMethod' | 'resumeAlignment';
  label: string;
  score: number; // 0 to 100
  feedback: string;
}

export interface InterviewTurn {
  id: string;
  questionNumber: number;
  interviewerQuestion: string;
  interviewType: 'technical' | 'behavioral' | 'resume-deep-dive' | 'hiring-manager';
  candidateResponse?: string;
  responseTimestamp?: string;
  rubricScores?: RubricScore[];
  turnScore?: number;
  turnFeedback?: {
    strengths: string[];
    improvements: string[];
    resumeReference?: string;
    modelAnswer?: string;
  };
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  interviewType: 'technical' | 'behavioral' | 'resume-deep-dive' | 'hiring-manager';
  targetRole: string;
  status: 'in-progress' | 'completed';
  startedAt: string;
  completedAt?: string;
  turns: InterviewTurn[];
  overallScore?: number;
  report?: ComprehensiveReport;
}

export interface ComprehensiveReport {
  overallScore: number;
  letterGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'Needs Practice';
  categoryScores: {
    clarity: number;
    relevance: number;
    completeness: number;
    starMethod: number;
    resumeAlignment: number;
  };
  executiveSummary: string;
  topStrengths: string[];
  criticalAreasForImprovement: string[];
  resumeGroundedTips: {
    resumePoint: string;
    suggestion: string;
  }[];
  hiringSignal: 'Strong Hire' | 'Hire' | 'Borderline / Probe Further' | 'Do Not Hire';
  recommendedNextSteps: string[];
}

export interface JobFitAnalysis {
  matchScore: number;
  summary: string;
  matchedRequirements: {
    requirement: string;
    evidence: string;
    citationSection: string;
  }[];
  missingOrUnverified: {
    requirement: string;
    note: string;
  }[];
}
