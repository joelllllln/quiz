/* Applied Scenarios — Model Evaluation, Performance Optimisation, Advanced Scikit-learn. choices[0] always correct (shuffled at render). */
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
    q: "A cancer screening model flags patients for a follow-up biopsy. Missing a real cancer (false negative) is far worse than an unnecessary biopsy (false positive). Which single metric should you optimise first?",
    choices: [
      "Recall (sensitivity) — it measures the fraction of true cancers the model actually catches",
      "Precision — of all the patients the model flags for a biopsy, how many of them truly have cancer",
      "Overall accuracy computed across every patient in the whole screening population at once",
      "Specificity — the fraction of the genuinely healthy patients that the model correctly clears",
      "The false-positive rate, minimised and driven down as far as it can possibly go on validation"
    ],
    explain: "When a false negative (a missed cancer) is the costly error, you want to maximise recall = TP / (TP + FN), which directly penalises missed positives. Precision cares about false alarms, which are the cheaper error here. Accuracy is dominated by the healthy majority and ignores the asymmetry, and minimising the false-positive rate pushes exactly the wrong way — it would let the model flag fewer people and miss more cancers.",
    simple: "If missing a real case is the disaster, grade the model on how many real cases it catches. That is recall.",
    widget: W("Recall rises as the threshold drops", "Lower the flag threshold and watch how many true cancers get caught.",
      "flag threshold (high → low) →", ["0.9", "0.7", "0.5", "0.3", "0.1"],
      "recall (cancers caught)", [40, 62, 78, 90, 97], "Threshold",
      [{ max: 1, text: "A cautious high threshold flags few people and misses many cancers.", tone: "info" },
       { max: 3, text: "Lowering the threshold catches more true positives — recall climbs.", tone: "info" },
       { max: 4, text: "🤯 To catch nearly every cancer you accept more false alarms — recall and precision pull apart.", tone: "wow" }],
      { name: "Cost-driven metric choice", formula: "costly false negatives → maximise recall", text: "When a miss is the expensive mistake, optimise recall." })
  });

  q("scen1", {
    q: "A spam filter sends flagged mail straight to a hidden folder users rarely check. Deleting a real, important email (false positive) is much worse than letting a spam through (false negative). Which metric should lead?",
    choices: [
      "Precision — of the messages marked spam, how many truly are spam",
      "Recall — the fraction of all the truly spam messages that the filter manages to catch",
      "Overall classification accuracy computed across the whole inbox at once",
      "The true-positive rate, maximised without any limit at all",
      "The F1 score with recall weighted more heavily than precision"
    ],
    explain: "Here the costly error is a false positive: a genuine email wrongly binned. Precision = TP / (TP + FP) directly penalises false alarms, so optimising it protects real mail. Recall and the true-positive rate reward catching spam even at the cost of deleting good mail, which is exactly the risk you want to avoid. Accuracy hides the asymmetry, and weighting recall higher in F1 moves in the wrong direction for this cost structure.",
    simple: "If wrongly binning a real email is the disaster, grade the filter on how trustworthy its 'spam' label is. That is precision.",
    widget: W("Precision guards against false alarms", "Raise the spam threshold and watch how clean the 'spam' verdicts become.",
      "spam threshold (low → high) →", ["0.3", "0.5", "0.7", "0.9"],
      "precision of spam flags", [70, 82, 92, 98], "Threshold",
      [{ max: 1, text: "A loose threshold flags aggressively and bins some real mail.", tone: "info" },
       { max: 2, text: "Raising the threshold makes each 'spam' verdict more trustworthy.", tone: "info" },
       { max: 3, text: "🤯 At a strict threshold almost every flag is real spam — but more spam slips through.", tone: "wow" }],
      { name: "Cost-driven metric choice", formula: "costly false positives → maximise precision", text: "When a false alarm is the expensive mistake, optimise precision." })
  });

  q("scen1", {
    q: "Your model gets 99% accuracy on a dataset with 99% negatives and 1% positives. To get one trustworthy number that stays honest under this extreme imbalance and rewards balance across all four confusion-matrix cells, which metric fits best?",
    choices: [
      "Matthews correlation coefficient (MCC) — it uses TP, TN, FP and FN together and stays near 0 for a trivial classifier",
      "Accuracy, since the model already reports a very impressive 99% on this dataset as it stands",
      "Recall alone, which on its own fully and completely summarises the model's rare-class performance",
      "Precision alone, which is entirely sufficient as a single summary number on heavily imbalanced data",
      "The ROC-AUC, which is completely unaffected by the class imbalance and by the chosen decision threshold no matter how skewed the classes are"
    ],
    explain: "MCC is a correlation between predictions and truth built from all four confusion-matrix cells; a majority-only classifier scores about 0, so it cannot be fooled by imbalance the way accuracy is. Recall or precision alone each capture only one column of the matrix. ROC-AUC is threshold-free but on severe imbalance it can look optimistic because the huge true-negative count inflates the false-positive-rate axis — PR-AUC or MCC give a more honest single number.",
    simple: "MCC is like a report card that checks all four boxes of right-and-wrong at once, so a lazy 'always say no' model still scores near zero.",
    widget: W("MCC exposes the trivial classifier", "Watch accuracy and MCC diverge for an 'always predict negative' model as positives get rarer.",
      "positive rate →", ["20%", "10%", "5%", "1%"],
      "accuracy of do-nothing model", [80, 90, 95, 99], "Imbalance",
      [{ max: 1, text: "As positives vanish, an always-negative model's accuracy climbs toward 100%.", tone: "info" },
       { max: 2, text: "Yet it catches zero positives, so its MCC stays flat at 0 the whole way.", tone: "info" },
       { max: 3, text: "🤯 99% accuracy with MCC = 0 — the metric refuses to be fooled.", tone: "wow" }],
      { name: "Balanced single-number metric", formula: "MCC uses all of TP, TN, FP, FN → honest under imbalance", text: "MCC stays near 0 for a trivial classifier no matter how skewed the classes." },
      { series: [{ name: "MCC of do-nothing model", ys: [0, 0, 0, 0] }] })
  });

  q("scen1", {
    q: "You must fit a preprocessing step (a StandardScaler) and a classifier, and you want the scaler fitted only on training rows inside each cross-validation fold so no test information leaks. What is the right scikit-learn tool?",
    choices: [
      "Wrap the scaler and classifier in a Pipeline and pass that Pipeline to cross_val_score",
      "Fit the StandardScaler on the whole dataset once, then cross-validate only the classifier",
      "Scale the data manually before the split and cross-validate the classifier alone",
      "Use cross_val_score on the classifier and standardise inside each fold by hand afterwards",
      "Skip scaling entirely, since cross-validation already prevents leakage"
    ],
    explain: "A Pipeline chains the scaler and the estimator so that when cross_val_score creates each fold, the scaler's fit runs on that fold's training rows only, and the validation rows are merely transformed. Fitting the scaler on the whole dataset first lets the mean and variance of the held-out rows bleed into training — classic preprocessing leakage that inflates the score. The Pipeline makes leakage-free preprocessing automatic and reproducible.",
    simple: "Bundle the prep and the model into one Pipeline so every fold prepares its data using only its own training rows — no peeking at the test part.",
    widget: W("Leakage inflates cross-validation scores", "Compare reported CV accuracy when scaling is fitted before vs inside the split.",
      "scaling strategy →", ["fit on all data", "fit inside Pipeline"],
      "reported CV accuracy", [91, 84], "Strategy",
      [{ max: 0, text: "Fitting the scaler on all data leaks test statistics — the score looks great.", tone: "info" },
       { max: 1, text: "🤯 The honest Pipeline score is lower but real; the inflated one collapses in production.", tone: "wow" }],
      { name: "Pipeline prevents leakage", formula: "fit preprocessing inside each fold, never before the split", text: "A Pipeline fits every transform on training rows only, keeping CV scores honest." })
  });

  q("scen1", {
    q: "Your learning curve shows training accuracy at 99% but validation accuracy stuck at 74%, with a wide, non-closing gap as you add data. What does this diagnose and what should you do?",
    choices: [
      "High variance (overfitting) — add regularisation, reduce model complexity, or gather more data",
      "High bias (underfitting) — the right move here is to make the model substantially more complex right away",
      "The model is actually well fitted here; a gap of this size is completely normal and needs no action at all",
      "A data-loading bug of some kind, since training accuracy should never be able to exceed validation accuracy",
      "Label noise present in the training set, which no amount of added regularisation could ever hope to help with"
    ],
    explain: "A large gap between high training accuracy and lower validation accuracy is the signature of high variance: the model memorises training data but generalises poorly. The cures are to constrain the model (stronger regularisation, fewer features, shallower trees) or to feed it more data so it cannot memorise. High bias looks different — both curves would be low and close together — so adding complexity would make overfitting worse, not better.",
    simple: "The model aces its practice tests but flunks the real exam. It memorised instead of learning — simplify it or give it more examples.",
    widget: W("The overfitting gap", "Watch the training and validation curves as the model grows more complex.",
      "model complexity →", ["low", "medium", "high", "very high"],
      "training accuracy", [76, 88, 95, 99], "Complexity",
      [{ max: 1, text: "At low complexity training and validation rise together — bias-limited.", tone: "info" },
       { max: 2, text: "Past the sweet spot training keeps climbing while validation stalls.", tone: "info" },
       { max: 3, text: "🤯 A wide, growing gap is variance — the fix is less model, not more.", tone: "wow" }],
      { name: "Bias-variance diagnosis", formula: "big train-val gap → high variance → regularise or add data", text: "A large, persistent train-validation gap means overfitting: constrain the model." },
      { series: [{ name: "validation accuracy", ys: [73, 78, 76, 74] }] })
  });

  q("scen1", {
    q: "You want to search 4 hyperparameters over a wide range with a limited compute budget, and you care more about finding a good region fast than exhaustively testing every combination. Which scikit-learn search should you use?",
    choices: [
      "RandomizedSearchCV — it samples a fixed number of configurations, covering wide ranges efficiently",
      "GridSearchCV over every possible combination, since exhaustively checking them all guarantees you find the exact optimum",
      "A single fixed train/test split that you tune by hand until the validation score finally stops improving any further",
      "GridSearchCV configured with only one value per parameter, chosen mainly in order to save on compute time",
      "Fitting the model just once with its default hyperparameters and then skipping the search step entirely"
    ],
    explain: "RandomizedSearchCV draws n_iter random configurations from the parameter distributions, so its cost is fixed regardless of how many parameters or how wide the ranges are. With several parameters, a full grid explodes combinatorially, and much of that budget is wasted on unimportant dimensions. Random search reaches good regions with far fewer fits, which is why it is the standard choice under a tight budget for high-dimensional searches.",
    simple: "Instead of testing every point on a huge grid, throw a fixed number of darts across the whole board — you find a good area much faster.",
    widget: W("Random search scales with budget, not grid size", "Compare fits needed as the number of tuned parameters grows.",
      "parameters tuned →", ["1", "2", "3", "4"],
      "grid-search fits (5 values each)", [5, 25, 62, 100], "Parameters",
      [{ max: 1, text: "With few parameters a full grid is cheap and thorough.", tone: "info" },
       { max: 2, text: "Each extra parameter multiplies the grid — cost explodes combinatorially.", tone: "info" },
       { max: 3, text: "🤯 Random search fits a fixed number regardless, so it stays affordable as dimensions grow.", tone: "wow" }],
      { name: "Grid vs random search", formula: "many params + tight budget → RandomizedSearchCV", text: "Random search covers wide, high-dimensional spaces at fixed cost." },
      { series: [{ name: "random-search fits (fixed n_iter)", ys: [30, 30, 30, 30] }] })
  });

  /* ===================== scen2 — Weighing Trade-offs (6) ===================== */

  q("scen2", {
    q: "A loan-default model outputs probabilities. Approving a defaulter costs the bank about 5x more than rejecting a good applicant. The default 0.5 threshold approves too many defaulters. What is the principled move?",
    choices: [
      "Tune the decision threshold using the 5:1 cost ratio, choosing the operating point that minimises expected cost on validation data",
      "Keep the threshold at 0.5, because 0.5 is the single mathematically optimal decision threshold for any classifier no matter the costs",
      "Retrain the model with a much more complex architecture until the default 0.5 threshold finally starts behaving the way you want it to",
      "Lower the decision threshold steadily toward 0 so that almost every single applicant who applies ends up being approved for a loan",
      "Optimise the model purely for maximum overall accuracy, which will end up handling the asymmetric costs automatically on its own"
    ],
    explain: "The 0.5 threshold is optimal only when the two error costs are equal. Here a false approval costs 5x a false rejection, so you should raise the threshold (demand higher predicted safety before approving) and pick the operating point that minimises expected cost = 5*FN_cost + FP_cost on validation data. Accuracy ignores the asymmetry, and a fancier model does not change the fact that the wrong threshold is the real problem.",
    simple: "The model gives a probability; you choose where to draw the line. When one mistake costs 5x the other, move the line to avoid the expensive mistake.",
    widget: W("Threshold sets the cost trade-off", "Slide the approval threshold and watch expected cost per applicant.",
      "approval threshold →", ["0.3", "0.5", "0.7", "0.85"],
      "expected cost (rel.)", [88, 62, 40, 55], "Threshold",
      [{ max: 1, text: "A low threshold approves freely — cheap rejections, but costly defaults slip through.", tone: "info" },
       { max: 2, text: "Raising it screens out defaulters; expected cost falls toward a minimum.", tone: "info" },
       { max: 3, text: "🤯 Too strict and you reject too many good customers — cost rises again. There is a sweet spot.", tone: "wow" }],
      { name: "Cost-sensitive thresholding", formula: "optimal threshold shifts with the FP:FN cost ratio", text: "Pick the threshold that minimises expected cost, not the default 0.5." })
  });

  q("scen2", {
    q: "Two classifiers: model A has ROC-AUC 0.92, model B has ROC-AUC 0.90. But your positive class is only 3% of data and you care about performance among the positive predictions. Which comparison should decide the winner?",
    choices: [
      "Compare their precision-recall AUC (PR-AUC), which focuses on the rare positive class and is more informative under heavy imbalance",
      "Pick model A purely on the strength of its higher ROC-AUC, since ROC-AUC is universally regarded as the gold-standard metric for comparing any two classifiers at all",
      "Compare the two models on their overall classification accuracy measured at the default 0.5 decision threshold instead",
      "Choose whichever of the two models happens to have the higher specificity on the held-out validation data",
      "Average each model's ROC-AUC and PR-AUC together into a single combined score and then simply pick the larger one"
    ],
    explain: "ROC-AUC uses the false-positive rate, whose denominator is the huge negative class, so on 3% positives a large absolute number of false positives barely moves it — ROC-AUC can look strong while precision is poor. PR-AUC plots precision against recall, both anchored on the rare positives, so it reveals the practical trade-off you actually care about. A tiny ROC-AUC edge can reverse under PR-AUC, so compare there.",
    simple: "On rare-event problems, ROC-AUC is graded on a curve that the giant 'negative' pile flatters. The precision-recall curve grades on the rare class you actually care about.",
    widget: W("PR-AUC separates models ROC-AUC ties", "Watch how ROC-AUC and PR-AUC diverge as positives get rarer.",
      "positive rate →", ["30%", "15%", "8%", "3%"],
      "ROC-AUC (looks stable)", [90, 91, 91, 92], "Imbalance",
      [{ max: 1, text: "On balanced-ish data both metrics broadly agree.", tone: "info" },
       { max: 2, text: "As positives shrink, ROC-AUC barely notices the growing false positives.", tone: "info" },
       { max: 3, text: "🤯 PR-AUC drops sharply, exposing weak precision that ROC-AUC hid.", tone: "wow" }],
      { name: "ROC-AUC vs PR-AUC", formula: "heavy imbalance + care about positives → trust PR-AUC", text: "PR-AUC is the more honest ranking metric when positives are rare." },
      { series: [{ name: "PR-AUC (imbalance-sensitive)", ys: [78, 62, 48, 34] }] })
  });

  q("scen2", {
    q: "Downstream software will treat your classifier's output as a real probability of default (e.g. to price interest rates). A boosted-tree model ranks well (high AUC) but its predicted probabilities are pushed toward 0 and 1. What should you do?",
    choices: [
      "Calibrate the model (e.g. Platt scaling or isotonic via CalibratedClassifierCV) so predicted probabilities match observed frequencies",
      "Do nothing at all, because a high AUC on its own already guarantees that the model's predicted probabilities are perfectly trustworthy",
      "Round every predicted probability all the way to either 0 or 1 in order to make the model's raw outputs look cleaner and more decisive",
      "Switch your evaluation metric over to plain accuracy and simply ignore the predicted probabilities that the model produces altogether",
      "Lower the model's decision threshold so that far fewer of the extreme probabilities near 0 and 1 actually end up appearing at all"
    ],
    explain: "AUC measures ranking, not whether a predicted 0.8 really corresponds to an 80% event rate — many models, boosted trees especially, produce well-ranked but poorly-calibrated probabilities. If the numbers are used as probabilities, you need calibration: fit a mapping (sigmoid/Platt or isotonic) on held-out data so that among cases predicted at p, roughly a fraction p are positive. A reliability (calibration) curve verifies the fix; AUC alone cannot detect the miscalibration.",
    simple: "The model orders risks correctly but its 'percent chances' are off. Calibration re-labels the confidence numbers so an 80% really means 80%.",
    widget: W("Calibration aligns confidence with reality", "Compare the reliability curve before and after calibration.",
      "predicted probability →", ["0.2", "0.4", "0.6", "0.8"],
      "observed frequency (uncalibrated)", [8, 26, 68, 92], "Bin",
      [{ max: 1, text: "Uncalibrated: low predictions understate and high ones overstate real rates.", tone: "info" },
       { max: 2, text: "A perfectly calibrated model would sit on the diagonal (predicted = observed).", tone: "info" },
       { max: 3, text: "🤯 High AUC and bad calibration coexist — ranking right, probabilities wrong.", tone: "wow" }],
      { name: "Probability calibration", formula: "using outputs as probabilities → calibrate, don't trust AUC", text: "Calibrate when the raw scores must behave like true probabilities." },
      { series: [{ name: "calibrated (near diagonal)", ys: [19, 41, 59, 81] }] })
  });

  q("scen2", {
    q: "Your training set is 90% class A, 10% class B, and the model ignores class B. You are weighing class_weight='balanced' against random oversampling of B. Both aim to help minority recall. What is a fair statement of the trade-off?",
    choices: [
      "class_weight reweights the loss without duplicating rows, while oversampling grows the data and can overfit duplicated minority points — both raise minority recall but can lower precision",
      "class_weight and random oversampling are completely identical in every single effect they have, so the choice between the two is entirely arbitrary and can be made purely on personal preference",
      "Random oversampling always beats class_weight in every single case, simply because adding more rows to the training data is always strictly better",
      "Using class_weight='balanced' mathematically guarantees a strictly higher overall accuracy than doing nothing at all about the class imbalance",
      "Neither of the two techniques has any real effect on the minority class at all; only changing the decision threshold afterwards can actually help"
    ],
    explain: "class_weight='balanced' multiplies each class's loss by a factor inversely proportional to its frequency, so minority errors count more — no rows are added. Random oversampling instead duplicates minority rows, enlarging the dataset and risking overfitting to those exact points. Both increase attention to class B and typically raise its recall, but by trading away precision on B and possibly some overall accuracy. They are related but not identical, and each has distinct risks.",
    simple: "You can either tell the model 'minority mistakes hurt more' (class_weight) or photocopy the minority rows (oversample). Both push it to notice the rare class, with different side effects.",
    widget: W("Reweighting trades precision for recall", "Increase the minority class weight and watch its recall and precision move.",
      "minority class weight →", ["1x", "3x", "6x", "10x"],
      "minority recall", [22, 55, 74, 86], "Weight",
      [{ max: 1, text: "At equal weight the model ignores the 10% minority almost entirely.", tone: "info" },
       { max: 2, text: "Upweighting minority errors lifts its recall steeply.", tone: "info" },
       { max: 3, text: "🤯 But precision on the minority slips as more borderline cases get flagged — a real trade-off.", tone: "wow" }],
      { name: "Class weighting vs resampling", formula: "reweight loss or duplicate rows → recall up, precision down", text: "Both fix minority neglect but trade away precision; class_weight avoids duplication." },
      { series: [{ name: "minority precision", ys: [70, 58, 48, 40] }] })
  });

  q("scen2", {
    q: "A k-nearest-neighbours model is very accurate but must answer 5,000 requests per second with tight latency, and prediction is slow because it scans all training points. You are weighing options. What is the soundest trade-off?",
    choices: [
      "Trade a little accuracy for speed: use an approximate-neighbour index (e.g. KD-tree/Ball-tree or ANN), reduce dimensionality, or distil to a faster model",
      "Keep the exact brute-force kNN exactly as it is and simply pay for the accuracy, since in this system the prediction latency does not really matter even under very heavy request load",
      "Increase the neighbour count k to a very large value, because scanning for a larger set of neighbours actually makes each prediction run faster",
      "Retrain the kNN model far more frequently than you currently do, since more frequent retraining is what actually reduces the per-query latency",
      "Switch the evaluation metric from accuracy over to recall instead, which will make the kNN model run noticeably faster at prediction time"
    ],
    explain: "kNN does almost no training work but pays at prediction time, scanning many points per query — a poor fit for high-throughput, low-latency serving. The realistic levers are structural: spatial indices (KD-tree, Ball-tree) or approximate nearest-neighbour search cut the per-query cost, dimensionality reduction shrinks distance computations, and distilling into a parametric model makes inference O(1)-ish. Each buys latency for a small, measurable accuracy cost. Raising k or retraining does not reduce per-query scan cost, and changing the metric does not change runtime.",
    simple: "kNN is lazy to train but slow to answer because it compares against everyone. To serve fast, give it a smart index or a lighter stand-in model, accepting a touch less accuracy.",
    widget: W("Latency vs accuracy under load", "Compare serving latency across faster approximations of an exact kNN.",
      "method (exact → approximate) →", ["brute-force", "KD-tree", "ANN index", "distilled model"],
      "prediction latency (rel.)", [100, 55, 25, 8], "Method",
      [{ max: 1, text: "Exact brute-force is most accurate but scans every training point per query.", tone: "info" },
       { max: 2, text: "Spatial and approximate indices slash latency for a tiny accuracy give-back.", tone: "info" },
       { max: 3, text: "🤯 A distilled parametric model answers almost instantly — the biggest speed win, largest accuracy risk.", tone: "wow" }],
      { name: "Speed-quality trade-off", formula: "high QPS + slow kNN → index / reduce dims / distil", text: "Buy latency with approximate neighbours or a lighter model, accepting a small accuracy cost." },
      { series: [{ name: "accuracy (rel.)", ys: [100, 99, 97, 93] }] })
  });

  q("scen2", {
    q: "You are tuning L2 regularisation strength for logistic regression on a noisy dataset. Too little regularisation overfits; too much underfits. How should you choose the value, and what does the validation curve tell you?",
    choices: [
      "Sweep the regularisation strength and pick the value where validation score peaks — the balance point between bias and variance",
      "Always pick the very smallest regularisation strength available, since that setting fits the training data the most closely of all",
      "Always pick the very largest regularisation strength available, on the principle that a simpler model is always the safer choice to make",
      "Pick whichever regularisation value ends up maximising the model's accuracy on the very training data it was fitted on",
      "Regularisation strength has no real effect on how well the model generalises, so you can safely pick just about any value at all"
    ],
    explain: "Regularisation trades variance for bias: weak regularisation lets coefficients grow and overfit (high variance), strong regularisation shrinks them and underfits (high bias). A validation curve — score vs regularisation strength — is U-shaped-ish, peaking where the two errors balance; that peak is your choice. Training accuracy always favours the least regularisation, so tuning on it just picks the overfit extreme. The generalisation gap is precisely what regularisation controls.",
    simple: "Regularisation is a strictness dial. Too loose and the model memorises noise; too strict and it ignores real signal. Turn it to where the validation score is highest.",
    widget: W("The regularisation sweet spot", "Sweep regularisation strength and watch validation accuracy rise then fall.",
      "regularisation strength →", ["very weak", "weak", "medium", "strong", "very strong"],
      "validation accuracy", [74, 84, 89, 82, 71], "Strength",
      [{ max: 1, text: "Too weak: coefficients overfit noise, validation lags training.", tone: "info" },
       { max: 2, text: "The middle balances bias and variance — validation peaks here.", tone: "info" },
       { max: 4, text: "🤯 Too strong: the model underfits and validation collapses again. The curve is a hill, not a slope.", tone: "wow" }],
      { name: "Regularisation tuning", formula: "pick strength at the validation-curve peak (bias = variance)", text: "The best regularisation sits at the top of the validation curve, not at either extreme." })
  });

  /* ===================== scen3 — Subtle Traps (6) ===================== */

  q("scen3", {
    q: "You standardise all features and impute missing values on the FULL dataset, then split into train/test and report 95% test accuracy. In production the model does far worse. What is the flaw?",
    choices: [
      "Preprocessing leakage — fitting the scaler and imputer on all data let test statistics influence training, inflating the reported score",
      "The held-out test set you used was simply far too small for its reported 95% accuracy to be considered reliable in any way",
      "The model is fundamentally underfitting the data and just needs considerably more capacity added to it before being deployed",
      "This is just random noise in the particular split, and re-running the whole thing with a different random seed would fix the drop",
      "The input features were correlated with one another, and feature correlation like that always causes a drop once the model is actually deployed live in production"
    ],
    explain: "Fitting the scaler's mean/variance and the imputer's fill values on the entire dataset before splitting means those statistics were computed using the test rows too — the model implicitly saw information about its own test set, so the 95% is optimistic. In production, no such peek exists, hence the drop. The fix is to fit all preprocessing inside a Pipeline on training folds only, so the test/validation rows are transformed but never used for fitting.",
    simple: "You let the model study the answer key while computing averages, then acted surprised it aced the practice test. Fit the prep on training data only.",
    widget: W("Where leakage sneaks in", "Compare test accuracy when preprocessing is fitted before vs after the split.",
      "preprocessing fitted →", ["on full data (leak)", "on train only"],
      "reported test accuracy", [95, 86], "Strategy",
      [{ max: 0, text: "Fitting on full data leaks test statistics — 95% looks fantastic.", tone: "info" },
       { max: 1, text: "🤯 Fit on train only and the honest score is 86% — the gap is the leakage tax paid in production.", tone: "wow" }],
      { name: "Preprocessing leakage", formula: "fit scaler/imputer inside the CV split, never on full data", text: "Fitting preprocessing before the split leaks test info and inflates scores." })
  });

  q("scen3", {
    q: "You used GridSearchCV to pick hyperparameters, then reported the best cross-validation score from that search as your estimate of future performance. Why is this optimistic, and what fixes it?",
    choices: [
      "The CV score was maximised over many configs, so it is biased upward; use nested cross-validation (or a held-out test set) to estimate real performance",
      "Nothing is wrong here at all, because the best cross-validation score from a search is a completely unbiased estimate of future performance on genuinely new and unseen data",
      "The hyperparameter grid you searched over was simply too small, and using a substantially bigger grid would make the reported score unbiased",
      "You should just report the training-set accuracy instead of the CV score, since training accuracy is always a perfectly unbiased estimate",
      "The whole problem is caused by the random seed, and averaging the results across many different random seeds removes all of the optimism"
    ],
    explain: "When you select the configuration that maximises the CV score, that winning score benefits from favourable noise across the many candidates — it is an optimistically biased estimate of generalisation. To report an honest number you need an outer evaluation the search never touched: nested cross-validation (an inner loop tunes, an outer loop evaluates) or a final held-out test set scored once. Enlarging the grid or reporting training accuracy makes the bias worse, not better.",
    simple: "If you try 100 lottery tickets and report your luckiest one, that number flatters you. Test the chosen model on data the search never saw.",
    widget: W("Selection inflates the winning score", "Watch the gap between the best-of-search CV score and the true held-out score grow with grid size.",
      "configurations tried →", ["5", "20", "60", "150"],
      "best-of-search CV score", [86, 88, 90, 92], "Grid size",
      [{ max: 1, text: "With few candidates the winner's score is only mildly optimistic.", tone: "info" },
       { max: 2, text: "The more configs you try, the more the best one rode favourable noise.", tone: "info" },
       { max: 3, text: "🤯 The honest held-out score stays flat — the rising gap is pure selection bias.", tone: "wow" }],
      { name: "Nested CV vs optimism", formula: "report a score from data the search never selected on", text: "Tuning and evaluating on the same CV inflates the score; nest the evaluation." },
      { series: [{ name: "true held-out score", ys: [84, 84, 84, 84] }] })
  });

  q("scen3", {
    q: "Your dataset has 20 nearly-duplicate rows per patient (repeated visits). You do a random 80/20 split, and the same patients appear in both train and test. Test accuracy is 96%. Why might this mislead, and what is the correct split?",
    choices: [
      "Group leakage — rows from one patient span train and test, so the model recognises patients rather than generalising; use GroupKFold split by patient",
      "The split ratio you used is simply wrong, and moving to a 90/10 train-test split instead of 80/20 would completely remove the whole problem of the inflated accuracy here",
      "The 96% test accuracy is simply correct as reported and needs no further scrutiny whatsoever before the model is put into production",
      "The real issue is that the model has too few features, and adding many more of them would honestly bring the inflated score back down",
      "Random splitting of the rows is always a perfectly safe thing to do here, just so long as the shuffling itself is genuinely and truly random"
    ],
    explain: "When multiple rows belong to the same patient and land on both sides of a random split, the model can memorise patient-specific quirks seen in training and reap them at test time — it is effectively tested on people it already saw. That inflates accuracy and will not hold for genuinely new patients. The correct approach keeps all of a patient's rows together on one side, e.g. GroupKFold or GroupShuffleSplit with the patient ID as the group.",
    simple: "If the same person's visits appear in both the study set and the exam, the model passes by recognising them, not by learning medicine. Keep each person wholly in one split.",
    widget: W("Group leakage across the split", "Compare test accuracy under a naive random split vs a patient-grouped split.",
      "split type →", ["random rows (leak)", "grouped by patient"],
      "test accuracy", [96, 81], "Split",
      [{ max: 0, text: "Random splitting scatters a patient's near-duplicate rows across both sides.", tone: "info" },
       { max: 1, text: "🤯 Grouping by patient drops accuracy to 81% — the honest generalisation number.", tone: "wow" }],
      { name: "Grouped cross-validation", formula: "correlated rows share a group → GroupKFold, split by entity", text: "When rows cluster by entity, split by group so no entity leaks across the fold." })
  });

  q("scen3", {
    q: "To handle imbalance you applied SMOTE oversampling to the whole dataset, THEN split into train and test. Cross-validation looks superb but production is disappointing. What went wrong?",
    choices: [
      "Resampling before the split leaked synthetic points derived from test rows into training; oversample inside the Pipeline on the training fold only (e.g. imblearn Pipeline)",
      "SMOTE is simply a fundamentally bad resampling technique and it should really never be used on any imbalanced dataset no matter how severe the imbalance happens to be",
      "The test set itself became far too balanced after the resampling, and an artificially balanced test set like that always lowers the real accuracy",
      "The model badly overfit purely because SMOTE ended up creating far too few brand-new synthetic minority points during the resampling step",
      "The whole problem is the choice of evaluation metric, and simply switching over to plain accuracy instead would immediately reveal the real truth of the matter here"
    ],
    explain: "SMOTE synthesises minority points by interpolating between neighbours. If you run it on the full dataset before splitting, synthetic rows can be built from — or land near — test observations, and near-identical points then appear in both train and test, leaking information and inflating CV. Production sees no such synthetic echoes. The fix is to resample only within each training fold, e.g. by placing SMOTE inside an imblearn Pipeline so it never touches validation/test rows.",
    simple: "SMOTE invents new rows by blending real ones. Do it before splitting and the invented rows can be cousins of your test data — the model has effectively seen the test set.",
    widget: W("Resample-before-split leakage", "Compare CV score when SMOTE runs before vs inside the split.",
      "SMOTE applied →", ["before split (leak)", "inside Pipeline"],
      "reported CV score", [93, 79], "Strategy",
      [{ max: 0, text: "SMOTE on full data plants synthetic cousins of test rows into training.", tone: "info" },
       { max: 1, text: "🤯 Resampling inside the fold gives 79% — lower, but the number production will honour.", tone: "wow" }],
      { name: "Resampling inside the fold", formula: "SMOTE/oversampling belongs inside the training fold only", text: "Resample within each fold via a Pipeline so synthetic points never leak from test data." })
  });

  q("scen3", {
    q: "You want honest out-of-fold predicted probabilities for every training row to plot a calibration curve. You fit the model on all data, then predict on the same data and plot. The curve looks perfectly calibrated. Why is this untrustworthy?",
    choices: [
      "In-sample predictions are optimistic; use cross_val_predict to get out-of-fold predictions where each row is scored by a model that never saw it",
      "The calibration curve is a fundamentally meaningless plot for predicted probabilities and it should never really be plotted for a model at all",
      "Achieving perfect calibration on the training data itself conclusively proves that the model is fully ready to be deployed into production",
      "The histogram bins you used were simply too wide, and switching to much narrower bins would reveal the true miscalibration on training data",
      "You should have plotted a plain accuracy score instead of a calibration curve, since a plain accuracy score would have told you everything that you actually needed to know here"
    ],
    explain: "Scoring rows with a model that was trained on those same rows yields optimistic, in-sample probabilities — the model has partly memorised them, so the reliability curve flatters itself. cross_val_predict returns, for each row, a prediction from a fold in which that row was held out, giving genuine out-of-fold estimates. Plotting the calibration curve on those out-of-fold probabilities reveals the true reliability the model would show on unseen data.",
    simple: "Grading the model on the exact examples it studied makes its confidence look perfect. Score each row using a model that never saw it — that is what cross_val_predict does.",
    widget: W("In-sample calibration is a mirage", "Compare an in-sample reliability curve with the honest out-of-fold one.",
      "predicted probability →", ["0.2", "0.4", "0.6", "0.8"],
      "in-sample observed freq (looks perfect)", [20, 40, 60, 80], "Bin",
      [{ max: 1, text: "In-sample, predictions sit right on the diagonal — suspiciously flawless.", tone: "info" },
       { max: 2, text: "Out-of-fold via cross_val_predict, each row is scored by a model that never saw it.", tone: "info" },
       { max: 3, text: "🤯 The honest curve wanders off the diagonal — real miscalibration the in-sample plot hid.", tone: "wow" }],
      { name: "Out-of-fold prediction", formula: "calibration/eval on training rows → cross_val_predict", text: "Use out-of-fold predictions, not in-sample ones, to judge calibration honestly." },
      { series: [{ name: "out-of-fold observed freq (honest)", ys: [12, 33, 66, 88] }] })
  });

  q("scen3", {
    q: "In a ColumnTransformer you one-hot encode a categorical column, fitting the OneHotEncoder on the full dataset. At serving time a new category appears that was never in training. What is the real risk and the correct setup?",
    choices: [
      "Fitting the encoder on all data leaked category vocabulary and it will error or misbehave on unseen categories; fit inside the Pipeline on training data and set handle_unknown='ignore'",
      "Genuinely new categories are impossible to encounter at all if the data was simply shuffled well enough beforehand, so there is really no risk here",
      "The ColumnTransformer automatically detects and handles any brand-new category that appears at serving time entirely on its own with no configuration",
      "One-hot encoding should just be replaced wholesale with label encoding, which conveniently never fails or errors out at serving time no matter how many brand-new categories happen to appear",
      "The risk here is purely cosmetic in nature, since an unseen category appearing at serving time does not actually affect the model's predictions at all"
    ],
    explain: "Two problems compound here. Fitting the OneHotEncoder on the full dataset (including validation/test rows) leaks the category vocabulary, inflating scores. And a default encoder fitted only on training categories will raise an error when a genuinely new category arrives at serving time. The correct setup fits the ColumnTransformer inside a Pipeline on training data only, and sets handle_unknown='ignore' so unseen categories map to an all-zeros vector instead of crashing.",
    simple: "If the encoder learned its vocabulary from the whole dataset, it both cheated and stayed brittle. Fit it on training data and tell it to shrug at words it has never seen.",
    widget: W("Unseen categories break naive encoding", "Compare serving robustness of a leaky, strict encoder vs a train-fitted, unknown-tolerant one.",
      "encoder setup →", ["fit-on-all + strict", "train-fit + ignore-unknown"],
      "serving requests handled without error", [72, 100], "Setup",
      [{ max: 0, text: "Fit on all data leaks vocabulary and still crashes on brand-new categories.", tone: "info" },
       { max: 1, text: "🤯 Train-fit with handle_unknown='ignore' serves every request and stays leak-free.", tone: "wow" }],
      { name: "Robust ColumnTransformer encoding", formula: "fit encoders on train inside Pipeline; handle_unknown='ignore'", text: "Encode categoricals inside a train-fitted Pipeline that tolerates unseen categories." })
  });

})();
