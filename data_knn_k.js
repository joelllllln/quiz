/* KNN — small vs large k mapped to bias/variance and over/underfitting. Adds flashcards via reveal.name. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function push(qk, o) { (Q[qk] = Q[qk] || []).push(o); }

  // Small k -> low bias, high variance -> overfitting.
  push('medium', {
    q: "In k-NN you set k very small (say k = 1). In bias–variance terms, what does that do?",
    choices: [
      "Low bias, high variance — it hugs the training points and overfits, reacting to noise",
      "High bias, low variance — it oversmooths and underfits",
      "Low bias and low variance — the ideal, with no trade-off",
      "High bias and high variance — always the worst of both",
      "It changes neither; only the distance metric affects bias and variance"
    ],
    explain: "A tiny k means each prediction rests on one or a few nearest points, so the decision boundary is jagged and clings to the training data — low bias but high variance. That is overfitting: one mislabelled neighbour flips the answer, and k = 1 scores 100% on training while test accuracy sags. The fix is to raise k, which averages neighbours and cuts variance.",
    simple: "Trusting only the single closest neighbour lets one weird point decide everything — the model memorises quirks (overfits) instead of the general pattern.",
    widget: {
      type: "curveStatic", title: "Small k overfits: big train–test gap",
      world: "Sweep k from tiny upward and watch training accuracy vs held-out test accuracy.",
      xlab: "k (small → large) →", xs: [0, 1, 2, 3],
      labels: ["1", "5", "15", "50"], dec: 0, yunit: "%",
      series: [
        { name: "test accuracy", ys: [74, 86, 84, 76] },
        { name: "training accuracy", ys: [100, 90, 85, 78] }
      ],
      knob: { label: "k", min: 0, max: 3, step: 1, init: 0 },
      insights: [
        { max: 0, text: "k = 1: training 100%, test 74% — a wide gap. Classic overfitting (high variance).", tone: "warn" },
        { max: 1, text: "A moderate k closes the gap and generalises best.", tone: "info" },
        { max: 3, text: "🤯 Too-large k pulls BOTH scores down — that's the underfitting end.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Small k → high variance (overfitting)", formula: "low bias · high variance", text: "Small k (esp. k=1) gives low bias but high variance — it overfits, following noise. Raise k to smooth it out." }
    }
  });

  // Large k -> high bias, low variance -> underfitting.
  push('medium', {
    q: "You raise k in k-NN toward the dataset size. What happens to bias and variance, and to the fit?",
    choices: [
      "High bias, low variance — it oversmooths and underfits, drifting toward the majority class",
      "Low bias, high variance — it overfits the training data",
      "Both bias and variance drop to zero — the perfect model",
      "Variance rises sharply while bias vanishes",
      "Nothing changes; k only affects prediction speed, not the fit"
    ],
    explain: "A large k averages over many neighbours, so predictions are stable (low variance) but crude: the boundary is too smooth to capture real structure — high bias, underfitting. At k = n every query just returns the majority class. The cure for underfitting is the opposite of overfitting's: less smoothing — a smaller k (or better features).",
    simple: "Polling the whole town for every decision gives a steady but bland answer — it washes out the local detail you actually needed (underfits).",
    widget: {
      type: "curveStatic", title: "Large k underfits: both scores sink",
      world: "Keep raising k past the sweet spot and watch training and test accuracy fall together.",
      xlab: "k (moderate → huge) →", xs: [0, 1, 2, 3],
      labels: ["15", "50", "150", "≈ n"], dec: 0, yunit: "%",
      series: [
        { name: "test accuracy", ys: [86, 80, 70, 55] },
        { name: "training accuracy", ys: [88, 82, 71, 55] }
      ],
      knob: { label: "k", min: 0, max: 3, step: 1, init: 0 },
      insights: [
        { max: 0, text: "Near the sweet spot, train and test are both high and close.", tone: "info" },
        { max: 2, text: "As k grows, both scores drop together — no gap, just a low ceiling.", tone: "warn" },
        { max: 3, text: "🤯 At k ≈ n it always guesses the majority class: maximum bias, underfitting.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "Large k → high bias (underfitting)", formula: "high bias · low variance", text: "Large k gives low variance but high bias — it oversmooths and underfits (k=n = majority class). Lower k to add back detail." }
    }
  });
})();
