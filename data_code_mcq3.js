/* Per-option explanations for the modelling tasks (stages 11–17). Their wrong
   answers were already real mistakes; what was missing was being told which one
   you fell for. Same shape as the analytics patches. */
(function () {
  var M = {

    split: { why: [
      "The four outputs come back X first, then y: X_train, X_test, y_train, y_test. This order swaps the test features for the training labels, and the shapes will not even match.",
      "Two separate calls shuffle differently, so your rows and your labels no longer belong to each other. Every score after this is meaningless.",
      "train_size=0.2 trains on a fifth of the data and tests on the rest — the split the wrong way round.",
      "The names are in the wrong order AND test_size=0.8 holds back 80%, so you train on a fifth of the rows under the wrong names."] },

    scale: { why: [
      "fit_transform on the test set learns the TEST means and spreads. That is leakage: the scaler has seen data the model is supposed to be judged on.",
      "Scaling before the split is the same leak in a different place — the whole dataset's statistics end up baked into the training features.",
      "transform without ever fitting raises NotFittedError: the scaler has not learned any means or spreads yet.",
      "StandardScaler(X_train) passes the data as a CONSTRUCTOR argument, which does nothing but configure the object. Nothing is scaled."] },

    knn: { why: [
      "Fitted on the test set and scored on the training set — backwards in both places. The number it prints tells you nothing about new data.",
      "The argument is n_neighbors, not k, and scikit-learn models are fitted with .fit(), never .train(). Two API errors in two lines.",
      "predict before fit raises NotFittedError. The model has to learn before it can answer.",
      "fit needs both X and y to learn from, and predict takes only X — labels are what you are trying to produce, not an input."] },

    cv: { why: [
      "Cross-validating on the test set spends the held-out data you were saving to judge the final model. Do the searching on train.",
      "cross_val_score takes the MODEL and the data, not predictions — it does the fitting itself, five times over.",
      "The argument is cv, not folds. This raises TypeError before anything runs.",
      "Fitting the same model five times on the same data gives the same answer five times. Cross-validation is about holding a different fifth out each time."] },

    pipeline: { why: [
      "Every step needs a NAME: a list of (name, estimator) pairs. Bare objects raise a TypeError about unpacking.",
      "The order of the steps is the order they run, so this scales AFTER the model has already seen the raw numbers — which is to say, never usefully.",
      "Pipeline takes a list of steps, not keyword arguments, and fit needs y as well as X.",
      "Scaling outside the pipeline and before the split is exactly the leak a pipeline exists to prevent."] },

    grid: { why: [
      "Searching on the test set tunes to the data you are meant to be judged on — the reported score then means nothing.",
      "A hand-rolled loop keeps only the LAST model, and scores on the training data, so it neither compares fairly nor holds anything out.",
      "The grid of values goes in the params dict, not inside the estimator: a model cannot take a list where a number belongs.",
      "params has to be a dict of name → list of values. A flat list raises."] },

    logreg: { why: [
      "predict gives the 0/1 class. Multiplying by 1.0 makes it a float, not a probability — you get 0.0 and 1.0 and nothing in between.",
      "predict_proba before fit raises NotFittedError. The order of the two lines is the whole mistake.",
      "predict_proba takes FEATURES, not labels — and passing y_test would give one column per class of nonsense even if the shape allowed it.",
      "probability=True is an SVC argument; logistic regression is already probabilistic. decision_path belongs to trees."] },

    metrics: { why: [
      "Predicting on the training features but scoring against the test labels compares two different sets of rows — usually a shape error, and always meaningless.",
      "The confusion matrix compares TRUE labels with PREDICTED labels. Passing features and labels compares apples with the orchard.",
      "Both functions need two arguments: what actually happened and what you said would happen. One argument raises.",
      "clf is the model object, not its predictions. You have to call clf.predict(X_test) first."] },

    rf: { why: [
      "feature_importances_ only exists after fitting — the trailing underscore is the clue. Before fit, this raises.",
      "The argument is n_estimators, and the attribute is feature_importances_. Neither trees= nor .importances exists.",
      "fit needs the labels too: a forest cannot learn what it is predicting from features alone.",
      "The arguments are the wrong way round — fit(X, y), features first, labels second."] },

    encode: { why: [
      "The transformers are matched to the wrong columns: one-hot on the numbers and scaling on the text. The scaler raises on strings.",
      "Casting a category column to float raises unless the values happen to look like numbers — and if they did, you would be inventing an order.",
      "ColumnTransformer needs (name, transformer, columns) triples. Bare transformers with no columns raise.",
      "Fitting on X_test learns the categories from the test set, which is leakage — and any category only present in train would then be unknown."] },

    kmeans: { why: [
      "K-means is unsupervised: fit takes no y, and there is no accuracy_ — there are no right answers to be accurate about.",
      "The argument is n_clusters, not k.",
      "predict before fit raises: the cluster centres have not been found yet.",
      "Clustering the LABELS rather than the features clusters a single column of 0s and 1s, which tells you nothing."] },

    pca: { why: [
      "The argument is n_components, transform needs a prior fit, and the attribute is explained_variance_ratio_.",
      "Fitting PCA on the labels reduces a single column — there is nothing to find. PCA works on the features.",
      "explained_variance_ratio_ is read before anything is fitted, so it raises. Fit first, then read the attributes.",
      "fit_transform is a method on an INSTANCE. Calling it on the class itself, with the argument in the wrong place, raises."] },

    full: { why: [
      "Fitting before splitting means the model has already seen every row, so the split protects nothing and the best-score-seen is the highest fluke.",
      "Scaling all the data before the split leaks, and tuning on the test set spends the only honest measurement you had.",
      "Fitting on the test set and scoring on the training set inverts the whole point of holding data back.",
      "Picking the best fold's model picks the luckiest fold. Cross-validation estimates performance; it does not select a model to ship."] },

    impute: { why: [
      "fit_transform on the test set learns the TEST medians — leakage, and it also means the two halves are filled with different numbers.",
      "Dropping rows from X without dropping the same rows from y leaves the features and labels misaligned, which is worse than the missing values were.",
      "Concatenating train and test before imputing computes medians across both, so test information reaches the training data.",
      "Both halves are filled with the TEST median, which is leakage twice over."] },

    fsel: { why: [
      "Selecting on all of X and y before cross-validating means the selection has already seen every fold's held-out rows. Scores come out optimistically high.",
      "The steps run in order, so this fits the model first and selects afterwards — the selection never reaches the classifier.",
      "Fitting the selector on the test set is leakage, and it also picks features to suit the data you were saving for judgement.",
      "Taking the first ten columns is not selection, it is alphabetical order. It will usually be worse than using everything."] },

    rsearch: { why: [
      "This is the right shape but it never fits or reports — a search object on its own does nothing.",
      "RandomizedSearchCV needs a distribution to sample FROM; without param_distributions there is nothing to search.",
      "A hand-rolled random loop keeps only the last model and scores on the training data, so it cannot compare anything fairly.",
      "GridSearchCV has no n_iter — it tries every combination. With two-value lists that is four fits, not twenty samples."] },

    threshold: { why: [
      "predict takes no threshold argument. The threshold is something you apply to the PROBABILITIES yourself.",
      "There is no threshold parameter on the model either — it is a decision you make after the model has spoken, not a setting it learns.",
      "The comparison already gives True/False; multiplying by 0.3 turns them into 0.0 and 0.3, which is neither a class nor a probability.",
      "predict gives classes, not probabilities, so comparing them to 0.3 marks every predicted 1 as positive and changes nothing."] },

    imbal: { why: [
      "No stratify, no class weighting and accuracy as the metric: on a 99/1 split this reports 99% while never once predicting the rare class.",
      "Resampling BEFORE the split lets synthetic copies of training rows appear in the test set, so the score is measuring memorisation.",
      "Shuffling the labels destroys the relationship between X and y entirely — the model then learns nothing at all.",
      "class_weight takes 'balanced' or a dict of weights per class, not a bare number."] },

    tssplit: { why: [
      "The default cross-validation shuffles, so the model trains on future rows and is tested on past ones — the score will never survive contact with production.",
      "Shuffling the data first destroys the time order that TimeSeriesSplit exists to respect, which cancels out the whole point of using it.",
      "TimeSeriesSplit has no shuffle argument — shuffling is precisely what it is designed not to do.",
      "A shuffled train_test_split has the same problem, and fitting without y will raise anyway."] },

    dbscan: { why: [
      "DBSCAN has no n_clusters — finding the number of clusters is its job, not yours. And hard-coding 3 afterwards ignores whatever it found.",
      "predict before fit raises, and noise is labelled -1, not 0 — counting zeros counts a real cluster instead.",
      "labels.max() is the highest cluster NUMBER, which undercounts by one, and comparing labels to None never matches anything.",
      "DBSCAN is unsupervised: it takes no y and has no .score against labels."] },

    hier: { why: [
      "Ward linkage only works with Euclidean distance; asking for manhattan alongside it raises.",
      "AgglomerativeClustering has no predict — it has fit_predict, because it cannot assign new points without redoing the clustering.",
      "It takes no y, and without n_clusters (or a distance threshold) there is nothing to cut the tree at.",
      "Clustering the labels rather than the features clusters one column of class numbers."] },

    save: { why: [
      "There is no .save on a pipeline and no Pipeline.open. Persistence goes through joblib (or pickle).",
      "Writing str(pipe) saves a DESCRIPTION of the object, not the object, and eval on it cannot rebuild a fitted model — it also runs whatever is in the file.",
      "The arguments are the wrong way round: joblib.dump(object, filename), and load takes the filename.",
      "Everything is right until the last two lines: re-fitting the loaded model on new data throws away the training it was saved with."] },

    kfold: { why: [
      "The argument is cv, not folds — the splitter goes in through cv.",
      "The arguments are n_splits and shuffle, spelled exactly that way. Both of these raise TypeError.",
      "A KFold object is not directly iterable as folds of data — you iterate over .split(X), which yields index arrays, not fitted data.",
      "KFold is a splitter, not a scoring function. This is not a call that exists."] }
  };

  (window.CODETASKS || []).forEach(function (t) {
    var m = M[t.key];
    if (!m) return;
    if (m.wrong) t.mcq.wrong = m.wrong;
    if (m.why) t.mcq.whyWrong = m.why;
    if (m.avoid) t.written.avoid = m.avoid;
  });
})();
