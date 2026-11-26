// DataNusa — hand-drawn SVG charts. No libraries: every chart is built from
// plain numbers into SVG elements, so the whole site works offline.

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

// A line chart with labelled axes. points: [{label, value}].
export function lineChart(points, opts) {
  const o = Object.assign({ width: 640, height: 260, color: "#0f766e", unit: "", min: null }, opts);
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const w = o.width - padL - padR, h = o.height - padT - padB;
  const values = points.map((p) => p.value);
  const lo = o.min === null ? Math.min(0, ...values) : o.min;
  const hi = niceMax(Math.max(...values) * 1.05);
  const x = (i) => padL + (i / (points.length - 1)) * w;
  const y = (v) => padT + h - ((v - lo) / (hi - lo)) * h;
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const gv = lo + ((hi - lo) * g) / 4;
    const gy = y(gv);
    grid += `<line x1="${padL}" y1="${gy}" x2="${padL + w}" y2="${gy}" stroke="#e2e8f0" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#64748b">${gv.toFixed(gv < 10 ? 1 : 0)}${o.unit}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const dots = points.map((p, i) =>
    `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="3.5" fill="${o.color}"/>` +
    `<title>${esc(p.label)}: ${p.value}${o.unit}</title>`).join("");
  const labels = points.map((p, i) =>
    `<text x="${x(i)}" y="${o.height - 10}" text-anchor="middle" font-size="11" fill="#64748b">${esc(p.label)}</text>`).join("");
  const last = points[points.length - 1];
  return `<svg viewBox="0 0 ${o.width} ${o.height}" role="img" aria-label="Line chart, latest value ${last.value}${o.unit} in ${esc(last.label)}" class="chart">
    ${grid}
    <path d="${path}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${labels}
    <text x="${padL}" y="${padT - 4}" font-size="12" font-weight="600" fill="#0f172a">Latest: ${last.value}${o.unit} (${esc(last.label)})</text>
  </svg>`;
}

// Horizontal bars. rows: [{label, value, unit}]. Sorted by the caller.
export function barChart(rows, opts) {
  const o = Object.assign({ width: 640, rowH: 30, color: "#0f766e", unit: "%", decimals: 1 }, opts);
  const height = rows.length * o.rowH + 34;
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = 150, barMax = o.width - labelW - 70;
  let body = "";
  rows.forEach((r, i) => {
    const y = 26 + i * o.rowH;
    const bw = Math.max(2, (r.value / max) * barMax);
    body += `<text x="0" y="${y + 5}" font-size="12" fill="#0f172a">${esc(r.label)}</text>` +
      `<rect x="${labelW}" y="${y - 9}" width="${bw.toFixed(1)}" height="18" rx="4" fill="${o.color}"/>` +
      `<text x="${labelW + bw + 8}" y="${y + 5}" font-size="12" font-weight="600" fill="#0f172a">${r.value.toFixed(o.decimals)}${o.unit}</text>`;
  });
  return `<svg viewBox="0 0 ${o.width} ${height}" role="img" aria-label="Bar chart of ${rows.length} values" class="chart">${body}</svg>`;
}

// Simple vertical column chart for a short series.
export function columnChart(points, opts) {
  const o = Object.assign({ width: 640, height: 240, color: "#b45309", unit: "%" }, opts);
  const padL = 52, padR = 12, padT = 18, padB = 32;
  const w = o.width - padL - padR, h = o.height - padT - padB;
  const values = points.map((p) => p.value);
  const lo = Math.min(0, ...values), hi = niceMax(Math.max(...values) * 1.1);
  const slot = w / points.length;
  const bw = Math.min(52, slot * 0.6);
  const y = (v) => padT + h - ((v - lo) / (hi - lo)) * h;
  let grid = "";
  for (let g = 0; g <= 4; g++) {
    const gv = lo + ((hi - lo) * g) / 4;
    grid += `<line x1="${padL}" y1="${y(gv)}" x2="${padL + w}" y2="${y(gv)}" stroke="#e2e8f0"/>` +
      `<text x="${padL - 8}" y="${y(gv) + 4}" text-anchor="end" font-size="11" fill="#64748b">${gv.toFixed(1)}${o.unit}</text>`;
  }
  const cols = points.map((p, i) => {
    const cx = padL + i * slot + (slot - bw) / 2;
    const top = y(Math.max(p.value, 0)), base = y(Math.min(p.value, 0));
    const neg = p.value < 0;
    return `<rect x="${cx.toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(1, base - top).toFixed(1)}" rx="3" fill="${neg ? "#b91c1c" : o.color}"><title>${esc(p.label)}: ${p.value}${o.unit}</title></rect>` +
      `<text x="${(cx + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${p.value}${o.unit}</text>` +
      `<text x="${(cx + bw / 2).toFixed(1)}" y="${o.height - 8}" text-anchor="middle" font-size="11" fill="#64748b">${esc(p.label)}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${o.width} ${o.height}" role="img" aria-label="Column chart" class="chart">${grid}${cols}</svg>`;
}
