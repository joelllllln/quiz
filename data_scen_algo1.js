/* Applied Scenarios — k-NN, Logistic Regression, Naive Bayes. choices[0] always correct (shuffled at render). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  function q(qk, o) { (Q[qk] = Q[qk] || []).push(o); }
  function W(title, world, xlab, labels, name, ys, kl, insights, reveal, extra) {
    var w = { type: "curveStatic", title: title, world: world, xlab: xlab, xs: labels.map(function (_, i) { return i; }),
      labels: labels, dec: 0, yunit: "%", series: [{ name: name, ys: ys }],
      knob: { label: kl, min: 0, max: labels.length - 1, step: 1, init: 0 },
      insights: insights, extreme: { at: "max" }, reveal: reveal };
    if (extra && extra.series) w.series = w.series.concat(extra.series);
    if (extra && extra.extreme) w.extreme = extra.extreme;
    return w;
  }

  /* ===================== scen1 — Clear Calls (6) ===================== */

  q("scen1", {
    q: "You are running k-nearest neighbours on a two-class problem (approve / deny). To avoid tied votes among the neighbours, what is the simplest sensible rule for choosing k?",
    choices: [
      "Use an odd value of k, so a binary vote can never end in a tie",
      "Use an even value of k, because even numbers split the neighbourhood evenly",
      "Always use k equal to the number of classes, so k = 2",
      "Use k = 1, since a single neighbour is guaranteed to be correct",
      "Set k to the total number of training points so every point votes"
    ],
    explain: "With two classes, a majority vote over k neighbours can tie only when the two classes split the k votes exactly in half, which needs an even k. Choosing an odd k makes a 50/50 split impossible, so there is always a strict majority. k = 1 is not immune to error (it just copies the single nearest label and is very noisy), and k equal to all points collapses every prediction to the overall majority class.",
    simple: "If two people vote yes/no they can deadlock; three people never can. An odd number of neighbours breaks ties automatically.",
    widget: W("Odd k avoids ties", "Chance of a tied 2-class vote as k changes between even and odd values.",
      "k value →", ["k=2", "k=3", "k=4", "k=5"],
      "possible tie?", [100, 0, 100, 0], "Neighbour count k",
      [{ max: 1, text: "k=2 can split 1-1; k=3 can only be 2-1 or 3-0 — no tie.", tone: "info" },
       { max: 2, text: "k=4 reopens the 2-2 tie; the pattern alternates with parity.", tone: "info" },
       { max: 3, text: "🤯 Only the parity of k matters for ties in a 2-class vote, not how large k is.", tone: "wow" }],
      { name: "Choosing k in k-NN", formula: "2 classes → pick odd k so votes cannot tie", text: "For binary k-NN, an odd k guarantees a strict majority and removes tie-breaking guesswork." })
  });

  q("scen1", {
    q: "Your k-NN model uses two features: age (roughly 20-70) and annual income (roughly 15000-200000). Straight out of the box it performs poorly. What is the first fix?",
    choices: [
      "Standardise or normalise the features so both are on a comparable scale before computing distances",
      "Increase k to a very large value so the big feature is averaged out",
      "Switch the distance metric to cosine, which ignores feature magnitudes entirely",
      "Remove the age feature because income is obviously more predictive",
      "Add more training rows, since k-NN just needs more data to fix scaling"
    ],
    explain: "k-NN decides who is 'near' using a distance (usually Euclidean), and Euclidean distance is dominated by whatever feature has the largest numeric range. Here income spans tens of thousands while age spans tens, so distance is almost entirely income and age is effectively ignored. Standardising (z-scores) or min-max normalising puts every feature on the same footing so each contributes fairly. This is a mandatory preprocessing step for any distance-based method.",
    simple: "If one ruler measures in millimetres and another in kilometres, the kilometre ruler drowns out the other. Rescale both to the same units first.",
    widget: W("Scaling before distance", "Accuracy of k-NN as feature scaling is applied to wildly different feature ranges.",
      "preprocessing →", ["raw features", "log income only", "min-max scaled", "z-score scaled"],
      "test accuracy", [61, 74, 88, 90], "Scaling applied",
      [{ max: 1, text: "On raw values, income's huge range swamps age in every distance.", tone: "info" },
       { max: 2, text: "Any rescaling that equalises ranges lets both features vote.", tone: "info" },
       { max: 3, text: "🤯 The model did not change — only the units did — yet accuracy jumped ~30 points.", tone: "wow" }],
      { name: "Feature scaling for k-NN", formula: "distance-based model → rescale features to comparable ranges first", text: "k-NN, k-means and SVM all need scaled features, or the widest-range feature silently dominates." })
  });

  q("scen1", {
    q: "A logistic regression predicting default has a coefficient of +0.7 on the feature 'number of missed payments'. What does that coefficient mean directly?",
    choices: [
      "Each extra missed payment multiplies the odds of default by e^0.7 (about 2x), holding other features fixed",
      "Each extra missed payment raises the probability of default by exactly 0.7 (70 percentage points)",
      "Each extra missed payment raises the probability of default by 7%",
      "The feature explains 70% of the variance in default",
      "The coefficient is a correlation, so 0.7 is a strong positive correlation with default"
    ],
    explain: "Logistic regression is linear in the log-odds, not in probability. A coefficient b means each one-unit increase in the feature adds b to the log-odds, which multiplies the odds by e^b. Here e^0.7 is about 2, so one more missed payment roughly doubles the odds of default, all else equal. It is not a straight change in probability (that change depends on where you start on the S-curve) and it is not a correlation or an R-squared.",
    simple: "Logistic regression speaks in odds, not probabilities. A coefficient of 0.7 means the odds get multiplied by about two for each unit of the feature.",
    widget: W("Coefficients live in log-odds", "How a +0.7 log-odds bump changes actual probability at different starting points.",
      "starting probability →", ["10%", "30%", "50%", "70%"],
      "probability after +0.7 log-odds", [18, 46, 67, 82], "Baseline probability",
      [{ max: 1, text: "From 10% the same +0.7 log-odds lands near 18% — an 8-point rise.", tone: "info" },
       { max: 2, text: "From 50% it rises to ~67% — the same log-odds, a bigger point change.", tone: "info" },
       { max: 3, text: "🤯 One fixed coefficient produces different probability jumps depending on where you start.", tone: "wow" }],
      { name: "Odds and log-odds", formula: "coefficient b → odds multiplied by e^b per unit", text: "Read logistic coefficients as multipliers on the odds, never as flat changes in probability." })
  });

  q("scen1", {
    q: "A hospital needs to rank patients by risk AND trust the predicted numbers as genuine probabilities (a '20% risk' should be right about 20% of the time). Which model is the natural first choice?",
    choices: [
      "Logistic regression, which directly optimises a probabilistic loss and tends to produce well-calibrated probabilities",
      "A support vector machine, whose decision scores are already valid probabilities",
      "k-nearest neighbours with k = 1, because a single neighbour gives a confident answer",
      "A decision tree, because its leaf purity equals a calibrated probability",
      "Naive Bayes, because it is the only model that outputs any probability at all"
    ],
    explain: "Logistic regression is fit by maximising the likelihood of the observed labels under a probability model, so its outputs are actual probabilities and are usually close to calibrated without extra work. Raw SVM scores are signed distances, not probabilities. A 1-NN gives only a hard 0/1 vote, and shallow-tree leaf fractions are often poorly calibrated. Naive Bayes does output probabilities but they are famously over-confident (pushed toward 0 or 1) because of its independence assumption.",
    simple: "If you need the number itself to mean something ('1 in 5 will relapse'), pick the model built to output honest probabilities. Logistic regression is that model.",
    widget: W("Calibration by model", "How closely predicted probabilities match observed frequencies (reliability).",
      "model →", ["1-NN", "raw SVM score", "Naive Bayes", "logistic regression"],
      "calibration quality", [30, 25, 45, 90], "Model choice",
      [{ max: 1, text: "Hard votes and raw margins are not probabilities at all.", tone: "info" },
       { max: 2, text: "Naive Bayes gives probabilities but pushes them toward 0 or 1.", tone: "info" },
       { max: 3, text: "🤯 Logistic regression is calibrated almost by construction — it is trained on probability loss.", tone: "wow" }],
      { name: "Probability calibration", formula: "need trustworthy probabilities → logistic regression (or calibrate)", text: "When the probability value itself is used, choose a calibrated model or calibrate the scores you have." })
  });

  q("scen1", {
    q: "You must build a spam filter from 40000 emails represented as word-count vectors over a 30000-word vocabulary, and it has to train in seconds and score new mail instantly. Which classic model fits best as a first pass?",
    choices: [
      "Multinomial Naive Bayes — fast, handles very high-dimensional sparse text, and is a strong text-classification baseline",
      "k-nearest neighbours, computing distance to all 40000 emails for every new message",
      "A deep neural network trained end-to-end on the raw word counts",
      "A single decision tree split on individual word counts",
      "Logistic regression is impossible here because there are more features than a tree can hold"
    ],
    explain: "Multinomial Naive Bayes is essentially counting: it estimates per-class word frequencies in one pass, so training is near-instant and prediction is a cheap sum of log-probabilities. It thrives in the high-dimensional, sparse regime that bag-of-words text produces, and it is the textbook baseline for spam detection. k-NN would be painfully slow at query time (compare against all 40000 emails), and a deep net is overkill for a fast first baseline. Logistic regression is actually also viable, but it is not 'impossible' — that option is simply false.",
    simple: "For counting-words-in-emails, the counting model wins. Naive Bayes just tallies which words show up in spam versus ham and multiplies the odds.",
    widget: W("Naive Bayes on text", "Training + scoring speed of models on 30000-dimensional sparse text.",
      "model →", ["k-NN (lazy)", "deep net", "logistic reg", "Naive Bayes"],
      "practical speed", [30, 25, 70, 95], "Model choice",
      [{ max: 1, text: "k-NN and deep nets are slow to query or slow to train on this scale.", tone: "info" },
       { max: 2, text: "Logistic regression is a solid, fast linear option too.", tone: "info" },
       { max: 3, text: "🤯 Naive Bayes trains in a single count-and-divide pass over the whole corpus.", tone: "wow" }],
      { name: "Text classification baseline", formula: "high-dim sparse text → Naive Bayes as fast first model", text: "Multinomial Naive Bayes is the go-to fast baseline for bag-of-words text like spam." })
  });

  q("scen1", {
    q: "Your Naive Bayes spam filter sees the word 'crypto' in the test email, but that word never appeared in any 'ham' email during training. It confidently labels every such email as spam. What is the fix?",
    choices: [
      "Apply Laplace (add-one) smoothing so no word ever gets a zero probability in a class",
      "Delete the word 'crypto' from the vocabulary so it cannot cause problems",
      "Switch to k-NN, which does not use word probabilities",
      "Collect only ham emails until 'crypto' appears in one of them",
      "Lower the classification threshold so fewer emails are called spam"
    ],
    explain: "Naive Bayes multiplies per-word probabilities. If a word was never seen in the ham class, its estimated probability is exactly zero, and a single zero drags the entire product for 'ham' to zero — so the class is ruled out no matter what the other words say. Laplace (additive) smoothing adds a small pseudo-count to every word-class pair so nothing is ever exactly zero. This is the standard, essentially mandatory, fix for the zero-frequency problem.",
    simple: "One unseen word should not veto an entire class. Add-one smoothing pretends you saw every word at least a little, so no probability is ever a hard zero.",
    widget: W("Zero-frequency smoothing", "Ham-class probability for an email as smoothing pseudo-count rises from zero.",
      "smoothing alpha →", ["0 (none)", "0.01", "0.5", "1 (add-one)"],
      "ham probability survives?", [0, 55, 78, 85], "Smoothing strength",
      [{ max: 1, text: "With alpha = 0 one unseen word forces the ham probability to exactly 0.", tone: "info" },
       { max: 2, text: "A tiny pseudo-count rescues the class so other words can still vote.", tone: "info" },
       { max: 3, text: "🤯 A single never-seen word can veto a whole class until you smooth — add-one fixes it.", tone: "wow" }],
      { name: "Laplace smoothing", formula: "unseen word → add pseudo-count so P is never exactly 0", text: "Additive smoothing stops one zero-count word from zeroing out an entire class in Naive Bayes." })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "In k-NN you can set k small (like 1-3) or large (like 50). The data is somewhat noisy. How should you think about the choice?",
    choices: [
      "Small k = low bias but high variance (fits noise); large k = smoother, higher bias but lower variance — tune k to balance them",
      "Larger k is always better because more neighbours means more information",
      "Smaller k is always better because the closest point is the most relevant",
      "k has no effect on bias or variance; it only changes runtime",
      "You should set k equal to the number of features to match dimensionality"
    ],
    explain: "k controls the bias-variance trade-off in k-NN. A tiny k lets each prediction follow the single nearest points, so it hugs the training data and its noise (low bias, high variance). A large k averages over many neighbours, smoothing out noise but blurring real boundaries (higher bias, lower variance). Neither extreme is 'always better'; you pick k (often by cross-validation) to minimise total error on held-out data.",
    simple: "Ask one nearby friend and you get a jumpy, opinionated answer; poll fifty and you get a bland average. The best k is somewhere in between.",
    widget: W("k tunes bias vs variance", "Held-out error as k grows from very small to very large.",
      "k value →", ["k=1", "k=5", "k=15", "k=50"],
      "cross-validated error", [34, 19, 22, 40], "Neighbour count k",
      [{ max: 1, text: "k=1 memorises noise — high variance, error is high on new data.", tone: "info" },
       { max: 2, text: "A moderate k smooths noise without erasing real structure — the sweet spot.", tone: "info" },
       { max: 3, text: "🤯 The error curve is U-shaped: too small and too large both hurt, for opposite reasons.", tone: "wow" }],
      { name: "Bias-variance in k-NN", formula: "small k ↑variance, large k ↑bias → tune k on validation", text: "k is the main dial in k-NN: sweep it and pick the value that minimises validation error." })
  });

  q("scen2", {
    q: "A recommender must score millions of live requests per second with tight latency, but your team loves k-NN's accuracy on this data. What is the honest trade-off to weigh?",
    choices: [
      "k-NN is a lazy learner: near-zero training cost but expensive prediction (search all points), so it can be too slow to serve at scale without approximation",
      "k-NN is slow to train but instant to predict, so serving latency is never a concern",
      "k-NN uses no memory at prediction time, so scale is free",
      "k-NN latency depends only on k, not on the number of training points",
      "k-NN cannot be used for recommendation at all, so accuracy is irrelevant"
    ],
    explain: "k-NN does no real work at training time — it just stores the data — but that pushes all the cost to prediction, where it must find the nearest neighbours among every stored point. With millions of points and tight latency, a naive scan is too slow and it must hold the whole dataset in memory. You weigh its accuracy against that serving cost, and often reach for approximate nearest-neighbour indexes (KD-trees, ball trees, HNSW) or a faster model to meet the latency budget.",
    simple: "k-NN is a procrastinator: it does nothing until you ask, then does all the work at once. Great accuracy, but that last-minute effort can miss a tight deadline.",
    widget: W("Lazy learner, costly queries", "Per-request prediction latency as the stored training set grows.",
      "training set size →", ["10k", "100k", "1M", "10M"],
      "query latency (relative)", [10, 35, 70, 98], "Dataset size",
      [{ max: 1, text: "Training is basically free — k-NN just memorises the points.", tone: "info" },
       { max: 2, text: "But each query scans the data, so latency climbs with dataset size.", tone: "info" },
       { max: 3, text: "🤯 The model with the cheapest training can have the most expensive predictions.", tone: "wow" }],
      { name: "Lazy vs eager learners", formula: "k-NN: cheap train, expensive predict → watch serving latency", text: "Trade k-NN's accuracy against its query cost; use ANN indexes when you must serve at scale." })
  });

  q("scen2", {
    q: "You have 800 features, many redundant, and stakeholders want a short list of the ones that actually matter in your logistic regression. You must choose a regularisation penalty. What is the key trade-off between L1 and L2?",
    choices: [
      "L1 (lasso) drives many coefficients exactly to zero for a sparse, interpretable model; L2 (ridge) shrinks them smoothly but keeps all features — pick based on whether you want selection",
      "L1 and L2 are identical in effect; the choice is purely cosmetic",
      "L2 sets coefficients to exactly zero and L1 only shrinks them",
      "L1 always gives higher accuracy than L2 on every dataset",
      "Neither penalty affects the coefficients; both only change the intercept"
    ],
    explain: "L1 and L2 penalise large coefficients differently. L1 (lasso) has a geometry that pushes many coefficients to exactly zero, effectively performing feature selection and yielding a short, readable model — ideal when you want to know which features matter. L2 (ridge) shrinks coefficients smoothly toward (but not to) zero, keeping every feature and handling correlated ones gracefully. The trade-off is sparsity/interpretability (L1) versus keeping all information with stable shrinkage (L2); elastic net blends both.",
    simple: "Lasso is a strict editor that deletes weak words entirely; ridge is a gentle editor that just quiets them down. Choose the editor by whether you want a shorter list.",
    widget: W("L1 sparsity vs L2 shrinkage", "Number of features left with a non-zero coefficient as the penalty strengthens.",
      "penalty strength →", ["weak", "medium", "strong (L2)", "strong (L1)"],
      "non-zero features kept", [95, 70, 60, 12], "Regularisation",
      [{ max: 1, text: "Weak penalties keep almost every feature, redundancy and all.", tone: "info" },
       { max: 2, text: "Strong L2 shrinks coefficients but still keeps them all non-zero.", tone: "info" },
       { max: 3, text: "🤯 Strong L1 zeroes most features outright — the model selects its own short list.", tone: "wow" }],
      { name: "L1 vs L2 regularisation", formula: "want feature selection → L1; want smooth shrinkage → L2", text: "Choose L1 for a sparse interpretable model, L2 to keep and stabilise all features." })
  });

  q("scen2", {
    q: "Your logistic regression scores 99% on training but 71% on validation. You control the inverse-regularisation strength C (large C = weak penalty). Which way should you move C, and why?",
    choices: [
      "Decrease C to strengthen regularisation — the train/validation gap signals overfitting, and more shrinkage should raise validation performance",
      "Increase C toward infinity to let the model fit the training data even more closely",
      "C only affects speed, so leave it and just add more features",
      "Remove regularisation entirely, since the training accuracy is already excellent",
      "Increase C because a bigger number always generalises better"
    ],
    explain: "A large train/validation gap (99% vs 71%) is the classic signature of overfitting: the model has learned noise. In scikit-learn's logistic regression, C is the inverse of regularisation strength, so a large C means a weak penalty and an over-flexible model. Decreasing C strengthens the penalty, shrinks the coefficients, and reduces variance, which should close the gap and lift validation accuracy — up to a point, after which too-strong a penalty underfits.",
    simple: "The model aced the practice test but flunked the real one — it memorised instead of learning. Turn up the regularisation (lower C) so it generalises.",
    widget: W("Regularisation vs overfitting", "Training and validation accuracy as regularisation strength increases (C decreases).",
      "regularisation strength →", ["very weak", "weak", "moderate", "strong"],
      "validation accuracy", [71, 80, 86, 82], "Penalty strength",
      [{ max: 1, text: "Weak penalty: near-perfect training but poor validation — overfit.", tone: "info" },
       { max: 2, text: "Stronger shrinkage closes the gap and lifts validation accuracy.", tone: "info" },
       { max: 3, text: "🤯 Past the sweet spot, too much penalty underfits and validation dips again.", tone: "wow" }],
      { name: "Tuning regularisation C", formula: "big train-val gap → lower C (stronger penalty) to reduce variance", text: "Move C down to fight overfitting, but not so far that the model underfits." })
  });

  q("scen2", {
    q: "You only have 200 labelled documents and 5000 word features. A colleague warns that Naive Bayes 'wrongly assumes words are independent'. Should you still use it here, and why?",
    choices: [
      "Yes — the independence assumption is technically false but makes NB extremely low-variance, so it often beats richer models when data is scarce and features are many",
      "No — the assumption is false, so Naive Bayes is guaranteed to be less accurate than any model that models dependencies",
      "No — Naive Bayes cannot run when there are more features than documents",
      "Yes, but only because Naive Bayes secretly models word correlations under the hood",
      "No — with 200 documents you must use a deep neural network instead"
    ],
    explain: "Naive Bayes assumes features are conditionally independent given the class, which is clearly wrong for words (they co-occur), yet it works remarkably well in practice. By not trying to estimate feature interactions, it has very few parameters and very low variance, so it is hard to overfit — exactly what you want with only 200 documents and 5000 features. A model that tries to capture dependencies has far more parameters and will overfit that tiny sample. The 'wrong' assumption is a favourable bias/variance trade, not a dealbreaker.",
    simple: "Naive Bayes makes a lazy assumption that words don't interact, and that laziness keeps it from overreacting to a small dataset. Simple and slightly wrong often beats complex and starved for data.",
    widget: W("Wrong assumption, low variance", "Accuracy of Naive Bayes vs a dependency-modelling classifier as training data shrinks.",
      "training documents →", ["5000", "1000", "500", "200"],
      "Naive Bayes accuracy", [86, 84, 82, 80], "Data size",
      [{ max: 1, text: "With lots of data a richer model can match or beat NB.", tone: "info" },
       { max: 2, text: "As data shrinks, NB's low variance holds up while richer models overfit.", tone: "info" },
       { max: 3, text: "🤯 A model with a 'wrong' assumption can win precisely because it refuses to overfit.", tone: "wow" }],
      { name: "Independence assumption trade-off", formula: "scarce data + many features → NB's bias buys low variance", text: "Naive Bayes trades a false independence assumption for robustness when data is limited." })
  });

  q("scen2", {
    q: "Your Naive Bayes spam filter outputs P(spam). Marketing hates false positives (real mail in the spam box), but users hate missed spam. You can move the decision threshold. What is the trade-off you are tuning?",
    choices: [
      "Raising the threshold flags fewer emails as spam — higher precision, lower recall; lowering it does the reverse. Pick the point matching the cost of each error",
      "The threshold changes accuracy but has no effect on precision or recall",
      "A higher threshold increases both precision and recall at the same time",
      "The threshold only matters for k-NN, not for probabilistic models like Naive Bayes",
      "You should always use 0.5 because it is mathematically optimal for every application"
    ],
    explain: "Because Naive Bayes produces a probability, you convert it to a decision with a threshold. Raise the threshold and you only call something spam when very confident: fewer false positives (higher precision) but more spam slips through (lower recall). Lower it and you catch more spam (higher recall) at the cost of misfiling real mail (lower precision). The right threshold depends on the relative cost of the two errors — 0.5 is just a default, not universally optimal.",
    simple: "Set a high bar for 'spam' and you rarely trash a real email but let more junk through; set a low bar and you catch all junk but risk trashing good mail. Move the bar to match which mistake hurts more.",
    widget: W("Threshold moves precision vs recall", "Spam-class precision and recall as the decision threshold rises.",
      "threshold →", ["0.2", "0.4", "0.6", "0.8"],
      "recall (spam caught)", [95, 85, 68, 45], "Decision threshold",
      [{ max: 1, text: "Low threshold: nearly all spam caught, but more real mail misfiled.", tone: "info" },
       { max: 2, text: "Raising it trades recall for precision — fewer false positives.", tone: "info" },
       { max: 3, text: "🤯 One probability model gives many operating points — the threshold is a business dial, not a fixed 0.5.", tone: "wow" }],
      { name: "Threshold tuning", formula: "↑threshold → ↑precision, ↓recall (set by error costs)", text: "A probabilistic classifier lets you slide the threshold to trade precision against recall." })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "You add hundreds more features to your k-NN model expecting better accuracy, but it gets steadily worse. Every point now seems roughly equidistant from every other. What is going on?",
    choices: [
      "The curse of dimensionality — in very high dimensions distances concentrate, so 'nearest' neighbours are barely nearer than 'farthest', and k-NN loses its signal",
      "k-NN simply needs a larger k whenever you add features; raise k to fix it",
      "The extra features made the model overconfident, which always lowers accuracy",
      "More features always help k-NN, so the real problem must be a coding bug in the distance function",
      "The features must be perfectly correlated, which is the only way accuracy can drop"
    ],
    explain: "As dimensionality grows, points spread out and the distances between all pairs of points become increasingly similar — the ratio of nearest to farthest distance approaches 1. Since k-NN relies entirely on some points being meaningfully closer than others, this 'distance concentration' guts the notion of a neighbourhood and accuracy falls. Adding features (especially irrelevant ones) makes it worse, not better. The remedy is dimensionality reduction or feature selection, not a bigger k.",
    simple: "In a huge empty space, everything is far from everything, so 'nearest' stops meaning much. Piling on features can bury the signal instead of adding it.",
    widget: W("Curse of dimensionality", "Contrast between nearest and farthest neighbour distances as dimensions grow.",
      "number of features →", ["2", "10", "100", "1000"],
      "near-vs-far distance contrast", [90, 65, 30, 8], "Dimensionality",
      [{ max: 1, text: "In low dimensions the nearest point is clearly closer than the farthest.", tone: "info" },
       { max: 2, text: "As dimensions climb, that gap shrinks — neighbours blur together.", tone: "info" },
       { max: 3, text: "🤯 In very high dimensions nearest and farthest are almost the same distance — k-NN has nothing to grip.", tone: "wow" }],
      { name: "Curse of dimensionality", formula: "high dimensions → distances concentrate, k-NN degrades", text: "Reduce dimensions or select features before distance-based methods; more features can hurt." })
  });

  q("scen3", {
    q: "You fit your feature scaler (StandardScaler) on the ENTIRE dataset, then split into train and test, then run k-NN. Test accuracy looks great, but production is worse. What went wrong?",
    choices: [
      "Data leakage — the scaler learned means and standard deviations using the test rows, so test performance is optimistically biased; fit the scaler on train only",
      "k-NN cannot use scaled features, so the scaling itself corrupted the model",
      "The test set was simply too small; a larger test set would have matched production",
      "Scaling before splitting is the correct procedure, so the gap must be random noise",
      "You should have scaled after prediction, not before, to avoid distorting distances"
    ],
    explain: "Fitting the scaler on the whole dataset lets information from the test rows (their means and standard deviations) leak into the transformation applied to the training data, and the test set is no longer a clean stand-in for unseen data. That inflates your test score above what production will deliver. The correct pipeline fits the scaler on the training split only and then applies those fixed statistics to the test set — ideally inside a cross-validation pipeline so every fold is honest.",
    simple: "You peeked at the answer sheet when setting up the exam, so the exam looked easy. Fit preprocessing on training data alone, then apply it to the test data untouched.",
    widget: W("Preprocessing leakage", "Reported test accuracy vs true production accuracy under leaky vs clean scaling.",
      "pipeline →", ["scale then split (leaky)", "leaky, more folds", "fit on train only", "train-only in CV"],
      "gap between test and production", [22, 20, 4, 2], "Pipeline setup",
      [{ max: 1, text: "Scaling before the split lets test statistics bleed into training.", tone: "info" },
       { max: 2, text: "More folds do not help if the leak happens before splitting.", tone: "info" },
       { max: 3, text: "🤯 The model was fine — the evaluation lied. Fit transforms on train only.", tone: "wow" }],
      { name: "Preprocessing data leakage", formula: "fit scalers/encoders on train split only, never the full data", text: "Any transform learned from the test rows leaks information and inflates your score." })
  });

  q("scen3", {
    q: "Your logistic regression on a small clean dataset returns enormous coefficients (like +40) and a training accuracy of exactly 100%. Adding any regularisation changes the story a lot. What is the likely cause?",
    choices: [
      "Perfect (complete) separation — a feature or combination perfectly splits the classes, so unregularised coefficients diverge toward infinity; regularisation or more data fixes it",
      "The model found the true relationship exactly, so the huge coefficients are correct and should be kept",
      "Logistic regression cannot reach 100% training accuracy, so the labels must be corrupted",
      "The learning rate was too low, which always inflates coefficients",
      "The features are on different scales, which is the only thing that causes large coefficients"
    ],
    explain: "When a feature (or linear combination) perfectly separates the two classes, the likelihood keeps increasing as the coefficient grows without bound — the optimiser tries to push predicted probabilities to exactly 0 and 1, so coefficients blow up toward infinity and training accuracy hits 100%. This is 'perfect separation', and the huge coefficients are an artefact, not a real, stable signal (they will not generalise). Adding L2 regularisation or gathering more data caps the coefficients and restores a sensible fit.",
    simple: "If one line splits the classes flawlessly, the model keeps cranking its confidence to infinity chasing a perfect fit. Those giant coefficients are a red flag, not a triumph.",
    widget: W("Perfect separation blows up", "Size of the fitted coefficient as regularisation is removed under perfect separation.",
      "regularisation →", ["strong", "moderate", "weak", "none"],
      "coefficient magnitude", [8, 20, 55, 98], "Penalty strength",
      [{ max: 1, text: "With a real penalty the coefficient stays bounded and sensible.", tone: "info" },
       { max: 2, text: "As the penalty vanishes, the coefficient starts to run away.", tone: "info" },
       { max: 3, text: "🤯 With no penalty and separable data the coefficient diverges toward infinity — 100% train accuracy is the tell.", tone: "wow" }],
      { name: "Perfect separation", formula: "separable classes + no penalty → coefficients → infinity", text: "Diverging coefficients and 100% train accuracy mean separation; regularise or get more data." })
  });

  q("scen3", {
    q: "In a logistic regression you read the raw coefficients to rank feature importance. 'Loan amount' (in dollars) has coefficient 0.00002 and 'has prior default' (0/1) has coefficient 1.3. You conclude prior default matters vastly more. Why is that conclusion unsafe?",
    choices: [
      "The features are on different scales, so raw coefficients are not comparable — standardise the features (or use standardised coefficients) before ranking importance",
      "Coefficients can never be used for importance, so any ranking is meaningless",
      "A larger coefficient always means a less important feature, so you have it backwards",
      "Prior default is binary, and binary features are automatically the most important",
      "Loan amount has a tiny coefficient, which proves it is perfectly correlated with default"
    ],
    explain: "A coefficient's size depends on the units of its feature. 'Loan amount' spans thousands of dollars, so even a small per-dollar coefficient can move the log-odds a lot across its range, while a 0/1 feature only ever contributes its full coefficient once. Comparing 0.00002 with 1.3 directly mixes units and is meaningless. To rank importance fairly you standardise the features first (or look at the coefficient times the feature's standard deviation), which puts every effect on a per-standard-deviation basis.",
    simple: "One coefficient is 'per dollar' and the other is 'per yes/no' — comparing them is like comparing a price per gram to a price per truckload. Put them in the same units first.",
    widget: W("Unstandardised coefficients mislead", "Apparent vs true importance of 'loan amount' before and after standardising features.",
      "treatment →", ["raw coef", "raw, rounded", "x std-dev", "fully standardised"],
      "measured importance of loan amount", [3, 4, 55, 60], "Standardisation",
      [{ max: 1, text: "Raw, the per-dollar coefficient looks negligible next to a 0/1 feature.", tone: "info" },
       { max: 2, text: "Scaling by the feature's spread reveals its real influence.", tone: "info" },
       { max: 3, text: "🤯 A 'tiny' coefficient can dominate once you account for its feature's huge range.", tone: "wow" }],
      { name: "Standardised coefficients", formula: "compare coefficients only after putting features on one scale", text: "Never rank importance from raw coefficients when features have different units." })
  });

  q("scen3", {
    q: "You duplicate a strong predictor (accidentally including 'income' and 'income in thousands' as two columns) in a Naive Bayes model. The model becomes wildly over-confident and its accuracy drops. Why does this happen with Naive Bayes specifically?",
    choices: [
      "Naive Bayes assumes features are independent, so it counts the duplicated evidence twice, double-multiplying its probability and producing over-confident, distorted predictions",
      "Naive Bayes automatically detects and drops duplicate columns, so this cannot happen",
      "The duplication only slows training and has no effect on the probabilities",
      "Duplicating a feature always improves Naive Bayes by reinforcing the signal",
      "Naive Bayes fails only because duplicated features change the class priors"
    ],
    explain: "Naive Bayes multiplies the per-feature likelihoods under the assumption that they are independent given the class. Two copies of the same feature are perfectly correlated, so the model treats one piece of evidence as two independent votes and multiplies its effect twice, inflating confidence far beyond what the data supports. This over-counting skews the posterior toward whichever class the duplicated feature favours and can lower accuracy. Highly correlated features are exactly where the independence assumption bites, so de-duplicate or decorrelate before using NB.",
    simple: "Naive Bayes trusts each feature as an independent witness. Enter the same witness twice and it double-counts the testimony, becoming far too sure of itself.",
    widget: W("Correlated features break NB", "Naive Bayes over-confidence and error as a strong feature is duplicated more times.",
      "copies of the feature →", ["1 (correct)", "2", "3", "5"],
      "over-confidence / error", [15, 45, 68, 90], "Duplicate count",
      [{ max: 1, text: "With one copy the evidence is counted once, as intended.", tone: "info" },
       { max: 2, text: "Each duplicate multiplies the same evidence again — confidence inflates.", tone: "info" },
       { max: 3, text: "🤯 NB has no defence against correlated copies — it literally multiplies the duplicated evidence.", tone: "wow" }],
      { name: "Independence assumption violated", formula: "correlated/duplicated features → NB double-counts evidence", text: "Remove duplicated or highly correlated features before Naive Bayes, or it over-counts them." })
  });

  q("scen3", {
    q: "Your Naive Bayes classifier ranks documents beautifully (great AUC), so you use its P(class) numbers as literal risk probabilities in a downstream cost calculation. The costs come out wrong. What subtle issue did you miss?",
    choices: [
      "Naive Bayes probabilities are poorly calibrated — they are pushed toward 0 and 1, so they rank well but the values are not trustworthy; calibrate them or use ranking only",
      "Naive Bayes cannot rank documents, so the good AUC must be a measurement error",
      "AUC and calibration are the same thing, so good AUC guarantees good probabilities",
      "The probabilities are fine; the downstream cost formula must simply be buggy",
      "Naive Bayes probabilities are always exactly correct, so the data drifted instead"
    ],
    explain: "AUC only cares about the ordering of predictions, not their absolute values, so a model can rank cases perfectly while its probability estimates are far off. Naive Bayes is a classic example: because it multiplies many likelihoods under a false independence assumption, its outputs get squashed toward 0 and 1 and are systematically over-confident. Those numbers are fine for ranking or thresholding but wrong to plug into a cost calculation as true probabilities. Fix it with calibration (Platt scaling or isotonic regression) or use only the ranking.",
    simple: "Naive Bayes is great at ordering things but bad at saying how sure it really is — its 99% often should be 80%. Trust the ranking, not the raw number, unless you calibrate it.",
    widget: W("Good ranking, bad calibration", "Gap between Naive Bayes predicted probability and the true observed frequency.",
      "predicted probability band →", ["~0.5", "~0.7", "~0.9", "~0.99"],
      "over-confidence gap", [10, 30, 55, 80], "Confidence band",
      [{ max: 1, text: "Near 0.5 the estimates are roughly honest.", tone: "info" },
       { max: 2, text: "As NB grows confident, the predicted probability overshoots reality.", tone: "info" },
       { max: 3, text: "🤯 A model can ace AUC yet be badly miscalibrated — ranking and probability are different skills.", tone: "wow" }],
      { name: "Calibration vs ranking", formula: "great AUC does NOT imply trustworthy probabilities", text: "Naive Bayes ranks well but needs calibration before its probabilities can be used as values." })
  });
})();
