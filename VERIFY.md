# Verify — JD Fit Gap (product rebuild)

Date: 2026-09-15

## Live
- URL: https://jd-fit-gap.vercel.app/
- Repo: https://github.com/J-1002/jack-gee-jd-fit-gap
- Host: Vercel (equation-us/jd-fit-gap) with server `OPENAI_API_KEY`

## Quality bar
- Next.js + TypeScript + Tailwind
- No API key field / Puter in UI
- Same-origin `POST /api/analyze`
- Sample + empty / loading / error states
- Honest disclaimer

## Checks
- `GET /` → 200
- `POST /api/analyze` sample → score 85, 3 gaps, 3 bullets
- Hub More demos points at Vercel URL
