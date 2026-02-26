# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint on src/
```

## Environment

The app requires a Socrata API token set in a `.env` file:

```
VITE_APP_TOKEN=your_token_here
```

This is accessed via `import.meta.env.VITE_APP_TOKEN` and passed as the `X-App-Token` request header.

## Architecture

Single-page Vue 3 app (Options API) that fetches COVID data from Virginia's open data portal (Socrata API at `data.virginia.gov`) and displays statewide or per-locality statistics.

**Data flow:**
1. `Home.vue` calls `src/api/socrata.js` on `created()`, passing today's date (or the previous Friday if it's a weekend) as `report_date`
2. The API returns an array of locality objects, each with `fips`, `locality`, `total_cases`, `hospitalizations`, `deaths`, and `report_date`
3. `Home.vue` aggregates totals via computed properties and passes them as `stats` to `DataBoxes.vue`
4. The full result array is passed as `resultData` to `LocalitySelect.vue`; selecting a locality emits `get-locality`, which swaps the displayed stats in `Home.vue`

**Key files:**
- `src/api/socrata.js` — Axios wrapper for the Virginia COVID dataset endpoint
- `src/views/Home.vue` — Root view; owns all data fetching, aggregation, and state
- `src/components/DataBoxes.vue` — Displays Cases/Hospitalizations/Deaths stat cards
- `src/components/LocalitySelect.vue` — Dropdown keyed by `fips` that triggers locality filtering

**Styling:** Tailwind CSS v3 via PostCSS. Path alias `@` maps to `src/`.
