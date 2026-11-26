/* views.js — DataNusa page renderers. Each view returns HTML for #app and
   wires up its own controls (search, sort, chart switcher) after render. */

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function indicatorCards(list) {
  return '<div class="cards">' + list.map(function (k, i) {
    return '<article class="card' + (i === 0 ? " accent" : "") + '">' +
      '<div class="k-label">' + esc(k.label) + '</div>' +
      '<div class="k-value">' + esc(k.value) + '</div>' +
      '<div class="k-note">' + esc(k.note) + '</div>' +
      '<div class="k-source">Source: ' + esc(k.source) + '</div></article>';
  }).join("") + "</div>";
}

function releaseList(items, limit) {
  var shown = limit ? items.slice(0, limit) : items;
  return '<ul class="release-list">' + shown.map(function (r) {
    return '<li><span class="r-date">' + esc(r.date) + '</span>' +
      '<span class="r-title">' + esc(r.title) + '</span>' +
      '<span class="tag">' + esc(r.topic) + '</span></li>';
  }).join("") + "</ul>";
}

function topProvinces(n) {
  var rows = DATA.provinces.slice(0, n).map(function (p) {
    var share = (p.pop / 281.6 * 100).toFixed(1);
    return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.capital) + "</td>" +
      '<td class="num">' + p.pop.toFixed(2) + "</td>" +
      '<td class="num">' + share + "%</td></tr>";
  }).join("");
  return '<div class="table-wrap"><table class="data"><thead><tr>' +
    "<th>Province</th><th>Capital</th>" +
    '<th class="num">People (millions)</th><th class="num">Share of Indonesia</th>' +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>";
}

