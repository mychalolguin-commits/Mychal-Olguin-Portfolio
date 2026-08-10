# Platform captures

Drop your real platform screenshots in this folder. The site looks for these
exact filenames and swaps them in automatically — no code change needed.

| Filename | What it should show | Appears on |
|---|---|---|
| `ga4-overview.png` | GA4 acquisition or landing-page report for the Towne Oaks window | Homepage, below the headline |
| `search-console.png` | Search Console clicks + impressions trend | Homepage, tracking section |
| `meta-ads-manager.png` | Meta Ads Manager campaign table — spend, LP views, cost per LP view | Towne Oaks case study |
| `utm-taxonomy.png` | Your UTM sheet or naming convention (optional) | Towne Oaks case study |

Until a file exists, that slot falls back to a chart rendered from the real
numbers already in `constants.ts`, so the page is never broken or empty.

## Before you export

- **Blur or rename anything client-identifying** — property names, account IDs,
  billing details. The numbers are the point; the client's name isn't.
- Export the **widest window you can**. These run edge-to-edge, so bigger is
  better. 2x / retina if your screen supports it.
- PNG. Don't pre-crop them tightly — the site never crops a capture (that would
  let the layout decide which numbers a visitor gets to see), so whatever you
  export is exactly what shows.
- Light mode screenshots sit better on the cream background than dark ones.
