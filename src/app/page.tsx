import Link from "next/link";

const TOOLS = [
  {
    href: "/fit",
    title: "Fit Gap",
    body: "Score how your resume matches a JD, see the gaps, and get three rewritten bullets.",
  },
  {
    href: "/advise",
    title: "Resume Advisor",
    body: "Get a blunt read on strengths, weak spots, and the highest-leverage edits to make next.",
  },
  {
    href: "/cover",
    title: "Cover Letter",
    body: "Draft a short, specific letter aimed at this role — grounded in your resume, not fluff.",
  },
  {
    href: "/interview",
    title: "Interview Prep",
    body: "Likely questions, STAR story prompts, and a tell-me-about-yourself pitch for this JD.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mb-10 max-w-2xl">
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[var(--muted)] uppercase">
          Portfolio product
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Apply Kit
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          One resume, four tools. Paste once, then move from fit check to resume edits, cover
          letter, and interview prep without starting over.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="panel block transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold tracking-tight">{tool.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{tool.body}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)]">
              Open →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Built by Jack Gee ·{" "}
        <a
          className="text-[var(--accent)] underline-offset-2 hover:underline"
          href="https://j-1002.github.io/jack-gee-portfolio-hub/"
        >
          Portfolio hub
        </a>
      </p>
    </div>
  );
}
