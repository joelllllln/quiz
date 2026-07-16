/* Study notes — Model Evaluation, Performance Optimisation, Advanced Scikit-learn.
   Read-through revision, tiny chunks, in order. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["metrics"] = {
    key: "metrics", name: "Model Evaluation",
    intro: "How to score a classifier honestly: the four outcome counts, the metric built on each, and how to pick and trust the right number.",
    groups: [
      { h: "The foundation", items: [
        { t: "Four outcomes", d: "Every yes/no prediction is a true positive (caught), false negative (missed), false positive (false alarm) or true negative (correctly ignored).", f: "TP · FN · FP · TN" },
        { t: "Confusion matrix", d: "The 2×2 table of the four outcome counts — TP, FP, FN, TN — arranged by predicted vs actual. It is the complete record of what the model did; every metric below is arithmetic on these cells." },
        { t: "The threshold", d: "A probabilistic model outputs a score; the threshold is the cutoff for calling 'yes'. You set it after training — it is policy, not learned.", f: "predict yes when score ≥ t" },
        { t: "Threshold moves errors", d: "Lower the cutoff and you flag more (recall up, precision usually down); raise it and you flag fewer. One dial trades one error type for the other." }
      ] },
      { h: "Accuracy", items: [
        { t: "What it is", d: "The share of all predictions that are correct — the most intuitive metric.", f: "accuracy = (TP + TN) / all" },
        { t: "The accuracy trap", d: "On imbalanced data it mostly measures the imbalance: if 99% of cases are negative, 'always say no' scores 99% while catching nothing." },
        { t: "Name the baseline", d: "Beat the majority-class rate, not 50%. On 96/4 data a do-nothing model already scores 96%, so 96% accuracy proves nothing on its own." }
      ] },
      { h: "Precision", items: [
        { t: "What it is", d: "Of the cases you flagged, how many were really positive — the trustworthiness of the alarm.", f: "precision = TP / (TP + FP)" },
        { t: "When it matters", d: "Maximise precision when false alarms are expensive: spam filters binning real mail, or costly investigations of every flag." },
        { t: "It can be gamed", d: "Flag only the single most obvious case and precision hits 100% — while ignoring nearly everything. Never read it without recall." }
      ] },
      { h: "Recall (sensitivity)", items: [
        { t: "What it is", d: "Of all the real positive cases, how many you caught — the missed-case metric.", f: "recall = TP / (TP + FN)" },
        { t: "When it matters", d: "Maximise recall when misses are dangerous: cancer screening, fraud detection, safety alerts where letting one slip is the costly error." },
        { t: "Specificity, its mirror", d: "Specificity is recall for the negative class: of truly negative cases, the fraction correctly cleared.", f: "specificity = TN / (TN + FP)" }
      ] },
      { h: "F1 score", items: [
        { t: "What it is", d: "The harmonic mean of precision and recall — one number that stays low unless BOTH are decent.", f: "F1 = 2·P·R / (P + R)" },
        { t: "Why harmonic", d: "The harmonic mean is dragged down by the smaller value, so it punishes lopsided scores the arithmetic mean would hide.", f: "2ab/(a+b) ≤ (a+b)/2" },
        { t: "The trade-off", d: "Precision and recall pull against each other at a fixed threshold; F1 rewards a balance, but only you know if balance is what the task wants." }
      ] },
      { h: "Ranking metrics: ROC-AUC & PR-AUC", items: [
        { t: "The ROC curve", d: "Plots catch-rate against false-alarm-rate at every threshold, tracing the whole family of operating points.", f: "y = TP/(TP+FN), x = FP/(FP+TN)" },
        { t: "ROC-AUC", d: "Area under the ROC curve: the chance a random positive is scored above a random negative. 1.0 perfect, 0.5 coin-flip.", f: "AUC = P(score+ > score−)" },
        { t: "PR-AUC", d: "Area under the precision–recall curve. Preferred under heavy imbalance because it tracks the positive queue, not the vast negative ocean." },
        { t: "PR vs ROC", d: "FPR is flattered by a huge negative pool, so ROC-AUC can look rosy on rare-positive problems where PR-AUC stays honest." }
      ] },
      { h: "Beyond the basics: MCC & calibration", items: [
        { t: "Matthews correlation (MCC)", d: "A single balanced score using all four cells: 0 is chance, +1 perfect, −1 fully inverted. Robust when classes are imbalanced.", f: "MCC = correlation(ŷ, y)" },
        { t: "Calibration", d: "Whether stated confidence matches reality: of cases called '70%', about 70% should turn out positive. Rank skill and calibration are separate." },
        { t: "Proper scoring rules", d: "A metric optimised only by reporting your true probabilities, so it rewards honest confidence and penalises both over- and under-confidence. Log-loss and Brier score are the standard pair.", f: "Brier = (p − y)²" }
      ] },
      { h: "Choosing & trusting the number", items: [
        { t: "Match metric to cost", d: "Pick the operating point that minimises real cost, weighting each error by its domain price.", f: "flag when p > cost_FP / (cost_FP + cost_FN)" },
        { t: "Averaging over classes", d: "Macro-average treats every class equally; micro pools counts (≈ accuracy); weighted follows class frequency. Say which you used." },
        { t: "Cross-validate the score", d: "One test split is luck; rotate the holdout over K folds and average so the estimate does not hinge on a single slice." },
        { t: "Report the uncertainty", d: "A metric is a noisy estimate. Give a confidence interval (e.g. bootstrap the test rows) so small gaps are not mistaken for real ones." }
      ] }
    ]
  };

  window.NOTES["perf"] = {
    key: "perf", name: "Performance Optimisation",
    intro: "Getting the most from a model without fooling yourself: diagnose fit, measure honestly, search hyperparameters, and spend effort where it actually pays.",
    groups: [
      { h: "The core problem", items: [
        { t: "Overfitting", d: "Training score high, unseen score much lower: the model memorised noise specific to the training rows instead of the real pattern." },
        { t: "Underfitting", d: "The model is too simple to capture the pattern, so BOTH training and validation scores are poor." },
        { t: "The sweet spot", d: "Generalisation is the goal: complex enough to learn the signal, not so complex it memorises. Validation score peaks in the middle." },
        { t: "Baseline first", d: "The dumbest sensible rule (predict the majority class). Your model only matters by how far it beats this reference." }
      ] },
      { h: "Measuring honestly", items: [
        { t: "Holdout set", d: "Data hidden from training, used to compare settings fairly. It stands in for the fresh data the model will meet in production." },
        { t: "Cross-validation", d: "Rotate which fold is held out (5 or 10 folds), score each, average. Removes the luck of a single split." },
        { t: "Keep a final test set", d: "Tuning on one validation set slowly overfits it. A third, untouched test set gives the one number no decision ever influenced." },
        { t: "Data leakage", d: "Test or future information sneaking into training — e.g. scaling before splitting. Scores look glorious, then evaporate in production." }
      ] },
      { h: "Hyperparameters & search", items: [
        { t: "Hyperparameter", d: "A setting YOU choose before training (k, depth, C, learning rate), as opposed to the parameters training learns from data." },
        { t: "Grid search", d: "Try every combination on a grid with cross-validation, keep the best. 3 values × 4 values × 5 folds = 60 fits — thorough but pricey." },
        { t: "Random search", d: "Sample combinations at random. Covers wide, high-dimensional spaces surprisingly well because only a few knobs usually matter." },
        { t: "Regularisation", d: "Any technique that penalises model complexity to curb overfitting — bigger k, tree pruning, small C, weight penalties — trading a little training fit for better generalisation. The lever shared across models." }
      ] },
      { h: "Smarter search", items: [
        { t: "Nested CV", d: "Outer folds score the whole tuned procedure; inner folds do the choosing. Fixes the optimistic bias of reporting the winner's own CV score." },
        { t: "Successive halving", d: "Give all configs a small budget, keep the top fraction, give survivors more budget, repeat. Stops wasting time on obvious losers.", f: "top 1/η advance each round" },
        { t: "Bayesian optimisation", d: "Build a surrogate model of params → score and use it to pick the next trial, balancing explore and exploit. Learns as it goes." },
        { t: "Prefer wide optima", d: "Pick a broad plateau of good settings over a sharp isolated spike; the spike is usually noise and breaks on new data." }
      ] },
      { h: "Diagnosing what to fix", items: [
        { t: "Learning curve", d: "Score versus training-set size. If both curves have converged and plateaued, more data won't help — change the model or features instead." },
        { t: "Early stopping", d: "When validation loss bottoms out then creeps up while training loss keeps falling, stop there — that upturn is overfitting starting." },
        { t: "Imbalance levers", d: "For a rare class, reweight the classes (class_weight) or resample before touching the threshold, so the model stops ignoring it." },
        { t: "Score is noisy", d: "A 0.4-point win can flip sign under a new seed. Rerun over seeds and folds; trust a gap only if a paired comparison keeps it away from zero." }
      ] },
      { h: "Where gains really come from", items: [
        { t: "The leverage hierarchy", d: "Data quality beats features, which beat model choice, which beats hyperparameters. Tune last, and time-box it.", f: "data > features > model > hyperparams" },
        { t: "Feature engineering wins", d: "One good domain feature ('days since last login') often beats a month of swapping in fancier models." },
        { t: "Ensembling", d: "Averaging several diverse, decent models can beat every member, because their independent errors partly cancel out." },
        { t: "Mind the latency budget", d: "Accuracy isn't the only spec. A model that misses the SLA (900 ms vs a 100 ms budget) can't ship, however accurate." }
      ] }
    ]
  };

  window.NOTES["sklearn"] = {
    key: "sklearn", name: "Advanced Scikit-learn",
    intro: "The shared grammar behind scikit-learn — estimators, pipelines, tuning and evaluation — plus the production patterns that keep it honest at scale.",
    groups: [
      { h: "The shared grammar", items: [
        { t: "Estimator", d: "Any object that learns from data. One grammar for all: create it, fit it, use it." },
        { t: ".fit(X, y)", d: "The learning step: show features X (and labels y if supervised). Everything learned is stored on the object, typically in name_ attributes." },
        { t: ".predict / .predict_proba", d: "Apply the fitted model to new rows: predict gives hard labels, predict_proba gives class probabilities." },
        { t: "Transformer & .transform", d: "Estimators that reshape data instead of predicting — scalers, encoders, PCA. fit learns the recipe; transform applies it." }
      ] },
      { h: "Reproducibility & splitting", items: [
        { t: "random_state", d: "Seeds the pseudo-random generator so shuffles, splits and initialisations repeat exactly — making comparisons fair and bugs debuggable." },
        { t: "train_test_split", d: "Holds back a test set so you score on data the model never trained on; scoring on training data flatters and hides overfitting." },
        { t: "stratify=y", d: "Keeps each class's proportion identical in train and test — vital for imbalanced data so the rare class isn't skewed by the split." },
        { t: "One-hot encoding", d: "Text categories like 'red/green/blue' have no numeric order; one-hot makes a 0/1 column per value so the model reads them correctly." }
      ] },
      { h: "Pipelines & composition", items: [
        { t: "Pipeline", d: "Chains preprocessing and a final model into ONE estimator, so every step fits only on training data — even inside cross-validation. Stops leakage." },
        { t: "ColumnTransformer", d: "Routes each column group to its own preprocessing: scale the numerics, one-hot the categoricals, in a single fitted object." },
        { t: "Custom transformer contract", d: "Subclass BaseEstimator + TransformerMixin; fit learns state into name_ attributes and returns self, transform applies it. Then it works in a Pipeline." },
        { t: "Search the structure", d: "Steps are parameters too: a grid can swap which scaler to use, or drop PCA via 'passthrough', alongside tuning C.", f: "{'step': [A(), B(), 'passthrough']}" }
      ] },
      { h: "Tuning & scoring", items: [
        { t: "GridSearchCV", d: "Wraps an estimator, tries hyperparameter combos with cross-validation, and refits the best on all the training data." },
        { t: "RandomizedSearchCV", d: "Samples a fixed number of random combos instead of the full grid — reaching good settings in a huge space at a fraction of the fits." },
        { t: "Report CV honestly", d: "cross_val_score returns one number per fold; report the mean AND spread (e.g. 0.83 ± 0.03), never a single cherry-picked fold." },
        { t: "scoring picks the winner", d: "Optimising 'recall' versus 'accuracy' returns different best models — the metric defines what 'best' means, so choose it deliberately." }
      ] },
      { h: "Probabilities & importance", items: [
        { t: "predict_proba vs decision_function", d: "predict_proba gives probability-scale [0,1] scores (not necessarily calibrated); decision_function gives an unbounded signed score. Some estimators offer one, some both." },
        { t: "Calibration", d: "Remaps scores so '90% confident' really comes true 90% of the time. CalibratedClassifierCV wraps any classifier, no retraining of it needed." },
        { t: "Permutation importance", d: "Shuffle one feature's column and measure the score drop — a model-agnostic, held-out measure of what the model actually relies on." },
        { t: "feature_importances_ can mislead", d: "Impurity-based importances inflate high-cardinality features (like an ID hash). Trust permutation importance on validation data instead." }
      ] },
      { h: "Scaling to production", items: [
        { t: "Out-of-core learning", d: "When data won't fit in memory, stream it in chunks and call partial_fit on each. Memory stays constant; some estimators support it." },
        { t: "Persistence is fragile", d: "A joblib/pickle can refuse to load after Python or sklearn upgrades. Pin versions with a manifest, and keep reproducible retraining as the source of truth." },
        { t: "Keep feature names", d: "get_feature_names_out() flows names through Pipeline and ColumnTransformer; set_output(transform='pandas') keeps reports human-readable." },
        { t: "Group-aware CV", d: "When rows share an entity (patients), use GroupKFold in BOTH outer and inner CV and pass groups so no entity leaks across folds." }
      ] }
    ]
  };
})();
