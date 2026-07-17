/* Worked examples ("See it") for the batch-1 and batch-2 coding tasks: each task's
   solution walked through line by line in plain English. Loads after the task files. */
(function () {
  var walks = {

    split: [
      ["from sklearn.model_selection import train_test_split",
       "One import: the splitting function lives in model_selection."],
      ["X = df.drop(columns=['target'])\ny = df['target']",
       "Separate the questions from the answers: X is every column except the target, y is the target alone."],
      ["X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
       "One call, four outputs — X halves first, then y halves. test_size=0.2 keeps 20% back; random_state makes the same split happen every run."],
      ["print(X_train.shape, X_test.shape)",
       "Sanity check: row counts should be ~80/20, and columns identical in both."]],

    scale: [
      ["from sklearn.preprocessing import StandardScaler",
       "The z-score scaler: subtract the mean, divide by the standard deviation."],
      ["scaler = StandardScaler()",
       "Create it unconfigured — it hasn't seen any data yet."],
      ["X_train_s = scaler.fit_transform(X_train)",
       "fit_transform = two steps in one: LEARN the training means and spreads, then apply them."],
      ["X_test_s = scaler.transform(X_test)",
       "Only transform — the test set is scaled with the TRAINING statistics. Refitting here would leak test information."]],

    knn: [
      ["from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import accuracy_score",
       "The model and the scorer."],
      ["knn = KNeighborsClassifier(n_neighbors=5)",
       "k=5: each prediction polls the 5 nearest training points. The parameter is n_neighbors, not k."],
      ["knn.fit(X_train, y_train)",
       "For KNN 'fitting' just stores the training data — the real work happens at prediction."],
      ["y_pred = knn.predict(X_test)",
       "For each test row: find the 5 closest training rows, take the majority vote."],
      ["print(accuracy_score(y_test, y_pred))",
       "Compare predictions with the truth — always on data the model never trained on."]],

    cv: [
      ["from sklearn.model_selection import cross_val_score",
       "The one-liner that runs the whole cross-validation loop for you."],
      ["model = LogisticRegression(max_iter=1000)",
       "Pass the model UNFITTED — cross_val_score does its own fitting, five times."],
      ["scores = cross_val_score(model, X_train, y_train, cv=5)",
       "Five rounds: each fifth of the training data takes one turn as the mini test set. The real test set stays untouched."],
      ["print(scores)\nprint('mean:', scores.mean())",
       "Five scores and their average — the average is your estimate, the spread is your uncertainty."]],

    pipeline: [
      ["from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression",
       "The chain container plus its two links."],
      ["pipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression())])",
       "Named steps in processing order: scale first, model last. The names become addresses (clf__C) for tuning later."],
      ["pipe.fit(X_train, y_train)",
       "One fit runs the whole chain: the scaler fits-and-transforms, then the model trains on the scaled output."],
      ["print(pipe.score(X_test, y_test))",
       "Scoring pushes the test data through the SAME fitted scaler automatically — the leak-safety is built in."]],

    grid: [
      ["from sklearn.model_selection import GridSearchCV",
       "The exhaustive tuner: tries every value, cross-validated."],
      ["params = {'n_neighbors': [3, 5, 7, 9]}",
       "The search space: a dict of parameter name → values to try. Spelling must match the estimator's parameter exactly."],
      ["grid = GridSearchCV(KNeighborsClassifier(), params, cv=5)",
       "Wrap an unfitted model with the grid and a CV scheme — 4 values × 5 folds = 20 fits coming."],
      ["grid.fit(X_train, y_train)",
       "Everything happens on the TRAINING data; the test set plays no part in choosing k."],
      ["print(grid.best_params_)\nprint(grid.best_score_)",
       "The winning setting and its cross-validated score. grid itself is now a fitted model using the winner (refit on all training data)."]],

    logreg: [
      ["from sklearn.linear_model import LogisticRegression",
       "The linear classifier that outputs probabilities."],
      ["clf = LogisticRegression(max_iter=1000)",
       "A higher iteration cap heads off the classic ConvergenceWarning."],
      ["clf.fit(X_train, y_train)",
       "Learn the weights: one coefficient per feature, plus an intercept."],
      ["proba = clf.predict_proba(X_test)[:, 1]",
       "predict_proba gives one column per class; [:, 1] slices out the positive-class column — one probability per row."],
      ["y_pred = (proba >= 0.5).astype(int)",
       "The threshold is YOUR decision, applied after the model: compare, then cast True/False to 1/0."]],

    metrics: [
      ["from sklearn.metrics import confusion_matrix, classification_report",
       "The full picture (matrix) and the per-class summary (report)."],
      ["y_pred = clf.predict(X_test)",
       "Hard labels for the test rows — these metrics compare labels with labels."],
      ["print(confusion_matrix(y_test, y_pred))",
       "Truth first, predictions second. In sklearn, rows are the truth, columns the predictions — mixing that up swaps precision and recall."],
      ["print(classification_report(y_test, y_pred))",
       "Precision, recall, F1 and support for every class — the fastest way to spot a class the model quietly ignores."]],

    rf: [
      ["from sklearn.ensemble import RandomForestClassifier",
       "Two hundred randomised trees, averaged."],
      ["rf = RandomForestClassifier(n_estimators=200, random_state=42)",
       "n_estimators = tree count (more is safer, just slower); the seed pins down the randomness."],
      ["rf.fit(X_train, y_train)",
       "Each tree trains on its own bootstrap sample with random feature subsets at each split."],
      ["print(rf.score(X_test, y_test))",
       "The ensemble's vote, scored on unseen data."],
      ["print(rf.feature_importances_)",
       "Trailing underscore = learned during fit: one importance per feature, summing to 1. Read with care — high-cardinality features get flattered."]],

    encode: [
      ["from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler",
       "One router, two treatments."],
      ["ct = ColumnTransformer([\n    ('num', StandardScaler(), num_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)])",
       "Each entry is (name, transformer, columns): numbers get scaled, categories get one-hot columns. handle_unknown='ignore' stops a brand-new category crashing production."],
      ["X_train_t = ct.fit_transform(X_train)",
       "Learn the means AND the category lists from training data only."],
      ["X_test_t = ct.transform(X_test)",
       "Apply the same learned encoding to test — never refit here."]],

    kmeans: [
      ["from sklearn.cluster import KMeans",
       "The workhorse clusterer — note: no labels anywhere in this task."],
      ["km = KMeans(n_clusters=3, n_init=10, random_state=42)",
       "Ask for 3 clusters; n_init=10 restarts from ten random starts and keeps the best — insurance against a bad initialisation."],
      ["labels = km.fit_predict(X_scaled)",
       "Fit and assign in one call: every row gets a cluster number (0, 1 or 2). Scaled features, because k-means measures distances."],
      ["print(km.cluster_centers_)\nprint(km.inertia_)",
       "The learned centroids (each cluster's average member) and the total within-cluster squared distance — the number the elbow method plots."]],

    pca: [
      ["from sklearn.decomposition import PCA",
       "The variance-hunting dimension reducer."],
      ["pca = PCA(n_components=2)",
       "Keep the two directions that carry the most variance — for a 2-D plot, or as compressed features."],
      ["X_2d = pca.fit_transform(X_scaled)",
       "Learn the directions from the (scaled!) data and project every row onto them in one step."],
      ["print(pca.explained_variance_ratio_)\nprint(pca.explained_variance_ratio_.sum())",
       "How much of the original variance each kept component carries — and their total. If the sum is 0.85, your 2-D picture shows 85% of the story."]],

    full: [
      ["X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
       "Split FIRST — before any preprocessing learns anything — so the test set never influences training."],
      ["pipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression(max_iter=1000))])",
       "Preprocessing lives inside the pipeline, so every later fit — including each CV fold — refits the scaler on its own training part."],
      ["scores = cross_val_score(pipe, X_train, y_train, cv=5)\nprint('cv mean:', scores.mean())",
       "Estimate performance with five rotations of the training data. Tune and compare models HERE."],
      ["pipe.fit(X_train, y_train)",
       "Decisions made — now train the final model on all the training data."],
      ["print('test:', pipe.score(X_test, y_test))",
       "Touch the test set exactly once, at the end. This is the number you report."]],

    impute: [
      ["from sklearn.impute import SimpleImputer",
       "The gap-filler for missing values."],
      ["imp = SimpleImputer(strategy='median')",
       "Median beats mean on skewed columns — one billionaire can't drag it."],
      ["X_train_i = imp.fit_transform(X_train)",
       "Learn each column's median from training data and fill training gaps with it."],
      ["X_test_i = imp.transform(X_test)",
       "Fill test gaps with the TRAINING medians — the test set's own statistics stay unused, and unleaked."]],

    fsel: [
      ["from sklearn.feature_selection import SelectKBest, f_classif",
       "A scorer (ANOVA F-test) and a keeper of the top k."],
      ["pipe = Pipeline([('select', SelectKBest(f_classif, k=10)),\n                 ('clf', LogisticRegression())])",
       "Selection is a LEARNED step, so it goes inside the pipeline, before the model."],
      ["scores = cross_val_score(pipe, X_train, y_train, cv=5)",
       "Each fold re-runs the selection on its own training part — features are never chosen using rows that later judge them."],
      ["print(scores.mean())",
       "An honest estimate of the whole recipe: select-10-then-classify."]],

    rsearch: [
      ["from sklearn.model_selection import RandomizedSearchCV\nfrom scipy.stats import randint",
       "The budgeted tuner, plus a distribution to sample from."],
      ["dist = {'n_estimators': randint(100, 500),\n        'max_depth': randint(3, 15)}",
       "Not lists — distributions. Each trial draws a random combination from these ranges."],
      ["search = RandomizedSearchCV(RandomForestClassifier(), dist,\n                            n_iter=20, cv=5, random_state=42)",
       "n_iter=20 is the budget: exactly twenty combinations, however big the space. A grid over the same space would need thousands."],
      ["search.fit(X_train, y_train)\nprint(search.best_params_)",
       "Same discipline as always: search on training data, read off the winner."]],

    threshold: [
      ["proba = clf.predict_proba(X_test)[:, 1]",
       "Start from probabilities — the threshold only exists on this scale."],
      ["y_pred_default = (proba >= 0.5).astype(int)",
       "The default cut: predict positive above 50%."],
      ["y_pred_lower = (proba >= 0.3).astype(int)",
       "Lower the bar to 0.3: more rows get flagged — recall rises, precision falls. The model is unchanged; only your decision rule moved."],
      ["print(classification_report(y_test, y_pred_default))\nprint(classification_report(y_test, y_pred_lower))",
       "Compare both reports side by side and pick the trade-off the PROBLEM wants — fraud wants recall, spam wants precision."]],

    imbal: [
      ["from sklearn.metrics import average_precision_score",
       "PR-AUC — the ranking metric that stays meaningful when positives are rare."],
      ["X_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, stratify=y, random_state=42)",
       "stratify=y keeps the class ratio identical in both halves — no fold of all-negatives by accident."],
      ["clf = LogisticRegression(class_weight='balanced', max_iter=1000)",
       "'balanced' reweights the loss so rare-class mistakes cost more — the model stops ignoring the minority."],
      ["clf.fit(X_tr, y_tr)\nproba = clf.predict_proba(X_te)[:, 1]",
       "Train, then take probabilities — threshold decisions come later, informed by costs."],
      ["print(average_precision_score(y_te, proba))",
       "Judge with PR-AUC, not accuracy: at 99:1, accuracy applauds a model that catches nothing."]],

    tssplit: [
      ["from sklearn.model_selection import TimeSeriesSplit",
       "The time-respecting splitter: train on the past, test on the future — always."],
      ["tscv = TimeSeriesSplit(n_splits=5)",
       "Five expanding windows: train on months 1–2 test on 3, train on 1–3 test on 4, and so on."],
      ["scores = cross_val_score(model, X, y, cv=tscv)",
       "Drop it in as cv. Note what's absent: no shuffle anywhere — order IS the information."],
      ["print(scores)\nprint('mean:', scores.mean())",
       "Later folds train on more history; a trend in the five scores is itself informative."]],

    dbscan: [
      ["from sklearn.cluster import DBSCAN",
       "Density clustering: no k, and outliers allowed to stay outliers."],
      ["db = DBSCAN(eps=0.5, min_samples=5)",
       "The density definition: a point is 'core' if 5+ neighbours sit within radius 0.5 (on SCALED data — eps is a real distance)."],
      ["labels = db.fit_predict(X_scaled)",
       "Cluster ids 0, 1, 2, … — and −1 for noise: points belonging to no dense region."],
      ["n_clusters = len(set(labels)) - (1 if -1 in labels else 0)",
       "Count distinct labels, minus one if the noise label is present — −1 is not a cluster."],
      ["n_noise = (labels == -1).sum()\nprint(n_clusters, 'clusters,', n_noise, 'noise points')",
       "Lots of noise? eps is probably too small. One giant cluster? Too big. The counts are your tuning feedback."]],

    hier: [
      ["from sklearn.cluster import AgglomerativeClustering",
       "Bottom-up clustering: start with every point alone, merge the closest pairs upward."],
      ["agg = AgglomerativeClustering(n_clusters=3, linkage='ward')",
       "Cut the merge tree where 3 clusters remain; Ward linkage merges whichever pair keeps clusters tightest (and requires Euclidean distance)."],
      ["labels = agg.fit_predict(X_scaled)",
       "One cluster id per row. No centroids exist, which is why there's no separate predict for new points."],
      ["print(pd.Series(labels).value_counts())",
       "Check the cluster sizes — a two-member 'cluster' usually means an outlier pair, worth investigating."]],

    save: [
      ["import joblib",
       "The standard tool for persisting sklearn objects (better than pickle for numpy-heavy models)."],
      ["pipe.fit(X_train, y_train)",
       "Train the final artifact — the whole pipeline, preprocessing included."],
      ["joblib.dump(pipe, 'model.joblib')",
       "Object first, filename second. Everything learned — scaler statistics, model weights — goes into the file."],
      ["pipe_loaded = joblib.load('model.joblib')",
       "Any process can now load it — a server, a notebook, a batch job — no retraining."],
      ["print(pipe_loaded.predict(X_new))",
       "Predict immediately. The one rule: never call fit on the loaded model unless you mean to erase it."]]
  };

  (window.CODETASKS || []).forEach(function (t) { if (walks[t.key]) t.walk = walks[t.key]; });
})();
