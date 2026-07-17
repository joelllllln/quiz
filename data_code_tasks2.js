/* Coding mode, batch 2: more sklearn workflow drills — imputation, feature selection,
   randomised search, threshold tuning, imbalance, time-series CV, DBSCAN, hierarchical
   clustering, and saving models. Same three-level format. Loads after data_code_tasks.js. */
(function () {
  var T = (window.CODETASKS = window.CODETASKS || []);
  T.push(

    { key: 'impute', group: 'Preparing data', title: 'Impute missing values',
      ask: 'Fill missing numeric values with the median — learned from training data only.',
      why: 'Models reject NaNs; the imputer patches them with a value learned honestly.',
      mcq: {
        q: 'Which snippet imputes missing values without leaking test data?',
        correct: "imp = SimpleImputer(strategy='median')\nX_train_i = imp.fit_transform(X_train)\nX_test_i = imp.transform(X_test)",
        wrong: [
          "imp = SimpleImputer(strategy='median')\nX_train_i = imp.fit_transform(X_train)\nX_test_i = imp.fit_transform(X_test)",
          "X_train = X_train.dropna()\nX_test = X_test.dropna()\ny_train = y_train  # labels unchanged",
          "imp = SimpleImputer(strategy='median')\nX_all = imp.fit_transform(pd.concat([X_train, X_test]))",
          "X_train_i = X_train.fillna(X_test.median())\nX_test_i = X_test.fillna(X_test.median())"],
        explain: "Fit the imputer on train (it learns the training medians), transform both sets with those values. Refitting on test leaks its medians; dropping rows desynchronises X from y; concatenating before fitting is the classic pre-split leak; and filling with TEST medians leaks directly." },
      lines: [
        "from sklearn.impute import SimpleImputer",
        "imp = SimpleImputer(strategy='median')",
        "X_train_i = imp.fit_transform(X_train)",
        "X_test_i = imp.transform(X_test)"],
      decoys: [
        "X_test_i = imp.fit_transform(X_test)",
        "imp = SimpleImputer(strategy=median)"],
      written: {
        prompt: 'Write the code: a median SimpleImputer, fit-transformed on X_train, then transform (only) X_test.',
        solution: "from sklearn.impute import SimpleImputer\nimp = SimpleImputer(strategy='median')\nX_train_i = imp.fit_transform(X_train)\nX_test_i = imp.transform(X_test)",
        must: ["SimpleImputer", "strategy='median'", "fit_transform(X_train)", "imp.transform(X_test)"] } },

    { key: 'fsel', group: 'Preparing data', title: 'Select the k best features',
      ask: 'Keep the 10 most informative features — selected inside a pipeline so CV stays honest.',
      why: 'Selection is a learned step: outside the pipeline, it peeks at the validation folds.',
      mcq: {
        q: 'Which snippet selects features without contaminating cross-validation?',
        correct: "pipe = Pipeline([('select', SelectKBest(f_classif, k=10)),\n                 ('clf', LogisticRegression())])\nscores = cross_val_score(pipe, X_train, y_train, cv=5)",
        wrong: [
          "X_sel = SelectKBest(f_classif, k=10).fit_transform(X, y)\nscores = cross_val_score(LogisticRegression(), X_sel, y, cv=5)",
          "pipe = Pipeline([('clf', LogisticRegression()),\n                 ('select', SelectKBest(f_classif, k=10))])\nscores = cross_val_score(pipe, X_train, y_train, cv=5)",
          "sel = SelectKBest(f_classif, k=10)\nsel.fit(X_test, y_test)\nX_train_s = sel.transform(X_train)",
          "X_sel = X_train[X_train.columns[:10]]\nscores = cross_val_score(LogisticRegression(), X_sel, y_train, cv=5)"],
        explain: "Selection inside the pipeline refits on each fold's training part only — the leak-safe pattern. Selecting on all data first is the textbook selection leak; the selector must come BEFORE the classifier; fitting it on test data leaks; and taking the first 10 columns selects nothing." },
      lines: [
        "from sklearn.feature_selection import SelectKBest, f_classif",
        "pipe = Pipeline([('select', SelectKBest(f_classif, k=10)),",
        "                 ('clf', LogisticRegression())])",
        "scores = cross_val_score(pipe, X_train, y_train, cv=5)",
        "print(scores.mean())"],
      decoys: [
        "X_sel = SelectKBest(f_classif, k=10).fit_transform(X, y)",
        "                 ('select', SelectKBest(f_classif, k=10))])  # after the model"],
      written: {
        prompt: 'Write the code: a Pipeline with SelectKBest (f_classif, k=10) then LogisticRegression, cross-validated (cv=5) on the training data.',
        solution: "from sklearn.feature_selection import SelectKBest, f_classif\npipe = Pipeline([('select', SelectKBest(f_classif, k=10)),\n                 ('clf', LogisticRegression())])\nscores = cross_val_score(pipe, X_train, y_train, cv=5)\nprint(scores.mean())",
        must: ["SelectKBest", "f_classif", "k=10", "Pipeline", "cross_val_score", "cv=5"] } },

    { key: 'rsearch', group: 'Tuning', title: 'Randomised search',
      ask: 'Search a large hyperparameter space with a fixed budget of random trials.',
      why: 'Grids explode combinatorially; random search spends a fixed budget where it counts.',
      mcq: {
        q: 'Which snippet correctly runs a randomised hyperparameter search?',
        correct: "dist = {'n_estimators': randint(100, 500), 'max_depth': randint(3, 15)}\nsearch = RandomizedSearchCV(RandomForestClassifier(), dist, n_iter=20, cv=5, random_state=42)\nsearch.fit(X_train, y_train)",
        wrong: [
          "dist = {'n_estimators': randint(100, 500), 'max_depth': randint(3, 15)}\nsearch = RandomizedSearchCV(RandomForestClassifier(), dist, n_iter=20, cv=5)\nsearch.fit(X_test, y_test)",
          "search = RandomizedSearchCV(RandomForestClassifier(), n_iter=20, cv=5)\nsearch.fit(X_train, y_train)\nprint(search.best_params_)",
          "for i in range(20):\n    rf = RandomForestClassifier(n_estimators=random.randint(100, 500))\n    rf.fit(X_train, y_train)\nprint(rf.score(X_train, y_train))",
          "dist = {'n_estimators': [100, 500], 'max_depth': [3, 15]}\nsearch = GridSearchCV(RandomForestClassifier(), dist, n_iter=20)\nsearch.fit(X_train, y_train)"],
        explain: "RandomizedSearchCV takes distributions (scipy's randint), a trial budget (n_iter) and CV — fitted on training data. Tuning on test burns the final estimate; omitting the distributions gives it nothing to search; the manual loop scores on train; and GridSearchCV has no n_iter — that's the point of the randomised version." },
      lines: [
        "from sklearn.model_selection import RandomizedSearchCV",
        "from scipy.stats import randint",
        "dist = {'n_estimators': randint(100, 500),",
        "        'max_depth': randint(3, 15)}",
        "search = RandomizedSearchCV(RandomForestClassifier(), dist,",
        "                            n_iter=20, cv=5, random_state=42)",
        "search.fit(X_train, y_train)",
        "print(search.best_params_)"],
      decoys: [
        "search.fit(X_test, y_test)",
        "search = GridSearchCV(RandomForestClassifier(), dist, n_iter=20)"],
      written: {
        prompt: 'Write the code: RandomizedSearchCV over n_estimators randint(100,500) and max_depth randint(3,15), n_iter=20, cv=5, fit on train, print best_params_.',
        solution: "from sklearn.model_selection import RandomizedSearchCV\nfrom scipy.stats import randint\ndist = {'n_estimators': randint(100, 500),\n        'max_depth': randint(3, 15)}\nsearch = RandomizedSearchCV(RandomForestClassifier(), dist,\n                            n_iter=20, cv=5, random_state=42)\nsearch.fit(X_train, y_train)\nprint(search.best_params_)",
        must: ["RandomizedSearchCV", "randint", "n_iter=20", "cv=5", "fit(X_train, y_train)", "best_params_"] } },

    { key: 'threshold', group: 'Evaluating', title: 'Tune the decision threshold',
      ask: 'Move the classification cutoff to trade precision against recall deliberately.',
      why: '0.5 assumes both errors cost the same — real problems rarely do.',
      mcq: {
        q: 'How do you correctly apply a custom threshold of 0.3?',
        correct: "proba = clf.predict_proba(X_test)[:, 1]\ny_pred = (proba >= 0.3).astype(int)\nprint(classification_report(y_test, y_pred))",
        wrong: [
          "y_pred = clf.predict(X_test, threshold=0.3)\nprint(classification_report(y_test, y_pred))",
          "clf = LogisticRegression(threshold=0.3)\nclf.fit(X_train, y_train)\ny_pred = clf.predict(X_test)",
          "proba = clf.predict_proba(X_test)[:, 1]\ny_pred = (proba >= 0.3)\ny_pred = y_pred * 0.3",
          "proba = clf.predict(X_test)\ny_pred = (proba >= 0.3).astype(int)"],
        explain: "Thresholding is done by YOU on the probabilities: take the positive-class column, compare to the cutoff, cast to int. predict() has no threshold argument, the constructor has no threshold parameter, multiplying booleans by 0.3 makes nonsense, and predict() returns labels — thresholding those does nothing." },
      lines: [
        "proba = clf.predict_proba(X_test)[:, 1]",
        "y_pred_default = (proba >= 0.5).astype(int)",
        "y_pred_lower = (proba >= 0.3).astype(int)",
        "print(classification_report(y_test, y_pred_default))",
        "print(classification_report(y_test, y_pred_lower))"],
      decoys: [
        "y_pred = clf.predict(X_test, threshold=0.3)",
        "proba = clf.predict(X_test)[:, 1]"],
      written: {
        prompt: 'Write the code: get positive-class probabilities for X_test, build predictions at threshold 0.3, print the classification report.',
        solution: "proba = clf.predict_proba(X_test)[:, 1]\ny_pred = (proba >= 0.3).astype(int)\nprint(classification_report(y_test, y_pred))",
        must: ["predict_proba(X_test)", "[:, 1]", "0.3", "astype(int)", "classification_report"] } },

    { key: 'imbal', group: 'Evaluating', title: 'Handle class imbalance',
      ask: 'Split with stratification, weight the classes, and score with PR-AUC — not accuracy.',
      why: 'At 99:1, accuracy applauds a useless model; weights and the right metric fix the incentives.',
      mcq: {
        q: 'Which snippet handles a heavily imbalanced target correctly?',
        correct: "X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=42)\nclf = LogisticRegression(class_weight='balanced', max_iter=1000)\nclf.fit(X_tr, y_tr)\nprint(average_precision_score(y_te, clf.predict_proba(X_te)[:, 1]))",
        wrong: [
          "X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=42)\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_tr, y_tr)\ny_pred = clf.predict(X_te)\nprint(accuracy_score(y_te, y_pred))\nprint('great model!' if accuracy_score(y_te, y_pred) > 0.95 else 'tune more')",
          "X_bal, y_bal = SMOTE().fit_resample(X, y)\nX_tr, X_te, y_tr, y_te = train_test_split(X_bal, y_bal)\nclf.fit(X_tr, y_tr)\nprint(accuracy_score(y_te, clf.predict(X_te)))",
          "y_balanced = y.sample(frac=1.0)\nclf = LogisticRegression(class_weight='balanced')\nclf.fit(X, y_balanced)",
          "clf = LogisticRegression(class_weight=99)\nclf.fit(X_tr, y_tr)\nprint(clf.score(X_te, y_te))"],
        explain: "Stratify the split, weight the loss ('balanced'), judge with a prevalence-aware metric (PR-AUC via average_precision_score). Accuracy on an unstratified split is the classic trap; SMOTE before splitting leaks synthetic copies into the test set; shuffling labels destroys the data; and class_weight takes a dict or 'balanced', not a number." },
      lines: [
        "from sklearn.metrics import average_precision_score",
        "X_tr, X_te, y_tr, y_te = train_test_split(",
        "    X, y, stratify=y, random_state=42)",
        "clf = LogisticRegression(class_weight='balanced', max_iter=1000)",
        "clf.fit(X_tr, y_tr)",
        "proba = clf.predict_proba(X_te)[:, 1]",
        "print(average_precision_score(y_te, proba))"],
      decoys: [
        "X_bal, y_bal = SMOTE().fit_resample(X, y)  # before the split",
        "print(accuracy_score(y_te, clf.predict(X_te)))  # accuracy, at 99:1"],
      written: {
        prompt: 'Write the code: stratified split (stratify=y), LogisticRegression with class_weight=‘balanced’, fit, and print the average precision (PR-AUC) on the test set.',
        solution: "X_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, stratify=y, random_state=42)\nclf = LogisticRegression(class_weight='balanced', max_iter=1000)\nclf.fit(X_tr, y_tr)\nprint(average_precision_score(y_te, clf.predict_proba(X_te)[:, 1]))",
        must: ["stratify=y", "class_weight='balanced'", "average_precision_score", "predict_proba"] } },

    { key: 'tssplit', group: 'Evaluating', title: 'Time-series cross-validation',
      ask: 'Validate a forecaster with time-ordered splits — always train on the past, test on the future.',
      why: 'Shuffled CV on time data lets the model study next week to predict yesterday.',
      mcq: {
        q: 'Which snippet validates correctly on time-ordered data?',
        correct: "tscv = TimeSeriesSplit(n_splits=5)\nscores = cross_val_score(model, X, y, cv=tscv)\nprint(scores.mean())",
        wrong: [
          "scores = cross_val_score(model, X, y, cv=5)\nprint(scores.mean())  # default shuffled folds",
          "X_shuf, y_shuf = shuffle(X, y, random_state=42)\ntscv = TimeSeriesSplit(n_splits=5)\nscores = cross_val_score(model, X_shuf, y_shuf, cv=tscv)",
          "tscv = TimeSeriesSplit(n_splits=5, shuffle=True)\nscores = cross_val_score(model, X, y, cv=tscv)",
          "X_train, X_test = train_test_split(X, test_size=0.2, shuffle=True)\nmodel.fit(X_train)\nprint(model.score(X_test))"],
        explain: "TimeSeriesSplit makes expanding-window folds: train on rows 1..k, test on the block after — the arrow of time preserved. Default k-fold ignores order; shuffling first destroys it; TimeSeriesSplit has no shuffle option (that's the point); and a shuffled holdout leaks the future too." },
      lines: [
        "from sklearn.model_selection import TimeSeriesSplit",
        "tscv = TimeSeriesSplit(n_splits=5)",
        "scores = cross_val_score(model, X, y, cv=tscv)",
        "print(scores)",
        "print('mean:', scores.mean())"],
      decoys: [
        "X, y = shuffle(X, y)  # time data must NOT be shuffled",
        "scores = cross_val_score(model, X, y, cv=5)  # ignores time order"],
      written: {
        prompt: 'Write the code: a TimeSeriesSplit with 5 splits, passed as cv to cross_val_score on X and y; print the mean score.',
        solution: "from sklearn.model_selection import TimeSeriesSplit\ntscv = TimeSeriesSplit(n_splits=5)\nscores = cross_val_score(model, X, y, cv=tscv)\nprint(scores.mean())",
        must: ["TimeSeriesSplit", "n_splits=5", "cross_val_score", "cv=tscv", "mean"] } },

    { key: 'dbscan', group: 'Unsupervised', title: 'DBSCAN clustering',
      ask: 'Cluster scaled data by density; count the clusters and the noise points.',
      why: 'No k to declare — but eps and min_samples decide what counts as "dense".',
      mcq: {
        q: 'Which snippet runs DBSCAN and counts clusters and noise correctly?',
        correct: "db = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.fit_predict(X_scaled)\nn_clusters = len(set(labels)) - (1 if -1 in labels else 0)\nn_noise = (labels == -1).sum()",
        wrong: [
          "db = DBSCAN(n_clusters=3, eps=0.5)\nlabels = db.fit_predict(X_scaled)\nn_clusters = 3",
          "db = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.predict(X_scaled)\nn_noise = (labels == 0).sum()",
          "db = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.fit_predict(X_scaled)\nn_clusters = labels.max()\nn_noise = (labels == None).sum()",
          "db = DBSCAN(eps=0.5, min_samples=5)\ndb.fit(X_scaled, y)\nprint(db.score(X_scaled, y))"],
        explain: "DBSCAN has no n_clusters — the count emerges; noise is labelled −1, so subtract it when counting distinct labels. There's no separate predict for new points, labels.max() miscounts when noise exists (and is off by one anyway), and DBSCAN is unsupervised — no y, no score." },
      lines: [
        "from sklearn.cluster import DBSCAN",
        "db = DBSCAN(eps=0.5, min_samples=5)",
        "labels = db.fit_predict(X_scaled)",
        "n_clusters = len(set(labels)) - (1 if -1 in labels else 0)",
        "n_noise = (labels == -1).sum()",
        "print(n_clusters, 'clusters,', n_noise, 'noise points')"],
      decoys: [
        "db = DBSCAN(n_clusters=3)",
        "db.fit(X_scaled, y)"],
      written: {
        prompt: 'Write the code: DBSCAN with eps=0.5 and min_samples=5, fit_predict on X_scaled, then count the clusters (excluding −1) and the noise points.',
        solution: "from sklearn.cluster import DBSCAN\ndb = DBSCAN(eps=0.5, min_samples=5)\nlabels = db.fit_predict(X_scaled)\nn_clusters = len(set(labels)) - (1 if -1 in labels else 0)\nn_noise = (labels == -1).sum()",
        must: ["DBSCAN", "eps=0.5", "min_samples=5", "fit_predict(X_scaled)", "-1"] } },

    { key: 'hier', group: 'Unsupervised', title: 'Hierarchical clustering',
      ask: 'Agglomeratively cluster scaled data with Ward linkage into 3 flat clusters.',
      why: 'Bottom-up merging — the dendrogram is there if you want it, flat labels if you don\'t.',
      mcq: {
        q: 'Which snippet runs agglomerative clustering correctly?',
        correct: "agg = AgglomerativeClustering(n_clusters=3, linkage='ward')\nlabels = agg.fit_predict(X_scaled)",
        wrong: [
          "agg = AgglomerativeClustering(n_clusters=3, linkage='ward', metric='manhattan')\nlabels = agg.fit_predict(X_scaled)",
          "agg = AgglomerativeClustering(n_clusters=3)\nlabels = agg.predict(X_scaled)",
          "agg = AgglomerativeClustering(linkage='ward')\nagg.fit(X_scaled, y)\nlabels = agg.labels_",
          "agg = AgglomerativeClustering(n_clusters=3, linkage='ward')\nlabels = agg.fit_predict(y)"],
        explain: "n_clusters (or distance_threshold) plus a linkage; Ward requires Euclidean distance, so pairing it with Manhattan raises an error. There's no standalone predict (no centroids to assign with), no y anywhere, and clustering runs on features — never the target." },
      lines: [
        "from sklearn.cluster import AgglomerativeClustering",
        "agg = AgglomerativeClustering(n_clusters=3, linkage='ward')",
        "labels = agg.fit_predict(X_scaled)",
        "print(pd.Series(labels).value_counts())"],
      decoys: [
        "agg = AgglomerativeClustering(linkage='ward', metric='manhattan')",
        "labels = agg.predict(X_scaled)  # no predict without fit"],
      written: {
        prompt: 'Write the code: AgglomerativeClustering with n_clusters=3 and Ward linkage, fit_predict on X_scaled into labels.',
        solution: "from sklearn.cluster import AgglomerativeClustering\nagg = AgglomerativeClustering(n_clusters=3, linkage='ward')\nlabels = agg.fit_predict(X_scaled)",
        must: ["AgglomerativeClustering", "n_clusters=3", "linkage='ward'", "fit_predict(X_scaled)"] } },

    { key: 'save', group: 'Putting it together', title: 'Save and load a trained model',
      ask: 'Persist the fitted pipeline to disk and load it back for predictions.',
      why: 'Training is a one-off; the saved artifact is what production actually runs.',
      mcq: {
        q: 'Which snippet correctly saves and reloads a fitted model?',
        correct: "joblib.dump(pipe, 'model.joblib')\npipe_loaded = joblib.load('model.joblib')\nprint(pipe_loaded.predict(X_new))",
        wrong: [
          "pipe.save('model.joblib')\npipe_loaded = Pipeline.open('model.joblib')\nprint(pipe_loaded.predict(X_new))",
          "with open('model.txt', 'w') as f:\n    f.write(str(pipe))\npipe_loaded = eval(open('model.txt').read())",
          "joblib.dump('model.joblib', pipe)\npipe_loaded = joblib.load(pipe)",
          "joblib.dump(pipe, 'model.joblib')\npipe_loaded = joblib.load('model.joblib')\npipe_loaded.fit(X_new)\nprint(pipe_loaded.predict(X_new))"],
        explain: "joblib.dump(object, path) then joblib.load(path) — the loaded pipeline predicts immediately, weights intact. Estimators have no .save method, str() writes a description rather than the model, dump's arguments are (object, path) in that order, and refitting on new unlabelled data would destroy the trained model." },
      lines: [
        "import joblib",
        "pipe.fit(X_train, y_train)",
        "joblib.dump(pipe, 'model.joblib')",
        "pipe_loaded = joblib.load('model.joblib')",
        "print(pipe_loaded.predict(X_new))"],
      decoys: [
        "joblib.dump('model.joblib', pipe)  # arguments reversed",
        "pipe_loaded.fit(X_new)  # refitting destroys the trained model"],
      written: {
        prompt: 'Write the code: dump the fitted pipe to ‘model.joblib’ with joblib, load it back as pipe_loaded, and predict on X_new.',
        solution: "import joblib\njoblib.dump(pipe, 'model.joblib')\npipe_loaded = joblib.load('model.joblib')\nprint(pipe_loaded.predict(X_new))",
        must: ["joblib.dump(pipe", "model.joblib", "joblib.load", "predict(X_new)"] } }

  );
})();
