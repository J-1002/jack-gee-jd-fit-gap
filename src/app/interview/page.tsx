"use client";

import { useState } from "react";
import { Disclaimer, JdField, ResumeField } from "@/components/SharedFields";
import { RunButton } from "@/components/RunButton";
import { useResume } from "@/lib/resume-context";
import type { InterviewResult } from "@/lib/types";

export default function InterviewPage() {
  const { resume, jd } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<InterviewResult | null>(null);

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Interview Prep</h1>
      <p className="mt-2 mb-5 max-w-2xl text-sm text-[var(--muted)]">
        Likely questions for this role, stories to rehearse, and a draft opening pitch.
      </p>
      <Disclaimer />
      <div className="grid gap-4 sm:grid-cols-2">
        <ResumeField />
        <JdField />
      </div>
      <div className="mt-4">
        <RunButton
          label="Prep interview"
          loading={loading}
          disabled={!resume.trim() || !jd.trim()}
          onClick={run}
        />
      </div>
      {error && <p className="mt-4 text-sm text-[var(--err)]">{error}</p>}
      {result && (
        <section className="panel mt-6 space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Opening pitch</h2>
            <p className="mt-2 rounded-lg bg-[var(--bg)] p-3 text-sm leading-relaxed">
              {result.openingPitch}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Likely questions</h2>
            <ul className="mt-3 space-y-3">
              {result.likelyQuestions.map((q) => (
                <li key={q.question} className="rounded-lg border border-[var(--line)] p-3">
                  <p className="text-sm font-semibold">{q.question}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{q.why}</p>
                  <p className="mt-2 text-sm text-[var(--ink)]">
                    <span className="font-medium">Tip:</span> {q.tip}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Stories to prep</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
              {result.storiesToPrep.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
