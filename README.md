Official website for Redux

Internal dev docs are kept locally, not in this repo.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values for local development:

```bash
cp .env.example .env.local
```

Never commit real secrets. Use `.env.local` locally (gitignored) and set the same variables in [Vercel → Project → Settings → Environment Variables](https://vercel.com/docs/projects/environment-variables) for production.

Required for the waitlist API:

- `LOOPS_API_KEY` — Loops API key (server-only)
- `LOOPS_WAITLIST_MAILING_LIST_ID` — mailing list ID from the Loops dashboard

Recommended for production waitlist security:

- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — global rate limits (5/hour per IP, 3/day per email). Without these, the API falls back to in-memory limits per serverless instance.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) bot protection. Without these, CAPTCHA is skipped locally with a console warning.

Set Turnstile and Upstash variables in Vercel for production. Local dev works without them.
