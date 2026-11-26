// DataNusa — router, search and table sorting. Hash routes only, so the site
// works from any static server with no build step.

import { renderOverview, renderPopulation, renderEconomy, renderSociety, renderReleases } from "./views.js";
import { KEY_FIGURES, PROVINCES } from "./data.js";

const ROUTES = {
  "/": { render: renderOverview, title: "Overview" },
  "/population": { render: renderPopulation, title: "Population" },
  "/economy": { render: renderEconomy, title: "Economy" },
  "/society": { render: renderSociety, title: "Society" },
  "/releases": { render: renderReleases, title: "Releases" },
};

const app = document.getElementById("app");

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  return ROUTES[hash] ? hash : "/";
}

function render() {
  const route = currentRoute();
  app.innerHTML = ROUTES[route].render();
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + route);
  });
  document.title = `DataNusa — ${ROUTES[route].title} · Indonesia in Numbers`;
  wireTableSort();
  wireCsvDownload();
  window.scrollTo(0, 0);
}

// Download the province table as a CSV file, built from the same data the
// table shows, so the numbers a visitor copies match the numbers on screen.
function wireCsvDownload() {
  const button = document.getElementById("download-provinces");
  if (!button) return;
  button.addEventListener("click", () => {
    const header = "Province,Population (millions),Density per km2,Capital";
    const lines = PROVINCES.map((p) => `${p.name},${p.pop},${p.density},${p.capital}`);
    const csv = [header, ...lines].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "datanusa-largest-provinces-2024.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });
}

// Click a table heading to sort that column; click again to reverse.
function wireTableSort() {
  const table = document.getElementById("province-table");
  if (!table) return;
  const state = { key: null, dir: 1 };
  table.querySelectorAll("th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      state.dir = state.key === key ? -state.dir : 1;
      state.key = key;
      const col = Array.from(th.parentNode.children).indexOf(th);
      const rows = Array.from(table.tBodies[0].rows);
      rows.sort((a, b) => {
        const av = a.cells[col].textContent.trim();
        const bv = b.cells[col].textContent.trim();
        const an = parseFloat(av.replace(/,/g, ""));
        const bn = parseFloat(bv.replace(/,/g, ""));
        const cmp = !Number.isNaN(an) && !Number.isNaN(bn) ? an - bn : av.localeCompare(bv);
        return cmp * state.dir;
      });
      rows.forEach((r) => table.tBodies[0].appendChild(r));
      table.querySelectorAll("th").forEach((h) => h.classList.remove("sorted-asc", "sorted-desc"));
      th.classList.add(state.dir === 1 ? "sorted-asc" : "sorted-desc");
    });
  });
}

// Search filters the key-figure cards on the overview page.
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (currentRoute() !== "/") window.location.hash = "#/";
  const cards = document.querySelectorAll(".kpi");
  cards.forEach((card) => {
    const hit = !q || card.textContent.toLowerCase().includes(q);
    card.style.display = hit ? "" : "none";
  });
  const empty = document.getElementById("no-results");
  if (q && document.querySelectorAll(".kpi:not([style*='none'])").length === 0) {
    if (!empty) {
      const p = document.createElement("p");
      p.id = "no-results";
      p.className = "no-results";
      p.textContent = `No indicator matches “${searchInput.value.trim()}”. Try “inflation”, “poverty” or “population”.`;
      document.querySelector(".kpis").after(p);
    }
  } else if (empty) {
    empty.remove();
  }
});

// Search hint: list the searchable indicators under the box.
const hint = document.getElementById("search-hint");
hint.textContent = "Try: " + KEY_FIGURES.map((f) => f.label.toLowerCase()).slice(0, 5).join(", ") + "…";

window.addEventListener("hashchange", render);
render();
