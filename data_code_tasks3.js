/* Coding mode, batch 3: the validation & metrics drills — explicit k-fold, stratified and
   grouped CV, multi-metric cross_validate, ROC-AUC, precision/recall/F1, regression
   metrics, log loss, validation curves, and baselines. Every task carries a `walk`:
   the worked example, line by line in plain English. Loads after data_code_tasks2.js. */
(function () {
  var T = (window.CODETASKS = window.CODETASKS || []);
  T.push(

    { key: 'kfold', group: 'The core workflow', title: 'K-fold, made explicit',
      ask: 'Build a KFold splitter yourself — shuffled, seeded — and hand it to cross_val_score.',
      why: 'cv=5 hides the machinery; building the splitter shows what a fold actually is.',
      walk: [
        ["from sklearn.model_selection import KFold, cross_val_score",
         "Two tools: KFold makes the splits, cross_val_score runs the train/score loop over them."],
        ["kf = KFold(n_splits=5, shuffle=True, random_state=42)",
         "Five folds; shuffle first so any ordering in the file (by date, by class) doesn't bias the folds; seed it so the same folds come back tomorrow."],
        ["scores = cross_val_score(model, X_train, y_train, cv=kf)",
         "Instead of a bare number, cv gets YOUR splitter. Five rounds run: each fold takes one turn as the mini test set."],
        ["print(scores)",
         "Five scores, one per fold. Their spread is as informative as their level — wildly different folds mean an unstable model or tiny data."],
        ["print(scores.mean(), '+/-', scores.std())",
         "Report both: the average is your estimate, the standard deviation is its error bar."]],
      mcq: {
        q: 'Which snippet builds an explicit, reproducible 5-fold splitter and uses it?',
        correct: "kf = KFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X_train, y_train, cv=kf)",
        wrong: [
          "kf = KFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X_train, y_train, folds=kf)",
          "kf = KFold(folds=5, shuffled=True)\nscores = cross_val_score(model, X_train, y_train, cv=kf)",
          "kf = KFold(n_splits=5)\nfor fold in kf:\n    model.fit(fold)\nscores = model.score(X_train, y_train)",
          "scores = KFold(model, X_train, y_train, n_splits=5)"],
        explain: "KFold(n_splits=..., shuffle=..., random_state=...) builds the splitter, and cross_val_score's parameter is cv — not folds. Iterating KFold yields index pairs (not fittable 'folds'), and KFold itself never touches the model." },
      lines: [
        "from sklearn.model_selection import KFold, cross_val_score",
        "kf = KFold(n_splits=5, shuffle=True, random_state=42)",
        "scores = cross_val_score(model, X_train, y_train, cv=kf)",
        "print(scores)",
        "print(scores.mean(), '+/-', scores.std())"],
      decoys: [
        "kf = KFold(folds=5, shuffled=True)",
        "scores = cross_val_score(model, X_train, y_train, folds=kf)"],
      written: {
        prompt: 'Write the code: a shuffled, seeded (42) 5-split KFold, passed as cv to cross_val_score on the training data; print mean and std of the scores.',
        solution: "from sklearn.model_selection import KFold, cross_val_score\nkf = KFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X_train, y_train, cv=kf)\nprint(scores.mean(), '+/-', scores.std())",
        must: ["KFold", "n_splits=5", "shuffle=True", "random_state=42", "cv=kf", "mean"] } },

    { key: 'skfold', group: 'The core workflow', title: 'Stratified k-fold',
      ask: 'Cross-validate an imbalanced classifier with folds that preserve the class ratio.',
      why: 'Plain folds can land with almost no positives; stratified folds keep every fold honest.',
      walk: [
        ["from sklearn.model_selection import StratifiedKFold",
         "The class-aware splitter: same k-fold idea, but each fold keeps the dataset's class proportions."],
        ["skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)",
         "At 5% positives, every fold gets ~5% positives — no fold ends up positive-free by bad luck."],
        ["scores = cross_val_score(clf, X_train, y_train, cv=skf, scoring='f1')",
         "Two upgrades in one line: stratified splits, and scoring='f1' instead of accuracy — because at 95:5, accuracy flatters."],
        ["print(scores.mean())",
         "The average F1 across five honest folds — a number you can actually trust on imbalanced data."]],
      mcq: {
        q: 'Which snippet cross-validates an imbalanced classifier properly?',
        correct: "skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(clf, X_train, y_train, cv=skf, scoring='f1')",
        wrong: [
          "skf = StratifiedKFold(n_splits=5)\nscores = cross_val_score(clf, X_train, y_train, cv=skf, scoring='accuracy')  # accuracy at 95:5",
          "skf = StratifiedKFold(n_splits=5, stratify=y)\nscores = cross_val_score(clf, X_train, y_train, cv=skf)",
          "y_sorted = y_train.sort_values()\nscores = cross_val_score(clf, X_train, y_sorted, cv=5)",
          "skf = StratifiedKFold(n_splits=5)\nscores = cross_val_score(clf, X_train, cv=skf, scoring='f1')"],
        explain: "StratifiedKFold stratifies automatically from the y you pass to cross_val_score — it takes no stratify argument itself. Accuracy is the wrong scorer at 95:5; sorting y detaches labels from their rows (catastrophic); and cross_val_score needs y to stratify (and to score) at all." },
      lines: [
        "from sklearn.model_selection import StratifiedKFold",
        "skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)",
        "scores = cross_val_score(clf, X_train, y_train, cv=skf, scoring='f1')",
        "print(scores.mean())"],
      decoys: [
        "skf = StratifiedKFold(n_splits=5, stratify=y)",
        "y_train = y_train.sort_values()"],
      written: {
        prompt: 'Write the code: a shuffled, seeded StratifiedKFold with 5 splits, used as cv in cross_val_score with scoring=‘f1’; print the mean.',
        solution: "from sklearn.model_selection import StratifiedKFold\nskf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(clf, X_train, y_train, cv=skf, scoring='f1')\nprint(scores.mean())",
        must: ["StratifiedKFold", "n_splits=5", "cv=skf", "scoring='f1'", "mean"] } },

    { key: 'groupkfold', group: 'The core workflow', title: 'Group k-fold',
      ask: 'Cross-validate patient-level data so no patient appears in both train and test.',
      why: 'Five rows from one patient split across folds lets the model recognise the patient, not the disease.',
      walk: [
        ["from sklearn.model_selection import GroupKFold",
         "The entity-aware splitter: rows that share a group id always travel to the same side of the split."],
        ["gkf = GroupKFold(n_splits=5)",
         "Five folds — but folds of GROUPS (patients), not of rows."],
        ["scores = cross_val_score(clf, X, y, cv=gkf, groups=patient_ids)",
         "The groups array (one id per row) is the crucial extra: it tells the splitter which rows belong together."],
        ["print(scores.mean())",
         "This estimates the question production actually asks: how well does the model do on patients it has never seen?"]],
      mcq: {
        q: 'Which snippet keeps each patient entirely within one fold?',
        correct: "gkf = GroupKFold(n_splits=5)\nscores = cross_val_score(clf, X, y, cv=gkf, groups=patient_ids)",
        wrong: [
          "gkf = GroupKFold(n_splits=5, groups=patient_ids)\nscores = cross_val_score(clf, X, y, cv=gkf)",
          "scores = cross_val_score(clf, X, y, cv=5)\n# patients handled automatically by sklearn",
          "X_dedup = X.drop_duplicates()\nscores = cross_val_score(clf, X_dedup, y, cv=5)",
          "gkf = GroupKFold(n_splits=5)\nscores = cross_val_score(clf, X, patient_ids, cv=gkf)"],
        explain: "The groups array goes to cross_val_score (which passes it to the splitter per split) — GroupKFold's constructor doesn't take it. Plain cv=5 knows nothing about patients; dropping duplicate feature-rows misses the point (different visits differ); and patient_ids is not the target." },
      lines: [
        "from sklearn.model_selection import GroupKFold",
        "gkf = GroupKFold(n_splits=5)",
        "scores = cross_val_score(clf, X, y, cv=gkf, groups=patient_ids)",
        "print(scores.mean())"],
      decoys: [
        "gkf = GroupKFold(n_splits=5, groups=patient_ids)",
        "scores = cross_val_score(clf, X, y, cv=5)  # ignores the patients"],
      written: {
        prompt: 'Write the code: a 5-split GroupKFold used in cross_val_score with groups=patient_ids; print the mean score.',
        solution: "from sklearn.model_selection import GroupKFold\ngkf = GroupKFold(n_splits=5)\nscores = cross_val_score(clf, X, y, cv=gkf, groups=patient_ids)\nprint(scores.mean())",
        must: ["GroupKFold", "n_splits=5", "cv=gkf", "groups=patient_ids", "mean"] } },

    { key: 'cvmulti', group: 'Evaluating', title: 'Cross-validate several metrics at once',
      ask: 'Get accuracy, F1 and ROC-AUC from one cross-validation run with cross_validate.',
      why: 'One metric is one lens; cross_validate scores them all without refitting five extra times.',
      walk: [
        ["from sklearn.model_selection import cross_validate",
         "cross_val_score returns one metric; its bigger sibling cross_validate returns as many as you ask for."],
        ["res = cross_validate(clf, X_train, y_train, cv=5,",
         "Same shape as before — model, training data, five folds…"],
        ["                     scoring=['accuracy', 'f1', 'roc_auc'])",
         "…plus a list of scorers by name. Each fold is fitted ONCE and scored three ways."],
        ["print(res['test_f1'].mean())",
         "The result is a dict: 'test_' + metric name per scorer. Here, mean F1 across folds."],
        ["print(res['test_roc_auc'].mean())",
         "And the same folds' AUC — comparable because they came from identical splits."]],
      mcq: {
        q: 'How do you get accuracy, F1 AND ROC-AUC from one CV run?',
        correct: "res = cross_validate(clf, X_train, y_train, cv=5,\n                     scoring=['accuracy', 'f1', 'roc_auc'])\nprint(res['test_f1'].mean())",
        wrong: [
          "res = cross_val_score(clf, X_train, y_train, cv=5,\n                      scoring=['accuracy', 'f1', 'roc_auc'])\nprint(res.mean())",
          "res = cross_validate(clf, X_train, y_train, cv=5,\n                     scoring=['accuracy', 'f1', 'roc_auc'])\nprint(res['f1'].mean())",
          "for m in ['accuracy', 'f1', 'roc_auc']:\n    clf.fit(X_train, y_train)\n    print(clf.score(X_train, y_train, metric=m))",
          "res = cross_validate(clf, X_train, y_train, cv=5)\nprint(res['test_f1'].mean())  # default scoring"],
        explain: "cross_validate accepts a list of scorers and returns a dict keyed 'test_<name>' — cross_val_score only ever takes one scorer, the result key needs the test_ prefix, .score() has no metric argument (and scores on train here), and without scoring= you only get the default metric." },
      lines: [
        "from sklearn.model_selection import cross_validate",
        "res = cross_validate(clf, X_train, y_train, cv=5,",
        "                     scoring=['accuracy', 'f1', 'roc_auc'])",
        "print(res['test_accuracy'].mean())",
        "print(res['test_f1'].mean())",
        "print(res['test_roc_auc'].mean())"],
      decoys: [
        "print(res['f1'].mean())  # missing the test_ prefix",
        "res = cross_val_score(clf, X_train, y_train, scoring=['accuracy', 'f1'])"],
      written: {
        prompt: 'Write the code: cross_validate the classifier (cv=5) with scoring accuracy, f1 and roc_auc; print the mean test F1.',
        solution: "from sklearn.model_selection import cross_validate\nres = cross_validate(clf, X_train, y_train, cv=5,\n                     scoring=['accuracy', 'f1', 'roc_auc'])\nprint(res['test_f1'].mean())",
        must: ["cross_validate", "cv=5", "scoring=", "roc_auc", "test_f1", "mean"] } },

    { key: 'rocauc', group: 'Evaluating', title: 'ROC curve and AUC',
      ask: 'Compute the test-set ROC-AUC from probabilities, and the curve points behind it.',
      why: 'AUC judges the ranking of predictions — it needs probabilities, never hard labels.',
      walk: [
        ["from sklearn.metrics import roc_auc_score, roc_curve",
         "Two tools: the single number (AUC) and the full curve it summarises."],
        ["proba = clf.predict_proba(X_test)[:, 1]",
         "The raw material: positive-class probabilities. Hard 0/1 labels would throw the ranking away."],
        ["auc = roc_auc_score(y_test, proba)",
         "Truth first, scores second. 0.5 = coin-flip ordering, 1.0 = every positive ranked above every negative."],
        ["fpr, tpr, thresholds = roc_curve(y_test, proba)",
         "The curve behind the number: for every threshold, the false-positive rate and true-positive rate you'd get."],
        ["print('AUC:', auc)",
         "Report the AUC; plot fpr against tpr if you want the picture."]],
      mcq: {
        q: 'Which snippet computes ROC-AUC correctly?',
        correct: "proba = clf.predict_proba(X_test)[:, 1]\nauc = roc_auc_score(y_test, proba)",
        wrong: [
          "y_pred = clf.predict(X_test)\nauc = roc_auc_score(y_test, y_pred)  # hard labels lose the ranking",
          "proba = clf.predict_proba(X_test)[:, 1]\nauc = roc_auc_score(proba, y_test)",
          "proba = clf.predict_proba(X_train)[:, 1]\nauc = roc_auc_score(y_test, proba)",
          "auc = roc_curve(y_test, clf.predict(X_test))"],
        explain: "AUC ranks the scores, so feed it probabilities: hard predict() labels give a degraded, threshold-dependent answer. Argument order is (y_true, y_score); probabilities must come from the SAME rows as the labels; and roc_curve returns curve points, not the area." },
      lines: [
        "from sklearn.metrics import roc_auc_score, roc_curve",
        "proba = clf.predict_proba(X_test)[:, 1]",
        "auc = roc_auc_score(y_test, proba)",
        "fpr, tpr, thresholds = roc_curve(y_test, proba)",
        "print('AUC:', auc)"],
      decoys: [
        "auc = roc_auc_score(y_test, clf.predict(X_test))  # hard labels",
        "auc = roc_auc_score(proba, y_test)  # arguments reversed"],
      written: {
        prompt: 'Write the code: positive-class probabilities for X_test, roc_auc_score against y_test, plus fpr/tpr/thresholds from roc_curve.',
        solution: "from sklearn.metrics import roc_auc_score, roc_curve\nproba = clf.predict_proba(X_test)[:, 1]\nauc = roc_auc_score(y_test, proba)\nfpr, tpr, thresholds = roc_curve(y_test, proba)",
        must: ["predict_proba(X_test)", "[:, 1]", "roc_auc_score(y_test, proba)", "roc_curve(y_test, proba)"] } },

    { key: 'prf', group: 'Evaluating', title: 'Precision, recall and F1, directly',
      ask: 'Compute the three headline classification metrics as individual numbers.',
      why: 'The report prints them; computing them yourself proves you know which is which.',
      walk: [
        ["from sklearn.metrics import precision_score, recall_score, f1_score",
         "One function per metric — all three compare the same two arrays."],
        ["y_pred = clf.predict(X_test)",
         "These are threshold metrics, so hard labels are the right input (unlike AUC)."],
        ["print('precision:', precision_score(y_test, y_pred))",
         "Of everything flagged positive, how much was right? Truth first, predictions second — always."],
        ["print('recall:', recall_score(y_test, y_pred))",
         "Of everything actually positive, how much did we catch?"],
        ["print('f1:', f1_score(y_test, y_pred))",
         "Their harmonic mean — high only when BOTH are decent. (Multiclass? Add average='macro' or 'weighted'.)"]],
      mcq: {
        q: 'Which snippet computes precision, recall and F1 correctly?',
        correct: "y_pred = clf.predict(X_test)\nprint(precision_score(y_test, y_pred))\nprint(recall_score(y_test, y_pred))\nprint(f1_score(y_test, y_pred))",
        wrong: [
          "y_pred = clf.predict(X_test)\nprint(precision_score(y_pred, y_test))\nprint(recall_score(y_pred, y_test))\nprint(f1_score(y_pred, y_test))",
          "proba = clf.predict_proba(X_test)[:, 1]\nprint(precision_score(y_test, proba))",
          "y_pred = clf.predict(X_test)\nprint(f1_score(y_test))\nprint(precision_score(y_pred))",
          "print(precision_score(X_test, y_test))\nprint(recall_score(X_test, y_test))"],
        explain: "All three take (y_true, y_pred) in that order — reversing them silently swaps precision with recall. They need hard labels (probabilities crash them), they need BOTH arrays, and they compare labels with labels — never features." },
      lines: [
        "from sklearn.metrics import precision_score, recall_score, f1_score",
        "y_pred = clf.predict(X_test)",
        "print('precision:', precision_score(y_test, y_pred))",
        "print('recall:', recall_score(y_test, y_pred))",
        "print('f1:', f1_score(y_test, y_pred))"],
      decoys: [
        "print(precision_score(y_pred, y_test))  # arguments reversed",
        "print(f1_score(y_test, proba))  # probabilities, not labels"],
      written: {
        prompt: 'Write the code: predict on X_test, then print precision_score, recall_score and f1_score — truth first, predictions second.',
        solution: "from sklearn.metrics import precision_score, recall_score, f1_score\ny_pred = clf.predict(X_test)\nprint(precision_score(y_test, y_pred))\nprint(recall_score(y_test, y_pred))\nprint(f1_score(y_test, y_pred))",
        must: ["precision_score(y_test, y_pred)", "recall_score(y_test, y_pred)", "f1_score(y_test, y_pred)"] } },

    { key: 'regmetrics', group: 'Evaluating', title: 'Regression metrics: MAE, RMSE, R²',
      ask: 'Score a regressor with the three standard numbers, on the original units.',
      why: 'MAE reads in pounds, RMSE punishes big misses, R² compares against guessing the mean.',
      walk: [
        ["from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score",
         "The regression trio — all compare true values with predicted values."],
        ["y_pred = reg.predict(X_test)",
         "Regression predictions are numbers, so no probabilities or thresholds anywhere."],
        ["mae = mean_absolute_error(y_test, y_pred)",
         "Average size of the miss, in the target's own units: 'off by £3,200 on average'."],
        ["rmse = mean_squared_error(y_test, y_pred) ** 0.5",
         "Square, average, square-root: back in original units but with big errors counted extra. (Newer sklearn also has root_mean_squared_error.)"],
        ["r2 = r2_score(y_test, y_pred)",
         "1 = perfect, 0 = no better than predicting the mean, negative = actively worse than that."],
        ["print(mae, rmse, r2)",
         "Report all three — each answers a different question about the same errors."]],
      mcq: {
        q: 'Which snippet computes MAE, RMSE and R² correctly?',
        correct: "y_pred = reg.predict(X_test)\nmae = mean_absolute_error(y_test, y_pred)\nrmse = mean_squared_error(y_test, y_pred) ** 0.5\nr2 = r2_score(y_test, y_pred)",
        wrong: [
          "y_pred = reg.predict(X_test)\nmae = mean_absolute_error(y_test, y_pred)\nrmse = mean_squared_error(y_test, y_pred)  # this is MSE, not RMSE\nr2 = r2_score(y_test, y_pred)",
          "y_pred = reg.predict(X_test)\nmae = accuracy_score(y_test, y_pred)\nrmse = f1_score(y_test, y_pred)",
          "mae = mean_absolute_error(X_test, y_pred)\nrmse = mean_squared_error(X_test, y_pred) ** 0.5",
          "y_pred = reg.predict(X_test)\nr2 = r2_score(y_pred, y_test) * 100  # R² as a percentage of predictions"],
        explain: "RMSE is the square ROOT of mean_squared_error — forgetting the root reports squared units. Accuracy and F1 are classification metrics that crash on continuous targets; metrics compare labels with predictions (not features); and while r2_score's argument order matters, multiplying by 100 doesn't make it a percentage of anything meaningful." },
      lines: [
        "from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score",
        "y_pred = reg.predict(X_test)",
        "mae = mean_absolute_error(y_test, y_pred)",
        "rmse = mean_squared_error(y_test, y_pred) ** 0.5",
        "r2 = r2_score(y_test, y_pred)",
        "print(mae, rmse, r2)"],
      decoys: [
        "rmse = mean_squared_error(y_test, y_pred)  # forgot the square root",
        "mae = accuracy_score(y_test, y_pred)  # classification metric on numbers"],
      written: {
        prompt: 'Write the code: predict with reg on X_test; compute MAE, RMSE (root of MSE) and R²; print all three.',
        solution: "from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\ny_pred = reg.predict(X_test)\nmae = mean_absolute_error(y_test, y_pred)\nrmse = mean_squared_error(y_test, y_pred) ** 0.5\nr2 = r2_score(y_test, y_pred)\nprint(mae, rmse, r2)",
        must: ["mean_absolute_error(y_test, y_pred)", "mean_squared_error(y_test, y_pred)", "** 0.5", "r2_score(y_test, y_pred)"] } },

    { key: 'logloss', group: 'Evaluating', title: 'Log loss and the Brier score',
      ask: 'Score the QUALITY of predicted probabilities, not just the labels they imply.',
      why: 'Two models with equal accuracy can differ wildly in how honest their confidence is.',
      walk: [
        ["from sklearn.metrics import log_loss, brier_score_loss",
         "Both are proper scoring rules: they reward probabilities that tell the truth."],
        ["proba = clf.predict_proba(X_test)",
         "log_loss wants the full probability matrix — all classes' columns, not just the positive one."],
        ["ll = log_loss(y_test, proba)",
         "Confidently wrong is punished brutally (a 0.99 on the wrong class costs a fortune). Lower is better."],
        ["brier = brier_score_loss(y_test, proba[:, 1])",
         "The gentler cousin: mean squared error between the positive-class probability and the 0/1 truth. Also lower-is-better."],
        ["print(ll, brier)",
         "Use these when the probabilities themselves feed decisions — pricing, triage, expected costs."]],
      mcq: {
        q: 'Which snippet scores probability quality correctly?',
        correct: "proba = clf.predict_proba(X_test)\nll = log_loss(y_test, proba)\nbrier = brier_score_loss(y_test, proba[:, 1])",
        wrong: [
          "y_pred = clf.predict(X_test)\nll = log_loss(y_test, y_pred)  # 0/1 labels, so one error costs infinity",
          "proba = clf.predict_proba(X_test)\nll = log_loss(proba, y_test)\nbrier = brier_score_loss(proba[:, 1], y_test)",
          "proba = clf.predict_proba(X_test)\nll = log_loss(y_test, proba)\nprint('higher is better:', ll)",
          "brier = brier_score_loss(y_test, clf.predict(X_test) * 0.99)"],
        explain: "Probability metrics need probabilities: hard labels make log loss explode on any single error. Argument order is (y_true, probabilities); both metrics are losses — LOWER is better; and rescaling hard labels by 0.99 manufactures fake confidence, not probabilities." },
      lines: [
        "from sklearn.metrics import log_loss, brier_score_loss",
        "proba = clf.predict_proba(X_test)",
        "ll = log_loss(y_test, proba)",
        "brier = brier_score_loss(y_test, proba[:, 1])",
        "print(ll, brier)"],
      decoys: [
        "ll = log_loss(y_test, clf.predict(X_test))  # hard labels",
        "print('higher is better:', ll)  # both are losses"],
      written: {
        prompt: 'Write the code: probabilities for X_test; log_loss on the full matrix; brier_score_loss on the positive column; print both.',
        solution: "from sklearn.metrics import log_loss, brier_score_loss\nproba = clf.predict_proba(X_test)\nll = log_loss(y_test, proba)\nbrier = brier_score_loss(y_test, proba[:, 1])\nprint(ll, brier)",
        must: ["log_loss(y_test, proba)", "brier_score_loss(y_test, proba[:, 1])", "predict_proba"] } },

    { key: 'valcurve', group: 'Tuning', title: 'Validation curve over a hyperparameter',
      ask: 'Sweep max_depth and watch train vs validation scores to find the overfitting point.',
      why: 'The picture of bias and variance: where the two curves part company, memorisation begins.',
      walk: [
        ["from sklearn.model_selection import validation_curve",
         "One call runs a whole hyperparameter sweep under cross-validation."],
        ["depths = [2, 4, 6, 8, 10, 12]",
         "The values to audition — the x-axis of the curve."],
        ["train_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(random_state=42), X_train, y_train,\n    param_name='max_depth', param_range=depths, cv=5)",
         "For each depth: five fits, recording BOTH the training score and the validation score. The parameter is named as a string, exactly as the estimator spells it."],
        ["print(train_sc.mean(axis=1))",
         "Row per depth, column per fold — average across folds (axis=1). Training scores will climb towards 1.0 forever…"],
        ["print(val_sc.mean(axis=1))",
         "…while validation scores rise, peak, and fall. The peak is your depth; the widening gap after it is overfitting, drawn in numbers."]],
      mcq: {
        q: 'Which snippet sweeps max_depth correctly with validation_curve?',
        correct: "train_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(), X_train, y_train,\n    param_name='max_depth', param_range=[2, 4, 6, 8], cv=5)",
        wrong: [
          "train_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(), X_train, y_train,\n    max_depth=[2, 4, 6, 8], cv=5)",
          "for d in [2, 4, 6, 8]:\n    tree = DecisionTreeClassifier(max_depth=d)\n    tree.fit(X_train, y_train)\n    print(tree.score(X_train, y_train))  # training score only",
          "train_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(), X_test, y_test,\n    param_name='max_depth', param_range=[2, 4, 6, 8], cv=5)",
          "train_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(max_depth=[2, 4, 6, 8]), X_train, y_train, cv=5)"],
        explain: "The swept parameter is passed by NAME (param_name) with its values (param_range) — not as a keyword and not stuffed into the constructor. The manual loop reads training scores, which always prefer maximum depth; and sweeping on the test set spends your final estimate on tuning." },
      lines: [
        "from sklearn.model_selection import validation_curve",
        "depths = [2, 4, 6, 8, 10, 12]",
        "train_sc, val_sc = validation_curve(",
        "    DecisionTreeClassifier(random_state=42), X_train, y_train,",
        "    param_name='max_depth', param_range=depths, cv=5)",
        "print(train_sc.mean(axis=1))",
        "print(val_sc.mean(axis=1))"],
      decoys: [
        "    max_depth=depths, cv=5)  # swept params go via param_name/param_range",
        "    DecisionTreeClassifier(), X_test, y_test,  # tuning on the test set"],
      written: {
        prompt: 'Write the code: validation_curve for a DecisionTreeClassifier on the training data, param_name ‘max_depth’, param_range [2,4,6,8,10,12], cv=5; print the fold-averaged validation scores.',
        solution: "from sklearn.model_selection import validation_curve\ntrain_sc, val_sc = validation_curve(\n    DecisionTreeClassifier(random_state=42), X_train, y_train,\n    param_name='max_depth', param_range=[2, 4, 6, 8, 10, 12], cv=5)\nprint(val_sc.mean(axis=1))",
        must: ["validation_curve", "param_name='max_depth'", "param_range=", "cv=5", "mean(axis=1)"] } },

    { key: 'baseline', group: 'Evaluating', title: 'Beat the baseline first',
      ask: 'Score a DummyClassifier, then prove your real model beats it.',
      why: 'A score means nothing until you know what zero intelligence gets on the same data.',
      walk: [
        ["from sklearn.dummy import DummyClassifier",
         "The professional way to represent 'no skill': a model that ignores the features entirely."],
        ["dummy = DummyClassifier(strategy='most_frequent')",
         "Strategy: always predict the majority class. (On imbalanced data this scores alarmingly well — that's the lesson.)"],
        ["dummy.fit(X_train, y_train)",
         "It still uses fit/score like everything else — it just only learns which class is most common."],
        ["print('baseline:', dummy.score(X_test, y_test))",
         "The floor. At 95:5, this prints 0.95 — with zero fraud caught."],
        ["print('model:   ', clf.score(X_test, y_test))",
         "Your model's number is only impressive by the distance it clears this bar — report them together."]],
      mcq: {
        q: 'Which snippet establishes an honest baseline comparison?',
        correct: "dummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_train, y_train)\nprint(dummy.score(X_test, y_test), clf.score(X_test, y_test))",
        wrong: [
          "baseline = 0.5  # coin flip is always the baseline\nprint(clf.score(X_test, y_test) > baseline)",
          "dummy = DummyClassifier(strategy='most_frequent')\nprint(dummy.score(X_test, y_test))  # never fitted",
          "dummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_test, y_test)\nprint(dummy.score(X_train, y_train))",
          "print(clf.score(X_test, y_test) - clf.score(X_train, y_train))  # this is the baseline gap"],
        explain: "The majority-class baseline depends on the data (95% at 95:5 — nothing like a coin flip), so it must be measured, on the same test set your model uses. Even a dummy needs fitting (to learn the majority class), fit belongs on train, and the train-test gap measures overfitting, not baseline skill." },
      lines: [
        "from sklearn.dummy import DummyClassifier",
        "dummy = DummyClassifier(strategy='most_frequent')",
        "dummy.fit(X_train, y_train)",
        "print('baseline:', dummy.score(X_test, y_test))",
        "print('model:   ', clf.score(X_test, y_test))"],
      decoys: [
        "baseline = 0.5  # the baseline is a property of the data, not a constant",
        "dummy.fit(X_test, y_test)"],
      written: {
        prompt: 'Write the code: a most_frequent DummyClassifier fitted on train; print its test score next to the real model’s test score.',
        solution: "from sklearn.dummy import DummyClassifier\ndummy = DummyClassifier(strategy='most_frequent')\ndummy.fit(X_train, y_train)\nprint(dummy.score(X_test, y_test))\nprint(clf.score(X_test, y_test))",
        must: ["DummyClassifier", "most_frequent", "fit(X_train, y_train)", "score(X_test, y_test)"] } }

  );
})();
