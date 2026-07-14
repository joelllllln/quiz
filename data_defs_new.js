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
    "A game-theory method that assigns each feature its fair share of credit for one prediction, with the contributions plus a base value summing exactly to the model's output",
    ["A global ranking of features by how much they reduce node impurity when averaged across every split in every tree of the fitted ensemble, computed just once after all training completes",
     "The plain Pearson correlation between each individual feature and the target column, measured once on the raw data before any model has been trained on it",
     "A regularisation penalty term that gradually shrinks the least useful feature weights toward zero while the model is being fitted to the training set",
     "The raw gradient of the loss with respect to each individual input, evaluated once at the very start of training before any parameter updates occur"],
    "SHAP values",
    "Game-theory credit assignment: each feature's fair contribution to a single prediction; the contributions plus a base value sum exactly to the model's output.",
    "SHAP borrows the Shapley value from cooperative game theory: it fairly splits a single prediction among the features. Starting from a base value (the average prediction), each feature's SHAP value nudges the output up or down, and together they land exactly on the model's output for that row.",
    "It's a fair way to share the blame (or credit) for one prediction across the features. Start from the average prediction, add every feature's push, and you land exactly on the model's output for that row.");

  def("interp",
    "What is LIME (Local Interpretable Model-agnostic Explanations)?",
    "It fits a simple, readable surrogate model around a single prediction to explain it locally — model-agnostic, but only faithful near that one point",
    ["It trains a single simple global model that permanently replaces the complex one everywhere, using that one surrogate for every prediction across the entire dataset",
     "It ranks the features just once for the whole dataset using mutual information, then keeps that one fixed ordering for explaining every future prediction",
     "It recalibrates the predicted probabilities of a classifier after training so that they line up with the observed frequencies seen in a held-out validation set",
     "It searches for the smallest possible subset of features that still keeps overall model accuracy high, discarding all of the rest before the final training"],
    "LIME",
    "Fits a simple, readable model around one prediction to explain it locally; model-agnostic but only faithful near that point.",
    "LIME probes the model with small variations of one input, then fits a tiny interpretable model (like a short linear rule) to those nearby answers. It explains that one prediction well, but the explanation isn't meant to hold far away.",
    "To explain one decision, LIME wiggles the inputs a little, watches how the answer changes, and fits a simple rule to that neighbourhood. Trustworthy right around that case, not everywhere.");

  def("interp",
    "What does a partial dependence plot (PDP) show?",
    "The average effect of one feature on the prediction, marginalising over all the other features — the global shape of the relationship",
    ["The individual contribution that every single feature makes to one particular prediction, added up so the separate parts land exactly on that row output value",
     "How the training error and the validation error both change as the model is shown progressively more and more of the training data over time",
     "The pairwise correlation between two chosen features measured across the whole dataset, calculated before the model has even been fitted",
     "The pattern of residuals that are left over after the model has been fitted, plotted against the fitted values for every row"],
    "Partial dependence plot (PDP)",
    "The average effect of one feature on predictions, marginalising over the others; shows the shape of the relationship globally.",
    "A PDP sweeps one feature across its range, averages the model's prediction over all other features at each step, and plots the result — revealing whether the relationship is rising, flat, U-shaped and so on, across the whole model.",
    "Hold everything else as it is, slide one feature from low to high, and average the prediction at each point. The plotted line shows that feature's overall push on the answer.");

  def("interp",
    "What is the difference between a global and a local explanation?",
    "A global explanation describes the whole model's behaviour across all data; a local explanation describes one specific prediction",
    ["A global explanation is always computed on the training set while a local explanation is always computed on the separate held-out test set",
     "A global explanation only ever applies to linear models while a local explanation only ever applies to tree-based models and their ensembles",
     "A global explanation is produced before the model is trained while a local explanation can only ever be produced once training has fully finished",
     "There is no real difference at all between the two terms; they are fully interchangeable labels for one and the same explanation technique"],
    "Global vs local explanation",
    "Global explains the whole model's behaviour across all data; local explains one specific prediction.",
    "Global tools (like a PDP or overall feature importances) tell you how the model behaves in general. Local tools (like SHAP or LIME on one row) tell you why the model made this particular decision. You usually want both.",
    "Global = 'how does the model behave in general?' Local = 'why did it say THAT for this one case?' Different questions, different tools.");

  def("interp",
    "What is a model card?",
    "A short spec sheet documenting a model's intended use, training data, evaluation metrics and known limitations",
    ["A saved binary file that stores only the trained weights of the model and nothing at all about how or where it should be used",
     "A live monitoring dashboard that continuously streams the prediction latency and the request throughput of the running model in real time",
     "A ranked list of the most important input features of the model, sorted from top to bottom by their overall contribution to accuracy",
     "A signed licence key that formally authorises the trained model to be deployed and used within a production environment"],
    "Model card",
    "A spec sheet documenting a model's intended use, training data, metrics, and limits; increasingly expected by regulators.",
    "A model card is a plain-language document that travels with a model: what it's for, what data trained it, how well it scores, where it should NOT be used, and its known biases. Regulators and responsible-AI practices increasingly expect one.",
    "Think of it as the label on the tin: what the model is for, what it was trained on, how good it is, and where it shouldn't be trusted.");

  /* ============ Class Imbalance ============ */
  def("imbal",
    "What is class imbalance?",
    "When one class massively outnumbers the others, so plain accuracy is misleading and you must resample, reweight, or move the threshold",
    ["When the input features happen to be measured on very different numeric scales, so one of them dominates the distance calculations",
     "When the training set and the test set are drawn from noticeably different distributions, so the measured performance drops at deployment",
     "When two or more of the input features carry almost exactly the same information, making their separate effects very hard to untangle",
     "When the model ends up with far more free parameters than there are training rows, leaving it prone to simply memorising the data"],
    "Class imbalance",
    "When one class massively outnumbers the others; accuracy lies, so you resample, reweight, or move the threshold.",
    "If 99% of rows are 'negative', a model that always predicts 'negative' scores 99% accuracy while catching nothing. That's class imbalance: accuracy flatters a useless model, so you switch to recall/precision, reweight the loss, resample, or move the decision threshold.",
    "One class swamps the other. A lazy 'always say the common one' model looks great on accuracy but is useless — so accuracy is the wrong scoreboard here.");

  def("imbal",
    "What is SMOTE (Synthetic Minority Over-sampling Technique)?",
    "It creates new minority-class rows by interpolating between nearby minority examples, instead of simply duplicating existing ones",
    ["It deletes randomly chosen majority-class rows until the two classes are evenly balanced, shrinking the overall dataset in the process",
     "It reweights the loss function so that every mistake on the minority class costs a great deal more, without adding or removing any rows",
     "It lowers the decision threshold at prediction time so that many more of the borderline cases end up being flagged as the positive class",
     "It removes the noisiest outliers from the minority class before training, so the handful of remaining rare examples are cleaner"],
    "SMOTE",
    "Synthesises new minority-class rows by interpolating between near neighbours rather than duplicating existing ones.",
    "SMOTE picks a minority point, finds its nearest minority neighbours, and creates a synthetic point somewhere on the line between them. This grows the minority class with fresh variety rather than exact copies — reducing the overfitting that plain duplication causes. Fit it on training data only.",
    "Instead of photocopying rare examples, SMOTE invents believable new ones by blending each rare point with its near neighbours.");

  def("imbal",
    "What are over- and under-sampling for class imbalance?",
    "Duplicating minority-class rows (oversampling) or dropping majority-class rows (undersampling) to rebalance — done only on the training data to avoid leakage",
    ["Adding a whole batch of extra engineered features that are computed only for the minority-class rows, in the hope that this will somehow make them much easier to separate",
     "Scaling only the features of the minority-class rows onto a deliberately larger numeric range so that the model weights those rows more heavily",
     "Training two entirely separate models on the very same data and then averaging their predictions to smooth out the class imbalance",
     "Lowering the learning rate of the optimiser specifically whenever a rare-class example is encountered during the training loop"],
    "Over/undersampling",
    "Duplicate the minority or drop the majority to rebalance; simple but blunt, and fit only on training data to avoid leakage.",
    "Oversampling repeats minority rows until the classes are even; undersampling throws away majority rows to the same end. Both are simple but blunt — oversampling can overfit copies, undersampling discards real data — and both must be applied only inside the training fold.",
    "Even the classes out by copying the rare ones up, or throwing the common ones away. Crude but quick — and never touch the validation data with it.");

  def("imbal",
    "What do class weights do in an imbalanced classifier?",
    "They tell the loss function to penalise minority-class mistakes more heavily, rebalancing the model without changing the data itself",
    ["They multiply all of the minority-class feature values by a fixed constant before training, so that those rows visibly stand out more",
     "They quietly duplicate a few of the minority-class rows inside every single mini-batch, so that each batch sees a much fairer class balance",
     "They raise the decision threshold that is applied to the majority class, so that far fewer of its cases end up being predicted as such",
     "They drop the majority class out of the loss calculation entirely, so that only the minority-class errors ever influence the fitting"],
    "Class weights",
    "Tell the loss to penalise minority-class mistakes more heavily, rebalancing without touching the data itself.",
    "Instead of resampling, you weight the loss: each minority error counts for more (often inversely proportional to class frequency). The optimiser then pays proper attention to the rare class. Most sklearn classifiers accept class_weight='balanced' to do this automatically.",
    "Leave the data alone; just tell the model 'getting the rare class wrong hurts more'. It then stops ignoring the minority.");

  /* ============ Extra Evaluation Metrics ============ */
  def("evalx",
    "What is balanced accuracy?",
    "The average of the recall on each class — the honest version of accuracy when the classes are imbalanced",
    ["The plain accuracy measured after the classes have first been resampled to be equal in size, then evaluated in the usual way",
     "The harmonic mean of the precision and the recall of the positive class, combined together into one single summary figure",
     "The accuracy of the model measured only on the majority-class rows, quietly ignoring how well it does on the rare class",
     "The total area under the ROC curve, which traces the true-positive rate against the false-positive rate as the threshold moves"],
    "Balanced accuracy",
    "The average recall across classes; the honest version of accuracy when the classes are imbalanced.",
    "Balanced accuracy averages the recall of each class, so a rare class counts as much as a common one. On a 99/1 split, always predicting the majority gives 50% balanced accuracy (not 99%), exposing the useless model that plain accuracy would praise.",
    "Score each class on its own recall, then average. Now the rare class matters just as much as the common one.");

  def("evalx",
    "What is the Matthews correlation coefficient (MCC)?",
    "A single balanced score built from all four confusion-matrix cells, staying reliable even when the classes are heavily skewed",
    ["The simple ratio of the true positives to every single row that was predicted positive, ignoring all of the negatives entirely",
     "The plain arithmetic average of the precision and the recall of the positive class, taken together as one single figure",
     "The area under the precision-recall curve, summarising the trade-off between precision and recall as the threshold is moved",
     "The overall accuracy of the model after it has been carefully corrected for the differing scales of the individual input features"],
    "Matthews correlation coefficient (MCC)",
    "One balanced score built from all four confusion-matrix cells; robust even when classes are skewed.",
    "MCC is a correlation coefficient between predicted and true labels, computed from all four cells (TP, TN, FP, FN). It runs from -1 to +1, only reaching +1 when the model gets both classes right — so it can't be fooled by imbalance the way accuracy or even F1 can.",
    "One number, from -1 to +1, that only looks good when the model handles BOTH classes well. Hard to fool with a lopsided dataset.");

  def("evalx",
    "What does Cohen's kappa measure?",
    "Agreement between predictions and truth, corrected for the agreement you would expect purely by chance",
    ["The linear correlation measured between two of the chosen input features right across the whole of the dataset",
     "The plain fraction of all of the predictions that turned out to be correct, with no adjustment for chance at all",
     "The area under the ROC curve traced by the true-positive rate against the false-positive rate as the threshold varies",
     "The average calibration error between the predicted probabilities and the observed frequencies of the outcomes"],
    "Cohen's kappa",
    "Classification agreement corrected for what pure chance would already produce.",
    "Raw agreement overstates skill because some matches happen by luck. Kappa subtracts the chance-expected agreement and rescales, so 0 means 'no better than guessing' and 1 means perfect. It's common for rater agreement and imbalanced classification.",
    "It's accuracy with the luck removed: 0 means you did no better than random guessing, 1 means perfect.");

  def("evalx",
    "What is the Brier score?",
    "The mean squared error of the predicted probabilities — lower means better-calibrated confidence",
    ["The area under the precision-recall curve, summarising precision against recall across all of the thresholds",
     "The fraction of genuine positives found among all of the rows that the model predicted to be positive",
     "The simple average of the recall computed separately on each one of the two different classes",
     "The log-odds value attached to the single most confident prediction that the model happened to make"],
    "Brier score",
    "The mean squared error of predicted probabilities; lower means better-calibrated confidence.",
    "For each row, take (predicted probability − actual outcome), square it, and average. A confident-and-right model scores low; a confident-and-wrong one is punished hard. It rewards probabilities that are both accurate and honest, unlike accuracy which ignores confidence.",
    "Score how far each probability was from what actually happened, squared. Low is good — it means the model's confidence can be trusted.");

  def("evalx",
    "What does a calibration curve show?",
    "Predicted probability plotted against observed frequency; a diagonal line means the probabilities are trustworthy",
    ["The training error plotted against the steadily growing number of training examples the model has been shown so far",
     "The precision plotted against the recall as the decision threshold is swept slowly from one extreme all the way to the other",
     "The true-positive rate plotted against the false-positive rate as the classification threshold is varied across its range",
     "The average effect that one chosen feature has on the prediction as its value is swept right across its whole range"],
    "Calibration curve",
    "Plots predicted probability against observed frequency; a diagonal line means the probabilities are trustworthy.",
    "Bucket predictions by their claimed probability, then plot the actual fraction of positives in each bucket against the claimed value. On the diagonal, 'the model says 0.7' really happens 70% of the time. Sagging below means it's overconfident; above means underconfident.",
    "Group predictions by how sure the model was, then check how often it was actually right. On the diagonal = its confidence is honest.");

  def("evalx",
    "What is average precision (PR-AUC)?",
    "The area under the precision-recall curve — the go-to summary metric when the positive class is rare",
    ["The area under the ROC curve, tracing the true-positive rate against the false-positive rate as the threshold changes",
     "The plain average of the precision and the recall, both taken at the single default threshold of the classifier",
     "The overall fraction of predictions that came out correct across every row, regardless of which class they belong to",
     "The mean squared error measured between the predicted probabilities and the actual binary outcome on each row"],
    "Average precision (PR-AUC)",
    "The area under the precision-recall curve; the go-to summary metric when positives are rare.",
    "Average precision summarises the whole precision-recall curve into one number. Because it ignores the huge pile of true negatives, it stays informative on rare-positive problems where ROC-AUC can look deceptively high.",
    "One number for the whole precision-vs-recall trade-off. Better than ROC-AUC when positives are needle-in-a-haystack rare.");

  /* ============ Regression & Boosting ============ */
  def("regr",
    "What is linear regression?",
    "Fitting a weighted sum of the features to a numeric target by minimising squared error — the baseline regressor",
    ["Predicting a discrete category by drawing the best separating boundary between the different classes in feature space",
     "Grouping unlabelled data points together into clusters based purely on how close together they sit in feature space",
     "Choosing the k nearest training points to a query point and then averaging their labels to produce the final prediction",
     "Shrinking many correlated features down into a small handful of components that together capture most of the variance"],
    "Linear regression",
    "Fits a weighted sum of features to a numeric target by minimising squared error; the baseline regressor.",
    "Linear regression predicts a number as w1·x1 + w2·x2 + … + b, choosing the weights that minimise the summed squared errors. It's fast, interpretable and the natural first thing to try for a regression problem before anything fancier.",
    "Draw the straight line (or flat plane) that sits as close as possible to all the points, then read predictions off it. The plain-vanilla way to predict a number.");

  def("regr",
    "What is Elastic Net regularisation?",
    "A blend of L1 and L2 penalties — Lasso's feature-zeroing sparsity plus Ridge's stability on correlated features",
    ["A penalty term that only ever shrinks the weights gradually toward zero but never actually sets any single one of them to zero",
     "A method that automatically constructs and adds a set of pairwise interaction features to the data before the model is fitted",
     "A preprocessing step that rescales every one of the features to have zero mean and unit variance before training begins",
     "An ensemble of several separate linear models, each of them trained on a different bootstrap resample of the training data"],
    "Elastic Net regularisation",
    "Blends L1 and L2 penalties: Lasso's feature-zeroing sparsity plus Ridge's stability on correlated features.",
    "Lasso (L1) can zero out features but behaves erratically when features are correlated; Ridge (L2) is stable but never zeroes. Elastic Net mixes both, so you get sparse, interpretable models that also stay steady when predictors are correlated.",
    "Take Lasso's talent for dropping useless features and Ridge's steadiness, and combine them. Best of both when features overlap.");

  def("regr",
    "What is RMSE (root mean squared error)?",
    "The square root of the mean squared error, expressed back in the target's own units for a readable error size",
    ["The fraction of the predictions that happen to land within ten percent of the true target value on each individual row",
     "The plain average of the absolute prediction errors, taken directly in the original units of the target variable",
     "The linear correlation coefficient measured between the predictions and the true target values right across all rows",
     "The total squared error summed up across every single row, before any averaging or square-rooting has been applied"],
    "RMSE",
    "The root of mean squared error, expressed back in the target's own units for readable error size.",
    "Square each error, average them, then take the square root to return to the original units (e.g. pounds, not pounds²). Squaring first means big misses are punished more than small ones, so RMSE is sensitive to outliers compared with mean absolute error.",
    "Average the squared misses, then square-root back to normal units. Big mistakes hurt it more than small ones.");

  def("regr",
    "What is LightGBM?",
    "A leaf-wise, histogram-based gradient-boosting library — very fast and memory-light on large tabular data",
    ["A deep neural network library built mainly for image recognition and other computer-vision style tasks",
     "A plain linear model that is fitted with an L1 penalty, which drives many of its coefficients down to zero",
     "An unsupervised clustering algorithm that groups unlabelled data points together purely by their similarity",
     "A dimensionality-reduction tool that compresses many correlated features down into a few principal components"],
    "LightGBM",
    "Leaf-wise, histogram-based gradient boosting; very fast and memory-light on large tabular data.",
    "LightGBM speeds up gradient boosting by bucketing feature values into histograms and growing trees leaf-wise (splitting the most promising leaf) rather than level-wise. It's a go-to for large tabular datasets where XGBoost would be slower or heavier.",
    "Gradient boosting built for speed: it bins the numbers and grows trees where they help most, so it flies through big tables.");

  def("regr",
    "What is CatBoost?",
    "A gradient-boosting library with native categorical-feature handling and ordered boosting to curb target leakage",
    ["A boosting library that still requires every categorical column to be manually one-hot encoded by hand before any training",
     "An unsupervised clustering method designed specifically for grouping together rows that are described by categorical data",
     "A recurrent neural network architecture built for modelling ordered sequence data such as text or time series",
     "A feature-selection wrapper that repeatedly refits plain linear models in order to pick the most useful subset of features"],
    "CatBoost",
    "Gradient boosting with native categorical handling and ordered boosting to curb target leakage.",
    "CatBoost handles categorical columns directly (no manual one-hot needed) and uses 'ordered boosting' — computing target statistics on data the current model hasn't seen — to avoid the subtle target leakage that naive category encoding causes.",
    "Gradient boosting that eats categorical columns as-is, with a clever trick to stop categories from secretly leaking the answer.");

  /* ============ Validation ============ */
  def("valid",
    "What is group k-fold cross-validation?",
    "A split that keeps all rows from the same entity (user, firm, patient) inside one fold, so information never leaks across the split",
    ["A split that simply shuffles all of the rows at random and then deals them out evenly into k equally sized folds to be used for validation in turn",
     "A split that always trains on the earlier time-ordered rows and then tests only on the later ones, to avoid look-ahead",
     "A split that uses every single row in turn as its own one-row test fold, training on all of the other rows each time",
     "A split that carefully stratifies each of the folds so that every one matches the overall class proportions of the data"],
    "Group k-fold",
    "Keeps all rows from the same entity (user, firm, patient) inside one fold so information never leaks across the split.",
    "When several rows belong to the same subject, a random split can put some of that subject's rows in train and some in test — and the model 'cheats' by recognising the subject. Group k-fold keeps every subject wholly in one fold, so validation reflects truly unseen entities.",
    "If one person has many rows, keep them all on the same side of the split — otherwise the model just memorises the person and looks better than it is.");

  def("valid",
    "What is a time-series split?",
    "Always training on the past and validating on the future, never shuffling time-ordered data",
    ["Randomly assigning the time-stamped rows to folds while completely ignoring the order in which they actually occurred",
     "Keeping all of the rows belonging to each entity together inside one single fold in order to prevent information leakage",
     "Using each individual row in turn as its own single-row validation fold, while training on all of the rest of the rows",
     "Balancing every one of the folds so that it ends up holding roughly equal counts of each of the target classes"],
    "Time-series validation split",
    "Always train on the past and validate on the future; never shuffle time-ordered data.",
    "For time-ordered data, shuffling lets the model 'see the future' — training on later points to predict earlier ones. A time-series split validates only on data that comes after the training window, mimicking how the model will really be used, and typically rolls that window forward.",
    "Predict tomorrow from yesterday, never the reverse. Shuffling time data lets the model peek at the future and cheat.");

  def("valid",
    "What is leave-one-out cross-validation (LOOCV)?",
    "k-fold taken to the extreme: each row is its own validation fold, so you train n times — nearly unbiased but expensive",
    ["A split that holds out a single fixed twenty percent of the rows just once and trains on the remaining eighty percent",
     "A split that deliberately keeps all of the rows from each entity together within a single fold, in order to stop leakage",
     "A split that always trains on the older rows and then validates only on the most recent time-ordered rows in the data",
     "A split that leaves out one feature at a time in order to measure how much each feature matters to the fitted model"],
    "Leave-one-out (LOOCV)",
    "k-fold taken to the extreme — each row is its own validation fold, so you train n times; nearly unbiased but expensive.",
    "LOOCV sets k equal to the number of rows: train on all-but-one, test on the one left out, and repeat for every row. It uses almost all the data each time (low bias) but costs n model fits and gives high-variance estimates, so it's mostly used on small datasets.",
    "Hold out just one row, train on the rest, test on that row — then do it for every row in turn. Thorough, but you train the model as many times as you have rows.");
})();
