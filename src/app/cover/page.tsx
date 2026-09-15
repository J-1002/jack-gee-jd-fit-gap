"use client";

import { useState } from "react";
import { Disclaimer, JdField, ResumeField } from "@/components/SharedFields";
import { RunButton } from "@/components/RunButton";
import { useResume } from "@/lib/resume-context";
import type { CoverResult } from "@/lib/types";

export default function CoverPage() {
  const { resume, jd } = useResume();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CoverResult | null>(null);

  async function run() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/cover", {
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
      <h1 className="text-2xl font-semibold tracking-tight">Cover Letter</h1>
      <p className="mt-2 mb-5 max-w-2xl text-sm text-[var(--muted)]">
        A short letter for this JD, grounded in your resume — plus why the angle works.
      </p>
      <Disclaimer />
      <div className="grid gap-4 sm:grid-cols-2">
        <ResumeField />
        <JdField />
      </div>
      <div className="mt-4">
        <RunButton
          label="Draft letter"
          loading={loading}
          disabled={!resume.trim() || !jd.trim()}
          onClick={run}
        />
      </div>
      {error && <p className="mt-4 text-sm text-[var(--err)]">{error}</p>}
      {result && (
        <section className="panel mt-6 space-y-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Subject</h2>
            <p className="mt-1 text-sm font-medium">{result.subject}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Letter</h2>
            <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-[var(--bg)] p-3 font-sans text-sm leading-relaxed">
              {result.letter}
            </pre>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">Why this works</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
              {result.whyThisWorks.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
