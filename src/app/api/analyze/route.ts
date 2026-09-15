import { NextResponse } from "next/server";
import {
  ANALYZE_SYSTEM,
  validateAnalyzeInput,
  type AnalyzeResult,
} from "@/lib/analyze";

export const runtime = "nodejs";

function parseResult(content: string): AnalyzeResult {
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const data = JSON.parse(cleaned) as AnalyzeResult;
  if (
    typeof data.score !== "number" ||
    !Array.isArray(data.gaps) ||
    !Array.isArray(data.bullets) ||
    data.bullets.length !== 3
  ) {
    throw new Error("Model returned unexpected shape");
  }
  return {
    score: Math.max(0, Math.min(100, Math.round(data.score))),
    gaps: data.gaps.map(String).slice(0, 6),
    bullets: data.bullets.map(String),
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const resume = (body as { resume?: unknown })?.resume;
  const jd = (body as { jd?: unknown })?.jd;
  const invalid = validateAnalyzeInput(resume, jd);
  if (invalid) {
    return NextResponse.json({ error: invalid }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server missing OPENAI_API_KEY" },
      { status: 500 },
    );
  }

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ANALYZE_SYSTEM },
        {
          role: "user",
          content: `RESUME:\n${String(resume).trim()}\n\nJOB DESCRIPTION:\n${String(jd).trim()}`,
        },
      ],
    }),
  });

  if (!openaiRes.ok) {
    const text = await openaiRes.text();
    return NextResponse.json(
      { error: `OpenAI error (${openaiRes.status})`, detail: text.slice(0, 400) },
      { status: 502 },
    );
  }

  const payload = (await openaiRes.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    return NextResponse.json({ error: "Empty model response" }, { status: 502 });
  }

  try {
    return NextResponse.json(parseResult(content));
  } catch {
    return NextResponse.json({ error: "Failed to parse model JSON" }, { status: 502 });
  }
}
