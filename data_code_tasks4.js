/* Coding mode, batch 4: the advanced-workflow drills — tuning through a pipeline,
   modern boosting with early stopping, calibration, learning curves, choosing k with
   silhouette, permutation importance, regularisation tuning, and nested CV.
   Each with a full line-by-line walk. Loads after data_code_walks.js. */
(function () {
  var T = (window.CODETASKS = window.CODETASKS || []);
  T.push(

    { key: 'pipegrid', group: 'Tuning', title: 'Tune straight through a pipeline',
      ask: 'Grid-search the model\'s C inside a scaler+model pipeline, using step__param names.',
      why: 'Tuning the pipeline (not the bare model) keeps the scaling leak-free inside every fold.',
      walk: [
        ["pipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression(max_iter=1000))])",
         "The usual chain — and note the step names, because they're about to become addresses."],
        ["params = {'clf__C': [0.01, 0.1, 1, 10]}",
         "The double underscore routes into the pipeline: 'the C parameter of the step named clf'. Scaler settings would be scaler__whatever."],
        ["grid = GridSearchCV(pipe, params, cv=5)",
         "The WHOLE pipeline is the estimator being tuned — so each fold refits the scaler on its own training part. No leak, by construction."],
        ["grid.fit(X_train, y_train)",
         "4 values × 5 folds = 20 pipeline fits, all on training data."],
        ["print(grid.best_params_)",
         "The winner comes back in the same address form: {'clf__C': 0.1}."]],
      mcq: {
        q: 'How do you grid-search C for the model inside a pipeline named [scaler, clf]?',
        correct: "params = {'clf__C': [0.01, 0.1, 1, 10]}\ngrid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)",
        wrong: [
          "params = {'C': [0.01, 0.1, 1, 10]}\ngrid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)",
          "params = {'clf.C': [0.01, 0.1, 1, 10]}\ngrid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)",
          "X_s = StandardScaler().fit_transform(X_train)\nparams = {'C': [0.01, 0.1, 1, 10]}\ngrid = GridSearchCV(LogisticRegression(), params, cv=5)\ngrid.fit(X_s, y_train)",
          "grid = GridSearchCV(pipe, C=[0.01, 0.1, 1, 10], cv=5)\ngrid.fit(X_train, y_train)"],
        explain: "Pipeline parameters are addressed as step__param with a DOUBLE underscore — bare 'C' and dotted 'clf.C' both raise errors. Scaling before the search (option 3) is exactly the leak the pipeline exists to prevent, and GridSearchCV takes a params dict, not keyword lists." },
      lines: [
        "pipe = Pipeline([('scaler', StandardScaler()),",
        "                 ('clf', LogisticRegression(max_iter=1000))])",
        "params = {'clf__C': [0.01, 0.1, 1, 10]}",
        "grid = GridSearchCV(pipe, params, cv=5)",
        "grid.fit(X_train, y_train)",
        "print(grid.best_params_)"],
      decoys: [
        "params = {'C': [0.01, 0.1, 1, 10]}  # missing the clf__ address",
        "X_s = StandardScaler().fit_transform(X_train)  # scaling outside the search"],
      written: {
        prompt: 'Write the code: grid-search clf__C over [0.01, 0.1, 1, 10] on the scaler+clf pipeline with cv=5, fit on train, print best_params_.',
        solution: "params = {'clf__C': [0.01, 0.1, 1, 10]}\ngrid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)\nprint(grid.best_params_)",
        must: ["clf__C", "GridSearchCV(pipe", "cv=5", "fit(X_train, y_train)", "best_params_"] } },

    { key: 'histgb', group: 'Fitting models', title: 'Boosting with early stopping',
      ask: 'Train a HistGradientBoosting classifier that stops itself when validation stops improving.',
      why: 'Boosting overfits with too many rounds — early stopping finds the right count for you.',
      walk: [
        ["from sklearn.ensemble import HistGradientBoostingClassifier",
         "Sklearn's modern boosting engine — histogram-based, fast, LightGBM-style."],
        ["gb = HistGradientBoostingClassifier(\n    max_iter=1000, learning_rate=0.1,",
         "Offer plenty of rounds (max_iter is the boosting-round cap here) — early stopping will use only what it needs."],
        ["    early_stopping=True, validation_fraction=0.1, n_iter_no_change=20,\n    random_state=42)",
         "It carves off 10% of the training data internally; if 20 consecutive rounds fail to improve on it, training stops and keeps the best point."],
        ["gb.fit(X_train, y_train)",
         "One fit — the stopping logic runs inside it. No manual loop over rounds."],
        ["print(gb.n_iter_, 'rounds used')\nprint(gb.score(X_test, y_test))",
         "n_iter_ (learned, hence the underscore) reveals where it actually stopped — often far below the cap."]],
      mcq: {
        q: 'Which snippet trains boosting with proper early stopping?',
        correct: "gb = HistGradientBoostingClassifier(max_iter=1000, early_stopping=True,\n    validation_fraction=0.1, n_iter_no_change=20, random_state=42)\ngb.fit(X_train, y_train)",
        wrong: [
          "gb = HistGradientBoostingClassifier(max_iter=1000)\ngb.fit(X_train, y_train)\ngb.stop_early(patience=20)",
          "gb = HistGradientBoostingClassifier(max_iter=1000, early_stopping=True,\n    validation_fraction=0.1)\ngb.fit(X_test, y_test)",
          "for i in range(1000):\n    gb = HistGradientBoostingClassifier(max_iter=i)\n    gb.fit(X_train, y_train)\n    if gb.score(X_train, y_train) > 0.99:\n        break",
          "gb = HistGradientBoostingClassifier(max_iter=20)\ngb.fit(X_train, y_train)  # just cap the rounds at 20"],
        explain: "Early stopping is configured in the constructor and happens during fit — there's no stop_early method to call afterwards. Fitting on test data is the cardinal sin; the manual loop refits from scratch 1000 times AND watches training score (which always wants more rounds); and hard-capping at 20 isn't early stopping, it's guessing." },
      lines: [
        "from sklearn.ensemble import HistGradientBoostingClassifier",
        "gb = HistGradientBoostingClassifier(",
        "    max_iter=1000, learning_rate=0.1,",
        "    early_stopping=True, validation_fraction=0.1, n_iter_no_change=20,",
        "    random_state=42)",
        "gb.fit(X_train, y_train)",
        "print(gb.n_iter_, 'rounds used')",
        "print(gb.score(X_test, y_test))"],
      decoys: [
        "gb.stop_early(patience=20)  # no such method; it's a constructor setting",
        "gb.fit(X_test, y_test)"],
      written: {
        prompt: 'Write the code: HistGradientBoostingClassifier with max_iter=1000, early_stopping=True, validation_fraction=0.1, n_iter_no_change=20; fit on train; print n_iter_ and the test score.',
        solution: "from sklearn.ensemble import HistGradientBoostingClassifier\ngb = HistGradientBoostingClassifier(\n    max_iter=1000, learning_rate=0.1,\n    early_stopping=True, validation_fraction=0.1, n_iter_no_change=20,\n    random_state=42)\ngb.fit(X_train, y_train)\nprint(gb.n_iter_)\nprint(gb.score(X_test, y_test))",
        must: ["HistGradientBoostingClassifier", "early_stopping=True", "validation_fraction=0.1", "n_iter_no_change=20", "n_iter_"] } },

    { key: 'calib', group: 'Evaluating', title: 'Check and fix probability calibration',
      ask: 'Draw the calibration curve for a model, then wrap it in CalibratedClassifierCV.',
      why: 'A model can rank perfectly yet lie about confidence — calibration checks whether 0.8 means 80%.',
      walk: [
        ["from sklearn.calibration import calibration_curve, CalibratedClassifierCV",
         "The diagnostic (curve) and the treatment (wrapper)."],
        ["proba = clf.predict_proba(X_test)[:, 1]",
         "Calibration is a property of the probabilities, so that's the input."],
        ["frac_pos, mean_pred = calibration_curve(y_test, proba, n_bins=10)",
         "Bin the predictions (all the ~0.7s together), then ask: did ~70% of those rows actually turn out positive? Perfect calibration puts every point on the diagonal."],
        ["calibrated = CalibratedClassifierCV(base_clf, method='isotonic', cv=5)",
         "The fix: learn a mapping from the model's raw scores to honest probabilities, cross-validated so the mapping isn't fitted on its own training predictions."],
        ["calibrated.fit(X_train, y_train)\nproba_cal = calibrated.predict_proba(X_test)[:, 1]",
         "Train the wrapped model and take its corrected probabilities — same ranking, honest confidence."]],
      mcq: {
        q: 'Which snippet checks calibration correctly?',
        correct: "proba = clf.predict_proba(X_test)[:, 1]\nfrac_pos, mean_pred = calibration_curve(y_test, proba, n_bins=10)",
        wrong: [
          "y_pred = clf.predict(X_test)\nfrac_pos, mean_pred = calibration_curve(y_test, y_pred, n_bins=10)",
          "proba = clf.predict_proba(X_train)[:, 1]\nfrac_pos, mean_pred = calibration_curve(y_test, proba, n_bins=10)",
          "proba = clf.predict_proba(X_test)[:, 1]\nfrac_pos, mean_pred = calibration_curve(proba, y_test, n_bins=10)",
          "acc = accuracy_score(y_test, clf.predict(X_test))\nprint('calibrated' if acc > 0.9 else 'uncalibrated')"],
        explain: "The curve needs probabilities against true labels, (y_true, y_prob) in that order, computed on the same held-out rows. Hard 0/1 labels have no confidence to check; train-set probabilities don't match test labels; and accuracy says nothing about calibration — a 99%-accurate model can still claim 60% confidence on everything." },
      lines: [
        "from sklearn.calibration import calibration_curve, CalibratedClassifierCV",
        "proba = clf.predict_proba(X_test)[:, 1]",
        "frac_pos, mean_pred = calibration_curve(y_test, proba, n_bins=10)",
        "calibrated = CalibratedClassifierCV(base_clf, method='isotonic', cv=5)",
        "calibrated.fit(X_train, y_train)",
        "proba_cal = calibrated.predict_proba(X_test)[:, 1]"],
      decoys: [
        "frac_pos, mean_pred = calibration_curve(y_test, clf.predict(X_test))  # hard labels",
        "calibrated.fit(X_test, y_test)"],
      written: {
        prompt: 'Write the code: calibration_curve (10 bins) from test-set probabilities, then a 5-fold isotonic CalibratedClassifierCV fitted on the training data.',
        solution: "from sklearn.calibration import calibration_curve, CalibratedClassifierCV\nproba = clf.predict_proba(X_test)[:, 1]\nfrac_pos, mean_pred = calibration_curve(y_test, proba, n_bins=10)\ncalibrated = CalibratedClassifierCV(base_clf, method='isotonic', cv=5)\ncalibrated.fit(X_train, y_train)",
        must: ["calibration_curve(y_test, proba", "n_bins=10", "CalibratedClassifierCV", "isotonic", "fit(X_train, y_train)"] } },

    { key: 'lcurve', group: 'Tuning', title: 'Learning curve: is more data worth it?',
      ask: 'Plot score against training-set size to diagnose whether to collect data or change model.',
      why: 'A gap that narrows with data means variance (collect more); converged-but-low means bias (better model).',
      walk: [
        ["from sklearn.model_selection import learning_curve\nimport numpy as np",
         "The tool that retrains your model on growing slices of the data."],
        ["sizes, train_sc, val_sc = learning_curve(\n    model, X_train, y_train, cv=5,",
         "For each training size: five cross-validated fits, recording train and validation scores."],
        ["    train_sizes=np.linspace(0.1, 1.0, 8))",
         "Eight sizes from 10% to 100% of the training data — the x-axis of the curve."],
        ["print(train_sc.mean(axis=1))",
         "Training scores start near-perfect on tiny data (easy to memorise 50 rows) and drift down as reality bites."],
        ["print(val_sc.mean(axis=1))",
         "Validation scores climb as data grows. Still climbing at 100%? More data will pay. Flat, with the two curves converged at a low score? The model family has hit its ceiling — improve features or capacity instead."]],
      mcq: {
        q: 'Which snippet builds a learning curve correctly?',
        correct: "sizes, train_sc, val_sc = learning_curve(\n    model, X_train, y_train, cv=5, train_sizes=np.linspace(0.1, 1.0, 8))",
        wrong: [
          "sizes, train_sc, val_sc = learning_curve(\n    model, X_train, y_train, cv=5, param_range=np.linspace(0.1, 1.0, 8))",
          "for frac in [0.1, 0.5, 1.0]:\n    model.fit(X_train.sample(frac=frac), y_train)\n    print(model.score(X_train, y_train))",
          "sizes, train_sc, val_sc = learning_curve(\n    model, X_test, y_test, cv=5, train_sizes=np.linspace(0.1, 1.0, 8))",
          "curve = model.learning_curve(X_train, y_train, sizes=8)"],
        explain: "learning_curve sweeps train_sizes (param_range belongs to validation_curve — a hyperparameter sweep, different tool). The manual loop samples X without the matching y rows and scores on training data; curves are built from training data, not test; and estimators have no learning_curve method." },
      lines: [
        "from sklearn.model_selection import learning_curve",
        "sizes, train_sc, val_sc = learning_curve(",
        "    model, X_train, y_train, cv=5,",
        "    train_sizes=np.linspace(0.1, 1.0, 8))",
        "print(train_sc.mean(axis=1))",
        "print(val_sc.mean(axis=1))"],
      decoys: [
        "    param_range=np.linspace(0.1, 1.0, 8))  # that's validation_curve's argument",
        "    model, X_test, y_test, cv=5,"],
      written: {
        prompt: 'Write the code: learning_curve for the model on training data, cv=5, train_sizes from 10% to 100% in 8 steps; print the fold-averaged validation scores.',
        solution: "from sklearn.model_selection import learning_curve\nsizes, train_sc, val_sc = learning_curve(\n    model, X_train, y_train, cv=5,\n    train_sizes=np.linspace(0.1, 1.0, 8))\nprint(val_sc.mean(axis=1))",
        must: ["learning_curve", "cv=5", "train_sizes=", "linspace(0.1, 1.0, 8)", "mean(axis=1)"] } },

    { key: 'silhouette', group: 'Unsupervised', title: 'Choose k with the silhouette score',
      ask: 'Loop over candidate k values and let the silhouette score pick the best clustering.',
      why: 'Inertia always improves with k; silhouette rewards tight AND separated clusters, so it can peak.',
      walk: [
        ["from sklearn.metrics import silhouette_score",
         "A clustering quality score needing no true labels: +1 great, 0 overlapping, negative misassigned."],
        ["for k in range(2, 9):",
         "Audition each k. (Silhouette needs at least 2 clusters — comparing 'in my cluster' with 'the next one over'.)"],
        ["    km = KMeans(n_clusters=k, n_init=10, random_state=42)",
         "A fresh, seeded k-means per candidate, with restarts for stability."],
        ["    labels = km.fit_predict(X_scaled)",
         "Cluster, and keep the assignments — the score judges these labels."],
        ["    print(k, silhouette_score(X_scaled, labels))",
         "Score takes the DATA and the labels (not inertia). Read the printout: the k with the highest silhouette is your candidate — then sanity-check it against domain sense."]],
      mcq: {
        q: 'Which snippet chooses k using the silhouette score correctly?',
        correct: "for k in range(2, 9):\n    km = KMeans(n_clusters=k, n_init=10, random_state=42)\n    labels = km.fit_predict(X_scaled)\n    print(k, silhouette_score(X_scaled, labels))",
        wrong: [
          "for k in range(1, 9):\n    km = KMeans(n_clusters=k)\n    labels = km.fit_predict(X_scaled)\n    print(k, silhouette_score(X_scaled, labels))",
          "for k in range(2, 9):\n    km = KMeans(n_clusters=k)\n    km.fit(X_scaled)\n    print(k, km.inertia_)  # pick the k with the lowest inertia",
          "for k in range(2, 9):\n    km = KMeans(n_clusters=k)\n    labels = km.fit_predict(X_scaled)\n    print(k, silhouette_score(labels, X_scaled))",
          "km = KMeans(n_clusters='auto', scoring='silhouette')\nkm.fit(X_scaled)\nprint(km.best_k_)"],
        explain: "Silhouette starts at k=2 (k=1 raises an error), and its arguments are (data, labels) in that order. Picking minimum inertia always chooses the largest k tried — inertia only ever falls; and KMeans has no 'auto' k or scoring parameter, which is exactly why this loop exists." },
      lines: [
        "from sklearn.metrics import silhouette_score",
        "for k in range(2, 9):",
        "    km = KMeans(n_clusters=k, n_init=10, random_state=42)",
        "    labels = km.fit_predict(X_scaled)",
        "    print(k, silhouette_score(X_scaled, labels))"],
      decoys: [
        "for k in range(1, 9):  # silhouette is undefined at k=1",
        "    print(k, km.inertia_)  # inertia always falls with k"],
      written: {
        prompt: 'Write the code: loop k from 2 to 8, fit a seeded KMeans (n_init=10) per k on X_scaled, and print each k with its silhouette_score.',
        solution: "from sklearn.metrics import silhouette_score\nfor k in range(2, 9):\n    km = KMeans(n_clusters=k, n_init=10, random_state=42)\n    labels = km.fit_predict(X_scaled)\n    print(k, silhouette_score(X_scaled, labels))",
        must: ["silhouette_score", "range(2, 9)", "n_clusters=k", "fit_predict(X_scaled)", "silhouette_score(X_scaled, labels)"] } },

    { key: 'permimp', group: 'Evaluating', title: 'Permutation importance',
      ask: 'Measure each feature\'s real contribution by shuffling it and watching the score drop.',
      why: 'Impurity importances flatter high-cardinality features; permutation asks what the model actually loses.',
      walk: [
        ["from sklearn.inspection import permutation_importance",
         "Model-agnostic importance: works for any fitted estimator, not just trees."],
        ["result = permutation_importance(\n    model, X_test, y_test, n_repeats=10, random_state=42)",
         "For each feature: shuffle that one column (breaking its link with the target), re-score, repeat 10 times. Done on TEST data — importance for generalisation, not memorisation."],
        ["for i in result.importances_mean.argsort()[::-1]:",
         "Sort features by mean score-drop, biggest first."],
        ["    print(X_test.columns[i], result.importances_mean[i].round(4))",
         "A large drop = the model genuinely relies on that feature. Near zero = decorative. (Caveat: correlated features share credit, so read groups together.)"]],
      mcq: {
        q: 'Which snippet computes permutation importance correctly?',
        correct: "result = permutation_importance(\n    model, X_test, y_test, n_repeats=10, random_state=42)\nprint(result.importances_mean)",
        wrong: [
          "result = permutation_importance(\n    model, X_test, n_repeats=10, random_state=42)\nprint(result.importances_mean)",
          "model.fit(X_train.sample(frac=1.0), y_train)\nprint(model.feature_importances_)  # shuffling the rows",
          "result = permutation_importance(\n    X_test, y_test, model, n_repeats=10)\nprint(result.importances_mean)",
          "for col in X_test.columns:\n    X_test[col] = 0\n    print(col, model.score(X_test, y_test))"],
        explain: "The call is (model, X, y, ...) — it needs y to re-score, and the model comes first. Shuffling whole rows changes nothing (rows travel with their labels); and zeroing columns both destroys the data permanently and measures 'what if this feature were 0', which is a different (and distribution-breaking) question from shuffling." },
      lines: [
        "from sklearn.inspection import permutation_importance",
        "result = permutation_importance(",
        "    model, X_test, y_test, n_repeats=10, random_state=42)",
        "for i in result.importances_mean.argsort()[::-1]:",
        "    print(X_test.columns[i], result.importances_mean[i].round(4))"],
      decoys: [
        "result = permutation_importance(model, X_test, n_repeats=10)  # needs y to re-score",
        "    X_test[col] = 0  # destroys the test data"],
      written: {
        prompt: 'Write the code: permutation_importance for the model on the test set with n_repeats=10 and random_state=42; print importances_mean.',
        solution: "from sklearn.inspection import permutation_importance\nresult = permutation_importance(\n    model, X_test, y_test, n_repeats=10, random_state=42)\nprint(result.importances_mean)",
        must: ["permutation_importance", "X_test, y_test", "n_repeats=10", "importances_mean"] } },

    { key: 'ridge', group: 'Fitting models', title: 'Regularised regression: tune alpha',
      ask: 'Fit Ridge regression with its penalty strength chosen by cross-validated search on a log scale.',
      why: 'Alpha is the bias-variance dial for linear models — and log-spaced values are how you search a dial.',
      walk: [
        ["from sklearn.linear_model import Ridge\nimport numpy as np",
         "Ridge = linear regression + an L2 penalty shrinking the coefficients."],
        ["pipe = Pipeline([('scaler', StandardScaler()), ('reg', Ridge())])",
         "Scaling first matters MORE with a penalty: alpha punishes all coefficients equally, which is only fair if features share a scale."],
        ["params = {'reg__alpha': np.logspace(-3, 3, 13)}",
         "13 values from 0.001 to 1000, evenly spaced in powers of ten — regularisation strength lives on a log scale."],
        ["grid = GridSearchCV(pipe, params, cv=5, scoring='neg_mean_absolute_error')",
         "Regression scoring: sklearn maximises, so error metrics appear negated — closer to zero is better."],
        ["grid.fit(X_train, y_train)\nprint(grid.best_params_)",
         "The chosen alpha tells you about your data: tiny → little regularisation needed; large → the penalty is doing real work against noise."]],
      mcq: {
        q: 'Which snippet tunes Ridge\'s alpha sensibly?',
        correct: "params = {'reg__alpha': np.logspace(-3, 3, 13)}\ngrid = GridSearchCV(pipe, params, cv=5, scoring='neg_mean_absolute_error')\ngrid.fit(X_train, y_train)",
        wrong: [
          "params = {'reg__alpha': [1, 2, 3, 4, 5]}\ngrid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)  # linear steps over a log-scale dial",
          "params = {'reg__alpha': np.logspace(-3, 3, 13)}\ngrid = GridSearchCV(pipe, params, cv=5, scoring='accuracy')\ngrid.fit(X_train, y_train)",
          "ridge = Ridge(alpha='auto')\nridge.fit(X_train, y_train)",
          "for a in np.logspace(-3, 3, 13):\n    ridge = Ridge(alpha=a)\n    ridge.fit(X_train, y_train)\nprint(ridge.score(X_train, y_train))"],
        explain: "Regularisation strength is searched in powers of ten — 1..5 in linear steps explores almost nothing. Accuracy is a classification scorer that fails on continuous targets; alpha has no 'auto'; and the manual loop ends up reporting the LAST alpha's training score, which tells you nothing about the best." },
      lines: [
        "from sklearn.linear_model import Ridge",
        "pipe = Pipeline([('scaler', StandardScaler()), ('reg', Ridge())])",
        "params = {'reg__alpha': np.logspace(-3, 3, 13)}",
        "grid = GridSearchCV(pipe, params, cv=5, scoring='neg_mean_absolute_error')",
        "grid.fit(X_train, y_train)",
        "print(grid.best_params_)"],
      decoys: [
        "params = {'reg__alpha': [1, 2, 3, 4, 5]}  # linear steps on a log dial",
        "grid = GridSearchCV(pipe, params, cv=5, scoring='accuracy')  # classification scorer"],
      written: {
        prompt: 'Write the code: scaler+Ridge pipeline; grid-search reg__alpha over np.logspace(-3, 3, 13) with cv=5 and neg_mean_absolute_error scoring; fit and print best_params_.',
        solution: "pipe = Pipeline([('scaler', StandardScaler()), ('reg', Ridge())])\nparams = {'reg__alpha': np.logspace(-3, 3, 13)}\ngrid = GridSearchCV(pipe, params, cv=5, scoring='neg_mean_absolute_error')\ngrid.fit(X_train, y_train)\nprint(grid.best_params_)",
        must: ["Ridge", "reg__alpha", "logspace(-3, 3, 13)", "neg_mean_absolute_error", "best_params_"] } },

    { key: 'nestedcv', group: 'Evaluating', title: 'Nested cross-validation',
      ask: 'Estimate the performance of the WHOLE tune-then-train recipe, without optimistic bias.',
      why: 'A tuned model\'s own best CV score is a maximum over many tries — nested CV pays that bias back.',
      walk: [
        ["inner = GridSearchCV(pipe, params, cv=5)",
         "The inner loop: the tuning machinery, exactly as you'd normally build it."],
        ["scores = cross_val_score(inner, X_train, y_train, cv=5)",
         "The outer loop treats the ENTIRE GridSearchCV as the model: each outer fold runs a complete fresh tuning on its training part, then scores the winner on its held-out part."],
        ["print(scores.mean(), '+/-', scores.std())",
         "This estimates 'how well does my tune-then-train procedure do on unseen data' — typically a touch lower than best_score_, and honest."],
        ["# compare: grid.fit(X_train, y_train); grid.best_score_  <-- optimistic",
         "best_score_ chose the maximum over the whole grid on these same folds — selection bias baked in. Nested CV is the corrected version of that number."]],
      mcq: {
        q: 'Which snippet performs nested cross-validation?',
        correct: "inner = GridSearchCV(pipe, params, cv=5)\nscores = cross_val_score(inner, X_train, y_train, cv=5)\nprint(scores.mean())",
        wrong: [
          "grid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)\nprint(grid.best_score_)  # the tuned score itself",
          "scores1 = cross_val_score(pipe, X_train, y_train, cv=5)\nscores2 = cross_val_score(pipe, X_train, y_train, cv=5)\nprint((scores1.mean() + scores2.mean()) / 2",
          "grid = GridSearchCV(pipe, params, cv=5)\ngrid.fit(X_train, y_train)\nscores = cross_val_score(grid.best_estimator_, X_train, y_train, cv=5)",
          "inner = GridSearchCV(pipe, params, cv=5)\ninner.fit(X_test, y_test)\nprint(inner.best_score_)"],
        explain: "Nesting = cross-validating the SEARCH itself, so each outer fold tunes afresh without seeing its test part. best_score_ is the optimistic number nested CV corrects; running plain CV twice averages the same bias; scoring best_estimator_ re-uses folds that already helped choose it; and tuning on the test set is the original sin." },
      lines: [
        "inner = GridSearchCV(pipe, params, cv=5)",
        "scores = cross_val_score(inner, X_train, y_train, cv=5)",
        "print(scores.mean(), '+/-', scores.std())"],
      decoys: [
        "print(grid.best_score_)  # the biased number nested CV exists to fix",
        "scores = cross_val_score(grid.best_estimator_, X_train, y_train, cv=5)"],
      written: {
        prompt: 'Write the code: wrap the grid search (pipe, params, cv=5) as the estimator inside cross_val_score with cv=5 on the training data; print the mean and std.',
        solution: "inner = GridSearchCV(pipe, params, cv=5)\nscores = cross_val_score(inner, X_train, y_train, cv=5)\nprint(scores.mean(), '+/-', scores.std())",
        must: ["GridSearchCV(pipe, params, cv=5)", "cross_val_score(inner", "cv=5", "mean"] } }

  );
})();
