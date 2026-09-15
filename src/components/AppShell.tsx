"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useResume } from "@/lib/resume-context";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/fit", label: "Fit Gap" },
  { href: "/advise", label: "Resume Advisor" },
  { href: "/cover", label: "Cover Letter" },
  { href: "/interview", label: "Interview Prep" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loadSample, resume } = useResume();
  const hasResume = resume.trim().length > 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--ink)]">
              Apply Kit
            </Link>
            <p className="text-xs text-[var(--muted)]">Career tools that share one resume</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                hasResume
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-amber-50 text-amber-900"
              }`}
            >
              {hasResume ? "Resume loaded" : "No resume yet"}
            </span>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-lg border border-[var(--line)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--bg)]"
            >
              Load sample
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
    </div>
  );
}
