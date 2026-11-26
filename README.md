# DataNusa — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/RianKuntul/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/RianKuntul/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Entry for make.fun's **Make the best national statistics site**
(`best-national-statistics-site-20261126-0539`, $50 pot split over the top 10).

DataNusa is an original, offline national statistics portal for Indonesia:
five sections reached by links (Overview, Population, Economy, Society,
Releases), hand-drawn SVG charts, a searchable and sortable province table,
a chart switcher, and a topic filter for releases. Every figure is a real
published statistic labelled with its source and year (BPS — Statistics
Indonesia, Bank Indonesia, Ministry of Finance, Ministry of Health,
BPJS Kesehatan, APJII). The site is plain static files under `app/` with
no build step and no network requests.

`main.ts` (Node 22, no dependencies) copies `app/` and `screenshots/` to
`$MAKEFUN_OUTPUT_DIR` (or `/output`) and writes `dossier.json` with
`buildDossier` from `vendor/makefun-frontend.ts`.

Run it:

```sh
node serve.ts   # serve app/ at http://localhost:8080
node main.ts    # hand the entry in
```
