// DataNusa — figures for Indonesia, each with its source and year.
// All figures are public statistics from BPS (Statistics Indonesia) and
// Bank Indonesia, rounded for display. Years are shown next to every figure
// on the site so a visitor can see how fresh each number is.

export const META = {
  country: "Indonesia",
  updated: "26 November 2026",
  note: "Figures are rounded for display. See each section for source and year.",
};

export const KEY_FIGURES = [
  { id: "population", label: "Population", value: "284.4 jt", detail: "2025 projection", source: "BPS, 2025", trend: "+0.8% / yr" },
  { id: "gdp", label: "GDP (nominal)", value: "Rp22.138 T", detail: "2024, current prices", source: "BPS, 2024", trend: "+5.03% real" },
  { id: "gdp-capita", label: "GDP per capita", value: "US$4.925", detail: "2024", source: "BPS, 2024", trend: "+4.1% vs 2023" },
  { id: "inflation", label: "Inflation (yoy)", value: "1.57%", detail: "December 2024", source: "BPS, 2024", trend: "within BI target" },
  { id: "poverty", label: "Poverty rate", value: "8.57%", detail: "September 2024", source: "BPS, 2024", trend: "down from 9.03%" },
  { id: "unemployment", label: "Open unemployment", value: "4.91%", detail: "August 2024", source: "BPS, 2024", trend: "down from 5.32%" },
  { id: "life", label: "Life expectancy", value: "74.15 yrs", detail: "2024", source: "BPS, 2024", trend: "+0.20 vs 2023" },
  { id: "literacy", label: "Adult literacy", value: "96.1%", detail: "2024, age 15+", source: "BPS, 2024", trend: "+0.3 pts" },
];

// Population in millions, 2015-2025 (BPS projections; 2020 is the census count).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.6 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
  { year: 2025, value: 284.4 },
];

// Population by age group, 2024 (millions, BPS).
export const AGE_GROUPS = [
  { group: "0–14", value: 67.9 },
  { group: "15–24", value: 45.6 },
  { group: "25–34", value: 45.2 },
  { group: "35–44", value: 41.8 },
  { group: "45–54", value: 35.4 },
  { group: "55–64", value: 24.9 },
  { group: "65+", value: 20.8 },
];

// Ten most populous provinces, 2024 (BPS). Density per km².
export const PROVINCES = [
  { name: "Jawa Barat", pop: 50.35, density: 1425, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.81, density: 874, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 37.89, density: 1155, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 16.03, density: 220, capital: "Medan" },
  { name: "Banten", pop: 12.43, density: 1288, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.56, density: 15904, capital: "Jakarta" },
  { name: "Sulawesi Selatan", pop: 9.36, density: 200, capital: "Makassar" },
  { name: "Lampung", pop: 9.22, density: 266, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 8.92, density: 97, capital: "Palembang" },
  { name: "Riau", pop: 6.96, density: 80, capital: "Pekanbaru" },
];

// GDP by sector, share of GDP 2024 in % (BPS).
export const GDP_SECTORS = [
  { sector: "Manufacturing", share: 18.9 },
  { sector: "Trade & repair", share: 12.9 },
  { sector: "Agriculture", share: 12.5 },
  { sector: "Construction", share: 9.9 },
  { sector: "Mining & quarrying", share: 8.0 },
  { sector: "Transport & storage", share: 5.4 },
  { sector: "Information & comm.", share: 4.4 },
  { sector: "Finance & insurance", share: 4.3 },
  { sector: "Other services", share: 23.7 },
];

// Real GDP growth by year, % (BPS).
export const GDP_GROWTH = [
  { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 },
  { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Consumer-price inflation, December yoy, % (BPS).
export const INFLATION_SERIES = [
  { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Trade and money, 2024 (Bank Indonesia / BPS).
export const ECONOMY_FACTS = [
  { label: "Exports", value: "US$264.7 bn", source: "BPS, 2024" },
  { label: "Imports", value: "US$233.7 bn", source: "BPS, 2024" },
  { label: "Trade balance", value: "+US$31.0 bn", source: "BPS, 2024" },
  { label: "BI policy rate", value: "6.00%", source: "Bank Indonesia, Dec 2024" },
  { label: "Rupiah vs USD", value: "Rp16.157", source: "Bank Indonesia, end 2024" },
  { label: "Foreign reserves", value: "US$155.7 bn", source: "Bank Indonesia, Dec 2024" },
];

// Society indicators (BPS, 2024 unless noted).
export const SOCIETY = [
  { label: "Poverty rate", value: "8.57%", year: "Sep 2024", note: "24.06 million people below the poverty line." },
  { label: "Extreme poverty", value: "0.83%", year: "Mar 2024", note: "Down from 1.12% in March 2023." },
  { label: "Gini ratio", value: "0.379", year: "Mar 2024", note: "Slightly lower than 0.388 a year earlier." },
  { label: "Life expectancy", value: "74.15 years", year: "2024", note: "Highest in Yogyakarta (75.9), lowest in Sulawesi Barat." },
  { label: "Mean years of schooling", value: "9.0 years", year: "2024", note: "Up from 8.7 years in 2021." },
  { label: "Adult literacy (15+)", value: "96.1%", year: "2024", note: "Youth literacy (15–24) is 99.7%." },
  { label: "Open unemployment", value: "4.91%", year: "Aug 2024", note: "7.47 million people; youth unemployment is far higher." },
  { label: "Informal workers", value: "57.9%", year: "Aug 2024", note: "Share of workers in informal employment." },
  { label: "Internet users", value: "79.5%", year: "2024", note: "APJII survey; 221 million Indonesians online." },
];

// Recent statistical releases.
export const RELEASES = [
  { date: "2026-11-03", title: "Consumer Price Index — October 2026", org: "BPS", kind: "Monthly" },
  { date: "2026-10-15", title: "Labour Force Situation — August 2026", org: "BPS", kind: "Semester" },
  { date: "2026-10-07", title: "Exports & Imports — September 2026", org: "BPS", kind: "Monthly" },
  { date: "2026-10-01", title: "Gross Domestic Product — Q2 2026", org: "BPS", kind: "Quarterly" },
  { date: "2026-09-15", title: "Poverty Profile — March 2026", org: "BPS", kind: "Semester" },
  { date: "2026-09-05", title: "Economic Growth — Q2 2026", org: "BPS", kind: "Quarterly" },
  { date: "2026-08-15", title: "Population Projection Update 2025–2045", org: "BPS", kind: "Special" },
  { date: "2026-07-01", title: "Human Development Index 2025", org: "BPS", kind: "Annual" },
];
