"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SAMPLE_JD, SAMPLE_RESUME, SAMPLE_TARGET_ROLE } from "@/lib/samples";

type ResumeState = {
  resume: string;
  jd: string;
  targetRole: string;
  setResume: (v: string) => void;
  setJd: (v: string) => void;
  setTargetRole: (v: string) => void;
  loadSample: () => void;
  ready: boolean;
};

const Ctx = createContext<ResumeState | null>(null);
const KEY = "applykit-v1";

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resume, setResumeState] = useState("");
  const [jd, setJdState] = useState("");
  const [targetRole, setTargetRoleState] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          resume?: string;
          jd?: string;
          targetRole?: string;
        };
        setResumeState(parsed.resume || "");
        setJdState(parsed.jd || "");
        setTargetRoleState(parsed.targetRole || "");
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ resume, jd, targetRole }));
  }, [resume, jd, targetRole, ready]);

  const setResume = useCallback((v: string) => setResumeState(v), []);
  const setJd = useCallback((v: string) => setJdState(v), []);
  const setTargetRole = useCallback((v: string) => setTargetRoleState(v), []);
  const loadSample = useCallback(() => {
    setResumeState(SAMPLE_RESUME);
    setJdState(SAMPLE_JD);
    setTargetRoleState(SAMPLE_TARGET_ROLE);
  }, []);

  const value = useMemo(
    () => ({
      resume,
      jd,
      targetRole,
      setResume,
      setJd,
      setTargetRole,
      loadSample,
      ready,
    }),
    [resume, jd, targetRole, setResume, setJd, setTargetRole, loadSample, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useResume() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
