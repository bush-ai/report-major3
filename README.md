README.md
# BushAI Championship Sunday Report

A single-page React/Vite report site that presents the BushAI Championship Sunday results in a polished, dashboard-style format.

The app loads a static JSON report file and renders a full visual recap, including:

- Championship overview
- Award winners
- Team rankings
- Player rankings
- MVP spotlight
- Signature moment
- Champion roster
- Key games
- Storylines
- Analytics charts

The site is built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Recharts.

## What this project is

This project is a static web report for a BushAI gaming/tournament recap. It turns structured report data into a polished interactive page with navigation, animated sections, ranking cards, and charts.

The main app loads its report data from:

```txt
public/data/raw-data-final-report-view.json
```

The app then passes that data into sections like Hero, Awards, Team Rankings, Player Rankings, Charts, and Storylines.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- Radix UI components

## Running locally

Clone the repo:

```bash
git clone https://github.com/bush-ai/report-major3.git
cd report-major3
```

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Then open the local URL Vite gives you, usually:

```txt
http://localhost:5173
```

## Build for production

```bash
npm run build
```

The production files will be created in:

```txt
dist
```

## Preview production build locally

```bash
npm run preview
```

## Deploying to GitHub Pages

This project includes a GitHub Actions workflow that builds the Vite app and deploys the `dist` folder to GitHub Pages.

Important: because this is deployed under the repo path, the Vite base path should match the repository name:

```ts
base: "/report-major3/"
```

That setting lives in:

```txt
vite.config.ts
```

## Data updates

To update the report content, edit or replace:

```txt
public/data/raw-data-final-report-view.json
```

The app expects the JSON to include sections such as:

- `heroSummary`
- `awards`
- `teamRankings`
- `playerRankings`
- `keyGames`
- `storylines`
- `chartData`

## Project structure

```txt
src/
  App.tsx                Main app layout and data loading
  main.tsx               React entry point
  index.css              Global styles and BushAI theme
  components/            Report sections and UI components

public/
  data/
    raw-data-final-report-view.json
```

## Notes

This is a static frontend app. There is no backend or database required. All report content is loaded from the JSON file in the `public/data` folder.
