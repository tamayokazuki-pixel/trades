# Reserve One

An original institutional energy, policy, and multi-sector market platform inspired by the visual direction and subject matter of goif.site—not a copy or endorsement. It includes a live-data server adapter, multi-sector equity terminal (29 Oil & Energy stocks, 13 Trump-ecosystem & policy stocks, and 25 global sector leaders across Tech & AI, Financials & Crypto, Defense & Industrials, and Healthcare & Consumer), interactive instrument dossiers, custom ticker lookup, Supabase magic-link authentication, responsive layouts, and a Render deployment blueprint.

## Market Universe (67 Equities)

- **Oil & Energy (29):** Integrated Majors (`XOM`, `CVX`, `SHEL`, `TTE`, `BP`, `EQNR`, `PBR`, `CNQ`, `SU`), Exploration & Production (`COP`, `EOG`, `OXY`, `FANG`, `DVN`, `EQT`, `TPL`, `OVV`), Oilfield Services (`SLB`, `BKR`, `HAL`), Refining & Downstream (`MPC`, `VLO`, `PSX`), and Midstream, Pipelines & LNG (`ENB`, `WMB`, `EPD`, `ET`, `KMI`, `LNG`).
- **Trump Stocks & Policy Desk (13):** Flagship & Trump Family Ventures (`DJT`, `ABTC`, `HUT`), Donald Trump Jr. & Eric Trump Advisory/Board Equities (`UMAC`, `DOMH`, `PSQH`), Campaign & Cloud Infrastructure Partners (`RUM`, `PHUN`, `NMAX`), and America-First Policy Beneficiaries (`GEO`, `CXW`, `MP`, `NUE`).
- **Tech & AI (10):** `NVDA`, `AAPL`, `MSFT`, `AMZN`, `GOOGL`, `META`, `TSLA`, `AVGO`, `PLTR`, `INTC` (including mega-cap holdings disclosed in presidential financial filings).
- **Financials & Crypto (6):** `BRK.B`, `JPM`, `V`, `GS`, `COIN`, `MSTR`.
- **Defense, Nuclear & Industrials (5):** `GE`, `CAT`, `RTX`, `LMT`, `CCJ`.
- **Healthcare & Consumer (4):** `LLY`, `WMT`, `UNH`, `COST`.

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

The server supports Finnhub. Set `FINNHUB_API_KEY` in Render. API keys remain server-side with a 60-second quote cache. When absent or unavailable, resilient benchmark quotes are returned.

## Deploy on Render

Push this repository and create a Blueprint from `render.yaml`, or create a Node Web Service with:

- Build: `npm ci && npm run build`
- Start: `npm start`
- Health check: `/api/health`
- Environment: the three keys in `.env.example`

## Important

This product is configured for market research and informational use. It does not execute or simulate trades. Real-money execution would require a regulated brokerage integration and jurisdiction-specific compliance.
