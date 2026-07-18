/* DataSense quiz shell — wrong answer → lab → quick check → try again */
(function () {
  'use strict';
  var app = document.getElementById('app');
  window.QUESTIONS = window.QUESTIONS || {};
  // Machine Learning Foundations is trimmed to just its definitions — the useful ML vocabulary —
  // and presented as "Core Definitions"; the rest of the fundamentals questions are dropped.
  (function () {
    var D = window.DEFS || {};
    var defs = (window.QUESTIONS.found1 || []).concat(window.QUESTIONS.found2 || [], window.QUESTIONS.found3 || [])
      .filter(function (q) { return D[q.q]; });
    window.QUESTIONS.founddef = defs;
    if (window.NOTES && window.NOTES.found) window.NOTES.found.name = 'Core Definitions';
  })();
  var TOPICS = [
    { key: 'found', no: '00', name: 'Core Definitions', desc: 'The essential ML vocabulary — the terms every other topic builds on.',
      levels: [{ qk: 'founddef', part: 'Part I', name: 'Definitions' }] },
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
      levels: [{ qk: 'tsne1', part: 'Part I', name: 'Foundations' }, { qk: 'tsne2', part: 'Part II', name: 'Practice' }, { qk: 'tsne3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'feng', no: '17', name: 'Feature Engineering', desc: 'Turn raw columns into features a model can actually use.',
      levels: [{ qk: 'feng1', part: 'Part I', name: 'Foundations' }, { qk: 'feng2', part: 'Part II', name: 'Practice' }, { qk: 'feng3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'fsel', no: '18', name: 'Feature Selection', desc: 'Keep the columns that carry signal; drop the rest.',
      levels: [{ qk: 'fsel1', part: 'Part I', name: 'Foundations' }, { qk: 'fsel2', part: 'Part II', name: 'Practice' }, { qk: 'fsel3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'msel', no: '19', name: 'Model Selection', desc: 'Choose and tune the right model without fooling yourself.',
      levels: [{ qk: 'msel1', part: 'Part I', name: 'Foundations' }, { qk: 'msel2', part: 'Part II', name: 'Practice' }, { qk: 'msel3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'xgb', no: '20', name: 'XGBoost', desc: 'Regularised gradient boosting, engineered for speed and accuracy.',
      levels: [{ qk: 'xgb1', part: 'Part I', name: 'Foundations' }, { qk: 'xgb2', part: 'Part II', name: 'Practice' }, { qk: 'xgb3', part: 'Part III', name: 'Advanced Study' }] },
    { key: 'scen', no: '21', name: 'Applied Scenarios', desc: 'Real situations, real trade-offs: pick the model, metric and fix that fit.',
      levels: [{ qk: 'scen1', part: 'Part I', name: 'Clear Calls' }, { qk: 'scen2', part: 'Part II', name: 'Weighing Trade-offs' }, { qk: 'scen3', part: 'Part III', name: 'Subtle Traps' }] },
    { key: 'interp', no: '22', name: 'Interpretability & Explainability', desc: 'Open the black box: explain what a model does, globally and case by case.',
      levels: [{ qk: 'interp', part: 'Part I', name: 'Definitions' }] },
    { key: 'imbal', no: '23', name: 'Class Imbalance', desc: 'When one class swamps the rest: resample, reweight, move the threshold.',
      levels: [{ qk: 'imbal', part: 'Part I', name: 'Definitions' }] },
    { key: 'evalx', no: '24', name: 'Extra Evaluation Metrics', desc: 'Beyond accuracy: balanced scores, agreement, calibration and PR-AUC.',
      levels: [{ qk: 'evalx', part: 'Part I', name: 'Definitions' }] },
    { key: 'regr', no: '25', name: 'Regression & Boosting', desc: 'Predicting numbers, plus the fast modern boosting libraries.',
      levels: [{ qk: 'regr', part: 'Part I', name: 'Definitions' }] },
    { key: 'valid', no: '26', name: 'Validation', desc: 'Split honestly: grouped, time-ordered and leave-one-out cross-validation.',
      levels: [{ qk: 'valid', part: 'Part I', name: 'Definitions' }] },
    { key: 'wcrypto', no: '27', name: 'Digital Assets & Smart Contracts', mode: 'work', desc: 'Blockchain, tokenization, stablecoins and smart-contract vocabulary.',
      levels: [{ qk: 'wcrypto', part: 'Part I', name: 'Definitions' }] },
    { key: 'wpay', no: '28', name: 'Payments & Fintech', mode: 'work', desc: 'Rails, open banking, APP fraud and the fintech words of the day job.',
      levels: [{ qk: 'wpay', part: 'Part I', name: 'Definitions' }] },
    { key: 'waws', no: '29', name: 'AWS & Cloud', mode: 'work', desc: 'Instances, spinning up, S3, IAM — the everyday cloud vocabulary.',
      levels: [{ qk: 'waws', part: 'Part I', name: 'Definitions' }] },
    { key: 'wai', no: '30', name: 'AI & Emerging Tech', mode: 'work', desc: 'LLMs, generative AI and the model-risk vocabulary of AI in regulation.',
      levels: [{ qk: 'wai', part: 'Part I', name: 'Definitions' }] }
  ];
  var GROUPS = [
    { label: 'Start here — core definitions', keys: ['found'] },
    { label: 'The algorithms', keys: ['knn', 'logreg', 'bayes', 'trees', 'svm'] },
    { label: 'Ensemble methods', keys: ['rf', 'gboost', 'stacking', 'xgb'] },
    { label: 'Features & model choice', keys: ['feng', 'fsel', 'msel'] },
    { label: 'Measuring & tuning', keys: ['metrics', 'perf', 'sklearn'] },
    { label: 'Unsupervised learning', keys: ['kmeans', 'hier', 'dbscan', 'pca', 'tsne'] },
    { label: 'Beyond the basics', keys: ['regr', 'imbal', 'evalx', 'valid', 'interp'] },
    { label: 'Putting it together', keys: ['scen'] },
    { label: 'Innovation & the FCA', keys: ['wcrypto', 'wpay', 'waws', 'wai'], mode: 'work' }
  ];
  // ---- App mode: 'ds' (data science revision) · 'code' (coding drills) · 'work' (FCA & innovation) ----
  function getMode() { var v = localStorage.getItem('ds_mode'); return (v === 'code' || v === 'work') ? v : 'ds'; }
  function setMode(v) { try { localStorage.setItem('ds_mode', v); } catch (e) {} }
  // Topics belong to 'ds' unless tagged; 'code' mode shows its own screen, so shares the ds topic set.
  function topicInMode(t) { var m = getMode() === 'work' ? 'work' : 'ds'; return (t.mode || 'ds') === m; }
  var KEYMODE = {};
  TOPICS.forEach(function (t) { KEYMODE[t.key] = t.mode || 'ds'; });
  function keyInMode(k) { var m = getMode() === 'work' ? 'work' : 'ds'; return (KEYMODE[k] || 'ds') === m; }
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
  function setTotal(v) { try { localStorage.setItem('ds_total_correct', Math.max(0, v)); } catch (e) {} }
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
          var isDef = !!(window.DEFS && window.DEFS[q.q]);
          // Definition questions take their curated 1/2/3 rank as their level, so every
          // difficulty filter (daily, study, type-it) works on rank rather than part.
          var r = q.widget && q.widget.reveal;
          var lvl = (isDef && r && r.name && defRank(r.name)) || (li + 1);
          QINDEX.push({ q: q, topic: t.name, key: t.key, level: lvl, def: isDef });
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
      if (!keyInMode(e.key)) return false;
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
  // A NON-writing attempt (multiple choice, flashcard self-rate, type-it, matching).
  // A correct one keeps the card in 'learning' — it does NOT advance toward know-it/mastery,
  // which come only from written answers. A miss resets the written streak → struggling.
  function recordCard(q, right) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++;
    if (right) { r.box = Math.min(5, r.box + 1); r.lastRight = 1; }
    else { r.wrong++; r.box = Math.max(0, r.box - 2); r.lastWrong = dayNum(); r.lastRight = 0; r.wstreak = 0; }
    r.last = dayNum();
    c[id] = r; saveCards();
  }
  function recordSeen(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.last = dayNum(); c[id] = r; saveCards();
  }
  // A strong WRITTEN answer (>=4/5) — the ONLY thing that advances mastery. One → know it, two → mastered.
  function recordWrittenCorrect(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.box = Math.min(5, r.box + 1); r.wstreak = (r.wstreak || 0) + 1; r.lastRight = 1; r.last = dayNum();
    c[id] = r; saveCards();
  }
  // A middling written answer (3/5): learning — not a miss, but it doesn't advance the written streak.
  function recordPartial(q) {
    var c = loadCards(), id = cardId(q);
    var r = c[id] || { box: 0, seen: 0, wrong: 0, last: 0 };
    r.seen++; r.wstreak = 0; r.lastRight = 1; r.last = dayNum(); c[id] = r; saveCards();
  }
  // Every study mode feeds the SAME per-card memory. Quizzes act on one question;
  // flashcards and the open-writing test act on a whole CONCEPT — so they update
  // every question that teaches that concept, and mastery/Smart Review/daily all
  // move together as one learning map.
  var CONCEPTIDX = null;
  function conceptIndex() {
    if (CONCEPTIDX) return CONCEPTIDX;
    var idx = {};
    buildIndex().forEach(function (e) {
      var names = [];
      if (e.q.widget && e.q.widget.reveal && e.q.widget.reveal.name) names.push(e.q.widget.reveal.name);
      var wf = widgetFor(e.q);
      if (wf && wf.reveal && wf.reveal.name) names.push(wf.reveal.name);
      names.forEach(function (n) { var k = normkey(n); (idx[k] || (idx[k] = [])).push(e.q); });
    });
    CONCEPTIDX = idx; return idx;
  }
  // outcome: 'right' (correct), 'wrong' (miss), 'partial' (3/5 written), 'seen' (touched).
  // wrote=true means it came from the marked WRITTEN test — the only correct that advances mastery.
  function recordConcept(name, outcome, wrote) {
    var qs = conceptIndex()[normkey(name)];
    if (!qs || !qs.length) return 0;
    var uniq = {}, n = 0;
    qs.forEach(function (q) {
      var id = cardId(q); if (uniq[id]) return; uniq[id] = 1; n++;
      if (outcome === 'seen') recordSeen(q);
      else if (outcome === 'partial') recordPartial(q);
      else if (outcome === 'right' && wrote) recordWrittenCorrect(q);   // written correct → advances
      else recordCard(q, outcome === 'right');                          // non-writing correct, or a miss
      if (wrote) { var r = loadCards()[id]; if (r) r.wrote = 1; }
    });
    if (wrote) saveCards();
    if (n) logActivity();
    return n;
  }
  // Written answers, everywhere: >=4/5 is the ONLY correct that advances toward mastery (+ lifetime total);
  // ==3/5 is 'learning' (partial); <=2/5 is a miss. Effort always logs consistency.
  function recordWritten(name, score) {
    var n = recordConcept(name, score >= 4 ? 'right' : (score <= 2 ? 'wrong' : 'partial'), score >= 4);
    if (!n) logActivity();
    if (score >= 4) bumpTotal();
    return n;
  }
  // The marked-writing result panel, shared by both writing modes. Includes a rebuttal control:
  // if you disagree with the AI's mark you can set your own score, and the mastery/total effect is
  // recomputed cleanly (the AI's effect is rolled back first, so adjusting is idempotent).
  function markResultEl(name, reference, res, onNext, onRedo) {
    var affected = (conceptIndex()[normkey(name)] || []).map(cardId);
    var snap = {}, cardsObj = loadCards();
    affected.forEach(function (id) { snap[id] = cardsObj[id] ? JSON.stringify(cardsObj[id]) : null; });
    var snapTotal = getTotal();
    function applyScore(sc) {
      var c = loadCards();
      affected.forEach(function (id) { if (snap[id] == null) delete c[id]; else c[id] = JSON.parse(snap[id]); });
      setTotal(snapTotal); saveCards();
      recordWritten(name, sc);
    }
    var edited = false;
    var el = h('<div class="wr-inner">' +
      '<div class="wr-scorerow"><div class="wr-score sc-' + res.score + '"><span class="wr-num">' + res.score + '</span><span class="wr-den">/ 5</span></div>' +
      '<div class="wr-meter"><div class="wr-fill sc-' + res.score + '" style="width:' + (res.score * 20) + '%"></div></div></div>' +
      '<div class="wr-fb"></div>' +
      '<div class="wr-model"><span class="wr-mtag">The answer</span><span class="wr-modeltext"></span></div>' +
      '<div class="wr-adjust"><span class="wr-adjlab">Think that mark is unfair? Set your own score:</span>' +
        '<span class="wr-adjbtns">' + [1, 2, 3, 4, 5].map(function (s) { return '<button class="wr-adj' + (s === res.score ? ' on' : '') + '" type="button" data-s="' + s + '">' + s + '</button>'; }).join('') + '</span>' +
        '<span class="wr-edited" hidden>✓ your score</span></div>' +
      '<div class="next-row"><button class="btn wr-next">Continue →</button><button class="btn ghost wr-redo">Rewrite</button></div></div>');
    el.querySelector('.wr-fb').textContent = res.feedback || '';
    el.querySelector('.wr-modeltext').textContent = reference;
    function setUI(sc) {
      el.querySelector('.wr-num').textContent = sc;
      el.querySelector('.wr-score').className = 'wr-score sc-' + sc;
      var fill = el.querySelector('.wr-fill'); fill.className = 'wr-fill sc-' + sc; fill.style.width = (sc * 20) + '%';
      el.querySelectorAll('.wr-adj').forEach(function (bt) { bt.classList.toggle('on', +bt.getAttribute('data-s') === sc); });
      el.querySelector('.wr-edited').hidden = !edited;
    }
    el.querySelectorAll('.wr-adj').forEach(function (bt) {
      bt.onclick = function () { var sc = +bt.getAttribute('data-s'); edited = true; applyScore(sc); setUI(sc); };
    });
    el.querySelector('.wr-next').onclick = onNext;
    el.querySelector('.wr-redo').onclick = onRedo;
    applyScore(res.score);   // record the AI's mark to start
    return el;
  }
  // Status: mastery comes only from written answers. 2 good written answers = mastered, 1 = "know it".
  // A miss (any mode) = struggling. Everything else — MC/flashcard/type/match corrects, a 3/5 written,
  // or just seen — is 'learning'. (Legacy cards that were written before start at "know it".)
  function cardStatus(q) {
    var r = loadCards()[cardId(q)];
    if (!r || !r.seen) return 'new';
    var w = (r.wstreak != null) ? r.wstreak : (r.wrote ? 1 : 0);
    if (w >= 2) return 'learnt';                  // mastered: two strong written answers
    if (w === 1) return 'ready';                  // "know it": one strong written answer
    if (r.lastRight === 0) return 'struggling';   // most recent attempt was a miss
    return 'learning';                            // MC/flashcard/type/match correct, 3/5 written, or seen
  }
  function masterySummary() {
    var s = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 };
    buildIndex().forEach(function (e) { s[cardStatus(e.q)]++; });
    return s;
  }
  function masteryByTopic() {
    var by = {};
    buildIndex().forEach(function (e) {
      var m = by[e.key] || (by[e.key] = { key: e.key, topic: e.topic, total: 0, learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 });
      m.total++; m[cardStatus(e.q)]++;
    });
    return TOPICS.filter(topicInMode).map(function (t) { return by[t.key] || { key: t.key, topic: t.name, total: 0, learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 }; });
  }
  function getMix() { var v = +(localStorage.getItem('ds_practice_mix')); return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v)); }
  function setMix(v) { try { localStorage.setItem('ds_practice_mix', v); } catch (e) {} }

  /* ---------------- activity log (for consistency analytics) ---------------- */
  function loadActivity() { try { return JSON.parse(localStorage.getItem('ds_activity') || '{}') || {}; } catch (e) { return {}; } }
  function logActivity() { try { var a = loadActivity(), d = today(); a[d] = (a[d] || 0) + 1; localStorage.setItem('ds_activity', JSON.stringify(a)); } catch (e) {} }
  function fmtDay(dt) { return dt.getFullYear() + '-' + ('0' + (dt.getMonth() + 1)).slice(-2) + '-' + ('0' + dt.getDate()).slice(-2); }

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
  // Curated 1/2/3 rank for definition concepts (data_defs_rank.js): 1 = simple/core,
  // 2 = standard, 3 = advanced/peripheral. Overrides a card's displayed level everywhere.
  function defRank(name) { var m = window.DEFRANK; return (m && m[normkey(name)]) || 0; }
  function flashDeck() {
    if (FLASH) return FLASH.filter(function (d) { return keyInMode(d.key); });
    var at = {}, deck = [];
    buildIndex().forEach(function (e) {
      var r = e.q.widget && e.q.widget.reveal;
      if (!r || !r.name) return;
      var nk = normkey(r.name);
      var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
      if (at[nk] != null) {
        var d = deck[at[nk]];
        if (isDef) d.def = true;
        if (e.level < d.level) d.level = e.level;   // a card's difficulty = the easiest level it appears in
        return;
      }
      at[nk] = deck.length;
      deck.push({ front: r.name, formula: r.formula || '', back: r.text || '', topic: e.topic, key: e.key, def: isDef, level: e.level });
    });
    deck.forEach(function (d) { var rk = defRank(d.front); if (rk) d.level = rk; });   // curated rank wins
    FLASH = deck;
    return FLASH.filter(function (d) { return keyInMode(d.key); });
  }
  // Difficulty filter shared by every study mode. 0 = all levels, else 1/2/3.
  function getStudyDiff() { var d = +(localStorage.getItem('ds_study_diff')); return (d === 1 || d === 2 || d === 3) ? d : 0; }
  function setStudyDiff(d) { try { localStorage.setItem('ds_study_diff', d || 0); } catch (e) {} }
  function diffOk(lvl) { var d = getStudyDiff(); return !d || lvl === d; }
  // "Unseen only" filter: limit any study mode to concepts/questions you haven't touched yet.
  function getStudyNew() { return localStorage.getItem('ds_study_new') === 'new' ? 'new' : 'all'; }
  function setStudyNew(v) { try { localStorage.setItem('ds_study_new', v); } catch (e) {} }
  function qSeen(q, cards) { var r = cards[cardId(q)]; return !!(r && r.seen); }
  function conceptSeen(front, cards, cidx) { var qs = cidx[normkey(front)]; if (!qs) return false; for (var i = 0; i < qs.length; i++) { if (qSeen(qs[i], cards)) return true; } return false; }
  // pool filters honouring the "Unseen only" toggle — one for question entries (MC), one for concept cards.
  function newFilterQ(pool) { if (getStudyNew() !== 'new') return pool; var c = loadCards(); return pool.filter(function (e) { return !qSeen(e.q, c); }); }
  function newFilterC(deck) { if (getStudyNew() !== 'new') return deck; var c = loadCards(), idx = conceptIndex(); return deck.filter(function (card) { return !conceptSeen(card.front, c, idx); }); }
  function diffTag(lvl) { return '<span class="lvl-pip lvl-' + lvl + '" title="Difficulty ' + lvl + ' of 3">L' + lvl + '</span>'; }
  // Friendly stop when a topic+difficulty combination has nothing to study.
  function noContent(label) {
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">' + esc(label) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    app.appendChild(h('<article class="qcard"><h2 class="qtext">Nothing here yet</h2>' +
      '<p class="t-desc">No ' + esc(label.toLowerCase()) + ' match that topic and difficulty. Try “All levels” or a different topic.</p>' +
      '<div class="next-row"><button class="btn nc-back">← Back to Study</button></div></article>'));
    app.querySelector('.nc-back').onclick = home;
    window.scrollTo(0, 0);
  }
  function startFlashcards(topicKey, defsOnly) {
    var deck = shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && (!defsOnly || c.def) && diffOk(c.level); })));
    if (!deck.length) return noContent('Flashcards');
    var i = 0, flipped = false;
    function draw() {
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / deck.length) + '%"></div></div>' +
        '<span class="exmeta">Card <b>' + (i + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var c = deck[i];
      var opts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === topicKey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var view = h('<div class="flash-view">' +
        '<select class="flash-topic">' + opts + '</select>' +
        '<div class="flash-stage"><button class="flash-card' + (flipped ? ' flipped' : '') + '" aria-label="Flip card">' +
          '<div class="flash-face flash-front"><span class="flash-tag">Concept ' + diffTag(c.level) + '</span><div class="flash-term"></div><span class="flash-hint">tap to reveal the definition</span></div>' +
          '<div class="flash-face flash-back"><span class="flash-tag">Definition</span>' + (c.formula ? '<div class="flash-formula"></div>' : '') + '<div class="flash-def"></div><span class="flash-topictag">' + esc(c.topic) + ' ' + diffTag(c.level) + '</span></div>' +
        '</button></div>' +
        '<div class="flash-controls"><button class="btn ghost flash-prev">← Prev</button><button class="btn flash-flip">Flip</button><button class="btn ghost flash-next">Skip →</button></div>' +
        '<div class="flash-rate"><span class="fr-lab">How well did you know it?</span>' +
          '<button class="btn fr-good">✓ Got it</button><button class="btn ghost fr-again">↻ Review again</button></div>' +
        '<button class="flash-shuffle">↻ Shuffle deck</button>' +
      '</div>');
      view.querySelector('.flash-term').textContent = c.front;
      view.querySelector('.flash-def').textContent = c.back;
      if (c.formula) view.querySelector('.flash-formula').textContent = c.formula;
      var fc = view.querySelector('.flash-card');
      function flip() { flipped = !flipped; fc.classList.toggle('flipped', flipped); }
      function advance() { i = (i + 1) % deck.length; flipped = false; draw(); }
      fc.onclick = flip;
      view.querySelector('.flash-flip').onclick = function (ev) { ev.stopPropagation(); flip(); };
      view.querySelector('.flash-prev').onclick = function () { i = (i - 1 + deck.length) % deck.length; flipped = false; draw(); };
      view.querySelector('.flash-next').onclick = function () { recordConcept(c.front, 'seen'); advance(); };
      // Self-rating feeds the shared learning map: 'Got it' strengthens every question
      // that teaches this concept; 'Review again' marks it for spaced review.
      view.querySelector('.fr-good').onclick = function () { recordConcept(c.front, 'right'); advance(); };
      view.querySelector('.fr-again').onclick = function () { recordConcept(c.front, 'wrong'); advance(); };
      view.querySelector('.flash-shuffle').onclick = function () { deck = shuffle(deck); i = 0; flipped = false; draw(); };
      view.querySelector('.flash-topic').onchange = function () { startFlashcards(this.value); };
      view.insertBefore(aiExplainConcept(c.front, c.back), view.querySelector('.flash-shuffle'));
      app.appendChild(view);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- type the term: read the definition, recall the name ---------------- */
  // Forgiving match: exact after normalising, near-miss (1 edit) for longer terms, or the term's
  // significant words all present. Typing recall is harder than recognising, so we grade kindly.
  function editDist(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    var m = a.length, n = b.length, d = [];
    for (var i = 0; i <= m; i++) { d[i] = [i]; }
    for (var j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function termMatches(guess, target) {
    var g = normkey(guess), t = normkey(target);
    if (!g) return false;
    if (g === t) return true;
    if (t.length >= 6 && editDist(g, t) <= (t.length >= 10 ? 2 : 1)) return true;
    // a parenthetical is a qualifier, not part of the term: accept "recall" for "Recall (sensitivity)"
    var main = normkey(target.replace(/\(.*?\)/g, ' '));
    if (main && main !== t) {
      if (g === main) return true;
      if (main.length >= 6 && editDist(g, main) <= (main.length >= 10 ? 2 : 1)) return true;
    }
    // accept "k nearest neighbours" for "k-Nearest Neighbours (k-NN)" style targets
    var words = target.toLowerCase().replace(/\(.*?\)/g, '').split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2; });
    if (words.length >= 2 && words.every(function (w) { return g.indexOf(normkey(w)) >= 0; })) return true;
    return false;
  }
  function startTypeIt(topicKey) {
    var deck = shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && c.back && c.back.length > 15 && diffOk(c.level); }))).slice(0, 10);
    if (!deck.length) return noContent('Type-the-term cards');
    var i = 0, score = 0;
    function draw() {
      var c = deck[i];
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Type the term · <b>' + (i + 1) + '</b> of ' + deck.length + ' · <b>' + score + '</b> right</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var card = h('<article class="qcard type-card">' +
        '<div class="q-eyebrow">Type the term · ' + esc(c.topic) + ' ' + diffTag(c.level) + '</div>' +
        '<div class="type-def"><span class="p-label">The definition</span><p class="type-deftext"></p>' + (c.formula ? '<div class="type-formula"></div>' : '') + '</div>' +
        '<label class="type-lab" for="type-in">Which term is this?</label>' +
        '<form class="type-form"><input id="type-in" class="type-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type the term…">' +
        '<button class="btn type-go" type="submit">Check</button><button class="btn ghost type-skip" type="button">Skip →</button></form>' +
        '<div class="type-result" hidden></div></article>');
      card.querySelector('.type-deftext').textContent = c.back;
      if (c.formula) card.querySelector('.type-formula').textContent = c.formula;
      var form = card.querySelector('.type-form');
      var input = card.querySelector('.type-in');
      var result = card.querySelector('.type-result');
      var answered = false;
      function goNext() {
        i++;
        if (i < deck.length) return draw();
        app.innerHTML = '';
        var doneCard = h('<div class="result-card"><div class="r-eyebrow">Type the term · ' + deck.length + ' definitions</div>' +
          '<div class="score-big">' + score + ' <small>/ ' + deck.length + '</small></div>' +
          '<p class="r-msg">Recalling a term cold is harder than recognising it — every one of these strengthened your learning map.</p>' +
          '<div class="next-row" style="justify-content:center"><button class="btn">Another round</button><button class="btn ghost">Contents</button></div></div>');
        doneCard.querySelector('.btn').onclick = function () { startTypeIt(topicKey); };
        doneCard.querySelector('.btn.ghost').onclick = home;
        app.appendChild(doneCard);
      }
      function reveal(outcome) {   // 'right' | 'wrong' | 'skip'
        if (answered) return;
        answered = true;
        var right = outcome === 'right';
        input.disabled = true;
        card.querySelector('.type-go').disabled = true;
        card.querySelector('.type-skip').disabled = true;
        if (right) score++;
        recordConcept(c.front, outcome === 'skip' ? 'seen' : (right ? 'right' : 'wrong'));
        result.hidden = false;
        result.className = 'type-result ' + (right ? 'tr-good' : (outcome === 'skip' ? '' : 'tr-bad'));
        result.innerHTML = '<span class="tr-mark">' + (right ? '✓ That\'s it' : (outcome === 'skip' ? 'Skipped — the term is' : '✗ Not quite')) + '</span>' +
          '<div class="tr-term"></div>' +
          '<div class="next-row"><button class="btn tr-next">' + (i + 1 < deck.length ? 'Next definition →' : 'See the score →') + '</button></div>';
        result.querySelector('.tr-term').textContent = c.front;
        result.insertBefore(aiExplainConcept(c.front, c.back), result.querySelector('.next-row'));
        result.querySelector('.tr-next').onclick = goNext;
        input.blur();
      }
      form.onsubmit = function (ev) { ev.preventDefault(); reveal(termMatches(input.value, c.front) ? 'right' : 'wrong'); };
      card.querySelector('.type-skip').onclick = function () { reveal('skip'); };
      app.appendChild(card);
      window.scrollTo(0, 0);
      setTimeout(function () { input.focus(); }, 50);
    }
    draw();
  }

  /* ---------------- matching: pair terms with definitions, then order algorithm steps ---------------- */
  function startMatching(topicKey) {
    var pool = shuffle(newFilterC(flashDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && c.back && c.back.length > 15 && diffOk(c.level); })));
    var orders = getStudyNew() === 'new' ? [] : shuffle((window.ORDERS || []).filter(function (o) { return (!topicKey || o.key === topicKey) && diffOk(o.level || 1); })).slice(0, 2);
    var PAIRS = 5, ROUNDS = Math.min(3, Math.floor(pool.length / PAIRS));
    if (!ROUNDS && !orders.length) return noContent('Match & order sets');
    var round = 0, orderIdx = 0, totalRight = 0, totalPairs = 0;
    function trim(s) { return s.length > 110 ? s.slice(0, 107).replace(/\s+\S*$/, '') + '…' : s; }
    function drawMatch() {
      var cards = pool.slice(round * PAIRS, round * PAIRS + PAIRS);
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Match · round <b>' + (round + 1) + '</b> of ' + (ROUNDS + (orders.length ? orders.length : 0)) + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var sec = h('<article class="qcard match-card"><div class="q-eyebrow">Match each term to its definition</div>' +
        '<div class="match-cols"><div class="match-terms"></div><div class="match-defs"></div></div>' +
        '<p class="match-note">Tap a term, then tap its definition.</p></article>');
      var termsEl = sec.querySelector('.match-terms'), defsEl = sec.querySelector('.match-defs');
      var selTerm = null, solved = 0, errs = {};
      shuffle(cards.slice()).forEach(function (c) {
        var b = h('<button class="match-item mi-term" type="button"></button>');
        b.textContent = c.front;
        b._c = c;
        b.onclick = function () {
          if (b.classList.contains('mi-done')) return;
          termsEl.querySelectorAll('.mi-term').forEach(function (x) { x.classList.remove('mi-sel'); });
          b.classList.add('mi-sel'); selTerm = b;
        };
        termsEl.appendChild(b);
      });
      shuffle(cards.slice()).forEach(function (c) {
        var b = h('<button class="match-item mi-def" type="button"></button>');
        b.textContent = trim(c.back);
        b._c = c;
        b.onclick = function () {
          if (b.classList.contains('mi-done') || !selTerm) return;
          var t = selTerm._c;
          if (t === b._c) {
            selTerm.classList.remove('mi-sel'); selTerm.classList.add('mi-done'); b.classList.add('mi-done');
            selTerm.disabled = true; b.disabled = true;
            var right = !errs[normkey(t.front)];
            recordConcept(t.front, right ? 'right' : 'wrong');
            totalPairs++; if (right) totalRight++;
            selTerm = null; solved++;
            if (solved === cards.length) setTimeout(nextStage, 450);
          } else {
            errs[normkey(t.front)] = 1;
            b.classList.add('mi-shake'); selTerm.classList.add('mi-shake');
            setTimeout(function () { b.classList.remove('mi-shake'); if (selTerm) selTerm.classList.remove('mi-shake'); }, 350);
          }
        };
        defsEl.appendChild(b);
      });
      app.appendChild(sec);
      window.scrollTo(0, 0);
    }
    function drawOrder() {
      var o = orders[orderIdx];
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Order the steps · ' + esc(o.title) + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var sec = h('<article class="qcard order-card"><div class="q-eyebrow">Put the steps in order ' + diffTag(o.level || 1) + '</div>' +
        '<h2 class="order-title">' + esc(o.title) + '</h2>' +
        '<p class="match-note">Tap the steps in the order they happen — first step first.</p>' +
        '<div class="order-list"></div><div class="order-done" hidden></div></article>');
      var list = sec.querySelector('.order-list');
      var expected = 0, wrongTaps = 0;
      shuffle(o.steps.map(function (s, i) { return { s: s, i: i }; })).forEach(function (it) {
        var b = h('<button class="order-item" type="button"><span class="oi-no"></span><span class="oi-text"></span></button>');
        b.querySelector('.oi-text').textContent = it.s;
        b.onclick = function () {
          if (b.classList.contains('oi-done')) return;
          if (it.i === expected) {
            b.classList.add('oi-done');
            b.querySelector('.oi-no').textContent = (expected + 1);
            expected++;
            if (expected === o.steps.length) {
              logActivity();
              var d = sec.querySelector('.order-done');
              d.hidden = false;
              d.innerHTML = '<div class="banner good"><span class="b-label">' + (wrongTaps ? 'Ordered ✓ (' + wrongTaps + ' wrong tap' + (wrongTaps === 1 ? '' : 's') + ')' : 'Perfect order ✓') + '</span>Every step in its place.</div>' +
                '<div class="next-row"><button class="btn od-next">Continue →</button></div>';
              d.querySelector('.od-next').onclick = function () { orderIdx++; nextStage(); };
            }
          } else {
            wrongTaps++;
            b.classList.add('mi-shake');
            setTimeout(function () { b.classList.remove('mi-shake'); }, 350);
          }
        };
        list.appendChild(b);
      });
      app.appendChild(sec);
      window.scrollTo(0, 0);
    }
    function nextStage() {
      round++;
      if (round <= ROUNDS - 1) return drawMatch();
      if (orderIdx < orders.length) return drawOrder();
      app.innerHTML = '';
      var doneCard = h('<div class="result-card"><div class="r-eyebrow">Match &amp; order</div>' +
        '<div class="score-big">' + totalRight + ' <small>/ ' + totalPairs + ' first-try</small></div>' +
        '<p class="r-msg">Pairs matched' + (orders.length ? ' and algorithm steps put in order' : '') + ' — all of it feeds your learning map.</p>' +
        '<div class="next-row" style="justify-content:center"><button class="btn">Another round</button><button class="btn ghost">Contents</button></div></div>');
      doneCard.querySelector('.btn').onclick = function () { startMatching(topicKey); };
      doneCard.querySelector('.btn.ghost').onclick = home;
      app.appendChild(doneCard);
    }
    if (ROUNDS) drawMatch(); else drawOrder();
  }

  /* ---------------- read + recall: read a note, then test yourself, over and over ---------------- */
  // The test after each note can be a flashcard, a multiple-choice question, an open written
  // answer (marked by Claude), or a mix — the learner chooses in the Study picker.
  function getLearnTest() { var v = localStorage.getItem('ds_learn_test'); return (v === 'card' || v === 'mc' || v === 'written') ? v : 'mix'; }
  function setLearnTest(v) { try { localStorage.setItem('ds_learn_test', v); } catch (e) {} }
  // How many concepts a single read+recall pass covers. 0 = the whole topic in one sitting.
  var LEARN_OPTS = [10, 25, 50, 0];
  function learnN() { var n; try { n = +localStorage.getItem('ds_learn_n'); } catch (e) {} return LEARN_OPTS.indexOf(n) >= 0 ? n : 25; }
  function setLearnN(n) { try { localStorage.setItem('ds_learn_n', String(n)); } catch (e) {} }
  // Scope of a read+recall pass: every concept, or just the tagged definitions.
  function getLearnScope() { return localStorage.getItem('ds_learn_scope') === 'defs' ? 'defs' : 'all'; }
  function setLearnScope(v) { try { localStorage.setItem('ds_learn_scope', v); } catch (e) {} }
  // Home layout: which "door" (Learn / Practice / Reference) is open, plus the collapsible progress
  // and connect-Claude panels. Keeps the home page to one focused area at a time instead of a long scroll.
  function getHomeDoor() { var v = localStorage.getItem('ds_home_door'); return (v === 'reference' || v === 'dashboard') ? v : 'study'; }
  function setHomeDoor(v) { try { localStorage.setItem('ds_home_door', v); } catch (e) {} }
  function getProgressOpen() { return localStorage.getItem('ds_home_prog') === '1'; }
  function setProgressOpen(v) { try { localStorage.setItem('ds_home_prog', v ? '1' : '0'); } catch (e) {} }
  function getApiOpen() { return localStorage.getItem('ds_home_api') === '1'; }
  function setApiOpen(v) { try { localStorage.setItem('ds_home_api', v ? '1' : '0'); } catch (e) {} }
  // Tokenise a title/definition for the read↔concept matching below (drops short/stop words).
  var LEARN_STOP = ['the', 'and', 'for', 'with', 'that', 'this', 'are', 'was', 'its', 'you', 'your', 'from', 'into', 'not', 'but', 'how', 'why', 'what', 'when', 'one', 'two', 'per', 'via', 'use', 'used', 'uses', 'each', 'they', 'them', 'has', 'have', 'can', 'all', 'any', 'set', 'get'];
  function learnTokens(s) { return (s || '').toLowerCase().split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && LEARN_STOP.indexOf(w) < 0; }); }
  // The study note that IS the given concept — used as the richer READ material before recalling it.
  // A note qualifies only when its title genuinely names the concept: an exact match, or a ≥2-word
  // full containment either way (so "Manhattan distance" pairs with "Manhattan (city-block) distance",
  // but a generic single word like "Small"/"Large" never drags an adjacent note onto the wrong concept).
  // No qualifying note → we fall back to the concept's own definition, so read and test always agree.
  function bestNoteForConcept(concept, notes) {
    var cName = normkey(concept.front), cTok = learnTokens(concept.front);
    var exact = null, contained = null;
    notes.forEach(function (n) {
      if (exact) return;
      var nt = normkey(n.t);
      if (nt === cName) { exact = n; return; }
      if (contained) return;
      var ntTok = learnTokens(n.t);
      if (ntTok.length >= 2 && cTok.length >= 2 &&
        (ntTok.every(function (w) { return cTok.indexOf(w) >= 0; }) ||
         cTok.every(function (w) { return ntTok.indexOf(w) >= 0; }))) contained = n;
    });
    return exact || contained || null;
  }
  // Of a concept's questions, the one whose wording overlaps the note you just read the most —
  // so the multiple-choice step tests THAT note, not a random sibling question of the concept.
  function bestQuestionForNote(note, qs) {
    var ntok = learnTokens(note.t + ' ' + (note.d || ''));
    var best = qs[0], bestScore = -1;
    qs.forEach(function (q) {
      var qtok = learnTokens(q.q + ' ' + ((q.choices && q.choices[0]) || '') + ' ' + (q.explain || ''));
      var s = 0; qtok.forEach(function (w) { if (ntok.indexOf(w) >= 0) s++; });
      if (s > bestScore) { bestScore = s; best = q; }
    });
    return best;
  }
  // Every distinct concept in a topic that read+recall can cover: a study note where one names the
  // concept, otherwise the concept's own flashcard used as the thing to read. This is why finishing a
  // topic really does cover the whole topic — not just the handful of concepts a note happened to name.
  function learnConcepts(topicKey, scope) {
    var out = [];
    // Every topic that has study notes OR concept cards — not just those with a Notes-reader entry, so
    // note-less topics (e.g. Applied Scenarios) are still fully covered via their concept flashcards.
    TOPICS.forEach(function (t) {
      if (topicKey && t.key !== topicKey) return;
      if (!topicKey && !topicInMode(t)) return;
      var notes = [];
      var nt = window.NOTES && window.NOTES[t.key];
      if (nt) (nt.groups || []).forEach(function (g) {
        (g.items || []).forEach(function (it) { notes.push({ t: it.t, d: it.d, f: it.f, group: g.h, topic: t.name }); });
      });
      // Build the concept list from THIS topic's own questions. A concept can be shared across topics
      // (e.g. "feature scaling" in both kNN and Feature Engineering); the global flashcard deck assigns
      // it to just one topic, but the dashboard counts each question under its own topic — so a topic must
      // cover every concept its questions test, including ones "owned" elsewhere. Otherwise those
      // questions can never be marked seen by studying the topic they live in.
      var byConcept = {}, cardsMap = {};
      buildIndex().filter(function (e) { return e.key === t.key && diffOk(e.level); }).forEach(function (e) {
        var wf = widgetFor(e.q), r = wf && wf.reveal;
        if (!r || !r.name) return;
        var k = normkey(r.name);
        (byConcept[k] || (byConcept[k] = [])).push(e.q);
        var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
        if (!cardsMap[k]) cardsMap[k] = { front: r.name, formula: r.formula || '', back: r.text || e.q.simple || e.q.explain || '', topic: t.name, key: t.key, level: e.level, def: isDef };
        else { if (e.level < cardsMap[k].level) cardsMap[k].level = e.level; if (isDef) cardsMap[k].def = true; }
      });
      var cards = Object.keys(cardsMap).map(function (k) { return cardsMap[k]; });
      cards.forEach(function (c) { var rk = defRank(c.front); if (rk) c.level = rk; });   // curated rank wins
      if (scope === 'defs') cards = cards.filter(function (c) { return c.def; });   // definitions-only pass
      if (!cards.length) return;
      // Concept-driven: one read → recall per concept. The read is ALWAYS titled with the concept being
      // tested; its body is a strongly-matching study note's explanation where one exists, otherwise the
      // concept's own definition. Read and test therefore describe the exact same thing — always aligned.
      cards.forEach(function (c) {
        var best = bestNoteForConcept(c, notes);
        var readNote = best
          ? { t: c.front, d: best.d, f: best.f || c.formula || '', group: 'From the notes', topic: t.name }
          : { t: c.front, d: c.back, f: c.formula || '', group: 'Key concept', topic: t.name };
        out.push({ note: readNote, concept: c, topic: t.name, byConcept: byConcept });
      });
    });
    return out;
  }
  // How far along a concept is, for prioritising the least-known first: lower = needs work more.
  function conceptRank(item) {
    var qs = item.concept && item.byConcept[normkey(item.concept.front)];
    var st = (qs && qs.length) ? cardStatus(qs[0]) : 'new';
    return st === 'learnt' ? 3 : st === 'ready' ? 2 : st === 'learning' ? 1 : 0;   // new / struggling first
  }
  function learnSequence(topicKey, testType, cap, scope) {
    var items = learnConcepts(topicKey, scope);
    // Split into testable concepts (deduped) and pure read-only notes (headings with no concept).
    var seenC = {}, concepts = [], readOnly = [];
    items.forEach(function (x) {
      if (!x.concept) { readOnly.push(x); return; }
      var k = normkey(x.concept.front);
      if (seenC[k]) return; seenC[k] = 1;   // a concept is tested once per pass; prefer its first (note) form
      concepts.push(x);
    });
    if (getStudyNew() === 'new') {   // "Unseen only": keep concepts you haven't touched yet
      var _c = loadCards(), _i = conceptIndex();
      concepts = concepts.filter(function (x) { return !conceptSeen(x.concept.front, _c, _i); });
      readOnly = [];
    }
    // Fresh order each Start, but least-mastered concepts first so short sessions hit what needs work
    // and repeated passes actually finish the topic instead of re-drilling what's already mastered.
    // Within the same mastery band, rank-1 (core/simple) concepts come before rank-2 and rank-3.
    concepts = shuffle(concepts);
    concepts.sort(function (a, b) {
      return (conceptRank(a) - conceptRank(b)) || ((a.concept.level || 2) - (b.concept.level || 2));
    });   // stable: keeps the shuffle within a band
    var plan;
    if (cap && cap > 0) { plan = concepts.slice(0, cap); }
    else { plan = shuffle(concepts.concat(readOnly)); }   // "whole topic": include the read-only notes too
    var seq = [];
    plan.forEach(function (x) {
      var n = x.note, concept = x.concept, byConcept = x.byConcept;
      seq.push({ type: 'read', note: n });
      if (!concept) return;
      var conceptQs = byConcept[normkey(concept.front)] || [];
      var testCard = { front: concept.front, back: concept.back, formula: concept.formula || '', topic: x.topic, record: concept.front, level: concept.level };
      var pick = testType;
      if (pick === 'mix') {
        var opts = ['card'];
        if (conceptQs.length) opts.push('mc');
        if (apiKey()) opts.push('written');
        pick = opts[Math.floor(Math.random() * opts.length)];
      }
      if (pick === 'mc' && conceptQs.length) seq.push({ type: 'mc', q: bestQuestionForNote(n, conceptQs), topic: x.topic, note: n, concept: concept.front });
      else if (pick === 'written') seq.push({ type: 'written', card: testCard });
      else seq.push({ type: 'card', card: testCard });
    });
    return seq;
  }
  function startLearn(topicKey) {
    var seq = learnSequence(topicKey, getLearnTest(), learnN(), getLearnScope());
    if (!seq.length) return noContent('Read + recall');
    var i = 0, seen = 0, known = 0;
    function advance() { i++; if (i >= seq.length) return finish(); draw(); }
    // Skip this note AND its attached test (if any), jumping to the next note.
    function skipPair() { i += (seq[i + 1] && seq[i + 1].type !== 'read') ? 2 : 1; if (i >= seq.length) return finish(); draw(); }
    function bar() {
      var b = h('<div class="exbar"><button class="back">← Contents</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / seq.length) + '%"></div></div>' +
        '<span class="exmeta">Read + recall · <b>' + (i + 1) + '</b> of ' + seq.length + '</span></div>');
      b.querySelector('.back').onclick = home;
      return b;
    }
    function draw() {
      var step = seq[i];
      if (step.type === 'mc') { drawMC(step); return; }   // begin() renders the full question UI (lab, skip, ladder, retry)
      app.innerHTML = '';
      app.appendChild(bar());
      if (step.type === 'read') drawRead(step.note);
      else if (step.type === 'written') drawWritten(step);
      else drawCard(step.card);
      window.scrollTo(0, 0);
    }
    function nextLabel() {
      var nx = seq[i + 1];
      if (!nx) return 'Next →';
      if (nx.type === 'mc') return 'Answer a question →';
      if (nx.type === 'written') return 'Explain it →';
      if (nx.type === 'card') return 'Recall a card →';
      return 'Next →';
    }
    function drawRead(n) {
      var card = h('<article class="qcard learn-read">' +
        '<div class="q-eyebrow">Read · ' + esc(n.topic) + ' · ' + esc(n.group) + '</div>' +
        '<div class="note-item lr-item"><div class="ni-t"></div><div class="ni-d"></div>' + (n.f ? '<div class="ni-f"></div>' : '') + '</div>' +
        '<div class="next-row"><button class="btn lr-next">' + nextLabel() + '</button><button class="btn ghost lr-skip">Skip →</button></div></article>');
      card.querySelector('.ni-t').textContent = n.t;
      card.querySelector('.ni-d').textContent = n.d;
      if (n.f) card.querySelector('.ni-f').textContent = n.f;
      card.appendChild(aiExplainConcept(n.t, n.d));
      card.querySelector('.lr-next').onclick = advance;
      card.querySelector('.lr-skip').onclick = skipPair;
      app.appendChild(card);
    }
    // Multiple-choice test step: the FULL question experience — lab bench, skip, plain-English
    // answer, break-it-down ladder and second attempt — then it returns to the read+recall loop.
    function drawMC(step) {
      begin({ name: 'Read + recall', no: '✎', key: '__learn__' },
        { qk: '__learn__', part: 'Read + recall', name: step.topic },
        { qs: [step.q], origins: [step.topic], mixed: true, modeLabel: 'Read + recall', learnNote: step.note, learnConcept: step.concept,
          learnNext: function (correct) { seen++; if (correct) known++; advance(); } });
    }
    // Open written test step: explain the concept; Claude Haiku marks it /5 (needs the user's key).
    function drawWritten(step) {
      var c = step.card;
      var reference = (c.formula ? c.formula + ' — ' : '') + c.back;
      var prompt = 'In your own words, explain: ' + c.front;
      var view = h('<article class="qcard learn-writeq">' +
        '<div class="q-eyebrow">Explain what you just read · ' + esc(c.topic) + (c.level ? ' ' + diffTag(c.level) : '') + '</div>' +
        '<h2 class="write-prompt"></h2>' +
        '<textarea class="write-ta" rows="5" placeholder="Write your explanation here… then press Mark it."></textarea>' +
        '<div class="write-actions"><button class="btn write-mark">Mark it →</button><button class="btn ghost lw-skip">Skip →</button><button class="write-key-link" type="button">API key</button></div>' +
        '<div class="write-result" hidden></div></article>');
      view.querySelector('.write-prompt').textContent = prompt;
      var ta = view.querySelector('.write-ta'), result = view.querySelector('.write-result'), mark = view.querySelector('.write-mark');
      view.querySelector('.lw-skip').onclick = advance;
      view.querySelector('.write-key-link').onclick = function () { showKeyPanel(result); };
      function runMark() {
        if (!apiKey()) { showKeyPanel(result, 'You need a Claude API key to mark writing.'); return; }
        mark.disabled = true; ta.disabled = true;
        result.hidden = false; result.className = 'write-result';
        result.innerHTML = '<div class="wr-load">Marking your answer with Claude Haiku…</div>';
        gradeWriting(prompt, reference, ta.value, function (res) {
          if (res.error) {
            mark.disabled = false; ta.disabled = false;
            if (res.error === 'nokey') { showKeyPanel(result); return; }
            if (res.error === 'offline') { result.innerHTML = '<div class="wr-err">No connection — marking needs the internet. The rest of DataSense works fully offline.</div>'; return; }
            result.innerHTML = '<div class="wr-err"><span>' + esc(res.error) + '</span> <button class="btn ghost wr-retry">Try again</button></div>';
            result.querySelector('.wr-retry').onclick = runMark;
            return;
          }
          seen++; if (res.score >= 4) known++;
          result.innerHTML = '';
          result.appendChild(markResultEl(c.record || c.front, reference, res,
            advance,
            function () { mark.disabled = false; ta.disabled = false; result.hidden = true; ta.focus(); }));
        });
      }
      mark.onclick = runMark;
      view.appendChild(aiExplainConcept(c.front, c.back));
      app.appendChild(view);
      setTimeout(function () { ta.focus(); }, 60);
    }
    function drawCard(c) {
      var flipped = false;
      var view = h('<article class="qcard learn-cardq">' +
        '<div class="q-eyebrow">Recall what you just read · ' + esc(c.topic) + (c.level ? ' ' + diffTag(c.level) : '') + '</div>' +
        '<div class="flash-stage"><button class="flash-card" aria-label="Flip card">' +
          '<div class="flash-face flash-front"><span class="flash-tag">Can you explain it?</span><div class="flash-term"></div><span class="flash-hint">tap to reveal</span></div>' +
          '<div class="flash-face flash-back"><span class="flash-tag">Answer</span>' + (c.formula ? '<div class="flash-formula"></div>' : '') + '<div class="flash-def"></div></div>' +
        '</button></div>' +
        '<div class="flash-rate" hidden><span class="fr-lab">Did you get it?</span>' +
          '<button class="btn fr-good">✓ Got it</button><button class="btn ghost fr-again">↻ Not yet</button></div>' +
        '<div class="next-row lr-reveal"><button class="btn lr-show">Show the answer →</button><button class="btn ghost lr-skip">Skip →</button></div></article>');
      view.querySelector('.flash-term').textContent = c.front;
      view.querySelector('.flash-def').textContent = c.back;
      if (c.formula) view.querySelector('.flash-formula').textContent = c.formula;
      var fc = view.querySelector('.flash-card');
      var rate = view.querySelector('.flash-rate');
      var revealRow = view.querySelector('.lr-reveal');
      var eli = aiExplainConcept(c.front, c.back); eli.hidden = true;
      function reveal() { if (flipped) return; flipped = true; fc.classList.add('flipped'); revealRow.hidden = true; rate.hidden = false; eli.hidden = false; }
      fc.onclick = reveal;
      view.querySelector('.lr-show').onclick = reveal;
      view.querySelector('.lr-skip').onclick = function () { seen++; recordConcept(c.record || c.front, 'seen'); advance(); };
      view.querySelector('.fr-good').onclick = function () { seen++; known++; recordConcept(c.record || c.front, 'right'); advance(); };
      view.querySelector('.fr-again').onclick = function () { seen++; recordConcept(c.record || c.front, 'wrong'); advance(); };
      view.appendChild(eli);
      app.appendChild(view);
    }
    function finish() {
      app.innerHTML = '';
      var card = h('<div class="result-card"><div class="r-eyebrow">Read + recall · complete</div>' +
        '<div class="score-big">' + known + ' <small>/ ' + seen + ' recalled</small></div>' +
        '<p class="r-msg">You read the notes and tested yourself on each — the strongest way to make it stick. It all fed your learning map.</p>' +
        '<div class="next-row" style="justify-content:center"><button class="btn">Go again</button><button class="btn ghost">Contents</button></div></div>');
      card.querySelector('.btn').onclick = function () { startLearn(topicKey); };
      card.querySelector('.btn.ghost').onclick = home;
      app.appendChild(card);
      window.scrollTo(0, 0);
    }
    draw();
  }

  /* ---------------- unified study picker: one control, pick the mode ---------------- */
  function getStudyMode() { var m = localStorage.getItem('ds_study_mode'); return (m === 'written' || m === 'defs' || m === 'type' || m === 'match' || m === 'learn') ? m : 'mc'; }
  function setStudyMode(m) { try { localStorage.setItem('ds_study_mode', m); } catch (e) {} }
  function getStudyTopic() { return localStorage.getItem('ds_study_topic') || ''; }
  function setStudyTopic(k) { try { localStorage.setItem('ds_study_topic', k || ''); } catch (e) {} }
  // Multiple-choice study: N questions from the chosen topic scope (or all), fresh each time.
  function startQuiz(topicKey, n) {
    var pool = newFilterQ(buildIndex().filter(function (e) { return (!topicKey || e.key === topicKey) && diffOk(e.level); }));
    if (!pool.length) return noContent('Questions');
    pool = shuffle(pool).slice(0, Math.min(n, pool.length));
    begin({ name: 'Study', no: '✎', key: '__study__' },
      { qk: '__study__', part: 'Study', name: todayLabel() },
      { qs: pool.map(function (e) { return e.q; }), origins: pool.map(function (e) { return e.topic; }), mixed: true, modeLabel: 'Study', more: true });
  }

  /* ---------------- search / lookup ---------------- */
  var SEARCHIDX = null;
  function searchIdx() {
    if (SEARCHIDX) return SEARCHIDX;
    SEARCHIDX = buildIndex().map(function (e) {
      var wf = widgetFor(e.q), rev = wf && wf.reveal;
      var hay = (e.q.q + ' ' + (e.q.choices ? e.q.choices.join(' ') : '') + ' ' + (e.q.explain || '') + ' ' +
        (e.q.simple || '') + ' ' + ((rev && rev.name) || '') + ' ' + ((rev && rev.text) || '')).toLowerCase();
      return { e: e, hay: hay, name: ((rev && rev.name) || '').toLowerCase(), stem: e.q.q.toLowerCase() };
    });
    return SEARCHIDX;
  }
  function searchHits(term) {
    var toks = term.toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return [];
    var out = [];
    searchIdx().forEach(function (r) {
      if (!toks.every(function (t) { return r.hay.indexOf(t) >= 0; })) return;
      var score = 0;
      toks.forEach(function (t) {
        if (r.name.indexOf(t) >= 0) score += 6;
        if (r.stem.indexOf(t) >= 0) score += 3;
      });
      if (window.DEFS && window.DEFS[r.e.q.q]) score += 2;
      out.push({ e: r.e, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.map(function (o) { return o.e; });
  }
  // Reference view for a single concept: the answer, plain English, the lab, and a practice button.
  function showConcept(q, topic, level) {
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Lookup · ' + esc(topic) + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var isDef = !!(window.DEFS && window.DEFS[q.q]);
    var card = h('<article class="qcard concept-card">' +
      '<div class="q-eyebrow">' + (isDef ? 'Definition' : 'Concept') + ' · ' + esc(topic) + (level ? ' ' + diffTag(level) : '') + '</div>' +
      '<h2 class="qtext"></h2>' +
      '<div class="concept-answer"><span class="ca-lab">Answer</span><div class="ca-text"></div>' + (q.simple ? '<p class="ca-simple"></p>' : '') + '</div>' +
      '<div class="explain concept-explain"></div></article>');
    card.querySelector('.qtext').textContent = q.q;
    card.querySelector('.ca-text').textContent = q.choices[0];
    if (q.simple) card.querySelector('.ca-simple').textContent = q.simple;
    card.querySelector('.concept-explain').innerHTML = q.explain || '';
    renderWidget(card, widgetFor(q));
    var row = h('<div class="next-row"><button class="btn cc-practice">Practice this →</button><button class="btn ghost cc-fav"></button></div>');
    row.querySelector('.cc-practice').onclick = function () {
      begin({ name: 'Lookup', no: '🔎', key: '__look__' }, { qk: '__look__', part: 'Practice', name: '' },
        { qs: [q], origins: [topic], mixed: true, modeLabel: 'Practice', more: true });
    };
    var favBtn = row.querySelector('.cc-fav');
    function setFav() { favBtn.textContent = isFav(q) ? '★ Saved' : '☆ Save'; }
    setFav();
    favBtn.onclick = function () { toggleFav(q); setFav(); };
    card.appendChild(row);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- open writing: final test, marked /5 by Claude Haiku ---------------- */
  function apiKey() { try { return localStorage.getItem('ds_api_key') || ''; } catch (e) { return ''; } }
  function setApiKey(v) { try { if (v) localStorage.setItem('ds_api_key', v); else localStorage.removeItem('ds_api_key'); } catch (e) {} }
  function writingDeck() {
    return flashDeck().filter(function (c) { return c.back && c.back.length > 20; });
  }
  // Marks a free-text answer against the reference. Calls Claude Haiku directly from the
  // browser (the user supplies their own key; it never leaves this browser except to Anthropic).
  function gradeWriting(concept, reference, answer, cb) {
    var key = apiKey();
    if (!key) { cb({ error: 'nokey' }); return; }
    var sys = "You are a supportive machine-learning tutor marking a beginner's free-text explanation of a named concept. " +
      "The task is only to explain that CONCEPT — nothing more. Grade 0-5 on whether the learner captured the CORE idea of the concept. " +
      "Give 5 for a correct core explanation, 4 if the core is right with a small gap or looser wording; wording need not match the reference. " +
      "The reference answer is just ONE correct version — treat any explanation that conveys the same core idea as fully correct. " +
      "Do NOT lower the score for omitting extra details, examples, algorithm-specific points, or anything the concept's name did not explicitly ask for. " +
      "Only give 0-2 for answers that are blank, off-topic, or actually wrong. When unsure between two scores, give the higher one. " +
      "Keep feedback warm, specific and short: what they got right, and at most one thing to add.";
    var user = "CONCEPT TO EXPLAIN (this is the whole question):\n" + concept +
      "\n\nONE CORRECT REFERENCE (not the only right answer):\n" + reference +
      "\n\nLEARNER'S ANSWER:\n" + (answer && answer.trim() ? answer.trim() : '(blank)') +
      "\n\nMark the learner's answer on whether it explains the concept's core idea. Do not require anything the concept name didn't ask for.";
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        system: sys,
        messages: [{ role: 'user', content: user }],
        output_config: { format: { type: 'json_schema', schema: {
          type: 'object',
          properties: { score: { type: 'integer' }, feedback: { type: 'string' } },
          required: ['score', 'feedback'],
          additionalProperties: false
        } } }
      })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); })
      .then(function (res) {
        var j = res.j || {};
        if (!res.ok) { cb({ error: (j.error && j.error.message) || ('Request failed (HTTP ' + res.status + ')') }); return; }
        if (j.stop_reason === 'refusal') { cb({ error: 'The marker declined to answer that one.' }); return; }
        var txt = '';
        (j.content || []).forEach(function (b) { if (b.type === 'text') txt += b.text; });
        try {
          var out = JSON.parse(txt);
          cb({ score: Math.max(0, Math.min(5, Math.round(+out.score))), feedback: String(out.feedback || '') });
        } catch (e) { cb({ error: 'Could not read the marker response.' }); }
      })
      .catch(function () { cb({ error: 'offline' }); });
  }
  function showKeyPanel(container, note) {
    container.hidden = false;
    container.className = 'write-result';
    container.innerHTML =
      '<div class="wr-key">' +
        '<b>Connect Claude to mark your writing</b>' +
        '<p class="wr-keynote">' + (note ? esc(note) + ' ' : '') +
          'The open-writing test sends your answer to Anthropic’s Claude API to be marked. Paste your own API key (from console.anthropic.com) — it is stored only in this browser and used only for marking.</p>' +
        '<input class="wr-keyin" type="password" placeholder="sk-ant-…" autocomplete="off">' +
        '<div class="wr-keyrow"><button class="btn wr-keysave">Save key</button>' +
          (apiKey() ? '<button class="btn ghost wr-keyclear">Remove key</button>' : '') + '</div>' +
      '</div>';
    var input = container.querySelector('.wr-keyin');
    input.value = apiKey();
    container.querySelector('.wr-keysave').onclick = function () {
      setApiKey(input.value.trim());
      container.innerHTML = '<div class="wr-ok">Key saved. Write your answer, then press “Mark it”.</div>';
    };
    var clr = container.querySelector('.wr-keyclear');
    if (clr) clr.onclick = function () { setApiKey(''); container.innerHTML = '<div class="wr-ok">Key removed.</div>'; };
  }
  function startWriting(topicKey) {
    var deck = shuffle(newFilterC(writingDeck().filter(function (c) { return (!topicKey || c.key === topicKey) && diffOk(c.level); })));
    if (!deck.length) return noContent('Writing prompts');
    var i = 0;
    function draw() {
      app.innerHTML = '';
      var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
        '<div class="ruler"><div style="width:' + (100 * i / deck.length) + '%"></div></div>' +
        '<span class="exmeta">Prompt <b>' + (i + 1) + '</b> of ' + deck.length + '</span></div>');
      bar.querySelector('.back').onclick = home;
      app.appendChild(bar);
      var c = deck[i];
      var reference = (c.formula ? c.formula + ' — ' : '') + c.back;
      var prompt = 'What is ' + c.front + '?';
      var opts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === topicKey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var view = h('<div class="write-view">' +
        '<select class="write-topic">' + opts + '</select>' +
        '<div class="write-card">' +
          '<span class="write-eyebrow">Final test · explain it in your own words · ' + esc(c.topic) + '</span>' +
          '<h2 class="write-prompt"></h2>' +
          '<textarea class="write-ta" rows="6" placeholder="Write your explanation here… then press Mark it."></textarea>' +
          '<div class="write-actions"><button class="btn write-mark">Mark it →</button><button class="btn ghost write-skip">Skip →</button><button class="write-key-link" type="button">API key</button></div>' +
          '<div class="write-result" hidden></div>' +
        '</div>' +
        '<button class="flash-shuffle write-newset">↻ New set</button>' +
      '</div>');
      view.querySelector('.write-prompt').textContent = prompt;
      var ta = view.querySelector('.write-ta');
      var result = view.querySelector('.write-result');
      var mark = view.querySelector('.write-mark');
      function nextPrompt() { i = (i + 1) % deck.length; draw(); }
      view.querySelector('.write-skip').onclick = nextPrompt;
      view.querySelector('.write-newset').onclick = function () { deck = shuffle(deck); i = 0; draw(); };
      view.querySelector('.write-topic').onchange = function () { startWriting(this.value); };
      view.querySelector('.write-key-link').onclick = function () { showKeyPanel(result); };
      function runMark() {
        if (!apiKey()) { showKeyPanel(result, 'You need a Claude API key to mark writing.'); return; }
        mark.disabled = true; ta.disabled = true;
        result.hidden = false; result.className = 'write-result';
        result.innerHTML = '<div class="wr-load">Marking your answer with Claude Haiku…</div>';
        gradeWriting(prompt, reference, ta.value, function (res) {
          if (res.error) {
            mark.disabled = false; ta.disabled = false;
            if (res.error === 'nokey') { showKeyPanel(result); return; }
            if (res.error === 'offline') { result.innerHTML = '<div class="wr-err">No connection — marking needs the internet. The rest of DataSense works fully offline.</div>'; return; }
            result.innerHTML = '<div class="wr-err"><span>' + esc(res.error) + '</span> <button class="btn ghost wr-retry">Try again</button></div>';
            result.querySelector('.wr-retry').onclick = runMark;
            return;
          }
          result.innerHTML = '';
          var el = markResultEl(c.front, reference, res,
            nextPrompt,
            function () { mark.disabled = false; ta.disabled = false; result.hidden = true; ta.focus(); });
          el.querySelector('.wr-next').textContent = 'Next prompt →';
          result.appendChild(el);
        });
      }
      mark.onclick = runMark;
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
  // SM-2-style scheduling: each box has a target review interval; a card's priority grows with
  // how OVERDUE it is relative to that interval, its lifetime lapse rate, and — most urgently —
  // whether it failed in the last few days. Weak recent failures surface first, solid old cards last.
  var BOX_INTERVAL = [0.5, 1, 3, 7, 14, 30]; // days per box 0..5
  function getPracticeTopic() { return localStorage.getItem('ds_practice_topic') || ''; }
  function setPracticeTopic(k) { try { localStorage.setItem('ds_practice_topic', k || ''); } catch (e) {} }
  function practiceSelect(mix) {
    var c = loadCards(), day = dayNum(), tk = getPracticeTopic();
    var known = [], neu = [];
    buildIndex().forEach(function (e) { if (tk ? e.key !== tk : !keyInMode(e.key)) return; var r = c[cardId(e.q)]; if (r && r.seen) known.push({ e: e, r: r }); else neu.push(e); });
    known.forEach(function (k) {
      var r = k.r;
      var overdue = (day - r.last) / BOX_INTERVAL[Math.max(0, Math.min(5, r.box))];  // 1 = exactly due
      var lapse = r.seen ? (r.wrong / r.seen) : 0;                                    // lifetime failure rate
      var sinceFail = (r.lastWrong != null) ? (day - r.lastWrong) : 999;
      var recentFail = sinceFail <= 1 ? 14 : sinceFail <= 3 ? 9 : sinceFail <= 7 ? 4 : 0;
      k.p = Math.min(30, overdue * 10) + lapse * 15 + recentFail + (5 - r.box) * 2 + Math.random() * 2;
    });
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

  /* ---------------- why the wrong answers are wrong (data_why_*.js, keyed by stem) ---------------- */
  function whyFor(q) {
    var w = window.WHYNOT && window.WHYNOT[q.q];
    return (w && w.length === q.choices.length - 1) ? w : null;
  }
  // Collapsible list: every distractor with its one-line flaw. chosenOrig highlights the learner's pick.
  function whyOthersEl(q, chosenOrig, open) {
    var w = whyFor(q); if (!w) return null;
    var wrap = h('<div class="whywrap"><button class="why-toggle" type="button">Why the other options are wrong <span class="wt-arrow">▸</span></button><div class="why-list" hidden></div></div>');
    var list = wrap.querySelector('.why-list');
    q.choices.slice(1).forEach(function (c, i) {
      var mine = chosenOrig === i + 1;
      var row = h('<div class="why-row' + (mine ? ' why-mine' : '') + '">' +
        (mine ? '<span class="why-yours">your pick</span>' : '') +
        '<div class="why-opt"></div><div class="why-reason"></div></div>');
      row.querySelector('.why-opt').textContent = c;
      row.querySelector('.why-reason').textContent = w[i];
      list.appendChild(row);
    });
    var btn = wrap.querySelector('.why-toggle');
    btn.onclick = function () {
      list.hidden = !list.hidden;
      btn.querySelector('.wt-arrow').textContent = list.hidden ? '▸' : '▾';
    };
    if (open) btn.onclick();
    return wrap;
  }
  // Inline flaw for the specific option the learner just picked (first miss, before the retry).
  function whyPickEl(q, chosenOrig) {
    var w = whyFor(q); if (!w || chosenOrig < 1) return null;
    var el = h('<div class="why-pick"><span class="p-label">Why your pick misses</span><div class="wp-opt"></div><p class="wp-why"></p></div>');
    el.querySelector('.wp-opt').textContent = q.choices[chosenOrig];
    el.querySelector('.wp-why').textContent = w[chosenOrig - 1];
    return el;
  }

  /* ---------------- AI tutor: re-explain any answer simpler or deeper (user's own key) ---------------- */
  function rewriteExplain(q, mode, cb) {
    var key = apiKey();
    if (!key) { cb({ error: 'nokey' }); return; }
    var sys = mode === 'simpler'
      ? "You are a warm machine-learning tutor. Re-explain the idea for a complete beginner: everyday words, one concrete everyday analogy, no jargon unless you define it in-line. 120 words maximum. Output plain text only."
      : "You are a rigorous machine-learning tutor. Go one level deeper on the idea for a curious beginner: add the key nuance, edge case or formula intuition the short explanation leaves out. Stay concrete. 160 words maximum. Output plain text only.";
    var user = "QUESTION:\n" + q.q + "\n\nCORRECT ANSWER:\n" + q.choices[0] + "\n\nCURRENT EXPLANATION:\n" + (q.explain || '').replace(/<[^>]+>/g, '') +
      "\n\n" + (mode === 'simpler' ? "Re-explain this even more simply." : "Explain this more deeply.");
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5', max_tokens: 500, system: sys, messages: [{ role: 'user', content: user }] })
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, j: j }; }); })
      .then(function (res) {
        if (!res.ok) { cb({ error: (res.j && res.j.error && res.j.error.message) || ('Request failed (HTTP ' + res.status + ')') }); return; }
        var txt = '';
        (res.j.content || []).forEach(function (b) { if (b.type === 'text') txt += b.text; });
        if (!txt.trim()) { cb({ error: 'Empty response.' }); return; }
        cb({ text: txt.trim() });
      })
      .catch(function () { cb({ error: 'You appear to be offline.' }); });
  }
  // ELI5 for a bare concept (flashcards, notes): reuse the same API-backed re-explainer.
  function aiExplainConcept(name, text) { return aiExplainEl({ q: name, choices: [text || name], explain: text || name }); }
  function aiExplainEl(q) {
    var el = h('<div class="eli5"><div class="eli5-btns"><span class="eli5-lab">AI tutor</span>' +
      '<button class="eli5-btn" type="button" data-m="simpler">🧸 Explain like I\'m 5</button>' +
      '<button class="eli5-btn" type="button" data-m="deeper">Go deeper</button></div>' +
      '<div class="eli5-out" hidden></div></div>');
    var out = el.querySelector('.eli5-out');
    el.querySelectorAll('.eli5-btn').forEach(function (b) {
      b.onclick = function () {
        var mode = b.getAttribute('data-m');
        if (!apiKey()) {
          out.hidden = false;
          out.innerHTML = '<span class="eli5-note">Add your Claude API key (Study → Written mode) to unlock the AI tutor.</span>';
          return;
        }
        out.hidden = false;
        out.innerHTML = '<span class="eli5-note">Thinking…</span>';
        el.querySelectorAll('.eli5-btn').forEach(function (x) { x.disabled = true; });
        rewriteExplain(q, mode, function (res) {
          el.querySelectorAll('.eli5-btn').forEach(function (x) { x.disabled = false; });
          if (res.error) { out.innerHTML = '<span class="eli5-note">' + esc(res.error === 'nokey' ? 'No API key saved.' : res.error) + '</span>'; return; }
          out.innerHTML = '<div class="eli5-tag">' + (mode === 'simpler' ? 'Simpler take' : 'Deeper dive') + '</div><p class="eli5-text"></p>';
          out.querySelector('.eli5-text').textContent = res.text;
        });
      };
    });
    return el;
  }

  /* ---------------- theme & text size (accessibility) ---------------- */
  function getTheme() { var t = localStorage.getItem('ds_theme'); return (t === 'light' || t === 'dark') ? t : 'auto'; }
  function setTheme(t) { try { localStorage.setItem('ds_theme', t); } catch (e) {} applyTheme(); }
  function applyTheme() {
    var pref = getTheme();
    var dark = pref === 'dark' || (pref === 'auto' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  function getFont() { var v = +(localStorage.getItem('ds_font')); return (v === 1 || v === 2) ? v : 0; }
  function setFont(v) { try { localStorage.setItem('ds_font', v); } catch (e) {} applyFont(); }
  function applyFont() { document.documentElement.style.fontSize = [100, 110, 122][getFont()] + '%'; }

  /* ---------------- flags (one-off achievements) ---------------- */
  function loadFlags() { try { return JSON.parse(localStorage.getItem('ds_flags') || '{}') || {}; } catch (e) { return {}; } }
  function setFlag(k) { try { var f = loadFlags(); if (!f[k]) { f[k] = 1; localStorage.setItem('ds_flags', JSON.stringify(f)); } } catch (e) {} }
  function checkSessionFlags() {
    if (S.results && S.results.length >= 10 && S.results.every(function (r) { return r === true; })) setFlag('perfect10');
  }

  /* ---------------- badges & milestones ---------------- */
  function computeBadges() {
    var cards = loadCards(), ids = Object.keys(cards);
    var total = getTotal();
    var written = 0, anyReady = 0, mastered = 0;
    ids.forEach(function (id) { var r = cards[id]; if (r.wrote) written++; var w = (r.wstreak != null) ? r.wstreak : (r.wrote ? 1 : 0); if (w >= 1) anyReady++; if (w >= 2) mastered++; });
    var act = loadActivity();
    var d = new Date(); d.setHours(0, 0, 0, 0);
    var cur = 0; if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1);
    while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
    var byTopic = masteryByTopic();
    var topicsDone = byTopic.filter(function (r) { return r.total > 0 && r.learnt === r.total; }).length;
    var topicsTouched = byTopic.filter(function (r) { return r.total > 0 && (r.total - r.new) > 0; }).length;
    var topicsWithQs = byTopic.filter(function (r) { return r.total > 0; }).length;
    var groupDone = GROUPS.some(function (g) {
      var rs = byTopic.filter(function (r) { return g.keys.indexOf(r.key) >= 0 && r.total > 0; });
      return rs.length && rs.every(function (r) { return r.learnt === r.total; });
    });
    var flags = loadFlags();
    function b(id, icon, name, desc, earned, prog) { return { id: id, icon: icon, name: name, desc: desc, earned: !!earned, prog: prog || '' }; }
    function p(nowV, target) { return Math.min(nowV, target) + '/' + target; }
    return [
      b('first', '✏️', 'First marks', 'Answer your first question correctly', total >= 1, p(total, 1)),
      b('c50', '📈', 'Half century', '50 lifetime correct answers', total >= 50, p(total, 50)),
      b('c250', '🎯', 'Sharpshooter', '250 lifetime correct answers', total >= 250, p(total, 250)),
      b('c1000', '🏆', 'The thousand', '1,000 lifetime correct answers', total >= 1000, p(total, 1000)),
      b('s3', '🔥', 'Warming up', 'Study 3 days in a row', cur >= 3, p(cur, 3)),
      b('s7', '⚡', 'One full week', 'Study 7 days in a row', cur >= 7, p(cur, 7)),
      b('s30', '🌟', 'The habit', 'Study 30 days in a row', cur >= 30, p(cur, 30)),
      b('ready10', '🧠', 'Solid ground', 'Get 10 concepts to "know it" or better', anyReady >= 10, p(anyReady, 10)),
      b('m1', '🎓', 'First mastery', 'Master a concept (answer it correctly twice)', mastered >= 1, p(mastered, 1)),
      b('m25', '📚', 'Scholar', 'Master 25 concepts', mastered >= 25, p(mastered, 25)),
      b('m100', '🧙', 'The professor', 'Master 100 concepts', mastered >= 100, p(mastered, 100)),
      b('w1', '🖋️', 'In your own words', 'Pass your first written test', written >= 1, p(written, 1)),
      b('w25', '📝', 'Essayist', 'Pass 25 written tests', written >= 25, p(written, 25)),
      b('topic1', '🗺️', 'Territory claimed', 'Master every concept in one topic', topicsDone >= 1, p(topicsDone, 1)),
      b('group1', '👑', 'Section complete', 'Master an entire section of the manual', groupDone, groupDone ? '1/1' : '0/1'),
      b('explorer', '🧭', 'Explorer', 'Try every topic at least once', topicsTouched >= topicsWithQs && topicsWithQs > 0, p(topicsTouched, topicsWithQs)),
      b('perfect', '💯', 'Perfect paper', 'Score 100% on a session of 10+ questions', flags.perfect10, flags.perfect10 ? '1/1' : '0/1'),
      b('fav5', '⭐', 'Curator', 'Save 5 favourite questions', favCount() >= 5, p(favCount(), 5))
    ];
  }

  /* ---------------- CSV export (per-question progress, human-readable) ---------------- */
  function exportStatsCSV() {
    var cards = loadCards();
    function cell(s) { s = String(s == null ? '' : s); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
    var rows = [['topic', 'level', 'question', 'status', 'box', 'times_seen', 'times_wrong', 'written', 'is_definition'].join(',')];
    buildIndex().forEach(function (e) {
      var r = cards[cardId(e.q)] || {};
      rows.push([cell(e.topic), e.level, cell(e.q.q), cardStatus(e.q), r.box || 0, r.seen || 0, r.wrong || 0, r.wrote ? 'yes' : 'no', e.def ? 'yes' : 'no'].join(','));
    });
    var blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = 'datasense-stats-' + today() + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  /* ---------------- compare pages: side-by-side for commonly confused pairs ---------------- */
  function showCompare(idx) {
    var all = window.COMPARES || [];
    var c = all[idx]; if (!c) return;
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Don’t confuse these · ' + (idx + 1) + ' of ' + all.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var card = h('<article class="qcard compare-card">' +
      '<div class="q-eyebrow">Side by side</div>' +
      '<h2 class="cmp-title"></h2><p class="cmp-tagline"></p>' +
      '<div class="cmp-heads"><div class="cmp-head cmp-a"><b></b><p></p></div><div class="cmp-head cmp-b"><b></b><p></p></div></div>' +
      '<div class="cmp-rows"></div>' +
      '<div class="cmp-callout cmp-confusion"><span class="p-label">The mix-up</span><p></p></div>' +
      '<div class="cmp-callout cmp-rule"><span class="p-label">Rule of thumb</span><p></p></div></article>');
    card.querySelector('.cmp-title').textContent = c.title;
    card.querySelector('.cmp-tagline').textContent = c.tagline;
    card.querySelector('.cmp-a b').textContent = c.a.name;
    card.querySelector('.cmp-a p').textContent = c.a.oneLiner;
    card.querySelector('.cmp-b b').textContent = c.b.name;
    card.querySelector('.cmp-b p').textContent = c.b.oneLiner;
    var rowsEl = card.querySelector('.cmp-rows');
    (c.rows || []).forEach(function (r) {
      var row = h('<div class="cmp-row"><div class="cmp-dim"></div><div class="cmp-cells"><div class="cmp-cell cmp-ca"></div><div class="cmp-cell cmp-cb"></div></div></div>');
      row.querySelector('.cmp-dim').textContent = r.dim;
      row.querySelector('.cmp-ca').textContent = r.a;
      row.querySelector('.cmp-cb').textContent = r.b;
      rowsEl.appendChild(row);
    });
    card.querySelector('.cmp-confusion p').textContent = c.confusion;
    card.querySelector('.cmp-rule p').textContent = c.rule;
    var nav = h('<div class="next-row"><button class="btn ghost cmp-prev">← Previous pair</button><button class="btn cmp-next">Next pair →</button></div>');
    nav.querySelector('.cmp-prev').onclick = function () { showCompare((idx - 1 + all.length) % all.length); };
    nav.querySelector('.cmp-next').onclick = function () { showCompare((idx + 1) % all.length); };
    card.appendChild(nav);
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- study notes: bite-sized revision, read in order ---------------- */
  function notesTopics() { return TOPICS.filter(function (t) { return window.NOTES && window.NOTES[t.key]; }); }
  function showNotes(topicKey) {
    var list = notesTopics();
    if (!list.length) return;
    var idx = 0; list.forEach(function (t, i) { if (t.key === topicKey) idx = i; });
    var t = list[idx], n = window.NOTES[t.key];
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button><span class="exmeta">Study notes · ' + (idx + 1) + ' of ' + list.length + '</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);
    var jump = '<select class="notes-jump">' + list.map(function (x, i) {
      return '<option value="' + x.key + '"' + (i === idx ? ' selected' : '') + '>' + esc((x.no ? x.no + ' · ' : '') + x.name) + '</option>';
    }).join('') + '</select>';
    var card = h('<article class="qcard notes-card-read">' +
      '<div class="q-eyebrow">Revision notes · ' + esc(t.no || '') + '</div>' +
      '<h2 class="notes-h"></h2>' +
      (n.intro ? '<p class="notes-intro"></p>' : '') +
      '<div class="notes-jumprow"><span class="filt-lab">Jump to</span>' + jump + '</div>' +
      '<div class="notes-body"></div></article>');
    card.querySelector('.notes-h').textContent = n.name;
    if (n.intro) card.querySelector('.notes-intro').textContent = n.intro;
    var body = card.querySelector('.notes-body');
    (n.groups || []).forEach(function (g) {
      var gEl = h('<section class="note-group"><h3 class="note-group-h"></h3><div class="note-items"></div></section>');
      gEl.querySelector('.note-group-h').textContent = g.h;
      var itemsEl = gEl.querySelector('.note-items');
      (g.items || []).forEach(function (it) {
        var iEl = h('<div class="note-item"><div class="ni-t"></div><div class="ni-d"></div>' + (it.f ? '<div class="ni-f"></div>' : '') + '</div>');
        iEl.querySelector('.ni-t').textContent = it.t;
        iEl.querySelector('.ni-d').textContent = it.d;
        if (it.f) iEl.querySelector('.ni-f').textContent = it.f;
        itemsEl.appendChild(iEl);
      });
      body.appendChild(gEl);
    });
    var nav = h('<div class="next-row"><button class="btn ghost notes-prev">← ' + esc(list[(idx - 1 + list.length) % list.length].name) + '</button>' +
      '<button class="btn notes-next">' + esc(list[(idx + 1) % list.length].name) + ' →</button></div>');
    nav.querySelector('.notes-prev').onclick = function () { showNotes(list[(idx - 1 + list.length) % list.length].key); };
    nav.querySelector('.notes-next').onclick = function () { showNotes(list[(idx + 1) % list.length].key); };
    card.appendChild(nav);
    card.querySelector('.notes-jump').onchange = function () { showNotes(this.value); };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  /* ---------------- contents page ---------------- */
  function totalExercises() {
    var n = 0;
    TOPICS.forEach(function (t) { t.levels.forEach(function (L) { n += (QUESTIONS[L.qk] || []).length; }); });
    return n;
  }
  /* ---------------- Coding mode: three levels per task — spot it, build it, write it ---------------- */
  function codeProg() { try { return JSON.parse(localStorage.getItem('ds_code_prog') || '{}'); } catch (e) { return {}; } }
  function setCodeDone(taskKey, level) {
    var p = codeProg(); p[taskKey] = p[taskKey] || {}; p[taskKey][level] = 1;
    try { localStorage.setItem('ds_code_prog', JSON.stringify(p)); } catch (e) {}
  }
  function codeTask(key) { var t = null; (window.CODETASKS || []).forEach(function (x) { if (x.key === key) t = x; }); return t; }
  function codeBar(task, levelLabel) {
    var bar = h('<div class="exbar"><button class="back">← Coding</button><span class="exmeta">' + esc(task.title) + ' ' + diffTag(task.lvl || 2) + ' · <b>' + levelLabel + '</b></span></div>');
    bar.querySelector('.back').onclick = home;
    return bar;
  }
  // Level 0 — See it: the worked example, line by line in plain English.
  function startCodeExample(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'See it · worked example'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Worked example</div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p><div class="code-walk"></div>' +
      '<div class="next-row"><button class="btn code-next">Level 1: spot it →</button><button class="btn ghost code-home">Coding home</button></div></article>');
    card.querySelector('.code-ask').textContent = t.ask;
    card.querySelector('.code-why').textContent = t.why;
    var walkEl = card.querySelector('.code-walk');
    if (t.walk && t.walk.length) {
      t.walk.forEach(function (pair) {
        var row = h('<div class="cw-row"><pre class="cw-line"></pre><p class="cw-note"></p></div>');
        row.querySelector('.cw-line').textContent = pair[0];
        row.querySelector('.cw-note').textContent = pair[1];
        walkEl.appendChild(row);
      });
    } else {
      var sol = h('<div><div class="code-sol"><span class="p-label">The code</span><pre></pre></div><p class="cw-note cw-note-solo"></p></div>');
      sol.querySelector('pre').textContent = t.written.solution;
      sol.querySelector('.cw-note-solo').textContent = t.mcq.explain;
      walkEl.appendChild(sol);
    }
    card.querySelector('.code-next').onclick = function () { startCodeMCQ(t.key); };
    card.querySelector('.code-home').onclick = home;
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 1 — Spot it: which code is right?
  function startCodeMCQ(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 1 · Spot it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Spot the right code</div>' +
      '<h2 class="code-ask"></h2><p class="code-why"></p><p class="code-q"></p>' +
      '<div class="code-opts"></div><div class="code-after" hidden></div></article>');
    card.querySelector('.code-ask').textContent = t.title;
    card.querySelector('.code-why').textContent = t.why;
    card.querySelector('.code-q').textContent = t.mcq.q;
    var opts = card.querySelector('.code-opts'), after = card.querySelector('.code-after');
    var choices = shuffle([{ c: t.mcq.correct, ok: true }].concat(t.mcq.wrong.map(function (w) { return { c: w, ok: false }; })));
    var answered = false;
    choices.forEach(function (ch, ci) {
      var b = h('<button class="code-opt" type="button"><span class="co-key"></span><pre></pre></button>');
      b.querySelector('.co-key').textContent = LETTERS[ci] || '·';
      b.querySelector('pre').textContent = ch.c;
      b.onclick = function () {
        if (answered) return;
        answered = true;
        logActivity();
        opts.querySelectorAll('.code-opt').forEach(function (o) { o.disabled = true; });
        b.classList.add(ch.ok ? 'co-right' : 'co-wrong');
        if (!ch.ok) opts.querySelectorAll('.code-opt').forEach(function (o, i) { if (choices[i].ok) o.classList.add('co-right'); });
        if (ch.ok) setCodeDone(t.key, 1);
        after.hidden = false;
        after.innerHTML = '<div class="banner ' + (ch.ok ? 'good' : 'bad') + '"><span class="b-label">' + (ch.ok ? 'Right ✓' : 'Not this one') + '</span>' + esc(t.mcq.explain) + '</div>' +
          '<div class="next-row"><button class="btn code-next">' + (ch.ok ? 'Level 2: build it →' : 'Try again') + '</button><button class="btn ghost code-home">Coding home</button></div>';
        after.querySelector('.code-next').onclick = function () { ch.ok ? startCodeOrder(t.key) : startCodeMCQ(t.key); };
        after.querySelector('.code-home').onclick = home;
        after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      opts.appendChild(b);
    });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 2 — Build it: tap the code lines into order; decoy lines must be avoided.
  function startCodeOrder(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 2 · Build it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Build the code</div>' +
      '<h2 class="code-ask"></h2><p class="match-note">Tap the lines in the order they should run — top line first. ' +
      (t.decoys && t.decoys.length ? 'Careful: <b>' + t.decoys.length + ' broken line' + (t.decoys.length === 1 ? '' : 's') + '</b> don\'t belong at all.' : '') + '</p>' +
      '<div class="code-built-wrap"><span class="cb-label">Your program · <b class="cb-count">0</b> of ' + t.lines.length + ' lines</span>' +
      '<pre class="code-built"></pre></div><div class="code-pool"></div><div class="code-after" hidden></div></article>');
    card.querySelector('.code-ask').textContent = t.ask;
    var built = card.querySelector('.code-built'), pool = card.querySelector('.code-pool'), after = card.querySelector('.code-after');
    var cbCount = card.querySelector('.cb-count');
    var expected = 0, wrongTaps = 0, total = t.lines.length;
    var items = t.lines.map(function (s, i) { return { s: s, i: i, decoy: false }; })
      .concat((t.decoys || []).map(function (s) { return { s: s, i: -1, decoy: true }; }));
    shuffle(items).forEach(function (it) {
      var b = h('<button class="code-line" type="button"><span class="cl-no"></span><pre></pre></button>');
      b.querySelector('pre').textContent = it.s;
      b.onclick = function () {
        if (b.classList.contains('cl-done')) return;
        if (!it.decoy && it.i === expected) {
          b.classList.add('cl-done');
          b.querySelector('.cl-no').textContent = expected + 1;
          built.textContent += (built.textContent ? '\n' : '') + it.s;
          expected++;
          cbCount.textContent = expected;
          if (expected === total) {
            logActivity(); setCodeDone(t.key, 2);
            after.hidden = false;
            after.innerHTML = '<div class="banner good"><span class="b-label">' + (wrongTaps ? 'Built ✓ (' + wrongTaps + ' wrong tap' + (wrongTaps === 1 ? '' : 's') + ')' : 'Built perfectly ✓') + '</span>That\'s working code, in the right order.</div>' +
              '<div class="next-row"><button class="btn code-next">Level 3: write it →</button><button class="btn ghost code-home">Coding home</button></div>';
            after.querySelector('.code-next').onclick = function () { startCodeWrite(t.key); };
            after.querySelector('.code-home').onclick = home;
            after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          wrongTaps++;
          b.classList.add('mi-shake');
          if (it.decoy) { b.classList.add('cl-decoy'); setTimeout(function () { b.classList.remove('cl-decoy'); }, 900); }
          setTimeout(function () { b.classList.remove('mi-shake'); }, 350);
        }
      };
      pool.appendChild(b);
    });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Level 3 — Write it: type the code; graded kindly on the essential pieces, solution always shown.
  function startCodeWrite(key) {
    var t = codeTask(key); if (!t) return;
    app.innerHTML = '';
    app.appendChild(codeBar(t, 'Level 3 · Write it'));
    var card = h('<article class="qcard code-card"><div class="q-eyebrow">Write the code</div>' +
      '<h2 class="code-ask"></h2>' +
      '<textarea class="code-write" rows="8" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="Type the code here…"></textarea>' +
      '<div class="next-row"><button class="btn code-check">Check my code</button><button class="btn ghost code-peek">Show solution</button></div>' +
      '<div class="code-after" hidden></div></article>');
    card.querySelector('.code-ask').textContent = t.written.prompt;
    var ta = card.querySelector('.code-write'), after = card.querySelector('.code-after');
    var peeked = false;
    function norm(s) { return s.toLowerCase().replace(/["']/g, "'").replace(/\s+/g, ''); }
    function showSolution(html) {
      after.hidden = false;
      after.innerHTML = html + '<div class="code-sol"><span class="p-label">Model solution</span><pre></pre></div>' +
        '<div class="next-row"><button class="btn ghost code-home">Coding home</button></div>';
      after.querySelector('.code-sol pre').textContent = t.written.solution;
      after.querySelector('.code-home').onclick = home;
      after.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    card.querySelector('.code-peek').onclick = function () {
      peeked = true;
      showSolution('<div class="banner"><span class="b-label">Solution</span>Read it, then try writing it from memory.</div>');
    };
    card.querySelector('.code-check').onclick = function () {
      var got = norm(ta.value);
      if (!got) { ta.focus(); return; }
      logActivity();
      var missing = t.written.must.filter(function (m) { return got.indexOf(norm(m)) < 0; });
      if (!missing.length) {
        if (!peeked) setCodeDone(t.key, 3);
        showSolution('<div class="banner good"><span class="b-label">All the pieces are there ✓</span>' +
          (peeked ? 'Nice — now try it again cold next time.' : 'Every essential part present and correct — compare against the model below.') + '</div>');
      } else {
        showSolution('<div class="banner bad"><span class="b-label">Nearly — ' + missing.length + ' piece' + (missing.length === 1 ? '' : 's') + ' missing</span>' +
          'Still needed: ' + missing.map(function (m) { return '<code>' + esc(m) + '</code>'; }).join(' · ') + '</div>');
      }
    };
    app.appendChild(card);
    window.scrollTo(0, 0);
  }
  // Coding mode has its own three doors: Practice (the tasks), Reference (solutions,
  // searchable), Dashboard (progress). Mirrors the main home's structure.
  function getCodeDoor() { var v = localStorage.getItem('ds_code_door'); return (v === 'reference' || v === 'dashboard') ? v : 'practice'; }
  function setCodeDoor(v) { try { localStorage.setItem('ds_code_door', v); } catch (e) {} }
  function codeGroups(list) {
    var tasks = list || window.CODETASKS || [], order = [], by = {};
    tasks.forEach(function (t) { if (!by[t.group]) { by[t.group] = []; order.push(t.group); } by[t.group].push(t); });
    return { order: order, by: by };
  }
  function codeLevelsDone(p) { return (p[1] ? 1 : 0) + (p[2] ? 1 : 0) + (p[3] ? 1 : 0); }
  // Difficulty filter for coding mode (task.lvl 1/2/3), shared by Practice and Reference.
  function getCodeDiff() { var d = +(localStorage.getItem('ds_code_diff')); return (d === 1 || d === 2 || d === 3) ? d : 0; }
  function setCodeDiff(d) { try { localStorage.setItem('ds_code_diff', d || 0); } catch (e) {} }
  function codeDiffChips() {
    var row = h('<div class="code-diff-row"><span class="filt-lab">Difficulty</span></div>');
    [{ v: 0, t: 'All' }, { v: 1, t: 'L1 · foundations' }, { v: 2, t: 'L2 · practice' }, { v: 3, t: 'L3 · advanced' }].forEach(function (c) {
      var b = h('<button class="cdf-chip' + (getCodeDiff() === c.v ? ' cdf-on' : '') + '" type="button"></button>');
      b.textContent = c.t;
      b.onclick = function () { setCodeDiff(c.v); home(); };
      row.appendChild(b);
    });
    return row;
  }
  function codeTasksFiltered() {
    var d = getCodeDiff();
    return (window.CODETASKS || []).filter(function (t) { return !d || (t.lvl || 2) === d; });
  }
  function startCodeLevel(key, L) { if (L === 0) startCodeExample(key); else if (L === 1) startCodeMCQ(key); else if (L === 2) startCodeOrder(key); else startCodeWrite(key); }
  function renderCodeHome() {
    var door = getCodeDoor();
    var nav = h('<nav class="home-doors" role="tablist"></nav>');
    [{ v: 'practice', t: 'Practice', s: 'The tasks, four levels each' },
     { v: 'reference', t: 'Reference', s: 'Every solution, searchable' },
     { v: 'dashboard', t: 'Dashboard', s: 'Progress & next up' }].forEach(function (d) {
      var b = h('<button class="door' + (d.v === door ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
      b.querySelector('.door-t').textContent = d.t;
      b.querySelector('.door-s').textContent = d.s;
      b.onclick = function () { setCodeDoor(d.v); home(); };
      nav.appendChild(b);
    });
    app.appendChild(nav);
    if (door === 'reference') return renderCodeReference();
    if (door === 'dashboard') return renderCodeDashboard();
    renderCodeTasks();
  }
  // Reference: the crib sheet — an import map plus every task's solution, collapsible and searchable.
  function renderCodeReference() {
    var tasks = codeTasksFiltered(), g = codeGroups(tasks);
    // Search box, filtering tasks by title / ask / code; difficulty chips share the Practice filter.
    var searchCard = h('<section class="code-intro"><div class="review-eyebrow">Code reference</div>' +
      '<p class="code-intro-p">Every task\'s model solution in one place. Search it, or open a task to read the code — then jump to its worked example.</p>' +
      '<input class="cref-search" type="search" placeholder="Search the code… e.g. stratify, predict_proba, KFold" autocomplete="off"></section>');
    searchCard.appendChild(codeDiffChips());
    var searchIn = searchCard.querySelector('.cref-search');
    app.appendChild(searchCard);
    // Import map: every import line used anywhere, deduplicated — "where everything lives".
    var imports = {};
    tasks.forEach(function (t) {
      (t.written.solution + '\n' + t.lines.join('\n')).split('\n').forEach(function (ln) {
        var s = ln.trim();
        if (/^(from|import)\s/.test(s) && s.indexOf('#') < 0) imports[s] = 1;
      });
    });
    var impCard = h('<section class="cref-item cref-imports"><details><summary><span class="cref-title">The import map — where everything lives</span><span class="cref-group">' + Object.keys(imports).length + ' imports</span></summary><pre class="cref-code"></pre></details></section>');
    impCard.querySelector('pre').textContent = Object.keys(imports).sort().join('\n');
    impCard._hay = ('import map where everything lives ' + Object.keys(imports).join(' ')).toLowerCase();
    app.appendChild(impCard);
    // One collapsible entry per task, grouped.
    var entries = [impCard];
    g.order.forEach(function (grp) {
      var head = h('<div class="sec-label sec-sub">' + esc(grp) + '</div>');
      app.appendChild(head);
      var groupEntries = [];
      g.by[grp].forEach(function (t) {
        var item = h('<section class="cref-item"><details><summary><span class="cref-title"></span><span class="cref-group">' + diffTag(t.lvl || 2) + '</span></summary>' +
          '<p class="cref-why"></p><pre class="cref-code"></pre>' +
          '<div class="next-row"><button class="btn ghost cref-see">Worked example →</button></div></details></section>');
        item.querySelector('.cref-title').textContent = t.title;
        item.querySelector('.cref-why').textContent = t.why;
        item.querySelector('.cref-code').textContent = t.written.solution;
        item.querySelector('.cref-see').onclick = function () { startCodeExample(t.key); };
        item._hay = (t.title + ' ' + t.ask + ' ' + t.why + ' ' + t.written.solution + ' ' + t.lines.join(' ')).toLowerCase();
        app.appendChild(item);
        entries.push(item); groupEntries.push(item);
      });
      head._entries = groupEntries;
      entries.push(head);
    });
    searchIn.oninput = function () {
      var q = searchIn.value.trim().toLowerCase();
      entries.forEach(function (el) {
        if (el._entries) {   // group heading: show if any of its tasks match
          el.style.display = (q && !el._entries.some(function (it) { return it._hay.indexOf(q) >= 0; })) ? 'none' : '';
        } else if (el._hay) {
          var hit = !q || el._hay.indexOf(q) >= 0;
          el.style.display = hit ? '' : 'none';
          el.querySelector('details').open = !!q && hit;   // auto-open matches, collapse on clear
        }
      });
    };
  }
  // Dashboard: level-by-level progress, per-group bars, and the next thing to do.
  function renderCodeDashboard() {
    var tasks = window.CODETASKS || [], prog = codeProg(), g = codeGroups();
    var totLevels = tasks.length * 3, doneLevels = 0, full = 0, started = 0;
    var byLevel = { 1: 0, 2: 0, 3: 0 };
    tasks.forEach(function (t) {
      var p = prog[t.key] || {}, d = codeLevelsDone(p);
      doneLevels += d; if (d === 3) full++; else if (d > 0) started++;
      for (var L = 1; L <= 3; L++) if (p[L]) byLevel[L]++;
    });
    var pct = totLevels ? Math.round(100 * doneLevels / totLevels) : 0;
    // Headline: overall bar + the three key counts.
    app.appendChild(h('<section class="code-intro"><div class="review-eyebrow">Coding progress</div>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + pct + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + pct + '%</b> of all levels</span></div>' +
      '<div class="mast-badges cdash-badges">' +
        '<span class="mb mb-learnt"><b>' + full + '</b> complete</span>' +
        '<span class="mb mb-learning"><b>' + started + '</b> in progress</span>' +
        '<span class="mb mb-new"><b>' + (tasks.length - full - started) + '</b> not started</span>' +
      '</div></section>'));
    // Per-level bars: how far through Spot / Build / Write across all tasks.
    var lv = h('<section class="mastery-card"><div class="review-eyebrow">By level</div><div class="cdash-levels"></div></section>');
    var lvHost = lv.querySelector('.cdash-levels');
    [{ L: 1, name: '1 · Spot it' }, { L: 2, name: '2 · Build it' }, { L: 3, name: '3 · Write it' }].forEach(function (x) {
      var n = byLevel[x.L], p = tasks.length ? Math.round(100 * n / tasks.length) : 0;
      lvHost.appendChild(h('<div class="cdash-lrow"><span class="cdash-lname">' + x.name + '</span>' +
        '<div class="code-progbar"><span style="width:' + p + '%"></span></div>' +
        '<span class="cdash-lcount">' + n + '/' + tasks.length + '</span></div>'));
    });
    app.appendChild(lv);
    // By difficulty: how far through L1/L2/L3 tasks (fully completed).
    var dv = h('<section class="mastery-card"><div class="review-eyebrow">By difficulty</div><div class="cdash-levels"></div></section>');
    var dvHost = dv.querySelector('.cdash-levels');
    [{ d: 1, name: 'L1 · foundations' }, { d: 2, name: 'L2 · practice' }, { d: 3, name: 'L3 · advanced' }].forEach(function (x) {
      var ts = tasks.filter(function (t) { return (t.lvl || 2) === x.d; });
      var f = ts.reduce(function (n, t) { return n + (codeLevelsDone(prog[t.key] || {}) === 3 ? 1 : 0); }, 0);
      var p = ts.length ? Math.round(100 * f / ts.length) : 0;
      dvHost.appendChild(h('<div class="cdash-lrow"><span class="cdash-lname cdash-wide">' + x.name + '</span>' +
        '<div class="code-progbar"><span style="width:' + p + '%"></span></div>' +
        '<span class="cdash-lcount">' + f + '/' + ts.length + '</span></div>'));
    });
    app.appendChild(dv);
    // Per-group mastery bars, clickable through to practice.
    var gc = h('<section class="mastery-card"><div class="review-eyebrow">By group</div><div class="mm-list"></div></section>');
    var list = gc.querySelector('.mm-list');
    g.order.forEach(function (grp) {
      var ts = g.by[grp], f = 0, s = 0;
      ts.forEach(function (t) { var d = codeLevelsDone(prog[t.key] || {}); if (d === 3) f++; else if (d > 0) s++; });
      var n = ts.length, u = n - f - s;
      function seg(cls, v) { return v ? '<span class="mm-seg ' + cls + '" style="flex:' + v + '"></span>' : ''; }
      var row = h('<button class="mm-row"><div class="mm-rowhead"><span class="mm-name">' + esc(grp) + '</span>' +
        '<span class="mm-pct">' + f + '/' + n + '</span></div>' +
        '<span class="mm-bar">' + seg('mm-learnt', f) + seg('mm-learning', s) + seg('mm-new', u) + '</span></button>');
      row.onclick = function () { setCodeDoor('practice'); home(); };
      list.appendChild(row);
    });
    app.appendChild(gc);
    // Next up: the first unfinished level, one tap away.
    var next = null;
    g.order.forEach(function (grp) {
      if (next) return;
      g.by[grp].forEach(function (t) {
        if (next) return;
        var p = prog[t.key] || {};
        for (var L = 1; L <= 3; L++) if (!p[L]) { next = { t: t, L: L }; return; }
      });
    });
    if (next) {
      var names = { 1: 'Spot it', 2: 'Build it', 3: 'Write it' };
      var nu = h('<section class="fav-card"><div class="fav-info"><span class="fav-star">→</span>' +
        '<div><div class="fav-title">Next up</div><div class="fav-sub"></div></div></div>' +
        '<button class="btn nu-go">Start →</button></section>');
      nu.querySelector('.fav-sub').textContent = next.t.title + ' · Level ' + next.L + ' (' + names[next.L] + ')';
      nu.querySelector('.nu-go').onclick = function () { startCodeLevel(next.t.key, next.L); };
      app.appendChild(nu);
    } else {
      app.appendChild(h('<section class="fav-card"><div class="fav-info"><span class="fav-star">★</span>' +
        '<div><div class="fav-title">All 3 levels done on every task</div><div class="fav-sub">Random drill keeps them fresh — or come back after new tasks land.</div></div></div></section>'));
    }
  }
  // The practice door: every task with its four levels and their done-states.
  function renderCodeTasks() {
    var prog = codeProg();
    var tasks = codeTasksFiltered();
    var diffLabel = getCodeDiff() ? ' at this difficulty' : '';
    var doneCount = tasks.reduce(function (n, t) { var p = prog[t.key] || {}; return n + (p[1] && p[2] && p[3] ? 1 : 0); }, 0);
    var intro = h('<section class="code-intro"><div class="review-eyebrow">How this works</div>' +
      '<p class="code-intro-p">Each task is one small piece of real code. Learn it in four short steps, easiest first:</p>' +
      '<ol class="hiw-steps">' +
        '<li class="hiw-step"><span class="hiw-badge">👀</span><div class="hiw-text"><b>See it</b>' +
          '<span class="hiw-sub">Just read. The finished code, with every line explained in plain English.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">1</span><div class="hiw-text"><b>Spot it</b>' +
          '<span class="hiw-sub">Pick the correct code out of a few lookalikes.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">2</span><div class="hiw-text"><b>Build it</b>' +
          '<span class="hiw-sub">Tap the lines into the order they should run.</span></div></li>' +
        '<li class="hiw-step"><span class="hiw-badge">3</span><div class="hiw-text"><b>Write it</b>' +
          '<span class="hiw-sub">Type it yourself — marked kindly, only on the parts that matter.</span></div></li>' +
      '</ol>' +
      '<p class="hiw-tip">New here? Open any task below and start with <b>See it</b>. A green ✓ means a level is done; finish levels 1–3 to complete the task.</p>' +
      '<div class="code-progwrap"><div class="code-progbar"><span style="width:' + (tasks.length ? Math.round(100 * doneCount / tasks.length) : 0) + '%"></span></div>' +
      '<span class="code-intro-count"><b>' + doneCount + '</b> of ' + tasks.length + ' tasks' + diffLabel + '</span></div>' +
      '<div class="next-row"><button class="btn code-drill">Random drill →</button></div></section>');
    intro.appendChild(codeDiffChips());
    // Random drill: jump straight into a level you haven't completed yet (least-done tasks first).
    intro.querySelector('.code-drill').onclick = function () {
      var todo = [];
      tasks.forEach(function (t) {
        var p = prog[t.key] || {};
        for (var L = 1; L <= 3; L++) if (!p[L]) todo.push({ key: t.key, l: L });
      });
      if (!todo.length) tasks.forEach(function (t) { todo.push({ key: t.key, l: 1 + Math.floor(Math.random() * 3) }); });
      var pick = todo[Math.floor(Math.random() * todo.length)];
      if (pick.l === 1) startCodeMCQ(pick.key); else if (pick.l === 2) startCodeOrder(pick.key); else startCodeWrite(pick.key);
    };
    app.appendChild(intro);
    // Bucket by group (first-seen order), so tasks added later still file under the right heading.
    var groupOrder = [], byGroup = {};
    tasks.forEach(function (t) { if (!byGroup[t.group]) { byGroup[t.group] = []; groupOrder.push(t.group); } byGroup[t.group].push(t); });
    var ordered = [];
    groupOrder.forEach(function (g) { byGroup[g].forEach(function (t) { ordered.push(t); }); });
    function groupDoneCount(g) {
      return byGroup[g].reduce(function (n, t) { var p = prog[t.key] || {}; return n + (p[1] && p[2] && p[3] ? 1 : 0); }, 0);
    }
    var lastGroup = null;
    ordered.forEach(function (t) {
      if (t.group !== lastGroup) {
        var gd = groupDoneCount(t.group), gn = byGroup[t.group].length;
        app.appendChild(h('<div class="sec-label sec-sub code-group-head">' + esc(t.group) +
          '<span class="cg-count' + (gd === gn ? ' cg-full' : '') + '">' + gd + '/' + gn + (gd === gn ? ' ✓' : '') + '</span></div>'));
        lastGroup = t.group;
      }
      var p = prog[t.key] || {};
      var row = h('<section class="code-task">' +
        '<div class="ct-head"><h3></h3><span class="ct-meta">' + diffTag(t.lvl || 2) + '<span class="ct-done">' + (p[1] && p[2] && p[3] ? ' ✓ complete' : '') + '</span></span></div>' +
        '<p class="ct-ask"></p>' +
        '<div class="ct-levels">' +
          '<button class="btn ghost ct-l ct-see" data-l="0">See it</button>' +
          '<button class="btn ghost ct-l' + (p[1] ? ' ct-ok' : '') + '" data-l="1">' + (p[1] ? '✓ ' : '') + '1 · Spot it</button>' +
          '<button class="btn ghost ct-l' + (p[2] ? ' ct-ok' : '') + '" data-l="2">' + (p[2] ? '✓ ' : '') + '2 · Build it</button>' +
          '<button class="btn ghost ct-l' + (p[3] ? ' ct-ok' : '') + '" data-l="3">' + (p[3] ? '✓ ' : '') + '3 · Write it</button>' +
        '</div></section>');
      row.querySelector('h3').textContent = t.title;
      row.querySelector('.ct-ask').textContent = t.ask;
      row.querySelectorAll('.ct-l').forEach(function (b) {
        b.onclick = function () {
          var L = +b.getAttribute('data-l');
          if (L === 0) startCodeExample(t.key); else if (L === 1) startCodeMCQ(t.key); else if (L === 2) startCodeOrder(t.key); else startCodeWrite(t.key);
        };
      });
      app.appendChild(row);
    });
  }

  function home() {
    app.innerHTML = '';
    var mast = h(
      '<header class="masthead">' +
        '<div class="mast-rules"></div>' +
        '<div class="mast-eyebrow"><span>A field manual for practical machine learning</span><span class="mast-tools">' +
          '<button class="mt-btn mt-fav" type="button" title="Your saved favourites"></button>' +
          '<button class="mt-btn mt-key" type="button" title="Connect Claude"></button>' +
          '<button class="mt-btn mt-theme" type="button" title="Theme"></button>' +
          '<button class="mt-btn mt-font" type="button" title="Text size"></button></span></div>' +
        '<h1>DataSense</h1>' +
        '<p class="mast-sub"><b>Machine learning</b>, learned by doing: ' + totalExercises() + ' exercises across supervised classification, clustering and dimensionality reduction. Miss one and you get the answer in plain English, a lab bench, a quick check, and a second attempt.</p>' +
        '<div class="mast-foot">Multiple choice · questions & answers shuffle on every sitting · progress kept in this browser</div>' +
      '</header>');
    var themeBtn = mast.querySelector('.mt-theme'), fontBtn = mast.querySelector('.mt-font'), keyBtn = mast.querySelector('.mt-key'), favBtnM = mast.querySelector('.mt-fav');
    function themeLabel() { var t = getTheme(); themeBtn.textContent = t === 'auto' ? '◐ auto' : (t === 'light' ? '☀ light' : '☾ dark'); }
    function fontLabel() { fontBtn.textContent = ['A', 'A+', 'A++'][getFont()]; }
    function keyLabel() { keyBtn.textContent = '⚙ Settings'; keyBtn.classList.toggle('mt-on', !!apiKey()); }
    function favLabelM() { var n = favCount(); favBtnM.textContent = n ? '★ Favourites · ' + n : '☆ Favourites'; favBtnM.classList.toggle('mt-on', n > 0); }
    themeLabel(); fontLabel(); keyLabel(); favLabelM();
    themeBtn.onclick = function () { setTheme(getTheme() === 'auto' ? 'light' : getTheme() === 'light' ? 'dark' : 'auto'); themeLabel(); };
    fontBtn.onclick = function () { setFont((getFont() + 1) % 3); fontLabel(); };
    keyBtn.onclick = openSettings;
    favBtnM.onclick = function () {
      if (favCount()) { startFavourites(); return; }
      favBtnM.textContent = 'Tap ☆ on any question first';
      setTimeout(favLabelM, 1700);
    };
    var MODE = getMode();
    if (MODE === 'code') {
      mast.querySelector('.mast-sub').innerHTML = '<b>Coding, unscrambled</b>: every task in three steps — spot the right code, build it from blocks, then write it yourself. No wall of syntax, one idea at a time.';
      mast.querySelector('.mast-foot').textContent = 'Data-science code only · progress kept in this browser';
    } else if (MODE === 'work') {
      mast.querySelector('.mast-sub').innerHTML = '<b>Innovation vocabulary</b> for the day job: digital assets, payments & fintech, and the AWS words everyone assumes you know. Same drills — quiz, flashcards, read + recall.';
      mast.querySelector('.mast-foot').textContent = 'FCA & innovation topics · progress kept in this browser';
    }
    app.appendChild(mast);

    // Mode switch: Data Science revision · Coding drills · FCA & Innovation vocabulary.
    var tabs = h('<nav class="mode-tabs" aria-label="App mode"></nav>');
    [{ v: 'ds', t: 'Data Science' }, { v: 'code', t: 'Coding' }, { v: 'work', t: 'FCA & Innovation' }].forEach(function (m) {
      var b = h('<button class="mode-tab' + (m.v === MODE ? ' mode-on' : '') + '" type="button"></button>');
      b.textContent = m.t;
      b.onclick = function () { if (m.v !== getMode()) { setMode(m.v); home(); } };
      tabs.appendChild(b);
    });
    app.appendChild(tabs);

    if (MODE === 'code') { renderCodeHome(); return; }

    // Three tabs: Study (learn + practice, one picker), Reference (look things up), Dashboard (all metrics).
    var door = getHomeDoor();
    renderDoors(door);
    if (door === 'reference') {
      renderSearch();
      renderNotes();
      renderCompares();
    } else if (door === 'dashboard') {
      renderDashboard();
    } else {
      renderStudy();
      renderPractice();
      renderFavourites();
      renderContents();
    }

    function renderDoors(active) {
      var defs = [
        { v: 'study', t: 'Study', s: 'Learn & practice, every mode' },
        { v: 'reference', t: 'Reference', s: 'Notes · compare · search' },
        { v: 'dashboard', t: 'Dashboard', s: 'Progress & metrics' }
      ];
      var nav = h('<nav class="home-doors" role="tablist"></nav>');
      defs.forEach(function (d) {
        var b = h('<button class="door' + (d.v === active ? ' door-on' : '') + '" type="button" role="tab"><span class="door-t"></span><span class="door-s"></span></button>');
        b.querySelector('.door-t').textContent = d.t;
        b.querySelector('.door-s').textContent = d.s;
        b.onclick = function () { setHomeDoor(d.v); home(); };
        nav.appendChild(b);
      });
      app.appendChild(nav);
    }

    // Dashboard tab: a compact strip of headline numbers up top (small space, lots of metrics),
    // then the bigger visuals — mastery map, consistency heatmap, and badges.
    function renderDashboard() {
      var cards = loadCards(), ids = Object.keys(cards), sum = masterySummary();
      var total = sum.learnt + sum.ready + sum.learning + sum.struggling + sum.new;
      var attempts = 0, wrong = 0, written = 0;
      ids.forEach(function (id) { var r = cards[id]; attempts += (r.seen || 0); wrong += (r.wrong || 0); if (r.wrote) written++; });
      var acc = attempts ? Math.round(100 * (attempts - wrong) / attempts) : 0;
      var pct = total ? Math.round(100 * (sum.learnt + sum.ready * 0.7 + sum.learning * 0.35 + sum.struggling * 0.15) / total) : 0;
      var act = loadActivity(), end = new Date(); end.setHours(0, 0, 0, 0);
      var d = new Date(end); if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1);
      var cur = 0; while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
      var days = Object.keys(act).sort(), best = 0, run = 0, prev = null;
      days.forEach(function (ds) { if (prev && (Date.parse(ds) - Date.parse(prev)) === 86400000) run++; else run = 1; if (run > best) best = run; prev = ds; });
      // Progress ring: a donut of the mastery composition with overall progress % in the centre.
      var R = 56, CIRC = 2 * Math.PI * R, arcAcc = 0, arcs = '';
      [{ c: sum.learnt, k: 'a-learnt' }, { c: sum.ready, k: 'a-ready' }, { c: sum.learning, k: 'a-learning' }, { c: sum.strug || sum.struggling, k: 'a-strug' }, { c: sum.new, k: 'a-new' }].forEach(function (s) {
        if (!s.c) return;
        var frac = s.c / (total || 1), len = frac * CIRC, gap = len > 8 ? 2.5 : 0, shown = Math.max(0.4, len - gap);
        arcs += '<circle class="ring-arc ' + s.k + '" r="' + R + '" cx="75" cy="75" fill="none" stroke-width="15" transform="rotate(-90 75 75)" ' +
          'stroke-dasharray="' + shown + ' ' + (CIRC - shown) + '" stroke-dashoffset="' + (-arcAcc * CIRC) + '"></circle>';
        arcAcc += frac;
      });
      var ring = '<svg class="ring-svg" viewBox="0 0 150 150" aria-hidden="true">' +
        '<circle class="ring-track" r="' + R + '" cx="75" cy="75" fill="none" stroke-width="15"></circle>' + arcs + '</svg>';
      function stat(num, lab, cls) { return '<div class="dh-stat ' + (cls || '') + '"><b>' + num + '</b><span>' + lab + '</span></div>'; }
      function leg(k, n, lab) { return '<span class="dh-leg"><i class="mm-dot ' + k + '"></i><b>' + n + '</b> ' + lab + '</span>'; }
      function ks(num, lab) { return '<div class="ks"><span class="ks-n">' + num + '</span><span class="ks-l">' + lab + '</span></div>'; }
      app.appendChild(h('<section class="dash-hero">' +
        '<div class="dh-ringwrap">' + ring + '<div class="dh-center"><span class="dh-pct">' + pct + '%</span><span class="dh-pctl">progress</span></div></div>' +
        '<div class="dh-side">' +
          stat('🔥 ' + cur, cur === 1 ? 'day streak' : 'day streak', 'dh-streak') +
          stat(getTotal(), 'lifetime correct') +
          stat(acc + '%', 'accuracy') +
        '</div>' +
      '</section>'));
      app.appendChild(h('<div class="dh-legend">' +
        leg('mm-learnt', sum.learnt, 'mastered') + leg('mm-ready', sum.ready, 'know it') +
        leg('mm-learning', sum.learning, 'learning') + leg('mm-strug', sum.struggling, 'struggling') +
        leg('mm-new', sum.new, 'not started') +
      '</div>'));
      app.appendChild(h('<div class="dash-sub2">' +
        ks(best, 'best streak') + ks(days.length, 'days studied') + ks(written, 'written /5') + ks(total, 'concepts') +
      '</div>'));
      renderMastery();
      renderStats();
      renderBadges();
    }

    // Settings popup (masthead ⚙): connect Claude + back up / restore your progress.
    function openSettings() {
      var back = h('<div class="modal-back"></div>');
      var modal = h('<div class="modal" role="dialog" aria-modal="true" aria-label="Settings">' +
        '<div class="modal-head"><h2 class="modal-title">Settings</h2><button class="modal-x" type="button" aria-label="Close">✕</button></div>' +
        '<div class="modal-body"></div></div>');
      var body = modal.querySelector('.modal-body');
      renderApiKey(body);
      renderBackup(body);
      function close() { back.remove(); document.removeEventListener('keydown', onKey); }
      function onKey(e) { if (e.key === 'Escape') close(); }
      modal.querySelector('.modal-x').onclick = close;
      back.onclick = function (e) { if (e.target === back) close(); };
      document.addEventListener('keydown', onKey);
      back.appendChild(modal);
      document.body.appendChild(back);
    }

    // Connect Claude once, at the top of the home page. The key is saved in this browser
    // (localStorage ds_api_key) and reused everywhere — writing marks, Explain-like-I'm-5, etc.
    function renderApiKey(host) {
      var sec = h('<section class="apikey-card"></section>');
      function draw() {
        var has = !!apiKey();
        if (has) {
          sec.className = 'apikey-card ak-on';
          sec.innerHTML = '<div class="ak-row"><span class="ak-state">✓ Claude connected</span>' +
            '<span class="ak-note">Your key is saved in this browser and used for AI marking &amp; “Explain like I’m 5”.</span>' +
            '<div class="ak-btns"><button class="btn ghost ak-change">Change</button><button class="btn ghost ak-remove">Remove</button></div></div>';
          sec.querySelector('.ak-change').onclick = function () { setApiKey(''); draw(); };
          sec.querySelector('.ak-remove').onclick = function () { setApiKey(''); draw(); };
        } else {
          sec.className = 'apikey-card';
          sec.innerHTML = '<div class="ak-row"><div class="ak-lead"><b>Connect Claude</b>' +
            '<span class="ak-note">Paste your Anthropic API key to unlock AI marking &amp; “Explain like I’m 5”. It is stored only in this browser and sent only to Anthropic.</span></div>' +
            '<form class="ak-form"><input class="ak-in" type="password" placeholder="sk-ant-…" autocomplete="off" spellcheck="false" aria-label="Anthropic API key">' +
            '<button class="btn ak-save" type="submit">Save key</button></form></div>';
          var form = sec.querySelector('.ak-form'), input = sec.querySelector('.ak-in');
          form.onsubmit = function (ev) { ev.preventDefault(); var v = input.value.trim(); if (!v) return; setApiKey(v); draw(); keyLabel(); };
        }
      }
      draw();
      (host || app).appendChild(sec);
    }


    // Bite-sized revision notes covering every topic, in order (data_notes_*.js).
    function renderNotes() {
      var list = notesTopics();
      if (!list.length) return;
      var sec = h('<section class="notes-card"><div class="review-eyebrow">Quick reference</div>' +
        '<h2 class="review-title">Study notes</h2>' +
        '<p class="mm-sub">Short revision notes covering every topic in order, in tiny chunks. Read straight through or jump to any topic.</p>' +
        '<div class="notes-chips"></div>' +
        '<div class="next-row"><button class="btn notes-read-all">Read from the top →</button></div></section>');
      var chipsEl = sec.querySelector('.notes-chips');
      list.forEach(function (tp) {
        var chip = h('<button class="cmp-chip note-chip" type="button"></button>');
        chip.textContent = (tp.no ? tp.no + ' · ' : '') + tp.name;
        chip.onclick = function () { showNotes(tp.key); };
        chipsEl.appendChild(chip);
      });
      sec.querySelector('.notes-read-all').onclick = function () { showNotes(list[0].key); };
      app.appendChild(sec);
    }

    // Side-by-side pages for the pairs beginners mix up (data_compare.js).
    function renderCompares() {
      var all = window.COMPARES || [];
      if (!all.length) return;
      var sec = h('<section class="cmp-index"><div class="review-eyebrow">Quick reference</div>' +
        '<h2 class="review-title">Don’t confuse these</h2>' +
        '<p class="mm-sub">Side-by-side pages for the pairs everyone mixes up at first.</p>' +
        '<div class="cmp-chips"></div></section>');
      var chipsEl = sec.querySelector('.cmp-chips');
      all.forEach(function (c, i) {
        var chip = h('<button class="cmp-chip" type="button"></button>');
        chip.textContent = c.title;
        chip.onclick = function () { showCompare(i); };
        chipsEl.appendChild(chip);
      });
      app.appendChild(sec);
    }

    // Search everything: type a term, jump straight to any concept, definition or lab.
    // Results group by topic; ↑/↓ move the highlight, Enter opens, Esc clears, '/' focuses.
    function renderSearch() {
      var sec = h('<section class="search-card">' +
        '<input class="search-in" type="search" placeholder="Search topics, definitions, answers…  (press /)" autocomplete="off" spellcheck="false" aria-label="Search everything">' +
        '<div class="search-results" hidden></div></section>');
      var input = sec.querySelector('.search-in');
      var box = sec.querySelector('.search-results');
      var active = -1;
      function rows() { return [].slice.call(box.querySelectorAll('.sr-row')); }
      function setActive(n) {
        var rs = rows();
        if (!rs.length) return;
        if (active >= 0 && rs[active]) rs[active].classList.remove('sr-active');
        active = (n + rs.length) % rs.length;
        rs[active].classList.add('sr-active');
        rs[active].scrollIntoView({ block: 'nearest' });
      }
      function run() {
        active = -1;
        var term = input.value.trim();
        if (term.length < 2) { box.hidden = true; box.innerHTML = ''; return; }
        var hits = searchHits(term).slice(0, 30);
        box.hidden = false;
        if (!hits.length) { box.innerHTML = '<div class="sr-empty">No matches for “' + esc(term) + '”.</div>'; return; }
        box.innerHTML = '';
        var lastTopic = null;
        hits.forEach(function (e) {
          if (e.topic !== lastTopic) {
            box.appendChild(h('<div class="sr-group">' + esc(e.topic) + '</div>'));
            lastTopic = e.topic;
          }
          var wf = widgetFor(e.q), rev = wf && wf.reveal;
          var isDef = !!(window.DEFS && window.DEFS[e.q.q]);
          var kind = isDef ? 'Definition' : (rev && rev.name ? rev.name : 'Concept');
          var row = h('<button class="sr-row"><span class="sr-q"></span>' +
            '<span class="sr-meta">' + esc(kind) + ' ' + diffTag(e.level) + '</span></button>');
          row.querySelector('.sr-q').textContent = e.q.q;
          row.onclick = function () { showConcept(e.q, e.topic, e.level); };
          box.appendChild(row);
        });
      }
      input.oninput = run;
      input.onkeydown = function (ev) {
        if (ev.key === 'ArrowDown') { ev.preventDefault(); setActive(active + 1); }
        else if (ev.key === 'ArrowUp') { ev.preventDefault(); setActive(active - 1); }
        else if (ev.key === 'Enter') {
          var rs = rows();
          if (rs.length) { ev.preventDefault(); rs[active >= 0 ? active : 0].click(); }
        } else if (ev.key === 'Escape') { input.value = ''; run(); input.blur(); }
      };
      app.appendChild(sec);
    }

    // One picker: choose the study format (Multiple choice / Written / Definitions),
    // the topic scope, and how many. Smart Review stays a separate card below.
    function renderStudy(allowed) {
      var ALLOWED = allowed || ['learn', 'mc', 'written', 'defs', 'type', 'match'];
      var old = app.querySelector('.study-card');
      var mode = getStudyMode();
      if (ALLOWED.indexOf(mode) < 0) mode = ALLOWED[0];
      var learnOnly = ALLOWED.length === 1 && ALLOWED[0] === 'learn';
      var tkey = getStudyTopic();
      var diff = getStudyDiff();
      var curN = dailyN();
      function chips(kind, current, opts) {
        return opts.map(function (o) {
          return '<button class="filt-chip' + (o.v === current ? ' on' : '') + '" data-' + kind + '="' + o.v + '">' + o.t + '</button>';
        }).join('');
      }
      // How many items the current mode + topic + difficulty actually yields.
      function studyCount() {
        if (mode === 'mc') return newFilterQ(buildIndex().filter(function (e) { return (!tkey || e.key === tkey) && diffOk(e.level); })).length;
        if (mode === 'written') return newFilterC(writingDeck().filter(function (c) { return (!tkey || c.key === tkey) && diffOk(c.level); })).length;
        if (mode === 'defs') return newFilterC(flashDeck().filter(function (c) { return (!tkey || c.key === tkey) && c.def && diffOk(c.level); })).length;
        if (mode === 'learn') { var seenC = {}, n = 0, nc = loadCards(), ci = conceptIndex(), only = getStudyNew() === 'new'; learnConcepts(tkey, getLearnScope()).forEach(function (x) { if (x.concept) { var k = normkey(x.concept.front); if (!seenC[k]) { seenC[k] = 1; if (!only || !conceptSeen(x.concept.front, nc, ci)) n++; } } }); return n; }
        return newFilterC(flashDeck().filter(function (c) { return (!tkey || c.key === tkey) && c.back && c.back.length > 15 && diffOk(c.level); })).length;
      }
      var avail = studyCount();
      var topicOpts = '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) {
        return '<option value="' + t.key + '"' + (t.key === tkey ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('');
      var scopeLabel = tkey ? (function () { var nm = tkey; TOPICS.forEach(function (t) { if (t.key === tkey) nm = t.name; }); return nm; })() : 'all topics';
      var diffLabel = (diff ? 'level ' + diff : 'all levels') + (getStudyNew() === 'new' ? ' · unseen only' : '');
      var desc, startLabel;
      if (mode === 'mc') { desc = curN + ' multiple-choice questions · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start ' + curN + ' →'; }
      else if (mode === 'written') { desc = 'Explain concepts in your own words · Claude marks each /5 · ' + esc(scopeLabel) + ' · ' + diffLabel + (apiKey() ? '' : ' · needs your API key'); startLabel = 'Start writing →'; }
      else if (mode === 'type') { desc = 'Read the definition, type the term from memory · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start typing →'; }
      else if (mode === 'match') { desc = 'Pair terms with definitions, then order algorithm steps · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Start matching →'; }
      else if (mode === 'learn') { var lt = getLearnTest(); var ltName = lt === 'mc' ? 'multiple choice' : lt === 'written' ? 'a written answer' : lt === 'card' ? 'a flashcard' : 'mixed tests'; var ln = learnN(); var lnLabel = ln ? ln + ' concepts a session (least-known first)' : 'the whole topic in one go'; var scopeWord = getLearnScope() === 'defs' ? 'definitions only' : 'every concept'; desc = 'Read a note, then test yourself with ' + ltName + ' — ' + lnLabel + ' · ' + scopeWord + ' · ' + esc(scopeLabel) + ' · ' + diffLabel + (lt === 'written' && !apiKey() ? ' · needs your API key' : ''); startLabel = 'Start learning →'; }
      else { desc = 'Flip definition cards & self-rate · ' + esc(scopeLabel) + ' · ' + diffLabel; startLabel = 'Study cards →'; }
      desc += ' <span class="study-avail">' + avail + ' available</span>';
      var MODE_DEFS = [{ v: 'learn', t: 'Read + recall' }, { v: 'mc', t: 'Multiple choice' }, { v: 'written', t: 'Written' }, { v: 'defs', t: 'Definitions' }, { v: 'type', t: 'Type it' }, { v: 'match', t: 'Match & order' }];
      var modeChips = MODE_DEFS.filter(function (m) { return ALLOWED.indexOf(m.v) >= 0; });
      var studyTitle = learnOnly ? 'Read + recall' : 'Study';
      var sec = h('<section class="study-card">' +
        '<div class="daily-main">' +
          '<div class="daily-eyebrow">' + esc(studyTitle) + ' · ' + esc(todayLabel()) + '</div>' +
          '<h2 class="daily-title">' + esc(studyTitle) + '</h2>' +
          '<div class="daily-filters">' +
            (modeChips.length > 1 ?
            '<div class="filt-row"><span class="filt-lab">Mode</span>' +
              chips('mode', mode, modeChips) + '</div>' : '') +
            '<div class="filt-row"><span class="filt-lab">Topic</span><select class="study-topic">' + topicOpts + '</select></div>' +
            '<div class="filt-row"><span class="filt-lab">Difficulty</span>' +
              chips('diff', diff, [{ v: 0, t: 'All levels' }, { v: 1, t: '1' }, { v: 2, t: '2' }, { v: 3, t: '3' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Show</span>' +
              chips('snew', getStudyNew(), [{ v: 'all', t: 'All' }, { v: 'new', t: 'Unseen only' }]) + '</div>' +
            (mode === 'learn' ?
            '<div class="filt-row"><span class="filt-lab">Cover</span>' +
              chips('lscope', getLearnScope(), [{ v: 'all', t: 'Every concept' }, { v: 'defs', t: 'Definitions only' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">Test with</span>' +
              chips('ltest', getLearnTest(), [{ v: 'mix', t: 'Mixed' }, { v: 'mc', t: 'Multiple choice' }, { v: 'written', t: 'Written' }, { v: 'card', t: 'Flashcards' }]) + '</div>' +
            '<div class="filt-row"><span class="filt-lab">How many</span>' +
              chips('lnum', learnN(), LEARN_OPTS.map(function (v) { return { v: v, t: v ? '' + v : 'Whole topic' }; })) + '</div>' : '') +
            (mode !== 'mc' && mode !== 'written' ? '' :
            '<div class="filt-row"><span class="filt-lab">How many</span>' +
              chips('num', curN, DAILY_OPTS.map(function (v) { return { v: v, t: '' + v }; })) + '</div>') +
          '</div>' +
          '<p class="daily-prog">' + desc + '</p>' +
        '</div>' +
        '<div class="daily-side">' +
          '<div class="daily-stat"><span class="ds-num">' + getTotal() + '</span><span class="ds-lab">lifetime<br>correct</span></div>' +
          '<div class="daily-btns"><button class="btn daily-go study-go"' + (avail ? '' : ' disabled') + '>' + startLabel + '</button></div>' +
        '</div></section>');
      sec.querySelectorAll('[data-mode]').forEach(function (b) {
        b.onclick = function () { setStudyMode(b.getAttribute('data-mode')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-num]').forEach(function (b) {
        b.onclick = function () { setDailyN(+b.getAttribute('data-num')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-lnum]').forEach(function (b) {
        b.onclick = function () { setLearnN(+b.getAttribute('data-lnum')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-lscope]').forEach(function (b) {
        b.onclick = function () { setLearnScope(b.getAttribute('data-lscope')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-diff]').forEach(function (b) {
        b.onclick = function () { setStudyDiff(+b.getAttribute('data-diff')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-snew]').forEach(function (b) {
        b.onclick = function () { setStudyNew(b.getAttribute('data-snew')); renderStudy(ALLOWED); };
      });
      sec.querySelectorAll('[data-ltest]').forEach(function (b) {
        b.onclick = function () { setLearnTest(b.getAttribute('data-ltest')); renderStudy(ALLOWED); };
      });
      sec.querySelector('.study-topic').onchange = function () { setStudyTopic(this.value); renderStudy(ALLOWED); };
      sec.querySelector('.study-go').onclick = function () {
        if (mode === 'mc') startQuiz(tkey, curN);
        else if (mode === 'written') startWriting(tkey);
        else if (mode === 'type') startTypeIt(tkey);
        else if (mode === 'match') startMatching(tkey);
        else if (mode === 'learn') startLearn(tkey);
        else startFlashcards(tkey, true);
      };
      if (old) app.replaceChild(sec, old); else app.appendChild(sec);
    }

    function renderPractice() {
      var ptk = getPracticeTopic();
      var sum = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0 };
      buildIndex().forEach(function (e) { if (ptk ? e.key !== ptk : !keyInMode(e.key)) return; sum[cardStatus(e.q)]++; });
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
          '<span class="mb mb-learnt"><b>' + sum.learnt + '</b> mastered</span>' +
          '<span class="mb mb-ready"><b>' + sum.ready + '</b> know it</span>' +
          '<span class="mb mb-learning"><b>' + sum.learning + '</b> learning</span>' +
          '<span class="mb mb-strug"><b>' + sum.struggling + '</b> struggling</span>' +
          '<span class="mb mb-new"><b>' + sum.new + '</b> new</span>' +
        '</div>' +
        '<div class="filt-row rev-topicrow"><span class="filt-lab">Topic</span><select class="rev-topic">' +
          '<option value="">All topics</option>' + TOPICS.filter(topicInMode).map(function (t) { return '<option value="' + t.key + '"' + (t.key === getPracticeTopic() ? ' selected' : '') + '>' + esc(t.name) + '</option>'; }).join('') +
        '</select></div>' +
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
      review.querySelector('.rev-topic').onchange = function () { setPracticeTopic(this.value); home(); };
      review.querySelector('.review-go').onclick = startPractice;
      app.appendChild(review);
    }

    function renderFavourites() {
      var n = favCount();
      var fav = h('<section class="fav-card">' +
        '<div class="fav-info"><span class="fav-star">' + (n ? '★' : '☆') + '</span>' +
        '<div><div class="fav-title">Favourites</div>' +
        '<div class="fav-sub">' + (n ? n + ' saved question' + (n === 1 ? '' : 's') : 'Tap the ☆ on any question to save it here') + '</div></div></div>' +
        '<button class="btn ghost fav-go"' + (n ? '' : ' disabled') + '>Review →</button></section>');
      if (n) fav.querySelector('.fav-go').onclick = startFavourites;
      app.appendChild(fav);
    }

    function renderMastery() {
      var rows = masteryByTopic();
      var tot = { learnt: 0, ready: 0, learning: 0, struggling: 0, new: 0, total: 0 };
      rows.forEach(function (r) { tot.learnt += r.learnt; tot.ready += r.ready; tot.learning += r.learning; tot.struggling += r.struggling; tot.new += r.new; tot.total += r.total; });
      // Progress that credits every stage, so an hour of study never reads 0%.
      function progressPct(r) { return r.total ? Math.round(100 * (r.learnt * 1 + r.ready * 0.7 + r.learning * 0.35 + r.struggling * 0.15) / r.total) : 0; }
      function count(cls, label, n) { return n ? '<span class="mmc ' + cls + '"><i class="mm-dot ' + cls.replace('mmc', 'mm') + '"></i>' + n + ' ' + label + '</span>' : ''; }
      var sec = h('<section class="mastery-card">' +
        '<div class="review-eyebrow">Your progress</div>' +
        '<h2 class="review-title">Mastery map</h2>' +
        '<p class="mm-sub">Written answers advance you: <b>4+/5</b> once = know it, twice = mastered. Everything else counts as <b>learning</b>; a miss is <b>struggling</b>.</p>' +
        '<div class="mm-list"></div></section>');
      var list = sec.querySelector('.mm-list');
      function seg(cls, n) { return n ? '<span class="mm-seg ' + cls + '" style="flex:' + n + '"></span>' : ''; }
      var byKey = {}; TOPICS.forEach(function (t) { byKey[t.key] = t; });
      // Started topics first (highest progress on top); untouched ones sink to a condensed list below.
      rows.forEach(function (r) { r.pct = progressPct(r); r.started = (r.learnt + r.ready + r.learning + r.struggling) > 0; });
      rows.sort(function (a, b) { if (a.started !== b.started) return a.started ? -1 : 1; return b.pct - a.pct; });
      var shownEmptyHeader = false;
      rows.forEach(function (r) {
        var T = byKey[r.key];
        if (!r.started) {
          if (!shownEmptyHeader) { list.appendChild(h('<div class="mm-empty-head">Not started yet</div>')); shownEmptyHeader = true; }
          var er = h('<button class="mm-row mm-row-empty"><span class="mm-name">' + esc(r.topic) + '</span><span class="mm-empty-go">Start →</span></button>');
          er.onclick = function () { start(T, T.levels[0]); };
          list.appendChild(er);
          return;
        }
        var counts = count('mmc-learnt', 'mastered', r.learnt) + count('mmc-ready', 'know it', r.ready) +
          count('mmc-learning', 'learning', r.learning) + count('mmc-strug', 'struggling', r.struggling) + count('mmc-new', 'new', r.new);
        var row = h('<button class="mm-row">' +
          '<div class="mm-rowhead"><span class="mm-name">' + esc(r.topic) + '</span><span class="mm-pct" title="overall progress">' + r.pct + '%</span></div>' +
          '<span class="mm-bar">' + seg('mm-learnt', r.learnt) + seg('mm-ready', r.ready) + seg('mm-learning', r.learning) + seg('mm-strug', r.struggling) + seg('mm-new', r.new) + '</span>' +
          '<div class="mm-counts">' + counts + '</div></button>');
        row.onclick = function () { start(T, T.levels[0]); };
        list.appendChild(row);
      });
      app.appendChild(sec);
    }

    function renderStats() {
      var cards = loadCards();
      var ids = Object.keys(cards);
      var sum = masterySummary();
      var totalConcepts = sum.learnt + sum.ready + sum.learning + sum.struggling + sum.new;
      var attempts = 0, wrong = 0, written = 0;
      ids.forEach(function (id) { var r = cards[id]; attempts += (r.seen || 0); wrong += (r.wrong || 0); if (r.wrote) written++; });
      var acc = attempts ? Math.round(100 * (attempts - wrong) / attempts) : 0;

      // consistency: streaks + heatmap over the last N weeks
      var act = loadActivity();
      var WEEKS = 20;
      var end = new Date(); end.setHours(0, 0, 0, 0);
      var cur = 0; var d = new Date(end);
      if (!act[fmtDay(d)]) d.setDate(d.getDate() - 1); // grace: today not done yet
      while (act[fmtDay(d)]) { cur++; d.setDate(d.getDate() - 1); }
      var sortedDays = Object.keys(act).sort();
      var best = 0, run = 0, prev = null;
      sortedDays.forEach(function (ds) {
        if (prev && (Date.parse(ds) - Date.parse(prev)) === 86400000) run++; else run = 1;
        if (run > best) best = run; prev = ds;
      });
      var activeDays = sortedDays.length;

      function tile(num, lab, cls) {
        return '<div class="stat-tile ' + (cls || '') + '"><span class="st-num">' + num + '</span><span class="st-lab">' + lab + '</span></div>';
      }
      var tiles =
        tile(cur + (cur === 1 ? ' day' : ' days'), 'current streak', 'st-streak') +
        tile(best + (best === 1 ? ' day' : ' days'), 'best streak', '') +
        tile(activeDays, 'days studied', '') +
        tile(getTotal(), 'lifetime correct', '') +
        tile(sum.learnt, 'mastered', 'st-good') +
        tile(written, 'written /5', '') +
        tile(acc + '%', 'accuracy', '');

      // heatmap grid: columns = weeks (Sun→Sat), shaded by activity bucket
      var start = new Date(end); start.setDate(start.getDate() - (WEEKS * 7 - 1)); start.setDate(start.getDate() - start.getDay());
      function bucket(c) { return c <= 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4; }
      var cols = '', cursor = new Date(start);
      var monthRow = '', lastMonth = -1;
      while (cursor <= end) {
        var cells = '';
        var colMonth = cursor.getMonth();
        for (var r = 0; r < 7; r++) {
          var ds = fmtDay(cursor);
          if (cursor > end) { cells += '<i class="hc hc-empty"></i>'; }
          else { var c = act[ds] || 0; cells += '<i class="hc hl' + bucket(c) + '" title="' + ds + ': ' + c + '"></i>'; }
          cursor.setDate(cursor.getDate() + 1);
        }
        var mlab = (colMonth !== lastMonth) ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][colMonth] : '';
        lastMonth = colMonth;
        monthRow += '<span class="hm-lab">' + mlab + '</span>';
        cols += '<div class="hcol">' + cells + '</div>';
      }

      // overall mastery bar
      function seg(cls, n) { return n ? '<span class="mm-seg ' + cls + '" style="flex:' + n + '"></span>' : ''; }
      var barTotal = totalConcepts || 1;
      var bar = seg('mm-learnt', sum.learnt) + seg('mm-ready', sum.ready) + seg('mm-learning', sum.learning) + seg('mm-strug', sum.struggling) + seg('mm-new', sum.new);

      var sec = h('<section class="stats-card">' +
        '<div class="review-eyebrow">Your analytics</div>' +
        '<h2 class="review-title">Consistency</h2>' +
        '<div class="heat-block"><div class="heat-head"><span>Last ' + WEEKS + ' weeks</span>' +
          '<span class="heat-legend">less <i class="hc hl0"></i><i class="hc hl1"></i><i class="hc hl2"></i><i class="hc hl3"></i><i class="hc hl4"></i> more</span></div>' +
          '<div class="heat-scroll"><div class="heat-months">' + monthRow + '</div><div class="heat-grid">' + cols + '</div></div></div>' +
        '<div class="stat-mm"><div class="stat-mm-head"><span>Overall mastery</span><span>' + sum.learnt + ' / ' + barTotal + ' mastered</span></div>' +
          '<div class="mm-bar stat-mm-bar">' + bar + '</div>' +
          '<div class="mm-legend"><span><i class="mm-dot mm-learnt"></i>mastered ' + sum.learnt + '</span><span><i class="mm-dot mm-ready"></i>know it ' + sum.ready + '</span><span><i class="mm-dot mm-learning"></i>learning ' + sum.learning + '</span><span><i class="mm-dot mm-strug"></i>struggling ' + sum.struggling + '</span><span><i class="mm-dot mm-new"></i>new ' + sum.new + '</span></div>' +
        '</div>' +
      '</section>');
      app.appendChild(sec);
    }

    function renderBackup(host) {
      var sec = h('<section class="data-card">' +
        '<div class="dc-text"><b>Back up your progress</b><span>Your streaks, mastery and favourites live only in this browser. Export a file to keep them safe or move to another device.</span></div>' +
        '<div class="dc-btns"><button class="dc-btn dc-export">⬇ Backup (JSON)</button><button class="dc-btn dc-csv">⬇ Stats (CSV)</button><button class="dc-btn dc-import">⬆ Restore</button>' +
        '<input type="file" accept="application/json,.json" class="dc-file" hidden></div></section>');
      sec.querySelector('.dc-export').onclick = exportProgress;
      sec.querySelector('.dc-csv').onclick = exportStatsCSV;
      var file = sec.querySelector('.dc-file');
      sec.querySelector('.dc-import').onclick = function () { file.click(); };
      file.onchange = function () {
        if (!file.files || !file.files[0]) return;
        importProgress(file.files[0], function (n) {
          if (n >= 0) { alert('Progress restored (' + n + ' items). Reloading.'); location.reload(); }
          else alert('Could not read that file — is it a DataSense backup?');
        });
      };
      (host || app).appendChild(sec);
    }

    // Browse every topic and jump straight into a specific level's questions (lives in the Study tab).
    function renderContents() {
      app.appendChild(h('<div class="sec-label">Browse all topics</div>'));
      GROUPS.forEach(function (g) {
        if ((g.mode || 'ds') !== (getMode() === 'work' ? 'work' : 'ds')) return;
        app.appendChild(h('<div class="sec-label sec-sub">' + g.label + '</div>'));
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
    }

    function renderBadges() {
      var badges = computeBadges();
      var earned = badges.filter(function (b) { return b.earned; }).length;
      var sec = h('<section class="badge-card"><div class="review-eyebrow">Milestones</div>' +
        '<h2 class="review-title">Badges</h2>' +
        '<p class="mm-sub"><b>' + earned + '</b> of ' + badges.length + ' earned</p>' +
        '<div class="badge-grid"></div></section>');
      var grid = sec.querySelector('.badge-grid');
      badges.forEach(function (b) {
        var el = h('<div class="badge ' + (b.earned ? 'bd-earned' : 'bd-locked') + '">' +
          '<span class="bd-icon">' + b.icon + '</span><span class="bd-name"></span><span class="bd-desc"></span>' +
          (b.earned ? '' : '<span class="bd-prog"></span>') + '</div>');
        el.querySelector('.bd-name').textContent = b.name;
        el.querySelector('.bd-desc').textContent = b.desc;
        if (!b.earned) el.querySelector('.bd-prog').textContent = b.prog;
        grid.appendChild(el);
      });
      app.appendChild(sec);
    }
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
      modeLabel: opts.modeLabel || '', sig: opts.sig || null, learnNext: opts.learnNext || null, learnNote: opts.learnNote || null, learnConcept: opts.learnConcept || null,
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
    if (S.learnNote) {
      var recall = h('<div class="lr-recall"><span class="lr-recall-tag">You just read</span><span class="lr-recall-t"></span></div>');
      recall.querySelector('.lr-recall-t').textContent = S.learnNote.t;
      card.insertBefore(recall, card.querySelector('.qtext'));
    }
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
    if (S.learnConcept) recordConcept(S.learnConcept, 'seen');   // a skipped read+recall concept still counts as seen
    S.i++;
    if (S.daily) saveDaily(S.i >= S.qs.length);
    if (S.i >= S.qs.length) { if (S.learnNext) return S.learnNext(); return done(); }
    question(false);
  }

  // A question has an interactive lab only if its widget declares a renderable type; definition/contrast
  // cards carry a reveal but no lab, so we must not promise one in the wrong-answer flow.
  function hasLab(q) { var w = widgetFor(q); return !!(w && w.type); }
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
    // In read+recall the MC tests a whole concept, so record every question that teaches it (matching the
    // flashcard/written steps) — otherwise sibling questions stay "new" and the topic reads as half-seen.
    if (!isRetry) { S.results.push(right); if (S.learnConcept) recordConcept(S.learnConcept, right ? 'right' : 'wrong'); else { recordCard(q, right); logActivity(); } }

    if (right) {
      if (!isRetry) { S.correct++; bumpTotal(); }
      card.appendChild(h('<div class="banner good"><span class="b-label">' + (isRetry ? 'Correct on the second attempt ✓' : 'Correct ✓') + '</span>' +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var ww = whyOthersEl(q, null, false); if (ww) card.appendChild(ww);
      card.appendChild(aiExplainEl(q));
      var row = h('<div class="next-row"><button class="btn">Next exercise →</button>' +
        (isRetry || !hasLab(q) ? '' : '<button class="btn ghost">Open the lab anyway</button>') + '</div>');
      row.children[0].onclick = next;
      if (row.children[1]) row.children[1].onclick = function () { row.children[1].remove(); renderWidget(card, widgetFor(q)); };
      card.appendChild(row);
      return;
    }

    if (isRetry) {
      revealCorrect(btns);
      card.appendChild(h('<div class="banner good"><span class="b-label">The answer</span>' + esc(q.choices[0]) +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var ww2 = whyOthersEl(q, chosen, true); if (ww2) card.appendChild(ww2);
      card.appendChild(aiExplainEl(q));
      var row2 = h('<div class="next-row"><button class="btn">Next exercise →</button></div>');
      row2.children[0].onclick = next;
      card.appendChild(row2);
      return;
    }

    // first attempt, wrong → why THEIR pick fails → plain-English answer → (lab) → build-up → retry
    card.appendChild(h('<div class="banner bad"><span class="b-label">Marked ✗</span>' +
      (hasLab(q) ? 'Here\'s the answer in plain English. Then work the lab, build the answer up step by step, and take the question again.'
                 : 'Here\'s the answer in plain English. Read it, build the answer up step by step, and take the question again.') + '</div>'));
    var wp = whyPickEl(q, chosen); if (wp) card.appendChild(wp);
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
    if (S.i >= S.qs.length) { if (S.learnNext) return S.learnNext(S.correct); return done(); }
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
      '<p class="r-msg">History updated. <span class="small">Mastered <b>' + sum.learnt + '</b> · know it <b>' + sum.ready + '</b> · learning <b>' + sum.learning + '</b> · struggling <b>' + sum.struggling + '</b> · new <b>' + sum.new + '</b></span></p>' +
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
    checkSessionFlags();
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

  applyTheme(); applyFont();
  if (window.matchMedia) {
    try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (getTheme() === 'auto') applyTheme(); }); } catch (e) {}
  }
  // '/' focuses the home search from anywhere on the contents page
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== '/' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    var s = document.querySelector('.search-in');
    if (s) { ev.preventDefault(); s.focus(); }
  });
  home();
})();
