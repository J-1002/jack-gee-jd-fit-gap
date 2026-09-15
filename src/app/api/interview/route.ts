import { NextResponse } from "next/server";
import { chatJson } from "@/lib/openai";
import { INTERVIEW_SYSTEM } from "@/lib/prompts";
import type { InterviewResult } from "@/lib/types";
import { parseJsonObject, requireText } from "@/lib/validate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const resume = requireText((body as { resume?: unknown }).resume, "resume");
  const jd = requireText((body as { jd?: unknown }).jd, "jd");
  if (typeof resume === "object") return NextResponse.json(resume, { status: 400 });
  if (typeof jd === "object") return NextResponse.json(jd, { status: 400 });

  try {
    const content = await chatJson(
      INTERVIEW_SYSTEM,
      `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jd}`,
    );
    const data = parseJsonObject<InterviewResult>(content);
    if (
      !Array.isArray(data.likelyQuestions) ||
      data.likelyQuestions.length < 3 ||
      !Array.isArray(data.storiesToPrep) ||
      typeof data.openingPitch !== "string"
    ) {
      return NextResponse.json({ error: "Unexpected model shape" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Interview prep failed" },
      { status: 502 },
    );
  }
}
