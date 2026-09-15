import { NextResponse } from "next/server";
import { chatJson } from "@/lib/openai";
import { COVER_SYSTEM } from "@/lib/prompts";
import type { CoverResult } from "@/lib/types";
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
      COVER_SYSTEM,
      `RESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jd}`,
    );
    const data = parseJsonObject<CoverResult>(content);
    if (
      typeof data.subject !== "string" ||
      typeof data.letter !== "string" ||
      !Array.isArray(data.whyThisWorks)
    ) {
      return NextResponse.json({ error: "Unexpected model shape" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Cover failed" },
      { status: 502 },
    );
  }
}
