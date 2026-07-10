/* DataSense widget engine — self-contained interactive "derive the concept" lessons.
   Every widget: tiny concrete world → ONE knob → live items + live number →
   reachable extreme surprise → concept name revealed LAST. */
(function () {
  'use strict';
  var SVGNS = 'http://www.w3.org/2000/svg';
  var C = { c0: '#2a78d6', c1: '#eb6834', query: '#4a3aa7', good: '#008300', bad: '#d6402b', ink: '#1f2933', ink2: '#5b6b7b', ink3: '#8595a6', line: '#d8dee4', bg: '#ffffff' };
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
    svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad - 2 + 4, fill: 'none', stroke: C.line, rx: 2 }));
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
      fill: CLASS_COLORS[p.c], opacity: opts.dim ? 0.3 : 1,
      stroke: opts.ring ? C.ink : 'rgba(31,41,51,.35)', 'stroke-width': opts.ring ? 2 : 1
    }));
    plot.svg.appendChild(g);
  }
  function drawQuery(plot, q, label) {
    var cx = plot.sx(q.x), cy = plot.sy(q.y);
    plot.svg.appendChild(sv('rect', { x: cx - 8, y: cy - 8, width: 16, height: 16, fill: C.query, stroke: C.ink, 'stroke-width': 1.5, transform: 'rotate(45 ' + cx + ' ' + cy + ')', rx: 3 }));
    var t = sv('text', { x: cx, y: cy + 4, 'font-size': 11, 'font-weight': 700, 'text-anchor': 'middle', fill: '#ffffff' }); t.textContent = '?';
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
            var t = sv('text', { x: mx, y: my - 4, 'font-size': 10, fill: C.ink2, 'text-anchor': 'middle' });
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
            width: cw + 0.5, height: ch + 0.5, fill: CLASS_COLORS[cell[gy][gx]], opacity: 0.16
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
          plot.svg.appendChild(sv('circle', { cx: cx, cy: cy, r: 8, fill: C.query, stroke: C.ink, 'stroke-width': 1.5 }));
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
        svg.appendChild(sv('rect', { x: pad - 10, y: 6, width: W - 2 * pad + 20, height: H - pad + 2, fill: 'none', stroke: C.line, rx: 2 }));
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
        svg.appendChild(sv('circle', { cx: sx(k), cy: sy(curves.tr[k - 1]), r: 5, fill: C.c0, stroke: C.ink, 'stroke-width': 1.2 }));
        svg.appendChild(sv('circle', { cx: sx(k), cy: sy(curves.va[k - 1]), r: 5, fill: C.query, stroke: C.ink, 'stroke-width': 1.2 }));
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
          var t = sv('text', { x: mx, y: my - 5, 'font-size': 10.5, fill: rank === 0 ? C.ink : C.ink3, 'text-anchor': 'middle', 'font-weight': rank === 0 ? 700 : 400 });
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
          html += '<div style="text-align:center;font-size:.78rem;color:' + C.ink2 + '"><div style="width:' + r + 'px;height:' + r + 'px;border-radius:99px;background:' + CLASS_COLORS[x.nb.c] + ';margin:0 auto 4px;border:1.5px solid rgba(31,41,51,.3)"></div>' + x.nb.name + '<br>dist ' + fmt(x.nb.d, 1) + '</div>';
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
        svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad - 2, fill: 'none', stroke: C.line, rx: 2 }));
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
          svg.appendChild(sv('circle', { cx: sx(p.x), cy: sy(p.y), r: 6.5, fill: C.c0, opacity: nearSet[i] ? 1 : 0.35, stroke: nearSet[i] ? C.ink : 'rgba(31,41,51,.35)', 'stroke-width': nearSet[i] ? 2 : 1 }));
        });
        var pred = predAt(cfg.qx, k);
        svg.appendChild(sv('line', { x1: sx(cfg.qx), y1: sy(ymin), x2: sx(cfg.qx), y2: sy(ymax), stroke: C.query, 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0.7 }));
        var cx = sx(cfg.qx), cy = sy(pred);
        svg.appendChild(sv('rect', { x: cx - 7, y: cy - 7, width: 14, height: 14, fill: C.query, stroke: C.ink, 'stroke-width': 1.5, transform: 'rotate(45 ' + cx + ' ' + cy + ')', rx: 3 }));
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c0 + '"></span>known ' + (cfg.itemName || 'examples') + ' (bright = the ' + k + ' nearest)</span><span><span class="sw" style="background:' + C.query + '"></span>prediction line</span></div>');
        ui.setReadout('Prediction for yours: <b style="font-size:1.2em;color:' + C.query + '">' + (cfg.prefix || '') + fmt(pred, cfg.decimals == null ? 1 : cfg.decimals) + (cfg.unit ? ' ' + cfg.unit : '') + '</b> — the average of the ' + k + ' nearest ' + (cfg.itemName || 'examples') + '.');
      }
    };
  };

  /* ================= threshold — flag items above a cutoff; live confusion counts & metrics ================= */
  TYPES.threshold = function (cfg) {
    // items: [{s: score 0..10, c: 1 = actually positive}] ; knob = cutoff, flag if s >= cutoff
    return {
      valText: function (v) { return 'cutoff ' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var W = 340, H = 118, pad = 20;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(x) { return pad + x / 10 * (W - 2 * pad); }
        svg.appendChild(sv('rect', { x: sx(v), y: 8, width: W - pad - sx(v) + 6, height: H - 34, fill: C.c1, opacity: 0.08 }));
        svg.appendChild(sv('line', { x1: pad - 6, y1: H - 26, x2: W - pad + 6, y2: H - 26, stroke: C.line, 'stroke-width': 1 }));
        svg.appendChild(sv('line', { x1: sx(v), y1: 6, x2: sx(v), y2: H - 22, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 3' }));
        var lab = sv('text', { x: sx(v), y: H - 8, 'font-size': 10, 'text-anchor': 'middle', fill: C.ink2 });
        lab.textContent = (cfg.axis || 'score') + ' ≥ ' + fmt(v, 1) + ' → flag'; svg.appendChild(lab);
        var stacks = {}, tp = 0, fp = 0, fn = 0, tn = 0;
        cfg.items.forEach(function (it) {
          var key = Math.round(it.s * 2);
          stacks[key] = (stacks[key] || 0) + 1;
          var cy = H - 40 - (stacks[key] - 1) * 17;
          var flagged = it.s >= v - 1e-9;
          if (flagged && it.c === 1) tp++;
          else if (flagged && it.c === 0) fp++;
          else if (!flagged && it.c === 1) fn++;
          else tn++;
          svg.appendChild(sv('circle', { cx: sx(it.s), cy: cy, r: 7, fill: CLASS_COLORS[it.c === 1 ? 1 : 0], opacity: flagged || it.c === 1 ? 1 : 0.45, stroke: C.ink, 'stroke-width': flagged ? 1.6 : 0.6 }));
          if (!flagged && it.c === 1) { // the loud miss
            var x = sv('text', { x: sx(it.s), y: cy - 11, 'font-size': 12, 'font-weight': 700, 'text-anchor': 'middle', fill: C.bad });
            x.textContent = '✗'; svg.appendChild(x);
          }
        });
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c1 + '"></span>really ' + cfg.posName + '</span><span><span class="sw" style="background:' + C.c0 + '"></span>really ' + cfg.negName + '</span><span>shaded = flagged as ' + cfg.posName + ' · ✗ = missed</span></div>');
        var grid = '<div class="cm"><div class="cm-cell cm-head"></div><div class="cm-cell cm-head">flagged</div><div class="cm-cell cm-head">not flagged</div>' +
          '<div class="cm-cell cm-head">really ' + cfg.posName + '</div><div class="cm-cell cm-tp">' + tp + '<span>caught (TP)</span></div><div class="cm-cell cm-fn">' + fn + '<span>missed (FN)</span></div>' +
          '<div class="cm-cell cm-head">really ' + cfg.negName + '</div><div class="cm-cell cm-fp">' + fp + '<span>false alarm (FP)</span></div><div class="cm-cell cm-tn">' + tn + '<span>correct pass (TN)</span></div></div>';
        var prec = tp + fp ? tp / (tp + fp) : null, rec = tp + fn ? tp / (tp + fn) : null;
        var f1 = (prec != null && rec != null && prec + rec > 0) ? 2 * prec * rec / (prec + rec) : null;
        var acc = (tp + tn) / cfg.items.length;
        var M = { precision: [prec, 'precision (of flagged, how many real)'], recall: [rec, 'recall (of real ' + cfg.posName + ', how many caught)'], f1: [f1, 'F1'], accuracy: [acc, 'accuracy'] };
        var out = (cfg.show || ['precision', 'recall']).map(function (m) {
          if (m === 'cost' && cfg.costs) {
            var cost = fp * cfg.costs.fp + fn * cfg.costs.fn;
            return 'cost of mistakes (' + fn + ' missed × £' + comma(cfg.costs.fn) + ' + ' + fp + ' alarms × £' + comma(cfg.costs.fp) + '): <b style="font-size:1.1em;color:' + C.bad + '">£' + comma(cost) + '</b>';
          }
          var pair = M[m];
          return pair[1] + ': <b style="font-size:1.1em">' + (pair[0] == null ? '—' : Math.round(pair[0] * 100) + '%') + '</b>';
        }).join(' · ');
        ui.setReadout(out);
        stage.insertAdjacentHTML('beforeend', grid);
      }
    };
  };

  /* ================= rocCurve — sweep the threshold, slide along the ROC ================= */
  TYPES.rocCurve = function (cfg) {
    var P = cfg.items.filter(function (i) { return i.c === 1; }).length;
    var N = cfg.items.length - P;
    function rates(t) {
      var tp = 0, fp = 0;
      cfg.items.forEach(function (i) { if (i.s >= t - 1e-9) { if (i.c === 1) tp++; else fp++; } });
      return { tpr: P ? tp / P : 0, fpr: N ? fp / N : 0 };
    }
    var pts = [];
    for (var t = 10.5; t >= -0.5; t -= 0.25) { var r = rates(t); pts.push([r.fpr, r.tpr]); }
    var auc = 0;
    for (var i = 1; i < pts.length; i++) auc += (pts[i][0] - pts[i - 1][0]) * (pts[i][1] + pts[i - 1][1]) / 2;
    return {
      valText: function (v) { return 'cutoff ' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var W = 300, H = 260, pad = 36;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function px(x) { return pad + x * (W - pad - 14); }
        function py(y) { return H - pad - y * (H - pad - 14); }
        svg.appendChild(sv('rect', { x: px(0), y: py(1), width: px(1) - px(0), height: py(0) - py(1), fill: 'none', stroke: C.line }));
        svg.appendChild(sv('line', { x1: px(0), y1: py(0), x2: px(1), y2: py(1), stroke: C.line, 'stroke-width': 1, 'stroke-dasharray': '4 4' }));
        var d = '';
        pts.forEach(function (p) { d += (d ? ' L' : 'M') + px(p[0]) + ' ' + py(p[1]); });
        svg.appendChild(sv('path', { d: d, fill: 'none', stroke: C.query, 'stroke-width': 2.2 }));
        var cur = rates(v);
        svg.appendChild(sv('circle', { cx: px(cur.fpr), cy: py(cur.tpr), r: 6.5, fill: C.query, stroke: C.ink, 'stroke-width': 1.5 }));
        var xt = sv('text', { x: (px(0) + px(1)) / 2, y: H - 8, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink3 }); xt.textContent = 'false-alarm rate (FPR)'; svg.appendChild(xt);
        var yt = sv('text', { x: 12, y: (py(0) + py(1)) / 2, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink3, transform: 'rotate(-90 12 ' + (py(0) + py(1)) / 2 + ')' }); yt.textContent = 'catch rate (TPR)'; svg.appendChild(yt);
        var at = sv('text', { x: px(0.62), y: py(0.16), 'font-size': 11, fill: C.ink2 }); at.textContent = 'AUC = ' + fmt(auc, 2); svg.appendChild(at);
        stage.appendChild(svg);
        ui.setReadout('At this cutoff: catches <b>' + Math.round(cur.tpr * 100) + '%</b> of real ' + (cfg.posName || 'positives') + ' · false-alarms on <b>' + Math.round(cur.fpr * 100) + '%</b> of ' + (cfg.negName || 'negatives') + ' — AUC stays <b>' + fmt(auc, 2) + '</b>');
      }
    };
  };

  /* ================= sigmoid — scores in, probabilities out ================= */
  TYPES.sigmoid = function (cfg) {
    return {
      valText: function (v) { return 'w = ' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var W = 340, H = 230, pad = 30;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(x) { return pad + x / 10 * (W - 2 * pad); }
        function sy(p) { return H - pad - p * (H - 2 * pad); }
        svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad, fill: 'none', stroke: C.line, rx: 2 }));
        [0, 0.5, 1].forEach(function (g) {
          svg.appendChild(sv('line', { x1: pad - 4, y1: sy(g), x2: W - pad + 4, y2: sy(g), stroke: C.line, 'stroke-width': 0.7 }));
          var t = sv('text', { x: pad - 8, y: sy(g) + 3, 'font-size': 9, 'text-anchor': 'end', fill: C.ink3 }); t.textContent = Math.round(g * 100) + '%'; svg.appendChild(t);
        });
        function prob(x) { return 1 / (1 + Math.exp(-v * (x - cfg.b))); }
        var d = '';
        for (var x = 0; x <= 10.001; x += 0.1) d += (d ? ' L' : 'M') + sx(x) + ' ' + sy(prob(x));
        svg.appendChild(sv('path', { d: d, fill: 'none', stroke: C.query, 'stroke-width': 2.2 }));
        (cfg.points || []).forEach(function (p, i) {
          svg.appendChild(sv('circle', { cx: sx(p.x), cy: sy(p.c) + (p.c ? 8 : -8) * ((i % 3) * 0.5), r: 6, fill: CLASS_COLORS[p.c], stroke: C.ink, 'stroke-width': 0.8, opacity: 0.9 }));
        });
        if (cfg.qx != null) {
          svg.appendChild(sv('line', { x1: sx(cfg.qx), y1: sy(0), x2: sx(cfg.qx), y2: sy(1), stroke: C.ink3, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
          svg.appendChild(sv('circle', { cx: sx(cfg.qx), cy: sy(prob(cfg.qx)), r: 6, fill: C.query, stroke: C.ink, 'stroke-width': 1.5 }));
        }
        if (cfg.xlab) { var xl = sv('text', { x: W / 2, y: H - 8, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink3 }); xl.textContent = cfg.xlab; svg.appendChild(xl); }
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + CLASS_COLORS[0] + '"></span>' + cfg.classes[0] + ' (bottom)</span><span><span class="sw" style="background:' + CLASS_COLORS[1] + '"></span>' + cfg.classes[1] + ' (top)</span><span><span class="sw" style="background:' + C.query + '"></span>the model\'s curve</span></div>');
        var p = prob(cfg.qx == null ? cfg.b : cfg.qx);
        ui.setReadout('Model output at the dashed line: <b style="font-size:1.15em;color:' + C.query + '">' + Math.round(p * 100) + '%</b> chance of "' + cfg.classes[1] + '" — a probability, never just a label.');
      }
    };
  };

  /* ================= bayesOdds — evidence multiplies the odds ================= */
  TYPES.bayesOdds = function (cfg) {
    return {
      valText: function (v) { return Math.round(v) + ' of ' + cfg.features.length; },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var n = Math.round(v);
        var odds = cfg.prior[0] / cfg.prior[1];
        var html = '<div class="oddsrow"><span class="odds-chip odds-prior">start ' + cfg.prior[0] + ' : ' + cfg.prior[1] + '</span>';
        for (var i = 0; i < n; i++) {
          var f = cfg.features[i];
          odds *= f.lr;
          html += '<span class="odds-chip ' + (f.lr > 1 ? 'odds-up' : 'odds-down') + '">' + f.name + ' ×' + fmt(f.lr, 2) + '</span>';
        }
        html += '</div>';
        var p = odds / (1 + odds);
        html += '<div class="hbar-row"><span class="hbar-name">P(' + cfg.posName + ')</span><div class="hbar-track"><div class="hbar-fill" style="width:' + Math.max(0.5, p * 100) + '%;background:' + C.c1 + '"></div></div><span class="hbar-val"><b>' + (p < 0.001 ? '≈0' : fmt(p * 100, p > 0.99 ? 2 : 1)) + '%</b></span></div>';
        stage.innerHTML = html;
        ui.setReadout('Odds so far: <b>' + (odds >= 1 ? fmt(odds, 2) + ' : 1' : '1 : ' + fmt(1 / (odds || 1e-12), odds === 0 ? 0 : 2)) + '</b> → P(' + cfg.posName + ') = <b style="font-size:1.15em">' + (p < 0.001 ? '≈0' : fmt(p * 100, 1) + '%') + '</b>');
      }
    };
  };

  /* ================= treeSplit — slide one yes/no question along an axis ================= */
  TYPES.treeSplit = function (cfg) {
    function gini(a, b) { var n = a + b; if (!n) return 0; var pa = a / n; return 2 * pa * (1 - pa); }
    return {
      valText: function (v) { return (cfg.feat || 'x') + ' < ' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var W = 340, H = 110, pad = 20;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(x) { return pad + x / 10 * (W - 2 * pad); }
        var L = [0, 0], R = [0, 0];
        cfg.items.forEach(function (it) { (it.x < v ? L : R)[it.c]++; });
        var lMaj = L[0] >= L[1] ? 0 : 1, rMaj = R[0] >= R[1] ? 0 : 1;
        svg.appendChild(sv('rect', { x: pad - 6, y: 8, width: sx(v) - pad + 6, height: H - 40, fill: CLASS_COLORS[lMaj], opacity: 0.1 }));
        svg.appendChild(sv('rect', { x: sx(v), y: 8, width: W - pad - sx(v) + 6, height: H - 40, fill: CLASS_COLORS[rMaj], opacity: 0.1 }));
        svg.appendChild(sv('line', { x1: sx(v), y1: 4, x2: sx(v), y2: H - 28, stroke: C.ink, 'stroke-width': 2, 'stroke-dasharray': '5 3' }));
        var stacks = {};
        cfg.items.forEach(function (it) {
          var key = Math.round(it.x * 2); stacks[key] = (stacks[key] || 0) + 1;
          svg.appendChild(sv('circle', { cx: sx(it.x), cy: H - 44 - (stacks[key] - 1) * 16, r: 7, fill: CLASS_COLORS[it.c], stroke: C.ink, 'stroke-width': 0.8 }));
        });
        var lab = sv('text', { x: sx(v), y: H - 12, 'font-size': 10, 'text-anchor': 'middle', fill: C.ink2 });
        lab.textContent = 'is ' + (cfg.feat || 'x') + ' < ' + fmt(v, 1) + ' ?'; svg.appendChild(lab);
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + CLASS_COLORS[0] + '"></span>' + cfg.classes[0] + '</span><span><span class="sw" style="background:' + CLASS_COLORS[1] + '"></span>' + cfg.classes[1] + '</span></div>');
        var n = cfg.items.length, nL = L[0] + L[1], nR = R[0] + R[1];
        var g = (nL / n) * gini(L[0], L[1]) + (nR / n) * gini(R[0], R[1]);
        var correct = Math.max(L[0], L[1]) + Math.max(R[0], R[1]);
        ui.setReadout('Left side says <b style="color:' + CLASS_COLORS[lMaj] + '">' + cfg.classes[lMaj] + '</b> (' + Math.max(L[0], L[1]) + '/' + (nL || 0) + ') · right says <b style="color:' + CLASS_COLORS[rMaj] + '">' + cfg.classes[rMaj] + '</b> (' + Math.max(R[0], R[1]) + '/' + (nR || 0) + ') → accuracy <b>' + Math.round(100 * correct / n) + '%</b> · impurity <b>' + fmt(g, 2) + '</b> (lower = purer)');
      }
    };
  };

  /* ================= treeDepth — a real tiny CART tree, depth on a knob ================= */
  TYPES.treeDepth = function (cfg) {
    function gini(counts) { var n = counts[0] + counts[1]; if (!n) return 0; var p = counts[0] / n; return 2 * p * (1 - p); }
    function best(pts) {
      var base = [0, 0]; pts.forEach(function (p) { base[p.c]++; });
      var bg = gini(base), win = null;
      ['x', 'y'].forEach(function (ax) {
        var vals = pts.map(function (p) { return p[ax]; }).sort(function (a, b) { return a - b; });
        for (var i = 1; i < vals.length; i++) {
          var t = (vals[i - 1] + vals[i]) / 2;
          if (t === vals[i - 1]) continue;
          var L = [0, 0], R = [0, 0];
          pts.forEach(function (p) { (p[ax] < t ? L : R)[p.c]++; });
          var nl = L[0] + L[1], nr = R[0] + R[1];
          if (!nl || !nr) continue;
          var g = (nl / pts.length) * gini(L) + (nr / pts.length) * gini(R);
          if (g < bg - 1e-9 && (!win || g < win.g)) win = { ax: ax, t: t, g: g };
        }
      });
      return win;
    }
    function grow(pts, depth) {
      var counts = [0, 0]; pts.forEach(function (p) { counts[p.c]++; });
      if (depth <= 0 || !counts[0] || !counts[1]) return { leaf: counts[0] >= counts[1] ? 0 : 1 };
      var sp = best(pts);
      if (!sp) return { leaf: counts[0] >= counts[1] ? 0 : 1 };
      return {
        ax: sp.ax, t: sp.t,
        L: grow(pts.filter(function (p) { return p[sp.ax] < sp.t; }), depth - 1),
        R: grow(pts.filter(function (p) { return p[sp.ax] >= sp.t; }), depth - 1)
      };
    }
    function classify(node, p) { while (node.leaf == null) node = p[node.ax] < node.t ? node.L : node.R; return node.leaf; }
    function leaves(node) { return node.leaf != null ? 1 : leaves(node.L) + leaves(node.R); }
    return {
      valText: function (v) { return 'depth ' + Math.round(v); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var tree = grow(cfg.points, Math.round(v));
        var plot = makePlot(cfg);
        var GX = 26, GY = 19, cw = (plot.W - 52) / GX, ch = (plot.H - 48) / GY;
        for (var gy = 0; gy < GY; gy++) for (var gx = 0; gx < GX; gx++) {
          var c = classify(tree, { x: (gx + 0.5) * 10 / GX, y: (gy + 0.5) * 10 / GY });
          plot.svg.appendChild(sv('rect', { x: plot.sx(gx * 10 / GX), y: plot.sy((gy + 1) * 10 / GY), width: cw + 0.5, height: ch + 0.5, fill: CLASS_COLORS[c], opacity: 0.16 }));
        }
        cfg.points.forEach(function (p) { drawPoint(plot, p, { ring: true }); });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes).replace("the new one (unlabelled)", 'shaded = the tree\'s prediction'));
        var ok = 0; cfg.points.forEach(function (p) { if (classify(tree, p) === p.c) ok++; });
        ui.setReadout('Depth <b>' + Math.round(v) + '</b>: <b>' + leaves(tree) + '</b> leaf regions · fits <b>' + Math.round(100 * ok / cfg.points.length) + '%</b> of the training points');
      }
    };
  };

  /* ================= marginSVM — slide the boundary, watch the street ================= */
  TYPES.marginSVM = function (cfg) {
    return {
      valText: function (v) { return 'position ' + fmt(v, 1); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var plot = makePlot(cfg);
        var minL = Infinity, minR = Infinity, bad = false;
        cfg.points.forEach(function (p) {
          if (p.c === 0) { if (p.x >= v) bad = true; minL = Math.min(minL, v - p.x); }
          else { if (p.x < v) bad = true; minR = Math.min(minR, p.x - v); }
        });
        var m = Math.max(0, Math.min(minL, minR));
        if (!bad && m > 0) {
          plot.svg.appendChild(sv('rect', { x: plot.sx(v - m), y: 10, width: plot.sx(v + m) - plot.sx(v - m), height: plot.sy(0) - 14, fill: C.query, opacity: 0.07 }));
          [v - m, v + m].forEach(function (e) {
            plot.svg.appendChild(sv('line', { x1: plot.sx(e), y1: 10, x2: plot.sx(e), y2: plot.sy(0) - 4, stroke: C.query, 'stroke-width': 1.4, 'stroke-dasharray': '5 4' }));
          });
        }
        plot.svg.appendChild(sv('line', { x1: plot.sx(v), y1: 8, x2: plot.sx(v), y2: plot.sy(0) - 2, stroke: bad ? C.bad : C.ink, 'stroke-width': 2.4 }));
        cfg.points.forEach(function (p) {
          var isSV = !bad && Math.abs((p.c === 0 ? v - p.x : p.x - v) - m) < 0.15;
          drawPoint(plot, p, { ring: isSV });
          if (isSV) {
            var t = sv('text', { x: plot.sx(p.x), y: plot.sy(p.y) - 13, 'font-size': 9.5, 'text-anchor': 'middle', fill: C.query });
            t.textContent = 'support'; plot.svg.appendChild(t);
          }
        });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes).replace("the new one (unlabelled)", 'dashes = the street\'s kerbs'));
        ui.setReadout(bad ? '<b style="color:' + C.bad + '">The boundary has crashed into a ' + cfg.classes[0] + '/' + cfg.classes[1] + ' point — points are on the wrong side.</b>'
          : 'Street width: <b style="font-size:1.15em;color:' + C.query + '">' + fmt(2 * m, 2) + '</b> — set by the ringed points only.');
      }
    };
  };

  /* ================= curveStatic — pick a setting, read the curves ================= */
  TYPES.curveStatic = function (cfg) {
    var COLS = [C.c0, C.query, C.good, C.c1];
    var ymin = Infinity, ymax = -Infinity;
    cfg.series.forEach(function (s) { s.ys.forEach(function (y) { ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }); });
    var padY = (ymax - ymin) * 0.12 || 1; ymin -= padY; ymax += padY;
    return {
      valText: function (v) { var i = Math.round(v); return (cfg.labels ? cfg.labels[i] : cfg.xs[i]) + (cfg.unit ? ' ' + cfg.unit : ''); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var idx = Math.round(v);
        var W = 340, H = 230, pad = 36;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function px(i) { return pad + i / (cfg.xs.length - 1) * (W - pad - 16); }
        function py(y) { return H - pad - (y - ymin) / (ymax - ymin) * (H - pad - 16); }
        svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - pad - 2, height: H - pad, fill: 'none', stroke: C.line, rx: 2 }));
        cfg.series.forEach(function (s, si) {
          var d = '';
          s.ys.forEach(function (y, i) { d += (d ? ' L' : 'M') + px(i) + ' ' + py(y); });
          svg.appendChild(sv('path', { d: d, fill: 'none', stroke: COLS[si], 'stroke-width': 2.2 }));
          svg.appendChild(sv('circle', { cx: px(idx), cy: py(s.ys[idx]), r: 5.5, fill: COLS[si], stroke: C.ink, 'stroke-width': 1.2 }));
        });
        svg.appendChild(sv('line', { x1: px(idx), y1: py(ymin), x2: px(idx), y2: 10, stroke: C.ink3, 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
        if (cfg.xlab) { var xl = sv('text', { x: (pad + W) / 2 - 8, y: H - 10, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink3 }); xl.textContent = cfg.xlab; svg.appendChild(xl); }
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend">' + cfg.series.map(function (s, si) {
          return '<span><span class="sw" style="background:' + COLS[si] + '"></span>' + s.name + '</span>';
        }).join('') + '</div>');
        ui.setReadout(cfg.series.map(function (s, si) {
          return s.name + ': <b style="color:' + COLS[si] + '">' + fmt(s.ys[idx], cfg.dec == null ? 1 : cfg.dec) + (cfg.yunit || '') + '</b>';
        }).join(' · '));
      }
    };
  };

  /* ================= boostFit — 1-D gradient boosting with stumps, round by round ================= */
  TYPES.boostFit = function (cfg) {
    var lr = cfg.lr == null ? 0.5 : cfg.lr;
    var pts = cfg.points, n = pts.length;
    var base = 0; pts.forEach(function (p) { base += p.y; }); base /= n;
    // precompute stumps sequentially on residuals
    var stumps = [], F = pts.map(function () { return base; });
    var maxR = cfg.maxRounds || 10;
    for (var r = 0; r < maxR; r++) {
      var res = pts.map(function (p, i) { return p.y - F[i]; });
      var bestS = null;
      var xs = pts.map(function (p) { return p.x; }).sort(function (a, b) { return a - b; });
      for (var i = 1; i < n; i++) {
        var t = (xs[i - 1] + xs[i]) / 2;
        if (t === xs[i - 1]) continue;
        var sl = 0, nl = 0, sr = 0, nr = 0;
        pts.forEach(function (p, j) { if (p.x < t) { sl += res[j]; nl++; } else { sr += res[j]; nr++; } });
        if (!nl || !nr) continue;
        var ml = sl / nl, mr = sr / nr, sse = 0;
        pts.forEach(function (p, j) { var e = res[j] - (p.x < t ? ml : mr); sse += e * e; });
        if (!bestS || sse < bestS.sse) bestS = { t: t, ml: ml, mr: mr, sse: sse };
      }
      if (!bestS) break;
      stumps.push(bestS);
      F = F.map(function (f, j) { return f + lr * (pts[j].x < bestS.t ? bestS.ml : bestS.mr); });
    }
    function predict(x, rounds) {
      var v = base;
      for (var i = 0; i < Math.min(rounds, stumps.length); i++) v += lr * (x < stumps[i].t ? stumps[i].ml : stumps[i].mr);
      return v;
    }
    var ys = pts.map(function (p) { return p.y; });
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var padY = (ymax - ymin) * 0.18 || 1; ymin -= padY; ymax += padY;
    return {
      valText: function (v) { var r = Math.round(v); return r === 0 ? 'just the mean' : r + (r === 1 ? ' round' : ' rounds'); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var rounds = Math.round(v);
        var W = 340, H = 230, pad = 30;
        var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H });
        function sx(x) { return pad + x / 10 * (W - 2 * pad); }
        function sy(y) { return H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad); }
        svg.appendChild(sv('rect', { x: pad - 8, y: 6, width: W - 2 * pad + 16, height: H - pad - 2, fill: 'none', stroke: C.line, rx: 2 }));
        var d = '';
        for (var x = 0; x <= 10.001; x += 0.06) d += (d ? ' L' : 'M') + sx(x) + ' ' + sy(predict(x, rounds));
        svg.appendChild(sv('path', { d: d, fill: 'none', stroke: C.query, 'stroke-width': 2.2 }));
        pts.forEach(function (p) {
          svg.appendChild(sv('line', { x1: sx(p.x), y1: sy(p.y), x2: sx(p.x), y2: sy(predict(p.x, rounds)), stroke: C.bad, 'stroke-width': 1, opacity: 0.5 }));
          svg.appendChild(sv('circle', { cx: sx(p.x), cy: sy(p.y), r: 6, fill: C.c0, stroke: C.ink, 'stroke-width': 0.8 }));
        });
        if (cfg.xlab) { var xl = sv('text', { x: W / 2, y: H - 8, 'font-size': 10.5, 'text-anchor': 'middle', fill: C.ink3 }); xl.textContent = cfg.xlab; svg.appendChild(xl); }
        stage.appendChild(svg);
        stage.insertAdjacentHTML('beforeend', '<div class="legend"><span><span class="sw" style="background:' + C.c0 + '"></span>' + (cfg.itemName || 'data') + '</span><span><span class="sw" style="background:' + C.query + '"></span>ensemble so far</span><span><span class="sw" style="background:' + C.bad + '"></span>remaining errors</span></div>');
        var mae = 0; pts.forEach(function (p) { mae += Math.abs(p.y - predict(p.x, rounds)); }); mae /= n;
        ui.setReadout('After <b>' + rounds + '</b> round' + (rounds === 1 ? '' : 's') + ': average miss <b style="font-size:1.15em;color:' + C.query + '">' + fmt(mae, 2) + '</b>' + (cfg.yunit ? ' ' + cfg.yunit : '') + ' — each red stalk is an error the NEXT round will target.');
      }
    };
  };

  /* ================= forestMap — a random forest grows tree by tree ================= */
  TYPES.forestMap = function (cfg) {
    function gini2(c) { var t = c[0] + c[1]; if (!t) return 0; var p = c[0] / t; return 2 * p * (1 - p); }
    function bestSplit(pts) {
      var basec = [0, 0]; pts.forEach(function (p) { basec[p.c]++; });
      var bg = gini2(basec), win = null;
      ['x', 'y'].forEach(function (ax) {
        var vals = pts.map(function (p) { return p[ax]; }).sort(function (a, b) { return a - b; });
        for (var i = 1; i < vals.length; i++) {
          var t = (vals[i - 1] + vals[i]) / 2;
          if (t === vals[i - 1]) continue;
          var L = [0, 0], R = [0, 0];
          pts.forEach(function (p) { (p[ax] < t ? L : R)[p.c]++; });
          if (!(L[0] + L[1]) || !(R[0] + R[1])) continue;
          var g = ((L[0] + L[1]) / pts.length) * gini2(L) + ((R[0] + R[1]) / pts.length) * gini2(R);
          if (g < bg - 1e-9 && (!win || g < win.g)) win = { ax: ax, t: t, g: g };
        }
      });
      return win;
    }
    function grow(pts, depth) {
      var c = [0, 0]; pts.forEach(function (p) { c[p.c]++; });
      if (depth <= 0 || !c[0] || !c[1]) return { leaf: c[0] >= c[1] ? 0 : 1 };
      var sp = bestSplit(pts);
      if (!sp) return { leaf: c[0] >= c[1] ? 0 : 1 };
      return { ax: sp.ax, t: sp.t, L: grow(pts.filter(function (p) { return p[sp.ax] < sp.t; }), depth - 1), R: grow(pts.filter(function (p) { return p[sp.ax] >= sp.t; }), depth - 1) };
    }
    function cls(node, p) { while (node.leaf == null) node = p[node.ax] < node.t ? node.L : node.R; return node.leaf; }
    var rnd = seeded(cfg.seed || 11);
    var maxT = cfg.maxTrees || 25, trees = [];
    for (var t = 0; t < maxT; t++) {
      var boot = [];
      for (var i = 0; i < cfg.points.length; i++) boot.push(cfg.points[Math.floor(rnd() * cfg.points.length)]);
      trees.push(grow(boot, cfg.depth || 3));
    }
    function vote(p, nT) { var s = 0; for (var i = 0; i < nT; i++) s += cls(trees[i], p); return s / nT; }
    return {
      valText: function (v) { var r = Math.round(v); return r + (r === 1 ? ' tree' : ' trees'); },
      render: function (stage, v, ui) {
        stage.innerHTML = '';
        var nT = Math.max(1, Math.round(v));
        var plot = makePlot(cfg);
        var GX = 26, GY = 19, cw = (plot.W - 52) / GX, ch = (plot.H - 48) / GY;
        for (var gy = 0; gy < GY; gy++) for (var gx = 0; gx < GX; gx++) {
          var pr = vote({ x: (gx + 0.5) * 10 / GX, y: (gy + 0.5) * 10 / GY }, nT);
          var c = pr >= 0.5 ? 1 : 0;
          plot.svg.appendChild(sv('rect', { x: plot.sx(gx * 10 / GX), y: plot.sy((gy + 1) * 10 / GY), width: cw + 0.5, height: ch + 0.5, fill: CLASS_COLORS[c], opacity: 0.05 + 0.3 * Math.abs(pr - 0.5) * 2 }));
        }
        cfg.points.forEach(function (p) { drawPoint(plot, p, { ring: true }); });
        stage.appendChild(plot.svg);
        stage.insertAdjacentHTML('beforeend', legendHTML(cfg.classes).replace("the new one (unlabelled)", 'stronger shade = more trees agree'));
        var ok = 0;
        cfg.points.forEach(function (p) { if ((vote(p, nT) >= 0.5 ? 1 : 0) === p.c) ok++; });
        ui.setReadout('Committee of <b>' + nT + '</b>: fits <b>' + Math.round(100 * ok / cfg.points.length) + '%</b> of the training points — watch the map calm down as trees join.');
      }
    };
  };

  /* ================= static figure: render a widget's stage at a fixed value (for question exhibits) ================= */
  window.renderFigure = function (container, cfg, at, caption) {
    var maker = TYPES[cfg.type];
    if (!maker) return;
    var fig = el('figure', 'qfig');
    var stage = el('div', 'ws-stage qfig-stage');
    fig.appendChild(stage);
    if (caption) fig.appendChild(el('figcaption', 'qfig-cap', caption));
    try { maker(cfg).render(stage, at, { setReadout: function () {} }); }
    catch (e) { return; }
    container.appendChild(fig);
  };

  /* ================= the shell: story → knob → live number → insight → reveal LAST ================= */
  window.renderWidget = function (container, cfg) {
    var maker = TYPES[cfg.type];
    if (!maker) { container.appendChild(el('div', 'ws', 'Interactive lesson unavailable (' + cfg.type + ')')); return; }
    var inst = maker(cfg);
    var root = el('div', 'ws');
    root.appendChild(el('div', 'ws-kicker', 'Lab exercise — derive it yourself, then we name it'));
    var body = el('div', 'ws-body');
    root.appendChild(body);
    if (cfg.title) body.appendChild(el('h3', 'ws-title', cfg.title));
    if (cfg.world) body.appendChild(el('p', 'ws-world', cfg.world));
    var stage = el('div', 'ws-stage');
    body.appendChild(stage);
    var knobRow = el('div', 'ws-knobrow');
    knobRow.appendChild(el('div', 'ws-knoblab', cfg.knob.label));
    var slider = document.createElement('input');
    slider.type = 'range'; slider.min = cfg.knob.min; slider.max = cfg.knob.max;
    slider.step = cfg.knob.step || 1; slider.value = cfg.knob.init;
    slider.setAttribute('aria-label', cfg.knob.label);
    knobRow.appendChild(slider);
    var knobVal = el('div', 'ws-knobval');
    knobRow.appendChild(knobVal);
    body.appendChild(knobRow);
    var dragHint = el('div', 'ws-dragme', '↔ drag the control · watch the measurement respond');
    body.appendChild(dragHint);
    var readout = el('div', 'ws-readout');
    body.appendChild(readout);
    var insight = el('div', 'ws-insight tone-info');
    body.appendChild(insight);
    var revealBtn = el('button', 'ws-revealbtn', 'Name what you just discovered →');
    body.appendChild(revealBtn);
    var revealPanel = el('div', 'ws-reveal');
    body.appendChild(revealPanel);

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
