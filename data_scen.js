/* Applied Scenarios — decision-making across ML. choices[0] always correct (shuffled at render). */
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

  /* ===================== scen1 — Part I · Clear Calls (12) ===================== */

  q("scen1", {
    q: "You must justify every individual loan decision to a regulator who demands a clear reason for each rejection. Which model should you reach for first?",
    choices: [
      "A logistic regression or a shallow decision tree — models whose decisions you can read directly",
      "A deep neural network, because it will be the most accurate",
      "A large random forest of 500 unpruned trees",
      "A gradient-boosted ensemble like XGBoost tuned to the maximum",
      "k-nearest neighbours with a large k"
    ],
    explain: "When each decision must be explained, interpretability outranks a small accuracy edge. Logistic regression gives you signed coefficients ('income raised approval odds, missed payments lowered them'), and a shallow tree gives a readable rule path. Ensembles and deep nets are accurate but opaque — reconstructing why one applicant was refused is hard, which is a legal and ethical liability here.",
    simple: "If you have to show your working, pick a model that shows its working. A simple, transparent model beats a slightly-more-accurate black box when the law wants reasons.",
    widget: W("Accuracy is not the only axis", "Compare model families on how easily a human can read their decisions.",
      "model family →", ["linear", "shallow tree", "random forest", "boosted trees", "deep net"],
      "interpretability", [95, 88, 45, 35, 15], "Model family",
      [{ max: 1, text: "Linear models and shallow trees expose exactly which inputs drove the decision.", tone: "info" },
       { max: 3, text: "Ensembles blend hundreds of trees — accurate, but no single readable reason.", tone: "info" },
       { max: 4, text: "🤯 A deep net can be most accurate and least explainable at once — a real trade-off, not a bug.", tone: "wow" }],
      { name: "Interpretability vs accuracy", formula: "readable reasons > small accuracy gain (when reasons are required)", text: "When decisions must be justified, prefer a transparent model even at a small accuracy cost." })
  });

  q("scen1", {
    q: "Your fraud dataset is 2% fraud, 98% legitimate. Your model reports 98% accuracy. What should you conclude?",
    choices: [
      "Accuracy is misleading here — a model that always predicts 'legitimate' also scores 98%, so you need precision, recall or MCC",
      "The model is excellent; 98% accuracy means it catches almost all fraud",
      "You should collect more legitimate transactions to raise accuracy further",
      "Accuracy is the right metric; you just need to push it above 99%",
      "The 2% fraud rate means the model is 2% wrong, which is acceptable"
    ],
    explain: "On heavy imbalance, accuracy is dominated by the majority class. Predicting 'legitimate' for everyone scores 98% while catching zero fraud — useless. You must look at the positive class directly: recall (what fraction of fraud you caught), precision (of your fraud flags, how many were real), and F1 or MCC as balanced single numbers. The confusion matrix tells the real story.",
    simple: "If 98 in 100 cases are the same answer, guessing that answer every time already scores 98%. On rare-event problems, accuracy flatters a model that does nothing useful.",
    widget: W("Accuracy hides on imbalanced data", "Watch a do-nothing 'always legitimate' model's score as fraud gets rarer.",
      "fraud rate →", ["50/50", "20% fraud", "10% fraud", "2% fraud"],
      "accuracy of do-nothing model", [50, 80, 90, 98], "Imbalance",
      [{ max: 1, text: "On balanced data, always-guess-one-class scores only 50%.", tone: "info" },
       { max: 2, text: "As the majority grows, the lazy model's accuracy climbs for free.", tone: "info" },
       { max: 3, text: "🤯 98% accuracy, 0% fraud caught. Recall and precision would expose it instantly.", tone: "wow" }],
      { name: "Metric choice under imbalance", formula: "rare positives → recall / precision / F1 / MCC, not accuracy", text: "On imbalanced data, judge the model on the rare class, not overall accuracy." })
  });

  q("scen1", {
    q: "You have only 300 labelled rows and 8 features, and you need a solid baseline classifier quickly. What's a sensible first choice?",
    choices: [
      "A simple, well-regularised model like logistic regression — low variance suits small data",
      "A deep neural network with several hidden layers",
      "A gradient-boosted ensemble with 2,000 trees",
      "A very deep, unpruned decision tree",
      "k-NN with k = 1"
    ],
    explain: "With few rows, high-capacity models overfit: deep nets, huge boosted ensembles and deep single trees memorise 300 rows rather than learning a general rule. A simple, regularised model like logistic regression (or a shallow tree, or k-NN with a sensible k) has low variance and generalises better on small data. Start simple, add complexity only if honest validation says it helps.",
    simple: "Small data can't feed a hungry model. A simple model learns the shape you can actually support; a complex one just memorises the few examples you have.",
    widget: W("Complex models overfit small data", "As model capacity grows on a 300-row set, watch training vs test accuracy split apart.",
      "model capacity →", ["linear", "shallow tree", "deep tree", "big boosted"],
      "test accuracy", [82, 80, 68, 66], "Capacity",
      [{ max: 1, text: "A simple model generalises from the little data it has.", tone: "info" },
       { max: 3, text: "Higher capacity fits the 300 rows perfectly but tests worse — overfitting.", tone: "warn" }],
      { name: "Capacity vs data size", formula: "few rows → low-variance model", text: "Match model complexity to how much data you have; small data wants simple models." },
      { series: [{ name: "training accuracy", ys: [83, 86, 99, 100] }] })
  });

  q("scen1", {
    q: "Your features are on wildly different scales — income in the tens of thousands, age in years — and you plan to use k-nearest neighbours. What must you do first?",
    choices: [
      "Scale the features (e.g. standardise) so distance isn't dominated by the large-numbered column",
      "Nothing — k-NN handles raw scales automatically",
      "Convert every feature to a category with one-hot encoding",
      "Remove age, since income is the bigger number",
      "Switch to accuracy as your metric"
    ],
    explain: "k-NN decides by Euclidean distance, and distance is dominated by whichever feature has the largest numeric range. Unscaled, income (tens of thousands) swamps age (tens), so age effectively vanishes. Standardising each feature to mean 0, variance 1 (or min-max scaling) puts them on comparable footing so every feature contributes. Distance-based and gradient-based models need scaling; tree-based models don't.",
    simple: "Distance-based models measure closeness with a ruler. If one column is in miles and another in millimetres, the miles column drowns out the rest until you put them on the same scale.",
    widget: W("Scaling matters for distance models", "Watch k-NN accuracy as you go from raw features to standardised ones.",
      "preprocessing →", ["raw", "log only", "min-max", "standardised"],
      "k-NN accuracy", [61, 72, 86, 88], "Scaling",
      [{ max: 1, text: "Raw scales let the biggest-numbered feature dominate the distance.", tone: "warn" },
       { max: 3, text: "🤯 Same data, same k — scaling alone lifts accuracy from 61% to 88%.", tone: "wow" }],
      { name: "Feature scaling", formula: "distance/gradient models → standardise; trees → not needed", text: "Scale features for k-NN, SVMs and neural nets; tree models are scale-invariant." })
  });

  q("scen1", {
    q: "In a cancer-screening test you care far more about not missing a true case than about occasional false alarms. Which metric should you optimise?",
    choices: [
      "Recall (sensitivity) — the fraction of true cases the model actually catches",
      "Precision — the fraction of positive predictions that are correct",
      "Overall accuracy",
      "Specificity — the fraction of healthy people correctly cleared",
      "Training loss"
    ],
    explain: "Missing a real case (a false negative) is the costly error in screening, so you optimise recall, which directly measures the share of true positives you catch. You accept more false alarms (lower precision) because a flagged healthy patient just gets a follow-up test, whereas a missed cancer goes untreated. The right metric follows from which mistake hurts more.",
    simple: "A smoke alarm should rather beep at burnt toast than stay silent in a real fire. When missing the positive is the dangerous mistake, tune for recall.",
    widget: W("Precision vs recall is a dial", "Lower the decision threshold to catch more true cases and watch both metrics move.",
      "threshold (high → low) →", ["strict", "medium", "lenient", "very lenient"],
      "recall", [55, 75, 90, 97], "Threshold",
      [{ max: 1, text: "A strict threshold flags few cases — high precision, but misses real ones.", tone: "info" },
       { max: 3, text: "🤯 Lowering the threshold lifts recall toward 97% — you catch nearly every true case.", tone: "wow" }],
      { name: "Cost-driven metric choice", formula: "false negative costly → maximise recall", text: "Pick the metric that punishes your most expensive mistake; screening favours recall." },
      { series: [{ name: "precision", ys: [92, 78, 60, 45] }] })
  });

  q("scen1", {
    q: "You're predicting a house's sale price (a continuous number). What kind of problem is this, and what metric fits?",
    choices: [
      "A regression problem — evaluate with an error like MAE or RMSE",
      "A classification problem — evaluate with accuracy",
      "A clustering problem — evaluate with silhouette score",
      "A ranking problem — evaluate with ROC-AUC",
      "A regression problem — evaluate with F1 score"
    ],
    explain: "Predicting a continuous quantity is regression, not classification. You measure how far predictions land from the truth: mean absolute error (average pounds off) or root mean squared error (which punishes big misses harder). Accuracy, F1 and ROC-AUC are for discrete classes; silhouette is for clusters. Match the metric family to the target type.",
    simple: "A price is a number on a slider, not a yes/no box. You score it by how close your guess is, not whether it's exactly right.",
    widget: W("Regression is scored by closeness", "As the model improves, watch its average error shrink toward the price.",
      "model quality →", ["guess mean", "1 feature", "few features", "tuned"],
      "accuracy-equivalent (100 − %error)", [40, 62, 78, 88], "Model quality",
      [{ max: 1, text: "Predicting the average price is the naive regression baseline.", tone: "info" },
       { max: 3, text: "Better features shrink the average error — that's the regression score.", tone: "info" }],
      { name: "Problem type → metric family", formula: "continuous target → regression → MAE / RMSE", text: "Decide classification vs regression first; it dictates which metrics even apply." })
  });

  q("scen1", {
    q: "You have 50,000 rows of purchase records but NO labels, and you want to discover natural customer groups. Which approach fits?",
    choices: [
      "Unsupervised clustering, such as K-Means or DBSCAN",
      "Supervised classification with logistic regression",
      "Supervised regression with gradient boosting",
      "Train/test split and measure accuracy",
      "A confusion matrix on the predictions"
    ],
    explain: "With no target labels, there's nothing to predict against, so supervised methods (classification, regression) don't apply. Finding natural groupings is unsupervised clustering: K-Means if you expect roughly round, similar-sized clusters and can pick k; DBSCAN if clusters are irregularly shaped or you want to isolate noise. Accuracy and confusion matrices need labels you don't have.",
    simple: "No answer key means no supervised learning. When you just want to see what groups fall out of the data, that's clustering.",
    widget: W("No labels → unsupervised", "As you add clustering structure, watch how cleanly customers separate into groups.",
      "clustering effort →", ["one blob", "k=2", "k=4", "tuned k"],
      "cluster separation quality", [10, 55, 80, 88], "Clustering",
      [{ max: 1, text: "Treating everyone as one group finds no structure.", tone: "info" },
       { max: 3, text: "Clustering surfaces natural segments without ever needing a label.", tone: "info" }],
      { name: "Supervised vs unsupervised", formula: "labels present → supervised; absent → clustering / dim-reduction", text: "If there's no target column, reach for unsupervised methods like clustering." })
  });

  q("scen1", {
    q: "A colleague reports 100% accuracy on the test set after including a 'customer_closed_account' column to predict churn. What most likely happened?",
    choices: [
      "Data leakage — that column encodes the outcome itself, so it won't be available before churn happens",
      "The model is genuinely perfect and ready to deploy",
      "The test set was simply too easy and should be made larger",
      "Accuracy is the wrong metric; F1 would show the real story",
      "The model overfit and needs more regularisation"
    ],
    explain: "Near-perfect test accuracy is almost always leakage: a feature that secretly contains the answer. 'Account closed' is essentially the churn label restated, and it isn't known at prediction time (you're trying to predict churn before it happens). The fix is to remove any feature that wouldn't exist at the moment of prediction, then re-evaluate. Suspiciously perfect scores are a red flag, not a trophy.",
    simple: "If a feature quietly tells the model the answer, it will 'ace' the test and fail in the real world. A column that only exists after the event has already leaked the outcome.",
    widget: W("Leakage inflates test scores", "Remove the leaky column and watch the fake 100% fall to the honest number.",
      "features used →", ["with leak", "drop leak", "clean set", "clean+tuned"],
      "honest test accuracy", [100, 74, 76, 81], "Feature set",
      [{ max: 0, text: "The leaky feature restates the label — 100% is an illusion.", tone: "warn" },
       { max: 3, text: "🤯 Removing it drops accuracy to a truthful ~80% that will actually hold up.", tone: "wow" }],
      { name: "Data leakage", formula: "feature known only after the event → leak", text: "Exclude any feature not available at prediction time; perfect scores usually mean leakage." })
  });

  q("scen1", {
    q: "Your data arrives as a time series of daily sales and you want to forecast next month. How should you split train and test?",
    choices: [
      "Split by time — train on earlier dates, test on later ones — never shuffle",
      "Shuffle all rows randomly, then take 20% as the test set",
      "Use standard k-fold cross-validation with random folds",
      "Put the test set at the start and train on the future",
      "Use every other day for training and the rest for testing"
    ],
    explain: "With time-ordered data, random shuffling lets the model peek at the future to predict the past — leakage that inflates scores and collapses in production. You must respect chronology: train on the past, validate on the following period (a time-series split or rolling-origin evaluation). Standard k-fold breaks the time order and is invalid here.",
    simple: "You can't study next week's answers to pass today's test. For forecasting, always train on the past and test on the future, in order.",
    widget: W("Respect time order in forecasting", "Compare honest forward-in-time testing with peeking via a shuffled split.",
      "evaluation method →", ["shuffled (leaky)", "random k-fold", "holdout end", "time-series split"],
      "realistic accuracy estimate", [61, 63, 80, 82], "Method",
      [{ max: 1, text: "Shuffling time series leaks the future into training — over-optimistic.", tone: "warn" },
       { max: 3, text: "Training on the past and testing on the future gives an honest forecast estimate.", tone: "info" }],
      { name: "Time-aware validation", formula: "temporal data → train past, test future", text: "Never shuffle a time series; split chronologically so the test set is always 'later'." })
  });

  q("scen1", {
    q: "You need to predict whether an email is spam or not spam. What type of task is this?",
    choices: [
      "Binary classification",
      "Regression",
      "Clustering",
      "Dimensionality reduction",
      "Multi-output regression"
    ],
    explain: "Sorting each email into one of two labelled categories (spam / not spam) is binary classification. Regression predicts numbers, clustering groups unlabelled data, and dimensionality reduction compresses features — none fit a two-class labelled prediction. Naming the task type correctly is the first step, because it decides the models and metrics you can use.",
    simple: "Two labelled buckets, one per email: that's classification. Spam or not-spam is the textbook binary case.",
    widget: W("Two labelled classes → classification", "As the spam classifier improves, watch how cleanly it separates the two classes.",
      "model quality →", ["coin flip", "keywords", "bag-of-words", "tuned"],
      "classification accuracy", [50, 74, 88, 95], "Model quality",
      [{ max: 0, text: "A coin flip scores 50% on a two-class problem.", tone: "info" },
       { max: 3, text: "A trained classifier separates spam from ham with high accuracy.", tone: "info" }],
      { name: "Task typing", formula: "labelled discrete target → classification", text: "Identify the task type first — it constrains every later modelling choice." })
  });

  q("scen1", {
    q: "You have 40 numeric features and want to VISUALISE the data in 2D to eyeball its structure. Which tool fits?",
    choices: [
      "A dimensionality-reduction method like PCA or t-SNE to project to 2D",
      "A decision tree with maximum depth 2",
      "Logistic regression with two coefficients",
      "K-Means with k = 2",
      "A confusion matrix"
    ],
    explain: "To see 40-dimensional data on a flat screen you need dimensionality reduction: PCA finds the directions of greatest variance and is fast and linear; t-SNE and UMAP preserve local neighbourhoods and often reveal clusters more vividly. A tree or logistic model predicts a target rather than laying out the data, and K-Means groups rather than projects. For 'let me look at the shape', reduce dimensions.",
    simple: "You can't look at 40 axes at once. Dimensionality reduction squashes them down to two so you can actually plot and eyeball the data.",
    widget: W("Reduce dimensions to see structure", "Project 40 features down and watch how much structure survives in 2D.",
      "projection →", ["random 2 feats", "top-2 PCA", "tuned PCA", "t-SNE"],
      "visible cluster structure", [25, 60, 72, 88], "Projection",
      [{ max: 0, text: "Two arbitrary raw features rarely show the real structure.", tone: "info" },
       { max: 3, text: "🤯 t-SNE unfolds 40D neighbourhoods into a readable 2D map.", tone: "wow" }],
      { name: "Dimensionality reduction for viewing", formula: "many features → PCA / t-SNE → 2D plot", text: "To visualise high-dimensional data, project it down with PCA or t-SNE first." })
  });

  q("scen1", {
    q: "Two candidate models score 84.1% and 84.4% on your validation set of 200 rows. What's the wise conclusion?",
    choices: [
      "The gap is within noise for 200 rows — treat them as tied and pick the simpler/faster one",
      "The 84.4% model is clearly better and should always be chosen",
      "Retrain both 100 times and always deploy whichever wins each run",
      "The difference proves the second model generalises better",
      "You should pick whichever has higher training accuracy instead"
    ],
    explain: "On only 200 rows, a 0.3-point difference is well inside the margin of sampling error — reshuffle the split and the ranking could flip. Treat near-ties as ties and let a secondary criterion decide: simplicity, speed, interpretability or robustness. Chasing a fraction of a percent on a tiny validation set is fitting to noise, not signal.",
    simple: "With a small test set, tiny score gaps are just luck of the draw. When two models are basically level, pick the one that's simpler to run and explain.",
    widget: W("Small sets make small gaps meaningless", "Watch the confidence band around an accuracy estimate shrink as the test set grows.",
      "test set size →", ["50", "200", "1,000", "10,000"],
      "estimate precision (100 − margin)", [86, 93, 97, 99], "Test size",
      [{ max: 1, text: "At 200 rows the error bar is several points wide — 0.3 is noise.", tone: "warn" },
       { max: 3, text: "Only with thousands of rows does a fraction-of-a-percent gap become trustworthy.", tone: "info" }],
      { name: "Statistical significance of gaps", formula: "small test set → wide error bars → treat near-ties as ties", text: "Judge score differences against the test set's margin of error before declaring a winner." })
  });

  /* ===================== scen2 — Part II · Weighing Trade-offs (12) ===================== */

  q("scen2", {
    q: "You have 2 million rows of tabular data and want the strongest possible accuracy, with interpretability a low priority. Which model family is the usual first pick?",
    choices: [
      "Gradient-boosted trees (XGBoost / LightGBM) — the workhorse for large tabular problems",
      "k-nearest neighbours, since more data always helps it most",
      "A single deep decision tree",
      "Naive Bayes with strong independence assumptions",
      "Logistic regression with no interaction terms"
    ],
    explain: "On large tabular datasets where accuracy is king, gradient-boosted trees are the reliable state of the art: they capture non-linearities and feature interactions, handle mixed feature types, and scale well. k-NN becomes slow and memory-heavy at millions of rows; a single tree overfits or underfits; Naive Bayes and plain logistic regression are strong baselines but usually trail boosting on complex tabular signal.",
    simple: "For big spreadsheets where you just want the best number, boosted trees are the default champion. They squeeze non-linear patterns out of tabular data better than most alternatives.",
    widget: W("Boosted trees lead on tabular data", "Compare model families' accuracy on a large tabular problem.",
      "model family →", ["naive bayes", "logistic", "single tree", "random forest", "boosted trees"],
      "accuracy", [72, 79, 76, 86, 90], "Model family",
      [{ max: 1, text: "Linear and Bayes baselines are fast but leave signal on the table.", tone: "info" },
       { max: 4, text: "🤯 Boosting typically edges out even a strong random forest on tabular data.", tone: "wow" }],
      { name: "Default for big tabular", formula: "large tabular + accuracy-first → gradient boosting", text: "Gradient-boosted trees are the go-to when tabular accuracy matters more than interpretability." })
  });

  q("scen2", {
    q: "Your model gets 99% training accuracy but only 72% on the test set. What is happening and what should you try first?",
    choices: [
      "Overfitting — reduce complexity or add regularisation / more data to close the gap",
      "Underfitting — make the model far more complex",
      "The test set is broken and should be discarded",
      "Nothing is wrong; a big train-test gap is normal and healthy",
      "You should train for many more epochs to raise test accuracy"
    ],
    explain: "A large gap between high training and lower test accuracy is the signature of overfitting: the model memorised the training data instead of learning a general rule. First remedies attack variance — simplify the model (shallower trees, fewer features), add regularisation (L1/L2, dropout), or gather more data. Making it more complex or training longer would widen the gap, not close it.",
    simple: "Acing the practice questions but flunking the real exam means you memorised, not learned. Rein the model in until the two scores move closer together.",
    widget: W("Overfitting is a train-test gap", "Add regularisation and watch the training and test curves come back together.",
      "regularisation strength →", ["none", "light", "medium", "strong"],
      "test accuracy", [72, 80, 84, 82], "Regularisation",
      [{ max: 0, text: "No regularisation: training 99%, test 72% — a wide overfitting gap.", tone: "warn" },
       { max: 2, text: "Regularising lifts test accuracy as memorisation is curbed.", tone: "info" },
       { max: 3, text: "Too much regularisation starts to underfit — there's a sweet spot.", tone: "info" }],
      { name: "Diagnosing overfitting", formula: "train ≫ test → overfit → simplify / regularise / more data", text: "A big train-test gap means overfitting; cut variance before adding capacity." },
      { series: [{ name: "training accuracy", ys: [99, 94, 89, 84] }] })
  });

  q("scen2", {
    q: "Predictions must return in under 10 milliseconds at scale, and training-time cost doesn't matter. Which model characteristic matters most?",
    choices: [
      "Fast inference — favour a model that predicts quickly, like a compact linear model or a pruned tree",
      "A model with the fastest training time regardless of prediction speed",
      "k-NN, because it has no training phase to slow you down",
      "The largest ensemble available, since accuracy is all that counts",
      "Whatever model has the smallest file size on disk"
    ],
    explain: "The constraint is prediction latency, so optimise inference speed. A small linear model or a shallow/pruned tree scores in microseconds. k-NN is the trap here: it has 'no training' but its prediction is slow — it must compare each query against the whole dataset. Huge ensembles evaluate hundreds of trees per prediction. Fast training is irrelevant when the bottleneck is serving.",
    simple: "If answers must come back instantly, pick a model that's quick to ask, not quick to build. k-NN is lazy at training but slow every single time you query it.",
    widget: W("Latency depends on inference cost", "Compare how long each model takes to answer ONE query.",
      "model →", ["linear", "shallow tree", "small forest", "big boosted", "k-NN (2M rows)"],
      "queries served per second (norm.)", [99, 95, 70, 45, 8], "Model",
      [{ max: 1, text: "Linear models and shallow trees answer almost instantly.", tone: "info" },
       { max: 4, text: "🤯 k-NN compares every query to all 2M rows — lightning to train, sluggish to serve.", tone: "wow" }],
      { name: "Inference vs training cost", formula: "latency budget → optimise prediction speed, not training", text: "Serving constraints reward fast-inference models; beware k-NN's slow prediction." })
  });

  q("scen2", {
    q: "Your dataset has 30% of values missing in one important column. Which approach is generally soundest?",
    choices: [
      "Impute the missing values (and optionally add a 'was-missing' flag), fitting the imputer on training data only",
      "Delete every row that has any missing value, even if it discards most of the data",
      "Fill all missing values with 0 without thinking about the column's meaning",
      "Impute using statistics computed over the whole dataset before splitting",
      "Drop the column entirely regardless of how predictive it is"
    ],
    explain: "Dropping 30%-missing rows can throw away most of your data, and blanket zero-fill distorts a column whose real values aren't near zero. Sensible imputation (median/mean, or model-based) keeps the rows, and a 'was-missing' indicator lets the model use missingness itself as signal. Crucially, fit the imputer on the training split only — computing fill statistics over all data leaks test information.",
    simple: "Don't bin a third of your data over blanks, and don't paper over them with a careless 0. Fill them in thoughtfully — using only the training set to decide the fill.",
    widget: W("Impute, don't discard", "Compare ways of handling a 30%-missing column by resulting model quality.",
      "strategy →", ["drop rows", "fill 0", "median impute", "impute + flag"],
      "resulting accuracy", [66, 72, 82, 85], "Strategy",
      [{ max: 0, text: "Dropping rows can delete most of the dataset — accuracy suffers.", tone: "warn" },
       { max: 3, text: "🤯 Median imputation plus a 'was-missing' flag keeps the data and the signal.", tone: "wow" }],
      { name: "Missing-value strategy", formula: "impute on train only (+ missing flag) > dropping / naive fill", text: "Prefer thoughtful imputation over deleting rows; fit imputers on training data only." })
  });

  q("scen2", {
    q: "You must choose k for k-NN. Training accuracy is highest at k = 1 but you care about new data. How should you choose k?",
    choices: [
      "By cross-validation, picking the k with the best validation performance — not the best training score",
      "Always k = 1, because it gives the highest training accuracy",
      "The largest k possible, so more neighbours always vote",
      "Set k equal to the number of features",
      "Set k equal to the number of classes"
    ],
    explain: "k = 1 memorises the training set (each point is its own nearest neighbour) and overfits, which is why its training accuracy is perfect and misleading. The honest way to pick k is cross-validation: try a range and choose the k that performs best on held-out folds. Too small overfits noise; too large oversmooths and underfits. Validation, not training score, reveals the sweet spot.",
    simple: "k = 1 just parrots the nearest example, so it looks flawless on data it has already seen. Let held-out validation, not the training score, tell you the right number of neighbours.",
    widget: W("Tune k on validation, not training", "Watch training vs validation accuracy as k grows from 1 upward.",
      "k →", ["1", "5", "15", "50"],
      "validation accuracy", [74, 85, 83, 76], "k",
      [{ max: 0, text: "k=1 scores 100% on training but overfits — validation is only 74%.", tone: "warn" },
       { max: 1, text: "A moderate k generalises best on held-out data.", tone: "info" },
       { max: 3, text: "Very large k oversmooths and underfits.", tone: "info" }],
      { name: "Hyperparameter tuning by CV", formula: "pick k by cross-validation, not training accuracy", text: "Choose hyperparameters on validation folds; training score always favours overfit settings." },
      { series: [{ name: "training accuracy", ys: [100, 90, 85, 78] }] })
  });

  q("scen2", {
    q: "A marketing team can only follow up on the top 100 leads your model ranks as most likely to convert. Which metric best reflects success?",
    choices: [
      "Precision@100 (top-k precision) — how many of your top 100 actually convert",
      "Overall accuracy across all leads",
      "Recall across the entire lead database",
      "Mean squared error of the probability scores",
      "The raw number of leads in the dataset"
    ],
    explain: "When only the top 100 ranked leads get acted on, what matters is how many of those 100 convert — precision@k (here k = 100). Overall accuracy and full-database recall ignore the fact that you only ever touch the top of the ranked list. This is a ranking/top-k problem, so evaluate at the operating point you actually use.",
    simple: "If you can only call the top 100 names, you care about how many of those 100 say yes — not how the model did on everyone else. Score it where you actually act.",
    widget: W("Score at your operating point", "As ranking quality improves, watch how many of the top 100 leads convert.",
      "ranking quality →", ["random", "weak model", "good model", "tuned model"],
      "precision@100", [12, 34, 58, 74], "Ranking quality",
      [{ max: 0, text: "Random ordering converts at the base rate — no lift.", tone: "info" },
       { max: 3, text: "🤯 A good ranker packs real converters into the top 100 you actually call.", tone: "wow" }],
      { name: "Top-k / ranking metrics", formula: "act on top k → evaluate precision@k, not global accuracy", text: "When you only act on the highest-ranked items, measure precision at that cutoff." })
  });

  q("scen2", {
    q: "One feature is a 10,000-category user ID, and one-hot encoding it would explode your feature count. What's a better approach?",
    choices: [
      "Use a high-cardinality technique like target encoding (fit out-of-fold) or feature hashing",
      "One-hot encode it anyway into 10,000 columns",
      "Assign each category an arbitrary integer 1–10,000 and treat it as numeric magnitude",
      "Drop every categorical feature in the dataset",
      "Convert it to a date and extract the month"
    ],
    explain: "One-hot on 10,000 categories creates a huge, sparse matrix. Target encoding replaces each category with the (out-of-fold) mean target for it — compact and informative, if you guard against leakage by encoding on held-out folds. Feature hashing maps categories into a fixed number of buckets. Labelling categories 1–10,000 as a magnitude is wrong: it invents a false ordering the model will misread.",
    simple: "Ten thousand yes/no columns is unwieldy, and numbering the categories pretends ID 900 is 'bigger' than ID 3. Target encoding or hashing keeps it compact without inventing fake order.",
    widget: W("High-cardinality needs smarter encoding", "Compare encodings of a 10,000-category feature by model quality.",
      "encoding →", ["ordinal ints", "one-hot (10k cols)", "feature hashing", "target encoding"],
      "accuracy", [58, 74, 78, 84], "Encoding",
      [{ max: 0, text: "Integer labels invent a false ordering the model misreads.", tone: "warn" },
       { max: 3, text: "🤯 Out-of-fold target encoding is compact and captures each category's signal.", tone: "wow" }],
      { name: "Encoding high-cardinality features", formula: "many categories → target encoding (out-of-fold) / hashing", text: "For thousands of categories, use target encoding or hashing, not raw integers or giant one-hot." })
  });

  q("scen2", {
    q: "You standardised your features using the mean and standard deviation of the ENTIRE dataset, then split into train and test. What's the problem?",
    choices: [
      "Preprocessing leaked test information — fit the scaler on the training set only, then apply it to the test set",
      "Nothing — using all the data to scale is the correct, most accurate approach",
      "You should have standardised each row instead of each column",
      "Standardisation should always be done after training the model",
      "The problem is only that standardisation is unnecessary for any model"
    ],
    explain: "Computing the mean and standard deviation over all data before splitting lets the test set's statistics seep into training — a subtle leak that makes validation scores optimistic. The correct order is: split first, fit the scaler on the training split, then transform both train and test with those fitted values. A Pipeline enforces this automatically inside cross-validation.",
    simple: "If the scaler has already seen the test set's numbers, your evaluation is a little bit rigged. Split first, learn the scaling from training only, then apply it to the test data.",
    widget: W("Fit preprocessing on train only", "Compare an honest pipeline with one that scaled using the whole dataset.",
      "preprocessing setup →", ["scale on all data", "scale on train only"],
      "honesty of the estimate (norm.)", [70, 95], "Setup",
      [{ max: 0, text: "Scaling with test statistics leaks information — the score is inflated.", tone: "warn" },
       { max: 1, text: "🤯 Fitting the scaler on training only gives a trustworthy estimate.", tone: "wow" }],
      { name: "Preprocessing leakage", formula: "split → fit transforms on train → apply to test", text: "Always fit scalers/encoders on the training split only; a Pipeline makes this automatic." })
  });

  q("scen2", {
    q: "Your classes are 90/10 imbalanced and the model ignores the minority class. Which set of remedies is appropriate?",
    choices: [
      "Adjust class weights, resample (e.g. SMOTE / undersample), and tune the decision threshold — judged by PR-AUC or F1",
      "Just raise the overall accuracy target and retrain",
      "Delete the minority class so the data is balanced",
      "Switch to a larger random test split and nothing else",
      "Report accuracy only and ignore the minority class"
    ],
    explain: "Imbalance makes the model favour the majority. Real fixes rebalance the learning signal: class weights penalise minority errors more, resampling (oversample the minority with SMOTE, or undersample the majority) evens the training set, and lowering the decision threshold trades precision for recall. Evaluate with PR-AUC or F1, not accuracy. Deleting the minority destroys the very thing you're trying to predict.",
    simple: "When a model shrugs off the rare class, make that class matter more — reweight it, resample it, or move the cutoff — and grade with a metric that watches it.",
    widget: W("Rebalancing recovers the minority", "Apply imbalance remedies and watch minority-class recall climb.",
      "remedy →", ["none", "class weights", "+ resampling", "+ threshold tuned"],
      "minority-class recall", [18, 52, 71, 84], "Remedy",
      [{ max: 0, text: "Untreated, the model barely ever predicts the minority class.", tone: "warn" },
       { max: 3, text: "🤯 Weights, resampling and a tuned threshold together recover minority recall.", tone: "wow" }],
      { name: "Handling class imbalance", formula: "weights + resampling + threshold; judge by PR-AUC / F1", text: "Combat imbalance by reweighting, resampling and threshold-tuning — never by deleting the rare class." })
  });

  q("scen2", {
    q: "You want a single number that summarises a classifier's ranking quality across ALL thresholds on a fairly balanced problem. Which metric?",
    choices: [
      "ROC-AUC — the probability a random positive is ranked above a random negative",
      "Accuracy at the default 0.5 threshold",
      "The training loss at the final epoch",
      "Precision at a single fixed threshold",
      "The number of true negatives"
    ],
    explain: "ROC-AUC integrates performance over every threshold and equals the chance that a random positive outranks a random negative — a clean, threshold-free summary of ranking quality, ideal on balanced data. Accuracy and precision fix one threshold and hide the rest of the trade-off curve. (On heavily imbalanced problems, PR-AUC is often more informative, but the question specifies balanced.)",
    simple: "ROC-AUC scores how well the model sorts positives above negatives, regardless of where you set the cutoff. It's the one-number summary of ranking skill.",
    widget: W("ROC-AUC summarises all thresholds", "As the classifier ranks better, watch its ROC-AUC rise toward 1.",
      "ranking skill →", ["random", "weak", "good", "strong"],
      "ROC-AUC ×100", [50, 68, 84, 95], "Ranking skill",
      [{ max: 0, text: "AUC 0.5 means the model ranks no better than a coin flip.", tone: "info" },
       { max: 3, text: "🤯 AUC near 1.0 means almost every positive outranks every negative.", tone: "wow" }],
      { name: "Threshold-free ranking metric", formula: "ROC-AUC = P(random positive ranked above random negative)", text: "Use ROC-AUC to summarise ranking quality across all thresholds on balanced data." })
  });

  q("scen2", {
    q: "A single decision tree keeps giving very different structures when you resample the data (high variance). What's a natural fix?",
    choices: [
      "Bag it — train many trees on bootstrap samples and average/vote (a random forest)",
      "Make the single tree deeper so it fits the data more exactly",
      "Remove regularisation so the tree can grow freely",
      "Switch to a single linear model and accept high bias",
      "Train the same tree repeatedly on the identical data"
    ],
    explain: "Deep single trees are low-bias but high-variance — small data changes reshuffle their splits. Bagging averages many trees fit on bootstrap resamples, cancelling much of that variance; random forests add per-split feature sampling to decorrelate the trees further. Deepening one tree or removing limits increases variance. Retraining on identical data changes nothing. The cure for variance is averaging independent learners.",
    simple: "One jittery tree overreacts to the exact rows it sees. Grow a whole forest on shuffled samples and let them vote — the wobble averages out.",
    widget: W("Bagging averages away variance", "Add trees to a bagged ensemble and watch test accuracy stabilise.",
      "number of trees →", ["1 tree", "10 trees", "50 trees", "200 trees"],
      "test accuracy", [76, 84, 87, 88], "Ensemble size",
      [{ max: 0, text: "A single deep tree is accurate on average but high-variance.", tone: "warn" },
       { max: 3, text: "🤯 Averaging hundreds of bootstrap trees stabilises predictions — a random forest.", tone: "wow" }],
      { name: "Bagging for variance", formula: "high-variance base learner → bootstrap + average (forest)", text: "Reduce a model's variance by bagging many resampled copies and averaging their votes." })
  });

  q("scen2", {
    q: "You have plenty of unlabelled data but labelling is expensive, and you want the model to improve fastest per label. Which idea directly targets this?",
    choices: [
      "Active learning — let the model pick the most informative points for you to label next",
      "Train on random labels to save money",
      "One-hot encode the unlabelled data and stop",
      "Increase the learning rate until it converges",
      "Use a larger test set and label that instead"
    ],
    explain: "When labels are the scarce, costly resource, active learning maximises value per label: the model flags the examples it's most uncertain about (or that would most reduce error), and you label those first, so each label teaches the most. Random labelling wastes budget on easy, redundant points. Encoding tricks and learning-rate tweaks don't address the labelling bottleneck at all.",
    simple: "If every label costs money, don't label at random — label the cases the model is most confused about. Those teach it the most for each pound spent.",
    widget: W("Active learning spends labels wisely", "Compare accuracy gained per label under random vs uncertainty-driven labelling.",
      "labels spent →", ["0", "50 random", "50 active", "200 active"],
      "accuracy", [55, 68, 79, 88], "Labelling",
      [{ max: 1, text: "Random labelling improves the model slowly.", tone: "info" },
       { max: 3, text: "🤯 Labelling the model's most-uncertain points lifts accuracy far faster per label.", tone: "wow" }],
      { name: "Active learning", formula: "expensive labels → label the most informative points first", text: "When labels are costly, let model uncertainty choose what to label to maximise learning per label." })
  });

  /* ===================== scen3 — Part III · Subtle Traps (12) ===================== */

  q("scen3", {
    q: "You ran feature selection on the FULL dataset, then split into train/test and cross-validated. Your CV score looks great but production is worse. What went wrong?",
    choices: [
      "Selection leakage — features were chosen using the test rows; selection must happen INSIDE each CV fold on training data only",
      "The model simply needs more trees",
      "Cross-validation is unreliable and should be replaced by a single split",
      "The production data is from a different planet; nothing was wrong methodologically",
      "You used too few features and should keep them all"
    ],
    explain: "Choosing features while looking at the whole dataset lets the test rows influence which features survive — the selection has already peeked at the answers, so CV overstates performance. Correct practice nests feature selection inside the cross-validation: within each fold, select on that fold's training portion only, then evaluate on its held-out portion. Otherwise the 'held-out' data wasn't truly held out.",
    simple: "If you picked the features while looking at the test rows, your test was never blind. Selection has to happen fresh inside each fold, seeing only that fold's training data.",
    widget: W("Selection must live inside the fold", "Compare a leaky select-then-CV pipeline with proper nested selection.",
      "setup →", ["select on all data", "nested selection"],
      "CV–production agreement (norm.)", [62, 92], "Setup",
      [{ max: 0, text: "Selecting on all data leaks the test rows — CV looks better than reality.", tone: "warn" },
       { max: 1, text: "🤯 Selecting inside each fold makes CV match production.", tone: "wow" }],
      { name: "Feature-selection leakage", formula: "select features inside each CV fold, on training data only", text: "Any data-driven step that sees the labels must be refit inside each fold, or CV is optimistic." })
  });

  q("scen3", {
    q: "You tuned hyperparameters on your test set until accuracy peaked, and reported that peak. Why is the reported number untrustworthy?",
    choices: [
      "You overfit the test set by repeatedly optimising against it — you need a separate validation set (or nested CV) and a truly untouched test set",
      "Test sets are meant to be tuned on; the number is fine",
      "The problem is only that the test set was too small",
      "Accuracy can never be trusted as a metric under any circumstances",
      "You should have tuned on the training set's accuracy instead"
    ],
    explain: "Every time you tweak hyperparameters to raise the test score, you leak information from the test set into your choices; after many rounds you've fitted to that specific set and the reported peak is optimistic. The discipline: tune on a validation set (or inner CV loop) and touch the test set exactly once, at the very end. Nested CV formalises this separation of model-selection from final evaluation.",
    simple: "If you keep adjusting until the test score is highest, you've secretly trained on the test. Keep one set locked away and look at it only once, at the finish.",
    widget: W("Tuning on test overfits the test", "Watch the gap between the tuned test score and true future performance grow with tuning rounds.",
      "tuning rounds on test →", ["0", "10", "50", "200"],
      "true future accuracy", [80, 79, 76, 72], "Tuning rounds",
      [{ max: 0, text: "Before tuning on it, the test set gives an honest estimate.", tone: "info" },
       { max: 3, text: "🤯 The more you optimise against the test set, the more its score lies.", tone: "wow" }],
      { name: "Validation vs test discipline", formula: "tune on validation / inner CV; touch test once", text: "Reusing the test set for tuning inflates its score; reserve it for a single final check." },
      { series: [{ name: "reported test peak", ys: [80, 83, 86, 89] }] })
  });

  q("scen3", {
    q: "Two features in your model are almost perfectly correlated. A permutation-importance report says BOTH are unimportant. Why might that be misleading?",
    choices: [
      "With a correlated twin present, shuffling one barely hurts because the other still carries the signal — importance is split/masked, not absent",
      "Permutation importance is always exactly correct, so both truly are useless",
      "Correlated features can never affect a model's predictions",
      "The model must be broken and should be retrained from scratch",
      "It proves you should always keep both correlated features"
    ],
    explain: "Permutation importance measures the accuracy drop when a feature is shuffled. If two features are near-duplicates, scrambling one leaves the model leaning on the other, so neither shows a big drop — their shared importance is masked, not zero. The tell: drop one and the other's importance jumps. Correlated predictors routinely fool single-feature importance measures; interpret them with the correlation structure in mind.",
    simple: "If two features are near-copies, hiding one changes little because its twin covers for it — so both look unimportant even when the signal is real. Importance got split between them.",
    widget: W("Correlated twins mask importance", "Watch a feature's measured importance jump once its correlated twin is removed.",
      "feature set →", ["both twins in", "one twin dropped"],
      "measured importance of remaining twin", [12, 71], "Feature set",
      [{ max: 0, text: "With both present, shuffling one barely dents accuracy — importance looks tiny.", tone: "warn" },
       { max: 1, text: "🤯 Remove the twin and the true importance reappears.", tone: "wow" }],
      { name: "Importance under correlation", formula: "correlated features → shared/masked permutation importance", text: "Correlated predictors split and mask each other's importance; read it against the correlation structure." })
  });

  q("scen3", {
    q: "Impurity-based feature importances from a random forest rank a high-cardinality ID-like column at the very top. Should you trust it?",
    choices: [
      "Be sceptical — impurity importance is biased toward high-cardinality features; check with permutation importance on held-out data",
      "Yes, absolutely — impurity importance is unbiased and definitive",
      "Yes, high-cardinality columns are always the most predictive",
      "No, and you should therefore delete every categorical feature",
      "It means the forest is broken and must be discarded"
    ],
    explain: "Mean-decrease-in-impurity importance is inflated for features with many distinct values: they offer more split points and can reduce impurity on the training set by chance, even carrying little real signal. A near-unique ID column is the classic false top-ranker. Cross-check with permutation importance measured on held-out data, which is far less prone to this bias, before trusting the ranking.",
    simple: "A column with tons of unique values gives the trees endless ways to carve up the training data, so it looks important even when it isn't. Verify with permutation importance on unseen data.",
    widget: W("Impurity importance favours many-valued features", "Compare how a random ID column ranks under impurity vs permutation importance.",
      "importance method →", ["impurity (train)", "permutation (held-out)"],
      "rank score given to a random ID column", [88, 8], "Method",
      [{ max: 0, text: "Impurity importance over-credits the high-cardinality ID column.", tone: "warn" },
       { max: 1, text: "🤯 Permutation importance on held-out data exposes it as near-useless.", tone: "wow" }],
      { name: "Impurity-importance bias", formula: "high-cardinality → inflated impurity importance; verify by permutation", text: "Don't trust impurity importance for many-valued features; confirm with held-out permutation importance." })
  });

  q("scen3", {
    q: "Your churn model was trained on last year's data and accuracy has quietly decayed in production over six months. What is the most likely cause?",
    choices: [
      "Data / concept drift — the input distribution or its relationship to churn has shifted, so the model needs monitoring and retraining",
      "The model spontaneously forgot its parameters",
      "Test accuracy is simply always wrong after deployment",
      "The training set was too balanced",
      "Nothing is wrong; models naturally get better over time"
    ],
    explain: "A model is a snapshot of the world when it was trained. When customer behaviour, pricing, or the market shifts, the input distribution (data drift) or the input-to-target relationship (concept drift) changes, and a static model degrades. The remedy is monitoring live performance and input statistics, with periodic retraining on fresh data. Nothing about the model 'broke' — the world moved.",
    simple: "The world keeps changing after you train; last year's patterns slowly stop matching this year's customers. That silent decay is drift, and the fix is watch-and-retrain.",
    widget: W("Models decay as the world drifts", "Watch a static model's accuracy slide as the data distribution shifts over time.",
      "months since training →", ["0", "2", "4", "6"],
      "live accuracy", [86, 82, 76, 70], "Time",
      [{ max: 0, text: "At launch the model matches the world it was trained on.", tone: "info" },
       { max: 3, text: "🤯 Six months on, drift has eroded accuracy — monitor and retrain.", tone: "wow" }],
      { name: "Data / concept drift", formula: "world changes → monitor inputs & performance → retrain", text: "Deployed models decay as distributions drift; plan monitoring and periodic retraining." })
  });

  q("scen3", {
    q: "Patients from the same hospital appear in both your train and test sets (multiple rows each). Your CV score is excellent but generalises poorly to new hospitals. What's the fix?",
    choices: [
      "Group-aware splitting (e.g. GroupKFold by hospital) so no group appears in both train and test",
      "Ordinary random k-fold, which already handles this correctly",
      "Add more rows per hospital to raise the score",
      "Shuffle harder before splitting",
      "Report training accuracy instead of CV accuracy"
    ],
    explain: "When rows cluster into groups (patients, hospitals, users) and the same group straddles train and test, the model can exploit group-specific quirks that won't transfer — an optimistic score that collapses on genuinely new groups. GroupKFold (or GroupShuffleSplit) keeps every group entirely on one side of the split, so evaluation reflects performance on unseen groups. Plain random k-fold leaks group identity.",
    simple: "If the same hospital is in both piles, the model memorises that hospital's habits and looks great — until a new hospital arrives. Split by group so the test hospitals are truly new.",
    widget: W("Split by group to avoid group leakage", "Compare random k-fold with group-aware splitting on new-hospital performance.",
      "split method →", ["random k-fold", "GroupKFold by hospital"],
      "accuracy on unseen hospitals", [64, 82], "Split method",
      [{ max: 0, text: "Random folds let the same hospital sit in train and test — optimistic.", tone: "warn" },
       { max: 1, text: "🤯 Grouping by hospital gives an honest new-hospital estimate.", tone: "wow" }],
      { name: "Grouped cross-validation", formula: "clustered rows → GroupKFold so no group spans the split", text: "When rows share a group, split by group so evaluation reflects unseen groups." })
  });

  q("scen3", {
    q: "You're comparing many models and pick the one with the single best cross-validation score. Why might that model disappoint on new data?",
    choices: [
      "Selecting the max over many noisy scores biases you toward a lucky winner — consider the one-standard-error rule and nested CV",
      "Cross-validation scores contain no noise, so the winner is guaranteed best",
      "More models compared always means a more reliable winner",
      "You should instead pick the model with the worst CV score",
      "The winner disappoints only if it is a linear model"
    ],
    explain: "Each CV score is an estimate with noise. Take the maximum across many models and you preferentially select whichever got a lucky-high estimate — 'winner's curse' — so the champion's true performance is usually a touch below its CV peak. Guards: the one-standard-error rule (prefer the simplest model within 1 SE of the best) and nested CV to get an unbiased estimate of the selection procedure itself.",
    simple: "Pick the top score out of dozens and you've partly picked luck. The flashiest CV winner tends to regress a little on fresh data; favour the simplest model that's statistically tied for best.",
    widget: W("The winner's curse in model selection", "As you compare more models, watch the best CV score drift above true performance.",
      "models compared →", ["2", "10", "50", "200"],
      "true accuracy of the CV winner", [83, 82, 80, 78], "Models compared",
      [{ max: 0, text: "With few candidates, the CV winner is roughly honest.", tone: "info" },
       { max: 3, text: "🤯 Comparing hundreds, the top score is inflated by luck — reality follows.", tone: "wow" }],
      { name: "Winner's curse / 1-SE rule", formula: "max over noisy scores → optimistic; use 1-SE rule + nested CV", text: "Selecting the single best of many noisy scores over-rewards luck; prefer the simplest near-best model." },
      { series: [{ name: "winning CV score", ys: [84, 86, 88, 90] }] })
  });

  q("scen3", {
    q: "You calibrated your classifier's probabilities and ROC-AUC stayed identical, but accuracy at the 0.5 cutoff changed. Is that a contradiction?",
    choices: [
      "No — monotonic calibration preserves ranking (so AUC is unchanged) but moves the scores, so the 0.5-threshold decisions can change",
      "Yes, AUC and accuracy must always move together",
      "Yes, calibration is broken if accuracy moves at all",
      "No, because calibration always raises accuracy",
      "Yes, because calibration reorders the predictions"
    ],
    explain: "Calibration (e.g. Platt/isotonic) is a monotonic remap of scores: it preserves the ordering of predictions, so ROC-AUC — a pure ranking metric — is unchanged. But it shifts the actual probability values, so the score that lands at the 0.5 cutoff moves, and threshold-dependent metrics like accuracy can change. No contradiction: ranking and thresholded decisions are different things.",
    simple: "Calibrating reshapes the probability numbers without reshuffling their order. Order-based scores (AUC) stay put; anything that depends on a fixed 0.5 line can shift.",
    widget: W("Calibration keeps order, moves the cutoff", "Compare a classifier before and after calibration on AUC vs 0.5-threshold accuracy.",
      "state →", ["uncalibrated", "calibrated"],
      "ROC-AUC ×100 (ranking)", [86, 86], "State",
      [{ max: 0, text: "AUC depends only on ranking, which calibration preserves.", tone: "info" },
       { max: 1, text: "🤯 AUC is unchanged, yet the 0.5-threshold accuracy shifts as scores move.", tone: "wow" }],
      { name: "Calibration vs ranking", formula: "monotonic calibration → AUC fixed, thresholded accuracy can move", text: "Calibration preserves ranking (AUC) but changes probability values, so threshold metrics can shift." },
      { series: [{ name: "accuracy at 0.5", ys: [79, 83] }] })
  });

  q("scen3", {
    q: "A model trained on historical hiring decisions strongly favours one demographic. What is the most accurate diagnosis?",
    choices: [
      "The model learned bias present in the historical labels — accurate to the data, but the data itself encodes an unfair pattern",
      "The algorithm invented a brand-new bias unrelated to the data",
      "High accuracy proves the model must be fair",
      "Bias is impossible in supervised learning",
      "The only issue is that the training set was too small"
    ],
    explain: "Supervised models reproduce the patterns in their labels. If past hiring was skewed, the 'ground truth' itself is biased, and a faithful model will replicate — even amplify — that skew while scoring well on held-out historical data. High accuracy measures agreement with a biased past, not fairness. Remedies involve auditing labels and features, fairness constraints or reweighting, and human oversight — not just more data.",
    simple: "The model didn't dream up prejudice; it faithfully copied the bias baked into past decisions. Matching an unfair history accurately is still unfair.",
    widget: W("Models inherit label bias", "As the model fits biased historical labels better, watch its unfairness track the data's.",
      "fit to historical labels →", ["underfit", "moderate", "good", "tight"],
      "demographic skew reproduced", [30, 55, 78, 92], "Fit",
      [{ max: 0, text: "A weak model only partly copies the historical skew.", tone: "info" },
       { max: 3, text: "🤯 The better it fits biased labels, the more faithfully it reproduces the bias.", tone: "wow" }],
      { name: "Bias in the labels", formula: "biased training labels → faithful model reproduces bias", text: "A model mirrors its labels; biased history yields biased predictions despite high accuracy." })
  });

  q("scen3", {
    q: "Adding an interaction feature helped your linear model a lot on training but hurt cross-validation. What's the disciplined interpretation?",
    choices: [
      "The extra feature raised variance and overfit — trust the CV signal and drop or regularise it",
      "Training improvement always means you should keep the feature",
      "CV must be wrong because training accuracy went up",
      "You should add many more interaction terms to fix it",
      "Interaction features can never help any model"
    ],
    explain: "Training score almost always rises when you add features — the model has more freedom to fit noise. The honest verdict comes from held-out validation: if CV dropped, the new feature added variance without generalisable signal, so drop it or shrink it with regularisation. Letting training gains override CV is exactly how overfitting sneaks in during feature engineering.",
    simple: "More features can only help the model hug the training data tighter — that's not the same as learning. When validation disagrees with training, believe validation.",
    widget: W("Trust validation over training gains", "Add interaction terms and watch training keep rising while CV turns down.",
      "interaction terms added →", ["0", "2", "5", "10"],
      "cross-validation accuracy", [82, 84, 81, 77], "Terms added",
      [{ max: 1, text: "A couple of real interactions can genuinely help CV.", tone: "info" },
       { max: 3, text: "🤯 Past the sweet spot, training keeps climbing but CV falls — overfitting.", tone: "wow" }],
      { name: "Feature-count vs generalisation", formula: "training always improves with features; judge on CV", text: "Adding features inflates training score; keep only those that also improve validation." },
      { series: [{ name: "training accuracy", ys: [82, 87, 92, 96] }] })
  });

  q("scen3", {
    q: "You benchmark a fancy deep model at 91% accuracy but never checked the naive baseline. Why is that a problem?",
    choices: [
      "Without a baseline (e.g. majority-class or a simple model) you can't tell whether 91% is impressive or trivial for this problem",
      "Baselines are a waste of time once you have a deep model",
      "91% is always excellent regardless of the problem",
      "The baseline would only matter if the data were balanced",
      "Deep models never need comparison because they are state of the art"
    ],
    explain: "A score means nothing without a reference point. If 89% of cases are the majority class, 91% barely beats always-guessing; if a plain logistic regression already hits 90%, the deep model's extra cost buys almost nothing. Always establish a naive baseline (majority-class, simple linear model) first — it tells you how hard the problem is and whether your complex model actually earns its keep.",
    simple: "91% sounds great until you learn a coin-weighted guess scores 89%. Always measure the dumb baseline first, so you know whether your clever model is actually adding anything.",
    widget: W("A score needs a baseline", "Compare the deep model against the naive baselines you should have checked first.",
      "reference point →", ["majority class", "logistic reg.", "random forest", "deep model"],
      "accuracy", [89, 90, 90, 91], "Reference",
      [{ max: 0, text: "The majority-class baseline already scores 89% here.", tone: "warn" },
       { max: 3, text: "🤯 The deep model's 91% is barely above a trivial baseline — is it worth the cost?", tone: "wow" }],
      { name: "Always establish a baseline", formula: "compare against majority-class & simple models first", text: "Interpret any accuracy against naive baselines; they reveal whether complexity is justified." })
  });

  q("scen3", {
    q: "You report a single accuracy number from one train/test split as your model's definitive performance. What's the weakness?",
    choices: [
      "One split is a single noisy draw — cross-validation gives a mean and spread, a far more reliable estimate",
      "One split is always sufficient and cross-validation adds nothing",
      "The weakness is only that accuracy should be a percentage",
      "You should instead report the training accuracy from that split",
      "A single split overestimates only for regression problems"
    ],
    explain: "A lone train/test split hands you one sample from a distribution of possible scores; depending on which rows landed in the test set, that number can swing several points. Cross-validation averages over multiple splits, yielding both a mean and a standard deviation — you learn the expected performance and how stable it is. Reporting one split's number without its uncertainty overstates how precisely you know the model's quality.",
    simple: "Judging a model on one split is like rating a film from a single frame. Cross-validation watches several splits and reports the average and how much it wobbles.",
    widget: W("One split is one noisy draw", "Watch the spread of accuracy estimates shrink as you average over more folds.",
      "evaluation →", ["1 split", "3-fold", "5-fold", "10-fold"],
      "reliability of the estimate (norm.)", [70, 84, 90, 94], "Folds",
      [{ max: 0, text: "A single split's number can swing several points by luck of the draw.", tone: "warn" },
       { max: 3, text: "🤯 Averaging folds gives a stable mean and a spread you can quote.", tone: "wow" }],
      { name: "Cross-validation over single split", formula: "one split → high variance; k-fold → mean ± spread", text: "Prefer cross-validation to a single split; it estimates both expected performance and its stability." })
  });

})();
