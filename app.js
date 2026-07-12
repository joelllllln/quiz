/* DataSense quiz shell — wrong answer → lab → quick check → try again */
(function () {
  'use strict';
  var app = document.getElementById('app');
  window.QUESTIONS = window.QUESTIONS || {};
  var TOPICS = [
    { key: 'found', no: '00', name: 'Machine Learning Foundations', desc: 'Features, labels, training, generalisation — the base every topic stands on.',
      levels: [{ qk: 'found1', part: 'Part I', name: 'The Ground Floor' }, { qk: 'found2', part: 'Part II', name: 'Practice' }, { qk: 'found3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'knn', no: '01', name: 'k-Nearest Neighbours', desc: 'Classify by asking the most similar known examples to vote.',
      levels: [{ qk: 'easy', part: 'Part I', name: 'Foundations' }, { qk: 'medium', part: 'Part II', name: 'Practice' }, { qk: 'hard', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'logreg', no: '02', name: 'Logistic Regression', desc: 'Turn a weighted score into an honest probability.',
      levels: [{ qk: 'logreg1', part: 'Part I', name: 'Foundations' }, { qk: 'logreg2', part: 'Part II', name: 'Practice' }, { qk: 'logreg3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'bayes', no: '03', name: 'Naive Bayes', desc: 'Multiply the evidence, respect the base rate.',
      levels: [{ qk: 'bayes1', part: 'Part I', name: 'Foundations' }, { qk: 'bayes2', part: 'Part II', name: 'Practice' }, { qk: 'bayes3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'trees', no: '04', name: 'Decision Trees', desc: 'Ask the best yes/no questions, one after another.',
      levels: [{ qk: 'trees1', part: 'Part I', name: 'Foundations' }, { qk: 'trees2', part: 'Part II', name: 'Practice' }, { qk: 'trees3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'svm', no: '05', name: 'Support Vector Machines', desc: 'Draw the widest possible street between the classes.',
      levels: [{ qk: 'svm1', part: 'Part I', name: 'Foundations' }, { qk: 'svm2', part: 'Part II', name: 'Practice' }, { qk: 'svm3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'rf', no: '06', name: 'Random Forests & Bagging', desc: 'Bootstrap many unstable trees, average away the wobble.',
      levels: [{ qk: 'rf1', part: 'Part I', name: 'Foundations' }, { qk: 'rf2', part: 'Part II', name: 'Practice' }, { qk: 'rf3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'gboost', no: '07', name: 'Gradient Boosting & XGBoost', desc: 'Chain weak learners on the errors — then industrialise it.',
      levels: [{ qk: 'gb1', part: 'Part I', name: 'Foundations' }, { qk: 'gb2', part: 'Part II', name: 'Practice' }, { qk: 'gb3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'stacking', no: '08', name: 'Stacking & Voting', desc: 'Combine different models — by vote, by average, or by a learned chairperson.',
      levels: [{ qk: 'stack1', part: 'Part I', name: 'Foundations' }, { qk: 'stack2', part: 'Part II', name: 'Practice' }, { qk: 'stack3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'metrics', no: '09', name: 'Model Evaluation', desc: 'Precision, recall, F1, ROC-AUC and the confusion matrix.',
      levels: [{ qk: 'metrics1', part: 'Part I', name: 'Foundations' }, { qk: 'metrics2', part: 'Part II', name: 'Pragmatic Practice' }, { qk: 'metrics3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'perf', no: '10', name: 'Performance Optimisation', desc: 'Tune honestly: validation, regularisation, thresholds, baselines.',
      levels: [{ qk: 'perf1', part: 'Part I', name: 'Foundations' }, { qk: 'perf2', part: 'Part II', name: 'Practice' }, { qk: 'perf3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'sklearn', no: '11', name: 'Advanced Scikit-learn', desc: 'Pipelines, search, calibration, importances — the library, used properly.',
      levels: [{ qk: 'skl1', part: 'Part I', name: 'Foundations' }, { qk: 'skl2', part: 'Part II', name: 'Practice' }, { qk: 'skl3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'kmeans', no: '12', name: 'K-Means', desc: 'Assign, average, repeat — the workhorse clusterer.',
      levels: [{ qk: 'kmeans1', part: 'Part I', name: 'Foundations' }, { qk: 'kmeans2', part: 'Part II', name: 'Practice' }, { qk: 'kmeans3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'hier', no: '13', name: 'Hierarchical Clustering', desc: 'Merge the closest groups and draw the whole family tree.',
      levels: [{ qk: 'hier1', part: 'Part I', name: 'Foundations' }, { qk: 'hier2', part: 'Part II', name: 'Practice' }, { qk: 'hier3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'dbscan', no: '14', name: 'DBSCAN', desc: 'Clusters as dense crowds — any shape, noise allowed.',
      levels: [{ qk: 'dbscan1', part: 'Part I', name: 'Foundations' }, { qk: 'dbscan2', part: 'Part II', name: 'Practice' }, { qk: 'dbscan3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'pca', no: '15', name: 'PCA', desc: 'Find the directions that carry the story; drop the rest.',
      levels: [{ qk: 'pca1', part: 'Part I', name: 'Foundations' }, { qk: 'pca2', part: 'Part II', name: 'Practice' }, { qk: 'pca3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'tsne', no: '16', name: 't-SNE', desc: 'Flatten high-dimensional data into honest-if-you-read-them-right maps.',
      levels: [{ qk: 'tsne1', part: 'Part I', name: 'Foundations' }, { qk: 'tsne2', part: 'Part II', name: 'Practice' }, { qk: 'tsne3', part: 'Part III', name: 'Advanced Study' }] }
  ];
  var GROUPS = [
    { label: 'Start here — the groundwork', keys: ['found'] },
    { label: 'The algorithms', keys: ['knn', 'logreg', 'bayes', 'trees', 'svm'] },
    { label: 'Ensemble methods', keys: ['rf', 'gboost', 'stacking'] },
    { label: 'Measuring & tuning', keys: ['metrics', 'perf', 'sklearn'] },
    { label: 'Unsupervised learning', keys: ['kmeans', 'hier', 'dbscan', 'pca', 'tsne'] }
  ];
  var UPCOMING = [
    { name: 'Regression', desc: 'Predicting quantities, done properly.' },
    { name: 'Neural Networks', desc: 'Layers of learned features.' }
  ];
  var LETTERS = 'ABCDE';
  var S = {};


  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(qk) { return (qk === 'easy' || qk === 'medium' || qk === 'hard') ? 'ds_best_knn_' + qk : 'ds_best_' + qk; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  /* ---------------- lifetime total + daily challenge ---------------- */
  function getTotal() { return +(localStorage.getItem('ds_total_correct') || 0); }
  function bumpTotal() { try { localStorage.setItem('ds_total_correct', getTotal() + 1); } catch (e) {} }
  function today() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function todayLabel() { try { return new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }); } catch (e) { return today(); } }
  var DAILY_OPTS = [5, 10, 25, 50];
  function dailyN() { var n; try { n = +localStorage.getItem('ds_daily_n'); } catch (e) {} return DAILY_OPTS.indexOf(n) >= 0 ? n : 10; }
  function setDailyN(n) { try { localStorage.setItem('ds_daily_n', String(n)); } catch (e) {} }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // Index every question once, tagged with topic name, difficulty level (1/2/3), and whether it's a definition question.
  // "Definition" is an EXPLICIT curated set (window.DEFS from data_defs.js) — not a heuristic guess.
  var QINDEX = null;
  function buildIndex() {
    if (QINDEX) return QINDEX;
    QINDEX = [];
    TOPICS.forEach(function (t) {
      t.levels.forEach(function (L, li) {
        (QUESTIONS[L.qk] || []).forEach(function (q) {
          // A question is a "definition" iff it is in the explicit curated set (data_defs.js) — no heuristic guessing.
          QINDEX.push({ q: q, topic: t.name, key: t.key, level: li + 1, def: !!(window.DEFS && window.DEFS[q.q]) });
        });
      });
    });
    return QINDEX;
  }
  var DEFAULT_FILTER = { type: 'both', diff: 'all' };
  function getFilter() {
    var f; try { f = JSON.parse(localStorage.getItem('ds_daily_filter') || 'null'); } catch (e) { f = null; }
    if (!f) return { type: 'both', diff: 'all' };
    return { type: (f.type === 'def' || f.type === 'q') ? f.type : 'both', diff: (f.diff === '1' || f.diff === '2' || f.diff === '3') ? f.diff : 'all' };
  }
  function setFilter(f) { try { localStorage.setItem('ds_daily_filter', JSON.stringify(f)); } catch (e) {} }
  // Definitions are Foundations-only, so the difficulty filter doesn't apply to them.
  function filterSig(f) { return f.type + ':' + (f.type === 'def' ? 'all' : f.diff); }
  function filterLabel(f) {
    if (f.type === 'def') return 'Definitions · Foundations';
    var t = f.type === 'q' ? 'Applied questions' : 'Definitions & questions';
    var d = f.diff === 'all' ? 'all levels' : 'Level ' + f.diff;
    return t + ' · ' + d;
  }
  function poolFor(f) {
    return buildIndex().filter(function (e) {
      if (f.type === 'def' && !e.def) return false;
      if (f.type === 'q' && e.def) return false;
      if (f.type !== 'def' && f.diff !== 'all' && e.level !== +f.diff) return false;
      return true;
    });
  }
  function dailyQuestions(f) {
    var pool = poolFor(f);
    var idx = pool.map(function (_, i) { return i; });
    var rnd = mulberry32(hashStr('datasense-daily::' + today() + '::' + filterSig(f)));
    for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp; }
    idx = idx.slice(0, Math.min(dailyN(), idx.length));
    return { qs: idx.map(function (k) { return pool[k].q; }), origins: idx.map(function (k) { return pool[k].topic; }) };
  }
  // Daily progress is stored per day, per filter signature: { date, sets: { 'sig': {pos,correct,results,done} } }
  function readDailyStore() {
    var raw; try { raw = JSON.parse(localStorage.getItem('ds_daily') || 'null'); } catch (e) { raw = null; }
    if (!raw || raw.date !== today() || typeof raw.sets !== 'object') return { date: today(), sets: {} };
    return raw;
  }
  function loadDaily(sig) {
    var store = readDailyStore();
    var s = store.sets[sig];
    return s ? { pos: s.pos || 0, correct: s.correct || 0, results: s.results || [] } : { pos: 0, correct: 0, results: [] };
  }
  function saveDaily(done) {
    try {
      var store = readDailyStore();
      store.sets[S.sig] = { pos: S.i, correct: S.correct, results: S.results, done: !!done };
      localStorage.setItem('ds_daily', JSON.stringify(store));
    } catch (e) {}
  }
  function startDaily() {
    var f = getFilter();
    var sig = filterSig(f);
    var d = loadDaily(sig);
    var dq = dailyQuestions(f);
    if (!dq.qs.length) return;
    if (d.pos >= dq.qs.length) {
      S = { daily: true, sig: sig, qs: dq.qs, origins: dq.origins, i: dq.qs.length, correct: d.correct, results: d.results, level: {}, topic: {} };
      return doneDaily();
    }
    begin({ name: 'Daily', no: '★', key: '__daily__' },
      { qk: '__daily__', part: 'Daily ' + dq.qs.length, name: todayLabel() },
      { qs: dq.qs, origins: dq.origins, mixed: true, modeLabel: 'Daily ' + dq.qs.length, daily: true, sig: sig, startAt: d.pos, startCorrect: d.correct, results: d.results });
  }

  // "Keep going": an extra, untracked batch from the same filter pool — a fresh
  // random draw each time, so you can do as many as you like past the daily.
  function startMore() {
    var f = getFilter();
    var pool = poolFor(f);
    if (!pool.length) return;
    var idx = shuffle(pool.map(function (_, i) { return i; }));
    idx = idx.slice(0, Math.min(dailyN(), idx.length));
    begin({ name: 'Keep going', no: '★', key: '__more__' },
      { qk: '__more__', part: 'Keep going', name: todayLabel() },
      { qs: idx.map(function (k) { return pool[k].q; }), origins: idx.map(function (k) { return pool[k].topic; }), mixed: true, modeLabel: 'Keep going', more: true });
  }

  /* ---------------- per-card history + adaptive review ---------------- */
  function dayNum() { return Math.floor(Date.now() / 86400000); }
  function cardId(q) { return 'c' + hashStr(q.q); }
  var CARDS = null;
  function loadCards() { if (CARDS) return CARDS; try { CARDS = JSON.parse(localStorage.getItem('ds_cards') || '{}') || {}; } catch (e) { CARDS = {}; } return CARDS; }
  function saveCards() { try { localStorage.setItem('ds_cards', JSON.stringify(CARDS)); } catch (e) {} }
  function recordCard(q, right) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++;
    if (right) r.box = Math.min(5, r.box + 1);
    else { r.wrong++; r.box = Math.max(0, r.box - 2); }
    r.last = dayNum();
    c[id] = r; saveCards();
  }
  function cardStatus(q) {
    var r = loadCards()[cardId(q)];
    if (!r || !r.seen) return 'new';
    if (r.box >= 4) return 'learnt';
    if (r.wrong > 0 && r.box <= 1) return 'struggling';
    return 'learning';
  }
  function masterySummary() {
    var s = { learnt: 0, learning: 0, struggling: 0, new: 0 };
    buildIndex().forEach(function (e) { s[cardStatus(e.q)]++; });
    return s;
  }
  function masteryByTopic() {
    var by = {};
    buildIndex().forEach(function (e) {
      var m = by[e.key] || (by[e.key] = { key: e.key, topic: e.topic, total: 0, learnt: 0, learning: 0, struggling: 0, new: 0 });
      m.total++; m[cardStatus(e.q)]++;
    });
    return TOPICS.map(function (t) { return by[t.key] || { key: t.key, topic: t.name, total: 0, learnt: 0, learning: 0, struggling: 0, new: 0 }; });
  }
  function getMix() { var v = +(localStorage.getItem('ds_practice_mix')); return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v)); }
  function setMix(v) { try { localStorage.setItem('ds_practice_mix', v); } catch (e) {} }

  /* ---------------- favourites ---------------- */
  var FAVS = null;
  function loadFavs() { if (FAVS) return FAVS; try { FAVS = JSON.parse(localStorage.getItem('ds_favs') || '{}') || {}; } catch (e) { FAVS = {}; } return FAVS; }
  function saveFavs() { try { localStorage.setItem('ds_favs', JSON.stringify(FAVS)); } catch (e) {} }
  function isFav(q) { return !!loadFavs()[cardId(q)]; }
  function toggleFav(q) { var f = loadFavs(), id = cardId(q); if (f[id]) delete f[id]; else f[id] = 1; saveFavs(); return !!f[id]; }
  function favCount() { return Object.keys(loadFavs()).length; }
  function favQuestions() { var f = loadFavs(); return buildIndex().filter(function (e) { return f[cardId(e.q)]; }); }
  function startFavourites() {
    var sel = shuffle(favQuestions());
    if (!sel.length) return;
    begin({ name: 'Favourites', no: '★', key: '__favs__' },
      { qk: '__favs__', part: 'Favourites', name: '' },
      { qs: sel.map(function (e) { return e.q; }), origins: sel.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Favourites', favourites: true });
  }

  /* ---------------- flashcards (concept → definition, flip to test) ---------------- */
  var FLASH = null;
  function normkey(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function flashDeck() {
    if (FLASH) return FLASH;
    var seen = {}, deck = [];
    buildIndex().forEach(function (e) {
      var r = e.q.widget && e.q.widget.reveal;
      if (!r || !r.name) return;
      var nk = normkey(r.name);
      if (seen[nk]) return; seen[nk] = 1;
      deck.push({ front: r.name, formula: r.formula || '', back: r.text || '', topic: e.topic, key: e.key });
    });
    FLASH = deck; return deck;
  }
  function startFlashcards(topicKey) {
    var deck = shuffle(flashDeck().filter(function (c) { return !topicKey || c.key === topicKey; }));
    if (!deck.length) return;
    var i = 0, flipped = false;
    function draw() {
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / deck.length) + '%"></div></div>' +
        '<span class="exmeta">Card <b>' + (i + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var c = deck[i];
      var opts = '<option value="">All topics</option>' + TOPICS.map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === topicKey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var view = h('<div class="flash-view">' +
        '<select class="flash-topic">' + opts + '</select>' +
        '<div class="flash-stage"><button class="flash-card' + (flipped ? ' flipped' : '') + '" aria-label="Flip card">' +
          '<div class="flash-face flash-front"><span class="flash-tag">Concept</span><div class="flash-term"></div><span class="flash-hint">tap to reveal the definition</span></div>' +
          '<div class="flash-face flash-back"><span class="flash-tag">Definition</span>' + (c.formula ? '<div class="flash-formula"></div>' : '') + '<div class="flash-def"></div><span class="flash-topictag">' + esc(c.topic) + '</span></div>' +
        '</button></div>' +
        '<div class="flash-controls"><button class="btn ghost flash-prev">← Prev</button><button class="btn flash-flip">Flip</button><button class="btn ghost flash-next">Next →</button></div>' +
        '<button class="flash-shuffle">↻ Shuffle deck</button>' +
      '</div>');
      view.querySelector('.flash-term').textContent = c.front;
      view.querySelector('.flash-def').textContent = c.back;
      if (c.formula) view.querySelector('.flash-formula').textContent = c.formula;
      var fc = view.querySelector('.flash-card');
      function flip() { flipped = !flipped; fc.classList.toggle('flipped', flipped); }
      fc.onclick = flip;
      view.querySelector('.flash-flip').onclick = function (ev) { ev.stopPropagation(); flip(); };
      view.querySelector('.flash-prev').onclick = function () { i = (i - 1 + deck.length) % deck.length; flipped = false; draw(); };
      view.querySelector('.flash-next').onclick = function () { i = (i + 1) % deck.length; flipped = false; draw(); };
      view.querySelector('.flash-shuffle').onclick = function () { deck = shuffle(deck); i = 0; flipped = false; draw(); };
      view.querySelector('.flash-topic').onchange = function () { startFlashcards(this.value); };
      app.appendChild(view);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- back up / restore progress (all localStorage lives only in this browser) ---------------- */
  function exportProgress() {
    var data = {};
    for (var j = 0; j < localStorage.length; j++) { var k = localStorage.key(j); if (k && k.indexOf('ds_') === 0) data[k] = localStorage.getItem(k); }
    var payload = { app: 'DataSense', version: 1, exported: new Date().toISOString(), data: data };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = 'datasense-progress-' + today() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  function importProgress(file, done) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var obj = JSON.parse(r.result), data = obj && obj.data;
        if (!data || typeof data !== 'object') throw new Error('bad');
        var n = 0;
        Object.keys(data).forEach(function (k) { if (k.indexOf('ds_') === 0) { localStorage.setItem(k, data[k]); n++; } });
        done(n);
      } catch (e) { done(-1); }
    };
    r.onerror = function () { done(-1); };
    r.readAsText(file);
  }

  var PRACTICE_N = 20;
  function practiceSelect(mix) {
    var c = loadCards(), day = dayNum();
    var known = [], neu = [];
    buildIndex().forEach(function (e) { var r = c[cardId(e.q)]; if (r && r.seen) known.push({ e: e, r: r }); else neu.push(e); });
    known.forEach(function (k) { k.p = (5 - k.r.box) * 8 + Math.min(20, day - k.r.last) + Math.random() * 4; });
    known.sort(function (a, b) { return b.p - a.p; });
    neu = shuffle(neu);
    var N = PRACTICE_N;
    var nc = Math.round(mix * N), kc = N - nc;
    if (kc > known.length) { nc += kc - known.length; kc = known.length; }
    if (nc > neu.length) { kc = Math.min(known.length, kc + (nc - neu.length)); nc = neu.length; }
    var sel = known.slice(0, kc).map(function (k) { return k.e; }).concat(neu.slice(0, nc));
    return shuffle(sel);
  }
  function startPractice() {
    var sel = practiceSelect(getMix());
    if (!sel.length) return;
    begin({ name: 'Smart Review', no: '⚡', key: '__practice__' },
      { qk: '__practice__', part: 'Smart Review', name: '' },
      { qs: sel.map(function (e) { return e.q; }), origins: sel.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Smart Review', practice: true });
  }

  // A question's visual may be overridden by a better-matched widget (data_widgets_*.js), keyed by stem.
  function widgetFor(q) { return (window.WIDGETS && window.WIDGETS[q.q]) || q.widget; }
  function rememberHTML(q) {
    var r = widgetFor(q) && widgetFor(q).reveal;
    if (!r) return '';
    return '<div class="remember"><span class="r-tag">Remember</span><b>' + r.name + '</b>' +
      (r.formula ? '<span class="r-formula">' + r.formula + '</span>' : '') + '</div>';
  }

  /* ---------------- contents page ---------------- */
  function totalExercises() {
    var n = 0;
    TOPICS.forEach(function (t) { t.levels.forEach(function (L) { n += (QUESTIONS[L.qk] || []).length; }); });
    return n;
  }
  function home() {
    app.innerHTML = '';
    app.appendChild(h(
      '<header class="masthead">' +
        '<div class="mast-rules"></div>' +
        '<div class="mast-eyebrow"><span>A field manual for practical machine learning</span><span>Vols. 1–2 · Supervised & Unsupervised</span></div>' +
        '<h1>DataSense</h1>' +
        '<p class="mast-sub"><b>Machine learning</b>, learned by doing: ' + totalExercises() + ' exercises across supervised classification, clustering and dimensionality reduction. Miss one and you get the answer in plain English, a lab bench, a quick check, and a second attempt.</p>' +
        '<div class="mast-foot">Multiple choice · questions & answers shuffle on every sitting · progress kept in this browser</div>' +
      '</header>'));

    // ---- Daily challenge (filterable) + lifetime total ----
    renderDaily();
    renderMastery();
    renderPractice();
    renderFavourites();
    renderFlash();

    function renderDaily() {
      var old = app.querySelector('.daily-card');
      var f = getFilter();
      var sig = filterSig(f);
      var dq = dailyQuestions(f);
      var d = loadDaily(sig);
      var dn = dq.qs.length;
      var doneCount = Math.min(d.pos, dn);
      var isDone = dn > 0 && doneCount >= dn;
      var btnLabel = dn === 0 ? 'No questions' : isDone ? 'Review →' : (doneCount > 0 ? 'Continue →' : 'Start ' + dn + ' →');
      var progText = dn === 0
        ? 'No questions match this combination — try another.'
        : isDone
          ? ('Completed — ' + d.correct + ' / ' + dn + ' correct today · resets tomorrow')
          : (doneCount > 0
            ? (doneCount + ' of ' + dn + ' done · ' + d.correct + ' correct so far')
            : (dn + ' questions · ' + filterLabel(f) + ' · resets each day'));
      var pctW = dn ? Math.round(100 * doneCount / dn) : 0;
      function chips(kind, current, opts) {
        return opts.map(function (o) {
          return '<button class="filt-chip' + (o.v === current ? ' on' : '') + '" data-' + kind + '="' + o.v + '">' + o.t + '</button>';
        }).join('');
      }
      var curN = dailyN();
      var daily = h('<section class="daily-card' + (isDone ? ' is-done' : '') + '">' +
        '<div class="daily-main">' +
          '<div class="daily-eyebrow">Daily Challenge · ' + esc(todayLabel()) + '</div>' +
          '<h2 class="daily-title">Daily ' + curN + '</h2>' +
          '<div class="daily-filters">' +
            '<div class="filt-row"><span class="filt-lab">Per day</span>' +
              chips('num', curN, DAILY_OPTS.map(function (v) { return { v: v, t: '' + v }; })) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Type</span>' +
              chips('type', f.type, [{ v: 'both', t: 'Both' }, { v: 'def', t: 'Definitions' }, { v: 'q', t: 'Questions' }]) + '</div>' +
            (f.type === 'def' ? '' :
            '<div class="filt-row"><span class="filt-lab">Level</span>' +
              chips('diff', f.diff, [{ v: 'all', t: 'All' }, { v: '1', t: '1' }, { v: '2', t: '2' }, { v: '3', t: '3' }]) + '</div>') +
          '</div>' +
          '<p class="daily-prog">' + progText + '</p>' +
          '<div class="daily-bar"><div style="width:' + pctW + '%"></div></div>' +
        '</div>' +
        '<div class="daily-side">' +
          '<div class="daily-stat"><span class="ds-num">' + getTotal() + '</span><span class="ds-lab">lifetime<br>correct</span></div>' +
          '<div class="daily-btns">' +
            '<button class="btn daily-go"' + (dn === 0 ? ' disabled' : '') + '>' + btnLabel + '</button>' +
            '<button class="btn daily-more"' + (dn === 0 ? ' disabled' : '') + '>Keep going →</button>' +
          '</div>' +
        '</div></section>');
      daily.querySelectorAll('[data-num]').forEach(function (b) {
        b.onclick = function () { setDailyN(+b.getAttribute('data-num')); renderDaily(); };
      });
      daily.querySelectorAll('[data-type]').forEach(function (b) {
        b.onclick = function () { var nf = getFilter(); nf.type = b.getAttribute('data-type'); setFilter(nf); renderDaily(); };
      });
      daily.querySelectorAll('[data-diff]').forEach(function (b) {
        b.onclick = function () { var nf = getFilter(); nf.diff = b.getAttribute('data-diff'); setFilter(nf); renderDaily(); };
      });
      var go = daily.querySelector('.daily-go');
      if (dn > 0) go.onclick = startDaily;
      var more = daily.querySelector('.daily-more');
      if (dn > 0) more.onclick = startMore;
      if (old) app.replaceChild(daily, old); else app.appendChild(daily);
    }

    function renderPractice() {
      var sum = masterySummary();
      var mixPct = Math.round(getMix() * 100);
      function splitFor(pct) {
        var m = pct / 100, N = PRACTICE_N;
        var seen = sum.struggling + sum.learning + sum.learnt;
        var nc = Math.round(m * N), kc = N - nc;
        if (kc > seen) { nc += kc - seen; kc = seen; }
        if (nc > sum.new) { kc = Math.min(seen, kc + (nc - sum.new)); nc = sum.new; }
        return { kc: kc, nc: nc };
      }
      function readoutText(pct) {
        var s = splitFor(pct);
        if (!s.kc && !s.nc) return 'No cards available yet — try a topic first.';
        return 'This session: ~' + s.kc + ' review (weakest first) · ~' + s.nc + ' new';
      }
      var review = h('<section class="review-card">' +
        '<div class="review-eyebrow">Adaptive · spaced repetition</div>' +
        '<h2 class="review-title">Smart Review</h2>' +
        '<div class="mast-badges">' +
          '<span class="mb mb-learnt"><b>' + sum.learnt + '</b> learnt</span>' +
          '<span class="mb mb-learning"><b>' + sum.learning + '</b> learning</span>' +
          '<span class="mb mb-strug"><b>' + sum.struggling + '</b> struggling</span>' +
          '<span class="mb mb-new"><b>' + sum.new + '</b> new</span>' +
        '</div>' +
        '<div class="dial-wrap">' +
          '<div class="dial-ends"><span>Review what I know</span><span>New material</span></div>' +
          '<input class="dial" type="range" min="0" max="100" step="5" value="' + mixPct + '" aria-label="Review to new mix">' +
          '<p class="dial-read">' + readoutText(mixPct) + '</p>' +
        '</div>' +
        '<div class="next-row"><button class="btn review-go">Start review →</button></div>' +
      '</section>');
      var dial = review.querySelector('.dial');
      var read = review.querySelector('.dial-read');
      dial.oninput = function () { read.textContent = readoutText(+dial.value); };
      dial.onchange = function () { setMix((+dial.value) / 100); };
      review.querySelector('.review-go').onclick = startPractice;
      app.appendChild(review);
    }

    function renderFavourites() {
      var n = favCount();
      if (!n) return;
      var fav = h('<section class="fav-card">' +
        '<div class="fav-info"><span class="fav-star">★</span>' +
        '<div><div class="fav-title">Favourites</div>' +
        '<div class="fav-sub">' + n + ' saved question' + (n === 1 ? '' : 's') + '</div></div></div>' +
        '<button class="btn ghost fav-go">Review →</button></section>');
      fav.querySelector('.fav-go').onclick = startFavourites;
      app.appendChild(fav);
    }

    function renderMastery() {
      var rows = masteryByTopic();
      var mastered = 0, total = 0;
      rows.forEach(function (r) { mastered += r.learnt; total += r.total; });
      var sec = h('<section class="mastery-card">' +
        '<div class="review-eyebrow">Your progress</div>' +
        '<h2 class="review-title">Mastery map</h2>' +
        '<p class="mm-sub"><b>' + mastered + '</b> of ' + total + ' cards mastered · tap a topic to study it</p>' +
        '<div class="mm-legend"><span><i class="mm-dot mm-learnt"></i>mastered</span><span><i class="mm-dot mm-learning"></i>learning</span><span><i class="mm-dot mm-strug"></i>struggling</span><span><i class="mm-dot mm-new"></i>new</span></div>' +
        '<div class="mm-list"></div></section>');
      var list = sec.querySelector('.mm-list');
      function seg(cls, n) { return n ? '<span class="mm-seg ' + cls + '" style="flex:' + n + '"></span>' : ''; }
      rows.forEach(function (r, idx) {
        var pct = r.total ? Math.round(100 * r.learnt / r.total) : 0;
        var row = h('<button class="mm-row">' +
          '<span class="mm-name">' + esc(r.topic) + '</span>' +
          '<span class="mm-bar">' + seg('mm-learnt', r.learnt) + seg('mm-learning', r.learning) + seg('mm-strug', r.struggling) + seg('mm-new', r.new) + '</span>' +
          '<span class="mm-pct">' + pct + '%</span></button>');
        row.onclick = function () { start(TOPICS[idx], TOPICS[idx].levels[0]); };
        list.appendChild(row);
      });
      app.appendChild(sec);
    }

    function renderFlash() {
      var sec = h('<section class="flash-launch">' +
        '<div class="fl-info"><span class="fl-icon">⚡</span>' +
        '<div><div class="fl-title">Flashcards</div>' +
        '<div class="fl-sub">' + flashDeck().length + ' concepts · flip to test yourself</div></div></div>' +
        '<button class="btn ghost fl-go">Study →</button></section>');
      sec.querySelector('.fl-go').onclick = function () { startFlashcards(''); };
      app.appendChild(sec);
    }

    function renderBackup() {
      var sec = h('<section class="data-card">' +
        '<div class="dc-text"><b>Back up your progress</b><span>Your streaks, mastery and favourites live only in this browser. Export a file to keep them safe or move to another device.</span></div>' +
        '<div class="dc-btns"><button class="dc-btn dc-export">⬇ Export</button><button class="dc-btn dc-import">⬆ Restore</button>' +
        '<input type="file" accept="application/json,.json" class="dc-file" hidden></div></section>');
      sec.querySelector('.dc-export').onclick = exportProgress;
      var file = sec.querySelector('.dc-file');
      sec.querySelector('.dc-import').onclick = function () { file.click(); };
      file.onchange = function () {
        if (!file.files || !file.files[0]) return;
        importProgress(file.files[0], function (n) {
          if (n >= 0) { alert('Progress restored (' + n + ' items). Reloading.'); location.reload(); }
          else alert('Could not read that file — is it a DataSense backup?');
        });
      };
      app.appendChild(sec);
    }

    GROUPS.forEach(function (g) {
      app.appendChild(h('<div class="sec-label">' + g.label + '</div>'));
      g.keys.forEach(function (tk) {
        var T = null; TOPICS.forEach(function (t) { if (t.key === tk) T = t; });
        var total = 0; T.levels.forEach(function (L) { total += (QUESTIONS[L.qk] || []).length; });
        var topic = h('<section class="topic">' +
          '<div class="topic-head"><h3>' + T.name + '</h3><span class="t-index">Topic ' + T.no + ' · ' + total + ' exercises</span></div>' +
          '<p class="t-desc">' + T.desc + '</p><div class="toc"></div></section>');
        var toc = topic.querySelector('.toc');
        T.levels.forEach(function (L) {
          var qs = QUESTIONS[L.qk] || [];
          var best = localStorage.getItem(bestKey(L.qk));
          var meta = qs.length ? (best != null ? 'best ' + best + '/' + qs.length : qs.length + ' exercises') : 'in preparation';
          var row = h('<button class="toc-row" data-qk="' + L.qk + '">' +
            '<span class="toc-part">' + L.part + '</span>' +
            '<span class="toc-name">' + L.name + '</span>' +
            '<span class="toc-dots"></span>' +
            '<span class="toc-meta">' + meta + '</span>' +
            '<span class="toc-go" aria-hidden="true">→</span></button>');
          if (!qs.length) row.disabled = true;
          else row.onclick = function () { start(T, L); };
          toc.appendChild(row);
        });
        app.appendChild(topic);
      });
    });

    app.appendChild(h('<div class="sec-label">Forthcoming volumes</div>'));
    var grid = h('<div class="locked-grid"></div>');
    UPCOMING.forEach(function (t) {
      grid.appendChild(h('<div class="topic locked"><h3>' + t.name + '</h3>' +
        '<p class="t-desc">' + t.desc + '</p><span class="stamp">In preparation</span></div>'));
    });
    app.appendChild(grid);

    renderBackup();
  }

  /* ---------------- ground definitions primer ---------------- */
  function start(topic, level) {
    var P = window.PRIMERS && window.PRIMERS[topic.key];
    if (!P) return begin(topic, level);
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
      '<span class="exmeta">§ Topic ' + topic.no + ' · ' + esc(topic.name) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var card = h('<article class="qcard primer">' +
      '<div class="q-eyebrow">Ground definitions · read once, then begin</div>' +
      '<h2 class="primer-title">' + esc(topic.name) + '</h2>' +
      '<p class="primer-note">Every exercise in this topic builds on these terms. Skim them now — each one returns in the labs.</p>' +
      '<dl class="terms"></dl>' +
      '<div class="next-row"><button class="btn primer-start">Begin ' + esc(level.part) + ' — ' + esc(level.name) + ' →</button></div></article>');
    var dl = card.querySelector('.terms');
    P.terms.forEach(function (tm, i) {
      var row = h('<div class="term"><dt><span class="term-no">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="term-t"></span></dt><dd></dd></div>');
      row.querySelector('.term-t').textContent = tm.t;
      row.querySelector('dd').textContent = tm.d;
      dl.appendChild(row);
    });
    card.querySelector('.primer-start').onclick = function () { begin(topic, level); };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- exercise ---------------- */
  function begin(topic, level, opts) {
    opts = opts || {};
    S = {
      topic: topic, level: level,
      qs: opts.qs || shuffle(QUESTIONS[level.qk] || []),
      origins: opts.origins || null,
      daily: !!opts.daily, practice: !!opts.practice, mixed: !!opts.mixed, favourites: !!opts.favourites, more: !!opts.more,
      modeLabel: opts.modeLabel || '', sig: opts.sig || null,
      i: opts.startAt || 0, correct: opts.startCorrect || 0,
      results: opts.results ? opts.results.slice() : []
    };
    question(false);
  }

  function question(isRetry) {
    var q = S.qs[S.i];
    var L = S.level;
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
      '<div class="ruler" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.qs.length + '" aria-valuenow="' + S.i + '"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div>' +
      '<span class="exmeta">Exercise <b>' + (S.i + 1) + '</b> of ' + S.qs.length + ' · <b>' + S.correct + '</b> correct</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);

    var eyebrow = S.mixed
      ? ('§ ' + esc(S.modeLabel || 'Mixed') + ' · ' + esc((S.origins && S.origins[S.i]) || 'Mixed'))
      : ('§ ' + esc(S.topic.name) + ' · ' + esc(L.part) + ' — ' + esc(L.name));
    var card = h('<article class="qcard">' +
      '<div class="q-top"><div class="q-eyebrow">' + eyebrow +
      (isRetry ? ' · <span class="retry-note">second attempt</span>' : '') + '</div>' +
      '<button class="fav-btn' + (isFav(q) ? ' is-fav' : '') + '" type="button" aria-label="Save to favourites" aria-pressed="' + (isFav(q) ? 'true' : 'false') + '">' + (isFav(q) ? '★' : '☆') + '</button>' +
      '</div>' +
      '<h2 class="qtext"></h2><div class="choices"></div></article>');
    card.querySelector('.qtext').textContent = q.q;
    var favBtn = card.querySelector('.fav-btn');
    favBtn.onclick = function () {
      var on = toggleFav(q);
      favBtn.classList.toggle('is-fav', on);
      favBtn.textContent = on ? '★' : '☆';
      favBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    var box = card.querySelector('.choices');
    if (q.fig && window.renderFigure) {
      var figHost = document.createElement('div');
      card.insertBefore(figHost, box);
      renderFigure(figHost, widgetFor(q), q.fig.at, q.fig.cap);
    }
    var order = shuffle(q.choices.map(function (_, i) { return i; }));
    var btns = [];
    order.forEach(function (origIdx, pos) {
      var b = document.createElement('button');
      b.className = 'choice';
      var letter = document.createElement('span');
      letter.className = 'ch-letter'; letter.textContent = LETTERS[pos];
      var text = document.createElement('span');
      text.className = 'ch-text'; text.textContent = q.choices[origIdx];
      b.appendChild(letter); b.appendChild(text);
      b.onclick = function () { answer(q, origIdx, b, btns, card, isRetry); };
      btns.push({ b: b, orig: origIdx });
      box.appendChild(b);
    });
    if (!isRetry) {
      var skipRow = h('<div class="skip-row"><button class="skip-btn" type="button">Skip for now →</button></div>');
      skipRow.querySelector('.skip-btn').onclick = skip;
      card.appendChild(skipRow);
    }
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function skip() {
    S.results.push(null); // neutral: not recorded as right or wrong
    S.i++;
    if (S.daily) saveDaily(S.i >= S.qs.length);
    if (S.i >= S.qs.length) return done();
    question(false);
  }

  function markAll(btns, chosenBtn, right) {
    btns.forEach(function (x) {
      x.b.disabled = true;
      if (x.b !== chosenBtn && x.orig !== 0) x.b.classList.add('dim');
    });
    chosenBtn.classList.add(right ? 'is-correct' : 'picked-wrong');
  }
  function revealCorrect(btns) {
    btns.forEach(function (x) { if (x.orig === 0) { x.b.classList.add('is-correct'); x.b.classList.remove('dim'); } });
  }

  function dotsHTML(res) {
    return '<div class="dots">' + res.map(function (r, i) {
      var cls = r === null ? 'skip' : (r ? 'ok' : 'no');
      return '<span class="dot-q ' + cls + '">' + (i + 1) + '</span>';
    }).join('') + '</div>';
  }

  function answer(q, chosen, btn, btns, card, isRetry) {
    var right = chosen === 0;
    var sr = card.querySelector('.skip-row'); if (sr) sr.remove();
    markAll(btns, btn, right);
    if (!isRetry) { S.results.push(right); recordCard(q, right); }

    if (right) {
      if (!isRetry) { S.correct++; bumpTotal(); }
      card.appendChild(h('<div class="banner good"><span class="b-label">' + (isRetry ? 'Correct on the second attempt ✓' : 'Correct ✓') + '</span>' +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var row = h('<div class="next-row"><button class="btn">Next exercise →</button>' +
        (isRetry ? '' : '<button class="btn ghost">Open the lab anyway</button>') + '</div>');
      row.children[0].onclick = next;
      if (row.children[1]) row.children[1].onclick = function () { row.children[1].remove(); renderWidget(card, widgetFor(q)); };
      card.appendChild(row);
      return;
    }

    if (isRetry) {
      revealCorrect(btns);
      card.appendChild(h('<div class="banner good"><span class="b-label">The answer</span>' + esc(q.choices[0]) +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var row2 = h('<div class="next-row"><button class="btn">Next exercise →</button></div>');
      row2.children[0].onclick = next;
      card.appendChild(row2);
      return;
    }

    // first attempt, wrong → plain-English answer → lab → build-up (break the answer down) → retry
    card.appendChild(h('<div class="banner bad"><span class="b-label">Marked ✗</span>Here\'s the answer in plain English. Then work the lab, build the answer up step by step, and take the question again.</div>'));
    card.appendChild(h('<div class="plain"><span class="p-label">The answer, in plain English</span>' +
      '<div class="p-answer">' + esc(q.choices[0]) + '</div>' +
      (q.simple ? '<p>' + q.simple + '</p>' : '') + '</div>'));
    renderWidget(card, widgetFor(q));
    var toCheck = h('<div class="next-row"><button class="btn">Break it down →</button></div>');
    toCheck.children[0].onclick = function () {
      toCheck.remove();
      quickCheck(q, card);
    };
    card.appendChild(toCheck);
  }

  /* ---------------- build-up: break the correct answer into easier parts ---------------- */
  function buildChecks(q) {
    // Preferred: authored step-by-step breakdown of the correct answer (inline, or from the STEPS map keyed by stem).
    var steps = q.steps || (window.STEPS && window.STEPS[q.q]);
    if (steps && steps.length) {
      return steps.map(function (s) { return { q: s.q, options: [s.ok].concat(s.no) }; });
    }
    // Fallback for any question without an authored breakdown yet: name the underlying idea.
    var r = q.widget && q.widget.reveal;
    if (r && r.name) {
      var names = S.qs.map(function (x) { return x.widget && x.widget.reveal && x.widget.reveal.name; })
        .filter(function (n) { return n && n !== r.name; });
      names = shuffle(names).slice(0, 2);
      if (names.length === 2) return [{ q: 'Which idea does the correct answer rest on?', options: [r.name, names[0], names[1]] }];
    }
    return [];
  }

  function quickCheck(q, card) {
    var checks = buildChecks(q);
    if (!checks.length) { question(true); return; }
    var wrap = h('<div class="checks"></div>');
    card.appendChild(wrap);
    var idx = 0;
    // Reveal the ground-up ladder ONE step at a time — the next step appears only once you've answered the current.
    function renderStep() {
      var c = checks[idx];
      var cc = h('<div class="check-card"><div class="check-label">Step ' + (idx + 1) + ' of ' + checks.length + '</div>' +
        '<div class="check-q"></div><div class="check-opts"></div></div>');
      cc.querySelector('.check-q').textContent = c.q;
      var opts = cc.querySelector('.check-opts');
      var order = shuffle(c.options.map(function (_, i) { return i; }));
      var obtns = [], advanced = false;
      order.forEach(function (orig) {
        var b = document.createElement('button');
        b.className = 'check-opt';
        var mark = document.createElement('span'); mark.className = 'co-mark'; mark.textContent = '○';
        var tx = document.createElement('span'); tx.textContent = c.options[orig];
        b.appendChild(mark); b.appendChild(tx);
        b.onclick = function () {
          obtns.forEach(function (x) {
            x.b.disabled = true;
            if (x.orig === 0) { x.b.classList.add('co-right'); x.b.querySelector('.co-mark').textContent = '✓'; }
            else if (x.b === b) { x.b.classList.add('co-wrong'); x.b.querySelector('.co-mark').textContent = '✗'; }
            else x.b.classList.add('co-dim');
          });
          if (advanced) return;
          advanced = true;
          idx++;
          if (idx < checks.length) { renderStep(); }
          else {
            var retry = h('<div class="next-row"><button class="btn">Take the question again →</button></div>');
            retry.children[0].onclick = function () { question(true); };
            wrap.appendChild(retry);
            retry.children[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        };
        obtns.push({ b: b, orig: orig });
        opts.appendChild(b);
      });
      wrap.appendChild(cc);
      cc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    renderStep();
  }

  function next() {
    S.i++;
    if (S.daily) saveDaily(S.i >= S.qs.length);
    if (S.i >= S.qs.length) return done();
    question(false);
  }

  /* ---------------- report card ---------------- */
  function doneDaily() {
    saveDaily(true);
    var n = S.qs.length, c = S.correct;
    var pct = n ? c / n : 0;
    var msg = pct >= 0.9 ? 'A stellar daily — today\'s target is done. Fancy a few more?' :
      pct >= 0.6 ? 'Solid daily run — every miss came with its own lab.' :
      'The daily mixes every topic; today\'s misses are tomorrow\'s strengths.';
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Daily ' + n + ' · ' + esc(todayLabel()) + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">' + msg + ' <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Keep going →</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startMore;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function doneMore() {
    var n = S.qs.length, c = S.correct;
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Keep going · ' + n + ' extra · ' + esc(todayLabel()) + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">Extra practice beyond today\'s daily — this counts toward your history and lifetime total. <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Keep going →</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startMore;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function donePractice() {
    var n = S.qs.length, c = S.correct;
    var sum = masterySummary();
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Smart Review · adaptive session</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">History updated. <span class="small">Mastered <b>' + sum.learnt + '</b> · learning <b>' + sum.learning + '</b> · struggling <b>' + sum.struggling + '</b> · new <b>' + sum.new + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Another session</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = startPractice;
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function doneFav() {
    var n = S.qs.length, c = S.correct;
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">★ Favourites · ' + n + ' card' + (n === 1 ? '' : 's') + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">Your saved questions, reviewed. <span class="small">Lifetime correct: <b>' + getTotal() + '</b></span></p>' +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function done() {
    if (S.practice) return donePractice();
    if (S.daily) return doneDaily();
    if (S.more) return doneMore();
    if (S.favourites) return doneFav();
    var n = S.qs.length, c = S.correct;
    var L = S.level;
    var prev = +(localStorage.getItem(bestKey(L.qk)) || -1);
    if (c > prev) localStorage.setItem(bestKey(L.qk), c);
    var pct = c / n;
    var msg = pct === 1 ? 'A perfect paper. This level is yours.' :
      pct >= 0.8 ? 'Strong work — the marked squares below are your reading list.' :
      pct >= 0.5 ? 'A solid sitting. Every miss came with its own lab, which is the point.' :
      'This is how the manual is meant to be used: each miss taught you something a lecture couldn\'t.';
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Report · ' + L.part + ' — ' + L.name + ' · ' + S.topic.name + '</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">' + msg + ' <span class="small">(first attempts only)</span></p>' +
      (c > prev && prev >= 0 ? '<div class="r-best">New personal best — previously ' + prev + '</div>' : '') +
      dotsHTML(S.results) +
      '<div class="next-row" style="justify-content:center"><button class="btn">Sit it again</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = function () { begin(S.topic, S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  home();
})();
