/* More definitions (batch 8): core vocabulary, KNN, logistic regression, Naive Bayes,
   decision trees, SVM, random forests, gradient boosting. Standard glossary terms, each
   DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and
   read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===================== Core Definitions (found1) — 4 ===================== */

  def("found1",
    "What is the ground truth in a machine learning dataset?",
    "The true, verified label or value that the model's predictions are compared against.",
    ["The prediction the current best model makes for each example before any human has checked it.",
     "The set of features that remain after all noisy or redundant columns have been removed.",
     "The average label across the whole dataset, used as the simplest possible baseline.",
     "The subset of examples on which every candidate model happens to agree."],
    "Ground truth",
    "The real, trusted answer for each example — the labels assumed correct that training and evaluation both measure against.",
    "Every supervised score is a comparison between predictions and ground truth, so label errors poison both training and evaluation. When the ground truth itself is noisy, measured accuracy has a ceiling below 100%.",
    "The answer key. The model's guesses are marked right or wrong against it.");

  def("found1",
    "What does the standard deviation of a variable measure?",
    "The typical spread of values around the mean, in the variable's own units.",
    ["The difference between the largest and smallest values that the variable takes in the sample.",
     "The value that splits the sorted observations into two equally sized halves.",
     "How strongly the variable moves together with a second variable when both are observed in pairs.",
     "The proportion of observations that lie strictly above the sample mean."],
    "Standard deviation",
    "The square root of the variance: a measure of how far values typically sit from the mean, expressed in the same units as the data.",
    "Because it shares the data's units it is easier to read than variance, and it powers z-scores: standardising subtracts the mean and divides by the standard deviation, the scaling most distance- and gradient-based models want.",
    "On average, how far is a value from the middle? That distance is the standard deviation.");

  def("found1",
    "What does it mean for a distribution to be skewed?",
    "Its values are asymmetric around the centre, with a longer tail on one side.",
    ["Its mean, median and mode all coincide exactly at the same central value.",
     "Its values are spread perfectly evenly across the whole observed range.",
     "It has two distinct peaks separated by a valley of rare values in between.",
     "Its spread is so small that nearly every observation equals the mean."],
    "Skewness",
    "Asymmetry of a distribution: a long right tail is positive skew (incomes, prices), a long left tail is negative skew. Skew pulls the mean away from the median.",
    "Skewed features distort means, inflate the influence of tail values on squared-error models, and often benefit from log or Box-Cox transforms that pull the long tail in.",
    "Lopsided data: most values bunch on one side and a long tail stretches out the other.");

  def("found1",
    "What distinguishes a categorical feature from a numerical feature?",
    "It takes values from a discrete set of labels with no inherent arithmetic meaning.",
    ["It contains a larger number of distinct values than any numeric column in the same table.",
     "It can only ever take exactly two possible values, such as yes and no.",
     "It stores continuous measurements that have been rounded to whole numbers for storage.",
     "It is any feature whose values were entered by a human rather than a sensor."],
    "Categorical vs numerical feature",
    "A categorical feature holds labels (colour, city, product type) where averaging or subtracting values is meaningless; a numerical feature holds quantities where arithmetic makes sense.",
    "The distinction drives preprocessing: categorical features need encoding (one-hot, ordinal, target) before most models can use them, while numerical features may need scaling instead. Treating category codes as numbers invents a fake ordering.",
    "Words vs numbers: 'red/green/blue' is a category, 37.5 is a quantity you can do maths on.");

  /* ===================== k-Nearest Neighbours (easy) — 4 ===================== */

  def("easy",
    "What is the Mahalanobis distance?",
    "A distance that accounts for feature correlations by scaling with the inverse covariance matrix.",
    ["The straight-line distance computed after every feature has simply been divided by its maximum value.",
     "The number of features on which two points differ by more than one standard deviation.",
     "The sum of absolute coordinate differences weighted by how many missing values each feature has.",
     "A distance defined only for binary vectors that counts mismatched positions."],
    "Mahalanobis distance",
    "A covariance-aware distance: it whitens the data using the inverse covariance matrix, so correlated or high-variance directions don't dominate the metric.",
    "Where Euclidean distance treats every axis as independent and equally scaled, Mahalanobis distance stretches and rotates space to match the data's actual spread — the idea underlying metric learning and many outlier detectors.",
    "A smart ruler that knows which directions in the data are naturally stretched, and corrects for them.");

  def("easy",
    "In KNN classification with an even k, two classes each receive exactly half the votes. What is this situation called, and how is it usually handled?",
    "A tie — commonly broken by the nearest neighbour, by distance weighting, or by choosing odd k.",
    ["An error state — the classifier refuses to output any label until k is increased by at least one.",
     "A draw that is always resolved by picking whichever class is more frequent in the whole training set.",
     "An overflow — the algorithm silently doubles k and repeats the vote until one class leads.",
     "A degenerate case that can only occur when two training points share identical coordinates."],
    "Tie-breaking in KNN",
    "When the neighbour vote is split evenly, implementations break the tie — e.g. by the closest neighbour's class, by distance-weighted votes, or by convention (scikit-learn takes the first class in training order). Choosing odd k for binary problems avoids most ties.",
    "Ties are a real design detail, not a corner case: with binary classes and k=4, a 2–2 split is common. Distance weighting elegantly removes ties because exact vote equality becomes vanishingly unlikely.",
    "If the vote is a dead heat, something must decide — usually the closest neighbour, or just picking an odd k so it can't happen.");

  def("easy",
    "What is the Canberra distance?",
    "A sum of per-coordinate absolute differences, each divided by the sum of the two absolute values.",
    ["The ordinary Manhattan distance computed only over the coordinates where both points are non-zero.",
     "The largest relative difference found on any single coordinate between the two points.",
     "The Euclidean distance computed after ranking each feature's values instead of using raw numbers.",
     "One minus the cosine of the angle between the two vectors."],
    "Canberra distance",
    "Σ |xᵢ − yᵢ| / (|xᵢ| + |yᵢ|): a Manhattan-style metric where each term is normalised by the magnitudes involved, making it very sensitive to differences near zero.",
    "Because each coordinate's contribution is relative, small absolute changes in near-zero features matter a lot — useful for count data and compositional data, but noisy features near zero can dominate.",
    "Like city-block distance, but each street's length is measured relative to how big the numbers are.");

  def("easy",
    "Scikit-learn's KNN accepts metric='precomputed'. What do you pass as X in that case?",
    "A ready-made matrix of pairwise distances instead of raw feature vectors.",
    ["A list of the k nearest neighbours you have already found for every training point by hand.",
     "The covariance matrix of the features, from which the estimator derives its own metric.",
     "A compressed version of the feature matrix produced by PCA to speed up the search.",
     "The set of cluster labels from a previous unsupervised run to warm-start the search."],
    "Precomputed distance matrix",
    "With metric='precomputed', the estimator skips distance computation and reads distances straight from the matrix you supply — enabling custom or expensive metrics computed once, outside the model.",
    "This decouples the metric from the estimator: domain-specific distances (edit distance on strings, DTW on time series) can be computed with any tool, cached, and reused across k values and folds.",
    "You hand KNN the distances already worked out, and it just looks them up instead of measuring.");

  /* ===================== Logistic Regression (logreg1) — 4 ===================== */

  def("logreg1",
    "What is perfect (complete) separation in logistic regression?",
    "A feature combination splits the classes exactly, so weights grow without bound during fitting.",
    ["The situation where every feature has zero correlation with the label, making all weights exactly zero.",
     "The desirable end state of training in which the log loss has reached exactly zero on held-out data.",
     "A preprocessing step that splits the data into one subset per class before fitting separate models.",
     "The case where the two classes have identical means, so no linear boundary can be drawn at all."],
    "Perfect separation",
    "When a hyperplane classifies the training data perfectly, maximum likelihood pushes the weights toward infinity to make probabilities 0 and 1 — the optimiser never converges. Regularisation caps the weights and restores a stable solution.",
    "Separation is common with small samples, many features, or one-hot categories that perfectly track a class. Symptoms are huge coefficients and convergence warnings; the standard cure is an L2 penalty, which sklearn applies by default.",
    "If a line can split the classes perfectly, the maths wants infinitely confident weights — regularisation reins it in.");

  def("logreg1",
    "What does the linearity-of-the-logit assumption say in logistic regression?",
    "Each feature relates linearly to the log-odds of the outcome, not to the probability itself.",
    ["Every feature must relate linearly to the predicted probability across its entire observed range.",
     "The features must be jointly normally distributed within each of the two outcome classes.",
     "The outcome variable must be evenly balanced between the classes before a line can be fitted.",
     "Any pair of features must be uncorrelated, otherwise the sigmoid cannot be inverted."],
    "Logit linearity assumption",
    "Logistic regression models log-odds as a weighted sum, so it assumes each feature's effect on the logit is linear. The probability curve itself is S-shaped, not linear.",
    "When a feature's true effect is curved (e.g. risk rising then falling with age), the fix is feature engineering — splines, polynomials or binning — not a different link function. Checking logit linearity is a standard diagnostic.",
    "Straight-line rules apply on the log-odds scale, not the probability scale — bend the features if reality bends.");

  def("logreg1",
    "In scikit-learn's LogisticRegression, what does the solver parameter choose?",
    "The optimisation algorithm (e.g. lbfgs, liblinear, saga) used to fit the weights.",
    ["The link function that converts the weighted score into a probability for each class.",
     "The regularisation type, because each solver name corresponds to one fixed penalty strength.",
     "The strategy used to impute any missing feature values before the model is trained.",
     "The random subset of features that will be considered when building each boundary."],
    "Solvers (lbfgs, liblinear, saga)",
    "Different numerical optimisers for the same objective: lbfgs (default, robust for L2), liblinear (small data, L1 support, binary OvR), saga (large sparse data, supports L1 and elastic net).",
    "All solvers target the same regularised likelihood, so predictions agree when they converge — the choice affects speed, memory, and which penalties are supported, not the model family.",
    "Same destination, different vehicles: the solver is just which algorithm drives the weights to their best values.");

  def("logreg1",
    "What does class_weight='balanced' do in logistic regression?",
    "Reweights the loss so each class contributes in inverse proportion to its frequency.",
    ["Resamples the training data by duplicating minority rows until both classes are equal in size.",
     "Moves the decision threshold automatically so predicted positives match the true positive rate.",
     "Adds a stronger L2 penalty to the coefficients of features correlated with the minority class.",
     "Splits training into per-class models whose probabilities are averaged at prediction time."],
    "Class weights in logistic regression",
    "class_weight scales each example's loss by a per-class factor — 'balanced' uses n_samples / (n_classes × class_count), so rare-class errors cost more and the boundary shifts toward the minority class.",
    "It is cost-sensitive learning without touching the data: no duplication, no information loss. The predicted probabilities become tilted, so recalibrate or tune the threshold if honest probabilities matter.",
    "Rare-class mistakes are made more expensive, so the model stops ignoring the small class.");

  /* ===================== Naive Bayes (bayes1) — 4 ===================== */

  def("bayes1",
    "Why do Naive Bayes implementations sum log-probabilities instead of multiplying raw probabilities?",
    "Multiplying many small probabilities underflows to zero; logs turn the product into a stable sum.",
    ["Because logarithms make the independence assumption exactly true even when features are correlated.",
     "Because addition lets the classifier skip the prior entirely, which speeds up every prediction.",
     "Because summing logs automatically normalises the posterior so it always sums to one.",
     "Because most features are recorded on a log scale to begin with, so no conversion is needed."],
    "Log-space computation",
    "With hundreds of features, a product of per-feature likelihoods becomes astronomically small and underflows floating point. Taking logs converts the product into a sum, which stays in a safe numeric range; argmax is unchanged because log is monotonic.",
    "This is why libraries expose feature_log_prob_ and predict_log_proba: everything happens in log space, and probabilities are exponentiated only at the end (via the log-sum-exp trick) if actually needed.",
    "A thousand tiny numbers multiplied together vanishes to zero on a computer — add their logs instead and nothing breaks.");

  def("bayes1",
    "In what sense is Naive Bayes a linear classifier?",
    "Its log-posterior is a weighted sum of features, so the decision boundary is linear in log space.",
    ["It fits its parameters with the same gradient-descent updates as ordinary linear regression.",
     "It can only ever separate classes whose feature distributions are perfectly Gaussian.",
     "Its predicted probabilities always rise as a straight-line function of every raw feature.",
     "It requires features to be linearly independent before any likelihoods can be estimated."],
    "Naive Bayes as a linear classifier",
    "For Bernoulli/multinomial NB, log P(class|x) is a linear function of the feature counts — each word contributes a fixed additive weight. The boundary between classes is therefore a hyperplane, like logistic regression's.",
    "The difference is how the weights are found: NB estimates them generatively from per-class counts in one pass, while logistic regression optimises them discriminatively. Same boundary family, different fitting story.",
    "Underneath, NB scores classes by adding up per-feature points — a straight-line rule, just learned by counting.");

  def("bayes1",
    "You want to use a continuous feature (like income) in a Naive Bayes model without assuming it's Gaussian. What is a standard approach?",
    "Discretise it into bins and treat the bin memberships as categorical evidence.",
    ["Drop the feature entirely, because Naive Bayes is mathematically undefined for continuous inputs.",
     "Square the feature so its distribution becomes symmetric enough to count frequencies.",
     "Replace the feature with its overall mean so it contributes equally to every class.",
     "Feed the raw value in directly, since multinomial counts accept any real number."],
    "Discretising continuous features for NB",
    "Binning converts a continuous variable into categories whose per-class frequencies NB can count directly (CategoricalNB), avoiding GaussianNB's normality assumption. Kernel density estimates are a smoother alternative.",
    "Binning trades resolution for distributional freedom: skewed, multi-modal or heavy-tailed features often behave better as bins than forced through a Gaussian likelihood. Bin edges should come from the training split only.",
    "Chop income into brackets, then just count how often each bracket appears in each class — no bell curve required.");

  def("bayes1",
    "Naive Bayes often classifies well even when its independence assumption is clearly false. Why?",
    "Classification needs only the right argmax, so correlated evidence can distort probabilities without changing the winner.",
    ["Because the smoothing constant silently removes any correlation between features during training.",
     "Because in practice real-world features are almost always statistically independent within a class.",
     "Because the prior term always dominates the likelihoods, making feature interactions irrelevant.",
     "Because implementations detect correlated features and automatically drop all but one of them."],
    "Independence violation robustness",
    "Violated independence typically makes NB's probabilities overconfident (double-counting correlated evidence), but the ranking of classes — which is all argmax classification uses — often survives intact.",
    "This explains the classic pattern: strong accuracy, terrible calibration. If you need honest probabilities from NB, apply a calibration step; if you only need the label, the naive assumption is often harmless.",
    "Double-counted evidence exaggerates the score but usually still points at the same winner.");

  /* ===================== Decision Trees (trees1) — 4 ===================== */

  def("trees1",
    "What is the decision path of a prediction in a decision tree?",
    "The sequence of internal-node tests the example passes through from root to its leaf.",
    ["The complete list of every split the training algorithm evaluated before choosing each node.",
     "The ordering of features by importance that the tree reports after training completes.",
     "The set of all leaves whose class distributions are similar to the predicted example.",
     "The pruning schedule that removed weak branches while the tree was being grown."],
    "Decision path",
    "For any input, the tree applies one test per level and follows the matching branch; the visited chain of tests is that prediction's decision path — a human-readable rule like 'age ≤ 30 AND income > 40k'.",
    "Decision paths are why single trees are prized for interpretability: every individual prediction comes with its own short, exact rule, retrievable in sklearn via decision_path().",
    "The exact trail of yes/no questions this one example answered on its way to a leaf.");

  def("trees1",
    "How do oblique (multivariate) decision trees differ from standard CART trees?",
    "Their splits test weighted combinations of features, producing slanted boundaries instead of axis-aligned ones.",
    ["They grow from the leaves upward toward the root, merging pure regions as they go.",
     "They replace impurity measures with distance metrics so that no feature thresholds are needed.",
     "They allow each internal node to have arbitrarily many children, one per feature value.",
     "They restrict every split to a single binary feature to keep the tree shallow."],
    "Oblique decision trees",
    "Standard trees split on one feature at a time (x₃ ≤ 5), carving space into axis-parallel boxes. Oblique trees split on linear combinations (2x₁ − x₂ ≤ 3), so a single node can capture a diagonal boundary.",
    "They can represent diagonal class boundaries with far fewer nodes, but each split is harder to search for and to read — one reason axis-aligned CART remains the default despite its staircase boundaries.",
    "Ordinary trees cut only along the grid; oblique trees can cut diagonally across it.");

  def("trees1",
    "How does a trained classification tree produce a probability (predict_proba) for an example?",
    "It returns the class proportions among the training examples that ended in the same leaf.",
    ["It applies a sigmoid to the depth at which the example's decision path terminated.",
     "It averages the impurity values of every node along the example's path from the root.",
     "It computes the distance from the example to the nearest training point of each class.",
     "It re-runs the example through the tree many times with random tie-breaking and counts outcomes."],
    "Leaf class probabilities",
    "Each leaf remembers its training-class mix; an example reaching a leaf with 8 positives and 2 negatives gets P(positive)=0.8. A pure leaf gives 0 or 1 exactly.",
    "Deep trees have small, pure leaves, so their probabilities collapse to 0/1 and are badly calibrated — a key reason forests (which average many leaf estimates) give smoother, more useful probabilities than single trees.",
    "The leaf's own headcount is the probability: 8 of 10 training points there were positive, so 80%.");

  def("trees1",
    "What characterises the classic ID3 tree-building algorithm?",
    "It grows multiway splits on categorical features chosen by information gain, with no pruning in its original form.",
    ["It builds binary splits on numeric thresholds chosen to minimise the Gini impurity at each node.",
     "It trains many randomised trees at once and averages their votes into a single prediction.",
     "It starts from a full tree and greedily removes the split with the least statistical support.",
     "It selects splits by minimising the mean squared error of a regression target."],
    "ID3 algorithm",
    "Quinlan's ID3 (1986) picks the categorical attribute with the highest information gain (entropy reduction) and branches once per value. Its successor C4.5 added numeric thresholds, gain ratio and pruning; CART took the binary-split, Gini route.",
    "ID3's multiway splits and raw information gain favour high-cardinality attributes — the bias that gain ratio was invented to fix. Knowing the lineage (ID3 → C4.5, vs CART) explains why different libraries make different choices.",
    "The 1980s original: pick the most informative category, fan out one branch per value, repeat.");

  /* ===================== Support Vector Machines (svm1) — 4 ===================== */

  def("svm1",
    "What is the Gram (kernel) matrix in kernel methods?",
    "The n×n matrix of kernel values between every pair of training points.",
    ["The matrix of raw feature values after each column has been standardised to zero mean.",
     "The confusion matrix restricted to the support vectors found during training.",
     "The matrix of weights the optimiser assigns to each feature in the primal problem.",
     "A diagonal matrix holding each training point's slack variable."],
    "Gram (kernel) matrix",
    "K[i,j] = k(xᵢ, xⱼ): all pairwise similarities under the kernel. The dual SVM problem is written entirely in terms of this matrix, which must be positive semi-definite for a valid kernel (Mercer's condition).",
    "The Gram matrix is why kernel SVMs scale poorly with n — it holds n² entries — and why the kernel trick works at all: training touches data only through these pairwise values, never the raw high-dimensional coordinates.",
    "A big similarity table: one number for every pair of training points, and the SVM learns from the table alone.");

  def("svm1",
    "What is the SMO (Sequential Minimal Optimization) algorithm?",
    "An SVM training method that optimises two Lagrange multipliers at a time analytically.",
    ["A pruning routine that removes support vectors whose multipliers fall below a threshold after training.",
     "A stochastic gradient method that updates the primal weight vector one example at a time.",
     "A grid-search strategy that tunes C and gamma simultaneously along a diagonal path.",
     "A decomposition of the kernel matrix into low-rank factors before the solver runs."],
    "SMO (sequential minimal optimization)",
    "Platt's algorithm behind libsvm/SVC: it repeatedly picks a pair of dual variables, solves that two-variable subproblem in closed form (the smallest set that respects the equality constraint), and iterates until the KKT conditions hold.",
    "SMO made kernel SVMs practical — no giant quadratic-programming solver, modest memory, and it exploits the sparsity of the solution since most multipliers end at zero (non-support-vectors).",
    "Instead of solving one enormous puzzle, it solves millions of tiny two-piece puzzles that each have an exact answer.");

  def("svm1",
    "How does nu-SVM (ν-SVC) differ from the standard C-parameterised SVM?",
    "Its ν parameter directly bounds the fraction of margin errors and support vectors, replacing C.",
    ["It removes the regularisation entirely, always fitting a hard margin regardless of the data.",
     "It replaces the kernel with a fixed radial basis so that only one hyperparameter remains.",
     "It optimises the number of support vectors directly by adding an L0 penalty to the dual.",
     "It fits one-class boundaries only and cannot be used for two-class problems."],
    "nu-SVM",
    "ν ∈ (0,1] is an upper bound on the fraction of training errors and a lower bound on the fraction of support vectors — a reparameterisation of the same optimisation with a more interpretable knob than C.",
    "Where C's useful range is unbounded and data-dependent, ν reads directly as 'at most this share of points may violate the margin', which makes it easier to set from tolerance requirements.",
    "Same machine, friendlier dial: ν says 'allow at most 10% margin violations' instead of an abstract penalty weight.");

  def("svm1",
    "Why is feature scaling essentially mandatory before training an SVM?",
    "Margins and kernel values are distance-based, so large-scale features silently dominate the geometry.",
    ["Because the optimiser can only handle feature values that lie strictly between zero and one.",
     "Because unscaled features make the kernel matrix asymmetric, which breaks the dual solver.",
     "Because the hinge loss is undefined for features with values greater than the C parameter.",
     "Because support vectors can only be identified among features with unit variance."],
    "Feature scaling for SVM",
    "Both the margin (Euclidean geometry) and common kernels (RBF uses squared distances) treat all axes equally. A feature ranging in the thousands drowns one ranging in single digits, warping the boundary and stalling convergence.",
    "Standardisation puts every feature on comparable footing so C and gamma behave predictably; skipping it is one of the most common causes of a mysteriously bad SVM.",
    "An SVM measures distances — if one feature shouts in thousands and another whispers in decimals, the shouter decides everything.");

  /* ===================== Random Forests (rf1) — 4 ===================== */

  def("rf1",
    "Why are the individual trees in a random forest typically grown deep, with little or no pruning?",
    "Deep trees are low-bias; the ensemble's averaging then removes their high variance.",
    ["Because pruning is impossible once bootstrap sampling has removed part of the training data.",
     "Because shallow trees cannot use the out-of-bag examples that forests rely on for scoring.",
     "Because deep trees train faster than pruned trees, keeping the whole forest cheap to build.",
     "Because the random feature subsets only take effect below a certain minimum depth."],
    "Fully-grown trees (low-bias base learners)",
    "The forest recipe wants base learners that are individually accurate but unstable: unpruned trees fit the data closely (low bias, high variance), and averaging hundreds of decorrelated ones cancels the variance while keeping the low bias.",
    "This is the mirror image of boosting, which uses shallow high-bias stumps and reduces bias sequentially. Pruning forest trees mostly just adds bias that averaging cannot remove.",
    "Let each tree overfit with gusto — the crowd's average irons out the individual wobbles.");

  def("rf1",
    "What is the Random Patches ensemble method?",
    "Each base estimator trains on a random subset of both the rows and the features.",
    ["Each tree receives the full dataset but a randomly perturbed copy of the target labels.",
     "Each estimator is trained on a different contiguous time window of the training data.",
     "Random noise patches are added to the feature values of every bootstrap sample.",
     "Trees are patched after training by replacing their weakest splits with random ones."],
    "Random Patches",
    "The general recipe that samples training examples and features simultaneously for each base learner — bagging samples rows, random subspaces sample columns, Random Patches does both (sklearn's BaggingClassifier with max_samples and max_features).",
    "Sampling in both directions increases diversity and cuts memory per learner, useful for very wide and very tall datasets; random forests are close cousins, re-sampling features at every split rather than per tree.",
    "Every tree gets a random crop of the spreadsheet: some rows, some columns, never the whole thing.");

  def("rf1",
    "What is the common rule of thumb for max_features in a random forest classifier?",
    "Consider roughly the square root of the total number of features at each split.",
    ["Use all features at every split, since randomness comes only from the bootstrap rows.",
     "Use exactly half the features for small forests and one quarter for large ones.",
     "Use log₂ of the number of training rows, recomputed as the tree grows deeper.",
     "Use one single random feature per split so that no two trees can ever agree."],
    "max_features ≈ √p rule",
    "Breiman's default for classification: at each split, evaluate a fresh random subset of about √p features (p/3 for regression). It balances tree strength against inter-tree correlation.",
    "Smaller subsets decorrelate the trees (better variance reduction) but weaken each split; larger subsets do the reverse. √p is a robust starting point, worth tuning when few features carry the signal.",
    "With 100 features, let each split choose among a random 10 — strong enough trees, different enough opinions.");

  def("rf1",
    "In bagging-style ensembles, what is 'pasting'?",
    "Building each base model on a random subset drawn without replacement.",
    ["Copying the best-performing tree several times so that its vote counts for more.",
     "Gluing two half-trained trees together to form one deeper combined model.",
     "Repainting the leaf values of each tree with the ensemble's average prediction.",
     "Adding the residuals of one tree onto the training targets of the next."],
    "Pasting (sampling without replacement)",
    "Pasting draws each learner's training subset without replacement (no duplicates), unlike the bootstrap's with-replacement draws. In sklearn: BaggingClassifier(bootstrap=False).",
    "With huge datasets, distinct random subsets are cheap and diverse enough, and pasting avoids duplicate rows; the bootstrap's advantage (and its free OOB estimate) matters more when data is limited.",
    "Deal each tree a hand of unique cards, rather than letting the same card appear twice.");

  /* ===================== Gradient Boosting (gb1) — 4 ===================== */

  def("gb1",
    "In gradient boosting for binary classification, what do the trees actually predict at each stage?",
    "Corrections to the running log-odds score, which a sigmoid later converts to probability.",
    ["Class labels directly, with each new tree overruling the labels of the previous one.",
     "Probabilities directly, which are multiplied together across the ensemble at the end.",
     "The exact rows the previous trees got wrong, encoded as a binary mask over the dataset.",
     "The optimal decision threshold for the ensemble built so far."],
    "Pseudo-residuals on the log-odds scale",
    "Classification boosting works additively on the logit: each tree fits the gradient of log loss (roughly, actual − predicted probability) and its output nudges the running log-odds; sigmoid(final score) gives the probability.",
    "This is why individual boosting trees are regression trees even in classification, and why staged outputs are raw scores ('margins') that need a sigmoid — the ensemble is a big additive model on the log-odds scale.",
    "The trees keep adjusting one running confidence score up or down; only at the very end is it turned into a probability.");

  def("gb1",
    "What does staged prediction (e.g. staged_predict in sklearn) let you do with a boosted model?",
    "Evaluate the ensemble's output after each boosting round without retraining anything.",
    ["Train several boosting models in parallel stages and merge their trees at the end.",
     "Freeze the early trees while retraining only the last few on fresh data.",
     "Predict in stages of increasing precision, stopping early for easy examples.",
     "Recover the training data by inverting the ensemble one tree at a time."],
    "Staged predictions",
    "Because boosting is additive, the model after m rounds is just the first m trees; staged_predict iterates these partial sums, yielding predictions at every ensemble size from one pass.",
    "It makes the n_estimators tuning curve nearly free: train once with many trees, plot validation error versus rounds, and read off the best stopping point — the same mechanism early stopping automates.",
    "One trained model contains every smaller model inside it — staged prediction reads them all out.");

  def("gb1",
    "What distinguishes leaf-wise from level-wise tree growth in boosting libraries?",
    "Leaf-wise always expands the single most loss-reducing leaf; level-wise grows the whole depth uniformly.",
    ["Leaf-wise trees store predictions in the leaves while level-wise trees store them in internal nodes.",
     "Leaf-wise growth adds leaves after training is complete, while level-wise fixes them beforehand.",
     "Leaf-wise trees are grown from the bottom up, starting from the leaves and merging toward a root.",
     "Level-wise growth is only defined for regression while leaf-wise applies only to classification."],
    "Leaf-wise vs level-wise growth",
    "Level-wise (XGBoost's classic mode) expands every node at the current depth, giving balanced trees. Leaf-wise (LightGBM's default) repeatedly splits whichever leaf cuts loss most, giving deep, lopsided trees of the same leaf budget.",
    "Leaf-wise reaches lower loss per leaf but overfits more readily, which is why LightGBM's key capacity knob is num_leaves (with max_depth as a safety rail) rather than depth alone.",
    "Level-wise builds the tree floor by floor; leaf-wise keeps extending whichever branch pays best.");

  def("gb1",
    "What role does the initial prediction (base score) play in gradient boosting?",
    "It is the constant starting point — like the mean or base-rate log-odds — that the trees then correct.",
    ["It sets the maximum score the ensemble may output, clipping any tree that would exceed it.",
     "It is a random number that seeds the tree-splitting randomness for reproducibility.",
     "It is the weight given to the single best feature before any trees are built.",
     "It is the fraction of training rows shown to the first tree only."],
    "Base score (initial prediction)",
    "Boosting starts from a constant model — the target mean for squared error, the log-odds of the base rate for classification — and every tree thereafter fits corrections to it.",
    "A sensible base score means tree one starts from 'predict the average' rather than zero, which matters for imbalanced data and short ensembles; XGBoost exposes it as base_score.",
    "Round zero is just 'guess the average'; every tree after that is a correction to the guess.");

})();
