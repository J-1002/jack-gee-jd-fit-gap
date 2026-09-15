"use client";

import { useState } from "react";
import { Disclaimer, ResumeField, TargetRoleField } from "@/components/SharedFields";
import { RunButton } from "@/components/RunButton";
import { useResume } from "@/lib/resume-context";
import type { AdviseResult } from "@/lib/types";

export default function AdvisePage() {
  const { resume, targetRole } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AdviseResult | null>(null);

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/advise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, targetRole }),
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
      <h1 className="text-2xl font-semibold tracking-tight">Resume Advisor</h1>
      <p className="mt-2 mb-5 max-w-2xl text-sm text-[var(--muted)]">
        A blunt read on positioning: what’s working, what’s weak, and what to fix first.
      </p>
      <Disclaimer />
      <div className="grid gap-4">
        <ResumeField rows={14} />
        <TargetRoleField />
      </div>
      <div className="mt-4">
        <RunButton
          label="Get advice"
          loading={loading}
          disabled={!resume.trim()}
          onClick={run}
        />
      </div>
      {error && <p className="mt-4 text-sm text-[var(--err)]">{error}</p>}
      {result && (
        <section className="panel mt-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{result.summary}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide">Strengths</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
                {result.strengths.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide">Weak spots</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
                {result.weaknesses.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Fix next</h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-[var(--muted)]">
              {result.priorityFixes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Draft summary</h2>
            <p className="mt-2 rounded-lg bg-[var(--bg)] p-3 text-sm leading-relaxed">
              {result.rewrittenSummary}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
