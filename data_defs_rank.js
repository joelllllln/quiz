/* Curated rank for every definition concept, used by flashcards and read+recall.
   Rank 1 = simple and core to its topic; 2 = standard depth; 3 = advanced or peripheral.
   Keys are normalised reveal names (lowercase, alphanumeric only). A name shared by several
   topics gets one global rank, matching the deduped flashcard deck. Loads before app.js. */
(function () {
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function set(rank, names) { names.forEach(function (n) { R[nk(n)] = rank; }); }

  /* ===== Core Definitions ===== */
  set(1, ["Algorithm vs model", "Example (row)", "Model", "Supervised learning", "Unsupervised learning",
    "Classification", "Regression", "Feature", "Label (target)", "Training set", "Test set", "Overfitting",
    "Underfitting", "Generalization", "Hyperparameter", "Validation set", "Loss function", "Ground truth",
    "Mean, median and mode", "Categorical vs numerical feature", "Population vs sample"]);
  set(2, ["Gradient descent", "Learning rate", "Reinforcement learning", "Bootstrap sampling", "Online learning",
    "Batch learning", "Concept drift", "Model monitoring", "Standard deviation", "Variance (statistics)",
    "Percentiles and quantiles", "Random variable", "Probability distribution (PMF / PDF)", "Expected value",
    "Normal distribution", "Covariance", "Correlation coefficient", "Pearson correlation", "Skewness",
    "Bernoulli distribution", "Binomial distribution", "Uniform distribution", "i.i.d. assumption",
    "Law of large numbers", "Sampling (selection) bias", "A/B testing", "Semi-supervised learning",
    "P-value", "Confidence interval", "Type I error", "Type II error", "Null hypothesis", "Statistical significance"]);
  set(3, ["Inductive bias", "Transfer learning", "Fine-tuning", "Self-supervised learning", "Spearman correlation",
    "Central limit theorem"]);

  /* ===== k-Nearest Neighbours ===== */
  set(1, ["k-Nearest Neighbours (KNN)", "K-nearest neighbours", "1-Nearest Neighbour (1-NN)", "Euclidean distance",
    "Manhattan (city-block) distance", "Manhattan distance", "Distance metric", "Feature space",
    "Feature scaling (normalisation)", "Feature scaling (for KNN)", "Majority vote", "Train/test split",
    "KNN regression", "Decision boundary", "Feature vectors (numeric encoding)", "Lazy (instance-based) learning"]);
  set(2, ["Distance-weighted KNN", "Weighted KNN", "Min-max normalisation", "Standardisation (z-scores)",
    "Non-parametric model", "The smoothness (locality) assumption", "Minkowski distance", "Chebyshev distance",
    "Cosine similarity", "Hamming distance", "Jaccard distance", "Tie-breaking in KNN", "K-fold cross-validation",
    "One-hot encoding", "Feature selection", "The bias–variance trade-off", "Hyperparameter tuning (validation curve)",
    "Brute-force nearest-neighbour search", "KNN imputation", "Radius neighbours (fixed-radius NN)", "Robust scaling",
    "Plurality voting (multi-class KNN)", "Curse of dimensionality", "The curse of dimensionality"]);
  set(3, ["Local Outlier Factor (LOF)", "Nearest-neighbour graph", "Haversine (great-circle) distance",
    "Dynamic time warping (DTW)", "Mahalanobis distance", "Canberra distance", "Precomputed distance matrix",
    "Spatial indexes (k-d tree, ball tree)", "Distance concentration", "Bayes error (irreducible error)",
    "Prototype selection (CNN / ENN editing)", "Approximate Nearest Neighbours (ANN)",
    "Temporal leakage & walk-forward validation", "Voronoi tessellation", "kNN-distance anomaly detection",
    "Metric learning (Mahalanobis, LMNN, NCA)", "User-based collaborative filtering = KNN"]);

  /* ===== Logistic Regression ===== */
  set(1, ["Logistic regression", "Sigmoid function", "The sigmoid (logistic) function", "Sigmoid (logistic) function",
    "Weighted score", "Odds", "Log-odds (logit)", "Decision threshold", "The decision threshold",
    "Coefficient (weight)", "Intercept (bias)", "Linear decision boundary", "Odds ratio"]);
  set(2, ["L2 regularisation (the C parameter)", "Odds ratios (interpretability)", "Softmax",
    "Log loss (cross-entropy)", "Maximum likelihood estimation", "Cost function", "Stochastic gradient descent",
    "Mini-batch gradient descent", "Batch gradient descent", "Class weights in logistic regression",
    "Feature scaling for convergence", "L1 (lasso) regularisation", "Elastic net", "Multicollinearity",
    "Interaction terms", "Standardised coefficients", "Sigmoid saturation", "Derivative",
    "Gradient (vector of partial derivatives)", "Convex function", "Global vs local minimum",
    "Exponential function (e^x)", "Logarithm (and log rules)", "Perfect separation", "Logit linearity assumption",
    "Reference (baseline) category", "Softmax (multinomial logistic regression)"]);
  set(3, ["IRLS (iteratively reweighted least squares)", "Deviance", "Coefficient significance (Wald test)",
    "McFadden's pseudo-R²", "Average marginal effect", "Probit regression", "Likelihood-ratio test",
    "Solvers (lbfgs, liblinear, saga)"]);

  /* ===== Naive Bayes ===== */
  set(1, ["Probability", "Conditional probability", "Bayes' theorem (flipping the conditional)", "Bayes' theorem",
    "Prior probability", "Likelihood", "Posterior", "Evidence", "The independence assumption",
    "Naive independence assumption", "Naive Bayes (Bayes' rule + evidence)", "Laplace smoothing",
    "Laplace (additive) smoothing", "Joint probability", "Complement rule", "Sample space and event",
    "Statistical independence", "The zero-frequency problem"]);
  set(2, ["Likelihood ratio", "Generative model", "Gaussian Naive Bayes", "MultinomialNB", "BernoulliNB: binary features",
    "GaussianNB", "Evidence (marginal likelihood)", "MAP estimate", "Bag-of-words", "CategoricalNB",
    "Marginal probability (marginalisation)", "Product rule (chain rule of probability)", "Law of total probability",
    "Conditional independence", "Log-space computation", "Discretising continuous features for NB",
    "Posterior odds", "Setting priors (fit_prior / class_prior)", "Base rate fallacy",
    "Independence violation robustness", "Class-conditional probability"]);
  set(3, ["Lidstone smoothing", "Feature log-probabilities (feature_log_prob_)", "Tree-augmented Naive Bayes (TAN)",
    "Conjugate prior", "Dirichlet prior (smoothing as pseudocounts)", "Empirical Bayes", "Bayesian network",
    "Expectation-maximisation", "ComplementNB", "Naive Bayes as a linear classifier"]);

  /* ===== Decision Trees ===== */
  set(1, ["Decision tree", "The decision tree", "Node / split", "Root", "Leaf node", "Split", "Gini impurity",
    "Entropy", "Information gain", "Impurity (Gini / entropy)", "Gini / entropy", "Node impurity",
    "Greedy splitting", "Greedy top-down splitting", "max_depth", "Pruning", "Split threshold",
    "Recursive binary partitioning", "Decision path"]);
  set(2, ["Feature importance", "Tree instability (high variance)", "Axis-aligned decision boundary",
    "min_samples_leaf", "min_samples_split", "max_leaf_nodes", "min_impurity_decrease", "Regression trees",
    "Reduction in variance (regression splitting)", "Pre-pruning (min_samples_leaf / min_samples_split / max_depth)",
    "Cost-complexity (post-)pruning", "CART (Classification And Regression Trees)", "Leaf class probabilities",
    "Self-information (surprise)"]);
  set(3, ["Gain ratio (C4.5)", "Surrogate splits", "Twoing criterion", "Oblique decision trees", "ID3 algorithm",
    "Monotonic constraints"]);

  /* ===== Support Vector Machines ===== */
  set(1, ["Support vector machine", "Separating hyperplane", "Margin", "Support vectors", "Maximum-margin classifier",
    "Soft margin", "Soft margin & the C parameter", "C parameter", "Kernel", "Kernel trick", "The kernel trick",
    "The kernel idea", "RBF kernel", "gamma", "RBF gamma", "Linear kernel", "Hard-margin SVM"]);
  set(2, ["Hinge loss", "Polynomial kernel", "Sigmoid kernel", "Slack variables", "Geometric margin",
    "Functional margin", "One-vs-rest (OvR) multiclass", "One-vs-one multiclass SVM", "Feature scaling for SVM",
    "Sparsity of SVMs", "SVR and the ε-insensitive tube", "Platt scaling (probability=True)",
    "Probability calibration (Platt / isotonic)"]);
  set(3, ["Dual formulation (Lagrangian)", "Mercer's condition (valid kernels)", "Gram (kernel) matrix",
    "SMO (sequential minimal optimization)", "nu-SVM", "Kernel approximation (RFF / Nystroem)", "One-class SVM"]);

  /* ===== Random Forests & Bagging ===== */
  set(1, ["Random forest", "Random forests", "Bagging", "Bagging (bootstrap aggregating)", "Bootstrap sample",
    "Ensemble learning", "Majority voting", "Averaging (regression)", "n_estimators",
    "Aggregation (voting and averaging)", "Variance reduction", "Out-of-bag (OOB) evaluation", "Out-of-bag error",
    "max_features"]);
  set(2, ["Feature bagging / random subspace", "Tree decorrelation", "Error decorrelation",
    "Feature importance (read with care)", "Feature importance (and its bias)", "Mean decrease in impurity (MDI)",
    "Permutation importance (MDA)", "max_samples (bootstrap size)", "The 63.2% rule (bootstrap coverage)",
    "Soft voting (probability averaging)", "Embarrassingly parallel training", "Bagging cuts variance, not bias",
    "Fully-grown trees (low-bias base learners)", "max_features ≈ √p rule", "max_features (the decorrelation knob)",
    "Pasting (sampling without replacement)", "warm_start (growing the forest)"]);
  set(3, ["Proximity matrix", "Random Patches", "ExtraTrees (extremely randomized trees)",
    "Cardinality bias in importances", "Group permutation importance", "Isolation Forest",
    "Quantile Regression Forests"]);

  /* ===== Gradient Boosting ===== */
  set(1, ["Gradient boosting", "Boosting", "Ensemble", "Weak learner", "Residual", "Boosting round",
    "Sequential training", "Additive model", "Shrinkage (learning rate)", "Learning rate / shrinkage",
    "Early stopping", "Early stopping in boosting", "Decision stump"]);
  set(2, ["Loss gradient (pseudo-residual)", "Regularization (boosting)", "Subsampling (stochastic GB)",
    "Forward stage-wise additive modelling", "Negative-gradient fitting", "AdaBoost (adaptive boosting)",
    "Boosting reduces bias", "The learning-rate / n_estimators trade-off", "Feature subsampling (max_features in GB)",
    "Stochastic gradient boosting", "Weak learners (max_depth 3–6)", "Staged predictions",
    "Base score (initial prediction)", "Warm start (incremental trees)", "Histogram-based split finding"]);
  set(3, ["Functional gradient descent", "Line search (leaf value optimisation)", "Deviance loss (GB classification)",
    "Newton boosting (second-order)", "SHAP values (TreeSHAP)", "Leaf-wise vs level-wise growth",
    "Pseudo-residuals on the log-odds scale"]);

  /* ===== Stacking & Voting ===== */
  set(1, ["Voting ensemble", "Voting classifier", "Hard voting", "Soft voting", "Base models", "Meta-model (stacking)",
    "Meta-learner (blender)", "Stacking", "Stacking (stacked generalisation)", "Model averaging", "Weighted voting",
    "Weighted vote", "Averaging (regression ensembles)"]);
  set(2, ["Blending", "Out-of-fold predictions", "Out-of-fold stacking", "Ensemble diversity",
    "Level-0 vs level-1 learners", "Meta-features", "Holdout blending", "Leakage (here)",
    "In-sample stacking leakage", "Choosing the meta-learner", "Heterogeneous vs homogeneous ensembles",
    "StackingClassifier / StackingRegressor", "Weight optimisation for ensembles",
    "Probability meta-features (soft outputs)", "Meta-learner overfitting", "Bucket of models"]);
  set(3, ["Rank averaging", "Super Learner", "Multi-level stacking", "Passthrough stacking (context-aware trust)",
    "Knowledge distillation", "Greedy ensemble selection"]);

  /* ===== Model Evaluation ===== */
  set(1, ["Accuracy", "Precision", "Recall (sensitivity)", "F1 score", "Confusion matrix", "The confusion matrix",
    "Threshold", "Specificity", "Specificity (true-negative rate)", "False-positive rate", "ROC curve",
    "The ROC curve", "ROC-AUC", "AUC (ROC)", "The precision–recall trade-off", "Support", "Prevalence (base rate)",
    "Classification report"]);
  set(2, ["Precision-recall curve", "Log loss", "R-squared", "Mean squared error", "Mean absolute error",
    "False-negative rate (miss rate)", "Negative predictive value (NPV)", "False discovery rate (FDR)",
    "F-beta score (Fbeta)", "Normalised confusion matrix", "AUC as ranking probability",
    "Precision and recall as conditional probabilities", "Micro vs macro vs weighted averaging",
    "Repeated cross-validation", "Cost matrix (expected-cost evaluation)"]);
  set(3, ["Youden's J statistic (informedness)", "Diagnostic odds ratio (DOR)", "Jaccard score (IoU)",
    "Nested cross-validation", "Proper scoring rules", "Matthews correlation coefficient",
    "Calibration curves & ECE", "Bootstrap confidence intervals"]);

  /* ===== Performance Optimisation ===== */
  set(1, ["Overfitting vs underfitting", "Baseline", "Holdout / validation set", "Train/validation/test split",
    "Cross-validation", "Regularization", "Bias-variance tradeoff", "Learning curve", "Learning curves",
    "Generalization gap", "Grid search", "Random search", "Data leakage"]);
  set(2, ["L2 (ridge) penalty", "L1 (lasso) penalty", "Bias (in bias-variance)", "Variance (in bias-variance)",
    "Model capacity", "Validation curve", "High-variance signature (overfitting)", "High-bias signature (underfitting)",
    "Irreducible error (noise floor)", "Data augmentation", "Ensembling", "Patience (early stopping)",
    "Validation-set overfitting", "More data vs better model (sample efficiency)"]);
  set(3, ["Double descent", "VC dimension", "Successive halving & Hyperband", "Bayesian optimisation",
    "Bias-variance decomposition of MSE"]);

  /* ===== Advanced Scikit-learn ===== */
  set(1, ["Estimator", ".fit(X, y)", ".fit()", ".predict()", ".fit_transform()", "Transformer & .transform",
    "Pipeline", "StandardScaler", "train_test_split", "predict_proba", "random_state",
    "random_state / reproducibility", "One-hot encoding categoricals", "MinMaxScaler", "SimpleImputer"]);
  set(2, ["GridSearchCV", "RandomizedSearchCV", "cross_val_score", "cross_validate", "make_pipeline",
    "make_column_transformer", "ColumnTransformer", "OrdinalEncoder", "LabelEncoder", "Stratified splitting",
    "Calibration", "Permutation importance", "PolynomialFeatures", "KBinsDiscretizer"]);
  set(3, ["FunctionTransformer", "clone", "get_params / set_params", "PowerTransformer", "HistGradientBoosting",
    "CalibratedClassifierCV"]);

  /* ===== K-Means ===== */
  set(1, ["K-means clustering", "Cluster", "Centroid", "k (number of clusters)", "Clustering (unsupervised learning)",
    "Hard assignment", "Assignment step", "Update step", "Inertia (k-means)", "Inertia (WCSS)", "Elbow method",
    "The elbow method", "Lloyd's algorithm", "Lloyd's algorithm (k-means)", "Feature scaling for k-means"]);
  set(2, ["Silhouette score", "k-means++", "Voronoi cell", "Between-cluster sum of squares (BCSS)",
    "Convergence criterion (centroid stability)", "Empty cluster problem", "Distortion (k-means objective)",
    "n_init (multiple restarts)", "Local minima in k-means", "Isotropic cluster assumption",
    "Label permutation (arbitrary cluster IDs)", "Forgy initialisation", "MiniBatchKMeans"]);
  set(3, ["NP-hardness of optimal k-means", "Gap statistic", "Davies-Bouldin index", "Calinski-Harabasz index",
    "k-medoids (PAM)", "Vector quantization", "Adjusted Rand Index"]);

  /* ===== Hierarchical Clustering ===== */
  set(1, ["Hierarchical clustering", "Agglomerative clustering", "Agglomerative vs divisive", "Dendrogram",
    "Linkage", "Single linkage", "Complete linkage", "Average linkage", "Ward linkage", "Cutting the dendrogram",
    "Merge height", "Singleton initialisation", "Divisive clustering"]);
  set(2, ["Centroid linkage", "Chaining effect", "Proximity (distance) matrix", "Flat clusters (fcluster)",
    "Number of merges (n - 1)", "Feature scaling", "Connectivity constraint", "distance_threshold (cutting by height)",
    "Truncated dendrogram", "Ward requires Euclidean distance", "Divisive (top-down) clustering",
    "Cophenetic distance"]);
  set(3, ["Median linkage (WPGMC)", "Weighted average linkage (WPGMA)", "Dendrogram inversion",
    "Nearest-neighbour chain algorithm", "Ultrametric property", "Leaf ordering", "Linkage matrix (scipy)",
    "Lance–Williams recurrence", "Cophenetic correlation", "BIRCH & the CF-tree"]);

  /* ===== DBSCAN ===== */
  set(1, ["DBSCAN", "DBSCAN (density-based clustering)", "Density", "Core point", "Border point", "Noise label (−1)",
    "eps (neighbourhood radius)", "minPts (density threshold)", "min_samples (minPts)", "eps-neighbourhood",
    "DBSCAN cluster", "Region query"]);
  set(2, ["k-distance plot", "k-distance graph", "Directly density-reachable", "Density-reachable",
    "Density-connected", "Cluster expansion (seed growth)", "Noise as a feature (outlier detection)",
    "Centroid-free clustering", "DBSCAN vs k-means (assumptions)", "Convex vs non-convex clusters",
    "No native predict for new points", "Single global density scale", "min_samples rule of thumb (≈ 2 × dims)",
    "Core-point determinism", "Border-point order dependence"]);
  set(3, ["HDBSCAN", "Core distance (OPTICS)", "Reachability distance (OPTICS)", "OPTICS algorithm",
    "Mean-shift clustering", "DBSCAN complexity and spatial indexing", "Spectral clustering"]);

  /* ===== PCA ===== */
  set(1, ["Principal Component Analysis", "Principal component", "Principal component (PC1)",
    "The first principal component", "First principal component (PC1)", "Dimension", "Projection", "Loadings",
    "Loading", "Variance explained (PCA)", "Explained-variance ratio", "Scree plot", "Reconstruction error",
    "Mean centering", "n_components", "Cumulative explained variance", "Vector", "Dot product",
    "Vector norm (length)", "Linear combination"]);
  set(2, ["Eigenvector", "Eigenvalue", "Covariance matrix", "Orthogonal components", "Orthonormal basis",
    "Scaling before PCA (correlation vs covariance)", "Sign ambiguity of components", "PCA as a noise filter",
    "Biplot", "Basis (change of basis)"]);
  set(3, ["Whitening", "Singular value decomposition (SVD)", "Singular value", "Eigendecomposition", "Kernel PCA",
    "Incremental PCA", "Randomized SVD", "NMF (Non-negative Matrix Factorization)", "TruncatedSVD (LSA)",
    "Low-rank approximation (Eckart–Young)", "Matrix rank"]);

  /* ===== t-SNE ===== */
  set(1, ["t-SNE", "Dimensionality reduction", "Embedding", "Perplexity", "Local structure",
    "Nonlinear dimensionality reduction", "Neighbourhood preservation", "Cannot transform new points",
    "Cluster sizes are meaningless", "Inter-cluster distances are meaningless", "Global structure (not preserved)"]);
  set(2, ["UMAP", "KL-divergence objective", "Learning rate (t-SNE)", "Crowding problem", "Early exaggeration",
    "init='pca'", "Non-determinism (random_state)", "Gradient descent optimisation",
    "Output dimensionality (n_components)", "PCA pre-reduction before t-SNE",
    "Iteration count and convergence (n_iter)", "Perplexity sweep", "Student's t-distribution (low-D similarities)"]);
  set(3, ["Barnes-Hut approximation", "High-dimensional affinities (Gaussian)", "Symmetric SNE",
    "Attractive and repulsive forces", "No parametric mapping", "Metric distortion", "Trustworthiness score"]);

  /* ===== Feature Engineering ===== */
  set(1, ["Feature engineering", "One-hot encoding", "Ordinal encoding", "Label encoding", "Standardization",
    "Min-max normalization", "Imputation", "Outlier", "Binning", "Datetime features", "Log transform",
    "Interaction feature", "Fit-on-train-only rule"]);
  set(2, ["Frequency encoding", "Aggregation features", "Domain features", "Quantile binning", "Ratio features",
    "Lag features", "Rolling-window features", "Outlier clipping (winsorising)", "Missingness indicator",
    "Tokenisation", "N-gram", "Stemming", "Lemmatisation", "Cyclical encoding", "Rare-category grouping",
    "Polynomial feature", "Target encoding", "TF-IDF", "Stop-word removal", "Recency features (date differences)",
    "Feature extraction", "Unit-norm scaling (Normalizer)"]);
  set(3, ["Box-Cox transform", "Yeo-Johnson transform", "Word embedding", "Feature hashing", "Binary encoding",
    "Out-of-fold target encoding"]);

  /* ===== Feature Selection ===== */
  set(1, ["Filter method", "Wrapper method", "Embedded method", "Irrelevant feature", "Redundant vs irrelevant",
    "Forward selection", "Backward elimination", "Variance threshold", "Univariate selection"]);
  set(2, ["SelectKBest", "SelectPercentile", "SelectFromModel", "Chi-square test", "ANOVA F-test", "RFE",
    "RFECV (RFE with cross-validation)", "Mutual information", "Correlation-based selection", "Lasso (L1) selection",
    "Sequential feature selection", "Constant & quasi-constant feature removal", "Selection inside cross-validation"]);
  set(3, ["Boruta", "Variance inflation factor (VIF)", "Stability selection",
    "mRMR (minimum redundancy maximum relevance)", "Null importances", "Univariate ROC-AUC screening"]);

  /* ===== Model Selection ===== */
  set(1, ["Model selection", "Baseline model", "Holdout (validation) set", "k-fold cross-validation",
    "Hyperparameter tuning", "Hyperparameter vs parameter", "Occam's razor (parsimony)"]);
  set(2, ["Search space", "Scoring parameter (in tuning)", "Refit", "Tuning budget", "Coarse-to-fine search",
    "Stratified k-fold", "Time-series split", "Model selection vs assessment", "Search space vs tuning budget",
    "Seed sensitivity in model comparison"]);
  set(3, ["Successive halving", "Hyperband", "Optuna", "Trial pruning", "Information criteria (AIC / BIC)",
    "One-standard-error rule", "No Free Lunch theorem"]);

  /* ===== XGBoost ===== */
  set(1, ["XGBoost", "Regularized boosting", "Learning rate (eta)", "Objective function", "subsample",
    "colsample_bytree"]);
  set(2, ["lambda (L2 leaf-weight penalty)", "alpha (L1 leaf-weight penalty)", "gamma (min_split_loss)",
    "min_child_weight", "scale_pos_weight", "eval_metric (monitoring metric)", "base_score (initial prediction)",
    "tree_method", "Histogram method", "Gain importance", "DMatrix", "Importance types: weight, gain, cover"]);
  set(3, ["Cover (hessian sum)", "Similarity (structure) score", "Second-order Taylor approximation",
    "The regularised objective", "Sparsity-aware split finding", "Interaction constraints", "max_delta_step",
    "Weighted quantile sketch", "colsample_bylevel / colsample_bynode", "Second-order boosting"]);

  /* ===== Interpretability ===== */
  set(1, ["Model interpretability", "Global vs local explanation", "Intrinsically interpretable model",
    "Transparency vs post-hoc"]);
  set(2, ["SHAP values", "LIME", "Partial dependence plot (PDP)", "ICE plot", "Surrogate model",
    "Counterfactual explanation", "Model card", "Shapley value", "SHAP summary (beeswarm) plot",
    "Force / waterfall plot (local explanation)", "Explanation fidelity"]);
  set(3, ["Anchors", "Saliency map", "Attention as explanation", "Accumulated Local Effects (ALE) plot",
    "Grad-CAM", "Integrated gradients", "Rashomon effect (model multiplicity)"]);

  /* ===== Class Imbalance ===== */
  set(1, ["Class imbalance", "Minority class", "Majority class", "Random oversampling", "Random undersampling",
    "Over/undersampling", "Class weights", "Threshold moving", "Imbalance ratio"]);
  set(2, ["SMOTE", "Cost-sensitive learning", "Resampling inside cross-validation", "PR-AUC preference",
    "The 'balanced' class-weight formula", "Anomaly detection", "Tomek links", "Edited Nearest Neighbours (ENN)",
    "Combined resampling (SMOTEENN / SMOTETomek)"]);
  set(3, ["ADASYN", "Borderline-SMOTE", "Focal loss", "EasyEnsemble", "Balanced bagging", "NearMiss undersampling",
    "ClusterCentroids undersampling"]);

  /* ===== Extra Evaluation Metrics ===== */
  set(1, ["Balanced accuracy", "Cohen's kappa", "Matthews correlation coefficient (MCC)", "Brier score",
    "Average precision (PR-AUC)"]);
  set(2, ["Calibration curve", "G-mean (geometric mean)", "Top-k accuracy", "Lift", "Cumulative gain curve",
    "Zero-one loss", "Hamming loss (multi-label)", "Equal error rate (EER)", "Kolmogorov-Smirnov (KS) statistic"]);
  set(3, ["Gini coefficient (from AUC)", "Concordance index (c-index)", "Precision at k (P@k)",
    "Mean reciprocal rank (MRR)", "Normalized discounted cumulative gain (NDCG)", "Mean average precision (mAP)",
    "Partial AUC", "DET curve", "Fowlkes-Mallows index", "Fleiss' kappa (multi-rater agreement)"]);

  /* ===== Regression & Boosting ===== */
  set(1, ["Linear regression", "Ordinary least squares", "Residual", "RMSE", "Mean absolute error (MAE)",
    "Ridge regression", "Lasso regression"]);
  set(2, ["Elastic Net regularisation", "Adjusted R-squared", "Mean absolute percentage error (MAPE)",
    "Polynomial regression", "Homoscedasticity", "Gradient boosting regressor", "Residual plot diagnostics",
    "Huber loss", "Target transformation (log target)", "LightGBM", "CatBoost"]);
  set(3, ["Quantile regression", "RMSLE", "Poisson regression"]);

  /* ===== Validation ===== */
  set(1, ["Holdout method", "Validation set (purpose)", "Leave-one-out (LOOCV)", "Time-series validation split"]);
  set(2, ["Group k-fold", "Repeated k-fold cross-validation", "Shuffle-split (Monte Carlo CV)",
    "Out-of-fold (OOF) predictions", "Data snooping (data dredging)", "Leakage-safe pipeline",
    "Walk-forward validation", "Choosing k (fold-count trade-off)",
    "Stratified splits for regression (target binning)", "Duplicate leakage"]);
  set(3, ["Purged cross-validation", "Blocked cross-validation", "Leave-p-out cross-validation",
    "Bootstrap (.632) validation", "Adversarial validation"]);

})();
