"use client";

import { useMemo, useState } from "react";
import { SAMPLE_JD, SAMPLE_RESUME } from "@/lib/samples";
import type { AnalyzeResult } from "@/lib/analyze";

type Status = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  const canRun = useMemo(
    () => resume.trim().length > 0 && jd.trim().length > 0 && status !== "loading",
    [resume, jd, status],
  );

  function loadSample() {
    setResume(SAMPLE_RESUME);
    setJd(SAMPLE_JD);
    setError("");
    setStatus("idle");
  }

  async function analyze() {
    setStatus("loading");
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jd }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      setResult(data as AnalyzeResult);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 border-b border-[var(--line)] pb-6">
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
          Portfolio demo
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          JD Fit Gap
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Paste a resume and a job description. Get a fit score, the gaps that matter, and three
          rewritten bullets aimed at that role.
        </p>
      </header>

      <div className="mb-5 rounded-xl border border-[#f0e0a8] bg-[var(--warn-bg)] px-4 py-3 text-sm text-[var(--warn-ink)]">
        Tool assist for drafting — not a hiring decision, guarantee, or substitute for your judgment.
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Resume</span>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste resume text…"
            className="min-h-56 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed text-[var(--ink)] shadow-sm"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Job description</span>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste JD text…"
            className="min-h-56 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed text-[var(--ink)] shadow-sm"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={loadSample}
          className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-sm hover:bg-white"
        >
          Load sample
        </button>
        <button
          type="button"
          onClick={analyze}
          disabled={!canRun}
          className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Analyzing…" : "Analyze fit"}
        </button>
      </div>

      {status === "idle" && !result && (
        <p className="mt-4 text-sm text-[var(--muted)]">Load the sample or paste your own text to start.</p>
      )}
      {status === "loading" && (
        <p className="mt-4 text-sm text-[var(--muted)]">Running fit analysis…</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-[var(--err)]" role="alert">
          {error}
        </p>
      )}

      {result && (
        <section className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-semibold tracking-tight">{result.score}</span>
            <span className="pb-1 text-sm text-[var(--muted)]">/ 100 fit</span>
          </div>

          <h2 className="mt-5 text-sm font-semibold tracking-wide text-[var(--ink)] uppercase">
            Gaps
          </h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-[var(--muted)]">
            {result.gaps.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>

          <h2 className="mt-5 text-sm font-semibold tracking-wide text-[var(--ink)] uppercase">
            Rewritten bullets
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--ink)]">
            {result.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-12 border-t border-[var(--line)] pt-4 text-sm text-[var(--muted)]">
        Built by Jack Gee ·{" "}
        <a
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          href="https://j-1002.github.io/jack-gee-portfolio-hub/"
        >
          Portfolio hub
        </a>
      </footer>
    </main>
  );
}
