# AGENTS.md

## Repository Expectations

- This is a Vite + React portfolio for a digital marketer. Keep the site credible, restrained, and evidence-led.
- Run `npm run build` and `npx tsc --noEmit` after source changes.
- Use `BrowserRouter` routes and keep `public/sitemap.xml` aligned with clean production URLs.
- Tailwind is compiled at build time from `tailwind.config.cjs` and `index.css`; do not add the CDN script back to `index.html`.
- The rendered charts are acceptable proof when they are built from real account data. Do not ask for client-account screenshots unless the user explicitly wants to add them.
- Read `CLAUDE.md` before changing architecture, theming, motion, routing, or case-study content. It remains the detailed design and implementation notebook for this repo.

## Design Rules

- One hue: deep pine green means forward. Keep it limited to primary actions, the active nav marker, focus rings, the closing field, and chart series.
- Color encodes data, never decoration. Do not add gradients, decorative accent colors, tinted cards, or generic stock imagery.
- Use `components/layout.ts` for shared gutters and button/link classes.
- Every number should name its source. If a project has no baseline, say so instead of inventing metrics.
