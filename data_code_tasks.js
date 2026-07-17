/* Coding mode — ML coding drills at three levels per task:
   1 "Spot it"  — multiple choice: pick the correct code
   2 "Build it" — tap the code lines into the right order (decoy lines to avoid)
   3 "Write it" — type the code; checked kindly against required pieces
   Data-science coding only (sklearn workflow) — no general EDA. Loads before app.js. */
(function () {
  window.CODETASKS = [

    { key: 'split', group: 'The core workflow', title: 'Train/test split',
      ask: 'Split X and y into training and test sets (80/20), reproducibly.',
      why: 'The first move of every honest project: hold out data the model never sees.',
      mcq: {
        q: 'Which line correctly splits X and y into an 80/20 train/test split?',
        correct: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",
        wrong: [
          "X_train, y_train, X_test, y_test = train_test_split(X, y, test_size=0.2, random_state=42)",
          "X_train, X_test = train_test_split(X, test_size=0.2); y_train, y_test = train_test_split(y, test_size=0.2)",
          "X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.2, random_state=42)",
          "X_test, X_train, y_test, y_train = train_test_split(X, y, test_size=0.8)"],
        explain: "The return order is X_train, X_test, y_train, y_test — X halves first, then y halves. Splitting X and y in two separate calls uses different shuffles, so rows and labels no longer match. train_size=0.2 would train on 20% instead of 80%." },
      lines: [
        "from sklearn.model_selection import train_test_split",
        "X = df.drop(columns=['target'])",
        "y = df['target']",
        "X_train, X_test, y_train, y_test = train_test_split(",
        "    X, y, test_size=0.2, random_state=42)",
        "print(X_train.shape, X_test.shape)"],
      decoys: [
        "X_train, y_train = train_test_split(X, test_size=0.2)",
        "X = df['target']"],
      written: {
        prompt: 'Write the code: import the splitter, split X and y 80/20 with random_state=42, into the four usual variables.',
        solution: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
        must: ["train_test_split", "X_train", "X_test", "y_train", "y_test", "test_size", "0.2", "random_state"] } },

    { key: 'scale', group: 'The core workflow', title: 'Scale features (fit on train only)',
      ask: 'Standardise the features — learning the scaling from the training set only.',
      why: 'Fitting the scaler on all data leaks test-set information into training.',
      mcq: {
        q: 'Which snippet scales correctly without leaking test data?',
        correct: "scaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)",
        wrong: [
          "scaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.fit_transform(X_test)",
          "scaler = StandardScaler()\nX_s = scaler.fit_transform(X)\nX_train_s, X_test_s = train_test_split(X_s)",
          "scaler = StandardScaler()\nX_train_s = scaler.transform(X_train)\nX_test_s = scaler.transform(X_test)",
          "X_train_s = StandardScaler(X_train)\nX_test_s = StandardScaler(X_test)"],
        explain: "fit_transform on train learns the means/scales AND applies them; transform on test applies those same training statistics. Refitting on test (or fitting before the split) leaks; transform-without-fit crashes — nothing has been learned yet." },
      lines: [
        "from sklearn.preprocessing import StandardScaler",
        "scaler = StandardScaler()",
        "X_train_s = scaler.fit_transform(X_train)",
        "X_test_s = scaler.transform(X_test)"],
      decoys: [
        "X_test_s = scaler.fit_transform(X_test)",
        "scaler = StandardScaler(X_train)"],
      written: {
        prompt: 'Write the code: create a StandardScaler, fit-and-transform the training features, and transform (only) the test features.',
        solution: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)",
        must: ["StandardScaler", "fit_transform", "X_train", "scaler.transform", "X_test"] } },

    { key: 'knn', group: 'Fitting models', title: 'Train and use a KNN classifier',
      ask: 'Create a KNN classifier with k=5, train it, predict, and score it.',
      why: 'The universal sklearn rhythm: create → fit → predict → score.',
      mcq: {
        q: 'Which snippet correctly trains and evaluates a KNN classifier?',
        correct: "knn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train, y_train)\ny_pred = knn.predict(X_test)\nprint(accuracy_score(y_test, y_pred))",
        wrong: [
          "knn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_test, y_test)\ny_pred = knn.predict(X_train)\nprint(accuracy_score(y_train, y_pred))",
          "knn = KNeighborsClassifier(k=5)\nknn.train(X_train, y_train)\ny_pred = knn.predict(X_test)",
          "knn = KNeighborsClassifier(n_neighbors=5)\ny_pred = knn.predict(X_test)\nknn.fit(X_train, y_train)",
          "knn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train)\ny_pred = knn.predict(X_test, y_test)"],
        explain: "Fit on training data (features AND labels), predict on test features, score predictions against test labels. The parameter is n_neighbors (not k), the method is fit (not train), fitting must precede predicting, and predict takes features only." },
      lines: [
        "from sklearn.neighbors import KNeighborsClassifier",
        "from sklearn.metrics import accuracy_score",
        "knn = KNeighborsClassifier(n_neighbors=5)",
        "knn.fit(X_train, y_train)",
        "y_pred = knn.predict(X_test)",
        "print(accuracy_score(y_test, y_pred))"],
      decoys: [
        "knn.fit(X_test, y_test)",
        "y_pred = knn.predict(y_test)"],
      written: {
        prompt: 'Write the code: KNN classifier with n_neighbors=5, fit on the training data, predict on the test features, print the accuracy.',
        solution: "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import accuracy_score\nknn = KNeighborsClassifier(n_neighbors=5)\nknn.fit(X_train, y_train)\ny_pred = knn.predict(X_test)\nprint(accuracy_score(y_test, y_pred))",
        must: ["KNeighborsClassifier", "n_neighbors=5", ".fit(X_train, y_train)", ".predict(X_test)", "accuracy_score"] } },

    { key: 'cv', group: 'The core workflow', title: 'Cross-validation',
      ask: 'Score a model with 5-fold cross-validation and report the mean score.',
      why: 'One split is one dice roll — five rotating splits average away the luck.',
      mcq: {
        q: 'How do you correctly run 5-fold cross-validation?',
        correct: "scores = cross_val_score(model, X_train, y_train, cv=5)\nprint(scores.mean())",
        wrong: [
          "scores = cross_val_score(model, X_test, y_test, cv=5)\nprint(scores.mean())",
          "model.fit(X_train, y_train)\nscores = cross_val_score(model.predict(X_train), y_train, cv=5)",
          "scores = cross_val_score(model, X_train, y_train, folds=5)\nprint(scores)",
          "for i in range(5):\n    model.fit(X_train, y_train)\nprint(model.score(X_train, y_train))"],
        explain: "cross_val_score takes the unfitted model plus training data and handles the five fit/score rounds itself (parameter name: cv). Running it on the test set spends your final exam on tuning; refitting on the same data five times isn't cross-validation at all." },
      lines: [
        "from sklearn.model_selection import cross_val_score",
        "model = LogisticRegression(max_iter=1000)",
        "scores = cross_val_score(model, X_train, y_train, cv=5)",
        "print(scores)",
        "print('mean:', scores.mean())"],
      decoys: [
        "scores = cross_val_score(model, X_test, y_test, cv=5)",
        "model.fit(scores)"],
      written: {
        prompt: 'Write the code: 5-fold cross-validate a model on the training data with cross_val_score, then print the mean of the scores.',
        solution: "from sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X_train, y_train, cv=5)\nprint(scores.mean())",
        must: ["cross_val_score", "X_train", "y_train", "cv=5", "mean"] } },

    { key: 'pipeline', group: 'The core workflow', title: 'Build a Pipeline',
      ask: 'Chain scaling and a model into one Pipeline, so preprocessing can never leak.',
      why: 'The pipeline refits the scaler inside every CV fold automatically — leak-proof by construction.',
      mcq: {
        q: 'Which snippet builds a correct scaler-plus-model pipeline?',
        correct: "pipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])\npipe.fit(X_train, y_train)",
        wrong: [
          "pipe = Pipeline([StandardScaler(), LogisticRegression()])\npipe.fit(X_train, y_train)",
          "pipe = Pipeline([('clf', LogisticRegression()), ('scaler', StandardScaler())])\npipe.fit(X_train, y_train)",
          "pipe = Pipeline(scaler=StandardScaler(), clf=LogisticRegression())\npipe.fit(X_train)",
          "X_s = StandardScaler().fit_transform(X)\npipe = Pipeline([('clf', LogisticRegression())]).fit(X_s)"],
        explain: "Pipeline takes a list of (name, estimator) pairs, in processing order — scaler first, model last. Bare estimators without names need make_pipeline instead; scaling before the pipeline (and before the split) is exactly the leak pipelines exist to prevent." },
      lines: [
        "from sklearn.pipeline import Pipeline",
        "from sklearn.preprocessing import StandardScaler",
        "from sklearn.linear_model import LogisticRegression",
        "pipe = Pipeline([('scaler', StandardScaler()),",
        "                 ('clf', LogisticRegression())])",
        "pipe.fit(X_train, y_train)",
        "print(pipe.score(X_test, y_test))"],
      decoys: [
        "pipe = Pipeline([('clf', LogisticRegression()), ('scaler', StandardScaler())])",
        "pipe.fit(X_test, y_test)"],
      written: {
        prompt: 'Write the code: a Pipeline named steps ‘scaler’ (StandardScaler) then ‘clf’ (LogisticRegression), fitted on the training data.',
        solution: "from sklearn.pipeline import Pipeline\npipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression())])\npipe.fit(X_train, y_train)",
        must: ["Pipeline", "scaler", "StandardScaler", "clf", "LogisticRegression", "fit(X_train, y_train)"] } },

    { key: 'grid', group: 'Tuning', title: 'Grid search with cross-validation',
      ask: 'Search over hyperparameter values with GridSearchCV and read off the best.',
      why: 'Tuning by hand is guesswork; the grid tries every setting under proper CV.',
      mcq: {
        q: 'Which snippet correctly tunes k for KNN with GridSearchCV?',
        correct: "params = {'n_neighbors': [3, 5, 7, 9]}\ngrid = GridSearchCV(KNeighborsClassifier(), params, cv=5)\ngrid.fit(X_train, y_train)\nprint(grid.best_params_)",
        wrong: [
          "params = {'n_neighbors': [3, 5, 7, 9]}\ngrid = GridSearchCV(KNeighborsClassifier(), params, cv=5)\ngrid.fit(X_test, y_test)\nprint(grid.best_params_)",
          "for k in [3, 5, 7, 9]:\n    knn = KNeighborsClassifier(n_neighbors=k)\n    knn.fit(X_train, y_train)\nprint(knn.score(X_train, y_train))",
          "grid = GridSearchCV(KNeighborsClassifier(n_neighbors=[3,5,7,9]), cv=5)\ngrid.fit(X_train, y_train)",
          "params = ['n_neighbors', 3, 5, 7, 9]\ngrid = GridSearchCV(KNeighborsClassifier(), params)\nprint(grid.best_params_)"],
        explain: "The grid is a dict of parameter name → list of values; GridSearchCV wraps the estimator, cross-validates every value on the TRAINING data, and stores the winner in best_params_. Tuning on the test set burns your final estimate; the manual loop scores on training data, which always prefers k=1." },
      lines: [
        "from sklearn.model_selection import GridSearchCV",
        "params = {'n_neighbors': [3, 5, 7, 9]}",
        "grid = GridSearchCV(KNeighborsClassifier(), params, cv=5)",
        "grid.fit(X_train, y_train)",
        "print(grid.best_params_)",
        "print(grid.best_score_)"],
      decoys: [
        "grid.fit(X_test, y_test)",
        "params = {'n_neighbors': 5}"],
      written: {
        prompt: 'Write the code: grid-search n_neighbors over [3, 5, 7, 9] for a KNN classifier with cv=5, fit on training data, print best_params_.',
        solution: "from sklearn.model_selection import GridSearchCV\nparams = {'n_neighbors': [3, 5, 7, 9]}\ngrid = GridSearchCV(KNeighborsClassifier(), params, cv=5)\ngrid.fit(X_train, y_train)\nprint(grid.best_params_)",
        must: ["GridSearchCV", "n_neighbors", "[3, 5, 7, 9]", "cv=5", "fit(X_train, y_train)", "best_params_"] } },

    { key: 'logreg', group: 'Fitting models', title: 'Logistic regression with probabilities',
      ask: 'Fit logistic regression and get probabilities, not just labels.',
      why: 'predict gives the verdict; predict_proba gives the confidence behind it.',
      mcq: {
        q: 'How do you get the probability of the positive class for the test set?',
        correct: "clf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]",
        wrong: [
          "clf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict(X_test) * 1.0",
          "clf = LogisticRegression(max_iter=1000)\nproba = clf.predict_proba(X_test)[:, 1]\nclf.fit(X_train, y_train)",
          "clf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(y_test)",
          "clf = LogisticRegression(probability=True)\nclf.fit(X_train, y_train)\nproba = clf.decision_path(X_test)"],
        explain: "predict_proba returns one column per class; [:, 1] takes the positive-class column. predict gives hard 0/1 labels (multiplying doesn't make them probabilities), fitting must come first, and predict_proba takes features — never labels." },
      lines: [
        "from sklearn.linear_model import LogisticRegression",
        "clf = LogisticRegression(max_iter=1000)",
        "clf.fit(X_train, y_train)",
        "proba = clf.predict_proba(X_test)[:, 1]",
        "y_pred = (proba >= 0.5).astype(int)"],
      decoys: [
        "proba = clf.predict(X_test)[:, 1]",
        "clf.fit(proba, y_train)"],
      written: {
        prompt: 'Write the code: fit LogisticRegression (max_iter=1000) on training data, then take the positive-class probabilities for X_test.',
        solution: "from sklearn.linear_model import LogisticRegression\nclf = LogisticRegression(max_iter=1000)\nclf.fit(X_train, y_train)\nproba = clf.predict_proba(X_test)[:, 1]",
        must: ["LogisticRegression", "max_iter", "fit(X_train, y_train)", "predict_proba(X_test)", "[:, 1]"] } },

    { key: 'metrics', group: 'Evaluating', title: 'Confusion matrix & report',
      ask: 'Evaluate predictions properly: confusion matrix plus per-class precision/recall/F1.',
      why: 'Accuracy is one number; the matrix and report show where the errors actually live.',
      mcq: {
        q: 'Which snippet correctly evaluates test-set predictions?',
        correct: "y_pred = clf.predict(X_test)\nprint(confusion_matrix(y_test, y_pred))\nprint(classification_report(y_test, y_pred))",
        wrong: [
          "y_pred = clf.predict(X_train)\nprint(confusion_matrix(y_test, y_pred))",
          "print(confusion_matrix(X_test, y_test))\nprint(classification_report(X_test, y_test))",
          "y_pred = clf.predict(X_test)\nprint(confusion_matrix(y_pred))\nprint(classification_report(y_pred))",
          "print(confusion_matrix(y_test, clf))\nprint(classification_report(y_test, clf))"],
        explain: "Metrics compare two label arrays: truth first, predictions second — both for the same (test) rows. Predicting on train while scoring against test mismatches rows; passing features or the model itself instead of labels is a type error in meaning, not just in code." },
      lines: [
        "from sklearn.metrics import confusion_matrix, classification_report",
        "y_pred = clf.predict(X_test)",
        "print(confusion_matrix(y_test, y_pred))",
        "print(classification_report(y_test, y_pred))"],
      decoys: [
        "print(confusion_matrix(X_test, y_pred))",
        "y_pred = clf.predict(y_test)"],
      written: {
        prompt: 'Write the code: predict on X_test, then print the confusion matrix and the classification report (truth first, predictions second).',
        solution: "from sklearn.metrics import confusion_matrix, classification_report\ny_pred = clf.predict(X_test)\nprint(confusion_matrix(y_test, y_pred))\nprint(classification_report(y_test, y_pred))",
        must: ["confusion_matrix(y_test, y_pred)", "classification_report(y_test, y_pred)", "predict(X_test)"] } },

    { key: 'rf', group: 'Fitting models', title: 'Random forest + feature importances',
      ask: 'Train a random forest and read which features mattered.',
      why: 'The forest is the strong tabular baseline — and it reports importances for free.',
      mcq: {
        q: 'Which snippet trains a forest and views feature importances?',
        correct: "rf = RandomForestClassifier(n_estimators=200, random_state=42)\nrf.fit(X_train, y_train)\nprint(rf.feature_importances_)",
        wrong: [
          "rf = RandomForestClassifier(n_estimators=200)\nprint(rf.feature_importances_)\nrf.fit(X_train, y_train)",
          "rf = RandomForestClassifier(trees=200)\nrf.fit(X_train, y_train)\nprint(rf.importances)",
          "rf = RandomForestClassifier(n_estimators=200)\nrf.fit(X_train)\nprint(rf.feature_importances_)",
          "rf = RandomForestClassifier(n_estimators=200)\nrf.fit(y_train, X_train)\nprint(rf.feature_importances_)"],
        explain: "feature_importances_ (trailing underscore = learned during fit) only exists after fitting. The parameter is n_estimators, fit needs features AND labels in that order — X first, y second." },
      lines: [
        "from sklearn.ensemble import RandomForestClassifier",
        "rf = RandomForestClassifier(n_estimators=200, random_state=42)",
        "rf.fit(X_train, y_train)",
        "print(rf.score(X_test, y_test))",
        "print(rf.feature_importances_)"],
      decoys: [
        "print(rf.feature_importances_)  # before fit",
        "rf.fit(y_train, X_train)"],
      written: {
        prompt: 'Write the code: RandomForestClassifier with 200 trees and random_state=42, fit on training data, print the test score and the feature importances.',
        solution: "from sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier(n_estimators=200, random_state=42)\nrf.fit(X_train, y_train)\nprint(rf.score(X_test, y_test))\nprint(rf.feature_importances_)",
        must: ["RandomForestClassifier", "n_estimators=200", "fit(X_train, y_train)", "feature_importances_"] } },

    { key: 'encode', group: 'Preparing data', title: 'Encode categoricals safely',
      ask: 'One-hot encode categorical columns inside a ColumnTransformer.',
      why: 'Models need numbers; the transformer routes each column type to the right treatment.',
      mcq: {
        q: 'Which snippet one-hot encodes the categorical columns and scales the numeric ones?',
        correct: "ct = ColumnTransformer([\n    ('num', StandardScaler(), num_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)])\nX_train_t = ct.fit_transform(X_train)",
        wrong: [
          "ct = ColumnTransformer([\n    ('num', OneHotEncoder(), num_cols),\n    ('cat', StandardScaler(), cat_cols)])\nX_train_t = ct.fit_transform(X_train)",
          "X_train['category'] = X_train['category'].astype(float)",
          "ct = ColumnTransformer([StandardScaler(), OneHotEncoder()])\nX_train_t = ct.fit_transform(X_train)",
          "ct = ColumnTransformer([\n    ('cat', OneHotEncoder(), cat_cols)])\nX_train_t = ct.fit_transform(X_test)"],
        explain: "Scaler on numeric columns, encoder on categorical ones — swapped, both fail. ColumnTransformer entries are (name, transformer, columns) triples; casting category strings to float crashes; and fitting the transformer on X_test is the classic leak." },
      lines: [
        "from sklearn.compose import ColumnTransformer",
        "from sklearn.preprocessing import OneHotEncoder, StandardScaler",
        "ct = ColumnTransformer([",
        "    ('num', StandardScaler(), num_cols),",
        "    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)])",
        "X_train_t = ct.fit_transform(X_train)",
        "X_test_t = ct.transform(X_test)"],
      decoys: [
        "X_test_t = ct.fit_transform(X_test)",
        "    ('cat', StandardScaler(), cat_cols)])"],
      written: {
        prompt: 'Write the code: a ColumnTransformer scaling num_cols and one-hot encoding cat_cols (handle_unknown=‘ignore’); fit-transform train, transform test.',
        solution: "from sklearn.compose import ColumnTransformer\nct = ColumnTransformer([\n    ('num', StandardScaler(), num_cols),\n    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)])\nX_train_t = ct.fit_transform(X_train)\nX_test_t = ct.transform(X_test)",
        must: ["ColumnTransformer", "StandardScaler", "num_cols", "OneHotEncoder", "cat_cols", "fit_transform(X_train)", "transform(X_test)"] } },

    { key: 'kmeans', group: 'Unsupervised', title: 'K-means clustering',
      ask: 'Cluster scaled data into 3 groups and read the labels and centroids.',
      why: 'No labels here — fit takes X only, and the output IS the cluster assignment.',
      mcq: {
        q: 'Which snippet correctly runs k-means with 3 clusters?',
        correct: "km = KMeans(n_clusters=3, n_init=10, random_state=42)\nlabels = km.fit_predict(X_scaled)\nprint(km.cluster_centers_)",
        wrong: [
          "km = KMeans(n_clusters=3)\nkm.fit(X_scaled, y)\nprint(km.accuracy_)",
          "km = KMeans(k=3, n_init=10)\nlabels = km.fit_predict(X_scaled)",
          "km = KMeans(n_clusters=3)\nlabels = km.predict(X_scaled)\nprint(km.cluster_centers_)",
          "km = KMeans(n_clusters=3)\nlabels = km.fit_predict(y)\nprint(km.cluster_centers_)"],
        explain: "Clustering is unsupervised: fit_predict takes features only and returns cluster labels; there is no y and no accuracy_. The parameter is n_clusters (not k), and predict before fit fails — no centroids exist yet." },
      lines: [
        "from sklearn.cluster import KMeans",
        "km = KMeans(n_clusters=3, n_init=10, random_state=42)",
        "labels = km.fit_predict(X_scaled)",
        "print(km.cluster_centers_)",
        "print(km.inertia_)"],
      decoys: [
        "km.fit(X_scaled, y)",
        "labels = km.predict(X_scaled)  # before fit"],
      written: {
        prompt: 'Write the code: KMeans with n_clusters=3, n_init=10, random_state=42; fit_predict on X_scaled into labels; print the cluster centres.',
        solution: "from sklearn.cluster import KMeans\nkm = KMeans(n_clusters=3, n_init=10, random_state=42)\nlabels = km.fit_predict(X_scaled)\nprint(km.cluster_centers_)",
        must: ["KMeans", "n_clusters=3", "fit_predict(X_scaled)", "cluster_centers_"] } },

    { key: 'pca', group: 'Unsupervised', title: 'PCA transform',
      ask: 'Reduce scaled features to 2 components and check the variance kept.',
      why: 'Fit learns the directions; transform re-plots the data along them.',
      mcq: {
        q: 'Which snippet correctly reduces the data to 2 principal components?',
        correct: "pca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_scaled)\nprint(pca.explained_variance_ratio_)",
        wrong: [
          "pca = PCA(components=2)\nX_2d = pca.transform(X_scaled)\nprint(pca.variance_)",
          "pca = PCA(n_components=2)\nX_2d = pca.fit_transform(y)\nprint(pca.explained_variance_ratio_)",
          "pca = PCA(n_components=2)\nprint(pca.explained_variance_ratio_)\nX_2d = pca.fit_transform(X_scaled)",
          "X_2d = PCA.fit_transform(X_scaled, n_components=2)"],
        explain: "n_components is the parameter, fit_transform learns the components AND projects in one call, and explained_variance_ratio_ (learned, hence the underscore) only exists after fitting. PCA runs on features — never the target." },
      lines: [
        "from sklearn.decomposition import PCA",
        "pca = PCA(n_components=2)",
        "X_2d = pca.fit_transform(X_scaled)",
        "print(pca.explained_variance_ratio_)",
        "print(pca.explained_variance_ratio_.sum())"],
      decoys: [
        "X_2d = pca.transform(X_scaled)  # before fit",
        "X_2d = pca.fit_transform(y)"],
      written: {
        prompt: 'Write the code: PCA with n_components=2, fit_transform X_scaled into X_2d, print the explained variance ratio.',
        solution: "from sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_scaled)\nprint(pca.explained_variance_ratio_)",
        must: ["PCA", "n_components=2", "fit_transform(X_scaled)", "explained_variance_ratio_"] } },

    { key: 'full', group: 'Putting it together', title: 'The full workflow, end to end',
      ask: 'Assemble the whole thing: split → pipeline → cross-validate → fit → evaluate once.',
      why: 'This is the shape of every honest sklearn project, in one screen of code.',
      mcq: {
        q: 'What is the correct ORDER of the honest workflow?',
        correct: "split the data → build the pipeline → cross-validate on train → fit on train → score on test once",
        wrong: [
          "fit on all data → split → cross-validate on test → report the best score seen",
          "scale all data → split → fit on train → tune on test → report test score",
          "split → fit on test → validate on train → score on train",
          "cross-validate on all data → pick best fold's model → deploy it directly"],
        explain: "Split first (so nothing ever learns from test data), preprocess inside a pipeline (so CV refits it per fold), tune and validate on training data only, and spend the test set exactly once at the end." },
      lines: [
        "X_train, X_test, y_train, y_test = train_test_split(",
        "    X, y, test_size=0.2, random_state=42)",
        "pipe = Pipeline([('scaler', StandardScaler()),",
        "                 ('clf', LogisticRegression(max_iter=1000))])",
        "scores = cross_val_score(pipe, X_train, y_train, cv=5)",
        "print('cv mean:', scores.mean())",
        "pipe.fit(X_train, y_train)",
        "print('test:', pipe.score(X_test, y_test))"],
      decoys: [
        "pipe.fit(X, y)  # fits on everything, test included",
        "scores = cross_val_score(pipe, X_test, y_test, cv=5)"],
      written: {
        prompt: 'Write the full workflow: 80/20 split (random_state=42), scaler+logistic pipeline, 5-fold CV on train, fit on train, score on test.',
        solution: "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\npipe = Pipeline([('scaler', StandardScaler()),\n                 ('clf', LogisticRegression(max_iter=1000))])\nscores = cross_val_score(pipe, X_train, y_train, cv=5)\nprint(scores.mean())\npipe.fit(X_train, y_train)\nprint(pipe.score(X_test, y_test))",
        must: ["train_test_split", "Pipeline", "StandardScaler", "cross_val_score", "cv=5", "fit(X_train, y_train)", "score(X_test, y_test)"] } }

  ];
})();
