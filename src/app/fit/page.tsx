"use client";

import { useState } from "react";
import { Disclaimer, JdField, ResumeField } from "@/components/SharedFields";
import { RunButton } from "@/components/RunButton";
import { useResume } from "@/lib/resume-context";
import type { FitResult } from "@/lib/types";

export default function FitPage() {
  const { resume, jd } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<FitResult | null>(null);

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
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
      <h1 className="text-2xl font-semibold tracking-tight">Fit Gap</h1>
      <p className="mt-2 mb-5 max-w-2xl text-sm text-[var(--muted)]">
        See how this resume maps to a specific job — score, gaps, and three bullets rewritten for
        the role.
      </p>
      <Disclaimer />
      <div className="grid gap-4 sm:grid-cols-2">
        <ResumeField />
        <JdField />
      </div>
      <div className="mt-4">
        <RunButton
          label="Analyze fit"
          loading={loading}
          disabled={!resume.trim() || !jd.trim()}
          onClick={run}
        />
      </div>
      {error && <p className="mt-4 text-sm text-[var(--err)]">{error}</p>}
      {result && (
        <section className="panel mt-6">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight">{result.score}</span>
            <span className="pb-1 text-sm text-[var(--muted)]">/ 100 fit</span>
          </div>
          <h2 className="mt-5 text-sm font-semibold uppercase tracking-wide">Gaps</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
            {result.gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <h2 className="mt-5 text-sm font-semibold uppercase tracking-wide">Rewritten bullets</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
            {result.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
