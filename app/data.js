/* DataNusa data file: every figure below is a published Indonesian national
   statistic, labelled with its source and reference year where it is shown.
   Sources: BPS — Statistics Indonesia; Bank Indonesia; Ministry of Finance.
   Figures are mid-year estimates or the release vintage named on the page. */

var DATA = {
  country: "Indonesia",
  updated: "November 2026",
  keyIndicators: [
    { label: "Population", value: "281.6m", note: "mid-year estimate, 2024", source: "BPS" },
    { label: "GDP growth", value: "5.03%", note: "real GDP, 2024", source: "BPS" },
    { label: "Inflation", value: "1.57%", note: "year-on-year, Dec 2024", source: "BPS" },
    { label: "Unemployment", value: "4.91%", note: "open unemployment, Aug 2024", source: "BPS" },
    { label: "Poverty rate", value: "8.57%", note: "24.06m people, Sep 2024", source: "BPS" },
    { label: "Human Development Index", value: "75.02", note: "high category, 2024", source: "BPS" }
  ],
  ticker: [
    "Population 281.6 million (2024)",
    "GDP grew 5.03% in 2024",
    "Inflation 1.57% in December 2024",
    "Unemployment 4.91% in August 2024",
    "Poverty 8.57% in September 2024",
    "Exports US$264.7 billion in 2024"
  ],
  populationSeries: [
    { year: 2010, value: 237.6 }, { year: 2015, value: 255.2 },
    { year: 2020, value: 270.2 }, { year: 2022, value: 275.8 },
    { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 }
  ],
  gdpGrowth: [
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 }
  ],
  inflation: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 }
  ],
  unemployment: [
    { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 }
  ],
  poverty: [
    { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
    { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
    { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 }
  ],
  ageStructure: [
    { group: "0–14 years", value: 23.9 },
    { group: "15–64 years", value: 68.6 },
    { group: "65+ years", value: 7.5 }
  ],
  gdpSectors: [
    { sector: "Manufacturing", value: 18.7 },
    { sector: "Wholesale & retail trade", value: 12.9 },
    { sector: "Agriculture, forestry & fishing", value: 12.5 },
    { sector: "Construction", value: 9.9 },
    { sector: "Mining & quarrying", value: 8.0 },
    { sector: "Transport & storage", value: 5.7 },
    { sector: "Financial services", value: 4.2 },
    { sector: "Information & communication", value: 4.1 },
    { sector: "Public administration", value: 4.0 },
    { sector: "All other services", value: 20.0 }
  ],
  provinces: [
    { name: "West Java", pop: 49.94, capital: "Bandung" },
    { name: "East Java", pop: 41.81, capital: "Surabaya" },
    { name: "Central Java", pop: 38.28, capital: "Semarang" },
    { name: "North Sumatra", pop: 15.59, capital: "Medan" },
    { name: "Banten", pop: 12.43, capital: "Serang" },
    { name: "Jakarta", pop: 10.68, capital: "Jakarta" },
    { name: "South Sulawesi", pop: 9.36, capital: "Makassar" },
    { name: "Lampung", pop: 9.22, capital: "Bandar Lampung" },
    { name: "South Sumatra", pop: 8.84, capital: "Palembang" },
    { name: "Riau", pop: 6.71, capital: "Pekanbaru" },
    { name: "West Kalimantan", pop: 5.80, capital: "Pontianak" },
    { name: "West Sumatra", pop: 5.76, capital: "Padang" },
    { name: "Aceh", pop: 5.56, capital: "Banda Aceh" },
    { name: "South Kalimantan", pop: 4.36, capital: "Banjarmasin" },
    { name: "Bali", pop: 4.34, capital: "Denpasar" },
    { name: "East Kalimantan", pop: 4.05, capital: "Samarinda" }
  ],
  society: [
    { label: "Life expectancy", value: "73.9 years", note: "at birth, 2023", source: "BPS" },
    { label: "Adult literacy", value: "96.0%", note: "ages 15+, 2023", source: "BPS" },
    { label: "Mean years of schooling", value: "9.0 years", note: "ages 25+, 2024", source: "BPS" },
    { label: "Stunting in under-5s", value: "21.5%", note: "2023 health survey", source: "Ministry of Health" },
    { label: "Health insurance coverage", value: "98.6%", note: "national scheme, 2024", source: "BPJS Kesehatan" },
    { label: "Informal employment", value: "58.0%", note: "share of workers, Aug 2024", source: "BPS" },
    { label: "Labour force", value: "152.1m", note: "people, Aug 2024", source: "BPS" },
    { label: "Internet users", value: "79.5%", note: "of population, 2024", source: "APJII survey" }
  ],
  trade: [
    { label: "Exports", value: "US$264.7bn", note: "2024", source: "BPS" },
    { label: "Imports", value: "US$233.7bn", note: "2024", source: "BPS" },
    { label: "Trade balance", value: "+US$31.0bn", note: "surplus, 2024", source: "BPS" },
    { label: "GDP per capita", value: "Rp 78.6m", note: "about US$4,960, 2024", source: "BPS" },
    { label: "Government debt", value: "39.8% of GDP", note: "end 2024", source: "Ministry of Finance" },
    { label: "Foreign reserves", value: "US$155.7bn", note: "end Dec 2024", source: "Bank Indonesia" }
  ],
  releases: [
    { date: "Feb 2025", title: "GDP full year 2024 — growth 5.03%", topic: "Economy", source: "BPS" },
    { date: "Jan 2025", title: "Poverty, September 2024 — rate 8.57%, 24.06 million people", topic: "Society", source: "BPS" },
    { date: "Nov 2024", title: "Labour force survey, August 2024 — unemployment 4.91%", topic: "Society", source: "BPS" },
    { date: "Dec 2024", title: "Inflation, November 2024 — 1.55% year-on-year", topic: "Economy", source: "BPS" },
    { date: "Nov 2024", title: "Human Development Index 2023 — 74.39", topic: "Society", source: "BPS" },
    { date: "Aug 2024", title: "Population estimate 2024 — 281.6 million", topic: "Population", source: "BPS" },
    { date: "Jul 2024", title: "Poverty, March 2024 — rate 9.03%", topic: "Society", source: "BPS" },
    { date: "May 2024", title: "GDP, first quarter 2024 — growth 5.11%", topic: "Economy", source: "BPS" },
    { date: "Mar 2024", title: "Labour force survey, February 2024 — unemployment 4.82%", topic: "Society", source: "BPS" },
    { date: "Feb 2024", title: "GDP full year 2023 — growth 5.05%", topic: "Economy", source: "BPS" }
  ]
};
