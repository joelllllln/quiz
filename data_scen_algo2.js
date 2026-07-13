/* Applied Scenarios — Decision Trees & Support Vector Machines. choices[0] always correct (shuffled at render). */
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
    q: "You train a single decision tree with no depth limit on 3,000 rows. It scores 100% on training data but only 71% on the held-out test set. What is the most likely diagnosis?",
    choices: [
      "The tree overfit — it grew deep enough to memorize the training rows, so you should limit depth, set a minimum leaf size, or prune it",
      "The tree underfit — it is too simple and needs to grow even deeper",
      "The features need to be standardized before a tree can generalize",
      "The test set is simply mislabeled and the tree is actually fine",
      "Decision trees cannot exceed 71% accuracy on any real dataset"
    ],
    explain: "A perfect training score with a much lower test score is the textbook signature of overfitting. An unpruned tree keeps splitting until each leaf is nearly pure, effectively memorizing noise in the training rows. The cure is to constrain growth (max depth, minimum samples per leaf, or cost-complexity pruning) so the tree captures general patterns rather than memorized specifics.",
    simple: "A tree left to grow forever builds a private rule for every single training example, like memorizing the answers instead of learning the subject. It aces practice and flunks the real test.",
    widget: W("Deeper is not always better", "Watch training and test accuracy diverge as a single tree is allowed to grow deeper.",
      "max tree depth →", ["2", "5", "10", "20", "none"],
      "training accuracy", [74, 86, 95, 99, 100], "Max depth",
      [{ max: 1, text: "Shallow trees leave both training and test accuracy modest but close together.", tone: "info" },
       { max: 3, text: "As depth grows, training accuracy races ahead while test accuracy stalls.", tone: "info" },
       { max: 4, text: "🤯 At full depth training hits 100% yet test accuracy is far lower — the gap IS the overfitting.", tone: "wow" }],
      { name: "Test accuracy", ys: [72, 80, 79, 74, 71] },
      { name: "Overfitting gap", formula: "big train/test gap = memorized noise, needs pruning", text: "When training accuracy climbs but test accuracy falls, the tree is memorizing — prune it back." })
  });

  q("scen1", {
    q: "Your features are age (0-90), income (0-500,000), and number of accounts (0-12), all on wildly different scales. You will train a single decision tree. Do you need to standardize or normalize the features first?",
    choices: [
      "No — a decision tree splits one feature at a time on threshold rules, so it is invariant to feature scale and monotone transforms",
      "Yes — without scaling, income will dominate every split because its numbers are largest",
      "Yes — trees compute distances, so unscaled features distort the geometry",
      "Yes — you must always min-max normalize every feature to 0-1 before any model",
      "No, but you must one-hot encode income into buckets or the tree will fail"
    ],
    explain: "A decision tree evaluates each feature independently, choosing a split like 'income <= 42,000' by ranking values, so only the order of values within a feature matters, not their magnitude. Rescaling or applying any monotone transform leaves the same split points and the same tree. That is why trees (and tree ensembles) are famously immune to the feature-scaling step that distance- and gradient-based models require.",
    simple: "A tree just asks yes/no threshold questions on one column at a time. It does not care whether income is in dollars or thousands of dollars — the cut lands in the same place either way.",
    widget: W("Trees ignore scale", "Compare how much test accuracy changes when you scale features for different model types.",
      "model →", ["tree raw", "tree scaled", "kNN raw", "kNN scaled"],
      "test accuracy", [86, 86, 61, 84], "Model / scaling",
      [{ max: 1, text: "Scaling the features leaves the tree's accuracy unchanged — split thresholds just rescale with the data.", tone: "info" },
       { max: 2, text: "A distance-based model like kNN collapses on raw, unscaled features.", tone: "info" },
       { max: 3, text: "🤯 The SAME data helps kNN enormously but does nothing for the tree — scaling is model-specific, not universal.", tone: "wow" }],
      { name: "Scale invariance", formula: "tree splits rank values, so scaling changes nothing", text: "Decision trees are scale-invariant; distance-based models are not." })
  });

  q("scen1", {
    q: "You have 800 rows with 2 numeric features and a curved, non-linear boundary between the two classes. A plain linear SVM scores 68%. What is the most direct fix within the SVM family?",
    choices: [
      "Switch to an RBF (Gaussian) kernel, which maps the data into a higher-dimensional space where a curved boundary becomes separable",
      "Increase C to a very large value on the linear kernel until it fits the curve",
      "Remove one of the two features so the boundary becomes a straight line",
      "Standardize the labels instead of the features",
      "Add thousands more rows — a linear SVM will eventually bend its boundary"
    ],
    explain: "A linear SVM can only draw a straight decision boundary, so it caps out when the true boundary is curved. The kernel trick lets an SVM compute similarities in a higher-dimensional space without materializing it; the RBF kernel in particular can carve out smooth, curved boundaries. Raising C only hardens the margin of the same straight line, and dropping a feature discards signal — neither adds the needed curvature.",
    simple: "A linear SVM can only cut with a straight ruler. An RBF kernel is like being allowed to cut with a curved blade, so it can follow a bendy border between the classes.",
    widget: W("Kernels bend the boundary", "Compare SVM test accuracy as the kernel grows more flexible on a curved, non-linear dataset.",
      "kernel →", ["linear", "poly deg 2", "poly deg 3", "RBF"],
      "test accuracy", [68, 82, 88, 93], "Kernel",
      [{ max: 1, text: "A linear kernel can only draw a straight line, so it underfits a curved boundary.", tone: "info" },
       { max: 2, text: "Polynomial kernels add curvature and accuracy climbs.", tone: "info" },
       { max: 3, text: "🤯 The RBF kernel can wrap a smooth curved boundary around the classes without you ever building the extra dimensions by hand.", tone: "wow" }],
      { name: "Kernel trick", formula: "curved boundary => nonlinear kernel (RBF) beats linear", text: "When classes are not linearly separable, a nonlinear kernel like RBF lifts the SVM past the straight-line ceiling." })
  });

  q("scen1", {
    q: "You are about to train an SVM with an RBF kernel on features measured in very different units (grams, kilometers, counts). What preprocessing step is essential here?",
    choices: [
      "Standardize or normalize the features, because the RBF kernel uses distances and a large-scale feature would otherwise dominate the similarity",
      "Nothing — SVMs are scale-invariant just like decision trees",
      "Prune the support vectors down to a fixed count before training",
      "Convert every feature to a categorical bucket so distance is undefined",
      "Set gamma to zero so scale no longer matters"
    ],
    explain: "The RBF kernel computes similarity from the squared distance between points, so a feature spanning thousands of units swamps one spanning single digits, and the model effectively ignores the small-scale feature. Standardizing every feature to comparable ranges lets each contribute fairly to the distance. Feature scaling is essential for SVMs (and any distance- or margin-based method), which is exactly the opposite of decision trees.",
    simple: "The RBF kernel measures how far apart points are. If one feature is in kilometers and another in grams, the kilometers drown everything out — so you must put them on the same scale first.",
    widget: W("SVMs demand scaling", "Compare RBF-SVM test accuracy with and without feature standardization on mixed-unit data.",
      "preprocessing →", ["raw", "min-max", "standardized"],
      "test accuracy", [64, 88, 91], "Preprocessing",
      [{ max: 0, text: "On raw mixed-unit features, the largest-scale column dominates the distance and accuracy suffers.", tone: "info" },
       { max: 1, text: "Rescaling features to a common range restores balance across features.", tone: "info" },
       { max: 2, text: "🤯 The same model and data jumps ~27 points just from scaling — for SVMs it is not optional.", tone: "wow" }],
      { name: "Scaling is essential", formula: "RBF uses distance => features MUST share a scale", text: "Always scale features before an SVM; the distance-based kernel is dominated by large-range features otherwise." })
  });

  q("scen1", {
    q: "A hospital wants a screening rule that a nurse can apply by hand from a laminated card, with a handful of if/then questions. Which model best fits the deployment constraint?",
    choices: [
      "A shallow decision tree, whose root-to-leaf path is a short readable sequence of if/then rules",
      "An RBF-kernel SVM, because it is usually the most accurate classifier",
      "A random forest of 300 trees, majority-voting on each patient",
      "A deep neural network exported to the card as a formula",
      "k-nearest neighbours, which stores the whole training set for lookup"
    ],
    explain: "A shallow decision tree literally is a flowchart: each internal node is one threshold question and each leaf is a decision, so a nurse can walk the path by hand. That transparency is the whole point when the model must run without a computer and be auditable. Ensembles, kernel SVMs, and deep nets may be more accurate but they combine many models or continuous math that cannot be executed from a laminated card.",
    simple: "A short decision tree is just a yes/no flowchart. That is perfect when a person has to follow the steps by hand and see exactly why each patient was flagged.",
    widget: W("Readable rules win here", "Compare models on how easily a human can execute and explain them at the point of care.",
      "model →", ["shallow tree", "deep tree", "random forest", "RBF-SVM", "deep net"],
      "hand-executability", [96, 60, 25, 18, 8], "Model",
      [{ max: 0, text: "A shallow tree is a short flowchart a person can run and explain unaided.", tone: "info" },
       { max: 2, text: "Ensembles average many trees — no single path to read off.", tone: "info" },
       { max: 4, text: "🤯 Kernel SVMs and deep nets can be top on accuracy yet impossible to run from a card — the constraint picks the model.", tone: "wow" }],
      { name: "Interpretability", formula: "human-executable rule => shallow tree", text: "When a human must apply and justify the model by hand, a shallow decision tree is the natural choice." })
  });

  q("scen1", {
    q: "After training a linear SVM, you find that only 40 of your 2,000 training points are support vectors. What does that tell you about the model?",
    choices: [
      "The decision boundary is defined only by those 40 border points — the other 1,960 points sit safely away from the margin and do not affect the boundary",
      "The model failed to train because it used only 40 points",
      "You must retrain until all 2,000 points become support vectors",
      "The 40 support vectors are the misclassified points and should be deleted",
      "Support vectors are irrelevant to where the boundary sits"
    ],
    explain: "An SVM's decision boundary is determined entirely by the support vectors — the points lying on or inside the margin. Points far from the boundary have zero influence, so having only 40 support vectors means the boundary rests on a small, well-separated set of border cases and the rest of the data is comfortably classified. This sparsity is a feature: prediction depends only on those few points, and a small support-vector count on clean data is normal and healthy.",
    simple: "An SVM only cares about the points nearest the dividing line — the tricky border cases. Everything sitting comfortably far away is ignored when placing the boundary.",
    widget: W("Only the border points matter", "Watch how the support vectors, not the bulk of the data, pin the SVM boundary.",
      "share of data near margin →", ["2%", "10%", "30%", "60%"],
      "points that are support vectors", [2, 10, 30, 60], "Margin crowding",
      [{ max: 0, text: "On well-separated data only a tiny fraction of points sit near the margin as support vectors.", tone: "info" },
       { max: 2, text: "As classes overlap more, more points fall inside the margin and become support vectors.", tone: "info" },
       { max: 3, text: "🤯 Remove every non-support-vector and the boundary does not move at all — only the border points define it.", tone: "wow" }],
      { name: "Support vectors", formula: "boundary set only by points on/inside the margin", text: "The SVM boundary depends solely on its support vectors; interior points have no influence." })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "You can ship a single pruned decision tree (test accuracy 84%, fully readable) or a random forest of 400 trees (test accuracy 90%, opaque). Stakeholders want accuracy AND a per-decision explanation. How do you frame the trade-off?",
    choices: [
      "It is an interpretability-vs-accuracy trade-off: the single tree gives readable rules at a 6-point accuracy cost, the forest gives 6 more points but no single readable reason — pick based on how much explanation the use case legally and practically requires",
      "Always pick the forest — 90% beats 84%, and accuracy is the only thing that matters",
      "Always pick the single tree — simpler models are always correct",
      "Combine them by averaging the tree and the forest predictions to get both",
      "Scale the features so the single tree reaches 90% too"
    ],
    explain: "A single tree exposes an exact root-to-leaf reason for every prediction, while a random forest averages hundreds of trees and trades that readability for accuracy and stability. Neither wins universally: the right call depends on whether the extra 6 points outweigh the loss of a clean per-decision explanation. In regulated or safety settings the readable tree can be worth more than the accuracy; in a low-stakes recommender the forest usually wins.",
    simple: "One clear tree tells you exactly why. A forest of 400 trees is more accurate but can only say 'the crowd voted this way'. You are trading reasons for a few points of accuracy.",
    widget: W("Accuracy vs a readable reason", "Compare a single tree against growing ensembles on accuracy and on interpretability.",
      "ensemble size →", ["1 tree", "10 trees", "100 trees", "400 trees"],
      "test accuracy", [84, 88, 90, 90], "Trees in ensemble",
      [{ max: 0, text: "One pruned tree is fully readable but leaves some accuracy on the table.", tone: "info" },
       { max: 2, text: "Adding trees lifts and stabilizes accuracy but blurs the per-decision reason.", tone: "info" },
       { max: 3, text: "🤯 Interpretability falls off a cliff long before accuracy plateaus — the two axes move in opposite directions.", tone: "wow" }],
      { name: "Interpretability", ys: [95, 55, 30, 22] },
      { name: "The core trade-off", formula: "ensemble +accuracy, -readable reason", text: "Growing an ensemble buys accuracy and stability but spends interpretability — weigh what the use case needs." })
  });

  q("scen2", {
    q: "Tuning an RBF-SVM, small C gives a wide soft margin that misclassifies a few training points; large C gives a narrow hard margin that fits training points tightly. How should you choose C?",
    choices: [
      "C controls the bias-variance trade-off: small C tolerates margin violations for a smoother, more general boundary (more bias), large C fits training points hard (more variance) — tune it by cross-validation to the setting with best held-out accuracy",
      "Always use the largest C possible, since fitting training points perfectly is the goal",
      "Always use the smallest C possible, since simpler is always safer",
      "C only changes training speed and has no effect on the boundary",
      "Set C equal to the number of features for guaranteed best results"
    ],
    explain: "In an SVM, C is the penalty for margin violations: a small C lets some points sit inside or across the margin in exchange for a wider, smoother boundary that generalizes better (higher bias, lower variance), while a large C forces the boundary to classify training points correctly at the cost of a narrow margin that can overfit (lower bias, higher variance). There is no universally best value — you sweep C and pick the one with the best cross-validated accuracy. This is the SVM's version of the bias-variance balance.",
    simple: "Small C says 'draw a smooth line and ignore a few troublemakers.' Large C says 'bend over backwards to get every training point right.' Too smooth underfits, too rigid overfits — cross-validation finds the sweet spot.",
    widget: W("Tuning C: soft vs hard margin", "Sweep the C penalty and watch training and validation accuracy diverge.",
      "C (margin penalty) →", ["0.01", "0.1", "1", "10", "1000"],
      "training accuracy", [79, 86, 91, 96, 100], "C value",
      [{ max: 1, text: "Very small C keeps the margin wide and soft, underfitting the training data.", tone: "info" },
       { max: 2, text: "A moderate C balances margin width against training fit — validation peaks here.", tone: "info" },
       { max: 4, text: "🤯 Push C too high and training accuracy hits 100% while validation drops — a hard margin overfits.", tone: "wow" }],
      { name: "Validation accuracy", ys: [77, 85, 90, 87, 80] },
      { name: "C trade-off", formula: "small C = more bias/smoother, large C = more variance/overfit", text: "C sets the SVM's bias-variance balance; cross-validate rather than maxing it out." })
  });

  q("scen2", {
    q: "With an RBF-SVM you must also set gamma. Small gamma gives each point a wide influence (smooth boundary); large gamma gives each point a tiny, local influence (wiggly boundary). What is the trade-off and how do you set it?",
    choices: [
      "Gamma sets the reach of each training point: small gamma = smooth, possibly underfit boundary; large gamma = highly local boundary that can overfit by wrapping tightly around individual points — tune gamma (jointly with C) by cross-validation",
      "Larger gamma is always better because it fits the training data more precisely",
      "Smaller gamma is always better because smoother is always safer",
      "Gamma only matters for the linear kernel, not the RBF kernel",
      "Gamma should be fixed equal to C at all times"
    ],
    explain: "In the RBF kernel, gamma controls how far a single training example's influence reaches: a small gamma spreads influence widely for a smooth boundary that may underfit, while a large gamma shrinks influence to a tiny neighborhood so the boundary can bend around individual points and overfit. Because gamma and C interact, they are tuned together (a grid search over both) and chosen by held-out performance. Neither extreme is universally right — it is a bias-variance dial like C.",
    simple: "Gamma is how far each point's 'vote' reaches. Small gamma blurs everything into a smooth line; large gamma lets each point carve its own bump. Too blurry underfits, too bumpy overfits.",
    widget: W("Tuning gamma: reach of each point", "Sweep RBF gamma and watch the boundary go from too smooth to too wiggly.",
      "gamma (point reach) →", ["0.001", "0.01", "0.1", "1", "10"],
      "training accuracy", [80, 87, 92, 98, 100], "Gamma value",
      [{ max: 1, text: "Tiny gamma gives every point a wide reach, producing a smooth boundary that can underfit.", tone: "info" },
       { max: 2, text: "A moderate gamma matches the boundary's true curvature — validation peaks.", tone: "info" },
       { max: 4, text: "🤯 Huge gamma makes each point an island, so training hits 100% while validation collapses — classic overfit.", tone: "wow" }],
      { name: "Validation accuracy", ys: [78, 86, 91, 82, 66] },
      { name: "Gamma trade-off", formula: "small gamma = smooth/underfit, large gamma = local/overfit", text: "Gamma tunes boundary flexibility; grid-search it together with C on held-out data." })
  });

  q("scen2", {
    q: "You need a classifier that retrains nightly on a growing dataset and returns predictions in under a millisecond on tens of features. You are weighing a pruned decision tree against an RBF-kernel SVM. What is the practical trade-off?",
    choices: [
      "The tree trains and predicts very fast and scales well with rows, while the RBF-SVM can be more accurate on complex boundaries but its training scales poorly with dataset size and prediction cost grows with the number of support vectors — favor the tree if speed and frequent retraining dominate",
      "The SVM is always faster because it only keeps support vectors",
      "The tree is always more accurate, so speed is the only reason to consider the SVM",
      "Both have identical training cost, so pick either at random",
      "Neither can predict in under a millisecond, so you need a neural network"
    ],
    explain: "Decision trees train roughly in n-log-n time and predict in the depth of the tree, so they stay fast as data grows and are cheap to retrain nightly. Kernel SVMs must work with pairwise similarities and their training time grows steeply (roughly quadratic-to-cubic in the number of rows), while prediction cost scales with the number of support vectors. If the workload demands frequent retraining and sub-millisecond inference at growing scale, the tree's speed usually outweighs the SVM's possible accuracy edge on curved boundaries.",
    simple: "A tree is quick to build and quick to answer, even as data piles up. A kernel SVM can be sharper on tricky boundaries but gets slow to train as rows grow — for nightly retrains and instant answers, the tree wins.",
    widget: W("Speed vs boundary power at scale", "Compare relative training time of a tree and an RBF-SVM as the row count grows.",
      "training rows →", ["1k", "10k", "100k", "1M"],
      "SVM training cost (rel.)", [5, 30, 70, 100], "Dataset size",
      [{ max: 1, text: "At small scale both models train quickly and the difference is minor.", tone: "info" },
       { max: 2, text: "Kernel-SVM training cost climbs steeply with rows while the tree stays cheap.", tone: "info" },
       { max: 3, text: "🤯 At a million rows the SVM's training cost explodes while the tree barely moves — scale flips the decision.", tone: "wow" }],
      { name: "Tree training cost (rel.)", ys: [3, 8, 14, 22] },
      { name: "Scaling trade-off", formula: "kernel SVM training ~ quadratic-cubic; tree ~ n log n", text: "For frequent retrains at growing scale, a tree's speed usually beats a kernel SVM's accuracy edge." })
  });

  q("scen2", {
    q: "Your single decision tree is unstable: a small change to the training data reshuffles the whole tree and test accuracy swings between 80% and 88%. You value both stability and reasonable interpretability. What is the balanced move?",
    choices: [
      "Use a random forest or moderately limit tree depth: averaging many trees (or shallower trees) cuts variance and stabilizes accuracy, trading some of the single tree's exact readability for robustness — pick the balance the use case needs",
      "Keep the single unpruned tree and simply retrain until you get an 88% run",
      "Switch to a linear SVM, which is guaranteed more accurate than any tree",
      "Standardize the features so the single tree stops changing",
      "Grow the tree even deeper so it becomes more stable"
    ],
    explain: "Single decision trees are high-variance: because each split is chosen greedily, a small data change can flip an early split and cascade into a completely different tree, causing accuracy to swing. Averaging many decorrelated trees (a random forest) or restricting depth reduces that variance and stabilizes performance, at the cost of the single tree's crisp per-decision readability. The balanced choice is to trade a little interpretability for the stability the deployment needs, rather than gambling on a lucky single-tree run.",
    simple: "One tree is jumpy — nudge the data and it redraws itself. Averaging a forest of trees smooths out the jumpiness, but you give up the single clean flowchart in exchange.",
    widget: W("Averaging tames a jumpy tree", "Watch accuracy variance shrink as you average more trees instead of trusting one.",
      "trees averaged →", ["1", "5", "25", "100"],
      "run-to-run accuracy swing (pts)", [8, 4, 2, 1], "Ensemble size",
      [{ max: 0, text: "A single tree's accuracy swings widely with tiny data changes — high variance.", tone: "info" },
       { max: 2, text: "Averaging a handful of trees already shrinks the swing sharply.", tone: "info" },
       { max: 3, text: "🤯 Variance drops toward zero as trees are averaged — but the single readable flowchart is gone.", tone: "wow" }],
      { name: "Stability vs readability", formula: "averaging trees cuts variance, spends interpretability", text: "A forest stabilizes a high-variance single tree at the cost of its exact readability." })
  });

  q("scen2", {
    q: "A dataset has 30% of the minority-class labels missing at random, and the majority class is 4x larger. You must choose between a linear SVM and an RBF-SVM while also deciding how much margin softness (C) to allow. What is the sound reasoning?",
    choices: [
      "Test both kernels by cross-validation and use class weights, and lean toward a softer margin (smaller C) so noise and class imbalance do not force the boundary to overfit the crowded majority — let held-out performance on a proper metric decide kernel and C together",
      "Always pick RBF with the largest C, since flexibility plus a hard margin is strictly best",
      "Always pick the linear SVM, since it is immune to class imbalance",
      "Drop the minority class entirely so the classes are balanced",
      "Set C to infinity so the model never violates the margin on the majority class"
    ],
    explain: "With imbalance and noisy/missing labels, a hard margin (very large C) will contort the boundary to satisfy the crowded, noisy majority and overfit. A softer margin (smaller C) tolerates violations for a more general boundary, and class weighting counteracts the 4-to-1 imbalance so the minority is not ignored. Whether linear or RBF wins depends on the true boundary shape, so you cross-validate both on an imbalance-aware metric rather than assuming one is universally superior.",
    simple: "When one class dwarfs the other and labels are noisy, forcing the SVM to get every point right just makes it chase the majority's noise. Loosen the margin, weight the rare class, and let a fair test pick the kernel.",
    widget: W("Softness helps with imbalance and noise", "Sweep C on an imbalanced, noisy dataset and track minority-class recall.",
      "C (margin penalty) →", ["0.1", "1", "10", "100"],
      "majority-class accuracy", [88, 92, 95, 97], "C value",
      [{ max: 0, text: "A softer margin plus class weights keeps the minority class visible.", tone: "info" },
       { max: 1, text: "As C rises, the boundary favors the crowded majority and minority recall slips.", tone: "info" },
       { max: 3, text: "🤯 Big C looks great on majority accuracy while minority recall craters — the metric you watch changes the winner.", tone: "wow" }],
      { name: "Minority-class recall", ys: [74, 70, 58, 44] },
      { name: "Imbalance-aware SVM", formula: "softer C + class weights, choose kernel by CV", text: "With imbalance and noise, prefer a softer margin and weighted classes, and let held-out metrics pick the kernel." })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "A decision tree predicting hospital readmission scores an astonishing 99% test accuracy. You notice one feature is 'discharge_disposition = readmitted-later', populated after the outcome is known. What is really happening?",
    choices: [
      "Target leakage — a feature that encodes the outcome sneaked in, so the tree just reads the answer; remove it and re-evaluate, expecting far lower honest accuracy",
      "The tree is genuinely excellent and should be deployed immediately",
      "The tree underfit and needs to grow deeper to exceed 99%",
      "The features need standardizing to bring accuracy back to a believable level",
      "99% is normal for decision trees and requires no scrutiny"
    ],
    explain: "A near-perfect score driven by a feature that is only known after the target is decided is classic target leakage: the tree finds the split on that feature and effectively copies the label. It will look brilliant offline and fail in production, where that feature is not yet available at prediction time. The fix is to remove any feature that would not exist at the moment of prediction and re-measure — the honest accuracy will be much lower but real.",
    simple: "The tree isn't smart, it's peeking. One column secretly contains the answer that only appears after the fact, so of course it scores 99% — until you deploy it and the peek is gone.",
    widget: W("A leaky feature fakes brilliance", "Watch test accuracy collapse to reality once the leaked feature is removed.",
      "features used →", ["with leak", "leak removed"],
      "test accuracy", [99, 78], "Feature set",
      [{ max: 0, text: "With the post-outcome feature, the tree simply reads the label and scores near 100%.", tone: "info" },
       { max: 1, text: "Remove it and accuracy drops to what the model can honestly predict from pre-outcome data.", tone: "wow" }],
      { name: "Target leakage", formula: "feature known only after outcome => inflated, fake accuracy", text: "Drop any feature unavailable at prediction time; a suspiciously perfect tree usually means leakage." })
  });

  q("scen3", {
    q: "Two decision trees on the same churn data: Tree A uses 5-fold cross-validation, Tree B was tuned by trying 200 depth/leaf settings and reporting the single best test-set score. Tree B looks better. Why is that comparison a trap?",
    choices: [
      "Tree B overfit the test set through repeated peeking — trying 200 configs and keeping the best test score turns the test set into a training signal, so its reported accuracy is optimistically biased; trust the cross-validated estimate",
      "Tree B is legitimately better because it tried more configurations",
      "Cross-validation always underestimates accuracy, so Tree A is wrong",
      "Tree B must be more accurate because more tuning always generalizes better",
      "The two are directly comparable and Tree B simply wins"
    ],
    explain: "Selecting the best of 200 configurations by their test-set score lets the test set leak into model selection: with enough tries, one config scores high by chance, and reporting that maximum is optimistically biased. Cross-validation (or a held-out set touched only once) gives an honest estimate because the evaluation data was not used to pick the winner. Tree B's headline number is inflated; the fair comparison uses Tree A's cross-validated score or a fresh untouched test set for both.",
    simple: "If you take 200 exams and report only your best score, that number flatters you. Tree B did exactly that on the test set, so its 'win' is partly luck, not skill.",
    widget: W("Peeking inflates the score", "Watch the reported best-of-k test accuracy drift above the true accuracy as you try more configs.",
      "configs tried, best kept →", ["1", "10", "50", "200"],
      "reported best test accuracy", [82, 85, 87, 89], "Search size",
      [{ max: 0, text: "With one config the test score is an honest estimate.", tone: "info" },
       { max: 2, text: "Keeping the best of many configs by test score drifts the number upward.", tone: "info" },
       { max: 3, text: "🤯 The true accuracy stayed at 82% — the extra 7 points are pure test-set overfitting from repeated peeking.", tone: "wow" }],
      { name: "True accuracy", ys: [82, 82, 82, 82] },
      { name: "Selection bias", formula: "best-of-many on test set = optimistic, inflated estimate", text: "Tuning on the test set leaks it into selection; use cross-validation for an honest comparison." })
  });

  q("scen3", {
    q: "You standardize your features and then train an RBF-SVM with 5-fold cross-validation, fitting the scaler on the FULL dataset before splitting. CV accuracy is 91% but production accuracy is 84%. What went wrong?",
    choices: [
      "Data leakage in preprocessing — the scaler's mean and standard deviation were computed using the validation folds, leaking their statistics into training; fit the scaler inside each fold (on training data only) so CV reflects real performance",
      "The RBF kernel is simply unreliable and should be replaced with a linear one",
      "The gap is normal and can be ignored since 84% is close enough",
      "You should standardize the labels as well as the features",
      "Cross-validation always overestimates by exactly this amount"
    ],
    explain: "Fitting the scaler on the entire dataset before cross-validation lets each validation fold's mean and standard deviation influence the scaling used during training, so the model has already 'seen' summary statistics of the data it is evaluated on. That inflates CV accuracy relative to production, where new data was never part of the scaler. The fix is to fit the scaler on each fold's training portion only (e.g., inside a pipeline), so the CV estimate honestly reflects unseen data.",
    simple: "You let the scaler peek at the test folds when computing its averages. That tiny peek makes cross-validation look better than reality — do the scaling inside each fold instead.",
    widget: W("Preprocessing leakage inflates CV", "Compare cross-validated accuracy when the scaler is fit on all data versus fit inside each fold.",
      "scaler fit on →", ["all data (leak)", "train fold only"],
      "cross-validated accuracy", [91, 84], "Scaling protocol",
      [{ max: 0, text: "Fitting the scaler on the full dataset leaks validation-fold statistics into training.", tone: "info" },
       { max: 1, text: "Fitting the scaler inside each fold gives a CV number that matches production reality.", tone: "wow" }],
      { name: "Preprocessing leakage", formula: "fit transforms inside the CV fold, never on full data", text: "Scale (and all preprocessing) using training-fold data only, or cross-validation lies to you." })
  });

  q("scen3", {
    q: "Your fraud SVM is 99.3% accurate on data that is 0.7% fraud, and management is thrilled. A closer look shows it flags almost no fraud. What is the real problem?",
    choices: [
      "Accuracy is the wrong metric under extreme imbalance — a model that predicts 'not fraud' for everyone already scores 99.3%; judge it by precision, recall, F1, or PR-AUC on the fraud class",
      "The SVM is excellent and simply needs a bigger C to catch the last 0.7%",
      "The features must be unscaled, which is why fraud is missed",
      "99.3% proves the model generalizes and needs no further metric",
      "The RBF kernel should be swapped for linear to raise accuracy further"
    ],
    explain: "When only 0.7% of cases are fraud, a trivial classifier that always says 'not fraud' scores 99.3% accuracy while catching zero fraud, so a high accuracy number is meaningless here. The right metrics focus on the rare positive class: precision and recall, their F1 balance, or the area under the precision-recall curve. The SVM likely placed its boundary to satisfy the overwhelming majority; you would add class weights or adjust the threshold and then measure with imbalance-aware metrics.",
    simple: "Saying 'no fraud' about everyone is right 99.3% of the time and catches no crooks. Accuracy is fooled by the rare class — look at how much fraud you actually catch (recall) and how clean your alerts are (precision).",
    widget: W("Accuracy lies under imbalance", "Compare a do-nothing classifier and a real fraud model on accuracy versus fraud recall.",
      "model →", ["always 'not fraud'", "real fraud SVM"],
      "overall accuracy", [99, 97], "Model",
      [{ max: 0, text: "Predicting the majority for everyone scores 99% accuracy and catches zero fraud.", tone: "info" },
       { max: 1, text: "🤯 A genuinely useful model can show LOWER accuracy while catching far more fraud — accuracy is the wrong lens.", tone: "wow" }],
      { name: "Fraud recall", ys: [0, 71] },
      { name: "Wrong-metric trap", formula: "rare positives => use precision/recall/PR-AUC, not accuracy", text: "Under heavy imbalance, accuracy rewards ignoring the rare class; measure the positive class directly." })
  });

  q("scen3", {
    q: "A decision tree ranks 'customer_id_hash' as its top feature by importance and splits on it heavily, giving high training accuracy. Why should this alarm you?",
    choices: [
      "A near-unique identifier lets the tree memorize individual rows rather than learn a pattern, inflating training accuracy and gutting generalization; drop ID-like high-cardinality features and re-evaluate",
      "It is great news — the tree found the single most predictive feature",
      "Customer IDs are always the strongest legitimate signal in churn data",
      "The tree needs deeper splits on the ID to reach even higher accuracy",
      "You should standardize the ID hash so its importance is measured fairly"
    ],
    explain: "A high-cardinality, near-unique feature like an ID hash lets a tree carve the data into tiny leaves that each match a handful of rows, effectively memorizing the training set and posting misleadingly high training importance and accuracy. Such a feature carries no generalizable signal — the same IDs will not recur in new data — so test performance collapses. The correct move is to exclude identifiers and other leaky high-cardinality keys before training and re-measure.",
    simple: "Splitting on a customer ID is like acing a test by memorizing which student sat in which seat. It works on the practice roster and tells you nothing about new customers.",
    widget: W("An ID feature memorizes, not learns", "Watch train and test accuracy diverge when a near-unique ID feature is included.",
      "ID feature →", ["included", "removed"],
      "training accuracy", [98, 83], "Feature set",
      [{ max: 0, text: "Splitting on a near-unique ID pushes training accuracy high by memorizing rows.", tone: "info" },
       { max: 1, text: "🤯 Remove the ID and training accuracy drops toward the honest test number — the 'importance' was memorization.", tone: "wow" }],
      { name: "Test accuracy", ys: [79, 82] },
      { name: "High-cardinality trap", formula: "near-unique IDs => memorization, fake importance", text: "Drop identifier-like high-cardinality features; a tree will memorize them instead of learning." })
  });

  q("scen3", {
    q: "An RBF-SVM trained last year on transaction data has quietly dropped from 90% to 76% live accuracy, though it still scores 90% when re-tested on the original held-out set. Nothing in the code changed. What is the most likely cause?",
    choices: [
      "Data drift — the live input distribution has shifted away from the training data, so the fixed boundary no longer fits; monitor the input/label distributions and retrain on recent data",
      "The SVM's support vectors wore out and must be regenerated from scratch",
      "The original test set was too small and the 90% was always fake",
      "The RBF kernel degrades on its own over time regardless of the data",
      "Feature scaling silently reversed itself, so just re-standardize"
    ],
    explain: "The model still scores 90% on the original held-out set, so the model itself is unchanged; what changed is the world. When the live data distribution shifts (new customer behavior, new fraud patterns, seasonality), a fixed decision boundary that was optimal last year no longer matches today's inputs, and accuracy erodes even though nothing in the code moved. The remedy is to monitor input and label distributions for drift and retrain on recent data rather than trusting a frozen model.",
    simple: "The model didn't break — the world moved. Customers behave differently now, so a boundary drawn last year sits in the wrong place. You need to watch for drift and retrain on fresh data.",
    widget: W("The world drifts under a fixed model", "Watch live accuracy decay over months as the input distribution shifts away from training.",
      "months since training →", ["0", "3", "6", "12"],
      "live accuracy", [90, 86, 81, 76], "Time elapsed",
      [{ max: 0, text: "At deployment the boundary matches the data and accuracy is high.", tone: "info" },
       { max: 2, text: "As inputs drift month by month, the frozen boundary fits worse and accuracy slides.", tone: "info" },
       { max: 3, text: "🤯 The model is unchanged (still 90% on old data) yet live accuracy fell 14 points — the data moved, not the model.", tone: "wow" }],
      { name: "Data drift", formula: "input distribution shifts => fixed boundary decays, retrain", text: "Steady live decay with a stable offline score signals drift; monitor distributions and retrain on recent data." })
  });
})();
