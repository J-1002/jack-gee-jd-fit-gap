# Verify — Apply Kit (career app)

Date: 2026-09-15

## Live
- URL: https://jd-fit-gap.vercel.app/
- Product: Apply Kit — Fit Gap, Resume Advisor, Cover Letter, Interview Prep
- Shared resume/JD context (localStorage)
- Same-origin OpenAI APIs; no key paste in UI

## Local checks
- `npm run build` succeeded
- Pages `/` `/fit` `/advise` `/cover` `/interview` → 200
- APIs analyze/advise/cover/interview → 200 with sample payload

## Deploy
Vercel production with `OPENAI_API_KEY`
