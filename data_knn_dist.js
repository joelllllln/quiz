/* KNN — Euclidean vs Manhattan: what each is and WHEN to pick. Adds flashcards (via reveal.name). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function push(qk, o) { (Q[qk] = Q[qk] || []).push(o); }

  // Level 1 (easy): Euclidean as the natural default.
  push('easy', {
    q: "For k-NN on a few continuous features that are already on a comparable scale, which distance is the natural default?",
    choices: [
      "Euclidean (L2) — the straight-line 'as the crow flies' distance",
      "Manhattan (L1), because it is always more accurate than Euclidean",
      "Hamming distance, the standard choice for continuous features",
      "Cosine distance, because it ignores feature magnitude",
      "Whichever metric gives the highest training accuracy"
    ],
    explain: "Euclidean distance — Pythagoras applied to the feature gaps — is k-NN's default and fits low-dimensional, continuous, comparably-scaled features where geometric closeness means 'similar'. Manhattan is not universally better; it tends to shine in high dimensions or with outliers. Hamming is for categorical/binary strings, and cosine ignores magnitude (good for text, not general use). Choosing a metric by training accuracy overfits — validate instead.",
    simple: "With just a couple of sensible, comparable measurements, the ordinary ruler between two points is the obvious first choice.",
    widget: {
      type: "curveStatic", title: "Euclidean: the straight-line default",
      world: "Two features on the same scale — the plain ruler between points captures 'similar' well.",
      xlab: "how well the metric captures similarity →", xs: [0, 1, 2, 3],
      labels: ["random", "Hamming", "Manhattan", "Euclidean"], dec: 0, yunit: "%",
      series: [{ name: "fit for low-dim continuous data", ys: [25, 45, 82, 90] }],
      knob: { label: "Distance metric", min: 0, max: 3, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Hamming is for categorical strings, not continuous numbers.", tone: "info" },
        { max: 2, text: "Manhattan works, but Euclidean matches straight-line geometry here.", tone: "info" },
        { max: 3, text: "🤯 On a few comparable continuous features, Euclidean is the sensible default.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Euclidean is the default", formula: "d = √Σ(aᵢ − bᵢ)²", text: "Use Euclidean (L2) for low-dimensional, continuous, comparably-scaled features — it is k-NN's default straight-line distance." }
    }
  });

  // Level 2 (medium): high dimensions -> prefer Manhattan.
  push('medium', {
    q: "k-NN on 300 features is failing because every point looks almost equally far from every other. Switching to which distance most often helps?",
    choices: [
      "Manhattan (L1) — in high dimensions it keeps neighbours more distinguishable than Euclidean",
      "Euclidean (L2), because squaring the gaps sharpens differences in high dimensions",
      "Chebyshev (max coordinate), which always separates high-dimensional points best",
      "No distance metric matters in high dimensions; only k does",
      "Cosine on the raw counts, which removes any need to scale the features"
    ],
    explain: "In many dimensions all pairwise distances bunch together (distance concentration), so nearest and farthest look alike. Manhattan (L1) sums absolute gaps and degrades more gracefully than Euclidean (L2), which squares gaps and concentrates faster — so L1 usually keeps neighbours more distinguishable. The bigger fix is fewer dimensions (feature selection / PCA). Whatever metric you pick, scale first; cosine still needs sensible features and doesn't remove scaling.",
    simple: "In a crowd where everyone seems the same distance away, counting block-by-block steps (Manhattan) tells people apart better than one straight-line ruler.",
    widget: {
      type: "curveStatic", title: "In high dimensions, Manhattan holds up better",
      world: "As you add features, watch how distinguishable the nearest neighbours stay under each metric.",
      xlab: "number of features →", xs: [0, 1, 2, 3],
      labels: ["2", "20", "100", "300"], dec: 0, yunit: "%",
      series: [
        { name: "neighbours still distinguishable (Manhattan)", ys: [96, 80, 62, 48] },
        { name: "neighbours still distinguishable (Euclidean)", ys: [96, 70, 44, 28] }
      ],
      knob: { label: "Dimensions", min: 0, max: 3, step: 1, init: 0 },
      insights: [
        { max: 1, text: "In low dimensions the two metrics behave similarly.", tone: "info" },
        { max: 2, text: "As features pile up, all distances start to concentrate.", tone: "warn" },
        { max: 3, text: "🤯 By 300 features, Manhattan keeps far more separation than Euclidean.", tone: "wow" }
      ],
      extreme: { at: "min" },
      reveal: { name: "High dimensions → prefer Manhattan", formula: "L1 concentrates slower than L2", text: "In high-dimensional data Manhattan (L1) keeps neighbours more distinguishable than Euclidean (L2) — but reducing dimensions helps most." }
    }
  });

  // Level 2 (medium): Manhattan is robust to a single huge coordinate gap / outliers.
  push('medium', {
    q: "One feature occasionally has a huge outlier value. You want a single big gap on one axis to NOT dominate the k-NN distance. Which metric helps?",
    choices: [
      "Manhattan (L1) — it adds absolute gaps, so one large gap is not squared",
      "Euclidean (L2), because squaring the gap keeps outliers from mattering",
      "Cosine distance, because it is unaffected by any outlier",
      "Chebyshev distance, which reports only the single largest gap",
      "There is no difference; both treat a large gap identically"
    ],
    explain: "Euclidean squares each coordinate gap, so one very large difference dominates the total distance. Manhattan sums the absolute gaps, so a single big gap contributes linearly rather than being squared — making it more robust to outliers and to grid-like or ordinal features. (Chebyshev goes the other way: it reports only the largest gap, so it is the most outlier-dominated.) Note this is about robustness to a big single-axis gap; you should still handle genuine outliers and scale features.",
    simple: "Squaring punishes one big miss enormously; adding the plain gaps lets that one big miss count just once, so it doesn't swamp everything else.",
    widget: {
      type: "curveStatic", title: "Manhattan softens a single huge gap",
      world: "Push one feature's gap to an extreme and watch how much each metric lets it dominate the distance.",
      xlab: "size of one axis's gap →", xs: [0, 1, 2, 3],
      labels: ["small", "large", "huge", "extreme"], dec: 0, yunit: "%",
      series: [
        { name: "that one axis's share of Euclidean distance", ys: [30, 62, 85, 96] },
        { name: "that one axis's share of Manhattan distance", ys: [30, 48, 62, 72] }
      ],
      knob: { label: "Outlier gap", min: 0, max: 3, step: 1, init: 0 },
      insights: [
        { max: 1, text: "With small gaps both metrics agree.", tone: "info" },
        { max: 2, text: "Euclidean squares the gap, so the outlier axis takes over fast.", tone: "warn" },
        { max: 3, text: "🤯 Manhattan lets the big gap count once — it stays more balanced.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Manhattan resists a single big gap", formula: "L1 adds |gap|; L2 adds gap²", text: "Manhattan (L1) is more robust to outliers and grid/ordinal features — one large coordinate gap is added, not squared, so it does not dominate." }
    }
  });
})();
