"use client";

import { useResume } from "@/lib/resume-context";

export function ResumeField({ rows = 12 }: { rows?: number }) {
  const { resume, setResume } = useResume();
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">Resume</span>
      <textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        rows={rows}
        placeholder="Paste your resume once — it stays across every tool."
        className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed shadow-sm"
      />
    </label>
  );
}

export function JdField({ rows = 12 }: { rows?: number }) {
  const { jd, setJd } = useResume();
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">Job description</span>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        rows={rows}
        placeholder="Paste the JD for fit, cover letter, and interview prep."
        className="w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed shadow-sm"
      />
    </label>
  );
}

export function TargetRoleField() {
  const { targetRole, setTargetRole } = useResume();
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">Target role (optional)</span>
      <input
        value={targetRole}
        onChange={(e) => setTargetRole(e.target.value)}
        placeholder="e.g. Corporate Development Associate"
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm shadow-sm"
      />
    </label>
  );
}

export function Disclaimer() {
  return (
    <div className="mb-5 rounded-xl border border-[#f0e0a8] bg-[var(--warn-bg)] px-4 py-3 text-sm text-[var(--warn-ink)]">
      Drafting assist only — not a hiring decision, guarantee, or substitute for your judgment.
    </div>
  );
}
