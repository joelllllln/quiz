/* Support Vector Machines — Part III: Advanced Study. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).svm3 = [

{
  q: "SVM trains on HINGE loss; logistic regression on log loss. Both punish mistakes — but hinge has a flat zero region that log loss lacks. What does that flat region buy the SVM?",
  choices: ["Points comfortably beyond the margin contribute EXACTLY zero loss — so the solution depends only on the few boundary-region points (the support vectors), giving sparse, boundary-focused models", "Faster convergence on all datasets", "Immunity to outliers everywhere", "Probabilistic outputs for free", "Nothing — the losses are equivalent"],
  explain: "Hinge loss = max(0, 1 − margin): once a point clears the margin by any amount, its loss — and its gradient — is exactly 0; it could move or vanish without changing the optimum. Log loss never reaches zero: every point, however deep in safe territory, keeps pulling the boundary slightly. Consequences: SVM solutions are sparse (only support vectors matter — memory and kernel-evaluation savings), fixated on the boundary region; logistic solutions feel all the data and natively produce calibrated probabilities. Neither is 'better' — they encode different priorities: decision geometry vs probability estimation.",
  simple: "Two teachers grading a class. The hinge teacher only cares about students near the pass/fail line: anyone safely passing is ignored completely — zero attention, zero influence. The log-loss teacher never stops caring: even the star student gets a tiny nudge toward 'even more correct'. So the hinge teacher's entire policy is determined by a handful of borderline students (the support vectors) — compact and focused; the log-loss teacher's policy reflects everyone — smoother, and it can tell you HOW confident it is about each student. Choose the teacher by what you need: a crisp boundary, or honest probabilities.",
  widget: {
    type: "curveStatic", title: "The teacher who ignores safe students",
    world: "Loss contributed by one training point as its distance from the boundary grows (positive = correct side). Compare what each loss still cares about.",
    xlab: "point's margin (distance, correct side +) →", xs: [0,1,2,3,4,5], labels: ["−1","0","+0.5","+1","+2","+4"], dec: 2, yunit: "",
    series: [
      { name: "hinge loss (SVM)", ys: [2, 1, 0.5, 0, 0, 0] },
      { name: "log loss (logistic)", ys: [1.31, 0.69, 0.47, 0.31, 0.13, 0.02] }
    ],
    knob: { label: "Point's margin", min: 0, max: 5, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Wrong side or on the boundary: both losses punish hard, roughly alike. Mistakes are mistakes in any religion.", tone: "info" },
      { max: 3, text: "At margin +1, hinge hits EXACTLY zero and stays there — this point is now invisible to the SVM. Log loss still reads 0.31: logistic never stops listening.", tone: "info" },
      { max: 5, text: "🤯 At margin +4: hinge 0, log loss 0.02 — still gently pulling. Sum over 100k points and that difference is structural: the SVM's answer is written by ~2% of the data (the support vectors); logistic's by all of it. Sparsity, boundary-focus, and the lack of native probabilities — all three SVM signatures trace back to this one flat region.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Hinge vs log loss", formula: "hinge: max(0, 1−m) → zero beyond margin → sparse SV solution · log: log(1+e^−m) → everyone matters",
      text: "The loss function IS the model's personality. Hinge buys geometry and sparsity; log buys probabilities and smoothness. Squared hinge, Huber and friends interpolate." }
  }
},

{
  q: "You call predict_proba on sklearn's SVC and it works — but only because probability=True ran something extra at fit time. What is that machinery, and what should you know before trusting it?",
  choices: ["Platt scaling: an internal cross-validated logistic regression is fitted to map SVM decision scores → probabilities — it costs extra training time and the calibration is approximate, so validate before betting on it", "The SVM natively outputs probabilities like logistic regression", "Scores are min-max squashed to [0,1]", "It averages the two nearest support vectors' labels", "predict_proba on SVC is a deprecated alias for predict"],
  explain: "SVMs output a decision value (signed distance-ish score), not a probability — hinge loss never models P(y|x). Platt's fix: hold out folds internally (5-fold by default), collect decision scores, fit a 1-D logistic curve score→probability, and use it at predict time. Caveats: ~5× fit cost; the sigmoid shape is an assumption (isotonic calibration is more flexible given data); probabilities can even be inconsistent with predict at the margin. If probabilities are the product, consider logistic regression or proper CalibratedClassifierCV; if you just need ROC/ranking, decision_function alone suffices — no probability=True needed.",
  simple: "The SVM speaks in 'how far are you from my boundary' — a score with no percentage meaning. Platt scaling hires a small translator after the fact: it watches held-out examples ('score +2.1 → those turned out positive 90% of the time…') and fits a smooth score-to-percentage curve. It works, but know what you bought: the translator was trained on limited data with an assumed curve shape, training got several times slower, and the translation can subtly disagree with the SVM's own verdicts near the line. Need probabilities as a first-class product? Maybe hire a model that speaks probability natively.",
  widget: {
    type: "curveStatic", title: "Hiring a translator",
    world: "SVM decision scores on held-out data vs the observed positive rate at each score — with Platt's fitted sigmoid overlaid. See what the translator captures, and where it strains.",
    xlab: "SVM decision score →", xs: [0,1,2,3,4], labels: ["−2","−1","0","+1","+2"], dec: 0, yunit: "%",
    series: [
      { name: "observed positive rate", ys: [4, 18, 52, 79, 97] },
      { name: "Platt sigmoid's estimate", ys: [5, 21, 50, 79, 95] }
    ],
    knob: { label: "Decision score", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Score −2: only 4% of such cases were truly positive; Platt says 5%. The translator learned this from internal held-out folds — data the SVM didn't train on, at real extra cost.", tone: "info" },
      { max: 2, text: "Score 0 (on the boundary): observed 52%, Platt 50%. Sensible — but note predict() flips classes exactly here while predict_proba can straddle 50% slightly differently: the famous SVC inconsistency.", tone: "info" },
      { max: 4, text: "🤯 The fit is decent because this data happens to be sigmoid-shaped — Platt ASSUMES that shape. On weirder score distributions the assumption bends the truth, and isotonic calibration (shape-free, data-hungry) does better. Probabilities from an SVM are a retrofit: usable, never native. Check the calibration curve before you bill them as real.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Platt scaling (probability=True)", formula: "internal CV → fit sigmoid: P(y|score) = 1/(1+e^{As+B})",
      text: "For ranking/ROC, use decision_function (free). For serious probabilities: CalibratedClassifierCV(svc, method='isotonic') or a natively probabilistic model." }
  }
},

{
  q: "sklearn's SVC handles a 10-class problem by silently training 45 binary models — one-vs-one — while most other classifiers use one-vs-rest or native multiclass. Why does the SVM world prefer OvO?",
  choices: ["Kernel SVM cost grows steeply (superlinearly) with n — 45 SMALL two-class problems on ~1/5 of the data each train faster than 10 BIG all-data problems, and each subproblem stays cleanly separable", "OvO is more accurate for all classifiers", "One-vs-rest is patented", "OvO needs no kernel", "Because 45 is fewer models than 10"],
  explain: "Kernel SVM training scales roughly O(n²)–O(n³): data size is the enemy. OvR trains 10 models, each on ALL n rows. OvO trains k(k−1)/2 = 45 models, but each sees only the two classes involved (~n/5 of the rows for balanced 10-class data) — and (n/5)² is 1/25 the work, times 45 models ≈ still cheaper than 10 full-size fits. Bonus: 'class 3 vs class 7' is a cleaner, more separable problem than 'class 3 vs a 9-class soup', so subproblems need fewer support vectors. Prediction aggregates 45 votes. libsvm (inside SVC) bakes OvO in; LinearSVC, with linear-time solvers, happily uses OvR instead — the choice tracks the COST MODEL, not ideology.",
  simple: "The SVM's training bill grows viciously with class size — double the data, quadruple-or-worse the cost. So one giant match ('cats vs everyone-else', using every row) is exactly the wrong shape for it. Better: many tiny duels — cat vs dog, cat vs fox… Each duel uses only the two duellists' data (a fifth of the rows), and small² is TINY. Forty-five tiny duels total less than ten giant melees. And a duel is cleaner to referee than a melee: 'cat vs dog' has a crisp boundary; 'cat vs everything' is a mess. At prediction time the 45 duel-winners vote. Cost model dictates tournament format.",
  widget: {
    type: "curveStatic", title: "Duels beat melees",
    world: "Total training cost for OvO vs OvR with kernel SVC as class count grows (balanced classes, fixed total rows). The quadratic cost per fit is what bends these curves.",
    xlab: "number of classes →", xs: [0,1,2,3,4], labels: ["2","5","10","20","50"], dec: 0, yunit: "",
    series: [
      { name: "OvR: k full-data fits (cost)", ys: [10, 50, 100, 200, 500] },
      { name: "OvO: k(k−1)/2 small fits (cost)", ys: [10, 16, 18, 19, 20] }
    ],
    knob: { label: "Classes", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Two classes: OvO and OvR are literally the same one model. The schemes only diverge as classes multiply.", tone: "info" },
      { max: 2, text: "Ten classes: OvR pays for 10 full-size quadratic fits (cost 100); OvO's 45 duels each use ~1/5 the data → (1/5)² the cost each → total ≈ 18. The duel count grew; the bill barely did.", tone: "info" },
      { max: 4, text: "🤯 Fifty classes: 1,225 duels still cost ~25× less than 50 melees. Quadratic cost per fit makes MANY-SMALL beat FEW-LARGE — the whole story in one inequality: 45·(n/5)² ≪ 10·n². For LINEAR SVMs the cost is linear and the logic flips back to OvR. Architecture follows arithmetic.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "One-vs-one multiclass SVM", formula: "k(k−1)/2 pairwise duels, each on 2 classes' data · predict by voting",
      text: "SVC: OvO (libsvm's choice); LinearSVC: OvR (linear solvers scale linearly). decision_function_shape='ovr' only reshapes the output — training stays OvO." }
  }
},

{
  q: "Kernel SVC was your best model at 30k rows; at 3M rows training would take weeks. Which escape routes keep (most of) the kernel magic at linear cost?",
  choices: ["Kernel approximation — map data through Nystroem/random Fourier features into an explicit feature space, then train a LINEAR SVM/SGD on it: near-kernel accuracy at linear-time cost", "There is none; kernel SVMs are mandatory at every scale", "Reduce to 2 dimensions with PCA and use kernel SVC", "Switch the kernel from RBF to polynomial", "Raise C until training accelerates"],
  explain: "Exact kernel methods carry an n×n Gram matrix — 3M rows means ~36 TB: hopeless. But Bochner's theorem lets the RBF kernel be approximated by an explicit random map: sample D random frequencies, transform each row to D cosine features (random Fourier features; Nystroem uses landmark points instead), and a linear model on those features approximates the kernel machine — error shrinking as D grows. Pipeline: RBFSampler/Nystroem → LinearSVC/SGDClassifier: linear in n, streamable, GPU-friendly. This 'make the implicit map explicit, then go linear' idea is a workhorse — and conceptually, it's what neural networks do with LEARNED (rather than random) feature maps.",
  simple: "The kernel trick's luxury was never computing the fancy feature space — but the bill for that luxury is comparing every row with every row: fatal at millions. The escape inverts the trick: DO build the fancy space, just approximately — a few thousand random 'texture detector' features per row — and then run a cheap linear model there. You trade a sliver of the kernel's exactness for linear-time training that streams and scales. Beyond that lies the modern ending: let the model LEARN its feature detectors instead of sampling them at random — at which point you've reinvented the neural network.",
  widget: {
    type: "curveStatic", title: "Make the map explicit, then go linear",
    world: "Accuracy vs number of random Fourier features (linear pipeline), with exact kernel SVC and plain linear SVM as reference lines — plus what each can actually TRAIN at 3M rows.",
    xlab: "random features D →", xs: [0,1,2,3,4], labels: ["100","500","2k","10k","50k"], dec: 1, yunit: "%",
    series: [
      { name: "RFF + linear (trains in minutes)", ys: [84.5, 88, 90.5, 91.8, 92.3] },
      { name: "exact kernel SVC (untrainable at 3M)", ys: [92.6, 92.6, 92.6, 92.6, 92.6] },
      { name: "plain linear SVM", ys: [83, 83, 83, 83, 83] }
    ],
    knob: { label: "Random features", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "D=100: already +1.5 over plain linear — a hundred random texture-features capture a sketch of the kernel geometry.", tone: "info" },
      { max: 2, text: "D=2,000: within 2 points of the exact kernel — which, at 3M rows, exists only as a dashed line of theory (its Gram matrix wouldn't fit in a data centre).", tone: "info" },
      { max: 4, text: "🤯 D=50k: 92.3 vs the unreachable 92.6, trained in minutes with SGD. The approximation didn't beat the kernel — it beat the WALL. And the idea's final form is the neural net: same pipeline, but the feature map is learned instead of random.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Kernel approximation (RFF / Nystroem)", formula: "explicit random map ≈ kernel space → linear model at O(n·D)",
      text: "sklearn: Nystroem or RBFSampler → LinearSVC/SGDClassifier in a Pipeline. The standard kernel-SVM exit ramp beyond ~100k rows." }
  }
},

{
  q: "A factory has thousands of recordings of NORMAL machine sound and almost no failure examples. One-class SVM is built for this. What does it learn, having only seen one class?",
  choices: ["A boundary enclosing the normal data's region in (kernel) feature space — new points falling OUTSIDE are flagged as anomalies; nu sets the fraction allowed outside", "A classifier between normal and a synthetic fake class", "The mean recording, flagging anything different", "It cannot learn from one class", "A compression codec for audio"],
  explain: "One-class SVM (Schölkopf) reposes the SVM machinery as boundary ESTIMATION: in the kernel feature space it separates the data from the origin with maximum margin (equivalently, fits a tight region — with RBF, flexible closed contours — around the training mass). nu ∈ (0,1] is a certified knob: an upper bound on the fraction of training points outside the region (outliers tolerated) and lower bound on the fraction of support vectors. Decision: inside → normal, outside → anomaly. Same family as Isolation Forest and PCA reconstruction error; the SVM variant shines when the normal region has curved, kernel-describable shape.",
  simple: "You can't train a burglar-detector on burglars you've never seen — but you can survey your own house so thoroughly that anything out of place screams. One-class SVM draws the tightest sensible fence around 'what normal looks like', with a tolerance dial: 'let ~5% of even my normal recordings fall outside, so the fence doesn't stretch to enclose every freak squeak'. From then on, the question isn't 'which class?' but 'inside or outside the fence?'. Failures you've never encountered — brand-new noises included — get flagged simply for being off the map of normal.",
  widget: {
    type: "curveStatic", title: "Fencing the map of normal",
    world: "One-class SVM on machine sounds: sweep nu (the tolerated-outlier fraction) and watch the fence tighten — normal recordings flagged vs true failures caught (scored on rare labelled failures).",
    xlab: "nu (fraction allowed outside) →", xs: [0,1,2,3,4], labels: ["0.01","0.05","0.10","0.25","0.50"], dec: 0, yunit: "%",
    series: [
      { name: "true failures caught", ys: [58, 84, 91, 96, 99] },
      { name: "normal flagged (false alarms)", ys: [1, 5, 10, 25, 50] }
    ],
    knob: { label: "nu", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "nu=0.01: the fence stretches to enclose 99% of training sounds — including its freak squeaks — so real failures slip inside too: only 58% caught.", tone: "warn" },
      { max: 1, text: "nu=0.05: the fence releases the weird 5% of normal, tightening around the true core — failures caught jumps to 84% at 5% false alarms. Note nu ≈ the false-alarm rate: that's its certificate.", tone: "info" },
      { max: 4, text: "🤯 nu=0.5: catches 99% of failures by suspecting HALF of normal operation — a fire alarm that cries wolf hourly. nu is not a sensitivity hack; it's a declared budget of tolerated normal-flags. Set it from the cost of an alarm, then let the fence follow.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "One-class SVM", formula: "enclose the normal mass in kernel space · nu bounds the outside-fraction",
      text: "sklearn: OneClassSVM(kernel='rbf', nu=0.05). Siblings: IsolationForest (faster, big data), PCA reconstruction error (linear normality). Novelty detection = learning ONE class's shape." }
  }
},

{
  q: "RBF-SVM tuning is a two-knob game: C (violation cost) and gamma (influence reach). The standard play is a log-scale grid. What does the resulting heat-map landscape teach about how the knobs interact?",
  choices: ["They compensate each other along a diagonal ridge of good models — high-gamma-high-C corners memorise, low-low corners underfit, and the ridge means you tune them JOINTLY on log scales, never one at a time", "C and gamma are independent; tune separately", "Only C matters in practice", "gamma should always equal 1/C", "The landscape is random noise between seeds"],
  explain: "Both knobs control capacity by different routes: gamma sets the kernel's locality (big gamma → tight influence bubbles → wiggly boundaries), C sets violation tolerance (big C → every training point must be honoured). Their effects partially trade: a bit more smoothing-by-small-gamma can be offset by more insistence-via-large-C, producing a diagonal ridge of near-equivalent good models in log-log space — with overfit (top-right) and underfit (bottom-left) plateaus flanking it. Practical protocol: coarse log grid (C: 0.01→1000, gamma: 1e-4→10), find the ridge, refine along it; fixing one knob first can strand you off-ridge entirely.",
  simple: "Two volume dials on one amplifier: 'how local is each point's influence' (gamma) and 'how strictly must training points be obeyed' (C). Crank both — every training point becomes a loud little dictator: memorisation. Mute both — a smooth boundary that ignores everyone: underfit. In between runs a diagonal SEAM of good settings, where a bit more of one dial balances a bit less of the other. That seam is why tuning one dial 'first' fails: the best C depends on which gamma you're standing at. Search the plane, on multiplicative (log) steps — the seam lives across orders of magnitude.",
  widget: {
    type: "curveStatic", title: "Walking the ridge",
    world: "Validation accuracy along three horizontal slices of the (C, gamma) log-grid heat-map — low, medium and high gamma rows. Watch the best C SHIFT as gamma changes: that shift IS the ridge.",
    xlab: "C (log scale) →", xs: [0,1,2,3,4], labels: ["0.01","0.1","1","10","100"], dec: 0, yunit: "%",
    series: [
      { name: "gamma = 0.001 (broad)", ys: [61, 72, 83, 89, 91] },
      { name: "gamma = 0.1 (medium)", ys: [70, 84, 91, 89, 84] },
      { name: "gamma = 10 (tight bubbles)", ys: [77, 82, 76, 68, 62] }
    ],
    knob: { label: "C", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "At small C every row underfits — but note who's least bad: tight-gamma (77), whose local bubbles carry some signal even when violations are cheap.", tone: "info" },
      { max: 2, text: "C=1: medium gamma peaks (91). Broad gamma wants MORE C (still climbing), tight gamma is already declining — three rows, three different best-C values. That's the diagonal ridge, sliced.", tone: "info" },
      { max: 4, text: "🤯 C=100: broad gamma finally peaks at 91 — matching medium-gamma-at-C=1. Two settings, orders of magnitude apart, same performance: you walked along the ridge. Tune the pair jointly on log grids; any 'fix gamma, then tune C' shortcut gambles on having guessed the right row.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The (C, gamma) landscape", formula: "capacity ridge in log-log space: locality (gamma) trades against strictness (C)",
      text: "Protocol: GridSearchCV over log grids, heat-map the scores, refine along the ridge. Default gamma='scale' lands near the ridge for scaled features — scale first, always." }
  }
}
];
