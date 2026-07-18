/* Model usage guide — for EVERY model topic: when to use it, its limitations,
   whether it needs feature scaling, and its pros & cons. All are DEFINITION
   questions (tagged into read-and-recall) and each carries a reveal, so they
   also become flashcards. choices[0] is always correct (shuffled at render).
   Loads AFTER the base topic files, BEFORE data_defs_rank.js. */
(function () {
  var Q = (window.QUESTIONS = window.QUESTIONS || {});
  var D = (window.DEFS = window.DEFS || {});
  var R = (window.DEFRANK = window.DEFRANK || {});
  function nk(s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function g(qk, q, correct, distractors, name, text, explain, simple) {
    (Q[qk] = Q[qk] || []).push({ q: q, choices: [correct].concat(distractors), explain: explain, simple: simple, widget: { reveal: { name: name, text: text } } });
    D[q] = 1; R[nk(name)] = 2;
  }

  /* ===== KNN ===== */

  g("medium",
    "When is KNN actually a good choice?",
    "Small-to-medium datasets with few, meaningful features where the decision boundary is irregular and you want a no-training baseline fast.",
    ["Large, high-dimensional datasets where its instance-based memory scales gracefully and distances stay informative across many features.",
     "Streaming applications with tight latency budgets, since having no training phase means its predictions are also effectively instant.",
     "Text and image problems specifically, because raw pixel and token distances are the most reliable similarity signals available.",
     "Any problem where interpretability matters most, since each prediction comes with a single global rule explaining the whole model."],
    "When to use KNN",
    "Reach for KNN when the data is small enough to search quickly, the features are few and genuinely meaningful, and the class boundary is too irregular for a simple parametric shape. It's a strong quick baseline: zero training, decent accuracy, and its mistakes tell you about your distance metric.",
    "KNN's fit is instant but every PREDICTION searches the training set — so it suits small data, not big; and distance concentration makes it fail in high dimensions. The boundary it produces is as wiggly as the data demands, which parametric models can't always match. It explains locally ('these 5 neighbours'), not globally.",
    "A great first weapon on small, clean, low-dimensional data — and a famously bad one on big or wide data.");

  g("medium",
    "What is the core limitation of KNN?",
    "Prediction cost and memory grow with the training set, and in high dimensions distances concentrate so 'nearest' stops meaning anything.",
    ["It can only draw straight-line decision boundaries, so any problem with curved class borders is fundamentally out of its reach.",
     "It requires a long, compute-heavy training phase before the first prediction, which rules it out for quickly-assembled baselines.",
     "It only works when classes are perfectly balanced, since the majority class otherwise wins every single neighbourhood vote.",
     "It cannot output probabilities of any kind, because voting produces a class label with no notion of confidence attached to it."],
    "KNN limitations",
    "KNN carries the whole training set to every prediction (slow, memory-hungry at scale) and leans entirely on distance being meaningful — which the curse of dimensionality quietly destroys. Irrelevant features and wrong scales poison it, and imbalanced neighbourhoods bias votes (fixable by weighting, not fatal).",
    "The two structural weaknesses: inference cost scales with data size (the opposite of most models), and high-dimensional distance concentration — everyone becomes equally far, so neighbours are meaningless. Wiggly boundaries it handles fine; probabilities come from vote fractions; imbalance hurts but distance-weighting mitigates.",
    "It never forgets — that's the problem: predictions drag the whole dataset along, and in wide data 'nearest' goes blind.");

  g("medium",
    "Does KNN need feature scaling?",
    "Yes, critically — distances are its entire engine, so an unscaled large-range feature silently dominates every neighbour calculation.",
    ["No — the neighbour ranking is invariant to any monotone transformation of the features, so scaling merely relabels the same neighbours.",
     "Only when the dataset has more than a few thousand rows, since below that size the distance distortions are too small to change any vote.",
     "Only for the regression variant; classification votes are decided by counts, which are unaffected by how far away the neighbours sit.",
     "No — modern implementations standardise internally as part of building the k-d tree, so manual scaling would apply the correction twice."],
    "KNN & scaling",
    "Scaling is essential. Income in pounds (range ~100,000) versus age in years (range ~80) means income differences dwarf age differences in every Euclidean distance — age effectively vanishes. Standardise or min-max scale first, always; distance-based methods live or die by comparable units.",
    "Per-feature monotone transforms DO change multi-dimensional distances (that invariance claim only holds for a single feature); size doesn't rescue it; classification and regression both rank by distance; and sklearn's KNeighborsClassifier does NOT scale internally — that's your job, ideally in a Pipeline.",
    "One loud feature out-shouts the rest of the room — put every feature in the same units before measuring 'near'.");

  g("medium",
    "What are the honest pros and cons of KNN?",
    "Pros: no training, no distribution assumptions, naturally multi-class, wiggly boundaries. Cons: slow prediction, curse of dimensionality, scale-sensitive, memory-heavy.",
    ["Pros: fastest predictions of any model and immunity to irrelevant features. Cons: long training times and boundaries restricted to straight lines only.",
     "Pros: thrives in thousands of dimensions and compresses data at fit time. Cons: limited to binary problems and requires a differentiable loss to tune.",
     "Pros: strong extrapolation beyond the training range and built-in feature selection. Cons: cannot handle more than two classes without one-vs-rest wrappers.",
     "Pros: probabilistic outputs calibrated by construction and robustness to scaling. Cons: needs gradient descent, so convergence failures are its main risk."],
    "KNN pros & cons",
    "The trade is memory-for-simplicity: keep everything, learn nothing, decide locally at query time. That buys assumption-free flexibility and instant fitting, and costs you at prediction time — linear search (or index-assisted), distance fragility in high dimensions, and total dependence on scaling and feature relevance.",
    "Its strengths and weaknesses are mirror images: no training means no learned compression, so prediction does all the work; no assumptions means no protection when distances degrade. Multi-class is native (neighbours just vote); extrapolation and high dimensions are exactly where it breaks.",
    "Lazy learning: pay nothing up front, pay at every question — flexible where distances work, helpless where they don't.");

  /* ===== Logistic Regression ===== */

  g("logreg1",
    "When is logistic regression the right first choice?",
    "When you need calibrated probabilities, coefficient-level explainability, or a strong baseline on wide/sparse data — especially where the log-odds are roughly linear in the features.",
    ["When the classes are separated by strongly curved, interacting boundaries that a weighted sum of raw features could never approximate at any accuracy.",
     "When the dataset is tiny and nonlinear, since maximum likelihood estimation is specifically designed to recover curvature from limited examples.",
     "When features arrive with wildly different units that will never be scaled, because the sigmoid squashes away any scale differences automatically.",
     "When you expect heavy label noise, since the log-loss objective ignores confidently wrong labels rather than being dominated by them."],
    "When to use logistic regression",
    "The default first classifier for tabular problems: fast, stable, probabilistically honest (usually well-calibrated out of the box), and each coefficient reads as 'this feature pushes the log-odds this way'. It shines on wide sparse data (text, one-hots) where linear structure dominates and fancy models overfit.",
    "Its assumption — log-odds linear in features — is milder than it sounds, and engineered features (interactions, polynomials) extend it. The sigmoid does NOT remove the need for scaling (regularisation is scale-sensitive), and log-loss punishes confident errors hardest, so label noise hurts rather than being ignored.",
    "The sensible default: honest probabilities, readable coefficients, hard to beat on wide sparse data — start here, make the fancy model prove it's better.");

  g("logreg1",
    "What is the core limitation of logistic regression?",
    "Its decision boundary is linear in the given features — curvature and interactions must be hand-engineered in, or the model simply cannot express them.",
    ["It cannot produce probability estimates, only hard class labels, which forces a separate calibration model into every deployment pipeline.",
     "It fails to converge whenever features are correlated, so real-world datasets need decorrelation before the solver will run at all.",
     "It handles only two classes, and no principled multi-class extension exists beyond training separate models per label pair.",
     "Its coefficients are unreadable black-box quantities, which is why tree models are preferred whenever regulators demand explanations."],
    "Logistic regression limitations",
    "One weighted sum decides everything: if the true boundary curves or depends on feature interactions, plain logistic regression underfits — you must engineer the nonlinearity yourself (or switch families). Perfect separation is its other quirk: coefficients diverge without regularisation.",
    "The linearity is in the FEATURES YOU GIVE IT — x², x·y terms buy curvature at interpretability's cost. Probabilities are its speciality, not a gap; correlated features inflate coefficient variance but don't stop convergence; multinomial (softmax) regression is the principled multi-class form; and its coefficients are the INDUSTRY STANDARD for explainability.",
    "It draws one straight cut through feature space — powerful exactly when straight is right, and blind to every curve you didn't hand-build.");

  g("logreg1",
    "Does logistic regression need feature scaling?",
    "For the model itself no — but in practice yes: regularisation penalises all coefficients equally, so unscaled features are penalised unfairly, and gradient solvers converge faster on standardised data.",
    ["Absolutely never — the sigmoid maps every input to the 0-1 range, which mathematically removes any influence the original feature scales could have had.",
     "Yes, because the log-odds are only defined for features lying between minus one and one, so inputs outside that interval break the likelihood.",
     "Only when using the newton-cg solver; every other optimiser in common use estimates coefficients through a scale-free closed-form solution.",
     "Yes, because unscaled features make the fitted probabilities systematically overconfident, which no amount of regularisation tuning can repair."],
    "Logistic regression & scaling",
    "An unregularised fit on any scale gives equivalent predictions (coefficients just rescale inversely). But almost nobody fits unregularised: L1/L2 penalties compare coefficient sizes across features, and a feature measured in big units gets a small coefficient — under-penalised relative to its real influence. Standardise, especially with regularisation.",
    "The sigmoid squashes the OUTPUT, not the inputs' relative influence; no −1..1 input constraint exists; there is no closed-form solution for logistic regression (all solvers iterate, and all benefit from conditioning); and miscalibration isn't the scaling failure mode — unfair regularisation and slow convergence are.",
    "The model doesn't care about units; the PENALTY does — and you're almost always using a penalty, so scale.");

  g("logreg1",
    "What are the honest pros and cons of logistic regression?",
    "Pros: fast, stable, calibrated probabilities, readable coefficients, great on wide sparse data. Cons: linear boundaries only, needs feature engineering for curvature, sensitive to outliers in feature space.",
    ["Pros: captures arbitrary interactions automatically and is immune to irrelevant columns. Cons: probabilities need external calibration and training is the slowest of the linear family.",
     "Pros: models curved boundaries natively and requires no regularisation choices. Cons: restricted to balanced classes and undefined for more than ten features.",
     "Pros: unaffected by feature scaling under any penalty and robust to perfect separation. Cons: cannot be trained incrementally and has no multi-class formulation.",
     "Pros: extrapolates reliably far outside the training range and never overfits. Cons: coefficients change meaning with every random seed, defeating interpretation."],
    "Logistic regression pros & cons",
    "It trades expressiveness for everything else: speed, stability, small-data reliability, native probabilities, and coefficients you can defend to a regulator. The bill comes due when the truth is nonlinear — and the classic remedies (interaction terms, splines) spend the very interpretability you chose it for.",
    "The genuinely rare virtue is calibration: its probabilities usually mean what they say without post-processing — boosted trees and naive Bayes can't claim that. The genuinely binding limit is expressiveness; everything else (multi-class, streaming via SGD, imbalance via weights) has standard answers.",
    "Fast, honest, explainable, linear — three virtues you keep, one constraint you design around.");

  /* ===== Naive Bayes ===== */

  g("bayes1",
    "When is Naive Bayes actually the right tool?",
    "High-dimensional count data — text above all — where you need a fast, small-data-friendly baseline that trains in one pass and tolerates thousands of features.",
    ["Problems dominated by feature interactions, since factorising the joint likelihood lets it model how features combine rather than treating them separately.",
     "Any task needing well-calibrated probability estimates, because multiplying independent likelihoods yields the most honest confidence scores available.",
     "Small dense numeric datasets with heavily correlated features, where the independence assumption acts as a natural regulariser against double counting.",
     "Image recognition tasks, where per-pixel class-conditional independence is approximately true and gives it an edge over convolutional approaches."],
    "When to use Naive Bayes",
    "Its home turf is text classification: bag-of-words features are many, sparse, and individually weakly informative — exactly where counting per-class word frequencies (one pass, no iteration) produces a shockingly strong baseline. It also tolerates tiny training sets better than most, because it estimates only per-feature statistics.",
    "The independence assumption is what makes it fast AND what it gets wrong: correlated features are double-counted (the opposite of regularised), which distorts probabilities while often leaving the argmax — the predicted class — correct. Hence: good classifier, bad probability estimator; use the label, distrust the confidence.",
    "The one-afternoon baseline for text: count words per class, multiply, done — beat it before you deploy anything fancier.");

  g("bayes1",
    "What is the core limitation of Naive Bayes?",
    "Correlated features get double-counted — the independence assumption multiplies their evidence as if each were new information — driving probabilities toward absurd extremes even when the predicted class stays right.",
    ["It needs enormous training sets before its frequency estimates stabilise, which disqualifies it from the small-data regimes where flexible models overfit.",
     "Training requires many gradient-descent passes over the data, making it one of the slowest classifiers to fit at realistic dataset sizes.",
     "It cannot handle more than a few dozen features, since the joint probability table it stores grows exponentially with every column added.",
     "Its decision rule ignores class priors entirely, so it systematically fails on any dataset where one class outnumbers the other."],
    "Naive Bayes limitations",
    "Tell it 'wet pavement' and 'rain' as if independent and it counts the storm twice: stacked correlated evidence produces confidences like 0.9999 that mean nothing. Zero-frequency is the other classic trap (one unseen word vetoes a class) — solved by Laplace smoothing. The ranking often survives; the probabilities don't.",
    "Everything else in the list is backwards: NB is the SMALL-data specialist (few parameters, closed-form counting), fits in a single pass with no gradients, scales to hundreds of thousands of features precisely because it never builds a joint table (that's the 'naive' factorisation), and the prior is the first term in its product.",
    "It counts every echoed rumour as a fresh witness — verdicts often right, certainty always inflated.");

  g("bayes1",
    "Does Naive Bayes need feature scaling?",
    "No — it never computes distances or penalised weights: discrete variants use counts, and Gaussian NB fits each feature's own mean and variance per class, which absorbs scale automatically.",
    ["Yes — like every probabilistic classifier it multiplies raw feature values together, so one large-unit feature dominates the product unless standardised first.",
     "Yes for the multinomial variant, where word counts must be scaled to zero mean and unit variance before the class-conditional frequencies make sense.",
     "Only when features are positive, since likelihoods are undefined for negative inputs and scaling into a positive range is what restores them.",
     "No, but only because implementations clip all features into the 0-1 interval on load, which is a hidden scaling step users should account for."],
    "Naive Bayes & scaling",
    "One of the few scale-indifferent families. MultinomialNB consumes counts (standardising word counts to negative values would actually BREAK it); GaussianNB estimates μ and σ per feature per class — measure height in metres or millimetres and the fitted Gaussian adjusts, likelihood unchanged.",
    "NB multiplies probabilities (likelihood evaluations), never raw feature values; nothing clips inputs on load; negative features are fine for Gaussian NB. The practical note: don't standardise counts for multinomial variants — you'd violate their count assumption, the one preprocessing error this family invites.",
    "It measures each feature against that feature's own class statistics — the units cancel before anything is compared.");

  g("bayes1",
    "What are the honest pros and cons of Naive Bayes?",
    "Pros: trains in one pass, thrives on small data and huge sparse feature spaces, naturally incremental. Cons: unreliable probabilities under correlation, crude boundaries, needs smoothing to survive unseen values.",
    ["Pros: models feature interactions richly and yields the field's best-calibrated confidence scores. Cons: slow iterative training and poor scaling beyond a hundred features.",
     "Pros: learns arbitrarily curved decision boundaries from raw pixels. Cons: cannot be updated online and demands class balance before its counts converge.",
     "Pros: immune to the zero-frequency problem by construction. Cons: requires feature scaling and a held-out set for its many hyperparameters.",
     "Pros: coefficients map one-to-one onto causal effects. Cons: undefined for text data, where correlated tokens violate its core assumption fatally."],
    "Naive Bayes pros & cons",
    "Speed and frugality are the headline: closed-form counting means instant training, natural partial_fit streaming, and stability on data too small for anything flexible. The cost: a wrong-by-design independence assumption that wrecks calibration, and boundaries too simple for interaction-driven problems.",
    "The paradox worth remembering: the assumption is false nearly everywhere, yet the classifier works anyway — because classification only needs the argmax right, not the probabilities. That's also its trap: never feed NB confidences into cost calculations without recalibration.",
    "Cheap, fast, small-data-proof, confidently wrong about its own certainty — use the verdicts, recalibrate the confidence.");

  /* ===== Decision Trees ===== */

  g("trees1",
    "When is a single decision tree the right choice?",
    "When explainability is the binding requirement — the fitted rules can be printed, audited and challenged — and mixed-type tabular data with nonlinear thresholds needs capturing without preprocessing ceremony.",
    ["When maximum predictive accuracy is the goal, since a deep enough single tree reliably outperforms ensembles by fitting the training signal completely.",
     "When the relationship between features and target is smooth and gradual, which axis-aligned splits represent more faithfully than any linear model.",
     "When the dataset shifts frequently, because single trees are the most stable of all model families under small perturbations of the training rows.",
     "When features are heavily correlated, since impurity-based splitting shares credit evenly across correlated columns instead of picking one arbitrarily."],
    "When to use a decision tree",
    "A tree earns its place when a human must follow the logic: 'income < 20k AND months_employed < 6 → decline' is a model a committee can debate line by line. It also eats mixed types, missing-value strategies, and unscaled features without complaint — the lowest-ceremony model for messy tabular data.",
    "Know what you're NOT getting: accuracy (ensembles of trees beat single trees almost always), stability (small data changes can restructure the whole tree — the instability that bagging exploits), or smoothness (staircase approximations of gradual trends). Choose it for transparency, not leaderboards.",
    "The model you can print on one page and argue about in a meeting — that's its job, not winning benchmarks.");

  g("trees1",
    "What is the core limitation of a single decision tree?",
    "Instability and variance — a greedy split near the root, flipped by a few changed rows, restructures everything below it, so single trees overfit readily and generalise erratically.",
    ["Underfitting by construction: trees cannot represent interactions between features, since each split consults exactly one column at a time forever.",
     "Training cost — exhaustive split search is exponential in depth, so trees beyond five or six levels are computationally out of reach in practice.",
     "They only accept numeric inputs, so the categorical columns of business data must be dropped before a tree can be fitted at all.",
     "Their predictions vary smoothly and continuously with each feature, making them unable to model the sharp thresholds common in rules-based domains."],
    "Decision tree limitations",
    "The greedy top-down build is the weakness: each split is locally optimal given everything above it, so an early split that noise nudged one way commits the entire subtree. Result: high variance, easy overfitting (unpruned trees can memorise), and stepwise predictions that never extrapolate. Forests exist precisely to average this instability away.",
    "Interactions are what stacked splits EXPRESS (split on A, then B within each branch — that's A×B structure); split search is polynomial and fast at practical depths; categorical handling is routine (natively or encoded); and predictions are piecewise-CONSTANT — sharp thresholds are their speciality, smoothness their failure.",
    "One nudged card near the base and the whole house rebuilds differently — that fragility is why forests were invented.");

  g("trees1",
    "Do decision trees need feature scaling?",
    "No — a split asks only whether a value clears a threshold, and thresholds live in each feature's own units; rescaling shifts the threshold with the data, leaving the tree identical.",
    ["Yes — impurity calculations compare values across features, so unscaled columns with larger ranges win a disproportionate share of the splits near the root.",
     "Yes when depth exceeds a few levels, since deep trees accumulate scale distortions multiplicatively at each successive split along a path.",
     "Only min-max scaling is required; standardisation actively harms trees by introducing the negative values that impurity measures cannot process.",
     "No, but only because modern libraries silently standardise inputs before growing the tree, so the invariance is an implementation courtesy rather than a property."],
    "Decision trees & scaling",
    "Fully scale-invariant (for monotone transforms): 'income > 30,000' and 'income_in_thousands > 30' are the same split. Impurity is computed from label proportions in the resulting groups — feature magnitudes never enter, so no feature 'wins' splits by being big. Log-transforming for a tree is likewise pointless (it's monotone).",
    "Impurity compares CANDIDATE SPLITS by how well they separate labels, not feature values across columns; no scale distortion accumulates with depth; negative values are unremarkable; and libraries do no hidden standardisation — the invariance is mathematical, one of trees' genuine conveniences.",
    "The tree asks 'above or below the bar?' — move the units and the bar moves with them, so nothing changes.");

  g("trees1",
    "What are the honest pros and cons of decision trees?",
    "Pros: readable rules, no scaling, mixed types, native interactions and nonlinearity. Cons: unstable, overfit-prone, stepwise predictions, no extrapolation — accuracy usually needs an ensemble.",
    ["Pros: the most stable model family under resampling and immune to overfitting at any depth. Cons: rules too complex for humans to audit and mandatory feature scaling.",
     "Pros: smooth continuous predictions and reliable extrapolation beyond training data. Cons: blind to interactions and restricted to numeric inputs only.",
     "Pros: convex training with a guaranteed globally optimal tree. Cons: probabilities so poor that no pruning or calibration step can make them usable.",
     "Pros: performance that improves monotonically with depth on held-out data. Cons: an inability to represent sharp thresholds, its most cited weakness."],
    "Decision tree pros & cons",
    "Everything convenient about trees (no preprocessing, readable structure, threshold logic, automatic interactions) survives into their ensembles — which is why the weaknesses (variance, overfitting) got solved by averaging MANY trees rather than abandoning the family. The single tree remains the explainability special.",
    "Training is greedy, not optimal (finding the best tree is NP-hard — greediness is the compromise); depth improves TRAINING fit monotonically while held-out accuracy peaks and falls; leaf-proportion probabilities are coarse but calibratable. The honest summary: brilliant representation, fragile fitting.",
    "All the convenience, none of the stability — keep one for the explanation, hire a forest for the accuracy.");

  /* ===== SVM ===== */

  g("svm1",
    "When is an SVM the right choice?",
    "Medium-sized datasets — up to tens of thousands of rows — where the boundary is complex, dimensions are high relative to samples, and a kernel can encode similarity you can't easily engineer as features.",
    ["Datasets with millions of rows, where the kernel trick's efficiency advantage over linear methods grows with every additional training example stored.",
     "Problems requiring probability estimates out of the box, since the margin distance converts directly into a calibrated class probability without extra fitting.",
     "Settings demanding rapid retraining on streams, because support vectors update incrementally as each new example arrives without touching the rest.",
     "Low-dimensional problems with abundant data, where its margin objective consistently beats tree ensembles that struggle in exactly that regime."],
    "When to use an SVM",
    "SVMs shine in the awkward middle: too complex for linear models, too little data for deep learning, especially when p is large relative to n (genomics, text with tailored kernels). The margin objective resists overfitting in high dimensions, and kernels let domain similarity (strings, graphs) enter directly.",
    "The n² kernel matrix is the scaling wall — tens of thousands of rows is the practical ceiling for nonlinear kernels (linear SVMs via LinearSVC scale much further). Probabilities need bolt-on Platt scaling; incremental updating isn't natural; and in low-dimensional data-rich regimes, boosted trees usually win.",
    "The specialist for hard boundaries on modest data — where the kernel is your way of telling it what 'similar' means.");

  g("svm1",
    "What is the core limitation of SVMs?",
    "Training scales roughly quadratically with rows for kernel SVMs — the kernel matrix is n×n — so beyond tens of thousands of samples, fitting and tuning become impractical.",
    ["The margin objective overfits catastrophically in high dimensions, which is why SVMs are avoided whenever features outnumber training examples.",
     "SVMs can only learn linear boundaries, and no mechanism exists for extending the formulation beyond dot products in the original feature space.",
     "Predictions require a full pass over the entire training set, since every training example contributes to every decision function evaluation.",
     "The optimisation is non-convex, so different random initialisations produce different support vectors and unstable decision boundaries."],
    "SVM limitations",
    "The kernel matrix — every pair of training points — costs O(n²) memory and worse time: the scaling ceiling that removed SVMs from the big-data conversation. Add slow hyperparameter sweeps (C, gamma per fit), bolt-on probabilities, and multi-class via one-vs-rest wrappers, and the operational bill is real.",
    "High dimensions are its STRENGTH (margins regularise there); kernels exist precisely to escape linearity; prediction touches only the SUPPORT vectors, not everyone (sparse solutions are the design's elegance); and the optimisation is convex — one global optimum, deterministically found. The limits are scale and ceremony, not instability.",
    "Beautiful mathematics with an n-squared price tag — the elegance stops fitting in memory around fifty thousand rows.");

  g("svm1",
    "Does an SVM need feature scaling?",
    "Yes, near-mandatory — the RBF kernel exponentiates squared distances and the margin is measured in feature units, so one unscaled column can flatten the kernel and dictate the boundary.",
    ["No — the kernel trick maps data into a space where original units are irrelevant, which is the entire reason kernels were introduced in the first place.",
     "Only for the linear kernel; RBF and polynomial kernels normalise their inputs internally as part of evaluating the kernel function itself.",
     "Only the target needs scaling for SVM regression; the feature columns enter through dot products whose scale conveniently cancels out.",
     "Scaling matters only for the intercept term, so centring the data is required but dividing by the standard deviation changes nothing."],
    "SVM & scaling",
    "The RBF kernel computes exp(−γ‖x−x'‖²): let one feature's range be 1000× the others' and the distance IS that feature — γ becomes impossible to tune (too big → everything dissimilar; too small → everything identical). Standardising is step zero of any SVM pipeline; skipping it is the most common cause of 'SVM performs terribly'.",
    "Kernels operate ON the raw distances/dot-products — they inherit scale problems, not launder them (nothing normalises internally). Centring alone doesn't fix range imbalance. This family and KNN sit together at the far end of scale sensitivity, opposite the trees.",
    "The kernel measures raw distance, and distance believes whichever feature shouts loudest — level the units first, always.");

  g("svm1",
    "What are the honest pros and cons of SVMs?",
    "Pros: strong in high dimensions, convex training, kernels for custom similarity, sparse support-vector solutions. Cons: poor scaling with rows, mandatory feature scaling, awkward probabilities, fiddly tuning.",
    ["Pros: near-linear scaling to millions of rows and native calibrated probabilities. Cons: non-convex training and weakness in high-dimensional feature spaces.",
     "Pros: no hyperparameters to tune and boundaries readable as if-then rules. Cons: restriction to linearly separable problems and dense solutions using every point.",
     "Pros: immunity to feature scaling and instant retraining on streaming data. Cons: inability to use custom kernels beyond the built-in polynomial family.",
     "Pros: graceful degradation on huge datasets and automatic feature selection. Cons: convexity, which prevents the model from fitting complex boundaries."],
    "SVM pros & cons",
    "The pro column is mathematical: a convex objective (one optimum, reproducible), margins that regularise naturally where features outnumber samples, kernels as a principled door for domain knowledge, and solutions carried by a fraction of the data. The con column is operational: n² scaling, scale-sensitivity, Platt-scaled probabilities, and a C-gamma grid that must be searched.",
    "A once-dominant family now occupying a niche: boosted trees took the tabular crown and deep nets the perceptual one, but for medium-sized high-dimensional problems with meaningful similarity structure, the SVM remains the tool the theory says it is.",
    "Convex elegance and kernel flexibility, paid for in scaling walls and tuning ceremony — a specialist now, not the default.");

})();
