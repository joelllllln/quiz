/* DataSense quiz shell — levels, questions, wrong-answer → interactive lesson */
(function () {
  'use strict';
  var app = document.getElementById('app');
  window.QUESTIONS = window.QUESTIONS || {};
  var LEVELS = [
    { key: 'easy', name: 'Level 1 · Foundations', blurb: 'Neighbours, votes and distance — the core moves.' },
    { key: 'medium', name: 'Level 2 · Practitioner', blurb: 'Scaling, boundaries, tuning k, overfitting.' },
    { key: 'hard', name: 'Level 3 · Advanced', blurb: 'High dimensions, complexity, weighting, edge cases.' }
  ];
  var TOPICS = [
    { key: 'knn', emoji: '🎯', name: 'k-Nearest Neighbours', desc: 'Classify by asking the neighbours.', live: true },
    { key: 'linreg', emoji: '📈', name: 'Linear Regression', desc: 'Fit the best straight line.', live: false },
    { key: 'trees', emoji: '🌳', name: 'Decision Trees', desc: 'Split your way to an answer.', live: false },
    { key: 'metrics', emoji: '🧪', name: 'Model Evaluation', desc: 'Accuracy, precision, recall & friends.', live: false },
    { key: 'cluster', emoji: '🫧', name: 'Clustering', desc: 'Find groups nobody labelled.', live: false },
    { key: 'proba', emoji: '🎲', name: 'Probability & Stats', desc: 'The maths under everything.', live: false }
  ];
  var S = {};

  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function bestKey(lv) { return 'ds_best_knn_' + lv; }

  /* ---------------- home ---------------- */
  function home() {
    app.innerHTML = '';
    var hero = h('<div class="hero"><h1>DataSense</h1><p>Learn data science by <b>doing</b>. Get a question wrong and you don\'t get a lecture — you get an interactive toy that lets you discover the idea yourself.</p></div>');
    app.appendChild(hero);
    var grid = document.createElement('div'); grid.className = 'topic-grid';
    TOPICS.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'topic' + (t.live ? '' : ' locked');
      card.innerHTML = '<div class="t-emoji">' + t.emoji + '</div><h3>' + t.name + '</h3><div class="small">' + t.desc + '</div>';
      if (t.live) {
        var lv = document.createElement('div'); lv.className = 'levels';
        LEVELS.forEach(function (L) {
          var qs = QUESTIONS[L.key] || [];
          var btn = document.createElement('button');
          btn.className = 'level-btn';
          var best = localStorage.getItem(bestKey(L.key));
          btn.innerHTML = '<span><span class="lb-name">' + L.name + '</span><br><span class="lb-blurb">' + L.blurb + '</span></span>' +
            '<span class="lb-best">' + (qs.length ? (best != null ? 'best ' + best + '/' + qs.length : qs.length + ' questions') : 'coming soon') + '</span>';
          if (!qs.length) btn.disabled = true;
          else btn.onclick = function () { start(L.key); };
          lv.appendChild(btn);
        });
        card.appendChild(lv);
      } else {
        card.innerHTML += '<span class="soon">coming soon</span>';
      }
      grid.appendChild(card);
    });
    app.appendChild(grid);
  }

  /* ---------------- quiz ---------------- */
  function start(levelKey) {
    S = { level: levelKey, qs: QUESTIONS[levelKey], i: 0, correct: 0, results: [] };
    question();
  }
  function levelName(k) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].key === k) return LEVELS[i].name; return k; }

  function question() {
    var q = S.qs[S.i];
    app.innerHTML = '';
    var top = h('<div class="topbar"><button class="back">← Quit</button><div class="progress"><div style="width:' + (100 * S.i / S.qs.length) + '%"></div></div><span class="qmeta">Q ' + (S.i + 1) + '/' + S.qs.length + ' · ✓ ' + S.correct + '</span></div>');
    top.firstChild.querySelector('.back').onclick = home;
    app.appendChild(top.firstChild);

    var card = document.createElement('div'); card.className = 'qcard';
    card.appendChild(h('<span class="chip">k-Nearest Neighbours · ' + levelName(S.level) + '</span>').firstChild);
    card.appendChild(h('<div class="qtext"></div>').firstChild);
    card.lastChild.textContent = q.q;
    var box = document.createElement('div'); box.className = 'choices';
    var order = shuffle(q.choices.map(function (_, i) { return i; }));
    var btns = [];
    order.forEach(function (origIdx) {
      var b = document.createElement('button');
      b.className = 'choice'; b.textContent = q.choices[origIdx];
      b.onclick = function () { answer(q, origIdx, b, btns, card); };
      btns.push({ b: b, orig: origIdx });
      box.appendChild(b);
    });
    card.appendChild(box);
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
      card.appendChild(h('<div class="banner good"><b>✓ Correct.</b><div class="explain">' + q.explain + '</div></div>').firstChild);
      var row = h('<div class="next-row"><button class="btn">Next →</button><button class="btn ghost">Open the interactive lesson anyway</button></div>').firstChild;
      row.children[0].onclick = next;
      row.children[1].onclick = function () {
        row.children[1].remove();
        renderWidget(card, q.widget);
      };
      card.appendChild(row);
    } else {
      btn.classList.add('picked-wrong');
      card.appendChild(h('<div class="banner bad"><b>Not quite.</b> No lecture — let\'s build the idea from scratch instead. Play with this, then the answer will feel obvious.</div>').firstChild);
      renderWidget(card, q.widget);
      var row = h('<div class="next-row"><button class="btn">I\'ve got it — show the answer</button></div>').firstChild;
      var revealBtn = row.children[0];
      revealBtn.onclick = function () {
        btns.forEach(function (x) { if (x.orig === 0) { x.b.classList.add('is-correct'); x.b.classList.remove('dim'); } });
        card.insertBefore(h('<div class="banner good"><b>The answer:</b> ' + q.choices[0] + '<div class="explain">' + q.explain + '</div></div>').firstChild, row);
        revealBtn.textContent = 'Next →';
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

  /* ---------------- results ---------------- */
  function done() {
    var n = S.qs.length, c = S.correct;
    var prev = +(localStorage.getItem(bestKey(S.level)) || -1);
    if (c > prev) localStorage.setItem(bestKey(S.level), c);
    var pct = c / n;
    var msg = pct === 1 ? '🏆 Perfect — you own this level.' :
      pct >= 0.8 ? '🎉 Strong! The misses below are your growth list.' :
      pct >= 0.5 ? '👍 Solid start — every miss came with its own lesson.' :
      '🌱 That\'s how learning works here: each miss taught you something a lecture couldn\'t.';
    app.innerHTML = '';
    var card = h('<div class="result-card"><div class="small">' + levelName(S.level) + ' · k-Nearest Neighbours</div>' +
      '<div class="score-big">' + c + ' / ' + n + '</div><p>' + msg + '</p>' +
      (c > prev && prev >= 0 ? '<p class="small">New personal best (was ' + prev + ').</p>' : '') +
      '<div class="dots">' + S.results.map(function (r) { return '<span class="dot-q ' + (r ? 'ok' : 'no') + '"></span>'; }).join('') + '</div>' +
      '<div class="next-row" style="justify-content:center"><button class="btn">Try again</button><button class="btn ghost">All topics</button></div></div>').firstChild;
    card.querySelector('.btn').onclick = function () { start(S.level); };
    card.querySelector('.btn.ghost').onclick = home;
    app.appendChild(card);
  }

  home();
})();