var Views = {
  home: function () {
    return '<section class="hero"><h1>Indonesia in numbers</h1>' +
      '<p class="lede">Population, the economy, work, education and health — the headline figures for the world\u2019s fourth most populous country, each with its source and year.</p>' +
      '<p class="updated">Figures as published · Last update: ' + esc(DATA.updated) + '</p></section>' +
      indicatorCards(DATA.keyIndicators) +
      '<div class="grid-2">' +
      '<section class="panel"><div class="panel-head"><h3>Population, 2010–2024</h3></div>' +
      lineChart(DATA.populationSeries, { label: "Population of Indonesia in millions, 2010 to 2024" }) +
      '<p class="source"><strong>Source:</strong> BPS — Statistics Indonesia, census 2010 and 2020, mid-year estimates. Millions of people.</p></section>' +
      '<section class="panel"><div class="panel-head"><h3>GDP growth, 2019–2024</h3></div>' +
      barChart(DATA.gdpGrowth, { label: "Real GDP growth in percent, 2019 to 2024", highlight: 2020 }) +
      '<p class="source"><strong>Source:</strong> BPS — Statistics Indonesia, national accounts. The 2020 fall is the COVID-19 contraction.</p></section>' +
      "</div>" +
      '<h2>Latest releases</h2>' +
      '<p class="section-note">The newest figures published by the statistics office, newest first.</p>' +
      '<section class="panel">' + releaseList(DATA.releases, 5) +
      '<p style="margin:14px 0 0"><a class="text-btn" href="#/releases">See all releases</a></p></section>' +
      '<h2>Where Indonesians live</h2>' +
      '<p class="section-note">The five largest provinces hold more than half the country\u2019s people. Java alone is home to about 55% of the population.</p>' +
      '<section class="panel">' + topProvinces(5) +
      '<p style="margin:14px 0 0"><a class="text-btn" href="#/population">Explore all provinces</a></p></section>' +
      '<div class="callout"><strong>How to read this site:</strong> every figure names its source and reference year. Figures labelled BPS come from Statistics Indonesia; trade and reserves figures come from BPS and Bank Indonesia. Nothing here is a projection unless it says so.</div>';
  },

  population: function () {
    return '<section class="hero"><h1>Population</h1>' +
      '<p class="lede">281.6 million people in 2024 — the fourth largest population in the world, spread across 38 provinces and more than 17,000 islands.</p></section>' +
      indicatorCards([
        { label: "Population", value: "281.6m", note: "mid-year estimate, 2024", source: "BPS" },
        { label: "Growth", value: "1.04%", note: "per year, 2023–2024", source: "BPS" },
        { label: "Density", value: "147/km²", note: "people per square km, 2024", source: "BPS" },
        { label: "Median age", value: "30.6 yrs", note: "2024 estimate", source: "BPS" },
        { label: "Urban share", value: "59.0%", note: "living in urban areas, 2024", source: "BPS" },
        { label: "Largest province", value: "West Java", note: "49.94 million people, 2024", source: "BPS" }
      ]) +
      '<div class="grid-2">' +
      '<section class="panel"><div class="panel-head"><h3>Population growth</h3></div>' +
      lineChart(DATA.populationSeries, { label: "Population of Indonesia in millions, 2010 to 2024" }) +
      '<p class="source"><strong>Source:</strong> BPS, census 2010 and 2020 and mid-year estimates. The population grew by about 44 million between the two censuses.</p></section>' +
      '<section class="panel"><div class="panel-head"><h3>Age structure, 2024</h3></div>' +
      donutChart(DATA.ageStructure.map(function (a) { return { label: a.group, value: a.value }; }), { centre: "68.6%", centreSub: "of working age", label: "Share of population by age group, 2024" }) +
      '<p class="source"><strong>Source:</strong> BPS population estimates, 2024. Two in three Indonesians are of working age (15–64).</p></section>' +
      "</div>" +
      '<h2>Provinces</h2>' +
      '<p class="section-note">Search by province or capital, or sort the table by tapping a column heading. Figures are 2024 mid-year estimates in millions; the table lists the 16 largest provinces.</p>' +
      '<section class="panel">' +
      '<div class="table-tools"><label for="prov-search">Search provinces</label>' +
      '<input type="search" id="prov-search" placeholder="Type a province or capital…" autocomplete="off">' +
      '<span id="prov-count" aria-live="polite"></span></div>' +
      '<div class="table-wrap"><table class="data" id="prov-table"><thead><tr>' +
      '<th><button data-sort="name" data-label="Province" type="button">Province</button></th>' +
      '<th><button data-sort="capital" data-label="Capital" type="button">Capital</button></th>' +
      '<th class="num"><button data-sort="pop" data-label="People (millions)" type="button">People (millions)</button></th>' +
      '<th class="num">Share of Indonesia</th>' +
      "</tr></thead><tbody id=\"prov-body\"></tbody></table></div>" +
      '<p style="margin:14px 0 0"><button class="text-btn" id="prov-csv" type="button">Download this table as CSV</button></p>' +
      '<p class="source"><strong>Source:</strong> BPS, provincial population estimates 2024. The remaining 22 provinces together hold about 36 million people.</p></section>';
  },

  economy: function () {
    return '<section class="hero"><h1>Economy</h1>' +
      '<p class="lede">Real GDP grew 5.03% in 2024, inflation ended the year at 1.57%, and exports of US$264.7 billion left a trade surplus of US$31.0 billion.</p></section>' +
      indicatorCards(DATA.trade.slice(0, 3).concat([
        { label: "GDP growth", value: "5.03%", note: "real GDP, 2024", source: "BPS" },
        { label: "Inflation", value: "1.57%", note: "year-on-year, Dec 2024", source: "BPS" },
        { label: "GDP per capita", value: "Rp 78.6m", note: "about US$4,960, 2024", source: "BPS" }
      ])) +
      '<section class="panel"><div class="panel-head"><h3 id="econ-chart-title">GDP growth, 2019–2024</h3>' +
      '<div class="seg" role="group" aria-label="Choose indicator">' +
      '<button type="button" data-metric="gdp" aria-pressed="true">GDP growth</button>' +
      '<button type="button" data-metric="inflation" aria-pressed="false">Inflation</button>' +
      '<button type="button" data-metric="unemployment" aria-pressed="false">Unemployment</button>' +
      "</div></div>" +
      '<div id="econ-chart">' + barChart(DATA.gdpGrowth, { label: "Real GDP growth in percent, 2019 to 2024", highlight: 2020 }) + "</div>" +
      '<p class="source" id="econ-source"><strong>Source:</strong> BPS — Statistics Indonesia, national accounts. Percent change on the previous year.</p></section>' +
      '<div class="grid-2">' +
      '<section class="panel"><div class="panel-head"><h3>What the economy makes</h3></div>' +
      donutChart(DATA.gdpSectors.map(function (s) { return { label: s.sector, value: s.value }; }), { centre: "18.7%", centreSub: "manufacturing", label: "Share of GDP by sector, 2024" }) +
      '<p class="source"><strong>Source:</strong> BPS, GDP by industry at current prices, 2024. Shares sum to 100%.</p></section>' +
      '<section class="panel"><div class="panel-head"><h3>Money and trade</h3></div>' +
      '<div class="cards" style="grid-template-columns:1fr 1fr;margin:0">' +
      DATA.trade.slice(3).map(function (t) {
        return '<article class="card"><div class="k-label">' + esc(t.label) + '</div>' +
          '<div class="k-value" style="font-size:26px">' + esc(t.value) + '</div>' +
          '<div class="k-note">' + esc(t.note) + '</div>' +
          '<div class="k-source">Source: ' + esc(t.source) + "</div></article>";
      }).join("") + "</div>" +
      '<p class="source"><strong>Sources:</strong> BPS (trade), Bank Indonesia (reserves), Ministry of Finance (debt).</p></section>' +
      "</div>";
  },

  society: function () {
    return '<section class="hero"><h1>Society</h1>' +
      '<p class="lede">Health, schooling and work: life expectancy 73.9 years, adult literacy 96.0%, and a poverty rate of 8.57% — the lowest on record.</p></section>' +
      indicatorCards(DATA.society.slice(0, 6)) +
      '<div class="grid-2">' +
      '<section class="panel"><div class="panel-head"><h3>Poverty rate, 2019–2024</h3></div>' +
      lineChart(DATA.poverty, { label: "Poverty rate in percent, 2019 to 2024" }) +
      '<p class="source"><strong>Source:</strong> BPS, September poverty releases. The 2020 rise follows the COVID-19 shock; the 2024 rate is the lowest since the series began.</p></section>' +
      '<section class="panel"><div class="panel-head"><h3>Unemployment, 2019–2024</h3></div>' +
      barChart(DATA.unemployment, { label: "Open unemployment rate in percent, 2019 to 2024", highlight: 2020 }) +
      '<p class="source"><strong>Source:</strong> BPS labour force surveys, August rounds. Open unemployment is the share of the labour force without work and looking for it.</p></section>' +
      "</div>" +
      '<h2>Education and health</h2>' +
      '<p class="section-note">Two more headline measures, and what sits behind them.</p>' +
      '<section class="panel"><div class="cards" style="grid-template-columns:1fr 1fr;margin:0">' +
      DATA.society.slice(6).map(function (t) {
        return '<article class="card"><div class="k-label">' + esc(t.label) + '</div>' +
          '<div class="k-value" style="font-size:26px">' + esc(t.value) + '</div>' +
          '<div class="k-note">' + esc(t.note) + '</div>' +
          '<div class="k-source">Source: ' + esc(t.source) + "</div></article>";
      }).join("") + "</div>" +
      '<p class="source"><strong>Sources:</strong> BPS labour force survey (Aug 2024) and APJII internet survey (2024).</p></section>' +
      '<div class="callout"><strong>Reading the poverty line:</strong> BPS sets the line from the cost of a minimum food and non-food basket, updated every March and September. In September 2024 it stood at Rp 595,242 per person per month.</div>';
  },

  releases: function () {
    return '<section class="hero"><h1>Releases</h1>' +
      '<p class="lede">Every release behind the figures on this site, newest first. Filter by topic to find the series you need.</p></section>' +
      '<section class="panel">' +
      '<div class="table-tools"><label for="rel-filter">Topic</label>' +
      '<select id="rel-filter"><option value="">All topics</option>' +
      '<option value="Population">Population</option><option value="Economy">Economy</option>' +
      '<option value="Society">Society</option></select>' +
      '<span id="rel-count" aria-live="polite"></span></div>' +
      '<div id="rel-list">' + releaseList(DATA.releases) + "</div></section>" +
      '<h2>Sources &amp; methods</h2>' +
      '<section class="panel"><h3>Where the numbers come from</h3>' +
      '<ul class="method-list">' +
      "<li><strong>BPS — Statistics Indonesia</strong> publishes the census, population estimates, national accounts, prices, labour force surveys, poverty and the Human Development Index used on this site.</li>" +
      "<li><strong>Bank Indonesia</strong> publishes foreign reserves and the balance of payments.</li>" +
      "<li><strong>Ministry of Finance</strong> publishes government debt.</li>" +
      "<li><strong>Ministry of Health</strong> publishes the stunting survey; <strong>BPJS Kesehatan</strong> reports health insurance coverage; <strong>APJII</strong> runs the annual internet survey.</li>" +
      "</ul>" +
      "<h3>How figures are shown</h3>" +
      '<ul class="method-list">' +
      "<li>Every figure is labelled with its source and reference year on the page where it appears.</li>" +
      "<li>Growth rates are percent change on the previous year unless a note says otherwise.</li>" +
      "<li>Population figures are mid-year estimates; census years are the census count.</li>" +
      "<li>Money figures are in rupiah unless marked US$; per-capita figures use the mid-year population.</li>" +
      "</ul>" +
      '<p class="source"><strong>Corrections:</strong> when a source agency revises a figure, DataNusa updates the page and notes the revision in the release list.</p></section>';
  }
};

