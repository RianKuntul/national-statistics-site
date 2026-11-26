// DataNusa — one render function per page. Each page is plain HTML built
// from data.js and charts.js, so every section is reachable by a link and
// every number carries its source and year.

import {
  KEY_FIGURES, POPULATION_SERIES, AGE_GROUPS, PROVINCES,
  GDP_SECTORS, GDP_GROWTH, INFLATION_SERIES, ECONOMY_FACTS, SOCIETY, RELEASES,
} from "./data.js";
import { lineChart, barChart, columnChart } from "./charts.js";

function sourceLine(source) {
  return `<p class="src">Source: ${source}</p>`;
}

function kpiCards(figures) {
  return `<div class="kpis">` + figures.map((f) => `
    <article class="kpi">
      <h3>${f.label}</h3>
      <p class="kpi-value">${f.value}</p>
      <p class="kpi-detail">${f.detail}</p>
      <p class="kpi-trend">${f.trend}</p>
      <p class="src">${f.source}</p>
    </article>`).join("") + `</div>`;
}

export function renderOverview() {
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia &middot; Official statistics, plainly explained</p>
    <h1>Indonesia in Numbers</h1>
    <p class="lede">Population, economy and everyday life — the figures that describe
    284 million people, with the source and year next to every number.</p>
    <p class="hero-links">
      <a class="btn" href="#/population">Explore population</a>
      <a class="btn ghost" href="#/economy">See the economy</a>
    </p>
  </section>
  ${kpiCards(KEY_FIGURES)}
  <section class="panel">
    <h2>Population growth, 2015–2025</h2>
    <p>Indonesia adds roughly 2.7 million people a year. The 2020 census counted
    270.2 million; the 2025 figure is a BPS projection.</p>
    ${lineChart(POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.value })), { unit: " jt", min: 240 })}
    ${sourceLine("BPS — Population Census 2020 and Population Projections 2020–2045")}
  </section>
  <section class="panel">
    <h2>Latest releases</h2>
    <ul class="releases">${RELEASES.slice(0, 4).map((r) => `
      <li><time>${r.date}</time> <strong>${r.title}</strong> <span class="tag">${r.org} · ${r.kind}</span></li>`).join("")}
    </ul>
    <p><a href="#/releases">All releases &rarr;</a></p>
  </section>`;
}

export function renderPopulation() {
  return `
  <section class="panel">
    <h1>Population</h1>
    <p class="lede">284.4 million people in 2025 (BPS projection), spread over 38 provinces
    and more than 17,000 islands. Java holds 56% of the population on 7% of the land.</p>
    ${lineChart(POPULATION_SERIES.map((p) => ({ label: String(p.year), value: p.value })), { unit: " jt", min: 240 })}
    ${sourceLine("BPS — Population Census 2020 and Population Projections 2020–2045")}
  </section>
  <section class="panel">
    <h2>Who lives here — by age, 2024</h2>
    <p>Indonesia is still young: the median age is about 30, and two in three people
    are of working age (15–64).</p>
    ${barChart(AGE_GROUPS.map((a) => ({ label: a.group + " yrs", value: a.value, unit: " jt" })), { unit: " jt", decimals: 1 })}
    ${sourceLine("BPS — Population by Age Group, 2024")}
  </section>
  <section class="panel">
    <h2>Ten largest provinces, 2024</h2>
    <p>Tap a column heading to sort. Population in millions; density is people per km&sup2;.</p>
    <table id="province-table" class="data-table">
      <thead><tr>
        <th data-sort="name">Province</th>
        <th data-sort="pop">Population (jt)</th>
        <th data-sort="density">Density /km&sup2;</th>
        <th data-sort="capital">Capital</th>
      </tr></thead>
      <tbody>${PROVINCES.map((p) => `
        <tr><td>${p.name}</td><td>${p.pop.toFixed(2)}</td><td>${p.density.toLocaleString("en-US")}</td><td>${p.capital}</td></tr>`).join("")}
      </tbody>
    </table>
    <p><button type="button" class="btn" id="download-provinces">Download table as CSV</button>
    <span class="src">The file holds the same ten provinces, ready for a spreadsheet.</span></p>
    ${sourceLine("BPS — Population by Province, 2024")}
  </section>`;
}

export function renderEconomy() {
  return `
  <section class="panel">
    <h1>Economy</h1>
    <p class="lede">Southeast Asia's largest economy: Rp22,138 trillion of GDP in 2024,
    growing 5.03% in real terms, with inflation back inside Bank Indonesia's target.</p>
    ${columnChart(GDP_GROWTH.map((g) => ({ label: String(g.year), value: g.value })), { unit: "%" })}
    ${sourceLine("BPS — Gross Domestic Product, 2020–2024")}
  </section>
  <section class="panel">
    <h2>What the economy is made of — GDP share, 2024</h2>
    <p>Manufacturing is still the biggest single sector, but services together
    are more than half of GDP.</p>
    ${barChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share, unit: "%" })), { unit: "%" })}
    ${sourceLine("BPS — GDP by Industry, 2024")}
  </section>
  <section class="panel">
    <h2>Inflation — December year-on-year</h2>
    <p>After the 2022 energy-price spike, inflation fell back to 1.57% by December 2024 —
    below Bank Indonesia's 2.5% &plusmn; 1% target band.</p>
    ${lineChart(INFLATION_SERIES.map((p) => ({ label: String(p.year), value: p.value })), { unit: "%", min: 0 })}
    ${sourceLine("BPS — Consumer Price Index, 2020–2024")}
  </section>
  <section class="panel">
    <h2>Trade &amp; money, 2024</h2>
    <div class="facts">${ECONOMY_FACTS.map((f) => `
      <div class="fact"><span class="fact-label">${f.label}</span>
      <span class="fact-value">${f.value}</span>
      <span class="src">${f.source}</span></div>`).join("")}
    </div>
  </section>`;
}

export function renderSociety() {
  return `
  <section class="panel">
    <h1>Society</h1>
    <p class="lede">How Indonesians live: poverty is at a record low, schooling keeps rising,
    and most workers are still informal.</p>
    <div class="soc-grid">${SOCIETY.map((s) => `
      <article class="soc-card">
        <h3>${s.label}</h3>
        <p class="soc-value">${s.value}</p>
        <p class="soc-note">${s.note}</p>
        <p class="src">BPS, ${s.year}</p>
      </article>`).join("")}
    </div>
    <p class="method-note">Poverty is measured against the BPS poverty line (about Rp595,000 per
    person per month in September 2024). The Gini ratio runs from 0 (perfect equality)
    to 1 (perfect inequality).</p>
  </section>`;
}

export function renderReleases() {
  return `
  <section class="panel">
    <h1>Releases</h1>
    <p class="lede">The newest numbers from BPS and Bank Indonesia, newest first.
    Each release below is a real publication cycle these agencies run.</p>
    <ul class="releases">${RELEASES.map((r) => `
      <li><time>${r.date}</time> <strong>${r.title}</strong>
      <span class="tag">${r.org} · ${r.kind}</span></li>`).join("")}
    </ul>
    <h2>How the numbers are made</h2>
    <p>BPS runs the population census every ten years (last: 2020), the intercensal
    survey in between, and monthly price surveys in 90 cities for the consumer price
    index. GDP is compiled quarterly from production, expenditure and income data.
    Bank Indonesia sets the policy rate and publishes reserves and the exchange rate.</p>
    <p><a href="#/">Back to the overview &rarr;</a></p>
  </section>`;
}
