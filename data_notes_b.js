/* Study notes — Bayes, Trees, SVM. Read-through revision, tiny chunks, in order. */
(function () {
  window.NOTES = window.NOTES || {};

  window.NOTES["bayes"] = {
    key: "bayes", name: "Naive Bayes",
    intro: "A fast probabilistic classifier that combines a prior belief with the evidence from each feature to decide which class best explains a case.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "A classifier that scores each class by how well it explains the observed clues, then picks the class with the highest updated belief." },
        { t: "Conditional probability", d: "P(A | B) is the chance of A within the cases where B is true. Every likelihood and posterior in the method is a conditional of this form." },
        { t: "Why Bayes' theorem", d: "Training gives P(words | spam), but you want P(spam | words). Bayes' theorem flips one conditional into the other using the prior.", f: "P(A|B) = P(B|A) × P(A) ÷ P(B)" },
        { t: "Generative model", d: "It learns what each class looks like, its word patterns, then asks which class better explains a new case rather than drawing a boundary." }
      ] },
      { h: "The moving parts", items: [
        { t: "Base rate (prior)", d: "How common each class is before any evidence. Four spam in ten sets the prior odds at 4:6." },
        { t: "Evidence", d: "An observed clue: a word, a symptom, a reading. Each clue adds one multiplier to the running odds; more clues means more multipliers." },
        { t: "Likelihood", d: "P(clue | class): among spam how often 'FREE' appears, and separately how often among legit mail. A within-group frequency, one class at a time." },
        { t: "Likelihood ratio", d: "The two class likelihoods divided: the clue's multiplier. 'FREE' being 4× commoner in spam multiplies the odds by 4." },
        { t: "Posterior", d: "The updated belief after evidence: prior odds times every clue's multiplier. Bayes' rule is exactly this bookkeeping.", f: "posterior odds = prior × ∏ ratios" }
      ] },
      { h: "How it classifies", items: [
        { t: "Stacking the clues", d: "Start from the prior odds, then multiply by each present word's likelihood ratio. The class with the higher final score wins." },
        { t: "The naive assumption", d: "Treat every clue as independent, so their multipliers can simply be multiplied together. Wrong in detail, but useful in practice." },
        { t: "Why it still works", d: "Even when the independence assumption is false, the true class often still wins the comparison, so the chosen label is right anyway." },
        { t: "Evidential power", d: "A word's clout comes from how lopsided its ratio is. 'viagra' may multiply odds ×40 while 'the' multiplies ×1 and decides nothing." }
      ] },
      { h: "Smoothing and numerical care", items: [
        { t: "The zero veto", d: "A word never seen in training spam gives likelihood zero, which multiplies the whole product to zero and vetoes the class outright." },
        { t: "Laplace smoothing (alpha)", d: "Add tiny fake counts so no unseen word can zero the product. Sweeping alpha too high blurs real signal, so accuracy peaks then falls." },
        { t: "Underflow", d: "Multiplying hundreds of tiny probabilities underflows to zero. The fix: add logs of the probabilities instead of multiplying them.", f: "Σ log p  instead of  ∏ p" }
      ] },
      { h: "Flavours and features", items: [
        { t: "MultinomialNB", d: "For counts, like how many times each word appears. The usual default for text bag-of-words features." },
        { t: "BernoulliNB", d: "For yes/no presence flags. It also scores the words that are absent, which can help on very short texts like tweets." },
        { t: "GaussianNB", d: "For continuous features. It learns a mean and variance per class and scores a value by its position on each class's bell curve." },
        { t: "Mixed feature types", d: "No single variant fits counts, flags and continuous values at once. Fit the right NB per feature block, then combine their log-odds." }
      ] },
      { h: "GaussianNB, step by step", items: [
        { t: "When to use GaussianNB", d: "The Naive Bayes flavour for CONTINUOUS features — heights, temperatures, sensor readings, lab values. It assumes each feature is roughly bell-shaped (normal) within each class." },
        { t: "What it learns", d: "For every feature, within every class, it stores just two numbers: the mean and the variance of that feature among that class's training rows.", f: "params per class = (μ, σ²) for each feature" },
        { t: "Why only two numbers", d: "A normal distribution is fully described by its mean and variance, so those two numbers ARE the fitted model for that feature. That's why GaussianNB trains almost instantly and needs very little data." },
        { t: "The likelihood: bell-curve height", d: "To score a feature value x for a class, read the height of that class's bell curve at x. Close to the class mean → tall curve → high likelihood; far out in the tail → low.", f: "P(x | class) = bell(x; μ, σ²)" },
        { t: "Combining features", d: "The 'naive' step: multiply each feature's bell-curve likelihood together (they're assumed independent), giving one likelihood for the whole row per class." },
        { t: "Adding the prior, then argmax", d: "Multiply by the class prior (how common the class is), do it for every class, and predict the class with the highest result. In practice it's summed in log-space to avoid underflow.", f: "class = argmax  log P(class) + Σ log P(xᵢ | class)" },
        { t: "Worked example: body temperature", d: "Healthy temps average 98.2°F, flu temps 100.3°F. A reading of 99.5°F sits higher on the flu bell than the healthy bell, so — priors aside — GaussianNB leans 'flu'. Move the reading and the taller curve flips." },
        { t: "Linear or curved boundary", d: "Equal variances across classes → a straight (linear) boundary, same as LDA. Unequal variances → a curved (quadratic) boundary, so GaussianNB can wrap a tight class inside a diffuse one — for free, from two numbers per bell." },
        { t: "var_smoothing", d: "A feature with near-zero variance in a class makes its bell razor-thin and the model brittle. sklearn adds a small floor to every variance (var_smoothing) to keep the curves stable." },
        { t: "Scaling not required", d: "Unlike distance-based models, GaussianNB fits each feature its own curve, so features on different scales don't need standardising — each is judged against its own class mean and spread." }
      ] },
      { h: "BernoulliNB, step by step", items: [
        { t: "When to use BernoulliNB", d: "The flavour for BINARY features — each feature is a yes/no flag: is this word present? is this box ticked? It models presence and absence, not how many times something occurred." },
        { t: "Binarising the input", d: "It treats every feature as 0/1. If you hand it counts, it quietly thresholds them to 'present' (>0) or 'absent' — the count magnitude is thrown away.", f: "feature → 1 if present, else 0" },
        { t: "What it learns", d: "For each feature, within each class, the probability that the feature is PRESENT in that class's rows — e.g. P('free' appears | spam) = 0.8.", f: "P(featureₖ = 1 | class) per feature, per class" },
        { t: "The absence term (the key trick)", d: "Its defining move: it also scores the features that are ABSENT. A word that's usually in spam but is MISSING here counts as evidence against spam. Multinomial ignores absent words; Bernoulli explicitly uses them.", f: "present → P(1|c) · absent → (1 − P(1|c))" },
        { t: "Scoring a case", d: "For each class, multiply P(present|class) for every feature that's a 1 and (1 − P(present|class)) for every feature that's a 0, times the prior; take the biggest (again summed in log-space)." },
        { t: "Bernoulli vs Multinomial", d: "Multinomial uses word COUNTS and ignores absences; Bernoulli uses presence/ABSENCE and ignores counts. On short texts (tweets, titles) where a word appears 0 or 1 times anyway, Bernoulli's absence signal often wins." },
        { t: "Smoothing", d: "Like all NB flavours it adds Laplace smoothing (alpha) so a feature never seen present (or never absent) in a class doesn't force a probability of exactly 0 and veto the class." },
        { t: "When to reach for it", d: "Short documents, presence/absence features, or any yes/no flag matrix. If how OFTEN a token appears matters, prefer MultinomialNB instead." }
      ] },
      { h: "Strengths", items: [
        { t: "Tiny-data friendly", d: "It estimates simple per-feature counts, so it learns useful patterns from very few labelled examples where richer models overfit." },
        { t: "Scales to many features", d: "Thousands of word-features are no problem; it just adds more multipliers. Fast to train and to predict." },
        { t: "Online learning", d: "It can update its counts from a stream one batch at a time via partial_fit, with no full retrain needed." }
      ] },
      { h: "Weaknesses and when to use", items: [
        { t: "Poor probabilities", d: "It ranks cases well but its stated probabilities are overconfident, clustering near 0 and 1. Trust the ranking, calibrate before trusting the number." },
        { t: "Correlated features", d: "Near-duplicate features (sale, discount, bargain) each add a multiplier, so shared evidence is double-counted and the belief is overstated." },
        { t: "Shifted base rate", d: "If production spam is 1% but training was 50/50, just swap in the correct prior; the likelihoods stay valid, a cheap fix." },
        { t: "When to reach for it", d: "A strong, fast baseline for text and high-dimensional problems, especially with little data or a need for instant online updates." }
      ] }
    ]
  };

  window.NOTES["trees"] = {
    key: "trees", name: "Decision Trees",
    intro: "A model that asks a sequence of yes/no questions about the features to funnel each case into a leaf that decides its prediction.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "A flowchart of yes/no questions. A case answers each in turn and flows left or right until it reaches a leaf that gives the prediction." },
        { t: "Node / split", d: "One yes/no question about a single feature, such as 'is area < 1,250?'. Cases flow one way or the other by their answer." },
        { t: "Root", d: "The first and most informative question at the top of the tree, seen by every case." },
        { t: "Leaf", d: "An end point with no further question. The training cases that landed there decide the output: their majority label, or their average." },
        { t: "What the model is", d: "Just the tree of questions and thresholds. There are no weights to learn; prediction is walking the branches to a leaf." }
      ] },
      { h: "How it learns", items: [
        { t: "Greedy growing", d: "At each node it tries candidate splits and keeps the one that most reduces impurity, then repeats on each child group." },
        { t: "Impurity", d: "How mixed a group's labels are. All-same is pure (0); a 50/50 muddle is maximally impure." },
        { t: "Gini and entropy", d: "Two near-identical impurity formulas. Splits are chosen to reduce impurity most; gini is the cheaper default and behaves almost the same.", f: "Gini = 1 − Σ pᵢ²" },
        { t: "Choosing the cutoff", d: "A cutoff is better when it carves the data into purer child groups. The best split gives the largest drop in impurity." },
        { t: "Classification vs regression", d: "A classification leaf predicts the majority class; a regression leaf predicts the average of its cases. Only the leaf output differs." }
      ] },
      { h: "Overfitting and pruning", items: [
        { t: "Unlimited depth", d: "Grown with no limit, a tree splits until every leaf is pure, memorising noise and scoring near-perfectly on training data alone." },
        { t: "The depth sweep", d: "As depth rises, training accuracy keeps climbing but validation accuracy rises then falls. The peak marks the right complexity." },
        { t: "Pre-pruning", d: "Stop early with limits like max_depth or min_samples_leaf. min_samples_leaf forbids tiny leaves built from just a handful of noisy rows." },
        { t: "Cost-complexity pruning", d: "Grow the tree fully, then cut back with ccp_alpha. A higher alpha removes more weak branches, leaving a smaller, steadier tree.", f: "penalty = error + α × leaves" },
        { t: "Choosing ccp_alpha", d: "Get candidate alphas from cost_complexity_pruning_path, then pick the one with the best cross-validated score." }
      ] },
      { h: "Knobs and reading the tree", items: [
        { t: "Feature importance", d: "How much total impurity-reduction each feature earned across the tree. A hint, not a verdict: it shifts between retrains." },
        { t: "Importance is unstable", d: "Reseed the same pipeline and a correlated feature's importance can jump around, because the tree could have split on either twin." },
        { t: "class_weight", d: "Upweighting a rare class, like class_weight={fraud: 20}, makes its cases count more when scoring splits, so the tree stops ignoring it." },
        { t: "predict_proba", d: "A leaf's probability is just its training class mix, so answers cluster at 0% and 100%. Larger min_samples_leaf softens these extremes." }
      ] },
      { h: "Strengths", items: [
        { t: "Interpretable", d: "You can read the exact path of questions that led to a decision, which most models cannot offer a regulator." },
        { t: "No scaling needed", d: "Splits compare one feature to a threshold, so pounds, years or any units are fine. Standardising features makes no difference." },
        { t: "Handles mixed data", d: "Numeric and categorical features work together, and some implementations route missing values natively without dropping rows." }
      ] },
      { h: "Weaknesses and gotchas", items: [
        { t: "Instability", d: "Removing a few rows can produce a visibly different tree. This high variance is the core weakness of a single tree." },
        { t: "Staircase boundaries", d: "Splits are axis-aligned, so a smooth diagonal boundary is approximated by a blocky staircase of horizontal and vertical cuts." },
        { t: "Cannot extrapolate", d: "A leaf predicts an average, so on trend data (sales up 10% a year) it flatlines at the last seen value for future inputs." },
        { t: "Weak on wide sparse data", d: "On 30,000 sparse text columns a tree lags plain logistic regression; greedy single-feature splits waste such thin, spread-out signal." }
      ] },
      { h: "When to use it", items: [
        { t: "Good fit", d: "Tabular data with mixed feature types and interactions, especially when you need a decision you can explain step by step." },
        { t: "Prefer a linear model", d: "For wide, sparse, high-dimensional data like bag-of-words text, a linear model usually wins and trains faster." },
        { t: "Usually an ensemble", d: "A random forest averages many trees on random resamples, cancelling the single tree's instability for far better accuracy." }
      ] }
    ]
  };

  window.NOTES["svm"] = {
    key: "svm", name: "Support Vector Machines",
    intro: "A classifier that separates two classes with the boundary that leaves the widest possible empty street between them.",
    groups: [
      { h: "The idea", items: [
        { t: "What it is", d: "A two-class classifier that places a boundary as far as possible from both classes, defined only by the few points nearest to it." },
        { t: "Decision boundary", d: "The line, or in higher dimensions the plane, that separates the two classes. Placing it well is the whole job." },
        { t: "Margin", d: "The empty street between the boundary and the nearest points of each class. SVM chooses the boundary with the widest street." },
        { t: "Widest street wins", d: "Of the many lines that separate the classes, SVM picks the one with the biggest gap, giving the most room before a new point is misjudged." }
      ] },
      { h: "Support vectors", items: [
        { t: "What they are", d: "The points sitting right on the street's kerb. These few points alone fix the boundary; every other point could vanish and it would not move." },
        { t: "Sparse model", d: "The fitted model keeps only the support vectors and discards every other training point, so it stays small. If just 900 of 50,000 points qualify, prediction uses only those 900." },
        { t: "Why margin generalises", d: "A wider margin leaves more slack, so small shifts in a new point are less likely to push it across the boundary, aiding future accuracy." }
      ] },
      { h: "Soft margin and C", items: [
        { t: "Soft margin", d: "Real data is messy, so SVM allows a few points inside the street or misclassified in exchange for a wider, steadier boundary overall." },
        { t: "The C dial", d: "C sets strictness. Big C punishes every violation for a narrow street that risks overfitting; small C tolerates violations for a wider, smoother one." },
        { t: "Class imbalance", d: "When one class has far more training points than the other, the boundary drifts toward the majority and ignores the rare class. class_weight makes the rare class's violations cost more, pulling it back." }
      ] },
      { h: "Kernels", items: [
        { t: "The problem", d: "When one class rings the other, no straight line separates them. A richer space is needed where a curve becomes a straight cut." },
        { t: "Kernel", d: "A similarity function that lets the maths behave as if the data were mapped into that richer space, without building the new features." },
        { t: "Kernel trick", d: "Reach the richer space using only similarities between pairs of points, never computing the huge mapped coordinates. That is what makes it cheap." },
        { t: "Gamma (RBF)", d: "How far one point's influence reaches. Big gamma makes tight local islands that overfit; small gamma makes broad, smooth regions." },
        { t: "C and gamma together", d: "The two knobs interact, so tune them jointly on a log-scale grid; sweeping one alone looks random." }
      ] },
      { h: "Beyond two classes and scores", items: [
        { t: "Multiclass", d: "SVM is inherently two-class, so libraries train many binary models. sklearn's SVC uses one-vs-one, pairing every two classes." },
        { t: "Raw scores", d: "SVC outputs a signed distance like +1.73, not a probability. Its sign gives the class and its size how far past the boundary." },
        { t: "Calibrated probabilities", d: "To get probabilities, fit an extra calibration step (Platt scaling) on the scores. It costs more time and can shift the answers slightly." },
        { t: "Feature scaling", d: "The margin measures distance, so an unscaled large-range feature dominates it. Always standardise features before training." }
      ] },
      { h: "Strengths and weaknesses", items: [
        { t: "Strength: clean boundaries", d: "With the right kernel it draws sharp, well-margined boundaries and copes with high-dimensional data, like sparse text features." },
        { t: "Weakness: scale", d: "Kernel SVMs compare pairs of points, so memory and time balloon on hundreds of thousands of rows; huge data runs out of memory." },
        { t: "Weakness: no native probabilities", d: "Probabilities need a bolt-on calibration step, so SVM is awkward when well-calibrated scores are the actual requirement." }
      ] },
      { h: "When to use it", items: [
        { t: "Good fit", d: "Small to medium datasets with a clear margin, including high-dimensional ones; use LinearSVC for sparse TF-IDF text." },
        { t: "Reach elsewhere", d: "For millions of rows, nightly retrains or native probability outputs, a linear model or tree ensemble is usually the better tool." },
        { t: "Linear vs RBF", d: "Start linear; switch to an RBF kernel only when the classes are clearly not linearly separable, then tune C and gamma together." }
      ] }
    ]
  };
})();
