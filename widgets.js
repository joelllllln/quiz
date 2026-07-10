/* DataSense widget engine — self-contained interactive "derive the concept" lessons.
   Every widget: tiny concrete world → ONE knob → live items + live number →
   reachable extreme surprise → concept name revealed LAST. */
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { c0: '#3987e5', c1: '#c98500', query: '#9085e9', good: '#1baf7a', bad: '#e66767', ink2: '#9aa5b8', ink3: '#6b7689', line: '#2c3a55', bg: '#10151f' };
  var CLASS_COLORS = [C.c0, C.c1];

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function sv(tag, attrs) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function fmt(n, d) { d = d == null ? 2 : d; var s = (+n).toFixed(d); return s.indexOf('.') >= 0 ? s.replace(/0+$/, '').replace(/\.$/, '') : s; }
  function comma(n) { return (+n).toLocaleString('en-GB'); }
  function seeded(seed) { var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
  function dot(color) { return '<span class="cdot" style="background:' + color + '"></span>'; }
  function minkowski(a, b, p) {
    var s = Math.pow(Math.abs(a.x - b.x), p) + Math.pow(Math.abs(a.y - b.y), p);
    return Math.pow(s, 1 / p);
  }
  function dist(a, b, metric) {
    if (metric === 'manhattan') return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  function neighboursOf(q, points, metric) {
    return points.map(function (p, i) { return { p: p, i: i, d: dist(q, p, metric) }; })
      .sort(function (a, b) { return a.d - b.d || a.i - b.i; });
  }
  function voteCount(nbrs, k) {
    var votes = [0, 0];
    for (var i = 0; i < Math.min(k, nbrs.length); i++) votes[nbrs[i].p.c]++;
    return votes;
  }

  /* ---- shared scatter plot (data domain 0..10 both axes) ---- */
  function makePlot(cfg, W, H) {
    W = W || 340; H = H || 250;
    var pad = 26;
    var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img' });
    function sx(x) { return pad + x / 10 * (W - 2 * pad); }
    function sy(y) { return H - pad + 4 - y / 10 * (H - 2 * pad); }
    // recessive frame + axis labels
    svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad - 2 + 4, fill: 'none', stroke: C.line, rx: 8 }));
    if (cfg.xlab) { var xl = sv('text', { x: W / 2, y: H - 5, fill: C.ink3, 'font-size': 11, 'text-anchor': 'middle' }); xl.textContent = cfg.xlab; svg.appendChild(xl); }
    if (cfg.ylab) { var yl = sv('text', { x: 10, y: H / 2, fill: C.ink3, 'font-size': 11, 'text-anchor': 'middle', transform: 'rotate(-90 10 ' + H / 2 + ')' }); yl.textContent = cfg.ylab; svg.appendChild(yl); }
    return { svg: svg, sx: sx, sy: sy, W: W, H: H };
  }
  function drawPoint(plot, p, opts) {
    opts = opts || {};
    var g = sv('g', {});
    var cx = plot.sx(p.x), cy = plot.sy(p.y);
    if (opts.flag) {
      g.appendChild(sv('circle', { cx: cx, cy: cy, r: 12, fill: 'none', stroke: C.bad, 'stroke-width': 1.6, 'stroke-dasharray': '3 3' }));
      var w = sv('text', { x: cx, y: cy - 15, 'font-size': 11, 'text-anchor': 'middle', fill: C.bad }); w.textContent = '⚠ suspicious'; g.appendChild(w);
    }
    g.appendChild(sv('circle', {
      cx: cx, cy: cy, r: opts.r || 7,
      fill: CLASS_COLORS[p.c], opacity: opts.dim ? 0.35 : 1,
      stroke: opts.ring ? '#fff' : C.bg, 'stroke-width': opts.ring ? 2 : 1.5
    }));
    plot.svg.appendChild(g);
  }
  function drawQuery(plot, q, label) {
    var cx = plot.sx(q.x), cy = plot.sy(q.y);
    plot.svg.appendChild(sv('rect', { x: cx - 8, y: cy - 8, width: 16, height: 16, fill: C.query, stroke: '#fff', 'stroke-width': 2, transform: 'rotate(45 ' + cx + ' ' + cy + ')', rx: 3 }));
    var t = sv('text', { x: cx, y: cy + 4, 'font-size': 11, 'font-weight': 700, 'text-anchor': 'middle', fill: '#14121f' }); t.textContent = '?';
    plot.svg.appendChild(t);
    if (label) { var l = sv('text', { x: cx, y: cy - 14, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.query }); l.textContent = label; plot.svg.appendChild(l); }
  }
  function legendHTML(classes) {
    return '<div class="legend">' + classes.map(function (name, i) {
      return '<span><span class="sw" style="background:' + CLASS_COLORS[i] + '"></span>' + name + '</span>';
    }).join('') + '<span><span class="sw" style="background:' + C.query + ';border-radius:3px"></span>the new one (unlabelled)</span></div>';
  }
  function voteReadout(classes, votes, kUsed) {
    var win = votes[0] === votes[1] ? -1 : (votes[0] > votes[1] ? 0 : 1);
    var s = 'Asking the <b>' + kUsed + '</b> closest: ' + dot(CLASS_COLORS[0]) + classes[0] + ' <b>' + votes[0] + '</b> vs ' + dot(CLASS_COLORS[1]) + classes[1] + ' <b>' + votes[1] + '</b> → ';
    if (win < 0) s += '<b style="color:' + C.bad + '">🤝 TIE — no majority!</b>';
    else s += 'verdict: <b style="color:' + CLASS_COLORS[win] + '">' + classes[win] + '</b>';
    return s;
  }

  var TYPES = {};

  /* ================= scatterK — the workhorse: k-slider over a labelled scatter ================= */
  TYPES.scatterK = function (cfg) {
    return {
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var k = Math.round(v);
        var plot = makePlot(cfg);
        var nbrs = neighboursOf(cfg.query, cfg.points, cfg.metric);
        var chosen = nbrs.slice(0, k);
        // lines first (under points)
        chosen.forEach(function (n) {
          plot.svg.appendChild(sv('line', {
            x1: plot.sx(cfg.query.x), y1: plot.sy(cfg.query.y), x2: plot.sx(n.p.x), y2: plot.sy(n.p.y),
            stroke: CLASS_COLORS[n.p.c], 'stroke-width': 2, opacity: 0.85
          }));
          if (cfg.showDists) {
            var mx = (plot.sx(cfg.query.x) + plot.sx(n.p.x)) / 2, my = (plot.sy(cfg.query.y) + plot.sy(n.p.y)) / 2;
            var t = sv('text', { x: mx, y: my - 4, 'font-size': 10, fill: '#c3c2b7', 'text-anchor': 'middle' });
            t.textContent = fmt(n.d, 1); plot.svg.appendChild(t);
          }
        });
        var chosenIdx = {}; chosen.forEach(function (n) { chosenIdx[n.i] = true; });
        cfg.points.forEach(function (p, i) {
          drawPoint(plot, p, { dim: !chosenIdx[i], ring: !!chosenIdx[i], flag: cfg.flag === i });
        });
        drawQuery(plot, cfg.query, cfg.queryLabel);
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes));
        ui.setReadout(voteReadout(cfg.classes, voteCount(nbrs, k), Math.min(k, nbrs.length)));
      }
    };
  };

  /* ================= boundaryK — decision-boundary map with a k slider ================= */
  TYPES.boundaryK = function (cfg) {
    var GX = 26, GY = 19;
    return {
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var k = Math.round(v);
        var plot = makePlot(cfg);
        var cell = [], gx, gy;
        for (gy = 0; gy < GY; gy++) {
          cell[gy] = [];
          for (gx = 0; gx < GX; gx++) {
            var q = { x: (gx + 0.5) * 10 / GX, y: (gy + 0.5) * 10 / GY };
            var votes = voteCount(neighboursOf(q, cfg.points), k);
            cell[gy][gx] = votes[0] >= votes[1] ? 0 : 1;
          }
        }
        // wiggliness = % of adjacent cell pairs that disagree
        var diff = 0, tot = 0;
        for (gy = 0; gy < GY; gy++) for (gx = 0; gx < GX; gx++) {
          if (gx + 1 < GX) { tot++; if (cell[gy][gx] !== cell[gy][gx + 1]) diff++; }
          if (gy + 1 < GY) { tot++; if (cell[gy][gx] !== cell[gy + 1][gx]) diff++; }
        }
        var cw = (plot.W - 52) / GX, ch = (plot.H - 48) / GY;
        for (gy = 0; gy < GY; gy++) for (gx = 0; gx < GX; gx++) {
          plot.svg.appendChild(sv('rect', {
            x: plot.sx(gx * 10 / GX), y: plot.sy((gy + 1) * 10 / GY),
            width: cw + 0.5, height: ch + 0.5, fill: CLASS_COLORS[cell[gy][gx]], opacity: 0.22
          }));
        }
        cfg.points.forEach(function (p, i) { drawPoint(plot, p, { ring: true, flag: cfg.flag === i }); });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes).replace('the new one (unlabelled)', 'shaded = what k-NN would predict there'));
        var wig = Math.round(100 * diff / tot);
        ui.setReadout('Border wiggliness: <b>' + wig + '%</b> — every wiggle is territory claimed by just a few nearby points.');
      }
    };
  };

  /* ================= trainTestK — memorising vs generalising ================= */
  TYPES.trainTestK = function (cfg) {
    return {
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var k = Math.round(v);
        var plot = makePlot(cfg, 340, 230);
        var trainOK = 0;
        cfg.train.forEach(function (p) {
          var votes = voteCount(neighboursOf(p, cfg.train), k); // self counts — that's the trap
          if ((votes[0] >= votes[1] ? 0 : 1) === p.c) trainOK++;
        });
        var testOK = 0, marks = [];
        cfg.test.forEach(function (p) {
          var votes = voteCount(neighboursOf(p, cfg.train), k);
          var ok = (votes[0] >= votes[1] ? 0 : 1) === p.c;
          if (ok) testOK++; marks.push(ok);
        });
        cfg.train.forEach(function (p) { drawPoint(plot, p, {}); });
        cfg.test.forEach(function (p, i) {
          var cx = plot.sx(p.x), cy = plot.sy(p.y);
          plot.svg.appendChild(sv('rect', { x: cx - 7, y: cy - 7, width: 14, height: 14, rx: 3, fill: CLASS_COLORS[p.c], stroke: marks[i] ? C.good : C.bad, 'stroke-width': 2.5 }));
          var t = sv('text', { x: cx, y: cy - 11, 'font-size': 11, 'text-anchor': 'middle', fill: marks[i] ? C.good : C.bad });
          t.textContent = marks[i] ? '✓' : '✗'; plot.svg.appendChild(t);
        });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes).replace('the new one (unlabelled)', 'squares = brand-new, never-seen cases'));
        var ta = Math.round(100 * trainOK / cfg.train.length), va = Math.round(100 * testOK / cfg.test.length);
        var bars = '<div class="hbar-row"><span class="hbar-name">old, seen cases</span><div class="hbar-track"><div class="hbar-fill" style="width:' + ta + '%;background:' + C.c0 + '"></div></div><span class="hbar-val"><b>' + ta + '%</b> right</span></div>' +
          '<div class="hbar-row"><span class="hbar-name">NEW cases</span><div class="hbar-track"><div class="hbar-fill" style="width:' + va + '%;background:' + C.query + '"></div></div><span class="hbar-val"><b>' + va + '%</b> right</span></div>';
        ui.setReadout(bars);
      }
    };
  };

  /* ================= metricMorph — morph between street-path and straight-line distance ================= */
  TYPES.metricMorph = function (cfg) {
    return {
      valText: function (v) { return v <= 1.02 ? 'streets only' : v >= 1.98 ? 'straight line' : 'p = ' + fmt(v, 2); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var plot = makePlot(cfg);
        // light grid = the streets
        for (var i = 0; i <= 10; i += 1) {
          plot.svg.appendChild(sv('line', { x1: plot.sx(i), y1: plot.sy(0), x2: plot.sx(i), y2: plot.sy(10), stroke: C.line, 'stroke-width': 0.6 }));
          plot.svg.appendChild(sv('line', { x1: plot.sx(0), y1: plot.sy(i), x2: plot.sx(10), y2: plot.sy(i), stroke: C.line, 'stroke-width': 0.6 }));
        }
        var a = cfg.a, b = cfg.b;
        var wStraight = (v - 1), wStreet = (2 - v); // crossfade
        // street (L-shaped) path
        var d = 'M' + plot.sx(a.x) + ' ' + plot.sy(a.y) + ' L' + plot.sx(b.x) + ' ' + plot.sy(a.y) + ' L' + plot.sx(b.x) + ' ' + plot.sy(b.y);
        plot.svg.appendChild(sv('path', { d: d, fill: 'none', stroke: C.c1, 'stroke-width': 3, opacity: 0.15 + 0.85 * wStreet, 'stroke-linejoin': 'round' }));
        plot.svg.appendChild(sv('line', { x1: plot.sx(a.x), y1: plot.sy(a.y), x2: plot.sx(b.x), y2: plot.sy(b.y), stroke: C.c0, 'stroke-width': 3, opacity: 0.15 + 0.85 * wStraight }));
        [[a, cfg.aName || 'A'], [b, cfg.bName || 'B']].forEach(function (pair, idx) {
          var cx = plot.sx(pair[0].x), cy = plot.sy(pair[0].y);
          plot.svg.appendChild(sv('circle', { cx: cx, cy: cy, r: 8, fill: C.query, stroke: '#fff', 'stroke-width': 2 }));
          var t = sv('text', { x: cx, y: cy - 13, 'font-size': 11, 'text-anchor': 'middle', fill: C.ink2 }); t.textContent = pair[1]; plot.svg.appendChild(t);
        });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c1 + '"></span>along the grid</span><span><span class="sw" style="background:' + C.c0 + '"></span>as the crow flies</span></div>');
        var dval = minkowski(a, b, v);
        ui.setReadout('Measured distance between ' + (cfg.aName || 'A') + ' and ' + (cfg.bName || 'B') + ': <b style="font-size:1.2em">' + fmt(dval, 2) + '</b> ' + (cfg.unit || 'blocks'));
      }
    };
  };

  /* ================= scaleFeature — one feature's raw units drown the other ================= */
  TYPES.scaleFeature = function (cfg) {
    // knob v = divide feature B by 10^v ; distance = |ΔA| + |ΔB| (exact decomposition)
    return {
      valText: function (v) { var d = Math.pow(10, v); return '÷ ' + (d >= 100 ? comma(Math.round(d)) : fmt(d, 1)); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var div = Math.pow(10, v);
        var rows = cfg.cands.map(function (c) {
          var da = Math.abs(c.a - cfg.target.a);
          var db = Math.abs(c.b - cfg.target.b) / div;
          return { name: c.name, da: da, db: db, d: da + db };
        }).sort(function (a, b) { return a.d - b.d; });
        var maxd = Math.max.apply(null, rows.map(function (r) { return r.d; })) || 1;
        var html = '<div class="small" style="margin-bottom:8px">Distance to <b>' + cfg.target.name + '</b> = difference in <span style="color:' + C.c0 + '">' + cfg.aName + '</span> + difference in <span style="color:' + C.c1 + '">' + cfg.bName + '</span> (each bar splits the two)</div>';
        rows.forEach(function (r, i) {
          var wa = 100 * r.da / maxd, wb = 100 * r.db / maxd;
          html += '<div class="hbar-row"><span class="hbar-name">' + r.name + (i === 0 ? '<span class="nearest-tag">← NEAREST</span>' : '') + '</span>' +
            '<div class="hbar-track"><div class="hbar-fill"><span style="width:' + wa + '%;background:' + C.c0 + '"></span><span style="width:' + wb + '%;background:' + C.c1 + '"></span></div></div>' +
            '<span class="hbar-val">' + fmt(r.d, 1) + '</span></div>';
        });
        stage.innerHTML = html;
        ui.setReadout('Nearest to ' + cfg.target.name + ' right now: <b style="color:' + C.good + '">' + rows[0].name + '</b>' + (cfg.readoutSuffix ? ' — ' + cfg.readoutSuffix(rows[0].name) : ''));
      }
    };
  };

  /* ================= dimCurse — distances stop meaning anything in high dimensions ================= */
  TYPES.dimCurse = function (cfg) {
    var N = cfg.n || 10, MAXD = 64, rnd = seeded(cfg.seed || 42);
    var pts = [], q = [], i, j;
    for (j = 0; j < MAXD; j++) q.push(rnd());
    for (i = 0; i < N; i++) { var p = []; for (j = 0; j < MAXD; j++) p.push(rnd()); pts.push(p); }
    return {
      valText: function (v) { return Math.round(v) + (Math.round(v) === 1 ? ' fact' : ' facts'); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var d = Math.round(v);
        var ds = pts.map(function (p, idx) {
          var s = 0; for (var j = 0; j < d; j++) s += (p[j] - q[j]) * (p[j] - q[j]);
          return { idx: idx, d: Math.sqrt(s / d) };
        }).sort(function (a, b) { return a.d - b.d; });
        var maxd = ds[ds.length - 1].d || 1;
        var html = '<div class="small" style="margin-bottom:8px">Each bar = how far one ' + (cfg.itemName || 'item') + ' is from yours, comparing the first <b>' + d + '</b> ' + (d === 1 ? 'fact' : 'facts') + ' about each:</div>';
        ds.forEach(function (r, rank) {
          var w = Math.max(2, 100 * r.d / maxd);
          var col = rank === 0 ? C.good : rank === ds.length - 1 ? C.bad : C.c0;
          var tag = rank === 0 ? ' nearest' : rank === ds.length - 1 ? ' farthest' : '';
          html += '<div class="hbar-row"><span class="hbar-name">' + (cfg.itemName || 'item') + ' ' + (r.idx + 1) + '</span>' +
            '<div class="hbar-track"><div class="hbar-fill" style="width:' + w + '%;background:' + col + '"></div></div>' +
            '<span class="hbar-val">' + fmt(r.d, 2) + '<b style="color:' + col + '">' + tag + '</b></span></div>';
        });
        stage.innerHTML = html;
        var ratio = ds[ds.length - 1].d / ds[0].d;
        ui.setReadout('The farthest ' + (cfg.itemName || 'item') + ' is only <b style="font-size:1.15em">' + fmt(ratio, 2) + '×</b> farther than the nearest one.');
      }
    };
  };

  /* ================= speedLazy — training is free, every answer is expensive ================= */
  TYPES.speedLazy = function (cfg) {
    return {
      valText: function (v) { return comma(Math.round(v)); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var n = Math.round(v);
        var max = +cfg.knobMax || 50000;
        var predW = Math.max(1, 100 * n / max);
        var stackCount = Math.min(28, Math.max(1, Math.round(n / (max / 28))));
        var stack = '';
        for (var i = 0; i < stackCount; i++) stack += '🗂';
        var html = '<div class="small" style="margin-bottom:6px">' + (cfg.storeLabel || 'What "training" stores') + ': <span style="letter-spacing:1px">' + stack + '</span> <b>' + comma(n) + '</b> ' + (cfg.itemName || 'examples') + ', kept forever</div>' +
          '<div class="hbar-row"><span class="hbar-name">time to "train"</span><div class="hbar-track"><div class="hbar-fill" style="width:1.2%;background:' + C.good + '"></div></div><span class="hbar-val">~instant</span></div>' +
          '<div class="hbar-row"><span class="hbar-name">time to answer ONE question</span><div class="hbar-track"><div class="hbar-fill" style="width:' + predW + '%;background:' + C.c1 + '"></div></div><span class="hbar-val">' + comma(n) + ' checks</span></div>';
        if (cfg.indexed) {
          var logChecks = Math.max(1, Math.round(Math.log2(n)));
          html += '<div class="hbar-row"><span class="hbar-name">…with a smart index</span><div class="hbar-track"><div class="hbar-fill" style="width:' + Math.max(0.8, 100 * logChecks / max) + '%;background:' + C.good + '"></div></div><span class="hbar-val">~' + logChecks + ' checks</span></div>';
        }
        stage.innerHTML = html;
        ui.setReadout('To answer a single new question it must measure the distance to <b>every one</b> of the ' + comma(n) + ' stored ' + (cfg.itemName || 'examples') + ' — <b>' + comma(n) + '</b> distance checks.');
      }
    };
  };

  /* ================= radiusScatter — neighbours by RADIUS instead of count ================= */
  TYPES.radiusScatter = function (cfg) {
    return {
      valText: function (v) { return 'r = ' + fmt(v, 2); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var plot = makePlot(cfg);
        var pad = 26;
        var rx = v / 10 * (plot.W - 2 * pad), ry = v / 10 * (plot.H - 2 * pad);
        plot.svg.appendChild(sv('ellipse', {
          cx: plot.sx(cfg.query.x), cy: plot.sy(cfg.query.y), rx: rx, ry: ry,
          fill: C.query, 'fill-opacity': 0.08, stroke: C.query, 'stroke-width': 1.5, 'stroke-dasharray': '5 4'
        }));
        var inside = [];
        cfg.points.forEach(function (p, i) {
          var d = dist(cfg.query, p);
          var isIn = d <= v + 1e-9;
          if (isIn) {
            inside.push(p);
            plot.svg.appendChild(sv('line', {
              x1: plot.sx(cfg.query.x), y1: plot.sy(cfg.query.y), x2: plot.sx(p.x), y2: plot.sy(p.y),
              stroke: CLASS_COLORS[p.c], 'stroke-width': 2, opacity: 0.85
            }));
          }
          drawPoint(plot, p, { dim: !isIn, ring: isIn });
        });
        drawQuery(plot, cfg.query, cfg.queryLabel);
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes));
        if (!inside.length) {
          ui.setReadout('<b style="color:' + C.bad + '">0 neighbours inside the circle — the model has NO answer here.</b>');
        } else {
          var votes = [0, 0]; inside.forEach(function (p) { votes[p.c]++; });
          var win = votes[0] === votes[1] ? -1 : votes[0] > votes[1] ? 0 : 1;
          ui.setReadout('Inside the circle: ' + dot(CLASS_COLORS[0]) + cfg.classes[0] + ' <b>' + votes[0] + '</b> vs ' + dot(CLASS_COLORS[1]) + cfg.classes[1] + ' <b>' + votes[1] + '</b> → ' +
            (win < 0 ? '<b style="color:' + C.bad + '">🤝 TIE</b>' : 'verdict: <b style="color:' + CLASS_COLORS[win] + '">' + cfg.classes[win] + '</b>') +
            ' <span class="small">(' + inside.length + ' voters — the count now varies by where you ask)</span>');
        }
      }
    };
  };

  /* ================= kCurve — train vs validation accuracy across every k ================= */
  TYPES.kCurve = function (cfg) {
    var kmax = cfg.kmax || cfg.train.length;
    var curves = { tr: [], va: [] };
    for (var k = 1; k <= kmax; k++) {
      var t = 0; cfg.train.forEach(function (p) {
        var v = voteCount(neighboursOf(p, cfg.train), k);
        if ((v[0] >= v[1] ? 0 : 1) === p.c) t++;
      });
      var a = 0; cfg.val.forEach(function (p) {
        var v = voteCount(neighboursOf(p, cfg.train), k);
        if ((v[0] >= v[1] ? 0 : 1) === p.c) a++;
      });
      curves.tr.push(t / cfg.train.length); curves.va.push(a / cfg.val.length);
    }
    return {
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var k = Math.round(v);
        var W = 340, H = 230, pad = 34;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(kk) { return pad + (kk - 1) / (kmax - 1) * (W - 2 * pad); }
        function sy(acc) { return H - pad - acc * (H - 2 * pad - 10); }
        svg.appendChild(sv('rect', { x: pad - 10, y: 6, width: W - 2 * pad + 20, height: H - pad + 2, fill: 'none', stroke: C.line, rx: 8 }));
        [0, 0.5, 1].forEach(function (g) {
          svg.appendChild(sv('line', { x1: pad - 4, y1: sy(g), x2: W - pad + 4, y2: sy(g), stroke: C.line, 'stroke-width': 0.7 }));
          var t = sv('text', { x: pad - 8, y: sy(g) + 3, 'font-size': 9, 'text-anchor': 'end', fill: C.ink3 }); t.textContent = Math.round(g * 100) + '%'; svg.appendChild(t);
        });
        var xt = sv('text', { x: W / 2, y: H - 8, 'font-size': 11, 'text-anchor': 'middle', fill: C.ink3 }); xt.textContent = 'k (neighbours asked)'; svg.appendChild(xt);
        [['tr', C.c0], ['va', C.query]].forEach(function (pair) {
          var d = '';
          curves[pair[0]].forEach(function (acc, i) { d += (d ? ' L' : 'M') + sx(i + 1) + ' ' + sy(acc); });
          svg.appendChild(sv('path', { d: d, fill: 'none', stroke: pair[1], 'stroke-width': 2 }));
        });
        svg.appendChild(sv('line', { x1: sx(k), y1: sy(0), x2: sx(k), y2: sy(1.04), stroke: C.ink3, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
        svg.appendChild(sv('circle', { cx: sx(k), cy: sy(curves.tr[k - 1]), r: 5, fill: C.c0, stroke: '#fff', 'stroke-width': 1.5 }));
        svg.appendChild(sv('circle', { cx: sx(k), cy: sy(curves.va[k - 1]), r: 5, fill: C.query, stroke: '#fff', 'stroke-width': 1.5 }));
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c0 + '"></span>score on data it has seen</span><span><span class="sw" style="background:' + C.query + '"></span>score on held-back data</span></div>');
        ui.setReadout('At k = <b>' + k + '</b>: seen data <b style="color:' + C.c0 + '">' + Math.round(100 * curves.tr[k - 1]) + '%</b> · held-back data <b style="color:' + C.query + '">' + Math.round(100 * curves.va[k - 1]) + '%</b>');
      }
    };
  };

  /* ================= metricSwitch — the NEAREST NEIGHBOUR ITSELF changes with the metric ================= */
  TYPES.metricSwitch = function (cfg) {
    return {
      valText: function (v) { return v <= 1.02 ? 'city-block' : v >= 1.98 ? 'straight-line' : 'p = ' + fmt(v, 2); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var plot = makePlot(cfg);
        var ds = cfg.points.map(function (p, i) { return { p: p, i: i, d: minkowski(cfg.query, p, v) }; })
          .sort(function (a, b) { return a.d - b.d; });
        var nearest = ds[0];
        ds.forEach(function (n, rank) {
          plot.svg.appendChild(sv('line', {
            x1: plot.sx(cfg.query.x), y1: plot.sy(cfg.query.y), x2: plot.sx(n.p.x), y2: plot.sy(n.p.y),
            stroke: rank === 0 ? CLASS_COLORS[n.p.c] : C.line, 'stroke-width': rank === 0 ? 3 : 1.2
          }));
          var mx = (plot.sx(cfg.query.x) + plot.sx(n.p.x)) / 2, my = (plot.sy(cfg.query.y) + plot.sy(n.p.y)) / 2;
          var t = sv('text', { x: mx, y: my - 5, 'font-size': 10.5, fill: rank === 0 ? '#fff' : C.ink2, 'text-anchor': 'middle', 'font-weight': rank === 0 ? 700 : 400 });
          t.textContent = fmt(n.d, 2); plot.svg.appendChild(t);
        });
        cfg.points.forEach(function (p, i) {
          drawPoint(plot, p, { ring: i === nearest.i, dim: i !== nearest.i });
          if (p.name) { var t = sv('text', { x: plot.sx(p.x), y: plot.sy(p.y) - 13, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink2 }); t.textContent = p.name; plot.svg.appendChild(t); }
        });
        drawQuery(plot, cfg.query, cfg.queryLabel);
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes));
        ui.setReadout('Nearest neighbour under this ruler: <b style="color:' + CLASS_COLORS[nearest.p.c] + '">' + (nearest.p.name || 'point ' + (nearest.i + 1)) + '</b> → 1-NN prediction: <b style="color:' + CLASS_COLORS[nearest.p.c] + '">' + cfg.classes[nearest.p.c] + '</b>');
      }
    };
  };

  /* ================= foldPick — one lucky split vs the average of many ================= */
  TYPES.foldPick = function (cfg) {
    var n = cfg.folds.length;
    return {
      valText: function (v) { var i = Math.round(v); return i > n ? 'average all' : 'fold ' + i; },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var idx = Math.round(v);
        var mean = cfg.folds.reduce(function (s, f) { return s + f.acc; }, 0) / n;
        var lo = Math.min.apply(null, cfg.folds.map(function (f) { return f.acc; }));
        var hi = Math.max.apply(null, cfg.folds.map(function (f) { return f.acc; }));
        var html = '<div class="small" style="margin-bottom:8px">' + (cfg.blurb || 'Same model, same data — the only thing changing is WHICH slice is held back for scoring:') + '</div>';
        cfg.folds.forEach(function (f, i) {
          var active = idx === i + 1, avgMode = idx > n;
          html += '<div class="hbar-row" style="opacity:' + (active || avgMode ? 1 : 0.4) + '"><span class="hbar-name">' + f.name + '</span>' +
            '<div class="hbar-track"><div class="hbar-fill" style="width:' + f.acc + '%;background:' + (active ? C.query : C.c0) + '"></div></div>' +
            '<span class="hbar-val"><b>' + f.acc + '%</b></span></div>';
        });
        if (idx > n) html += '<div class="hbar-row"><span class="hbar-name"><b>average</b></span><div class="hbar-track"><div class="hbar-fill" style="width:' + mean + '%;background:' + C.good + '"></div></div><span class="hbar-val"><b>' + fmt(mean, 1) + '%</b></span></div>';
        stage.innerHTML = html;
        if (idx > n) ui.setReadout('Average across all ' + n + ' hold-outs: <b style="color:' + C.good + '">' + fmt(mean, 1) + '%</b> — one stable, honest number.');
        else ui.setReadout('Scoring on ' + cfg.folds[idx - 1].name + ' alone: <b style="color:' + C.query + '">' + cfg.folds[idx - 1].acc + '%</b>. Depending on your split you\'d report anywhere from <b>' + lo + '%</b> to <b>' + hi + '%</b>.');
      }
    };
  };

  /* ================= voteWeight — from equal votes to "the closest shouts loudest" ================= */
  TYPES.voteWeight = function (cfg) {
    return {
      valText: function (v) { return v < 0.05 ? 'equal say' : '×' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        // weight = (1/d)^v ; v=0 → everyone weighs 1 (a plain show of hands)
        var ws = cfg.neighbors.map(function (nb) { return { nb: nb, w: Math.pow(1 / nb.d, v) }; });
        var totals = [0, 0], sum = 0;
        ws.forEach(function (x) { totals[x.nb.c] += x.w; sum += x.w; });
        var html = '<div class="small" style="margin-bottom:6px">The ' + cfg.neighbors.length + ' neighbours already found — circle size = how much say each gets:</div><div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;justify-content:center;padding:8px 0 4px">';
        ws.forEach(function (x) {
          var share = x.w / sum;
          var r = 10 + 46 * share;
          html += '<div style="text-align:center;font-size:.78rem;color:' + C.ink2 + '"><div style="width:' + r + 'px;height:' + r + 'px;border-radius:99px;background:' + CLASS_COLORS[x.nb.c] + ';margin:0 auto 4px;border:2px solid #fff2"></div>' + x.nb.name + '<br>dist ' + fmt(x.nb.d, 1) + '</div>';
        });
        html += '</div>';
        var t0 = 100 * totals[0] / sum, t1 = 100 * totals[1] / sum;
        html += '<div class="hbar-row"><span class="hbar-name">' + cfg.classes[0] + '</span><div class="hbar-track"><div class="hbar-fill" style="width:' + t0 + '%;background:' + CLASS_COLORS[0] + '"></div></div><span class="hbar-val">' + fmt(t0, 0) + '% of the say</span></div>' +
          '<div class="hbar-row"><span class="hbar-name">' + cfg.classes[1] + '</span><div class="hbar-track"><div class="hbar-fill" style="width:' + t1 + '%;background:' + CLASS_COLORS[1] + '"></div></div><span class="hbar-val">' + fmt(t1, 0) + '% of the say</span></div>';
        stage.innerHTML = html;
        var win = totals[0] === totals[1] ? -1 : totals[0] > totals[1] ? 0 : 1;
        ui.setReadout(win < 0 ? '<b style="color:' + C.bad + '">🤝 Dead tie.</b>' : 'Verdict: <b style="color:' + CLASS_COLORS[win] + '">' + cfg.classes[win] + '</b>' + (v < 0.05 ? ' (simple show of hands)' : ' (closer neighbours count for more)'));
      }
    };
  };

  /* ================= knnRegress — predicting a NUMBER by averaging neighbours ================= */
  TYPES.knnRegress = function (cfg) {
    var ys = cfg.points.map(function (p) { return p.y; });
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var padY = (ymax - ymin) * 0.18 || 1; ymin -= padY; ymax += padY;
    function predAt(x, k) {
      var near = cfg.points.map(function (p) { return { p: p, d: Math.abs(p.x - x) }; })
        .sort(function (a, b) { return a.d - b.d; }).slice(0, k);
      var s = 0; near.forEach(function (n) { s += n.p.y; });
      return s / near.length;
    }
    return {
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var k = Math.round(v);
        var W = 340, H = 240, pad = 30;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(x) { return pad + x / 10 * (W - 2 * pad); }
        function sy(y) { return H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad); }
        svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad - 2, fill: 'none', stroke: C.line, rx: 8 }));
        if (cfg.xlab) { var xl = sv('text', { x: W / 2, y: H - 6, fill: C.ink3, 'font-size': 11, 'text-anchor': 'middle' }); xl.textContent = cfg.xlab; svg.appendChild(xl); }
        if (cfg.ylab) { var yl = sv('text', { x: 10, y: H / 2, fill: C.ink3, 'font-size': 11, 'text-anchor': 'middle', transform: 'rotate(-90 10 ' + H / 2 + ')' }); yl.textContent = cfg.ylab; svg.appendChild(yl); }
        // full prediction curve — feel the smoothness change
        var dpath = '';
        for (var x = 0; x <= 10.001; x += 0.08) {
          dpath += (dpath ? ' L' : 'M') + sx(x) + ' ' + sy(predAt(x, k));
        }
        svg.appendChild(sv('path', { d: dpath, fill: 'none', stroke: C.query, 'stroke-width': 2, opacity: 0.9 }));
        var nearSet = {};
        cfg.points.map(function (p, i) { return { i: i, d: Math.abs(p.x - cfg.qx) }; })
          .sort(function (a, b) { return a.d - b.d; }).slice(0, k).forEach(function (n) { nearSet[n.i] = true; });
        cfg.points.forEach(function (p, i) {
          svg.appendChild(sv('circle', { cx: sx(p.x), cy: sy(p.y), r: 6.5, fill: C.c0, opacity: nearSet[i] ? 1 : 0.35, stroke: nearSet[i] ? '#fff' : C.bg, 'stroke-width': nearSet[i] ? 2 : 1.5 }));
        });
        var pred = predAt(cfg.qx, k);
        svg.appendChild(sv('line', { x1: sx(cfg.qx), y1: sy(ymin), x2: sx(cfg.qx), y2: sy(ymax), stroke: C.query, 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0.7 }));
        var cx = sx(cfg.qx), cy = sy(pred);
        svg.appendChild(sv('rect', { x: cx - 7, y: cy - 7, width: 14, height: 14, fill: C.query, stroke: '#fff', 'stroke-width': 2, transform: 'rotate(45 ' + cx + ' ' + cy + ')', rx: 3 }));
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c0 + '"></span>known ' + (cfg.itemName || 'examples') + ' (bright = the ' + k + ' nearest)</span><span><span class="sw" style="background:' + C.query + '"></span>prediction line</span></div>');
        ui.setReadout('Prediction for yours: <b style="font-size:1.2em;color:' + C.query + '">' + (cfg.prefix || '') + fmt(pred, cfg.decimals == null ? 1 : cfg.decimals) + (cfg.unit ? ' ' + cfg.unit : '') + '</b> — the average of the ' + k + ' nearest ' + (cfg.itemName || 'examples') + '.');
      }
    };
  };

  /* ================= the shell: story → knob → live number → insight → reveal LAST ================= */
  window.renderWidget = function (container, cfg) {
    var maker = TYPES[cfg.type];
    if (!maker) { container.appendChild(el('div', 'ws', 'Interactive lesson unavailable (' + cfg.type + ')')); return; }
    var inst = maker(cfg);
    var root = el('div', 'ws');
    root.appendChild(el('div', 'ws-kicker', 'Interactive lesson — no theory yet, just play'));
    if (cfg.title) root.appendChild(el('h3', 'ws-title', cfg.title));
    if (cfg.world) root.appendChild(el('p', 'ws-world', cfg.world));
    var stage = el('div', 'ws-stage');
    root.appendChild(stage);
    var knobRow = el('div', 'ws-knobrow');
    knobRow.appendChild(el('div', 'ws-knoblab', cfg.knob.label));
    var slider = document.createElement('input');
    slider.type = 'range'; slider.min = cfg.knob.min; slider.max = cfg.knob.max;
    slider.step = cfg.knob.step || 1; slider.value = cfg.knob.init;
    slider.setAttribute('aria-label', cfg.knob.label);
    knobRow.appendChild(slider);
    var knobVal = el('div', 'ws-knobval');
    knobRow.appendChild(knobVal);
    root.appendChild(knobRow);
    var dragHint = el('div', 'ws-dragme', '↔ drag the slider and watch what happens');
    root.appendChild(dragHint);
    var readout = el('div', 'ws-readout');
    root.appendChild(readout);
    var insight = el('div', 'ws-insight tone-info');
    root.appendChild(insight);
    var revealBtn = el('button', 'ws-revealbtn', '✨ Name what you just discovered');
    root.appendChild(revealBtn);
    var revealPanel = el('div', 'ws-reveal');
    root.appendChild(revealPanel);

    var moves = 0, extremeHit = false, sawMin = false, sawMax = false, revealed = false;
    function isExtreme(v) {
      if (!cfg.extreme) return false;
      var at = cfg.extreme.at, step = +(cfg.knob.step || 1);
      var target = at === 'max' ? +cfg.knob.max : at === 'min' ? +cfg.knob.min : +at;
      return Math.abs(v - target) <= step * 0.6 + 1e-9;
    }
    function update() {
      var v = +slider.value;
      knobVal.textContent = inst.valText ? inst.valText(v) : fmt(v, 2) + (cfg.knob.unit ? ' ' + cfg.knob.unit : '');
      inst.render(stage, v, { setReadout: function (h) { readout.innerHTML = h; } });
      var zone = null;
      (cfg.insights || []).some(function (z) { if (v <= z.max + 1e-9) { zone = z; return true; } return false; });
      if (zone) { insight.innerHTML = zone.text; insight.className = 'ws-insight tone-' + (zone.tone || 'info'); insight.style.display = ''; }
      else insight.style.display = 'none';
      if (isExtreme(v)) extremeHit = true;
      var step = +(cfg.knob.step || 1);
      if (v <= +cfg.knob.min + step * 0.6) sawMin = true;
      if (v >= +cfg.knob.max - step * 0.6) sawMax = true;
      var explored = extremeHit || (sawMin && sawMax);
      if (!revealed && ((moves >= 3 && explored) || moves >= 14) && cfg.reveal) revealBtn.style.display = 'inline-block';
    }
    slider.addEventListener('input', function () { moves++; dragHint.style.display = 'none'; update(); });
    revealBtn.addEventListener('click', function () {
      revealed = true; revealBtn.style.display = 'none';
      revealPanel.innerHTML = '<div class="ws-reveal-name">' + cfg.reveal.name + '</div>' +
        (cfg.reveal.formula ? '<div class="ws-reveal-formula">' + cfg.reveal.formula + '</div>' : '') +
        '<p>' + cfg.reveal.text + '</p>';
      revealPanel.style.display = 'block';
      revealPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    update();
    container.appendChild(root);
  };
})();
