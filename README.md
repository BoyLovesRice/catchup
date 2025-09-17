# Catchup — Full Website
Generated: 2025-09-17T17:36:47.905161

This is a ready-to-run Next.js App Router project for **Catchup** (landing, pricing, app, and API routes).

## What’s included
- Landing page (`/`) with hero + feature cards
- Pricing page (`/pricing`) with monthly/yearly toggle and Stripe Checkout (`/api/checkout`)
- App page (`/app`) with paste-to-summarize UI (works offline, uses `/api/summarize` if configured) and email via `/api/send-digest`
- Tailwind setup and cohesive styling
- Privacy & Terms pages, 404 page
- `lib/plans.ts` with plan gating helpers
- Public logo + favicon
- `.env.example` with all required keys

## Quick start
```bash
# 1) Install deps
npm install

# 2) Copy env template and fill with your keys
cp .env.example .env.local

# 3) Dev server
npm run dev
# open http://localhost:3000
```

## Stripe Checkout
Create Price IDs in Stripe and paste into `.env.local`:
- PRICE_PERSONAL_MONTHLY / YEARLY
- PRICE_PRO_MONTHLY / YEARLY
- PRICE_TEAM_BASE (and optional PRICE_TEAM_SEAT)

## Summarization
- If `OPENAI_API_KEY` is set, `/api/summarize` uses OpenAI (`gpt-4o-mini`).
- If not set, it uses a built-in offline summarizer (keyword-driven).

## Emailing digests
- Set `SENDGRID_API_KEY`, `DEFAULT_EMAIL_FROM`, and `DEFAULT_EMAIL_TO` to enable `/api/send-digest`.

## Deploy
- Vercel or any Node host works:
  - Set the env vars in your host dashboard.
  - `npm run build && npm start` (on Node hosts), or import to Vercel for zero-config.

## License
Commercial use allowed for your startup. No warranty.
