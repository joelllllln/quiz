/* DataSense quiz shell — levels, questions, wrong-answer → lab exercise */
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

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(lv) { return 'ds_best_knn_' + lv; }

  /* ---------------- contents page ---------------- */
  function home() {
    app.innerHTML = '';
    app.appendChild(h(
      '<header class="masthead">' +
        '<div class="mast-rules"></div>' +
        '<div class="mast-eyebrow"><span>A field manual for practical machine learning</span><span>Nº 1 · k-NN</span></div>' +
        '<h1>DataSense</h1>' +
        '<p class="mast-sub">Ninety exercises on <b>k-Nearest Neighbours</b>. Answer wrong and you don\'t get a lecture — you get a lab bench: one control to drag, one measurement to watch, and the concept named only after you\'ve felt it work.</p>' +
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
    question();
  }
  function levelOf(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i]; return LEVELS[0]; }

  function question() {
    var q = S.qs[S.i];
    var L = levelOf(S.level);
    app.innerHTML = '';
    var bar = h('<div class="exbar"><button class="back">← Contents</button>' +
      '<div class="ruler" role="progressbar" aria-valuemin="0" aria-valuemax="' + S.qs.length + '" aria-valuenow="' + S.i + '"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div>' +
      '<span class="exmeta">Exercise <b>' + (S.i + 1) + '</b> of ' + S.qs.length + ' · <b>' + S.correct + '</b> correct</span></div>');
    bar.querySelector('.back').onclick = home;
    app.appendChild(bar);

    var card = h('<article class="qcard"><div class="q-eyebrow">§ k-Nearest Neighbours · ' + L.part + ' — ' + L.name + '</div>' +
      '<h2 class="qtext"></h2><div class="choices"></div></article>');
    card.querySelector('.qtext').textContent = q.q;
    var box = card.querySelector('.choices');
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
      b.onclick = function () { answer(q, origIdx, b, btns, card); };
      btns.push({ b: b, orig: origIdx });
      box.appendChild(b);
    });
    app.appendChild(card);
    window.scrollTo(0, 0);
  }

  function answer(q, chosen, btn, btns, card) {
    var right = chosen === 0;
    btns.forEach(function (x) { x.b.disabled = true; if (x.orig !== 0 && x.b !== btn) x.b.classList.add('dim'); });
    S.results.push(right);
    if (right) {
      S.correct++;
      btn.classList.add('is-correct');
      card.appendChild(h('<div class="banner good"><span class="b-label">Correct ✓</span><div class="explain">' + q.explain + '</div></div>'));
      var row = h('<div class="next-row"><button class="btn">Next exercise →</button><button class="btn ghost">Open the lab anyway</button></div>');
      row.children[0].onclick = next;
      row.children[1].onclick = function () {
        row.children[1].remove();
        renderWidget(card, q.widget);
      };
      card.appendChild(row);
    } else {
      btn.classList.add('picked-wrong');
      card.appendChild(h('<div class="banner bad"><span class="b-label">Marked ✗</span>No lecture. Work the bench below — the right answer should become obvious.</div>'));
      renderWidget(card, q.widget);
      var row = h('<div class="next-row"><button class="btn">I\'ve got it — show the answer</button></div>');
      var revealBtn = row.children[0];
      revealBtn.onclick = function () {
        btns.forEach(function (x) { if (x.orig === 0) { x.b.classList.add('is-correct'); x.b.classList.remove('dim'); } });
        card.insertBefore(h('<div class="banner good"><span class="b-label">The answer</span>' + q.choices[0] + '<div class="explain">' + q.explain + '</div></div>'), row);
        revealBtn.textContent = 'Next exercise →';
        revealBtn.onclick = next;
        revealBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };
      card.appendChild(row);
    }
  }

  function next() {
    S.i++;
    if (S.i >= S.qs.length) return done();
    question();
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
      '<p class="r-msg">' + msg + '</p>' +
      (c > prev && prev >= 0 ? '<div class="r-best">New personal best — previously ' + prev + '</div>' : '') +
      '<div class="dots">' + S.results.map(function (r, i) { return '<span class="dot-q ' + (r ? 'ok' : 'no') + '">' + (i + 1) + '</span>'; }).join('') + '</div>' +
      '<div class="next-row" style="justify-content:center"><button class="btn">Sit it again</button><button class="btn ghost">Contents</button></div></div>');
    card.querySelector('.btn').onclick = function () { start(S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  home();
})();
