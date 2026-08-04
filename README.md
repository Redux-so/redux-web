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
