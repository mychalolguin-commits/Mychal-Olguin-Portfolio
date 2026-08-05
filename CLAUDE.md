# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install deps
npm run dev       # Vite dev server on port 3000, host 0.0.0.0
npm run build     # production build -> dist/
npm run preview   # serve the built dist/
```

There is no test suite, linter, or formatter configured. TypeScript is `noEmit` only (type-checking happens through the editor / `npx tsc --noEmit`; Vite does not type-check during build).

## Architecture

Single-page React 19 portfolio site, built with Vite. No backend, no data fetching — every piece of content is a static literal in `constants.ts`.

**Routing** — `App.tsx` uses `HashRouter`, so live URLs are `/#/work`, `/#/work/:slug`, etc. `public/sitemap.xml` lists non-hash paths, so it will drift from real URLs unless the router is changed. Adding a route means touching `App.tsx`, `components/Navbar.tsx`, and `public/sitemap.xml`.

**Content model** — `constants.ts` exports `PROJECTS`, `EXPERIENCE`, and `CAPABILITIES`; `types.ts` defines their shapes. Case studies are the interesting part: a `Project` has a small required core (slug, title, metrics) plus many optional fields that each unlock a section in `pages/WorkDetail.tsx`. Two optional fields drive whole components:
- `dashboardData` → renders `CaseStudyDashboard` on the detail page. It stores only raw totals; CPM, frequency, LPV rate, and cost/LPV are all derived in the component, so never hardcode a derived number into `constants.ts`.
- `media` → renders `MediaTile` on the Work index. `MediaData` is a discriminated union on `variant` (`ga4` | `seo` | `paidSocial`); adding a variant means extending the union in `types.ts` and adding a matching branch in `MediaTile.tsx`. `Project.mediaType` (`meta`/`seo`/`reporting`) is the legacy fallback used when `media` is absent.

To add a case study: append to `PROJECTS`, add its slug to `public/sitemap.xml`. Routing and next-project navigation are derived from array order — `WorkDetail` links to `PROJECTS[(index + 1) % length]`.

**Theming** — All colors, shadows, and section washes are CSS custom properties defined in the `<style>` block of `index.html`, under `:root` (dark, the default) and `[data-theme="light"]`. An inline script in `<head>` sets `data-theme` before paint to avoid a flash; `hooks/useTheme.ts` reads that attribute as its initial state and writes back to both the attribute and `localStorage`. Components consume tokens as `bg-[var(--color-bg-elevated)]`, `border-[var(--card-border)]`, etc. — add new colors as tokens in **both** theme blocks rather than as literal Tailwind colors, or light mode will break.

Tailwind is loaded from the CDN (`cdn.tailwindcss.com`) with its config inlined in `index.html` — there is no `tailwind.config.js` and no PostCSS step. Custom `mint`/`zinc` colors, the `Inter`/`Newsreader` font families, and the `blob`/`slide-up` animations live in that inline config. `index.html` also links `/index.css`, which does not exist, and carries an `importmap` left over from AI Studio that Vite ignores at build time.

**Motion** — `MotionProvider` wraps the app and switches Framer Motion to `reducedMotion: 'always'` based on `hooks/useReducedMotion.ts`, so individual animations don't need their own reduced-motion guards. Standard composition for a page: `<PageTransition>` at the root (drives the `AnimatePresence` exit animation keyed on pathname), then `Reveal` / `StaggerContainer` + `StaggerItem` from `components/Reveal.tsx` for scroll-triggered entrances.

**SEO** — `index.html` holds the base meta tags and two JSON-LD blocks (Person, WebSite). `hooks/useSEO.ts` mutates `document.title` and the description/OG/Twitter meta tags per page and restores the previous values on unmount; `WorkDetail` additionally injects per-case-study structured data.

**Layout convention** — Page and chrome containers repeat `max-w-4xl lg:max-w-6xl mx-auto px-6 lg:px-10 xl:px-16`. Match it in new sections so the page gutters stay aligned with the navbar and footer.

## Notes

- `.env.local` holds `GEMINI_API_KEY`, wired into `process.env.API_KEY` by `vite.config.ts`. Nothing in the current source reads it — it's scaffolding from AI Studio.
- `@/` is aliased to the repo root in both `vite.config.ts` and `tsconfig.json`, though the code uses relative imports throughout.
- `dist/` is gitignored but exists locally with stale build output; don't edit files there.
