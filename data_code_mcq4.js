/* Per-option explanations for the last of the modelling and debugging tasks. */
(function () {
  var M = {

    skfold: { why: [
      "Accuracy on a 95:5 split is 95% for a model that always says 'no'. Stratifying the folds is right; the metric is what makes it useless.",
      "StratifiedKFold has no stratify argument — stratifying on the labels is what it does by definition, using the y you pass to cross_val_score.",
      "Sorting the labels puts all the positives at the end, so some folds contain nothing but negatives and the model never sees the class it must find.",
      "cross_val_score cannot compute f1 without y — and without labels there is nothing to stratify on either."] },

    groupkfold: { why: [
      "The groups belong on the cross_val_score call, not on the splitter's constructor. This raises TypeError.",
      "scikit-learn has no idea two rows are the same patient unless you tell it. Rows from one patient land on both sides and the score is inflated.",
      "Dropping duplicate FEATURE rows does not remove repeat patients — two different visits look nothing alike as rows.",
      "Passing patient_ids where y belongs trains the model to predict the patient id."] },

    cvmulti: { why: [
      "cross_val_score returns one array of numbers, so it takes a single scorer. Several metrics need cross_validate.",
      "Right function, but the keys come back prefixed: res['test_f1'], not res['f1']. This raises KeyError.",
      "Fitting and scoring on the training data five times gives the same optimistic number five times, and .score takes no metric argument.",
      "Without scoring=, cross_validate records only the estimator's default score, so there is no test_f1 key to read."] },

    rocauc: { why: [
      "Hard 0/1 labels throw away the RANKING that AUC measures, collapsing the curve to a single point and the score to something meaningless.",
      "The arguments are the wrong way round: the true labels come first, the scores second. Reversed, the AUC comes out as 1 minus the real one.",
      "Probabilities from the TRAINING set scored against the test labels compares two different sets of rows.",
      "roc_curve returns three arrays (fpr, tpr, thresholds), not a single number — and feeding it hard labels has the same problem as the first option."] },

    prf: { why: [
      "Arguments reversed: true labels first, predictions second. Swapping them silently swaps precision and recall.",
      "These metrics need a predicted CLASS, not a probability — passing continuous values raises.",
      "Every one of these takes two arguments. With one, there is nothing to compare against.",
      "Passing features where the true labels belong compares the input data with the answers."] },

    regmetrics: { why: [
      "mean_squared_error is MSE, not RMSE — you have to take the square root yourself (or pass squared=False on older versions).",
      "Accuracy and F1 are classification metrics: on continuous predictions they either raise or report a nonsense near-zero score.",
      "The true values are y_test, not X_test — this compares the features with the predictions.",
      "r2_score takes (true, predicted) in that order, and multiplying by 100 invents a percentage that R² is not."] },

    logloss: { why: [
      "Log loss needs probabilities. On hard 0/1 predictions a single confident mistake costs infinity, so the number is unusable.",
      "Both calls have their arguments the wrong way round — true labels come first in each.",
      "The computation is right but the reading is backwards: log loss is a LOSS, so lower is better.",
      "Scaling hard predictions by 0.99 is not calibration — it just makes every prediction confidently wrong by 1%."] },

    valcurve: { why: [
      "The parameter is passed by NAME through param_name and param_range — you cannot hand max_depth to validation_curve directly.",
      "A hand-rolled loop scores on the training data, so it shows accuracy rising with depth for ever and never reveals overfitting.",
      "Running the curve on the test set tunes to the data you were keeping back, which is what makes the final score dishonest.",
      "A model cannot take a list where a single depth belongs; the range goes in param_range."] },

    baseline: { why: [
      "0.5 is only the baseline when the classes are balanced. On a 90:10 split the honest bar is 90%, and beating 0.5 means nothing.",
      "The dummy is never fitted, so .score raises NotFittedError.",
      "Fitting the dummy on the test set and scoring it on train inverts both halves of the comparison.",
      "The train-test gap measures overfitting, which is a different question from 'is this model better than guessing'."] },

    pipegrid: { why: [
      "Inside a pipeline the parameter has to name its step: 'clf__C', with a double underscore. A bare 'C' raises ValueError.",
      "A single dot is not the separator — scikit-learn uses two underscores between the step name and the parameter.",
      "Scaling outside the pipeline and before the search leaks the fold's held-out rows into the scaling statistics.",
      "GridSearchCV takes a param_grid dictionary, not the hyperparameters as keyword arguments."] },

    histgb: { why: [
      "There is no stop_early method, and calling anything after fit would be too late anyway — early stopping is a fit-time setting.",
      "Early stopping is set up correctly, then the model is fitted on the TEST set, which spends the data you were judging with.",
      "Refitting from scratch a thousand times is enormously slow and scores on the training data, so it stops at the wrong place.",
      "Capping at 20 rounds is not early stopping — it is a guess that will underfit as often as it fits."] },

    calib: { why: [
      "Calibration is about PROBABILITIES: hard 0/1 predictions give you two points, which tells you nothing about how well-judged the confidences are.",
      "Probabilities from the training set compared with test labels mixes two different sets of rows.",
      "The arguments are the wrong way round — true labels first, probabilities second.",
      "Accuracy says nothing about calibration: a model can be 95% accurate and still claim 0.99 confidence on everything."] },

    lcurve: { why: [
      "The argument is train_sizes; param_range belongs to validation_curve. This raises TypeError.",
      "Sampling X without sampling y the same way misaligns the rows, and scoring on the training set hides the very gap you are looking for.",
      "Drawing the curve on the test set spends the held-out data and answers the question about the wrong rows.",
      "learning_curve is a function from model_selection, not a method on the model."] },

    silhouette: { why: [
      "The silhouette score is undefined for a single cluster, so starting the range at 1 raises on the first iteration.",
      "Inertia always falls as k rises, so 'pick the lowest' picks the biggest k every time. That is the elbow method, and it needs judgement, not a minimum.",
      "silhouette_score takes the DATA and the labels in that order — passing labels first raises.",
      "KMeans has no 'auto' cluster count and no scoring argument; choosing k is your job."] },

    permimp: { why: [
      "permutation_importance needs y as well — it measures how much the score drops, and without the true labels there is no score.",
      "Shuffling the ROWS of X changes nothing: the model still sees the same rows with the same labels. Permutation importance shuffles one COLUMN at a time.",
      "The arguments are in the wrong order: the fitted model comes first, then X, then y.",
      "Zeroing a column is not the same as permuting it — zero may be far outside the column's real range, so the drop measures extrapolation rather than reliance."] },

    ridge: { why: [
      "Alpha spans orders of magnitude, so 1 to 5 in linear steps searches a tiny corner of the space and misses everything interesting.",
      "The grid is right, but accuracy is a classification metric — on a regression it raises.",
      "Ridge has no 'auto' alpha. RidgeCV picks one for you; a plain Ridge needs a number.",
      "A hand-rolled loop keeps only the last model and scores on the training data, where more regularisation always looks worse."] },

    nestedcv: { why: [
      "best_score_ is the best score of the SEARCH, chosen after looking at every fold — which is exactly the optimism nested CV exists to remove.",
      "Running the same cross-validation twice and averaging gives the same number with more decimal places, not an unbiased estimate.",
      "Scoring the winning model on the same data that selected it reuses those folds twice, so the estimate is still optimistic.",
      "Tuning on the test set gives away the one honest measurement you had."] },

    fixnotfit: { why: [
      "Swallowing the error hides it; the model is still untrained, so the empty predictions would be silently wrong.",
      "predict takes only the features. Passing the training data as extra arguments raises a different error, not a fix.",
      "The error is about the state of your object, not the installation — the library is working exactly as documented.",
      "n_neighbors has nothing to do with it: no value of k lets a model predict before it has seen any data."] },

    fixstring: { why: [
      "Deleting every row with a category value throws away real data to avoid encoding it — and the next unseen category breaks it again.",
      "astype(float) on words raises the same ValueError: 'red' has no numeric value to convert to.",
      "The column name has no bearing on it; scikit-learn never infers types from names.",
      "max_iter controls how long the SOLVER runs. Nothing here is iterating — the conversion fails before fitting starts."] },

    fixshape: { why: [
      "Truncating y keeps the first n labels, which are not the labels of the rows that survived the cleaning. Everything is then mislabelled.",
      "The type is not the problem — the row COUNTS differ, and converting to a NumPy array leaves that untouched.",
      "Dropping random labels destroys the pairing between features and answers entirely.",
      "Sorting both separately loses the row-by-row correspondence that made them a dataset in the first place."] },

    fixleak: { why: [
      "A near-perfect score on held-out data is almost never real — the far likelier explanation is that a column contains the answer.",
      "Adding more regularisation cannot fix a feature that IS the target; the model would still find it.",
      "More data multiplies the leak rather than removing it.",
      "Lowering the threshold changes the precision-recall trade-off, not where the information came from."] },

    fixconverge: { why: [
      "Ignoring a convergence warning ships coefficients the solver never finished computing — they can be wildly wrong.",
      "Dropping features to silence a solver warning throws away signal to fix a scaling problem.",
      "Switching model family is a very large change to avoid a one-line fix.",
      "A different random seed does not help a solver that has not converged; it just changes where it gave up."] },

    fixproba: { why: [
      "roc_auc_score on hard labels collapses the ranking to one point, which is why the AUC looks suspiciously low.",
      "predict_proba returns one column PER CLASS — passing the whole array raises; take the positive class column.",
      "Refitting changes nothing about which output you scored.",
      "Accuracy answers a different question and hides exactly the ranking problem you were trying to measure."] }
  };

  (window.CODETASKS || []).forEach(function (t) {
    var m = M[t.key];
    if (m && m.why) t.mcq.whyWrong = m.why;
  });
})();
