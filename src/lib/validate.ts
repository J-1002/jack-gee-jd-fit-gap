export function requireText(
  value: unknown,
  name: string,
  max = 20000,
): string | { error: string } {
  if (typeof value !== "string") return { error: `${name} must be a string` };
  const t = value.trim();
  if (!t) return { error: `${name} is required` };
  if (t.length > max) return { error: `${name} too long (max ${max} chars)` };
  return t;
}

export function optionalText(
  value: unknown,
  name: string,
  max = 20000,
): string | { error: string } {
  if (value == null || value === "") return "";
  if (typeof value !== "string") return { error: `${name} must be a string` };
  const t = value.trim();
  if (t.length > max) return { error: `${name} too long (max ${max} chars)` };
  return t;
}

export function parseJsonObject<T>(content: string): T {
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}
