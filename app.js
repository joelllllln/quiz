/* DataSense quiz shell — wrong answer → lab → quick check → try again */
(function () {
  'use strict';
  var app = document.getElementById('app');
  window.QUESTIONS = window.QUESTIONS || {};
  var LEVELS = [
    { key: 'easy', part: 'Part I', name: 'Foundations', blurb: 'Neighbours, votes and distance — the core moves.' },
    { key: 'medium', part: 'Part II', name: 'Practice', blurb: 'Scaling, boundaries, tuning k, overfitting.' },
    { key: 'hard', part: 'Part III', name: 'Advanced Study', blurb: 'High dimensions, complexity, weighting, edge cases.' }
  ];
  var UPCOMING = [
    { name: 'Linear Regression', desc: 'Fit the best straight line.' },
    { name: 'Decision Trees', desc: 'Split your way to an answer.' },
    { name: 'Model Evaluation', desc: 'Accuracy, precision, recall & friends.' },
    { name: 'Clustering', desc: 'Find groups nobody labelled.' },
    { name: 'Probability & Stats', desc: 'The maths under everything.' }
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
    radiusScatter: { q: 'From the lab: what can a fixed radius do that fixed k never does?', ok: 'Come back with ZERO neighbours and no prediction at all', no: ['Include the same point twice', 'Produce negative distances'] }
  };

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(lv) { return 'ds_best_knn_' + lv; }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  function rememberHTML(q) {
    var r = q.widget && q.widget.reveal;
    if (!r) return '';
    return '<div class="remember"><span class="r-tag">Remember</span><b>' + r.name + '</b>' +
      (r.formula ? '<span class="r-formula">' + r.formula + '</span>' : '') + '</div>';
  }

  /* ---------------- contents page ---------------- */
  function home() {
    app.innerHTML = '';
    app.appendChild(h(
      '<header class="masthead">' +
        '<div class="mast-rules"></div>' +
        '<div class="mast-eyebrow"><span>A field manual for practical machine learning</span><span>Nº 1 · k-NN</span></div>' +
        '<h1>DataSense</h1>' +
        '<p class="mast-sub">Ninety exercises on <b>k-Nearest Neighbours</b>. Miss one and you don\'t get a lecture — you get a lab bench, a quick check, and a second attempt.</p>' +
        '<div class="mast-foot">Multiple choice · answers shuffle on every sitting · progress kept in this browser</div>' +
      '</header>'));

    var topic = h('<section class="topic">' +
      '<div class="topic-head"><h3>k-Nearest Neighbours</h3><span class="t-index">Topic 01 · 90 exercises</span></div>' +
      '<p class="t-desc">Classify by asking the most similar known examples to vote.</p>' +
      '<div class="toc"></div></section>');
    var toc = topic.querySelector('.toc');
    LEVELS.forEach(function (L) {
      var qs = QUESTIONS[L.key] || [];
      var best = localStorage.getItem(bestKey(L.key));
      var meta = qs.length ? (best != null ? 'best ' + best + '/' + qs.length : qs.length + ' exercises') : 'in preparation';
      var row = h('<button class="toc-row">' +
        '<span class="toc-part">' + L.part + '</span>' +
        '<span class="toc-name">' + L.name + '</span>' +
        '<span class="toc-dots"></span>' +
        '<span class="toc-meta">' + meta + '</span>' +
        '<span class="toc-go" aria-hidden="true">→</span></button>');
      row.title = L.blurb;
      if (!qs.length) row.disabled = true;
      else row.onclick = function () { start(L.key); };
      toc.appendChild(row);
    });
    app.appendChild(topic);

    app.appendChild(h('<div class="sec-label">Forthcoming volumes</div>'));
    var grid = h('<div class="locked-grid"></div>');
    UPCOMING.forEach(function (t) {
      grid.appendChild(h('<div class="topic locked"><h3>' + t.name + '</h3>' +
        '<p class="t-desc">' + t.desc + '</p><span class="stamp">In preparation</span></div>'));
    });
    app.appendChild(grid);
  }

  /* ---------------- exercise ---------------- */
  function start(levelKey) {
    S = { level: levelKey, qs: QUESTIONS[levelKey], i: 0, correct: 0, results: [] };
    question(false);
  }
  function levelOf(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i]; return LEVELS[0]; }

  function question(isRetry) {
    var q = S.qs[S.i];
    var L = levelOf(S.level);
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
      '<div class="ruler" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.qs.length + '" aria-valuenow="' + S.i + '"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div>' +
      '<span class="exmeta">Exercise <b>' + (S.i + 1) + '</b> of ' + S.qs.length + ' · <b>' + S.correct + '</b> correct</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);

    var card = h('<article class="qcard"><div class="q-eyebrow">§ k-Nearest Neighbours · ' + L.part + ' — ' + L.name +
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
    var L = levelOf(S.level);
    var prev = +(localStorage.getItem(bestKey(S.level)) || -1);
    if (c > prev) localStorage.setItem(bestKey(S.level), c);
    var pct = c / n;
    var msg = pct === 1 ? 'A perfect paper. This level is yours.' :
      pct >= 0.8 ? 'Strong work — the marked squares below are your reading list.' :
      pct >= 0.5 ? 'A solid sitting. Every miss came with its own lab, which is the point.' :
      'This is how the manual is meant to be used: each miss taught you something a lecture couldn\'t.';
    app.innerHTML = '';
    var card = h('<div class="result-card">' +
      '<div class="r-eyebrow">Report · ' + L.part + ' — ' + L.name + ' · k-Nearest Neighbours</div>' +
      '<div class="score-big">' + c + ' <small>/ ' + n + '</small></div>' +
      '<p class="r-msg">' + msg + ' <span class="small">(first attempts only)</span></p>' +
      (c > prev && prev >= 0 ? '<div class="r-best">New personal best — previously ' + prev + '</div>' : '') +
      '<div class="dots">' + S.results.map(function (r, i) { return '<span class="dot-q ' + (r ? 'ok' : 'no') + '">' + (i + 1) + '</span>'; }).join('') + '</div>' +
      '<div class="next-row" style="justify-content:center"><button class="btn">Sit it again</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = function () { start(S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  home();
})();
