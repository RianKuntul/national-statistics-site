/* charts.js — small hand-written SVG charts for DataNusa. No library:
   line charts, bar charts and donut charts built as SVG strings. */

function svgEl(tag, attrs, inner) {
  var s = "<" + tag;
  for (var k in attrs) s += " " + k + '="' + attrs[k] + '"';
  return inner === undefined ? s + "/>" : s + ">" + inner + "</" + tag + ">";
}

function niceTicks(min, max, count) {
  var step = (max - min) / count, mag = Math.pow(10, Math.floor(Math.log10(step)));
  var norm = step / mag;
  var nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  step = nice * mag;
  var start = Math.floor(min / step) * step, out = [];
  for (var v = start; v <= max + 1e-9; v += step) out.push(v);
  return { step: step, values: out };
}

/* Line chart: series of {year, value}. Returns an SVG string. */
function lineChart(series, opts) {
  var w = opts.width || 640, h = opts.height || 280;
  var padL = 52, padR = 16, padT = 18, padB = 34;
  var vals = series.map(function (d) { return d.value; });
  var min = Math.min.apply(null, vals), max = Math.max.apply(null, vals);
  var span = max - min || 1;
  min -= span * 0.15; max += span * 0.15;
  var ticks = niceTicks(min, max, 4);
  var x = function (i) { return padL + i * (w - padL - padR) / (series.length - 1); };
  var y = function (v) { return padT + (1 - (v - min) / (max - min)) * (h - padT - padB); };
  var parts = [];
  ticks.values.forEach(function (t) {
    if (t < min || t > max) return;
    parts.push(svgEl("line", { x1: padL, x2: w - padR, y1: y(t), y2: y(t), stroke: "#e3e8e6", "stroke-width": 1 }));
    parts.push(svgEl("text", { x: padL - 8, y: y(t) + 4, "text-anchor": "end", "font-size": 12, fill: "#5a6b68" }, String(Math.round(t * 100) / 100)));
  });
  var path = series.map(function (d, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(d.value).toFixed(1); }).join(" ");
  var area = path + " L" + x(series.length - 1).toFixed(1) + " " + y(min).toFixed(1) + " L" + x(0).toFixed(1) + " " + y(min).toFixed(1) + " Z";
  parts.push(svgEl("path", { d: area, fill: "#0b5e5a", opacity: 0.08 }));
  parts.push(svgEl("path", { d: path, fill: "none", stroke: "#0b5e5a", "stroke-width": 3, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  series.forEach(function (d, i) {
    parts.push(svgEl("circle", { cx: x(i), cy: y(d.value), r: 4.5, fill: "#ffffff", stroke: "#0b5e5a", "stroke-width": 2.5 }));
    /* First point's label sits next to the y-axis ticks, so anchor it to the
       right of its point instead of centred above it. */
    if (i === 0) {
      parts.push(svgEl("text", { x: x(i) + 9, y: y(d.value) + 4, "text-anchor": "start", "font-size": 12, "font-weight": 700, fill: "#10302e" }, String(d.value)));
    } else {
      parts.push(svgEl("text", { x: x(i), y: y(d.value) - 11, "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: "#10302e" }, String(d.value)));
    }
    parts.push(svgEl("text", { x: x(i), y: h - 10, "text-anchor": "middle", "font-size": 12, fill: "#5a6b68" }, String(d.year)));
  });
  return svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": opts.label || "Line chart", class: "chart-svg" }, parts.join(""));
}

/* Bar chart: series of {year, value}. Bars with value labels. */
function barChart(series, opts) {
  var w = opts.width || 640, h = opts.height || 280;
  var padL = 52, padR = 16, padT = 24, padB = 34;
  var vals = series.map(function (d) { return d.value; });
  var min = Math.min(0, Math.min.apply(null, vals)), max = Math.max.apply(null, vals);
  var ticks = niceTicks(min, max, 4);
  var bw = (w - padL - padR) / series.length;
  var y = function (v) { return padT + (1 - (v - min) / (max - min)) * (h - padT - padB); };
  var parts = [];
  ticks.values.forEach(function (t) {
    if (t < min || t > max) return;
    parts.push(svgEl("line", { x1: padL, x2: w - padR, y1: y(t), y2: y(t), stroke: "#e3e8e6", "stroke-width": 1 }));
    parts.push(svgEl("text", { x: padL - 8, y: y(t) + 4, "text-anchor": "end", "font-size": 12, fill: "#5a6b68" }, String(Math.round(t * 100) / 100)));
  });
  if (min < 0) parts.push(svgEl("line", { x1: padL, x2: w - padR, y1: y(0), y2: y(0), stroke: "#9aa8a5", "stroke-width": 1.5 }));
  series.forEach(function (d, i) {
    var bx = padL + i * bw + bw * 0.18, bwid = bw * 0.64;
    var top = y(Math.max(d.value, 0)), bot = y(Math.min(d.value, 0));
    var fill = d.value < 0 ? "#c0392b" : (opts.highlight === d.year ? "#f5b942" : "#0b5e5a");
    parts.push(svgEl("rect", { x: bx.toFixed(1), y: top.toFixed(1), width: bwid.toFixed(1), height: Math.max(1, bot - top).toFixed(1), rx: 4, fill: fill }));
    parts.push(svgEl("text", { x: (bx + bwid / 2).toFixed(1), y: (d.value < 0 ? bot + 16 : top - 7).toFixed(1), "text-anchor": "middle", "font-size": 12, "font-weight": 700, fill: d.value < 0 ? "#c0392b" : "#10302e" }, String(d.value)));
    parts.push(svgEl("text", { x: (padL + i * bw + bw / 2).toFixed(1), y: h - 10, "text-anchor": "middle", "font-size": 12, fill: "#5a6b68" }, String(d.year)));
  });
  return svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": opts.label || "Bar chart", class: "chart-svg" }, parts.join(""));
}

/* Donut chart: slices of {label, value}. Returns SVG plus a legend list. */
function donutChart(slices, opts) {
  var size = opts.size || 240, thick = opts.thickness || 42;
  var cx = size / 2, cy = size / 2, r = size / 2 - 6, inner = r - thick;
  var total = slices.reduce(function (a, s) { return a + s.value; }, 0);
  var colors = ["#0b5e5a", "#f5b942", "#3a8ea5", "#7fb069", "#e07a5f", "#6d597a", "#9aa8a5", "#2a9d8f", "#c9a227", "#577590"];
  var parts = [], angle = -Math.PI / 2;
  slices.forEach(function (s, i) {
    var frac = s.value / total, a0 = angle, a1 = angle + frac * Math.PI * 2;
    angle = a1;
    var large = frac > 0.5 ? 1 : 0;
    var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    var x2 = cx + inner * Math.cos(a1), y2 = cy + inner * Math.sin(a1);
    var x3 = cx + inner * Math.cos(a0), y3 = cy + inner * Math.sin(a0);
    var d = "M" + x0.toFixed(1) + " " + y0.toFixed(1) + " A" + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) +
      " L" + x2.toFixed(1) + " " + y2.toFixed(1) + " A" + inner + " " + inner + " 0 " + large + " 0 " + x3.toFixed(1) + " " + y3.toFixed(1) + " Z";
    parts.push(svgEl("path", { d: d, fill: colors[i % colors.length], stroke: "#ffffff", "stroke-width": 2 }));
  });
  parts.push(svgEl("text", { x: cx, y: cy - 4, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#10302e" }, opts.centre || ""));
  parts.push(svgEl("text", { x: cx, y: cy + 18, "text-anchor": "middle", "font-size": 12, fill: "#5a6b68" }, opts.centreSub || ""));
  var svg = svgEl("svg", { viewBox: "0 0 " + size + " " + size, role: "img", "aria-label": opts.label || "Donut chart", class: "chart-svg donut" }, parts.join(""));
  var legend = slices.map(function (s, i) {
    return '<li><span class="swatch" style="background:' + colors[i % colors.length] + '"></span>' +
      '<span class="legend-label">' + s.label + '</span><strong>' + s.value + '%</strong></li>';
  }).join("");
  return '<div class="donut-wrap">' + svg + '<ul class="legend">' + legend + "</ul></div>";
}
