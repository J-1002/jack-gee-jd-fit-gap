# Apply Kit

Career toolkit (portfolio product by Jack Gee):

- **Fit Gap** — resume + JD → score, gaps, rewritten bullets
- **Resume Advisor** — strengths, weak spots, priority fixes, draft summary
- **Cover Letter** — role-specific letter + rationale
- **Interview Prep** — likely questions, STAR prompts, opening pitch

Shared resume/JD context across tools. Same-origin OpenAI APIs. No API keys in the UI.

## Local
```bash
cp .env.example .env.local
# OPENAI_API_KEY=...
npm install
npm run dev
```

## Deploy
Vercel with `OPENAI_API_KEY` set in project env.
