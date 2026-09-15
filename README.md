# JD Fit Gap

Paste a resume + job description → fit score, gaps, and three rewritten bullets.

## Stack
Next.js (App Router) + TypeScript + Tailwind. OpenAI via same-origin `/api/analyze`.

## Local
```bash
cp .env.example .env.local
# put OPENAI_API_KEY in .env.local
npm install
npm run dev
```

## Deploy (Vercel, free)
1. Import this repo in Vercel
2. Set `OPENAI_API_KEY` in Project → Settings → Environment Variables
3. Deploy

Do not commit `.env.local`.
