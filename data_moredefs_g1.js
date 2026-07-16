/* More definitions: k-Nearest Neighbours, Logistic Regression, Naive Bayes. Standard glossary
   terms, each DEFS-tagged with a reveal so it flows into the Definitions filter, flashcards and
   read+recall. Loads before app.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  function def(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1;
  }

  /* ===================== k-Nearest Neighbours (qk: "easy") ===================== */

  def("easy",
    "What is the Minkowski distance?",
    "A parameterised distance whose parameter p yields Manhattan at p=1 and Euclidean at p=2.",
    ["A distance that always measures the straight-line gap between two points regardless of any tunable parameter or exponent.",
     "A similarity score bounded between zero and one that grows as two feature vectors point in more nearly the same direction.",
     "The number of coordinates at which two equal-length vectors happen to differ.",
     "The count of features that must be rescaled before any neighbour search."],
    "Minkowski distance",
    "A general distance metric with an order parameter p: p=1 is Manhattan, p=2 is Euclidean, and p→∞ approaches Chebyshev.",
    "Minkowski distance generalises the common metrics through its order p, so one formula spans city-block (p=1) and straight-line (p=2) geometry. Choosing p is therefore itself a hyperparameter of KNN.",
    "One distance formula with a dial: turn it to 1 and it is city-block, turn it to 2 and it is straight-line.");

  def("easy",
    "What is the Chebyshev distance between two points?",
    "The largest absolute difference across any single coordinate (the L-infinity metric).",
    ["The sum of the absolute differences taken across every coordinate, so that each dimension contributes its full gap.",
     "The straight-line separation found by squaring the coordinate differences, summing them and taking the square root.",
     "The average difference computed across all of the coordinates.",
     "The count of coordinates whose values disagree between the points."],
    "Chebyshev distance",
    "The L∞ distance: the maximum absolute coordinate difference. It is the Minkowski distance as p→∞.",
    "Chebyshev distance reports only the single largest per-axis gap and ignores the rest, the limit of Minkowski distance as p grows without bound. It suits problems where movement can occur along any axis at equal cost, like a king on a chessboard.",
    "Just look at the axis where the two points differ most, and use that gap as the distance.");

  def("easy",
    "What does the Jaccard distance measure between two sets?",
    "One minus the ratio of their intersection size to their union size.",
    ["The proportion of elements appearing in exactly one of the two sets relative to the total number of distinct elements present.",
     "The cosine of the angle between the two sets after each has been turned into a binary indicator vector over the shared vocabulary.",
     "The number of elements that the two sets happen to share.",
     "The size of whichever of the two sets is the larger one."],
    "Jaccard distance",
    "1 − (|A∩B| / |A∪B|): a dissimilarity for sets or binary vectors based on shared vs total members.",
    "Jaccard similarity is the fraction of the combined membership that both sets share, and the distance is one minus that. It is a natural metric for binary or set-valued features where only presence matters, not magnitude.",
    "How much do two sets overlap? Jaccard distance is high when they share little of their combined items.");

  def("easy",
    "What is brute-force search in KNN?",
    "Computing the distance to every stored training point, then taking the k smallest.",
    ["Organising the training points into a hierarchical spatial tree so that whole regions can be skipped during a query.",
     "Approximating the neighbour set by hashing points into buckets and only scanning candidates that land in the same bucket.",
     "Storing only a few chosen prototype points per class.",
     "Precomputing every pairwise distance once at training time."],
    "Brute-force nearest-neighbour search",
    "The exact O(n·d) strategy of scoring the query against all n training points to find the k closest.",
    "Brute force guarantees the true nearest neighbours by measuring distance to every point, at O(n·d) per query. It is preferred in high dimensions where tree indexes lose their pruning advantage, and is scikit-learn's fallback via algorithm='brute'.",
    "Just measure the distance to everyone and pick the closest few — simple but slow when there are many points.");

  def("easy",
    "What is the Local Outlier Factor (LOF)?",
    "A score comparing a point's local density to that of its neighbours to flag outliers.",
    ["A method that labels a point as noise whenever it has fewer than a fixed minimum number of neighbours within a chosen radius.",
     "A technique that projects the data onto its top principal components and measures the reconstruction error to detect anomalies.",
     "The distance from a point to its single closest neighbour.",
     "The fraction of a point's neighbours belonging to the minority class."],
    "Local Outlier Factor (LOF)",
    "A neighbour-based anomaly score: points in regions far sparser than their neighbours' regions score as outliers.",
    "LOF estimates each point's local density from its k neighbours and compares it to those neighbours' densities; a point much less dense than its surroundings gets a high score. Because it is relative to local density, it detects outliers even when global density varies across the data.",
    "It flags a point as odd if it sits in a much emptier area than the points around it do.");

  def("easy",
    "What is a k-nearest-neighbour graph?",
    "A graph linking each point to its k closest points by an edge.",
    ["A hierarchical tree that recursively partitions the feature space along axis-aligned planes to speed up neighbour queries.",
     "A diagram plotting cross-validated accuracy against the value of k so that the best neighbourhood size can be chosen.",
     "A table listing every pairwise distance in the dataset.",
     "A boundary that separates the regions assigned to each class."],
    "Nearest-neighbour graph",
    "A graph whose vertices are data points, each joined to its k nearest neighbours; underlies manifold and spectral methods.",
    "A k-NN graph encodes local proximity by joining each point to its k closest points, giving a sparse representation of the data manifold. Methods like spectral clustering, UMAP and Isomap build on such graphs rather than on raw distances.",
    "Draw a dot for every point and connect it to its few nearest dots — that network is the nearest-neighbour graph.");

  def("easy",
    "What is the haversine distance?",
    "The great-circle distance between two latitude–longitude points on a sphere.",
    ["The straight-line Euclidean gap computed after converting latitude and longitude directly into flat Cartesian coordinates.",
     "The sum of the north–south and east–west separations measured independently along each geographic axis in turn.",
     "The angle measured between two direction vectors.",
     "The maximum of the latitude gap and the longitude gap."],
    "Haversine (great-circle) distance",
    "Distance along the surface of a sphere between two lat/long points; the right metric for geographic KNN.",
    "The haversine formula returns the great-circle (shortest surface) distance between two points given their latitude and longitude, correctly accounting for the Earth's curvature. Using it in KNN avoids the errors that treating lat/long as flat Euclidean coordinates would introduce.",
    "It measures how far apart two places are across the curved surface of the globe, not straight through it.");

  def("easy",
    "What is dynamic time warping (DTW) used as a distance?",
    "A distance that aligns two sequences by stretching them in time before comparing.",
    ["A distance that compares two equal-length sequences position by position without allowing any shift or realignment between them.",
     "A transformation that resamples every sequence to a fixed length and then takes the ordinary Euclidean distance of the results.",
     "The count of positions at which two sequences differ.",
     "The correlation coefficient between two time series."],
    "Dynamic time warping (DTW)",
    "A sequence distance that finds the best non-linear time alignment between two series before scoring their difference.",
    "DTW warps the time axis of two sequences to match similar shapes that are offset or run at different speeds, then measures the residual difference along the optimal alignment. It lets KNN classify time series that Euclidean distance would call dissimilar merely because of timing shifts.",
    "It lines up two time series that are the same shape but out of sync, then measures how different they still are.");

  /* ===================== Logistic Regression (qk: "logreg1") ===================== */

  def("logreg1",
    "What is iteratively reweighted least squares (IRLS) in logistic regression?",
    "An optimiser that fits the model by repeatedly solving reweighted least-squares problems.",
    ["A closed-form matrix inversion that returns the exact maximum-likelihood coefficients in one algebraic step with no iteration.",
     "A stochastic procedure that updates a single coefficient at a time using a small randomly drawn subset of the rows each round.",
     "A grid search over candidate coefficient values.",
     "A method that adds random noise to the labels before fitting."],
    "IRLS (iteratively reweighted least squares)",
    "A Newton-based optimiser that fits logistic regression by solving a sequence of weighted least-squares updates.",
    "IRLS is the Newton–Raphson update for logistic regression written as a weighted least-squares problem that is re-solved with updated weights each iteration until convergence. It is the classical solver behind statistics packages for this convex objective.",
    "It fits the model by repeatedly doing a weighted line-fit, tweaking the weights each round until it settles.");

  def("logreg1",
    "What is the deviance of a logistic regression model?",
    "Twice the negative log-likelihood, used as a goodness-of-fit measure.",
    ["The proportion of the total variation in the binary outcome that the fitted probabilities manage to account for overall.",
     "The average absolute difference between each predicted probability and its observed zero-or-one label across the sample.",
     "The number of misclassified examples in the training set.",
     "The largest coefficient found in the fitted model."],
    "Deviance",
    "−2 × log-likelihood of the fitted model; lower is better and differences follow a chi-square distribution.",
    "Deviance generalises the residual sum of squares to likelihood-based models, defined as minus twice the maximised log-likelihood. Differences in deviance between nested models are the basis of the likelihood-ratio test for whether added terms help.",
    "A badness-of-fit number built from the likelihood — smaller means the model explains the data better.");

  def("logreg1",
    "What does the Wald test assess for a logistic regression coefficient?",
    "Whether a single coefficient differs significantly from zero.",
    ["Whether adding a whole block of predictors improves the model, judged by the change in maximised log-likelihood between two nested fits.",
     "Whether the fitted probabilities are well calibrated by grouping cases into deciles and comparing observed to expected counts.",
     "How many iterations the solver needed in order to converge.",
     "The overall classification accuracy of the model."],
    "Coefficient significance (Wald test)",
    "A test using a coefficient divided by its standard error (a z-statistic) to judge if it differs from zero.",
    "The Wald statistic is the estimated coefficient divided by its standard error; its square is compared to a chi-square distribution to test the null that the true coefficient is zero. It gives the p-values reported beside each coefficient in statistical output.",
    "It checks whether one feature's effect is real or just noise, by seeing how big the coefficient is relative to its uncertainty.");

  def("logreg1",
    "What is McFadden's pseudo-R-squared?",
    "One minus the ratio of the fitted model's log-likelihood to the null model's.",
    ["The share of correctly classified cases once probabilities are thresholded at one half, expressed as a percentage of the sample.",
     "The squared correlation between the predicted probabilities and the observed binary labels taken across the whole training set.",
     "The area under the ROC curve of the fitted model.",
     "The average log-loss measured on held-out data."],
    "McFadden's pseudo-R²",
    "1 − (logL_model / logL_null): a likelihood-based analogue of R² for logistic regression, not a variance-explained figure.",
    "Because logistic regression has no residual variance to partition, McFadden's measure compares the fitted log-likelihood to that of an intercept-only model. Values run lower than ordinary R², with 0.2–0.4 already indicating a good fit.",
    "A stand-in for R² in classification: it shows how much better the model's likelihood is than a no-feature baseline.");

  def("logreg1",
    "What is the average marginal effect of a feature in logistic regression?",
    "The average change in predicted probability per unit change in the feature.",
    ["The multiplicative factor by which the odds of the positive class are scaled when the feature increases by exactly one unit.",
     "The raw coefficient the model assigns to the feature on the log-odds scale before any transformation back to probabilities.",
     "The correlation of the feature with the label.",
     "The variance of the feature across the sample."],
    "Average marginal effect",
    "The mean over the sample of how much a one-unit change in a feature shifts the predicted probability.",
    "Because the sigmoid is nonlinear, a coefficient's effect on probability depends on where each case sits; the average marginal effect averages that per-case probability slope across the data. It restates a log-odds coefficient in the more interpretable units of probability.",
    "On average, how many percentage points does the predicted chance move when this feature goes up by one?");

  def("logreg1",
    "What is probit regression?",
    "A binary model using the normal CDF instead of the sigmoid link.",
    ["A binary model that replaces maximum-likelihood fitting with a plain least-squares fit of the zero-or-one labels directly.",
     "A model that predicts one of several unordered categories by fitting a separate logistic curve for each class in turn.",
     "A regression whose outputs are continuous values.",
     "A logistic model carrying an L1 penalty."],
    "Probit regression",
    "A binary-outcome model that uses the standard-normal CDF as its link function in place of logistic regression's sigmoid.",
    "Probit and logistic regression both map a linear predictor to a probability, but probit uses the Gaussian cumulative distribution while logit uses the sigmoid. Their fits are nearly identical in practice; logit is preferred for interpretable odds ratios, probit in some econometric traditions.",
    "Almost the same as logistic regression, but it uses the bell-curve's S-shape instead of the logistic S-shape.");

  def("logreg1",
    "What is the reference category when a categorical feature is dummy-coded?",
    "The omitted level against which the other levels' coefficients are compared.",
    ["The level of the categorical feature that appears most frequently in the training data and is therefore given the largest weight.",
     "An extra intercept term added for every distinct level so that each category receives its own independent baseline probability.",
     "The category that ends up with the highest predicted probability.",
     "The average taken over all of the category levels."],
    "Reference (baseline) category",
    "In dummy coding, the dropped level whose effect is folded into the intercept; other levels' coefficients are contrasts to it.",
    "When a k-level categorical is one-hot encoded with one column dropped, the omitted level becomes the baseline absorbed by the intercept, and each remaining coefficient measures the log-odds change relative to it. Which level is dropped changes interpretation but not predictions.",
    "One category is left out as the default; the others' numbers just say how they differ from that default.");

  def("logreg1",
    "What is sigmoid saturation in logistic regression?",
    "The regime where large scores push the sigmoid flat near 0 or 1, with tiny gradients.",
    ["The point at which adding more training data stops changing the fitted coefficients because the likelihood surface has flattened out entirely.",
     "A failure mode in which the classes can be perfectly separated, so the fitted coefficients grow without bound during optimisation.",
     "The threshold used to convert probabilities into hard labels.",
     "The bias term that is added to every prediction."],
    "Sigmoid saturation",
    "When the linear score is very large in magnitude, the sigmoid flattens toward 0 or 1 and its gradient nearly vanishes.",
    "In the saturated tails of the sigmoid, big changes in the input score barely change the output probability, so the gradient becomes tiny and learning stalls for those examples. This is why input scaling and regularisation, which keep scores moderate, help optimisation.",
    "Push the score too far and the S-curve goes flat at 0 or 1, so the model barely learns from those points.");

  def("logreg1",
    "What role does feature scaling play in fitting logistic regression?",
    "It puts features on comparable scales so gradient-based solvers converge faster.",
    ["It is mathematically required for correctness, because logistic regression cannot produce valid probabilities from features on differing numeric scales.",
     "It changes which class the model predicts by automatically shifting the decision threshold toward the more variable features.",
     "It removes any need for a regularisation penalty.",
     "It guarantees that the classes become linearly separable."],
    "Feature scaling for convergence",
    "Standardising inputs conditions the optimisation so gradient solvers converge faster and regularisation penalises features fairly.",
    "Logistic regression's predictions are unaffected by rescaling in principle, but wildly different feature scales stretch the loss surface and slow iterative solvers. Scaling also makes an L1/L2 penalty act comparably on every coefficient, since the penalty is scale-sensitive.",
    "Putting features on the same scale helps the solver reach the answer faster and makes the penalty treat features evenly.");

  def("logreg1",
    "What does a likelihood-ratio test compare in logistic regression?",
    "Two nested models, via the difference in their maximised log-likelihoods.",
    ["A single coefficient against zero using the estimate divided by its standard error and a normal reference distribution.",
     "The observed and predicted counts within probability deciles in order to judge how well calibrated the fitted model is.",
     "Two features' correlation with each other.",
     "The training and test accuracy of one model."],
    "Likelihood-ratio test",
    "Compares nested models by twice the log-likelihood difference, referred to a chi-square distribution to test added terms.",
    "The likelihood-ratio test fits a smaller and a larger (nested) model and checks whether the extra terms raise the log-likelihood more than chance, using the deviance difference as a chi-square statistic. It is generally preferred to the Wald test for assessing groups of coefficients.",
    "It asks whether a bigger model fits significantly better than a smaller one nested inside it.");

  /* ===================== Naive Bayes (qk: "bayes1") ===================== */

  def("bayes1",
    "What is CategoricalNB?",
    "A Naive Bayes variant for discrete, unordered categorical features.",
    ["A Naive Bayes variant that models each feature with its own bell curve estimated from the per-class mean and variance.",
     "A Naive Bayes variant for word counts that estimates a multinomial distribution over the whole vocabulary for each class.",
     "A variant that accepts only binary present-or-absent features.",
     "A variant that requires all features to be scaled first."],
    "CategoricalNB",
    "The Naive Bayes variant for categorical features, learning a separate per-class probability for each category of each feature.",
    "CategoricalNB estimates, for each feature, a categorical distribution over its levels within each class, with smoothing for unseen categories. It fits genuinely categorical inputs directly, unlike GaussianNB (continuous) or MultinomialNB (counts).",
    "Naive Bayes for plain category columns — it learns how likely each category is within each class.");

  def("bayes1",
    "What is Lidstone smoothing?",
    "Additive smoothing with a pseudocount alpha that can be less than one.",
    ["A rule that discards any feature value never seen in training so that it cannot contribute a zero to the product of probabilities.",
     "A technique that replaces every raw count with its logarithm before the class probabilities are multiplied together.",
     "Adding exactly one to every observed count.",
     "Removing the prior from the calculation entirely."],
    "Lidstone smoothing",
    "Additive smoothing with pseudocount α (0<α<1 typical); Laplace smoothing is the special case α=1.",
    "Lidstone smoothing adds a fractional pseudocount α to every count before forming probabilities, preventing zeros while distorting the estimates less than adding a full count. Laplace/add-one smoothing is Lidstone with α=1; sklearn exposes α as the 'alpha' hyperparameter.",
    "Like add-one smoothing but you can add a smaller fraction, nudging counts away from zero more gently.");

  def("bayes1",
    "What do the fit_prior and class_prior settings control in scikit-learn Naive Bayes?",
    "Whether class priors are learned from the data or supplied by the user.",
    ["Whether the smoothing pseudocount is applied before or after the feature likelihoods are combined for each candidate class.",
     "Whether the model stores its probabilities in log space to prevent the numerical underflow that repeated multiplication can cause.",
     "Which distance metric the classifier uses.",
     "How many folds cross-validation should use."],
    "Setting priors (fit_prior / class_prior)",
    "fit_prior toggles learning priors from class frequencies; class_prior lets you hard-set them (e.g. to match deployment).",
    "By default Naive Bayes estimates each class prior from its training frequency (fit_prior=True); setting fit_prior=False makes the priors uniform, and class_prior supplies explicit values. Overriding priors adapts a model whose training class mix differs from deployment.",
    "These let you decide whether the model guesses class base-rates from the data or you tell it what they are.");

  def("bayes1",
    "What does a Naive Bayes model's feature_log_prob_ attribute hold?",
    "The learned log-likelihood of each feature given each class.",
    ["The final log-posterior score assigned to every training example after the priors and all feature likelihoods are combined.",
     "The gradient of the log-likelihood with respect to each feature weight, accumulated over the entire training pass.",
     "The prior probability of each class.",
     "The confusion matrix computed on the training set."],
    "Feature log-probabilities (feature_log_prob_)",
    "The fitted per-class log P(feature | class) table that MultinomialNB/BernoulliNB add up (with the log prior) at predict time.",
    "Naive Bayes stores its learned likelihoods as logs in feature_log_prob_ so prediction is a sum rather than a product, avoiding underflow. Ranking a class amounts to adding the relevant feature log-probabilities to the class log-prior.",
    "It is the model's memorised table of how likely each feature is in each class, stored as logs for safe adding.");

  def("bayes1",
    "What is Tree-Augmented Naive Bayes (TAN)?",
    "A relaxation of Naive Bayes that lets each feature depend on one other feature.",
    ["A version of Naive Bayes in which every feature is assumed completely independent of all the others once the class is known.",
     "An ensemble that trains a separate Naive Bayes model on each bootstrap sample and averages their posterior probabilities together.",
     "A decision tree whose leaves each store a class prior.",
     "A Naive Bayes fitted only on the top-ranked features."],
    "Tree-augmented Naive Bayes (TAN)",
    "A semi-naive model that adds a tree of dependencies among features, so each feature may condition on one parent besides the class.",
    "TAN weakens the strict conditional-independence assumption by allowing a tree-structured set of dependencies among features, capturing the strongest pairwise correlations the naive model ignores. It often improves accuracy while remaining far cheaper than a full Bayesian network.",
    "A smarter Naive Bayes that lets each feature lean on one other feature instead of pretending they are all unrelated.");

  def("bayes1",
    "What are the posterior odds in a two-class Bayes calculation?",
    "The ratio of the two classes' posterior probabilities.",
    ["The ratio of the probabilities of the observed evidence under each of the two classes before any prior is taken into account.",
     "The ratio of the two classes' base rates in the population, estimated purely from their frequencies in the training data.",
     "The product of all of the feature likelihoods.",
     "The larger of the two class probabilities."],
    "Posterior odds",
    "P(class A | x) / P(class B | x). By Bayes, posterior odds = prior odds × likelihood ratio.",
    "Posterior odds combine what we believed beforehand with the evidence: they equal the prior odds multiplied by the likelihood ratio. Working in odds sidesteps the normalising evidence term, since it cancels from the ratio.",
    "How much more likely one class is than the other after seeing the data — the two posterior probabilities divided.");

  def("bayes1",
    "What is a conjugate prior?",
    "A prior that yields a posterior in the same distribution family.",
    ["A prior chosen to express no preference at all, assigning equal probability to every possible value of the parameter being estimated.",
     "A prior obtained by estimating its parameters from the very same data that will later be used to compute the posterior.",
     "A prior placing all of its mass at a single point.",
     "The prior belonging to the majority class."],
    "Conjugate prior",
    "A prior whose form is preserved by the likelihood, so the posterior stays in the same family (e.g. Beta–Binomial).",
    "When a prior is conjugate to the likelihood, Bayesian updating just moves the distribution's parameters, giving a closed-form posterior without integration. Classic pairs include Beta with Bernoulli/Binomial and Dirichlet with the categorical/multinomial.",
    "A prior that mixes so neatly with the data that the updated belief keeps the same shape, just with new numbers.");

  def("bayes1",
    "How does a Dirichlet prior relate to smoothing in Naive Bayes?",
    "Its parameters act as pseudocounts, which is exactly additive smoothing.",
    ["It replaces the multinomial likelihood with a normal one so that continuous features can be handled without discretising them first.",
     "It rescales every predicted probability so that the outputs across all classes are guaranteed to sum to one after prediction.",
     "It removes low-frequency words from the vocabulary.",
     "It forces all of the class priors to be equal."],
    "Dirichlet prior (smoothing as pseudocounts)",
    "A Dirichlet prior on a multinomial's probabilities contributes pseudocounts; its α is the additive/Laplace smoothing constant.",
    "The Dirichlet is the conjugate prior for multinomial probabilities, and its concentration parameters enter the posterior exactly as extra counts. This gives the Bayesian justification for Laplace/Lidstone smoothing: the added α is a prior pseudocount, not an ad-hoc fudge.",
    "The smoothing you add to counts is really a prior in disguise — the Dirichlet's numbers are those extra pretend counts.");

  def("bayes1",
    "What is empirical Bayes?",
    "Estimating the prior from the data before computing posteriors.",
    ["Discarding the prior entirely and choosing the class whose likelihood of the observed evidence alone is the greatest of all.",
     "Averaging the posterior predictions of many models, each one fitted with a different randomly chosen prior distribution.",
     "Using a prior that is fixed before any data is seen.",
     "Setting every prior to one over the number of classes."],
    "Empirical Bayes",
    "An approach that estimates the prior's parameters from the observed data, then proceeds with ordinary Bayesian updating.",
    "Empirical Bayes uses the data itself to set the prior (for instance via the marginal likelihood), blending frequentist estimation with Bayesian inference. It is a pragmatic compromise when a principled prior is unavailable, and underlies shrinkage estimators.",
    "Instead of guessing the prior up front, you peek at the data to set it, then do the usual Bayes maths.");

  def("bayes1",
    "What is a Bayesian network?",
    "A directed graph encoding conditional dependencies among variables.",
    ["A neural network whose weights are treated as full probability distributions rather than as single fixed numbers during training.",
     "A classifier that assumes every feature is conditionally independent of all the others once the class label is known.",
     "A graph connecting each point to its nearest neighbours.",
     "A tree that splits the data on its features."],
    "Bayesian network",
    "A directed acyclic graph whose edges encode conditional dependencies; Naive Bayes is its simplest star-shaped special case.",
    "A Bayesian network factorises a joint distribution using a DAG in which each variable is conditionally independent of its non-descendants given its parents. Naive Bayes is the special case where the class is the single parent of every feature and features have no other links.",
    "A diagram of how variables depend on each other; Naive Bayes is the simplest one, with the class pointing at every feature.");
})();
