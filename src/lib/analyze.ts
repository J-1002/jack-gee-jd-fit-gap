export type AnalyzeResult = {
  score: number;
  gaps: string[];
  bullets: string[];
};

export const ANALYZE_SYSTEM = `You are a career-fit assistant. Given a resume and a job description, return ONLY valid JSON with keys:
score (integer 0-100), gaps (array of 3-5 short strings), bullets (array of exactly 3 rewritten resume bullets tailored to the JD).
Be specific and honest. Never promise a hire. No markdown outside JSON.`;

export function validateAnalyzeInput(resume: unknown, jd: unknown): string | null {
  if (typeof resume !== "string" || typeof jd !== "string") {
    return "resume and jd must be strings";
  }
  const r = resume.trim();
  const j = jd.trim();
  if (!r || !j) return "resume and jd are required";
  if (r.length > 20000 || j.length > 20000) return "inputs too long (max 20k chars each)";
  return null;
}
