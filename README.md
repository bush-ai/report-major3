# BushAI Championship Sunday Report

A static dark-premium esports analytics site built with React, Vite, Tailwind CSS v4, Recharts, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for deployment

```bash
npm run build
```

The output is in `dist/` — upload that folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).

## Project structure

```
src/
  App.tsx                  # Root: fetches JSON, renders all sections
  main.tsx                 # Entry point
  index.css                # Global styles, Tailwind theme tokens, brand colors
  assets/
    bushAiLogo_*.png       # BushAI logo
  components/
    Navbar.tsx             # Sticky nav with smooth-scroll
    Hero.tsx               # Logo, headline, quick facts, feature cards
    Awards.tsx             # Six award cards
    TeamRankings.tsx       # Sortable table + bar chart
    PlayerRankings.tsx     # Searchable/filterable player table
    MvpSpotlight.tsx       # Full-width Cammy spotlight
    SignatureMoment.tsx    # Capsidal 45-kill SAKE moment
    ChampionRoster.tsx     # TBG roster cards
    KeyGames.tsx           # Tabbed match history
    Storylines.tsx         # Narrative cards
    Charts.tsx             # Recharts dashboard (3 charts)
    SectionHeader.tsx      # Reusable section title
    LoadingState.tsx       # Loading spinner
    ui/                    # shadcn/ui components
public/
  data/
    raw-data-final-report-view.json   # Main report data (loaded at runtime)
    raw-data-final-enrich.json        # Enriched map-level data
```

## Updating the data

All stats are read at runtime from `public/data/raw-data-final-report-view.json`. Replace that file with a new report's JSON and rebuild to update the site.

## Hosting on GitHub Pages

1. Run `npm run build`
2. Push the `dist/` folder to a `gh-pages` branch, or use the [GitHub Pages GitHub Action](https://github.com/peaceiris/actions-gh-pages)
3. Set the GitHub Pages source to the `gh-pages` branch root

## Brand colors

| Token | Hex |
|---|---|
| Background | `#07070d` |
| Card | `#141421` |
| Purple accent | `#a855f7` |
| Pink accent | `#ec4899` |
| White text | `#f8fafc` |
| Muted text | `#a1a1aa` |
