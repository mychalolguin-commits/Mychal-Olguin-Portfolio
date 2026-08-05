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

## The certification shelf (`components/shelf/`)

A Three.js shelf of procedurally generated hardcovers on the homepage, one book per certification. Ported from the MIT-licensed `complete-shelf` experience in `mintdotgg/mint-playground`; upstream `LICENSE` and `THIRD_PARTY_NOTICES.md` live in the directory and must stay.

**Only `catalog.ts` is content.** Adding, removing, or editing a certification means editing that one file — nothing else. It has no imports, so importing it is free; `pages/Resume.tsx` reads the same array for its Certifications section, making it the single source of truth. Each entry's `cover`/`accent`/`ink` colors and `motif` (one of 19 named procedural patterns) generate the artwork at runtime — there are no cover images. `format`, `availability`, `quote`, and `quoteBy` are repurposed from the upstream book schema to hold issue dates, credential IDs, and a capability line; the 3D engine never reads them, so they are safe to reshape. Entries are in deliberate reverse-chronological order — the upstream height sort was removed.

**`ShelfEngine.ts` is vendored upstream code** (~1,500 lines) and should be treated as a black box apart from four deliberate local changes, each marked with a comment explaining why:
- A `ShelfEnvironment` constructor option plus `setEnvironment()` drives the room's colors from the site's theme instead of a hardcoded cream, and recolors live on theme toggle.
- `handleWheel` only claims horizontal intent. The upstream version called `preventDefault()` on every wheel event, which trapped the page when embedded in a scrolling layout. Do not revert this.
- Wall, ground, and hemisphere light are retained as fields so `setEnvironment` can mutate them.
- Mobile focus framing: `mobileFocusDistance`/`mobileFocusLift` replace upstream's `5.8`/`0.28` so the focused cover fits the strip above the bottom sheet on phones, and `frameFocusedBook` raises `controls.maxDistance` to match (upstream's 7.2 cap silently pulled the camera back in). Tuned together with the sheet's `max-height` in `shelf.css` — retune both if either changes.

`siteConfig.enableOptionalStripeArchive` must stay `false` — it gates an upstream loader for separately licensed Stripe Press assets that are neither shipped nor licensed to this project.

**Loading** — `LazyCertificationShelf.tsx` is what pages import. It gates `React.lazy` behind an IntersectionObserver so three.js (~611 kB, its own chunk) stays out of the initial bundle and only loads when the section nears the viewport. Import the shelf through it, never `CertificationShelf` directly. `CertificationShelf` falls back to a plain list if WebGL fails.

`shelf.css` is scoped entirely under `.cert-shelf` and built on the site's theme tokens; it is not the upstream stylesheet, which assumed a full-viewport page.

## Notes

- `.env.local` holds `GEMINI_API_KEY`, wired into `process.env.API_KEY` by `vite.config.ts`. Nothing in the current source reads it — it's scaffolding from AI Studio.
- `@/` is aliased to the repo root in both `vite.config.ts` and `tsconfig.json`, though the code uses relative imports throughout.
- `dist/` is gitignored but exists locally with stale build output; don't edit files there.
