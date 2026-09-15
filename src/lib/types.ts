export type FitResult = {
  score: number;
  gaps: string[];
  bullets: string[];
};

export type AdviseResult = {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  priorityFixes: string[];
  rewrittenSummary: string;
};

export type CoverResult = {
  subject: string;
  letter: string;
  whyThisWorks: string[];
};

export type InterviewResult = {
  likelyQuestions: { question: string; why: string; tip: string }[];
  storiesToPrep: string[];
  openingPitch: string;
};
