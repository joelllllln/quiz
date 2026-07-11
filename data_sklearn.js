/* Advanced Scikit-learn — Parts I & II. choices[0] is always correct (shuffled at render). */
(window.QUESTIONS = window.QUESTIONS || {}).skl1 = [
  {
    "q": "Why do many scikit-learn functions like train_test_split and RandomForestClassifier accept a random_state argument?",
    "choices": [
      "It fixes the random seed so the same run reproduces identical results",
      "It sets how many random features each tree split is allowed to weigh",
      "It controls how much random noise gets added to the training labels",
      "It tells the model the maximum number of random restarts to attempt",
      "It picks a random subset of rows to permanently discard as outliers"
    ],
    "explain": "Algorithms that shuffle, split, or sample rely on a pseudo-random number generator. Passing a fixed random_state seeds that generator, so every run produces the same splits, initializations, and results. That reproducibility is what makes model comparisons fair and bugs debuggable.",
    "simple": "Think of shuffling a deck of cards. If you and a friend both start from the exact same shuffle, you deal the same hands every time. random_state is that agreed-upon shuffle, so anyone re-running your code sees the identical outcome.",
    "widget": {
      "type": "curveStatic",
      "title": "Same seed, same run",
      "world": "Two people run the same model five times; one fixes random_state, one does not.",
      "xlab": "repeated runs →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["run 1", "run 2", "run 3", "run 4", "run 5"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "Fixed seed (accuracy %)", "ys": [85, 85, 85, 85, 85] },
        { "name": "No seed (accuracy %)", "ys": [82, 87, 84, 86, 83] }
      ],
      "knob": { "label": "Run number", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Run to run, the fixed-seed line never moves off 85%.", "tone": "info" },
        { "max": 3, "text": "The unseeded line wobbles every run - hard to compare.", "tone": "info" },
        { "max": 4, "text": "🤯 Fix the seed and your 'random' results become perfectly repeatable.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "random_state / reproducibility", "formula": "random_state=42 -> identical results every run", "text": "Seeding the random generator makes splits, shuffles, and fits reproducible." }
    }
  },
  {
    "q": "Why do you hold out a test set with train_test_split instead of scoring the model on the same data it trained on?",
    "choices": [
      "Scores on unseen data reveal how well the model truly generalizes",
      "Smaller training sets always make the fitting step run much faster",
      "Models cannot mathematically compute a score on their training rows",
      "Test data is needed to give the model extra examples to learn from",
      "Splitting the data automatically removes outliers from both halves"
    ],
    "explain": "A model can memorize its training rows and score deceptively high on them, hiding overfitting. Evaluating on a held-out test set - data never seen during fit - estimates performance on future, real-world inputs. That honest estimate is the whole point of the split.",
    "simple": "Imagine a student who studies the exact answer key, then takes a test made of those same questions - of course they ace it. To know if they really learned, you give them new questions. The test set is those new questions your model has never seen.",
    "widget": {
      "type": "curveStatic",
      "title": "Train score vs test score",
      "world": "As a model is allowed to fit the training data harder, watch both scores.",
      "xlab": "model complexity →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["very simple", "simple", "medium", "complex", "very complex"],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "Train accuracy", "ys": [70, 80, 88, 94, 99] },
        { "name": "Test accuracy", "ys": [68, 78, 85, 82, 74] }
      ],
      "knob": { "label": "Complexity", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Simple model: train and test scores roughly agree.", "tone": "info" },
        { "max": 3, "text": "Push complexity up and train accuracy keeps rising.", "tone": "info" },
        { "max": 4, "text": "🤯 Train hits 99% but test drops to 74% - only the held-out set caught the overfitting.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Train/test split (holdout evaluation)", "formula": "train_test_split(X, y, test_size=0.2)", "text": "Scoring on unseen data is the only honest measure of generalization." }
    }
  },
  {
    "q": "What does k-fold cross-validation (as in cross_val_score with cv=5) actually do?",
    "choices": [
      "Splits data into k parts, trains on k-1 and tests on the rest, rotating",
      "Trains the model k separate times and keeps only the single fastest one",
      "Runs the model k times and averages k different candidate learning rates",
      "Splits the labels into k groups and predicts each group's running average",
      "Repeats the fit until the score stops improving for k straight rounds"
    ],
    "explain": "Cross-validation partitions the data into k equal folds. Each fold takes a turn as the test set while the other k-1 folds train the model, giving k scores. Averaging them uses every row for both training and testing and yields a more stable estimate than a single split.",
    "simple": "Picture five friends taking turns being the referee while the other four play. Everyone gets a fair turn judging, so no single lucky or unlucky matchup decides the verdict. Cross-validation rotates which slice of data is the 'referee' test set.",
    "widget": {
      "type": "curveStatic",
      "title": "Rotating the test fold",
      "world": "Five-fold CV: each fold is the test set once, producing five scores.",
      "xlab": "fold used as test →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["fold 1", "fold 2", "fold 3", "fold 4", "fold 5"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "Fold score (accuracy %)", "ys": [84, 79, 86, 81, 85] }
      ],
      "knob": { "label": "Fold", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Fold 1 alone gives 84% - but that's just one split.", "tone": "info" },
        { "max": 3, "text": "Different folds score differently: 79% up to 86%.", "tone": "info" },
        { "max": 4, "text": "🤯 Average all five (about 83%) for a stable estimate no single split could give.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "K-fold cross-validation", "formula": "cross_val_score(model, X, y, cv=5)", "text": "Every row serves as test once; averaging k folds gives a stable score." }
    }
  },
  {
    "q": "A column contains the text values 'red', 'green', and 'blue'. Why must you one-hot encode it before a scikit-learn model can use it?",
    "choices": [
      "Models need numbers, so each category becomes its own 0/1 column",
      "Text columns must be sorted alphabetically before any model reads them",
      "One-hot encoding shrinks the table so training uses far less memory",
      "Models require every column to hold only unique, non-repeating values",
      "Encoding merges the rarest categories together to balance the classes"
    ],
    "explain": "Scikit-learn estimators operate on numeric arrays, so raw category strings must be converted first. One-hot encoding creates a separate 0/1 indicator column per category, avoiding the false ordering that simply numbering them (red=0, green=1, blue=2) would imply. OneHotEncoder learns the categories on training data and applies the same mapping later.",
    "simple": "A model only speaks numbers, not words like 'red' or 'blue'. Labeling them 1, 2, 3 would wrongly suggest blue is 'more than' red. Instead you give each color its own yes/no switch, so no color looks bigger than another.",
    "widget": {
      "type": "curveStatic",
      "title": "One column becomes many",
      "world": "One-hot encoding a categorical column that has more and more distinct categories.",
      "xlab": "distinct categories →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["2", "5", "10", "20", "50"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "New 0/1 columns created", "ys": [2, 5, 10, 20, 50] }
      ],
      "knob": { "label": "Categories", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Two categories become two indicator columns.", "tone": "info" },
        { "max": 3, "text": "Ten categories become ten columns, each a 0/1 switch.", "tone": "info" },
        { "max": 4, "text": "🤯 Fifty categories become fifty numeric columns - now the model can read them.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "One-hot encoding categoricals", "formula": "OneHotEncoder() -> one 0/1 column per category", "text": "Estimators need numeric input, so each category becomes its own indicator column." }
    }
  },
  {
    "q": "In scikit-learn, what is an 'estimator'?",
    "choices": [
      "Any object that learns from data via a shared create-fit-use interface",
      "Only the final predictive model sitting at the end of a pipeline chain",
      "A scoring function that measures how well predictions match the labels",
      "A saved set of hyperparameters you pass into a model's constructor",
      "The numeric array of predictions a model returns for the new rows"
    ],
    "explain": "Estimator is sklearn's base abstraction: every model, scaler, and encoder is an estimator with the same grammar - construct it with hyperparameters, call .fit() to learn, then use it. This one interface is why you can swap a LogisticRegression for a RandomForest without changing the surrounding code.",
    "simple": "Think of estimators as appliances that all share the same three buttons: build, learn, use. Because a blender and a toaster expose the same controls, you can swap one for the other without relearning the panel. That uniformity is what makes sklearn feel like one tool instead of a hundred.",
    "widget": {
      "type": "curveStatic",
      "title": "One interface, many models",
      "world": "Swapping the model at the end of a fixed pipeline: how many surrounding lines you must rewrite each time.",
      "xlab": "models tried →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["LogReg", "SVC", "Tree", "Forest", "GBoost"],
      "dec": 0,
      "yunit": "",
      "series": [
        { "name": "glue lines changed to swap", "ys": [0, 0, 0, 0, 0] },
        { "name": "model types supported", "ys": [1, 2, 3, 4, 5] }
      ],
      "knob": { "label": "Models tried", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "One estimator, one interface: construct, fit, predict.", "tone": "info" },
        { "max": 3, "text": "Swap in three more model types - the surrounding code still changes by zero lines.", "tone": "info" },
        { "max": 4, "text": "🤯 Every estimator shares create-fit-use, so models become interchangeable parts.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Estimator", "formula": "est = Model(params); est.fit(X, y)", "text": "The shared interface lets you swap any estimator for another without touching the code around it." }
    }
  },
  {
    "q": "What does calling .fit(X, y) do to a scikit-learn estimator?",
    "choices": [
      "It learns from the data and stores what it learned on the object",
      "It returns the predicted labels for the rows you pass as X and y",
      "It splits the data into training and validation folds internally",
      "It checks the model's accuracy against the true labels held in y",
      "It sets the hyperparameters that control how the model behaves"
    ],
    "explain": ".fit() is the learning step: the estimator looks at features X (and labels y when supervised) and stores the fitted parameters - coefficients, tree splits, scaler means - as attributes ending in an underscore. Nothing is predicted yet; fit only changes the object's internal state.",
    "simple": "Fitting is studying for the exam, not taking it. The model pores over the examples and writes everything it figures out onto its own notes. Later, .predict() is sitting the exam using those notes.",
    "widget": {
      "type": "curveStatic",
      "title": "What fit changes",
      "world": "Watch a model's training error fall as .fit() learns from the data across passes.",
      "xlab": "fit progress →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["start", "25%", "50%", "75%", "done"],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "training error", "ys": [0.9, 0.5, 0.3, 0.18, 0.12] }
      ],
      "knob": { "label": "Fit progress", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Before fitting, the fresh estimator knows nothing - error is high.", "tone": "info" },
        { "max": 3, "text": "As .fit() processes the data, the learned parameters drive the error down.", "tone": "info" },
        { "max": 4, "text": "🤯 When fit finishes, the learning is stored on the object, ready to use.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": ".fit(X, y)", "formula": "est.fit(X, y) -> learns, stores params_ on est", "text": "Fit is the only step that changes what the model knows; call it on training data only." }
    }
  },
  {
    "q": "After fitting a classifier, how do .predict and .predict_proba differ?",
    "choices": [
      "predict gives hard class labels; predict_proba gives class probabilities",
      "predict gives probabilities; predict_proba gives the rounded class labels",
      "predict works only on the training rows; predict_proba on new unseen rows",
      "predict retrains the model on each call; predict_proba reuses the fit",
      "predict handles regression targets; predict_proba handles class targets"
    ],
    "explain": "Both apply the fitted model to new rows, but at different resolutions: predict returns a single chosen label per row, while predict_proba returns the estimated probability of each class. The hard label is usually just predict_proba's argmax at a 0.5 threshold - the probabilities let you move that threshold.",
    "simple": "predict is the doctor saying 'you have the flu'. predict_proba is the doctor saying '80% flu, 15% cold, 5% nothing'. Same diagnosis engine, but the percentages let you decide how cautious to be before acting.",
    "widget": {
      "type": "curveStatic",
      "title": "Labels vs probabilities",
      "world": "Five rows sorted by predicted probability of the positive class; the hard label appears once probability crosses 0.5.",
      "xlab": "rows, low to high p →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["r1", "r2", "r3", "r4", "r5"],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "predict_proba (P of positive)", "ys": [0.1, 0.35, 0.5, 0.72, 0.9] },
        { "name": "predict (hard label 0/1)", "ys": [0, 0, 1, 1, 1] }
      ],
      "knob": { "label": "Row", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Low-probability rows: predict_proba near 0, predict says class 0.", "tone": "info" },
        { "max": 3, "text": "Around 0.5, predict flips to class 1 - the label is just proba thresholded.", "tone": "info" },
        { "max": 4, "text": "🤯 predict_proba keeps the nuance predict throws away; move the threshold to trade precision for recall.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": ".predict / .predict_proba", "formula": "predict = argmax(predict_proba) at threshold 0.5", "text": "Use predict_proba when you need to tune the decision threshold, not just accept 0.5." }
    }
  },
  {
    "q": "In scikit-learn, what is a 'transformer' and what does .transform do?",
    "choices": [
      "An estimator that reshapes data; fit learns a recipe, transform applies it",
      "An estimator that predicts labels; fit trains it, then transform scores it",
      "A model that combines several estimators; transform averages their output",
      "A tool that tunes hyperparameters; transform refits the best model on data",
      "A function that splits data into folds; transform returns each fold in turn"
    ],
    "explain": "Transformers are estimators whose job is to reshape data rather than predict - scalers, encoders, PCA. .fit learns the transformation parameters from training data (a scaler's mean and std, say), and .transform then applies that fixed recipe to any data you pass, including the test set.",
    "simple": "A transformer is like a recipe you calibrate once. .fit tastes the training batch and decides 'add this much salt'; .transform then seasons every future dish by that same rule. Because the recipe is fixed at fit time, test data gets the training recipe - no peeking.",
    "widget": {
      "type": "curveStatic",
      "title": "Fit the recipe, transform the data",
      "world": "Raw feature values passed through a fitted StandardScaler: transform maps them onto a common z-scored scale.",
      "xlab": "sample rows →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["r1", "r2", "r3", "r4", "r5"],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "raw value", "ys": [100, 120, 140, 160, 180] },
        { "name": "after .transform (z-score)", "ys": [-1.41, -0.71, 0, 0.71, 1.41] }
      ],
      "knob": { "label": "Row", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "fit learned the mean (140) and spread from the training rows.", "tone": "info" },
        { "max": 3, "text": "transform re-expresses each raw value as standard deviations from that mean.", "tone": "info" },
        { "max": 4, "text": "🤯 The same learned recipe applies to test data - fit on train, transform everywhere.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Transformer & .transform", "formula": "scaler.fit(X_train); scaler.transform(X_any)", "text": "Fit learns the recipe from training data only; transform applies that same recipe to any set." }
    }
  },
  {
    "q": "What does GridSearchCV do?",
    "choices": [
      "Tries every hyperparameter combo with cross-validation, refits the best",
      "Samples random hyperparameter combos until the score stops improving",
      "Trains one model per fold and averages all their predictions together",
      "Selects the most important features before the final model is fitted",
      "Splits the data once into train and validation to tune the parameters"
    ],
    "explain": "GridSearchCV wraps another estimator, exhaustively evaluates every combination in a hyperparameter grid using k-fold cross-validation, and reports the combo with the best mean CV score. It then refits that winning configuration on the entire training set, so the fitted object is ready to predict.",
    "simple": "It's a bake-off: you list the settings to try, and GridSearchCV bakes a cake for every combination, scoring each with cross-validation. It crowns the best recipe and immediately bakes one final full-size cake with it, ready to serve.",
    "widget": {
      "type": "curveStatic",
      "title": "Search the grid, keep the peak",
      "world": "Mean cross-validation score for five hyperparameter settings GridSearchCV tries; it keeps the peak.",
      "xlab": "hyperparameter setting →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["C=0.01", "C=0.1", "C=1", "C=10", "C=100"],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "mean CV score", "ys": [78, 85, 90, 88, 82] }
      ],
      "knob": { "label": "Setting", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Weak regularisation setting: the CV score is low.", "tone": "info" },
        { "max": 3, "text": "GridSearchCV keeps searching; the middle setting peaks at 90%.", "tone": "info" },
        { "max": 4, "text": "🤯 It picks the best combo AND refits it on all the training data automatically.", "tone": "wow" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "GridSearchCV", "formula": "GridSearchCV(model, param_grid, cv=5).fit(X, y).best_estimator_", "text": "Exhaustive and reliable for a few parameters; switch to random search when the grid explodes." }
    }
  },
  {
    "q": "What does it mean to 'calibrate' a classifier's probabilities?",
    "choices": [
      "Adjust its scores so a predicted 70% comes true about 70% of the time",
      "Rescale its features so each one has zero mean and unit variance first",
      "Tune its threshold so that precision and recall come out perfectly balanced",
      "Retrain it on more data so its raw accuracy climbs as high as possible",
      "Shrink its coefficients so the model leans less on any single feature"
    ],
    "explain": "A calibrated model's confidence matches reality: among all cases it labels '70% likely', about 70% truly are positive. Many classifiers (SVMs, boosted trees) output distorted scores, so CalibratedClassifierCV wraps them and remaps those scores using held-out data. Calibration changes the probabilities, not the ranking or the accuracy.",
    "simple": "A weather forecaster who says '70% rain' should see rain on about 70% of such days - otherwise their confidence is meaningless. Calibration retrains that forecaster's sense of confidence so the numbers can be trusted, without changing which days they think are wetter.",
    "widget": {
      "type": "curveStatic",
      "title": "Bending scores onto the diagonal",
      "world": "Predicted probability vs how often the event actually occurs; calibration bends the curve onto the diagonal.",
      "xlab": "predicted probability →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["0.1", "0.3", "0.5", "0.7", "0.9"],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "uncalibrated (observed)", "ys": [0.25, 0.4, 0.5, 0.58, 0.7] },
        { "name": "calibrated (observed)", "ys": [0.11, 0.29, 0.5, 0.71, 0.89] }
      ],
      "knob": { "label": "Predicted bin", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Uncalibrated: it says 0.1 but the event happens 25% of the time - overcautious.", "tone": "warn" },
        { "max": 3, "text": "The raw scores drift off the ideal diagonal in both directions.", "tone": "info" },
        { "max": 4, "text": "🤯 After calibration, a predicted 0.9 really occurs ~90% - probabilities you can trust.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Calibration", "formula": "CalibratedClassifierCV(clf).fit(X, y)", "text": "Calibrate whenever you act on the probability itself - pricing, thresholds, expected value." }
    }
  },
  {
    "q": "What does permutation importance measure?",
    "choices": [
      "How much the score drops when one feature's column is shuffled",
      "How large each feature's learned coefficient is inside the final model",
      "How strongly each pair of input features is correlated with each other",
      "How many times a feature is chosen for a split across all the trees",
      "How much adding a brand-new feature would improve the model's score"
    ],
    "explain": "Permutation importance shuffles one column at a time on held-out data and measures how much the model's score falls: a big drop means the model relied on that feature, a tiny drop means it didn't. Because it only re-scores an already-fitted model, it works for any estimator and reflects real predictive value, not just internal coefficients.",
    "simple": "To find out if a band member matters, mute their microphone and hear how much worse the song sounds. Permutation importance does exactly that to each feature - scramble it, listen for the drop in quality. Big drop, key player; no drop, they were miming.",
    "widget": {
      "type": "curveStatic",
      "title": "Mute a feature, hear the drop",
      "world": "Model score after shuffling each feature in turn; the larger the fall from baseline, the more that feature mattered.",
      "xlab": "feature shuffled →",
      "xs": [0, 1, 2, 3, 4],
      "labels": ["age", "income", "zip", "color", "id"],
      "dec": 2,
      "yunit": "",
      "series": [
        { "name": "score after shuffle", "ys": [0.72, 0.8, 0.87, 0.9, 0.91] },
        { "name": "baseline (nothing shuffled)", "ys": [0.91, 0.91, 0.91, 0.91, 0.91] }
      ],
      "knob": { "label": "Feature", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Shuffling 'age' craters the score from 0.91 to 0.72 - the model leaned on it hard.", "tone": "info" },
        { "max": 3, "text": "Middle features cost less when scrambled; the model used them only a little.", "tone": "info" },
        { "max": 4, "text": "🤯 Shuffling 'id' barely dents the score - it carried almost no signal.", "tone": "wow" }
      ],
      "extreme": { "at": 0 },
      "reveal": { "name": "Permutation importance", "formula": "permutation_importance(model, X_val, y_val)", "text": "Model-agnostic and computed on held-out data - trust it over raw feature_importances_." }
    }
  },
  {
    "q": "In sklearn you wrap StandardScaler and a classifier into one Pipeline object, then cross-validate the pipeline. What does that buy that separate steps don't?",
    "choices": [
      "The scaler is re-fitted inside each training fold — leakage becomes impossible by construction",
      "It fits the scaler once on the entire dataset up front, then shares those statistics across all folds",
      "It automatically selects which features are worth scaling and leaves the remaining columns untouched",
      "It replaces the cross-validation loop with a single internal held-out validation split to save fits",
      "It tunes the scaler's own hyperparameters jointly with the classifier's during every fold"
    ],
    "explain": "cross_val_score(pipeline) refits EVERY step on each fold's training part only. Scale-then-split done by hand leaks fold statistics; the Pipeline makes the correct order structural, not disciplinary.",
    "simple": "A Pipeline staples the preprocessing to the model so they travel as one unit. Wherever the unit goes — a CV fold, production — the scaler learns only from that context's training data. The leak you'd have to remember to avoid becomes a leak you CAN'T commit.",
    "widget": {
      "type": "foldPick",
      "title": "Discipline vs structure",
      "world": "The same model evaluated five ways: hand-rolled preprocessing with various slips, and the Pipeline version. Compare what each setup reports — and which one you'd trust.",
      "blurb": "Same model, same data — different plumbing:",
      "folds": [
        { "name": "scaled before split", "acc": 92 },
        { "name": "selector fit on all data", "acc": 93 },
        { "name": "imputer fit on all data", "acc": 91 },
        { "name": "all three slips", "acc": 95 },
        { "name": "Pipeline inside CV", "acc": 86 }
      ],
      "knob": { "label": "Plumbing setup", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 4, "text": "Each hand-rolled slip flatters the score a little — and slips STACK. None of these numbers describes the model you'd deploy.", "tone": "warn" },
        { "max": 5, "text": "🤯 The Pipeline reports 86% — lower, and TRUE. Every step refit per fold, automatically, forever, including by teammates who never read your notes.", "tone": "wow" },
        { "max": 6, "text": "Rule: any fitted preprocessing (scaling, selection, imputation, encoding) belongs INSIDE the Pipeline. If .fit() touches it, staple it in.", "tone": "info" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Pipeline", "formula": "make_pipeline(StandardScaler(), SVC()) → cross_val_score(pipe, X, y)", "text": "sklearn's most important convenience isn't convenience — it's correctness infrastructure. Pipelines make the leakage rules physically unbreakable." }
    }
  },
  {
    "q": "Your dataframe mixes numeric columns (scale them) and categorical columns (one-hot them). Which sklearn tool routes each column to its own preprocessing?",
    "choices": [
      "ColumnTransformer",
      "TransformedTargetRegressor",
      "FeatureUnion of both transformers",
      "make_column_selector on its own",
      "OneHotEncoder with a numeric flag"
    ],
    "explain": "ColumnTransformer applies different transformers to different column sets in parallel — scaler to numerics, encoder to categoricals — and concatenates the results, all fit-safe inside a Pipeline.",
    "simple": "Different columns need different treatment: you don't one-hot a salary or z-score a colour. ColumnTransformer is the mailroom: each column gets routed to the right machine, and everything comes out stitched back together, ready for the model.",
    "widget": {
      "type": "scaleFeature",
      "title": "Why the routing matters",
      "world": "One numeric column left raw next to a one-hot column: watch the raw scale drown the encoded information — the exact failure ColumnTransformer's routing prevents. Shrink the numeric units.",
      "aName": "one-hot: is_member (×10)",
      "bName": "spend (raw £)",
      "target": { "name": "customer X", "a": 10, "b": 1200 },
      "cands": [
        { "name": "member · £1,250", "a": 10, "b": 1250 },
        { "name": "non-member · £1,210", "a": 0, "b": 1210 },
        { "name": "member · £1,180", "a": 10, "b": 1185 },
        { "name": "non-member · £1,400", "a": 0, "b": 1400 }
      ],
      "knob": { "label": "Shrink spend units by", "min": 0, "max": 4, "step": 0.25, "init": 0 },
      "insights": [
        { "max": 0.5, "text": "Raw pounds: the non-member with the nearest spend beats fellow members. The one-hot column — the thing that matters — is inaudible.", "tone": "warn" },
        { "max": 2.5, "text": "With spend scaled, membership finally gets its voice. THIS balanced state is what ColumnTransformer produces automatically, column by column.", "tone": "info" },
        { "max": 4, "text": "🤯 One line — ColumnTransformer([('num', StandardScaler(), num_cols), ('cat', OneHotEncoder(), cat_cols)]) — and every column arrives at the model correctly dressed. Mixed data, solved structurally.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "ColumnTransformer", "formula": "route column subsets to different transformers, concatenate outputs, Pipeline-safe", "text": "The standard front door for real-world tabular data. With Pipeline, it forms the skeleton of virtually every production sklearn model." }
    }
  },
  {
    "q": "Your search space has 6 hyperparameters. GridSearchCV would need 15,000 fits to cover it. What does RandomizedSearchCV offer instead?",
    "choices": [
      "Sample random combinations — near-best results from a small, fixed budget of fits",
      "Keep sampling combinations until the validation score stops improving, then halt on its own",
      "Successively halve the candidate set, keeping only the top performers into each next round",
      "Enumerate the full 15,000-cell grid but evaluate the folds in a shuffled, random order",
      "Test every combination against a single random fold instead of all five to cut cost"
    ],
    "explain": "Random search samples the space instead of enumerating it: 100 random combinations usually land within a whisker of the full grid's best, because good regions are areas, not single points — and you control the budget exactly.",
    "simple": "A full grid is tasting every dish on a 15,000-item menu. Random search tastes 100 random dishes: you'll almost certainly find something excellent, because excellence isn't hiding in one magic cell — it covers whole regions of the menu.",
    "widget": {
      "type": "curveStatic",
      "title": "Excellence is a region, not a pixel",
      "world": "Best validation score found so far, as the fit budget grows: exhaustive grid order vs random sampling. Same search space, very different bills.",
      "xlab": "fits spent",
      "xs": [
        0,
        1,
        2,
        3,
        4,
        5
      ],
      "labels": [
        "10",
        "30",
        "100",
        "300",
        "1k",
        "15k"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "random search (best so far)", "ys": [ 86, 88.5, 90, 90.6, 90.9, 91 ] },
        { "name": "grid, in order (best so far)", "ys": [ 84, 85, 86.5, 88, 89.5, 91 ] }
      ],
      "knob": { "label": "Fit budget", "min": 0, "max": 5, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Thirty random fits already found 88.5% — the grid, marching in order, is still stuck exploring one corner.", "tone": "info" },
        { "max": 2, "text": "🤯 At 100 fits, random search sits within 1 point of the full 15,000-fit answer. That's the whole argument, in one datapoint.", "tone": "wow" },
        { "max": 5, "text": "The grid only catches up by paying the entire 15,000. Practical recipe: RandomizedSearchCV with n_iter=100 and log-scale distributions, then a small refining grid around the winner.", "tone": "info" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "RandomizedSearchCV", "formula": "sample n_iter combos from distributions — budget-controlled, near-optimal", "text": "For more than 2–3 hyperparameters, random beats grid at any realistic budget. Bergstra & Bengio proved what practitioners had noticed." }
    }
  },
  {
    "q": "cross_val_score(model, X, y, cv=5) returns [0.84, 0.79, 0.86, 0.81, 0.85]. What's the professional way to report this?",
    "choices": [
      "Mean ± spread: 0.83 ± 0.03 — the spread is part of the result",
      "The mean alone: 0.83 — the spread only matters for regression tasks",
      "A t-test p-value from the five folds tested against zero accuracy",
      "The best fold, 0.86, since CV exists to surface the strongest split",
      "The median fold, more robust to the two low outlier folds"
    ],
    "explain": "The five scores are five estimates of the same quantity; their mean is your best guess and their spread is your uncertainty. Comparing models by best-fold is cherry-picking; ignoring spread makes 0.83 vs 0.84 look meaningful when it isn't.",
    "simple": "Five folds are five measurements of one thing. Report like a scientist: the average, and how much the measurements wobbled. If model A is 83 ± 3 and model B is 84 ± 3, you have NOT found a winner — and knowing that saves you from shipping noise.",
    "widget": {
      "type": "foldPick",
      "title": "Five measurements, one claim",
      "world": "The five fold scores from the question. Flick through them — imagine reporting whichever one you'd looked at first — then land on the average and its honest ± wobble.",
      "blurb": "cross_val_score output, fold by fold:",
      "folds": [
        { "name": "fold 1", "acc": 84 },
        { "name": "fold 2", "acc": 79 },
        { "name": "fold 3", "acc": 86 },
        { "name": "fold 4", "acc": 81 },
        { "name": "fold 5", "acc": 85 }
      ],
      "knob": { "label": "Fold", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 5, "text": "Any single fold could have been 'the result' — from a gloomy 79 to a sunny 86. Seven points of pure split-luck.", "tone": "warn" },
        { "max": 6, "text": "🤯 Mean 83, spread ±3: one honest sentence. Now a rival model scoring 84 ± 3 correctly reads as 'statistically indistinguishable' — the ± did real work.", "tone": "wow" }
      ],
      "extreme": { "at": 6 },
      "reveal": { "name": "Reporting CV results", "formula": "scores.mean() ± scores.std() — compare models with the spread in view", "text": "The ± is not decoration: it's the difference between detecting improvements and hallucinating them." }
    }
  },
  {
    "q": "train_test_split(X, y, test_size=0.2, stratify=y) — what does the stratify argument guarantee?",
    "choices": [
      "Both splits keep the original class proportions — vital when a class is rare",
      "Both splits keep the same feature distributions — vital when the features are skewed",
      "Each class is oversampled so the training set comes out perfectly balanced",
      "Rare classes are moved entirely into the training set so the model can learn them",
      "The test set is drawn only from the majority class to keep the metric stable"
    ],
    "explain": "A purely random 20% cut of data with a 5% minority class can easily grab 2% or 9% of it — or on small data, none. Stratification samples within each class so both splits mirror the true mix.",
    "simple": "Random splitting is a lottery, and rare classes buy few tickets. Stratify deals each class separately — 'give the test set exactly its fair share of frauds' — so your evaluation isn't at the mercy of one unlucky shuffle.",
    "widget": {
      "type": "foldPick",
      "title": "The lottery vs the fair deal",
      "world": "Recall on a rare class across four plain random splits — then a stratified one. Same data, same model. Flick through what the split lottery can do to a metric.",
      "blurb": "Same model — the only change is the split:",
      "folds": [
        { "name": "random split #1", "acc": 67 },
        { "name": "random split #2", "acc": 20 },
        { "name": "random split #3", "acc": 80 },
        { "name": "random split #4", "acc": 40 },
        { "name": "stratified split", "acc": 62 }
      ],
      "knob": { "label": "Split", "min": 1, "max": 6, "step": 1, "init": 1 },
      "insights": [
        { "max": 4, "text": "Recall 'measured' anywhere from 20% to 80% — the model never changed. With 5 rare cases, whether 1 or 4 land in the test set decides everything.", "tone": "warn" },
        { "max": 5, "text": "🤯 Stratified: 62%, and it would be ~62% again tomorrow. The metric finally measures the MODEL rather than the shuffle.", "tone": "wow" },
        { "max": 6, "text": "Habit: stratify=y in every classification split, and StratifiedKFold in every CV. It costs one argument.", "tone": "info" }
      ],
      "extreme": { "at": 5 },
      "reveal": { "name": "Stratified splitting", "formula": "train_test_split(..., stratify=y) · StratifiedKFold (sklearn's CV default for classifiers)", "text": "One keyword between you and evaluation roulette. The rarer your positive class, the less optional it is." }
    }
  }
];

(window.QUESTIONS = window.QUESTIONS || {}).skl2 = [
  {
    "q": "GridSearchCV(model, params, scoring='recall') and the same search with scoring='accuracy' return DIFFERENT best models. Why is that expected?",
    "choices": [
      "The search optimises whatever you measure — different yardsticks crown different champions",
      "GridSearchCV's final refit step silently re-selects the winner on accuracy, not your scoring",
      "Recall and accuracy rank every candidate identically, so one of the two runs is misconfigured",
      "The scoring string only relabels the printed number and never changes which model actually wins",
      "Different random CV folds between the two runs happen to crown two different winning models"
    ],
    "explain": "Hyperparameter search is optimisation against the scoring function. A recall-first yardstick favours aggressive, catch-everything settings; accuracy favours majority-pleasing ones. The scoring argument IS the business objective, encoded.",
    "simple": "Ask 'who's tallest?' and 'who's fastest?' and you crown different athletes — no contradiction. The scoring parameter is the question. Leave it on the default (accuracy) for a fraud problem and you've silently asked the wrong question of 15,000 model fits.",
    "widget": {
      "type": "threshold",
      "title": "The yardstick picks the champion",
      "world": "One model family, two yardsticks. Tune the dial to what 'accuracy' would love — then to what 'recall' would love. Notice they're different places, and both are defensible ANSWERS to different QUESTIONS.",
      "posName": "fraud",
      "negName": "legit",
      "axis": "model score",
      "show": [
        "accuracy",
        "recall"
      ],
      "items": [
        { "s": 0.8, "c": 0 },
        { "s": 1.6, "c": 0 },
        { "s": 2.4, "c": 0 },
        { "s": 3.2, "c": 0 },
        { "s": 4, "c": 0 },
        { "s": 4.8, "c": 0 },
        { "s": 5.6, "c": 0 },
        { "s": 6.4, "c": 1 },
        { "s": 7.2, "c": 0 },
        { "s": 8, "c": 1 },
        { "s": 8.8, "c": 0 },
        { "s": 9.6, "c": 1 }
      ],
      "knob": { "label": "Operating setting", "min": 0, "max": 10, "step": 0.5, "init": 10 },
      "insights": [
        { "max": 4, "text": "Recall's favourite zone: every fraud caught, accuracy sagging under false alarms. scoring='recall' steers the whole SEARCH toward settings like this.", "tone": "info" },
        { "max": 8, "text": "In between: the two yardsticks actively disagree about whether you're improving. There is no neutral choice — silence just means 'accuracy'.", "tone": "warn" },
        { "max": 10, "text": "🤯 Accuracy's favourite: flag almost nothing, 75% accuracy, one fraud caught. A GridSearch scored this way will happily deliver this model with a straight face. Choose the yardstick BEFORE the search.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "The scoring parameter", "formula": "scoring='recall' / 'f1' / 'roc_auc' / make_scorer(...) — the objective, made explicit", "text": "Every optimiser optimises something. sklearn lets one keyword make sure it's the thing your problem actually rewards." }
    }
  },
  {
    "q": "Some sklearn classifiers offer predict_proba, others decision_function, some both. What's the difference?",
    "choices": [
      "predict_proba returns calibrated-ish probabilities (0–1); decision_function returns raw unbounded scores",
      "predict_proba outputs the raw class margins; decision_function normalises those margins into the 0–1 range",
      "decision_function returns probabilities that predict_proba then rounds off into hard 0/1 class labels",
      "Both return values in 0–1, but decision_function drops the negative-class column to save memory",
      "predict_proba is only defined for binary tasks; decision_function is its multiclass counterpart"
    ],
    "explain": "decision_function exposes the model's native score (a margin, a log-odds — any real number). predict_proba maps scores into probabilities. Ranking tasks can use either; cost-based thresholds need probabilities.",
    "simple": "decision_function is the model thinking out loud in its native units ('+1.7 margins'); predict_proba is the same opinion translated into percentages. For sorting by risk, either works. For 'act above 30% risk', you need the translation.",
    "widget": {
      "type": "sigmoid",
      "title": "Native units vs percentages",
      "world": "The x-axis is a model's raw decision score; the curve maps it into predict_proba territory. Slide the steepness to see the two languages, and where they agree: zero score = 50%.",
      "classes": [
        "negative",
        "positive"
      ],
      "xlab": "decision_function score (shifted)",
      "b": 5,
      "qx": 6.8,
      "points": [
        { "x": 1, "c": 0 },
        { "x": 2, "c": 0 },
        { "x": 3, "c": 0 },
        { "x": 4, "c": 0 },
        { "x": 4.6, "c": 0 },
        { "x": 5.6, "c": 1 },
        { "x": 6.4, "c": 1 },
        { "x": 7.4, "c": 1 },
        { "x": 8.4, "c": 1 },
        { "x": 9.2, "c": 1 }
      ],
      "knob": { "label": "Mapping steepness", "min": 0.3, "max": 8, "step": 0.1, "init": 1.5 },
      "insights": [
        { "max": 2, "text": "The raw score axis runs unbounded in both directions; the curve's OUTPUT never leaves 0–100%. Two languages, one opinion.", "tone": "info" },
        { "max": 5, "text": "Both languages RANK points identically — higher score, higher probability. AUC, sorting, top-k alerts: use whichever exists.", "tone": "info" },
        { "max": 8, "text": "🤯 But 'flag above 30% risk' is only meaningful in probability language — and if the model lacks predict_proba (LinearSVC!), you wrap it in CalibratedClassifierCV to learn this very curve.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "predict_proba vs decision_function", "formula": "raw score ∈ (−∞,∞) —sigmoid/calibration→ probability ∈ (0,1)", "text": "Know which language each estimator speaks. Ranking is bilingual; thresholds by cost demand probabilities." }
    }
  },
  {
    "q": "Your gradient-boosted model says '90% confident' but such cases turn out positive only 70% of the time. Which sklearn tool repairs the numbers without retraining the model?",
    "choices": [
      "CalibratedClassifierCV — learn a mapping from claimed to actual probabilities on held-out folds",
      "IsotonicRegression fit on the model's own training predictions to reshape the probability values",
      "Refit the model with a sigmoid output layer so its probabilities self-correct while training runs",
      "Platt scaling applied to the raw scores while reusing the original training data for the fit",
      "GridSearchCV lowering the decision threshold until claimed rates line up with the actual rates"
    ],
    "explain": "Calibration wraps the fitted model and fits a small corrective curve (sigmoid or isotonic) on out-of-fold predictions: claimed 90% → calibrated ~70%. Ranking is untouched; the probability VALUES become honest.",
    "simple": "The model is a weather forecaster whose '90% chance of rain' days only rain 70% of the time. You don't fire the forecaster — you keep a correction chart: 'when they say 90, hear 70'. CalibratedClassifierCV learns that chart from history.",
    "widget": {
      "type": "curveStatic",
      "title": "The correction chart",
      "world": "Group predictions by claimed probability and plot how often each group was actually positive. Perfect honesty is the straight diagonal. Slide across the claims.",
      "xlab": "claimed probability",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "10%",
        "30%",
        "50%",
        "70%",
        "90%"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "actually positive (raw model)", "ys": [ 18, 34, 50, 62, 70 ] },
        { "name": "after calibration", "ys": [ 11, 29, 50, 69, 88 ] }
      ],
      "knob": { "label": "Claimed probability", "min": 0, "max": 4, "step": 1, "init": 4 },
      "insights": [
        { "max": 1, "text": "At the low end the raw model is UNDER-confident: its '10%' cases hit 18%. Miscalibration cuts both ways.", "tone": "info" },
        { "max": 3, "text": "The middle is honest — 50 means 50 — which is why accuracy looked fine and nobody noticed the problem.", "tone": "info" },
        { "max": 4, "text": "🤯 The raw '90%' delivers 70%. Post-calibration, '88%' delivers 88%. Any system doing expected-value math on these numbers just went from broken to sound — same model, same ranking.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "CalibratedClassifierCV", "formula": "wrap fitted model → fit sigmoid/isotonic on out-of-fold predictions", "text": "Accuracy checks the verdicts; calibration checks the confidence. Systems that ACT on probabilities need both audited." }
    }
  },
  {
    "q": "A forest's feature_importances_ ranks user_id_hash third most important. Permutation importance on validation data scores it at zero. Which do you believe, and why?",
    "choices": [
      "Permutation — impurity importance over-credits high-cardinality columns the model memorised",
      "feature_importances_ — permutation importance is unreliable whenever the validation features correlate",
      "feature_importances_ — shuffling validation columns just injects noise that zeroes out genuine signal",
      "Neither — one leaking ID column proves the whole importance ranking is corrupted and untrustworthy",
      "Permutation — but only because impurity scores are never normalised to sum to one across features"
    ],
    "explain": "A near-unique ID offers thousands of split points, so trees split on it to memorise rows — earning impurity credit while generalising nothing. Permutation asks the honest question: does shuffling this column hurt VALIDATION performance? For an ID: no.",
    "simple": "The ID column is a cheat sheet: the forest used it to memorise individual rows, and the built-in score rewards the memorising. Permutation runs the real test — scramble the column and see if unseen-data performance drops. Scrambling a cheat sheet costs nothing real.",
    "widget": {
      "type": "curveStatic",
      "title": "Cross-examining the witness",
      "world": "Five features scored by both methods. Slide across and find where the two testimonies diverge — that divergence is the tell.",
      "xlab": "feature",
      "xs": [
        0,
        1,
        2,
        3,
        4
      ],
      "labels": [
        "income",
        "tenure",
        "user_id_hash",
        "age",
        "random noise"
      ],
      "dec": 0,
      "yunit": "%",
      "series": [
        { "name": "impurity importance", "ys": [ 30, 20, 26, 17, 7 ] },
        { "name": "permutation (validation)", "ys": [ 39, 24, 0, 22, 0 ] }
      ],
      "knob": { "label": "Feature", "min": 0, "max": 4, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Income, tenure: both methods agree, permutation even MORE enthusiastic. Real signal survives cross-examination.", "tone": "info" },
        { "max": 2, "text": "🤯 user_id_hash: 26% by impurity, 0% by permutation. All that 'importance' was memorisation of training rows — worthless the moment data is new.", "tone": "wow" },
        { "max": 4, "text": "Random noise: 7% impurity credit for pure static (deep trees will split on anything), 0% by permutation. Default habit: permutation_importance on validation data before believing any ranking.", "tone": "warn" }
      ],
      "extreme": { "at": 2 },
      "reveal": { "name": "permutation_importance", "formula": "shuffle one column on validation data → importance = score drop", "text": "Model-agnostic, leakage-revealing, honest. The built-in attribute is a hint; permutation is the audit." }
    }
  },
  {
    "q": "sklearn offers VotingClassifier(voting='hard'/'soft') and StackingClassifier. Rank them by how much information each combination strategy uses.",
    "choices": [
      "Hard uses labels only; soft adds probabilities; stacking LEARNS the combination — most informed",
      "Soft voting uses labels only; hard adds probabilities; stacking averages both — the most informed",
      "All three average the base probabilities and differ only in how those averages get weighted",
      "Stacking uses labels only; both soft and hard train a meta-model on the base probabilities",
      "Hard and soft both learn trust weights; stacking just takes a plain unweighted majority vote"
    ],
    "explain": "Hard voting counts predicted labels. Soft voting averages predict_proba — a 51% opinion and a 99% opinion now differ. Stacking goes further: a meta-model TRAINS on the base outputs, learning per-situation trust.",
    "simple": "Three committee designs: a show of hands (hard), a show of hands where you say HOW sure you are (soft), and a chairperson who has studied everyone's track record (stacking). Each step up uses more information — and usually scores a little higher.",
    "widget": {
      "type": "curveStatic",
      "title": "Three committee charters",
      "world": "The same three base models combined three ways, next to their best member. Slide up the ladder of information use.",
      "xlab": "combination",
      "xs": [
        0,
        1,
        2,
        3
      ],
      "labels": [
        "best single model",
        "hard voting",
        "soft voting",
        "stacking"
      ],
      "dec": 1,
      "yunit": "%",
      "series": [
        { "name": "validation accuracy", "ys": [ 88.5, 89.5, 90.4, 91.3 ] }
      ],
      "knob": { "label": "Strategy", "min": 0, "max": 3, "step": 1, "init": 0 },
      "insights": [
        { "max": 1, "text": "Hard voting already beats the best member — the diversity dividend, using nothing but final labels.", "tone": "info" },
        { "max": 2, "text": "Soft voting gains again: a hesitant 51% no longer outvotes a thundering 99%. Confidence is information; use it.", "tone": "info" },
        { "max": 3, "text": "🤯 Stacking tops the ladder by LEARNING when to trust whom (built safely on out-of-fold predictions, which StackingClassifier handles for you). Information in, accuracy out — pick your rung by how much complexity the problem deserves.", "tone": "wow" }
      ],
      "extreme": { "at": "max" },
      "reveal": { "name": "Voting vs stacking in sklearn", "formula": "VotingClassifier(hard) < (soft) < StackingClassifier — rising information use", "text": "The course's ideas, shipped as three classes: majority votes, probability averages, learned meta-models. You now know exactly what each line of that import buys." }
    }
  }
];
