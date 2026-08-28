# Mychal Olguin — Portfolio

A single-page portfolio for a digital marketer who builds the websites, runs the search
and paid media, and keeps the measurement honest. Case studies in web design, SEO and
answer-engine optimization, paid social, and the analytics underneath all three.

Live at [mychalolguin.com](https://mychalolguin.com).

> **Working on this repo with an AI agent?** Read [`CLAUDE.md`](./CLAUDE.md) first, not
> this file. It is the source of truth on architecture, theming, and the design rules —
> particularly the ones about colour, which are easy to break by accident.

## Tech stack

- **React 19** + **TypeScript** (type-checking is `noEmit`; Vite does not type-check on build)
- **Vite 6** for dev and build
- **Tailwind CSS** via CDN, with its config inlined in `index.html` — there is no
  `tailwind.config.js` and no PostCSS step
- **Framer Motion** for entrances and page transitions
- **React Router** (`HashRouter`, so live URLs look like `/#/work/:slug`)
- **three.js** for the certification shelf, lazy-loaded into its own chunk

No backend and no data fetching. Every piece of content is a static literal in
`constants.ts`.

## Getting started

Requires Node 18+.

```bash
npm install
npm run dev       # Vite dev server on port 3000, host 0.0.0.0
npm run build     # production build -> dist/
npm run preview   # serve the built dist/
npx tsc --noEmit  # type-check; currently passes clean
```

There is no test suite, linter, or formatter configured.

## Project structure

```
├── components/
│   ├── Navbar.tsx / Footer.tsx / ThemeToggle.tsx / ScrollProgress.tsx
│   ├── Capture.tsx              # a real platform screenshot, cited like a source
│   ├── CaseStudyDashboard.tsx   # derives CPM, frequency, LPV rate from raw totals
│   ├── MediaTile.tsx            # rendered tiles for the Work index
│   ├── MeasurementNote.tsx
│   ├── MotionProvider.tsx       # forces reducedMotion: 'always' when asked
│   ├── PageTransition.tsx       # applied once, in App.tsx
│   ├── Reveal.tsx               # scroll-triggered entrances
│   ├── layout.ts                # CONTAINER + the shared button/link classes
│   └── shelf/                   # three.js certification shelf (see CLAUDE.md)
├── pages/                       # Home, Work, WorkDetail, Resume, Contact
├── hooks/                       # useSEO, useTheme, useReducedMotion
├── public/
│   ├── captures/                # platform screenshots (see the README in there)
│   ├── images/                  # headshot, Memoji
│   ├── favicon.png / apple-touch-icon.png
│   ├── Mychal_Olguin_Resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── constants.ts                 # PROJECTS, EXPERIENCE, CAPABILITIES — all site content
├── types.ts
└── index.html                   # theme tokens, Tailwind config, base meta, JSON-LD
```

## Content

All case studies, experience, and capability copy live in `constants.ts`; `types.ts`
defines their shapes. A `Project` has a small required core plus optional fields that
each unlock a section on the detail page.

Adding a case study means appending to `PROJECTS` and adding the slug to
`public/sitemap.xml`. Routing and next-project navigation both derive from array order.

Certifications are the one exception: they live in `components/shelf/catalog.ts`, which
feeds both the 3D shelf on the homepage and the Certifications section of the resume
page. Edit that one file and both update.

## Design

Two rules carry most of the weight, and both are easy to undo without noticing:

**One hue.** The site has a single colour — a deep pine green that means *forward*. It
is permitted in exactly five places: the primary button (one per view), the active nav
marker, focus rings, the full-bleed closing field at the end of a page, and chart series.
It is not a link colour, a hover tint, a card background, or a gradient. Everything else
is ink on paper.

**Colour encodes data, never decoration.** `--signal-up` / `--signal-down` appear only on
a real change in a real number; `--data-*` only inside charts.

Theme tokens are CSS custom properties in the `<style>` block of `index.html`, under
`:root` (light, the default) and `[data-theme="dark"]`. Six tokens are the source of
truth — `--paper`, `--ink`, `--graphite`, `--rule`, `--signal-up`, `--signal-down` — and
everything else derives from them. The older `--color-*` names are a compatibility layer
kept only because ~430 usages still reference them; new code should use the six directly.

Any new colour has to be added as a token in **both** theme blocks, or dark mode breaks.

Type is two families: DM Sans for everything readable, JetBrains Mono for every number
and label and nothing else.

There is no stock photography on this site, and none should be added — a generic image
undercuts the measurement argument the rest of the design is making.

`CLAUDE.md` covers all of this in more detail, along with the parts that have already
been broken once and shouldn't be re-broken.

## Deployment

Deployed on Vercel, linked to this repo. Pushing to `main` builds and ships to
production; pull requests get preview deployments.

Note that `public/sitemap.xml` lists non-hash paths while the router is a `HashRouter`,
so the two will drift until one of them changes.

## License

MIT. The certification shelf under `components/shelf/` is ported from the MIT-licensed
`complete-shelf` experience in `mintdotgg/mint-playground`; its `LICENSE` and
`THIRD_PARTY_NOTICES.md` stay in that directory.

## Contact

- **Email:** mychalolguin@gmail.com
- **LinkedIn:** [linkedin.com/in/mychalolguin](https://www.linkedin.com/in/mychalolguin/)
