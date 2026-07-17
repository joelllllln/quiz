/* Coding mode, batch 5: "Fix it" — the errors every ML coder actually hits. Each task
   shows broken code and its real error message; the drill is recognising the cause,
   rebuilding the corrected program, and writing the fix. Full walks included.
   Loads after data_code_tasks4.js (data_code_walks.js does not touch these keys). */
(function () {
  var T = (window.CODETASKS = window.CODETASKS || []);
  T.push(

    { key: 'fixnotfit', group: 'Fix the bug', title: 'NotFittedError',
      ask: "Broken code calls predict before fit and crashes with NotFittedError. Fix the order.",
      why: "The error means exactly what it says: the model has learned nothing yet.",
      walk: [
        ["# BROKEN:\n# knn = KNeighborsClassifier(n_neighbors=5)\n# y_pred = knn.predict(X_test)   <-- NotFittedError",
         "The crash: 'This KNeighborsClassifier instance is not fitted yet. Call fit with appropriate arguments...' — predict needs learned state that doesn't exist yet."],
        ["knn = KNeighborsClassifier(n_neighbors=5)",
         "Creating the estimator only stores the settings — nothing has been learned."],
        ["knn.fit(X_train, y_train)",
         "THE FIX: fit first. Now the model holds the training data (or weights) that predict will use."],
        ["y_pred = knn.predict(X_test)",
         "Same line that crashed before — now legal, because learned state exists."],
        ["print(accuracy_score(y_test, y_pred))",
         "The lifecycle is always create → fit → predict/score. Any underscore attribute (coef_, feature_importances_) obeys the same rule: it exists only after fit."]],
      mcq: {
        q: "knn.predict(X_test) raises NotFittedError. What is the correct fix?",
        correct: "Call knn.fit(X_train, y_train) before knn.predict(X_test).",
        wrong: [
          "Wrap the predict call in try/except and return an empty prediction list when the error occurs.",
          "Pass the training data to predict as well: knn.predict(X_test, X_train, y_train).",
          "Reinstall scikit-learn, since NotFittedError indicates a corrupted library installation.",
          "Set n_neighbors to a smaller value so the model can predict without prior fitting."],
        explain: "NotFittedError is a lifecycle error: the estimator must learn before it can answer. Swallowing it with try/except hides a logic bug, predict never takes training data, the library is fine, and no hyperparameter setting removes the need to fit." },
      lines: [
        "knn = KNeighborsClassifier(n_neighbors=5)",
        "knn.fit(X_train, y_train)",
        "y_pred = knn.predict(X_test)",
        "print(accuracy_score(y_test, y_pred))"],
      decoys: [
        "y_pred = knn.predict(X_test)  # before fit — the original bug",
        "try:\n    y_pred = knn.predict(X_test)\nexcept: pass"],
      written: {
        prompt: "Write the corrected program: create the KNN classifier (n_neighbors=5), fit it on the training data, THEN predict on X_test and print the accuracy.",
        solution: "knn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train, y_train)\ny_pred = knn.predict(X_test)\nprint(accuracy_score(y_test, y_pred))",
        must: ["KNeighborsClassifier", "fit(X_train, y_train)", "predict(X_test)", "accuracy_score"] } },

    { key: 'fixstring', group: 'Fix the bug', title: "ValueError: could not convert string to float",
      ask: "Fitting crashes on 'could not convert string to float: \\'red\\''. Encode the categoricals.",
      why: "Models compute with numbers; a raw text column anywhere in X sinks the whole fit.",
      walk: [
        ["# BROKEN:\n# clf.fit(X_train, y_train)\n# ValueError: could not convert string to float: 'red'",
         "The traceback names the culprit value — some column still contains text like 'red'. The model tried to do arithmetic on it."],
        ["cat_cols = X_train.select_dtypes(include='object').columns",
         "Find every text column programmatically rather than guessing — dtype 'object' is pandas-speak for strings."],
        ["ct = ColumnTransformer([\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)],\n    remainder='passthrough')",
         "THE FIX: route text columns through an encoder. remainder='passthrough' lets the numeric columns flow through untouched."],
        ["pipe = Pipeline([('prep', ct), ('clf', LogisticRegression(max_iter=1000))])",
         "Bolt the preprocessing onto the model so every future fit and predict encodes consistently."],
        ["pipe.fit(X_train, y_train)",
         "The same fit that crashed — now every value reaching the model is numeric."]],
      mcq: {
        q: "fit raises \"could not convert string to float: 'red'\". What is the right fix?",
        correct: "One-hot encode the categorical columns (e.g. OneHotEncoder in a ColumnTransformer) before the model.",
        wrong: [
          "Delete every row that contains the value 'red' so the conversion no longer fails.",
          "Cast the column with X['colour'].astype(float), which converts category names to numbers.",
          "Rename the column so that scikit-learn recognises it as categorical automatically.",
          "Increase max_iter, since the converter simply ran out of iterations mid-conversion."],
        explain: "The error means a text column reached a numeric algorithm — the fix is encoding. Deleting rows with one value fixes nothing (other strings remain) and biases the data; astype(float) on 'red' raises the very same error; column names carry no type meaning; and max_iter concerns the optimiser, not parsing." },
      lines: [
        "cat_cols = X_train.select_dtypes(include='object').columns",
        "ct = ColumnTransformer([",
        "    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)],",
        "    remainder='passthrough')",
        "pipe = Pipeline([('prep', ct), ('clf', LogisticRegression(max_iter=1000))])",
        "pipe.fit(X_train, y_train)"],
      decoys: [
        "X_train['colour'] = X_train['colour'].astype(float)  # same error again",
        "X_train = X_train[X_train['colour'] != 'red']  # the other strings remain"],
      written: {
        prompt: "Write the fix: select the object-dtype columns, one-hot encode them in a ColumnTransformer (remainder='passthrough'), put it in a pipeline before LogisticRegression, and fit.",
        solution: "cat_cols = X_train.select_dtypes(include='object').columns\nct = ColumnTransformer([\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)],\n    remainder='passthrough')\npipe = Pipeline([('prep', ct), ('clf', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)",
        must: ["select_dtypes", "OneHotEncoder", "ColumnTransformer", "remainder='passthrough'", "fit(X_train, y_train)"] } },

    { key: 'fixshape', group: 'Fix the bug', title: 'Inconsistent numbers of samples',
      ask: "Fit crashes: 'Found input variables with inconsistent numbers of samples: [800, 1000]'. Realign X and y.",
      why: "Rows were dropped from X but not y — the features and labels no longer line up.",
      walk: [
        ["# BROKEN:\n# X_train = X_train.dropna()          <-- 200 rows vanish from X only\n# clf.fit(X_train, y_train)\n# ValueError: inconsistent numbers of samples: [800, 1000]",
         "dropna removed rows from the features, but the labels kept all 1000 — row i of X no longer matches row i of y."],
        ["mask = X_train.notna().all(axis=1)",
         "THE FIX, step 1: build a boolean mask of complete rows — decided once, on the features."],
        ["X_train, y_train = X_train[mask], y_train[mask]",
         "Apply the SAME mask to both, so features and labels shrink together, still aligned."],
        ["clf.fit(X_train, y_train)",
         "800 and 800 — the fit runs. (The deeper alternative: impute instead of dropping, and keep all 1000.)"],
        ["print(X_train.shape[0] == y_train.shape[0])",
         "The invariant worth checking after any row surgery: X and y must always have identical lengths."]],
      mcq: {
        q: "After X_train = X_train.dropna(), fit reports inconsistent sample counts. What is the correct fix?",
        correct: "Drop the same rows from y too — e.g. build a not-null mask on X and apply it to both X and y.",
        wrong: [
          "Truncate y to the new length of X with y_train = y_train[:len(X_train)] so the counts match.",
          "Convert y to a NumPy array, since the error is caused by mixing pandas and NumPy types.",
          "Drop rows from y at random until its length equals the length of the cleaned X.",
          "Sort both X and y by their values so scikit-learn can align them automatically."],
        explain: "The counts must match AND the pairing must be preserved. Truncating y keeps the wrong labels against the wrong rows (silent catastrophe — it 'fixes' the error while corrupting the data); type conversion is irrelevant; random dropping destroys the pairing; and nothing aligns rows by sorting values." },
      lines: [
        "mask = X_train.notna().all(axis=1)",
        "X_train, y_train = X_train[mask], y_train[mask]",
        "clf.fit(X_train, y_train)",
        "print(X_train.shape[0] == y_train.shape[0])"],
      decoys: [
        "y_train = y_train[:len(X_train)]  # counts match, pairs are now WRONG",
        "X_train = X_train.dropna()  # the original one-sided drop"],
      written: {
        prompt: "Write the fix: a notna-all mask over X_train's rows, applied to BOTH X_train and y_train, then fit.",
        solution: "mask = X_train.notna().all(axis=1)\nX_train, y_train = X_train[mask], y_train[mask]\nclf.fit(X_train, y_train)",
        must: ["notna()", "all(axis=1)", "X_train[mask]", "y_train[mask]", "fit(X_train, y_train)"] } },

    { key: 'fixleak', group: 'Fix the bug', title: 'The 100% accuracy "bug"',
      ask: "The model scores 99.9% on the test set. Nothing crashed — find and remove the leak.",
      why: "Too good IS the error message. Some feature is telling the model the answer.",
      walk: [
        ["# SUSPICIOUS:\n# pipe.fit(X_train, y_train)\n# print(pipe.score(X_test, y_test))   --> 0.999",
         "No exception, no warning — just a score that real problems don't produce. Treat it as a crash report."],
        ["print(dict(zip(X_train.columns,\n    pipe.named_steps['clf'].feature_importances_)))",
         "Interrogate the model: which feature is doing the work? A leak usually dominates the importances outright."],
        ["# 'account_closed_date': 0.94   <-- filled in AFTER the churn we predict",
         "The culprit: a column recorded after the outcome. At prediction time it wouldn't exist — the model is reading tomorrow's newspaper."],
        ["X_train = X_train.drop(columns=['account_closed_date'])\nX_test = X_test.drop(columns=['account_closed_date'])",
         "THE FIX: remove it from both sets. Leaks are removed by understanding what each column MEANS, not by any statistical test."],
        ["pipe.fit(X_train, y_train)\nprint(pipe.score(X_test, y_test))",
         "The score falls to something believable — and that lower number is the real, deployable performance."]],
      mcq: {
        q: "A churn model scores 99.9% out of the box. What is the most likely cause and fix?",
        correct: "A leaky feature recorded after the outcome (like a closure date) — find it via importances and drop it.",
        wrong: [
          "The model is simply excellent; document the result and promote it to production quickly.",
          "The test set is too small; doubling its size will bring the accuracy down to a fair level.",
          "The random seed is lucky; rerunning with several seeds will give an honest average.",
          "Accuracy is the wrong metric; switching to F1 would reveal the true lower performance."],
        explain: "Real tabular problems almost never yield 99.9% — the smell is target leakage, confirmed by one dominant importance and cured by dropping the column. Test size and seeds change scores by noise-sized amounts, and a leak inflates F1 just as happily as accuracy." },
      lines: [
        "print(dict(zip(X_train.columns,",
        "    pipe.named_steps['clf'].feature_importances_)))",
        "X_train = X_train.drop(columns=['account_closed_date'])",
        "X_test = X_test.drop(columns=['account_closed_date'])",
        "pipe.fit(X_train, y_train)",
        "print(pipe.score(X_test, y_test))"],
      decoys: [
        "# ship it — 99.9% is a great score",
        "X_test = X_test.sample(n=2000)  # a bigger test set won't fix a leak"],
      written: {
        prompt: "Write the fix: print the features zipped with the classifier's importances, drop 'account_closed_date' from both X_train and X_test, refit and rescore.",
        solution: "print(dict(zip(X_train.columns,\n    pipe.named_steps['clf'].feature_importances_)))\nX_train = X_train.drop(columns=['account_closed_date'])\nX_test = X_test.drop(columns=['account_closed_date'])\npipe.fit(X_train, y_train)\nprint(pipe.score(X_test, y_test))",
        must: ["feature_importances_", "drop(columns=['account_closed_date'])", "X_test", "fit(X_train, y_train)"] } },

    { key: 'fixconverge', group: 'Fix the bug', title: 'ConvergenceWarning',
      ask: "Logistic regression warns 'lbfgs failed to converge'. Fix it properly — scaling first, then iterations.",
      why: "Unscaled features stretch the loss surface into a canyon the optimiser can't finish crossing.",
      walk: [
        ["# WARNING:\n# ConvergenceWarning: lbfgs failed to converge (status=1)\n# STOP: TOTAL NO. of ITERATIONS REACHED LIMIT",
         "Not an error — worse: the model 'works' with silently unfinished, unreliable coefficients."],
        ["pipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression(max_iter=1000))])",
         "THE FIX has two parts, in order of importance: standardise the features (the usual root cause — a salary column in the thousands next to ratios near 1), and raise the iteration budget."],
        ["pipe.fit(X_train, y_train)",
         "Refit. On scaled features, lbfgs typically converges in a fraction of the old iterations."],
        ["print(pipe.named_steps['clf'].n_iter_)",
         "Check the learned iteration count: comfortably under the cap means genuine convergence, not a raised ceiling being hit again."]],
      mcq: {
        q: "LogisticRegression emits ConvergenceWarning. What is the best fix?",
        correct: "Standardise the features (e.g. StandardScaler in a pipeline) and raise max_iter if needed.",
        wrong: [
          "Suppress the warning with warnings.filterwarnings('ignore') since fitting still completed.",
          "Switch to a decision tree, because linear models cannot handle more than ten features.",
          "Reduce max_iter so the optimiser stops sooner and the warning has no time to appear.",
          "Shuffle the training rows, since convergence failures come from ordered data."],
        explain: "The warning signals an unfinished optimisation — usually caused by wildly different feature scales. Silencing it keeps the unreliable coefficients; trees are fine but that's dodging, not fixing; LOWER max_iter guarantees non-convergence; and row order doesn't affect a full-batch optimiser." },
      lines: [
        "pipe = Pipeline([('scaler', StandardScaler()),",
        "                 ('clf', LogisticRegression(max_iter=1000))])",
        "pipe.fit(X_train, y_train)",
        "print(pipe.named_steps['clf'].n_iter_)"],
      decoys: [
        "warnings.filterwarnings('ignore')  # hides the problem, keeps bad coefficients",
        "clf = LogisticRegression(max_iter=10)  # even fewer iterations"],
      written: {
        prompt: "Write the fix: a scaler + LogisticRegression(max_iter=1000) pipeline, fitted on the training data; print the classifier's n_iter_.",
        solution: "pipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression(max_iter=1000))])\npipe.fit(X_train, y_train)\nprint(pipe.named_steps['clf'].n_iter_)",
        must: ["StandardScaler", "max_iter=1000", "fit(X_train, y_train)", "n_iter_"] } },

    { key: 'fixproba', group: 'Fix the bug', title: 'AUC of exactly 0.5 (or a proba crash)',
      ask: "roc_auc_score returns ~0.5 for a decent model — or crashes on shape. Feed it the right column.",
      why: "Passing hard labels (or the whole probability matrix) to AUC is the classic silent metric bug.",
      walk: [
        ["# BROKEN:\n# auc = roc_auc_score(y_test, clf.predict(X_test))      <-- labels: AUC degraded\n# auc = roc_auc_score(y_test, clf.predict_proba(X_test)) <-- matrix: shape error",
         "Two versions of one mistake: hard 0/1 labels throw away the ranking AUC measures; the full two-column matrix has the wrong shape for a binary score."],
        ["proba = clf.predict_proba(X_test)[:, 1]",
         "THE FIX: the positive-class column, one probability per row — the ranking scores AUC actually wants."],
        ["auc = roc_auc_score(y_test, proba)",
         "Truth first, scores second. The same model that 'scored 0.5' now shows its real discrimination."],
        ["print(auc)",
         "Rule of thumb: threshold metrics (accuracy, F1) eat predict(); ranking and probability metrics (AUC, log loss, Brier) eat predict_proba."]],
      mcq: {
        q: "roc_auc_score(y_test, clf.predict(X_test)) gives a suspiciously low AUC. What is the fix?",
        correct: "Score the positive-class probabilities instead: roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1]).",
        wrong: [
          "Multiply the predictions by the model's confidence: clf.predict(X_test) * clf.score(X_test, y_test).",
          "Reverse the arguments: roc_auc_score(clf.predict(X_test), y_test) restores the ranking.",
          "Use roc_auc_score(y_test, clf.predict(X_test), normalize=True) to rescale the labels.",
          "AUC cannot be computed for binary classifiers; switch the metric to accuracy instead."],
        explain: "AUC ranks scores, so it needs the graded probabilities — column [:, 1] for binary. Scaling hard labels by a constant changes no ordering; reversing arguments computes nonsense; there is no normalize parameter; and binary classification is AUC's home ground." },
      lines: [
        "proba = clf.predict_proba(X_test)[:, 1]",
        "auc = roc_auc_score(y_test, proba)",
        "print(auc)"],
      decoys: [
        "auc = roc_auc_score(y_test, clf.predict(X_test))  # the original bug",
        "auc = roc_auc_score(y_test, clf.predict_proba(X_test))  # whole matrix, wrong shape"],
      written: {
        prompt: "Write the fix: take the positive-class probability column for X_test and pass it (after y_test) to roc_auc_score; print the result.",
        solution: "proba = clf.predict_proba(X_test)[:, 1]\nauc = roc_auc_score(y_test, proba)\nprint(auc)",
        must: ["predict_proba(X_test)", "[:, 1]", "roc_auc_score(y_test, proba)"] } }

  );
})();
