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

  /* One concept-mechanics check per widget type; instantiated per question. */
  var TYPE_CHECKS = {
    scatterK: { q: 'In the lab, what happened when you asked (nearly) everyone to vote?', ok: 'Far-away points joined in and the verdict drifted toward the more common class', no: ['The verdict became more local and more precise', 'The distances between the points themselves changed'] },
    boundaryK: { q: 'In the lab, what did a very SMALL k do to the territory map?', ok: 'Made it jagged — single points carved out their own little islands', no: ['Made it one big smooth split with no detail', 'Removed the border entirely'] },
    trainTestK: { q: 'In the lab, which bar was the honest measure of the model?', ok: 'The score on never-seen cases', no: ['The score on already-seen cases', 'Whichever bar was higher at the time'] },
    metricMorph: { q: 'In the lab, the two points never moved — so what made the distance change?', ok: 'The measuring rule itself: distance is a choice, not a fact', no: ['Rounding errors in the calculation', 'The number of points being measured'] },
    scaleFeature: { q: 'In the lab, why did the "nearest" keep changing as you dragged?', ok: 'The feature with the biggest raw units was drowning out the other until rescaled', no: ['The candidates\' actual values were changing', 'The vote switched from majority to average'] },
    dimCurse: { q: 'In the lab, what did adding more and more facts do?', ok: 'Evened out all the distances until "nearest" barely meant anything', no: ['Made the true nearest neighbour stand out more sharply', 'Made the distances more accurate'] },
    speedLazy: { q: 'From the lab: when does KNN pay its computation bill?', ok: 'At answer time — every single query scans the stored examples', no: ['Once, up front, during training', 'Never — lookups are effectively free'] },
    voteWeight: { q: 'In the lab, what did turning up the weighting do?', ok: 'Gave closer neighbours a louder voice and faded out the far ones', no: ['Gave every neighbour a more equal say', 'Dropped the closest neighbour from the vote'] },
    knnRegress: { q: 'From the lab: how does KNN produce a NUMBER?', ok: 'It averages the values of the k nearest examples', no: ['It takes a majority vote among the values', 'It fits a straight line through the neighbours'] },
    kCurve: { q: 'In the lab, which curve should you trust when choosing k?', ok: 'The held-back data curve — it behaves like the future', no: ['The seen-data curve — it uses more information', 'Both equally; average the two curves'] },
    foldPick: { q: 'From the lab: why rotate the held-out slice and average?', ok: 'One single split can be lucky or unlucky; averaging removes the luck', no: ['It lets the model train on the test data safely', 'It makes each fold score higher'] },
    metricSwitch: { q: 'In the lab, nothing moved — so what flipped the nearest neighbour?', ok: 'Changing the distance rule (the metric) alone', no: ['Changing the value of k', 'Relabelling one of the points'] },
    radiusScatter: { q: 'From the lab: what can a fixed radius do that fixed k never does?', ok: 'Come back with ZERO neighbours and no prediction at all', no: ['Include the same point twice', 'Produce negative distances'] },
    threshold: { q: 'In the lab, what happened when you flagged (nearly) everything?', ok: 'Every real positive got caught — but the false alarms exploded', no: ['The false alarms disappeared too', 'The number of caught positives fell'] },
    rocCurve: { q: 'In the lab, what did moving the cutoff do on the ROC plot?', ok: 'Slid the model along its own curve — trading false alarms for catches', no: ['Bent the curve into a new shape', 'Changed the AUC number'] },
    sigmoid: { q: 'In the lab, what did the S-curve output for every input?', ok: 'A probability between 0% and 100%', no: ['A class label directly', 'A distance to the boundary'] },
    bayesOdds: { q: 'In the lab, how did each new piece of evidence act on the verdict?', ok: 'It MULTIPLIED the odds up or down', no: ['It added a fixed amount to a score', 'It replaced all the earlier evidence'] },
    treeSplit: { q: 'In the lab, what made a split position "good"?', ok: 'It left the two sides as pure as possible', no: ['It put equal counts on both sides', 'It sat exactly at the middle of the axis'] },
    treeDepth: { q: 'In the lab, what did growing the tree deeper do?', ok: 'Chased every training point — right up to memorising noise', no: ['Made the map smoother and simpler', 'Lowered the training accuracy'] },
    marginSVM: { q: 'In the lab, which boundary position was best?', ok: 'The one giving the widest street to the nearest points', no: ['The one hugging the bigger class', 'Any position — they all behave the same'] },
    curveStatic: { q: 'In the lab, how do you pick the best setting from curves like these?', ok: 'Take the setting where the held-back/validation curve peaks', no: ['Take the setting where the training curve peaks', 'Always take the largest setting'] },
    boostFit: { q: 'In the lab, what did each new boosting round aim at?', ok: 'The errors the ensemble was still making', no: ['A fresh random sample of the data', 'The points it already predicted well'] },
    forestMap: { q: 'In the lab, what happened to the map as trees joined the committee?', ok: 'It steadied — individual trees\' quirks averaged away', no: ['It got more jagged with every tree', 'It stopped fitting the training points'] },
    kmeansStep: { q: 'In the lab, what did each k-means step consist of?', ok: 'Points join their nearest centre, then each centre moves to its group\'s middle', no: ['Centres move toward the densest single point', 'Points swap colours at random until stable'] },
    dbscanScan: { q: 'In the lab, where did the number of clusters come from?', ok: 'It emerged from the density and the radius — nobody typed a k', no: ['It was fixed at three in advance', 'One cluster per noise point'] },
    pcaSpin: { q: 'In the lab, what made one axis angle better than another?', ok: 'It kept more of the cloud\'s spread when points were flattened onto it', no: ['It passed through more points exactly', 'It was closer to horizontal'] },
    dendro: { q: 'In the lab, what did sliding the cut line up and down change?', ok: 'How many clusters the same tree yields — the tree itself never changed', no: ['The order of the merges', 'The distances between the items'] }
  };

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(qk) { return (qk === 'easy' || qk === 'medium' || qk === 'hard') ? 'ds_best_knn_' + qk : 'ds_best_' + qk; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function rememberHTML(q) {
    var r = q.widget && q.widget.reveal;
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
        '<div class="mast-foot">Multiple choice · answers shuffle on every sitting · progress kept in this browser</div>' +
      '</header>'));

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
  function begin(topic, level) {
    S = { topic: topic, level: level, qs: QUESTIONS[level.qk], i: 0, correct: 0, results: [] };
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

    var card = h('<article class="qcard"><div class="q-eyebrow">§ ' + S.topic.name + ' · ' + L.part + ' — ' + L.name +
      (isRetry ? ' · <span class="retry-note">second attempt</span>' : '') + '</div>' +
      '<h2 class="qtext"></h2><div class="choices"></div></article>');
    card.querySelector('.qtext').textContent = q.q;
    var box = card.querySelector('.choices');
    if (q.fig && window.renderFigure) {
      var figHost = document.createElement('div');
      card.insertBefore(figHost, box);
      renderFigure(figHost, q.widget, q.fig.at, q.fig.cap);
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
    app.appendChild(card);
    window.scrollTo(0, 0);
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

  function answer(q, chosen, btn, btns, card, isRetry) {
    var right = chosen === 0;
    markAll(btns, btn, right);
    if (!isRetry) S.results.push(right);

    if (right) {
      if (!isRetry) S.correct++;
      card.appendChild(h('<div class="banner good"><span class="b-label">' + (isRetry ? 'Correct on the second attempt ✓' : 'Correct ✓') + '</span>' +
        '<div class="explain">' + q.explain + '</div>' + rememberHTML(q) + '</div>'));
      var row = h('<div class="next-row"><button class="btn">Next exercise →</button>' +
        (isRetry ? '' : '<button class="btn ghost">Open the lab anyway</button>') + '</div>');
      row.children[0].onclick = next;
      if (row.children[1]) row.children[1].onclick = function () { row.children[1].remove(); renderWidget(card, q.widget); };
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

    // first attempt, wrong → plain-English answer → lab → quick check → retry
    card.appendChild(h('<div class="banner bad"><span class="b-label">Marked ✗</span>Here\'s the answer in plain English. Then work the lab, pass the quick check, and take the question again.</div>'));
    card.appendChild(h('<div class="plain"><span class="p-label">The answer, in plain English</span>' +
      '<div class="p-answer">' + esc(q.choices[0]) + '</div>' +
      (q.simple ? '<p>' + q.simple + '</p>' : '') + '</div>'));
    renderWidget(card, q.widget);
    var toCheck = h('<div class="next-row"><button class="btn">On to the quick check →</button></div>');
    toCheck.children[0].onclick = function () {
      toCheck.remove();
      quickCheck(q, card);
    };
    card.appendChild(toCheck);
  }

  /* ---------------- quick check ---------------- */
  function buildChecks(q) {
    var checks = [];
    var t = TYPE_CHECKS[q.widget && q.widget.type];
    if (t) checks.push({ q: t.q, options: [t.ok].concat(t.no) });
    var r = q.widget && q.widget.reveal;
    if (r && r.name) {
      var names = S.qs.map(function (x) { return x.widget && x.widget.reveal && x.widget.reveal.name; })
        .filter(function (n) { return n && n !== r.name; });
      names = shuffle(names).slice(0, 2);
      if (names.length === 2) checks.push({ q: 'The idea this lab demonstrated is called…', options: [r.name, names[0], names[1]] });
    }
    return checks;
  }

  function quickCheck(q, card) {
    var checks = buildChecks(q);
    var wrap = h('<div class="checks"></div>');
    var answered = 0;
    checks.forEach(function (c, ci) {
      var cc = h('<div class="check-card"><div class="check-label">Quick check ' + (ci + 1) + ' of ' + checks.length + '</div>' +
        '<div class="check-q"></div><div class="check-opts"></div></div>');
      cc.querySelector('.check-q').textContent = c.q;
      var opts = cc.querySelector('.check-opts');
      var order = shuffle(c.options.map(function (_, i) { return i; }));
      var obtns = [];
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
          answered++;
          if (answered === checks.length) {
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
    });
    if (!checks.length) { question(true); return; }
    card.appendChild(wrap);
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function next() {
    S.i++;
    if (S.i >= S.qs.length) return done();
    question(false);
  }

  /* ---------------- report card ---------------- */
  function done() {
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
      '<div class="dots">' + S.results.map(function (r, i) { return '<span class="dot-q ' + (r ? 'ok' : 'no') + '">' + (i + 1) + '</span>'; }).join('') + '</div>' +
      '<div class="next-row" style="justify-content:center"><button class="btn">Sit it again</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = function () { begin(S.topic, S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  home();
})();
