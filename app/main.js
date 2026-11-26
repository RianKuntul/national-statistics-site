/* main.js — DataNusa router. Hash routes: #/ (overview), #/population,
   #/economy, #/society, #/releases. Renders the view, marks the active
   nav link, wires the view's controls, and scrolls to the top. */

(function () {
  var app = document.getElementById("app");
  var ticker = document.getElementById("ticker");
  var routes = {
    "": "home",
    "population": "population",
    "economy": "economy",
    "society": "society",
    "releases": "releases"
  };

  ticker.innerHTML = DATA.ticker.map(function (t) { return "<span>" + t + "</span>"; }).join("");

  function route() {
    var hash = window.location.hash.replace(/^#\/?/, "").split("?")[0];
    var name = routes[hash] || "home";
    app.innerHTML = Views[name]();
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      if (a.getAttribute("data-nav") === name) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      } else {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      }
    });
    if (name === "population") wirePopulation();
    if (name === "economy") wireEconomy();
    if (name === "releases") wireReleases();
    document.title = "DataNusa — " + ({ home: "Indonesia in Numbers", population: "Population", economy: "Economy", society: "Society", releases: "Releases" })[name];
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();
