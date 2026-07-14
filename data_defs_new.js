/* Added definition topics: Interpretability, Class Imbalance, Extra Evaluation Metrics,
   Regression & Boosting, Validation. Each question is a tagged definition (window.DEFS) with a
   reveal, so it flows into the Definitions filter, flashcards and read+recall like every other term. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function add(qk, obj) { (Q[qk] = Q[qk] || []).push(obj); D[obj.q] = 1; }
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    add(qk, { q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
  }

  /* ============ Interpretability & Explainability ============ */
  def("interp",
    "What are SHAP values?",
    "A game-theory method that assigns each feature its fair share of credit for one prediction, with the contributions summing exactly to the model's output",
    ["A global ranking of features by how much they cut impurity across the whole tree",
     "The plain correlation between each feature and the target, measured before training",
     "A penalty term that shrinks unimportant feature weights toward zero during fitting",
     "The raw gradient of the loss with respect to each input at the start of training"],
    "SHAP values",
    "Game-theory credit assignment: each feature's fair contribution to a single prediction, summing exactly to the model's output.",
    "SHAP borrows the Shapley value from cooperative game theory: it fairly splits a single prediction among the features, and the parts add up exactly to the output — so you can see who pushed the answer up or down, and by how much.",
    "It's a fair way to share the blame (or credit) for one prediction across the features. Add up every feature's share and you get exactly the model's output for that row.");

  def("interp",
    "What is LIME (Local Interpretable Model-agnostic Explanations)?",
    "It fits a simple, readable surrogate model around a single prediction to explain it locally — model-agnostic, but only faithful near that one point",
    ["It trains one simple global model that replaces the complex one everywhere",
     "It ranks features once for the whole dataset using mutual information",
     "It calibrates a classifier's probabilities so they match observed frequencies",
     "It selects the smallest set of features that keeps accuracy high"],
    "LIME",
    "Fits a simple, readable model around one prediction to explain it locally; model-agnostic but only faithful near that point.",
    "LIME probes the model with small variations of one input, then fits a tiny interpretable model (like a short linear rule) to those nearby answers. It explains that one prediction well, but the explanation isn't meant to hold far away.",
    "To explain one decision, LIME wiggles the inputs a little, watches how the answer changes, and fits a simple rule to that neighbourhood. Trustworthy right around that case, not everywhere.");

  def("interp",
    "What does a partial dependence plot (PDP) show?",
    "The average effect of one feature on the prediction, marginalising over all the other features — the global shape of the relationship",
    ["The contribution of every feature to one single prediction",
     "How training and validation error change as the model sees more data",
     "The correlation between two features across the dataset",
     "The residuals left over after the model has been fitted"],
    "Partial dependence plot (PDP)",
    "The average effect of one feature on predictions, marginalising over the others; shows the shape of the relationship globally.",
    "A PDP sweeps one feature across its range, averages the model's prediction over all other features at each step, and plots the result — revealing whether the relationship is rising, flat, U-shaped and so on, across the whole model.",
    "Hold everything else as it is, slide one feature from low to high, and average the prediction at each point. The plotted line shows that feature's overall push on the answer.");

  def("interp",
    "What is the difference between a global and a local explanation?",
    "A global explanation describes the whole model's behaviour across all data; a local explanation describes one specific prediction",
    ["Global uses the training set and local uses the test set",
     "Global explains linear models and local explains tree models",
     "Global is computed before training and local is computed after",
     "There is no real difference — the terms are interchangeable"],
    "Global vs local explanation",
    "Global explains the whole model's behaviour across all data; local explains one specific prediction.",
    "Global tools (like a PDP or overall feature importances) tell you how the model behaves in general. Local tools (like SHAP or LIME on one row) tell you why the model made this particular decision. You usually want both.",
    "Global = 'how does the model behave in general?' Local = 'why did it say THAT for this one case?' Different questions, different tools.");

  def("interp",
    "What is a model card?",
    "A short spec sheet documenting a model's intended use, training data, evaluation metrics and known limitations",
    ["A saved file containing the model's trained weights",
     "A dashboard that streams the model's live prediction latency",
     "A ranking of the model's most important features",
     "A licence key that authorises the model for production use"],
    "Model card",
    "A spec sheet documenting a model's intended use, training data, metrics, and limits; increasingly expected by regulators.",
    "A model card is a plain-language document that travels with a model: what it's for, what data trained it, how well it scores, where it should NOT be used, and its known biases. Regulators and responsible-AI practices increasingly expect one.",
    "Think of it as the label on the tin: what the model is for, what it was trained on, how good it is, and where it shouldn't be trusted.");

  /* ============ Class Imbalance ============ */
  def("imbal",
    "What is class imbalance?",
    "When one class massively outnumbers the others, so plain accuracy is misleading and you must resample, reweight, or move the threshold",
    ["When the features are measured on very different scales",
     "When the training and test sets come from different distributions",
     "When two features carry almost the same information",
     "When the model has more parameters than training rows"],
    "Class imbalance",
    "When one class massively outnumbers the others; accuracy lies, so you resample, reweight, or move the threshold.",
    "If 99% of rows are 'negative', a model that always predicts 'negative' scores 99% accuracy while catching nothing. That's class imbalance: accuracy flatters a useless model, so you switch to recall/precision, reweight the loss, resample, or move the decision threshold.",
    "One class swamps the other. A lazy 'always say the common one' model looks great on accuracy but is useless — so accuracy is the wrong scoreboard here.");

  def("imbal",
    "What is SMOTE (Synthetic Minority Over-sampling Technique)?",
    "It creates new minority-class rows by interpolating between nearby minority examples, instead of simply duplicating existing ones",
    ["It deletes majority-class rows until the classes are balanced",
     "It reweights the loss so minority mistakes cost more",
     "It lowers the decision threshold to catch more positives",
     "It removes outliers from the minority class before training"],
    "SMOTE",
    "Synthesises new minority-class rows by interpolating between near neighbours rather than duplicating existing ones.",
    "SMOTE picks a minority point, finds its nearest minority neighbours, and creates a synthetic point somewhere on the line between them. This grows the minority class with fresh variety rather than exact copies — reducing the overfitting that plain duplication causes. Fit it on training data only.",
    "Instead of photocopying rare examples, SMOTE invents believable new ones by blending each rare point with its near neighbours.");

  def("imbal",
    "What are over- and under-sampling for class imbalance?",
    "Duplicating minority-class rows (oversampling) or dropping majority-class rows (undersampling) to rebalance — done only on the training data to avoid leakage",
    ["Adding more features to the minority class only",
     "Scaling the minority class's features to a larger range",
     "Training two separate models and averaging them",
     "Lowering the learning rate for rare classes"],
    "Over/undersampling",
    "Duplicate the minority or drop the majority to rebalance; simple but blunt, and fit only on training data to avoid leakage.",
    "Oversampling repeats minority rows until the classes are even; undersampling throws away majority rows to the same end. Both are simple but blunt — oversampling can overfit copies, undersampling discards real data — and both must be applied only inside the training fold.",
    "Even the classes out by copying the rare ones up, or throwing the common ones away. Crude but quick — and never touch the validation data with it.");

  def("imbal",
    "What do class weights do in an imbalanced classifier?",
    "They tell the loss function to penalise minority-class mistakes more heavily, rebalancing the model without changing the data itself",
    ["They multiply the minority features by a constant before training",
     "They duplicate minority rows inside each mini-batch",
     "They raise the decision threshold for the majority class",
     "They remove the majority class from the loss entirely"],
    "Class weights",
    "Tell the loss to penalise minority-class mistakes more heavily, rebalancing without touching the data itself.",
    "Instead of resampling, you weight the loss: each minority error counts for more (often inversely proportional to class frequency). The optimiser then pays proper attention to the rare class. Most sklearn classifiers accept class_weight='balanced' to do this automatically.",
    "Leave the data alone; just tell the model 'getting the rare class wrong hurts more'. It then stops ignoring the minority.");

  /* ============ Extra Evaluation Metrics ============ */
  def("evalx",
    "What is balanced accuracy?",
    "The average of the recall on each class — the honest version of accuracy when the classes are imbalanced",
    ["The accuracy after the classes have been resampled to equal size",
     "The harmonic mean of precision and recall",
     "Accuracy measured only on the majority class",
     "The area under the ROC curve"],
    "Balanced accuracy",
    "The average recall across classes; the honest version of accuracy when the classes are imbalanced.",
    "Balanced accuracy averages the recall of each class, so a rare class counts as much as a common one. On a 99/1 split, always predicting the majority gives 50% balanced accuracy (not 99%), exposing the useless model that plain accuracy would praise.",
    "Score each class on its own recall, then average. Now the rare class matters just as much as the common one.");

  def("evalx",
    "What is the Matthews correlation coefficient (MCC)?",
    "A single balanced score built from all four confusion-matrix cells, staying reliable even when the classes are heavily skewed",
    ["The ratio of true positives to all predicted positives",
     "The average of precision and recall",
     "The area under the precision-recall curve",
     "The accuracy corrected for feature scaling"],
    "Matthews correlation coefficient (MCC)",
    "One balanced score built from all four confusion-matrix cells; robust even when classes are skewed.",
    "MCC is a correlation coefficient between predicted and true labels, computed from all four cells (TP, TN, FP, FN). It runs from -1 to +1, only reaching +1 when the model gets both classes right — so it can't be fooled by imbalance the way accuracy or even F1 can.",
    "One number, from -1 to +1, that only looks good when the model handles BOTH classes well. Hard to fool with a lopsided dataset.");

  def("evalx",
    "What does Cohen's kappa measure?",
    "Agreement between predictions and truth, corrected for the agreement you would expect purely by chance",
    ["The correlation between two input features",
     "The fraction of predictions that were correct",
     "The area under the ROC curve",
     "The calibration error of predicted probabilities"],
    "Cohen's kappa",
    "Classification agreement corrected for what pure chance would already produce.",
    "Raw agreement overstates skill because some matches happen by luck. Kappa subtracts the chance-expected agreement and rescales, so 0 means 'no better than guessing' and 1 means perfect. It's common for rater agreement and imbalanced classification.",
    "It's accuracy with the luck removed: 0 means you did no better than random guessing, 1 means perfect.");

  def("evalx",
    "What is the Brier score?",
    "The mean squared error of the predicted probabilities — lower means better-calibrated confidence",
    ["The area under the precision-recall curve",
     "The fraction of positives among the predicted positives",
     "The average recall across the two classes",
     "The log-odds of the most confident prediction"],
    "Brier score",
    "The mean squared error of predicted probabilities; lower means better-calibrated confidence.",
    "For each row, take (predicted probability − actual outcome), square it, and average. A confident-and-right model scores low; a confident-and-wrong one is punished hard. It rewards probabilities that are both accurate and honest, unlike accuracy which ignores confidence.",
    "Score how far each probability was from what actually happened, squared. Low is good — it means the model's confidence can be trusted.");

  def("evalx",
    "What does a calibration curve show?",
    "Predicted probability plotted against observed frequency; a diagonal line means the probabilities are trustworthy",
    ["Training error against the number of training examples",
     "Precision against recall as the threshold moves",
     "True-positive rate against false-positive rate",
     "One feature's average effect on the prediction"],
    "Calibration curve",
    "Plots predicted probability against observed frequency; a diagonal line means the probabilities are trustworthy.",
    "Bucket predictions by their claimed probability, then plot the actual fraction of positives in each bucket against the claimed value. On the diagonal, 'the model says 0.7' really happens 70% of the time. Sagging below means it's overconfident; above means underconfident.",
    "Group predictions by how sure the model was, then check how often it was actually right. On the diagonal = its confidence is honest.");

  def("evalx",
    "What is average precision (PR-AUC)?",
    "The area under the precision-recall curve — the go-to summary metric when the positive class is rare",
    ["The area under the ROC curve",
     "The average of precision and recall at the default threshold",
     "The fraction of correct predictions overall",
     "The mean squared error of the predicted probabilities"],
    "Average precision (PR-AUC)",
    "The area under the precision-recall curve; the go-to summary metric when positives are rare.",
    "Average precision summarises the whole precision-recall curve into one number. Because it ignores the huge pile of true negatives, it stays informative on rare-positive problems where ROC-AUC can look deceptively high.",
    "One number for the whole precision-vs-recall trade-off. Better than ROC-AUC when positives are needle-in-a-haystack rare.");

  /* ============ Regression & Boosting ============ */
  def("regr",
    "What is linear regression?",
    "Fitting a weighted sum of the features to a numeric target by minimising squared error — the baseline regressor",
    ["Predicting a category by drawing a boundary between classes",
     "Grouping unlabelled points into clusters",
     "Choosing the k nearest points and averaging their labels",
     "Shrinking many features down to a few components"],
    "Linear regression",
    "Fits a weighted sum of features to a numeric target by minimising squared error; the baseline regressor.",
    "Linear regression predicts a number as w1·x1 + w2·x2 + … + b, choosing the weights that minimise the summed squared errors. It's fast, interpretable and the natural first thing to try for a regression problem before anything fancier.",
    "Draw the straight line (or flat plane) that sits as close as possible to all the points, then read predictions off it. The plain-vanilla way to predict a number.");

  def("regr",
    "What is Elastic Net regularisation?",
    "A blend of L1 and L2 penalties — Lasso's feature-zeroing sparsity plus Ridge's stability on correlated features",
    ["A penalty that only ever shrinks weights, never zeroes them",
     "A method that adds interaction features automatically",
     "A way to scale features to zero mean and unit variance",
     "An ensemble of linear models trained on bootstraps"],
    "Elastic Net regularisation",
    "Blends L1 and L2 penalties: Lasso's feature-zeroing sparsity plus Ridge's stability on correlated features.",
    "Lasso (L1) can zero out features but behaves erratically when features are correlated; Ridge (L2) is stable but never zeroes. Elastic Net mixes both, so you get sparse, interpretable models that also stay steady when predictors are correlated.",
    "Take Lasso's talent for dropping useless features and Ridge's steadiness, and combine them. Best of both when features overlap.");

  def("regr",
    "What is RMSE (root mean squared error)?",
    "The square root of the mean squared error, expressed back in the target's own units for a readable error size",
    ["The fraction of predictions within 10% of the truth",
     "The average of the absolute errors",
     "The correlation between predictions and targets",
     "The squared error before averaging"],
    "RMSE",
    "The root of mean squared error, expressed back in the target's own units for readable error size.",
    "Square each error, average them, then take the square root to return to the original units (e.g. pounds, not pounds²). Squaring first means big misses are punished more than small ones, so RMSE is sensitive to outliers compared with mean absolute error.",
    "Average the squared misses, then square-root back to normal units. Big mistakes hurt it more than small ones.");

  def("regr",
    "What is LightGBM?",
    "A leaf-wise, histogram-based gradient-boosting library — very fast and memory-light on large tabular data",
    ["A deep neural network library for images",
     "A linear model with an L1 penalty",
     "A clustering algorithm for unlabelled data",
     "A tool for reducing features to principal components"],
    "LightGBM",
    "Leaf-wise, histogram-based gradient boosting; very fast and memory-light on large tabular data.",
    "LightGBM speeds up gradient boosting by bucketing feature values into histograms and growing trees leaf-wise (splitting the most promising leaf) rather than level-wise. It's a go-to for large tabular datasets where XGBoost would be slower or heavier.",
    "Gradient boosting built for speed: it bins the numbers and grows trees where they help most, so it flies through big tables.");

  def("regr",
    "What is CatBoost?",
    "A gradient-boosting library with native categorical-feature handling and ordered boosting to curb target leakage",
    ["A library that requires all categories to be one-hot encoded first",
     "A clustering method for categorical data",
     "A neural network for sequence data",
     "A feature-selection wrapper around linear models"],
    "CatBoost",
    "Gradient boosting with native categorical handling and ordered boosting to curb target leakage.",
    "CatBoost handles categorical columns directly (no manual one-hot needed) and uses 'ordered boosting' — computing target statistics on data the current model hasn't seen — to avoid the subtle target leakage that naive category encoding causes.",
    "Gradient boosting that eats categorical columns as-is, with a clever trick to stop categories from secretly leaking the answer.");

  /* ============ Validation ============ */
  def("valid",
    "What is group k-fold cross-validation?",
    "A split that keeps all rows from the same entity (user, firm, patient) inside one fold, so information never leaks across the split",
    ["A split that shuffles rows randomly into k equal folds",
     "A split that always trains on the past and tests on the future",
     "A split that uses every single row as its own test fold",
     "A split that stratifies folds to match class proportions"],
    "Group k-fold",
    "Keeps all rows from the same entity (user, firm, patient) inside one fold so information never leaks across the split.",
    "When several rows belong to the same subject, a random split can put some of that subject's rows in train and some in test — and the model 'cheats' by recognising the subject. Group k-fold keeps every subject wholly in one fold, so validation reflects truly unseen entities.",
    "If one person has many rows, keep them all on the same side of the split — otherwise the model just memorises the person and looks better than it is.");

  def("valid",
    "What is a time-series split?",
    "Always training on the past and validating on the future, never shuffling time-ordered data",
    ["Randomly assigning time-stamped rows to folds",
     "Keeping each entity's rows within one fold",
     "Using each row as its own validation fold",
     "Balancing the folds to have equal class counts"],
    "Time-series validation split",
    "Always train on the past and validate on the future; never shuffle time-ordered data.",
    "For time-ordered data, shuffling lets the model 'see the future' — training on later points to predict earlier ones. A time-series split validates only on data that comes after the training window, mimicking how the model will really be used, and typically rolls that window forward.",
    "Predict tomorrow from yesterday, never the reverse. Shuffling time data lets the model peek at the future and cheat.");

  def("valid",
    "What is leave-one-out cross-validation (LOOCV)?",
    "k-fold taken to the extreme: each row is its own validation fold, so you train n times — nearly unbiased but expensive",
    ["A split that holds out 20% of the rows once",
     "A split that keeps each entity in a single fold",
     "A split that always validates on the most recent rows",
     "A split that drops one feature at a time"],
    "Leave-one-out (LOOCV)",
    "k-fold taken to the extreme — each row is its own validation fold, so you train n times; nearly unbiased but expensive.",
    "LOOCV sets k equal to the number of rows: train on all-but-one, test on the one left out, and repeat for every row. It uses almost all the data each time (low bias) but costs n model fits and gives high-variance estimates, so it's mostly used on small datasets.",
    "Hold out just one row, train on the rest, test on that row — then do it for every row in turn. Thorough, but you train the model as many times as you have rows.");
})();
