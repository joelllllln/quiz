/* Applied Scenarios — Ensemble methods (Random Forests, Bagging, Gradient Boosting, Stacking/Voting, XGBoost). choices[0] always correct (shuffled at render). */
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
    q: "You trained a random forest of 400 trees. A colleague asks for a validation estimate but you never held out a test set. What is the cheapest sound way to estimate generalisation error here?",
    choices: [
      "Use the out-of-bag (OOB) error — each tree scores the ~37% of rows it never saw in its bootstrap sample, giving a free cross-validation-like estimate",
      "Report the training accuracy, since a 400-tree forest rarely overfits",
      "Re-train on all the data and trust the in-sample R-squared",
      "Average the predictions on the training rows and call it validation",
      "You cannot estimate error without a separate held-out set; you must re-collect data"
    ],
    explain: "Bagging draws each tree's training set as a bootstrap sample, so on average about 1/e (~37%) of rows are left out of any given tree. Predicting each row using only the trees that did NOT see it yields the OOB estimate, which behaves like built-in cross-validation and costs nothing extra. Training accuracy is optimistic and would not reveal overfitting. That is why OOB is the standard free validation signal for a random forest.",
    simple: "Every tree in the forest quietly skips about a third of the data. Grade each row using only the trees that never studied it, and you get a free exam score.",
    widget: W("Bootstrap leaves rows out for free", "As a forest grows, the fraction of rows left out of each tree settles near 37%.",
      "trees in the forest →", ["1", "5", "20", "100", "400"], "rows left out per tree (OOB %)", [37, 37, 37, 37, 37], "Forest size",
      [{ max: 1, text: "Each bootstrap sample omits about 37% of rows — those become that tree's OOB set.", tone: "info" },
       { max: 3, text: "Every row is OOB for roughly a third of all trees, so every row gets an honest prediction.", tone: "info" },
       { max: 4, text: "🤯 The forest validates itself: no separate hold-out needed, yet the estimate tracks true test error.", tone: "wow" }],
      { name: "Out-of-bag estimation", formula: "OOB error ≈ cross-validation error, at zero extra cost", text: "Bagging's leftover rows give a random forest a built-in validation score." })
  });

  q("scen1", {
    q: "A gradient-boosting model with learning_rate=0.3 and 500 trees overfits badly. You want a smoother, more accurate fit. What is the standard first lever to pull?",
    choices: [
      "Lower the learning rate (e.g. to 0.05) and add more trees, using early stopping to pick the count — small steps generalise better",
      "Raise the learning rate to 0.6 so each tree corrects more of the error at once",
      "Cut the number of trees to 20 and keep the rate at 0.3",
      "Switch every tree to full depth so each one fits the residuals exactly",
      "Remove the learning rate entirely so boosting uses raw residuals"
    ],
    explain: "In gradient boosting the learning rate (shrinkage) scales each tree's contribution; smaller steps mean no single tree dominates and the ensemble converges more smoothly to a better optimum. The classic recipe is to shrink the rate and compensate with more trees, letting a validation set and early stopping choose where to stop. A high rate or very deep trees make boosting overfit faster, and too few trees underfit. Shrinkage-plus-more-trees is the textbook regularisation move.",
    simple: "Boosting is like walking to a target: many small careful steps land more precisely than a few giant leaps. Shrink the step, take more steps, and stop when you stop improving.",
    widget: W("Small steps, more of them", "Validation accuracy versus learning rate at a fixed large tree budget with early stopping.",
      "learning rate →", ["0.6", "0.3", "0.1", "0.05", "0.02"], "validation accuracy", [74, 80, 87, 89, 86], "Learning rate",
      [{ max: 1, text: "A big learning rate overshoots and overfits — validation accuracy stays low.", tone: "info" },
       { max: 3, text: "Shrinking the rate lets many trees cooperate; accuracy peaks around 0.05.", tone: "info" },
       { max: 4, text: "🤯 Go too small and, at a fixed budget, boosting underfits before it finishes — the sweet spot is a valley-then-peak.", tone: "wow" }],
      { name: "Shrinkage in boosting", formula: "lower rate + more trees + early stopping = smoother fit", text: "Shrinkage is boosting's main regulariser: take small steps and let early stopping choose the count." })
  });

  q("scen1", {
    q: "You have 5,000 rows, 40 mostly-numeric features, non-linear interactions, and you want a strong tabular baseline with almost no tuning and little overfitting worry. Which model should you reach for first?",
    choices: [
      "A random forest — bagging plus random feature subsets gives a low-variance, high-accuracy baseline that works well out of the box",
      "A single deep unpruned decision tree, because it captures every interaction",
      "Linear regression, since it never overfits on 40 features",
      "A hand-tuned XGBoost with 30 hyperparameters set by grid search before any baseline exists",
      "k-nearest neighbours with k=1 for maximum flexibility"
    ],
    explain: "Random forests average many decorrelated deep trees, so their variance falls sharply while bias stays low, and default settings usually perform well without careful tuning. They handle non-linear interactions and mixed feature scales naturally, making them an excellent first tabular baseline. A single deep tree is high-variance and overfits, and linear regression misses interactions. Reaching straight for a heavily tuned XGBoost skips the cheap, robust baseline you should establish first.",
    simple: "Ask one expert and you get one opinion with all its quirks. Ask hundreds of slightly different experts and average them, and the quirks cancel out. That average is a random forest.",
    widget: W("Averaging trees crushes variance", "Test accuracy as you average more decorrelated trees in a bagged forest.",
      "trees averaged →", ["1", "10", "50", "200"], "test accuracy", [72, 83, 88, 90], "Trees",
      [{ max: 1, text: "One tree is accurate on average but noisy — its test score swings run to run.", tone: "info" },
       { max: 2, text: "Averaging decorrelated trees cancels their independent errors; accuracy climbs fast.", tone: "info" },
       { max: 3, text: "🤯 Gains flatten near ~200 trees — more never hurts accuracy, it just costs compute.", tone: "wow" }],
      { name: "Bagging reduces variance", formula: "avg of decorrelated trees → variance ↓, bias ~unchanged", text: "A random forest turns one high-variance tree into a stable, accurate ensemble." })
  });

  q("scen1", {
    q: "In a random forest for a 30-feature classification task, two features are extremely strong predictors. If every tree is allowed to consider all 30 features at each split, what problem arises and what fixes it?",
    choices: [
      "Trees become correlated because they all split on the same top features first; restricting max_features (e.g. to sqrt(30)) decorrelates them and improves the ensemble",
      "Nothing — considering all features at every split is exactly what makes a random forest random",
      "The forest underfits, so you should reduce the number of trees",
      "The two strong features should be removed so weaker features can be used",
      "You must increase the learning rate to break the correlation"
    ],
    explain: "The 'random' in random forest comes from giving each split only a random subset of features to choose from. If every split sees all features, all trees repeatedly pick the same dominant predictors and become highly correlated, so averaging them barely reduces variance. Limiting max_features (a common default is sqrt(p) for classification) forces trees to use different features and decorrelates them, which is what makes the ensemble strong. It is feature subsampling, not just row bagging, that gives forests their edge over plain bagging.",
    simple: "If every voter always cites the same headline, they all vote alike and averaging is pointless. Force each voter to sometimes ignore the headline, and their independent views make the average wise.",
    widget: W("Feature subsampling decorrelates trees", "Ensemble test accuracy versus how many features each split may consider (out of 30).",
      "max_features per split →", ["30 (all)", "15", "sqrt≈5", "2"], "ensemble accuracy", [82, 86, 90, 84], "max_features",
      [{ max: 1, text: "Using all features, trees keep picking the same strong splits and stay correlated.", tone: "info" },
       { max: 2, text: "Sampling ~sqrt(p) features forces variety, decorrelates trees, and lifts the ensemble.", tone: "info" },
       { max: 3, text: "🤯 Too few features per split and each tree grows too weak — accuracy dips again.", tone: "wow" }],
      { name: "Random subspace method", formula: "smaller max_features → less correlation, up to a point", text: "Restricting features per split is what separates a random forest from plain bagging." })
  });

  q("scen1", {
    q: "You have three already-trained, roughly equally accurate classifiers: a logistic regression, an SVM, and a random forest. You want a quick accuracy bump without retraining anything. What is the simplest ensemble to try?",
    choices: [
      "A voting (or soft-voting) ensemble that combines their predictions — diverse models making independent errors often average out to better accuracy",
      "Pick whichever single model had the highest validation accuracy and discard the others",
      "A stacking meta-model, which is the only way to combine base learners",
      "Retrain all three as one giant boosted model",
      "Concatenate their feature sets and train a fourth model from scratch"
    ],
    explain: "Voting simply combines existing models' outputs — hard voting takes the majority label, soft voting averages predicted probabilities — and needs no retraining of the base models. It works best when the base learners are diverse and make uncorrelated errors, which a linear model, a margin-based SVM, and a tree ensemble tend to satisfy. Stacking can do better but requires training an extra meta-learner with cross-validated predictions; voting is the cheaper first step. Simply keeping the single best model throws away the error-cancelling benefit of combining diverse learners.",
    simple: "Three different experts who each make different mistakes will, by majority vote, usually beat any one of them alone. Just average their answers.",
    widget: W("Diverse voters beat any single one", "Ensemble accuracy as you add diverse base models to a soft vote.",
      "base models in the vote →", ["1", "2", "3", "3 (correlated)"], "ensemble accuracy", [84, 87, 90, 85], "Voters",
      [{ max: 1, text: "One good model sets the baseline accuracy.", tone: "info" },
       { max: 2, text: "Adding models that err differently averages the mistakes away — accuracy rises.", tone: "info" },
       { max: 3, text: "🤯 Add three models that all make the SAME errors and voting barely helps — diversity is the fuel.", tone: "wow" }],
      { name: "Voting ensembles", formula: "combine diverse learners → errors cancel", text: "Soft voting over models with uncorrelated errors is the cheapest ensemble win." })
  });

  q("scen1", {
    q: "On a 200,000-row tabular dataset with mixed numeric and categorical features, a well-tuned XGBoost consistently beats your neural network and your logistic regression on the leaderboard. Given this is structured tabular data, what is the reasonable takeaway?",
    choices: [
      "Gradient-boosted trees like XGBoost are frequently the strongest choice on medium-sized tabular data — prefer them here",
      "The neural network must have a bug; deep learning always wins on enough data",
      "XGBoost won only by luck and the ranking will reverse on any new split",
      "You should abandon trees entirely and switch to k-NN for tabular data",
      "The result proves logistic regression is never useful"
    ],
    explain: "Gradient-boosted decision trees, and XGBoost in particular, are repeatedly the top performers on medium-sized tabular problems with heterogeneous features, which is exactly this setting. They capture non-linear interactions, handle mixed feature types with little preprocessing, and include strong regularisation. Neural networks tend to shine on high-dimensional unstructured data (images, text, audio) rather than modest tabular tables. Concluding the win was pure luck ignores a well-documented pattern, though you should still confirm it with cross-validation.",
    simple: "For spreadsheets of numbers and categories, boosted trees are usually the reigning champ. Deep learning's home turf is pictures and text, not tidy tables.",
    widget: W("Boosted trees rule tabular data", "Typical relative accuracy of model families on medium-sized tabular data.",
      "model family →", ["logistic", "single tree", "random forest", "XGBoost"], "relative accuracy", [78, 74, 87, 91], "Model family",
      [{ max: 1, text: "A linear model and a lone tree leave accuracy on the table for non-linear tabular data.", tone: "info" },
       { max: 2, text: "A random forest is a strong, low-effort baseline on tables.", tone: "info" },
       { max: 3, text: "🤯 Tuned gradient boosting usually edges out the forest — the go-to for tabular contests.", tone: "wow" }],
      { name: "Model choice for tabular data", formula: "medium tabular data → gradient-boosted trees first", text: "On structured tables, XGBoost-style boosting is typically the model to beat." })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "A fraud team must choose between a random forest and a gradient-boosted ensemble for the same tabular problem. The forest is easy to tune and parallel to train; the boosting model is often a touch more accurate but slower to tune and more sensitive. How should they weigh the choice?",
    choices: [
      "Prefer the random forest when robustness, easy tuning and parallel training matter most; prefer boosting when squeezing out maximum accuracy justifies the extra tuning care",
      "Always pick boosting — it is strictly better than bagging in every respect",
      "Always pick the random forest — boosting is obsolete",
      "The two are identical, so choose by coin flip",
      "Pick whichever trains faster on one machine, ignoring accuracy entirely"
    ],
    explain: "Bagging (random forests) trains trees independently and in parallel, is famously insensitive to hyperparameters, and rarely overfits by adding trees — great when you need a robust model fast. Boosting trains trees sequentially to fix prior errors and often reaches higher accuracy, but it is more sensitive to learning rate, depth and tree count, and can overfit if those are set poorly. Neither dominates: the decision trades tuning effort and robustness against a usually-small accuracy gain. Declaring one universally superior ignores the real trade-off.",
    simple: "A random forest is a reliable workhorse you can saddle in minutes; boosting is a race car that goes faster but needs a careful mechanic. Pick by whether you value robustness or the last bit of speed.",
    widget: W("Robustness versus peak accuracy", "Accuracy and tuning effort as you move from bagging toward carefully-tuned boosting.",
      "effort spent tuning →", ["RF default", "RF tuned", "GBM light", "GBM tuned"], "accuracy", [87, 88, 89, 92], "Approach",
      [{ max: 1, text: "A random forest reaches ~88% with almost no tuning — cheap robustness.", tone: "info" },
       { max: 2, text: "Boosting starts near the forest but rewards careful tuning.", tone: "info" },
       { max: 3, text: "🤯 The extra accuracy from boosting is real but costs tuning time and overfit risk — a genuine trade-off.", tone: "wow" }],
      { name: "Bagging vs boosting", formula: "bagging = robust & parallel; boosting = peak accuracy, more care", text: "Choose bagging for robustness and speed of setup, boosting for the last few accuracy points." })
  });

  q("scen2", {
    q: "Your XGBoost model scores 0.995 AUC on training but only 0.82 on validation. You can add L2 regularisation (lambda), lower max_depth, add subsampling, or lower the learning rate. What is the right framing for tuning these?",
    choices: [
      "They are all regularisers fighting the same overfit — increase lambda, reduce max_depth, subsample rows/columns and shrink the learning rate to trade a little training fit for much better validation",
      "Increase max_depth so the trees can finally capture the true pattern and close the gap",
      "Raise the learning rate to make training converge faster and remove the gap",
      "Add hundreds more trees without early stopping until validation catches up",
      "Ignore the gap; a 0.995 training AUC proves the model is excellent"
    ],
    explain: "A large train-minus-validation gap is classic overfitting, and XGBoost exposes several controls that all reduce model complexity: L2/L1 penalties (lambda, alpha), shallower trees (max_depth), row and column subsampling, min_child_weight, and a smaller learning rate. Turning these up sacrifices some training fit but usually lifts validation performance, which is the number that matters. Deepening trees or raising the learning rate would worsen the overfit, and piling on trees without early stopping memorises noise. The skill is balancing enough capacity to learn the signal against enough regularisation to not memorise noise.",
    simple: "The model has memorised the training set instead of learning the pattern. Every XGBoost knob that makes it simpler — shallower trees, penalties, subsampling, smaller steps — trades showy training scores for real-world accuracy.",
    widget: W("Regularisation closes the overfit gap", "Training and validation AUC as XGBoost regularisation strength increases.",
      "regularisation strength →", ["none", "light", "moderate", "heavy"], "training AUC", [99, 95, 91, 84], "Regularisation",
      [{ max: 1, text: "With no regularisation, training AUC is near-perfect but validation lags far behind.", tone: "info" },
       { max: 2, text: "Adding penalties and subsampling lowers training AUC but lifts validation — the gap shrinks.", tone: "info" },
       { max: 3, text: "🤯 Too much regularisation and both curves sink together — underfitting. Aim for the balanced middle.", tone: "wow" }],
      { name: "XGBoost regularisation", formula: "↑lambda, ↓depth, subsample, ↓rate → gap ↓ (until underfit)", text: "Regularisers trade training fit for validation accuracy; tune them to the balanced middle." },
      { series: [{ name: "validation AUC", ys: [82, 86, 89, 83] }] })
  });

  q("scen2", {
    q: "You can either (a) build a stacking ensemble with a meta-learner over three base models, or (b) use a simple soft-voting average of the same three. Stacking scored slightly higher in one experiment. What should guide the choice?",
    choices: [
      "Weigh stacking's small accuracy gain against its higher complexity and leakage risk — voting is simpler and safer, so favour stacking only when the gain is real and cross-validated properly",
      "Always stack — a meta-learner can never do worse than voting",
      "Always vote — stacking is just voting with extra steps and no benefit",
      "Use stacking but train the meta-learner on the same rows the base models saw, to save time",
      "Combine six copies of the same model, since more models always help"
    ],
    explain: "Stacking trains a meta-learner on the base models' out-of-fold predictions and can capture which model to trust in which region, sometimes beating a plain average. But it adds complexity and, critically, will overfit or leak if the meta-learner is trained on in-sample base predictions instead of cross-validated (out-of-fold) ones. Voting is simpler, has fewer ways to go wrong, and is often nearly as good. A small, non-cross-validated stacking gain may not survive on new data, so favour stacking only when the improvement is real and the folds are done correctly.",
    simple: "Voting is a plain average; stacking hires a manager to learn who to trust when. The manager can help — but only if it is trained on honest out-of-fold predictions, and only if the extra complexity earns its keep.",
    widget: W("Stacking's gain versus its risk", "Validation accuracy of combination strategies, and the danger of leaky stacking.",
      "combination strategy →", ["single best", "soft voting", "stacking (OOF)", "stacking (leaky)"], "true validation accuracy", [88, 90, 91, 79], "Strategy",
      [{ max: 1, text: "Soft voting already improves on the single best model with almost no risk.", tone: "info" },
       { max: 2, text: "Stacking with proper out-of-fold predictions can edge ahead of voting.", tone: "info" },
       { max: 3, text: "🤯 Stacking trained on in-sample predictions LEAKS — it looks great in training but collapses on real data.", tone: "wow" }],
      { name: "Stacking vs voting", formula: "stacking gain must beat added complexity + leakage risk", text: "Prefer voting for simplicity; use stacking only with honest out-of-fold folds and a real gain." })
  });

  q("scen2", {
    q: "For a real-time bidding system you must score requests in under 5 ms, but accuracy still matters. A 1,000-tree random forest is most accurate; a 50-tree forest is faster. How should you set the number of trees?",
    choices: [
      "Pick the smallest tree count whose accuracy is within your tolerance, because accuracy gains flatten quickly while latency grows linearly with tree count",
      "Always use 1,000 trees — more trees always means better predictions worth any latency",
      "Use a single tree, since only latency matters in real time",
      "Increase trees until training time, not inference time, hits the limit",
      "Randomly pick a tree count; it has no effect on latency"
    ],
    explain: "In a random forest, inference cost scales roughly linearly with the number of trees, while accuracy gains diminish sharply and plateau after a few hundred trees. Under a hard latency budget, the right move is to find where the accuracy curve flattens and choose the smallest count that still meets your accuracy tolerance. Maxing out trees wastes latency for negligible accuracy, and a single tree throws away the variance reduction that makes forests good. This is a speed-versus-quality trade-off resolved by reading the diminishing-returns curve against the latency budget.",
    simple: "The first hundred trees do almost all the work; the next nine hundred barely move accuracy but each one still costs time. Stop where the curve flattens and you still fit the clock.",
    widget: W("Diminishing returns meet a latency budget", "Accuracy plateaus while latency keeps rising with tree count.",
      "trees →", ["50", "200", "500", "1000"], "accuracy", [88, 90, 91, 91], "Trees",
      [{ max: 1, text: "By ~200 trees accuracy is already near its ceiling.", tone: "info" },
       { max: 2, text: "500 to 1000 trees adds almost nothing to accuracy but doubles inference latency.", tone: "info" },
       { max: 3, text: "🤯 Under a 5 ms budget, the smallest count on the plateau wins — extra trees only spend your latency.", tone: "wow" }],
      { name: "Trees vs latency", formula: "pick smallest tree count on the accuracy plateau", text: "Read the diminishing-returns curve against your latency budget, not the absolute maximum." })
  });

  q("scen2", {
    q: "You are choosing tree depth for a gradient-boosting model. Deep trees (depth 10) capture rich interactions but each corrects a lot; shallow stumps (depth 1-3) capture little alone. Given boosting adds trees sequentially, how do you weigh depth?",
    choices: [
      "Favour shallow trees (often depth 3-6) as boosting's base learners, because boosting combines many weak learners; deep trees per round overfit fast and defeat the sequential correction",
      "Always use the deepest trees possible so each round needs fewer trees",
      "Use depth-1 stumps only, since boosting requires the weakest possible learner with no exceptions",
      "Depth does not matter in boosting; only the number of trees does",
      "Match the depth to the number of features, one level per feature"
    ],
    explain: "Boosting works by adding many weak learners that each nudge the fit, so its base trees are deliberately shallow — depths of about 3 to 6 are common, capturing limited interactions per round. Very deep trees each fit a large chunk of the residuals, which makes the ensemble overfit quickly and undermines the gradual, self-correcting nature of boosting. Pure depth-1 stumps can work but often miss useful interactions, so the sweet spot is shallow-but-not-trivial. This trades per-tree expressiveness against the ensemble's need to improve slowly and generalise.",
    simple: "Boosting is a team of specialists each fixing a small mistake. If every member tries to fix everything at once (deep trees), the team overcorrects and overfits. Keep each member modest.",
    widget: W("Weak learners suit boosting", "Validation accuracy of a boosted ensemble versus per-tree depth.",
      "max_depth per tree →", ["1", "3", "6", "10"], "validation accuracy", [83, 90, 89, 80], "Tree depth",
      [{ max: 1, text: "Depth-1 stumps are very weak and can miss useful interactions.", tone: "info" },
       { max: 2, text: "Shallow trees (depth 3-6) hit the sweet spot for boosting's base learners.", tone: "info" },
       { max: 3, text: "🤯 Deep trees per round overfit fast — accuracy drops even though each tree looks powerful.", tone: "wow" }],
      { name: "Base-learner strength in boosting", formula: "boosting wants weak learners: shallow trees (depth ~3-6)", text: "Deep per-round trees overfit; shallow trees let the ensemble improve gradually." })
  });

  q("scen2", {
    q: "Building a stacking ensemble, you must pick base learners. You can add either three more gradient-boosted models (all similar) or a logistic regression, a k-NN and a random forest (varied). Accuracy of each individual model is similar. Which set of base learners is better and why?",
    choices: [
      "The varied set — stacking benefits most from base learners that are individually strong but make DIFFERENT errors, so diverse model families add more than near-identical ones",
      "The three similar boosted models, because higher individual accuracy always makes the best stack",
      "It makes no difference; the meta-learner erases any effect of base-model choice",
      "Whichever set trains fastest, since base-learner diversity is irrelevant to stacking",
      "Always pick the set with the most models, regardless of their similarity"
    ],
    explain: "An ensemble only gains when its members make uncorrelated errors, so the meta-learner has genuinely different signals to combine. Three near-identical boosted models err in the same places, leaving little for stacking to exploit, whereas a linear model, a distance-based model, and a tree ensemble fail on different cases and complement each other. Diversity, not just raw individual accuracy, drives stacking's improvement. This is why practitioners deliberately mix model families as base learners rather than stacking clones.",
    simple: "A panel of judges helps only if they see the problem differently. Three clones of the same judge just repeat one opinion; a lawyer, a doctor and an engineer cover each other's blind spots.",
    widget: W("Diversity powers the stack", "Stacked accuracy versus how diverse the base learners are, at equal individual accuracy.",
      "base-learner diversity →", ["3 clones", "2 families", "3 families", "4 families"], "stacked accuracy", [88, 90, 92, 93], "Diversity",
      [{ max: 1, text: "Cloned base models err together, so the stack barely beats one of them.", tone: "info" },
       { max: 2, text: "Mixing model families gives the meta-learner uncorrelated errors to combine.", tone: "info" },
       { max: 3, text: "🤯 At equal individual accuracy, the DIVERSE set wins — different mistakes, not higher scores, fuel stacking.", tone: "wow" }],
      { name: "Base-learner diversity", formula: "stacking gain ∝ error diversity of base learners", text: "Mix model families so the meta-learner combines genuinely different mistakes." })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "A random forest reports that 'customer_id' is the single most important feature (by impurity-based importance) for predicting churn, far above behavioural features. What is the most likely explanation and correct action?",
    choices: [
      "High-cardinality features like IDs inflate impurity-based importance because they offer many split points; drop the ID and re-check with permutation importance instead",
      "customer_id genuinely causes churn and should be the primary predictor going forward",
      "The forest is broken and should be replaced with a single decision tree",
      "You should one-hot encode customer_id so the forest can use it even more",
      "Importance scores are always reliable, so trust the ranking as-is"
    ],
    explain: "Gini/impurity-based feature importance is biased toward high-cardinality features: an ID with thousands of unique values offers many possible split points and can reduce impurity on training data by essentially memorising rows, inflating its importance without real predictive value. This is a leakage-adjacent artifact, not a genuine signal — an identifier cannot generalise to new customers. The fix is to drop such identifiers and rely on permutation importance or SHAP, which measure impact on held-out predictions. Trusting the raw ranking would build a model that has memorised IDs.",
    simple: "An ID column is a unique fingerprint, so the forest can 'cheat' by memorising who churned rather than learning why. It looks like the top feature but predicts nothing about new customers.",
    widget: W("ID columns fake high importance", "Impurity-based importance rises with a feature's cardinality, even when it is meaningless.",
      "feature cardinality →", ["binary", "10 levels", "100 levels", "unique ID"], "impurity importance (spurious)", [20, 40, 65, 95], "Cardinality",
      [{ max: 1, text: "Low-cardinality real features earn modest impurity importance.", tone: "info" },
       { max: 2, text: "As cardinality grows, a feature gets more split points and looks more important.", tone: "info" },
       { max: 3, text: "🤯 A unique ID tops the chart yet generalises to nothing — permutation importance would score it near zero.", tone: "wow" }],
      { name: "Impurity-importance bias", formula: "high cardinality inflates Gini importance → use permutation importance", text: "Distrust impurity importance for high-cardinality features; verify with permutation or SHAP." })
  });

  q("scen3", {
    q: "You add early stopping to XGBoost, but you monitor the validation metric on the SAME data you also use to select the final feature set and threshold. Test performance later disappoints. What went wrong?",
    choices: [
      "The early-stopping/validation set was reused for other tuning decisions, so it leaked into model selection and stopped being an honest estimate — use a separate untouched test set",
      "Early stopping itself is unreliable and should never be used with XGBoost",
      "The learning rate was too low, which always causes disappointing test scores",
      "XGBoost cannot do early stopping, so the feature was silently ignored",
      "The training set was too large, diluting the signal"
    ],
    explain: "Early stopping picks the tree count that maximises a metric on a watch set, so that watch set has been used to make a modelling decision and is no longer a neutral estimate of generalisation. If the same set also chooses features and thresholds, you have optimised against it multiple times and it now overstates performance — a subtle form of leakage. The remedy is a clean three-way split (or nested cross-validation): train, a validation set for early stopping and tuning, and a final test set touched only once. Blaming early stopping or the learning rate misses that the evaluation protocol leaked.",
    simple: "If you keep peeking at the same 'held-out' set to make choices, it quietly becomes part of training. You need one final exam you never looked at while studying.",
    widget: W("Reused validation sets leak", "Gap between validation-reported and true test accuracy as the same set is reused for more decisions.",
      "decisions made on the same set →", ["1 (stop only)", "2", "3", "4+"], "optimism gap (reported − true)", [2, 6, 10, 15], "Reuse count",
      [{ max: 1, text: "Using the set only for early stopping gives a small, tolerable optimism.", tone: "info" },
       { max: 2, text: "Each extra decision made on that same set inflates the reported number further.", tone: "info" },
       { max: 3, text: "🤯 Reuse it enough and 'validation' accuracy becomes fiction — a true test set is the only honest check.", tone: "wow" }],
      { name: "Validation-set leakage", formula: "one set per decision; keep a final test set untouched", text: "Reusing an early-stopping set for other tuning leaks it into selection — hold out a clean test set." })
  });

  q("scen3", {
    q: "A gradient-boosting churn model is retrained monthly. It looks great in backtests but degrades in production each month. You discover one feature is 'days_since_last_support_ticket', computed at scoring time. What is the likely trap?",
    choices: [
      "Target leakage / drift: the feature's meaning shifts over time and at training you may have used values recorded after the churn event, so backtests are optimistic — audit feature timing and monitor for drift",
      "Gradient boosting simply cannot handle time series and must be replaced by a random forest",
      "The model has too few trees; adding thousands more will fix production decay",
      "Monthly retraining is the problem; you should train once and never update",
      "The learning rate drifts on its own between months and must be frozen"
    ],
    explain: "Two subtle issues combine here. First, if 'days_since_last_support_ticket' was computed using events that occurred around or after the churn label was set, it leaks future information and inflates backtest accuracy — a point-in-time correctness failure. Second, the relationship between features and churn drifts month to month, so a model tuned on old patterns decays as the distribution shifts. Neither is a defect of gradient boosting itself. The fix is to audit exactly when each feature is available relative to the label and to monitor for concept/data drift, retraining or recalibrating as the world changes.",
    simple: "If a feature secretly peeks at what happened after the thing you are predicting, your backtest is cheating. And even honest features go stale as customer behaviour shifts month to month.",
    widget: W("Leakage and drift fool backtests", "Backtest accuracy stays high while live accuracy decays over months as leakage unwinds and data drifts.",
      "months in production →", ["backtest", "month 1", "month 2", "month 3"], "live accuracy", [93, 86, 80, 74], "Time",
      [{ max: 1, text: "The backtest looks excellent because leaked, post-event feature values were available.", tone: "info" },
       { max: 2, text: "In production those values are not yet known and behaviour drifts, so accuracy falls.", tone: "info" },
       { max: 3, text: "🤯 A steadily-decaying live curve beside a rosy backtest is the fingerprint of leakage plus drift — not a boosting flaw.", tone: "wow" }],
      { name: "Point-in-time leakage & drift", formula: "audit feature timing; monitor drift, not just backtest", text: "Optimistic backtests with decaying production point to leaked feature timing and concept drift." })
  });

  q("scen3", {
    q: "To speed things up, you build a bagging ensemble but skip the bootstrap — every tree is trained on the exact same full dataset with the same algorithm. The ensemble is no more accurate than a single tree. Why?",
    choices: [
      "Without bootstrap sampling (or feature randomness) every tree is identical, so averaging clones reduces no variance — bagging needs diversity among the base learners",
      "Bagging always fails on this dataset regardless of sampling",
      "You needed a higher learning rate to make the trees differ",
      "The trees were too shallow; deep identical trees would have helped",
      "Averaging always leaves accuracy unchanged, so this is expected for any ensemble"
    ],
    explain: "Bagging reduces variance by averaging models whose errors are at least partly independent, and that independence comes from training each tree on a different bootstrap resample (and, in random forests, a random feature subset per split). If every tree sees the identical data with a deterministic algorithm, they are the same tree, and averaging identical predictions changes nothing. The whole benefit hinges on injected randomness creating decorrelated learners. Depth or learning rate are irrelevant; the missing ingredient is the diversity that bootstrapping provides.",
    simple: "Photocopying one expert's answer sheet a hundred times and averaging still gives that one expert's answer. Bagging only helps when each copy studied slightly different data.",
    widget: W("No diversity, no benefit", "Ensemble variance reduction versus how decorrelated the base trees are.",
      "tree diversity (via bootstrap/features) →", ["identical", "low", "medium", "high"], "variance reduced by averaging", [0, 30, 60, 85], "Diversity",
      [{ max: 1, text: "Identical trees average to themselves — zero variance reduction.", tone: "info" },
       { max: 2, text: "Bootstrap resampling and feature subsets make trees differ, so averaging starts to help.", tone: "info" },
       { max: 3, text: "🤯 The more decorrelated the trees, the more variance averaging cancels — diversity IS the mechanism.", tone: "wow" }],
      { name: "Why bagging needs randomness", formula: "no bootstrap/feature randomness → identical trees → no gain", text: "Bagging's variance reduction comes entirely from diversity among the base learners." })
  });

  q("scen3", {
    q: "Two of your XGBoost model's features are 0.98-correlated (e.g. 'price_usd' and 'price_eur'). SHAP shows each with only moderate importance, and dropping one barely changes accuracy. A colleague concludes both features are unimportant. What is the subtle error?",
    choices: [
      "Correlated features share credit, so importance is split between them — the underlying signal may be very important even though each feature's individual score looks moderate",
      "The features are genuinely useless and both should be dropped immediately",
      "XGBoost cannot use correlated features at all, so importance is random noise",
      "Correlation always doubles a feature's importance, so the scores are inflated, not deflated",
      "SHAP values are meaningless for tree ensembles and should be ignored"
    ],
    explain: "When two features are nearly redundant, the model can split on either one, so the credit for their shared predictive signal is divided between them and each shows only moderate importance. Dropping one barely hurts accuracy precisely because the other carries the same information — that is evidence of redundancy, not unimportance. Concluding the underlying signal is weak confuses per-feature attribution with the value of the information itself. The right read is that price is important but its importance is spread across correlated encodings; consolidate or interpret them together.",
    simple: "If two witnesses tell the same story, the court splits the credit between them, so each looks half as crucial. Remove one and the story still stands — that means they overlap, not that the story is unimportant.",
    widget: W("Correlated features split the credit", "Measured importance of one price feature as a near-duplicate is added or removed.",
      "correlated copies present →", ["price alone", "+ 0.98 copy", "+ two copies"], "importance of the single feature", [80, 42, 28], "Redundancy",
      [{ max: 1, text: "On its own, the price feature shows high importance — the signal is strong.", tone: "info" },
       { max: 1, text: "Add a near-duplicate and each copy's score halves, though the signal is unchanged.", tone: "info" },
       { max: 2, text: "🤯 Splitting credit across correlated features makes each LOOK minor — importance is per-feature, not per-signal.", tone: "wow" }],
      { name: "Correlated-feature importance", formula: "redundant features divide importance, not the signal's value", text: "Correlated features share attribution; low per-feature scores can still hide a strong underlying signal." })
  });

  q("scen3", {
    q: "A hard-voting ensemble of five classifiers scores worse than its single best member. Investigating, you find four of the five models are minor variants of the same decision tree and tend to be wrong together. What is the real problem?",
    choices: [
      "The voters are correlated, so the majority is dominated by four near-identical models that err in unison — voting helps only with diverse, independent base learners",
      "Hard voting is always worse than using the single best model, so never use voting",
      "You needed an even number of voters; five is the problem",
      "The single best model must have leaked, so its score is the fake one",
      "Adding a sixth copy of the same tree would fix the majority"
    ],
    explain: "Majority voting improves on its members only when their errors are roughly independent, so mistakes are outvoted by correct models. Here four of five voters are essentially the same tree and make the same errors, so they form a correlated bloc that outvotes the one genuinely different (and better) model whenever they are jointly wrong. The ensemble inherits the shared blind spot instead of averaging it away. The fix is to build voters from diverse model families, not near-clones — adding more copies of the same tree only entrenches the problem.",
    simple: "A jury of five where four are identical triplets of one person is really a jury of two, and the clones can outvote the wise outsider. Independent jurors, not copies, make voting work.",
    widget: W("Correlated voters sink the vote", "Voting-ensemble accuracy versus the fraction of voters that are near-identical.",
      "share of voters that are clones →", ["all diverse", "some clones", "mostly clones", "near-all clones"], "voting accuracy", [91, 89, 84, 80], "Voter correlation",
      [{ max: 1, text: "Diverse, independent voters let the majority correct individual mistakes.", tone: "info" },
       { max: 2, text: "As voters become near-identical, they err together and the majority stops helping.", tone: "info" },
       { max: 3, text: "🤯 A correlated bloc can outvote the single best model — the vote can score BELOW its best member.", tone: "wow" }],
      { name: "Voter independence", formula: "voting needs uncorrelated errors, not repeated models", text: "Correlated voters form a bloc that entrenches shared mistakes; diversity is what makes voting work." })
  });
})();
