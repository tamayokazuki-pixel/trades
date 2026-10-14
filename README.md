# Reserve One

An original institutional energy-market website inspired by the visual direction and subject matter of goif.site—not a copy or endorsement. It includes a live-data server adapter, energy equity terminal, focused market research, Supabase magic-link authentication, responsive layouts, and a Render deployment blueprint.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`. Without API keys the site uses clearly labelled fallback market quotes.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. In Authentication > URL Configuration, set the Site URL to your Render URL and add local/production redirect URLs.
4. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Render. These are public browser credentials; never expose the service-role key.

The schema includes profiles, watchlists, and row-level security policies.

## Administration and financial reviews

The protected console is available at `/admin`. It includes funding approvals, withdrawal approvals, deposit-destination publishing, role checks, and an immutable audit trail. After your administrator signs up, promote that account using the documented final SQL statement in `supabase/schema.sql`. Never place private keys or recovery phrases in the deposit-address field.

These workflows record and authorize requests, but they do not move money by themselves. Actual settlement and trading must be connected to your selected regulated broker/payment provider before production use.

## Market data

The server supports Finnhub. Set `FINNHUB_API_KEY` in Render. API keys remain server-side. When absent or unavailable, resilient demo quotes are returned.

## Deploy on Render

Push this repository and create a Blueprint from `render.yaml`, or create a Node Web Service with:

- Build: `npm ci && npm run build`
- Start: `npm start`
- Health check: `/api/health`
- Environment: the three keys in `.env.example`

## Important

This product is configured for market research and informational use. It does not execute or simulate trades. Real-money execution would require a regulated brokerage integration and jurisdiction-specific compliance.
