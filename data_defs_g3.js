/* Definition questions batch g3 (rf1, gb1, stack1). */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }

  /* ===================== rf1 : Random forests / bagging (10) ===================== */

  add("rf1", {
    q: "What is a random forest?",
    choices: [
      "An ensemble of many decision trees, each grown on a bootstrap sample using a random subset of features, whose predictions are combined by majority vote (classification) or averaging (regression)",
      "A single very deep decision tree that is pruned repeatedly on a validation set until its error stops improving, then bagged with copies of itself to smooth out its remaining prediction variance",
      "A sequence of trees where each new tree is trained to correct the errors of the tree before it, reweighting the misclassified rows more heavily every round until the summed predictions converge",
      "A method that grows exactly one decision tree per class label and, at prediction time, picks whichever tree reports the single highest confidence score for the row being classified",
      "A hierarchical clustering method that groups the training rows into a branching tree of nested clusters and reads off the leaf a new point falls into as its predicted label"
    ],
    explain: "A random forest combines many de-correlated decision trees. Each tree sees a bootstrap resample of the rows and, at every split, only a random subset of the features, so the trees make different mistakes. Averaging (or voting over) their predictions cancels much of the individual-tree variance and yields a more stable, accurate model.",
    simple: "A random forest is a crowd of decision trees that each saw slightly different data, then take a vote. One tree can be wildly wrong; the crowd usually isn't.",
    widget: {
      type: "curveStatic", title: "One tree vs the forest",
      world: "Number of trees whose votes we average", xlab: "trees in the forest →",
      xs: [0,1,2,3,4], labels: ["1","5","25","100","300"], dec: 0, yunit: "%",
      series: [{ name: "test accuracy", ys: [78, 85, 89, 91, 91] }],
      knob: { label: "trees", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One tree: 78%. It overfits its own quirks of the data.", tone: "info" },
        { max: 3, text: "Add trees and accuracy climbs and steadies as votes cancel individual mistakes.", tone: "info" },
        { max: 4, text: "🤯 A random forest is exactly this: many voting trees, each on a bootstrap sample with random features.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Random forest", formula: "forest = majority-vote / average over many bootstrapped, feature-random trees",
        text: "Different trees, different mistakes — the vote keeps what they agree on." }
    }
  });

  add("rf1", {
    q: "What is bagging (bootstrap aggregating)?",
    choices: [
      "Training many copies of a model on different bootstrap resamples of the data, then aggregating their predictions by voting or averaging to reduce variance",
      "Training a single model and then re-weighting the misclassified rows more heavily on each pass, so later passes focus on the examples the earlier ones kept getting wrong",
      "Splitting the features into disjoint bags and training a separate model on each feature group, then concatenating their outputs into one long combined prediction vector",
      "Compressing a fully trained model so it fits in a smaller memory footprint, pruning redundant weights until inference runs faster on limited hardware without much accuracy loss",
      "Repeatedly pruning a model's parameters until only the most important ones remain, retraining after each round to recover the accuracy lost by the earlier cuts"
    ],
    explain: "Bagging is the general recipe behind random forests. You draw many bootstrap samples (random draws with replacement) from the training set, fit one model per sample, and combine their outputs. Because each model overfits a different resample, aggregating cancels much of that noise and lowers variance without much added bias.",
    simple: "Bagging means: train the same kind of model many times on shuffled-up copies of your data, then average their answers. The averaging smooths out flukes.",
    widget: {
      type: "curveStatic", title: "Averaging cancels noise",
      world: "How many bagged models we average together", xlab: "models aggregated →",
      xs: [0,1,2,3,4], labels: ["1","3","10","30","100"], dec: 1, yunit: "",
      series: [{ name: "prediction variance", ys: [1.0, 0.55, 0.28, 0.14, 0.09] }],
      knob: { label: "models", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single model has the full variance of one noisy fit.", tone: "info" },
        { max: 3, text: "Aggregating more bootstrap models drives the variance steadily down.", tone: "info" },
        { max: 4, text: "🤯 That variance drop from averaging resampled models is exactly what bagging buys you.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bagging", formula: "bag = aggregate( model(bootstrap_1), … , model(bootstrap_B) )",
        text: "Same learner, many resamples, one combined vote — variance falls." }
    }
  });

  add("rf1", {
    q: "What is a bootstrap sample?",
    choices: [
      "A dataset of the same size as the original, drawn by sampling rows uniformly at random WITH replacement, so some rows repeat and others are left out",
      "A small fixed holdout carved off the front of the dataset before any training begins, kept untouched so it can later report an unbiased estimate of test error",
      "The subset of features randomly chosen at a single tree split, resampled independently at every node so that no one column is ever considered twice in one path",
      "A perfectly stratified sample that preserves the exact class balance of the original, drawn without replacement so that every distinct row appears at most one time",
      "The first few rows of the data, taken in their original order, used to sanity-check that the whole pipeline runs end to end before the real training begins"
    ],
    explain: "A bootstrap sample is built by drawing rows one at a time, with replacement, until you have as many rows as the original set. Because of replacement, a given row may appear several times or not at all — on average about 63% of the unique rows appear, and the rest are 'out-of-bag'. This resampling is what makes each bagged model see a different dataset.",
    simple: "A bootstrap sample is your data reshuffled by picking rows at random and allowing repeats. Some rows show up twice, some don't show up at all.",
    widget: {
      type: "curveStatic", title: "Who makes it into the sample",
      world: "Draws with replacement from an N-row dataset", xlab: "sample size (× N) →",
      xs: [0,1,2,3,4], labels: ["0","0.25N","0.5N","N","2N"], dec: 0, yunit: "%",
      series: [{ name: "unique rows included", ys: [0, 22, 39, 63, 86] }],
      knob: { label: "draws", min: 0, max: 4, step: 1, init: 3 },
      insights: [
        { max: 2, text: "Few draws, few unique rows — lots of the data is untouched.", tone: "info" },
        { max: 3, text: "At a full N draws with replacement, ~63% of unique rows appear.", tone: "info" },
        { max: 4, text: "🤯 The rows left out at size N are the out-of-bag set — a free validation slice.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Bootstrap sample", formula: "N draws WITH replacement → ≈63% unique rows in, ≈37% out-of-bag",
        text: "Repeats and gaps are the point — that variation de-correlates the models." }
    }
  });

  add("rf1", {
    q: "What is out-of-bag (OOB) error?",
    choices: [
      "An estimate of a bagged model's test error computed by scoring each training row using only the trees whose bootstrap sample did NOT include that row",
      "The error the forest makes on rows whose feature values fall outside the numeric range seen during training, where every tree is forced to extrapolate past its own leaves",
      "The plain training error averaged across every tree in the forest, measured on the very rows each tree was fit on, before any aggregation of their individual votes",
      "The error introduced when a tree runs out of unused features to split on and is forced to stop growing before it has fully separated the remaining classes",
      "The gap between the best and the worst single tree in the ensemble, measured on a shared holdout and used as a rough proxy for how unstable the whole forest is"
    ],
    explain: "Because each bootstrap sample leaves out roughly a third of the rows, every training row is 'out-of-bag' for the subset of trees that never saw it. Predicting each row with only those trees and comparing to the truth gives an almost-free, nearly unbiased estimate of generalization error — no separate validation set required.",
    simple: "Each tree skipped some rows during training. To grade the forest for free, ask each row's opinion only from the trees that never saw it. That score is the OOB error.",
    widget: {
      type: "curveStatic", title: "OOB tracks the real test error",
      world: "Trees added to the forest", xlab: "trees →",
      xs: [0,1,2,3,4], labels: ["10","30","100","300","1000"], dec: 1, yunit: "%",
      series: [
        { name: "OOB error", ys: [14.0, 11.5, 10.2, 9.8, 9.7] },
        { name: "held-out test error", ys: [13.6, 11.3, 10.1, 9.7, 9.6] }
      ],
      knob: { label: "trees", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "With few trees, the OOB estimate is noisy but already close to the test error.", tone: "info" },
        { max: 3, text: "As trees accumulate, OOB and true test error track each other tightly.", tone: "info" },
        { max: 4, text: "🤯 OOB gives you a validation-quality estimate without spending any data on a holdout.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Out-of-bag error", formula: "OOB: score each row with only the trees that excluded it",
        text: "Free, near-unbiased generalization estimate baked into bagging." }
    }
  });

  add("rf1", {
    q: "What is feature bagging (the random subspace method)?",
    choices: [
      "Restricting each tree split to a random subset of the features, so no single strong feature dominates every tree and the trees become less correlated",
      "Discarding the least important features once, up front, using a filter score computed before any tree is grown, so every tree then trains on the same reduced column set",
      "Giving each tree the full feature set but only a random subset of the rows, so the columns never vary while the sampled training examples differ from tree to tree",
      "Averaging the feature values across groups of rows to create a smaller, denser feature set, then growing every tree in the forest on those compressed synthetic columns",
      "Sorting the features into bags by their data type and training one separate tree per type, then concatenating the per-type trees together into the final forest"
    ],
    explain: "On top of row bootstrapping, random forests add feature bagging: at each split a tree may only consider a randomly chosen subset of the columns (often √p for classification). This stops one very predictive feature from being chosen first in every tree, which would make all the trees look alike. Weaker features get their turn, the trees de-correlate, and the ensemble average improves.",
    simple: "At every split, a forest's tree is only allowed to look at a random handful of features. That forces variety, so the trees don't all copy each other.",
    widget: {
      type: "curveStatic", title: "Fewer features per split → less correlated trees",
      world: "Features considered at each split (out of 30)", xlab: "features per split →",
      xs: [0,1,2,3,4], labels: ["1","3","√30≈5","15","30 (all)"], dec: 2, yunit: "",
      series: [{ name: "avg correlation between trees", ys: [0.18, 0.28, 0.34, 0.61, 0.88] }],
      knob: { label: "features/split", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 2, text: "Around √p features per split, trees stay diverse — the sweet spot forests default to.", tone: "info" },
        { max: 3, text: "Allow more features and every tree keeps picking the same strong split.", tone: "info" },
        { max: 4, text: "🤯 Using ALL features per split makes the trees nearly identical — averaging then buys almost nothing.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Feature bagging / random subspace", formula: "each split searches a random subset of features (≈√p)",
        text: "Randomizing the columns de-correlates the trees so the vote actually helps." }
    }
  });

  add("rf1", {
    q: "In an ensemble, what does 'variance reduction' mean?",
    choices: [
      "Lowering how much a model's predictions swing when it is retrained on different samples, achieved by averaging many models so their independent errors cancel",
      "Shrinking the numeric range of the input features so they all share a common scale, which keeps distance-based splits from being dominated by the widest-ranged column",
      "Reducing the number of input features until the model has fewer parameters to estimate, trading a little accuracy for a smaller, faster model that is easier to interpret",
      "Cutting the training set down to fewer rows so the model trains faster on each pass, accepting a noisier fit in exchange for shorter wall-clock training time overall",
      "Forcing every tree in the forest to make the exact same prediction for consistency, so the ensemble always returns one agreed answer no matter which tree is queried"
    ],
    explain: "A single deep tree is a low-bias, high-variance learner: small changes in the data can flip its predictions. Averaging many such trees, each fit to a different resample, reduces variance because their fluctuations are partly independent and cancel out. This is the core reason bagging and random forests generalize better than one tree.",
    simple: "One tree's answer wobbles a lot depending on the data it saw. Average many trees and the wobble mostly cancels — that steadier answer is variance reduction.",
    widget: {
      type: "curveStatic", title: "Averaging steadies the answer",
      world: "Models averaged together", xlab: "models →",
      xs: [0,1,2,3,4], labels: ["1","4","16","64","256"], dec: 2, yunit: "",
      series: [{ name: "variance of the prediction", ys: [1.00, 0.34, 0.15, 0.07, 0.05] }],
      knob: { label: "models", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A lone model carries its full variance.", tone: "info" },
        { max: 3, text: "Each extra averaged model shaves the variance further — errors partly cancel.", tone: "info" },
        { max: 4, text: "🤯 The bias barely changes; it is the variance that collapses. That trade is why ensembles win.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Variance reduction", formula: "Var(average of M models) ≈ Var(one model) / M  (when errors are independent)",
        text: "Ensembles cut variance, not bias — that's their whole trick." }
    }
  });

  add("rf1", {
    q: "In random forests, what is 'tree decorrelation'?",
    choices: [
      "Deliberately making the individual trees less similar to one another — via row bootstrapping and random feature subsets — so that averaging their errors cancels more of them",
      "Removing input features that are strongly correlated with one another before training the forest, keeping just one column from each correlated group to avoid double-counting",
      "Ordering the finished trees so that ones with correlated predictions are placed next to each other, making the whole ensemble easier to inspect when you walk through it",
      "Ensuring every tree in the forest reaches the exact same depth so that their leaf outputs stay directly comparable and can be averaged on one common numeric scale",
      "Rotating the feature axes with a linear transform so the inputs become statistically independent, then growing each of the trees inside that decorrelated coordinate space"
    ],
    explain: "Averaging only reduces variance to the extent the models' errors are independent. If all trees were trained the same way they would make the same mistakes and averaging would help little. Random forests inject randomness (bootstrap rows plus random feature subsets at each split) specifically to de-correlate the trees, so their errors diverge and the ensemble average benefits fully.",
    simple: "If all your trees think alike, averaging them is pointless. Random forests force the trees to differ — that difference is decorrelation, and it's what makes the vote worthwhile.",
    widget: {
      type: "curveStatic", title: "Correlation caps the benefit of averaging",
      world: "Average correlation between the trees", xlab: "tree-to-tree correlation ρ →",
      xs: [0,1,2,3,4], labels: ["0.0","0.2","0.4","0.7","1.0"], dec: 2, yunit: "",
      series: [{ name: "ensemble variance", ys: [0.05, 0.24, 0.43, 0.72, 1.00] }],
      knob: { label: "correlation ρ", min: 0, max: 4, step: 1, init: 1 },
      insights: [
        { max: 1, text: "Low correlation: averaging crushes the variance — the ideal case.", tone: "info" },
        { max: 3, text: "As trees grow alike, the averaged variance floor rises toward ρ.", tone: "info" },
        { max: 4, text: "🤯 Perfectly correlated trees (ρ=1) give NO variance reduction — decorrelation is the whole game.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Tree decorrelation", formula: "ensemble variance floor ≈ ρ · (single-tree variance)",
        text: "Randomness in rows and features lowers ρ so averaging pays off." }
    }
  });

  add("rf1", {
    q: "In a random forest, what is the n_estimators hyperparameter?",
    choices: [
      "The number of trees grown in the forest, whose votes are aggregated — more trees stabilize predictions but with diminishing returns and higher cost",
      "The maximum depth any individual tree is allowed to reach before it must stop splitting, capping how many nested questions a single decision path is able to ask",
      "The number of candidate features each tree is allowed to consider at a split, drawn fresh at every node to keep the trees from all picking the very same column",
      "The number of rows drawn with replacement into each bootstrap sample, setting how much of the data every individual tree in the forest gets to see while training",
      "The number of distinct classes the forest is trained to distinguish, fixing how many separate vote tallies the ensemble has to keep when it aggregates its trees"
    ],
    explain: "n_estimators sets how many trees the forest contains. Adding trees reduces the variance of the aggregated prediction and never causes overfitting on its own, but the gains flatten out: past a few hundred trees accuracy barely moves while training and prediction time keep growing. It is one of a forest's most important tuning knobs.",
    simple: "n_estimators is just 'how many trees'. More trees make the vote steadier, but after a while extra trees only cost time and add almost nothing.",
    widget: {
      type: "curveStatic", title: "Diminishing returns on more trees",
      world: "n_estimators (number of trees)", xlab: "n_estimators →",
      xs: [0,1,2,3,4], labels: ["10","50","200","500","2000"], dec: 1, yunit: "%",
      series: [{ name: "test accuracy", ys: [86.0, 89.5, 90.8, 91.0, 91.1] }],
      knob: { label: "n_estimators", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "Going from 10 to 50 trees buys a real accuracy jump.", tone: "info" },
        { max: 3, text: "By a few hundred trees the curve has all but flattened.", tone: "info" },
        { max: 4, text: "🤯 More trees never overfit — but past the plateau they just cost compute.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "n_estimators", formula: "n_estimators = number of trees aggregated in the forest",
        text: "Bigger is safer but slower; pick where the curve flattens." }
    }
  });

  add("rf1", {
    q: "How does a random forest aggregate its trees' predictions for CLASSIFICATION (majority voting)?",
    choices: [
      "Each tree casts one vote for a class, and the forest outputs the class that receives the most votes across all trees",
      "The forest averages the raw feature values that the trees happened to split on and thresholds that combined average to read off a single final class",
      "The forest returns the prediction of whichever single tree reports the highest confidence, ignoring how all of the remaining trees actually voted",
      "The forest multiplies the trees' predicted class labels together and then takes the sign of the resulting product as its answer",
      "The forest simply picks the class predicted by the single deepest, most fully grown tree in the whole ensemble"
    ],
    explain: "For classification, a random forest combines trees by majority (plurality) vote: every tree predicts a class, the votes are tallied, and the class with the most votes wins. (Averaging the trees' predicted class probabilities — 'soft' voting — is a common variant.) This aggregation is what turns many noisy tree opinions into one robust decision.",
    simple: "Each tree names a class; the forest goes with the class most trees named. It's a show of hands.",
    widget: {
      type: "curveStatic", title: "Votes pile up for the true class",
      world: "Trees voting in a two-class problem", xlab: "trees voting →",
      xs: [0,1,2,3,4], labels: ["1","5","21","101","501"], dec: 0, yunit: "%",
      series: [{ name: "chance the majority is correct", ys: [65, 76, 88, 96, 99] }],
      knob: { label: "trees", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "One tree that's 65% accurate is just a shaky guess.", tone: "info" },
        { max: 3, text: "Tally many better-than-chance votes and the majority is right far more often.", tone: "info" },
        { max: 4, text: "🤯 Independent-ish votes make the majority far more reliable than any single voter.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Majority voting", formula: "prediction = argmax_class Σ(tree votes for that class)",
        text: "The crowd's plurality beats any one tree." }
    }
  });

  add("rf1", {
    q: "How does a random forest aggregate its trees' predictions for REGRESSION (averaging)?",
    choices: [
      "Each tree outputs a number and the forest reports the mean of those numbers as its prediction",
      "The forest reports the single prediction of whichever one tree achieved the very lowest training error",
      "The forest takes the median of the split thresholds that were used across all of its trees",
      "The forest sums every tree's numeric output together without ever dividing, giving one running grand total",
      "The forest returns the range spanning the smallest and the largest individual tree output value"
    ],
    explain: "For regression there are no classes to vote on, so a random forest averages the numeric outputs of its trees. Because each tree's error is partly independent, the mean has lower variance than any single tree while keeping roughly the same bias — the same variance-reduction logic as classification voting, applied to continuous outputs.",
    simple: "For predicting a number, each tree gives its guess and the forest just averages them. Averaging cancels the trees' over- and under-shoots.",
    widget: {
      type: "curveStatic", title: "Averaging numeric guesses",
      world: "Trees whose numeric outputs we average", xlab: "trees averaged →",
      xs: [0,1,2,3,4], labels: ["1","5","25","100","400"], dec: 2, yunit: "",
      series: [{ name: "prediction error (RMSE)", ys: [3.10, 2.30, 1.95, 1.82, 1.79] }],
      knob: { label: "trees", min: 0, max: 4, step: 1, init: 1 },
      insights: [
        { max: 1, text: "A single tree's numeric guess is jumpy.", tone: "info" },
        { max: 3, text: "Averaging more trees smooths the estimate and lowers RMSE.", tone: "info" },
        { max: 4, text: "🤯 Same idea as voting, applied to numbers: the mean of many guesses beats any one.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Averaging (regression)", formula: "prediction = (1/T) Σ tree_t(x)",
        text: "For continuous targets the forest reports the mean of its trees." }
    }
  });

  /* ===================== gb1 : Gradient boosting (10) ===================== */

  add("gb1", {
    q: "What is gradient boosting?",
    choices: [
      "A boosting method that builds an additive model of trees one at a time, where each new tree is fit to the negative gradient (pseudo-residuals) of the loss so it corrects the current ensemble's errors",
      "A method that trains many deep trees fully in parallel on independent bootstrap samples and averages their votes into one prediction, so no tree ever depends on the residual errors left behind by another",
      "A method that grows a single decision tree and then boosts its accuracy purely by increasing its maximum depth, letting it keep splitting until it perfectly fits every training row it was given",
      "A method that re-scales each input feature by the gradient of the loss with respect to that feature before fitting one final tree on the reweighted, gradient-scaled columns",
      "A clustering method that boosts the density of crowded regions and shrinks sparse ones, then labels each new point by whichever region it lands in after the density reshaping settles"
    ],
    explain: "Gradient boosting builds an ensemble sequentially: it starts with a simple prediction, computes the gradient of the loss with respect to the current predictions (the pseudo-residuals), and fits a new weak tree to those. Each tree is added, scaled by a learning rate, to nudge predictions downhill on the loss. It is gradient descent performed in function space, one tree per step.",
    simple: "Gradient boosting adds small trees one after another, each one fixing the leftover mistakes of the trees so far. It's like sanding a surface smoother with each pass.",
    widget: {
      type: "curveStatic", title: "Errors shrink stage by stage",
      world: "Boosting rounds (trees added so far)", xlab: "boosting rounds →",
      xs: [0,1,2,3,4], labels: ["0","10","50","150","400"], dec: 2, yunit: "",
      series: [{ name: "training loss", ys: [1.00, 0.55, 0.28, 0.14, 0.08] }],
      knob: { label: "rounds", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Round 0 is a flat baseline guess with high loss.", tone: "info" },
        { max: 3, text: "Each added tree fits the current errors, stepping the loss downhill.", tone: "info" },
        { max: 4, text: "🤯 That stepwise descent on the loss, one tree per step, IS gradient boosting.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Gradient boosting", formula: "F_m(x) = F_{m-1}(x) + η · tree_m(x),  tree_m fit to −∂Loss/∂F",
        text: "Gradient descent in function space, one weak tree at a time." }
    }
  });

  add("gb1", {
    q: "What is boosting?",
    choices: [
      "An ensemble strategy that trains weak learners SEQUENTIALLY, each focusing on the examples the previous learners got wrong, and combines them into one strong learner",
      "An ensemble strategy that trains many fully independent learners in parallel on separate resamples and then averages their predictions together to smooth out variance",
      "A training strategy that steadily increases a model's learning rate over time to speed up convergence, taking larger and larger optimization steps as the run goes on",
      "A strategy that duplicates the single strongest model many times over and averages the identical copies together to squeeze out a little more prediction stability",
      "A preprocessing strategy that boosts the resolution of the input features before training, upsampling coarse columns into finer-grained ones the model can then split on"
    ],
    explain: "Boosting turns a collection of weak learners (only slightly better than chance) into a strong one by training them in sequence. Each learner concentrates on the mistakes left by its predecessors — via re-weighted examples (AdaBoost) or by fitting residuals/gradients (gradient boosting). The learners are then combined, typically as a weighted sum. This contrasts with bagging, which trains learners independently and in parallel.",
    simple: "Boosting trains models one after another, and each one pays special attention to what the last ones messed up. Together they add up to something strong.",
    widget: {
      type: "curveStatic", title: "Weak learners add up to strong",
      world: "Weak learners chained in sequence", xlab: "weak learners combined →",
      xs: [0,1,2,3,4], labels: ["1","3","10","30","100"], dec: 0, yunit: "%",
      series: [{ name: "ensemble accuracy", ys: [55, 66, 80, 89, 94] }],
      knob: { label: "learners", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "A single weak learner barely beats a coin flip (55%).", tone: "info" },
        { max: 3, text: "Chaining learners that each fix prior mistakes lifts accuracy fast.", tone: "info" },
        { max: 4, text: "🤯 Sequential error-correction is what separates boosting from parallel bagging.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Boosting", formula: "strong = Σ weak_m, each weak_m trained on prior mistakes (sequential)",
        text: "Many barely-better-than-chance learners, chained, become one strong model." }
    }
  });

  add("gb1", {
    q: "In gradient boosting, what is the learning rate (shrinkage)?",
    choices: [
      "A factor between 0 and 1 that scales down each new tree's contribution, so the ensemble learns in small careful steps and generalizes better",
      "The maximum depth to which each individual boosting tree is grown before it must stop splitting, fixing how many questions one weak learner is allowed to ask",
      "The fraction of training rows randomly sampled for each boosting round, controlling how much of the data every individual tree in the sequence gets to fit on",
      "The total number of trees added to the ensemble before training halts, setting the length of the whole boosting sequence in advance of the run",
      "The rate at which the training data is streamed into memory during fitting, tuned to keep the hardware busy without exhausting the available RAM"
    ],
    explain: "The learning rate η multiplies every tree before it is added to the ensemble. A small η (e.g. 0.1 or 0.01) means each tree corrects only a fraction of the current error, so the model improves gradually and is less likely to overfit — but it needs more trees to converge. Learning rate and number of trees trade off directly; tuning them together is central to gradient boosting.",
    simple: "The learning rate says how big a step each new tree is allowed to take. Small steps are safer and generalize better, but you need more of them.",
    widget: {
      type: "curveStatic", title: "Smaller steps, better generalization",
      world: "Learning rate η applied to each tree", xlab: "learning rate η →",
      xs: [0,1,2,3,4], labels: ["0.01","0.05","0.1","0.5","1.0"], dec: 1, yunit: "%",
      series: [{ name: "test error", ys: [9.5, 8.6, 8.4, 10.8, 13.5] }],
      knob: { label: "η", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "Tiny η is safe but needs many trees to get there.", tone: "info" },
        { max: 2, text: "A moderate η (~0.1) hits the sweet spot on test error.", tone: "info" },
        { max: 4, text: "🤯 Large η lets each tree overshoot — the model overfits and test error climbs.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Learning rate / shrinkage", formula: "F_m = F_{m-1} + η · tree_m,  0 < η ≤ 1",
        text: "Small η + more trees usually beats big η + few trees." }
    }
  });

  add("gb1", {
    q: "In boosting, what is an 'additive model'?",
    choices: [
      "A model whose prediction is the SUM of many simple base functions (trees), each added one at a time to reduce the remaining error",
      "A model that adds a fixed constant offset to the predictions of a single decision tree, shifting all of its outputs up or down by the very same learned amount",
      "A model that keeps adding brand-new engineered features to the dataset all through training, growing the input columns until the measured loss finally stops falling",
      "A model formed by adding together the class probabilities of two independent classifiers and then renormalizing those totals back into one valid probability distribution",
      "A model that adds small random noise to the inputs on every pass to make the final trained predictor more robust to perturbations it may face at test time"
    ],
    explain: "Boosting builds an additive model of the form F(x) = f0 + η·t1(x) + η·t2(x) + … : a running sum of base learners. Each stage adds one more term chosen to reduce the current loss, so the final prediction is literally the accumulation of many small corrective trees. This additive, stagewise structure is what makes boosting a form of gradient descent in function space.",
    simple: "An additive model is just a big sum: start with a baseline, then keep adding small trees, each nudging the total closer to the truth.",
    widget: {
      type: "curveStatic", title: "Prediction as a growing sum",
      world: "Terms added to the additive model", xlab: "terms summed →",
      xs: [0,1,2,3,4], labels: ["f0","+t1","+t2","+t5","+t20"], dec: 2, yunit: "",
      series: [{ name: "gap to true value", ys: [1.00, 0.62, 0.40, 0.18, 0.05] }],
      knob: { label: "terms", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Start from a plain baseline f0 — far from the target.", tone: "info" },
        { max: 3, text: "Each added tree is one more term in the sum, closing the gap.", tone: "info" },
        { max: 4, text: "🤯 The final model IS the sum of all those small terms — that's what 'additive' means.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Additive model", formula: "F(x) = f0 + η·t1(x) + η·t2(x) + …",
        text: "The prediction is a running total of simple base learners." }
    }
  });

  add("gb1", {
    q: "In boosting, what does 'sequential training' mean?",
    choices: [
      "Each learner is trained AFTER the previous ones and depends on their results, because it targets the errors they left behind — so the learners cannot be built in parallel",
      "The training rows are fed to the model in one fixed sorted order, cycling through that same sequence every epoch so the updates always arrive in the same arrangement",
      "Each learner is trained on a different sequential slice of the timeline, so earlier models cover the oldest data while later ones only ever see the most recent rows",
      "The input features are added to the model one column at a time in sequence, refitting after each addition until every available feature has finally been folded in",
      "Several learners are all trained at once in parallel and only afterward arranged into a sequence, so their ordering is purely cosmetic and carries no real dependency"
    ],
    explain: "Boosting is inherently sequential: learner m is fit to the residuals or re-weighted errors produced by learners 1…m-1, so you must finish one before starting the next. This dependency is the key structural difference from bagging, whose learners are independent and can be trained fully in parallel. It also makes boosting harder to parallelize across trees.",
    simple: "Sequential means each new model waits for the previous one, because it's built to fix that model's mistakes. You can't start tree 5 until trees 1–4 are done.",
    widget: {
      type: "curveStatic", title: "Each stage depends on the last",
      world: "Boosting stage in the sequence", xlab: "stage →",
      xs: [0,1,2,3,4], labels: ["stage 1","stage 2","stage 3","stage 4","stage 5"], dec: 2, yunit: "",
      series: [{ name: "residual error entering the stage", ys: [1.00, 0.60, 0.36, 0.22, 0.13] }],
      knob: { label: "stage", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "Stage 1 tackles the full error from the baseline.", tone: "info" },
        { max: 3, text: "Each stage inherits and shrinks the leftover error from the one before it.", tone: "info" },
        { max: 4, text: "🤯 Because stage m needs stage m−1's output, boosting can't parallelize across trees like bagging.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Sequential training", formula: "learner_m ← fit to errors of learners 1…(m−1)",
        text: "Ordered dependency: the opposite of bagging's parallel, independent trees." }
    }
  });

  add("gb1", {
    q: "In gradient boosting, what is the 'loss gradient' (pseudo-residual) that each new tree is fit to?",
    choices: [
      "The negative derivative of the loss with respect to the current prediction for each row — the direction in which changing the prediction most reduces the loss",
      "The difference between the largest and the smallest prediction in the current batch, used as a crude measure of how spread out the ensemble's outputs have become",
      "The slope of the decision boundary drawn by the previous tree, measured where it separates the two classes and passed forward to help steer the very next split",
      "The gradient of each feature's raw values taken across the sorted dataset, capturing how quickly a column changes from one ordered row to the next one",
      "The rate at which the learning rate itself decays over successive boosting rounds, shrinking every new tree's step a little more than the round just before it"
    ],
    explain: "Gradient boosting generalizes 'fit the residuals' to any differentiable loss by fitting each new tree to the negative gradient of the loss with respect to the current predictions — the pseudo-residuals. For squared error these gradients are exactly the ordinary residuals; for other losses (log-loss, etc.) they are the appropriate generalization. Following them steps the ensemble downhill on the loss, which is why it's called gradient boosting.",
    simple: "The loss gradient tells each new tree which way to push every prediction to make the error drop fastest. The tree learns to point predictions in that direction.",
    widget: {
      type: "curveStatic", title: "Following the loss downhill",
      world: "Steps taken along the negative loss gradient", xlab: "gradient steps →",
      xs: [0,1,2,3,4], labels: ["0","1","3","8","20"], dec: 2, yunit: "",
      series: [{ name: "loss value", ys: [1.00, 0.70, 0.42, 0.18, 0.06] }],
      knob: { label: "steps", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "At the start the loss is high and the gradient is steep.", tone: "info" },
        { max: 3, text: "Each tree fits the negative gradient and steps the loss downhill.", tone: "info" },
        { max: 4, text: "🤯 For squared-error loss the gradient IS the ordinary residual — boosting generalizes that to any loss.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Loss gradient (pseudo-residual)", formula: "pseudo-residual = −∂Loss/∂F(x)",
        text: "Fit each tree to the negative gradient — gradient descent in function space." }
    }
  });

  add("gb1", {
    q: "What is a decision stump?",
    choices: [
      "A decision tree with a single split (depth 1) — one feature, one threshold, two leaves — a classic weak learner used in boosting",
      "A decision tree that has been fully pruned back to only its root node with no splits at all, so it returns one constant prediction for every single input row",
      "The single leftover branch of a tree that remains after its most important split has been removed, kept on afterward as a smaller standalone sub-tree",
      "A decision tree that splits on every available feature exactly once, in a fixed preset order, until each column has contributed one node to the path",
      "A decision tree whose leaves are all forced to predict the same majority class, so it agrees with the base rate no matter which branch a given row follows"
    ],
    explain: "A decision stump is the smallest useful tree: it makes a single decision on one feature and produces two leaves. On its own it is a weak learner, barely better than chance, but boosting chains many stumps (or shallow trees) together, each correcting the last, to build a strong model. Shallow base learners keep each step's contribution small and controllable.",
    simple: "A decision stump is a tree with just one question. Alone it's weak, but boosting stacks lots of them into something powerful.",
    widget: {
      type: "curveStatic", title: "Base-learner depth in boosting",
      world: "Depth of each boosting tree (1 = stump)", xlab: "tree depth →",
      xs: [0,1,2,3,4], labels: ["1 (stump)","2","3","5","8"], dec: 1, yunit: "%",
      series: [{ name: "test error", ys: [9.8, 8.9, 8.5, 9.4, 11.6] }],
      knob: { label: "depth", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 0, text: "A single stump per round is the classic weak learner — high error solo, but boostable.", tone: "info" },
        { max: 2, text: "Shallow trees (depth 2–3) often hit the boosting sweet spot.", tone: "info" },
        { max: 4, text: "🤯 Deep base trees per round overfit fast — boosting prefers weak, shallow learners.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Decision stump", formula: "stump = depth-1 tree: one feature, one threshold, two leaves",
        text: "The archetypal weak learner boosting stacks together." }
    }
  });

  add("gb1", {
    q: "In gradient boosting, what is 'early stopping'?",
    choices: [
      "Halting the addition of trees once a validation metric stops improving (for a set number of rounds), to prevent the ensemble from overfitting",
      "Stopping the growth of an individual tree once it reaches its preset maximum depth, capping how many nested splits that single weak learner is allowed to make",
      "Ending the whole training run as soon as the learning rate has decayed below a fixed threshold, treating that tiny remaining step size as the signal to quit",
      "Removing the first few trees whose individual contribution to the ensemble turned out to be too small, then continuing to add fresh new ones in their place",
      "Stopping the very moment every single training row has been classified correctly, taking a perfect fit on the training set as the cue that training is finished"
    ],
    explain: "Because boosting keeps reducing training loss, adding too many trees eventually overfits. Early stopping monitors performance on a validation set and stops adding trees when that score hasn't improved for a chosen number of rounds ('patience'), keeping the number of trees that generalized best. It's a simple, effective regularizer and a standard feature of XGBoost, LightGBM, and sklearn's boosters.",
    simple: "Early stopping watches a validation score and quits adding trees once it stops getting better — so the model doesn't keep training itself into overfitting.",
    widget: {
      type: "curveStatic", title: "Where to stop adding trees",
      world: "Trees added during boosting", xlab: "boosting rounds →",
      xs: [0,1,2,3,4], labels: ["50","150","300","600","1200"], dec: 1, yunit: "%",
      series: [
        { name: "training error", ys: [9.0, 6.0, 4.0, 2.5, 1.5] },
        { name: "validation error", ys: [9.5, 7.8, 7.6, 8.3, 9.6] }
      ],
      knob: { label: "rounds", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "Early on, both training and validation error fall together.", tone: "info" },
        { max: 2, text: "Validation error bottoms out (~300 rounds) — the best place to stop.", tone: "info" },
        { max: 4, text: "🤯 Past that point training error keeps dropping but validation error climbs — pure overfitting.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Early stopping", formula: "stop when validation score hasn't improved for 'patience' rounds",
        text: "Keep the tree count that generalized best, not the one that memorized." }
    }
  });

  add("gb1", {
    q: "In gradient boosting, what does 'regularization' refer to?",
    choices: [
      "Techniques that constrain the ensemble's complexity — shrinkage, shallow trees, subsampling, and penalties on leaf weights — to curb overfitting",
      "Rescaling every input feature to have zero mean and unit variance before training, so no single column dominates the splits purely because it happens to have a larger scale",
      "Ensuring the training rows are evenly spaced along each feature axis, resampling the data until it is spread out uniformly before any tree in the ensemble is grown",
      "Rounding the ensemble's predicted probabilities to regular fixed intervals for readability, snapping each output value to the nearest clean round percentage",
      "Forcing every tree in the ensemble to share exactly the same structure, so they all split on identical features at identical thresholds purely for consistency"
    ],
    explain: "Left unchecked, boosting can fit training data arbitrarily well and overfit. Regularization bundles the controls that fight this: a small learning rate (shrinkage), limited tree depth and minimum leaf size, row and column subsampling, early stopping, and explicit penalties on the number and magnitude of leaf weights (the λ and γ terms in XGBoost). Together they trade a little training fit for better generalization.",
    simple: "Regularization is all the knobs that stop a booster from over-memorizing: small steps, shallow trees, sampling, and penalties for getting too complex.",
    widget: {
      type: "curveStatic", title: "Turning up the regularization",
      world: "Overall regularization strength", xlab: "regularization strength →",
      xs: [0,1,2,3,4], labels: ["none","light","medium","strong","extreme"], dec: 1, yunit: "%",
      series: [
        { name: "training error", ys: [1.0, 3.0, 5.0, 8.0, 13.0] },
        { name: "test error", ys: [12.0, 9.0, 8.2, 9.5, 14.0] }
      ],
      knob: { label: "strength", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 0, text: "No regularization: training error near zero but test error high — overfit.", tone: "warn" },
        { max: 2, text: "Moderate regularization narrows the train/test gap and minimizes test error.", tone: "info" },
        { max: 4, text: "🤯 Too much regularization underfits — both errors rise. There's a sweet spot in the middle.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Regularization (boosting)", formula: "controls: η, max_depth, subsample, min_child_weight, λ·Σw², γ·#leaves",
        text: "Constrain complexity to trade a little fit for a lot of generalization." }
    }
  });

  add("gb1", {
    q: "What is subsampling in stochastic gradient boosting?",
    choices: [
      "Fitting each boosting tree on a random fraction of the training rows (drawn without replacement), which injects randomness that speeds training and reduces overfitting",
      "Downsampling the majority class before every round so the training set becomes perfectly balanced, discarding the excess rows until each class contributes an equal share",
      "Reducing the resolution of the continuous features into coarse fixed bins before training, so that each column takes only a handful of discrete values the trees can split on",
      "Averaging every few consecutive training rows together into a single summary row, shrinking the dataset into fewer, smoother points before any tree is ever fit to it",
      "Sampling the predictions of the already-finished ensemble many times over to estimate the uncertainty around each output, without changing at all how it was trained"
    ],
    explain: "Stochastic gradient boosting adds randomness by training each tree on a random subsample (e.g. 50–80%) of the rows rather than all of them. Like bagging's resampling, this decorrelates the trees and acts as a regularizer, often improving generalization, while also cutting the compute per round. Column (feature) subsampling per tree or per split is a related variant.",
    simple: "Subsampling means each new tree only sees a random slice of the data. That randomness makes the trees a bit different and helps the model generalize.",
    widget: {
      type: "curveStatic", title: "Row fraction per boosting tree",
      world: "Fraction of rows sampled for each tree", xlab: "subsample fraction →",
      xs: [0,1,2,3,4], labels: ["0.3","0.5","0.7","0.9","1.0"], dec: 1, yunit: "%",
      series: [{ name: "test error", ys: [9.6, 8.3, 8.1, 8.6, 9.2] }],
      knob: { label: "subsample", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 0, text: "Very small subsamples make each tree noisy and can underfit.", tone: "info" },
        { max: 2, text: "Around 0.5–0.7 the randomness regularizes nicely — lowest test error.", tone: "info" },
        { max: 4, text: "🤯 Using all rows (1.0) is plain gradient boosting — the injected randomness is what makes it 'stochastic'.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Subsampling (stochastic GB)", formula: "each tree fit on a random fraction (<1) of the rows, no replacement",
        text: "A dash of randomness per tree regularizes and speeds boosting." }
    }
  });

  /* ===================== stack1 : Stacking / voting ensembles (9) ===================== */

  add("stack1", {
    q: "What is stacking (stacked generalization)?",
    choices: [
      "An ensemble method where several base models make predictions, and a separate meta-model is trained to learn the best way to combine those predictions into a final output",
      "An ensemble method that stacks identical trees on top of each other to increase depth",
      "An ensemble method that averages the base models with fixed equal weights",
      "A method that trains models in sequence, each on the residuals of the last",
      "A method that concatenates several datasets into one taller training set"
    ],
    explain: "Stacking trains a set of diverse base learners, then uses their predictions as inputs to a second-level 'meta-learner' that learns how to weight and combine them. Unlike simple voting with fixed weights, the meta-model discovers the combination from data. To avoid leakage, base-model predictions for training the meta-learner are generated via cross-validation (out-of-fold predictions).",
    simple: "Stacking trains several different models, then trains one more model on top whose only job is to learn how to best blend their answers.",
    widget: {
      type: "curveStatic", title: "A learned combiner beats fixed rules",
      world: "How the base models are combined", xlab: "combining strategy →",
      xs: [0,1,2,3,4], labels: ["best single","equal avg","weighted avg","stacked meta","+ diverse bases"], dec: 1, yunit: "%",
      series: [{ name: "test accuracy", ys: [88.0, 89.5, 90.2, 91.3, 92.1] }],
      knob: { label: "strategy", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "The best single model, and even a plain average, leave accuracy on the table.", tone: "info" },
        { max: 3, text: "A trained meta-model learns the combination and edges ahead.", tone: "info" },
        { max: 4, text: "🤯 Stacking shines most when the base models are DIVERSE — different strengths to blend.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Stacking", formula: "meta_model( base_1(x), base_2(x), … ) → final prediction",
        text: "A second-level model learns the blend instead of you fixing it by hand." }
    }
  });

  add("stack1", {
    q: "In a stacking ensemble, what is the meta-learner (blender)?",
    choices: [
      "The second-level model that takes the base models' predictions as its input features and learns to combine them into the final prediction",
      "The base model that happened to score highest on the validation set",
      "A rule that always outputs the average of the base predictions",
      "The preprocessing step that cleans the data before the base models see it",
      "The component that selects which single base model to trust for each row at random"
    ],
    explain: "The meta-learner (also called the blender or level-1 model) sits on top of the base learners. Its training data is the base models' out-of-fold predictions, and its target is the true label; it learns how much to trust each base model and how to combine them. It is usually a simple model (e.g. logistic or linear regression) to avoid overfitting the small set of meta-features.",
    simple: "The meta-learner is the model on top. It doesn't look at the raw data — it looks at the base models' guesses and learns how to mix them into one answer.",
    widget: {
      type: "curveStatic", title: "How fancy should the blender be?",
      world: "Complexity of the meta-learner", xlab: "meta-learner complexity →",
      xs: [0,1,2,3,4], labels: ["mean","linear","logistic","shallow tree","deep model"], dec: 1, yunit: "%",
      series: [{ name: "test accuracy", ys: [89.0, 91.2, 91.4, 90.6, 88.9] }],
      knob: { label: "complexity", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 0, text: "A plain mean is a fixed, un-learned blender — a fine baseline.", tone: "info" },
        { max: 2, text: "A simple linear/logistic meta-model usually blends best.", tone: "info" },
        { max: 4, text: "🤯 A too-complex blender overfits the handful of meta-features — keep it simple.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Meta-learner (blender)", formula: "level-1 model: inputs = base predictions, target = true label",
        text: "It learns whom to trust; keep it simple to avoid overfitting." }
    }
  });

  add("stack1", {
    q: "In a voting ensemble, what is 'hard voting'?",
    choices: [
      "Each model predicts a class label and the ensemble outputs the class that receives the most votes (a plurality of the labels)",
      "Each model outputs a probability and the ensemble averages those probabilities",
      "The single most confident model decides the final class by itself",
      "Votes are weighted by each model's training accuracy before tallying",
      "Only models that agree unanimously are allowed to contribute a prediction"
    ],
    explain: "Hard voting combines classifiers by their final class labels: every model casts one vote, and the majority (plurality) class wins. It uses only the discrete predictions, ignoring how confident each model was. It is simple and works even for models that don't output probabilities, but it discards the confidence information that soft voting exploits.",
    simple: "Hard voting is a plain show of hands: each model names a class, and the class named most often wins. Confidence doesn't count — just the vote.",
    widget: {
      type: "curveStatic", title: "Counting label votes",
      world: "Models voting in a two-class problem", xlab: "models voting →",
      xs: [0,1,2,3,4], labels: ["1","3","5","9","15"], dec: 0, yunit: "%",
      series: [{ name: "chance the majority is correct", ys: [70, 78, 84, 91, 96] }],
      knob: { label: "models", min: 0, max: 4, step: 1, init: 1 },
      insights: [
        { max: 1, text: "With a few decent voters the majority already beats any single one.", tone: "info" },
        { max: 3, text: "More independent-ish voters make the plurality more reliable.", tone: "info" },
        { max: 4, text: "🤯 Hard voting uses only the labels — it throws away the models' confidence.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Hard voting", formula: "prediction = mode( label_1, label_2, … )",
        text: "Majority of discrete labels — ignores probabilities." }
    }
  });

  add("stack1", {
    q: "In a voting ensemble, what is 'soft voting'?",
    choices: [
      "Averaging the predicted class PROBABILITIES from each model and choosing the class with the highest average probability",
      "Counting the discrete class labels and taking the majority",
      "Letting the least confident model break ties among the others",
      "Randomly selecting one model's probability output as the final answer",
      "Rounding every model's probability to 0 or 1 before combining"
    ],
    explain: "Soft voting combines classifiers by averaging their predicted probabilities (optionally weighted) and predicting the class with the highest mean probability. Because it uses confidence rather than just labels, a very sure model can outweigh several barely-sure ones, and it often outperforms hard voting — provided the base models produce well-calibrated probabilities.",
    simple: "Soft voting averages how confident each model is in each class, then picks the class with the highest average. A very sure model carries more weight.",
    widget: {
      type: "curveStatic", title: "Confidence, not just labels",
      world: "How the models' outputs are combined", xlab: "combining rule →",
      xs: [0,1,2,3,4], labels: ["hard vote","soft (uncalib.)","soft (calib.)","soft weighted","soft + diverse"], dec: 1, yunit: "%",
      series: [{ name: "test accuracy", ys: [89.0, 89.6, 90.8, 91.3, 92.0] }],
      knob: { label: "rule", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 0, text: "Hard voting ignores confidence and leaves accuracy on the table.", tone: "info" },
        { max: 2, text: "Averaging CALIBRATED probabilities lets sure models count more — accuracy rises.", tone: "info" },
        { max: 4, text: "🤯 Soft voting only pays off when the probabilities are trustworthy (well-calibrated, diverse).", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Soft voting", formula: "prediction = argmax_c  mean( P_model(c) )",
        text: "Average the probabilities — richer than counting labels, if calibrated." }
    }
  });

  add("stack1", {
    q: "In stacking, what are 'out-of-fold predictions'?",
    choices: [
      "Predictions a base model makes for each training row using a version of itself trained on OTHER folds, so the meta-learner never trains on predictions the base model has already seen the answers to",
      "Predictions the base models make on the final test set after all training is done",
      "Predictions that fall outside the valid probability range and must be clipped",
      "The predictions of whichever fold performed worst during cross-validation",
      "Predictions averaged across all folds to smooth out fold-to-fold noise"
    ],
    explain: "To build the meta-learner's training data without leakage, stacking uses cross-validation: the training set is split into folds, and for each fold a base model trained on the OTHER folds predicts the held-out fold. Stitching these held-out predictions together gives an out-of-fold prediction for every training row — honest inputs the base model didn't memorize, so the meta-learner learns a realistic combination.",
    simple: "Out-of-fold predictions are a model's guesses for data it wasn't trained on, gathered fold by fold. That keeps the meta-learner honest instead of learning from cheated answers.",
    widget: {
      type: "curveStatic", title: "Honest inputs for the meta-learner",
      world: "How base predictions for the meta-learner are made", xlab: "prediction scheme →",
      xs: [0,1,2,3,4], labels: ["in-sample","2-fold OOF","5-fold OOF","10-fold OOF","leave-one-out"], dec: 1, yunit: "%",
      series: [{ name: "meta-learner test accuracy", ys: [86.5, 90.0, 91.3, 91.5, 91.4] }],
      knob: { label: "scheme", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 0, text: "In-sample predictions leak — the meta-learner overrates the base models and generalizes worse.", tone: "warn" },
        { max: 2, text: "Out-of-fold predictions (e.g. 5-fold) give honest inputs and a big accuracy jump.", tone: "info" },
        { max: 4, text: "🤯 More folds help a little then plateau — the key was going out-of-fold at all.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Out-of-fold predictions", formula: "predict each fold with a model trained on the other folds",
        text: "Leakage-free meta-features: the base model never sees its own answers." }
    }
  });

  add("stack1", {
    q: "In ensembles, what is 'diversity' among the base models?",
    choices: [
      "The degree to which the models make DIFFERENT, uncorrelated errors — the property that lets combining them cancel mistakes and improve on any single model",
      "The number of different hyperparameter values tried during tuning",
      "The variety of data types (numeric, text, image) present in the features",
      "How evenly the training rows are spread across the classes",
      "The spread of prediction latencies across the models"
    ],
    explain: "An ensemble only improves on its members when they err in different ways: if every model made the same mistakes, combining them would change nothing. Diversity — low correlation between the models' errors — is what makes voting, averaging, and stacking effective. It is engineered by using different algorithms, feature subsets, or resamples so the models' weaknesses don't overlap.",
    simple: "Diversity means your models are wrong about different things. If they all fail on the same examples, combining them is pointless; if their mistakes differ, the group can cover for each one.",
    widget: {
      type: "curveStatic", title: "Different mistakes → better ensemble",
      world: "Correlation between the base models' errors", xlab: "error correlation →",
      xs: [0,1,2,3,4], labels: ["0.0","0.25","0.5","0.75","1.0"], dec: 1, yunit: "%",
      series: [{ name: "ensemble accuracy gain over best single", ys: [6.0, 4.2, 2.5, 1.0, 0.0] }],
      knob: { label: "error correlation", min: 0, max: 4, step: 1, init: 2 },
      insights: [
        { max: 1, text: "Low error correlation (diverse models) yields the biggest ensemble gain.", tone: "info" },
        { max: 3, text: "As models start making the same mistakes, the gain shrinks.", tone: "info" },
        { max: 4, text: "🤯 Perfectly correlated models (ρ=1) add nothing — diversity is what makes ensembling work.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Ensemble diversity", formula: "benefit grows as base-model errors become less correlated",
        text: "Combine models that fail differently, not models that fail alike." }
    }
  });

  add("stack1", {
    q: "In ensembles, what is 'model averaging'?",
    choices: [
      "Combining several models by averaging their predicted values (or probabilities) into a single output, which reduces variance without training a meta-model",
      "Averaging the parameter weights of several models into one merged model",
      "Averaging each model's accuracy scores to report a single headline number",
      "Training one model on the average of several datasets",
      "Replacing each model with the average-performing model in the pool"
    ],
    explain: "Model averaging is the simplest combining rule: run several models and take the (possibly weighted) mean of their outputs. For regression it averages the predicted numbers; for classification it averages predicted probabilities (soft voting). It lowers variance and is easy and robust, but unlike stacking it uses a fixed rule rather than a learned combiner.",
    simple: "Model averaging just takes the average of several models' outputs. No extra model to train — the averaging alone smooths out their individual errors.",
    widget: {
      type: "curveStatic", title: "Averaging shrinks the error",
      world: "Number of models averaged", xlab: "models averaged →",
      xs: [0,1,2,3,4], labels: ["1","2","4","8","16"], dec: 2, yunit: "",
      series: [{ name: "prediction error (RMSE)", ys: [2.80, 2.30, 2.00, 1.86, 1.80] }],
      knob: { label: "models", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 1, text: "One model carries its full error.", tone: "info" },
        { max: 3, text: "Averaging more models lowers the error with diminishing returns.", tone: "info" },
        { max: 4, text: "🤯 No meta-model needed — the averaging itself cancels independent errors.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Model averaging", formula: "prediction = (1/M) Σ model_m(x)",
        text: "A fixed-rule combiner: simplest way to cut variance across models." }
    }
  });

  add("stack1", {
    q: "In a voting ensemble, what is a 'weighted vote'?",
    choices: [
      "A voting scheme where each model's vote (or probability) is multiplied by a weight reflecting its reliability, so stronger models influence the outcome more",
      "A vote in which only the single heaviest model is allowed to decide",
      "A vote whose result is scaled by the size of the training set",
      "A vote where each model gets more weight the longer it took to train",
      "A vote that counts only the models predicting the minority class"
    ],
    explain: "In a weighted vote, models don't count equally: each is assigned a weight (often from validation performance) and the ensemble tallies weighted votes or weighted-average probabilities. This lets a more accurate model carry more influence than a weaker one. Equal weights are the special case; the weights can be tuned, and stacking generalizes this to learning the weights from data.",
    simple: "A weighted vote lets better models count for more. Instead of one-model-one-vote, each vote is scaled by how much you trust that model.",
    widget: {
      type: "curveStatic", title: "Tilting the vote toward the strong model",
      world: "Weight given to the strongest model (vs the weaker ones)", xlab: "weight on strong model →",
      xs: [0,1,2,3,4], labels: ["equal","1.5×","2×","4×","∞ (only it)"], dec: 1, yunit: "%",
      series: [{ name: "ensemble accuracy", ys: [89.5, 90.6, 91.2, 90.4, 88.0] }],
      knob: { label: "weight", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 0, text: "Equal weights let a weak model drag the strong one down.", tone: "info" },
        { max: 2, text: "Up-weighting the reliable model to ~2× lifts accuracy to its peak.", tone: "info" },
        { max: 4, text: "🤯 Push the weight to infinity and you've thrown away the ensemble — back to one model.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Weighted vote", formula: "prediction = argmax_c Σ w_m · vote_m(c)",
        text: "Trust the good models more — equal weighting is just the special case." }
    }
  });

  add("stack1", {
    q: "What is a voting classifier (voting ensemble)?",
    choices: [
      "An ensemble that trains several different classifiers on the same data and combines their predictions by a fixed rule — hard voting on labels or soft voting on averaged probabilities",
      "A single classifier that is retrained several times and keeps whichever run scored best",
      "A meta-model trained on the base models' out-of-fold predictions to learn the combination",
      "A classifier that lets the user vote on which prediction looks most plausible",
      "A boosting classifier whose trees vote on which row to reweight next"
    ],
    explain: "A voting classifier is the simplest ensemble of diverse models: fit several classifiers, then combine them by a fixed aggregation rule rather than a learned one — hard voting takes the majority class label, soft voting averages the predicted probabilities. It differs from stacking, where a meta-learner learns the combination instead of using a preset rule.",
    simple: "A voting classifier runs several different models and just lets them vote on the answer — either by majority label or by averaging their confidence. No extra model learns the blend.",
    widget: {
      type: "curveStatic", title: "Combining diverse classifiers by vote",
      world: "Number of diverse classifiers voting", xlab: "classifiers in the vote →",
      xs: [0,1,2,3,4], labels: ["1","2","3","5","7"], dec: 1, yunit: "%",
      series: [{ name: "ensemble accuracy", ys: [88.0, 89.2, 90.5, 91.4, 91.8] }],
      knob: { label: "classifiers", min: 0, max: 4, step: 1, init: 0 },
      insights: [
        { max: 0, text: "One classifier is just itself — no ensemble effect yet.", tone: "info" },
        { max: 3, text: "Adding diverse classifiers to the vote lifts accuracy above any single one.", tone: "info" },
        { max: 4, text: "🤯 The combining rule is FIXED (majority or average) — that's what separates voting from stacking.", tone: "wow" }
      ],
      extreme: { at: "max" },
      reveal: { name: "Voting classifier", formula: "combine diverse models by a fixed rule: hard (labels) or soft (probabilities)",
        text: "A preset combiner, not a learned one — stacking learns the blend instead." }
    }
  });

}());
