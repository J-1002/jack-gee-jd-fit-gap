import { NextResponse } from "next/server";
import { chatJson } from "@/lib/openai";
import { ADVISE_SYSTEM } from "@/lib/prompts";
import type { AdviseResult } from "@/lib/types";
import { optionalText, parseJsonObject, requireText } from "@/lib/validate";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const resume = requireText((body as { resume?: unknown }).resume, "resume");
  const targetRole = optionalText(
    (body as { targetRole?: unknown }).targetRole,
    "targetRole",
  );
  if (typeof resume === "object") return NextResponse.json(resume, { status: 400 });
  if (typeof targetRole === "object") return NextResponse.json(targetRole, { status: 400 });

  try {
    const content = await chatJson(
      ADVISE_SYSTEM,
      `RESUME:\n${resume}\n\nTARGET ROLE:\n${targetRole || "(not specified)"}`,
    );
    const data = parseJsonObject<AdviseResult>(content);
    if (
      typeof data.summary !== "string" ||
      !Array.isArray(data.strengths) ||
      !Array.isArray(data.weaknesses) ||
      !Array.isArray(data.priorityFixes) ||
      typeof data.rewrittenSummary !== "string"
    ) {
      return NextResponse.json({ error: "Unexpected model shape" }, { status: 502 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Advise failed" },
      { status: 502 },
    );
  }
}