/* Wire up the province table: live search + column sorting. */
function wirePopulation() {
  var body = document.getElementById("prov-body");
  var search = document.getElementById("prov-search");
  var count = document.getElementById("prov-count");
  var sortKey = "pop", sortDir = -1;
  function render() {
    var q = search.value.trim().toLowerCase();
    var rows = DATA.provinces.filter(function (p) {
      return !q || p.name.toLowerCase().indexOf(q) !== -1 || p.capital.toLowerCase().indexOf(q) !== -1;
    }).sort(function (a, b) {
      if (sortKey === "name" || sortKey === "capital") {
        return sortDir * a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDir * (a[sortKey] - b[sortKey]);
    });
    if (!rows.length) {
      body.innerHTML = '<tr><td colspan="4" class="empty-note">No province matches “' + esc(search.value.trim()) + '”. Try another name.</td></tr>';
    } else {
      body.innerHTML = rows.map(function (p) {
        var share = (p.pop / 281.6 * 100).toFixed(1);
        var bar = '<div class="share-bar"><i style="width:' + (p.pop / 49.94 * 100).toFixed(0) + '%"></i></div>';
        return "<tr><td>" + esc(p.name) + "</td><td>" + esc(p.capital) + "</td>" +
          '<td class="num">' + p.pop.toFixed(2) + "</td>" +
          '<td class="num">' + share + "% " + bar + "</td></tr>";
      }).join("");
    }
    count.textContent = rows.length + " of " + DATA.provinces.length + " provinces";
    /* Show which column is sorted and in which direction. */
    document.querySelectorAll("#prov-table button[data-sort]").forEach(function (btn) {
      var label = btn.getAttribute("data-label");
      var key = btn.getAttribute("data-sort");
      btn.textContent = label + (sortKey === key ? (sortDir === 1 ? " \u25B2" : " \u25BC") : "");
      btn.setAttribute("aria-sort", sortKey === key ? (sortDir === 1 ? "ascending" : "descending") : "none");
    });
    /* Keep the current filtered rows for the CSV download. */
    currentRows = rows;
  }
  search.addEventListener("input", render);
  var table = document.getElementById("prov-table");
  table.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-sort]");
    if (!btn) return;
    var key = btn.getAttribute("data-sort");
    if (sortKey === key) { sortDir = -sortDir; } else { sortKey = key; sortDir = key === "pop" ? -1 : 1; }
    render();
  });
  /* Download the table as shown (current search + sort) as a CSV file. */
  var currentRows = DATA.provinces.slice();
  document.getElementById("prov-csv").addEventListener("click", function () {
    var lines = ["Province,Capital,People (millions),Share of Indonesia (%)"];
    currentRows.forEach(function (p) {
      lines.push('"' + p.name + '","' + p.capital + '",' + p.pop.toFixed(2) + "," + (p.pop / 281.6 * 100).toFixed(1));
    });
    var blob = new Blob([lines.join("\n") + "\n"], { type: "text/csv" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "datanusa-provinces-2024.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
  render();
}

/* Wire up the economy chart switcher. */
function wireEconomy() {
  var metrics = {
    gdp: { title: "GDP growth, 2019–2024", series: DATA.gdpGrowth, note: "<strong>Source:</strong> BPS — Statistics Indonesia, national accounts. Percent change on the previous year.", type: "bar" },
    inflation: { title: "Inflation, 2019–2024", series: DATA.inflation, note: "<strong>Source:</strong> BPS — Statistics Indonesia, consumer price index. Year-on-year change in December.", type: "line" },
    unemployment: { title: "Unemployment, 2019–2024", series: DATA.unemployment, note: "<strong>Source:</strong> BPS — Statistics Indonesia, labour force surveys, August rounds. Share of the labour force.", type: "bar" }
  };
  var box = document.getElementById("econ-chart");
  var title = document.getElementById("econ-chart-title");
  var source = document.getElementById("econ-source");
  document.querySelectorAll(".seg button[data-metric]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".seg button[data-metric]").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var m = metrics[btn.getAttribute("data-metric")];
      title.textContent = m.title;
      box.innerHTML = m.type === "line" ? lineChart(m.series, { label: m.title }) : barChart(m.series, { label: m.title, highlight: 2020 });
      source.innerHTML = m.note;
    });
  });
}

/* Wire up the releases topic filter. */
function wireReleases() {
  var select = document.getElementById("rel-filter");
  var list = document.getElementById("rel-list");
  var count = document.getElementById("rel-count");
  function render() {
    var topic = select.value;
    var items = topic ? DATA.releases.filter(function (r) { return r.topic === topic; }) : DATA.releases;
    list.innerHTML = items.length ? releaseList(items) : '<p class="empty-note">No releases on that topic yet.</p>';
    count.textContent = items.length + " release" + (items.length === 1 ? "" : "s");
  }
  select.addEventListener("change", render);
  render();
}
