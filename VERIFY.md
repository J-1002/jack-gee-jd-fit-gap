# Verify — JD Fit Gap (product rebuild)

Date: 2026-09-15

## Quality bar
- Next.js + TypeScript + Tailwind (not a single HTML file)
- No API key field in the UI
- Same-origin `POST /api/analyze` with server `OPENAI_API_KEY`
- Sample + empty / loading / error states
- Honest disclaimer (tool assist, not a hiring decision)

## Local checks
- `npm run build` succeeded
- `GET /` → 200
- `POST /api/analyze` with sample → score 75, 3 gaps, 3 bullets

## Deploy
Needs a host that supports server env (Vercel free). GitHub Pages cannot run the API route.
