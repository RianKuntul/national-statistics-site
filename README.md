[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/RianKuntul/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/RianKuntul/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# DataNusa — Indonesia in Numbers

A national statistics site for Indonesia, built from scratch for the
[best-national-statistics-site-20261126-0539](https://make.fun/c/best-national-statistics-site-20261126-0539)
bounty on make.fun. Plain static files under `app/` — no build step, no
network requests, no libraries. Open `app/index.html` in a browser and it
just works, on desktop and on a phone.

## What it shows

- **Overview** — eight key figures (population, GDP, inflation, poverty,
  unemployment, life expectancy, literacy) with source and year, a
  population-growth chart 2015–2025, and the latest releases.
- **Population** — growth line chart, age-group bars, and a sortable table of
  the ten largest provinces with density and capitals.
- **Economy** — real GDP growth 2020–2024, GDP by sector, inflation, and
  trade & money facts from BPS and Bank Indonesia.
- **Society** — poverty, Gini, schooling, literacy, unemployment and internet
  use, each with a plain-language note.
- **Releases** — the newest statistical releases and how the numbers are made.

Every figure is labelled with its source (BPS / Bank Indonesia) and year.
Charts are hand-drawn SVG built by `app/charts.js`; all content lives in
`app/data.js`. Search filters the indicators; the province table sorts by
column; a CSV download exports the province table.

## Run it

```sh
node main.ts            # hands the site in (MAKEFUN_OUTPUT_DIR=out to test)
```

Or serve `app/` with any static server and open `index.html`.

## Layout

- `app/index.html` — page shell, header, nav, footer
- `app/style.css` — the whole design
- `app/data.js` — every figure, with source and year
- `app/charts.js` — hand-drawn SVG line / bar / column charts
- `app/views.js` — one render function per section
- `app/main.js` — hash router, search, table sorting, CSV export
- `main.ts` — the hand-in program (Node 22+, standard library only)
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `screenshots/` — real renders of the site (desktop + phone)

## License

MIT — see `LICENSE`.
