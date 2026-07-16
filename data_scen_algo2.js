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
      "The tree actually underfit the data — it is far too simple as it currently stands, and it really needs to be allowed to grow considerably deeper still",
      "The features all need to be standardized first, because a decision tree can never generalize on unscaled inputs",
      "The held-out test set is simply mislabeled in places, and the tree itself is actually working perfectly fine",
      "Decision trees are fundamentally incapable of ever exceeding 71% accuracy on any real-world dataset at all"
    ],
    explain: "A perfect training score with a much lower test score is the textbook signature of overfitting. An unpruned tree keeps splitting until each leaf is nearly pure, effectively memorizing noise in the training rows. The cure is to constrain growth (max depth, minimum samples per leaf, or cost-complexity pruning) so the tree captures general patterns rather than memorized specifics.",
    simple: "A tree left to grow forever builds a private rule for every single training example, like memorizing the answers instead of learning the subject. It aces practice and flunks the real test.",
    widget: W("Deeper is not always better", "Watch training and test accuracy diverge as a single tree is allowed to grow deeper.",
      "max tree depth →", ["2", "5", "10", "20", "none"],
      "training accuracy", [74, 86, 95, 99, 100], "Max depth",
      [{ max: 1, text: "Shallow trees leave both training and test accuracy modest but close together.", tone: "info" },
       { max: 3, text: "As depth grows, training accuracy races ahead while test accuracy stalls.", tone: "info" },
       { max: 4, text: "🤯 At full depth training hits 100% yet test accuracy is far lower — the gap IS the overfitting.", tone: "wow" }],
      { name: "Overfitting gap", formula: "big train/test gap = memorized noise, needs pruning", text: "When training accuracy climbs but test accuracy falls, the tree is memorizing — prune it back." },
      { series: [{ name: "Test accuracy", ys: [72, 80, 79, 74, 71] }] })
  });

  q("scen1", {
    q: "Your features are age (0-90), income (0-500,000), and number of accounts (0-12), all on wildly different scales. You will train a single decision tree. Do you need to standardize or normalize the features first?",
    choices: [
      "No — a decision tree splits one feature at a time on threshold rules, so it is invariant to feature scale and monotone transforms",
      "Yes — without any feature scaling at all, income will end up dominating every single split, simply because its raw numeric values are by far the largest ones",
      "Yes — decision trees internally compute distances between points, so leaving features unscaled badly distorts the geometry",
      "Yes — you must always min-max normalize every one of the features to the 0-1 range before fitting any kind of model",
      "No, but you first have to one-hot encode income into discrete buckets, or else the decision tree will simply fail to train"
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
      "Increase C all the way to a very large value on the plain linear kernel, until it somehow finally manages to fit the curved boundary between the classes",
      "Remove one of the two numeric features entirely, so that the decision boundary simply becomes a straight line",
      "Standardize the target labels themselves instead of standardizing the input features before training",
      "Add many thousands more training rows, since a linear SVM will eventually start to bend its own boundary"
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
      "Nothing at all is needed here — SVMs are completely scale-invariant, in exactly the same way that decision trees are",
      "Prune the model's support vectors down to a small fixed count first, before you actually begin training the SVM",
      "Convert every single one of the features into a discrete categorical bucket, so that the very notion of distance between two points becomes completely undefined",
      "Set the gamma hyperparameter all the way to zero, so that the feature scale simply no longer matters at all"
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
      "An RBF-kernel SVM, simply because it is usually the single most accurate classifier you can reach for",
      "A random forest of 300 separate trees, each one majority-voting on the outcome for each patient",
      "A deep neural network that has been exported onto the laminated card in the form of a formula",
      "k-nearest neighbours, which stores the entire training set in memory and looks up neighbours for each case"
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
      "The model must have failed to train properly, because it ended up using only 40 of the available points",
      "You will need to keep on retraining the model over and over again until every last one of all 2,000 of the training points has finally become a support vector",
      "Those 40 support vectors are exactly the misclassified points in the data, and they should therefore simply be deleted",
      "The support vectors are actually completely irrelevant to where the final decision boundary ends up sitting"
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
      "Always just pick the random forest in this situation — a 90% score very comfortably beats 84%, and when it really comes down to it, raw predictive accuracy is genuinely the only thing that ever actually matters when you are choosing a model to ship",
      "Always just pick the single decision tree in every case, because simpler and more readable models are quite simply always the correct and safest choice to make",
      "You can simply combine the two approaches by averaging together the single tree's prediction and the whole forest's prediction on every case, and doing that neatly gives you both the forest's full accuracy and the single tree's complete per-decision readability at the very same time, with no real trade-off left to worry about at all",
      "Just scale and standardize all of the input features beforehand, and then the single decision tree will comfortably reach the very same 90% accuracy that the forest gets too"
    ],
    explain: "A single tree exposes an exact root-to-leaf reason for every prediction, while a random forest averages hundreds of trees and trades that readability for accuracy and stability. Neither wins universally: the right call depends on whether the extra 6 points outweigh the loss of a clean per-decision explanation. In regulated or safety settings the readable tree can be worth more than the accuracy; in a low-stakes recommender the forest usually wins.",
    simple: "One clear tree tells you exactly why. A forest of 400 trees is more accurate but can only say 'the crowd voted this way'. You are trading reasons for a few points of accuracy.",
    widget: W("Accuracy vs a readable reason", "Compare a single tree against growing ensembles on accuracy and on interpretability.",
      "ensemble size →", ["1 tree", "10 trees", "100 trees", "400 trees"],
      "test accuracy", [84, 88, 90, 90], "Trees in ensemble",
      [{ max: 0, text: "One pruned tree is fully readable but leaves some accuracy on the table.", tone: "info" },
       { max: 2, text: "Adding trees lifts and stabilizes accuracy but blurs the per-decision reason.", tone: "info" },
       { max: 3, text: "🤯 Interpretability falls off a cliff long before accuracy plateaus — the two axes move in opposite directions.", tone: "wow" }],
      { name: "The core trade-off", formula: "ensemble +accuracy, -readable reason", text: "Growing an ensemble buys accuracy and stability but spends interpretability — weigh what the use case needs." },
      { series: [{ name: "Interpretability", ys: [95, 55, 30, 22] }] })
  });

  q("scen2", {
    q: "Tuning an RBF-SVM, small C gives a wide soft margin that misclassifies a few training points; large C gives a narrow hard margin that fits training points tightly. How should you choose C?",
    choices: [
      "C controls the bias-variance trade-off: small C tolerates margin violations for a smoother, more general boundary (more bias), large C fits training points hard (more variance) — tune it by cross-validation to the setting with best held-out accuracy",
      "Always just use the very largest possible value of C that you can manage, since getting the model to fit every single one of the training points perfectly and exactly is really the whole entire goal of training any support vector machine in the first place, no matter the dataset",
      "Always simply use the smallest possible value of C that you can, because a simpler and smoother model is quite simply always the safer and more reliable choice to make in absolutely every situation you will ever encounter",
      "The C hyperparameter only ever changes how fast the model trains, and it genuinely has no effect whatsoever on where the final decision boundary actually ends up being placed by the SVM",
      "Just set the value of C equal to the total number of input features that you have, and doing exactly that is essentially guaranteed to give you the very best possible results every single time without any tuning at all"
    ],
    explain: "In an SVM, C is the penalty for margin violations: a small C lets some points sit inside or across the margin in exchange for a wider, smoother boundary that generalizes better (higher bias, lower variance), while a large C forces the boundary to classify training points correctly at the cost of a narrow margin that can overfit (lower bias, higher variance). There is no universally best value — you sweep C and pick the one with the best cross-validated accuracy. This is the SVM's version of the bias-variance balance.",
    simple: "Small C says 'draw a smooth line and ignore a few troublemakers.' Large C says 'bend over backwards to get every training point right.' Too smooth underfits, too rigid overfits — cross-validation finds the sweet spot.",
    widget: W("Tuning C: soft vs hard margin", "Sweep the C penalty and watch training and validation accuracy diverge.",
      "C (margin penalty) →", ["0.01", "0.1", "1", "10", "1000"],
      "training accuracy", [79, 86, 91, 96, 100], "C value",
      [{ max: 1, text: "Very small C keeps the margin wide and soft, underfitting the training data.", tone: "info" },
       { max: 2, text: "A moderate C balances margin width against training fit — validation peaks here.", tone: "info" },
       { max: 4, text: "🤯 Push C too high and training accuracy hits 100% while validation drops — a hard margin overfits.", tone: "wow" }],
      { name: "C trade-off", formula: "small C = more bias/smoother, large C = more variance/overfit", text: "C sets the SVM's bias-variance balance; cross-validate rather than maxing it out." },
      { series: [{ name: "Validation accuracy", ys: [77, 85, 90, 87, 80] }] })
  });

  q("scen2", {
    q: "With an RBF-SVM you must also set gamma. Small gamma gives each point a wide influence (smooth boundary); large gamma gives each point a tiny, local influence (wiggly boundary). What is the trade-off and how do you set it?",
    choices: [
      "Gamma sets the reach of each training point: small gamma = smooth, possibly underfit boundary; large gamma = highly local boundary that can overfit by wrapping tightly around individual points — tune gamma (jointly with C) by cross-validation",
      "A larger value of gamma is always strictly better in every single case, simply because a bigger gamma makes the model fit the fine details of the training data far more precisely and much more exactly than any smaller value could ever hope to do on its own",
      "A smaller value of gamma is always strictly better in every possible situation, because a smoother and less wiggly decision boundary is quite simply always the safer and more dependable option to reach for no matter the data",
      "The gamma hyperparameter only ever actually matters when you are using the plain linear kernel, and it has no effect at all whenever you happen to be using the RBF kernel instead",
      "The gamma value should always simply be fixed to be exactly equal to the value of C at absolutely all times, in every model you ever train, without any exception whatsoever"
    ],
    explain: "In the RBF kernel, gamma controls how far a single training example's influence reaches: a small gamma spreads influence widely for a smooth boundary that may underfit, while a large gamma shrinks influence to a tiny neighborhood so the boundary can bend around individual points and overfit. Because gamma and C interact, they are tuned together (a grid search over both) and chosen by held-out performance. Neither extreme is universally right — it is a bias-variance dial like C.",
    simple: "Gamma is how far each point's 'vote' reaches. Small gamma blurs everything into a smooth line; large gamma lets each point carve its own bump. Too blurry underfits, too bumpy overfits.",
    widget: W("Tuning gamma: reach of each point", "Sweep RBF gamma and watch the boundary go from too smooth to too wiggly.",
      "gamma (point reach) →", ["0.001", "0.01", "0.1", "1", "10"],
      "training accuracy", [80, 87, 92, 98, 100], "Gamma value",
      [{ max: 1, text: "Tiny gamma gives every point a wide reach, producing a smooth boundary that can underfit.", tone: "info" },
       { max: 2, text: "A moderate gamma matches the boundary's true curvature — validation peaks.", tone: "info" },
       { max: 4, text: "🤯 Huge gamma makes each point an island, so training hits 100% while validation collapses — classic overfit.", tone: "wow" }],
      { name: "Gamma trade-off", formula: "small gamma = smooth/underfit, large gamma = local/overfit", text: "Gamma tunes boundary flexibility; grid-search it together with C on held-out data." },
      { series: [{ name: "Validation accuracy", ys: [78, 86, 91, 82, 66] }] })
  });

  q("scen2", {
    q: "You need a classifier that retrains nightly on a growing dataset and returns predictions in under a millisecond on tens of features. You are weighing a pruned decision tree against an RBF-kernel SVM. What is the practical trade-off?",
    choices: [
      "The tree trains and predicts very fast and scales well with rows, while the RBF-SVM can be more accurate on complex boundaries but its training scales poorly with dataset size and prediction cost grows with the number of support vectors — favor the tree if speed and frequent retraining dominate",
      "The support vector machine is actually always the faster of the two models in practice, simply because it only ever keeps and stores the small handful of support vectors rather than the entire dataset, so serving it is cheap",
      "The decision tree is quite simply always strictly more accurate than any support vector machine could ever possibly be on this kind of data, so the one and only real reason you would ever even consider using the RBF-SVM here at all is if you happened to care about raw prediction speed far above every other consideration you might have",
      "Both of these two models have essentially identical training costs as the dataset grows, so in the end you can quite safely just pick either one of them completely at random and expect the same behaviour either way",
      "Neither of the two models is actually capable of returning a prediction in under a single millisecond at this scale, so what you really need to do instead is reach for a deep neural network to meet the tight latency budget you have"
    ],
    explain: "Decision trees train roughly in n-log-n time and predict in the depth of the tree, so they stay fast as data grows and are cheap to retrain nightly. Kernel SVMs must work with pairwise similarities and their training time grows steeply (roughly quadratic-to-cubic in the number of rows), while prediction cost scales with the number of support vectors. If the workload demands frequent retraining and sub-millisecond inference at growing scale, the tree's speed usually outweighs the SVM's possible accuracy edge on curved boundaries.",
    simple: "A tree is quick to build and quick to answer, even as data piles up. A kernel SVM can be sharper on tricky boundaries but gets slow to train as rows grow — for nightly retrains and instant answers, the tree wins.",
    widget: W("Speed vs boundary power at scale", "Compare relative training time of a tree and an RBF-SVM as the row count grows.",
      "training rows →", ["1k", "10k", "100k", "1M"],
      "SVM training cost (rel.)", [5, 30, 70, 100], "Dataset size",
      [{ max: 1, text: "At small scale both models train quickly and the difference is minor.", tone: "info" },
       { max: 2, text: "Kernel-SVM training cost climbs steeply with rows while the tree stays cheap.", tone: "info" },
       { max: 3, text: "🤯 At a million rows the SVM's training cost explodes while the tree barely moves — scale flips the decision.", tone: "wow" }],
      { name: "Scaling trade-off", formula: "kernel SVM training ~ quadratic-cubic; tree ~ n log n", text: "For frequent retrains at growing scale, a tree's speed usually beats a kernel SVM's accuracy edge." },
      { series: [{ name: "Tree training cost (rel.)", ys: [3, 8, 14, 22] }] })
  });

  q("scen2", {
    q: "Your single decision tree is unstable: a small change to the training data reshuffles the whole tree and test accuracy swings between 80% and 88%. You value both stability and reasonable interpretability. What is the balanced move?",
    choices: [
      "Use a random forest or moderately limit tree depth: averaging many trees (or shallower trees) cuts variance and stabilizes accuracy, trading some of the single tree's exact readability for robustness — pick the balance the use case needs",
      "Just keep the single unpruned decision tree exactly as it currently is, and then simply retrain it over and over and over again until you eventually happen to land on one of the lucky 88% accuracy runs, and then go ahead and ship that particular fortunate one to production",
      "Switch over to using a plain linear SVM instead, since a linear support vector machine is essentially guaranteed to be strictly more accurate than any decision tree could ever manage to be on this dataset",
      "Just standardize and rescale all of the input features first, and once you have done that the single decision tree will completely stop changing its structure every time the data is nudged",
      "Simply grow the single decision tree even deeper than it already is, because allowing a tree to become much deeper is what actually makes its predictions far more stable and far less jumpy overall"
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
      "Always just pick the RBF kernel together with the very largest possible value of C that you can manage to use, since the combination of full RBF kernel flexibility plus a perfectly hard, unforgiving margin is quite simply and strictly the single best possible option in absolutely every single case that you will ever happen to meet in practice",
      "Always just pick the plain linear SVM in this situation, since a linear support vector machine is completely and totally immune to any and all effects of class imbalance in the training data no matter what",
      "Simply drop the entire minority class out of the dataset altogether, so that the two remaining classes then end up being perfectly and exactly balanced against one another before you train",
      "Just set the value of C all the way to infinity, so that the trained model then never once violates its own margin on any of the crowded majority-class training points at all"
    ],
    explain: "With imbalance and noisy/missing labels, a hard margin (very large C) will contort the boundary to satisfy the crowded, noisy majority and overfit. A softer margin (smaller C) tolerates violations for a more general boundary, and class weighting counteracts the 4-to-1 imbalance so the minority is not ignored. Whether linear or RBF wins depends on the true boundary shape, so you cross-validate both on an imbalance-aware metric rather than assuming one is universally superior.",
    simple: "When one class dwarfs the other and labels are noisy, forcing the SVM to get every point right just makes it chase the majority's noise. Loosen the margin, weight the rare class, and let a fair test pick the kernel.",
    widget: W("Softness helps with imbalance and noise", "Sweep C on an imbalanced, noisy dataset and track minority-class recall.",
      "C (margin penalty) →", ["0.1", "1", "10", "100"],
      "majority-class accuracy", [88, 92, 95, 97], "C value",
      [{ max: 0, text: "A softer margin plus class weights keeps the minority class visible.", tone: "info" },
       { max: 1, text: "As C rises, the boundary favors the crowded majority and minority recall slips.", tone: "info" },
       { max: 3, text: "🤯 Big C looks great on majority accuracy while minority recall craters — the metric you watch changes the winner.", tone: "wow" }],
      { name: "Imbalance-aware SVM", formula: "softer C + class weights, choose kernel by CV", text: "With imbalance and noise, prefer a softer margin and weighted classes, and let held-out metrics pick the kernel." },
      { series: [{ name: "Minority-class recall", ys: [74, 70, 58, 44] }] })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "A decision tree predicting hospital readmission scores an astonishing 99% test accuracy. You notice one feature is 'discharge_disposition = readmitted-later', populated after the outcome is known. What is really happening?",
    choices: [
      "Target leakage — a feature that encodes the outcome sneaked in, so the tree just reads the answer; remove it and re-evaluate, expecting far lower honest accuracy",
      "The decision tree is genuinely excellent as it stands, and it should therefore be deployed to production immediately without any further changes",
      "The decision tree has actually underfit the training data quite badly, and it simply needs to be allowed to grow considerably deeper still in order to push past its current 99% figure",
      "The input features all just need to be standardized properly, which will bring the reported accuracy back down to a more believable level",
      "A test accuracy of 99% is completely normal and expected for decision trees, and it therefore requires no further scrutiny at all"
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
      "Tree B is quite legitimately the genuinely better of the two models here, simply and entirely because it actually went to the trouble of trying out very many more different hyperparameter configurations than Tree A ever bothered to do during the whole of its own tuning process",
      "Cross-validation as a technique always systematically underestimates the true accuracy of any model, so Tree A's cross-validated number must therefore simply be wrong and far too low to trust here",
      "Tree B simply must be the more accurate model of the two, because doing a great deal more hyperparameter tuning like that always reliably leads to better generalization on genuinely new, unseen data",
      "The two models are perfectly directly comparable to each other exactly as reported, and when you line them up side by side like that Tree B quite simply and clearly wins the comparison outright"
    ],
    explain: "Selecting the best of 200 configurations by their test-set score lets the test set leak into model selection: with enough tries, one config scores high by chance, and reporting that maximum is optimistically biased. Cross-validation (or a held-out set touched only once) gives an honest estimate because the evaluation data was not used to pick the winner. Tree B's headline number is inflated; the fair comparison uses Tree A's cross-validated score or a fresh untouched test set for both.",
    simple: "If you take 200 exams and report only your best score, that number flatters you. Tree B did exactly that on the test set, so its 'win' is partly luck, not skill.",
    widget: W("Peeking inflates the score", "Watch the reported best-of-k test accuracy drift above the true accuracy as you try more configs.",
      "configs tried, best kept →", ["1", "10", "50", "200"],
      "reported best test accuracy", [82, 85, 87, 89], "Search size",
      [{ max: 0, text: "With one config the test score is an honest estimate.", tone: "info" },
       { max: 2, text: "Keeping the best of many configs by test score drifts the number upward.", tone: "info" },
       { max: 3, text: "🤯 The true accuracy stayed at 82% — the extra 7 points are pure test-set overfitting from repeated peeking.", tone: "wow" }],
      { name: "Selection bias", formula: "best-of-many on test set = optimistic, inflated estimate", text: "Tuning on the test set leaks it into selection; use cross-validation for an honest comparison." },
      { series: [{ name: "True accuracy", ys: [82, 82, 82, 82] }] })
  });

  q("scen3", {
    q: "You standardize your features and then train an RBF-SVM with 5-fold cross-validation, fitting the scaler on the FULL dataset before splitting. CV accuracy is 91% but production accuracy is 84%. What went wrong?",
    choices: [
      "Data leakage in preprocessing — the scaler's mean and standard deviation were computed using the validation folds, leaking their statistics into training; fit the scaler inside each fold (on training data only) so CV reflects real performance",
      "The RBF kernel itself is simply fundamentally unreliable in general, and it really ought to just be swapped out and replaced with a plain linear kernel instead so the numbers finally agree",
      "The gap between the two numbers is completely normal and can safely just be ignored entirely, since an accuracy of 84% is really quite close enough to the 91% figure for all practical purposes anyway",
      "You should really be standardizing the target labels themselves as well, in addition to standardizing all of the input features, and doing both together is what will finally close the gap you are seeing",
      "Cross-validation as a method always reliably overestimates the true production accuracy by very nearly exactly this same fixed amount each and every single time you ever run it, so the difference that you happened to see here is completely expected and really nothing at all to worry about"
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
      "The SVM is genuinely excellent as it is, and it simply needs to be given a somewhat bigger value of C so that it can finally start catching that last remaining 0.7% of fraud cases too",
      "The input features involved here must simply all be left unscaled by mistake, and that missing feature scaling is really the whole reason that so much of the actual fraud is being missed entirely",
      "A score of 99.3% clearly proves on its own that the model generalizes extremely well, and it therefore needs no further evaluation with any other metric of any kind whatsoever",
      "The RBF kernel currently in use should simply be swapped out and replaced with a plain linear kernel instead, since doing exactly that will reliably raise the overall accuracy even further still"
    ],
    explain: "When only 0.7% of cases are fraud, a trivial classifier that always says 'not fraud' scores 99.3% accuracy while catching zero fraud, so a high accuracy number is meaningless here. The right metrics focus on the rare positive class: precision and recall, their F1 balance, or the area under the precision-recall curve. The SVM likely placed its boundary to satisfy the overwhelming majority; you would add class weights or adjust the threshold and then measure with imbalance-aware metrics.",
    simple: "Saying 'no fraud' about everyone is right 99.3% of the time and catches no crooks. Accuracy is fooled by the rare class — look at how much fraud you actually catch (recall) and how clean your alerts are (precision).",
    widget: W("Accuracy lies under imbalance", "Compare a do-nothing classifier and a real fraud model on accuracy versus fraud recall.",
      "model →", ["always 'not fraud'", "real fraud SVM"],
      "overall accuracy", [99, 97], "Model",
      [{ max: 0, text: "Predicting the majority for everyone scores 99% accuracy and catches zero fraud.", tone: "info" },
       { max: 1, text: "🤯 A genuinely useful model can show LOWER accuracy while catching far more fraud — accuracy is the wrong lens.", tone: "wow" }],
      { name: "Wrong-metric trap", formula: "rare positives => use precision/recall/PR-AUC, not accuracy", text: "Under heavy imbalance, accuracy rewards ignoring the rare class; measure the positive class directly." },
      { series: [{ name: "Fraud recall", ys: [0, 71] }] })
  });

  q("scen3", {
    q: "A decision tree ranks 'customer_id_hash' as its top feature by importance and splits on it heavily, giving high training accuracy. Why should this alarm you?",
    choices: [
      "A near-unique identifier lets the tree memorize individual rows rather than learn a pattern, inflating training accuracy and gutting generalization; drop ID-like high-cardinality features and re-evaluate",
      "This is actually really great news — it simply means the decision tree has successfully found the single most predictive and most valuable feature there is in the entire dataset",
      "Customer ID values like this one are quite simply always the very strongest and most legitimate predictive signal that you will ever find anywhere in customer churn data",
      "The decision tree simply just needs to be allowed to make even deeper and more numerous splits on the customer ID feature, because allowing exactly that is precisely what will let it go on to reach an even higher training accuracy than it already has",
      "You should really just standardize the customer ID hash values first, so that the feature's importance then ends up being measured completely fairly against all of the other features"
    ],
    explain: "A high-cardinality, near-unique feature like an ID hash lets a tree carve the data into tiny leaves that each match a handful of rows, effectively memorizing the training set and posting misleadingly high training importance and accuracy. Such a feature carries no generalizable signal — the same IDs will not recur in new data — so test performance collapses. The correct move is to exclude identifiers and other leaky high-cardinality keys before training and re-measure.",
    simple: "Splitting on a customer ID is like acing a test by memorizing which student sat in which seat. It works on the practice roster and tells you nothing about new customers.",
    widget: W("An ID feature memorizes, not learns", "Watch train and test accuracy diverge when a near-unique ID feature is included.",
      "ID feature →", ["included", "removed"],
      "training accuracy", [98, 83], "Feature set",
      [{ max: 0, text: "Splitting on a near-unique ID pushes training accuracy high by memorizing rows.", tone: "info" },
       { max: 1, text: "🤯 Remove the ID and training accuracy drops toward the honest test number — the 'importance' was memorization.", tone: "wow" }],
      { name: "High-cardinality trap", formula: "near-unique IDs => memorization, fake importance", text: "Drop identifier-like high-cardinality features; a tree will memorize them instead of learning." },
      { series: [{ name: "Test accuracy", ys: [79, 82] }] })
  });

  q("scen3", {
    q: "An RBF-SVM trained last year on transaction data has quietly dropped from 90% to 76% live accuracy, though it still scores 90% when re-tested on the original held-out set. Nothing in the code changed. What is the most likely cause?",
    choices: [
      "Data drift — the live input distribution has shifted away from the training data, so the fixed boundary no longer fits; monitor the input/label distributions and retrain on recent data",
      "The SVM's own support vectors have simply worn out and degraded over the past year, and they must now all be fully regenerated again completely from scratch to restore the model",
      "The original held-out test set was quite simply always far too small right from the very beginning, which really means that the impressive 90% figure it kept giving was actually completely fake and untrustworthy the entire time all along",
      "The RBF kernel itself just naturally degrades and gets worse all on its own steadily over time, completely regardless of whether the underlying data has changed at all or not",
      "The feature scaling that was applied must have silently reversed itself somehow at some point, so the correct fix is simply to go back and re-standardize all of the features once again"
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
