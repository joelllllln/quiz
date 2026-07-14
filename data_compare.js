(function () {
  "use strict";

  window.COMPARES = [
    {
      key: "bag-boost",
      title: "Bagging vs Boosting",
      tagline: "Parallel independence vs sequential correction",
      a: { name: "Bagging", oneLiner: "Train many models independently on bootstrap samples and average them." },
      b: { name: "Boosting", oneLiner: "Train models one after another, each focusing on the previous ones' mistakes." },
      rows: [
        { dim: "Core idea", a: "Combine many independent models trained on random resamples of the data.", b: "Build a chain of weak models where each one corrects the errors of the last." },
        { dim: "Fights", a: "Variance: averaging smooths out the instability of individual models.", b: "Bias (mostly): each round makes the combined model more expressive." },
        { dim: "Training order", a: "Parallel — models don't depend on each other, so they can train simultaneously.", b: "Sequential — model N needs the residuals or errors of model N-1." },
        { dim: "Base learners", a: "Usually deep, low-bias models (e.g. fully grown trees).", b: "Usually shallow, weak learners (e.g. stumps or depth-3 trees)." },
        { dim: "Weighting", a: "Equal vote or simple average across all models.", b: "Models are weighted; later ones focus on hard examples." },
        { dim: "Overfitting risk", a: "Low — more trees rarely hurt; averaging is self-regularizing.", b: "Higher — too many rounds can fit noise; needs early stopping / learning rate." },
        { dim: "Classic example", a: "Random Forest.", b: "AdaBoost, Gradient Boosting, XGBoost, LightGBM." }
      ],
      confusion: "Beginners think both just 'combine trees'; the tell is order — bagging trains models independently in parallel, boosting trains them sequentially on prior errors.",
      rule: "If your model overfits (high variance), bag it; if it underfits (high bias), boost it."
    },
    {
      key: "l1-l2",
      title: "L1 (Lasso) vs L2 (Ridge) Regularisation",
      tagline: "Sparse zeros vs smooth shrinkage",
      a: { name: "L1 (Lasso)", oneLiner: "Penalize the sum of absolute weights, pushing some weights exactly to zero." },
      b: { name: "L2 (Ridge)", oneLiner: "Penalize the sum of squared weights, shrinking all weights smoothly toward zero." },
      rows: [
        { dim: "Penalty term", a: "λ · Σ|w| — absolute values of the weights.", b: "λ · Σw² — squares of the weights." },
        { dim: "Effect on weights", a: "Drives many weights to exactly zero — a built-in feature selector.", b: "Shrinks all weights toward zero but almost never exactly to zero." },
        { dim: "Geometry", a: "Diamond-shaped constraint; corners on the axes make zeros likely.", b: "Circular constraint; no corners, so solutions rarely land on an axis." },
        { dim: "Correlated features", a: "Tends to pick one from a correlated group and zero out the rest (unstable).", b: "Spreads weight across correlated features; more stable." },
        { dim: "Solution", a: "No closed form; needs iterative solvers (coordinate descent).", b: "Closed-form solution exists for linear regression." },
        { dim: "Use when", a: "You suspect only a few features matter and want an interpretable, sparse model.", b: "Most features carry some signal and you just want to tame their magnitudes." }
      ],
      confusion: "Both add a weight penalty, so beginners treat them as interchangeable; the tell is sparsity — L1 zeroes weights out entirely, L2 only shrinks them.",
      rule: "Want automatic feature selection? Use L1. Want everything smaller but kept? Use L2 (or Elastic Net for both)."
    },
    {
      key: "pca-tsne",
      title: "PCA vs t-SNE",
      tagline: "Linear global structure vs nonlinear local neighborhoods",
      a: { name: "PCA", oneLiner: "Linearly project data onto the directions of maximum variance." },
      b: { name: "t-SNE", oneLiner: "Nonlinearly embed points so that close neighbors in high dimensions stay close in 2D." },
      rows: [
        { dim: "Type of map", a: "Linear projection — new axes are weighted sums of original features.", b: "Nonlinear embedding — no simple formula relating output axes to inputs." },
        { dim: "Preserves", a: "Global structure: variance and large-scale distances.", b: "Local structure: neighborhoods; long-range distances become meaningless." },
        { dim: "Determinism", a: "Deterministic — same data, same result.", b: "Stochastic — results vary with random seed and perplexity." },
        { dim: "New data", a: "Can transform unseen points with the learned projection.", b: "No natural out-of-sample transform; must re-run (or approximate)." },
        { dim: "Speed & scale", a: "Fast; scales to large data and many dimensions.", b: "Slow (roughly O(n log n) at best); usually applied after PCA to ~50 dims." },
        { dim: "Typical use", a: "Preprocessing, compression, noise reduction, feature decorrelation.", b: "2D/3D visualization of clusters for human eyes only." },
        { dim: "Reading the plot", a: "Axis directions and distances are meaningful (variance-ordered).", b: "Cluster sizes and inter-cluster distances are NOT meaningful." }
      ],
      confusion: "Beginners use both as generic 'dimensionality reduction'; the tell is purpose — PCA is a reusable linear transform for pipelines, t-SNE is a one-off visualization whose distances between clusters mean nothing.",
      rule: "Reducing features for a model? PCA. Making a pretty 2D plot to eyeball clusters? t-SNE (after PCA)."
    },
    {
      key: "precision-recall",
      title: "Precision vs Recall",
      tagline: "How pure are my positives vs how many positives did I catch",
      a: { name: "Precision", oneLiner: "Of everything I flagged positive, what fraction actually was positive?" },
      b: { name: "Recall", oneLiner: "Of everything actually positive, what fraction did I manage to flag?" },
      rows: [
        { dim: "Formula", a: "TP / (TP + FP) — true positives over all predicted positives.", b: "TP / (TP + FN) — true positives over all actual positives." },
        { dim: "Punishes", a: "False positives — crying wolf.", b: "False negatives — missing real cases." },
        { dim: "Denominator", a: "What the model predicted (its own claims).", b: "What is actually true (the ground truth)." },
        { dim: "Raise it by", a: "Being pickier: raise the decision threshold, flag less.", b: "Being generous: lower the threshold, flag more." },
        { dim: "Trade-off", a: "Pushing precision up usually drags recall down.", b: "Pushing recall up usually drags precision down." },
        { dim: "Care most when", a: "False alarms are costly: spam filters, arrest warrants, ad targeting.", b: "Misses are costly: cancer screening, fraud detection, safety recalls." }
      ],
      confusion: "Both are 'accuracy on positives', so beginners swap them; the tell is the denominator — precision divides by what you predicted, recall divides by what is actually true.",
      rule: "If a false alarm is worse, optimize precision; if a miss is worse, optimize recall — and report F1 when both matter."
    },
    {
      key: "clf-reg",
      title: "Classification vs Regression",
      tagline: "Predicting a category vs predicting a quantity",
      a: { name: "Classification", oneLiner: "Predict which discrete class or label an example belongs to." },
      b: { name: "Regression", oneLiner: "Predict a continuous numeric value for an example." },
      rows: [
        { dim: "Output", a: "A label from a fixed set (spam/ham, cat/dog/bird), often with class probabilities.", b: "A real number on a continuous scale (price, temperature, age)." },
        { dim: "Typical loss", a: "Cross-entropy (log loss), hinge loss.", b: "Mean squared error, mean absolute error." },
        { dim: "Evaluation", a: "Accuracy, precision/recall, F1, ROC-AUC, confusion matrix.", b: "RMSE, MAE, R² — measures of how far off the numbers are." },
        { dim: "Decision boundary", a: "Learns boundaries that separate regions of classes.", b: "Learns a function/surface that fits the data values." },
        { dim: "Example question", a: "\"Will this customer churn: yes or no?\"", b: "\"How much will this customer spend next month?\"" },
        { dim: "Gotcha", a: "Ordered classes (star ratings) are still classification unless you model the order.", b: "'Logistic regression' is a classifier despite the name — a classic trap." }
      ],
      confusion: "Beginners decide by algorithm name ('regression' = regression), but the tell is the target: discrete labels mean classification, continuous numbers mean regression — logistic regression classifies.",
      rule: "Look at the target column: categories → classification; a number you could take an average of → regression."
    },
    {
      key: "sup-unsup",
      title: "Supervised vs Unsupervised Learning",
      tagline: "Learning with answer keys vs finding structure without them",
      a: { name: "Supervised", oneLiner: "Learn a mapping from inputs to known target labels or values." },
      b: { name: "Unsupervised", oneLiner: "Find patterns, groups, or structure in data that has no labels." },
      rows: [
        { dim: "Training data", a: "Pairs (X, y): features plus a known answer for each example.", b: "Only X: features with no target column at all." },
        { dim: "Goal", a: "Predict y for new, unseen inputs.", b: "Discover structure: clusters, dimensions, densities, anomalies." },
        { dim: "Typical tasks", a: "Classification and regression.", b: "Clustering, dimensionality reduction, anomaly detection." },
        { dim: "Evaluation", a: "Objective: compare predictions to held-out true labels.", b: "Fuzzier: internal metrics (silhouette), or human judgment of usefulness." },
        { dim: "Example algorithms", a: "Linear/logistic regression, random forest, gradient boosting, most neural nets.", b: "K-Means, DBSCAN, PCA, autoencoders, GMMs." },
        { dim: "Cost of data", a: "Labels are expensive — someone must annotate every training example.", b: "Cheap — raw unlabeled data is usually abundant." }
      ],
      confusion: "Beginners think 'unsupervised' means the model trains without humans; the tell is the data — supervised data has a target column (labels), unsupervised data does not.",
      rule: "Ask: does each training row come with the answer? Yes → supervised; no, and you want to find structure → unsupervised."
    },
    {
      key: "over-under",
      title: "Overfitting vs Underfitting",
      tagline: "Memorizing the noise vs missing the signal",
      a: { name: "Overfitting", oneLiner: "The model memorizes training data, including its noise, and fails on new data." },
      b: { name: "Underfitting", oneLiner: "The model is too simple to capture the real pattern, failing even on training data." },
      rows: [
        { dim: "Symptom", a: "Training error low, validation/test error much higher — a big gap.", b: "Training AND validation error both high — no gap, just bad." },
        { dim: "Root cause", a: "Model too complex or trained too long relative to the data.", b: "Model too simple, features too weak, or training stopped too early." },
        { dim: "Bias/variance", a: "High variance: predictions swing wildly with different training sets.", b: "High bias: systematically wrong regardless of the training sample." },
        { dim: "Fixes", a: "More data, regularization, simpler model, early stopping, dropout.", b: "Bigger/more flexible model, better features, less regularization, train longer." },
        { dim: "Mental image", a: "A wiggly curve threading through every training point.", b: "A straight line through clearly curved data." },
        { dim: "How to detect", a: "Watch validation error rise while training error keeps falling.", b: "Watch both errors plateau at a high value from the start." }
      ],
      confusion: "Beginners see 'bad test accuracy' and can't tell which one they have; the tell is training error — low train + high test means overfitting, high on both means underfitting.",
      rule: "Compare train vs validation error: big gap → overfitting, both bad → underfitting; tune complexity until validation error bottoms out."
    },
    {
      key: "tree-forest",
      title: "Decision Tree vs Random Forest",
      tagline: "One interpretable tree vs an ensemble that trades clarity for accuracy",
      a: { name: "Decision Tree", oneLiner: "A single tree of if/else splits that you can read like a flowchart." },
      b: { name: "Random Forest", oneLiner: "Hundreds of randomized trees whose votes are averaged for stabler predictions." },
      rows: [
        { dim: "Structure", a: "One tree, grown greedily on the whole training set.", b: "Many trees, each on a bootstrap sample with random feature subsets per split." },
        { dim: "Interpretability", a: "Excellent — you can trace and explain every prediction path.", b: "Weak — only aggregate signals like feature importances." },
        { dim: "Variance", a: "High: small data changes can produce a completely different tree.", b: "Low: averaging many decorrelated trees cancels out their quirks." },
        { dim: "Overfitting", a: "Prone to it unless pruned or depth-limited.", b: "Resistant; individual trees overfit but the average does not." },
        { dim: "Cost", a: "Fast to train and predict; tiny memory footprint.", b: "Slower and heavier — cost scales with the number of trees." },
        { dim: "Accuracy", a: "Usually a weak-to-decent baseline.", b: "Strong out-of-the-box performance on tabular data." },
        { dim: "Randomness", a: "None — deterministic given the data and settings.", b: "Two sources: bootstrap row sampling and per-split feature sampling." }
      ],
      confusion: "Beginners assume a forest is just 'a big tree'; the tell is plurality — a random forest is many randomized trees voting, which is exactly why you can't read it as one flowchart.",
      rule: "Need to explain the decision to a human? Single tree. Need the best accuracy and can accept a black-ish box? Random forest."
    },
    {
      key: "kmeans-dbscan",
      title: "K-Means vs DBSCAN",
      tagline: "Fixed round clusters vs density-defined arbitrary shapes",
      a: { name: "K-Means", oneLiner: "Partition points into K clusters by iteratively assigning them to the nearest centroid." },
      b: { name: "DBSCAN", oneLiner: "Grow clusters from dense regions of points, marking sparse points as noise." },
      rows: [
        { dim: "Must specify", a: "K — the number of clusters, chosen in advance.", b: "eps (neighborhood radius) and min_samples — but not the number of clusters." },
        { dim: "Cluster shape", a: "Convex, roughly spherical blobs of similar size.", b: "Arbitrary shapes — moons, rings, snakes — as long as they are dense." },
        { dim: "Outliers", a: "None allowed: every point is forced into some cluster.", b: "First-class concept: sparse points are labeled noise (-1)." },
        { dim: "Assignment", a: "Every point gets exactly one cluster (assignments can shift each run).", b: "Core/border/noise roles; clusters emerge from density connectivity." },
        { dim: "Sensitive to", a: "Initialization (use k-means++), feature scaling, and the choice of K.", b: "eps and min_samples; struggles when cluster densities differ a lot." },
        { dim: "Scalability", a: "Very fast, scales to huge datasets.", b: "Slower; fine to medium data, needs spatial indexing to speed up." }
      ],
      confusion: "Beginners reach for K-Means everywhere; the tell is shape and noise — K-Means forces every point into K round blobs, while DBSCAN finds oddly shaped dense regions and leaves outliers unclustered.",
      rule: "Know roughly how many round-ish groups you expect? K-Means. Unknown count, weird shapes, or outliers to ignore? DBSCAN."
    },
    {
      key: "standard-minmax",
      title: "Standardization vs Min-Max Normalization",
      tagline: "Center on zero with unit variance vs squeeze into a fixed range",
      a: { name: "Standardization", oneLiner: "Rescale each feature to mean 0 and standard deviation 1 (z-scores)." },
      b: { name: "Min-Max", oneLiner: "Rescale each feature linearly into a fixed range, usually [0, 1]." },
      rows: [
        { dim: "Formula", a: "x' = (x − mean) / std.", b: "x' = (x − min) / (max − min)." },
        { dim: "Output range", a: "Unbounded — typically about −3 to +3, but outliers can exceed it.", b: "Exactly bounded: [0, 1] on the training data." },
        { dim: "Outlier behavior", a: "More robust: an outlier shifts mean/std moderately.", b: "Fragile: one extreme value squashes everything else into a tiny band." },
        { dim: "Distribution shape", a: "Preserved — it shifts and scales, it does not make data Gaussian.", b: "Preserved too — just linearly squeezed into the range." },
        { dim: "Works well with", a: "Linear/logistic models, SVMs, PCA, k-NN, anything distance- or gradient-based.", b: "Neural nets with bounded activations, image pixels, algorithms needing [0,1]." },
        { dim: "Common trap", a: "Fitting the scaler on the full dataset (leaks test info) — fit on train only.", b: "New data can fall outside [0,1] if it exceeds the training min/max." }
      ],
      confusion: "Both get called 'normalization', so beginners think they're the same; the tell is the target — standardization aims at mean 0 / std 1, min-max aims at a hard [0,1] range.",
      rule: "Default to standardization; use min-max only when you need a strict bounded range and trust your data has no extreme outliers."
    },
    {
      key: "grid-random",
      title: "Grid Search vs Random Search",
      tagline: "Exhaustive checklist vs smart dice rolls",
      a: { name: "Grid Search", oneLiner: "Try every combination of a predefined grid of hyperparameter values." },
      b: { name: "Random Search", oneLiner: "Sample hyperparameter combinations at random from specified ranges or distributions." },
      rows: [
        { dim: "Coverage", a: "Exhaustive over the grid you defined — but only those exact values.", b: "Sparse but spread — every draw tests a new value of every parameter." },
        { dim: "Cost growth", a: "Explodes combinatorially: 5 params × 5 values = 3,125 fits.", b: "You choose the budget: 50 draws is 50 fits, regardless of dimensions." },
        { dim: "Unimportant params", a: "Wastes runs re-testing values of parameters that don't matter.", b: "Handles them gracefully — no budget is locked into a fixed lattice." },
        { dim: "Continuous values", a: "Must be discretized; the best value can fall between grid points.", b: "Samples continuously (e.g. log-uniform learning rates)." },
        { dim: "Reproducibility", a: "Fully deterministic and easy to report.", b: "Needs a fixed random seed to reproduce." },
        { dim: "Evidence", a: "Fine for 1-2 hyperparameters with few candidate values.", b: "Bergstra & Bengio (2012): beats grid at equal budget in higher dimensions." }
      ],
      confusion: "Beginners assume 'trying everything' must beat 'random guessing'; the tell is dimensionality — grid burns its budget on redundant values of unimportant parameters, so random search usually finds better settings for the same cost.",
      rule: "Tuning one or two parameters? Grid is fine. Three or more, or continuous ranges? Random search (or Bayesian optimization) with a fixed budget."
    },
    {
      key: "split-cv",
      title: "Train/Validation/Test Split vs Cross-Validation",
      tagline: "One fixed holdout vs rotating every point through validation",
      a: { name: "Holdout split", oneLiner: "Cut the data once into train, validation, and test sets with fixed roles." },
      b: { name: "Cross-validation", oneLiner: "Split data into K folds and rotate so each fold takes a turn as the validation set." },
      rows: [
        { dim: "Mechanics", a: "One split, e.g. 70/15/15; each example lives in exactly one set.", b: "K splits (often 5 or 10); each example is validated on exactly once." },
        { dim: "Cost", a: "Cheap: train the model once per configuration.", b: "K times the cost: train K models per configuration." },
        { dim: "Estimate quality", a: "Noisier — one unlucky split can mislead you.", b: "More stable — the score is averaged over K folds, with a spread." },
        { dim: "Data efficiency", a: "Validation data never contributes to training.", b: "Every point is used for training in K−1 of the folds." },
        { dim: "Best when", a: "Data is huge (a 2% holdout is plenty) or training is expensive.", b: "Data is small or medium and you can afford repeated training." },
        { dim: "The test set", a: "Kept locked away for the single final measurement.", b: "Still needed! CV replaces the validation set, not the final test set." }
      ],
      confusion: "Beginners think cross-validation removes the need for a test set; the tell is purpose — CV is a better way to do validation (model selection), while the untouched test set remains the final, once-only scorecard.",
      rule: "Small data or high-stakes tuning: cross-validate for selection, but always keep one untouched test set for the final number."
    },
    {
      key: "roc-pr",
      title: "ROC-AUC vs PR-AUC",
      tagline: "Ranking across all classes vs performance on the rare positive class",
      a: { name: "ROC-AUC", oneLiner: "Area under the true-positive-rate vs false-positive-rate curve across thresholds." },
      b: { name: "PR-AUC", oneLiner: "Area under the precision vs recall curve across thresholds." },
      rows: [
        { dim: "Axes", a: "TPR (recall) vs FPR — false alarms measured against all negatives.", b: "Precision vs recall — false alarms measured against your predictions." },
        { dim: "Class imbalance", a: "Insensitive: with tons of negatives, FPR stays tiny and scores look rosy.", b: "Sensitive: precision collapses when false positives swamp rare positives." },
        { dim: "Baseline value", a: "Random classifier scores 0.5, regardless of class balance.", b: "Random classifier scores the positive rate (e.g. 0.01 at 1% positives)." },
        { dim: "Interpretation", a: "Probability a random positive is ranked above a random negative.", b: "Average precision achieved across all recall levels." },
        { dim: "Best for", a: "Balanced classes, or when you care about both classes equally.", b: "Rare positives: fraud, disease, anomalies, ad clicks." },
        { dim: "Failure mode", a: "A fraud model with 0.95 ROC-AUC can still be useless in production.", b: "Hard to compare across datasets with different positive rates." }
      ],
      confusion: "Beginners quote a high ROC-AUC on a 1%-positive dataset as proof of quality; the tell is imbalance — ROC hides floods of false positives among abundant negatives, while PR-AUC exposes them through precision.",
      rule: "Classes roughly balanced? ROC-AUC. Positives rare and precious? Judge with PR-AUC."
    },
    {
      key: "param-hyper",
      title: "Parameters vs Hyperparameters",
      tagline: "What the model learns vs what you set before it learns",
      a: { name: "Parameters", oneLiner: "Values the algorithm learns from data during training, like weights and biases." },
      b: { name: "Hyperparameters", oneLiner: "Settings you choose before training that control how learning happens." },
      rows: [
        { dim: "Set by", a: "The training algorithm, automatically, by optimizing a loss.", b: "You (or a tuner), before training starts." },
        { dim: "Examples", a: "Neural net weights, linear regression coefficients, tree split thresholds.", b: "Learning rate, tree depth, K in K-Means, regularization strength λ, batch size." },
        { dim: "Where they live", a: "Inside the fitted model — they ARE the model.", b: "Outside the model — they configure the training recipe." },
        { dim: "How many", a: "Can be millions or billions (LLMs).", b: "Usually a handful to a few dozen." },
        { dim: "Optimized via", a: "Gradient descent, closed-form solutions, split criteria — on training data.", b: "Grid/random/Bayesian search — scored on validation data, never test data." },
        { dim: "Litmus test", a: "If .fit() changes it, it's a parameter.", b: "If you pass it to the constructor, it's a hyperparameter." }
      ],
      confusion: "Beginners call everything 'parameters'; the tell is who sets the value — the training algorithm learns parameters from data, while you pick hyperparameters before training begins.",
      rule: "Ask 'did the model learn this or did I choose it?' — learned means parameter, chosen means hyperparameter (and tune it on validation data)."
    },
    {
      key: "euclid-manhattan",
      title: "Euclidean vs Manhattan distance",
      tagline: "Straight-line ruler vs city-block steps — how k-NN measures 'similar'",
      a: { name: "Euclidean (L2)", oneLiner: "Straight-line 'as the crow flies' distance: square each axis gap, sum, take the root." },
      b: { name: "Manhattan (L1)", oneLiner: "City-block distance: add the absolute gaps along each axis, no squaring." },
      rows: [
        { dim: "Formula", a: "d = √Σ(aᵢ − bᵢ)²", b: "d = Σ |aᵢ − bᵢ|" },
        { dim: "Picture", a: "Diagonal line between two points.", b: "Right-angle steps along a grid." },
        { dim: "Big single gap", a: "Squared, so one large gap dominates — outlier-sensitive.", b: "Added once, so a big gap doesn't swamp the rest." },
        { dim: "High dimensions", a: "Distances concentrate faster; neighbours blur together.", b: "Holds up better — keeps neighbours more distinguishable." },
        { dim: "Best for", a: "Low-dim, continuous, comparably-scaled features (the default).", b: "Many features, outliers, or grid-like / ordinal features." },
        { dim: "Needs scaling", a: "Yes — always scale first.", b: "Yes — always scale first." }
      ],
      confusion: "They use the same features and both need scaling; the only difference is whether axis gaps are squared (Euclidean) or just added (Manhattan) — which changes how much a big gap or extra dimensions hurt.",
      rule: "Default to Euclidean for a few comparable continuous features; switch to Manhattan in high dimensions or when big single-axis gaps/outliers shouldn't dominate. It's a hyperparameter — validate both."
    }
  ];
})();
