/* Support Vector Machines — Part II: Practice. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).svm2 = [

{
  q: "Mapping data into a rich feature space could mean computing millions of new features per point. The kernel TRICK avoids that how?",
  choices: ["Kernels compute the mapped-space similarity directly, without ever building the features", "By sampling only 1% of the new features", "By caching the features on disk", "By using fewer support vectors", "By mapping only the support vectors"],
  explain: "SVM training only ever needs DOT PRODUCTS between mapped points. A kernel function K(a,b) returns exactly that number straight from the original features — the giant feature vectors never exist.",
  simple: "You don't need the two mapped points — only how similar they'd be. The kernel is a shortcut formula for that similarity. Like knowing two people's compatibility score without writing out their million-line biographies first.",
  widget: {
    type: "curveStatic", title: "The shortcut vs the long way",
    world: "Cost of one similarity computation as the mapped space grows: explicitly building the features, versus the kernel shortcut. Slide the richness of the space.",
    xlab: "mapped-space size", xs: [0,1,2,3,4], labels: ["10²","10⁴","10⁶","10⁹","infinite (RBF)"], dec: 1, yunit: " µs",
    series: [
      { name: "explicit mapping", ys: [0.1,10,1000,1000000,999999999] },
      { name: "kernel shortcut", ys: [0.1,0.1,0.1,0.1,0.1] }
    ],
    knob: { label: "Mapped-space size", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Small mapped spaces: computing the features explicitly is fine. The trick isn't needed — yet.", tone: "info" },
      { max: 3, text: "The explicit route explodes with the space; the kernel's cost never moves — it works on the ORIGINAL features and just returns the mapped-space answer.", tone: "info" },
      { max: 4, text: "🤯 The RBF kernel corresponds to an INFINITE-dimensional space — impossible to build explicitly, trivial via the shortcut. That's why it's called a trick: you use a space you could never construct.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The kernel trick", formula: "K(a, b) = φ(a)·φ(b), computed without φ — e.g. RBF: K = e^(−γ‖a−b‖²)",
      text: "The algorithm only consumes similarities, so swap the similarity function and you swap the geometry — for free." }
  }
},

{
  q: "You must choose between a polynomial kernel and RBF for a new problem. What's the practical guidance?",
  choices: ["RBF is the robust default; polynomial suits known interaction structure and needs careful degree tuning", "Polynomial is always more accurate", "RBF only works on images", "Polynomial needs no hyperparameters", "They are mathematically identical"],
  explain: "RBF handles smooth local structure with one main knob (gamma) and degrades gracefully. Polynomial kernels shine when feature interactions of a known order matter, but high degrees explode and destabilise.",
  simple: "RBF is the all-terrain tyre: grips almost anything with one pressure dial. Polynomial is the racing slick: superb on exactly the right track (real interaction effects of degree 2–3), twitchy everywhere else. When unsure, start all-terrain.",
  widget: {
    type: "curveStatic", title: "Two kernels, one bake-off",
    world: "Cross-validated accuracy on a typical tabular problem across kernel choices. Slide through the candidates — including the polynomial degrees people regret.",
    xlab: "kernel", xs: [0,1,2,3,4], labels: ["linear","poly d=2","poly d=3","poly d=8","RBF (tuned)"], dec: 1, yunit: "%",
    series: [
      { name: "cross-validated accuracy", ys: [84,88,87.5,74,89.5] }
    ],
    knob: { label: "Kernel", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "Linear: the honest baseline. If this is close to the best, stop — you don't need kernels at all.", tone: "info" },
      { max: 2, text: "Degree 2–3 polynomials: solid when pairwise/triple interactions are real. Past that…", tone: "info" },
      { max: 3, text: "🤯 Degree 8: accuracy collapses — the kernel is fitting wild high-order wiggles no data could support. High-degree polynomials are almost always a trap.", tone: "wow" },
      { max: 4, text: "Tuned RBF edges out everything: flexible, local, forgiving. Hence the default advice: linear first, then RBF, polynomial only with a reason.", tone: "info" }
    ],
    extreme: { at: 3 },
    reveal: { name: "Kernel selection", formula: "try linear → RBF(γ, C) → poly (d ≤ 3) only with domain justification",
      text: "Kernel choice is a hyperparameter like any other: sweep it under cross-validation, but let this ordering set your priors." }
  }
},

{
  q: "An RBF-SVM's decision score for a new point is really a weighted sum of similarities to the support vectors. Which earlier algorithm does that make it resemble?",
  choices: ["A weighted nearest-neighbour vote — but over support vectors only", "A decision tree over the SVs", "Naive Bayes with priors", "Plain linear regression", "K-means clustering"],
  explain: "RBF similarity decays with distance, so nearby support vectors dominate the sum — exactly the flavour of distance-weighted KNN, except the 'neighbours' are the handful of learned support vectors, each with a learned weight.",
  simple: "Under the hood, an RBF-SVM asks: 'which support vectors is this new point close to, and what do THEY say?' — closer ones shout louder. That's KNN's soul, wearing an optimised suit: fewer, smarter reference points with learned voting power.",
  widget: {
    type: "voteWeight", title: "Old friend, new suit",
    world: "A new point and five support vectors at various distances. The knob plays the role of gamma: how fast similarity dies with distance. Watch a familiar dynamic unfold.",
    classes: ["Class A", "Class B"],
    neighbors: [
      { name: "SV₁ (near)", d: 0.6, c: 0 },
      { name: "SV₂", d: 1.2, c: 0 },
      { name: "SV₃", d: 2.2, c: 1 },
      { name: "SV₄", d: 2.6, c: 1 },
      { name: "SV₅ (far)", d: 3.2, c: 1 }
    ],
    knob: { label: "How fast similarity fades (≈ gamma)", min: 0, max: 4, step: 0.1, init: 0 },
    insights: [
      { max: 0.5, text: "Low gamma: every support vector's opinion carries far — the verdict is global, smooth, almost linear.", tone: "info" },
      { max: 2, text: "Rising gamma: the nearby SVs take over the vote. This is the same closeness-weighted dynamic you tuned in weighted KNN.", tone: "info" },
      { max: 4, text: "🤯 High gamma: only the nearest SV matters — 1-NN behaviour, and the overfitting that comes with it. Gamma in RBF-SVMs and weighting in KNN are the same dial in different machines.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "RBF-SVM ≈ weighted prototypes", formula: "score(x) = Σ αᵢ·yᵢ·e^(−γ‖x−SVᵢ‖²) + b",
      text: "The deep connection: kernel machines are similarity-voting machines. Understanding KNN was secretly preparation for understanding SVMs." }
  }
},

{
  q: "Tuning an RBF-SVM, you sweep gamma with C fixed — results look random. Colleagues say to sweep both together. Why?",
  choices: ["C and gamma interact — each gamma has a different best C, so tune them as a grid", "Gamma only matters for linear kernels", "C is learned automatically from gamma", "Sweeping both doubles the accuracy", "They're the same parameter renamed"],
  explain: "Gamma sets local flexibility; C sets violation tolerance. A wiggly (high-gamma) boundary needs a different discipline level than a smooth one — the optimum lives on a diagonal ridge in the (C, gamma) plane, invisible to one-dimensional sweeps.",
  simple: "It's like seasoning: the right amount of salt depends on how much lemon you added. Tasting salt levels while the lemon is wrong tells you nothing. C and gamma are salt and lemon — adjust them together, on a grid.",
  widget: {
    type: "curveStatic", title: "The moving optimum",
    world: "Validation accuracy across gamma, plotted twice: once with C = 1, once with C = 100. Watch the best gamma MOVE when C changes — that's interaction.",
    xlab: "gamma →", xs: [0,1,2,3,4], labels: ["0.01","0.1","0.5","2","10"], dec: 1, yunit: "%",
    series: [
      { name: "with C = 1", ys: [82,88,86,80,72] },
      { name: "with C = 100", ys: [78,84,89,87,76] }
    ],
    knob: { label: "gamma", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "With C = 1, gamma 0.1 looks best. Sweep done? Not so fast…", tone: "info" },
      { max: 2, text: "🤯 With C = 100 the winner moves to gamma 0.5 — and beats everything the C = 1 sweep ever saw. A 1-D sweep would have shipped the wrong model.", tone: "wow" },
      { max: 4, text: "The optimum lives on a ridge across the (C, γ) plane. Standard practice: a log-scale grid over both, cross-validated — exactly what GridSearchCV is for.", tone: "info" }
    ],
    extreme: { at: 2 },
    reveal: { name: "C–gamma interaction", formula: "grid-search C ∈ 10^[−2..3] × γ ∈ 10^[−3..1], with CV",
      text: "Interacting hyperparameters must be tuned jointly. C and gamma are the canonical example — log-scale grids are their natural habitat." }
  }
},

{
  q: "SVMs are inherently two-class machines. Your problem has 5 classes. What do libraries actually do?",
  choices: ["Train several binary SVMs (one-vs-rest or one-vs-one) and combine their verdicts", "Refuse — SVMs cannot do multi-class", "Add classes as extra features", "Use one SVM with five thresholds", "Convert the labels to numbers and regress"],
  explain: "One-vs-rest trains K classifiers ('class k or not?'); one-vs-one trains K(K−1)/2 pairwise duels and lets them vote. sklearn's SVC quietly runs one-vs-one under the hood.",
  simple: "A margin separates exactly two crowds, so multi-class SVM is a tournament of two-crowd matches: either each class against 'everyone else' (5 matches), or every pair head-to-head (10 duels), with the verdicts combined. You never see it — the library referees automatically.",
  widget: {
    type: "curveStatic", title: "The tournament's bill",
    world: "How many binary SVMs get trained under each scheme as the class count grows. Slide the classes up and watch one curve get expensive.",
    xlab: "number of classes", xs: [0,1,2,3,4], labels: ["2","3","5","10","20"], dec: 0, yunit: " models",
    series: [
      { name: "one-vs-one duels", ys: [1,3,10,45,190] },
      { name: "one-vs-rest models", ys: [2,3,5,10,20] }
    ],
    knob: { label: "Classes", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Few classes: the two schemes cost about the same. OvO's duels are each tiny (two classes' data only), which often makes them FASTER despite the count.", tone: "info" },
      { max: 3, text: "Ten classes: 45 duels vs 10 rest-models. OvO's count grows quadratically — but each duel trains on a fraction of the data.", tone: "info" },
      { max: 4, text: "🤯 Twenty classes: 190 duels. The trade: many small models (OvO, kernel-friendly) vs few big ones (OvR, linear-friendly). sklearn picks OvO for SVC, OvR for LinearSVC — now you know why.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Multi-class via binary SVMs", formula: "OvR: K models · OvO: K(K−1)/2 duels, majority of duels wins",
      text: "A general pattern beyond SVMs: any binary-only method scales to multi-class by tournament. The scheme is one more (usually hidden) hyperparameter." }
  }
},

{
  q: "Your SVM outputs decision scores like +1.73, but the fraud team demands calibrated probabilities. What's the standard fix?",
  choices: ["Fit a small calibration model (Platt scaling / isotonic) mapping scores to probabilities on held-out data", "Divide the scores by their maximum", "Add 0.5 to every score", "Read scores as percentages directly", "Retrain with more support vectors"],
  explain: "SVM margins aren't probabilities — they're distances. Platt scaling fits a sigmoid from score to observed frequency on validation folds (probability=True in sklearn does this); isotonic regression is the non-parametric alternative.",
  simple: "The SVM speaks in metres-from-the-boundary; the business speaks in percent. Calibration is the translation dictionary, learned from data: 'historically, points at +1.7 turned out positive 91% of the time'. A tiny second model does the translating.",
  widget: {
    type: "curveStatic", title: "Learning the translation",
    world: "Group validation points by their SVM score and check how often each group was ACTUALLY positive. The calibration curve learns exactly that mapping. Slide across score bins.",
    xlab: "SVM decision score", xs: [0,1,2,3,4,5,6], labels: ["−3","−2","−1","0","+1","+2","+3"], dec: 0, yunit: "%",
    series: [
      { name: "actually positive (observed)", ys: [2,7,22,50,78,93,98] },
      { name: "calibrated probability", ys: [3,8,21,50,79,92,97] }
    ],
    knob: { label: "Score bin", min: 0, max: 6, step: 1, init: 3 },
    insights: [
      { max: 1, text: "Deeply negative scores: those points were positive only ~2–7% of the time. The mapping from score to frequency is real and learnable.", tone: "info" },
      { max: 4, text: "Score 0 (the boundary) ↔ 50% — as geometry suggests. Either side, the fitted sigmoid tracks the observed frequencies closely.", tone: "info" },
      { max: 6, text: "🤯 The dictionary in hand, '+1.73' becomes '≈88%', and the fraud team can do cost math. One small calibration model bought probabilistic superpowers for a non-probabilistic machine.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Probability calibration (Platt / isotonic)", formula: "fit p = sigmoid(a·score + b) on held-out folds — sklearn: probability=True or CalibratedClassifierCV",
      text: "Calibrate on data the SVM didn't train on, or the dictionary inherits training overconfidence — the leakage rule follows you everywhere." }
  }
},

{
  q: "Fraud is 2% of the data, and your SVM's boundary parks itself so deep in fraud territory that it flags almost nothing. Which built-in remedy targets this directly?",
  choices: ["class_weight — make margin violations on the rare class cost more", "A polynomial kernel", "A larger test set", "Removing the majority class", "A smaller gamma"],
  explain: "With equal violation costs, sacrificing a few rare-class points buys a comfortable margin around the majority — so the optimiser does exactly that. class_weight='balanced' scales C per class, making rare-class violations expensive.",
  simple: "The optimiser is an accountant: 98 cheap majority points versus 2 'equally cheap' fraud points — guess who gets sacrificed for a tidier street. Raise the price of trampling fraud points (class weights) and the street repositions itself to respect them.",
  widget: {
    type: "marginSVM", title: "The boundary that bullies the minority",
    world: "Seven majority points (left), three minority points (right). Slide the boundary and notice how tempting it is to crowd the minority — then imagine each minority point costing 10× to violate.",
    classes: ["Legit", "Fraud"], xlab: "risk score", ylab: "",
    points: [{x:0.8,y:2.5,c:0},{x:1.5,y:5.5,c:0},{x:2.2,y:3.8,c:0},{x:2.9,y:7,c:0},{x:3.5,y:2,c:0},{x:4.1,y:5,c:0},{x:4.7,y:6.6,c:0},{x:7.2,y:3.5,c:1},{x:8,y:6,c:1},{x:8.8,y:4.5,c:1}],
    knob: { label: "Boundary position", min: 0.5, max: 10, step: 0.1, init: 6.9 },
    insights: [
      { max: 6.5, text: "Positions near the majority: the street respects the seven legit points and gives fraud room too. But note the margin math barely rewards this…", tone: "info" },
      { max: 8, text: "Crowding the fraud cluster: the majority gets a boulevard, the minority gets a kerb. With EQUAL violation costs this is what optimisation quietly prefers.", tone: "warn" },
      { max: 10, text: "🤯 With class_weight = {fraud: 10}, every step toward the fraud points would cost tenfold — the optimum snaps back toward the middle. Weights rebalance the geometry itself, before any threshold games.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "class_weight in SVMs", formula: "C_k = C × weight_k — 'balanced' sets weight ∝ 1/class frequency",
      text: "Imbalance fixes at the loss level, SVM edition. Same principle you saw for logistic regression and boosting: change the prices, change the behaviour." }
  }
},

{
  q: "Support vector REGRESSION (SVR) flips the idea: instead of a street separating classes, it fits a tube around a curve. Which points become its support vectors?",
  choices: ["Points on or outside the tube — everything comfortably inside it costs nothing", "Every training point equally", "Only the point with the largest error", "The points closest to the mean", "Random points, one per region"],
  explain: "SVR's epsilon-tube declares small errors free: points inside contribute nothing and aren't support vectors. Only points touching or violating the tube shape the model — sparsity, regression edition.",
  simple: "SVR says: 'predictions within ±ε of the truth are close enough — I refuse to fuss over them.' Only the awkward points outside that comfort tube get a say in the model. Wider tube: fewer fussy points, simpler model, until it's TOO relaxed.",
  widget: {
    type: "curveStatic", title: "The comfort tube",
    world: "Sweep the tube half-width ε. Two consequences: how many points remain support vectors, and how the validation error responds. Find the tube that's relaxed but not sloppy.",
    xlab: "tube half-width ε →", xs: [0,1,2,3,4], labels: ["0","0.1","0.5","1","2"], dec: 1, yunit: "",
    series: [
      { name: "support vectors kept (%)", ys: [100,74,38,18,6] },
      { name: "validation error (×10)", ys: [21,17,15,17,26] }
    ],
    knob: { label: "Tube width ε", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 0, text: "ε = 0: every deviation matters, every point is a support vector — maximal fussiness, and it's fitting noise.", tone: "warn" },
      { max: 2, text: "A moderate tube: 38% of points still matter, validation error at its best. The freed points were carrying only noise.", tone: "info" },
      { max: 4, text: "🤯 A huge tube: 6% support vectors and rising error — the model has relaxed itself into ignoring real signal. ε is a sparsity-accuracy dial: sweep it like everything else.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "SVR and the ε-insensitive tube", formula: "loss = max(0, |error| − ε) — errors inside the tube are free",
      text: "The margin idea, rotated 90° into regression. Same machinery, same sparsity, same C — plus one new knob for how much error you refuse to care about." }
  }
},

{
  q: "Training a kernel SVM on 200,000 rows, your machine runs out of MEMORY before it runs out of patience. What's the structural cause?",
  choices: ["The kernel matrix — pairwise similarities grow as n², independent of feature count", "Support vectors are stored twice", "The features are too many", "Python overhead", "The labels are stored as floats"],
  explain: "Kernel methods work on the n×n matrix of similarities between all training pairs: 200k² entries ≈ 320 GB in float64. Approximations (Nyström, random features) or linear SVMs are the escape routes.",
  simple: "A kernel machine wants a table of how similar every row is to every other row. Ten rows: 100 entries, cute. Two hundred thousand rows: forty BILLION entries — no laptop survives contact. The n² table, not the maths, is what breaks first.",
  widget: {
    type: "curveStatic", title: "The n-squared table",
    world: "Memory for the kernel matrix as rows grow. The dashed reality check: a 32 GB workstation. Slide the dataset and watch the wall arrive.",
    xlab: "training rows", xs: [0,1,2,3,4], labels: ["5k","20k","50k","100k","200k"], dec: 1, yunit: " GB",
    series: [
      { name: "kernel matrix memory", ys: [0.2,3.2,20,80,320] },
      { name: "workstation RAM", ys: [32,32,32,32,32] }
    ],
    knob: { label: "Rows", min: 0, max: 4, step: 1, init: 0 },
    insights: [
      { max: 1, text: "20k rows: 3.2 GB — workable. Note the growth pattern: 4× the rows means 16× the memory.", tone: "info" },
      { max: 2, text: "50k rows: 20 GB — already squeezing a big workstation, before the solver's own overhead.", tone: "warn" },
      { max: 4, text: "🤯 200k rows: 320 GB — ten times the machine. Options: subsample, approximate the kernel (Nyström / random Fourier features), or drop to LinearSVC, which never builds the table.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "The kernel matrix bottleneck", formula: "memory ≈ n² × 8 bytes — quadratic in rows, blind to features",
      text: "Why 'kernel SVMs don't scale' is really a memory statement. Every kernel method — SVMs, Gaussian processes — hits this same wall." }
  }
},

{
  q: "For text classification with 50,000 sparse TF-IDF features, seasoned practitioners reach for LinearSVC rather than an RBF-SVM. Why?",
  choices: ["High-dimensional text is usually already linearly separable — the RBF adds cost, not accuracy", "RBF kernels can't read sparse matrices", "LinearSVC has more hyperparameters to tune", "Text requires probability outputs", "RBF only supports two classes"],
  explain: "With 50k dimensions there's almost always a separating hyperplane already — the kernel's extra flexibility buys nothing but n² cost and overfitting risk. Linear SVMs on text are fast, sparse-friendly and hard to beat.",
  simple: "Kernels exist to ADD dimensions when the data's too flat to separate. Text arrives with fifty thousand dimensions built in — it doesn't need more room, it needs a fast straight cut. Adding RBF to text is bringing a ladder to a field with no walls.",
  widget: {
    type: "curveStatic", title: "The ladder in an open field",
    world: "A text classification bake-off: accuracy and training time, LinearSVC vs RBF-SVM, as the document count grows. Watch what the kernel's flexibility actually buys here.",
    xlab: "documents", xs: [0,1,2,3], labels: ["5k","20k","50k","100k"], dec: 1, yunit: "",
    series: [
      { name: "LinearSVC accuracy %", ys: [91,92.5,93.2,93.6] },
      { name: "RBF-SVM accuracy %", ys: [91.2,92.6,93.1,93.4] },
      { name: "RBF fit time (min)", ys: [2,30,190,780] }
    ],
    knob: { label: "Documents", min: 0, max: 3, step: 1, init: 0 },
    insights: [
      { max: 1, text: "Accuracies within a whisker of each other at every size — in 50k dimensions, the straight cut was already enough.", tone: "info" },
      { max: 2, text: "Meanwhile the RBF's bill: 190 minutes vs seconds. Paying heavily for flexibility the problem cannot use.", tone: "warn" },
      { max: 3, text: "🤯 At 100k documents: 13 hours vs under a minute, for −0.2 accuracy. Rule of thumb: dimensions ≫ rows → go linear. Kernels are for when the data is starved of dimensions, not drowning in them.", tone: "wow" }
    ],
    extreme: { at: "max" },
    reveal: { name: "Linear SVMs for high-dimensional data", formula: "d ≫ n → likely separable → LinearSVC / SGDClassifier(hinge)",
      text: "The last SVM lesson is knowing when the famous trick is unnecessary. High-dimensional sparse data — text above all — is linear-SVM country." }
  }
}
];
